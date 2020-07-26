[script-pool](../README.md) › [Globals](../globals.md) › ["cluster"](_cluster_.md)

# Module: "cluster"

## Index

### Enumerations

* [CLUSTER_MESSAGE_TYPES](../enums/_cluster_.cluster_message_types.md)

### Classes

* [ClusterWorker](../classes/_cluster_.clusterworker.md)

### Interfaces

* [SendInterface](../interfaces/_cluster_.sendinterface.md)

### Variables

* [clusterInstanceTimeoutMS](_cluster_.md#const-clusterinstancetimeoutms)

### Functions

* [createClusterPool](_cluster_.md#const-createclusterpool)

## Variables

### `Const` clusterInstanceTimeoutMS

• **clusterInstanceTimeoutMS**: *number* = 1000 * 60 * 3

*Defined in [src/cluster.ts:7](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L7)*

## Functions

### `Const` createClusterPool

▸ **createClusterPool**(`opts`: Options, `modulePath`: string, `args?`: string[], `options?`: ForkOptions): *Pool‹[ClusterWorker](../classes/_cluster_.clusterworker.md)›*

*Defined in [src/cluster.ts:42](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | Options |
`modulePath` | string |
`args?` | string[] |
`options?` | ForkOptions |

**Returns:** *Pool‹[ClusterWorker](../classes/_cluster_.clusterworker.md)›*
