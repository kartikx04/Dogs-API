// Function to fetch images from the API
async function fetchImages(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.message; // Assuming the response contains an array of image URLs
    } catch (error) {
      console.error('Error fetching images:', error);
      return []; // Return an empty array if there's an error
    }
  }

  // Function to populate the container with images
  async function populateImages(containerId, imageUrlArray) {
    const container = document.getElementById(containerId);
    if (!container) return; // Return early if container element not found

    const imageUrls = await fetchImages(imageUrlArray); // Fetch image URLs from the API

    // Loop through the image URLs
    imageUrls.forEach(imageUrl => {
        



      // Create a div element for each image
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('imageContainer');
      // Create an image element
      const imageElement = document.createElement('img');
      imageElement.classList.add('image-item'); // css class for image
      imageElement.src = imageUrl; // Set the src attribute to the image URL
      // Append the image element to the div
      imageDiv.appendChild(imageElement);
      // Append the div to the container
      container.appendChild(imageDiv);
    });
  }

  // Populate the container with images
  populateImages('image-container', 'https://dog.ceo/api/breeds/image/random/6');