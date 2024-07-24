const SYSTEM_EVENTS = {
  'render': (object) => object,
  'update': (object) => object, 
  'fixedUpdate':(object) => object
};

const INPUT_EVENTS = {
  'mouseover': (a,b) => a && b,
  'mouseenter': (a,b) => a && !b,
  'mouseleave': (a,b) => b && !a,
  'mousedown': (a,b) => a,
  'mouseup': (a,b) => a,
};

class FK_Entity {
  #reactive = false
  constructor(parent,x,y,shape,before,after,reactive){
    this.transform = implement(new FK_Transform(this,parent,x,y),IPosition)
    if( shape ){
      shape.entity = this
      shape.transform = this.transform
    }
    this.shape = shape
    this.before = before
    this.after = after
    this.enabled = true
    this.listener = new FK_EventListener()
    
    this.reactive = !!reactive
    this.hover = false
    this.active = false
  }
  
  get reactive(){ return this.#reactive }
  set reactive(value){ 
    this.#reactive = value
    if( value === false ){
      for(let key in INPUT_EVENTS )
        this.listener.removeCondition(key)
      return
    }
    if( value ){
      for(let key in INPUT_EVENTS )
        this.listener.addCondition(key,INPUT_EVENTS[key])
    }
  }
  
  get parent(){ return this.transform.parent }
  get parentEntity(){ return this.transform.parentEntity }
  set parent(value){ this.transform.parent = value }
  get bounds(){ 
    const result = this.shape.bounds 
    result.left += this.transform.x
    result.right += this.transform.x
    result.top += this.transform.y
    result.bottom += this.transform.y
    return result
  }
  
  get containsMouse(){ 
    const local = Engine.mouse.sub(this.transform)
    return this.shape.contains(local.x,local.y)
  }
  
  on(...args){ return this.listener.addAction(...args) }
  off(...args){ return this.listener.removeAction(...args) }
  if(...args){ return this.listener.addCondition(...args) }
  fire(...args){ return this.listener.fireAction(...args) }
  check(...args){ return this.listener.check(...args) }
  
  isSystemEvent(key){ return key in SYSTEM_EVENTS }
  isInputEvent(key){ return key in INPUT_EVENTS }
  isCustomEvent(key){ return !( this.isSystemEvent(key) || this.isInputEvent(key) ) }
  
  eventKeys(func){ return this.listener.actions(func) }
  get systemEvents(){ return this.eventKeys(k=>this.isSystemEvent(k)) }
  get inputEvents(){ return this.eventKeys(k=>this.isInputEvent(k)) }
  get customEvents(){ return this.eventKeys(k=>this.isCustomEvent(k)) }
  
  onEvents(){
    const hover = this.containsMouse
    const event = [this]
    const input = [hover,this.hover]
    const inputs = this.inputEvents.map(key=>this.check(key,input,event)[0])
    this.hover = hover
    
    return [
      ...inputs,
      ...this.customEvents.map(key=>this.check(key,event,event))
    ]
  }
  
  onFixedUpdate(){ return this.fire('fixedUpdate',this) }
  onUpdate(){ return this.fire('update',this) }
  onRender(context){ return this.fire('render',this.shape,context) }
  onRenderChildren(context){
    return Engine.scene
      .findBy('parent',this.transform)
      .map((object)=>Render.Entity(object,context))
  }
}