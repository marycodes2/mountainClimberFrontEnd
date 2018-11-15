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

  createReviewElement(reviewListId) {
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

    const editButton = document.createElement('BUTTON')
    editButton.innerText = "Edit"
    review.appendChild(editButton)

    // editButton.addEventListener('click', this.onEditClick.bind(this))
    review.appendChild(this.renderEditForm())
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

  static onReviewSubmit(event) {
    event.preventDefault()

    const comment = event.target.children[0].children[0]
    const reviewer = event.target.children[1].children[0]
    const rating = event.target.children[2].children[0]
    const route_id = event.target.dataset.route_id

    const reviewData = {
      comments: comment.value,
      reviewer: reviewer.value,
      rating: rating.value,
      route_id: route_id
    }

    Review.createReview(reviewData)
    Review.clearForm([comment, reviewer, rating])
  }

  static createReview(data) {
    fetch(BASE_URL + `/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(reviewData => {
        const reviewsList = `route-${reviewData.route_id}-reviews`
        const newReview = new Review(reviewData)
        newReview.createReviewElement(reviewsList)
      })
  }

  static clearForm(inputArray) {
    inputArray.forEach(input => {
      input.value = ""
    })
  }

  onEditClick(event){

    //show form
  }

  renderEditForm() {
    const form = document.createElement('form')
    form.id = `review-${this.id}-form`

    // const reviewForm = document.createElement('form')
    // reviewForm.dataset.route_id = this.id
    //
    // const commentLabel = document.createElement('label')
    // commentLabel.innerText = "Comment: "
    // const commentField = document.createElement('input')
    // commentField.type = "text"
    // commentField.placeholder = "Your Comment Here..."
    // commentLabel.appendChild(commentField)
    //
    // const reviewerLabel = document.createElement('label')
    // reviewerLabel.innerText = "Reviewer: "
    // const reviewerField = document.createElement('input')
    // reviewerField.type = "text"
    // reviewerField.placeholder = "Your Name Here..."
    // reviewerLabel.appendChild(reviewerField)
    //
    // const ratingLabel = document.createElement('label')
    // ratingLabel.innerText = "Rating: "
    // const ratingField = document.createElement('input')
    // ratingField.type = "number"
    // ratingField.min = "1"
    // ratingField.max = "5"
    // ratingField.placeholder = "Your Comment Here..."
    // ratingLabel.appendChild(ratingField)
    //
    // const reviewButton = document.createElement('input')
    // reviewButton.type = "submit"
    // reviewButton.value = "Submit"
    //
    //
    // reviewForm.appendChild(commentLabel)
    // reviewForm.appendChild(reviewerLabel)
    // reviewForm.appendChild(ratingLabel)
    // reviewForm.appendChild(reviewButton)
    //
    // route.appendChild(reviewForm)
    //

  }
}
