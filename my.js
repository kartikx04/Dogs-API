async function fetchImages(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.message
    }catch(error) {
        console.error("Error fetching URL",error);
        return [];
    }
}

async function populateImages(containerId,arrayUrls) {
    const container = document.getElementById(containerId);
    const imageArray = await fetchImages(arrayUrls);

    imageArray.forEach(imageUrl=>{
        const imageDiv = document.createElement("div");
        imageDiv.classList.add('imageContainer');
        const imageElement = document.createElement("img");
        imageElement.classList.add('image-item');

        imageElement.src=imageUrl;

        imageDiv.appendChild(imageElement);
        container.appendChild(imageDiv);

    })}

populateImages("image-container",'https://dog.ceo/api/breeds/image/random/6');


// button

//Load more
const btn = document.querySelector(".button");
btn.addEventListener("click",function(){
    populateImages("image-container","https://dog.ceo/api/breeds/image/random/3")
})

//Scroll to top

const scroll = document.querySelector(".scrollTop");

scroll.addEventListener("click",function(){
    window.scrollTo({top:0,behavior:"smooth"})
})