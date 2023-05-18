const URLcats = 'https://api.thecatapi.com/v1/';
const URLdogs = 'https://api.thedogapi.com/v1/';
const RANDOM = 'images/search?';
const LIMIT_RANDOM ='limit=4';
const FAVORITES ='favourites?';
const KEY = '&api_key=live_6agBLVVqmOqSNnQXbs6ly0H0OcK6vNfqzPqcIkBoSj8isN0HJGcFSKojyQGGpOGU';

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
      const response = await fetch(URLcats+RANDOM+LIMIT_RANDOM+KEY);
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
  async function loadFavorites() {
    try {
      const response = await fetch(URLcats+FAVORITES+KEY);
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

  let rawBody = JSON.stringify({ 
    "image_id": "wJyw82pIl"
    //"sub_id":"user-123"
     });

  async function saveFavorites() {
    try {
      const response = await fetch(URLcats+FAVORITES+KEY, {
        method: 'POST',
        headers: {'content-type': 'application/json'},// tipo de archivo de la solicitud
        body: rawBody
      });
      const status = response.status;
      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('save');
      console.log(response);
      console.log(data);
      
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
    }
  }

  
  getAndAssignImage(URLcats+RANDOM);
  
  button.addEventListener('click', async () => {
    await getAndAssignImage(URLcats+RANDOM);
  });
  
  buttonDog.addEventListener('click', async () => {
    await getAndAssignImage(URLdogs+RANDOM);
  });

  loadFavorites();
  moreCats();
  