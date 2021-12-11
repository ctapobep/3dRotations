let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
function draw() {
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI*2, true);
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI*2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI*2, true);
    ctx.stroke();
  }
}

function newDrawFirst() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData );
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData );
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            dNew.setAlpha(x+1, y+2, dOld.getAlpha(x, y));
        }
    }
    dNew.draw();
}
function newDrawSecond() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData );
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData );
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            dNew.setAlpha(x+1, y-2, dOld.getAlpha(x, y));
        }
    }
    dNew.draw();
}
function newDrawRotation() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData);
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData);
    const center = {x: 75, y: 75};
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            let oldCoord = {x: x - center.x, y: center.y - y};
            const angle = Math.PI/18;
            let alpha = dOld.getAlpha(oldCoord.x, oldCoord.y);
            let newX = Math.round(oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle)) - center.x;
            let newY = center.y - Math.round(oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
            dNew.setAlpha(newX, newY, alpha);
        }
    }
    dNew.draw();
}
//y' = y*Math.cos(10) - x*Math.sin(10)
//x' = y*Math.sin(10) + x*Math.cos(10)
function drawZigzag() {
    for(let i=0; i<10; i++) {
        for (let s = 0; s < 35; s++) {
            setTimeout(() => {
                // newDrawFirst();
                newDrawRotation();
            }, 20);
        }
    }
}

window.onload = ()=> {
    draw();
    //newDrawFirst2();

    //newDrawRotation();
    drawZigzag();

}






