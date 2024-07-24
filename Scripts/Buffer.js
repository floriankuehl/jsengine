const RGBA = 4
const RGB = 3

class FK_Buffer {

  constructor(width,height,bytes){
    this.bytes = bytes
    this.width = width
    this.height = height
    this.pixels = false
    this.data = new ImageData(w,h)
  }
  
  static fromImage(img){
    console.log( img )
    
  }
  
  forY(func,...args){
    for( let i=0; i<this.height; i++ )
      func(i,...args)
  }
  
  forX(func,...args){
    for( let i=0; i<this.width; i++ )
      func(i,...args)
  }
  
  forB(func,...args){
    for( let i=0; i<this.bytes; i++ )
      func(i,...args)
  }
  
  pixelIndex(x,y){ 
    return ( y * this.width + x ) * this.bytes 
  }
  
  createBuffer(){ 
    return new ArrayBuffer(this.width * this.height * this.bytes) 
  }
  
  createPixelBuffer(buffer){ 
    return new Uint8ClampedArray(buffer || this.createBuffer()) 
  }
  
  setPixel(x,y,...rgba){
    if( !this.pixels ) return false
    const index = this.pixelIndex(x,y)
    this.forB(i=>{
      this.pixels[index+i] = rgba[i]
    })
    return true
  }
  
  getPixel(x,y){
    if( !this.pixels ) return false
    const index = this.pixelIndex(x,y)
    const result = []
    this.forB(i=>result.push(rgba[i]))
    return true
  }
  
  pixelRow(index){
    if( !this.pixels ) return false
    const 
      width = this.width * this.bytes,
      start = index * width
    return this.pixels.slice( start, start + width )
  }
  
  pixelColumn(index){
    if( !this.pixels ) return false
    const result = []
    this.forY(y=>{
      result.push( ...this.getPixel(index,y) )
    })
    return result
  }
  
  createPixels(...args){
    let [r,g,b,a] = args
    if( this.bytes > 0 && r === undefined ) r = 0
    if( this.bytes > 1 && g === undefined ) g = 0
    if( this.bytes > 2 && b === undefined ) b = 0
    if( this.bytes > 3 && a === undefined ) a = 0
    const rgba = [r,g,b,a]
    
    const pixels = this.createPixelBuffer()
    this.forY(y=>{
      this.forX(x=>{
        const index = this.pixelIndex(x,y)
        this.forB(i=>{ pixels[index+i] = rgba[i] })
      })
    })
    return pixels
  }
  
  loadPixels(){
    this.pixels = this.data ? this.createPixelBuffer(this.data.data) : this.createPixels()
  }
  
  savePixels(){
    if( !this.pixels ) return false
    this.data = new ImageData(this.pixels,this.width,this.height)
    this.pixels = false
  }
  
  from(context,x,y,w,h){
    this.width = w
    this.height = h
    this.data = context.getImageData(x, y, w, h)
  }
  
  to(context,...args){
    if( !this.data ) return false
    context.putImageData( this.data, ...args )
  }
}