const majorityElement = (arrUnsorted: number[]):number => {
    if (arrUnsorted.length) {
        const arr = arrUnsorted.sort();
        const middle = Math.floor(arr.length / 2);
        const middleElement = arr[middle];
        if (middleElement === arr[0] || middleElement === arr[arr.length - 1]) {
            return middleElement;
        }
    }
    return -1;
}

console.assert(majorityElement([4,5,6,3,5,3,3,3,3,3]) === 3);
console.assert(majorityElement([1]) === 1);
console.assert(majorityElement([1,2,3]) === -1);
