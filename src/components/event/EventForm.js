import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { getGames, getGameTypes } from "../game/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {

    const history = useHistory()

    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        game: 0,
        organizer: 0,
        time: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
      
        console.log(games)
    }, [])



    const changeEventState = (event) => {
        const copy = {...currentEvent}
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__Title">Create New Event</h2>

            <fieldset>
                <div className="form-group">
                    <select onChange={changeEventState}
                    type="select"
                    name="game">
                        <option value="0">Game</option>
                        {
                            games.map(
                                (game) => {
                                    return <option value={game.id} name="game" key={`type--${game.id}`}>{game.title}</option>
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Event Description</label>
                    <input type="text" name="description" className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="text" name="date" className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="text" name="time" className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                        />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        game: parseInt(currentEvent.game),
                        organizer: parseInt(localStorage.getItem('token')),
                        time: parseInt(currentEvent.time)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                        .then(console.log(event))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}