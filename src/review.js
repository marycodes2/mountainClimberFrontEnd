class Review {
  constructor(params){
    this.id = params.id
    this.reviewer = params.reviewer
    this.comments = params.comments
    this.rating = params.rating
  }

  static buildReviews(reviewsJson) {
    return reviewsJson.map(reviewData => {
      return new Review(reviewData)
    })
  }

  createReviewElement(route, reviewListId) {
    const review = document.createElement('li')
    review.id = `review-${this.id}`
    review.innerHTML = `
      "${this.comments}"<br>
      - ${this.reviewer}<br>
      Rating: ${this.rating}
    `
    document.getElementById(reviewListId).appendChild(review)
  }
}
