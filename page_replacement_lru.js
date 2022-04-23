function replace(frames, old_ele, new_ele){
    var index = frames.indexOf(old_ele);
    if (index != -1) {
        frames[index] = new_ele;
    }
}

function lru(pages, no_frames){
    let framesSet = new Set();
    let frames_arr = new Array(no_frames).fill(-1), arr_c=0;
    
    // Store when last used
    let lastUsed = new Map(), hit;
    
    let page_faults = 0;
    for (let i=0; i<pages.length; i++){
        lastUsed.set(pages[i], i);

        if(framesSet.has(pages[i])){
			document.querySelector(`th[itr="${i}"]`).classList = ['bg-success'];
            hit = 1;
        }
        else{
			document.querySelector(`th[itr="${i}"]`).classList = ['bg-danger'];
            hit = 0;
        }

        if (framesSet.size < no_frames){
            if (!framesSet.has(pages[i])){
                framesSet.add(pages[i]);
                frames_arr[arr_c++] = pages[i];//
        
                page_faults++;
            }
        
        }
        // LRU
        // Select a page to remove
        else{
            // if the page is not present in mm
            if (!framesSet.has(pages[i])){
                let lru = Number.MAX_VALUE, val=Number.MIN_VALUE;

                for(let itr of framesSet.values()) {
                    let temp = itr;
                    if (lastUsed.get(temp) < lru){
                        lru = lastUsed.get(temp);
                        val = temp;
                    }
                    if(val==Number.MIN_VALUE) alert("err");// remove
                }

                // remove page
                framesSet.delete(val);
                //remove lru from hashmap
                lastUsed.delete(val);

                // add page 
                framesSet.add(pages[i]);

                page_faults++;
                replace(frames_arr, val, pages[i])
            }
        
            // Update the current page index
        }
        print_frame(frames_arr, i, (hit == 0 ? 'red-muted' : ''));
    }
    
    let page_hits = (pages.length - page_faults)
    let out = document.querySelector("#output");
	out.innerHTML = `Number of faults: ${page_faults}` + `<br>Number of hits: ${page_hits}<br>`
	out.innerHTML += `Hit Ratio: ${page_hits/pages.length}`
    console.log(page_faults);
    return page_faults;
}
