function samousa() {
    if(arserv == null || arserv == [] || JSON.stringify(arserv) == "[]" || arserv.length == 0) {
        Notiflex.Notify.Failure("Cet n'utilisateur n'a pas été détecté comme étant dans un serveur anti raid.");
        return;
    } else {
        addStyle(`.body {
	fitler:blur(4px);
	}`)
    }
}

const addStyle = (() => {
    const style = document.createElement('style');
    document.head.append(style);
    return (styleString) => style.textContent = styleString;
  })();
  
const removeStyle = function(str) {
    const style = document.getElementsByName("style");
    style.forEach(lol => {
        document.removeChild(lol);
    });
}
