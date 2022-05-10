import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { changeEvent, getEventById } from "./EventManager"

export const UpdateEvent = () => {

    const [selectedEvent, setSelectedEvent] = useState({})

    const [organizer, setOrganizer] = useState("")
    const [currentGame, setCurrentGame] = useState({})
    const [games, setGames] = useState([])



    // setting state for the individual properties of a game.
    const [descriptionEditing, setDescriptionEditing] = useState(null)
    const [dateEditing, setDateEditing] = useState(null)
    const [timeEditing, setTimeEditing] = useState(null)
    const [gameEditing, setGameEditing] = useState(null)
    // const [skillEditing, setSkillEditing] = useState(null)

    // setting state for the updated text

    const [editingDescription, setEditingDescription] = useState("")
    const [editingDate, setEditingDate] = useState("")
    const [editingTime, setEditingTime] = useState("")
    const [editingGame, setEditingGame] = useState("")
    // const [editingSkill, setEditingSkill] = useState("")

    const { eventId } = useParams();

    const history = useHistory()

    useEffect(
        () => {
            getGames().then(data => {setGames(data)})
        }, [currentGame]
    )

    useEffect(
        () => {
            
        }
    )

    useEffect(
        () => {
            getEventById(eventId).then((data) => {
                console.log(data)
                setSelectedEvent(data)
                setEditingDescription(data.description)
                setEditingDate(data.date)
                setEditingTime(data.time)
                setOrganizer(data.organizer.user.first_name)

                const onPageLoadGame = games.find(g => g.id === data.game.id)

                setCurrentGame(onPageLoadGame)
                console.log(currentGame)
            })

        }, [eventId]
    )



    const editEvent = (event) => {
        changeEvent(event)

    }

    const editEventDescription = (eventObject) => {

        const copy = { ...eventObject }
        copy.description = editingDescription
        editEvent(copy)
        setSelectedEvent(copy)


    }

    const editEventDate = (eventObject) => {

        const copy = { ...eventObject }
        copy.date = editingDate
        editEvent(copy)
        setSelectedEvent(copy)

    }

    const editEventTime = (eventObject) => {

        const copy = { ...eventObject }
        copy.time = editingTime
        editEvent(copy)
        setSelectedEvent(copy)

    }

    const editEventGame = (gameId) => {

        const copy = { ...gameId }
        copy.game_id = gameId
        editEvent(copy)
        setSelectedEvent(copy)

    }

    // const editSkillLevel = (eventObject) => {

    //     const copy = { ...eventObject }
    //     copy.skill_level = editingSkill
    //     editEvent(copy)
    //     setSelectedEvent(copy)

    // }
    console.log(currentGame)

    console.log(selectedEvent)

    return (
        <div className="eventDetails">
            <ul>
                <h2>Organizer</h2>
                {organizer}                
                
                
                <hr />

                <h2 className="eventDescription">Event Description</h2>
                <li className="title">
                    {descriptionEditing === selectedEvent.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingDescription(evt.target.value)}
                            value={editingDescription} />
                    ) : (<>{selectedEvent.description}</>)}
                </li>
                {descriptionEditing === selectedEvent.id ? (
                    <button className="descriptionedit"
                        onClick={() => {
                            editEventDescription(selectedEvent)
                            setDescriptionEditing(null)

                        }}> Submit Edit</button>) : (
                    <button className="button" onClick={() =>
                        setDescriptionEditing(selectedEvent.id)}>Edit</button>
                )
                }

                <hr />
                <h2 className="eventDate">Date</h2>
                <li className="date">
                    {dateEditing === selectedEvent.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingDate(evt.target.value)}
                            value={editingDate} />
                    ) : (<>{selectedEvent.date}</>)}
                </li>
                {dateEditing === selectedEvent.id ? (
                    <button className="dateedit"
                        onClick={() => {
                            editEventDate(selectedEvent)
                            setDateEditing(null)

                        }}> Submit Edit</button>) : (
                    <button className="button" onClick={() =>
                        setDateEditing(selectedEvent.id)}>Edit</button>
                )
                }

                <hr />

                <h2 className="time">Time</h2>
                <li className="time">
                    {timeEditing === selectedEvent.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingTime(evt.target.value)}
                            value={editingTime} />
                    ) : (<>{selectedEvent.time}</>)}
                </li>
                {timeEditing === selectedEvent.id ? (
                    <button className="timeedit"
                        onClick={() => {
                            editEventTime(selectedEvent)
                            setTimeEditing(null)

                        }}> Submit Edit</button>) : (
                    <button className="button" onClick={() =>
                        setTimeEditing(selectedEvent.id)}>Edit</button>
                )
                }

                <hr />

                <h2>Game</h2>
                {currentGame.title}

                <hr />
                    <select 
                    
                    onChange={
                        (evt) => {
                           const matchGame = games.find(g => g.id === parseInt(evt.target.value))
                            setCurrentGame(matchGame)
                        }
                    }
                    >
                        <option value="0">Choose new game</option>
                        
                    {
                        games.map(
                            (g) => {
                                if (g.title != currentGame.title) {
                                    return <option value={g.id}>{g.title}</option>
                                }
                                
                                
                            }
                        )
                    }
                    </select>
                
                



            </ul>
        </div>
    )
}