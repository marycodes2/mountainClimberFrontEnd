class State {
  constructor(params) {
    this.name = name
  }

  static renderAll(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => State.renderStates(data))
  }

  static renderStates(data) {
    data.map(state => new State(state))
  }
}
