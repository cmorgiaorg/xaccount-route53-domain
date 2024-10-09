import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionAccountSubZone } from '../src';

describe('CrossRegionAccountSubZone', () => {
  test('synth', () => {
    const app = new App();
    const stack = new Stack(app, 'CrossRegionAccountSubZoneStack');
    const subZone = new CrossRegionAccountSubZone(stack, 'CrossRegionAccountSubZone', {
      primary: false,
      primaryRegion: 'eu-central-1',
      secondaryRegion: 'eu-west-1',
      parentZoneName: 'example.com',
      parentZoneId: 'XXXXXX',
    });
    subZone.setupDns('dev', 'example.com');
    const template = Template.fromStack(stack);
    template.hasResource('AWS::Route53::HostedZone', {});
  });
});