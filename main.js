const URLcat = 'https://api.thecatapi.com/v1/images/search';
const URLdog = 'https://api.thedogapi.com/v1/images/search';
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';//query parameters 3 imagenes
const button = document.querySelector('#reloadButton');


async function reload() {
    try{
        const response = await fetch(URLdog);
        const data = await response.json();

        const img = document.querySelector('img');
        img.src = data[0].url;
    }catch(error){
        console.log('Ocurrió un error: ', error);
    }
}

async function llamarURL() {
    try {
        const response = await fetch(URLcat);
        const data = await response.json();
        
        const img = document.querySelector('img');
        img.src = data[0].url;
    } catch (error) {
        console.log('Ocurrió un error: ', error); 
    }
  }
llamarURL();

button.addEventListener('click', async () => {
    try{
        const response = await fetch(URLcat);
        const data = await response.json();

        const img = document.querySelector('img');
        img.src = data[0].url;
    }catch(error){
        console.log('Ocurrió un error: ', error);
    }
});

async function moreCats() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      console.log(data);
      const images = document.querySelectorAll('.multiplesCat img');
        console.log(images);
      images.forEach((img, index) => {
        img.src = data[index].url;
      });
  
    } catch (error) {
      console.log('Ocurrió un error: ', error);
    }
  }
  
  moreCats();
