//audoi files
let Sound1 = [];
let mario = new Audio("audio/Mario.mp3");
let playmario = true;
function addSound() {
  if (playmario) {
    playmario = false;
    mario.volume = .2;
    mario.play();
  }
  if (mario.currentTime == mario.duration)playmario = true;
  Sound1.forEach((s, index)=> {
    s.volume = 0.5;
    s.play();
    Sound1.splice(index, 1);
  })
  Sound2.forEach((s, index)=> {
    s.volume = 1;
    s.play();
    Sound2.splice(index, 1);
  })

}




/*
let loadNo = [];
let audioName = ["fireball", "kick", "coinSound"];
let audioFile = ["smb_fireball.wav", "smb_kick.wav", "coinSound.mp3"];

let Aud = loadAudio(audioName, audioFile);



function loadAudio(name, file) {

  let Aud = {};

  audioName.forEach((name, index)=> {

    Aud[name] = new Audio("audio/"+file[index]);

  })


  return Aud;


}






function playRange(audio, startTime, endTime) {
  let duration = audio.duration;
  if (endTime === undefined)endTime = duration;
  if (endTime <= duration && startTime >= 0 && startTime < endTime) {
    if (audio.currentTime == 0)
      audio.currentTime = startTime;

  }
  if (audio.currentTime >= endTime) {
    audio.currentTime = 0;
    audio.pause();
  }
}

*/