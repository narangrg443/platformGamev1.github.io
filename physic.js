function gravity(obj) {
  obj.vy += obj.g; obj.y += obj.vy;
}
function jump(p) {

  player = p;
  if (key.space && player.onGround || key.up && player.onGround) {

    Sound1.push(new Audio("audio/smb_kick.wav"));
    //Aud.kick.play();

    player.onGround = false;


    player.vy += player.jump;

  }

  player.y += player.vy;

  //limit the jump


  if (player.vy <= player.jump) {
    player.vy = player.jump;
  }

  //camY=(canvas.height-p.y)*.18-25;

  //ctx.translate(0,camY);

}
function keyControl() {

  if (key.right) {
    player.action = 0;
    player.vx += player.a;


    if (player.x < 400 || MapNo == Map1.length-1) {
      //condition to move player

      player.x += player.vx;
    } else {
      //else move bricks; also track map no

      point1 -= player.vx; //point is equal to 851; position
      dist -= player.vx; // startin point value is 0

      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@move enemy as weee
      Brick.forEach(e=> {
        e.x -= player.vx;

      });

      Enemy.forEach(e=> {
        e.x -= player.vx;
      })

      //move coins
      Coins.forEach(e=> {
        e.x -= player.vx;
      })

      Bulet.forEach(bullet=> {
        bullet.x -= player.vx;
      })

      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

      if (point1 <= 0) {
        point1 = 851;
        MapNo++;
      }

    }


  }


  if (key.left) {
    player.action = 1;

    player.vx += player.a
    if (player.x < 900) {
      //condition to move player
      player.x -= player.vx;
    } else {
      //else move bricks; also track map no

      point1 += player.vx; //point is equal to 851; position
      dist += player.vx; // startin point value is 0


      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      /*
              Brick.forEach(e=> {//Brick
                e.x += player.vx;
                });
              Enemy.forEach(e=>{
                e.x+=player.vx;
              })

             Coins.forEach(e=>{
             e.x+=player.vx;
             });
             Bulet.forEach(bullet=>{
               bullet.x+=player.vx;
             })
  */
      /////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      if (point1 >= 851) {
        point1 = 0;
        MapNo--;
      }

    }
  }


  //limieting player width canvas x axis
  if (player.x <= 0) {
    player.x = 0;
  } else if (player.x+player.w >= 851) {
    player.x = 851-player.w;
  }

  if (player.vx > player.vel_limit) {
    player.vx = player.vel_limit;
  }



  if (key.space) {

    if (player.action == 0 || player.action == 2) {
      player.action = 4;
    } else if (player.action == 1 || player.action == 3) {
      player.action = 5;
    }


  } else if (!key.right &&!key.left) {
    // player.vx*=.85;
    if (player.action == 0 || player.action == 4) {
      player.action = 2; //using friction
    } else if (player.action == 1 || player.action == 5) {
      player.action = 3;
    }
  }
  //assign 2 maps

}
function BrickAnimate() {
  if (Brick_animate) {
    Sound1.push(new Audio("audio/smw_break_block.wav"))
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {

        let w = Math.random()*10+boxX/2-10; let h = boxY/2-5;
        let posX = b_dx+(j*w); let posY = b_dy+(i*h);
        P.push(new Pieces(posX, posY, w, h-7));

      }
    }
    Brick_animate = false;
    // console.log(P.length);
  }

  for (const [index, p] of P.entries()) {


    if (index == 0 || index == 1) {
      p.vx = 1; p.u = 15;
    }
    if (index == 2 || index == 3) {
      p.vx = 1.8; p.u = 10;
    }
    if (index == 4 || index == 5) {
      p.vx = 2.5; p.u = 5;
    }



    if (index%2 == 0) {
      p.vx=-p.vx; p.angle -= Math.random()*3+1;
    } else {
      p.angle += 2;
    }

    //p.u=Math.random()*10+10;


    p.move();
    if (p.y > 380) {
      P.splice(index, 1);
    }

  }

}
function fire(brust) {
  if (brust) {
    if (key.enter && fired == false) {
      Sound1.push(new Audio("audio/smb_fireball.wav"));
      Bulet.push(new Bullet(player.x+player.w/2, player.y+player.h/2, 10, 10));
      fired = true;
    }
    delay++;
    if (brust == 2) {
      if (delay == 10) {
        fired = false; delay = 0;
      }//brust bullet
    } else if (brust == 1) {
      if (!key.enter)fired = false; //single bullet
    }
    for (const [index, b] of Bulet.entries()) {

      b.move()

      if (b.x > 851 || b.x < 0 || b.bounceNo >= 1 || b.bounceOnFloor > 1) {

        if (b.visible) Sound1.push(new Audio("audio/smb2_damage.wav"));
        b.visible = false;

      }
      //move bullet

    }
  }
}
function playerdead() {
  if (player.y > 390) {
    player.visible = false;
    player.life--;
  }
  if (!player.visible && player.life) {

    for (let e of Brick) {
      if (e.x > 100 && e.x < 400) {
        player.x = e.x-Math.random()*140-130;
        player.y = 210;
      }
    }
    //  player.x = 30;
    //      player.y = Math.random()*400;
    key.space = false;
    player.visible = true;
    player.dead = false;
  }//resteart from same positon

  if (!player.visible && Map == 1 && player.life == 0) {
    //restart from the map
    Map = 1; objAssigned = false; MapNo = 0; player.dead = false;
    key.space = false;

    player.visible = true;
    player.life = 3;
  } else if (!player.visible && !player.life && Map == 2) {
    Map = 2; objAssigned = false; MapNo = 0;
    player.visible = true;
    player.dead = false;
    key.space = false;
    player.life = 3;
  }
}
function nextMap() {
  if (Map == 1 && player.x+player.w >= 850 && MapNo == Mapa1.length-1) {
    Map = 2; MapNo = 0; objAssigned = false;
  }
  if (Map == 2 && player.x+player.w >= 400 && MapNo == Mapa1.length-1) {
    STAGE = 3; MapNo = 0; objAssigned = false;
  }
}
function rewardLife() {
  if (coins_No == 10) {
    player.life++; coins_No = 0;
  }
}
///////////////---------------------RENDER---------