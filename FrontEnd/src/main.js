async function generateWorks(categoryId = null) {
    const works = await getWorks();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';


    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        if (categoryId && work.categoryId !== parseInt(categoryId)) {
        } else {

            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            const caption = document.createElement("figcaption");
            caption.textContent = work.title;

            gallery.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(caption);
            
        }
    };
}

function isConnected() {
    return localStorage.getItem("authToken") !== null;
}

function displayEditMode() {
    const editModeBanner = document.querySelector(".edit_mode");
    const header = document.querySelector("header");
    if (editModeBanner) {
        editModeBanner.style.visibility = "visible";
        header.style.marginTop = "50px";
    }
}

function updatePortfolio() {
    const filters = document.querySelector(".filters");
    const modal = document.querySelector(".js-modal");

    if (filters) {
        filters.style.display = "none";
    }

    if (modal) {
        modal.style.display = "flex";
    }
}

function updateLoginButton() {
    const loginButton = document.querySelector("nav ul li a[href='login-page.html']");

    if (loginButton) {
        if (isConnected()) {
            loginButton.textContent = "logout";
            loginButton.href = "#";
            loginButton.addEventListener("click", function () {
                localStorage.removeItem("authToken");
                window.location.href = "index.html";
            });
        } else {
            loginButton.textContent = "login";
            loginButton.href = "login-page.html";
        }
    }
}

if (isConnected()) {
    updateLoginButton();
    displayEditMode();
    updatePortfolio();
}

generateWorks()