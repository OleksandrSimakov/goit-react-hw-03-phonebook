import React, { Component } from 'react'
import ContactAddFormEl from './ContactAddForm.styled'
import PropTypes from 'prop-types'

const styles = {
  input: {
    display: 'block',
    marginBottom: '10px',
    marginTop: '5px',
  },
  label: {
    marginBottom: '10px',
  },
  button: {
    width: '100px',
    fontSize: '12px',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid gray',
    cursor: 'pointer',
  },
}

export default class ContactAddForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    number: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      name: '',
      number: '',
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { name, number } = this.state
    return (
      <ContactAddFormEl onSubmit={this.handleSubmit}>
        <label style={styles.label}>
          Name
          <input
            style={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label style={styles.label}>
          Number
          <input
            style={styles.input}
            type="tel"
            name="number"
            required
            value={number}
            onChange={this.handleChange}
          ></input>
        </label>
        <button type="submit" style={styles.button}>
          Add Contact
        </button>
      </ContactAddFormEl>
    )
  }
}
