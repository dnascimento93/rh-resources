"use strict";


// Check for a button every second
let checkForButton = setInterval(() => {
    let checkURL = window.location.href.includes('/stocks/');
    
    // If on a stock page and button does not exist then create one
    if (checkURL) {
        if (!buttonCreated)
        createButton();
    
    // If not on a stock page and button exists then remove it
    } else if (!checkURL) {
        if (buttonCreated)
        removeButton();
}

}, 1000);



// Create a button and link elements
const stocktwitsButton = document.createElement("button");
const stocktwitsLink = document.createElement("a");

// Copy RH styles as close as possible
const style = document.createElement("style");
style.textContent = `
.rh-resources-button-style {
    background-color: rgb(0, 200, 5);
    color: rgb(30, 33, 36);
    border: none;
    border-radius: 24px;
    font-weight: 800;
    font-size: 12px;
    padding: 6px;
}
.rh-resources-button-style:hover {
    background-color: rgba(38, 208, 43, 1);
    cursor: pointer;
}
`;
document.head.appendChild(style);
stocktwitsButton.classList.add("rh-resources-button-style");


let buttonCreated = false;
function createButton() {
    let ticker = getTickerSymbol();
    stocktwitsButton.textContent = ticker + " StockTwits";
    stocktwitsLink.href = "https://stocktwits.com/symbol/" + ticker;
    stocktwitsLink.target = "_blank";
    stocktwitsLink.appendChild(stocktwitsButton);
    document.querySelector("h1").insertAdjacentElement("afterend", stocktwitsLink);
    buttonCreated = true;
}

function removeButton() {
    stocktwitsButton.remove();
    buttonCreated = false;
}

function getTickerSymbol() {
    return document.title.split(" ")[0];
}
