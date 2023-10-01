const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const validateSchema = (schema) => {
  return (req, res, next) => {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
      const map = validate.errors.map((i) => {
        return `"${i.instancePath.substring(1)}" - ${i.message}`;
      });

      return res.status(400).send(map.join(" and "));
    }

    next();
  };
};

module.exports = {
  validateSchema,
};
