
// Insertion Sort
function insertionSort(arr) {

    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }

    return arr;
}


// Modified insertion sort to place each iteration and details within a JavaScript object
function captureInsertionSort(arr) {

    let n = arr.length;
    let iterArr = [];
    let numIterations = 0;
    let numSwaps = 0;
    let numComparisons = 0;

    for (let i = 1; i < n; i++) {
        numIterations++;
        numComparisons = 0;
        numSwaps = 0;
        let key = arr[i];
        let j = i - 1;
        
        numComparisons++;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            numSwaps++;
        }
        arr[j + 1] = key;

        if (numSwaps > 0) {
            numSwaps = 1;
        }

        // Push copy of current array to iterations array object
        const iterArrObj = {};
        iterArrObj.iteration = numIterations;
        iterArrObj.comparisons = numComparisons;
        iterArrObj.swaps = numSwaps;
        iterArrObj.array = [...arr];
        iterArr.push(iterArrObj);
    }

    return iterArr;
}

export { insertionSort, captureInsertionSort };