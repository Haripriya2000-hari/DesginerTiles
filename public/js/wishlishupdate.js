function locationchange() {
    var wishlist = document.getElementById("wishlistlink");
    var cartonclick = document.getElementById("cartlink");
    var accountinfo = document.getElementById("accountinfo")
    console.log("clicke")
    cartonclick.href = "/" + uid + "/addtocart"
    wishlist.href = "/" + uid + "/wishlist"
    accountinfo.href = "/" + uid + "/accountinfo"
}

var uid = sessionStorage.getItem("uid")


var sqfeet = document.getElementById('num');
var cost1 = document.getElementById('cost1');
var cost2 = document.getElementById('cost');
var num = sqfeet.innerHTML;
var Totalcost = cost1.innerHTML;
Totalcost = Totalcost.replace('₹ /Sq.feet', '')
var oldid = document.getElementById('oldid').innerHTML.trim()
var id = document.getElementById('id').innerHTML.trim()



function adding() {


    sqfeet.innerHTML = ++num;
    cost2.innerHTML = Totalcost * num + "₹";

}

function subtract() {
    //     var num = sqfeet.innerHTML;
    if (num > 1) {
        sqfeet.innerHTML = --num;
    }
    cost2.innerHTML = Totalcost * num + "₹";
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



var orname = document.getElementById("namee").innerHTML.trim()
var urlname = orname.replace(/\s+/g, '')

var imgsrc = $('#img').attr('src')


// cost3 = cost3.replace(/(\r\n|\n|\r)/gm, "");
// cost3 = cost3.replace(' ', '')

num1 = num.replace(/(\r\n|\n|\r)/gm, "");



if (id > 10) {

    url = "/TypeTile/marble" + id + "/" + urlname

} else {
    url = "/TypeTile/" + id + "/" + urlname
}


function add() {
    var cost3 = cost2.innerHTML.replace('₹', '')
    cost3 = cost3.replace(/(\r\n|\n|\r)/gm, "");
    console.log(cost3, num)
    ajaxrequest(url, cost3, num)


}


function ajaxrequest(url, cost4, num) {
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
            cost: cost4
        }),
        success: function(response) {
            alert(response)
        }
    })


}

num = num.replace(/(\r\n|\n|\r)/gm, "");

function wishlistupdate() {
    var cost3 = cost2.innerHTML.replace('₹', '')
    cost3 = cost3.replace(/(\r\n|\n|\r)/gm, "");

    console.log(cost3, num)
    ajaxrequest2(cost3)
}

function ajaxrequest2(cost) {
    $.ajax({
        url: '/TypeTile/wishlistupdate',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            userid: uid,
            id: id,
            name: orname,
            piece: num,
            cost: cost
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
        var cost3 = cost2.innerHTML.replace('₹', '')
        cost3 = cost3.replace(/(\r\n|\n|\r)/gm, "");
        num = num.replace(/(\r\n|\n|\r)/gm, "");
        // alert(num + cost2.innerHTML)
        ajaxrequest("/myorders", cost3, num)

        return true;
    }




}

function myorders() {
    location.replace(' /' + uid + '/myorders')

}



function imagechange(images) {
    var imagess = document.getElementById(images);
    imagess.setAttribute('class', 'activeimg')
    var img = document.getElementById('img');
    img.src = imagess.src;
    console.log(imagess.src)

}