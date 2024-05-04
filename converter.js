const baseUrl='https://latest.currency-api.pages.dev/v1/currencies';
const dropdownSelect=document.querySelectorAll('.select-container select');
const btn=document.querySelector('form button');
let amount=document.querySelector(".amount input");
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
let msg=document.querySelector('.msg');
for(let select of dropdownSelect){
        for(let currCodes in countryList){
            let newOption=document.createElement("option");
            newOption.innerText=currCodes;
            newOption.value=currCodes;
            if(select.name==="from" && currCodes==="USD"){
                newOption.selected="selected";
            }else if(select.name==="to" && currCodes==="INR"){
                newOption.selected="selected";
            }
            select.appendChild(newOption);
        }
}

  for(let select of dropdownSelect){ 
    select.addEventListener("change",(e)=>{
       updateFlag(e.target);
    })
  }

  function updateFlag(element){
    let currCodes=element.value;
    let countryCode=countryList[currCodes];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    const select=element.parentElement.querySelector("img");
    select.src=newSrc;
  }

  btn.addEventListener("click", async function (event){
    event.preventDefault();
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<1){
        amount.value="1";
       amtVal=1;
    }
    const url=`${baseUrl}/${fromCurr.value.toLowerCase()}.json`;

    const response=await fetch(url);
    const data=await response.json();
    console.log(data);
    console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
    const rate=amtVal*(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
    msg.innerText=`${amtVal} ${fromCurr.value}=${rate}${toCurr.value}`;
   })
