let array = [1]
let arrayLength = 25
let modes = {initial: 1, sorting: 2, done: 3}
let algorithms = {
    quickSort: {key: 2, name: "Quick Sort", description: `The time complexity of Quick Sort is O(n^2) in worst case and O(n*Log n) in average and best cases. The in-place version of quicksort has a space complexity of O(log n), even in the worst case. This unstable partition requires O(1) space. <br> <a href="https://youtu.be/Hoixgm4-P4M" target="_blank">Learn more...</a>`},
    bubbleSort: {key: 3, name: "Bubble Sort", description: `The time complexity of Bubble Sort is O(n^2) in worst and average cases and O(n) in best case. It has the space complexity of O(1). <br> <a href="https://youtu.be/xli_FI7CuzA" target="_blank">Learn more...</a>`},
    selectionSort: {key: 4, name: "Selection Sort", description: `The time complexity of Selection Sort is O(n^2) in worst and average cases and O(n^2) in best case. It has the space complexity of O(1). <br> <a href="https://youtu.be/g-PGLbMth_g" target="_blank">Learn more...</a>`},
    insertionSort: {key: 5, name: "Insertion Sort", description: `The time complexity of Insertion Sort is O(n^2) in all the 3 cases (worst, average and best). It has the space complexity of O(1). <br> <a href="https://youtu.be/JU767SDMDvA" target="_blank">Learn more...</a>`},
}
let indicatorPanelContent = {
    quickSort: `<div class="node node-sorted node-example ml-3" id="sorted_node_example"></div><div class="text-light ml-2">Sorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-unsorted node-example ml-3" id="unsorted_node_example"></div><div class="text-light ml-2">Unsorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-pivot ml-3" id="pivot_node_example"></div><div class="text-light ml-2">Pivot</div>
                <div class="ml-3 text-light">|</div>`,
    bubbleSort: `<div class="node node-sorted node-example ml-3" id="sorted_node_example"></div><div class="text-light ml-2">Sorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-unsorted node-example ml-3" id="unsorted_node_example"></div><div class="text-light ml-2">Unsorted</div>
                <div class="ml-3 text-light">|</div>`,
    selectionSort: `<div class="node node-position ml-3" id="position_node_example"></div><div class="text-light ml-2">Position</div>
                    <div class="ml-3 text-light">|</div>
                    <div class="node node-minimum ml-3" id="minimum_node_example"></div><div class="text-light ml-2">Minimum</div>
                    <div class="ml-3 text-light">|</div>`,
    insertionSort: `<div class="node node-position ml-3" id="position_node_example"></div><div class="text-light ml-2">Position</div>
                    <div class="ml-3 text-light">|</div>
                    <div class="node node-scanner ml-3" id="scanner_node_example"></div><div class="text-light ml-2">Scanner</div>
                    <div class="ml-3 text-light">|</div>`,
}
let mode = modes.initial
let algorithm = algorithms.quickSort // Updated to quickSort

const SEARCH_TIME = 20000
const RUNNING_SORTING_MESSAGE = "Sorting is ongoing"

document.addEventListener('DOMContentLoaded', () => {
    array = generateArray(arrayLength)
    showAlgorithmList()
    updateVisualizerButton()
    updateIndicatorPanel()
    updateAlgorithmInfo()
    plotGraph()
    handleUserEvent()
})

function handleUserEvent () {
    algorithmInputHandler()
    visualizerButtonHandler()
    resetButtonHandler()
    algorithmInfoHandler()
    customInputHandler()
}

function showAlgorithmList() {
    let algorithmList = document.querySelector('#algorithm_list')
    Object.keys(algorithms).map(index => {
        algorithmList.insertAdjacentHTML('beforeend', `<a class="dropdown-item cursor-pointer" id="algorithm_${algorithms[index].key}">${algorithms[index].name}</a>`)
    })
}
function algorithmInputHandler() {
    let quickSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.quickSort.key}`)
    quickSortAlgorithm.addEventListener('click', () => {
        if (mode === modes.initial || mode === modes.done) {
            algorithm = algorithms.quickSort
            updateVisualizerButton()
            updateIndicatorPanel()
            updateAlgorithmInfo()
        }
    })
    let bubbleSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.bubbleSort.key}`)
    bubbleSortAlgorithm.addEventListener('click', () => {
        if (mode === modes.initial || mode === modes.done) {
            algorithm = algorithms.bubbleSort
            updateVisualizerButton()
            updateIndicatorPanel()
            updateAlgorithmInfo()
        }
    })
    let selectionSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.selectionSort.key}`)
    selectionSortAlgorithm.addEventListener('click', () => {
        if (mode === modes.initial || mode === modes.done) {
            algorithm = algorithms.selectionSort
            updateVisualizerButton()
            updateIndicatorPanel()
            updateAlgorithmInfo()
        }
    })
    let insertionSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.insertionSort.key}`)
    insertionSortAlgorithm.addEventListener('click', () => {
        if (mode === modes.initial || mode === modes.done) {
            algorithm = algorithms.insertionSort
            updateVisualizerButton()
            updateIndicatorPanel()
            updateAlgorithmInfo()
        }
    })
}

function visualizerButtonHandler() {
    let visualizerButton = document.querySelector('#start_btn')
    let statusMessage = document.querySelector('#status_message')
    visualizerButton.addEventListener('click', async event => {
        if (mode === modes.initial || mode === modes.done) {
            mode = modes.sorting
            statusMessage.innerHTML = ''
            statusMessage.insertAdjacentHTML('beforeend', `Sorting <i class="fas fa-spinner"></i>`)
            let animation = []
            let movesCount = 0
            if (algorithm.key === algorithms.quickSort.key) {
                quickSort.sort([...array], animation)
                await barVisualizer.quickSort(animation)
                movesCount = animation.filter(set => !set.sorted).length
            } else if (algorithm.key === algorithms.bubbleSort.key) {
                bubbleSort.sort([...array], animation)
                await barVisualizer.bubbleSort(animation)
                movesCount = animation.filter(set => !set.sorted).length
            } else if (algorithm.key === algorithms.selectionSort.key) {
                selectionSort.sort([...array], animation)
                await barVisualizer.selectionSort(animation)
                movesCount = animation.filter(set => !set.sorted).length
            } else if (algorithm.key === algorithms.insertionSort.key) {
                insertionSort.sort([...array], animation)
                await barVisualizer.insertionSort(animation)
                movesCount = animation.filter(set => !set.sorted).length
            }
            statusMessage.innerHTML = `Sorting Completed | Total Moves: ${movesCount}`
            mode = modes.done
        }
    })
}

function resetButtonHandler () {
    let graphBody = document.querySelector('#graph_body')
    let resetButton = document.querySelector('#reset_btn')
    resetButton.addEventListener('click', async event => {
        if (mode===modes.initial||mode===modes.done){
            let statusMessage = document.querySelector('#status_message')
            statusMessage.innerHTML = ''
            array = generateArray(arrayLength)
            graphBody.innerHTML = ''
            plotGraph()
            mode = modes.initial
        }
    })
}

function customInputHandler() {
    let customInputButton = document.querySelector('#custom_input_btn')
    customInputButton.addEventListener('click', event => {
        if (mode===modes.initial||mode===modes.done){
            let customInput = document.querySelector('#custom_input')
            customInput.style.display = "flex"
        }
        else alert(RUNNING_SORTING_MESSAGE)
    })
    let customInputCancelButton = document.querySelector('#custom_input_cancel_btn')
    customInputCancelButton.addEventListener('click', event => {
        let customInput = document.querySelector('#custom_input')
        customInput.style.display = "none"
    })
    let customInputSubmitButton = document.querySelector('#custom_input_submit_btn')
    customInputSubmitButton.addEventListener('click', event => {
        let customInputField = document.querySelector('#custom_input_field')
        let input = customInputField.value
        input = input.split(',').map(value => {
            let number = Number(value)
            if (number<5) number = 5
            if (number>500) number =500
            return number
        })
        if (input.includes(NaN)) alert('Invalid Input')
        else {
            array = input
            arrayLength = array.length
            plotGraph()
            customInputCancelButton.click()
        }
    })
}

function algorithmInfoHandler() {
    let algorithmInfoButton = document.querySelector('#graph_header').querySelector('.algorithm-info-btn')
    algorithmInfoButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        algorithmInfo.style.display = "flex"
    })
    let algorithmInfoCancelButton = document.querySelector('#algorithm_info_cancel_btn')
    algorithmInfoCancelButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        algorithmInfo.style.display = "none"
    })
}

function updateVisualizerButton() {
    let visualizerButton = document.querySelector('#start_btn')
    visualizerButton.innerHTML = `Start ${algorithm.name}`
    let algorithmMessage = document.querySelector('#algorithm_message')
    algorithmMessage.innerHTML = `${algorithm.name} Algorithm`
    let statusMessage = document.querySelector('#status_message')
    statusMessage.innerHTML = ``
}

function updateIndicatorPanel() {
    let indicatorPanel = document.querySelector('#indicator_panel')
    indicatorPanel.innerHTML = ''
    let key = 'merge'
    Object.keys(algorithms).map(index => {
        if (algorithms[index] === algorithm) key = index
    })
    indicatorPanel.insertAdjacentHTML('beforeend', indicatorPanelContent[key])
}

function updateAlgorithmInfo() {
    let algorithmInfoHeader = document.querySelector('#algorithm_info_header')
    let algorithmInfoBody = document.querySelector('#algorithm_info_body')
    algorithmInfoHeader.innerHTML = algorithm.name+" Algorithm"
    algorithmInfoBody.innerHTML = algorithm.description
}

function plotGraph(unsortedNodes=[]) {
    let graphBody = document.querySelector('#graph_body')
    let nodeWidth = Math.floor(graphBody.offsetWidth/array.length*0.6)
    let barChart = graphBody.querySelector('#bar_chart')
    if (!barChart) graphBody.insertAdjacentHTML('beforeend', `<div class="bar-chart row m-0" id="bar_chart"></div>`)
    barChart = graphBody.querySelector('#bar_chart')
    barChart.innerHTML = ''
    array.map( (number, index) => {
        barChart.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="node_${index}">${number}</div>`)
        let node = barChart.querySelector(`#node_${index}`)
        node.style.height = number+"px"
        node.style.width = nodeWidth+"px"
        node.style.fontSize = (nodeWidth/3)+"px"

        let indices = unsortedNodes.filter(indices => indices.index===index)
        if (unsortedNodes.length && indices.length) {
            node.classList.add(indices[0].className)
        }
    })
}