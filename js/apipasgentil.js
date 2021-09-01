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
    const status = request.status;

    if(response.code == 200) {
        addStyle(`*{
            margin: 0%;
            padding: 0%;
            font-family: 'Ubuntu', sans-serif
        }
        body{
            background: #313131;
        }
        
        #container{
            width:100px;
            position: absolute;
            margin-left: 25%;
            padding-right: 10%;
        }
        /* Bordered form */
        div.form {
            width: 200%;
            padding: 15px;
            border: 3px solid #212121;
            background: #212121;
            border-radius: 5%;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        }
        
        #container h1{
            width: 38%;
            color:#ededed;
            padding-left: 23%;
            margin: 0 auto;
            margin-bottom: 5%;
        }
        
        .sltcv {
            color: #ccc0c0;
            font-size: 150%;
            margin-left: 30%;
        }
        
        .logo {
            margin-top: 10%;
            height: 155px;
            width: 35%;
            border-radius: 50%;
            position: absolute;
         
        }
        
        #particles-js {
            height: 99%;
            width: 100%;
            position: absolute;
            z-index: -10;
        } 
          
        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
        
        input[type=submit] {
            background-color: #0258e9;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            margin-top: 2%;
            cursor: pointer;
            width: 100%;
        }
        input[type=submit]:hover {
            background-color: #0042b3;
            color:  white;
            border: 1px solid #0042b3;
        }`);
        var samousa = document.getElementById("samousa")
        var container = document.getElementById("container")
        container.removeChild(samousa);
        var div = document.createElement("div").setAttribute("class", "form")
        document.body.append(div);
        const logo = document.createElement("p")
        logo.innerHTML = `<p class=\"logo\" id=\"sltcv\"><img src=\"https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png?size=2048\"></p>`
        div.append(logo);
        const title = document.createElement("h1");
        title.innerHTML = "<h1>User Information</h1>"
        div.append(title);
        const id = document.createElement("ul");
        id.innerHTML = `<ul class="sltcv">User ID: ${response.data.id}</ul><br>`
        div.append(id);
        const usn = document.createElement("ul");
        usn.innerHTML = `<ul class="sltcv">Username: ${response.data.username}#${response.data.discriminator}</ul><br>`
        div.append(usn);
        const blacklisted = document.createElement("ul").innerHTML = `<ul class="sltcv">Blacklisted</ul> <br>`;
        div.append(blacklisted);
        var dat = deconstruct(response.data.id).timestamp

        const created = document.createElement("ul");
        var date = new Date(dat);
                console.log(date);
        created.innerHTML = `<ul class="sltcv">Created: ${getDate(date)}</ul><br>`
        div.append(created);

        const button = document.createElement("input");
        button.innerHTML = `  <input type="submit" id='submit' value='Serveur AR' style="border-radius: 5px;" >`
        div.append(button);
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

