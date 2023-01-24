const firebaseConfig = {
  apiKey: "AIzaSyCwpr9Xt0OdJxcrLtLCZLK2ZomuZFgJ08Y",
  authDomain: "wordchain-567d5.firebaseapp.com",
  databaseURL: "https://wordchain-567d5-default-rtdb.firebaseio.com",
  projectId: "wordchain-567d5",
  storageBucket: "wordchain-567d5.appspot.com",
  messagingSenderId: "820994212762",
  appId: "1:820994212762:web:b4ddee266c5a6896adb023",
  measurementId: "G-7CLJ9ZGF3J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database()

wordListFront = []

var inputText = document.querySelector(".word-input")
var sendButton = document.querySelector(".send-button")

sendButton.addEventListener("click", sendWord)
function sendWord() {
    var wordToSend = inputText.value
    if (!wordListFront.includes(wordToSend)) {
        if (wordToSend[0] == wordListFront[wordListFront.length - 1].substr(wordListFront[wordListFront.length - 1].length - 1)) {
            wordListFront.push(wordToSend)
            db.ref("wordList").set(wordListFront)
            inputText.value = ""
        }
        else if (wordListFront[wordListFront.length - 1].substr(wordListFront[wordListFront.length - 1].length - 1) == "") {
            wordListFront.push(wordToSend)
            db.ref("wordList").set(wordListFront)
            inputText.value = ""
        }
        else {
            alert('word must begin with the last letter of the previous word, in this case " ' + wordListFront[wordListFront.length - 1].substr(wordListFront[wordListFront.length - 1].length - 1) + ' "')
            inputText.value = ""
        }
    }
    else {
        alert("the word " + wordToSend + " has already been said")
        inputText.value = ""
    }
    inputText.focus();
}

db.ref("wordList").on("value", function(dbWordList) {
    wordListFront = dbWordList.val()
    setFrontEndWordList(wordListFront)
})

function setFrontEndWordList(currentWordList) {
    var elements = document.querySelectorAll("[id='💥']")
    for (var i = 0; i < elements.length; i++) {
        // Remove the current element
        elements[i].remove();
    }
    for (var i = 0; i < currentWordList.length; i++) {
        if (i != 0) {
            var div = document.createElement("div");
            div.textContent = currentWordList[i];
            div.id = "💥"
            document.querySelector(".word-container").appendChild(div);
        }
    }
    var wordContainer = document.querySelector('.word-container');
    wordContainer.scrollTop = wordContainer.scrollHeight;
}

document.body.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        sendWord()
    }
})

window.onload = function() {
    db.ref("wordList").set([""])
}

const darkModeBtn = document.querySelector("#dark-mode-btn");

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.classList.toggle("clicked")
    if(document.body.classList.contains("dark-mode")){
        darkModeBtn.innerText = "Light Mode";
    } else {
        darkModeBtn.innerText = "Dark Mode";
    }
});