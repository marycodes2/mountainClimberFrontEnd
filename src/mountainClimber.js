//MountClimber is a class for our webpage
class MountainClimber {
  render(){
    State.renderAll()
  }
  static mainWindow() {
    return document.getElementById("mainWindow")
  }

  static clearChildren(node) {
    while(node.hasChildNodes()) {
      node.removeChild(node.lastChild)
    }
  }
}
