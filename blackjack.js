// Variables 
const newPartialDeckApi = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS,2S,3S,4S';
const homePageHeader = document.querySelector('.homePageHeader');
let deckId;
let partialDeckApiWithId;
let partialDeckArray;
let sortedPartialDeck = [];
let aceSpade, kingSpade, twoSpade, threeSpade, fourSpade;
let vectorImage;



// At the start of the page make an api call to retrieve a partial deck for the styling of the main page
retrieveDeckInfo(newPartialDeckApi);


function retrieveDeckInfo(api) {
    fetch(api)
        .then((response) => response.json())
        .then((response) => {
            if(!deckId) {
                getDeckId(response);
            } else {
                sortPartialDeckArray(response.cards);
                appendCardsToHeader();
            }
        })
        .catch((error) => {
            createErrorMessage(error);
        });
}

function getDeckId(deckObj) {
    deckId = deckObj.deck_id;   
    partialDeckApiWithId = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`;
    retrieveDeckInfo(partialDeckApiWithId);
}

function sortPartialDeckArray(array){
    aceSpade = array.find(deckObj => deckObj.value == 'ACE');
    kingSpade = array.find(deckObj => deckObj.value == 'KING');
    twoSpade = array.find(deckObj => deckObj.value == '2');
    threeSpade = array.find(deckObj => deckObj.value == '3');
    fourSpade = array.find(deckObj => deckObj.value == '4');
    sortedPartialDeck.push(aceSpade, kingSpade, twoSpade, threeSpade, fourSpade);
}

function retrieveVectorImages() {

}

function appendCardsToHeader() {
    const aceSpadeHeader = document.createElement('img');
    aceSpadeHeader.setAttribute('src',`${aceSpade.images.svg}`);
    aceSpadeHeader.setAttribute('alt', 'Ace of Spade');
    aceSpadeHeader.setAttribute('class', 'aceSpade');
    const kingSpadeHeaderImg = document.createElement('img');
    kingSpadeHeaderImg.setAttribute('src', `${kingSpade.images.svg}`);
    kingSpadeHeaderImg.setAttribute('alt', 'King of Spade');
    kingSpadeHeaderImg.setAttribute('class', 'kingSpade');
    homePageHeader.append(aceSpadeHeader, kingSpadeHeaderImg);
}







function createErrorMessage(error) {

}




