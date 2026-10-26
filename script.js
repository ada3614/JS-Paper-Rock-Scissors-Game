const handItems = [...document.querySelectorAll(".hand-item")];
// console.log(handItems);

const resultPopup = document.querySelector(".result-popup");
const selectedHandsPopup = document.querySelector(".selected-hands");
const resultMsg = document.getElementById("result-title");

const playBtn = document.querySelector(".main");
// const resetBtn = document.querySelector(".reset");
const nextGameBtn = document.querySelector(".next-game");

const resultWins = document.getElementById("result-item-wins");
const resultLosses = document.getElementById("result-item-losses");
const resultDraws = document.getElementById("result-item-draws");
const resultTotal = document.getElementById("result-item-total");

const handSelection = { playerHand: "", computerHand: "" };

const gameStats = { wins: 0, losses: 0, draws: 0, total: 0 };

const getSelection = () => {
  if (handSelection.playerHand === "") {
    alert("Choose a hand first!");
    return;
  }

  const computerHandElement =
    handItems[Math.floor(Math.random() * handItems.length)];

  const computerHand = computerHandElement.dataset.handtype;
  const playerHand = handSelection.playerHand;

  computerHandElement.classList.add("siChoice");

  handleGame(playerHand, computerHand, computerHandElement);
};

const handleGame = (playerHand, computerHand, computerHandElement) => {
  const result = determineWinner(playerHand, computerHand);
  resultMsg.classList.remove("result-title--draw");
  resultMsg.classList.remove("result-title--win");
  resultMsg.classList.remove("result-title--lose");
  if (result === "draw") {
    resultMsg.textContent = "It's a draw 😑";
    resultMsg.classList.add("result-title--draw");
    computerHandElement.classList.add("draw");
    gameStats.draws++;
  } else if (result === "win") {
    resultMsg.textContent = "You Win! 😎";
    resultMsg.classList.add("result-title--win");
    gameStats.wins++;
  } else {
    resultMsg.textContent = "You Lose 💩";
    resultMsg.classList.add("result-title--lose");
    gameStats.losses++;
  }
  gameStats.total++;
  resultPopup.classList.remove("hidden");
  renderPopupHands(playerHand, computerHand);
  updateResults();
};

const determineWinner = (playerHand, computerHand) => {
  if (playerHand === computerHand) {
    return "draw";
  }

  if (
    (playerHand === "Rock" && computerHand === "Scissors") ||
    (playerHand === "Paper" && computerHand === "Rock") ||
    (playerHand === "Scissors" && computerHand === "Paper")
  ) {
    return "win";
  }

  return "lose";
};

const renderPopupHands = (player, computer) => {
  selectedHandsPopup.innerHTML = `
            <span class="green">${player}</span>
            vs.
            <span class="red">${computer}</span>`;
};

const updateResults = () => {
  resultWins.textContent = gameStats.wins;
  resultLosses.textContent = gameStats.losses;
  resultDraws.textContent = gameStats.draws;
  resultTotal.textContent = gameStats.total;
};

const nextGame = () => {
  handSelection.playerHand = "";
  handSelection.computerHand = "";
  handItems.forEach((hand) => {
    hand.classList.remove("playerChoice", "draw", "siChoice", "pulse");
  });

  resultPopup.classList.add("hidden");
};

handItems.forEach((hand) => {
  hand.addEventListener("click", () => {
    handItems.forEach((item) => {
      item.classList.remove("playerChoice");
      item.querySelector("img").classList.remove("pulse");
    });
    hand.classList.add("playerChoice");
    hand.querySelector("img").classList.add("pulse");
    handSelection.playerHand = hand.dataset.handtype;
  });
});

playBtn.addEventListener("click", getSelection);
nextGameBtn.addEventListener("click", nextGame);
