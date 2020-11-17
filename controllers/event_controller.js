const models = require("../models")

function save(req, res){
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
        endTime: req.body.endTime

    }

    models.Event.create(event).then(result => {
        res.status(201).json({
            message: "event created sucessfully",
            event: result
        }).catch(error => {
            res.status(500).json({
                message: "something went wrong",
                error: error
            })
        })
    })
}

function showAll(req,res){
    models.Event.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            messgae: "something went wrong and unable to retrieve all the events",
            error: error
        })
    })

}

function showbyId(){

}

function showUpcomingEvents(){

}

function deleteEvent(){

}

function getAttendee(){

}




module.exports = {
    save: save,
    showAll: showAll,
    showbyId: showbyId,
    deleteEvent: deleteEvent,
    getAttendee: getAttendee,
    showUpcomingEvents: showUpcomingEvents
}