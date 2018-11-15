class State {
  constructor(params) {
    this.id = params.id
    this.name = params.name
    this.locations = Location.buildLocations(params.locations)
  }

  static renderAll(){
    fetch(`${BASE_URL}/locations`)
    .then(resp => resp.json())
    .then(data => State.renderStates(data))
  }

  static renderStates(data) {
    const states = data.map(state => new State(state))
    states.forEach(state => state.renderStateAndLocations())
  }

  renderStateAndLocations() {
    const stateId = "state-" + this.id

    const stateDiv = document.createElement('div')
    stateDiv.className = 'grid-x grid-margin-x'
    stateDiv.id = stateId
    const nameElement = document.createElement("h2")
    nameElement.innerText = this.name

    stateDiv.appendChild(nameElement)

    const locationsList = document.createElement('ul')
    const locationsListId = stateId + "-locations"
    locationsList.id = locationsListId

    stateDiv.appendChild(locationsList)

    MountainClimber.mainWindow().appendChild(stateDiv)

    this.locations.forEach(location => {
      location.createLocationElement(this, locationsListId)
    })
  }
}
