const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    lastName: { type: "string" },
    phone: { type: "string" },
    password: { type: "string", maxLength: 30, minLength: 5 },
    bio: { type: "string" },
  },
  required: ["name", "lastName", "phone", "password"],
  additionalProperties: true,
};

const schemaUpdate = {
  type: "object",
  properties: {
    name: { type: "string" },
    lastName: { type: "string" },
    phone: { type: "string" },
    password: { type: "string", maxLength: 30, minLength: 5 },
    bio: { type: "string" },
  },

  additionalProperties: true,
};

module.exports = {
  userSchema: schema,
  userSchemaPutRequest: schemaUpdate,
};
