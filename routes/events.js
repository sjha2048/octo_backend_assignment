const { Router } = require("express")
const express = require("express")
const event_controller = require("../controllers/event_controller")
const router = express.Router()


router.post("/create", event_controller.save)
router.get("/showall", event_controller.showAll)



module.exports = router