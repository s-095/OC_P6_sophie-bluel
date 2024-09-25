/* const formInput = document.querySelector("#login form");

let formdata = window.localStorage.getItem('formData');

const getLogin = await fetch('http://localhost:5678/users/login');
pieces = await reponse.json();

const valeurData = JSON.stringify(formData);

window.localStorage.setItem("formData", valeurData);

body={email:"sophie.bluel@test.tld", password:"S0phie"}
strbody= JSON.stringify(body)
{email:"sophie.bluel@test.tld", password;"S0phie", content-type; application/json}
r= await fetch ("http://localhost:5678/api/users/login",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: strbody
}); */

const getLogin = "http://localhost:5678/api/users/login";

const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", submitLogin);

async function submitLogin(event) {
    event.preventDefault();

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const oldErrorMessage = document.querySelector(".error-message");
    if (oldErrorMessage) {
        oldErrorMessage.remove();
    }

    try {
        let response = await fetch(getLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.status !== 200) {
            
            const errorMessage = document.createElement("div");
            errorMessage.className = "error-message";
            errorMessage.innerHTML = "E-mail et/ou mot de passe incorrect";
            document.querySelector("form").prepend(errorMessage);

        } else {
            let result = await response.json();
            const token = result.token;
            window.localStorage.setItem("authToken", token);
            window.location.href = "index.html";
            console.log(token);
            console.log(result);
        }

        console.log("E-mail:", user.email);
        console.log("Mot de passe:", user.password);
    } catch (error) {
        console.error('Erreur:', error);
    }
}




/* body={email:"sophie.bluel@test.tld", password:"S0phie"}
{email: 'sophie.bluel@test.tld', password: 'S0phie'}email: "sophie.bluel@test.tld"password: "S0phie"[[Prototype]]: Object
strbody= JSON.stringify(body)
'{"email":"sophie.bluel@test.tld","password":"S0phie"}'
r=await fetch("http://localhost:5678/api/users/login", {method:"POST", body:strbody, headers:headers})
Response {type: 'cors', url: 'http://localhost:5678/api/users/login', redirected: false, status: 200, ok: true, …}body: (...)bodyUsed: falseheaders: Headers {}ok: trueredirected: falsestatus: 200statusText: "OK"type: "cors"url: "http://localhost:5678/api/users/login"[[Prototype]]: Response
await r.json()
{userId: 1, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…TYyfQ.kq2fxJ147IkD3NKZVj-P1Tfzrug-rIBfvfESZWr2a44'} */