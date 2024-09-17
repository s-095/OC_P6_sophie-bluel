
async function createButtons() {
    const categories = await getCategories()
    categories.map(createButtonFromCategory)
}
function createButtonFromCategory(category){
    console.log(category)
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category.name;

    const filters = document.querySelector('.filters');
    categoryButton.addEventListener("click", onClickButton)
    
    filters.appendChild(categoryButton);

}

function onClickButton(e){
console.log(e.target)
}

createButtons()