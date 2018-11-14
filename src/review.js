class Review {
  constructor(params){
    this.id = params.id
    this.reviewer = params.reviewer
    this.comments = params.comments
    this.rating = params.rating
  }

  editForm() {
    return document.querySelector(`#review-${this.id}-form`)
  }

  static buildReviews(reviewsJson) {
    return reviewsJson.map(reviewData => {
      return new Review(reviewData)
    })
  }

  static clearForm(inputArray) {
    inputArray.forEach(input => {
      input.value = ""
    })
  }

  reviewInnerElement() {
    const innerWrapper = document.createElement('div')
    innerWrapper.id = "innerWrapper"

    innerWrapper.innerHTML = `
      "${this.comments}"<br>
      - ${this.reviewer}<br>
      Rating: ${this.rating}
    `
    const deleteBtn = document.createElement('BUTTON')
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener('click', this.onDeleteClick.bind(this))
    innerWrapper.appendChild(deleteBtn)

    const editButton = document.createElement('BUTTON')
    editButton.innerText = "Edit"
    innerWrapper.appendChild(editButton)

    editButton.addEventListener('click', this.onEditClick.bind(this))
    innerWrapper.appendChild(this.renderEditForm())

    return innerWrapper
  }

  onEditClick(){
    if (this.editForm().style.display === "none") {
      this.editForm().style.display = "block"
      event.target.innerText = "Cancel"
    } else {      
      this.editForm().style.display = "none"
      event.target.innerText = "Edit"
    }
  }

  createReviewElement(reviewListId) {
    const review = document.createElement('li')
    review.id = `review-${this.id}`

    review.appendChild(this.reviewInnerElement())

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

  renderEditForm() {
    const form = document.createElement('form')
    form.id = `review-${this.id}-form`
    form.style = "display:none"

    const commentLabel = document.createElement('label')
    commentLabel.innerText = "Comment: "
    const commentField = document.createElement('input')
    commentField.type = "text"
    commentField.placeholder = "Your Comment Here..."
    commentField.value = this.comments
    commentLabel.appendChild(commentField)

    form.appendChild(commentLabel)

    const reviewerLabel = document.createElement('label')
    reviewerLabel.innerText = "Reviewer: "
    const reviewerField = document.createElement('input')
    reviewerField.type = "text"
    reviewerField.placeholder = "Your Name Here..."
    reviewerField.value = this.reviewer
    reviewerLabel.appendChild(reviewerField)

    form.appendChild(reviewerLabel)

    const ratingLabel = document.createElement('label')
    ratingLabel.innerText = "Rating: "
    const ratingField = document.createElement('input')
    ratingField.type = "number"
    ratingField.min = "1"
    ratingField.max = "5"
    ratingField.placeholder = "Your Comment Here..."
    ratingField.value = this.rating
    ratingLabel.appendChild(ratingField)

    form.appendChild(ratingLabel)

    const reviewButton = document.createElement('input')
    reviewButton.type = "submit"
    reviewButton.value = "Submit"

    form.appendChild(reviewButton)

    form.addEventListener('submit', this.onEditSubmit.bind(this))
    
    return form
  }

  onEditSubmit() {
    event.preventDefault()
    
    const comment = this.editForm().children[0].children[0].value
    const reviewer = this.editForm().children[1].children[0].value
    const rating = this.editForm().children[2].children[0].value
    const review = new Review({id: this.id, comments: comment, reviewer: reviewer, rating:rating})
    
    const fetchString = `${BASE_URL}/reviews/${review.id}`

    fetch(fetchString, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    })
      .then(response => response.json())
      .then(reviewJson => {
        const newReview = new Review(reviewJson)
        const reviewElement = newReview.editForm().parentElement.parentElement
        MountainClimber.clearChildren(reviewElement)
        reviewElement.appendChild(newReview.reviewInnerElement())
      })
  }
}
