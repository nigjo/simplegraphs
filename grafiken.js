function bild_kegel_quer(bild, ctx) {
  const w = bild.width;
  const h = bild.height;
  const count = 15;
  
  for(i=count;i>1;i--){
    ctx.moveTo(0,h-h/i);
    ctx.lineTo(w,h/i);
  }
  for(i=3;i<=count;i++){
    ctx.moveTo(0,h/i);
    ctx.lineTo(w,h-h/i);
  }
}

function bild_raster(bild, ctx) {
  const w = bild.width;
  const h = bild.height;
  const count = 20;

  let x1=i=>delta*(count-i-1);
  let x2=i=>(i+1)*(w/count);
  let y1=i=>h;
  let y2=i=>0;//-h/10;

  let delta=w/(count*3);
  for(i=0;i<count;i++){
    ctx.moveTo(x1(i),y2(i));
    ctx.lineTo(x2(i),y1(i));
  }
  for(i=0;i<count;i++){
    ctx.moveTo(w-x1(i),y2(i));
    ctx.lineTo(w-x2(i),y1(i));
  }
  for(i=0;i<count;i++){
    ctx.moveTo(w-x1(i),y1(i));
    ctx.lineTo(w-x2(i),y2(i));
  }
  for(i=0;i<count;i++){
    ctx.moveTo(x1(i),y1(i));
    ctx.lineTo(x2(i),y2(i));
  }
}

function bild_spirale(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  const count=20;
  let dw = w/2/count;
  let dh = h/2/count;
  
  ctx.moveTo(w/2,h/2);
  for(i=count;i>=0;i--){
    ctx.lineTo(w/2,i*dh);
    ctx.lineTo(w-i*dw,i*dh);
    ctx.lineTo(w-i*dw,h/2);
    ctx.lineTo(w-i*dw,h-i*dh);
    ctx.lineTo(w/2,h-i*dh);
    ctx.lineTo(i*dw,h-i*dh);
    ctx.lineTo(i*dw,h/2);
    ctx.lineTo(i*dw,(i-1)*dh);
  }
};

function bild_sanduhr(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  let d = w/50;

  for(var i=0;i<=w/d;i++){
    ctx.moveTo(i*d,0);
    ctx.lineTo(w-i*d,h);
  }
};

function bild_langer_gang(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  let dw = w/50;
  let dh = h/30;

  for(var i=0;i<=w/dw;i++){
    ctx.moveTo(i*dw,h);
    ctx.lineTo(w-i*dw,0);
  }
  for(var i=1;i<h/dh;i++){
    ctx.moveTo(0,i*dh);
    ctx.lineTo(w,h-i*dh);
  }
};

function bild_katzenauge(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  
  for(var i=0;i<40;i++){
    ctx.moveTo(0,h-i*h/40);
    ctx.lineTo(i*w/20,0);
  }
  for(var i=0;i<40;i++){
    ctx.moveTo(w,i*h/40);
    ctx.lineTo(w-i*w/20,h);
  }
}

function bild_auge(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  const steps=30;
  
  for(var i=0;i<=steps;i++){
    ctx.moveTo(0,h-i*h/steps);
    ctx.lineTo(i*w/steps,0);
  }
  for(var i=1;i<=steps;i++){
    ctx.moveTo(i*w/steps,0);
    ctx.lineTo(w,i*h/steps);
  }
  for(var i=1;i<=steps;i++){
    ctx.moveTo(w,i*h/steps);
    ctx.lineTo(w-i*w/steps,h);
  }
  for(var i=1;i<=steps;i++){
    ctx.moveTo(w-i*w/steps,h);
    ctx.lineTo(0,h-i*h/steps);
  }
}

function bild_kreis(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  const mx=w/2;
  const my=h/2;
  const l=Math.min(mx,my);

  for(var i=0;i<360;i+=5){
    ctx.moveTo(mx,my);
    let x=mx+l*Math.cos(i/180*Math.PI);
    let y=my+l*Math.sin(i/180*Math.PI);
    ctx.lineTo(x,y);
    ctx.lineTo(x<=mx?0:w,y);
  }
}

function bild_Flusstal(bild,ctx){
  const w = bild.width;
  const h = bild.height;
  for(var i=0;i<w/4;i+=10){
    ctx.moveTo(0,0);
    ctx.lineTo(i,h);
  }
  for(var i=0;i<w;i+=10){
    ctx.moveTo(w/4+i/2,h);
    ctx.lineTo(i,0);
  }
  for(var i=w/4;i>=0;i-=10){
    ctx.moveTo(w,0);
    ctx.lineTo(w-i,h);
  }
}

function bild_doppelfaecher(bild,ctx){
  for(var i=0;i<=bild.width;i+=12){
    ctx.moveTo(0,bild.height);
    ctx.lineTo(i,0);
  }

  for(var i=0;i<=bild.width;i+=12){
    ctx.moveTo(i,bild.height);
    ctx.lineTo(bild.width,0);
  }
}

function bild_Saeulen(bild,ctx){
  let w=bild.width;
  let h=bild.height;
  const count=5;
  const steps=25;
  
  let dc = w/count;
  let ds = dc/steps;
  
  for(let i=0;i<count;i++){
    for(let s=1;s<=steps;s++){
      let x = (dc/2)*Math.cos(s*Math.PI/steps)
      ctx.moveTo(i*dc+dc-x-dc/2,0);
      ctx.lineTo(i*dc+dc-x-dc/2,h);
    }
  }
}


function bild_Raute(bild,ctx){
  let w = bild.width/2;
  let h = bild.height/2;
  const steps = 20;
  let dw = w/steps;
  let dh = h/steps;
  for(let i=0;i<=steps;i++){
    ctx.moveTo(i*dw,h+i*dh);
    ctx.lineTo(w+i*dw,i*dh);
  }
  for(let i=0;i<=steps;i++){
    ctx.moveTo(i*dw,h-i*dh);
    ctx.lineTo(w+i*dw,2*h-i*dh);
  }
}