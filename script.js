let apiKey = "ef8a0a58f0cfa90f3cc5af56";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let fromcurrencyselect = document.getElementById('from-currency-select');
let tocurrencyselect = document.getElementById('to-currency-select');
let amountInput = document.getElementById('amount');
let result = document.getElementById('result');

const currencies = [
  "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", 
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", 
  "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", 
  "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", 
  "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", 
  "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", 
  "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", 
  "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", 
  "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", 
  "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", 
  "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", 
  "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLE", "SOS", "SRD", "SSP", 
  "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", 
  "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", 
  "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL", 
   
];

let myData = {};


async function getData() {
    let res = await fetch(api);
    let data = await res.json();
    myData = data.conversion_rates;  
    console.log(myData);
}
getData();

currencies.forEach((currency) => {
    let optionFrom = document.createElement('option');  
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromcurrencyselect.add(optionFrom);

    let optionTo = document.createElement('option');  
    optionTo.value = currency;
    optionTo.text = currency;
    tocurrencyselect.add(optionTo);
});


document.getElementById('convert-button').addEventListener('click', () => {
    let fromCurrency = fromcurrencyselect.value;
    let toCurrency = tocurrencyselect.value;
    let amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "الرجاء إدخال مبلغ صحيح.";
        return;
    }

    let fromRate = myData[fromCurrency]; 
    let toRate = myData[toCurrency];    

    if (fromRate && toRate) {
        
        let convertedAmount = (amount * toRate) / fromRate;
        result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        result.textContent = "لم يتم العثور على أسعار الصرف.";
    }
});
