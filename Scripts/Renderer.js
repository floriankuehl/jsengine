const POINT_SIZE = 1

class Render {
  static Entity(object,context){
    return [
      'save',
      this.Transform(object.transform),
      object.before,
      ...object.onRender(context),
      object.after,
      ...object.onRenderChildren(context),
      'restore'
    ]
  }
  
  static Point(object,context){
    return [
      'beginPath',
      {
        fillRect: [
          ...FK_Screen.pixel(object).array,
          POINT_SIZE, POINT_SIZE
        ]
      },
      'closePath'
    ]
  }

  static Transform(object,context){
    return [
      {
        translate: [
          FK_Screen.pixelX(object.left),
          FK_Screen.pixelY(object.top)
        ]
      },
      {
        rotate: [ object.rotation * ANGLE_MODE ]
      },
      {
        scale: [
          object.scale instanceof Point ? object.scale.x : object.scale, 
          object.scale instanceof Point ? object.scale.y : object.scale
        ]
      }
    ]
  }

  static Rect(object,context){
    return [
      'beginPath',
      {
        moveTo: [
          FK_Screen.pixelX(object.left),
          FK_Screen.pixelY(object.top)
        ]
      },
      {
        lineTo: [
          FK_Screen.pixelX(object.right),
          FK_Screen.pixelY(object.top)
        ]
      },
      {
        lineTo: [
          FK_Screen.pixelX(object.right),
          FK_Screen.pixelY(object.bottom)
        ]
      },
      {
        lineTo: [
          FK_Screen.pixelX(object.left),
          FK_Screen.pixelY(object.bottom)
        ]
      },
      {
        lineTo: [
          FK_Screen.pixelX(object.left),
          FK_Screen.pixelY(object.top)
        ]
      },
      'closePath',
    ]
  }

  static Circle(object,context){
    return [
      'beginPath',
      {
        arc: [
          FK_Screen.pixelX(object.x), 
          FK_Screen.pixelY(object.y),
          FK_Screen.pixelX(object.radius),
          0 * ANGLE_MODE, 
          360 * ANGLE_MODE,
          false
        ]
      },
      'closePath'
    ]
  }

  static Ellipse(object,context){
    return [
      'beginPath',
      {
        ellipse: [
          FK_Screen.pixelX(object.x),
          FK_Screen.pixelY(object.y),
          FK_Screen.pixelX(object.radius),
          FK_Screen.pixelY(object.radiusY),
          0 * ANGLE_MODE, 
          360 * ANGLE_MODE,
          false
        ]
      },
      'closePath'
    ]
  }

  static Text(object,context){
    
    const p = object.entity.parent
    if( p ){
      const 
        bounds = p.entity.shape.bounds,
        width = context.measureText(object.text)
      object.x = bounds.left + (bounds.width * .5)
      object.y = bounds.top + (bounds.height * .5)
      object.width = bounds.width
      object.height = bounds.height
    }
    
    const 
      args = [
        object.text,
        FK_Screen.pixelX(object.x),
        FK_Screen.pixelY(object.y),
        FK_Screen.pixelX(object.width),
        FK_Screen.pixelY(object.height)
      ],
      result = [
        /*
        {
          strokeRect:[
            FK_Screen.pixelX(object.x),
            FK_Screen.pixelY(object.y),
            FK_Screen.pixelX(object.width),
            FK_Screen.pixelY(object.height)
          ]
        }
        */
      ]
    if( object.fill ) result.push({fillText:args})
    if( object.stroke ) result.push({strokeText:args})
    return result
  }
  
  static Shape(object,context){
    const render = object.points.map((p,i)=>{
      return i === 0 ?
        {moveTo:FK_Screen.pixel(p).xy} :
        {lineTo:FK_Screen.pixel(p).xy}
    })
    return [
      'beginPath',
      ...render,
      'closePath'
    ]
  }
}
