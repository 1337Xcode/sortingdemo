
// Bubble Sort
function bubbleSort(arr) {
    
    let n = arr.length;
    let flag = true;
    let temp;

    console.log(`n = ${n}`);

    console.log(`flag = ${flag}`);

    while (flag) {
        flag = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                flag = true;
            }
        }
    }

    return arr;
}

// Modified bubble sort to place each iteration and details within a JavaScript object
function captureBubbleSort(arr) {
    
    let n = arr.length;
    let flag = true;
    let temp;
    let iterArr = [];
    let numIterations = 0;
    let numSwaps = 0;
    let numComparisons = 0;

    while (flag) {
        numIterations++;
        numComparisons = 0;
        numSwaps = 0;
        flag = false;
        for (let i = 0; i < n - 1; i++) {
            numComparisons++;
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                flag = true;
                numSwaps++;
            }
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

export { bubbleSort, captureBubbleSort };