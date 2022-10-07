const express = require('express')
const Joi = require("joi");

const {RequestError} = require("../../error")

const contacts = require("../../models/contacts");

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
})

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
} catch (error) {
    next(error);
}
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json(result)
} catch (error) {
    next(error)
}
})

router.post('/', async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
          throw RequestError(400, error.message)
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result)
  } catch (error) {
      next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Contact deleted"
    })
} catch (error) {
    next(error)
}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        throw RequestError(400, error.message)
    }
    const {contactId} = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.status(201).json(result)
} catch (error) {
    next(error)
}
});


module.exports = router

// router.get('/', async (req, res, next) => {
//   const contactList = await contacts.listContacts();
//     res.status(200).json(contactList);
  
// })

// router.get('/:contactId', async (req, res, next) => {
//   const contactId = req.params.contactId;

//     const foundContact = await contacts.getContactById(
//         Number(contactId),
//     );

//     if (!foundContact) {
//         return res.status(404).json({
//             message: `Contact not found!`,
//         });
//     }

//     res.status(200).json({ foundContact });
// })

// router.post('/', async (req, res, next) => {
//   const { name, email, phone } = req.body;

//     if (!name || !email || !phone) {
//         return res.status(400).json({
//             message: "Missing required name field",
//         });
//     }

//     const updateContact = await contacts.addContact(name, email, phone);

//     res.status(201).json(updateContact);
// })

// router.delete('/:contactId', async (req, res, next) => {
//   const contactId = req.params.contactId;

//   const newContacts = await contacts.removeContact(
//       Number(contactId),
//   );

//   if (newContacts.length === contacts.length) {
//       return res.status(400).json({
//           message:`Not found` ,
//       });
//   }

//   res.status(200).json({
//       message: `Contact deleted !`,
//   });
// })

// router.put('/:contactId', async (req, res, next) => {
//   const contactId = req.params.contactId;
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//       return res.status(400).json({
//           message: `Missing fields`,
//       });
//   }

//   const updatedContacts = await contacts.updateContact(
//       Number(contactId),
//       name,
//       email,
//       phone,
//   );

//   if (!updatedContacts) {
//       return res.status(404).json({
//           message: `Not found!`,
//       });
//   }

//   res.status(200).json(updatedContacts);
// })

// module.exports = router
