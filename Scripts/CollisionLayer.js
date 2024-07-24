class CollisionLayer {
  
  #gridX = .1
  #gridY = .1
  #scene
  #grid
  
  constructor(scene){
    this.#scene = scene
    this.#grid = this.plainGrid
  }
  
  get rows(){ return Math.ceil(1.0 / this.#gridY) }
  get cols(){ return Math.ceil(1.0 / this.#gridX) }
  
  get plainGrid(){
    const row = [].fill(null,0,this.cols)
    return [].fill(row,0,this.rows)
  }
   
  popuplate(){
    this.#scene.objects.forEach(object=>{
      if( object.reactive ){
        const 
          x = Math.floor( 1.0 / this.#gridX * object.transform.x ),
          y = Math.floor( 1.0 / this.#gridY * object.transform.y )
        console.log( x, y, object )
      }
    })
  }
}