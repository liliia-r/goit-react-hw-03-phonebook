import React, { Component } from "react";
import Contacts from "./components/Contacts/Contacts";
import Phonebook from "./components/Phonebook/Phonebook";
import ContactsFilter from "./components/ContactsFilter/ContactsFilter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "./utils/storage";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleChangeFilter = (e) => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  addContact = (contact) => {
    const isExist = this.state.contacts.some(
      (savedContact) =>
        savedContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      toast.error(`${contact.name} is already in contacts.`);
      return;
    }
    if (contact.name.length > 2 && contact.number.length > 5) {
      this.setState((state) => ({
        contacts: [...this.state.contacts, contact],
      }));
    } else if (contact.name.length <= 2) {
      toast.warn("Small contact name!");
    } else if (contact.number.length <= 4) {
      toast.warn("Small contact number!");
    }
  };

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  async componentDidMount() {
    const savedContacts = storage.get("contacts");
    if (savedContacts) {
      this.setState({
        contacts: savedContacts,
      });
    }
  }

  updateStorage = (prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      storage.save("contacts", this.state.contacts);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    this.updateStorage(prevState);
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
      <>
        <Phonebook onHandlerSubmit={this.addContact} />
        <ToastContainer autoClose={5000} />
        {this.state.contacts.length >= 2 && (
          <ContactsFilter
            filter={filter}
            onHandleChangeFilter={this.handleChangeFilter}
          />
        )}
        <Contacts
          filteredContacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
