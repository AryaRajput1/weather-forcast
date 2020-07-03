const form= document.querySelector("form");
const inp= document.querySelector("input");
const datasec=document.querySelector(".data");
const locations=document.querySelector(".location");
const formm=document.querySelector(".formaxandmin");
form.addEventListener('submit',(e)=>{
e.preventDefault();
datasec.innerHTML='loading....';
formm.innerHTML='';
locations.innerHTML='';
const url=`/product/?addresss=${inp.value}`;
console.log('submit');

fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            datasec.innerHTML=data.error;
        }
        else{
            let datatext=`the temp is ${Math.round(data.temp)} &deg;C and weather : ${data.sky}`;
        datasec.innerHTML=datatext;
           let  maxmin=`the max temp is ${Math.round(data.temp_max)} &deg;C and the min temp is ${Math.round(data.temp_min)} &deg;C`;
      formm.innerHTML=maxmin;
           let locationtext=data.location;
        locations.innerHTML=locationtext;
        inp.value='';
        }
    })

})

})
