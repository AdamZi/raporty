import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        date: new Date().toLocaleDateString("en-CA"),
        amount: "",
        busNumber: "",
      },
      oldProps: null,
    };
  }

  componentDidUpdate() {
    const report = this.props.report;
    if (this.state.oldProps !== report) {
      this.setState({ report: this.props.report, oldProps: report });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
      report.date = new Date().toLocaleDateString("en-CA");
    if (report.busNumber === "not recognized") report.busNumber = "";
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
