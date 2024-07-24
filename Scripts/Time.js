class Time {
  static #delta = 0
  static #fixedDelta = 0
  
  static get deltaTime(){ return this.#delta }
  static set deltaTime(value){ this.#delta = value }
  
  static get fixedDeltaTime(){ return this.#fixedDelta }
  static set fixedDeltaTime(value){ this.#fixedDelta = value }
  
  static update(){
    this.#delta = performance.now - this.#delta
  }
  
  static fixedUpdate(){
    this.#fixedDelta = performance.now - this.#fixedDelta
  }
}