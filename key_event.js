 let key={
  up:false,down:false,left:false,right:false,enter:false,space:false
}

 function key_event(){

window.addEventListener('keydown',function(e){
  e.preventDefault;
  if(e.keyCode=="37")key.left=true;
  if(e.keyCode=="38")key.up=true;
  if(e.keyCode=="39")key.right=true;
  if(e.keyCode=="40")key.down=true;
  if(e.keyCode=="13")key.enter=true;
  if(e.keyCode=="32")key.space=true;
  if(e.key==='s')key.space=true;
  if(e.key==='d')key.enter=true;
  
});

window.addEventListener('keyup',function(e){
  e.preventDefault();
  if(e.keyCode=="37")key.left=false;
  if(e.keyCode=="38"){key.up=false;}
  if(e.keyCode=="39")key.right=false;
  if(e.keyCode=="40")key.down=false;
  if(e.keyCode=="13")key.enter=false;
  if(e.keyCode=="32")key.space=false;
  if(e.key==='s')key.space=false;
  if(e.key==='d')key.enter=false;
  
});
}

//export {key,key_event}