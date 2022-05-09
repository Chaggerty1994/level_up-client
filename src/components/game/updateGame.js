import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeGame, getGameById, getGames } from "./GameManager";
import "./game.css"

export const UpdateGame = () => {

    const [selectedGame, setSelectedGame] = useState({})

    

    // setting state for the individual properties of a game.
    const [titleEditing, setTitleEditing] = useState(null)
    const [makerEditing, setMakerEditing] = useState(null)
    const [playersEditing, setPlayersEditing] = useState(null)
    const [skillEditing, setSkillEditing] = useState(null)

    // setting state for the updated text

    const [editingTitle, setEditingTitle] = useState("")
    const [editingMaker, setEditingMaker] = useState("")
    const [editingPlayers, setEditingPlayers] = useState("")
    const [editingSkill, setEditingSkill] = useState("")

    const { gameId } = useParams();

    const history = useHistory()

    useEffect(
        () => {
            getGameById(gameId).then((data) => {
                setSelectedGame(data)
                setEditingTitle(data.title)
                setEditingMaker(data.maker)
                setEditingPlayers(data.number_of_players)
                setEditingSkill(data.skill_level)
            })

        }, [gameId]
    )



    const editGame = (game) => {
            changeGame(game)
            
    }

    const editGameTitle = (gameObject) => {

        const copy = { ...gameObject }
        copy.title = editingTitle
        editGame(copy)
        setSelectedGame(copy)
        

    }

    const editGameMaker = (gameObject) => {

        const copy = { ...gameObject }
        copy.maker = editingMaker
        editGame(copy)
        setSelectedGame(copy)

    }

    const editGamePlayers = (gameObject) => {

        const copy = { ...gameObject }
        copy.number_of_players = editingPlayers
        editGame(copy)
        setSelectedGame(copy)

    }

    const editSkillLevel = (gameObject) => {

        const copy = { ...gameObject }
        copy.skill_level = editingSkill
        editGame(copy)
        setSelectedGame(copy)

    }


    console.log(selectedGame)

    return (
        <div className="gameDetails">
            <ul>
                <h2 className="gameTitle">Game Title</h2>
                <li className="title">
                    {titleEditing === selectedGame.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingTitle(evt.target.value)}
                            value={editingTitle} />
                    ) : (<>{selectedGame.title}</>)}
                </li>
                {titleEditing === selectedGame.id ? (
                    <button className="titleedit"
                        onClick={() => {
                            editGameTitle(selectedGame)
                            setTitleEditing(null)

                        }}> Submit Edit</button> ) : (
                    <button className="titlebutton" onClick={() => 
                        setTitleEditing(selectedGame.id)}>Edit</button>
                )
                }

                <hr />
                <h2 className="gameMaker">Game Maker</h2>
                <li className="maker">
                    {makerEditing === selectedGame.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingMaker(evt.target.value)}
                            value={editingMaker} />
                    ) : (<>{selectedGame.maker}</>)}
                </li>
                {makerEditing === selectedGame.id ? (
                    <button className="makeredit"
                        onClick={() => {
                            editGameMaker(selectedGame)
                            setMakerEditing(null)

                        }}> Submit Edit</button> ) : (
                    <button className="titlebutton" onClick={() => 
                        setMakerEditing(selectedGame.id)}>Edit</button>
                )
                }
            
                <hr />

                <h2 className="numOfPlayers">Number Of Players</h2>
                <li className="numOfPlayers">
                    {playersEditing === selectedGame.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingPlayers(evt.target.value)}
                            value={editingPlayers} />
                    ) : (<>{selectedGame.number_of_players}</>)}
                </li>
                {playersEditing === selectedGame.id ? (
                    <button className="makeredit"
                        onClick={() => {
                            editGamePlayers(selectedGame)
                            setPlayersEditing(null)

                        }}> Submit Edit</button> ) : (
                    <button className="titlebutton" onClick={() => 
                        setPlayersEditing(selectedGame.id)}>Edit</button>
                )
                }
               
                <hr />

                <h2 className="skillLevel">Skill Level</h2>
                <li className="skillLevel">
                    {skillEditing === selectedGame.id ? (
                        <input type="text"
                            onChange={(evt) => setEditingSkill(evt.target.value)}
                            value={editingSkill} />
                    ) : (<>{selectedGame.skill_level}</>)}
                </li>
                {skillEditing === selectedGame.id ? (
                    <button className="skilledit"
                        onClick={() => {
                            editSkillLevel(selectedGame)
                            setSkillEditing(null)

                        }}> Submit Edit</button> ) : (
                    <button className="titlebutton" onClick={() => 
                        setSkillEditing(selectedGame.id)}>Edit</button>
                )
                }


            </ul>
        </div>
    )
}