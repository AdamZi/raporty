import React from "react";
import Form from "./Form";
import { Header } from "./Header";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        date: new Date().toLocaleDateString("en-CA"),
        amount: "",
        busNumber: "",
      },
      reports: [],
      sum: 0,
    };
  }

  getSum = () => {
    const today = new Date();
    const fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const dates = {
      fromDate: fromDate.toISOString(),
      toDate: today.toISOString(),
    };

    fetch("/api/get-sum", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dates),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Error: ", response.error);
        }
        console.log(response);
        if (response.length) {
          this.setState({ sum: response[0].sum });
        }
      });
  };

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
        // console.log(response);
        this.setState({ report: response });
      });

    console.log(dataUri.length);
  };

  componentDidMount() {
    this.getSum();
  }

  render() {
    const { report } = this.state;
    console.log(report);
    return (
      <>
        <Header></Header>
        <div className="md:container md:mx-auto max-w-sm">
          <Camera
            onTakePhoto={this.handleTakePhoto}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            imageType={IMAGE_TYPES.JPG}
            //isMaxResolution={true}
            isSilentMode={true}
          />
          <Form report={report} handleSubmit={this.getSum} />
          <label>Suma: </label> <output>{this.state.sum}</output>
        </div>
      </>
    );
  }
}
export default App;
