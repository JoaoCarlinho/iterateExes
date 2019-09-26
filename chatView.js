
var slideIndex = 1;
var sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", respondToMessage);

document.getElementById('message').onkeydown = function (event) {
    if (event.keyCode == 13) {
        respondToMessage();
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    } else {
        respondToMessage();
    }
}

function respondToMessage() {
    var message = document.getElementById("message").value;
    if (message.indexOf("Hi") > -1 || message.indexOf("Hey") > -1) {
        document.getElementById("slideBox").innerHTML = "I can help you with queries";
    } else if (message.indexOf("Thanks") > -1 || message.indexOf("Thank you") > -1 || message.indexOf("Bye") > -1) {
        document.getElementById("slideBox").innerHTML = "Thanks for using the BOT. GoodBye";
    } else {
        document.getElementById("slideBox").innerHTML = "";
        const endpoint = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b75da00e12d54774a2d362adddcc9bef&q=' + message;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                var counter = 1;
                obj.response.docs.forEach((doc) => {
                    if (counter < 4) {
                        var newDiv = document.createElement("div");
                        newDiv.className = "mySlides fade";
                        newDiv.innerHTML = doc.lead_paragraph;
                        document.getElementById("slideBox").appendChild(newDiv);
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("chatView").style.display = "block";
                    }
                    counter++;
                });
                showSlides(slideIndex)
            };
        };
        xhttp.open("GET", endpoint, true);
        document.getElementById("loading").style.display = "block";
        document.getElementById("chatView").style.display = "none";
        xhttp.send();
    }
}