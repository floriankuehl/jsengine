function ProcessActions(target,...actions){
  actions.forEach(p=>{
    switch( typeof p ){
      case'string':{
        switch(typeof target[p]){
          case'function':{ target[p]() }break
        }
      }break
      case'object':{
        if( Array.isArray(p) && p.length > 0 ){
          target = ProcessActions(target,...p)
        } else {
          for( let k in p ){
            let v = p[k]
            switch(typeof target[k]){
              case'function':{
                target[k](...( Array.isArray(v) ? v : [v] ))
              }break
              case'object':{
                if( Array.isArray(v) && v.length > 0 )
                  target[k] = ProcessActions(target[k],...v)
                else if( typeof v === 'object' )
                  target[k] = ProcessActions(target[k],v)
              }break
              default:{ target[k] = v }break
            }
          }
        }
      }break
    }
  })
  return target
}