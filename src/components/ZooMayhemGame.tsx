"use client"

import React, { useState, useEffect } from "react"
import { Twitter, Linkedin } from "lucide-react"

const ZooMayhemGame = () => {
  const [gameState, setGameState] = useState("animal-select") // animal-select, name-select, game
  const [animalEmoji, setAnimalEmoji] = useState("")
  const [animalName, setAnimalName] = useState("")
  const [players, setPlayers] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [position, setPosition] = useState({ x: 50, y: 50 })

  // All animal emojis available for selection
  const animalEmojis = [
    { emoji: "🦁", name: "Lion" },
    { emoji: "🐯", name: "Tiger" },
    { emoji: "🐻", name: "Bear" },
    { emoji: "🐨", name: "Koala" },
    { emoji: "🐼", name: "Panda" },
    { emoji: "🦊", name: "Fox" },
    { emoji: "🦝", name: "Raccoon" },
    { emoji: "🐮", name: "Cow" },
    { emoji: "🐷", name: "Pig" },
    { emoji: "🐭", name: "Mouse" },
    { emoji: "🐹", name: "Hamster" },
    { emoji: "🐰", name: "Rabbit" },
    { emoji: "🦇", name: "Bat" },
    { emoji: "🐻‍❄️", name: "Polar Bear" },
    { emoji: "🐵", name: "Monkey" },
    { emoji: "🐸", name: "Frog" },
  ]

  // Simulated other players (in a real game, this would come from a server)
  useEffect(() => {
    const simulatedPlayers = [
      { id: 1, name: "Leo", emoji: "🦁", position: { x: 30, y: 40 } },
      { id: 2, name: "Ellie", emoji: "🐘", position: { x: 70, y: 60 } },
      { id: 3, name: "Monty", emoji: "🐒", position: { x: 20, y: 70 } },
      { id: 4, name: "Zara", emoji: "🦓", position: { x: 80, y: 30 } },
    ]

    setPlayers(simulatedPlayers)

    // Simulate player movement
    const moveInterval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((player) => ({
          ...player,
          position: {
            x: Math.max(0, Math.min(100, player.position.x + (Math.random() * 10 - 5))),
            y: Math.max(0, Math.min(100, player.position.y + (Math.random() * 10 - 5))),
          },
        })),
      )
    }, 3000)

    return () => clearInterval(moveInterval)
  }, [])

  // Handle movement with arrow keys
  useEffect(() => {
    if (gameState !== "game") return

    const handleKeyDown = (e) => {
      const step = 5

      switch (e.key) {
        case "ArrowUp":
          setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - step) }))
          break
        case "ArrowDown":
          setPosition((prev) => ({ ...prev, y: Math.min(100, prev.y + step) }))
          break
        case "ArrowLeft":
          setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - step) }))
          break
        case "ArrowRight":
          setPosition((prev) => ({ ...prev, x: Math.min(100, prev.x + step) }))
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState])

  const handleAnimalSelect = (emoji) => {
    setAnimalEmoji(emoji)
    setGameState("name-select")
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (animalName.trim()) {
      setGameState("game")
      // In a real game, we would connect to server here
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: animalName, message: newMessage }])
      setNewMessage("")
    }
  }

  const sendEmoji = (emoji) => {
    setChatMessages([...chatMessages, { sender: animalName, message: emoji, isEmoji: true }])
  }

  // Render the appropriate screen based on game state
  const renderGameScreen = () => {
    switch (gameState) {
      case "animal-select":
        return (
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">Choose Your Animal</h2>

            <div className="grid grid-cols-4 gap-4">
              {animalEmojis.map((animal) => (
                <button
                  key={animal.emoji}
                  onClick={() => handleAnimalSelect(animal.emoji)}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-4 rounded-lg shadow transition flex flex-col items-center"
                >
                  <div className="text-4xl mb-2">{animal.emoji}</div>
                  <span className="text-xs">{animal.name}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case "name-select":
        return (
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">Name Your Animal</h2>

            <div className="flex justify-center mb-6">
              <div className="text-6xl">{animalEmoji}</div>
            </div>

            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={animalName}
                onChange={(e) => setAnimalName(e.target.value)}
                placeholder="Enter animal name..."
                className="w-full p-2 border border-amber-300 rounded mb-4 bg-amber-50"
                maxLength={12}
                required
              />

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
              >
                Start Playing!
              </button>
            </form>

            <button
              onClick={() => setGameState("animal-select")}
              className="mt-6 text-amber-600 hover:text-amber-800 text-center w-full"
            >
              ← Go back
            </button>
          </div>
        )

      case "game":
        return (
          <div className="bg-green-100 w-full h-full flex flex-col rounded-lg shadow-lg overflow-hidden">
            {/* Game world */}
            <div className="flex-grow relative overflow-hidden bg-green-200">
              {/* Game environment */}
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-green-100 rounded-lg">
                {/* Trees and decorations */}
                <div className="absolute top-10 left-10 text-4xl">🌳</div>
                <div className="absolute top-20 left-30 text-4xl">🌲</div>
                <div className="absolute top-10 right-20 text-4xl">🌳</div>
                <div className="absolute bottom-10 right-30 text-4xl">🌲</div>
                <div className="absolute bottom-20 left-40 text-4xl">🌳</div>
                <div className="absolute top-40 right-40 text-4xl">🏠</div>
                <div className="absolute top-70 left-70 text-4xl">⛲</div>

                {/* Other players */}
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="absolute transition-all duration-1000"
                    style={{
                      left: `${player.position.x}%`,
                      top: `${player.position.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">{player.emoji}</div>
                      <div className="bg-white px-2 py-1 rounded-full text-xs shadow">{player.name}</div>
                    </div>
                  </div>
                ))}

                {/* Player character */}
                <div
                  className="absolute transition-all duration-200"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-4xl">{animalEmoji}</div>
                    <div className="bg-amber-200 px-2 py-1 rounded-full text-xs shadow font-bold">{animalName}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat and controls */}
            <div className="bg-amber-50 p-3">
              <div className="flex space-x-2 mb-2">
                <button onClick={() => sendEmoji("❤️")} className="text-2xl p-1 hover:bg-amber-100 rounded">
                  ❤️
                </button>
                <button onClick={() => sendEmoji("👋")} className="text-2xl p-1 hover:bg-amber-100 rounded">
                  👋
                </button>
                <button onClick={() => sendEmoji("😊")} className="text-2xl p-1 hover:bg-amber-100 rounded">
                  😊
                </button>
                <button onClick={() => sendEmoji("🎮")} className="text-2xl p-1 hover:bg-amber-100 rounded">
                  🎮
                </button>
                <button onClick={() => sendEmoji("🌟")} className="text-2xl p-1 hover:bg-amber-100 rounded">
                  🌟
                </button>
              </div>

              <form onSubmit={sendMessage} className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type to chat..."
                  className="flex-grow p-2 border border-amber-300 rounded-l bg-amber-50"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-r"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-200 p-4">
      {gameState === "game" ? (
        <div className="relative w-full max-w-4xl h-96 md:h-[600px]">
          <div className="absolute top-0 left-0 right-0 text-center">
            <h1 className="text-3xl font-bold text-amber-800 bg-amber-100 inline-block px-4 py-2 rounded-b-lg shadow">
              Hisham's Zoo Mayhem
            </h1>
          </div>

          {renderGameScreen()}

          {/* Chat messages */}
          <div className="absolute left-2 top-12 bottom-20 w-64 overflow-y-auto bg-white bg-opacity-70 rounded p-2">
            <h3 className="font-bold text-amber-800 mb-1">Messages</h3>
            <div className="space-y-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-sm">
                  <span className="font-bold">{msg.sender}:</span>{" "}
                  {msg.isEmoji ? <span className="text-xl">{msg.message}</span> : msg.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-amber-800 mb-6">Hisham's Zoo Mayhem</h1>
          <p className="text-amber-700 mb-8 text-center max-w-md">
            Welcome to the zoo! Choose your animal, give it a name, and join the mayhem!
          </p>
          {renderGameScreen()}
        </>
      )}
      <footer className="w-full py-4 text-center bg-amber-100 rounded-lg mt-4 shadow-md">
        <p className="text-amber-800 mb-2">Created by Hisham</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://x.com/Solo_Level_27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 transition-colors"
          >
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://www.linkedin.com/in/hisham86/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 transition-colors"
          >
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default ZooMayhemGame 