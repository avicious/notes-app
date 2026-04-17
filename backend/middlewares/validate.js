// Middleware to validate JOI Schema
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    // Returs error code 400 with error message if there is an error
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }
    // Moves to the next if there is no error
    next();
  };
};

export default validate;
