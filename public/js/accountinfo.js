var uid = sessionStorage.getItem("uid");
var email = sessionStorage.getItem("email");
var dname = sessionStorage.getItem("dname");
var photourl = sessionStorage.getItem("photourl");


function locationchange() {
    var wishlist = document.getElementById("wishlistlink");
    var cartonclick = document.getElementById("cartlink");

    console.log("clicke")
    cartonclick.href = "/" + uid + "/addtocart"
    wishlist.href = "/" + uid + "/wishlist"

}

function myorders() {
    location.replace(' /' + uid + '/myorders')

}

var img = document.getElementById("profile")
var namee = document.getElementById("username")
var emailid = document.getElementById("email")
emailid.innerHTML = email



if (photourl != 'null') {
    console.log("null")
    img.src = photourl

} else {
    img.src = '/images/profile2.png'
}



function signout() {
    var conf = confirm("Are you sure to log out?")
    if (conf) {
        firebase.auth().signOut().then(() => {

            location.replace("/")
        }).catch((error) => {
            alert(error)
        });
    } else {

    }

}