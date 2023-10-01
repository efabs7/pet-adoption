const {
  deleteUserSavedPetService,
  updatePetService,
  addPetService,
  getAllPetsService,
  getPetByIdService,
  getPetByNameService,
  savePetToUserSavedListService,
  returnUserFosteredPetService,
  returnUserAdoptedPetService,
  addPetToUserAdoptListService,
  addPetToUserFosterListService,
} = require("../services/petService");

const { getPermissions } = require("../utils/permissions");

const { getUserByIdService } = require("../services/userService");
const { regexpCode } = require("ajv/dist/compile/codegen");

const getAllPetsController = async (req, res) => {
  const petList = await getAllPetsService(req.query);
  res.status(200).send(petList);
};

const getPetController = async (req, res) => {
  const petId = req.params.id;
  const pet = await getPetByIdService(petId);
  res.status(200).send(pet);
};

const adminAddNewPetController = async (req, res) => {
  const permissions = getPermissions(+req.params.admin);
  if (!permissions.admin) {
    return res.status(401).send("u unauthorized sry");
  }

  try {
    const resp = await addPetService(req.body);

    res.status(201).send(resp);
  } catch (err) {
    console.log(err);
  }

  /*
      
  */
};

const adminUpdatePetController = async (req, res) => {
  const permissions = getPermissions(+req.params.admin);
  if (!permissions.admin) {
    return res.status(401).send("u unauthorized sry");
  }
  const petId = req.params.id;
  const resp = await updatePetService(petId, req.body);

  res.status(201).send(resp);
};

const getUserSavedAndOwnedPetsController = async (req, res) => {
  const userId = req.params.id;
  const user = await getUserByIdService(userId);
  console.log(user);
  const { userSavedPets, userOwnedPets, userFosteredPets } = user;

  res.status(200).send({ userSavedPets, userOwnedPets, userFosteredPets });
};

const addPetToUserAdoptListController = async (req, res) => {
  const pet = req.body.petId;
  const user = req.params.id;
  const resp = await addPetToUserAdoptListService(user, pet);
  res.status(201).send(resp);
  //not sure
};

const addPetToUserFosterListController = async (req, res) => {
  const pet = req.body.petId;
  const user = req.params.id;

  const resp = await addPetToUserFosterListService(user, pet);
  res.status(201).send(resp);
  //not sure
};

const savePetToUserSavedListController = async (req, res) => {
  const resp = await savePetToUserSavedListService(
    req.body.petId,
    req.params.id
  );
  res.status(201).send(resp);
};
const deleteUserSavedPetController = async (req, res) => {
  const resp = await deleteUserSavedPetService(req.body.petId, req.params.id);
  res.status(201).send(resp);
};

const returnUserAdoptedPetController = async (req, res) => {
  const resp = await returnUserAdoptedPetService(req.body.petId, req.params.id);
  res.status(201).send(resp);
};
const returnUserFosteredPetController = async (req, res) => {
  const resp = await returnUserFosteredPetService(
    req.body.petId,
    req.params.id
  );
  res.status(201).send(resp);
};

module.exports = {
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
};
