$('.pageContent, .resourseContainer, .helpContainer').css('height', (960 * 74 / 100) + 15 + 'px');
$('.pageBg').css('height', (960 * 74 / 100) + 'px');
$('.header, .footer').css('height', (960 * 13 / 100) + 'px');

var pageWidth, pageHeight;

var basePage = {
  width: 1280,
  height: 960,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};

$(function () {
  var $page = $('.page_content');

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  //using underscore to delay resize method till finished resizing window
  $(window).resize(_.debounce(function () {
    getPageSize();
    scalePages($page, pageWidth, pageHeight);
  }, 150));


  function getPageSize() {
    pageHeight = $('#container').height();
    pageWidth = $('#container').width();
  }

  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;
    var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
    var newTopPos = 0;
    page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
  }
});

var courseDetails;
var currPage = 0;

/* Title Audio veriable decleration*/
var music1 = document.getElementById("audioPlayer1");
/* Audio Dragger  veriable decleration */
// var music = document.getElementById('audioPlayer'); // id for audio element
var audioDuration; // Duration of audio clip, calculated here for embedding purposes
var pButton = document.getElementById('pButton'); // play button
var playhead = document.getElementById('audioDrag'); // playhead
var timeline = document.getElementById('audioDragContainer'); // timeline 
var dragArea = document.getElementById('audioDragger'); // timeline
// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = true;

function fnNext() {
  if ($('.nextBtn').hasClass('disabled')) {
    return false;
  }
  $('#myCarousel').carousel('next');
}

function fnBack() {
  if ($('.backBtn').hasClass('disabled')) {
    return false;
  }
  $('#myCarousel').carousel('prev');
}

/*----------- All Player Btn Click Event Start ---------------*/

$(function () {
  $('.backBtn').on('click', fnBack);
  $('.nextBtn').on('click', fnNext);
  $('.reloadBtnAll').on('click', fnReloadAll);
  $('.reloadBtnScreen').on('click', fnReloadScreen);
  $('.showAnsBtn').on('click', showAns);

  $('.helpBtn').on('click', function () {
    if (lastAudio == 1) {
      $audio1[0].pause();
    }
    if (lastAudio == 2) {
      $audio2[0].pause();
    }
    $('.helpPopup').show();
  });

  $('.resourseBtn').on('click', function () {
    if (lastAudio == 1) {
      $audio1[0].pause();
    }
    if (lastAudio == 2) {
      $audio2[0].pause();
    }
    $('.resoursePopup').show();
  });

  $('.resoursePopup .closeBtn').on('click', function () {
    if (lastAudio == 1 && !isMusic1Playing) {
      $audio1[0].play();
    }
    if (lastAudio == 2) {
      $audio2[0].play();
    }
    $('.resoursePopup').hide();
  });
  $('.helpPopup .closeBtn').on('click', function () {
    if (lastAudio == 1 && !isMusic1Playing) {
      $audio1[0].play();
    }
    if (lastAudio == 2) {
      $audio2[0].play();
    }
    $('.helpPopup').hide();
  });
  $('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart dragstart', false);
});

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const wrapper = document.querySelector('.wrapper')
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [{
    name: "bee",
    image: "./images/bee.png"
  },
  {
    name: "crocodile",
    image: "./images/crocodile.png"
  },
  {
    name: "macaw",
    image: "./images/macaw.png"
  },
  {
    name: "gorilla",
    image: "./images/gorilla.png"
  },
  {
    name: "tiger",
    image: "./images/tiger.png"
  },
  {
    name: "monkey",
    image: "./images/monkey.png"
  },
  {
    name: "chameleon",
    image: "./images/chameleon.png"
  },
  {
    name: "piranha",
    image: "./images/piranha.png"
  },
  {
    name: "anaconda",
    image: "./images/anaconda.png"
  },
  {
    name: "sloth",
    image: "./images/sloth.png"
  },
  {
    name: "cockatoo",
    image: "./images/cockatoo.png"
  },
  {
    name: "toucan",
    image: "./images/toucan.png"
  },
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");

  cards.forEach((card) => {

    card.addEventListener("click", () => {

      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
          card.classList.add('pointer')
        } else {
          //increment moves since user selected second card
          movesCounter();

          //secondCard and value
          secondCard = card;
          card.classList.add('pointer')
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");

            secondCard.classList.add("matched");

            if ($('.card-container').hasClass('matched') && $('.card-container').hasClass('flipped')) {
              $('.matched .card-after').addClass('match')
              $('.matched').addClass('disabled')
              if ($('.card-after').hasClass('match')) {
                console.log('matched')
                $('.match').addClass('border-green')
                $audio1[0].load();
                $audio1[0].play();
                setTimeout(() => {
                  $audio1[0].pause();
                }, 1000);



              }

            }
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Win</h2>
            <h4>Moves: ${movesCount}</h4>`;
              document.querySelector('.win').classList.add('dflex')
              document.querySelector('.win').classList.remove('dnone')
              document.querySelector('.controls-container ').classList.remove('hide')
              setTimeout(() => {
                document.querySelector('.win').classList.add('dnone')
                document.querySelector('.win').classList.remove('dflex')
                stopGame();
              }, 5000);
              // stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard.classList.remove('pointer')
            secondCard.classList.remove('pointer')
            firstCard.classList.add("notmatched");
            secondCard.classList.add("notmatched");
            firstCard = false;
            secondCard = false;
            if ($('.card-container').hasClass('notmatched')) {
              $('.notmatched .card-after').addClass('nomatch')
              if ($('.card-after').hasClass('nomatch')) {
                console.log('nomatched')
                $('.nomatch').addClass('border-red')
                $audio2[0].play();

              }
            }
            let delay = setTimeout(() => {
              tempFirst.classList.remove("notmatched");
              tempSecond.classList.remove("notmatched");

              $('.nomatch').removeClass('border-red')
              $(' .card-after').removeClass('nomatch')
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  wrapper.classList.remove('hide')
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);

  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

function fnReloadAll() {
  stopGame()
}
$('.reloadBtnAll').on('click', function () {
  fnReloadAll()
})