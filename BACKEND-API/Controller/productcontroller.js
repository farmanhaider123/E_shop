const proModel = require("../Model/product");
const imageSchema = require("../Model/image");
//upload profile pic
async function saveImage(req, res) {
    const requestBody = req.body;
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    const data={...requestBody,'imageURL':url}
    console.log(data)
    

    const image= new imageSchema(data)
    try {
        const savedImage = await image.save();
        res.send({"err":0,"msg":"Profile pic is uploaded"}); 
    }  catch(ex) {
        return res.send({"err":1,"msg":ex.message});
    }
}
function getimagebyemail(req, res) {
  let email = req.params.email;


    imageSchema.findOne({ email: email}) //findAndModify
    .then((result) => {
      console.log(`result${result}`);
      res.send(result);
    })
    .catch((err) => console.log(err));
}

function Saveproduct(req, res) {
  const bodyData1 = req.body;
  console.log(bodyData1);
  let ins = new proModel(bodyData1);
  ins.save((err) => {
    if (err) res.render("add");
    else {
      proModel
        .find()
        .then((products) => {
          // res.render("index1", {
          //   Title: "Crud application",
          //   prods: products,
          // });
          res.send(products);
        })
        .catch((err) => console.log(err));
    }
  });
}

function editProductPage(req, res) {
  let pid = req.params.id;
  console.log(pid);
  proModel
    .findOne({ _id: pid }) //findAndModify
    .then((result) => {
      console.log(result);
      // res.render("edit", { prods: result, errmsg: "", succmsg: "", msg: pid });
      console.log(pid);
    })
    .catch((err) => console.log(err));
}
function updateData(req, res) {
  let _id = req.params.id;
  let { category, pname, price, description, quantity, image } = req.body;

  proModel
    .updateOne(
      { _id: _id },
      {
        $set: {
          category: category,
          pname: pname,
          price: price,
          description: description,
          quantity: quantity,
          image: image,
        },
      }
    )
    .then((data1) => {
      res.send(data1);
    })
    .catch((err) => {
      res.send(err);
    });
}
function deleteProduct(req, res, next) {
  // Product.deleteOne({ _id: req.body.id }) //deleteOne mongodb
  // Product.findByIdAndDelete(req.body.id) //findOneAndDelete
  let pid = req.params.id;
  console.log(pid);
  proModel
    .deleteOne({ _id: pid }) //findAndModify
    .then((result) => {
      // res.redirect("/getproducts");
      res.send(result);
    })
    .catch((err) => console.log(err));
}
function getProductById(req, res, next) {
  let pid = req.params.id;
  console.log(pid);
  proModel
    .findOne({ _id: pid }) //findAndModify
    .then((result) => {
      console.log(`result${result}`);
      res.send(result);
    })
    .catch((err) => console.log(err));
}
function Getallproducts(req, res, next) {
  proModel
    .find()
    .then((products) => {
      // res.render("index1", {
      //   Title: "Crud application",
      //   prods: products,
      // });
      res.send(products);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  Saveproduct,
  Getallproducts,
  editProductPage,
  deleteProduct,
  updateData,
  getProductById,
  saveImage,
  getimagebyemail,
};
