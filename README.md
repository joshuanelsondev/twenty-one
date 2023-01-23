# Frontend Portfolio Project
This project is designed as a **Blackjack** game that makes api calls to the [deck of cards](https://deckofcardsapi.com/) api to simulate using a deck or multiple decks of cards. 

## Process
---
-The Link to my page is [here](https://twentyonegame.netlify.app/)

When the page loads an initial api call will be made to retrieve a partial deck. This deck will be used to give the user an option to choose between playing a solo game of blackjack or playing with a range of computer players.

A form will pop up to get the user's display name along with other thematic choices.

It's important to note that the deck of cards api allows for a deck(s) to be reused and shuffled without having to making an api call to get a new deck. The deck_id will be used to connect the api calls for drawing cards and shuffling the deck.
If the api call is invalid (due to a timeout of deck inactivity) then a new api call for a new deck will be made.