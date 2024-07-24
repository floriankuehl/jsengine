class Ellipse extends Circle {
  constructor(...args){
    super(...args)
    this.set(...args)
  }
  get rr(){ return [this.radius,this.radiusY] }
  get xyrr(){ return [...super.xyr,this.radiusY] }
  copy(){ return new Ellipse(...this.xyrr) }
  
  set(...args){
    let [x,y,rx,ry] = EllipseOperation(...args)
    super.set(x,y,rx)
    this.radiusY = ry
    return this
  }
  
  add(...args){
    let [x,y,rx,ry] = EllipseOperation(...args)
    super.add(x,y,rx)
    this.radius += ry
    return this
  }
  
  sub(...args){
    let [x,y,rx,ry] = EllipseOperation(...args)
    super.sub(x,y,rx)
    this.radius -= ry
    return this
  }
  
  mult(...args){
    let [x,y,rx,ry] = EllipseOperation(...args)
    super.mult(x,y,rx)
    this.radiusY *= ry
    return this
  }
  
  div(...args){
    let [x,y,rx,ry] = EllipseOperation(...args)
    super.div(x,y,rx)
    this.radiusY /= ry
    return this
  }
}