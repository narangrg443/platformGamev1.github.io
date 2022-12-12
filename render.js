function renderImage() {
  ctx.drawImage(Img.background, 0, 0, 300, 150, 0, 0, canvas.width, canvas.height);


  for (const [index, e] of Brick.entries()) {
    if (e.x>=-64 && e.x <= 851 && e.visible) {
      if (e.type == 2)e.drawSprite(Img.brick_2, 30, 30);
      if (e.type == 1)e.drawSprite(Img.brick_1, 100, 100)
      if (e.type == 3)e.drawSprite(Img.woodenBox, 100, 100);
      //draw border in brick_1

    } else if (e.type == 1 && !e.visible) {
      Brick.splice(index, 1);
    }
  }

  //draw enemy

  for (let e of Enemy) {

    if (e.visible) {
      e.walk();
      e.drawSprite(Img.bug1, 20.85, 20);
      //e.draw();
      ctx.restore()
    }
  }
  //draw player
  if (player.dead) {
    player.blink(Img.player, 51, 82);
  } else {
    player.drawSprite(Img.player,
      player.action,
      51,
      82);

  }


  Coins.forEach(e=> {
    if (e.visible)e.draw(Img.coin, 100, 98);
  })


  P.forEach(e=> {
    if (e.visible) {
      //  console.log(e.x,e.y,e.w,e.h)
      e.draw(Img.brick_1);
    }
  })

  ////////////////////
  Bulet.forEach(e=> {

    if (!e.visible) {
      e.blast(Img.boom);
      if (e.blastBullet)Bulet.splice(e, 1);
    }

    if (e.visible)e.draw(player);


  });

}
function scoreboard() {
  ctx.save();
  ctx.drawImage(Img.coin,
    0,
    0,
    100,
    98,
    10,
    30,
    30,
    28);
  ctx.drawImage(Img.bug1,
    0,
    0,
    20.85,
    20,
    10,
    64,
    30,
    28);
  ctx.font = "16px Arial"
  ctx.fillText("   x "+coinsNo,
    35,
    47);
  ctx.fillText("  x "+bug1No,
    35,
    85);


}
function fpsFinder() {
  end = Date.now();
  diff = end-start
  fps++;
  if (diff > 1000) {
    Fps = fps; fps = 0; start = end;
  }
}
function showText(showText) {
  if (showText) {

    /*
          ctx.fillStyle = "black"
          ctx.fillText("analog Pressed:"+B[0].pressed, 33, 33)
          ctx.font = "15px Arial"
          ctx.fillText("dx:"+dx, 33, 63)
          ctx.fillText("dy:"+dy, 33, 93)
          ctx.fillText("key.left"+key.left, 300, 50);
          ctx.fillText("key.right"+key.right, 300, 33)
          ctx.fillText("key.up"+key.up, 400, 33)
          ctx.fillText("key.down"+key.down, 400, 50)


          ctx.fillText("key.space"+key.space, 400, 133)
          ctx.fillText("key.enter"+key.enter, 400, 150)
*/

    ctx.save();

    ctx.fillStyle = "black";
    ctx.font = "18px Arial"
    ctx.fillText("enemyheight "+Enemy[0].h+"widtrh "+Enemy[0].w,
      100,
      40);
    ctx.fillText("sound.lenth "+Sound1.length+"ms",
      100,
      60);
    ctx.fillText("brick.height width"+Brick[0].h+" "+Brick[0].w,
      100,
      80);

    ctx.fillText("fps"+Fps,
      400,
      40);


  }
  ctx.restore();

}
function drawHeart(no_of_life) {
  for (let i = 0; i < no_of_life; i++) {
    ctx.drawImage(Img.heart, 10, 10, 200, 200, i*30+10, 0, 30, 30);
  }
}
function fpsShow() {
  end = Date.now();
  diff = end-start
  fps++;
  if (diff > 1000) {
    Fps = fps; fps = 0; start = end;
  }
}