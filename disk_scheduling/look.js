

/*
var btn = document.querySelector("#btn");

btn.addEventListener("click", ()=>{
    console.log(seq.value.split(","))
    LOOK(seq.value.split(","), +head.value, seq.value.split(",").length,dir.value)
})
*/

function LOOK(arr, head,size, direction)
{
	let seq = document.querySelector("#seq");
	let dir = document.querySelector("#dir");
	let out = document.querySelector("#out");
	let seq_out = document.querySelector("#seq-out");
    out.innerHTML = '';
	seq_out.innerHTML = '';
	document.getElementById('can-div').innerHTML = `<canvas id="myChart"></canvas>`
		let seek_count = 0;
		let distance, cur_track;
        let disk_size=199;
        let real_head=head;
		let left = [];
		let right = [];
		let seek_sequence = [];

		// Appending values which are
		// currently at left and right
		// direction from the head.
		for(let i = 0; i < size; i++)
		{
			if (arr[i] < head)
				left.push(arr[i]);
			if (arr[i] > head)
				right.push(arr[i]);
		}

		// Sorting left and right vectors
		// for servicing tracks in the
		// correct sequence.
		left.sort(function(a, b){return a - b});
		right.sort(function(a, b){return a - b});

		// Run the while loop two times.
		// one by one scanning right
		// and left side of the head
		let run = 2;
		while (run-- > 0)
		{
			if (direction == "left")
			{
				for(let i = left.length - 1; i >= 0; i--)
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

				// Reversing the direction
				direction = "right";
			}
			else if (direction == "right")
			{
				for(let i = 0; i < right.length; i++)
				{
					cur_track = right[i];

					// Appending current track to
					// seek sequence
					seek_sequence.push(cur_track);

					// Calculate absolute distance
					distance = Math.abs(cur_track - head);

					// Increase the total count
					seek_count += distance;

					// Accessed track is now new head
					head = cur_track;
				}

				// Reversing the direction
				direction = "left";
			}
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
	