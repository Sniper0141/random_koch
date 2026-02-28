import './App.css';

const ingredients = {
  basicFood: ["Kartoffeln", "Brot", "Wasser", "Reis"],
  vegetables: ["Tomaten", "Pilze", "Rüben"],
  fruits: ["Äpfel", "Bananen", "Birnen"],
  dairyProductsAndEggs: ["Käse", "Crème Fraîche", "Butter", "Gebratene Eier"],
  meat: ["Rindfleisch", "Schweinefleisch", "Hühnchen"],
  meatSubstitute: ["Tofu", "NoChicken", "Laborfleisch"],
  desserts: ["Eiscrème", "Baklava", "Schokolade"]
}

const categories = Object.keys(ingredients);

const preparationMethods = ["kochen", "garen", "frittieren", "roh"];

export default function App() {

  const maxIngredientLength = Math.max(
    ...Object.values(ingredients).map(arr => arr.length)
  );
  const maxLength = maxIngredientLength < preparationMethods.length ? preparationMethods.length : maxIngredientLength;

  return (
    <body>
      <table border="1">
        <thead>
          <tr>
            <th>Zubereitungsart</th>
            <th>Grundnahrungsmittel</th>
            <th>Gemüse</th>
            <th>Früchte</th>
            <th>Milchprodukte und Eier</th>
            <th>Fleisch</th>
            <th>Fleischersatze</th>
            <th>Desserts</th>
          </tr>
        </thead>
        <tbody>

          {Array.from({ length: maxLength }).map((_, rowIndex) => (
            <tr>
              <td>{preparationMethods[rowIndex]}</td>
            
              {categories.map(category => (
                <td key={category}>
                  {ingredients[category][rowIndex] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <br/>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Name des Rezepts</th>
              <th>Zubereitungsart</th>
              <th>Grundnahrungsmittel</th>
              <th>Gemüse</th>
              <th>Früchte</th>
              <th>Milchprodukte und Eier</th>
              <th>Fleisch</th>
              <th>Fleischersatze</th>
              <th>Desserts</th>
            </tr>
          </thead>
          <tbody id='output'>
          </tbody>
        </table>

        <br/>

        Sterne vom Restaurant-Tester: 
        <div style={{display: 'flex'}} id="stars"></div>

        <br/>

        <button id='compose-button' onClick={buttonClick}>compose recipe</button>
      </div>
    </body>
  );
}

function buttonClick(){
  const buttonElement = document.getElementById("compose-button");
  buttonElement.innerText = "compose new recipe";

  const outputElement = document.getElementById("output");
  outputElement.innerHTML = null;

  const {chosenIngredients, preparationMethod} = getRandomRecipe();

  const nameElement = document.createElement("td");
  nameElement.innerText = getFunnyName(chosenIngredients);
  outputElement.appendChild(nameElement);

  const preparationMethodElement = document.createElement("td");
  preparationMethodElement.innerText = preparationMethod;
  outputElement.appendChild(preparationMethodElement);

  for(let i = 0; i < categories.length; i++){
    const ingredientElement = document.createElement("td");
    ingredientElement.innerText = chosenIngredients[categories[i]];
    outputElement.appendChild(ingredientElement);
  }

  const starsOutput = document.getElementById("stars");
  starsOutput.innerHTML = null;
  
  for(let i = 0; i < getStarsCount(chosenIngredients, preparationMethod); i++){
    const starElement = document.createElement("img");
    starElement.src = "star.png";
    starElement.height = 20;
    starElement.innerText = chosenIngredients[categories[i]];
    starsOutput.appendChild(starElement);
  }
}

function getRandomRecipe(){
  const chosenIngredients = {
    basicFood: getRandomIngredientsFromCategory(ingredients.basicFood),
    vegetables: getRandomIngredientsFromCategory(ingredients.vegetables),
    fruits: getRandomIngredientsFromCategory(ingredients.fruits),
    dairyProductsAndEggs: getRandomIngredientsFromCategory(ingredients.dairyProductsAndEggs),
    meat: getRandomIngredientsFromCategory(ingredients.meat),
    meatSubstitute: getRandomIngredientsFromCategory(ingredients.meatSubstitute),
    desserts: getRandomIngredientsFromCategory(ingredients.desserts),
  };

  const preparationMethod = preparationMethods[Math.floor(Math.random() * preparationMethods.length)];

  return {chosenIngredients: chosenIngredients, preparationMethod: preparationMethod};
}

function getRandomIngredientsFromCategory(categoryIngredients){
  const randomAmount = Math.floor(Math.random() * categoryIngredients.length) + 1;
  const shuffled = [...categoryIngredients].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, randomAmount);
}

function getFunnyName(chosenIngredients){

  let name = "";

  for(let i = 0; i < categories.length; i++){
    for(let j = 0; j < chosenIngredients[categories[i]].length; j++){
      name += chosenIngredients[categories[i]][j][0];
      name += chosenIngredients[categories[i]][j][1];
    }
  }

  return name;
}

function getStarsCount(chosenIngredients, preparationMethod){
  let starCount = 0;

  if(chosenIngredients.vegetables.length >= 2 && chosenIngredients.vegetables.length <= 4){
    starCount++;
  }
  if(chosenIngredients.fruits.length >= 1 && chosenIngredients.fruits.length <= 1){
    starCount++;
  }
  if(chosenIngredients.meat.length === 1 | chosenIngredients.meatSubstitute.length === 1){
    starCount++;
  }
  if(chosenIngredients.basicFood.length === 1){
    starCount++;
  }
  if(chosenIngredients.dairyProductsAndEggs.length >= 0 && chosenIngredients.dairyProductsAndEggs.length <= 1){
    starCount++;
  }

  if(preparationMethod === "roh"){
    if(chosenIngredients.meat.length >= 1 || chosenIngredients.meatSubstitute.length >= 1){
      starCount--;
    }
  }

  return starCount;
}