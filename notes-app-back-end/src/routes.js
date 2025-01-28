const { addNoteHandler, getAllNoteHandler, getNoteById, editNoteById, deleteNotesById } = require("./handler");

const routes=[
    {//menyimpan notes
        method:"POST",
        path:"/notes",
        handler:addNoteHandler
    },
    {
        method:"GET",
        path:"/notes",
        handler:getAllNoteHandler
    },
    {
        method:"GET",
        path:"/notes/{id}",
        handler:getNoteById
    },
    {
        method:"PUT",
        path:"/notes/{id}",
        handler:editNoteById
    },
    {
        method:"DELETE",
        path:"/notes/{id}",
        handler:deleteNotesById
    },
    
]
module.exports=routes;