const express = require('express')
const ctrl = require('../../controllers')
const {validateBody, authenticate} = require('../../middlewares');
const {ctrlWrapper} = require("../../helpers")
const {schemas} = require('../../models/contact')

const router = express.Router()

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts))

router.get("/:id", authenticate, ctrlWrapper(ctrl.getContactById))

router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:id", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeContact))

router.patch("/:id/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;

