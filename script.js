const handItems = [...document.querySelectorAll(".hand-item")];
// console.log(handItems);

const resultPopup = document.querySelector(".result-popup");
const resultMsg = document.getElementById("result-title");

const playBtn = document.querySelector(".main");
const resetBtn = document.querySelector(".reset");
const nextGameBtn = document.querySelector(".next-game");

const handSelection = { playerHand: "", computerHand: "" };

const handleGame = () => {
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
  console.log(player);
  console.log(computer);
  // console.log(handItems[siHandIndex]);
  console.log(siHandIndex);
  if (player === computer) {
    resultMsg.innerHTML = "It's a draw";
    resultMsg.style.color = "var(--orange)";
    siHandIndex.classList.add("orange");
    // resultPopup.classList.remove("hidden");
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    resultMsg.innerHTML = "You Win!!!";

    // resultPopup.classList.remove("hidden");
  } else {
    resultMsg.innerHTML = "You Loose:/";
    resultMsg.style.color = "var(--red)";
    // resultPopup.classList.remove("hidden");
  }

  resultPopup.classList.remove("hidden");
};

// const resetGame = () => {
//   handSelection.playerHand = "";
//   handSelection.computerHand = "";
//   handItems.forEach((hand) => {
//     hand.classList.remove("active");
//   });
// };

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
    // console.log(handSelection.playerHand);
  });
});

playBtn.addEventListener("click", handleGame);
// resetBtn.addEventListener("click", resetGame);
nextGameBtn.addEventListener("click", nextGame);
