const express = require('express')
const ctrl = require('../../controllers')
const {validateBody} = require('../../middlewares');
const {ctrlWrapper} = require("../../helpers")
const {schemas} = require('../../models/contact')

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.listContacts))

router.get("/:id", ctrlWrapper(ctrl.getContactById))

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:id", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:id", ctrlWrapper(ctrl.removeContact))

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;

