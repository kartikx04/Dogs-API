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
        //const imageDiv = document.querySelector(".flex-container");
        imageDiv.classList.add('imageContainer');
        const imageElement = document.createElement("img");
        imageElement.classList.add('image-item');

        imageElement.src=imageUrl;

        imageDiv.appendChild(imageElement);
        container.appendChild(imageDiv);

    })}

populateImages("image-container",'https://dog.ceo/api/breeds/image/random/6');


// // button

// //Load more
// const btn = document.querySelector(".button");
// btn.addEventListener("click",function(){
//     populateImages("image-container","https://dog.ceo/api/breeds/image/random/3")
// })

//Scroll to top

const scroll = document.querySelector(".scrollTop");

scroll.addEventListener("click",function(){
    window.scrollTo({top:0,behavior:"smooth"})
})

// Function to check if the user has scrolled to the bottom of the page
function isAtBottom() {
    console.log("atBottom");
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    
  }

  // Function to handle scroll event
// function handleScroll() {
//     console.log("entered")
//     if (isAtBottom()) {
//     console.log("populated");
//     populateImages("image-container","https://dog.ceo/api/breeds/image/random/3");
//     }
//   }

  // Add scroll event listener
window.addEventListener('scroll', handleScroll);


  
  // Show or hide loading icon based on scroll position
  function handleScroll() {
    var loadingIcon = document.getElementById('loadingIcon');
    if (isAtBottom()) {
        populateImages("image-container","https://dog.ceo/api/breeds/image/random/3");
      loadingIcon.style.display = 'block';
      // Simulated loading process (setTimeout is used here, replace with actual loading process)
      setTimeout(function() {
        loadingIcon.style.display = 'none';
        // Trigger the function to load more content here
      }, 2000); // Simulated loading time of 2 seconds
    } else {
      loadingIcon.style.display = 'none';
    }
  }

// Login card

const openCardBtn = document.getElementById('openCardBtn');
const closeCardBtn = document.querySelector('.close-card-btn');
const cardContainer = document.querySelector('.card-container');

console.log(openCardBtn);
console.log(closeCardBtn);
console.log(cardContainer);

openCardBtn.addEventListener('click', function() {
  cardContainer.style.display = 'flex';
});

closeCardBtn.addEventListener('click', function() {
  cardContainer.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === cardContainer) {
    cardContainer.style.display = 'none';
  }
});

// LOGIN Details 

const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Perform client-side validation if needed

  // Send the login request to the server
  sendLoginRequest(username, password);
});

function sendLoginRequest(username, password) {
  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Open a POST request to the server-side script
  xhr.open('POST', 'login.php', true);

  // Set the request header for sending form data
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Define the callback function for handling the server response
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Login successful
      messageDiv.textContent = 'Login successful!';
      // Redirect the user or perform additional actions
    } else {
      // Login failed
      messageDiv.textContent = 'Invalid username or password';
    }
  };

  // Send the request with the username and password
  xhr.send(`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
}