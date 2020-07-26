[script-pool](../README.md) › [Globals](../globals.md) › ["cluster"](../modules/_cluster_.md) › [SendInterface](_cluster_.sendinterface.md)

# Interface: SendInterface

## Hierarchy

* EventEmitter

  ↳ **SendInterface**

## Implemented by

* [ClusterWorker](../classes/_cluster_.clusterworker.md)

## Index

### Constructors

* [constructor](_cluster_.sendinterface.md#constructor)

### Properties

* [defaultMaxListeners](_cluster_.sendinterface.md#static-defaultmaxlisteners)
* [errorMonitor](_cluster_.sendinterface.md#static-errormonitor)

### Methods

* [addListener](_cluster_.sendinterface.md#addlistener)
* [emit](_cluster_.sendinterface.md#emit)
* [eventNames](_cluster_.sendinterface.md#eventnames)
* [getMaxListeners](_cluster_.sendinterface.md#getmaxlisteners)
* [listenerCount](_cluster_.sendinterface.md#listenercount)
* [listeners](_cluster_.sendinterface.md#listeners)
* [off](_cluster_.sendinterface.md#off)
* [on](_cluster_.sendinterface.md#on)
* [once](_cluster_.sendinterface.md#once)
* [prependListener](_cluster_.sendinterface.md#prependlistener)
* [prependOnceListener](_cluster_.sendinterface.md#prependoncelistener)
* [rawListeners](_cluster_.sendinterface.md#rawlisteners)
* [removeAllListeners](_cluster_.sendinterface.md#removealllisteners)
* [removeListener](_cluster_.sendinterface.md#removelistener)
* [send](_cluster_.sendinterface.md#send)
* [setMaxListeners](_cluster_.sendinterface.md#setmaxlisteners)
* [listenerCount](_cluster_.sendinterface.md#static-listenercount)

## Constructors

###  constructor

\+ **new SendInterface**(`options?`: EventEmitterOptions): *[SendInterface](_cluster_.sendinterface.md)*

*Inherited from [SendInterface](_cluster_.sendinterface.md).[constructor](_cluster_.sendinterface.md#constructor)*

Defined in node_modules/@types/node/events.d.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`options?` | EventEmitterOptions |

**Returns:** *[SendInterface](_cluster_.sendinterface.md)*

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[defaultMaxListeners](../classes/_util_.cancelableeventemitter.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:45

___

### `Static` errorMonitor

▪ **errorMonitor**: *keyof symbol*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[errorMonitor](../classes/_util_.cancelableeventemitter.md#static-errormonitor)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[addListener](../classes/_util_.cancelableeventemitter.md#addlistener)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[emit](../classes/_util_.cancelableeventemitter.md#emit)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[eventNames](../classes/_util_.cancelableeventemitter.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[getMaxListeners](../classes/_util_.cancelableeventemitter.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[listenerCount](../classes/_util_.cancelableeventemitter.md#listenercount)*

Defined in node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[listeners](../classes/_util_.cancelableeventemitter.md#listeners)*

Defined in node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[off](../classes/_util_.cancelableeventemitter.md#off)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[on](../classes/_util_.cancelableeventemitter.md#on)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[once](../classes/_util_.cancelableeventemitter.md#once)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[prependListener](../classes/_util_.cancelableeventemitter.md#prependlistener)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[prependOnceListener](../classes/_util_.cancelableeventemitter.md#prependoncelistener)*

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

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[rawListeners](../classes/_util_.cancelableeventemitter.md#rawlisteners)*

Defined in node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[removeAllListeners](../classes/_util_.cancelableeventemitter.md#removealllisteners)*

Defined in node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[removeListener](../classes/_util_.cancelableeventemitter.md#removelistener)*

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

*Defined in [src/cluster.ts:18](https://github.com/claukers/script-pool/blob/4ec84bc/src/cluster.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | object |

**Returns:** *boolean*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[setMaxListeners](../classes/_util_.cancelableeventemitter.md#setmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [CancelableEventEmitter](../classes/_util_.cancelableeventemitter.md).[listenerCount](../classes/_util_.cancelableeventemitter.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:44

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
