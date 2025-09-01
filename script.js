let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".newGame");
let resetGame = document.querySelector(".resetGame");
let newGamebtn = document.querySelector(".newGame");
let historyBtn = document.querySelector(".Historybtn");
let HistoryTab = document.querySelector(".HistoryContainer");
let MainMenu = document.querySelector(".MainMenuContainer");
let WInnerText = document.querySelector(".WinnerText");
let HistoryTag = document.querySelectorAll("h4");
let xWins = document.querySelector(".xWins");
let oWins = document.querySelector(".oWins");
let highestWin = document.querySelector(".HighestWins");
let ScoreBoardPreMsg = document.querySelector(".ScoreBoardPreMsg");
let ChangeMode = document.querySelector(".changeMode");
let ticTacToeHeader = document.querySelector(".ticTacToeHeader");
let changeModeInMainMenu = document.querySelector(".changeModeInMainMenu");

let changeMode = "light";

ChangeMode.addEventListener("click", toggleTheme);
changeModeInMainMenu.addEventListener("click", toggleTheme);

function toggleTheme() {
  if (changeMode === "light") {
    dark();
    changeMode = "dark";
    ChangeMode.textContent = "Light Mode";
    changeModeInMainMenu.textContent = "Light Mode";
  } else {
    light();
    changeMode = "light";
    ChangeMode.textContent = "Dark Mode";
    changeModeInMainMenu.textContent = "Dark Mode";
  }
}

let dark = () => {
  document.body.style.transition = "background-color 0.5s ease";
  document.body.style.backgroundColor = "#242424";

  ticTacToeHeader.style.transition = "color 0.5s ease";
  ticTacToeHeader.style.color = "white";

  const h4AllTags = document.querySelectorAll("h4");
  h4AllTags.forEach((Tag) => {
    Tag.style.transition = "color 0.5s ease";
    Tag.style.color = "white";
  });

  boxes.forEach((box) => {
    box.classList.add("darkBox");
    box.classList.remove("box");
  });

  HistoryTab.style.transition = "color 0.5s ease";
  HistoryTab.style.color = "white";

  WInnerText.style.transition = "color 0.5s ease";
  WInnerText.style.color = "white";
};

let light = () => {
  document.body.style.transition = "background-color 0.5s ease";
  document.body.style.backgroundColor = "rgb(191, 180, 143)";

  ticTacToeHeader.style.transition = "color 0.5s ease";
  ticTacToeHeader.style.color = "black";

  const h4AllTags = document.querySelectorAll("h4");
  h4AllTags.forEach((Tag) => {
    Tag.style.transition = "color 0.5s ease";
    Tag.style.color = "black";
  });

  boxes.forEach((box) => {
    box.classList.remove("darkBox");
    box.classList.add("box");
  });

  HistoryTab.style.transition = "color 0.5s ease";
  HistoryTab.style.color = "black";

  WInnerText.style.color = "black";
};

let turn0 = true;

const WinPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.textContent = "o";
      turn0 = false;
    } else {
      box.textContent = "x";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});

let winnerText;
let owinsCount = 0;
let xwinsCount = 0;
const checkWinner = () => {
  for (let pattern of WinPattern) {
    let value1 = boxes[pattern[0]].textContent;
    let value2 = boxes[pattern[1]].textContent;
    let value3 = boxes[pattern[2]].textContent;
    if (value1 != "" && value2 != "" && value3 != "") {
      if (value1 == value2 && value2 == value3) {
        boxIsDisabled();
        MainMenu.scrollIntoView({ behavior: "smooth" });
        if (value1 == "o") {
          winnerText = WInnerText.textContent = "Winner is 'o' 🥳🎉";
          oWins.textContent = "Total wins of 'o' is " + owinsCount;
          savingInTheHistory();
          ++owinsCount;
          highestScore();
          break;
        } else {
          xWins.textContent = "Total wins of 'x' is " + xwinsCount;
          winnerText = WInnerText.textContent = "Winner is 'x' 🥳🎉";
          savingInTheHistory();
          ++xwinsCount;
          highestScore();
          break;
        }
      }
    }
  }
};

let highestScore = () => {
  if (owinsCount > xwinsCount) {
    highestWin.textContent = "'o' has the highest wins";
  } else if (owinsCount < xwinsCount) {
    highestWin.textContent = "'x' has the highest wins";
  } else {
    highestWin.textContent = "'x' and 'o' has the same wins";
  }
};

let checkDraw = () => {
  let boxCounter = 0;
  for (let box of boxes) {
    if (box.textContent !== "") {
      boxCounter++;
    }
  }

  // Only declare draw if all boxes are filled and no winner is set
  if (boxCounter == 9 && WInnerText.textContent === "") {
    winnerText = WInnerText.textContent = "Draw Match 😐";
    savingInTheHistory();
    MainMenu.scrollIntoView({ behavior: "smooth" });
  }
};

let boxIsDisabled = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// New Game button
newGameBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
    WInnerText.textContent = "";
  });
  turn0 = true;
});

// Reset button
resetGame.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
    WInnerText.textContent = "";
  });
  turn0 = true;
});

newGamebtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

historyBtn.addEventListener("click", () => {
  HistoryTab.scrollIntoView({ behavior: "smooth" });
});

let i = 1;
let H4TagName = i + "H4Tag";
const savingInTheHistory = () => {
  let H4TagName = document.createElement("h4");
  ScoreBoardPreMsg.remove();
  if (i == 1) {
    if (winnerText == "Draw Match 😐") {
      H4TagName.textContent = "1st game is " + winnerText;
    } else {
      H4TagName.textContent = "1st game " + winnerText;
    }
  } else if (i == 2) {
    if (winnerText == "Draw Match 😐") {
      H4TagName.textContent = "2nd game is " + winnerText;
    } else {
      H4TagName.textContent = "2nd game " + winnerText;
    }
  } else if (i == 3) {
    if (winnerText == "Draw Match 😐") {
      H4TagName.textContent = "3rd game is " + winnerText;
    } else {
      H4TagName.textContent = "3rd game " + winnerText;
    }
  } else {
    if (winnerText == "Draw Match 😐") {
      H4TagName.textContent = i + "th game is " + winnerText;
    } else {
      H4TagName.textContent = i + "th game " + winnerText;
    }
  }
  HistoryTab.appendChild(H4TagName);
  i++;
};
