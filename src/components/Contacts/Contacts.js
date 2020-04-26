import React from "react";
import Contact from "../Contact/Contact";
import PropTypes from "prop-types";

const Contacts = ({ filteredContacts, onDeleteContact }) =>
  filteredContacts.length > 0 && (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact
            {...contact}
            onDeleteContact={() => onDeleteContact(contact.id)}
          />
        </li>
      ))}
    </ul>
  );

Contacts.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
