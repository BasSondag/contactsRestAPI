const asyncHandler  = require("express-async-handler");
const Contact = require("../models/contactModels");


// @desc Get All Contacts
// @route GET api/contacts
// @access private
const getContacts = asyncHandler( async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.json(contacts);
});


// @desc Get Contact from id
// @route GET api/contacts/:id
// @access private
const getContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});


// @desc Create a Contact
// @route POST api/contacts/:id
// @access private
const createContact = asyncHandler( async(req, res) => {
    const { name , email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.json(contact);
});


// @desc update a Contact
// @route PUT api/contacts/:id
// @access private
const updateContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have premission to update Other user contacts");
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});


// @desc delete a Contact
// @route DELETE api/contacts/:id
// @access private
const deleteContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have premission to delete Other user contacts");
    }

    await Contact.deleteOne(contact)
    res.status(200).json(contact);
})


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}