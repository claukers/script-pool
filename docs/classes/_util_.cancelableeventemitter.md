[script-pool](../README.md) › [Globals](../globals.md) › ["util"](../modules/_util_.md) › [CancelableEventEmitter](_util_.cancelableeventemitter.md)

# Class: CancelableEventEmitter

## Hierarchy

* EventEmitter

  ↳ **CancelableEventEmitter**

## Implements

* [Cancelable](../interfaces/_util_.cancelable.md)

## Index

### Constructors

* [constructor](_util_.cancelableeventemitter.md#constructor)

### Properties

* [defaultMaxListeners](_util_.cancelableeventemitter.md#static-defaultmaxlisteners)
* [errorMonitor](_util_.cancelableeventemitter.md#static-errormonitor)

### Methods

* [addListener](_util_.cancelableeventemitter.md#addlistener)
* [cancel](_util_.cancelableeventemitter.md#cancel)
* [emit](_util_.cancelableeventemitter.md#emit)
* [eventNames](_util_.cancelableeventemitter.md#eventnames)
* [getMaxListeners](_util_.cancelableeventemitter.md#getmaxlisteners)
* [listenerCount](_util_.cancelableeventemitter.md#listenercount)
* [listeners](_util_.cancelableeventemitter.md#listeners)
* [off](_util_.cancelableeventemitter.md#off)
* [on](_util_.cancelableeventemitter.md#on)
* [once](_util_.cancelableeventemitter.md#once)
* [prependListener](_util_.cancelableeventemitter.md#prependlistener)
* [prependOnceListener](_util_.cancelableeventemitter.md#prependoncelistener)
* [rawListeners](_util_.cancelableeventemitter.md#rawlisteners)
* [removeAllListeners](_util_.cancelableeventemitter.md#removealllisteners)
* [removeListener](_util_.cancelableeventemitter.md#removelistener)
* [setMaxListeners](_util_.cancelableeventemitter.md#setmaxlisteners)
* [listenerCount](_util_.cancelableeventemitter.md#static-listenercount)

## Constructors

###  constructor

\+ **new CancelableEventEmitter**(): *[CancelableEventEmitter](_util_.cancelableeventemitter.md)*

*Overrides [SendInterface](../interfaces/_cluster_.sendinterface.md).[constructor](../interfaces/_cluster_.sendinterface.md#constructor)*

*Defined in [src/util.ts:62](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L62)*

**Returns:** *[CancelableEventEmitter](_util_.cancelableeventemitter.md)*

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[defaultMaxListeners](_util_.cancelableeventemitter.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:45

___

### `Static` errorMonitor

▪ **errorMonitor**: *keyof symbol*

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

###  cancel

▸ **cancel**(): *Promise‹void›*

*Defined in [src/util.ts:67](https://github.com/claukers/script-pool/blob/b4310bf/src/util.ts#L67)*

**Returns:** *Promise‹void›*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

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

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[eventNames](_util_.cancelableeventemitter.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[getMaxListeners](_util_.cancelableeventemitter.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

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

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

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

*Inherited from [CancelableEventEmitter](_util_.cancelableeventemitter.md).[listenerCount](_util_.cancelableeventemitter.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:44

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
