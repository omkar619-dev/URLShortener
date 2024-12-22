const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    // Basic validation for URL format
                    return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value);
                },
                message: (props) => `${props.value} is not a valid URL!`,
            },
        },
        visitHistory: {
            type: [
                {
                    timestamp: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            default: [], // Default value for visitHistory
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
