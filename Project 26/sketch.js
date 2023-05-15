const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;
var music;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  music = loadSound("./assets/apoco.mp3")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(230, playerBase.body.position.y - 270, 200, 180);
  playerArcher = new PlayerArcher( 340, playerBase.body.position.y - 300, 120, 120 );

  board1 = new Board(width - 500, 240, 200, 200);
  board2 = new Board(width - 100, height - 410, 200, 200);
}

function draw() {
  background(backgroundImg);

  if (!music.isPlaying()) {
    music.play();
    music.setVolume(0.1);
  }

  Engine.update(engine);

  //playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

       var board1Collision = Matter.SAT.collides(
        board1.body,
        playerArrows[i].body
      ); 
      
      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

      if (board1Collision.collided ) {
        console.log("Collided");
        board1.destroy()
        Matter.World.remove(world,playerArrows[i].body)
        delete board1
      }

      if (board2Collision.collided ) {
        console.log("Collided");
        board2.destroy()
        Matter.World.remove(world,playerArrows[i].body)
        delete board2
      }

      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if(playerArrows.isTouching(board1)) 
      {
         board1.remove();
      }


     if(numberOfArrows === 0){
   
    
      /*alert({
        title: `This Game isnt bugged I SWEAR!!`,
        text: "The Mechs here are made of a strengthened titanium that is indestructible, especially to bullets, the apocalypse has just begun...",
        
        imageUrl:
          "https://www.kik.com/images/emojis/emoji_skull.png",
        imageSize: "100x100",
        confirmButtonText: "See the the Mech Simulation again?!"
      });*/
      background("black")
      fill("white")
      textSize 
      text("The Mechs here are made of strengthened titaniun the apocalypse has just begun...*",590,300)
    // text("*this is a simulation")
    
    }
      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);

    
        }
      }
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  //text("APOCAPLYPSE", width / 2, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Bullets : " + numberOfArrows, 200, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}




 // background("white")
  //fill("black")
  //textSize 
 // text("There are mechs tormenting the world as we know it, you only have ten bullets left, what will you do...",590,300)



function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    } 
  }
}




