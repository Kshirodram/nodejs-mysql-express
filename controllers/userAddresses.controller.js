import UserAddressModel from "../models/userAddress.model.js";

// Create and Save a new User address
const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a user address
  const user = new UserAddressModel({
    userId: req.params.userId,
    houseNo: req.body.houseNo,
    lane1: req.body.lane1,
    lane2: req.body.lane2,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    postalCode: req.body.postalCode,
    active: req.body.active,
  });

  // Save user address in the database
  UserAddressModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user address.",
      });
    else res.send(data);
  });
};

// Retrieve all user addresses from the database.
const findAll = (req, res) => {
  UserAddressModel.getAll(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user addresses.",
      });
    else res.send(data);
  });
};

export { create, findAll };
