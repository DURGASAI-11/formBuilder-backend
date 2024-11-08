const Form = require('../Model/formModel')
const mongoose = require('mongoose')

const createForm = async (req, res) => {
  try {
    const formData = req.body
    if (formData.fields.length === 0) {
      return res.status(400).json({ message: 'No fields selected' })
    }

    if ((await Form.countDocuments()) >= 20) {
      return res.status(400).json({ message: 'reached 20 forms limit' })
    }

    // console.log(formData)
    const newForm = await Form.create({
      formName: formData.title,
      fields: formData.fields,
    })
    console.log(newForm)
    res.status(201).json({ message: 'Form sucessully created' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getAllForms = async (req, res) => {
  try {
    const AllForms = await Form.find({})
    // console.log(AllForms)
    res.status(200).json({ forms: AllForms })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const editForm = async (req, res) => {
  try {
    const { id } = req.params
    const updatedFields = req.body.fields
    const title = req.body.title
    // console.log('fields', updatedFields)

    if (req.body.typeCheck === 'Yes') {
      updatedFields.forEach((field) => {
        if (field.type === 'number' && typeof field.value === 'string') {
          field.value = Number(field.value)
        } else if (field.type === 'date' && typeof field.value === 'string') {
          field.value = new Date(field.value)
        }
      })
    }

    const form = await Form.findByIdAndUpdate(
      id,
      { formName: title, fields: updatedFields },
      { new: true, runValidators: true },
    )

    if (!form) {
      return res.status(404).json({ message: 'Form not found' })
    }

    res.status(200).json(form)
  } catch (err) {
    console.error('Error updating form:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const singleForm = async (req, res) => {
  try {
    const { id } = req.params

    const form = await Form.findById(id)
    if (!form) {
      return res.status(404).json({ message: 'Form not found' })
    }
    // console.log(form)

    res.status(200).json(form)
  } catch (err) {
    console.error('Error retrieving form:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteForm = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'id not found' })
    }
    await Form.findByIdAndDelete(id)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = { getAllForms, singleForm, editForm, createForm, deleteForm }
