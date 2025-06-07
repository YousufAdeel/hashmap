function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
}

class HashMap {
    constructor(loadFactor = 0.75) {
        this.capacity = 8;
        this.loadFactor = loadFactor;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    set(key, value) {
        const index = this._getIndex(key);
        const bucket = this.buckets[index];

        for (let entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    _getIndex(key) {
        const hashCode = hash(key);
        return Math.abs(hashCode) % this.capacity;
    }

    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    
        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
    
    get(key) {
        const index = this._getIndex(key);
        const bucket = this.buckets[index];
        
        for (let entry of bucket) {
            if (entry[0] === key) {
                return entry[1];
            }
        }

        return null;
    }

    has(key) {
        const index = this._getIndex(key);
        const bucket = this.buckets[index];

        for (let entry of bucket) {
            if (entry[0] === key) {
                return true;
            }
        }

        return false
    }

    remove(key) {
        const index = this._getIndex(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 8;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const allKeys = [];

        for (let bucket of this.buckets) {
            for (let [key, _] of bucket) {
                allKeys.push(key);
            }
        }

        return allKeys;
    }

    values() {
        const allValues = [];
        
        for (let bucket of this.buckets) {
            for (let [_, value] of bucket) {
                allValues.push(value);
            }
        }

        return allValues;
    }

    entries() {
        const allEntries = [];

        for (let bucket of this.buckets) {
            for (let [key, value] of bucket) {
                allEntries.push([key, value]);
            }
        }

        return allEntries;
    }
}

const test = new HashMap()

test.set('apple', 'dark red');
test.set('banana', 'light yellow');
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'navy')
test.set('kite', 'neon pink');
test.set('lion', 'gold');
test.set('moon', 'silver');

console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
console.log("Has 'moon'?", test.has("moon"));
console.log("Get 'jacket':", test.get("jacket"));
console.log("Remove 'dog':", test.remove("dog"));
console.log("Final Length:", test.length());