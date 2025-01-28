const { nanoid } = require("nanoid");
const notes=require("./notes")
// menambah notes
const addNoteHandler=(request,h)=>{
    const {title,tags,body}=request.payload;
    const id=nanoid(16)
    const createdAt=new Date().toISOString()
    const updatedAt=createdAt

    const addNote={
        title,tags,body,id,createdAt,updatedAt
    }
    notes.push(addNote)

    const isSuccess=notes.filter((note)=>note.id===id).length>0

    if(isSuccess){
        const response=h.response({
            status:"success",
            message:"Berhasil ditambah",
            data:{
                noteId:id
            }
        })
        response.code(201)
        return response
    }
    const response=h.response({
        status:"fail",
        message:"Tidak ditambahkan"
    })
    response.code(500)
    return response
}

// manampilkan note
const getAllNoteHandler=()=>({
    status:"suscces",
    data:{
        notes
    }
})

// menampilkan detail note
const getNoteById=(request,h)=>{
    const {id}=request.params

    const note=notes.filter((n)=>n.id===id)[0]
    if(note !== undefined){
        return{
            status:"success",
            data:{
                note
            }
        }
    }

    const response=h.response({
        status:"fail",
        message:"Notes not found",
    })
    response.code(404)
    return response
}

// edit notes by id
const editNoteById=(request,h)=>{
    const {id}=request.params
    const {title,tags,body}=request.payload
    const updatedAt=new Date().toISOString()

    const index=notes.findIndex((note)=>note.id===id)

    if(index !== -1){
        notes[index]={
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }
        
        const response=h.response({
            status:"success",
            message:"Berhasil di update"
        })
        response.code(201)
        return response
    }

    const response=h.response({
        status:"fail",
        messsage:"tidak dapat diupdate"
    })
    response.code(400)
    return response

}

// mengahpus notes by id
const deleteNotesById=(request,h)=>{
    const {id}=request.params
    // const {title,tags,body}=request.payload;

    const index=notes.findIndex((note)=>note.id===id)

    if(index!==-1){
        notes.splice(index,1)

        const response=h.response({
            status:"success",
            message:"notes berhasil dihapus"
        })
        response.code(200)
        return response
    }

    const response=h.response({
        status:"failed",
        message:"Tidak dapat menghapus"
    })
    response.code(404)
    return response;
}
module.exports={addNoteHandler,getAllNoteHandler,getNoteById,editNoteById,deleteNotesById}