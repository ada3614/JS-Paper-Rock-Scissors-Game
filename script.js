class Game {
  constructor() {
    this.playerHand = "";
    this.computerHand = "";

    this.gameStats = { wins: 0, losses: 0, draws: 0, total: 0 };
    this.hands = ["Rock", "Paper", "Scissors"];
  }
  selectHand(hand) {
    this.playerHand = hand;
  }

  getComputerHand() {
    this.computerHand =
      this.hands[Math.floor(Math.random() * this.hands.length)];
  }
  determineWinner() {
    if (this.playerHand === this.computerHand) {
      return "draw";
    }

    if (
      (this.playerHand === "Rock" && this.computerHand === "Scissors") ||
      (this.playerHand === "Paper" && this.computerHand === "Rock") ||
      (this.playerHand === "Scissors" && this.computerHand === "Paper")
    ) {
      return "win";
    }

    return "lose";
  }
  play() {
    if (this.playerHand === "") {
      return null;
    }
    this.getComputerHand();

    const result = this.determineWinner();

    if (result === "draw") {
      this.gameStats.draws++;
    } else if (result === "win") {
      this.gameStats.wins++;
    } else {
      this.gameStats.losses++;
    }
    this.gameStats.total++;
    const round = {
      playerHand: this.playerHand,
      computerHand: this.computerHand,
      result: result,
      stats: { ...this.gameStats },
    };
    this.resetRound();
    return round;
  }
  resetRound() {
    this.playerHand = "";
    this.computerHand = "";
  }
}

class GameUI {
  constructor(game, popup) {
    this.game = game;
    this.popup = popup;
    this.handItems = [...document.querySelectorAll(".hand-item")];
    this.playBtn = document.querySelector(".main");
    this.getSelection();

    this.resultWins = document.getElementById("result-item-wins");
    this.resultLosses = document.getElementById("result-item-losses");
    this.resultDraws = document.getElementById("result-item-draws");
    this.resultTotal = document.getElementById("result-item-total");

    this.nextGameBtn = document.querySelector(".next-game");

    this.playBtn.addEventListener("click", this.handlePlay.bind(this));

    this.nextGameBtn.addEventListener("click", this.nextGame.bind(this));
  }

  getSelection() {
    this.handItems.forEach((hand) => {
      hand.addEventListener("click", () => {
        this.handItems.forEach((item) => {
          item.classList.remove("playerChoice");
          item.querySelector("img").classList.remove("pulse");
        });
        hand.classList.add("playerChoice");
        hand.querySelector("img").classList.add("pulse");
        const selectedHand = hand.dataset.handtype;
        this.handleHandSelection(selectedHand);
      });
    });
  }
  handleHandSelection(hand) {
    this.game.selectHand(hand);
  }

  handlePlay() {
    const round = this.game.play();
    if (round === null) {
      alert("Choose a hand first!");
      return;
    }
    this.updateStats(round);
    this.showComputerChoice(round);
    this.popup.show(round);
  }

  showComputerChoice(round) {
    const computerHandElem = this.handItems.find(
      (hand) => hand.dataset.handtype === round.computerHand,
    );
    computerHandElem.classList.add("siChoice");
    if (round.result === "draw") {
      computerHandElem.classList.add("draw");
    }
  }

  updateStats(round) {
    this.resultWins.textContent = round.stats.wins;
    this.resultLosses.textContent = round.stats.losses;
    this.resultDraws.textContent = round.stats.draws;
    this.resultTotal.textContent = round.stats.total;
  }
  nextGame() {
    this.handItems.forEach((hand) => {
      hand.classList.remove("playerChoice", "draw", "siChoice", "pulse");
    });
    this.popup.resultPopup.classList.add("hidden");
  }
}

class ResultPopup {
  constructor() {
    this.resultPopup = document.querySelector(".result-popup");
    this.selectedHandsPopup = document.querySelector(".selected-hands");
    this.resultMsg = document.getElementById("result-title");
  }

  show(round) {
    this.updateResultMsg(round.result);
    this.renderPopupHands(round.playerHand, round.computerHand);
  }
  updateResultMsg(result) {
    this.resultMsg.classList.remove(
      "result-title--draw",
      "result-title--win",
      "result-title--lose",
    );
    if (result === "draw") {
      this.resultMsg.textContent = "It's a draw 😑";
      this.resultMsg.classList.add("result-title--draw");
    } else if (result === "win") {
      this.resultMsg.textContent = "You Win! 😎";
      this.resultMsg.classList.add("result-title--win");
    } else {
      this.resultMsg.textContent = "You Lose 💩";
      this.resultMsg.classList.add("result-title--lose");
    }
    this.resultPopup.classList.remove("hidden");
  }

  renderPopupHands(player, computer) {
    this.selectedHandsPopup.innerHTML = `
            <span class="green">${player}</span>
            vs.
            <span class="red">${computer}</span>`;
  }
}

const game = new Game();
const popup = new ResultPopup();
const ui = new GameUI(game, popup);
