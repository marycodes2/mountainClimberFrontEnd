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
    this.reviews = Review.buildReviews(params.reviews)
  }

  static buildRoutes(routesJson) {
    return routesJson.map(routeData => {
      return new Route(routeData)
    })
  }

  createRouteElement(location, routeListId) {
    const route = document.createElement('li')
    route.id = "route-" + this.id
    route.className = "card col-lg-3"
    route.innerHTML = `
      ${this.name}<br />
      Grade: ${this.rating}<br />
      Style: ${this.routeType}<br />
      Pitches: ${this.pitches}<br />
      <img src=${this.imgMedium} class="routeImg">
    `
    document.getElementById(routeListId).appendChild(route)

    const reviewForm = document.createElement('form')
    reviewForm.dataset.route_id = this.id

    const commentLabel = document.createElement('label')
    commentLabel.innerText = "Comment: "
    const commentField = document.createElement('input')
    commentField.type = "text"
    commentField.placeholder = "Your Comment Here..."
    commentLabel.appendChild(commentField)

    const reviewerLabel = document.createElement('label')
    reviewerLabel.innerText = "Reviewer: "
    const reviewerField = document.createElement('input')
    reviewerField.type = "text"
    reviewerField.placeholder = "Your Name Here..."
    reviewerLabel.appendChild(reviewerField)

    const ratingLabel = document.createElement('label')
    ratingLabel.innerText = "Rating: "
    const ratingField = document.createElement('input')
    ratingField.type = "number"
    ratingField.min = "1"
    ratingField.max = "5"
    // ratingField.placeholder = "Your Comment Here..."
    ratingLabel.appendChild(ratingField)

    const reviewButton = document.createElement('input')
    reviewButton.type = "submit"
    reviewButton.value = "Submit"


    reviewForm.appendChild(commentLabel)
    reviewForm.appendChild(reviewerLabel)
    reviewForm.appendChild(ratingLabel)
    reviewForm.appendChild(reviewButton)

    route.appendChild(reviewForm)

    reviewForm.addEventListener('submit', event => {
      Review.onReviewSubmit(event)
    })

    const reviewsLi = document.createElement('ul')
    reviewsLi.id = `route-${this.id}-reviews`
    reviewsLi.className = 'review-list'
    route.appendChild(reviewsLi)

    this.reviews.forEach(review => {
      review.createReviewElement(reviewsLi.id)
    })

  }
}
