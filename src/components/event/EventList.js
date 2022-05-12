import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getEvents, deleteEvent, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    const loadEvents = () => {
        getEvents().then(data => setEvents(data))
    }
    useEffect(() => {
        loadEvents()
    }, [])

    return (
        <article className="events">
            <h2>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}>Create New Event</button>
            </h2>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} by {event.organizer.user.username}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        <Link to={`/events/${event.id}`}>
                            <button className="update">Update event</button>
                        </Link>
                        <button className="delete" onClick={() => deleteEvent(event).then(loadEvents)}>Delete Event</button>
                        {console.log(event)}
                        {
                            event.joined ? 
                            (<button onClick={() => { leaveEvent(event.id).then(res => setEvents(res)) }}>Leave</button>)
                                : 
                            (<button onClick={() => { joinEvent(event.id).then(res => setEvents(res))}}>Join</button>)
                        }
                        <hr />
                    </section>
                })
            }
        </article>
    )
}