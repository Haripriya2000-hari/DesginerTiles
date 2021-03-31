function deleteitem(i) {
    ajax(i)

}

var uid = sessionStorage.getItem("uid");

function ajax(i) {
    $.ajax({
        url: "/" + uid + "/wishlist",
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            id: i

        }),

        success: function(response) {
            location.reload()
            alert(response)
        }

    })

}


function locationchange() {

    var cartonclick = document.getElementById("cartlink")
    var accountinfo = document.getElementById("accountinfo")
    console.log("clicke")
    cartonclick.href = "/" + uid + "/addtocart"
    accountinfo.href = "/" + uid + "/accountinfo"


}

function myorders() {
    location.replace(' /' + uid + '/myorders')

}