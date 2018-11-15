//DOM Content loaded and other event listeners
//set base URL constant
const BASE_URL = 'https://mountain-climber-back-end.herokuapp.com/api/v1/'
document.addEventListener('DOMContentLoaded', () => {
  console.log("loaded")
  const app = new MountainClimber()
  app.render()
})
