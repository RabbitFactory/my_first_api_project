const loadPosts = async (searchInput) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInput}`);
        const data = await response.json();
        const posts = data.posts;

        if (posts.length === 0) {
            displayNoDataMessage();

        } else {
            const postBoxOverall = document.getElementById('postBoxOverall');
            postBoxOverall.classList.remove('hidden');
            displayPosts(posts);
        }
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        displayNoDataMessage(); 
    }
}

const displayPosts = (posts) =>{
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.textContent = '';

    posts.forEach( post => {
        const postBox = document.createElement('div');
        postBox.innerHTML = `
        <div class="mx-2 flex bg-gray-100 rounded-xl p-2 lg:p-10 gap-6 hover:bg-blue-50 hover:border-[1px] hover:border-blue-500 transition-all	ease-in-out duration-500 border-gray-100 border-[1px]">
                    <div class="w-16 lg:w-28 relative">
                        <div class="badge ${
                            post.isActive ? 'badge-success' : 'badge-error'
                        } badge-sm lg:badge-lg absolute -right-1 -top-1"></div>
                        <img class="rounded-xl" src="${post.image}" alt="">
                    </div>
                    <div class="flex-1">
                        <div class="flex gap-5 font-semibold">
                            <p>#${post.category}</p>
                            <p>Author : ${post.author.name}</p>
                        </div>
                        <div class="border-b-2 border-dashed my-2">
                            <h5 class="font-bold text-2xl mb-4">${post.title}</h5>
                            <p class="mb-4">${post.description}</p>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex lg:gap-10 gap-4">
                                <div class="flex gap-2">
                                    <div><i class="fa-regular fa-message"></i></div>
                                    <div>${post.comment_count}</div>
                                </div>
                                <div class="flex gap-2">
                                    <div><i class="fa-regular fa-eye"></i></div>
                                    <div>${post.view_count}</div>
                                </div>
                                <div class="flex gap-2">
                                    <div><i class="fa-regular fa-clock"></i></div>
                                    <div>${post.posted_time} min</div>
                                </div>
                            </div>
                            <div>
                                <button onclick='markCounter("${post.title}", ${post.view_count})' class="rounded-full bg-green-400 p-3 flex items-center justify-center">
                                    <i class="fa-regular fa-envelope-open"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        `
        postsContainer.appendChild(postBox);
    });
    toggleLoader(false);
}

const markCounter = (postTitle, viewCount) =>{
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const markCounterPlus = document.getElementById('markCounterPlus');
    const markAsReadNewDiv = document.createElement('div');
    
    markAsReadNewDiv.innerHTML = `
            <div class="my-4 rounded-lg px-4 py-2 bg-white flex justify-between items-center text-lg">
                            <div>
                                <p class="font-semibold w-56">
                                    ${postTitle}
                                </p>
                            </div>
                            <div class="flex gap-2">
                                <div><i class="fa-regular fa-eye"></i></div>
                                <div>${viewCount}</div>
                            </div>
                        </div>
            `
    markAsReadContainer.appendChild(markAsReadNewDiv);        
    markCounterPlus.innerText = parseInt(markCounterPlus.innerText) + 1;
    
}

const searchHandler = () =>{
    toggleLoader(true);
    const searchField = document.getElementById('searchField');
    const searchFieldValue = searchField.value.trim();
    if (searchFieldValue === '') {
        setTimeout(() => {
            toggleLoader(false);
            displayNoDataMessage();
        }, 2000);
    } else {
        
        setTimeout(() => {
            loadPosts(searchFieldValue);
            toggleLoader(false);
        }, 2000);
    } 
}

const displayNoDataMessage = () => {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.textContent = ''; 
    const noDataMessage = document.createElement('div');
    noDataMessage.textContent = 'No Data Available !';
    noDataMessage.className = 'text-center text-red-500 mt-4 text-4xl font-semibold';
    postsContainer.appendChild(noDataMessage);
}

const toggleLoader = (isLoading) =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden')
    } else{
        loader.classList.add('hidden')
    }
}

const loadLatestPosts = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    const latestPostContainer = document.getElementById('latestPostContainer');
    
    data.forEach(post => {
        const postBox = document.createElement('div');
        postBox.className = 'mx-2 lg:mx-0 rounded-xl p-4 grid grid-cols-1 gap-3 border-[1px]';

        postBox.innerHTML = `
            <div>
                <img src="${post.cover_image}" class='rounded-lg' alt="Cover Image">
            </div>
            <div class="flex gap-2">
                <div><i class="fa-solid fa-calendar-days"></i></div>
                <div>${post.author.posted_date ? `<p>${post.author.posted_date}</p>` : 'No Publish Date' }</div>
            </div>
            <h4 class='font-bold text-xl'>${post.title}</h4>
            <p>${post.description}</p>
            <div class="flex gap-4 items-center">
                <div>
                    <img src="${post.profile_image}" class='w-14 rounded-full' alt="Profile Image">
                </div>
                <div>
                    <h6 class='font-bold text-xl'>${post.author.name}</h6>
                    ${post.author.designation ? `<p>${post.author.designation}</p>` : 'Unknown'}
                </div>
            </div>
        `;
        latestPostContainer.appendChild(postBox);
    });
}

loadLatestPosts();