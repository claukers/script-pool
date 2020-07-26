[script-pool](../README.md) › [Globals](../globals.md) › ["cluster"](../modules/_cluster_.md) › [ClusterWorker](_cluster_.clusterworker.md)

# Class: ClusterWorker

## Hierarchy

* EventEmitter

  ↳ **ClusterWorker**

## Implements

* [SendInterface](../interfaces/_cluster_.sendinterface.md)

## Index

### Constructors

* [constructor](_cluster_.clusterworker.md#constructor)

### Properties

* [clusterInstance](_cluster_.clusterworker.md#protected-clusterinstance)
* [pid](_cluster_.clusterworker.md#pid)
* [defaultMaxListeners](_cluster_.clusterworker.md#static-defaultmaxlisteners)
* [errorMonitor](_cluster_.clusterworker.md#static-errormonitor)

### Methods

* [addListener](_cluster_.clusterworker.md#addlistener)
* [emit](_cluster_.clusterworker.md#emit)
* [eventNames](_cluster_.clusterworker.md#eventnames)
* [getMaxListeners](_cluster_.clusterworker.md#getmaxlisteners)
* [listenerCount](_cluster_.clusterworker.md#listenercount)
* [listeners](_cluster_.clusterworker.md#listeners)
* [off](_cluster_.clusterworker.md#off)
* [on](_cluster_.clusterworker.md#on)
* [once](_cluster_.clusterworker.md#once)
* [prependListener](_cluster_.clusterworker.md#prependlistener)
* [prependOnceListener](_cluster_.clusterworker.md#prependoncelistener)
* [rawListeners](_cluster_.clusterworker.md#rawlisteners)
* [removeAllListeners](_cluster_.clusterworker.md#removealllisteners)
* [removeListener](_cluster_.clusterworker.md#removelistener)
* [send](_cluster_.clusterworker.md#send)
* [setMaxListeners](_cluster_.clusterworker.md#setmaxlisteners)
* [listenerCount](_cluster_.clusterworker.md#static-listenercount)

## Constructors

###  constructor

\+ **new ClusterWorker**(`clusterInstance`: ChildProcess, `pid`: any): *[ClusterWorker](_cluster_.clusterworker.md)*

*Overrides [SendInterface](../interfaces/_cluster_.sendinterface.md).[constructor](../interfaces/_cluster_.sendinterface.md#constructor)*

*Defined in [src/cluster.ts:21](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`clusterInstance` | ChildProcess |
`pid` | any |

**Returns:** *[ClusterWorker](_cluster_.clusterworker.md)*

## Properties

### `Protected` clusterInstance

• **clusterInstance**: *ChildProcess*

*Defined in [src/cluster.ts:23](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L23)*

___

###  pid

• **pid**: *any*

*Defined in [src/cluster.ts:23](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L23)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md).[defaultMaxListeners](../interfaces/_cluster_.sendinterface.md#static-defaultmaxlisteners)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[defaultMaxListeners](_util_.cancelableeventemitter.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:45

___

### `Static` errorMonitor

▪ **errorMonitor**: *keyof symbol*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md).[errorMonitor](../interfaces/_cluster_.sendinterface.md#static-errormonitor)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[errorMonitor](_util_.cancelableeventemitter.md#static-errormonitor)*

Defined in node_modules/@types/node/events.d.ts:55

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[addListener](_util_.cancelableeventemitter.md#addlistener)*

Defined in node_modules/@types/node/events.d.ts:62

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[emit](_util_.cancelableeventemitter.md#emit)*

Defined in node_modules/@types/node/events.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[eventNames](_util_.cancelableeventemitter.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[getMaxListeners](_util_.cancelableeventemitter.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[listenerCount](_util_.cancelableeventemitter.md#listenercount)*

Defined in node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[listeners](_util_.cancelableeventemitter.md#listeners)*

Defined in node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[off](_util_.cancelableeventemitter.md#off)*

Defined in node_modules/@types/node/events.d.ts:66

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[on](_util_.cancelableeventemitter.md#on)*

Defined in node_modules/@types/node/events.d.ts:63

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[once](_util_.cancelableeventemitter.md#once)*

Defined in node_modules/@types/node/events.d.ts:64

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[prependListener](_util_.cancelableeventemitter.md#prependlistener)*

Defined in node_modules/@types/node/events.d.ts:75

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[prependOnceListener](_util_.cancelableeventemitter.md#prependoncelistener)*

Defined in node_modules/@types/node/events.d.ts:76

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[rawListeners](_util_.cancelableeventemitter.md#rawlisteners)*

Defined in node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[removeAllListeners](_util_.cancelableeventemitter.md#removealllisteners)*

Defined in node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[removeListener](_util_.cancelableeventemitter.md#removelistener)*

Defined in node_modules/@types/node/events.d.ts:65

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  send

▸ **send**(`m`: object): *boolean*

*Defined in [src/cluster.ts:27](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | object |

**Returns:** *boolean*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[setMaxListeners](_util_.cancelableeventemitter.md#setmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Implementation of [SendInterface](../interfaces/_cluster_.sendinterface.md)*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[listenerCount](_util_.cancelableeventemitter.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:44

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
