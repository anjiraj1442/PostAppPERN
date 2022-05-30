const multer = require('multer')


const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, 'upload');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

var upload = multer({storage: fileStorageEngine})

 module.exports = upload