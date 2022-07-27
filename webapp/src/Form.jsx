import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form>
        <input type="date" value="2022-07-27" />
        <input type="text" placeholder="wartość" />
        <input type="number" placeholder="autobus" />
        <input type="submit" />
      </form>
    );
  }
}

export default Form;
