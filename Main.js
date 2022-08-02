var time = getTime();
var sizeOfText = 16;
textSize(sizeOfText);

//-------------------- PLAYER --------------------
function Player() {
  this.x = World.width / 2;
  this.y = World.height - 30;
  
  this.r = 25;
  this.login = "";
  this.offset = 2;
  
  this.show = function() {
    fill("yellow");
    ellipse(this.x, this.y, this.r, this.r);
    fill("black");
    strokeWeight(2);
    text(this.login, this.x - this.offset, this.y - 15);
  }
  
  this.update = function() {
    this.x = camera.mouseX;
  }
}

//-------------------- LETTER --------------------
function Letter() {
  this.x = (getRandomInt(301) + 50);
  this.y = 10;
  this.letter = getWeightedChar();//String.fromCharCode(getRandomInt(26) + 97); //97-122
  
  this.w = 5;
  this.h = 10;
  this.yspeed = getRandomInt(3) + 2;
  this.yacc = 0.2;
  
  this.show = function() {
    strokeWeight(2);
    fill("black");
    text(this.letter, this.x, this.y, 100, 100);
  };
  
  this.update = function() {
    this.y += this.yspeed;
    this.yspeed += this.yacc;
  };
  
  this.checkCollision = function(player) {
    if (this.x >= player.x - 15 && this.x <= player.x + player.r - 15) {
      if (this.y + this.h >= player.y) {
        //console.log(this.letter + " collided");
        
        player.login += this.letter;
        player.offset += 2 + (sizeOfText / 10);
        
        return true;
      }
    }
  };
}

function getWeightedChar() {
  var alphabet = [
    "e",
    "t",
    "a",
    "o",
    "i",
    "n",
    "s",
    "r",
    "h",
    "d",
    "l",
    "u",
    "c",
    "m",
    "f",
    "y",
    "w",
    "g",
    "p",
    "b",
    "v",
    "k",
    "x",
    "q",
    "j",
    "z"
  ];
  
  var weights = [
    12.02,
    9.10,
    8.12,
    7.68,
    7.31,
    6.95,
    6.28,
    6.02,
    5.92,
    4.32,
    3.98,
    2.88,
    2.71,
    2.61,
    2.30,
    2.11,
    2.09,
    2.03,
    1.82,
    1.49,
    1.11,
    0.69,
    0.17,
    0.11,
    0.10,
    0.07
  ];
  
  var totals = [];
  var totalCount = 0;
  
  for (var i = 0; i < weights.length; i++) {
    totalCount += weights[i];
    totals.push(totalCount);
  }
  
  var rand = Math.random() * totalCount;
  
  for (var i = 0; i < totals.length; i++) {
    if (rand < totals[i]) {
      return alphabet[i];
    }
  }
}

var player = new Player();

var letters = [];
letters.push(new Letter());
var letterCount = 1;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkMouse() {
  if (mouseWentDown("leftButton")) {
    if (player.login.length != 0) {
      player.login = player.login.substring(0, player.login.length - 1);
      player.offset -= 2 + (sizeOfText / 10);
    }
  }
}

function setup() {
  background("white");
}

//-------------------- DRAW --------------------
function draw() {
  background("white");
  
  player.show();
  player.update();
  
  if (getTime() >= time + 1000 && letterCount < 10) {
    letters.push(new Letter());
    letterCount++;
    time = getTime();
  }
  
  for (var i = 0; i < letters.length; i++) {
    letters[i].show();
    letters[i].update();
    
    if (letters[i].y >= 330 && letters[i].y < 383) {
      if (letters[i].checkCollision(player)) {
        letters.splice(i, 1, new Letter());
      } 
    } else {
      if (letters[i].y >= World.height) {
        letters.splice(i, 1, new Letter());
      }
    }
  }
  
  checkMouse();
  
  //console.log(letterCount);
  
  fill("green");
  rect(0, 0, 400, 20);
  strokeWeight(8);
  textSize(18);
  fill("white");
  text("Please login:", World.width / 2 - 50, 17);
}
