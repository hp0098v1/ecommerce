const fs = require("fs");

const deleteFileMiddleware = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${filePath}`, err);
    } else {
      console.log(`File deleted successfully: ${filePath}`);
    }
  });
};

module.exports = deleteFileMiddleware;
