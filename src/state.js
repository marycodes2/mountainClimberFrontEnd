class State {
  constructor(params) {
    this.id = params.id
    this.name = params.name
  }

  static renderAll(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => State.renderStates(data))
  }

  static renderStates(data) {
    const states = data.map(state => new State(state))
    states.forEach(state => state.renderState())
  }

  renderState() {
    const nameElement = document.createElement("h2")
    nameElement.innerText = this.name
    MountainClimber.mainWindow().appendChild(nameElement)
  }
}
