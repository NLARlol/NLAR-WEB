function samousa() {
    if(arserv == null || arserv == [] || JSON.stringify(arserv) == "[]" || arserv.length == 0) {
        Notiflex.Notify.Failure("Cet n'utilisateur n'a pas été détecté comme étant dans un serveur anti raid.");
        return;
    } else {
        const style = document.getElementById("jesuispaspd");
        if(!style.innerHTML.includes("filter:blur")) {
            style.innerHTML = `.sltcflou {filter:blur(2px);}`;
        }
    }
}

const addStyle = function zgeg(text) {
	const style = document.getElementById("jesuispaspd");
	style.innerHTML += text;
}
  
const removeStyle = function() {
	const style = document.getElementById("jesuispaspd");
	style.innerHTML = "";
}
