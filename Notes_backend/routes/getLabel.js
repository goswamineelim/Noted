const {Router} = require('express')
const router = Router();
const note = require('../models/note');

router.get('/show',async(req,res)=>{
    if(!req.user){
        return res.json({});
    }
    const allNotesWithBin = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotesWithBin.forEach(lab => {
        labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    return res.json({
        "labels" : uniquelabels
    });
})
router.get('/bin', async (req, res) => {
    try {
        const notesInBin = await note.find({ "label": "bin" }).populate("createdBy");
        const filteredNotes = notesInBin.filter(note => 
            note.createdBy && req.user && note.createdBy._id.equals(req.user._id)
        );

        if (filteredNotes.length === 0) {
            return res.json({ message: "No notes found or you don't have permission to view them." });
        }

        return res.json(filteredNotes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;