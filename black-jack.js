let cardsIDontWantToUse = [127148, 127151, 127152, 127164, 127167, 127168, 127180, 127183, 127184, 127196];
let cards = [];

let shuffledCards = [];

let player = [];
let dealer = [];

const div = document.getElementById("output-area");
let playerScore = [];
let dealerScore = [];
const newGameButton = document.getElementById("new-game-button");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");

hitButton.style.display = "none";
stayButton.style.display = "none";

//------ Function to give create the cards and give them value -------
function createDeck(card, value) {
    for (let i = 0; i < 62; i++) {
        if (!cardsIDontWantToUse.includes(card)) {
            let playingCard = {
                card: card,
                value: value
            };
            cards.push(playingCard);

            // div.innerHTML += `<p>&#${cards[cards.length - 1].card}</p>`;
        }
        card++;
        if ((card > 127146 && card < 127151) || (card > 127162 && card < 127167) || (card > 127178 && card < 127183) || (card > 127194 && card < 127199)) {
            value = 10;
        } else if (card === 127153 || card === 127169 || card === 127185) {
            value = 1;
        } else {
            value++;
        }
    }
}
createDeck(127137, 1);
console.log(cards);

function shuffleCards() {
    // Dannie awesome lösning
    // for (let i = 0; i < cards.length; i++) {
    //     const randomIndex = Math.floor(Math.random() * cards.length);
    //     shuffledCards.push(cards[randomIndex]);
    // }

    let tmpDeck = cards.slice([]);

    while (tmpDeck.length > 0) {
        shuffledCards.push(tmpDeck.splice(Math.floor(Math.random() * tmpDeck.length), 1)[0]);
    }
    console.log(shuffledCards);
}

//------ Displays all the shuffled cards in the browser ------
/* shuffledCards.forEach(function(card, index) {
    let span = document.createElement("span");
    span.innerHTML = `&#${card.card}`;
    if (card.card > 127136 && card.card < 127151) {
        span.classList.add("spades");
    } else if (card.card > 127152 && card.card < 127167) {
        span.classList.add("hearts");
    } else if (card.card > 127168 && card.card < 127183) {
        span.classList.add("diamonds");
    } else if (card.card > 127184 && card.card < 127199) {
        span.classList.add("clubs");
    }
    div.append(span);
}); */

function drawCard() {
    let drawnCard = shuffledCards.shift();

    //------ Creates span nodes and assigns classes to them depending on the cards "visual-code" ------
    let span = document.createElement("span");
    if (drawnCard.card > 127136 && drawnCard.card < 127151) {
        span.classList.add("spades");
    } else if (drawnCard.card > 127152 && drawnCard.card < 127167) {
        span.classList.add("hearts");
    } else if (drawnCard.card > 127168 && drawnCard.card < 127183) {
        span.classList.add("diamonds");
    } else if (drawnCard.card > 127184 && drawnCard.card < 127199) {
        span.classList.add("clubs");
    }
    div.append(span);
    return drawnCard;
    // return (span.innerHTML += `&#${drawnCard.card}`);
}

// function showHands() {
//     let playerCards = [];
//     let dealerCards = [];

//     player.forEach(function(cardObject, index) {
//         playerCards.push(cardObject.card);
//     });
//     dealer.forEach(function(cardObject, index) {
//         dealerCards.push(cardObject.card);
//     });

//     let listPlayer = playerCards.map(function(cardObject) {
//         return `&#${cardObject}`;
//     });
//     let listDealer = dealerCards.map(function(cardObject) {
//         return `&#${cardObject}`;
//     });
//     console.log(playerCards);
//     div.innerHTML += `${listPlayer.join("")} <br> ${listDealer.join("")}`;
//     console.log(listPlayer.join(""));
// }
function showHand(hand, score) {
    let cards = [];

    hand.forEach(function(cardObject, index) {
        cards.push(`&#${cardObject.card}`);
    });
    console.log(cards);
    // dealer.forEach(function(cardObject, index) {
    //     dealerCards.push(`&#${cardObject.card}`);
    // });
    // console.log(dealerCards);
    return `${cards.join("")} ${score} <br>`;
}

function dealInitialCards() {
    // clearTable();
    player.push(drawCard());
    player.push(drawCard());
    dealer.push(drawCard());
    dealer.push(drawCard());
    // dealerScore = calculateHand(dealer);
    // playerScore = calculateHand(player);
    // showHand(dealer, dealerScore);
    // showHand(player, playerScore);
    showHands();
}

function clearTable() {
    div.innerHTML = "";
}

function calculateHand(cards) {
    let score = 0;

    let ace = cards.find(cardObject => cardObject.value === 1) !== undefined;

    cards.forEach(function(cardObject, index) {
        score += cardObject.value;
    });
    if (ace && score + 10 <= 21) {
        score += 10;
    }
    console.log(score);
    return score;
}

function startNewGame() {
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";

    shuffledCards = [];
    player = [];
    dealer = [];

    shuffleCards();
    dealInitialCards();
}

newGameButton.addEventListener("click", function() {
    startNewGame();
});

function showHands() {
    dealerScore = calculateHand(dealer);
    playerScore = calculateHand(player);
    clearTable();
    div.innerHTML += showHand(dealer, dealerScore);
    div.innerHTML += showHand(player, playerScore);
}

function dealAnotherCard(hand) {
    const card = drawCard();
    hand.push(card);
}

hitButton.addEventListener("click", function() {
    dealAnotherCard(player);
    showHands();
    console.log("addEventListener", player);
});
