class Rect extends Point {
  constructor(...args){
    super(...args)
    this.set(...args)
  }
  
  get wh(){ return [this.width,this.height] }
  get xywh(){ return [...this.xy,...this.wh] }
  copy(){ return new Rect(...this.xywh) }
  
  set(...args){
    let [x,y,w,h] = RectOperation(...args)
    super.set(x,y)
    this.width = w
    this.height = h
    return this
  }
  
  add(...args){
    let [x,y,w,h] = RectOperation(...args)
    super.add(x,y)
    this.width += w
    this.height += h
    return this
  }
  
  sub(...args){
    let [x,y,w,h] = RectOperation(...args)
    super.sub(x,y)
    this.width -= w
    this.height -= h
    return this
  }
  
  mult(...args){
    let [x,y,w,h] = RectOperation(...args)
    super.mult(x,y)
    this.width *= w
    this.height *= h
    return this
  }
  
  div(...args){
    let [x,y,w,h] = RectOperation(...args)
    super.div(x,y)
    this.width /= w
    this.height /= h
    return this
  }
}