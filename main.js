import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, onValue, onChildAdded, push } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyA5o0bcPOCW5z0rxc9nEuzcMtZ0kYxADIs",
  authDomain: "chat-ti-c949f.firebaseapp.com",
  projectId: "chat-ti-c949f",
  storageBucket: "chat-ti-c949f.appspot.com",
  messagingSenderId: "894104893136",
  appId: "1:894104893136:web:bf43f926f81075289e10d5"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);
$(".createnew").click(function() {
  $(".loginnow").slideToggle(function() {
    $(".createnow").slideToggle()
  })
})
$(".loginnew").click(function() {
  $(".createnow").slideToggle(function() {
    $(".loginnow").slideToggle()
  })
})
const alertin = document.querySelector(".alertin")
const alertup1 = document.querySelector(".alertup1")
const alertup2 = document.querySelector(".alertup2")
const send = document.querySelector(".send")
const message = document.querySelector(".message")
const msg = document.getElementById("msg")
const msgscroll = document.querySelector(".msg")
const use = document.getElementById("user")
$(".login").click(function() {
  const emailin = document.getElementById("emailin").value
  const passwordin = document.getElementById("passwordin").value
  signInWithEmailAndPassword(auth, emailin, passwordin)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      $(".container").slideUp(function() {
        $(".containe").slideDown(function() {
          const userId = auth.currentUser.uid;
          return onValue(ref(database, '/users/' + userId), (snapshot) => {
            const usernames = snapshot.val();
            use.innerHTML = usernames.username


            onChildAdded(ref(database, 'message'), (snapshot) => {
              if (snapshot.val().name == usernames.username) {
                msg.innerHTML += `<p class="name1">${snapshot.val().name}</p>
                <h1 class="msg1">${snapshot.val().message}</h1>`
              } else {
                msg.innerHTML += `<p class="name2">${snapshot.val().name}</p>
          <h1 class="msg2">${snapshot.val().message}</h1>`
              }
              msgscroll.scrollBy({
                top: 999999999,
                behavior: "smooth"
              })
            })


          });
        })
      })

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $(".alertin").slideDown()
    });
})
$(".create").click(function() {
  const emailup = document.getElementById("emailup").value
  const username = document.getElementById("username").value
  const passwordup = document.getElementById("passwordup").value
  createUserWithEmailAndPassword(auth, emailup, passwordup)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        password: passwordup,
        email: emailup
      })
      $(".alertup2").slideUp(function() {
        $(".alertup1").slideDown()
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $(".alertup1").slideUp(function() {
        $(".alertup2").slideDown()
      })
    });
})
/*----------------------------------*/
$(".send").click(function() {
  let message = document.querySelector(".message")
  if (message.value != '') {

    const userId = auth.currentUser.uid;
    return onValue(ref(database, '/users/' + userId), (snapshot) => {
      const usernames = snapshot.val();
      set(push(ref(database, 'message')), {
        name: usernames.username,
        message: message.value
      })
    });
  }
})
send.onclick = function() {
  message.value = ""
  msgscroll.scrollBy({
    top: 999999999,
    behavior: "smooth"
  })
}
/*----------------------------------*/
$(".logout").click(function() {
  const auth = getAuth();
  signOut(auth).then(() => {
    $(".containe").slideUp(function() {
      $(".container").slideDown(function() {

        location.reload()

      })
    })
  });
})
