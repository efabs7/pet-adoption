const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", maxLength: 30, minLength: 5 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = {
  authSchema: schema,
};
