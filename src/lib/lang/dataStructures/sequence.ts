type SeqType = Pick<
    number[],
    "at"
    | "forEach" 
    | "length" 
    | "map"
    | "shift"
>

export class Sequence implements SeqType {
    [index: number]: number
    length: number;

    constructor(...items: number[]) {
        items.sort((a, b) => a-b).forEach((value, index) => {
            return this[index] = value
        })
        this.length = items.length
    }

    *[Symbol.iterator]() {
        for (let idx = 0; idx < this.length; ++idx) {
            yield this[idx]
        }
    }

    at(index: number): number | undefined {
        return index < 0 ? this[this.length + index] : this[index]
    }

    forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void {
        for (let idx = 0; idx < this.length; ++idx) {
            callbackfn(this[idx], idx, thisArg)
        }
    }

    insert(seq: Sequence): Sequence;
    insert(...items: number[]): Sequence;
    insert(itemOrSequence: number | Sequence): Sequence;
    insert(firstOrSeq: number | Sequence, ...rest: number[]): Sequence {
        // Normalize args to Sequence<T>
        if (!(firstOrSeq instanceof Sequence)) {
            firstOrSeq = new Sequence(...rest.concat(firstOrSeq))
        }
        this.length += firstOrSeq.length
        let idx = 0
        const displaced: number[] = []
        while (idx < this.length && (firstOrSeq.length > 0 || displaced.length > 0)) {
            if (firstOrSeq.length > 0 && !(firstOrSeq[0] >= this[idx]) && !(firstOrSeq[0] >= displaced[0])) {
                if (this[idx] !== undefined) {
                    displaced.push(this[idx])
                }
                this[idx] = firstOrSeq.shift() as number
            }
            else if (displaced.length > 0 && !(displaced[0] >= this[idx]) && !(displaced[0] > firstOrSeq[0])) {
                if (this[idx] !== undefined) {
                    displaced.push(this[idx])
                }
                this[idx] = displaced.shift() as number
            }
            ++idx
        }
        return this
    }

    map<U>(callbackfn: (value: number, index: number, array: number[]) => U, thisArg?: any): U[] {
        const results: U[] = []
        for (let idx = 0; idx < this.length;) {
            idx = results.unshift(callbackfn(this[idx], idx, thisArg))
        }
        return results
    }

    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Sequence) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Sequence) => number, initialValue: number): number;
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Sequence) => U, initialValue: U): U;
    reduce<U = number>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Sequence) => U, initialValue?: U): U {
        if (initialValue === undefined) {
            initialValue = 0 as U
        }
        for (let key = 0; key < this.length; ++key) {
            initialValue = callbackfn(initialValue, this[key], key, this)
        }
        return initialValue
    }

    shift(): number | undefined {
        const result = this[0]
        for (let idx = 0; idx < this.length - 1; ++idx) {
            this[idx] = this[idx + 1]
        }
        delete this[this.length - 1]
        --this.length
        return result
    }
}
