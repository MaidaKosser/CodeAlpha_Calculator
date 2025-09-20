// Grab screen & buttons
const screen = document.querySelector(".screen");
const allBtns = document.querySelectorAll(".btn");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equal");

// Helper: check if last char is an operator
const isOperator = (char) => ["+", "-", "*", "/", "%", "."].includes(char);

// Add number/operator inputs
allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.value;
    const lastChar = screen.value.slice(-1);

    // Prevent multiple operators in a row
    if (isOperator(value) && (screen.value === "" || isOperator(lastChar))) {
      return;
      
    }

    // Prevent multiple decimals in one number
    if (value === "." && lastChar === ".") {
      return;
    }

    screen.value += value;
  });
});

// Clear everything
clearBtn.addEventListener("click", () => {
  screen.value = "";
});

// Delete last character
delBtn.addEventListener("click", () => {
  screen.value = screen.value.slice(0, -1);
});

// Calculate the result safely
equalBtn.addEventListener("click", () => {
  try {
    if (screen.value === "" || isOperator(screen.value.slice(-1))) {
      screen.value = "0"; 
      return;
    }
    screen.value = eval(screen.value);
  } catch (error) {
    alert("Error! Please enter a valid expression.");
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || isOperator(key)) {
    const lastChar = screen.value.slice(-1);

    // Prevent multiple operators in a row
    if (isOperator(key) && (screen.value === "" || isOperator(lastChar))) {
      return;
    }
    if (key === "." && lastChar === ".") {
      return;
    }
    screen.value += key;
  } else if (key === "Enter") {
    equalBtn.click();
  } else if (key === "Backspace") {
    delBtn.click();
  } else if (key.toLowerCase() === "c") {
    clearBtn.click();
  }
});
