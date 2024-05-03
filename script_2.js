let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let resetButton = document.getElementById("resetButton");
const sortButton = document.getElementById("sortButton");
const counter = document.getElementById("counter");
const menuSelection = document.getElementById("selection_option");
const title = document.getElementById("sorting_title");

let sorting_type = "bubble";


canvas.width = 800;
canvas.height = 400;

const Npoints = 40;
const width = (canvas.width - 100) / Npoints;

let count = 0;
let current = 0;
let j = 1;
let numbers = generateNumbers();
drawGraph();

function generateNumbers() {
	swapCount = 0;
	current = 0;
	let numbers = [];
	j = 1;

	for (let i = 0; i < Npoints; i++) {
		numbers.push(i + 1);
	}

	for (let i = numbers.length - 1; i > 0; i--) {
		let b = Math.floor(Math.random() * (i + 1));
		let temp = numbers[i];
		numbers[i] = numbers[b];
		numbers[b] = temp;
	}
	counter.innerHTML = `Swaps :`;

	return numbers;
}

async function drawGraph() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < Npoints; i++) {
		ctx.beginPath();
		ctx.fillStyle = `hsl(255, ${(numbers[i] / Npoints) * 100}%, 50%)`;
		ctx.roundRect(
			i * width,
			canvas.height,
			width * 0.75,
			(-numbers[i] / numbers.length) * canvas.height,
			4
		);
		ctx.fill();
	}
	counter.innerHTML = `Swaps : ${swapCount}`;
}

async function swap(i, j) {
	let temp = numbers[i];
	numbers[i] = numbers[j];
	numbers[j] = temp;
	await new Promise((resolve) => setTimeout(resolve, 16));
	drawGraph();
	swapCount++;
}



async function bubbleSort() {
	let len = numbers.length;
	let swapped;
	do {
		swapped = false;
		for (let i = 0; i < len - 1; i++) {
			if (numbers[i] > numbers[i + 1]) {
				await swap(i, i + 1);
				swapped = true;
			}
		}
	} while (swapped);
}
async function quickSort(start, end) {
	if (start >= end) return;
	let index = await quickSortPartition(start, end);
	await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function quickSortPartition(start, end) {
	let pivot = numbers[end];
	let i = start;
	for (let j = start; j < end; j++) {
		if (numbers[j] < pivot) {
			await swap(i, j);
			i++;
		}
	}
	await swap(i, end);
	return i;
}

async function insertionSort() {
	let i = 1;
	while (i < numbers.length) {
		let j = i;
		while (j >= 0 && numbers[j - 1] > numbers[j]) {
			await swap(j - 1, j);
			j--;
		}
		i++;
	}
}

async function mergeSort() {

    if (numbers.length <= 1) {
        return numbers;
    }
    let mid = Math.floor(numbers.length / 2);
    let left = numbers.slice(0, mid);
    let right = numbers.slice(mid);
    return merge(await mergeSort(left), await mergeSort(right));
}
async function merge(left, right) {

}

menuSelection.onchange = function () {
	if (menuSelection.value === "bubble") {
		title.innerHTML = "Bubble Sort";
		sorting_type = "bubble";
	}
	if (menuSelection.value === "heap") {
		title.innerHTML = "Heap Sort";
		sorting_type = "heap";
	}
	if (menuSelection.value === "quick") {
		title.innerHTML = "Quick Sort";
		sorting_type = "quick";
	}
	if (menuSelection.value === "insertion") {
		title.innerHTML = "Insertion Sort";
		sorting_type = "insertion";
	}

	if (menuSelection.value === "quick") {
		title.innerHTML = "Quick Sort";
		sorting_type = "quick";
	}
	numbers = generateNumbers();
	drawGraph();
};

resetButton.addEventListener("click", () => {
	numbers = generateNumbers();
	drawGraph();
});
sortButton.addEventListener("click", () => {
	if (sorting_type === "bubble") {
		bubbleSort();
	}
	if (sorting_type === "heap") {
		heapSort();
	}
	if (sorting_type === "quick") {
		quickSort(0, numbers.length - 1);
	}
	if (sorting_type === "insertion") {
		insertionSort();
	}

});