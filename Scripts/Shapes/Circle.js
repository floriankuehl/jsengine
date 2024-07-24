class Circle extends Point {
  constructor(...args){
    super(...args)
    this.set(...args)
  }
  
  get xyr(){ return [...super.xy,this.radius] }
  copy(){ return new Circle(...this.xyr) }
  
  set(...args){
    let [x,y,r] = CircleOperation(...args)
    super.set(x,y)
    this.radius = r
    return this
  }
  
  add(...args){
    let [x,y,r] = CircleOperation(...args)
    super.add(x,y)
    this.radius += r
    return this
  }
  
  sub(...args){
    let [x,y,r] = CircleOperation(...args)
    super.sub(x,y)
    this.radius -= r
    return this
  }
  
  mult(...args){
    let [x,y,r] = CircleOperation(...args)
    super.mult(x,y)
    this.radius *= r
    return this
  }
  
  div(...args){
    let [x,y,r] = CircleOperation(...args)
    super.div(x,y)
    this.radius /= r
    return this
  }
}