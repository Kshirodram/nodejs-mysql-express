import UserModel from "../models/user.model.js";

// Create and Save a new User
const create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a user
  const user = new UserModel({
    email: req.body.email,
    name: req.body.name,
    age: req.body.age,
    active: req.body.active,
  });

  // Save user in the database
  UserModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
const findAll = (req, res) => {
  UserModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Find a single user with a userId
const findOne = (req, res) => {
  UserModel.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a user identified by the userId in the request
const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  UserModel.updateById(
    req.params.userId,
    new UserModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.userId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user with the specified userId in the request
const deleteUser = (req, res) => {
  UserModel.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

// Delete all users from the database.
const deleteAll = (req, res) => {
  UserModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};

export { create, findAll, findOne, update, deleteUser as delete, deleteAll };
