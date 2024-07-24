class Engine {
  
  static #running
  static #canvas
  static #context
  static #scene
  static #mouse
  
  static #frameCount
  static #maxFrames
  
  static get canvas(){ return this.#canvas }
  static get context(){ return this.#context }
  static get scene(){ return this.#scene }
  
  static screenX(value){
    return value - this.#canvas.parentNode.offsetLeft
  }
  
  static screenY(value){
    return value - this.#canvas.parentNode.offsetTop
  }
  
  static set mouse(value){ this.#mouse = FK_Screen.uv(value) }
  static get mouse(){ return this.#mouse.copy() }
  
  static load(canvas,scene,maxFrames,start){
    this.#canvas = canvas
    this.#context = canvas.getContext('2d')
    this.#scene = scene
    this.#mouse = new Point(.5,.5)
    
    this.#frameCount = 0
    this.#maxFrames = maxFrames === undefined ? Infinity : maxFrames
    this.#running = false
    
    canvas.addEventListener('mousemove',(event)=>{
      if( this.#running )
        this.mouse = new Point(
          this.screenX(event.clientX),
          this.screenY(event.clientY)
        )
    })
    
    canvas.addEventListener('click',(event)=>{
      if( this.#running )
        scene.find(o => o.enabled && o.reactive && o.hover)
          .map(o => o.fire('click',o))
    })
    
    window.addEventListener('wheel', (event) => {
      if( this.#running ){
        const delta = event.deltaY < 0 ? -1 : 1
        scene.find(o => o.enabled && o.reactive && o.hover)
          .map(o => o.fire('wheel',o,delta))
      }
    })
    
    if( start ) this.start()
  }
  
  static start(){
    Time.deltaTime = performance.now
    this.#running = true
    this.loop()
  }
  
  static stop(){
    this.#running = false
  }
  
  static resizeCanvas(){
    this.#canvas.width = this.#canvas.parentNode.offsetWidth
    this.#canvas.height = this.#canvas.parentNode.offsetHeight
    FK_Screen.update()
  }
  
  static eventLoop(){ return this.#scene.events() }
  static updateLoop(){ return this.#scene.update() }
  static fixedLoop(){ return this.#scene.fixedUpdate() }
  static renderLoop(){ return ProcessActions(this.#context,...this.#scene.render(this.#context)) }

  static isLoop(value){ return this.#frameCount % value === 0 }
  static get renders(){ return this.isLoop(1) }
  static get updates(){ return this.isLoop(2) }
  static get fixedUpdates(){ return this.isLoop(10) }
  static get events(){ return this.isLoop(4) }
  
  static loop(){
    if( this.#running === false ) return
    this.resizeCanvas()
    this.#frameCount++
    
    if( this.events ) this.eventLoop()
    if( this.updates ){
      Time.update()
      this.updateLoop()
    }
    if( this.fixedUpdates ){
      Time.fixedUpdate()
      this.fixedLoop()
    }
    if( this.renders ) this.renderLoop()
  
    this.#running = this.#frameCount < this.#maxFrames
    if( this.#running ) requestAnimationFrame(_=>this.loop())
  }
  
}