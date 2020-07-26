[script-pool](../README.md) › [Globals](../globals.md) › ["util"](_util_.md)

# Module: "util"

## Index

### Classes

* [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md)

### Interfaces

* [CallScriptArgs](../interfaces/_util_.callscriptargs.md)
* [Cancelable](../interfaces/_util_.cancelable.md)
* [DataMap](../interfaces/_util_.datamap.md)
* [ScheduleCallScriptOptions](../interfaces/_util_.schedulecallscriptoptions.md)
* [SendScriptDataOptions](../interfaces/_util_.sendscriptdataoptions.md)
* [WaitScriptResponseOptions](../interfaces/_util_.waitscriptresponseoptions.md)

### Type aliases

* [OnScriptDataOptions](_util_.md#onscriptdataoptions)

### Functions

* [callScript](_util_.md#const-callscript)
* [cancelAutoRestart](_util_.md#const-cancelautorestart)
* [onScriptData](_util_.md#const-onscriptdata)
* [sendScriptData](_util_.md#const-sendscriptdata)
* [setupAutoRestart](_util_.md#const-setupautorestart)
* [waitScriptExit](_util_.md#const-waitscriptexit)
* [waitScriptResponse](_util_.md#const-waitscriptresponse)

## Type aliases

###  OnScriptDataOptions

Ƭ **OnScriptDataOptions**: *function*

*Defined in [src/util.ts:73](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L73)*

#### Type declaration:

▸ (`data`: any): *Promise‹any | void›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

## Functions

### `Const` callScript

▸ **callScript**(`__namedParameters`: object): *Promise‹any›*

*Defined in [src/util.ts:180](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L180)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`args` | string[] |
`data` | object |
`env` | object |
`modulePath` | string |
`noExitWait` | boolean |
`noKillOnError` | boolean |
`timeoutMS` | number |

**Returns:** *Promise‹any›*

___

### `Const` cancelAutoRestart

▸ **cancelAutoRestart**(`pool`: Pool‹[ClusterWorker](../classes/_cluster_.clusterworker.md) | ChildProcess›): *Promise‹Pool‹ChildProcess | [ClusterWorker](../classes/_cluster_.clusterworker.md)››*

*Defined in [src/util.ts:35](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`pool` | Pool‹[ClusterWorker](../classes/_cluster_.clusterworker.md) &#124; ChildProcess› |

**Returns:** *Promise‹Pool‹ChildProcess | [ClusterWorker](../classes/_cluster_.clusterworker.md)››*

___

### `Const` onScriptData

▸ **onScriptData**(`cb`: [OnScriptDataOptions](_util_.md#onscriptdataoptions)): *[CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md)*

*Defined in [src/util.ts:88](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [OnScriptDataOptions](_util_.md#onscriptdataoptions) |

**Returns:** *[CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md)*

___

### `Const` sendScriptData

▸ **sendScriptData**(`__namedParameters`: object): *Promise‹string›*

*Defined in [src/util.ts:121](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L121)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`child` | ChildProcess‹› &#124; [SendInterface](../interfaces/_cluster_.sendinterface.md)‹› |
`data` | [DataMap](../interfaces/_util_.datamap.md) |

**Returns:** *Promise‹string›*

___

### `Const` setupAutoRestart

▸ **setupAutoRestart**(`pool`: Pool‹ChildProcess | [ClusterWorker](../classes/_cluster_.clusterworker.md)›, `timeout`: number, `internalCall`: boolean): *Promise‹Pool‹ChildProcess | [ClusterWorker](../classes/_cluster_.clusterworker.md)››*

*Defined in [src/util.ts:8](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L8)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`pool` | Pool‹ChildProcess &#124; [ClusterWorker](../classes/_cluster_.clusterworker.md)› | - |
`timeout` | number | - |
`internalCall` | boolean | false |

**Returns:** *Promise‹Pool‹ChildProcess | [ClusterWorker](../classes/_cluster_.clusterworker.md)››*

___

### `Const` waitScriptExit

▸ **waitScriptExit**(`child`: ChildProcess): *Promise‹void›*

*Defined in [src/util.ts:165](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | ChildProcess |

**Returns:** *Promise‹void›*

___

### `Const` waitScriptResponse

▸ **waitScriptResponse**(`__namedParameters`: object): *Promise‹any | void›*

*Defined in [src/util.ts:140](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L140)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`child` | ChildProcess‹› &#124; [SendInterface](../interfaces/_cluster_.sendinterface.md)‹› |
`data` | [DataMap](../interfaces/_util_.datamap.md) |
`timeoutMS` | number |

**Returns:** *Promise‹any | void›*
