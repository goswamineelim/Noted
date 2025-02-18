const {Schema , model} = require('mongoose')


const noteSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required: true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref : "user",
    },
    label:{
        type: [String],
        default: ["def"]
    }
}, { timestamps : true}
)

const note = model('note',noteSchema);

module.exports = note;