let intro = document.querySelector('.intro');
let logo = document.querySelector('.Logo-Header');
let logospan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {

        logospan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');

            }, (idx + 1) == 400)
        });

        setTimeout(() => {
            logospan.forEach((span, idx) => {

                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');

                }, (idx + 1) * 50)
            })
        }, 2000)

        setTimeout(() => {
            intro.style.top = '-100vh';

        }, 2300)
    })
})



// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyDft0VylD8x8a7z8q1EObvKAjUD2sPbzk0",
    authDomain: "desginer-tiles-2.firebaseapp.com",
    projectId: "desginer-tiles-2",
    storageBucket: "desginer-tiles-2.appspot.com",
    messagingSenderId: "749081155269",
    appId: "1:749081155269:web:df5fe99c9f7bc04fe002ac"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);



// const splash = document.querySelector('.splash');
// document.addEventListener('DOMContentLoaded', (e) => {
//     setTimeout(() => {
//         splash.classList.add('display-none');
//     }, 2000);
// })

/// firebase authentication

const auth = firebase.auth();
// const r = document.getElementById("register");
// const l = document.getElementById("login");

//register attributes
function registervalidation() {
    var newemail = document.getElementById('email').value.trim();
    var newpassword = document.getElementById('npassword').value.trim();
    var confrimpassword = document.getElementById('conpassword').value.trim();
    if (newpassword != confrimpassword) {
        alert("New Password and confirm password are not same!!!");

    } else {
        auth.createUserWithEmailAndPassword(newemail, newpassword).then(() => {
            userdetails();
            alert("Succesully created Your account on DesignerTiles.com");
            location.replace("TypeTile");
        }).catch((err) => {
            alert(err.message);
        })
    }

}

//login attributes

function loginvalidation() {


    var olduser = document.getElementById("emailid").value.trim();
    var txt_password = document.getElementById('password').value.trim();


    auth.signInWithEmailAndPassword(olduser, txt_password).then(() => {
        userdetails();
        // helo();
        alert("You have signed In")

        location.replace("TypeTile");
    }).catch((err) => {

        alert(err.message);

    })



}






function moveToLogin() {

    var l = document.getElementById("login");
    var r = document.getElementById("register");
    l.style.display = "block";
    r.style.display = "none";
}

function moveToregister() {
    var l = document.getElementById("login");
    var r = document.getElementById("register");
    l.style.display = "none";
    r.style.display = "block";

}



function googleLogin() {
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(() => {
        userdetails();
        location.replace("TypeTile");
    }).catch((err) => {
        alert(err.message);

    })
}
// helo();


function userdetails() {
    var user = firebase.auth().currentUser;
    var dname, email, photoUrl, uid, emailVerified;

    if (user != null) {
        console.log(user.email)
        dname = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        // u = user.getToken() // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.

    }
    // console.log(u);
    sessionStorage.setItem("email", user.email)
    sessionStorage.setItem("dname", user.displayName)
    sessionStorage.setItem("photourl", user.photoURL)
    sessionStorage.setItem("uid", user.uid)

    console.log(user.uid)
}