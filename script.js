const handItems = [...document.querySelectorAll(".hand-item ")];
// console.log(hands);

handItems.forEach((hand) => {
  hand.addEventListener("click", () => {
    handItems.forEach((item) => {
      item.classList.remove("active");
    });
    hand.classList.add("active");
  });
});
