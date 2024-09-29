
function quickSort(arr, left = 0, right = arr.length - 1) {

    if (left < right) {
        let pivotIdx = partition(arr, left, right);
        quickSort(arr, left, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, right);
    }

    return arr;
}

function partition(arr, start, end) {
    
    let pivot = arr[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;

            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, end);

    return i + 1;
}

let currCall = 0;
let partitionObjArr = [];

function captureQuickSort(arr, left = 0, right = arr.length - 1) {

    currCall++;
    console.log(`[${currCall}] quickSort([${arr}], left(${left}), right(${right})) >> [${arr.slice(left, right+1)}]`);

    // Get the partition information
    const partitionObj = {};
    partitionObj.partition = arr.slice(left, right+1);

    if (partitionObj.partition.length > 0){
        partitionObj.pivot = partitionObj.partition[partitionObj.partition.length-1];
        partitionObj.level = currCall;
        partitionObjArr.push(partitionObj);
    }

    if (left < right) {

        // Get the partition information
        let pivotIdx = capturePartition(arr, left, right);

        // Recursive call to quicksort for left partition
        captureQuickSort(arr, left, pivotIdx - 1);
        // Recursive call to quicksort for right partition
        captureQuickSort(arr, pivotIdx + 1, right);
    }

    // Decrement the level counter
    currCall--;
    return arr;
}

// Functions to get and clear the partition object array
const getPartitionObjArray = () => { return partitionObjArr; };
const clearPartitionObjArray = () => { partitionObjArr = []; };


// Partition function
function capturePartition(arr, start, end) {
    
    let pivot = arr[end];
    let i = start - 1;
    console.log(`partition([${arr}], ${start}, ${end}) >> [${arr.slice(start, end+1)}] >> pivot = ${pivot}`);

    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, end);

    return i + 1;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export { quickSort, captureQuickSort, getPartitionObjArray, clearPartitionObjArray };

