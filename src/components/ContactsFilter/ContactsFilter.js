import React from "react";
import PropTypes from "prop-types";

const ContactsFilter = ({ filter, onHandleChangeFilter }) => {
  return (
    <>
      <h2>Contacts</h2>
      <label htmlFor="filter">
        Find contacts by name
        <input
          className="PhonebookForm__filter"
          type="text"
          id={filter}
          name="filter"
          value={filter}
          onChange={onHandleChangeFilter}
        />
      </label>
    </>
  );
};

ContactsFilter.propTypes = {
  filter: PropTypes.string,
  onHandleChangeFilter: PropTypes.func.isRequired,
};

export default ContactsFilter;
