const recipeContainer = document.querySelector(".recipe-container");
const searchButton = document.querySelector(".search-button");

const getRecipe = async () => {
    const search = document.querySelector(".search-input").value;
    let data = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}`, {
        "headers": {
            "x-rapidapi-key": "{apikey}",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    let json = await data.json();
    counter = 0;
    for (result of json.results) {
        const img = document.createElement("img");
        img.src = `https://spoonacular.com/recipeImages/${json.results[`${counter}`].id}-480x360.jpg`;
        img.className = "recipe-image";

        const url = document.createElement("a");
        url.innerHTML = json.results[`${counter}`].title;
        url.href = json.results[`${counter}`].sourceUrl;
        url.className = "link";

        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";

        const urlContainer = document.createElement("p");
        
        urlContainer.append(url);
        recipeCard.append(img, urlContainer);
        recipeContainer.append(recipeCard);
        counter += 1;
    }
}

searchButton.addEventListener("click", ()=> {
    if (recipeContainer != "") {
        recipeContainer.innerHTML = "";
        getRecipe();
    }   else {
        getRecipe();
    }
});