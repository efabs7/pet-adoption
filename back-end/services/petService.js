const db = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const {
  getUserByIdService,
  updateUserService,
} = require("../services/userService");

const getAllPetsService = async (query) => {
  const fields = {};

  if (query.q) {
    const reg = { $regex: new RegExp(query.q, "i") };
    fields.$or = [
      { adoptionStatus: reg },
      { type: reg },
      { height: reg },
      { weight: reg },
      { name: reg },
    ];
  }

  const allPetsList = await db.pets.find(fields).toArray();
  return allPetsList;
};

const getPetByIdService = async (id) => {
  const pet = await db.pets.findOne({
    _id: new ObjectId(id),
  });

  return pet;
};

const getPetByNameService = async (name) => {
  const resp = await db.pets.findOne({ name });
  return resp;
};
const addPetService = async (pet) => {
  const resp = await db.pets.insertOne(pet);
  return resp;
};

const updatePetService = async (id, pet) => {
  const resp = await db.pets.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: pet,
    }
  );
  return resp;
};

const savePetToUserSavedListService = async (petId, userId) => {
  const pet = await getPetByIdService(petId);
  const user = await getUserByIdService(userId);
  const resp = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        userSavedPets: pet,
      },
    }
  );

  return resp;
};

const addPetToUserAdoptListService = async (userId, petId) => {
  const pet = await getPetByIdService(petId);
  const user = await getUserByIdService(userId);

  const userUpdated = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        userOwnedPets: pet,
      },
    }
  );

  const newPetStatus = await updatePetService(petId, {
    adoptionStatus: "Adopted",
  });
  return userUpdated, newPetStatus;
};

const addPetToUserFosterListService = async (userId, petId) => {
  const pet = await getPetByIdService(petId);
  const user = await getUserByIdService(userId);

  const userUpdated = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        userFosteredPets: pet,
      },
    }
  );

  const newPetStatus = await updatePetService(petId, {
    adoptionStatus: "Fostered",
  });
  return userUpdated, newPetStatus;
};

const deleteUserSavedPetService = async (petId, userId) => {
  const pet = await getPetByIdService(petId);
  //const { _id } = pet;
  const user = await getUserByIdService(userId);
  const userUpdated = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $pull: {
        userSavedPets: pet,
      },
    }
  );

  return userUpdated;
};

const returnUserFosteredPetService = async (petId, userId) => {
  const pet = await getPetByIdService(petId);
  const user = await getUserByIdService(userId);

  const userUpdated = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $pull: {
        userFosteredPets: pet,
      },
    }
  );

  const res = await updatePetService(petId, {
    adoptionStatus: "Available",
  });
  return res, userUpdated;
};

const returnUserAdoptedPetService = async (petId, userId) => {
  const pet = await getPetByIdService(petId);

  const user = await getUserByIdService(userId);

  const userUpdated = await db.users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $pull: {
        userOwnedPets: pet,
      },
    }
  );

  const res = await updatePetService(petId, {
    adoptionStatus: "Available",
  });
  return userUpdated, res;
};

module.exports = {
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
};
