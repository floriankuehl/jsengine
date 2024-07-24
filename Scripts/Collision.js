class FK_Collision extends Event {
  constructor(a,b){
    this.source = a;
    this.collides = b;
  }
}

function pointCollision(a,b){
  if(a.x == b.x && a.y == b.y)
    return new FK_Collision(a,b);
}

function boxPointCollision(box,point){
  if( box.contains(point) )
    return new FK_Collision(box,point);
  return false;
}

function boxBoxCollision(a,b){
  if( 
    ( a.right >= b.left && a.left <= b.right ) &&
    ( a.bottom >= b.top && a.top <= b.bottom )
  ) return new FK_Collision(a,b);
  return false;
}

