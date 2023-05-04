const URLcat = 'https://api.thecatapi.com/v1/images/search';
const URLdog = 'https://api.thedogapi.com/v1/images/search';
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';//query parameters 3 imagenes
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

async function moreCats() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data);
        const img1 = document.querySelector('.cat-1');
        const img2 = document.querySelector('.cat-2');
        const img3 = document.querySelector('.cat-3');
        const img4 = document.querySelector('.cat-4');
        const img5 = document.querySelector('.cat-5');
        const img6 = document.querySelector('.cat-6');
        const img7 = document.querySelector('.cat-7');
        const img8 = document.querySelector('.cat-8');
        const img9 = document.querySelector('.cat-9');
        const img10 = document.querySelector('.cat-10');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;
        img7.src = data[6].url;
        img8.src = data[7].url;
        img9.src = data[8].url;
        img10.src = data[9].url;

    }catch(error){
        console.log('Ocurrió un error: ', error);
    }
}
moreCats()

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

