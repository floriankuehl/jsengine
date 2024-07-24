class Lerp {
  
  static Number(start, end, amt){
    return (1-amt)*start+amt*end
  }
  
  static Point(start, end, amt){
    return new Point(
      this.Number(start.x,end.x,amt),
      this.Number(start.y,end.y,amt)
    )
  }
  
  static Rgb(start,end,amt){
    return new Rect(
      this.Number(start.r,end.r,amt),
      this.Number(start.g,end.g,amt),
      this.Number(start.b,end.b,amt)
    )
  }
  
  static Rgba(start,end,amt){
    return new Rect(
      this.Number(start.r,end.r,amt),
      this.Number(start.g,end.g,amt),
      this.Number(start.b,end.b,amt),
      this.Number(start.a,end.a,amt)
    )
  }
  
  static Rect(start,end,amt){
    return new Rect(
      this.Number(start.x,end.x,amt),
      this.Number(start.y,end.y,amt),
      this.Number(start.width,end.width,amt),
      this.Number(start.height,end.height,amt)
    )
  }
  
}