const title = document.querySelectorAll(".section2-part2-title");
const information = document.querySelectorAll(
  ".section2-part2-information-wrapper",
);
console.log(information[0]);
title.forEach((item, index) => {
  item.addEventListener("click", () => {
    information[index].style.display == "flex"
      ? (information[index].style.display = "none")
      : (information[index].style.display = "flex");
  });
});
