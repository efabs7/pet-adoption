const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    adoptionStatus: { type: "string" },
    bio: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    hypoallergenic: { type: "string" },
    diet: { type: "string" },
    breed: { type: "string" },
  },
  // required: ["name", "type", "adoptionStatus", "breed"],
  additionalProperties: true,
};

module.exports = {
  petSchema: schema,
};
