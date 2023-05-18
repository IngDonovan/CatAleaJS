const URLcats = 'https://api.thecatapi.com/v1/';
const URLdogs = 'https://api.thedogapi.com/v1/';
const RANDOM = 'images/search?';
const LIMIT_RANDOM ='limit=4';
const FAVORITES ='favourites';
const VARIA = '?';
const KEY = '&api_key=live_6agBLVVqmOqSNnQXbs6ly0H0OcK6vNfqzPqcIkBoSj8isN0HJGcFSKojyQGGpOGU';

const button = document.querySelector('#reloadButton');
const buttonDog = document.querySelector('#newDogButton');

const images = document.querySelectorAll('#randomCat img');
const imgSaveFav = document.querySelectorAll('#favorites img');
const spanError =document.querySelector('#beError');

let id;

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
        id = data[index].id;
        console.log(id);
        const saveButton = document.getElementById(`btn${index + 1}`);
        saveButton.addEventListener('click', createSaveFavoritesHandler(id));
      });
      
      function createSaveFavoritesHandler(id) {
        return function () {
          saveFavorites(id);
          console.log(id);
        };
      }
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;

    }
  }
  async function loadFavorites() {
    try {
      const response = await fetch(URLcats+FAVORITES+VARIA+KEY);
      const status = response.status;
      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('Favorites');
      console.log(data);

      const section = document.getElementById('favorites');
      section.innerHTML = ''; // Vaciar el contenido del contenedor antes de agregar nuevas imágenes

      data.forEach(cat => {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Borrar')
        
        img.src = cat.image.url
        btn.appendChild(btnText);

        btn.onclick = () => deleteFavorites(cat.id);

        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      })
      
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
    }
  }

  async function saveFavorites(id) {
    try {
      const response = await fetch(URLcats+FAVORITES+VARIA+KEY, {
        method: 'POST',
        headers: {'content-type': 'application/json'},// tipo de archivo de la solicitud
        body: JSON.stringify({ 
          "image_id": `${id}`
          //"sub_id":"user-123"
           })
      });
      const status = response.status;
      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('save');
      console.log(response);
      console.log(data);
      loadFavorites();
      
    } catch (error) {
      console.log('Ocurrió un error: ', error.message);
      spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
    }
  }

  async function deleteFavorites(id) {
    try {
      const response = await fetch(URLcats+FAVORITES+'/'+id+VARIA+KEY, {
        method: 'DELETE',
        
      });
      const status = response.status;
      if (status !== 200) throw new Error(status);
      const data = await response.json();
      console.log('delete');
      console.log(response);
      console.log(data);
      loadFavorites();
      
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
  
  moreCats();
  loadFavorites();