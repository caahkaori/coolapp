

document.getElementById("deck").addEventListener("click", function() {

    var randomNumber1 = Math.floor(Math.random() * 2 + 1)

    var randomCardImage = "card" + randomNumber1 + ".png";
    var randomImageSource = "images/" + randomCardImage;
    var deck = document.querySelectorAll("img")[2];
    deck.setAttribute("src", randomImageSource);

    var sound = new Audio ("sounds/mmm-3.wav");
    var name = prompt("Who do you think?");
    document.querySelector("#winner").innerHTML = name + '😂';



      if(name = true){
        return sound.play();
  })


});

});

  var buttonInnerHTML = this.getAttribute;
  buttonAnimation(buttonInnerHTML);


})

function buttonAnimation(){
  var activeButton = document.querySelector(".deck");
  activeButton.classList.add('pressed');


}
