
import { captureBubbleSort } from "./bubblesort.js";
import { captureSelectionSort } from "./selectionsort.js";
import { captureInsertionSort } from "./insertionsort.js";
import { captureQuickSort, clearPartitionObjArray, getPartitionObjArray } from "./quicksort.js";


let randomArr = [];
let sortedArr = [];

// Generate array of random (size) integers between min (inclusive) and max (inclusive)
function generateRandomArray(size = 10, min = 1, max = 100) {
    console.log('Size = ' + size);
    let arr = [];
    while (arr.length < size) {
        let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!arr.includes(randomInt)) {
            arr.push(randomInt);
        }
    }
    return arr;
}


// Display the array in HTML element with ID name
function displayArray(arr, name) {
    console.log('Array for Display', arr);
    var element = document.getElementById(`${name}`);
    element.innerText = arr.join(', ');
}


// Display number of iterations in HTML element with ID name
function displayNumIterations(num, name) {
    const parent = document.getElementById(`${name}`);
    const newTitle = `${num} Iterations of Sort`;
    parent.innerHTML = newTitle;
}


// Display single iteration in HTML element with ID name
function displayIteration(obj, name) {
    const parent = document.getElementById(`${name}`);
    const newIter = document.createElement('p');
    newIter.classList.add('single-iteration');
    newIter.innerHTML = `${obj.array.join(', ')} (${obj.swaps} swaps)`;
    parent.appendChild(newIter);
}

// Clear display of all iterations of sort and reset title
function clearIterations() {
    const title = document.getElementById('numiterations');
    if (title) {
        const newTitle = `Iterations of Sort`;
        title.innerHTML = newTitle;
    
        const parent = document.getElementById('iterations');
        const element = parent.querySelectorAll('.single-iteration');
        [...element].forEach((iteration) => {
            iteration.remove();
        });
    } else { // Special case for quicksort partitions

        clearPartitionObjArray();

        const title = document.getElementById('numpartitions');
        const newTitle = `Partitions`;
        title.innerHTML = newTitle;

        const parent = document.getElementById('partitions');
        const element = parent.querySelectorAll('.single-partition');
        [...element].forEach((iteration) => {
            iteration.remove();
        });

        const sortedTitleParent = document.getElementById('sortedarraytitle');
        if (sortedTitleParent) {
            sortedTitleParent.innerHTML = '';
        }

        const sortedArrayParent = document.getElementById('sortedarray');
        if (sortedArrayParent) {
            sortedArrayParent.innerHTML = '';
        }
    }
}

// Display the number of partitions
function displayNumPartitions(num) {
    const parent = document.getElementById('numpartitions');
    const newTitle = `${num} Partitions Used`;
    parent.innerHTML = newTitle;
}

// Display the partitions used during quicksort
function displayPartitions(partitionObj) {

    const elementArr = [];

    // Create an array of HTML elements
    partitionObj.forEach((obj) => {

        const partitionArr = obj.partition;
        const partitionLength = partitionArr.length;
        const pivotVal = obj.pivot;
        const level = obj.level;

        const details = document.createElement('p');
        details.classList.add('single-partition');

        if (partitionLength > 1) {
            const tempArr = partitionArr.slice(0, partitionArr.length-1);
            details.innerHTML = `[ ${tempArr.join(', ')}, <span style="color:red">${pivotVal}</span> ]`;
        } else {
            details.innerHTML = `[ ${pivotVal} ]`;
        }

        if (elementArr[level-1]) {
            const currElement = elementArr[level-1];
            details.innerHTML = currElement.innerHTML + `<span style="padding-right: 20px"></span>` + details.innerHTML;
            elementArr[level-1] = details;
        } else {
            elementArr[level-1] = details;
        }
    });

    console.log(elementArr);

    // Use the DOM to display each element from the elements array
    elementArr.forEach((element) => {
        const parent = document.getElementById('partitions');
        parent.appendChild(element);
    });
}

// Display the sorted array from quicksort
function displayQuicksortArray(sorted) {
    const parent = document.getElementById('sortedarraytitle');
    const newTitle = `Sorted Array`;
    parent.innerHTML = newTitle;

    const arrayParent = document.getElementById('sortedarray');
    const newParagraph = `${sorted.join(', ')}`;
    arrayParent.innerHTML = newParagraph;
}

// Register the event handlers
function registerEventHandlers() {
    const genBtn = document.getElementById("generateBtn");
    console.log(`${genBtn.id} event listener added`);
    genBtn.addEventListener('click', () => {
        randomArr = generateRandomArray(10); 
        displayArray(randomArr, 'vals');
        clearIterations();

        // Enable the iteration button
        const element = document.getElementById('iterateBtn');
        element.disabled = false;

    });

    const iterBtn = document.getElementById("iterateBtn");
    console.log(`${iterBtn.id} event listener added`);
    iterBtn.addEventListener('click', () => {

        // Get the value from the button to determine sort to use
        const element = document.getElementById('iterateBtn');

        // Disable the iterate button
        element.disabled = true;

        const value = element.getAttribute('value');
        console.log(`Sort requested is ${value} sort!`);
        if (value === 'bubble') {
            sortedArr = captureBubbleSort(randomArr); 
        } else if (value === 'selection') {
            sortedArr = captureSelectionSort(randomArr); 
        } else if (value === 'insertion') {
            sortedArr = captureInsertionSort(randomArr); 
        } else if (value === 'quick') {
            sortedArr = captureQuickSort(randomArr);
        }

        // Display the title with the number of iterations (except quicksort)
        if (value !== 'quick') {

            const numIterations = sortedArr.length;
            displayNumIterations(numIterations, 'numiterations');
            
            // Display each iteration of the sort
            sortedArr.forEach((iteration) => {
                displayIteration(iteration, 'iterations');
            });

        } else {

            // Special case for quicksort (to display the partitons)

            const partitionObjArr = getPartitionObjArray();
            console.log(partitionObjArr);
            const numPartitions = partitionObjArr.length;
            displayNumPartitions(numPartitions);

            // Display each partition and corresponding pivot 
           displayPartitions(partitionObjArr);

           // Display the sorted array
           displayQuicksortArray(sortedArr);

        }
    });
}

// Self-invoking function for initialisation
(function init() {
    console.log("init called");
    randomArr = generateRandomArray();
    displayArray(randomArr, 'vals');
})();

// Export registerEventHandlers
export { registerEventHandlers };




