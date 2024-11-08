const express = require('express')
const {
  getAllForms,
  createForm,
  editForm,
  singleForm,
  deleteForm,
} = require('../Controller/formController')

const formRouter = express.Router()

formRouter.get('/', getAllForms)
formRouter.post('/create', createForm)
formRouter.put('/:id/edit', editForm)
formRouter.get('/:id', singleForm)
formRouter.delete('/deleteForm/:id', deleteForm)

http: module.exports = formRouter
