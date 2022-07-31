import React from "react";
import Form from "./Form";
import "./App.css";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {},
    };
  }

  handleTakePhoto = dataUri => {
    const photo = {
      content: dataUri,
    };

    fetch("/api/ocr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(photo),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Error: " + response.error);
          return;
        }
        console.log(response);
        this.setState({ report: response });
      });

    console.log(dataUri.length);
  };

  render() {
    const { report } = this.state;
    return (
      <>
        <Camera
          onTakePhoto={this.handleTakePhoto}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          imageType={IMAGE_TYPES.JPG}
          //isMaxResolution={true}
          isSilentMode={true}
        />
        <Form report={report} />
        <img src={this.state.photo} alt="" />
      </>
    );
  }
}
export default App;