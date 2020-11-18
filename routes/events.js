const { Router } = require("express")
const express = require("express")
const event_controller = require("../controllers/event_controller")
const router = express.Router()


router.post("/create", event_controller.save)
router.get("/showall", event_controller.showAll)
router.get("/showbyid/:id", event_controller.showbyId)
router.delete("/delete/:id",event_controller.deleteEvent)
router.get("/attendees/:id", event_controller.getAttendee)
router.get("/showupcoming", event_controller.showUpcomingEvents)

module.exports = router