const majorityElement = (arrUnsorted: number[]):number => {
    const arrayLength = arrUnsorted.length;
    if (arrayLength) {
        const arr = arrUnsorted.sort();
        const middle = Math.ceil(arrayLength / 2);
        const rightMiddleElement = arr[middle - 1];
        const leftMiddleElement = arrayLength % 2 ?
            rightMiddleElement :
            arr[middle];
        console.log(arr, leftMiddleElement, rightMiddleElement)
        if (leftMiddleElement === arr[0]) {
            return leftMiddleElement;
        }
        if (rightMiddleElement === arr[arrayLength - 1]) {
            return rightMiddleElement;
        }
    }
    return -1;
}

console.assert(majorityElement([4,5,6,3,5,3,3,3,3,3]) === 3);
console.assert(majorityElement([1]) === 1);
console.assert(majorityElement([1,2,3]) === -1);
console.assert(majorityElement([0,0,2,2]) === -1);
console.assert(majorityElement([0,2,2,2]) === 2);
console.assert(majorityElement([0,0,0,2]) === 0);
