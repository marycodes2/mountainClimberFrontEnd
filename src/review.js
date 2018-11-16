class Review {
  constructor(params){
    this.id = params.id
    this.reviewer = params.reviewer
    this.comments = params.comments
    this.rating = params.rating
    this.errors = params.errors
    this.route_id = params.route_id
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
      <blockquote>"${this.comments}"<br />
      <small>Reviewer's Rating: ${this.rating}</small>
      <cite>${this.reviewer}</cite>
      </blockquote>
      <br />
    `
    const buttonGroup = document.createElement('div')
    buttonGroup.className = "expanded button-group"
    innerWrapper.appendChild(buttonGroup)

    const deleteBtn = document.createElement('BUTTON')
    deleteBtn.innerText = "Delete"
    deleteBtn.className = "alert button"
    deleteBtn.addEventListener('click', this.onDeleteClick.bind(this))
    buttonGroup.appendChild(deleteBtn)

    const editButton = document.createElement('BUTTON')
    editButton.innerText = "Edit"
    editButton.className = "success button"
    buttonGroup.appendChild(editButton)

    editButton.addEventListener('click', this.onEditClick.bind(this))
    innerWrapper.appendChild(this.renderEditForm())

    return innerWrapper
  }

  onEditClick(){
    if (this.editForm().style.display === "none") {
      this.editForm().style.display = "block"
      event.target.innerText = "Cancel"
      event.target.className = "secondary button"
    } else {
      this.editForm().style.display = "none"
      event.target.innerText = "Edit"
      event.target.className = "success button"
    }
  }

  createReviewElement() {

    const review = document.createElement('div')
    review.id = `review-${this.id}`

    review.appendChild(this.reviewInnerElement())
    review.appendChild(document.createElement('hr'))

    return review
  }

  onDeleteClick(event) {
    fetch(`${BASE_URL}/reviews/${this.id}`,
    {method: "DELETE"})
    .then(this.deleteFromPage())
  }

  deleteFromPage() {
    const reviewId = `review-${this.id}`
    document.getElementById(reviewId).remove()

    if(document.getElementById(`route-${this.id}-reviews`).children.length === 0){
      document.getElementById(`route-${this.route_id}`).querySelector(".review_header").style.display = "none"
      document.getElementById(`route-${this.route_id}`).querySelectorAll(".card-section")[1].style.display = "none"

    }
  }

  static onReviewSubmit(event) {
    event.preventDefault()

    if (event.target.querySelector("#form_errors")) {
      event.target.querySelector("#form_errors").remove()
    }

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

        const errors = newReview.checkValidity()

        if (errors.length < 1) {
          // Find the div item we want to append to
          //Append
          document.getElementById(reviewsList).appendChild(newReview.createReviewElement())
          document.getElementById(`route-${newReview.route_id}`).querySelector(".review_header").style.display = "block"
          document.getElementById(`route-${newReview.route_id}`).querySelectorAll(".card-section")[1].style.display = "block"

        } else {
          const thisForm = document.querySelector("#route-" + newReview.route_id).querySelector('form')

          thisForm.children[0].children[0].value = newReview.comments
          thisForm.children[1].children[0].value = newReview.reviewer
          thisForm.children[2].children[0].value = newReview.rating

          thisForm.appendChild(Review.errorMessages(errors))
        }
      })
  }

  static errorMessages(errors) {
    const errorList = document.createElement('ul')
    errorList.id = "form_errors"


    for(const error of errors) {
      if(error.comments) {
        const message = document.createElement('li')
        message.innerText = `Comments ${error.comments}`
        errorList.appendChild(message)
      }

      if(error.reviewer) {
        const message = document.createElement('li')
        message.innerText = `Reviewer ${error.reviewer}`
        errorList.appendChild(message)
      }

      if(error.rating) {
        const message = document.createElement('li')
        message.innerText = `Rating ${error.rating}`
        errorList.appendChild(message)
      }
    }

    return errorList
  }

  checkValidity() {

    const errorArray = []

    if (this.errors.rating) {
      errorArray.push({rating: this.errors.rating})
    }

    if (this.errors.comments) {
      errorArray.push({comments: this.errors.comments})
    }

    if (this.errors.reviewer) {
      errorArray.push({reviewer: this.errors.reviewer})
    }
    return errorArray
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
    reviewButton.className = "expanded button"

    form.appendChild(reviewButton)

    form.addEventListener('submit', this.onEditSubmit.bind(this))

    return form
  }

  onEditSubmit() {
    event.preventDefault()

    if (document.querySelector("#review-" + this.id).querySelector("#form_errors")) {
      document.querySelector("#review-" + this.id).querySelector("#form_errors").remove()
    }

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
        const errors = newReview.checkValidity()

        if (errors.length < 1) {
          const reviewElement = newReview.editForm().parentElement.parentElement
          MountainClimber.clearChildren(reviewElement)
          reviewElement.appendChild(newReview.reviewInnerElement())
        } else {
          const thisForm = document.querySelector("#review-" + newReview.id)

          thisForm.appendChild(Review.errorMessages(errors))
        }

      })
  }
}
