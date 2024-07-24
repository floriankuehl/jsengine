class FK_Scene {
  
  #objects
  
  constructor(){
    this.#objects = []
    this.changed = true
    this.background = new FK_SceneRect(
      null, 0, 0, 1, 1,
      { fillStyle: '#000000' },
      'fill'
    )
  }
  
  add(...objects){
    const list = objects.filter(o=>o instanceof FK_Entity)
    this.#objects.push(...list)
    this.changed = list.length > 0
    return this
  }
  
  remove(...objects){
    const list = objects.reduce((acc,object)=>[
      ...acc,
      ...this.findBy('parent',object.transform)
    ])
    this.#objects = this.find(object=>list.indexOf(object)<0)
    this.changed = list.length > 0
    return this
  }
  
  find(func){ return this.#objects.filter(func) }
  findBy(key,value){ 
    return this.find( 
      value === undefined ?
      (object) => ( key in object ) :
      (object) => ( ( key in object ) && ( object[key] === value ) )
    )
  }
  
  get allReactive(){ return this.find(o=>o.enabled && o.reactive) }
  get allEnabled(){ return this.find(o=>o.enabled) }
  get allRoots(){ return this.find(o=>o.enabled && (o.parent===null)) }
  
  events(){
    return this.allReactive.map((object) => object.onEvents())
  }
  
  update(){
    return this.allEnabled.map((object) => object.onUpdate())
  }
  
  fixedUpdate(){
    return this.allEnabled.map((object) => object.onFixedUpdate())
  }
  
  renderRoots(context){
    return this.allRoots.map((object) => Render.Entity(object,context))
  }
  
  render(context){
    return [
      Render.Entity(this.background,context),
      ...this.renderRoots(context)
    ]
  }
  
}