
async function createButtons() {
    const categories = await getCategories()
    categories.map(createButtonFromCategory)
}
function createButtonFromCategory(category) {
    console.log(category)
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category.name;
    categoryButton.dataset.categoryId = category.id;

    const filters = document.querySelector('.filters');
    categoryButton.addEventListener("click", onClickButton)

    if (category.name === "Tous") {
        categoryButton.textContent = "Tous";
        categoryButton.dataset.categoryId = "all";
    } else {
        categoryButton.textContent = category.name;
        categoryButton.dataset.categoryId = category.id;
    }

    filters.appendChild(categoryButton);
}

function addEventButtonAll() {
 const buttonAll = document.querySelector("button[data-category-id='all']");
 buttonAll.addEventListener("click", onClickButton);
}

function onClickButton(e) {
    const buttons = document.querySelectorAll(".filters button");

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if (button === e.target) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    }
    const categoryId = e.target.dataset.categoryId;
    if (categoryId === "all") {
        generateWorks();
    } else {
        generateWorks(categoryId);
}}

createButtons()
addEventButtonAll()