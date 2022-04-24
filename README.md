# os-simulator
## Clone the repo
```git
git clone https://<your_username>@github.com/hrushikeshj/os-simulator
```
> cd into the folder os-simulator

###### create a new branch
```git
git checkout -b your-branch-name-here
```
Add your files

## Suggested file structure
Create a new folder and add your file in it.
```
os-simulator
│   index.html
│   .gitignore  
│
└───page_replacement
│       index.html
│       simulation.html
|       fifo.js
|       lru.js
|       nfu.js
│   
└───topic-title
|      *.html
|      *.js
|
....
....
```

After adding your files, add your topic to `os-simulator/index.html` sidebar.
```html
...
...
<li class="mb-1">
  <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
    [Add toppic title here]
  </button>
  <div class="collapse" id="orders-collapse">
    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
      <li><a href="[(sub_folder_name)/file_name.html]" class="link-dark rounded">[title]</a></li>
      <li><a href="[path here]" class="link-dark rounded">[title]</a></li>
    </ul>
  </div>
</li>
.....
....

```

After makeing all the changes, commit your changes, push the branch and create a merge request on github

###### Commit changes
```git
git add .
git commit -m "your commit msg"
```

###### Push the branch
```git
git push origin your-branch-name
```

###### Create Pull Request
