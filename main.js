const URLcat = 'https://api.thecatapi.com/v1/images/search';
const URLdog = 'https://api.thedogapi.com/v1/images/search'
const button = document.querySelector('#reloadButton');


// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     });

//cambiar por un boton para recargar y usar async y await

//los cambios del profe

async function reload() {
    try{
        const response = await fetch(URLdog);
        const data = await response.json();

        const img = document.querySelector('img');
        img.src = data[0].url;
    }catch(error){
        console.log('Ocurrió un error: ', error);
    }
}//me parece mejor esta implementación

//la mia anterior

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

