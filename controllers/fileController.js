const fs = require('fs').promises;
const path = require('path');
const File = require('../models/file');

exports.uploadFile = async (req, res) => {
  try {
    const { originalname, filename, size } = req.file;
    const { userId } = req.user; // Assuming userId is included in the request after authentication

    // Save file details to the database
    const file = await File.create({
      originalname,
      filename,
      size,
      userId,
    });

    res.status(201).json({ message: 'File uploaded successfully', fileId: file.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File upload failed' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user; // Assuming userId is included in the request after authentication

    // Find and delete the file from the database
    const file = await File.findOne({ where: { id, userId } });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    await file.destroy();

    // Delete the file from storage (you need to implement this part)
    const filePath = path.join(__dirname, '../uploads', file.filename);
    await fs.unlink(filePath);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File deletion failed' });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is included in the request after authentication

    // Retrieve file details from the database
    const files = await File.findAll({ where: { userId } });

    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File retrieval failed' });
  }
};
