const url = "http://localhost:5678/api/"

async function getCategories() {
    const res = await fetch(url + "categories")
    const categories = await res.json()
    return categories
}

