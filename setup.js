const isTest = false
const testFrames = 1

noise.seed(Math.random())
const noiseOffset = new Point(0,0)
const noiseSpeed = new Point(.000005,.000005)
const polyDemo = new FK_SceneShape(
  null, 
  .5, .5, 
  new Shape(
    0, 0, .4, 
    256,
    (i,r,a)=>{
      noiseOffset.add(noiseSpeed)
      const nx = noiseOffset.x + (Math.cos( a ) * .2)
      const ny = noiseOffset.y + (Math.sin( a ) * .2)
      return .1 + r * noise.simplex2(nx,ny) 
    }
  ),
  { strokeStyle:'#88bb88', lineWidth:5 },
  [
    { 
      lineJoin: 'round',
      lineCap: 'round'
    },
    'stroke'
  ]
)

const remoteCircle = new FK_SceneCircle(
  null, .5, .5, .01,
  { strokeStyle:'#ffffff', lineWidth:3 },
  'stroke',
  true
)

remoteCircle.estimatedRadius = remoteCircle.shape.radius
remoteCircle.speed = .06

remoteCircle.on('update',(object)=>{
  object.transform.set(Lerp.Point(object.transform,Engine.mouse,object.speed))
  object.shape.radius = Lerp.Number(
    object.shape.radius,
    object.estimatedRadius,
    object.speed
  )
})

remoteCircle.on('mouseenter',(object)=>{
  object.before.strokeStyle = '#880000'
})

remoteCircle.on('mouseleave',(object)=>{
  object.before.strokeStyle = '#ffffff'
})

remoteCircle.on('wheel',(object,delta)=>{
  object.estimatedRadius += (0.01*delta)
  if( object.estimatedRadius < 0.01 ) 
    object.estimatedRadius = 0.01
})

const scene = new FK_Scene()

scene.add(
  polyDemo,
  ...createButton('quad', 'Quadrat', .1, .1, .1),
  ...createButton('rect', 'Rechteck', .3, .1, .15, .1),
  ...createButton('circle', 'Kreis', .5, .1, .1),
  ...createButton('ellipse', 'Ellipse', .7, .1, .2,.1),
  remoteCircle
)

Engine.load(
  document.querySelector('canvas'),
  scene,
  isTest ? testFrames : Infinity,
  true
)