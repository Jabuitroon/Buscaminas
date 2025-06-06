import { useState, useEffect } from 'react'
import { Square } from './Square'

export function GameTable({ stateTable, modifyTable }) {
  let cloneStateGameItems = { ...stateTable }

  // Copia de la matriz para alterar
  cloneStateGameItems.tablePlayer = Array.from(
    { length: cloneStateGameItems.numFilas },
    () => Array(cloneStateGameItems.numColumnas).fill('')
  )

  // Modal si finaliza el juego
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)

  const resetGame = () => {
    modifyTable({
      numMinasTotales: 30,
      numberFlags: 40,
      numFilas: 15,
      numColumnas: 15,
      aCampoMinas: [],
      tablePlayer: [],
      isPlaying: true,
    })

    const cls = [
      'destapado',
      'icon-bandera',
      'around-0',
      'around-1',
      'around-2',
      'around-3',
    ]

    const elementos = document.querySelectorAll('.square')
    elementos.forEach((elemento) => {
      elemento.classList.remove(...cls)
    })
    esparcirMinas()
    setIsFinishModalOpen(false)
  }

  const [winner, setWinner] = useState(null)

  // Crear la matriz con parámetros (destructuración de objetos)
  const esparcirMinas = () => {
    // Copia de la matriz para alterar
    let cloneStateGameItems = { ...stateTable }
    cloneStateGameItems.aCampoMinas = Array.from(
      { length: cloneStateGameItems.numFilas },
      () => Array(cloneStateGameItems.numColumnas).fill('')
    )

    if (
      cloneStateGameItems.numMinasTotales >
      cloneStateGameItems.numFilas * cloneStateGameItems.numColumnas
    ) {
      throw new Error('Número de minas excede el tamaño del campo.')
    }

    let numMinasEsparcidas = 0

    while (numMinasEsparcidas < cloneStateGameItems.numMinasTotales) {
      let fila = Math.floor(Math.random() * cloneStateGameItems.numFilas)
      let columna = Math.floor(Math.random() * cloneStateGameItems.numColumnas)

      // Aseguramos que la matriz está inicializada y verificamos correctamente la celda
      if (!cloneStateGameItems.aCampoMinas[fila]) {
        cloneStateGameItems.aCampoMinas[fila] = []
      }

      if (cloneStateGameItems.aCampoMinas[fila][columna] !== '💣') {
        cloneStateGameItems.aCampoMinas[fila][columna] = '💣'
        console.log('Sembrada en', ' f' + fila + '_c' + columna)

        numMinasEsparcidas++
      }
    }

    cloneStateGameItems.tablePlayer = Array.from(
      { length: stateTable.numFilas },
      () => Array(stateTable.numColumnas).fill('')
    )

    modifyTable(cloneStateGameItems)
  }

  const updateBoard = (row, column, casilla) => {
    console.log('Click en', 'f' + row + '_c' + column)
    let cloneStateGameItems = { ...stateTable }

    if (
      row > -1 &&
      row < cloneStateGameItems.numFilas &&
      column > -1 &&
      column < cloneStateGameItems.numColumnas
    ) {
      if (
        !casilla.classList.contains('destapado') &&
        !casilla.classList.contains('icon-bandera')
      ) {
        casilla.classList.add('destapado')

        if (cloneStateGameItems.aCampoMinas[row][column] == '💣') {
          cloneStateGameItems.tablePlayer = cloneStateGameItems.aCampoMinas
          cloneStateGameItems.isPlaying = false
          setIsFinishModalOpen(true)
          modifyTable(cloneStateGameItems)
        }

        const up = searchBombsAround(cloneStateGameItems, row, column, casilla)
        modifyTable(up)
      } else return
    }
  }

  let searchBombsAround = (
    cloneStateGameItems,
    numFilas,
    numColumnas,
    element
  ) => {
    let rowsQuantity = stateTable.aCampoMinas.length
    let numeroMinasAlrededor = 0

    for (let zrow = numFilas - 1; zrow <= numFilas + 1; zrow++) {
      for (
        let znumColumnas = numColumnas - 1;
        znumColumnas <= numColumnas + 1;
        znumColumnas++
      ) {
        if (
          zrow > -1 &&
          zrow < rowsQuantity &&
          znumColumnas > -1 &&
          znumColumnas < cloneStateGameItems.numFilas
        ) {
          if (cloneStateGameItems.aCampoMinas[zrow][znumColumnas] === '💣') {
            numeroMinasAlrededor++
          }
        }
      }
    }
    if (cloneStateGameItems.aCampoMinas[numFilas][numColumnas] !== '💣') {
      cloneStateGameItems.tablePlayer[numFilas][numColumnas] =
        numeroMinasAlrededor
    }
    element.classList.add(
      `around-${cloneStateGameItems.tablePlayer[numFilas][numColumnas]}`
    )

    return cloneStateGameItems
  }

  const addFLag = (casilla) => {
    let cloneStateGameItems = { ...stateTable }

    if (!casilla.classList.contains('destapado')) {
      casilla.classList.toggle('icon-bandera')
    } else return
    if (casilla.classList.contains('icon-bandera')) {
      cloneStateGameItems.numberFlags--
    } else {
      cloneStateGameItems.numberFlags++
    }
    modifyTable(cloneStateGameItems)
  }

  useEffect(() => {
    esparcirMinas()
  }, [])

  return (
    <>
      <section className='tablero w-full flex'>
        <div className='tablero_template my-0 mx-auto'>
          {stateTable.tablePlayer.map((fila, indexRow) => (
            <div key={indexRow} className='flex'>
              {fila.map((_, indexColumn) => (
                <Square
                  key={indexColumn}
                  row={indexRow}
                  column={indexColumn}
                  updateBoard={updateBoard}
                  addFLag={addFLag}
                >
                  {stateTable.tablePlayer[indexRow][indexColumn]}
                </Square>
              ))}
            </div>
          ))}
        </div>
      </section>
      {isFinishModalOpen && (
        <div className='fixed inset-0 bg-gray-400/80 flex items-center justify-start p-4 z-50'>
          <div className='ml-48 bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
            <div className='bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center p-4'>
              <div className='w-full max-w-md bg-black/80 border-red-500/50 shadow-2xl'>
                <div className='p-8 text-center space-y-6'>
                  {/* Game Over Title */}
                  <div className='space-y-2'>
                    <h1 className='text-6xl font-bold text-red-500 tracking-wider animate-pulse'>
                      GAME
                    </h1>
                    <h1 className='text-6xl font-bold text-red-400 tracking-wider animate-pulse'>
                      OVER
                    </h1>
                  </div>

                  <div className='text-6xl animate-bounce'>💣</div>

                  {/* Score Section */}
                  {/* <div className='space-y-2'>
                    <p className='text-gray-300 text-lg'>Puntuación final</p>
                    <p className='text-4xl font-bold text-yellow-400'>12,450</p>
                    <div className='flex items-center justify-center gap-2 text-yellow-500'></div>
                  </div> */}

                  <div className='space-y-3 pt-4'>
                    <button
                      className='w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4'
                      size='lg'
                      onClick={resetGame}
                    >
                      Jugar de nuevo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
