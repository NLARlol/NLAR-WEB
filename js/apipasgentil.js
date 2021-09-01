let token;
async function performLogin() {
    var email = document.getElementById("emaillol");
    var password = document.getElementById("passwd");
    var request = await fetch('http://localhost:3000/login', {
        mode:'cors', 
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }), headers:{"Content-Type": "application/json"}
    });

    const response = await request.json();
    const status = request.status;

    if(status == 200) {
        Notiflix.Notify.Success(`Vous êtes connecté, redirection dans quelques instants...`);
        token = response.data.token;
        localStorage.setItem("token", response.data.token);
        window.location.href = "https://nlar.netlify.app/index.html";
    } else {
        Notiflix.Notify.Failure("Infomations incorrectes");
    }
}

async function checksus() {
    var sus = document.getElementById("id");
    var request = await fetch('http://localhost:3000/check/' + sus.value, {
        mode:'cors', 
        credentials: 'include',
        method: "GET",
        headers: {
            Authorization: token || localStorage.getItem("token")
        }
    });

    const response = await request.json();

    if(response.code == 200) {
        fetch("https://nlar.netlify.app/usercss.txt").then(res => res.text()).then(css => {
            fetch("https://nlar.netlify.app/userbody.txt").then(res => res.text()).then(htmlpage => {
                document.body.innerHTML = "<style>" + css + "</style>" + htmlpage;
                fetch("https://nlar.netlify.app/userhead.txt").then(res => res.text()).then(head => {
            document.head.innerHTML = head;
                });
            });
        });

    } else {
        Notiflix.Notify.Failure("Failed");
    }
}

function getDate(date) {
      year = date.getFullYear(),
      month = (date.getMonth() + 1).toString(),
      formatedMonth = (month.length === 1) ? ("0" + month) : month,
      day = date.getDate().toString(),
      formatedDay = (day.length === 1) ? ("0" + day) : day,
      hour = date.getHours().toString(),
      formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
      minute = date.getMinutes().toString(),
      formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
      second = date.getSeconds().toString(),
      formatedSecond = (second.length === 1) ? ("0" + second) : second;
    return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
  };

function idToBinary(num) {
	let bin = '';
	let high = parseInt(num.slice(0, -10)) || 0;
	let low = parseInt(num.slice(-10));
	while (low > 0 || high > 0) {
		bin = String(low & 1) + bin;
		low = Math.floor(low / 2);
		if (high > 0) {
			low += 5000000000 * (high % 2);
			high = Math.floor(high / 2);
		}
	}
	return bin;
}

const deconstruct = function(snowflake) {
	const BINARY = idToBinary(snowflake).toString(2).padStart(64, '0');
	const res = {
		timestamp: parseInt(BINARY.substring(0, 42), 2) + 1420070400000,
		workerID: parseInt(BINARY.substring(42, 47), 2),
		processID: parseInt(BINARY.substring(47, 52), 2),
		increment: parseInt(BINARY.substring(52, 64), 2),
		binary: BINARY
	};
	Object.defineProperty(res, 'date', {
		get: function get() {
			return new Date(this.timestamp);
		},
		enumerable: true,
	});
	return res;
}

/**
 * Utility function to add replaceable CSS.
 * @param {string} styleString
 */
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

