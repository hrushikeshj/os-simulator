
var head=document.querySelector("#start");
var seq = document.querySelector("#seq");
var out = document.querySelector("#out");
var seq_out = document.querySelector("#seq-out");
var btn = document.querySelector("#btn");

btn.addEventListener("click", ()=>{
    console.log(seq.value.split(","))
    CLOOK(seq.value.split(","), +head.value, seq.value.split(",").length)
})
function CLOOK(arr, head,size)
{
    out.innerHTML = '';
	seq_out.innerHTML = '';
	document.getElementById('can-div').innerHTML = `<canvas id="myChart"></canvas>`
		let seek_count = 0;
		let distance, cur_track;
        let real_head=head;
		let left = [];
		let right = [];
		let seek_sequence = [];

		// Tracks on the left of the
		// head will be serviced when
		// once the head comes back
		// to the beginning (left end)
		for(let i = 0; i < size; i++)
		{
			if (arr[i] < head)
				left.push(arr[i]);
			if (arr[i] > head)
				right.push(arr[i]);
		}

		// Sorting left and right vectors
		left.sort(function(a, b){return a - b});
		right.sort(function(a, b){return a - b});

		// First service the requests
		// on the right side of the
		// head
		for(let i = 0; i < right.length; i++)
		{
			cur_track = right[i];

			// Appending current track
			// to seek sequence
			seek_sequence.push(cur_track);

			// Calculate absolute distance
			distance = Math.abs(cur_track - head);

			// Increase the total count
			seek_count += distance;

			// Accessed track is now new head
			head = cur_track;
		}

		// Once reached the right end
		// jump to the last track that
		// is needed to be serviced in
		// left direction
		seek_count += Math.abs(head - left[0]);
		head = left[0];

		// Now service the requests again
		// which are left
		for(let i = 0; i < left.length; i++)
		{
			cur_track = left[i];

			// Appending current track to
			// seek sequence
			seek_sequence.push(cur_track);

			// Calculate absolute distance
			distance = Math.abs(cur_track - head);

			// Increase the total count
			seek_count += distance;

			// Accessed track is now the new head
			head = cur_track;
		}

		out.innerHTML += ("Total number of seek " +
						"operations = " + seek_count + "</br>");

		out.innerHTML += ("Seek Sequence is" + "</br>");

		for(let i = 0; i < seek_sequence.length; i++)
		{
			seq_out.innerHTML += (seek_sequence[i] + " ");
		}


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