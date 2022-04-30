

/*btn.addEventListener("click", ()=>{
    console.log(seq.value.split(","))
    FCFS(seq.value.split(","), +head.value, seq.value.split(",").length)
})*/

function FCFS(arr, head, size)
{
	var seq = document.querySelector("#seq");
	var out = document.querySelector("#out");
	var seq_out = document.querySelector("#seq-out");
	org_head = head;
	out.innerHTML = '';
	seq_out.innerHTML = '';//new
	document.getElementById('can-div').innerHTML = `<canvas id="myChart"></canvas>`
	var seek_count = 0;
	var distance, cur_track;

	for(var i = 0; i < size; i++)
	{
		cur_track = arr[i];
		
		// Calculate absolute distance
		distance = Math.abs(cur_track - head);

		// Increase the total count
		seek_count += distance;

		// Accessed track is now new head
		head = cur_track;
	}

	out.innerHTML += ("Total number of " +
				"seek operations = " +
				seek_count);

	// Seek sequence would be the same
	// as request array sequence
	out.innerHTML += ("<br>Seek Sequence is");

	for(var i = 0; i < size; i++)
	{
		seq_out.innerHTML += (" " + arr[i]);
	}
	
	// let arr_data = []
	let arr_data = [{
		x: org_head,
		y: 0
	}];
	for(var i=0; i<arr.length; i++)
		arr_data.push({
			x: arr[i],
			y: -(i + 1)
		});

	const data = {
		datasets: [{
			label: 'Scatter Dataset',
			data: arr_data,
			backgroundColor: 'rgb(255, 99, 132)',
			showLine: true,
		}],
		};
	
	const config = {
	type: 'scatter',
	data: data,
	options: {
		scales: {
		x: {
			type: 'linear',
			position: 'bottom'
		}
		}
	}
	};

	const myChart = new Chart(
	document.getElementById('myChart'),
	config
	);
	
}

