var sqfeet = document.getElementById('num');
var cost1 = document.getElementById('cost');
var num = sqfeet.innerHTML;
var Totalcost = cost1.innerHTML.replace('₹', '');

function myorders() {
    location.replace(' /' + uid + '/myorders')

}

function adding() {

    sqfeet.innerHTML = ++num;
    cost1.innerHTML = Totalcost * num + "₹";

}

function subtract() {
    //     var num = sqfeet.innerHTML;
    if (num > 1) {
        sqfeet.innerHTML = --num;
    }
    cost1.innerHTML = Totalcost * num + "₹";
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("buying");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var uid = sessionStorage.getItem("uid");



function locationchange() {
    var wishlist = document.getElementById("wishlistlink");
    var cartonclick = document.getElementById("cartlink");
    var accountinfo = document.getElementById("accountinfo")
    console.log("clicke")
    cartonclick.href = "/" + uid + "/addtocart"
    wishlist.href = "/" + uid + "/wishlist"
    accountinfo.href = "/" + uid + "/accountinfo"
}



console.log(uid)
var imgsrc = $('#img').attr('src')
console.log(imgsrc)
var orname = $("#namee").html().trim();
var urlname = orname.replace(/\s+/g, '')
var des = $("#des").html();
var num = $("#num").html();
var id = $("#id").html().trim()
var cost = $("#cost").html();
var cost2 = cost1.innerHTML.replace("₹", "").trim()
var url;

if (id > 10) {

    url = "/TypeTile/marble" + id + "/" + urlname

} else {
    url = "/TypeTile/" + id + "/" + urlname
}

function add() {
    // alert(cost1.innerHTML.replace("₹", "").trim())

    ajaxrequest(url);


}

function wishlistadd() {
    var url;

    if (id > 10) {

        url = "/TypeTile/marble" + id + "/" + urlname + "/wishlist"

    } else {
        url = "/TypeTile/" + id + "/" + urlname + "/wishlist"
    }
    // console.log(id)
    ajaxrequest(url);
}

function ajaxrequest(url) {
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            userid: uid,
            oldid: id,

            imagesrc: imgsrc,
            name: orname,
            piece: num,
            cost: cost1.innerHTML.replace("₹", "").trim()
        }),
        success: function(response) {
            alert(response)
        }
    })


}

function validate() {

    var pincodepattern = /^\d{6}$/;
    var phonepattern = /^\d{10}$/;

    var form = document.getElementById("form1")
    form.action = "/" + uid + "/myorders"
    var fname = document.getElementById("fname").value.trim();
    var lname = document.getElementById("lname").value.trim();
    var location = document.getElementById("location").value.trim();
    var city = document.getElementById("city").value.trim();
    var landmark = document.getElementById("landmark").value.trim();
    var pincode = document.getElementById("pincode").value.trim();
    var phoneno = document.getElementById("Phoneno").value.trim();
    var alphone = document.getElementById("alphone").value.trim();


    if (fname == "") {
        document.getElementById("fname").style.borderBottom = "solid 2px red"
        document.getElementById("firname").style.visibility = "visible";
        return false;
    } else if (lname == "") {
        document.getElementById("lname").style.borderBottom = "solid 2px red"
        document.getElementById("lirname").style.visibility = "visible";
        return false;
    } else if (location == "") {
        document.getElementById("location").style.borderBottom = "solid 2px red"
        document.getElementById("locations").style.visibility = "visible";
        return false;
    } else if (city == "") {
        document.getElementById("city").style.borderBottom = "solid 2px red"
        document.getElementById("citys").style.visibility = "visible";
        return false;
    } else if (landmark == "") {
        document.getElementById("landmark").style.borderBottom = "solid 2px red"
        document.getElementById("landmarks").style.visibility = "visible";
        return false;
    } else if (pincode == "" || !pincodepattern.test(pincode)) {
        document.getElementById("pincode").style.borderBottom = "solid 2px red"
        document.getElementById("pincodes").style.visibility = "visible";
        return false;
    } else if (phoneno == "" || !phonepattern.test(phoneno)) {
        document.getElementById("Phoneno").style.borderBottom = "solid 2px red"
        document.getElementById("phonenos").style.visibility = "visible";
        return false;
    } else if (alphone == "" || !phonepattern.test(alphone)) {
        document.getElementById("alphone").style.borderBottom = "solid 2px red"
        document.getElementById("alphones").style.visibility = "visible";
        return false;
    } else if (alphone == phoneno) {
        document.getElementById("Phoneno").style.borderBottom = "solid 2px red"
        document.getElementById("alphone").style.borderBottom = "solid 2px red"
        document.getElementById("equal").style.visibility = "visible";
        return false;

    } else {
        $.ajax({
            url: "/" + uid + "/addtoacc",
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                uid: uid,
                name: fname,
                laname: lname,
                city: city,
                location: location,
                landmark: landmark,
                pincode: pincode,
                phoneno: phoneno,
                alphone: alphone


            }),
            success: function(response) {
                alert(response)
            }
        })
        ajaxrequest("/myorders")

        return true;
    }




}


function imagechange(images) {
    var allimgaes = document.getElementsByClassName('img')
    var imagess = document.getElementById(images);
    imagess.setAttribute('class', 'activeimg')
    var img = document.getElementById('img');
    img.src = imagess.src;
    console.log(imagess.src)

}