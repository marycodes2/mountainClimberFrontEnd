class Location {
  constructor(params) {
      this.id = params.id
      this.name = params.name
      this.routes = Route.buildRoutes(params.routes)
  }

  static buildLocations(locationsJson) {
    return locationsJson.map(locationData => {
      return new Location(locationData)
    })
  }

  createLocationElement(state, locationListId) {
    const locationDiv = document.createElement('div')
    locationDiv.id = `location-${this.id}`
    locationDiv.innerHTML = `<h4>${this.name}</h4>`

    //this is the div that contains all routes
    // const routeDiv = document.createElement('div')
    // routeDiv.className = 'grid-container'

    const gridSizeDiv = document.createElement('div')
    gridSizeDiv.className = "grid-x grid-padding-x small-up-1 medium-up-3"
    gridSizeDiv.id = locationDiv.id + "-routes"
    locationDiv.appendChild(gridSizeDiv)


    // locationDiv.appendChild(routeDiv)
    document.getElementById(locationListId).appendChild(locationDiv)

    // const locationLi = document.createElement('li')
    // locationLi.id = "location-" + this.id
    // locationLi.className = "location-list-item"
    //
    // // location name:
    // locationLi.innerText = this.name
    // const div = document.createElement('div')
    // div.className = "row"
    // locationLi.appendChild(div)
    //
    // document.getElementById(locationListId).appendChild(locationLi)
    //
    // const routeList = document.createElement('ul')
    // routeList.id = locationLi.id + "-routes"
    // routeList.className = "route-list-item row"
    //
    // const routeTitle = document.createElement('h4')
    // // routeTitle.innerText = "Routes:"
    //
    // locationLi.appendChild(routeTitle)
    // locationLi.appendChild(routeList)
    //
    this.routes.forEach(route => {
      gridSizeDiv.appendChild(route.createRouteElement(this, gridSizeDiv.id))
    })

  }
}
