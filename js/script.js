// The for...in statement iterates over all enumerable properties of 
// an object that are keyed by strings (ignoring ones keyed by Symbols)
// , including inherited enumerable properties.

const dropList = document.querySelectorAll(".drop-list select");//select
const fromCurrency = document.querySelector(".from select");//.from select
const toCurrency = document.querySelector(".to select");//.to select
const getButton = document.querySelector("form button");//button
const ups = "3e4ba08f2c1025dac9ba41a1";//a

// console.log(dropList);


// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }

// Get currency_code
//let dropList = [0,1,2,3,4,5...160];
for (let i = 0; i < dropList.length; i++) {
    //dropList.length = 2
    for (currency_code in country_code) {

        // console.log(dropList[0]);
        //Selecting USD by default as FROM currency and NPR as To currency
        let selected;
        // i = 0 hye el wejha el awle ,wel tenye hye i =1 hye wejha , li2an i = 0 hye wejha
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
        dropList[i].insertAdjacentHTML("beforeend", optionTag);// hayde btetba3 el option jawa el Two Select
        //dropList[0]
        //dropList[1]


    }

    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onchange

    //select.addEventListener
    dropList[i].addEventListener("change", e => {
        //dropList[i] hye el select bi mu7taweha
        loadFlag(e.target);//calling loadFlag with passing target element as an argument
        //   e.target = select
    });

}





//Load flag
function loadFlag(element) {

    for (code in country_code) {
        //code hye key deyman
        if (code == element.value) {//if currency code of country list is equal to option value
            // console.log(element.value);
            let imgTag = element.parentElement.querySelector("img");//Selecting img Tag of particular drop List
            // console.log(element);
            // https://flagpedia.net/download/api
            //passing country code of a selected currency code in a img url
            // https://flagcdn.com/48x36/us.png
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
            // imgTag.src = `https://www.countryflags.io/${country_code[code]}/flat/64.png`;
        }
    }
}







//onload
window.addEventListener("load", () => {
    getExchangeRate();
});



// Form is submitting on button click.We've to STOP IT
getButton.addEventListener("click", e => {
    e.preventDefault(); //Preventing form from submitting
    getExchangeRate();
})



//exchange
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;//temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value;//passing To currency code to From currency code
    toCurrency.value = tempCode;//passing temporary currency code to To currency code
    //Changing Flag
    loadFlag(fromCurrency);//calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency);//calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate();
});



//Get ExchangeRate
function getExchangeRate() {
    const amount = document.querySelector(".amount input");//input li bthot fia ra2em
    const exchangeRateTxt = document.querySelector(".exchange-rate");//div li byenkatab fia text

    let amountVal = amount.value;//1
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
        let exchangerate = result.conversion_rates[toCurrency.value];// el te7will 1507
        console.log(result);
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2);//total jaweb 1507
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        // console.log(totalExchangeRate);

    }).catch(() => { //if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    })

}





// const dropList = document.querySelector(".d");//select
// let country_code = {
//     "AED": "AE",
//     "AFN": "AF",
//     "XCD": "AG",
//     "ALL": "AL",
//     "AMD": "AM"
//     }
//        for (currency_code in country_code) {
//        dropList.innerHTML += `<option value="${currency_code}">${currency_code}</option>`
//        }
