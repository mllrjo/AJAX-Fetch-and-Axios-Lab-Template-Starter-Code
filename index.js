//import { createPopper } from '@popperjs/core/index.js';
import * as Carousel from './Carousel.js';
// You have axios, you don't need to import it
console.log(axios);

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

// Step 0: Store your API key here for reference and easy access.
const API_KEY = 'live_RqcpufqIYDEej0P93azEfd3pLZny3o83qjdH9yOy33owj36dahrNmx5ZE3JWqdUc';

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
console.log("test");
async function breedInfo() {
  let breedId = document.getElementById("breedSelect").value;
  console.log(breedId);
  try {
    let query = "https://api.thecatapi.com/v1/breeds/" + breedId;
    console.log(query);
    const response = await fetch(query , {
    method: "GET",
    headers: { "Content-Type": "application/json", "mode": "no-cors" },
    // body: 'this will contain any data you need to send to the server. MUST BE STRING'
    });
    const breedData = await response.json();
    console.log(breedData);
    let breedTraits = Object.entries(breedData).map(([key, value]) => ({[key] : value}));
    for (let i = 0; i < breedTraits.length; i++) {
      console.log(breedTraits[i]);
    }
    let infoDumpElement = document.getElementById("infoDump");
    infoDumpElement = breedData;

  } catch (error) { 
    console.error(error);
  }
}

async function initialLoad() {
  try {
    /* Limit to 10 for testing purposes */
    const response = await fetch("https://api.thecatapi.com/v1/breeds/?limit=10", {
    //const response = await fetch("https://api.thecatapi.com/v1/breeds", {
    // method: "POST",
    headers: { "Content-Type": "application/json", "mode": "no-cors" },
    // body: 'this will contain any data you need to send to the server. MUST BE STRING'
    });
    const data = await response.json();
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    return data;
  } catch (error) { 
    console.error(error);
  }
}
async function main() {
  const data = await initialLoad();
  console.log(data.length);
  let breedSelectEl = document.getElementById("breedSelect");
  for (let i = 0; i < data.length; i++) {
    var entry = document.createElement("option");
    entry.value = data[i].id; // setAttribute
    entry.innerText = data[i].name; // textContent
    breedSelectEl.appendChild(entry);
  }
  console.log(breedSelectEl);

  retrieveBreed();
}
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
**/
// async function addFavourites() {}


async function load(data) {
  Carousel.clear();
  Carousel.start();
  let carouselItem;
  var breedId = document.getElementById("breedSelect").value; 
  const imgAlt = [];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    imgAlt[i] = breedId + "." + i;
    carouselItem = Carousel.createCarouselItem(data[i].url, imgAlt[i], data[i].id);
    Carousel.appendCarousel(carouselItem);

  }
}

async function retrieveBreed() {
  let breedSelectEl = document.getElementById("breedSelect");
  breedSelectEl.onchange = async function() {
    var breedId = document.getElementById("breedSelect").value;
        // for (let i = 0; i < data.length; i++) {
        //   console.log(data[i]);
      //  createCarouselItem(data[i]., imgAlt, imgId)
       //  }
    console.log(breedId);
    breedInfo();
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=" + breedId + "\&api_key=" + API_KEY, {
        // method: "GET",
        headers: { "Content-Type": "application/json", "mode": "no-cors" },
        // body: 'this will contain any data you need to send to the server. MUST BE STRING'
      });
      try {
        const data = await response.json();
        console.log(data);
        console.log(data.length);
        const data_response = await load(data);
      } catch (error) {
        console.error("json ", error);
      }
    } catch (error) {
      console.error("fetch ", error);
    }
 
  }

}


main();

// At this point you need to pusth your code to your own GitHub repo
// go to the folder you cloned in today and clone your repo and give it the name below.

// Carousel.createCarouselItem();
/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */