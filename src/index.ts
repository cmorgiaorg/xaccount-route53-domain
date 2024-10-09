import { Stack } from 'aws-cdk-lib';
import { AccountPrincipal, CompositePrincipal, Role } from 'aws-cdk-lib/aws-iam';
import { CrossAccountZoneDelegationRecord, IPublicHostedZone, PublicHostedZone, ZoneDelegationRecord } from 'aws-cdk-lib/aws-route53';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { SSMParameterReader } from 'xregion-ssm-parameter-reader';

export interface ICrossRegionAccountSubZoneConfig {
  readonly primary: boolean;
  readonly primaryRegion: string;
  readonly secondaryRegion: string;
  readonly cicdAccount?: string;
}

export class CrossRegionAccountSubZone extends Construct {
  protected parentZoneName: string;
  protected parentZoneId: string;
  protected intermediateZoneName: string;
  protected intermediateZonePrefix: string;

  constructor(scope: Construct, id: string, parentZoneName: string, parentZoneId: string,intermediateZonePrefix:string) {
    super(scope, id);
    this.parentZoneName = parentZoneName;
    this.parentZoneId = parentZoneId;
    this.intermediateZonePrefix = intermediateZonePrefix;
    this.intermediateZoneName = `${intermediateZonePrefix}.${this.parentZoneName}`;
  }

  public setupCommon(accounts:string[]) {
    const principals = Object.values(accounts).map( account => new AccountPrincipal(account));
    
    const intermediateZone = new PublicHostedZone(this, 'HostedZone', {
      zoneName: this.intermediateZoneName,
    });
    const crossAccountRole = new Role(this, 'ZoneDelegationRole', {
      // The role name must be predictable
      roleName: 'ZoneDelegationRole',
      // The other account
      assumedBy: new CompositePrincipal(...principals),
    });
    intermediateZone.grantDelegation(crossAccountRole);

    new ZoneDelegationRecord(this, 'zoneDelegation', {
      zone: PublicHostedZone.fromHostedZoneAttributes(this, 'parentZone', {
        hostedZoneId: this.parentZoneId,
        zoneName: this.parentZoneName,
      }),
      recordName: this.intermediateZonePrefix,
      nameServers: intermediateZone.hostedZoneNameServers!,
    });
  }

  public setupDns(envName: string, config:ICrossRegionAccountSubZoneConfig):IPublicHostedZone {
    var subZone: IPublicHostedZone;

    if (config.primary) {
      const subZoneId = new SSMParameterReader(this, 'subZoneIdParam', { parameterName: `${envName}SubZoneId-${config.secondaryRegion}`, region: config.secondaryRegion }).retrieveParameterValue();
      subZone = PublicHostedZone.fromPublicHostedZoneAttributes(this, 'SubZone', { hostedZoneId: subZoneId, zoneName: `${envName}.${this.parentZoneName}` });

    } else {

      subZone = new PublicHostedZone(this, 'SubZone', {
        zoneName: `${envName}.${this.parentZoneName}`,
      });
      new StringParameter(this, 'subZoneIdParam', {
        parameterName: `${envName}SubZoneId-${config.primaryRegion}`, //TODO should be primary
        stringValue: subZone.hostedZoneId,
      });

      // import the delegation role by constructing the roleArn
      const delegationRoleArn = Stack.of(this).formatArn({
        region: '', // IAM is global in each partition
        service: 'iam',
        account: config.cicdAccount,
        resource: 'role',
        resourceName: 'ZoneDelegationRole',
      });
      const delegationRole = Role.fromRoleArn(this, 'DelegationRole', delegationRoleArn);

      // create the record
      new CrossAccountZoneDelegationRecord(this, 'delegate', {
        delegatedZone: subZone,
        parentHostedZoneName: this.parentZoneName, // or you can use parentHostedZoneId
        delegationRole,
      });
    }

    return subZone;
  }
}
