const multer = require('multer'); 
const express = require('express');
const account = require('../../controllers/account');
const ensureLoggedIn = require('../../utils/auth/authLoggedIn').ensureLoggedIn;
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './controllers/uploads') 
    }, 
    filename: (req, file, cb) => { 
        console.log(file.fieldname + '-' + Date.now());
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
const upload = multer({ storage: storage }); 

const router = express.Router();

router.use(ensureLoggedIn);

router.post('/update-email', account.postEmail);

router.post('/update-username', account.postUName);

module.exports = router;