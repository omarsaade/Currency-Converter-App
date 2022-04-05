// The for...in statement iterates over all enumerable properties of 
// an object that are keyed by strings (ignoring ones keyed by Symbols)
// , including inherited enumerable properties.

const dropList = document.querySelectorAll(".drop-list select");//inside select
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const ups = "3e4ba08f2c1025dac9ba41a1";

for (let i = 0; i < dropList.length; i++) {


    for (currency_code in country_code) {


        //Selecting USD by default as FROM currency and NPR as To currency
        let selected;
        // i = 0 hye el wejha el awle  ,wel tenye hye i =1 hye wejha , li2an i = 0 hye wejha
        //3al shmell ma mafina na3tia marten lal i = 0 selected
        if (i == 0) {// selected 3a usd //if ,else inside if elseif
            selected = currency_code == "USD" ? "selected" : "";
            //let selected  = "selected"; 
            // currency_code == "USD";
        } else if (i == 1) {//selected 3a NPR
            selected = currency_code == "NPR" ? "selected" : "";
            //let selected  = "selected"; 
            // currency_code = "NPR"
        }



        //creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);

    }

    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onchange

    dropList[i].addEventListener("change", e => {
        //dropList[i] hye el select bi mu7taweha
        loadFlag(e.target);//calling loadFlag with passing target element as an argument
        //   e.target = select
    });

}


function loadFlag(element) {

    for (code in country_code) {
        if (code == element.value) {//if currency code of country list is equal to option value
            // console.log(element.value);
            let imgTag = element.parentElement.querySelector("img");//Selecting img Tag of particular drop List
            // console.log(element);
            // https://flagpedia.net/download/api
            //passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
            // imgTag.src = `https://www.countryflags.io/${country_code[code]}/flat/64.png`;
        }
    }
}








window.addEventListener("load", () => {
    getExchangeRate();
});



// Form is submitting on button click.We've to STOP IT
getButton.addEventListener("click", e => {
    e.preventDefault(); //Preventing form from submitting
    getExchangeRate();
})




const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;//temporary currency code of FORM drop list
    fromCurrency.value = toCurrency.value;//passing To currency code to From currency code
    toCurrency.value = tempCode;//passing temporary currency code to To currency code
    getExchangeRate();
})



function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");

    let amountVal = amount.value;
    //if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    //Exchanhe rate api
    // https://www.exchangerate-api.com/
    let url = `https://v6.exchangerate-api.com/v6/${ups}/latest/${fromCurrency.value}`;
    //fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        // console.log(totalExchangeRate);

    });

}