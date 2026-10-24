const handItems = [...document.querySelectorAll(".hand-item")];
// console.log(handItems);

const resultPopup = document.querySelector(".result-popup");
const selectedHandsPopup = document.querySelector(".selected-hands");
const resultMsg = document.getElementById("result-title");

const playBtn = document.querySelector(".main");
const resetBtn = document.querySelector(".reset");
const nextGameBtn = document.querySelector(".next-game");

const resultWins = document.getElementById("result-item-wins");
const resultLoses = document.getElementById("result-item-loses");
const resultDraws = document.getElementById("result-item-draws");
const resultTotal = document.getElementById("result-item-total");

const handSelection = { playerHand: "", computerHand: "" };

const gameStats = { wins: 0, loses: 0, draws: 0, total: 0 };

const getSelection = () => {
  if (handSelection.playerHand === "") {
    alert("choose hand");
    return;
  }
  const siHandIndex = handItems[Math.floor(Math.random() * handItems.length)];
  const computer = (handSelection.computerHand = siHandIndex.dataset.handtype);
  const player = handSelection.playerHand;
  handItems.forEach((hand) => {
    if (hand.dataset.handtype === siHandIndex.dataset.handtype) {
      hand.classList.add("siHand");
    }
  });
  handleGame(player, computer, siHandIndex);
};

const renderPopupHands = (player, computer) => {
  selectedHandsPopup.innerHTML = `
            <span class="green">${player}</span>
            vs.
            <span class="red">${computer}</span>`;
};

const handleGame = (player, computer, siHandIndex) => {
  if (player === computer) {
    resultMsg.innerHTML = "It's a draw 😑";
    resultMsg.style.color = "var(--orange)";
    siHandIndex.classList.add("orange");
    gameStats.draws++;
    // resultPopup.classList.remove("hidden");
  } else if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    resultMsg.innerHTML = "You Win! 😎";
    resultMsg.style.color = "var(--green)";
    gameStats.wins++;
  } else {
    resultMsg.innerHTML = "You Loose 💩";
    resultMsg.style.color = "var(--red)";
    gameStats.loses++;
  }
  gameStats.total++;
  resultPopup.classList.remove("hidden");
  renderPopupHands(player, computer);
  updateResults();
  console.log(player);
  console.log(computer);
};

const updateResults = () => {
  resultWins.innerHTML = gameStats.wins;
  resultLoses.innerHTML = gameStats.loses;
  resultDraws.innerHTML = gameStats.draws;
  resultTotal.innerHTML = gameStats.total;
};

const nextGame = () => {
  handSelection.playerHand = "";
  handSelection.computerHand = "";
  handItems.forEach((hand) => {
    hand.classList.remove("active");
    hand.classList.remove("orange");
    hand.classList.remove("siHand");
  });
  resultPopup.classList.add("hidden");
};

handItems.forEach((hand) => {
  hand.addEventListener("click", () => {
    handItems.forEach((item) => {
      item.classList.remove("active");
    });
    hand.classList.add("active");
    handSelection.playerHand = hand.dataset.handtype;
  });
});

playBtn.addEventListener("click", getSelection);
nextGameBtn.addEventListener("click", nextGame);
