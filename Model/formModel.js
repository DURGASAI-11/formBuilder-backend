const mongoose = require('mongoose')

const formSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
    },
    fields: {
      type: [
        {
          id: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            required: true,
            enum: ['text', 'number', 'email', 'password', 'date'],
          },
          label: {
            type: String,
            required: true,
          },
          placeholder: {
            type: String,
            default: '',
          },
          value: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
            value: {
              type: mongoose.Schema.Types.Mixed,
              required: false,
              validate: {
                validator: function (value) {
                  if (value === undefined || value === '') return true
                  if (this.type === 'text' && typeof value !== 'string') {
                    return false
                  }
                  if (this.type === 'number' && typeof value !== 'number') {
                    return false
                  }
                  if (this.type === 'email' && typeof value !== 'string') {
                    return false
                  }
                  if (this.type === 'password' && typeof value !== 'string') {
                    return false
                  }
                  if (this.type === 'date' && !(value instanceof Date)) {
                    return false
                  }
                  return true
                },
                message:
                  'Value does not match the required type for this field.',
              },
            },
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Form = mongoose.model('Form', formSchema)

module.exports = Form
