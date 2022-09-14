import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      oldProps: this.props.report,
    };
  }

  componentDidUpdate() {
    const { report } = this.props;
    if (this.state.oldProps !== report) {
      this.setState({ report: this.props.report, oldProps: report });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    const { report } = this.state;
    const date = new Date(report.date.replace("-", "/"));
    const reportToSend = {
      date: date.toISOString(),
      amount: report.amount.replace(",", "."),
      busNumber: report.busNumber,
    };
    fetch("api/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reportToSend),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Error: " + response.error);
          return;
        }
        console.log(response);
      });
    //console.log(reportToSend, "sss");
    this.setState({
      report: {
        ...report,
        amount: "",
        busNumber: "",
      },
    });
  };

  handleChange = e => {
    const report = this.state.report;
    this.setState({
      report: {
        ...report,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { report } = this.state;
    if (report.date === "not recognized")
      report.date = new Date().toLocaleDateString("en-gb");
    if (report.busNumber === "not recognized") report.busNumber = "";
    if (report.amount === "not recognized") report.amount = "";
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="date"
          name="date"
          onChange={this.handleChange}
          value={report.date}
        />
        <input
          type="text"
          name="amount"
          onChange={this.handleChange}
          value={report.amount}
          placeholder="wartość"
        />
        <input
          type="number"
          name="busNumber"
          onChange={this.handleChange}
          value={report.busNumber}
          placeholder="autobus"
        />
        <input type="submit" />
      </form>
    );
  }
}

export default Form;
