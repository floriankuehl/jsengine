const ButtonStyles = {
  normal: {
    fillStyle: '#333333',
    strokeStyle: '#555555',
    lineWidth: 5
  },
  hover: {
    fillStyle: '#888888',
    strokeStyle: '#cccccc',
    lineWidth: 5
  },
  active: {
    fillStyle: '#cccccc',
    strokeStyle: '#008800',
    lineWidth: 5
  },
  activeHover: {
    fillStyle: '#ffffff',
    strokeStyle: '#00cc00',
    lineWidth: 5
  }
}

const ButtonLabelStyles = {
  normal: {
    font: '18px Verdana',
    fillStyle: '#ffffff',
    textAlign: 'center',
    textBaseline: 'middle'
  },
  hover: {
    font: '18px Verdana',
    fillStyle: '#00ffff',
    textAlign: 'center',
    textBaseline: 'middle'
  },
  active: {
    font: '18px Verdana',
    fillStyle: '#ffffff',
    textAlign: 'center',
    textBaseline: 'middle'
  },
  activeHover: {
    font: '18px Verdana',
    fillStyle: '#00ff00',
    textAlign: 'center',
    textBaseline: 'middle'
  }
}

function createButton(type,text,x,y,...args){
  let 
    result = false,
    textRect = new Rect(0,0,0,0)
  
  switch( type ){
    case'quad':{
      textRect.width = args[0]
      textRect.height = args[0]
      
      x -= args[0] * .5
      y -= args[0] * .5

      result = new FK_SceneRect(
        null,
        x, y, args[0], args[0],
        ButtonStyles.normal,
        ['fill','stroke'],
        true
      )
    }break
    case'rect':{
      textRect.width = args[0]
      textRect.height = args[1]
      
      x -= args[0] * .5
      y -= args[1] * .5
      
      result = new FK_SceneRect(
        null, 
        x, y, args[0], args[1],
        ButtonStyles.normal,
        ['fill','stroke'],
        true
      )
    } break
    case'circle':{
      textRect.width = args[0]
      textRect.height = args[0]
      args[0] *= .5
      result = new FK_SceneCircle(
        null, 
        x, y, args[0],
        ButtonStyles.normal,
        ['fill','stroke'],
        true
      )
    }break
    case'ellipse':{
      textRect.width = args[0]
      textRect.height = args[1]
      args[0] *= .5
      args[1] *= .5
      result = new FK_SceneEllipse(
        null, 
        x, y, args[0], args[1],
        ButtonStyles.normal,
        ['fill','stroke'],
        true
      )
    }break
  }
  
  if( !result ) return null
  result.type = type+'Btn'
  
  const textResult = new FK_SceneText(
    result.transform, 
    textRect.x, textRect.y,
    textRect.width, textRect.height,
    text,
    ButtonLabelStyles.normal
  )

  result.on('mouseenter',(object)=>{
    const style = object.active ? 'activeHover' : 'hover'
    object.before = ButtonStyles[ style ]
    textResult.before = ButtonLabelStyles[ style ]
  })
  
  result.on('mouseleave',(object)=>{
    const style = object.active ? 'active' : 'normal'
    object.before = ButtonStyles[ style ]
    textResult.before = ButtonLabelStyles[ style ]
  })
  
  result.on('click',(object)=>{
    const style = object.active ? 'hover' : 'activeHover'
    object.active = !object.active
    object.before = ButtonStyles[ style ]
    textResult.before = ButtonLabelStyles[ style ]
  })
  
  return [result,textResult]
}