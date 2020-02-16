const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = search.value;
    fetch('/weather?address='+loc).then((response) => {
   response.json().then((data) => {
     if(data.error){
         msgOne.textContent= data.error;
         msgTwo.textContent= '';
     }else{
      msgOne.textContent = data.address;
      msgTwo.textContent = data.temperature;
     }
   });
   });

});