[script-pool](../README.md) › [Globals](../globals.md) › ["cluster_instance"](../modules/_cluster_instance_.md) › [ClusterChild](_cluster_instance_.clusterchild.md)

# Class: ClusterChild

## Hierarchy

* **ClusterChild**

## Index

### Constructors

* [constructor](_cluster_instance_.clusterchild.md#constructor)

### Properties

* [unExpectedExitListener](_cluster_instance_.clusterchild.md#private-unexpectedexitlistener)
* [worker](_cluster_instance_.clusterchild.md#private-worker)

### Methods

* [isAlive](_cluster_instance_.clusterchild.md#isalive)
* [kill](_cluster_instance_.clusterchild.md#kill)
* [send](_cluster_instance_.clusterchild.md#send)

## Constructors

###  constructor

\+ **new ClusterChild**(`worker`: Worker): *[ClusterChild](_cluster_instance_.clusterchild.md)*

*Defined in [src/cluster_instance.ts:11](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`worker` | Worker |

**Returns:** *[ClusterChild](_cluster_instance_.clusterchild.md)*

## Properties

### `Private` unExpectedExitListener

• **unExpectedExitListener**: *any* = null

*Defined in [src/cluster_instance.ts:11](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L11)*

___

### `Private` worker

• **worker**: *Worker*

*Defined in [src/cluster_instance.ts:13](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L13)*

## Methods

###  isAlive

▸ **isAlive**(): *boolean*

*Defined in [src/cluster_instance.ts:37](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L37)*

**Returns:** *boolean*

___

###  kill

▸ **kill**(): *Promise‹number›*

*Defined in [src/cluster_instance.ts:47](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L47)*

**Returns:** *Promise‹number›*

___

###  send

▸ **send**(`msg`: Serializable): *boolean*

*Defined in [src/cluster_instance.ts:33](https://github.com/claukers/script-pool/blob/b4310bf/src/cluster_instance.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | Serializable |

**Returns:** *boolean*
