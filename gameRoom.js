let userInfo = JSON.parse(localStorage.getItem("userInfo"));
const {name, username, cardColor} = userInfo;

const cardColorsObj = {
    'black': './card_colors/Black_card_back_1.jpeg',
    'blue': './card_colors/Blue_card_back_0.png',
    'red': './card_colors/Red_card_back.png'

};

const currCardColorFile = cardColorsObj[cardColor];

const deckOfCardsDiv = document.querySelector('.deckOfCardsDiv');
const deckImage = document.createElement('img');
const usernameHeader = document.querySelector('.username');
let deckId;
usernameHeader.textContent = username;

function assignDeckId(promise) {
    promise.then(result => {
        deckId = result.deck_id;
        shuffleDeck(deckId);
    });
}

function callNewDeck() {
    const newDeckApi = 'https://deckofcardsapi.com/api/deck/new/';
    assignDeckId(makeApiCall(newDeckApi));
}

function appendDeckImage() {
    deckImage.setAttribute('src', currCardColorFile);
    deckImage.setAttribute('alt', `${cardColor} playing card`);
    deckOfCardsDiv.append(deckImage);
    deckImage.classList.add('deckImage');
}

function makeApiCall(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}

function shuffleDeck(deckId) {
    const shuffleApi = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    makeApiCall(shuffleApi).then(result => console.log(result));
}

window.onload = () => {
    callNewDeck();
    appendDeckImage();
};