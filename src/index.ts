import { Stack } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { CrossAccountZoneDelegationRecord, IPublicHostedZone, PublicHostedZone } from "aws-cdk-lib/aws-route53";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { SSMParameterReader } from "xregion-ssm-parameter-reader";

export interface CrossRegionAccountSubZoneConfig {
    primary: boolean;
    primaryRegion: string;
    secondaryRegion: string;
    cicdAccount?: string;
}

export class CrossRegionAccountSubZone extends Construct {
  protected config: CrossRegionAccountSubZoneConfig;
    constructor(scope: Construct, id: string, config: CrossRegionAccountSubZoneConfig) {
        super(scope, id);
        this.config = config;
    }
    public setupDns(envName: string, parentZoneName: string):IPublicHostedZone {
        var subZone: IPublicHostedZone;
    
        if (this.config.primary) {
          const subZoneId = new SSMParameterReader(this, 'subZoneIdParam', { parameterName: `${envName}SubZoneId-${this.config.secondaryRegion}`, region: this.config.secondaryRegion }).retrieveParameterValue();
          subZone = PublicHostedZone.fromPublicHostedZoneAttributes(this, 'SubZone', { hostedZoneId: subZoneId, zoneName: `${envName}.${parentZoneName}` })
    
        } else {
    
          subZone = new PublicHostedZone(this, 'SubZone', {
            zoneName: `${envName}.${parentZoneName}`,
          });
          new StringParameter(this, `subZoneIdParam`, {
            parameterName: `${envName}SubZoneId-${this.config.primaryRegion}`, //TODO should be primary
            stringValue: subZone.hostedZoneId,
          });
    
          // import the delegation role by constructing the roleArn
          const delegationRoleArn = Stack.of(this).formatArn({
            region: '', // IAM is global in each partition
            service: 'iam',
            account: this.config.cicdAccount,
            resource: 'role',
            resourceName: 'ZoneDelegationRole',
          });
          const delegationRole = Role.fromRoleArn(this, 'DelegationRole', delegationRoleArn);
    
          // create the record
          new CrossAccountZoneDelegationRecord(this, 'delegate', {
            delegatedZone: subZone,
            parentHostedZoneName: parentZoneName, // or you can use parentHostedZoneId
            delegationRole,
          });
        }
    
        return subZone;
      }
}