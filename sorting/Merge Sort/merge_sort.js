//var to check wether to stop the visulaiser or not
var to_exit = 0;

//Tracking speed on slider
var slider = document.getElementById("myRange")
function changeSpeed(){
	return(slider.value)
}

// Canvas variables
var canvas, canvaswidth, canvasheight, ctrl;

// Call canvasElements() to store height width
canvasElements();

//1) arr is for storing array element
//2) itmd for storing intermediate values
//3) visited is for element which has been sorted
var arr = [], itmd = [], visited = []


// Length of unsorted array
var len_of_arr = 40;

// Store random value in arr[]
function randomiseArray(){
	for (var i = 0; i < len_of_arr; i++) {
		arr.push(Math.round(Math.random() * 250) )
	}

	// Initialize itmd and visited array with 0
	for (var i = 0; i < len_of_arr; i++) {
		itmd.push(0)
		visited.push(0)
	}
}
randomiseArray()


// Merging of two sub array
function mergeArray(start, end) {
	let mid = parseInt((start + end) >> 1);
	let start1 = start, start2 = mid + 1
	let end1 = mid, end2 = end
	
	// Initial index of merged subarray
	let index = start

	while (start1 <= end1 && start2 <= end2) {
		if (arr[start1] <= arr[start2]) {
			itmd[index] = arr[start1]
			index = index + 1
			start1 = start1 + 1;
		}
		else if(arr[start1] > arr[start2]) {
			itmd[index] = arr[start2]
			index = index + 1
			start2 = start2 + 1;
		}
	}

	// Copy the remaining elements of arr[] if there are any
	while (start1 <= end1) {
		itmd[index] = arr[start1]
		index = index + 1
		start1 = start1 + 1;
	}

	while (start2 <= end2) {
		itmd[index] = arr[start2]
		index = index + 1
		start2 = start2 + 1;
	}

	index = start
	while (index <= end) {
		arr[index] = itmd[index];
		index++;
	}
}

function initialDrawBars(){
	ctrl.clearRect(0,0,2000,2000)
	for(let i = 0; i < len_of_arr; i++){
		// Changing styles of bars
		ctrl.fillStyle = "#343434"
		
		
		// Size of rectangle of bars
		ctrl.fillRect(35 * i + 60, 300 - arr[i], 30, arr[i])

        ctrl.font = "bold 14px Verdana"
        ctrl.fillText(arr[i], 35 * i + 60, 300 - arr[i] - 2)
	}
}

// Function for showing visualization effect
function drawBars(start, end) {
	if(to_exit === 1){
		return
	}

	// Clear pervious unsorted bars
	ctrl.clearRect(0, 0, 2000, 2000)

	// Styling of bars
	for (let i = 0; i < len_of_arr; i++) {

		// Changing styles of bars
		ctrl.fillStyle = "#343434"
		
		
		// Size of rectangle of bars
		ctrl.fillRect(35 * i + 60, 300 - arr[i], 30, arr[i])

        ctrl.font = "bold 14px Verdana"
        ctrl.fillText(arr[i], 35 * i + 60, 300 - arr[i] - 2)
		
		if (visited[i]) {
			ctrl.fillStyle = "#00ff55"
			ctrl.fillRect(35 * i + 60, 300 - arr[i], 30, arr[i])
		}
	}

	for (let i = start; i <= end; i++) {
		ctrl.fillStyle = "orange"
		ctrl.fillRect(35 * i + 60, 300 - arr[i], 30, arr[i])
		visited[i] = 1
	}
}

// Waiting interval between two bars
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


// Merge Sorting
const mergeSort = async (start, end) => {
	if(to_exit === 1){
		return
	}
	if (start < end) {
		let mid = parseInt((start + end) >> 1)
		await mergeSort(start, mid)
		await mergeSort(mid + 1, end)
		await mergeArray(start, end)
		await drawBars(start, end)

		// Waiting time
		await timeout(changeSpeed())
	}
}

// canvasElements function for storing
// width and height in canvas variable
function canvasElements() {
	if(to_exit === 1){
		return
	}
	canvas = document.getElementById("Canvas")
	canvas.width = 1536
    canvas.height = 400
	canvaswidth = canvas.width
	canvasheight = canvas.height
	ctrl = canvas.getContext("2d")
}

// Asynchronous MergeSort function
const performer = async () => {
	if(to_exit === 1){
		return
	}
	await mergeSort(0, len_of_arr - 1)
	await drawBars()
}

// Drawing generated array and calling visualiser on click of start button
initialDrawBars()
var start = document.getElementById("start")
start.addEventListener("click", () => {
	performer(); 
	start.disabled = true; 
	stop.disabled = false;
	start.classList.remove("ctrl-btn1"); 
	start.classList.add("disable1")
	stop.classList.remove("disable2"); 
	stop.classList.add("ctrl-btn2")
})

// Stop button functionality
var stop = document.getElementById("stop")
stop.addEventListener("click", () => {
	to_exit = 1; 
	stop.disabled = true; 
	stop.classList.remove("ctrl-btn2"); 
	stop.classList.add("disable2")
})

// Reset button functionality
var reset = document.getElementById("reset")
reset.addEventListener("click", () => {
	to_exit = 1
	reset.classList.add("loading-rotate")
	setTimeout(() => {
		to_exit = 0; 
		arr = []; 
		itmd = []; 
		visited = []; 
		randomiseArray(); 
		initialDrawBars();
		start.disabled = false;
		stop.disabled = true;
		start.classList.remove("disable1"); 
		start.classList.add("ctrl-btn1");
		stop.classList.remove("ctrl-btn2"); 
		stop.classList.add("disable2")
		reset.classList.remove("loading-rotate")
	}, 2000);
})
