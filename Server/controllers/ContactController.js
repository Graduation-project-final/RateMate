const { Contact } = require("../models");

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number } = req.body;

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone_number = phone_number || contact.phone_number;

    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact", error });
  }
};
