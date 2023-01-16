let userInfo = JSON.parse(localStorage.getItem("userInfo"));
const {name, username, cardColor} = userInfo;

const cardColorsObj = {
    'black': './card_colors/Black_card_back_1.jpeg',
    'blue': './card_colors/Blue_card_back_0.png',
    'red': './card_colors/Red_card_back.png'

};

const cardValuesObj = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "JACK": 10,
    "QUEEN": 10,
    "KING": 10,
    "ACE": 11
};

// Variables

const currCardColorFile = cardColorsObj[cardColor];
const delay = 2000;
const deckOfCardsDiv = document.querySelector('.deckOfCardsDiv');
const deckImage = document.createElement('img');
const dealBtn = document.querySelector('.dealBtn');
const dealerCardSlot1 = document.querySelector('.dealerCardSlot1');
const dealerCardSlot2 = document.querySelector('.dealerCardSlot2');
const playerCardSlot1 = document.querySelector('.playerCardSlot1');
const playerCardSlot2 = document.querySelector('.playerCardSlot2');
const usernameHeader = document.querySelector('.username');
let deckId;
let dealerCard1;
let dealerCard2;
let playerCard1;
let playerCard2;
let remainingCardCount;
usernameHeader.textContent = username;

// EventListeners
dealBtn.addEventListener('click', dealCards);






// Functions

function appendDeckImage() {
    deckImage.setAttribute('src', currCardColorFile);
    deckImage.setAttribute('alt', `${cardColor} playing card`);
    deckOfCardsDiv.append(deckImage);
    deckImage.classList.add('deckImage');
}

function appendCardToCardSlot(slot, cardObj) {

    const cardImageElement = document.createElement('img');
    cardImageElement.setAttribute('src', cardObj.image);
    cardImageElement.setAttribute('alt',`${cardObj.value} of ${cardObj.suit}`);
    slot.append(cardImageElement);

    if (slot === dealerCardSlot2) {
        const cardBackImageElement = document.createElement('img');
        cardBackImageElement.setAttribute('src', `${cardColorsObj[cardColor]}`);
        cardBackImageElement.setAttribute('alt', `${cardColor} back card`);
        slot.append(cardBackImageElement);
    }
}

function assignCardInfo(slot, cardObj) {
    // make assignments after promise is fulfilled
    console.log(slot);
    cardObj.then(result => {
        switch (slot) {
            case dealerCardSlot1:
                console.log(1);
                dealerCard1 = result;
                appendCardToCardSlot(dealerCardSlot1, dealerCard1);
                break;
            case dealerCardSlot2:
                console.log(2);

                dealerCard2 = result;
                appendCardToCardSlot(dealerCardSlot2, dealerCard2);
                break;
            case playerCardSlot1:
                console.log(3);

                playerCard1 = result;
                appendCardToCardSlot(playerCardSlot1, playerCard1);
                break;
            case playerCardSlot2:
                console.log(4);

                playerCard2 = result;
                appendCardToCardSlot(playerCardSlot2, playerCard2);
                break;
        }

    });
}

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

function dealCards() {
    dealCardToPlayer()
        .then(dealCardToDealer)
        .then(dealCardToPlayer)
        .then(dealCardToDealer);
}

function dealCardToPlayer() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if(!playerCardSlot1.hasChildNodes()) {
                assignCardInfo(playerCardSlot1, drawOneCard());
            } else {
                assignCardInfo(playerCardSlot2, drawOneCard());
            }

            resolve();
        }, delay);
    });
}


function dealCardToDealer() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (!dealerCardSlot1.hasChildNodes()) {
                assignCardInfo(dealerCardSlot1, drawOneCard());
            } else {
                assignCardInfo(dealerCardSlot2, drawOneCard());
            }
            resolve();
        }, delay);
    });
}


// create a function that will take drawOneCard() and extract the object as a return value use that value in the deal cards functions that will then be used in the appendCardsToSlot function
function drawOneCard() {
    const drawCardApi = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    const drawnCardObj = {};
    return makeApiCall(drawCardApi).then(result => {
        drawnCardObj.deckId = result.deck_id;
        drawnCardObj.value = result.cards[0].value;
        drawnCardObj.image = result.cards[0].image;
        drawnCardObj.suit = result.cards[0].suit;
        remainingCardCount = result.remaining;
        return drawnCardObj;
    });

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