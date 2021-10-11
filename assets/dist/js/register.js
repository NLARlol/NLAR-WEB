document.getElementById("submit").addEventListener("click", async() => {
    var eml = document.getElementById("email").value;
    var psd = document.getElementById("psd").value;
    var usn = document.getElementById("floatingUsername").value;

    if(!eml || eml == "" || !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(eml)) return alert("Invalid email");
    if(!psd || psd == "") return alert("Invalid password")
    if(!usn || usn == "") return alert("Invalid username")

 const req = await fetch("https://sltcv.herokuapp.com/register", {body: JSON.stringify({email: eml, password: psd, username: usn}), method:"POST", mode:"cors", headers: {"Content-Type": "application/json"}});
  
    switch(req.status) {
        case 200:
            alert("Vous êtes inscrit, bienvenue..");
            var response = await req.json();
            window.localStorage.setItem("token", response.data.token);
            window.location.pathname = "index.html";
            break;
        case 429:
            alert("Veuillez réessayer plus tard.");
            break;
        case 404:
            alert("Votre compte n'existe pas.");
            break;
        case 403:
            alert("Votre email ou votre mot de passe est invalide.");
            break;
        case 500:
            alert("Internal server error");
            break;
    } 
});