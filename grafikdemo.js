var fn=[];
var lastBild = null;
const PREFIX = "bild_";

window.addEventListener('load', ()=>{

  fn = Object.getOwnPropertyNames(window)
    .filter(item => item.startsWith(PREFIX))
    .filter(item => typeof window[item] === 'function')
    .map(name=>window[name]);

  updateList();
  
  if(location.search){
    console.log("q=",location.search);
    let params = new URLSearchParams(location.search);
    if(params.has("bild") && window['bild_'+params.get('bild')]
      && typeof window['bild_'+params.get('bild')] === 'function'){
      nextBild(window['bild_'+params.get('bild')]);
    }else{
      nextBild();
    }
  }else{
    nextBild();
  }
});

function updateList(){
  let orglist = document.getElementById("liste");
  list = orglist.cloneNode();
  
  let sorted = fn.sort((a,b)=>a.name.localeCompare(b.name));
  for(let n of sorted){
    let item = document.createElement("LI");
    let link = document.createElement("A");
    
    link.href="#";
    let bildFn = n;
    link.onclick=(e)=>{
      e.preventDefault();
      nextBild(bildFn);
      return false;
    };
    link.textContent = bildFn.name.substring(PREFIX.length);
    
    list.appendChild(item).appendChild(link);
  }
  
  orglist.replaceWith(list);
}

function nextBild(forced=null){
  let next;
  if(forced){
    next = forced;
  }else if(fn.length>0){
    do{
      next = fn[parseInt(Math.random()*fn.length,10)];
    }
    while(next==lastBild);
  }else{
    let nothing_found=()=>{};
    next=nothing_found;
  }
  lastBild = next;
  console.log("next:",lastBild.name);
  
  document.getElementById("bild")
    .replaceWith(document.getElementById("bild").cloneNode(true));
  
  _animate(lastBild);
}

function _paint_debug(bildFn){

  document.querySelector("figcaption").textContent = bildFn.name;

  var bild = document.getElementById("bild");
  const ctx = bild.getContext('2d');
  //ctx.fillStyle = 'lightgreen';
  ctx.clearRect(0, 0, bild.width, bild.height);
  ctx.beginPath();
  bildFn(bild,ctx);
  ctx.stroke();
  
  fn=[bildFn];
  lastBild = null;
  
  _animate = _paint
}

var animator=null;

function _animate(bildFn){
  var bild = document.getElementById("bild");
  const ctx = bild.getContext('2d');
  
  var frame = 0;
  frame = 0;
  var count;
  count = 0;
  
  var orgLine = ctx.lineTo;
  ctx.lineTo = function(x,y) {
    if(0<count--)
      orgLine.call(ctx,x,y);
  };
  
  ctx.clearRect(0,0,bild.width, bild.height);
  
  framePainter = function()
  {
    count = ++frame;
    
    //ctx.fillStyle = 'lightgreen';
    //ctx.fillRect(0, 0, bild.width, bild.height);
    ctx.clearRect(0, 0, bild.width, bild.height);
    
    ctx.beginPath();
    bildFn(bild,ctx);
    ctx.stroke();
    
    if(count>0){
      window.clearInterval(animator);
      document.body.className = "done";
      console.log("count",count,"frame",frame);
    }
  }
  
  document.querySelector("figcaption").textContent =
      bildFn.name.substring(PREFIX.length);
  document.body.className = "working";
  
  window.clearInterval(animator);

  animator = window.setInterval(framePainter, 75);
  //window.requestAnimationFrame(framePainter);

  //demo4(bild,ctx);
};
