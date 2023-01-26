const express = require("express");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const {
  Saveproduct,
  Getallproducts,
  editProductPage,
  deleteProduct,
  getProductById,
  updateData,
    saveImage,
  getimagebyemail
} = require("./Controller/productcontroller");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index1", { Title: "Crud application", prods: "" });
});
router.get("/addproduct", (req, res) => {
  res.render("add");
});
router.get("/edit/:id", editProductPage);
 router.post("/profile",upload.single('attach'),saveImage);   
router.get("/getimage/:email", getimagebyemail);
router.get("/getProductById/:id", getProductById);
router.put("/editD/:id", updateData);
router.post("/addedproduct", Saveproduct);
//router.get("/getproductbyid/:id", Getproductbyid);
router.get("/getproducts", Getallproducts);
router.delete("/deleteDATA/:id", deleteProduct);
module.exports = router;
