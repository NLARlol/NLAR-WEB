let token;
async function performLogin() {
    var email = document.getElementById("emaillol");
    var password = document.getElementById("passwd");
    var request = await fetch('http://localhost:3000/login', {
        mode:'cors', 
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }), headers:{"Content-Type": "application/json"}
    });

    const response = await request.json();
    const status = request.status;

    if(status == 200) {
        Notiflix.Notify.Success(`Vous êtes connecté, redirection dans quelques instants..\nBienvenue ${response.data.username}`);
        localStorage.setItem("token", response.data.token);
        window.location.href = "https://nlar.netlify.app/index.html";
    } else {
        Notiflix.Notify.Failure("Infomations incorrectes");
    }
}

async function usersMeCheck() {
    var request = await fetch('http://localhost:3000/users/me', {
        mode:'cors', 
        credentials: 'include',
        method: "GET"
    });

    const status = request.status;

    if(status != 200) {window.href = "https://nlar.netlify.app/login.html"} else return;
}