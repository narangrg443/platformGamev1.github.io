
    let mode=null;
    let start = Date.now();
    let end;
    let diff;
    let fps = 0;
    let Fps;
    let rows = 9 //7/851=42.55
    let cols = 20 //20/393=56.14
    let boxX = 43//screen.availWidth/cols; //42.55=20/9
    let boxY = 44//screen.availHeight/rows; //43.66
    //  console.log(boxX, boxY)
    let STAGE = 0;
    let player = new Player(0, 0, boxX, boxY);
    let Brick = [];
    let Enemy = [];
    let Coins = [];
    let Back = [];
    let WoodenBox = [];
    let dx = 0; //button dx
    let dy = 0; //button
    let bounce=-0.5; //button

let Sound2=[];
    let coins_No = 0;

    let point1 = 42.55*20; //851
    const Map_width = 851;
    let MapNo = 0;
    let dist = 0;
    let collisionSide = "";
    let no = 0;
    let coinsNo = 0;
    let bug1No = 0;
    let Map_stage = 1;
    let objAssigned = false;
    let Bulet = [];
    let fired = false;
    let Map = 1;
    let delay = 0;
    let B = []; //bottons
    //
    let P = []; //brick pieces
    let b_dx; let b_dy; Brick_animate = false; // location of collidied brick



    window.onload = animate();

    function animate() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //  if (no < 40) {

      canvas.width = screen.availWidth;
      canvas.height = screen.availHeight;




      //  }
      //    if (window.onresize)no = 0;
      //froce to make landsscape mode
      if (window.innerHeight > window.innerWidth) {
      canvas.width=window.innerWidth-80;
      canvas.height=window.innerWidth/2;
      mode='PORTAIT';


      } else {
        //after device is n landscape mode
        if (canvas.width !== screen.availWidth) {

          canvas.width = screen.availWidth;
          canvas.height = screen.availHeight;
          

        }
        mode="LANDSCAPE"
      }
///
      switch (STAGE) {
        case 0:
          drawStage1();    //show start in begginnig 
          break;
        case 1:                 //draw required map and initialize data(players,enemy ,enviroment etc

          switch (Map) {
          case 1: done(Mapa1, Brick, Enemy, Coins, WoodenBox); break;
          case 2: done(Map2, Brick, Enemy, Coins, WoodenBox); break;
          }


          nextMap();
          playerdead();
          keyControl();
          fire(1);
          //  sound();
          collisionCheck(player, Brick, Enemy, Coins, Bulet);
          addSound();

          limitPlayerAbove(player);
          BrickAnimate();

          gravity(player);
          jump(player);

          renderImage();



          rewardLife();
          drawHeart(player.life);
          scoreboard();

         if(mode==="LANDSCAPE") drawButton(B);
          fpsShow();

          showText(0);



          break;
        case 3: endM(); break;
      }
      window.requestAnimationFrame(animate);


    }
    key_event(key)
