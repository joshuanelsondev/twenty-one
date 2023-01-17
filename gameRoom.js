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
const bustBanner = document.createElement('h3');
const currCardColorFile = cardColorsObj[cardColor];
const delay = 2000;
const deckOfCardsDiv = document.querySelector('.deckOfCardsDiv');
const deckImage = document.createElement('img');
const dealBtn = document.querySelector('.dealBtn');
const dealerCardSlot1 = document.querySelector('.dealerCardSlot1');
const dealerCardSlot2 = document.querySelector('.dealerCardSlot2');
const dealerScoreDiv = document.querySelector('.dealerScoreDiv');
const dealerScoreSpan = document.querySelector('.dealerScoreSpan');
const playerCardSlot1 = document.querySelector('.playerCardSlot1');
const playerCardSlot2 = document.querySelector('.playerCardSlot2');
const playerScoreSpan = document.querySelector('.playerScoreSpan');
const twentyOneBanner = document.createElement('h2');
const usernameHeader = document.querySelector('.username');
let deckId;
let dealerCard1;
let dealerCard2;
let dealerScore = 0;
let playerCard1;
let playerCard2;
let playerScore = 0;
let remainingCardCount;
usernameHeader.textContent = username;

// EventListeners
dealBtn.addEventListener('click', dealCards);


// Functions

function activateHitButton() {
   
    if (playerScore < 21) {
            drawOneCard().then(cardObj => {
                appendCardToCardSlot(playerCardSlot2, cardObj, 'drawnCard');
                updatePlayerScore(cardObj);
            });
    } 

    setTimeout(() => {
      
        if (playerScore === 21) {
            activateTwentyOneBanner();
            toggleHideDealButton();
            removeHitStayButtons();
            clearBoard();
        } else if (playerScore > 21) { 
            activateBustBanner(username);
        } else {
            appendWinnerBanner();
        }
    }, 1000);
}

function activateStayButton() {
    const dealerFaceDownCard = document.querySelector('.dealerFaceDownCard');
    console.log(dealerFaceDownCard);
    if (dealerFaceDownCard) {
        turnOverFaceDownCard();
        toggleDealerScore();
        removeHitStayButtons();
        dealersTurn();
    }
    
}

function activateBustBanner(name) {
    toggleHideDealButton();
    bustBanner.textContent = `${name} BUSTS`;
    deckOfCardsDiv.append(bustBanner);
    removeHitStayButtons();
    
}

function activateTwentyOneBanner() {
   
    twentyOneBanner.textContent = 'TWENTY-ONE!';
    deckOfCardsDiv.append(twentyOneBanner);
}

function addHitAndStayButtons() {

    if (playerScore < 21) {
        const hitButton = document.createElement('button');
        const stayButton = document.createElement('button');
        hitButton.classList.add('hitButton');
        stayButton.classList.add('stayButton');
        hitButton.textContent = 'HIT';
        stayButton.textContent = 'STAY';
        hitButton.textContent = 'HIT';
        stayButton.textContent = 'STAY';
        hitButton.addEventListener('click', activateHitButton);
        stayButton.addEventListener('click', activateStayButton);
        deckOfCardsDiv.append(hitButton, stayButton);
    } 

}

function appendDeckImage() {
    deckImage.setAttribute('src', currCardColorFile);
    deckImage.setAttribute('alt', `${cardColor} playing card`);
    deckOfCardsDiv.append(deckImage);
    deckImage.classList.add('deckImage');
}

function appendCardToCardSlot(slot, cardObj, className) {

    const cardImageElement = document.createElement('img');
    cardImageElement.setAttribute('src', cardObj.image);
    cardImageElement.setAttribute('alt',`${cardObj.value} of ${cardObj.suit}`);
    cardImageElement.classList.add(className);
    slot.append(cardImageElement);

    if (slot === dealerCardSlot2) {
        const cardBackImageElement = document.createElement('img');
        cardBackImageElement.setAttribute('src', `${cardColorsObj[cardColor]}`);
        cardBackImageElement.setAttribute('alt', `${cardColor} back of playing card`);
        cardBackImageElement.classList.add('dealerFaceDownCard');
        slot.append(cardBackImageElement);
    }

}

function appendWinnerBanner() {
    const winnerBanner = document.createElement('p');
    if (dealerScore > playerScore) {
        winnerBanner.textContent = "Dealer Wins";
    } else if (dealerScore < playerScore) {
        winnerBanner.textContent = `${username} Wins`;
    } else {
        winnerBanner.textContent = `It's a Tie!`;
    }
    deckOfCardsDiv.append(winnerBanner);
}

function assignCardInfo(slot, cardObj) {
    // make assignments after promise is fulfilled
    cardObj.then(result => {
        switch (slot) {
            case dealerCardSlot1:
                dealerCard1 = result;
                appendCardToCardSlot(dealerCardSlot1, dealerCard1, 'dealerCardOne');
                updateDealerScore(dealerCard1);
                break;
            case dealerCardSlot2:
                dealerCard2 = result;
                appendCardToCardSlot(dealerCardSlot2, dealerCard2, 'dealerCardTwo');
                updateDealerScore(dealerCard2);
                break;
            case playerCardSlot1:
                playerCard1 = result;
                appendCardToCardSlot(playerCardSlot1, playerCard1, 'playerCardOne');
                updatePlayerScore(playerCard1);
                break;
            case playerCardSlot2:
                playerCard2 = result;
                appendCardToCardSlot(playerCardSlot2, playerCard2, 'playerCardTwo');
                updatePlayerScore(playerCard2);
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

function clearBoard() {
    [dealerCardSlot1, dealerCardSlot2, playerCardSlot1, playerCardSlot2].forEach(slot => removeAllChildNodes(slot));
    if (deckImage.nextSibling) {
        deckImage.nextSibling.remove();
    }
    dealerScore = 0;
    playerScore = 0;
    clearScores();
}

function clearScores() {
    dealerScoreSpan.textContent = '';
    playerScoreSpan.textContent = '';
}

function createEventListener() {

}

function dealersTurn() {
   
    drawOneCard().then(cardObj => {
        while (dealerScore < 17) {
            updateDealerScore(cardObj);
            appendCardToCardSlot(dealerCardSlot2, cardObj, 'dealerDrawnCard');
            turnOverFaceDownCard();
        }
       
    });
    setTimeout(() => {
        if (dealerScore > 21) {
            activateBustBanner('Dealer');

        } else {
            toggleHideDealButton();
            appendWinnerBanner();
        }
    }, 1000);
}

function dealCards() {
    toggleHideDealButton();
    if(deckImage.nextSibling) {
        clearBoard();
    }

    setTimeout(() => {
        addHitAndStayButtons();
    }, 5 * 1000);
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
        }, 1000);
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
        }, 1000);
    });
}


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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeHitStayButtons() {
    const hitButton = document.querySelector('.hitButton');
    const stayButton = document.querySelector('.stayButton');
    hitButton.remove();
    stayButton.remove();
}

function shuffleDeck(deckId) {
    const shuffleApi = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    makeApiCall(shuffleApi).then(result => console.log(result));
}

function toggleHideDealButton() {
    dealBtn.classList.toggle('hide');
}

function toggleDealerScore() {
    dealerScoreDiv.classList.toggle('hide');
}

function turnOverFaceDownCard() {
    const dealerFaceDownCard = document.querySelector('.dealerFaceDownCard');
    dealerFaceDownCard.remove();
}

function updateDealerScore(cardObj) {
    dealerScore += cardValuesObj[cardObj.value];
    dealerScoreSpan.textContent = dealerScore;

}

function updatePlayerScore(cardObj) {
    playerScore += cardValuesObj[cardObj.value];
    playerScoreSpan.textContent = playerScore;

}


window.onload = () => {
    callNewDeck();
    appendDeckImage();
    toggleDealerScore();

};