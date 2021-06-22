
const container = document.querySelector(".data-container");
var slider = document.getElementById("myRange");
function delaySpeed(){
	return(slider.value);
}
//function to generate bars



// Function to generate the array of bar

function generatearray(num =47) {
	for (var i = 0; i < num; i++) {

		// Return a value from 1 to 100 (both inclusive)
		var value = Math.ceil(Math.random() * 100) +1;

		// Creating element div
		var bar = document.createElement("div");

		// Adding class 'block' to div
		bar.classList.add("bar");

		// Adding style to div
		bar.style.height = `${value * 0.2}vw`;
		bar.style.transform = `translate(${i * 30}px)`;

		// Creating label element for displaying
		// size of particular block
		var barlabel = document.createElement("label");
		barlabel.classList.add("bar_id");
		barlabel.innerText = value;

		// Appending created elements to index.html
		bar.appendChild(barlabel);
		container.appendChild(bar);
	}
}

// Promise to swap two bar
function swap(el1, el2) {
	return new Promise((resolve) => {

		// For exchanging styles of two bar
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = delaySpeed()) {
	var bar = document.querySelectorAll(".bar");

	// BubbleSort Algorithm
	for (var i = 0; i < bar.length; i += 1) {
		for (var j = 0; j < bar.length - i - 1; j += 1) {

			// To change background-color of the
			// bar to be compared
			bar[j].style.backgroundColor = "#ffa449";
			bar[j + 1].style.backgroundColor = "#ffa449";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			console.log("run");
			var value1 = Number(bar[j].childNodes[0].innerHTML);
			var value2 = Number(bar[j + 1]
						.childNodes[0].innerHTML);

			// To compare value of two bar
			if (value1 > value2) {
				await swap(bar[j], bar[j + 1]);
				bar = document.querySelectorAll(".bar");
			}

			// Changing the color to the previous one
			bar[j].style.backgroundColor = "#6b5b95";
			bar[j + 1].style.backgroundColor = "#6b5b95";
		}

		//changing the color of greatest element
		//found in the above traversal
		bar[bar.length - i - 1]
				.style.backgroundColor = "#13CE66";
	}
	 // To enable the button "Generate New Array" after final(sorted)
	 document.getElementById("Button1").disabled = false;
	 document.getElementById("Button1").style.backgroundColor = "#6f459e";
   
	 // To enable the button "Selection Sort" after final(sorted)
	 document.getElementById("Button2").disabled = false;
	 document.getElementById("Button2").style.backgroundColor = "#ffffff";
}

// Calling generatearray function
generatearray();

function generate() {
	window.location.reload();
  }

// Calling BubbleSort function

function disable() {
	// To disable the button "Generate New Array"
	document.getElementById("Button1").disabled = true;
	document.getElementById("Button1").style.color = "gray";

  
	// To disable the button "Selection Sort"
	document.getElementById("Button2").disabled = true;
	document.getElementById("Button2").style.color = "gray";
  
  }

