﻿export function Range(from: number | Date, to: number | Date, msg?: string) {
    // the original decorator
    function rangeInternal(target: Object, property: string | symbol): void {
        new rangeInternalSetup(target, property.toString(), from, to, msg);
    }

    // return the decorator
    return rangeInternal;
}

class rangeInternalSetup {

    constructor(public target: any,
                public key: string,
                public from: number | Date,
                public to: number | Date,
                public msg?: string) {
        // property value

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasRangeFrom__${key}`, {
            value: this.from,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__hasRangeTo__${key}`, {
            value: this.to,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errRange__${key}`, {
            value: this.msg 
               || `The field ${this.key} does not fall into the range from ${this.from} to ${this.to}`,
            enumerable: false,
            configurable: false
        });

    }


}