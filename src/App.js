import './App.css';

const ingredients = {
  basicFood: ["Kartoffeln", "Brot", "Wasser", "Reis"],
  vegetables: ["Tomaten", "Pilze", "Rüben"],
  fruits: ["Äpfel", "Bananen", "Birnen"],
  dairyProductsAndEggs: ["Käse", "Crème Fraîche", "Butter", "Gebratene Eier"],
  meat: ["Rindfleisch", "Schweinefleisch", "Hühnchen"],
  meatSubstitute: ["Tofu", "NoChicken"],
  desserts: ["Eiscrème", "Baklava", "Schokolade"]
}

const preparationMethods = ["kochen", "garen", "frittieren", "roh"];

export default function App() {
  const categories = Object.keys(ingredients);

  const maxLength = Math.max(
    ...Object.values(ingredients).map(arr => arr.length)
  );

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
            <tr key={rowIndex}>
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

  for(let i = 0; i < chosenIngredients.length; i++){
    const ingredientElement = document.createElement("td");
    ingredientElement.innerText = chosenIngredients[i];
    outputElement.appendChild(ingredientElement);
  }
}

function getRandomRecipe(){
  const chosenIngredients = [
    ingredients.basicFood[Math.floor(Math.random() * ingredients.basicFood.length)],
    ingredients.vegetables[Math.floor(Math.random() * ingredients.vegetables.length)],
    ingredients.fruits[Math.floor(Math.random() * ingredients.fruits.length)],
    ingredients.dairyProductsAndEggs[Math.floor(Math.random() * ingredients.dairyProductsAndEggs.length)],
    ingredients.meat[Math.floor(Math.random() * ingredients.meat.length)],
    ingredients.meatSubstitute[Math.floor(Math.random() * ingredients.meatSubstitute.length)],
    ingredients.desserts[Math.floor(Math.random() * ingredients.desserts.length)],
  ];

  const preparationMethod = preparationMethods[Math.floor(Math.random() * preparationMethods.length)];

  console.log(chosenIngredients);
  return {chosenIngredients: chosenIngredients, preparationMethod: preparationMethod};
}

function getFunnyName(chosenIngredients){
  let name = "";

  for(let i = 0; i < chosenIngredients.length; i++){
    name += chosenIngredients[i][0];
    name += chosenIngredients[i][1];
  }

  return name;
}