
var head=document.querySelector("#start");
var seq = document.querySelector("#seq");
var dir = document.querySelector("#dir");
var out = document.querySelector("#out");
var seq_out = document.querySelector("#seq-out");
var btn = document.querySelector("#btn");

btn.addEventListener("click", ()=>{
    console.log(seq.value.split(","))
    SCAN(seq.value.split(","), +head.value, seq.value.split(",").length,dir.value)
})
	function SCAN(arr, head,size, direction)
	{
		out.innerHTML = '';
		document.getElementById('can-div').innerHTML = `<canvas id="myChart"></canvas>`
		let real_head = head;
		let seek_count = 0;
		let distance, cur_track;
		let left = [], right = [];
		let seek_sequence = [];
		let disk_size = 199;

		// appending end values
		// which has to be visited
		// before reversing the direction
		if (direction == "left")
			left.push(0);
		else if (direction == "right")
			right.push(disk_size - 1);

		for (let i = 0; i < size; i++)
		{
			if (arr[i] < head)
				left.push(arr[i]);
			if (arr[i] > head)
				right.push(arr[i]);
		}

		// sorting left and right vectors
		left.sort(function(a, b){return a - b});
		right.sort(function(a, b){return a - b});

		// run the while loop two times.
		// one by one scanning right
		// and left of the head
		let run = 2;
		while (run-- >0)
		{
			if (direction == "left")
			{
				for (let i = left.length - 1; i >= 0; i--)
				{
					cur_track = left[i];

					// appending current track to seek sequence
					seek_sequence.push(cur_track);

					// calculate absolute distance
					distance = Math.abs(cur_track - head);

					// increase the total count
					seek_count += distance;

					// accessed track is now the new head
					head = cur_track;
				}
				direction = "right";
			}
			else if (direction == "right")
			{
				for (let i = 0; i < right.length; i++)
				{
					cur_track = right[i];

					// appending current track to seek sequence
					seek_sequence.push(cur_track);

					// calculate absolute distance
					distance = Math.abs(cur_track - head);

					// increase the total count
					seek_count += distance;

					// accessed track is now new head
					head = cur_track;
				}
				direction = "left";
			}
		}

		out.innerHTML += ("Total number of " +
				"seek operations = " +
				seek_count);
				out.innerHTML += ("<br>Seek Sequence is");
				seq_out.innerHTML += real_head + ' '
		for (let i = 0; i < seek_sequence.length; i++)
		{
			seq_out.innerHTML += (seek_sequence[i] + " ");
		}


		//let arr_data = [];
	let arr_data = [{
		x: real_head,
		y: 0
	}];
	for(var i=0; i<seek_sequence.length; i++)
		arr_data.push({
			x: seek_sequence[i],
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
	
	

