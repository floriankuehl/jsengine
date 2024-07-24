class Point {
  constructor(...args){
    this.set(...args)
  }
  
  get xy(){ return [this.x,this.y] }
  copy(){ return new Point(...this.xy) }
      
  set(...args){
    let [x,y] = PointOperation(...args)
    this.x = x
    this.y = y
    return this
  }
  
  add(...args){
    let [x,y] = PointOperation(...args)
    this.x += x
    this.y += y
    return this
  }
  
  sub(...args){
    let [x,y] = PointOperation(...args)
    this.x -= x
    this.y -= y
    return this
  }
  
  mult(...args){
    let [x,y] = PointOperation(...args)
    this.x *= x
    this.y *= y
    return this
  }
   
  div(...args){
    let [x,y] = PointOperation(...args)
    this.x /= x
    this.y /= y
    return this
  }
  
  get sqrX(){ return this.x * this.x }
  get sqrY(){ return this.y * this.y }
  get sqrMag(){ return this.sqrX + this.sqrY }
  get magnitude(){ return Math.sqrt( this.sqrMag ) }
  
  fromAngle(radians,radius){
    return this.copy().add(
      radius * Math.cos(radians),
      radius * Math.sin(radians)
    )
  }
  
  sqrDist(...args){
    let [x,y] = PointOperation(...args)
    return this.copy().sub(x,y).sqrMag
  }
  dist(...args){ return Math.sqrt( this.sqrDist(...args) ) }
}