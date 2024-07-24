const PointOperation = (...args) => {
  let [a,b] = args
  if( Array.isArray(a) )
    return PointOperation(...a)
  if( a instanceof Point )
    return a.xy
  if( b === undefined )
    return [a,a]
  return [a,b]
};

const RectOperation = (...args) => {
  let [a,b,c,d] = args
  if( Array.isArray(a) )
    return RectOperation(...a)
  if( a instanceof Rect )
    return a.xywh
  if( a instanceof Point ){
    if( b instanceof Point )
      return [...a.xy, ...b.xy]
    if( c === undefined )
      return [...a.xy, b, b]
    return [...a.xy, b, c]
  }
  if( c instanceof Point )
    return [a,b,...c.xy]
  return [a,b,c,d]
};

const CircleOperation = (...args) => {
  let [a,b,c] = args
  if( Array.isArray(a) )
    return CircleOperation(...a)
  if( a instanceof Circle )
    return a.xyr
  if( a instanceof Point )
    return [...a.xy, b]
  if( b instanceof Point )
    return [a, ...b.xy]
  return [a,b,c]
};

const EllipseOperation = (...args) => {
  let [a,b,c,d] = args
  if( Array.isArray(a) )
    return EllipseOperation(...a)
  if( a instanceof Ellipse )
    return a.xyrr
  if( a instanceof Circle )
    return a.xyr
  if( a instanceof Point ){
    if( b instanceof Point )
      return [...a.xy, ...b.xy]
    if( c === undefined )
      return [...a.xy, b, b]
    return [...a.xy, b, c]
  }
  if( c instanceof Point )
    return [a, b, ...c.xy]
  return [a,b,c,d]
};