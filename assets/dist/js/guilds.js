init();
async function init() {
    let params = (new URL(document.location)).searchParams;

    if(params.get("code")) {
        const guilds = await fetch("http://sltcv.herokuapp.com/users/me/guilds?code=" + params.get("code"), {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        if(guilds.status != 200) return showGuilds({data: []})
        var data = await guilds.json();
        showGuilds(data);
    } else {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=881516796153311273&redirect_uri=https%3A%2F%2Fnlar.xyz%2Fguilds.html&response_type=code&scope=identify%20guilds"
    }
}

async function showGuilds(data) {
    document.getElementById("xd").remove();
    var div = document.createElement("div");
    div.className = "container mt-5";
    document.body.appendChild(div);
    var row = document.createElement("div");
    row.className = "row row-cols-2 mt-5";
    div.appendChild(row);

    if(data.data.length == 0) {
        var col = document.createElement("div");
        row.className = "row"
        col.className = "col"
        row.appendChild(col);
        col.innerText = "You are not owner in any guilds or there is an error, please check the 'network' tab of the developper panel to see if there is an error."
    } else {
        for (let i = 0; i < data.data.length; i++) {
            var col = document.createElement("div");
            col.className = "col w-25 p-3 mr-2 ml-2"
            row.appendChild(col);
            const serv = data.data[i];
            var card = newDiv("card", col);
            var img = newImg(card, serv)
            var cardbody = newDiv("card-body text-dark", card);
            var h5 = newH5(serv.name, cardbody);
            var largebtndiv = newDiv("d-grid gap-2", cardbody);
            var a = new newLink(largebtndiv)
            a.addEventListener("click", async() => {
                var res = await fetch(`http://sltcv.herokuapp.com/guild/${serv.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        verified: true
                    })
                });

                var status = res.status;
                if(status != 204) {
                    res = await res.json()
                    row.innerHTML = "";
                    row.className = "row";
                    var alert =newDiv("alert alert-danger", row);
alert.setAttribute("role", "alert")
alert.innerText = res.data.message;
                } else {
                    row.innerHTML = "";
                    row.className = "row";
                    var alert = newDiv("alert alert-success", row);
                    alert.setAttribute("role", "alert")
                    alert.innerText = "Votre serveur est maintenant vérifié."
                }
            }); 
        }
    }
}

function newLink(element) {
    var topush = document.createElement("a");
    topush.innerText = "Sélectionner";
    topush.type = "button";
    topush.className = "btn btn-primary";
    element.appendChild(topush);
    return topush;
}

function newH5(text, element) {
    var topush = document.createElement("h5");
    topush.className = "card-title";
    topush.innerText = text;
    element.appendChild(topush);
    return topush;
}

function newImg(element, serv) {
    var topush = document.createElement("img");
    topush.src = serv.icon ? `https://cdn.discordapp.com/icons/${serv.id}/${serv.icon}.${serv.icon.startsWith("a_") ? "gif" : "png"}?size=128` : "https://cdn.discordapp.com/attachments/904796018581835807/906195123853992017/zgeg.png?size=128"
    element.appendChild(topush)
    return topush;
}


function newDiv(classl, element) {
    var topush = document.createElement("div");
    topush.className = classl;
    element.appendChild(topush);
    return topush;
}