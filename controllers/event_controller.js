const { Sequelize } = require("../models");
const models = require("../models");

function save(req, res) {
  const event = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    date: req.body.date,
    location: req.body.location,
    allowedAttendees: req.body.allowedAttendees,
    waitlist: req.body.waitlist,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  models.Event.create(event).then((result) => {
    res
      .status(201)
      .json({
        message: "event created sucessfully",
        event: result,
      })
      .catch((error) => {
        res.status(500).json({
          message: "something went wrong",
          error: error,
        });
      });
  });
}

function showAll(req, res) {
  models.Event.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        messgae: "something went wrong and unable to retrieve all the events",
        error: error,
      });
    });
}

function showbyId(req, res) {
  const id = req.params.id;
  models.Event.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Event not found, check your id and try again",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
}

function deleteEvent(req, res) {
  const id = req.params.id;
  models.Event.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "event deleted sucessfully",
        event: result,
      });
    })
    .catch((error) => {
      res.status(501).json({
        message: "something went wrong",
        error: error,
      });
    });
}

function getAttendee(req, res) {
  const id = req.params.id;
  models.Event.findByPk(id)
    .then((result) => {
      if (result) {
        return res.status(201).json({
          attendees: result.allowedAttendees,
        });
      }
    })
    .catch((error) => {
      res.status(501).json({
        message: "something went wrong",
        error: error,
      });
    });
}

function showUpcomingEvents(req, res) {
  const dateOfToday = new Date();
  const Op = Sequelize.Op;
  models.Event.findAll({ where: { date: { [Op.gt]: dateOfToday } } })
    .then((result) => {
      if (result.id != null) {
        return res.status(200).json({
          message: "here are the upcoming events",
          upcomingevents: result,
        });
      } else {
        return res.status(404).json({
          message: "event not found",
        });
      }
    })
    .catch((error) => {
      return res.status(501).json({
        message: "something went wrong",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  showAll: showAll,
  showbyId: showbyId,
  deleteEvent: deleteEvent,
  getAttendee: getAttendee,
  showUpcomingEvents: showUpcomingEvents,
};
