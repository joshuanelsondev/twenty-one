
// Variables 
const cardColorsSelect = document.querySelector('.cardColorsSelect');
const closeGameRulesBtn = document.querySelector('.closeGameRulesBtn');
const closeUserInfoFormBtn = document.querySelector('.closeUserInfoFormBtn');
const newPartialDeckApi = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS';
const gameRulesCard = document.querySelector('.gameRulesCard');
const gameRulesBtn = document.querySelector('.gameRulesBtn');
const homePageHeader = document.querySelector('.homePageHeaderDiv');
const nameTextField = document.querySelector('.nameInput') ;
const nameDiv = document.querySelector('.nameDiv');
const nameErrorMessage = document.createElement('p');
const usernameErrorMessage = document.createElement('p');
const userFormBackgroundDiv = document.querySelector('.userFormBackgroundDiv');
const userInfoForm = document.querySelector('.userInfoForm');
const userLoginBtn = document.querySelector('.userLoginBtn');
const usernameTextField = document.querySelector('.usernameTextField');
const usernameDiv = document.querySelector('.usernameDiv');
const randomUsernameBtn = document.querySelector('.randomUsernameBtn');
const submitBtn = document.querySelector('.submitBtn');
let userInfoObj = {};
let aceSpade, kingSpade;
let deckId;
let partialDeckApiWithId;
nameErrorMessage.textContent = 'Name must only include letters';
nameErrorMessage.classList.add('errorMessage');
nameDiv.append(nameErrorMessage);
usernameErrorMessage.textContent = 'Please type a username';
usernameErrorMessage.classList.add('errorMessage');
usernameDiv.append(usernameErrorMessage);

closeUserInfoFormBtn.addEventListener('click', toggleUserInfoForm);
closeGameRulesBtn.addEventListener('click', toggleGameRules);
gameRulesBtn.addEventListener('click', toggleGameRules);
nameTextField.addEventListener('blur', showErrorMessage);
randomUsernameBtn.addEventListener('click', hideErrorMessage);
randomUsernameBtn.addEventListener('click', getRandomUsername);
submitBtn.addEventListener('click', enterGameRoom);
usernameTextField.addEventListener('blur', showErrorMessage);
nameTextField.addEventListener('focus', hideErrorMessage);
usernameTextField.addEventListener('focus', hideErrorMessage);
userLoginBtn.addEventListener('click', toggleUserInfoForm);

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
        userInfoObj.name = nameTextField.value;
        userInfoObj.username = usernameTextField.value;
        userInfoObj.cardColor = cardColorsSelect.value;
        localStorage.setItem("userInfo", JSON.stringify(userInfoObj));
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

window.onload = () => {
    retrieveDeckInfo(newPartialDeckApi);
    const perfEntries = performance.getEntriesByType("navigation");

    // Reload page when pressing back button
    if (perfEntries[0].type === "back_forward") {
        location.reload(true);
    }
};

