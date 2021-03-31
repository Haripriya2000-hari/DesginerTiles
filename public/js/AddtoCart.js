function deleteitem(i) {
    ajax(i)

}

function myorders() {
    location.replace(' /' + uid + '/myorders')

}

function locationchange() {
    var wishlist = document.getElementById("wishlistlink")
    var accountinfo = document.getElementById("accountinfo")


    console.log("clicke")

    wishlist.href = "/" + uid + "/wishlist"
    accountinfo.href = "/" + uid + "/accountinfo"

}

var uid = sessionStorage.getItem("uid");

function ajax(i) {
    $.ajax({
        url: "/" + uid + "/addtocart",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            id: i

        }),

        success: function(response) {
            location.reload()
            alert("successfully deleted from cart")
        }

    })

}