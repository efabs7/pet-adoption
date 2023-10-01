const express = require("express");
const { petSchema } = require("../schema/petSchema");
const { validateSchema } = require("../schema/validate");

const {
  adminAddNewPetController,
  getAllPetsController,
  getPetController,
  adminUpdatePetController,
  getUserSavedAndOwnedPetsController,
  addPetToUserAdoptListController,
  addPetToUserFosterListController,
  deleteUserSavedPetController,
  savePetToUserSavedListController,
  returnUserAdoptedPetController,
  returnUserFosteredPetController,
} = require("../controllers/petController");

const route = express.Router();

route.get("/", getAllPetsController); //getAllPets // allow search queries adoption status, type, height, weight, name
route.get("/:id", getPetController); //getPetById
route.get("/user/:id", getUserSavedAndOwnedPetsController); //get all pets owned or saved by user

route.post(
  "/:admin",
  validateSchema(petSchema),

  adminAddNewPetController
);
//protected route admins only; //addNewPet
// route.post("/upload", uploader.single("file"), async (req, res) => {
//   console.log("called uplaod");
//   const result = await cloudinary.uploader.upload(req.file.path);
//   console.log(result);
//   res.send(JSON.stringify({ url: result.url }));
// });
//handle photo upload?
route.post("/:id/adopt", addPetToUserAdoptListController);
//logged in users only
//change pet's adoption status
route.post("/:id/foster", addPetToUserFosterListController);
route.post("/:id/return", returnUserAdoptedPetController);

route.post("/:id/return/fostered", returnUserFosteredPetController);
//change pet status to available
//remove pet from users pets

route.post("/:id/save", savePetToUserSavedListController);
//stored to saved pets in user data, updateUserList
//protected to logged in user
route.put("/:id/:admin", validateSchema(petSchema), adminUpdatePetController); //updatePet
//portected route admin only

route.delete("/:id/save", deleteUserSavedPetController); //deletePet from user saved updateUser

module.exports = route;
