const extend = (...chain) => Object.assign({},...chain)
const implement = (target,...chain) => Object.defineProperties(target,extend(...chain))

const IPosition = {
  'left': { 
    get(){ return this.x },
    set(value){ this.x = value }
  },
  'top': {
    get(){ return this.y },
    set(value){ this.y = value }
  },
  'bounds': {
    get(){ return {left:this.left,top:this.top} },
    set(value){ 
      [l,t] = PointOperation(value)
      this.x = l
      this.y = t
    }
  },
};

const IContain = {
  'outsideX':{
    value: function(value){ return value < this.left || value > this.right }
  },
  'outsideY':{
    value: function(value){ return value < this.top || value > this.bottom }
  },
  'outside':{
    value: function(...args){
      [x,y] = PointOperation(args)
      return this.outsideX(x) && this.outsideY(y)
    }
  },
  'containsX':{
    value: function(value){ return !this.outsideX(value) }
  },
  'containsY':{
    value: function(value){ return !this.outsideY(value) }
  },
  'contains':{
    value: function(...args){ 
      let [x,y] = PointOperation(args)
      return !(this.outsideX(x) || this.outsideY(y))
    }
  }
};

const IContainRadius = {
  'contains':{
    configurable: true,
    value: function(...args){ 
      let [x,y] = PointOperation(args)
      return this.dist(x,y) < this.radius
    }
  }
}

const IContainRadiusY = {
  'contains':{
    configurable: true,
    value: function(...args){ 
      let [x,y] = PointOperation(args)
      return this.dist(x,0) < this.radius && 
        this.dist(0,y) < this.radiusY 
    }
  }
}

const IContainSphere = {
  'contains':{
    configurable: false,
    value: function(...args){ 
      let [x,y,z] = PositionOperation(args)
      return this.dist(x,0,0) < this.radius && 
        this.dist(0,y,0) < this.radiusY &&
        this.dist(0,0,z) < this.radiusZ
    }
  }
}

const IDimension = extend(IPosition,{
  'right': {
    configurable: true,
    get(){ return this.x + this.width },
    set(value){ this.x = value - this.width }
  },
  'bottom': { 
    configurable: true,
    get(){ return this.y + this.height },
    set(value){ this.y = value - this.height }
  },
  'bounds': {
    configurable: true,
    get(){ 
      return {
        top:this.top,
        left:this.left,
        bottom:this.bottom,
        right:this.right,
        width:this.width,
        height:this.height
      }
    },
    set(value){ 
      let [l,t,r,b] = RectOperation(value)
      super.bounds = new Point(l,t)
      this.width = r - l
      this.height = b - t
    }
  },
  'size': {
    configurable: false,
    get(){ return new Point(this.width,this.height) },
    set(value){
      let [x,y] = PointOperation(value)
      this.width = x
      this.height = y
    }
  },
  'center':{
    configurable: false,
    get(){ return this.size.mult(.5).add(this.x,this.y) }
  }
})

const IRect = extend(IDimension,IContain)

const ICircle = extend(IPosition,IContain,IContainRadius,{
  'width':{
    configurable: false,
    get(){ return this.radius + this.radius },
    set(value){ this.radius = value * .5 }
  },
  'height':{
    get(){ return this.radius + this.radius },
    set(value){ this.radius = value * .5 }
  },
  'left': { 
    configurable: false,
    get(){ return this.x - this.radius },
    set(value){ this.x = value + this.radius }
  },
  'right': { 
    configurable: false,
    get(){ return this.x + this.radius },
    set(value){ this.x = value - this.radius }
  },
  'top': { 
    get(){ return this.y - this.radius },
    set(value){ this.y = value + this.this.radius }
  },
  'bottom': { 
    get(){ return this.y + this.radius },
    set(value){ this.y = value - this.this.radius }
  },
  'bounds': {
    get(){ 
      return {
        left:this.left,
        top:this.top,
        right:this.right,
        bottom:this.bottom,
        width:this.width,
        height:this.height
      }
    },
    set(value){ 
      let [l,t,r,b] = RectOperation(value)
      this.set(
        l+this.radius,
        t+this.radius,
        (r-l)*.5
      )
    }
  },
  'size': {
    get(){ return new Point(this.width,this.height) },
    set(value){
      let [x,y] = PointOperation(value)
      this.width = x
      this.height = y
    }
  },
  'center':{
    get(){ return this.copy() }
  },
})

const IEllipse = extend(ICircle,IContainRadiusY,{
  'height':{
    configurable: false,
    get(){ return this.radiusY + this.radiusY },
    set(value){ this.radiusY = value * .5 }
  },
  'top': { 
    configurable: false,
    get(){ return this.y - this.radiusY },
    set(value){ this.y = value + this.this.radiusY }
  },
  'bottom': { 
    configurable: false,
    get(){ return this.y + this.radiusY },
    set(value){ this.y = value - this.this.radiusY }
  },
  'bounds': {
    configurable: false,
    get(){
      return {
        left:this.left,
        top:this.top,
        right:this.right,
        bottom:this.bottom,
        width:this.width,
        height:this.height
      }
    },
    set(value){ 
      let [l,t,r,b] = RectOperation(value)
      this.set(
        l+this.radiusX,
        t+this.radiusY,
        (r-l)*.5,
        (b-t)*.5
      )
    }
  },
  'size': {
    get(){ return new Point(this.width,this.height) },
    set(value){
      let [x,y] = PointOperation(value)
      this.width = x
      this.height = y
    }
  }
})

const IText = extend(IRect,{
  
})