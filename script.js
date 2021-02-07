

const networkCall = () => {
    const searchedFoodName = document.getElementById('inputSearch').value;
    const foodItemDiv = document.getElementById('all-meals');
    foodItemDiv.innerHTML = ""
    loading('block')

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedFoodName}`)
    .then(res => res.json())
    .then(result => processData(result.meals));
}

const processData = (foodResults) =>{
    loading('none')
    
    if(foodResults == null){
        showNotFoundAlert();
        return;
    }

    foodResults.forEach((item) =>{
        updateUI(item)
    })
}

const showNotFoundAlert = () =>{
    const alert = document.getElementById('notFoundAlert');
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';        
    }, 2500);
}

const updateUI = foodItem =>{
    const foodItemDiv = document.getElementById('all-meals');
    const mealItem = document.createElement('div');
    mealItem.className = 'meal-item m-3';
    mealItem.onclick = () => {showIngredients(foodItem)}
    mealItem.setAttribute('data-target', '#showIngredients');
    mealItem.setAttribute('data-toggle', 'modal');

    const mealThumbnail = document.createElement('img');
    mealThumbnail.src = foodItem.strMealThumb;

    const mealName = document.createElement('p');
    mealName.innerText = foodItem.strMeal;

    mealItem.appendChild(mealThumbnail);
    mealItem.appendChild(mealName);
    foodItemDiv.appendChild(mealItem);

}

const showIngredients =  foodItem =>{
    let ingredientData = [];
    for(let i = 1; i < 17; i++){
        let ingredient = "strIngredient"+i;
        let strMeasure = "strMeasure"+i;

        if(foodItem[strMeasure].length == 0 || foodItem[strMeasure] == ' '){continue;}
        ingredientData.push(foodItem[strMeasure] + " " + foodItem[ingredient])
    }

    const showIngredients = document.getElementById('showIngredients');
    const showIngredientsImage  = document.getElementById('showIngredientsImage')
    showIngredientsImage.src = foodItem.strMealThumb;

    document.getElementById('dialogMealName').innerText = foodItem.strMeal;

    ingredientData.forEach((ingredientItem) =>{
        const ingredientList = document.getElementById('ingredientList');
        const li = document.createElement('li')
        li.innerText = ingredientItem;
        ingredientList.append(li)
    })
    
}

const loading = dispaly =>{
    const loading = document.getElementById('loading')
    loading.style.display = dispaly;
}

// Handling Search Button Event
const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', networkCall)

networkCall();