const EVENT_ACTIONS = 'actionMap'
const EVENT_CONDITIONS = 'conditionMap'

class FK_EventListener {
  
  constructor(){
    this[EVENT_ACTIONS] = new Map()
    this[EVENT_CONDITIONS] = new Map()
  }
  
  #keys(key,filter){
    const keys = [...this[key].keys()]
    return typeof filter === 'function' ? keys.filter(filter) : keys
  }
  
  #get(key,name){
    if( (key in this) && this[key].has(name) )
      return this[key].get(name)
    return null
  }
  
  #add(key,name,func){
    if( !(key in this) ) return this
    if( name === undefined ) return this
    if( func === undefined ) return this
    if( this[key].has(name) ){
      this[key].get(name).push(func)
      return this
    }
    this[key].set(name,[func])
    return this
  }
  
  #remove(key,name,func){
    if( this[key].has(name) ){
      let list = this[key].get(name)
      if( func ){
        this[key].set(name,list.filter(f=>f!==func))
        return this
      }
      this[key].remove(name)
      return this
    }
    if( name === func === undefined )
      this[key].clear()
    return this
  }
  
  #execute(key,name,...args){
    let result = []
    if( !(key in this) ) return result
    if( this[key].has(name) ){
      const list = this[key].get(name)
      if( typeof list === 'function' )
        result = list(...args)
      else
        result = list.map((func) => func(...args))
    }
    return result
  }
  
  #check(key,name,...args){
    let result = false
    if( !(key in this) ) return result
    if( this[key].has(name) ){
      const list = this[key].get(name)
      result = list.map(o=>o(...args))
    }
    return result
  }
  
  actions(filter){ return this.#keys(EVENT_ACTIONS,filter) }
  action(name){ return this.#get(EVENT_ACTIONS,name) }
  addAction(name,func){ return this.#add(EVENT_ACTIONS,name,func) }
  removeAction(name,func){ return this.#remove(EVENT_ACTIONS,name,func) }
  fireAction(name,...args){ return this.#execute(EVENT_ACTIONS,name,...args) }
  
  conditions(filter){ return this.#keys(EVENT_CONDITIONS,filter) }
  condition(name){ return this.#get(EVENT_CONDITIONS,name) }
  addCondition(...args){ return this.#add(EVENT_CONDITIONS,...args) }
  removeCondition(name){ return this.#remove(EVENT_CONDITIONS,name) }
  fireCondition(name,...args){ return this.#check(EVENT_CONDITIONS,name,...args) }
  
  check(name,condition,action){
    if( this.fireCondition(name,...condition)[0] )
      return this.fireAction(name,...action)
    return false
  }
}