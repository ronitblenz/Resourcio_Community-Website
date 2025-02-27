import Event from "../models/Event.js"
import PastEvent from "../models/PastEvent.js"
import User from "../models/User.js"


// CREATE AN EVENT
export async function createEvent(req, res) {
    try {
        const { userId } = req.user

        if (userId) {
            const { event, link } = req.body
            const newEvent = new Event({ event, link })

            try {
                const user = await User.findById(userId)
                if (user.isAdmin) {
                    const event = await newEvent.save()
                    return res.status(201).json({ event, msg: 'Event Added' })
                }
                else {
                    return res.status(401).json({ error: 'Not Authorized' })
                }
            }
            catch (error) {
                return res.status(401).json(error)
            }
        }
        else {
            return res.status(401).json({ error: 'User not found' })
        }
    }
    catch (error) {
        return res.status(404).json(error)
    }
}



// GET ALL EVENTS
export async function getEvents(req, res) {
    try {
        const events = await Event.find()

        res.status(200).json(events.reverse())
    }
    catch (error) {
        res.status(500).json(error)
    }
}


// POST YOUTUBE IFRAME TO DATABASE
export async function addPastEvent(req, res) {
    try {
        const { userId } = req.user

        if (userId) {
            const { eventLink } = req.body
            const pastEvent = new PastEvent({ eventLink })

            try {
                const user = await User.findById(userId)
                if (user.isAdmin) {
                    const event = await pastEvent.save()
                    return res.status(201).json({ event, msg: 'Past Event Added' })
                }
                else {
                    return res.status(401).json({ error: 'Not Authorized' })
                }
            }
            catch (error) {
                return res.status(401).json(error)
            }
        }
        else {
            return res.status(401).json({ error: 'User not found' })
        }
    }
    catch (error) {
        return res.status(404).json(error)
    }
}



// GET PAST EVENTS
export async function getPastEvents(req, res) {
    try {
        const pastEvents = await PastEvent.find()

        res.status(200).json(pastEvents)
    }
    catch (error) {
        res.status(500).json(error)
    }
}