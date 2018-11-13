class Route {
  constructor(params) {
    this.id = params.id
    this.name = params.name
    this.rating = params.rating
    this.imgMedium = params.imgMedium
    this.latitude = params.latitude
    this.longitude = params.longitude
    this.pitches = params.pitches
    this.routeType = params.route_type
    this.reviews = []
  }

  static buildRoutes(routesJson) {
    return routesJson.map(routeData => {
      return new Route(routeData)
    })
  }

  createRouteElement(location, routeListId) {
    const route = document.createElement('li')
    route.id = "route-" + this.id
    route.innerHTML = `
      ${this.name}<br />
      Grade: ${this.rating}<br />
      Style: ${this.routeType}<br />
      Pitches: ${this.pitches}<br />
      <img src=${this.imgMedium} class="routeImg">
    `

    document.getElementById(routeListId).appendChild(route)
  }
}
