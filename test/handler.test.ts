import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionAccountSubZone } from '../src';

describe('CrossRegionAccountSubZone', () => {
  test('synth', () => {
    const app = new App();
    const stack = new Stack(app, 'CrossRegionAccountSubZoneStack');
    const subZone = new CrossRegionAccountSubZone(stack, 'CrossRegionAccountSubZone', 'example.com','XXXXXX');
    subZone.setupDns('dev', {
      primary: false,
      primaryRegion: 'us-east-1',
      secondaryRegion: 'eu-central-1',
      cicdAccount: 'xxxxxxxx'
    });
    const template = Template.fromStack(stack);
    template.hasResource('AWS::Route53::HostedZone', {});
  });
});