import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { changeEvent, getEventById } from "./EventManager"

export const UpdateEvent = () => {

    // const [selectedEvent, setSelectedEvent] = useState({})

    // const [organizer, setOrganizer] = useState("")
    // const [currentGame, setCurrentGame] = useState({})
    // const [games, setGames] = useState([])



    // // setting state for the individual properties of a game.
    // const [descriptionEditing, setDescriptionEditing] = useState(null)
    // const [dateEditing, setDateEditing] = useState(null)
    // const [timeEditing, setTimeEditing] = useState(null)
    // // const [gameEditing, setGameEditing] = useState(null)
    // // const [skillEditing, setSkillEditing] = useState(null)

    // // setting state for the updated text

    // const [editingDescription, setEditingDescription] = useState("")
    // const [editingDate, setEditingDate] = useState("")
    // const [editingTime, setEditingTime] = useState("")
    // // const [editingGame, setEditingGame] = useState("")
    // // const [editingSkill, setEditingSkill] = useState("")

    // const { eventId } = useParams();

    // const history = useHistory()

    // useEffect(
    //     () => {
    //         getGames().then(data => { setGames(data) })
    //     }, []
    // )



    // useEffect(
    //     () => {
    //     getEventById(eventId).then((data) => {
    //             console.log(data)
    //             setSelectedEvent(data)
    //             setEditingDescription(data.description)
    //             setEditingDate(data.date)
    //             setEditingTime(data.time)
    //             setOrganizer(data.organizer.user.first_name)

    //             if (games.length != 0) {
    //                 const onPageLoadGame = games.find(g => g.id === data.game.id)
    //                 console.log(onPageLoadGame)
    //                 setCurrentGame(onPageLoadGame)

    //             }



    //         })

    //     }, []
    // )



    // const editEvent = (event) => {
    //     changeEvent(event)

    // }

    // const editEventDescription = (eventObject) => {

    //     const copy = { ...eventObject }
    //     copy.description = editingDescription
    //     editEvent(copy)
    //     setSelectedEvent(copy)


    // }

    // const editEventDate = (eventObject) => {

    //     const copy = { ...eventObject }
    //     copy.date = editingDate
    //     editEvent(copy)
    //     setSelectedEvent(copy)

    // }

    // const editEventTime = (eventObject) => {

    //     const copy = { ...eventObject }
    //     copy.time = editingTime
    //     editEvent(copy)
    //     setSelectedEvent(copy)

    // }

    // const editEventGame = (gameId) => {

    //     const copy = { ...gameId }
    //     copy.game = currentGame
    //     console.log(copy)
    //     editEvent(copy)
    //     setSelectedEvent(copy)

    // }

    // // const editSkillLevel = (eventObject) => {

    // //     const copy = { ...eventObject }
    // //     copy.skill_level = editingSkill
    // //     editEvent(copy)
    // //     setSelectedEvent(copy)

    // // }
    // console.log(currentGame)

    // console.log(selectedEvent)

    const [selectedEvent, setSelectedEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: ""
    })
    const [games, setGames] = useState([])

    const { eventId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getEventById(eventId)
            .then(data => {
                data.game = data.game.id
                setSelectedEvent(data)} )
    }, [eventId])

    useEffect(() => {
        getGames()
        .then(data => setGames(data))
    },[])

    const editCurrentEvent = (evt) => {
        evt.preventDefault()

        const editEventObj = {
            id: selectedEvent.id,
            description: selectedEvent.description,
            date: selectedEvent.date,
            time: selectedEvent.time,
            game: selectedEvent.game,
            organizer: selectedEvent.organizer.id
        }

        changeEvent(editEventObj).then(() => history.push("/events"))
    }

    const updateEventState = (evt) => {
        const copy = {...selectedEvent}
        copy[evt.target.name] = evt.target.value
        setSelectedEvent(copy)
    }


    return (
        <form className="eventForm">
            <h2> Edit Event </h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game:</label>
                    <div className="control">
                        <select name="game"
                        value={selectedEvent.game}
                        onChange={updateEventState}>
                        
                        <option value="0">Select Game</option>
                        {games.map(game => [
                            <option key={game.id} value={game.id}>
                                {game.title}
                            </option>
                        ])}

                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" 
                    name="description" 
                    className="form-control"
                    value={selectedEvent.description}
                    onChange={updateEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" 
                    className="form-control"
                    value={selectedEvent.date}
                    onChange={updateEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="text" name="time"
                    className="form-control"
                    value={selectedEvent.time}
                    onChange={updateEventState}
                    />
                </div>
            </fieldset>

            <button onClick={editCurrentEvent}>Submit Edits</button>
        </form>
    )
}