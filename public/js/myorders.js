function locationchange() {
    var wishlist = document.getElementById("wishlistlink")
    var accountinfo = document.getElementById("accountinfo")
    var cartonclick = document.getElementById("cartlink")
    cartonclick.href = "/" + uid + "/addtocart"
    wishlist.href = "/" + uid + "/wishlist"
    accountinfo.href = "/" + uid + "/accountinfo"

}

var uid = sessionStorage.getItem("uid");