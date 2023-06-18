const Contact = require('../models/Contact');

// List contacts
// exports.list = async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     res.render('contacts', { contacts });
//   } catch (error) {
//     res.render('contacts', { error: 'Failed to fetch contacts' });
//   }
// };

exports.list = (req, res) => {
    const userId = req.session.userId; // Get the logged-in user's ID from the session
  
    Contact.find({ userId }) // Fetch only the contacts associated with the logged-in user
        .then((contacts) => {
            res.render('contacts', { contacts });
        })
        .catch((error) => {
            res.render('contacts', { error: 'Error retrieving contacts' });
        });
    };


// Add contact
// exports.add = async (req, res) => {
//   const { name, contactNo } = req.body;

//   try {
//     const contact = new Contact({ name, contactNo });
//     await contact.save();

//     res.redirect('/contacts');
//   } catch (error) {
//     res.redirect('/contacts');
//   }
// };


exports.add = (req, res) => {
    const { name, contactNo } = req.body;
    const userId = req.session.userId; // Get the logged-in user's ID from the session
  
    const contact = new Contact({
      name,
      contactNo,
      userId, // Associate the contact with the logged-in user
    });
  
    contact
      .save()
      .then(() => {
        res.redirect('/contacts');
      })
      .catch((error) => {
        res.render('contacts', { error: 'Error adding contact' });
      });
  };

// Delete contact
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Contact.findByIdAndDelete(id);

    res.redirect('/contacts');
  } catch (error) {
    res.redirect('/contacts');
  }
};
