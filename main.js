const URLcat = 'https://api.thecatapi.com/v1/images/search';
const URLdog = 'https://api.thedogapi.com/v1/images/search';
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';//query parameters 3 imagenes
const button = document.querySelector('#reloadButton');
const buttonDog = document.querySelector('#newDogButton');
const images = document.querySelectorAll('.multiplesCat img');

async function getAndAssignImage(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      const img = document.querySelector('img');
      img.src = data[0].url;
    } catch (error) {
      console.log('Ocurrió un error: ', error); 
    }
  }
  
  async function moreCats() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      console.log(data);
      images.forEach((img, index) => {
        img.src = data[index].url;
      });
  
    } catch (error) {
      console.log('Ocurrió un error: ', error);
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