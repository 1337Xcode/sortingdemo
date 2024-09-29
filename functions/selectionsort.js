
// Selection Sort
function selectionSort(arr) {
    
    let n = arr.length;
        
    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}

// Modified selection sort to place each iteration and details within a JavaScript object
function captureSelectionSort(arr) {
    
    let n = arr.length;
    let iterArr = [];
    let numIterations = 0;
    let numSwaps = 0;
    let numComparisons = 0;
        
    for (let i = 0; i < n - 1; i++) {
        numIterations++;
        numComparisons = 0;
        numSwaps = 0;

        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            numComparisons++;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            numSwaps++;
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

export { selectionSort, captureSelectionSort };