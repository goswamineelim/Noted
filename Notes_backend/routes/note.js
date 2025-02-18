const {Router} = require('express')
const router = Router();
const note = require('../models/note');

router.get('/add-new', (req, res)=>{
    return res.render('addNote',{
        user: req.user,
    })
    // return res.json({message : "add-new"});
})

router.post('/',async(req, res)=>{
    const {title , body, label} = req.body;
    const arrLabel= label.split(",");
    
    const Note = await note.create({
        body,
        title,
        createdBy: req.user._id,
        label: arrLabel
    })
    return res.json({sucess:true,
                     noteid: Note._id,})
    // return res.redirect(`/note/${Note._id}`)
})

router.patch('/:id', async (req, res) => {    
    try {
        const Note = await note.findById(req.params.id).populate("createdBy");
        const {title, body, label} = req.body;
        const arrLabel= label.split(",");
        if(Note){
            await note.updateOne({_id : req.params.id}, {$set : {
                "title" : req.body.title,
                "body" : req.body.body,
                "label" : arrLabel,
            }});
            return res.json({
                sucess:true,
                label_: label,
            });
        }
    } catch (error) {
        console.error('Error updating label:', error);
        res.status(500).send('Error patching card.');
        // return res.json({message : 'error encountered'});
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        // Find the note by its ID and populate the createdBy field
        const Note = await note.findById(req.params.id).populate("createdBy");
        
        // Check if the 'bin' tag exists in the label array
        if (!Note.label.includes("bin")) {
            // If 'bin' is not found in the label array, set label to ["bin"]
            await note.updateOne(
                { _id: req.params.id },
                { $set: { label: ["bin",...Note.label] } }
            );
            
            // Fetch all notes created by the user excluding those with the 'bin' label
            const allNotes = await note.find({ createdBy: req.user, label: { $ne: "bin" } });
            
            return res.json(allNotes);
        } else {
            // If the note is already in the bin, check if the current user is the owner
            if (!Note.createdBy._id.equals(req.user._id)) {
                return res.redirect("/");
            }

            // Delete the note if the user owns it
            await note.findByIdAndDelete(req.params.id);

            // Fetch all notes in the 'bin' label and filter by the user
            const notesInBin = await note.find({ label: "bin" }).populate("createdBy");
            const filteredNotes = notesInBin.filter(note => 
                note.createdBy && req.user && note.createdBy._id.equals(req.user._id)
            );

            // If no notes are found or the user has no permissions, send an error message
            if (filteredNotes.length === 0) {
                return res.json({ message: "No notes found or you don't have permission to view them." });
            }

            return res.json(filteredNotes);
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        return res.json({ message: 'Error' });
    }
});

router.get('/:id',async(req, res)=>{
    const Note = await note.findById(req.params.id).populate("createdBy");
    if(!Note.createdBy ||!req.user || !(Note.createdBy._id.equals(req.user._id))) {
        // return res.redirect("/");
        return res.json({message : "Cannot access"});
    }
    // return res.render('Note',{
    //     user: req.user,
    //     Note,
    // })
    return res.json(Note);
})



router.get("/labels",async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotes.forEach(lab => {
         labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    // console.log("hello");
    return res.json({"labels" : uniquelabels});
})


router.get("/labels",async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotes.forEach(lab => {
         labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    // console.log("hello");
    return res.json({"labels" : uniquelabels});
})

module.exports = router;
