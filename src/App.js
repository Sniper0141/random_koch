import './App.css';

const ingredients = {
  basicFood: ["Kartoffeln", "Brot"],
  vegetables: ["Tomaten", "Pilze"],
  fruits: ["Äpfel", "Bananen", "Birnen"],
  dairyProductsAndEggs: ["Käse", "Crème Fraîche", "Butter", "Gebratene Eier"],
  meat: ["Rindfleisch", "Schweinefleisch", "Hühnchen"],
  meatSubstitute: ["Tofu"],
  desserts: ["Eiscrème", ]
}


export default function App() {
  return (
    <div>
      <button id='compose-button' onClick={buttonClick}>compose recipe</button>
      <div id='output'></div>
    </div>
  );
}

function buttonClick(){
  const buttonElement = document.getElementById("compose-button");
  buttonElement.innerText = "compose new recipe";

  const outputElement = document.getElementById("output");
  outputElement.innerHTML = null;

  const recipe = composeRecipe();

  for(let i = 0; i < recipe.length; i++){
    let htmlObjectIngredient = document.createElement("p");
    htmlObjectIngredient.innerHTML = recipe[i];
    outputElement.appendChild(htmlObjectIngredient);
  }

  console.log("been there done that");
}

function composeRecipe(){
  const randomIngredientsMaxIndex = Math.floor(Math.random() * 5) + 5;
  let chosenIngredients = [];

  for(let i = 0; i <= randomIngredientsMaxIndex; i++){
    const ingredientsFromChosenType = getRandomIngredientType();
    chosenIngredients[i] = getRandomIngredient(ingredientsFromChosenType);
  }

  console.log(chosenIngredients);
  return chosenIngredients;
}

function getRandomIngredientType(){
  const randomIngrTypeNumber = Math.floor(Math.random() * 7) + 1;
  
  switch(randomIngrTypeNumber){
    case 1:
      return ingredients.basicFood;
    case 2:
      return ingredients.vegetables;
    case 3:
      return ingredients.fruits;
    case 4:
      return ingredients.dairyProductsAndEggs;
    case 5:
      return ingredients.meat;
    case 6:
      return ingredients.meatSubstitute;
    case 7:
      return ingredients.desserts;
    default:
      return [];
  }
}

function getRandomIngredient(ingredientsFromChosenType){
  const max = ingredientsFromChosenType.length;
  const randomIngrNumber = Math.floor(Math.random() * max);
  return ingredientsFromChosenType[randomIngrNumber];
}