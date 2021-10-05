

$("#id")[0].addEventListener("input", (inp) => {
 
    console.log(inp)
    if(validateSnowflake(inp.target.value, DISCORD_EPOCH)) {
        if(document.getElementsByTagName("input").length != 2) {
            var input = document.createElement("input");
            input.type = "submit";
            input.id = "submit";
            input.value = "Check";
            input.onclick = submit;
            $("#form")[0].appendChild(input);
        }
        
    } else {
        if($("#submit")[0] != null) {
            $("#submit")[0].remove();
        } 
    }


    var element =$("#id")[0];
    if(element.value.length > 18) {
        element.value = element.value.slice(0, 18);
    }
} );

var userid;
var pp;
var creation;
var blacklist;
var ar;
var atext;
var pp2;
var servers;
var username;


async function submit() {
    var id = $("#id")[0].value;

    if(!validateSnowflake(id, DISCORD_EPOCH)) {
        return alert("Utilisateur introuvable");
    } else {
        const req = await fetch("https://sltcv.herokuapp.com/check/" + id + "?forceguilds=true", {mode: "cors", headers: {authorization: window.localStorage.getItem("token")}});
        const res = await req.json();
        switch(res.code) {
            case 404:
                alert("Utilisateur introuvable");
                break;
            case 200:
                const req2 = await fetch("https://nlarxd.netlify.app/checked.html");
                var text = await req2.text();
                username = res.data.username;
                servers = res.data.antiraidservers;
                document.getElementsByTagName("html")[0].innerHTML = text;
                document.title = `Checked user ${res.data.username}#${res.data.discriminator}`
                $("#img")[0].src = `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}`;
                document.getElementById("userid").innerText = `User ID : ${id}`;
                $("#avatarlink")[0].href = `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}`;
                var bldetails = document.createElement("a");
                bldetails.innerText = "détails";

                document.getElementById("blacklist").innerText = typeof(res.data.blacklisted) == "boolean" ? "Blacklist : non" : `Blacklist : oui, `;
                if(typeof(res.data.blacklisted) != "boolean") {
                    document.getElementById("blacklist").appendChild(bldetails)
                    document.getElementById("blacklist").addEventListener("click", () => {
                        var bl = res.data.blacklisted;
                        if(bl == false) return;
                        var form = document.getElementsByClassName("form")[0];
                    
                        form.innerHTML = "";
                        var text = document.createElement("h1");
                        text.innerText = `Blacklist Info`
                        form.appendChild(text);
                    
                        form.appendChild(pp);
                    
                        var sltcv = document.createElement("ul");
                        sltcv.className = "checked";
                        sltcv.innerText = `Blacklist par : ${bl.blacklistedby}`
                        var sltcv2 = document.createElement("ul");
                        sltcv2.className = "checked";
                        sltcv2.innerText = `Blacklist le : ${getSemiDate(new Date(bl.timestamp))}`;
                        var sltcv3 = document.createElement("ul");
                        sltcv3.className = "checked";
                        sltcv3.innerText = `Raison : ${bl.reason}`;
                        form.appendChild(sltcv);
                        form.appendChild(document.createElement("br"));
                        form.appendChild(sltcv2);
                        form.appendChild(document.createElement("br"));
                        form.appendChild(sltcv3);
                        form.appendChild(document.createElement("br"));
                        var inputsos = document.createElement("input");
                        inputsos.className = "sauce";
                        inputsos.type = "submit";
                        inputsos.value = "Retourner a la première page"
                        inputsos.onclick = retour;
                        document.getElementsByClassName("form")[0].appendChild(inputsos)
                    });
                }
                var serversbrowse = document.createElement("a");
                serversbrowse.innerText = "détails";
                serversbrowse.id = "zgegid";
                
                $("#serversar")[0].innerText = (res.data.antiraidservers.length == 0 ? "Serveurs AR : 0 serveur détecté" : `Serveurs AR : ${res.data.antiraidservers.length} ${res.data.antiraidservers.length == 1 ? "détecté" : "détectés"}, `);
                if(res.data.antiraidservers.length != 0) {
                    document.getElementById("serversar").appendChild(serversbrowse)
                    document.getElementById("zgegid").addEventListener("click", () => {
                        document.getElementsByClassName("form")[0].innerHTML = "";
                        var textlol = document.createElement("h2");
                        textlol.innerText = `Serveurs AR de ${username}`
                        textlol.className = "title";
                        document.getElementsByClassName("form")[0].appendChild(textlol);
                        
                        servers.forEach(serv => {
                            var zgeg = document.createElement("ul");
                            zgeg.className = "serv";
                            zgeg.innerText = `${serv.name} (${serv.id})`
              
                            document.getElementsByClassName("form")[0].appendChild(zgeg)
                 
                        });

                        var inputsos = document.createElement("input");
                        inputsos.className = "sauce";
                        inputsos.type = "submit";
                        inputsos.value = "Retourner a la première page"
                        inputsos.onclick = retour;
                        document.getElementsByClassName("form")[0].appendChild(inputsos)
                    });
                }
                document.getElementById("creationdate").innerText = `Date de création : ${getSemiDate(convertSnowflakeToDate(res.data.id))}`
              

                userid = document.getElementById("userid");
                pp = document.getElementById("img");
                creation = document.getElementById("creationdate");
                blacklist = document.getElementById("blacklist");
                ar = document.getElementById("serversar");
                pp2 = document.getElementById("zgegpp");
                atext = document.getElementById("zztrext");
  
                break;
            case 429:
                alert("Too many requests..");
                break;
            case 401:
                window.location.href = "https://nlarxd.netlify.app/login.html";
                break;
            }
    } 
}

function getSemiDate(date) {
    var month = String(date.getMonth());
    month = month.length == 1 ? "0" + month : month;
    var day = String(date.getDate());
    day = day.length == 1 ? "0" + day : day;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

window.onload = async() => {
    document.getElementById("id").value = "";
    const req = await fetch("https://sltcv.herokuapp.com/users/me", {mode: "cors", headers: {authorization: window.localStorage.getItem("token")}});
    var response = await req.json();
    if(response.code == 401) {
        window.location.href = "https://nlarxd.netlify.app/login.html";
    } else if(response.code == 429) {
        window.location.href = "https://google.fr";
    }

}


//https://github.com/vegeta897/snow-stamp/blob/main/src/convert.js
function convertSnowflakeToDate(snowflake, epoch = DISCORD_EPOCH) {
	return new Date(snowflake / 4194304 + epoch)
}

const DISCORD_EPOCH = 1420070400000

function validateSnowflake(snowflake, epoch) {
    if(String(snowflake).length < 17) {
        return false;
    }
	if (!Number.isInteger(+snowflake)) {
        return false;
	}
	if (snowflake < 4194304) {
        return false;
	}
	const timestamp = convertSnowflakeToDate(snowflake, epoch)
	if (isNaN(timestamp.getTime())) {
		return false;
	}
	return true;
}




function retour() {
    var form = document.getElementsByClassName("form")[0];

    form.innerHTML = "";
    form.appendChild(atext);

    form.appendChild(pp);

    form.appendChild(userid);
    form.appendChild(document.createElement("br"));
    form.appendChild(pp2);
    form.appendChild(document.createElement("br"));
    form.appendChild(creation);
    form.appendChild(document.createElement("br"));
    form.appendChild(blacklist);
    form.appendChild(document.createElement("br"));
    form.appendChild(ar);
}


