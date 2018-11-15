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
    //div that contains the col, append to location row
    const routeDiv = document.createElement('div')
    routeDiv.id = "route-" + this.id
    // routeDiv.className = "col-3"

    //div that contains card, append to route div
    const routeCard = document.createElement('div')
    routeCard.className = "card"
    routeDiv.appendChild(routeCard)

    //image
    const image = document.createElement('img')
    image.className = "card-img-top"
    image.src = this.imgMedium
    routeCard.appendChild(image)

    const cardBody = document.createElement('div')
    cardBody.className = "card-body"
    routeCard.appendChild(cardBody)

    const cardTitle = document.createElement('h5')
    cardTitle.className = "card-title"
    cardTitle.innerText = this.name
    cardBody.appendChild(cardTitle)

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.innerHTML = `<i>Grade:</i> ${this.rating}<br>
                          <i>Style:</i> ${this.routeType}<br>
                          <i>Pitches: </i>${this.pitches} `
    cardBody.appendChild(cardText)

    return routeDiv


  //   const reviewForm = document.createElement('form')
  //   reviewForm.dataset.route_id = this.id
  //
  //   const commentLabel = document.createElement('label')
  //   // commentLabel.innerText = "Comment: "
  //   const commentField = document.createElement('input')
  //   commentField.type = "text"
  //   commentField.placeholder = "Your Comment Here..."
  //   commentLabel.appendChild(commentField)
  //
  //   const reviewerLabel = document.createElement('label')
  //   // reviewerLabel.innerText = "Reviewer: "
  //   const reviewerField = document.createElement('input')
  //   reviewerField.type = "text"
  //   reviewerField.placeholder = "Your Name Here..."
  //   reviewerLabel.appendChild(reviewerField)
  //
  //   const ratingLabel = document.createElement('label')
  //   ratingLabel.innerText = "Rating: "
  //   const ratingField = document.createElement('input')
  //   ratingField.type = "number"
  //   ratingField.min = "1"
  //   ratingField.max = "5"
  //   // ratingField.placeholder = "Your Comment Here..."
  //   ratingLabel.appendChild(ratingField)
  //
  //   const reviewButton = document.createElement('input')
  //   reviewButton.type = "submit"
  //   reviewButton.value = "Submit"
  //
  //
  //   reviewForm.appendChild(commentLabel)
  //   reviewForm.appendChild(reviewerLabel)
  //   reviewForm.appendChild(ratingLabel)
  //   reviewForm.appendChild(reviewButton)
  //
  //   route.appendChild(reviewForm)
  //
  //   reviewForm.addEventListener('submit', event => {
  //     Review.onReviewSubmit(event)
  //   })
  //
  //   const reviewsLi = document.createElement('ul')
  //   reviewsLi.id = `route-${this.id}-reviews`
  //   reviewsLi.className = 'review-list'
  //   route.appendChild(reviewsLi)
  //
  //   this.reviews.forEach(review => {
  //     review.createReviewElement(reviewsLi.id)
  //   })
  //
  }
}
