class Text extends Rect {
  constructor(x,y,w,h,text,fill,stroke){
    super(x,y,w,h)
    this.text = text
    this.fill = !!fill
    this.stroke = !!stroke
  }
}