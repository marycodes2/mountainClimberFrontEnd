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
    const deleteBtn = document.createElement('BUTTON')
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener('click', this.onDeleteClick.bind(this))
    review.appendChild(deleteBtn)
    document.getElementById(reviewListId).appendChild(review)
  }

  onDeleteClick(event) {
    fetch(`${BASE_URL}/reviews/${this.id}`,
    {method: "DELETE"})
    .then(this.deleteFromPage())
  }

  deleteFromPage() {
    const reviewId = `review-${this.id}`
    document.getElementById(reviewId).remove()
  }


}
