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
    const locationLi = document.createElement('li')
    locationLi.id = "location-" + this.id
    locationLi.className = "location-list-item"
    locationLi.innerText = this.name

    document.getElementById(locationListId).appendChild(locationLi)

    const routeList = document.createElement('ul')
    routeList.id = locationLi.id + "-routes"
    routeList.className = "route-list-item"

    const routeTitle = document.createElement('h4')
    routeTitle.innerText = "Routes:"

    locationLi.appendChild(routeTitle)
    locationLi.appendChild(routeList)

    this.routes.forEach(route => {
      route.createRouteElement(this, routeList.id)
    })

  }
}
