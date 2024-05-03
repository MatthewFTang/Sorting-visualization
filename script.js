let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let resetButton = document.getElementById("resetButton");
const sortButton = document.getElementById("sortButton");
let counter = document.getElementById("counter");
let menuSelection = document.getElementById("selection_option");
let title = document.getElementById("sorting_title");
let sorting_type = "bubble";
menuSelection.onchange = function () {
	if (menuSelection.value === "bubble") {
		title.innerHTML = "Bubble Sort";
		sorting_type = "bubble";
	}
	if (menuSelection.value === "merge") {
		title.innerHTML = "Merge Sort";
		sorting_type = "merge";
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
	// bubbleSort();
	sortingAnimation();
});

canvas.width = 800;
canvas.height = 400;
const Npoints = 40;
const width = (canvas.width - 100) / Npoints;

let swapCount = 0;
let current = 0;
let j = 1;

let numbers = generateNumbers();
function generateNumbers(array) {
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

function drawGraph() {
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
}

function insertionSort() {
	if (current < numbers.length) {
		if (j >= 0 && numbers[j - 1] > numbers[j]) {
			let temp = numbers[j - 1];
			numbers[j - 1] = numbers[j];
			numbers[j] = temp;
			swapCount++;
			j--;
		} else {
			current++;
			j = current;
		}
		drawGraph();
		counter.innerHTML = `Swaps : ${swapCount}`;
		return false;
	} else {
		return true;
	}
}

function bubbleSort() {
	let swapped = false;

	for (let j = 0; j < 2; j++) {
		for (let i = current; i < numbers.length - 1; i++) {
			if (numbers[i] > numbers[i + 1]) {
				let temp = numbers[i];
				numbers[i] = numbers[i + 1];
				numbers[i + 1] = temp;
				swapped = true;
				drawGraph();
				counter.innerHTML = `Swaps : ${swapCount}`;
				swapCount++;
				current++;
				return false;
			}
			current++;
		}
		current = 0;

		if (j > 0 && !swapped) {
			return true;
		}
	}
}

function mergeSort(numbers) {
	let n = numbers.length;
	// console.log(numbers)
	if (n < 2) {
		return numbers;
	}
	let mid = Math.floor(n / 2);
	let left = mergeSort(numbers.slice(0, mid));
	let right = mergeSort(numbers.slice(mid));
	console.log(left, right);
	return mergeSortHelper(left, right);
}
function mergeSortHelper(left, right) {
	let temp = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			temp.push(left.shift());
		} else {
			temp.push(right.shift());
		}
		drawGraph();
	}

	return [...temp, ...left, ...right];
}
async function quickSort(start, end) {
	if (start >= end) return;
	let index = partition(numbers, start, end);
	await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
	return false;
}
async function partition(numbers, start, end) {
	let pivot = numbers[end];
	let i = start - 1;
	for (let j = start; j < end; j++) {
		if (numbers[j] < pivot) {
			i++;
			let temp = numbers[i];
			numbers[i] = numbers[j];
			numbers[j] = temp;
		}
	}
	let temp = numbers[i + 1];
	numbers[i + 1] = numbers[end];
	numbers[end] = temp;
	return i + 1;
}

let sort_status = false;

async function sortingAnimation() {
	// if (sorting_type === "bubble") {
	// 	sort_status = bubbleSort();
	// } else if (sorting_type === "merge") {
	// 	sort_status = mergeSort(numbers);
	// } else if (sorting_type === "insertion") {
	// 	sort_status = insertionSort();
	// } else if (sorting_type === "quick") {
	// 	sort_status =  quickSort();
	// }
	quickSort(0, numbers.length - 1);
	drawGraph();
	if (!sort_status) {
		requestAnimationFrame(sortingAnimation);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

sortingAnimation();
