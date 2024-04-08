"use strict";
let getURL, ticker;
let buttonsCreated = false;

let checkPageForURL = setInterval(() => {
    getURL = window.location.href;
    
    // Check if on a stock or crypto page
    if (getURL.includes('/stocks/') || getURL.includes('/crypto/')) {        
        ticker = getTickerSymbol();
        
        // If buttons haven't been created yet
        if (!buttonsCreated) {
            createButtons(ticker);
        
        // Buttons have been created but the link is wrong
        } else if (ticker !== seekingalphaLink.href.split('-')[0].split('/').filter(Boolean).pop().toUpperCase()) {
            removeButtons();
            createButtons(ticker);
        }

    // Remove the buttons if not on a stock or crypto page
    } else {
        removeButtons();
    }
}, 1000);

function getTickerSymbol() {
    if (getURL.includes('?')) {
        getURL = getURL.split('?')[0];
    }
    let getTicker = getURL.split('/').filter(Boolean).pop().toUpperCase();
    return getTicker;
}

// TODO? make a container for the buttons?
// const buttonContainer = document.createElement("div");

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
        margin: 2px;
    }
    .rh-resources-button-style:hover {
        background-color: rgba(38, 208, 43, 1);
        cursor: pointer;
    }
`;
document.head.appendChild(style);
const stocktwitsButton = document.createElement("button");
const stocktwitsLink = document.createElement("a");
const marketwatchButton = document.createElement("button");
const marketwatchLink = document.createElement("a");
const finvizButton = document.createElement("button");
const finvizLink = document.createElement("a");
const seekingalphaButton = document.createElement("button");
const seekingalphaLink = document.createElement("a");
const openinsiderButton = document.createElement("button");
const openinsiderLink = document.createElement("a");
stocktwitsButton.classList.add("rh-resources-button-style");
marketwatchButton.classList.add("rh-resources-button-style");
finvizButton.classList.add("rh-resources-button-style");
seekingalphaButton.classList.add("rh-resources-button-style");
openinsiderButton.classList.add("rh-resources-button-style");


function createButtons(ticker) {
    stocktwitsButton.textContent = "StockTwits";
    marketwatchButton.textContent = "MarketWatch";
    finvizButton.textContent = "Finviz";
    seekingalphaButton.textContent = "Seeking Alpha";
    openinsiderButton.textContent = "OpenInsider";
    
    if (getURL.includes('/stocks/')) {
        stocktwitsLink.href = "https://stocktwits.com/symbol/" + ticker;
        marketwatchLink.href = "https://www.marketwatch.com/investing/stock/" + ticker;
        finvizLink.href = "https://finviz.com/quote.ashx?t=" + ticker;
        seekingalphaLink.href = "https://seekingalpha.com/symbol/" + ticker;
        openinsiderLink.href = "http://openinsider.com/" + ticker;
    } else if (getURL.includes('/crypto/')) {
        stocktwitsLink.href = "https://stocktwits.com/symbol/" + ticker + ".X";
        marketwatchLink.href = "https://www.marketwatch.com/investing/cryptocurrency/" + ticker + "USD";
        finvizLink.href = "https://finviz.com/crypto_charts.ashx?t=" + ticker + "USD";
        seekingalphaLink.href = "https://seekingalpha.com/symbol/" + ticker + "-USD";
    }

    stocktwitsLink.target = "_blank";
    marketwatchLink.target = "_blank";
    finvizLink.target = "_blank";
    seekingalphaLink.target = "_blank";
    openinsiderLink.target = "_blank";

    stocktwitsLink.appendChild(stocktwitsButton);
    marketwatchLink.appendChild(marketwatchButton);
    finvizLink.appendChild(finvizButton);
    seekingalphaLink.appendChild(seekingalphaButton);
    openinsiderLink.appendChild(openinsiderButton);

    document.querySelector("h1").insertAdjacentElement("afterend", stocktwitsLink);
    document.querySelector("h1").insertAdjacentElement("afterend", marketwatchLink);
    document.querySelector("h1").insertAdjacentElement("afterend", finvizLink);
    document.querySelector("h1").insertAdjacentElement("afterend", seekingalphaLink);
    if (getURL.includes('/stocks/')) {
        document.querySelector("h1").insertAdjacentElement("afterend", openinsiderLink);
    }
    buttonsCreated = true;
}


function removeButtons() {
    stocktwitsButton.remove();
    marketwatchButton.remove();
    finvizButton.remove();
    seekingalphaButton.remove();
    openinsiderButton.remove();
    buttonsCreated = false;
}
