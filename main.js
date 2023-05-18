const URLcat = 'https://api.thecatapi.com/v1/images/search';
const URLdog = 'https://api.thedogapi.com/v1/images/search';
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=live_6agBLVVqmOqSNnQXbs6ly0H0OcK6vNfqzPqcIkBoSj8isN0HJGcFSKojyQGGpOGU';//query parameters 3 imagenes
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=4';//query parameters 3 imagenes

const button = document.querySelector('#reloadButton');
const buttonDog = document.querySelector('#newDogButton');
const images = document.querySelectorAll('.multiplesCat img');
const imgFav = document.querySelectorAll('#randomCat img');
const imgSaveFav = document.querySelectorAll('#favorites img');
const spanError =document.querySelector('#beError');


async function getAndAssignImage(url) {
    try {
      const response = await fetch(url);
      const status = response.status;

      if (status !== 200) throw new Error(status);
      const data = await response.json();
      
      const img = document.querySelector('img');
      img.src = data[0].url;
    } catch (error) {
      console.log('Ocurrió un error: ', error); 
      spanError.innerHTML = `https://http.cat/${error}`;
    }
  }
  
  async function moreCats() {
    try {
      const response = await fetch(API_URL);
      const status = response.status;

      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('MoreCats');
      console.log(data);
      images.forEach((img, index) => {
        img.src = data[index].url;
      });
      imgFav.forEach((img, index) => {
        img.src = data[index].url;
      });
  
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;

    }
  }
  async function saveFavorites() {
    try {
      const response = await fetch(API_URL_FAVORITES);
      const status = response.status;

      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('Favorites');
      console.log(data);
      
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
    }
  }

  
  getAndAssignImage(URLcat);
  
  button.addEventListener('click', async () => {
    await getAndAssignImage(URLcat);
  });
  
  buttonDog.addEventListener('click', async () => {
    await getAndAssignImage(URLdog);
  });
  moreCats();
  saveFavorites();