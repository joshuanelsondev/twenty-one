// Variables 
const newPartialDeckApi = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS';
const homePageHeader = document.querySelector('.homePageHeaderDiv');
const gameRulesCard = document.querySelector('.gameRulesCard');
const userFormBackgroundDiv = document.querySelector('.userFormBackgroundDiv');
const userInfoForm = document.querySelector('.userInfoForm');
const nameTextField = document.querySelector('.nameInput') ;
const usernameTextField = document.querySelector('.usernameTextField');
const nameDiv = document.querySelector('.nameDiv');
const usernameDiv = document.querySelector('.usernameDiv');
const submitBtn = document.querySelector('.submitBtn');
const randomUsernameBtn = document.querySelector('.randomUsernameBtn');
const nameErrorMessage = document.createElement('p');
const usernameErrorMessage = document.createElement('p');
const closeUserInfoFormBtn = document.querySelector('.closeUserInfoFormBtn');
nameErrorMessage.textContent = 'Name must only include letters';
usernameErrorMessage.textContent = 'Please type a username';
nameErrorMessage.classList.add('errorMessage');
usernameErrorMessage.classList.add('errorMessage');
nameDiv.append(nameErrorMessage);
usernameDiv.append(usernameErrorMessage);
let deckId;
let partialDeckApiWithId;
let aceSpade, kingSpade;


submitBtn.addEventListener('click', enterGameRoom);
nameTextField.addEventListener('blur', showErrorMessage);
usernameTextField.addEventListener('blur', showErrorMessage);
nameTextField.addEventListener('focus', hideErrorMessage);
usernameTextField.addEventListener('focus', hideErrorMessage);
randomUsernameBtn.addEventListener('click', hideErrorMessage);
// closeUserInfoFormBtn.addEventListener('click', hideAllErrorMessages);




function retrieveDeckInfo(api) {
    fetch(api)
        .then((response) => response.json())
        .then((response) => {
            if(!deckId) {
                getDeckId(response);
            } else {
                assignAceAndKingOfSpades(response.cards);
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

function assignAceAndKingOfSpades(array){
    aceSpade = array.find(deckObj => deckObj.value == 'ACE');
    kingSpade = array.find(deckObj => deckObj.value == 'KING');
}


function appendCardsToHeader() {
    const aceSpadeCenterContainerImg = document.createElement('img');
    aceSpadeCenterContainerImg.setAttribute('src',`${aceSpade.images.svg}`);
    aceSpadeCenterContainerImg.setAttribute('alt', 'Ace of Spade');
    aceSpadeCenterContainerImg.setAttribute('class', 'aceSpadeCenter');
    const kingSpadeCenterContainerImg = document.createElement('img');
    kingSpadeCenterContainerImg.setAttribute('src', `${kingSpade.images.svg}`);
    kingSpadeCenterContainerImg.setAttribute('alt', 'King of Spade');
    kingSpadeCenterContainerImg.setAttribute('class', 'kingSpadeCenter');
    homePageHeader.append(aceSpadeCenterContainerImg, kingSpadeCenterContainerImg);
}

function toggleGameRules() {
    gameRulesCard.classList.toggle('activeRulesCard');
    userFormBackgroundDiv.classList.toggle('inactiveUserFormBackground');
}

function toggleUserInfoForm() {
    userInfoForm.reset();
    userFormBackgroundDiv.classList.toggle('inactiveUserFormBackground');
    userInfoForm.classList.toggle('activeUserInfoForm');
    nameErrorMessage.classList.remove('showErrorMessage');
    usernameErrorMessage.classList.remove('showErrorMessage');
}

function getRandomUsername() {
    const url = 'https://randomuser.me/api/?';
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
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
    if(nameTextField.value === '') {
        nameErrorMessage.classList.add('showErrorMessage');
    }
    if (usernameTextField.value === '') {
        usernameErrorMessage.classList.add('showErrorMessage');
    }

}

function showErrorMessage() {
    if(this.value === '') {
        this.parentNode.lastChild.classList.add('showErrorMessage');
    } 
}

function hideErrorMessage() {
    this.parentNode.lastChild.classList.remove('showErrorMessage');
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




