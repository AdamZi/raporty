import React from "react";

class Form extends React.Component {
  handleChange = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleChange}>
        <input type="date" defaultValue="2022-07-27" />
        <input type="text" placeholder="wartość" />
        <input type="number" placeholder="autobus" />
        <input type="submit" />
      </form>
    );
  }
}

export default Form;
