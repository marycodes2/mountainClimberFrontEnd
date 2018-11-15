//MountClimber is a class for our webpage
class MountainClimber {
  render(){
    console.log("rendered")
    State.renderAll()
  }
  static mainWindow() {
    return document.getElementById("mainWindow")
  }
}
