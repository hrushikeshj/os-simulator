function fifo(incoming_pages, no_frames){
	let hit = 0, pos = 0;
	let page_faults = 0;
	let page_hits = 0;
	let incoming_page;
	let frames = new Array(no_frames).fill(-1)
	for(let i=0; i<incoming_pages.length; i++){
		hit = 0;
        incoming_page = incoming_pages[i];
		// check if the page is in memory
		for(let j=0; j<no_frames; j++)
			if(frames[j] == incoming_page){
				page_hits++;
				hit = 1;
				break;
			}

		// if page is not found
		if(hit == 0){
			frames[pos] = incoming_page;
			pos = (pos+1) % no_frames;
			page_faults++;
			document.querySelector(`th[itr="${i}"]`).classList = ['bg-danger'];
		}
		else
			document.querySelector(`th[itr="${i}"]`).classList = ['bg-success'];

		print_frame(frames, i, (hit == 0 ? 'red-muted' : 'green-muted'))
	}
	let out = document.querySelector("#output");
	out.innerHTML = `Number of faults: ${page_faults}` + `<br>Number of hits: ${page_hits}<br>`
	out.innerHTML += `Hit Ratio: ${(page_hits/incoming_pages.length).toFixed(3)}`

	console.log(`No of faults: ${page_faults}`);
    console.log(`No of hits: ${page_hits}`);
}