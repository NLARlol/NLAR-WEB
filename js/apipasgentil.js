
async function performLogin() {
    var email = document.getElementById("emaillol");
    var password = document.getElementById("passwd");
    var request = await fetch('http://localhost:3000/', {
        mode:'cors', 
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const response = await request.json();
    const status = request.status;

    if(status == 200) {
        Notiflix.Notify.Success(`Vous êtes connecté, redirection dans quelques instants..\nBienvenue ${response.data.username}`);
        console.log(response);
        //window.location.href = "https://nlar.netlify.app";
    } else {

    }
}