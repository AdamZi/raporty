import React from "react";
import Form from "./Form";
import "./App.css";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }

  handleTakePhoto = dataUri => {
    console.log(dataUri.length);
    this.setState({ photo: dataUri });
  };

  render() {
    return (
      <>
        <Camera
          onTakePhoto={this.handleTakePhoto}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          //isMaxResolution={true}
          isSilentMode={true}
        />
        <Form />
        <img src={this.state.photo} alt="" />
      </>
    );
  }
}
export default App;
