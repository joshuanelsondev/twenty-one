const array = [
    { code: '4S', image: 'https://deckofcardsapi.com/static/img/4S.png', value: '4', suit: 'SPADES' },
    { code: '3S', image: 'https://deckofcardsapi.com/static/img/3S.png', value: '3', suit: 'SPADES' },
    { code: 'AS', image: 'https://deckofcardsapi.com/static/img/AS.png', value: 'ACE', suit: 'SPADES' },
    { code: 'KS', image: 'https://deckofcardsapi.com/static/img/KS.png', value: 'KING', suit: 'SPADES' },
    { code: '2S', image: 'https://deckofcardsapi.com/static/img/2S.png', value: '2', suit: 'SPADES' } 
];

function sortPartialDeckArray(array) {
    const aceSpade = array.find(deckObj => deckObj.value == 'ACE');
    const kingSpade = array.find(deckObj => deckObj.value == 'KING');
    const twoSpade = array.find(deckObj => deckObj.value == '2');
    const threeSpade = array.find(deckObj => deckObj.value == '3');
    const fourSpade = array.find(deckObj => deckObj.value == '4');
    return [aceSpade, kingSpade, twoSpade, threeSpade, fourSpade];
}

console.log(sortPartialDeckArray(array));

