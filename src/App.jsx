import { useState } from 'react'
import { MinesweeperBanner } from './components/UI/BuscaMinasBanner'
import { GameTable } from './components/game-table/GameTable'

import './App.css'

function App() {
  // Items del tablero
  const [gameItems, setGameItems] = useState({
    numMinasTotales: 30,
    numberFlags: 40,
    numFilas: 15,
    numColumnas: 15,
    aCampoMinas: [],
    tablePlayer: [],
    isPlaying: true,
  })

  return (
    <>
      <div className='flex items-center justify-center sm:p-6 md:p-16 bg-slate-100 sm:h-full'>
        <div className='w-full max-w-4xl'>
          <MinesweeperBanner counterFlags={gameItems.numberFlags} />
          <div className='mt-4 p-6 bg-white rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>¿Como se juega?</h2>
            <ul className='list-disc pl-5 space-y-2 text-left'>
              <li>Left-click para revelar la celda</li>
              <li>Right-click para ubicar una bandera</li>
              <li>
                Los números indican cuántas minas hay en celdas adyacentes
              </li>
              <li>Limpia todas las celdas sin minas para ganar!</li>
            </ul>
          </div>
        </div>
        <GameTable stateTable={gameItems} modifyTable={setGameItems} />
      </div>
    </>
  )
}

export default App
