function pedalo() {
    var id = document.getElementById("id")
        if (id.value.length > 18) {
            id.value = id.value.slice(0,18); 
        }

        checkIfDisabled();
}


function checkIfDisabled() {
    var button = document.getElementById("sucemabite");
    var text = document.getElementById("id").value;

    if(button.outerHTML.endsWith("disabled=\"\">") && text.length == 18) {
            button.outerHTML = button.outerHTML.replace("disabled=\"\"", "");
        
    } else if(button.outerHTML.endsWith("()\">") && text.length != 18) {
        button.outerHTML = button.outerHTML.replace("()\"", "()\" disabled=\"\"")
    } else {
        console.log(button.outerHTML.endsWith("()\">")  && text.length != 18);
        console.log(button.outerHTML);
        console.log(text.length)
    }
}

function onSubmit(token) {
  document.getElementById("demo-form").submit();
}


window.onresize = function() {
    particlesJS('particles-js',
  
  {
  "particles": {
    "number": {
      "value": 154,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "remove"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 0,
        "size": 0,
        "duration": 0,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 55.94405594405595,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

);
};



function check() {
    alert("fdp")
}