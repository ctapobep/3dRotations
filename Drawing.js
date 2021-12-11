class Drawing {
    constructor(ctx, w, h, imgData, canvas) {
        this.ctx = ctx;
        this.h = h;
        this.w = w;
        this.imgData = imgData;
        this.canvas = canvas;
    }

    setPixel(x, y) {
        this.imgData.data[(x+y*this.w)*4]   = 0;
        this.imgData.data[(x+y*this.w)*4+1] = 0;
        this.imgData.data[(x+y*this.w)*4+2] = 0;
        this.imgData.data[(x+y*this.w)*4+3] = 255;
    }

    setColoredPixel(x, y, r, g, b, alpha) {
        this.imgData.data[(x+y*this.w)*4]   = r;
        this.imgData.data[(x+y*this.w)*4+1] = g;
        this.imgData.data[(x+y*this.w)*4+2] = b;
        this.imgData.data[(x+y*this.w)*4+3] = alpha;
    }

    draw() { this.ctx.putImageData(this.imgData, 0, 0); }

    getAlpha (x, y) {
        return this.imgData.data[(x+y*this.w)*4+3];
    }

    setAlpha (x, y, a) {
        this.imgData.data[(x+y*this.w)*4+3] = a;
    }

    transform (f) {
        let newImgData = ctx.createImageData(this.canvas.width, this.canvas.height);
        let dNew = new Drawing(ctx, this.canvas.width, this.canvas.height, newImgData );
        let dOld = new Drawing(ctx, this.canvas.width, this.canvas.height, this.imgData );
        for (let x=0; x<this.canvas.width; x++) {
            for (let y=0; y<this.canvas.height; y++) {
                let newCoord = f(x, y);
                dNew.setAlpha(newCoord.x, newCoord.y, dOld.getAlpha(x, y));
            }
        }

    }

}


/*function newDrawFirst() {
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let newImgData = ctx.createImageData(canvas.width, canvas.height);
      let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData );
      let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData );
      for (let x=0; x<canvas.width; x++) {
          for (let y=0; y<canvas.height; y++) {
              dNew.setAlpha(x+1, y+2, dOld.getAlpha(x, y));
          }
      }
      center.x+=1;
      center.y+=2;
      dNew.draw();
  }
*/