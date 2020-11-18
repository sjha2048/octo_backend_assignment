const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        return res.status(409).json("user already exists");
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            models.User.create(user)
              .then((result) => {
                return res.status(201).json({
                  message: "user created sucessfully",
                  user: result,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "something went wrong unable to create the user",
                  error: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {});
};

exports.login = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        return res.status(401).json("user doesn't exists");
      } else {
        bcrypt.compare(req.body.password, user.password, function (
          err,
          result
        ) {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              "secret",
              function (err, token) {
                res.status(200).json({
                  message: "auth sucessfull",
                  token: token,
                });
              }
            );
          } else {
            return res.status(401).json("user doesn't exists");
          }
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  models.User.destroy({ where: { id: id } })
    .then((result) => {
      return res.status(200).json("user sucessfully deleted");
    })
    .catch((error) => {
      return res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};

exports.attendEvent = (req, res) => {
  const id = req.params.id;
  const addAttendee = {
    allowedAttendees: req.body.allowedAttendees,
  };

  models.Event.update(addAttendee, { where: { id: id } })
    .then((result) => {
      return res.status(200).json({
        message: "attendee added to the event",
        allowedAttendees: addAttendee,
      });
    })
    .catch((error) => {
      return res.status(501).json({
        message: "something went wrong",
        error: error,
      });
    });
};
