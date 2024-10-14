let modal = null

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(`#${e.target.getAttribute("href")}`);
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

    loadModalGallery();
}

async function loadModalGallery() {
    const works = await getWorks();

    const modalGallery = document.querySelector(".gallery-modal");
    modalGallery.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.classList.add("modal-figure");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        img.classList.add("modal-img");

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

        deleteIcon.addEventListener("click", async () => {
            const confirmDelete = confirm(`Voulez-vous vraiment supprimer '${work.title}' ?`);
            if (confirmDelete) {
                const token = localStorage.getItem("authToken");
                const success = await deleteWork(work.id, token);

                if (success) {
                    modalGallery.removeChild(figure);
                    generateWorks();
                    closeModal();
                }
            }
        });

        modalGallery.appendChild(figure)
        figure.appendChild(img);
        figure.appendChild(deleteIcon);


    });
}

const closeModal = function (e) {
    if (modal === null) return;

    console.log("Fermeture de la modale");

    if (e) e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    imageElement.src = defaultImage;
    labelElement.style.display = "block";
    paragraphElement.style.display = "block";
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault();
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-photo-button");
    const backToGalleryBtn = document.querySelector(".back-to-gallery");
    const galleryPage = document.getElementById("gallery-page");
    const addPhotoPage = document.getElementById("add-photo-page");

    addButton.addEventListener("click", () => {
        galleryPage.classList.add("hidden");
        addPhotoPage.classList.remove("hidden");
        loadCategories();
    });


    backToGalleryBtn.addEventListener("click", () => {
        addPhotoPage.classList.add("hidden");
        galleryPage.classList.remove("hidden");

    });
});

async function loadCategories() {
    const categories = await getCategories();

    const categorySelect = document.getElementById("category");
    categorySelect.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

const addPhotoForm = document.getElementById("add-photo-form");
const imageElement = document.querySelector(".add-photo-section img");
const defaultImage = "assets/images/img.svg";
addPhotoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(addPhotoForm);
    const token = localStorage.getItem("authToken");

    try {
        const newWork = await addWork(formData, token);
        if (newWork) {
            generateWorks();
            addPhotoForm.reset();
            closeModal();
        } else {
            alert("Erreur lors de l'ajout de la photo.");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
    }
});

const fileImageUpload = document.querySelector(".add-photo-section input[type=file]");
const labelElement = document.querySelector(".add-photo-section label");
const paragraphElement = document.querySelector(".add-photo-section p");

fileImageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        imageElement.src = imageURL;
        labelElement.style.display = "none";
        paragraphElement.style.display = "none";
    }
});


