function remove(frames, incoming_pages, in_pos){
    // for finding the frame to replace
    let next_request = new Array(frames.length).fill(Number.MAX_VALUE);
    let pos, max, i, j;
    for(i=0; i<frames.length; i++){        
        for(j=in_pos+1; j<incoming_pages.length; j++){
            if(frames[i] == incoming_pages[j]){
                next_request[i] = j;
                break;
            }
        }
    }

    // find the page to repalce
    max = next_request[0];
    pos = 0;
    for(i=0; i<frames.length; i++){
        if(next_request[i]>max){
            max = next_request[i];
            pos = i;
        }
    }

    return pos;
}
function optimal(incoming_pages, no_frames){
    let i, j, no_in = incoming_pages.length, frames, page_faults=0, page_hits=0, pos = 0, hit;
    let empty_frame;

    frames = new Array(no_frames).fill(-1);

    let incoming_page;
    for(i=0; i<no_in; i++){
        hit = 0;
        empty_frame = 0;
        incoming_page = incoming_pages[i];

        // check if the page is in memory
        if(frames.includes(incoming_page)){
            page_hits++;
            hit = 1;
        }

        // if page is not found
        if(hit == 0){
            document.querySelector(`th[itr="${i}"]`).classList = ['bg-danger'];
            // check if a frame is empty
            for(j=0; j<no_frames; j++)
                if(frames[j] == -1){
                    frames[j] = incoming_page;
                    empty_frame = 1;
                    break;
                }

            // if their was no empty frame
            if(empty_frame == 0){
                pos = remove(frames, incoming_pages, i);
                frames[pos] = incoming_page;
            }
            
            page_faults++;
        }
        else
            document.querySelector(`th[itr="${i}"]`).classList = ['bg-success'];

        print_frame(frames, i, (hit == 0 ? 'red-muted' : 'green-muted'));
    }

    let out = document.querySelector("#output");
	out.innerHTML = `Number of faults: ${page_faults}` + `<br>Number of hits: ${page_hits}<br>`
	out.innerHTML += `Hit Ratio: ${(page_hits/incoming_pages.length).toFixed(3)}`

	console.log(`No of faults: ${page_faults}`);
    console.log(`No of hits: ${page_hits}`);
}
