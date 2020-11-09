let cardsIDontWantToUse = [127148, 127151, 127152, 127164, 127167, 127168, 127180, 127183, 127184, 127196];
let cards = [];

let shuffledCards = [];

let player = [];
let dealer = [];

const outputArea = document.getElementById("output-area");
const winnerArea = document.getElementById("winner-area");

let playerScore = 0;
let dealerScore = 0;

const newGameButton = document.getElementById("new-game-button");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
hideGameButtons();

const dealerWins = "Dealer wins!";
const playerWins = "You win!";
const draw = "It's a draw!";

newGameButton.addEventListener("click", function() {
    startNewGame();
});

stayButton.addEventListener("click", function() {
    hideGameButtons();
    while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
        dealer.push(drawCard());
        showHands(true);
    }
});

//------ Function to give create the cards and give them value -------
function createDeck(card, value) {
    for (let i = 0; i < 62; i++) {
        if (!cardsIDontWantToUse.includes(card)) {
            let playingCard = {
                card: card,
                value: value
            };
            cards.push(playingCard);
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
}

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
    outputArea.append(span);

    return drawnCard;
}

function showHand(hand, score) {
    let cards = [];

    hand.forEach(function(cardObject, index) {
        cards.push(`&#${cardObject.card}`);
    });

    return `${cards.join("")} ${score} <br>`;
}

function dealInitialCards() {
    // clearTable();
    player.push(drawCard());
    player.push(drawCard());
    dealer.push(drawCard());
    dealer.push(drawCard());
    showHands();
}

function clearTable() {
    outputArea.innerHTML = "";
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
    return score;
}

function startNewGame() {
    winnerArea.innerHTML = "";
    showGameButtons();

    shuffledCards = [];
    player = [];
    dealer = [];

    shuffleCards();
    dealInitialCards();
}

function showHands(stayed = false) {
    dealerScore = calculateHand(dealer);
    playerScore = calculateHand(player);
    clearTable();
    outputArea.innerHTML += "D: " + showHand(dealer, dealerScore);
    outputArea.innerHTML += "P: "+ showHand(player, playerScore);
    let winner = determineWinner(stayed);
    winnerArea.innerHTML = winner;
    if (!winner.includes("")) {
        hideGameButtons();
    }
}

function dealAnotherCard(hand) {
    const card = drawCard();
    hand.push(card);
}

hitButton.addEventListener("click", function() {
    dealAnotherCard(player);
    showHands();
});

function hasBlackJack(hand, score) {
    if (hand.length === 2 && score === 21) {
        return true;
    }
}

function isBust(score) {
    if (score > 21) {
        return true;
    }
}

function determineWinner(stayed) {
    if (isBust(playerScore)) {
        hideGameButtons();
        return dealerWins;
    } else if (isBust(dealerScore)) {
        return playerWins;
    } else if (dealer.length === 5 && dealerScore <= 21) {
        return dealerWins;
    } else if (playerScore === dealerScore && stayed) {
        return dealerWins;
    } else if (playerScore > dealerScore && stayed) {
        return playerWins;
    } else if (dealerScore > playerScore && stayed) {
        return dealerWins;
    } else {
        let dealerBJ = hasBlackJack(dealer, dealerScore);
        let playerBJ = hasBlackJack(player, playerScore);
        if (playerBJ === true && dealerBJ === true) {
            return draw;
        } else if (playerBJ === true) {
            hideGameButtons();
            return playerWins;
        } else if (dealerBJ === true) {
            hideGameButtons();
            return dealerWins;
        }
    }
    return "";
}

stayButton.addEventListener("click", () => {
    showHands(true);
});

function showGameButtons() {
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
}

function hideGameButtons() {
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
}
