let array = [];
let arraySize = 50; // Default size
let animationSpeed = 10; // Default speed
const arrayContainer = document.getElementById("array-container");
const arraySizeSlider = document.getElementById("array-size");
const speedSlider = document.getElementById("speed");
const mergeSortButton = document.getElementById("merge-sort");
const quickSortButton = document.getElementById("quick-sort");
const heapSortButton = document.getElementById("heap-sort");
const bubbleSortButton = document.getElementById("bubble-sort");
const resetButton = document.getElementById("reset");

// Initialize the array and display it
function createArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 200) + 1); // Random numbers between 1 and 500
    }
    displayArray();
}

// Function to display the array in the DOM
function displayArray(compareIndices = []) {
    arrayContainer.innerHTML = "";
    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        // Highlight compared bars
        if (compareIndices.includes(index)) {
            bar.classList.add('currentBar'); // Highlight color for comparisons
           
        }
        if (compareIndices.includes(index)) {

            // Highlight color for comparisons
           
        }
        arrayContainer.appendChild(bar);
       
        
    });

    
    // n++;

}

function sorted() {
    arrayContainer.classList.add('sorted');
}

function initial() {
    arrayContainer.classList.remove('sorted')
}
// Slider event listener for array size
arraySizeSlider.addEventListener("input", function () {
    initial();
    arraySize = parseInt(arraySizeSlider.value);
    createArray();
});

// Slider event listener for speed
speedSlider.addEventListener("input", function () {
    initial();
    animationSpeed = parseInt(speedSlider.value);
});

// Helper function to sleep for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Merge Sort
async function mergeSort(array, start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);
    await merge(array, start, mid, end);
}

async function merge(array, start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        // Highlight the indices being compared
        displayArray([k, start + i, mid + 1 + j]); // Highlight current bars being compared

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        await sleep(animationSpeed);
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        await sleep(animationSpeed);
        displayArray([k]);
        k++;
        i++;
    }

    while (j < right.length) {
        array[k] = right[j];
        await sleep(animationSpeed);
        displayArray([k]);
        k++;
        j++;
    }
}

// Quick Sort
async function quickSort(array, low, high) {
    if (low < high) {
        let pivotIndex = await partition(array, low, high);
        await quickSort(array, low, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, high);
    }
}

async function partition(array, low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        displayArray([j, high]); // Highlight the current and pivot bar
        await sleep(animationSpeed);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            await sleep(animationSpeed);
            displayArray([i, j]); // Highlight the bars being swapped
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    await sleep(animationSpeed);
    displayArray([i + 1, high]); // Highlight the pivot and final position
    return i + 1;
}

// Heap Sort
async function heapSort(array) {
    let n = array.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move the current root to the end
        [array[0], array[i]] = [array[i], array[0]];
        await sleep(animationSpeed);
        displayArray([0, i]); // Highlight the current sorted bar
        arrayContainer.children[i].style.background = "green"; // Change color to green for sorted bars

        // Call heapify on the reduced heap
        await heapify(array, i, 0);
    }
}

async function heapify(array, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Check if left child exists and is greater than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // Check if right child exists and is greater than the largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If the largest is not root
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        await sleep(animationSpeed);
        displayArray([i, largest]); // Highlight the bars being swapped
        await heapify(array, n, largest); // Recursively heapify the affected sub-tree
    }
}

let i = 1;

async function bubbleSort(array) {
    let n = array.length;
    let swapped;
    for (let i = 0; i < n; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap the elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                displayArray([j, j + 1]); // Highlight the swapped bars
                await sleep(animationSpeed);
            }

        if (!swapped) break; // If no two elements were swapped, array is already sorted
    }
}


bubbleSortButton.addEventListener("click", async () => {
    initial();
    await bubbleSort(array);
    sorted();
});

// Event listeners for buttons
mergeSortButton.addEventListener("click", async () => {
    initial();

    await mergeSort(array, 0, array.length - 1);
    sorted();

});

quickSortButton.addEventListener("click", async () => {
    initial();

    await quickSort(array, 0, array.length - 1);
    sorted();

});

heapSortButton.addEventListener("click", async () => {
    initial();
    await heapSort(array);
    sorted();

});

resetButton.addEventListener("click", createArray);

// Initialize the array on page load
window.onload = createArray;
