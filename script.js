const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    inch: 0.0254,
    foot: 0.3048,
  },
  weight: {
    gram: 1,
    kilogram: 1000,
    pound: 453.592,
    ounce: 28.3495,
  },
  temperature: {
    celsius: "c",
    fahrenheit: "f",
    kelvin: "k",
  },
  area: {
    "square meter": 1,
    "square kilometer": 1e6,
    "square centimeter": 0.0001,
    "square inch": 0.00064516,
    "square foot": 0.092903,
    hectare: 10000,
    acre: 4046.86,
  },
  volume: {
    "cubic meter": 1,
    liter: 0.001,
    milliliter: 0.000001,
    "cubic centimeter": 0.000001,
    "cubic inch": 0.0000163871,
    "cubic foot": 0.0283168,
    gallon: 0.00378541,
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2629800, // 30.44 days
    year: 31557600, // 365.25 days
  },
};

let currentCategory = "length";

function setCategory(category) {
  currentCategory = category;
  updateUnits();
}

function updateUnits() {
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  for (let unit in units[currentCategory]) {
    let option1 = document.createElement("option");
    option1.value = unit;
    option1.text = unit;
    fromUnit.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = unit;
    option2.text = unit;
    toUnit.appendChild(option2);
  }
}

function convert() {
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  let result;

  if (currentCategory === "temperature") {
    result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
    const baseValue = inputValue * units[currentCategory][fromUnit];
    result = baseValue / units[currentCategory][toUnit];
  }

  document.getElementById(
    "result"
  ).innerText = `${inputValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}

function convertTemperature(value, from, to) {
  let tempInC;

  if (from === "celsius") tempInC = value;
  else if (from === "fahrenheit") tempInC = ((value - 32) * 5) / 9;
  else if (from === "kelvin") tempInC = value - 273.15;

  if (to === "celsius") return tempInC;
  else if (to === "fahrenheit") return (tempInC * 9) / 5 + 32;
  else if (to === "kelvin") return tempInC + 273.15;
}

updateUnits(); // Initialize on load
