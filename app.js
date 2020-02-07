 const getMealBtn = document.getElementById('get_meal');
 const mealContainer = document.getElementById('meal');

 getMealBtn.addEventListener('click', () => {
     fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        });
 });

 const createMeal =  (meal) => {
     const ingredients = [];

    //  get all ingredients from the object up to 20
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMessure${i}`]}`)
        } else{
            // Stop if no more ingredient
            break;
        }
    }

    const newInnerHTML = `
        <div class="row">
            <div class="columns five">
                <img src="${meal.strMealThumb}" alt="Meal Image">
                ${meal.strCategory ? `<p><strong>Category</strong> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                ${meal.Tags ? `<p><strong>Tags:</strong> ${meal.Tags.split(',').join(', ')}</p>` : ''}
                <h5>Ingredients:</h5>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="columns seven>
                <h4>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
        ${meal.strYoutube ? `
            <div class="row">
                <h5>Video Recipe</h5>
                <div class="videoWrapper">
                    <iframe width="420" height="315" 
                    src="http://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                    </iframe>
                </div>
            </div> ` : ''}
        
    `;
    mealContainer.innerHTML = newInnerHTML;
 }    