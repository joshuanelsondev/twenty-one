// Variables 
const newPartialDeckApi = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS,2S,3S,4S';
const homePageHeader = document.querySelector('.homePageHeaderDiv');
const gameRulesCard = document.querySelector('.gameRulesCard');
const userInfoForm = document.querySelector('.userInfoForm');
const nameTextField = document.querySelector('.nameInput') ;
const usernameTextField = document.querySelector('.usernameTextField');
const nameDiv = document.querySelector('.nameDiv');
const usernameDiv = document.querySelector('.usernameDiv');
const submitBtn = document.querySelector('.submitBtn');
const nameErrorMessage = document.createElement('p');
const usernameErrorMessage = document.createElement('p');
const closeUserInfoBtn = document.querySelector('.closeUserInfoBtn');
nameErrorMessage.textContent = 'Name must only include letters';
usernameErrorMessage.textContent = 'Please type a username';
nameErrorMessage.classList.add('errorMessage');
usernameErrorMessage.classList.add('errorMessage');



nameDiv.append(nameErrorMessage);
usernameDiv.append(usernameErrorMessage);
let deckId;
let partialDeckApiWithId;
let partialDeckArray;
let sortedPartialDeck = [];
let aceSpade, kingSpade, twoSpade, threeSpade, fourSpade;
let vectorImage;


submitBtn.addEventListener('click', enterGameRoom);
nameTextField.addEventListener('blur', toggleErrorMessage);

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


function appendCardsToHeader() {
    const aceSpadeCenterContainerImg = document.createElement('img');
    aceSpadeCenterContainerImg.setAttribute('src',`${aceSpade.images.svg}`);
    aceSpadeCenterContainerImg.setAttribute('alt', 'Ace of Spade');``
    aceSpadeCenterContainerImg.setAttribute('class', 'aceSpadeCenter');
    const kingSpadeCenterContainerImg = document.createElement('img');
    kingSpadeCenterContainerImg.setAttribute('src', `${kingSpade.images.svg}`);
    kingSpadeCenterContainerImg.setAttribute('alt', 'King of Spade');
    kingSpadeCenterContainerImg.setAttribute('class', 'kingSpadeCenter');
    homePageHeader.append(aceSpadeCenterContainerImg, kingSpadeCenterContainerImg);
}

function toggleGameRules() {
    gameRulesCard.classList.toggle('activeRulesCard');
}

function toggleUserInfoForm() {
    userInfoForm.classList.toggle('activeUserInfoForm');
}

function getRandomUsername() {
    const url = 'https://randomuser.me/api/?';
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.results[0].login.username);
            appendRandomUsername(response.results[0].login.username);
        })
        .catch((error) => {
            createErrorMessage(error);
        });
}

function appendRandomUsername(username) {
    usernameTextField.value = username;
}

function enterGameRoom() {
    if(nameTextField.checkValidity() && nameTextField.value !== '' && usernameTextField.value !== '') {
        window.location.href = "./gameRoom.html";
    } 
}

function toggleErrorMessage (event) {
    if(event.target.value === '') {
        event.target.parentNode.lastChild.classList.add('showErrorMessage');
    } else {
        event.target.parentNode.lastChild.classList.remove('showErrorMessage');
    }
}

function createErrorMessage(error) {

}

window.onload = (event) => {
    retrieveDeckInfo(newPartialDeckApi);
    const perfEntries = performance.getEntriesByType("navigation");

    if (perfEntries[0].type === "back_forward") {
        location.reload(true);
    }
};




