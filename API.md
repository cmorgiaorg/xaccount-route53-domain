# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CrossRegionAccountSubZone <a name="CrossRegionAccountSubZone" id="xaccount-route53-domain.CrossRegionAccountSubZone"></a>

#### Initializers <a name="Initializers" id="xaccount-route53-domain.CrossRegionAccountSubZone.Initializer"></a>

```typescript
import { CrossRegionAccountSubZone } from 'xaccount-route53-domain'

new CrossRegionAccountSubZone(scope: Construct, id: string, parentZoneName: string, parentZoneId: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.parentZoneName">parentZoneName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.parentZoneId">parentZoneId</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.id"></a>

- *Type:* string

---

##### `parentZoneName`<sup>Required</sup> <a name="parentZoneName" id="xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.parentZoneName"></a>

- *Type:* string

---

##### `parentZoneId`<sup>Required</sup> <a name="parentZoneId" id="xaccount-route53-domain.CrossRegionAccountSubZone.Initializer.parameter.parentZoneId"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.setupCommon">setupCommon</a></code> | *No description.* |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.setupDns">setupDns</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="xaccount-route53-domain.CrossRegionAccountSubZone.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `setupCommon` <a name="setupCommon" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupCommon"></a>

```typescript
public setupCommon(accounts: string[], intermediateZonePrefix: string): void
```

###### `accounts`<sup>Required</sup> <a name="accounts" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupCommon.parameter.accounts"></a>

- *Type:* string[]

---

###### `intermediateZonePrefix`<sup>Required</sup> <a name="intermediateZonePrefix" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupCommon.parameter.intermediateZonePrefix"></a>

- *Type:* string

---

##### `setupDns` <a name="setupDns" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupDns"></a>

```typescript
public setupDns(envName: string, config: ICrossRegionAccountSubZoneConfig): IPublicHostedZone
```

###### `envName`<sup>Required</sup> <a name="envName" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupDns.parameter.envName"></a>

- *Type:* string

---

###### `config`<sup>Required</sup> <a name="config" id="xaccount-route53-domain.CrossRegionAccountSubZone.setupDns.parameter.config"></a>

- *Type:* <a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig">ICrossRegionAccountSubZoneConfig</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="xaccount-route53-domain.CrossRegionAccountSubZone.isConstruct"></a>

```typescript
import { CrossRegionAccountSubZone } from 'xaccount-route53-domain'

CrossRegionAccountSubZone.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="xaccount-route53-domain.CrossRegionAccountSubZone.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xaccount-route53-domain.CrossRegionAccountSubZone.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="xaccount-route53-domain.CrossRegionAccountSubZone.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### ICrossRegionAccountSubZoneConfig <a name="ICrossRegionAccountSubZoneConfig" id="xaccount-route53-domain.ICrossRegionAccountSubZoneConfig"></a>

- *Implemented By:* <a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig">ICrossRegionAccountSubZoneConfig</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.primary">primary</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.primaryRegion">primaryRegion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.secondaryRegion">secondaryRegion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.cicdAccount">cicdAccount</a></code> | <code>string</code> | *No description.* |

---

##### `primary`<sup>Required</sup> <a name="primary" id="xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.primary"></a>

```typescript
public readonly primary: boolean;
```

- *Type:* boolean

---

##### `primaryRegion`<sup>Required</sup> <a name="primaryRegion" id="xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.primaryRegion"></a>

```typescript
public readonly primaryRegion: string;
```

- *Type:* string

---

##### `secondaryRegion`<sup>Required</sup> <a name="secondaryRegion" id="xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.secondaryRegion"></a>

```typescript
public readonly secondaryRegion: string;
```

- *Type:* string

---

##### `cicdAccount`<sup>Optional</sup> <a name="cicdAccount" id="xaccount-route53-domain.ICrossRegionAccountSubZoneConfig.property.cicdAccount"></a>

```typescript
public readonly cicdAccount: string;
```

- *Type:* string

---

