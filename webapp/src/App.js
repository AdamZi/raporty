import React from "react";
import Form from "./Form";
import "./App.css";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class App extends React.Component {
  render() {
    function handleTakePhoto(dataUri) {
      // Do stuff with the photo...
      console.log("takePhoto", dataUri.length);
    }

    return (
      <>
        <Camera
          onTakePhoto={dataUri => {
            handleTakePhoto(dataUri);
          }}
        />
        <Form />;
      </>
    );
  }
}
export default App;
