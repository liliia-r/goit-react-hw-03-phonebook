import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class Phonebook extends Component {
  state = {
    name: "",
    number: "",
  };

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handlerSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.props.onHandlerSubmit(contact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form className="PhonebookForm" onSubmit={this.handlerSubmit}>
          <h2>Phonebook</h2>

          <label htmlFor="name" className="Label">
            Name
            <input
              className="PhonebookForm__name"
              type="text"
              id={name}
              name="name"
              value={name}
              onChange={this.handlerChange}
            />
          </label>

          <label htmlFor="number">
            Number
            <input
              className="PhonebookForm__number"
              type="text"
              id={number}
              name="number"
              value={number}
              onChange={this.handlerChange}
            />
          </label>

          <button className="PhonebookForm__btn" type="submit">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default Phonebook;
