import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getGames } from "./GameManager.js"
import "./game.css"

export const GameList = (props) => {

    const [games, setGames] = useState([])

    const history = useHistory()

    const loadGames = () => [
        getGames().then(data => setGames(data))
    ]

    useEffect(() => {
        loadGames()
    }, [])

    return (
        <article className="games">
            <h2>
                <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}>Register New Game</button>
            </h2>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <Link to={`/games/${game.id}`}>
                        <button className="update">Update Game</button>
                        </Link>
                        <button className="delete" onClick={() => deleteGame(game).then(loadGames)}>Delete Event</button>
                        <hr />
                    </section> 
                })
            }
        </article>
    )
}