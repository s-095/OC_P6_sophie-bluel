async function createButtons() {
    const categories = await getCategories()
    console.log(categories)
}

createButtons()