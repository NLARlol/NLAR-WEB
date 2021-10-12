document.getElementById("submit").addEventListener("click", async() => {
    var eml = document.getElementById("email").value;
    var psd = document.getElementById("psd").value;
    var usn = document.getElementById("floatingUsername").value;

    if(!eml || eml == "" || !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(eml)) return alert("Invalid email");
    if(!psd || psd == "") return alert("Invalid password")
    if(!usn || usn == "") return alert("Invalid username")

 const req = await fetch("https://sltcv.herokuapp.com/register", {body: JSON.stringify({email: eml, password: psd, username: usn}), method:"POST", mode:"cors", headers: {"Content-Type": "application/json"}});
    
    const res = await req.json();
    var form = document.getElementsByTagName("form")[0];
    var text = document.getElementById("zgeg")
    if(res.code == 200) {
        var alertdiv = document.createElement("div");
        alertdiv.role = "alert";
        alertdiv.className = "alert alert-success alert-dismissible fade show";
        alertdiv.innerText = "Merci de vous êtes inscrit sur NLAR, vous allez être redirigés vers la page d'accueil";

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-close";
        btn.ariaLabel = "Close"
        alertdiv.appendChild(btn);
        form.insertBefore(alertdiv, text);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
            return window.location.pathname = "index.html";
        }, 1500);
        /*            <div class="alert alert-success alert-dismissible fade show" role="alert">
               You should check in on some of those fields below.
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>*/
    } else {
        var alertdiv = document.createElement("div");
        alertdiv.role = "alert";
        alertdiv.className = "alert alert-danger alert-dismissible fade show";
        alertdiv.innerText = `${res.data.message}`;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-close";
        btn.ariaLabel = "Close"
        alertdiv.appendChild(btn);
        form.insertBefore(alertdiv, text);
        setTimeout(() => {
            return window.location.pathname = "index.html";
        }, 1500);
    }
    
});