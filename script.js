const handItems = [...document.querySelectorAll(".hand-item ")];
// console.log(handItems);
const playBtn = document.querySelector(".main");
const resetBtn = document.querySelector(".reset");

const handSelection = { playerHand: "", computerHand: "" };

const handleGame = () => {
  if (handSelection.playerHand === "") {
    alert("choose hand");
    return;
  }
  const computer = (handSelection.computerHand =
    handItems[Math.floor(Math.random() * handItems.length)].dataset.handtype);
  const player = handSelection.playerHand;
  console.log(player);
  console.log(computer);
  if (player === computer) {
    alert("DRAW");
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    alert("WIN!!!!!");
  } else {
    alert("LOSE!!!!!!!");
  }
};

const resetGame = () => {
  handSelection.playerHand = "";
  handSelection.computerHand = "";
  handItems.forEach((hand) => {
    hand.classList.remove("active");
  });
};

handItems.forEach((hand) => {
  hand.addEventListener("click", () => {
    handItems.forEach((item) => {
      item.classList.remove("active");
    });
    hand.classList.add("active");
    handSelection.playerHand = hand.dataset.handtype;
    // console.log(handSelection.playerHand);
  });
});

playBtn.addEventListener("click", handleGame);
resetBtn.addEventListener("click", resetGame);
