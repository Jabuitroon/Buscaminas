import reactLogo from './assets/react.svg'
import { GameTable } from './components/game-table/GameTable'

import './App.css'

function App() {
  return (
    <>
      <header className='flex w-4xl'>
        Buscaminas
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </header>
      <GameTable />
    </>
  )
}

export default App
