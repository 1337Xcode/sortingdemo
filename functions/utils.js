function generateArray(length = 5) {
    let array = []
    for (let i=0; i<length; i++) {
        array.push(randomNumber(5, 500))
    }
    return array
}

function switchElement (array, index1, index2) {
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

function shiftElement (array, index1, index2) {
    if (index2>index1){
        let temp = array[index2]
        for (let i = index2; i > index1; i--) {
            array[i] = array[i - 1]
        }
        array[index1] = temp
    }
    else if(index1>index2+1) {
        let temp = array[index1]
        for (let i = index1; i > index2; i--) {
            array[i] = array[i - 1]
        }
        array[index2] = temp
    }
}

Array.prototype.equals = function(arr2) {
    return (
        this.length === arr2.length &&
        this.every((value, index) => value === arr2[index])
    )
}

const randomNumber = (min, max, except=null) => {
    let number = Math.round(min+Math.random()*max)
    if (except) {
        while (number===except){
            number = Math.round(min+Math.random()*max)
        }
    }
    return number;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

let barVisualizer = {
    quickSort: async animation => {
        let sleepTime = SEARCH_TIME/(animation.length)
        for (let set of animation) {
            let nodes = barVisualizer.getNodes(set)
            nodes.map((node, index) => {
                if (index===0) node.classList.add('node-pivot')
                else node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted')
            })
            await sleep(sleepTime)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-pivot'})
                newNodes.push({index: set.indices[1], className: 'node-unsorted'})
                if (set.indices.length>2) {
                    newNodes.push({index: set.indices[2], className: 'node-unsorted'})
                    await barVisualizer.animateSwitch([{index: set.indices[1]}, {index: set.indices[2]}])
                    switchElement(array, set.indices[1], set.indices[2])
                    plotGraph(newNodes)
                }
                else {
                    let temp = newNodes[0].className
                    newNodes[0].className = newNodes[1].className
                    newNodes[1].className = temp
                    await barVisualizer.animateSwitch([{index: set.indices[1]}, {index: set.indices[0]}])
                    switchElement(array, set.indices[1], set.indices[0])
                    plotGraph(newNodes)
                }
                await sleep(sleepTime/2)
                set.indices.map(index => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${index}`)
                    node.classList.remove('node-unsorted', 'node-pivot')
                })
                await sleep(sleepTime/2)
            } else {
                nodes.map((node) => node.classList.remove('node-sorted', 'node-pivot'))
            }
        }
    },

    bubbleSort: async animation => {
        let sleepTime = SEARCH_TIME/(animation.length)
        for (let set of animation) {
            let nodes = barVisualizer.getNodes(set)
            nodes.map((node, index) => node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted'))
            await sleep(sleepTime)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-unsorted'})
                newNodes.push({index: set.indices[1], className: 'node-unsorted'})
                await barVisualizer.animateSwitch(newNodes, sleepTime/2)
                switchElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(sleepTime/2)
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-unsorted')
                })
                await sleep(sleepTime/2)
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    selectionSort: async animation => {
        let sleepTime = SEARCH_TIME/(animation.length*2)
        for (let set of animation) {
            let nodes = barVisualizer.getNodes(set)
            nodes[0].classList.add(set.sorted ? 'node-sorted' : 'node-position')
            nodes[1].classList.add(set.sorted ? 'node-sorted' : 'node-minimum')
            await sleep(sleepTime)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-minimum'})
                newNodes.push({index: set.indices[1], className: 'node-position'})
                await barVisualizer.animateSwitch(newNodes, sleepTime/2)
                switchElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(sleepTime/2)
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-position', 'node-minimum')
                })
                await sleep(sleepTime/2)
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    insertionSort: async animation => {
        let sleepTime = SEARCH_TIME/(animation.length*2)
        for (let set of animation) {
            let nodes = barVisualizer.getNodes(set)
            nodes[0].classList.add(set.sorted ? 'node-sorted' : 'node-position')
            nodes[1].classList.add(set.sorted ? 'node-sorted' : 'node-scanner')
            await sleep(sleepTime)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-scanner'})
                newNodes.push({index: set.indices[1], className: 'node-position'})
                await barVisualizer.animateShift(newNodes, sleepTime)
                newNodes.pop()
                newNodes.push({index: set.indices[0]+1, className: 'node-position'})
                shiftElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(sleepTime/2)
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-position', 'node-scanner')
                })
                await sleep(sleepTime/2)
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    animateSwitch: async (unsortedNodes, sleepTime) => {
        sleepTime = sleepTime>150 ? sleepTime : 150
        let switchingNodes = [
            document.querySelector('#graph_body').querySelector(`#node_${unsortedNodes[0].index}`),
            document.querySelector('#graph_body').querySelector(`#node_${unsortedNodes[1].index}`)
        ]
        let nodePositions = [getOffset(switchingNodes[0]), getOffset(switchingNodes[1])]
        let topMovement = nodePositions[1].top-nodePositions[0].top
        let leftMovement = nodePositions[1].left-nodePositions[0].left
        switchingNodes[0].style.transition = (sleepTime*0.8)+"ms"
        switchingNodes[0].style.transform = "translate("+(leftMovement)+"px, 0)"
        switchingNodes[1].style.transition = (sleepTime*0.8)+"ms"
        switchingNodes[1].style.transform = "translate("+(-leftMovement)+"px, 0)"
        await sleep(sleepTime)
    },

    animateShift: async (unsortedNodes, sleepTime) => {
        sleepTime = sleepTime>100 ? sleepTime : 100
        let shiftedNodes = [
            document.querySelector('#graph_body').querySelector(`#node_${unsortedNodes[0].index}`),
            document.querySelector('#graph_body').querySelector(`#node_${unsortedNodes[1].index}`)
        ]
        let nodePositions = [getOffset(shiftedNodes[0]), getOffset(shiftedNodes[1])]
        let topMovement = nodePositions[1].top-nodePositions[0].top
        let leftMovement = nodePositions[1].left-nodePositions[0].left
        shiftedNodes[1].style.transition = (sleepTime*0.8)+"ms"
        shiftedNodes[1].style.transform = "translate("+(-leftMovement)+"px,"+(-topMovement)+"px)"

        let shiftedNodeCounts = unsortedNodes[1].index - unsortedNodes[0].index
        for (let index = unsortedNodes[0].index; index<unsortedNodes[1].index; index++) {
            let node = document.querySelector('#graph_body').querySelector(`#node_${index}`)
            node.style.transition = (sleepTime*0.8)+"ms"
            node.style.transform = "translate("+(leftMovement/shiftedNodeCounts)+"px, 0)"
        }
        await sleep(sleepTime)
    },

    getNodes: set => {
        let nodes = []
        set.indices.map( index => {
            nodes.push(document
                .querySelector('#graph_body')
                .querySelector(`#node_${index}`))
        })
        return nodes
    }
}
