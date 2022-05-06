import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

  
    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (event) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel"> skill level</label>
                    <input type="text" name="skillLevel" className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players</label>
                    <input type="text" name="numberOfPlayers" className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker</label>
                    <input type="text" name="maker" className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <select onChange={changeGameState}
                        type="select"
                        name="gameTypeId"
                        >
                            <option value="0">GameTypes</option>
                            {
                                gameTypes.map(
                                    (type) => {
                                        console.log(type)
                                        return <option value={type.id} name="gameTypeId">{type.label}</option>
                                    }
                                )
                            }
                        </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}