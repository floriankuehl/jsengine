const TWO_PI = Math.PI + Math.PI
const HALF_PI = Math.PI * .5

class Shape extends Circle {
  
  #cache = false
  
  constructor(x,y,radius,steps,radiusFunc){
    super(x,y,radius)
    this.steps = steps
    
    const normal = radiusFunc === undefined
    if( normal ){
      this.radiusFunc = (i,r,a)=>r
      this.#cache = this.points
      return
    }
    this.radiusFunc = radiusFunc
  }
 
  get points(){
    if( this.#cache ) 
      return this.#cache
    
    const points = []
    let rad = -HALF_PI
    const step = TWO_PI / this.steps
    for( let i=0; i<this.steps; i++ ){
      const r = this.radiusFunc(i,this.radius,rad)
      points.push( this.fromAngle(rad,r) )
      rad += step
    }
    return points
  }
  
}