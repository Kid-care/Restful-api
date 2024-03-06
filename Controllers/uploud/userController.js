const Store =  require('../../models/store');
const Upload = require("../../helpers/upload");

const uploadFile = async(req, res)=>{

    try {
        const upload = await Upload.uploadFile(req.file.path);

        var store = new Store({
            file_url:upload.secure_url
        });
        var record = await store.save();
        res.send({ succes:true, msg:'File Uploaded Successfully!', data:record });

    } catch (error) {
        res.send({ succes:false, msg:error.message });
    }

}

module.exports = {
    uploadFile
}