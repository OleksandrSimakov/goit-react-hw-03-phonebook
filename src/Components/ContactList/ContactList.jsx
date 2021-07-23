import ContactListEl from './ContactList.styled'
import PropTypes from 'prop-types'

function ContactList({ children }) {
  return <ContactListEl>{children}</ContactListEl>
}

ContactList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

export default ContactList
