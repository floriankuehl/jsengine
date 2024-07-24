class FK_SceneRect extends FK_Entity {
  constructor(parent,x,y,width,height,before,after,reactive){
    super(
      parent,
      x,y,
      implement(new Rect(0,0,width,height),IRect),
      before, after,
      reactive
    )
    this.on('render',(...args)=>Render.Rect(...args))
  }
}

class FK_SceneCircle extends FK_Entity {
  constructor(parent,x,y,radius,before,after,reactive){
    super(
      parent,
      x, y,
      implement(new Circle(0,0,radius),ICircle),
      before, after,
      reactive
    )
    this.on('render',(...args)=>Render.Circle(...args))
  }
}

class FK_SceneEllipse extends FK_Entity {
  constructor(parent,x,y,radiusX,radiusY,before,after,reactive){
    super(
      parent,
      x,y,
      implement(new Ellipse(0,0,radiusX,radiusY),IEllipse),
      before, after,
      reactive
    )
    this.on('render',(...args)=>Render.Ellipse(...args))
  }
}

class FK_SceneText extends FK_Entity {
  constructor(parent,x,y,width,height,text,before,after,reactive){
    super(
      parent,
      x,y,
      implement(new Text(0,0,width,height,text,true),IText),
      before, after, 
      reactive
    )
    this.on('render',(...args)=>Render.Text(...args))
  }
}

class FK_SceneShape extends FK_Entity {
  constructor(parent,x,y,shape,before,after,reactive){
    super(
      parent,
      x,y,
      implement(shape,ICircle),
      before, after,
      reactive
    )
    this.on('render',(...args)=>Render.Shape(...args))
  }
}