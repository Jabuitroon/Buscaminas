import reactLogo from './assets/react.svg'
import { MinesweeperBanner } from './components/UI/BuscaMinasBanner'
import { GameTable } from './components/game-table/GameTable'

import './App.css'

function App() {
  return (
    <>
      <div className='max-h-3/4 flex items-center justify-center p-4 sm:p-6 md:p-24 bg-slate-100'>
        <div className='w-full max-w-4xl'>
          <MinesweeperBanner />

          <div className='mt-8 p-6 bg-white rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>How to Play</h2>
            <ul className='list-disc pl-5 space-y-2 text-left'>
              <li>Left-click to reveal a cell</li>
              <li>Right-click to place a flag on a suspected mine</li>
              <li>Numbers indicate how many mines are adjacent to that cell</li>
              <li>Clear all cells without mines to win!</li>
            </ul>
          </div>
        </div>
        <GameTable />
      </div>
    </>
  )
}

export default App
