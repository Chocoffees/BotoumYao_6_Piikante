// Create middleware to handle images uploaded

// Import Multer
const multer = require('multer');

// Define accepted extensions: use 'MIME_TYPES' 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
  // Create a configuration object for multer > use diskStorage() function to store object
  const storage = multer.diskStorage({
    destination: (req, file, callback) => { // images storage location
    callback(null, 'images'); // null = pas d'erreur - 2e argument = passer le nom du dossier 'images' créé
    },
    filename: (req, file, callback) => { // file naming rules
      // Create file name
      const name = file.originalname.split(' ').join('_');
      // Generate file ext
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension); // 'Date.now() = timestamp (unique file)
    }
  });
  
  // Export the middleware multer 
  // Appeler la méthode multer()
  module.exports = multer({storage: storage}).single('image');
  
  // >> Operational middleware > update POST/PUT routes