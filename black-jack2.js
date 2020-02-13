let suits = ["&hearts;", "&diams;", "&spades;", "&clubs;"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cards = [];

let shuffledCards = [];

let player = [];
let dealer = [];
const outputArea = document.getElementById("output-area");

function createDeck() {
    let cardFace = 127137;
    for (let i = 0; i < values.length; i++) {
        for (let x = 0; x < suits.length; x++) {
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                weight = 10;
            }
            if (values[i] == "A") {
                weight = 1;
            }
            let card = {
                value: values[i],
                suit: suits[x],
                weight: weight,
                card: `&#${cardFace}`
            };
            cards.push(card);
            cardFace++;
            outputArea.innerHTML += card.card;
        }
    }
}

createDeck();
console.log(cards);

function shuffleCards() {
    let tmpDeck = cards.slice([]);
    while (tmpDeck.length > 0) {
        shuffledCards.push(tmpDeck.splice(Math.floor(Math.random() * tmpDeck.length), 1)[0]);
    }
    console.log(shuffledCards);
}
shuffleCards();

function drawCard() {
    const drawnCard = shuffledCards.shift();
    return (outputArea.innerHTML += `<span>${drawnCard.value}${drawnCard.suit}</span> `);
}

drawCard();
drawCard();

function showHands() {}
