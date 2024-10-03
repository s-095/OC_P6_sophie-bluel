const url = "http://localhost:5678/api/"

async function getCategories() {
    try {
        const response = await fetch(url + "categories");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const categories = await response.json();
        return categories
    } catch (error) {
        console.error('Error fetching categories:', error.message);
    }
}

async function getWorks() {
    try {
        const response = await fetch(url + "works");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const works = await response.json();
        return works
    } catch (error) {
        console.error(error.message);
    }
}

async function logUser(user) {
    try {
        let response = await fetch(url + "users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.status !== 200) {
            return {
                ok: false
            };
        } else {
            let result = await response.json();
            return {
                ok: true,
                token: result.token
            }
        }

    } catch (error) {
        console.error('Erreur:', error);
        return {
            ok: false
        }
    }
}

async function deleteWork(id) {
    const token = window.localStorage.getItem("authToken");

    if (!token) {
        console.error("Erreur: token non trouvé !");
        return false;
    }

    try {
        const response = await fetch(url + `works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression: ${response.status}`);
        }

        console.log("Suppression réussie");
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression:", error.message);
        return false;
    }
}

async function addWork() {

}
