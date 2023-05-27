const multer= require("multer")


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const filefilter= (req,file,cb)=>{
    if(file.minetype==="image/png" || file.minetype==="image/jpeg" || file.minetype==="image/jpg" || file.minetype==="image/webp"){
        cb(null,true)
    }
    else{
        cb(null,false)
        cb(new Error("only images allowed."))
    }
}
const upload= multer({
    storage:storage,
    filefilter:filefilter
})

module.exports=upload;