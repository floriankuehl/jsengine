const DEGREES = Math.PI / 180
const RADIANS = Math.PI
const ANGLE_MODE = DEGREES

class FK_Transform extends Point {
  #parent
  #entity
  
  constructor(entity,parent,x,y,rotation,scale){
    super(x,y)
    this.#entity = entity
    
    this.rotation = rotation
    this.scale = scale
    
    this.#parent = null
    if( parent instanceof FK_Transform )
      this.#parent = parent
    if( parent instanceof FK_Entity )
      this.#parent = parent.transform
  }
  
  get parent(){ return this.#parent }
  get parentEntity(){ return this.#parent.entity }
  set parent(value){ 
    if( value instanceof FK_Transform )
      this.#parent = value
    if( value instanceof FK_Entity )
      this.#parent = value.transform
  }  
  
  get entity(){ return this.#entity }
}