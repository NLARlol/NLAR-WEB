window.onload = async() => {
    if(!localStorage.getItem("token")) return window.location.pathname = "login.html";
    var col = document.getElementsByClassName("col")[0];
    let params = (new URL(document.location)).searchParams;
    if(params.get("code")) {
        const ar = await fetch(`https://sltcv.herokuapp.com/linker?code=${params.get("code")}`, {
            mode: "cors",
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        const aq = await ar.json();

        if(aq.code != 200) {
            var alertdiv = document.createElement("div");
    
            alertdiv.setAttribute("role", 'alert');
            alertdiv.className = "alert alert-danger alert-dismissible fade show";
            alertdiv.innerText = `${aq.data.message}`;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-close";
            btn.ariaLabel = "close"
            btn.setAttribute("data-bs-dismiss", "alert");
            alertdiv.appendChild(btn);
            return col.appendChild(alertdiv);
        } else {
            var alertdiv = document.createElement("div");
            alertdiv.setAttribute("role", 'alert');
            alertdiv.className = "alert alert-success alert-dismissible fade show";
            alertdiv.innerText = `Le profil a été mis à jour !`;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-close";
            btn.ariaLabel = "close"
            btn.setAttribute("data-bs-dismiss", "alert");
            alertdiv.appendChild(btn);
            col.appendChild(alertdiv);
        }


    } 

    const req = await fetch(`https://sltcv.herokuapp.com/users/me`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });

    const res = await req.json();

    if(res.code != 200) {
  
        var alert = document.createElement("div");
        alert.role = "alert";
        alert.className = "alert alert-danger";
        alert.innerText = res.data.message;

        col.appendChild(alert);

        setTimeout(() => {
            window.location.pathname = "login.html"
        }, 1700);
    } else {
        var ul = newUl(newForm(document.getElementsByClassName("col")[0], "form-log zgeg"), "list-group");
        if(res.data.dsc) {
            newLi(ul, "Discord", ` ${res.data.dsc}`, "list-group-item text-center");
        }
        var zgeg1 = {
            "MOD": 0,
            "ADMIN": 1,
            "USER": 2
        }

        var zgeg2 = ["Modérateur", "Administrateur", "Utilisateur"]

        newLi(ul, "Permissions", ` ${zgeg2[zgeg1[res.data.perms]]}`, "list-group-item text-center");
        newLi(ul, "Username", ` ${res.data.username}`, "list-group-item text-center");
        newLi(ul, "Email", ` ${res.data.email}`, "list-group-item text-center");
        newLi(ul, "Crée le", ` ${getSemiDate(new Date(Date.parse(res.data.created_at)))}`, "list-group-item text-center");
        newButton(ul, "w-100 btn btn-primary mt-3", "Lier un compte Discord");





    }
}

function getSemiDate(date) {
    var month = String(date.getMonth() + 1);
    month = month.length == 1 ? "0" + month : month;
    var day = String(date.getDate());
    day = day.length == 1 ? "0" + day : day;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


/*HTML ELEMENTS*/

const newForm = (topush, classname) => {
    const newelement = document.createElement("form");
    newelement.className = classname;
    topush.appendChild(newelement);
    return newelement;
}

const newUl = (topush, classname) => {
    const newelement = document.createElement("ul");
    newelement.className = classname;
    topush.appendChild(newelement);
    return newelement;
}

const newLi = (topush, bold, text, classname) => {
    const newelement = document.createElement("li");
    newelement.className = classname;
    const boldelement = document.createElement("b");
    boldelement.className = "title"
    boldelement.innerText = bold;
    newelement.appendChild(boldelement);
    newelement.innerHTML += text;
    topush.appendChild(newelement);
    return newelement;
}


const newButton = (topush, classname, text) => {
    const newelement = document.createElement("button");
    newelement.type = "button";
    newelement.className = classname;
    newelement.innerText = text;
    topush.appendChild(newelement);
    newelement.onclick = () => {window.location.href = "https://discord.com/api/oauth2/authorize?client_id=881516796153311273&redirect_uri=https%3A%2F%2Fnlar.xyz%2Fme.html&response_type=code&scope=identify"}
    return newelement;
}