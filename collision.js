function collisionCheck(player, Brick, enemy, Coins, Bulet) {

  let brokenBrick;
  Brick.forEach(brick=> {
    //BULLET BRICK COLLISIN



    if (brick.x>-64 && brick.x < 851 && brick.type == 1 || brick.type == 3) {
      Bulet.forEach(bullet=> {
        let collisionSide = rect_C(bullet, brick);
        if (collisionSide == "top") {
          bullet.u*0.97;
          bullet.vt*=-1;
        } else if (collisionSide == "right" || collisionSide == "left") {
          bullet.vx*=-1; bullet.bounceNo++;
        } else if (collisionSide === "top") {
          bullet.bounceOnFloor++;
        }


      })
    }
  })//bullet brick


  if (!player.dead) {
    for (let [index, e] of Brick.entries()) {

      if (e.x >= -64 && e.x <= 851 && e.visible) {
        if (e.type == 3) {
          let collisionSide = rect_C(player, e);

          if (collisionSide === "top") {
            player.vy*=-0.5; player.onGround = true;
            player.vy *= -.5;
            if (Math.abs(player.vy) < 0.14)player.vy = 0;
            break;
          }
          if (collisionSide === "bottom")player.vy*=-0.5;
        }
        if (e.type == 1) {
          if (!e.down) {//not broken
            collisionSide = rect_C(player, e)


            if (collisionSide == "top") {
              player.onGround = true;
              player.vy *= -.5;
              if (Math.abs(player.vy) < 0.14)player.vy = 0;
              

              break;
            }
            if (collisionSide === "bottom" ) {
              player.vy *= player.bounce;
              //  e.y-=50;//moves box up little bit
          
          if(player.x+player.w-20>e.x && player.x+player.w-20<e.x+e.w || player.x+25<e.x+e.w&& player.x+25>e.x ) {   e.down = true;
              b_dx = e.x; b_dy = e.y;
              Brick_animate = true;
              e.visible = 0;
              brokenBrick = e;
          }
              //  Brick_animate=true;
              //  e.visible=false;
              break;
            }}



        }
      }
    }
  }//Brick/player


  //make sure player is not dead befor colliding width enemy
  for (const [index, e] of enemy.entries()) {




    if (e.x < 900) {

      Bulet.forEach(b=> {
        if (b.visible && !e.dead) {
          let collisionSide = rect_C(b, e);
          if (collisionSide == "none") {} else {
            e.y -= 40;
            bug1No++;
            Sound2.push(new Audio("audio/smb_stomp.wav"));
            e.dead = true; b.visible = false; // b.blastBullet=true;
          }
        }
      })
    }
    if (e.y > 390) {
      e.visible = false; Enemy.splice(index, 1); break;
    }
    if (!e.dead) {





      let NoOfBricks = 0;
      let TempBrick;
      let BugColSide = "none";

      Brick.forEach(b=> {
        //collsiiosn width vrick and enemy

        //new codes




        let collisionSide = rect_C(e, b);


        if (e.y == b.y+.2 || e.y == b.y) {
          if (e.x == b.x+b.w)e.vx*=-1;

        }

        if (e.y == b.y+.2 || e.y == b.y) {
          if (e.x+b.w == b.x)e.vx*=-1;

        }



        if (collisionSide == "none") {
          e.g = 0.2;e.colup=false;
        } else {
          
        
          if (collisionSide == "top") {
 e.colup=true;
            e.collision = "buttom";
            e.g = 0; e.vy = 0;
            e.y = b.y-e.h;

            NoOfBricks++;
            TempBrick = b;


          }

        }



      })//…......….......


      if (e.vx < 0) {
        if (NoOfBricks == 1 && e.x < TempBrick.x && e.turn) {
          e.x = TempBrick.x;
          e.vx*=-1;

          if (e.start) {
            e.max = e.dist;
            e.dist = 0;
          }
          if (!e.start) {
            e.start = true;
          }
        }
      } else {

        if (NoOfBricks == 1 && e.x+e.w > TempBrick.x+TempBrick.w && e.turn) {
          e.x = TempBrick.x+TempBrick.w-e.w;
          e.vx*=-1;

          if (e.start) {
            e.max = e.dist;
            e.dist = 0;
          }
          if (!e.start) {
            e.start = true;
          }
        }

      }



      if (e.start) {
        e.dist += Math.abs(e.vx);

        if (e.max && e.max > 20) {
          e.turn = true;
        } else if (e.max) {
          e.turn = false;
        }
      }

      if (brokenBrick) {//enemy dead while breaking bricks

        if (e.x > brokenBrick.x && e.x < brokenBrick.x+brokenBrick.w && brokenBrick.y-e.y <= 44 ||
          e.x+e.w > brokenBrick.x && e.x+e.w < brokenBrick.x+brokenBrick.w && brokenBrick.y-e.y <= 44 ) {
          e.y -= 60; e.dead = true;
        }


      }

      if (!player.dead) {
        
        if(player.x+player.w>e.x-60 && player.y-e.y<40 ){if(e.id%2==0 && e.y>100){e.y+=e.jump;e.jump=0}}
        
        
        let collisionSide = rect_C(player, e); //collsiiosn width enemuy and player
        if (collisionSide === "top" && !player.dead) {
          player.vy *= player.bounce; //bounce
          bug1No++;
          e.dead = true; //enemy dead
          Sound1.push(new Audio("audio/smb_stomp.wav"));
          if (e.y > 390)e.visible = 0;
        } else if (collisionSide === "left" || collisionSide === "right") {
          Sound1.push(new Audio("audio/smb_falls.wav"));
          player.dead = true; //playef dead
          key.space = true;
        }
      }
    }
  }

  //drestrucion of elements
  for (const [index, b] of Brick.entries()) {
    if (b.x<-44) {
      // nidden and unddden brick is there
      Brick.splice(index, 1);

    }
  }
  for (const [index, c] of Coins.entries()) {
    if (c.x<-44)Coins.splice(index, 1);
  }
  for (const [index, e] of enemy.entries()) {
    if (e.x<-60)enemy.splice(index, 1);
  }

  //coin Player collision           /////////////////-----------------coin player collidion

  for (let [index, e] of Coins.entries()) {
    if (e.y < 0) {
      e.visible = false; coinsNo++; coins_No++;
    }//coin is smaller than y then invidi
    if (!e.visible)Coins.splice(index, 1); //whien coin is not vissible delete it
    if (e.c) {
      e.y -= 7;
    }
    let collisionSide;

    if (!e.taken) {
      collisionSide = rect_C(player, e);


    }

    if (collisionSide === "left" || collisionSide === "right" || collisionSide === "top" || collisionSide === "bottom") {
      e.taken = true;
      e.c = true;
      Sound2.push(new Audio("audio/coinSound.mp3"));


      break;
    }

  }

}// end of collisions


function limitPlayerAbove(player) {
  if (player.y <= 0) {
    player.y = 0; player.vy*=-1;
  }
}




function rect_C(r1, r2, c) {
  // r2 collsison side is returned

  if (c === undefined)c = true;

  let collisionSide = "";

  let totalX = r1.w/2+r2.w/2;
  let totalY = r1.h/2+r2.h/2;


  let r1CenterX = r1.x+r1.w/2;
  let r1CenterY = r1.y+r1.h/2;

  let r2CenterX = r2.x+r2.w/2;
  let r2CenterY = r2.y+r2.h/2;

  let dist_x = Math.abs(r1CenterX-r2CenterX);
  let dist_y = Math.abs(r1CenterY-r2CenterY);


  if (dist_x <= totalX && dist_y <= totalY) {


    let overlapX = totalX-dist_x;
    let overlapY = totalY-dist_y;

    if (overlapY >= overlapX) {
      //its left side or right side collidion
      if (r1.x < r2.x) {
        //left collidions
        if (c) r1.x -= overlapX;
        collisionSide = "left"
      } else {
        if (c) r1.x += overlapX;
        collisionSide = "right"
      }
    } else {
      //overlaop in top or bottom
      if (r1.y < r2.y) {
        //collidion on top;

        if (c) r1.y -= overlapY;
        collisionSide = "top";
      } else {
        //ocllision on buttom
        if (c) r1.y += overlapY;
        collisionSide = "bottom";
      }
    }
    return collisionSide;

  } else {


    collisionSide = "none"
    return collisionSide;
  }

}