const {UploadService} = require('../../../services/uploadsService');

const Upload = (req,file) => {
  const { username,email,password } = req.body;
  if (validateResult.error) {
    return res.status(400).json({ error: validateResult.error.details[0].message });
  }

    const uploadService = UploadService(req,file);
    return uploadService;
}

module.exports = { Upload }