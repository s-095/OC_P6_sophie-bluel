const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", submitLogin);

async function submitLogin(event) {
    event.preventDefault();

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const result = await logUser(user);
    if (result.ok) {

        const token = result.token;
        window.localStorage.setItem("authToken", token);
        window.location.href = "index.html";

    }
    else {
        const oldErrorMessage = document.querySelector(".error-message");
        if (oldErrorMessage) {
            oldErrorMessage.remove();
        }
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.innerHTML = "E-mail et/ou mot de passe incorrect";
        document.querySelector("form").prepend(errorMessage);
    }
}
