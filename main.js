const URL = 'https://api.thecatapi.com/v1/images/search';
const button = document.querySelector('#reloadButton');


// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     });

//cambiar por un boton para recargar y usar async y await

async function llamarURL() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
    } catch (error) {
        console.log('Ocurrió un error: ', error); 
    }
  }
llamarURL();
  
  //



button.addEventListener('click', async () => {
    try{
        const response = await fetch(URL);
        const data = await response.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
    }catch(error){
        console.log('Ocurrió un error: ', error);
    }
});

