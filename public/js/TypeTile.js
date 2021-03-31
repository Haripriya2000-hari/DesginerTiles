var slideIndex = 0;
showSlides();

async function showSlides() {
    var i;
    var slides = document.getElementsByClassName("myslider");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}



var granitecon = document.getElementsByClassName("granitecontainer");
var marblecon = document.getElementsByClassName("marblecontainer");

function toggleingtogranite() {


    granitecon[0].style.display = "flex";
    marblecon[0].style.display = "none";
}

function toggling() {
    granitecon[0].style.display = "none";
    marblecon[0].style.display = 'flex';

}


var uid = sessionStorage.getItem("uid");



function locationchange() {
    var wishlist = document.getElementById("wishlistlink");
    var cartonclick = document.getElementById("cartlink")
    var accountinfoclick = document.getElementById("accountlink")


    console.log("clicke")
    cartonclick.href = "/" + uid + "/addtocart"
    wishlist.href = "/" + uid + "/wishlist"
    accountinfoclick.href = "/" + uid + "/accountinfo"



}

function myorders() {
    location.replace(' /' + uid + '/myorders')

}





var names = document.getElementsByClassName('name');
var imgsrc = document.getElementsByClassName('img');
var cost2 = document.getElementsByClassName('cost');


var uid = sessionStorage.getItem("uid");

function adding(i) {
    var cost = cost2[i - 1].innerHTML.replace("₹/sq.feet", "").trim()
    cost = cost.replace('Cost :', '')
    cost = cost.trim()
        // alert(cost)
    ajax(i - 1);

}

function ajax(i) {
    console.log(i)
    var nam = names[i].innerHTML.trim();
    var img = imgsrc[i].src
    img = img.replace('http://localhost:3000', '')
    var cost = cost2[i].innerHTML.replace("₹/sq.feet", "").trim()
    cost = cost.replace('Cost :', '')
    cost = cost.trim()
    $.ajax({
        url: "/TypeTile",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            userid: uid,
            oldid: i + 1,
            imagesrc: img,
            name: nam,
            piece: 1,
            cost: cost
        }),
        success: function(response) {
            alert(response)
        },
        error: function(xhr, ajaxOptions, thrownError) { alert(thrownError) }
    })
}

const countries = [];

for (var i = 0; i < names.length; i++) {
    var one = { name: names[i].innerHTML.trim(), id: i + 1 }
    countries.push(one)
}





var selectedsuggestionIndex = -1;

const searchInput = document.querySelector('.searchInput');
const suggestionsPanel = document.querySelector('.suggestions');

function resetselected() {
    for (var i = 0; i < suggestionsPanel.children.length; i++) {
        suggestionsPanel.children[i].classList.remove('selected');
    }
}
searchInput.addEventListener('keyup', function(e) {
    if (e.key == 'ArrowDown') {
        resetselected()

        selectedsuggestionIndex =
            (selectedsuggestionIndex < suggestionsPanel.children.length - 1) ? selectedsuggestionIndex + 1 : suggestionsPanel.children.length;

        suggestionsPanel.children[selectedsuggestionIndex].classList.add('selected');
        return;
    }


    if (e.key == 'ArrowUp') {
        resetselected()

        selectedsuggestionIndex =
            (selectedsuggestionIndex > 0) ? selectedsuggestionIndex - 1 : 0;

        suggestionsPanel.children[selectedsuggestionIndex].classList.add('selected');
        return;
    }

    if (e.key == 'Enter') {
        searchInput.value = suggestionsPanel.children[selectedsuggestionIndex].innerHTML
        suggestionsPanel.classList.remove('show')
        selectedsuggestionIndex = -1
        var nam = searchInput.value.replace(' ', '')
        var searchId = 0;
        for (var i = 0; i < countries.length; i++) {
            if (searchInput.value == countries[i].name) {
                searchId = countries[i].id
                console.log(countries[i].id)
            }
        }
        var url = "/TypeTile/" + searchId + "/" + nam;
        location.replace(url);

        return;
    }

    suggestionsPanel.classList.add('show')
    const input = searchInput.value;

    suggestionsPanel.innerHTML = '';
    const suggestions = countries.filter(function(countries) {
        console.log(countries.name.input);
        return countries.name.toLowerCase().startsWith(input.toLowerCase());
    });
    suggestions.forEach(function(suggested) {
        const div = document.createElement('div');
        const p = document.createElement('p')
        p.setAttribute('class', 'id')
        p.innerHTML = suggested.id
        div.setAttribute('class', 'suggestion');
        div.innerHTML = suggested.name;
        suggestionsPanel.appendChild(div);

    });
    if (input == '') {
        suggestionsPanel.innerHTML = '';

    }
})

document.addEventListener('click', (function(e) {

    if (e.target.className == 'suggestion') {
        searchInput.value = e.target.innerHTML;
        var nam = searchInput.value.replace(' ', '')
        var searchId = 0;
        for (var i = 0; i < countries.length; i++) {
            if (searchInput.value == countries[i].name) {
                searchId = countries[i].id

            }
        }

        var url = "/TypeTile/" + searchId + "/" + nam;
        location.replace(url);
        suggestionsPanel.classList.remove('show')
    }

}))

function close() {
    console.log("jk")
    suggestionsPanel.classList.add('show')
}