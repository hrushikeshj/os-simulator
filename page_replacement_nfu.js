function replace(frames, old_ele, new_ele){
    var index = frames.indexOf(old_ele);
    if (index != -1) {
        frames[index] = new_ele;
    }
}

function nfu(incoming_pages, no_frames){
    let frequency = new Map(), i, incoming_page, f, page_faults = 0;
    let frames = new Set(), frames_arr = new Array(no_frames).fill(-1), arr_c = 0;

    for(i=0; i<incoming_pages.length; i++){
        incoming_page = incoming_pages[i];

        // update frequency
        if(frequency.has(incoming_page)){
            f = frequency.get(incoming_page);
            frequency.set(incoming_page, f+1);
        }
        else
            frequency.set(incoming_page, 1);
        
        // check if in mm
        if(!frames.has(incoming_page)){
            page_faults++;

            if(frames.size < no_frames){
                frames.add(incoming_page);
                frames_arr[arr_c++] = incoming_page;
            }
            // nfu
            else{
                let least_freq = Number.MAX_VALUE, replace_page = -1;
                for(let page of frames.values()){
                    if(frequency.get(page) < least_freq){
                        least_freq = frequency.get(page);
                        replace_page = page;
                    }
                }

                frames.delete(replace_page);
                frames.add(incoming_page);

                replace(frames_arr, replace_page, incoming_page);
            }
            document.querySelector(`th[itr="${i}"]`).classList = ['bg-danger'];
        }
        else
            document.querySelector(`th[itr="${i}"]`).classList = ['bg-success'];

        print_frame(frames_arr, i);
        
    }

    let page_hits = (incoming_pages.length - page_faults)
    let out = document.querySelector("#output");
	out.innerHTML = `Number of faults: ${page_faults}` + `<br>Number of hits: ${page_hits}<br>`
	out.innerHTML += `Hit Ratio: ${page_hits/incoming_pages.length}`
    console.log(page_faults);
}