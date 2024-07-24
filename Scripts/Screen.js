class FK_Screen { 
  
  static #rect
  static get rect(){ return this.#rect }
  static set rect(value){ this.#rect = value }
  static get width(){ return this.#rect.width }
  static set width(value){ this.#rect.width = value }
  static get height(){ return this.#rect.height }
  static set height(value){ this.#rect.height = value }
  
  static uvX(value){ return value / this.width }
  static uvY(value){ return value / this.height }
  
  static uv(...args){
    let [x,y] = PointOperation(...args)
    return new Point(x,y).div(this.width,this.height)
  }
  
  static uvRect(...args){
    let [x,y,w,h] = RectOperation(...args)
    return new Rect(x,y,w,h).div(
      this.width, this.height,
      this.width, this.height
    )
  }
  
  static pixelX(value){ return this.width * value }
  static pixelY(value){ return this.height * value }
  
  static pixel(...args){ 
    let [x,y] = PointOperation(...args) 
    return new Point(x,y).mult(this.width,this.height)
  }
  
  static pixelRect(...args){ 
    let [x,y,w,h] = RectOperation(...args)
    return new Rect(x,y,w,h).mult(
      this.width, this.height,
      this.width, this.height
    )
  }
  
  static update(){
    this.#rect = new Rect(
      0,0,
      Engine.canvas.width,
      Engine.canvas.height
    )
  }
}