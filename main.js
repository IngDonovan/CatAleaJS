const URLcats = 'https://api.thecatapi.com/v1/';
const URLdogs = 'https://api.thedogapi.com/v1/';
const RANDOM = 'images/search?';
const LIMIT_RANDOM ='limit=4';
const FAVORITES ='favourites';
const VARIA = '?';
const KEY = 'live_6agBLVVqmOqSNnQXbs6ly0H0OcK6vNfqzPqcIkBoSj8isN0HJGcFSKojyQGGpOGU';
const UPLOADIMG = 'images/upload'

const apiCAT = axios.create({
baseURL: URLcats,
});
apiCAT.defaults.headers.common['X-API-KEY'] = KEY;

const button = document.querySelector('#reloadButton');
const buttonDog = document.querySelector('#newDogButton');

const images = document.querySelectorAll('#randomCat img');
const imgSaveFav = document.querySelectorAll('#favorites img');
const spanError = document.querySelector('#beError');

async function getAndAssignImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
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
    const response = await fetch(`${URLcats}${RANDOM}${LIMIT_RANDOM}&api_key=${KEY}`);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    console.log('MoreCats');
    console.log(data);

    images.forEach((img, index) => {
      img.src = data[index].url;
      const id = data[index].id;
      //console.log(id);
      const saveButton = document.getElementById(`btn${index + 1}`);
      saveButton.addEventListener('click', () => createSaveFavoritesHandler(id));
    });

    function createSaveFavoritesHandler(id) {
      saveFavorites(id);
      console.log(id);
    }
  } catch (error) {
    console.log('Ocurrió un error: ', error.message);
    spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
  }
}

async function loadFavorites() {
  try {
    const response = await fetch(`${URLcats}${FAVORITES}`, {
      headers: {
        'X-API-KEY': KEY,
      },
    });
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    console.log('Favorites Load');
    console.log(data);

    const section = document.getElementById('favorites');
    section.innerHTML = ''; // Vaciar el contenido del contenedor antes de agregar nuevas imágenes

    data.forEach(cat => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Borrar');

      img.src = cat.image.url;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavorites(cat.id);

      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  } catch (error) {
    console.log('Ocurrió un error: ', error.message);
    spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
  }
}

async function saveFavorites(id) {
  try {
    //con axios:
    const {data, status} = await apiCAT.post(FAVORITES, {
      image_id: id,
    });//response ya tiene automaticamente a data por dentro
    
    console.log(status);
    console.log(data);
    if (status !== 200 ) throw new Error(status);
    console.log('save in favorites with axios');

    // const response = await fetch(`${URLcats}${FAVORITES}`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //     'X-API-KEY': KEY,
    //   },
    //   body: JSON.stringify({
    //     image_id: id,
    //   }),
    // });
    //if (!response.ok) throw new Error(response.status);
    // const data = await response.json();

    //console.log('save in favorites');
    // console.log(response);
    // console.log(data);
    loadFavorites();
  } catch (error) {
    console.log('Ocurrió un error: ', error.message);
    spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
  }
}

async function deleteFavorites(id) {
  try {
    const response = await fetch(`${URLcats}${FAVORITES}/${id}${VARIA}api_key=${KEY}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    console.log('delete to favorites');
    console.log(response);
    console.log(data);
    loadFavorites();
  } catch (error) {
    console.log('Ocurrió un error: ', error.message);
    spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
  }
}

async function uploadPhoto() {
  
  try {
    const form = document.querySelector('#uploadingForm');
    const formData = new FormData(form);
  
    console.log(formData.get('file'));
    const response = await fetch(`${URLcats}${UPLOADIMG}`, {
      method: 'POST',
      headers: {
        // 'content-type': 'multipart/form-data',
        'X-API-KEY': KEY,
      },
      body: formData,
    });
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    console.log('Subido');
    console.log(response);
    console.log(data);
    console.log(data.url);
    
    saveFavorites(data.id);
    loadFavorites();
  } catch (error) {
    console.log('Ocurrió un error: ', error.message);
    spanError.innerHTML = `<img src="https://http.cat/${error.message}" alt="Error">`;
  }
}

getAndAssignImage(`${URLcats}${RANDOM}`);

button.addEventListener('click', async () => {
  await getAndAssignImage(`${URLcats}${RANDOM}`);
});

buttonDog.addEventListener('click', async () => {
  await getAndAssignImage(`${URLdogs}${RANDOM}`);
});

// const previewImage = async () => {
//   const file = document.getElementById("file").files;
//   console.log(file);
//   if (file.length > 0) {
//     const fileReader = new FileReader();

//     fileReader.onload = function(e) {
//       document.getElementById("preview").setAttribute("src", e.target.result);
//     };
//     fileReader.readAsDataURL(file[0]);
//   }
// }
// previewImage();
moreCats();
loadFavorites();