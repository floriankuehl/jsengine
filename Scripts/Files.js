class FK_File {
  
  static loadFile(fileName,read,process){
    if( process === undefined )
      process = r => r
    return new Promise((resolve,reject)=>{
      const r = new FileReader()
      r.addEventListener('load',process(r.result,resolve,reject))
      r.addEventListener('error',reject)
      read(r,fileName)
    })
  }
  
  static loadFiles(files,read,process){
    return Promise.all( files.map(f => this.loadFile(f,read,process)) )
  }
  
  static loadPixels(fileName){
    return this.loadFile(
      fileName,
      (r,f) => r.readAsArrayBuffer(f),
      (r,resolve,reject) => resolve( new Uint8Array(r) )
    )
  }
  
  static loadImage(fileName){
    return this.loadFile(
      fileName,
      (r,f) => r.readAsDataUrl(f),
      (r,resolve,reject) => {
        const img = new Image()
        img.onload = _=> resolve( FK_Image.fromImage(img) )
        img.src = fileName
      }
    )
  }
  
  
}