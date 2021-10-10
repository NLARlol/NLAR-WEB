var index = 0;
var res;
//load fct
window.onload = async() => {
    if(!localStorage.getItem("token")) return window.location.pathname = "login.html";
    const req = await fetch("https://sltcv.herokuapp.com/reports", {mode: "cors", headers: {
        "Authorization": localStorage.getItem("token")
    }});

    const res = await req.json();
    var col = document.getElementsByClassName("col")[0];
    this.res = res;
    if(res.code == 401) {
        return window.location.pathname = "login.html";
    } else if(res.code != 200) {

        col.innerHTML = "";
        var card = newDiv("card", col);
        var header = newDiv("card-header", card);
        var alert = newDiv("alert alert-warning", header);
        alert.role = "alert";
        alert.innerText = res.data.message;
    } else {
        if(res.data.reports.length == 0) {
            col.innerHTML = ""
            return newH1(col, "Pas de report aujourd'hui..");
        }
        showNewReport(index);

    }
}

//show a new report to the member
const showNewReport = (index) => {
    var col = document.getElementsByClassName("col")[0];
    col.innerHTML = "";
    if(res.data.reports.length == 0) {
        return newH1(col, "Pas de report aujourd'hui..");
    }

    var card = newDiv("card", col);
    newTitle(card, `Report ${index}/${res.data.reports.length -1}`);
    var header = newDiv("card-header", card);
    var ul = newUl("list-group", header);
    newLi(ul, "Auteur : ", res.data.reports[index].author);
    newLi(ul, "User Report : ", `${res.data.reports[index].target.username} (${res.data.reports[index].target.id})`);
    newLi(ul, "Raison : ", res.data.reports[index].reason);
    newLi(ul, "Report le : ", formatDate(res.data.reports[index].timestamp));
    var body = newDiv("card-body", card);
    var largebtn = newDiv("d-grid gap-2", body);
    var preuves = newButton(largebtn, "btn btn-secondary", "button");
    preuves.innerText = "Preuves";
    preuves.addEventListener("click", () => {
    showProofs(this.index); 
    });
    var blacklist = newButton(largebtn, "btn btn-warning", "button");
    blacklist.innerText = "Blacklist";
    blacklist.addEventListener("click", async() => {
        try {
            const req = await fetch(`https://sltcv.herokuapp.com/report/${res.data.reports[index].target.id}/confirm`, {method:"POST", mode:"cors", headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem("token")}});
        
        const res2 = await req.json();

        if(res2.code == 200) {
            var alert = newDivNA("alert alert-success");
            alert.role = "alert";
            alert.innerText = res2.data.message;
            col.insertBefore(alert, col.firstChild);
            res.data.reports.splice(this.index, 1);
            setTimeout(() => {
                this.index = 0;
                showNewReport(0);
            }, 1500);

        } else {

            var alert = newDivNA("alert alert-warning");
            alert.role = "alert";
            alert.innerText = res2.data.message;
            col.insertBefore(alert, col.firstChild);
        }
        } catch(e) {
            var alert = newDivNA("alert alert-danger");
            alert.role = "alert";
            alert.innerText = e;
            col.insertBefore(alert, col.firstChild);
        }
    });
    var rejecter = newButton(largebtn, "btn btn-warning", "button");
    rejecter.innerText = "Rejeter";
    rejecter.addEventListener("click", async() => {
        try {
            const req = await fetch(`https://sltcv.herokuapp.com/report/${res.data.reports[index].target.id}/reject`, {method:"POST", mode:"cors", headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem("token")}});
        
        const res2 = await req.json();

        if(res2.code == 200) {
            var alert = newDivNA("alert alert-success");
            alert.role = "alert";
            alert.innerText = res2.data.message;
            col.insertBefore(alert, col.firstChild);
            res.data.reports.splice(this.index, 1);
            setTimeout(() => {
                this.index = 0;
                showNewReport(0);
            }, 1500);

        } else {

            var alert = newDivNA("alert alert-warning");
            alert.role = "alert";
            alert.innerText = res2.data.message;
            col.insertBefore(alert, col.firstChild);
        }
        } catch(e) {
            var alert = newDivNA("alert alert-danger");
            alert.role = "alert";
            alert.innerText = e;
            col.insertBefore(alert, col.firstChild);
        }

    });

    if(index != 0) {
        var prev = newButton(body, "carousel-control-prev", "button");
        newSpan(prev, "carousel-control-prev-icon bg-dark pt-5 mb-5");
        prev.addEventListener("click", () => {
            this.index--;
            showNewReport(this.index);
        });
    }

    if(index != (res.data.reports.length - 1)) {
        var next = newButton(body, "carousel-control-next", "button");
        newSpan(next, "carousel-control-next-icon bg-dark pt-5 mb-5");
        next.addEventListener("click", () => {
            this.index++;
            showNewReport(this.index);
        });
    }
}

//function used to reset card & show proofs
const showProofs = (index) => {
    var card = document.getElementsByClassName("card")[0];
    document.getElementsByClassName("card-body")[0].remove();
    document.getElementsByClassName("card-header")[0].remove();
    var ul = newUl("list-group", card);
    for (let i = 0; i < res.data.reports[index].proof.length; i++) {
        const report = res.data.reports[index].proof[i];
        newLimogus(ul, newB(`Preuve #${i} `), newLink("", `${new URL(report).hostname} - ${new URL(report).pathname.split(".")[1] != null ? new URL(report).pathname.split(".")[1] : "No mediatype detected"}`, report), true);
    }
    newBr(ul)
    const largebtn = newDiv("d-grid gap-2", ul);
    const btn = newButton(largebtn, "btn btn-primary mt-2 mb-2 mr-3 ml-3", "button");
    btn.innerText = "Retour au menu principal";
    btn.addEventListener("click", () => {
        showNewReport(this.index)
    });
}


//html elements & formatting date fct
const formatDate = (date) => {
    var d = new Date(Date.parse(date));
    
    var day = d.getDate().toString();
    var month = d.getMonth().toString();
    day.length == 1 ? day = "0" + day : day;
    month.length == 1 ? month = "0" + month : month;
    return `${day}/${month}/${d.getFullYear()}`
}

const newB = (title) => {
    const newelement = document.createElement("b");
    newelement.innerText = title;
    return newelement;
}
const newBr = (topush) => {
    const newelement = document.createElement("br");
    topush.appendChild(newelement)
    return newelement;
}

const newH1 = (topush, text) => {
    const newelement = document.createElement("h1");
    newelement.className = "text-light";
    newelement.innerText = text;
    topush.appendChild(newelement);
    return newelement;
}

const newTitle = (topush, title) => {
    const newelement = document.createElement("h2");
    newelement.className = "mt-1 mb-2";
    newelement.innerText = title;
    topush.appendChild(newelement);
    return newelement;
}

const newDiv = (classname, topush) => {

    const newelement = document.createElement("div");
    newelement.className = classname;
    topush.appendChild(newelement);
    return newelement;
}

const newDivNA = (classname, topush) => {

    const newelement = document.createElement("div");
    newelement.className = classname;
    return newelement;
}

const newLink = (classname, text, href) => {
    const newelement = document.createElement("a");
    newelement.className = classname;
    newelement.href = href;
    newelement.innerText = text;
    return newelement;
}

const newUl = (classname, topush) => {

    const newelement = document.createElement("ul");
    newelement.className = classname;
    topush.appendChild(newelement);
    return newelement;
}
const newLi = (topush, type, text) => {

    const newelement = document.createElement("li");
    newelement.className = "list-group-item";

    var bold = document.createElement("b");
    bold.innerText = type;
    newelement.appendChild(bold);
    newelement.innerHTML += text;
    
    topush.appendChild(newelement);
    return newelement;
}

const newLimogus = (topush, type, a) => {

    const newelement = document.createElement("li");
    newelement.className = "list-group-item";
    newelement.appendChild(type);
    newelement.appendChild(a);
    
    topush.appendChild(newelement);
    return newelement;
}

const newButton = (topush, classname, type) => {

    const newelement = document.createElement("button");
    newelement.type = type;
    newelement.className = classname;
  

    topush.appendChild(newelement);
    return newelement;
}

const newSpan = (topush, classname) => {
    const newelement = document.createElement("span");
    newelement.className = classname;
  

    topush.appendChild(newelement);
    return newelement;
}
