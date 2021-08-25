const recipeContainer = document.querySelector(".recipe-container");
const searchButton = document.querySelector(".search-button");
const input = document.getElementById("myInput");

import { api } from "./api.js";

const getRecipe = async (recipe) => {
  const search = document.querySelector(".search-input").value
    ? document.querySelector(".search-input").value
    : recipe;
  let data = await fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}`,
    {
      headers: {
        "x-rapidapi-key": `${api}`,
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }
  );
  let json = await data.json();
  let counter = 0;
  for (let result of json.results) {
    const img = document.createElement("img");
    img.src = `https://spoonacular.com/recipeImages/${
      json.results[`${counter}`].id
    }-480x360.jpg`;
    img.className = "recipe-image";

    const imgUrl = document.createElement("a");
    imgUrl.href = json.results[`${counter}`].sourceUrl;

    const url = document.createElement("a");
    url.innerHTML = json.results[`${counter}`].title;
    url.href = json.results[`${counter}`].sourceUrl;
    url.className = "link";

    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    const urlContainer = document.createElement("p");

    imgUrl.append(img);
    urlContainer.append(url);
    recipeCard.append(imgUrl, urlContainer);
    recipeContainer.append(recipeCard);
    counter += 1;
  }
};

searchButton.addEventListener("click", () => {
  if (recipeContainer != "") {
    recipeContainer.innerHTML = "";
    getRecipe();
  } else {
    getRecipe();
  }
});

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

getRecipe("sushi");
