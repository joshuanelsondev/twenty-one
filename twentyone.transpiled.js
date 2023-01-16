"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _twentyone = require("./twentyone.js");
Object.keys(_twentyone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _twentyone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _twentyone[key];
    }
  });
});
// Variables 
var cardColorsSelect = document.querySelector('.cardColorsSelect');
var closeGameRulesBtn = document.querySelector('.closeGameRulesBtn');
var closeUserInfoFormBtn = document.querySelector('.closeUserInfoFormBtn');
var newPartialDeckApi = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS';
var gameRulesCard = document.querySelector('.gameRulesCard');
var gameRulesBtn = document.querySelector('.gameRulesBtn');
var homePageHeader = document.querySelector('.homePageHeaderDiv');
var nameTextField = document.querySelector('.nameInput');
var nameDiv = document.querySelector('.nameDiv');
var nameErrorMessage = document.createElement('p');
var usernameErrorMessage = document.createElement('p');
var userFormBackgroundDiv = document.querySelector('.userFormBackgroundDiv');
var userInfoForm = document.querySelector('.userInfoForm');
var userLoginBtn = document.querySelector('.userLoginBtn');
var usernameTextField = document.querySelector('.usernameTextField');
var usernameDiv = document.querySelector('.usernameDiv');
var randomUsernameBtn = document.querySelector('.randomUsernameBtn');
var submitBtn = document.querySelector('.submitBtn');
// const userInfoObj = {};
var aceSpade, kingSpade;
var deckId;
var partialDeckApiWithId;
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
  fetch(api).then(function (response) {
    return response.json();
  }).then(function (response) {
    if (!deckId) {
      getDeckId(response);
    } else {
      assignAceAndKingOfSpades(response.cards);
      appendCardsToHeader();
    }
  })["catch"](function (error) {
    createErrorMessage(error);
  });
}
function getDeckId(deckObj) {
  deckId = deckObj.deck_id;
  partialDeckApiWithId = "https://deckofcardsapi.com/api/deck/".concat(deckId, "/draw/?count=5");
  retrieveDeckInfo(partialDeckApiWithId);
}
function assignAceAndKingOfSpades(array) {
  aceSpade = array.find(function (deckObj) {
    return deckObj.value == 'ACE';
  });
  kingSpade = array.find(function (deckObj) {
    return deckObj.value == 'KING';
  });
}
function appendCardsToHeader() {
  var aceSpadeCenterContainerImg = document.createElement('img');
  aceSpadeCenterContainerImg.setAttribute('src', "".concat(aceSpade.images.svg));
  aceSpadeCenterContainerImg.setAttribute('alt', 'Ace of Spade');
  aceSpadeCenterContainerImg.setAttribute('class', 'aceSpadeCenter');
  var kingSpadeCenterContainerImg = document.createElement('img');
  kingSpadeCenterContainerImg.setAttribute('src', "".concat(kingSpade.images.svg));
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
  var url = 'https://randomuser.me/api/?';
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    appendRandomUsername(response.results[0].login.username);
  })["catch"](function (error) {
    createErrorMessage(error);
  });
}
function appendRandomUsername(username) {
  usernameTextField.value = username;
}
function enterGameRoom() {
  if (nameTextField.checkValidity() && nameTextField.value !== '' && usernameTextField.value !== '') {
    var userInfoObj = {};
    userInfoObj.name = nameTextField.value;
    userInfoObj.username = usernameTextField.value;
    userInfoObj.cardColor = cardColorsSelect.value;
    window.location.href = "./gameRoom.html";
    return userInfoObj;
  }
  if (nameTextField.value === '') {
    nameErrorMessage.classList.add('showErrorMessage');
  }
  if (usernameTextField.value === '') {
    usernameErrorMessage.classList.add('showErrorMessage');
  }
}
function showErrorMessage() {
  if (this.value === '') {
    this.parentNode.lastChild.classList.add('showErrorMessage');
  }
}
function hideErrorMessage() {
  this.parentNode.lastChild.classList.remove('showErrorMessage');
}
function createErrorMessage(error) {}
window.onload = function (event) {
  retrieveDeckInfo(newPartialDeckApi);
  var perfEntries = performance.getEntriesByType("navigation");

  // Reload page when pressing back button
  if (perfEntries[0].type === "back_forward") {
    location.reload(true);
  }
};
