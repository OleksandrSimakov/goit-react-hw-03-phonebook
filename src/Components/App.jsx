import { Component } from 'react'
import ContactAddForm from './ContactAddForm/ContactAddForm'
import ContactListItem from './ContactListItem/ContactListItem'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { v4 as uuidv4 } from 'uuid'

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts
    const prevContacts = prevState.contacts

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts))
    }
  }

  addContact = ({ name, number }) => {
    const contactsHaveDuplicate = this.state.contacts.find(
      (contact) => contact.name === name,
    )
    contactsHaveDuplicate
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [
            ...prevState.contacts,
            { id: uuidv4(), name: name, number: number },
          ],
        }))
  }

  handleFilterChange = ({ target }) => {
    const filterInput = target.value
    this.setState({
      filter: filterInput,
    })
  }

  getFilteredNames = () => {
    const { filter, contacts } = this.state
    const normilizedFilterState = filter.toLowerCase()

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normilizedFilterState),
    )
  }

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId,
      ),
    }))
  }

  render() {
    const { filter } = this.state

    const filteredContactNames = this.getFilteredNames()

    return (
      <>
        <h2>Phonebook</h2>

        <ContactAddForm onSubmit={this.addContact} />

        <h2>Contacts</h2>

        <Filter
          filter={filter}
          handleFilterChange={this.handleFilterChange}
        ></Filter>

        <ContactList>
          {filteredContactNames.map(({ id, name, number }) => (
            <ContactListItem
              key={id}
              name={name}
              number={number}
              onDelBtnClick={() => this.deleteContact(id)}
            />
          ))}
        </ContactList>
      </>
    )
  }
}
