window.onload = async() => {
    if(!localStorage.getItem("token")) return window.location.pathname = "login.html";
    var response;
    try {
        const req = await fetch("https://sltcv.herokuapp.com/users/me", {mode: "cors", headers: {Authorization: localStorage.getItem("token")}});
        const res = await req.json();
        response = res;
    } catch(e) {
        alert(e);
        return window.location.pathname = "login.html";
    }

    if(response.code != 200) {
        return window.location.pathname = "login.html";
    }

    if(!["MOD", "ADMIN"].includes(response.data.perms)) {
        return window.location.pathname = "login.html";
    }

    var container = document.getElementById("container")
    var footer = document.getElementById("footer")
    var px4 = newDiv(container, "container px-4");
    px4.remove();
    container.insertBefore(px4, footer );
    var row = newDiv(px4, "row gx-5");
    var col1 = newDiv(row, "col");
    var col2 = newDiv(row, "col");
    var bl = newDiv(col1, "p-3 border bg-dark");
    var reports = newDiv(col2, "p-3 border bg-dark");

    const reqbl = await fetch("https://sltcv.herokuapp.com/blacklists", {mode: "cors", headers: {Authorization: localStorage.getItem("token")}});
    const resbl = await reqbl.json();
    if(resbl.code == 200) {
        bl.innerText = `${resbl.data.blacklists.length} Blacklistés`;
    }
    const reqreports = await fetch("https://sltcv.herokuapp.com/reports", {mode: "cors", headers: {Authorization: localStorage.getItem("token")}});
    const resreports = await reqreports.json();
    if(resreports.code == 200) {
        reports.innerText = `${resreports.data.reports.length} report${resreports.data.reports.length == 1 ? "" : "s"} pending..`;
    }



  function newDiv(a, b) {
      var newelement = document.createElement("div");
      newelement.className = b;
a.appendChild(newelement);
return newelement;
  }
}