var btn = document.getElementById("submit");
var box = document.getElementById("memberid");

window.onload = () => {
    if(!localStorage.getItem("token")) {
       // window.location.pathname = "login.html";
    }
}

btn.addEventListener("click", async() => {

    var response;
    var col = document.getElementsByClassName("col")[0];
    
    try {

        const req = await fetch("https://sltcv.herokuapp.com/check/" + box.value + "?forceguilds=true", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        const res = await req.json();
        response = res;
        
    } catch(e) {
        err(e);
    }

    if(response.code == 200) {
        showCheck(response);
    } else {
        err(response.data.message);
    }

    function err(err) {
        col.innerHTML = "";
        var div = newElementA("div", col);
        div.className = "alert alert-danger";
        div.role = "alert";
        div.innerText = err;
        setTimeout(() => {
            window.location.pathname = "login.html";
        }, 1250);
    }
})

document.getElementById("memberid").addEventListener("input", (event) => {

    var box = document.getElementById("memberid");
    if(isNaN(event.data)) {
        box.value = box.value.substring(0, box.value.length -1)
    }


        btn.disabled = !validateSnowflake(box.value, DISCORD_EPOCH);
    

    if(box.value.length > 18) {
        box.value = box.value.slice(0, 18);
    }
});

function convertSnowflakeToDate(snowflake, epoch = DISCORD_EPOCH) {
	return new Date(snowflake / 4194304 + epoch)
}



function showCheck(response) {
    document.body.className = "bg-dark text-center";
    document.body.innerHTML = "";
    var container = newDiv(document.body, "container");
    var row = newDiv(container, "row");
    var col = newDiv(row, "col");
    var card = newDiv(col, "card");
    card.style.backgroundColor = "#515152";

    var cardheader = newDiv(card, "card-header");
    var ul = document.createElement("ul");
    ul.className = "list-group";
    cardheader.appendChild(ul);
    newLi(ul, "Username: ", `${response.data.username}#${response.data.discriminator} (${response.data.id})`);
    var pplink = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}?size=160`;
    var ppa = newA(pplink, new URL(pplink).hostname);
    newLiWithA(ul, "Profile Picture: ", ppa);
    newLi(ul, "Creation Date: ", getSemiDate(convertSnowflakeToDate(response.data.id, DISCORD_EPOCH)));

    if(response.data.antiraidservers.length != 0) {
        var asrv = newA("", "détails");
        asrv.removeAttribute("href");
        newLiWithAandText(ul, "Serveurs AR: ", asrv, `${response.data.antiraidservers.length} détectés, `);
        asrv.addEventListener("click", () => {
            showServers(response)
            //TODO SHOW SERVERS
        });
    } else {
        newLi(ul, "Serveurs AR: ", "non");
    }


    if(response.data.blacklisted != false) {
        var abl = newA("", "détails");
        abl.removeAttribute("href");
        abl.addEventListener("click", () => {
            showBlacklists(response);
        });
        newLiWithAandText(ul, "Blacklist: ", abl, `oui, `);
    } else {
        newLi(ul, "Blacklist: ", "non");
    }



    var cardbody = newDiv(card, "card-body");
    var ppa2 = newA(pplink, "");
    ppa2.target = "blank";
    var img = document.createElement("img");
    img.src = pplink;
    ppa2.appendChild(img);
    cardbody.appendChild(ppa2);
}


function showServers(response) {
    var card = document.getElementsByClassName("card")[0];
    card.innerHTML = "";
    var container = newDiv(card, "container");
    var ul = document.createElement("ul");
    ul.className = "list-group";
    container.appendChild(ul);
    var i = 0;
    response.data.antiraidservers.forEach(serv => {
        var aze = newLi(ul, serv.name + " ", serv.id);
        aze.className += " mb-1";
        if(i == 0) {
            aze.className += " mt-3"
        }
        i++;
    });
    var bigbtn = newDiv(container, "d-grid gap-2");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Retour au menu principal"
    btn.className = "btn btn-primary mb-3 mt-1"
    btn.addEventListener("click", () => {
        showCheck(response);
    });
    bigbtn.appendChild(btn);
}

function showBlacklists(response) {
    var pplink = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}?size=160`;
    document.body.className = "bg-dark text-center";
    document.body.innerHTML = "";
    var container = newDiv(document.body, "container");
    var row = newDiv(container, "row");
    var col = newDiv(row, "col");
    var card = newDiv(col, "card");
    card.style.backgroundColor = "#515152";

    var cardheader = newDiv(card, "card-header");
    var ul = document.createElement("ul");
    ul.className = "list-group";
    cardheader.appendChild(ul);
    newLi(ul, "Blacklist par: ", response.data.blacklisted.blacklistedby);
    newLi(ul, "Blacklist le: ", getSemiDate(new Date(Date.parse(response.data.blacklisted.timestamp))));
    newLi(ul, "Raison: ", response.data.blacklisted.reason);

    var cardbody = newDiv(card, "card-body");
    var ppa2 = newA(pplink, "");
    ppa2.target = "blank";
    var img = document.createElement("img");
    img.src = pplink;
    ppa2.appendChild(img);
    cardbody.appendChild(ppa2);

    var bigbtn = newDiv(cardbody, "d-grid gap-2");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Retour au menu principal"
    btn.className = "btn btn-primary mb-1 mt-5"
    btn.addEventListener("click", () => {
        showCheck(response);
    });
    bigbtn.appendChild(btn);
}

function getSemiDate(date) {
    var month = String(date.getMonth() + 1);
    month = month.length == 1 ? "0" + month : month;
    var day = String(date.getDate());
    day = day.length == 1 ? "0" + day : day;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const DISCORD_EPOCH = 1420070400000

function validateSnowflake(snowflake, epoch) {
    if(String(snowflake).length < 17) {
        return false;
    }
	else if (!Number.isInteger(+snowflake)) {
        return false;
	}
	else if (snowflake < 4194304) {
        return false;
	} else if(isNaN(convertSnowflakeToDate(snowflake, epoch).getTime())) {
        return false;
    }

    else {
        return true;
    }

}

//HTML ELEMENTS

function newElementA(tag, topush) {
    var newelement = document.createElement(tag);
    topush.appendChild(newelement);
    return newelement;
}

function newElement(tag) {
    var newelement = document.createElement(tag);
    return newelement;
}

const newDiv = (topush, classname) => {
    var newelement = document.createElement("div");
    newelement.className = classname;
    topush.appendChild(newelement);
    return newelement;
}

const newLi = (topush, subject, info) => {
    var li = document.createElement("li");
    li.className = "list-group-item py-1 text-center text-light";
    li.style.backgroundColor = "#616161";
    var span = document.createElement("span");
    var bold = document.createElement("b");
    bold.innerHTML = subject;
    span.appendChild(bold);
    span.innerHTML += info;
    li.appendChild(span);
    topush.appendChild(li);
    return li;
}
const newLiWithA = (topush, subject, a) => {
    var li = document.createElement("li");
    li.className = "list-group-item py-1 text-center text-light";
    li.style.backgroundColor = "#616161";
    var span = document.createElement("span");
    var bold = document.createElement("b");
    bold.innerHTML = subject;
    span.appendChild(bold);
    span.appendChild(a);
    li.appendChild(span);
    topush.appendChild(li);
    return li;
}
const newLiWithAandText = (topush, subject, a, text) => {

    var li = document.createElement("li");
    li.className = "list-group-item py-1 text-center text-light";
    li.style.backgroundColor = "#616161";
    var span = document.createElement("span");
    var bold = document.createElement("b");
    bold.innerHTML = subject;
    span.appendChild(bold);
    span.innerHTML += text;
    span.appendChild(a);
    li.appendChild(span);
    topush.appendChild(li);
    return li;
}

const newA = (link, text) => {
    var a = document.createElement("a");
    a.href = link;
    a.innerText = text;
    return a;
}