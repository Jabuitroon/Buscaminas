import { useState, useEffect } from 'react'
import { Square } from './Square'

export function GameTable() {
  // Items del tablero
  const [gameItems, setGameItems] = useState({
    numMinasTotales: 30,
    numberFlags: 40,
    numFilas: 15,
    numColumnas: 15,
    aCampoMinas: [],
  })

  // Crear la matriz con parámetros (destructuración de objetos)
  const esparcirMinas = (gameItems) => {
    let cloneStateGameItems = { ...gameItems }
    // Copia de la matriz para alterar
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
    setGameItems(cloneStateGameItems)
  }
  useEffect(() => {
    esparcirMinas(gameItems)
  }, [])

  const updateBoard = (row, column) => {
    console.log('Click en', 'f' + row + '_c' + column)
    let cloneStateGameItems = { ...gameItems }

    let element = gameItems.aCampoMinas[row][column]
    let rowsQuantity = gameItems.aCampoMinas.length
    let numeroMinasAlrededor = element === true ? -1 : 0

    for (let zrow = row - 1; zrow <= row + 1; zrow++) {
      for (let zColumn = column - 1; zColumn <= column + 1; zColumn++) {
        if (
          zrow > -1 &&
          zrow < rowsQuantity &&
          zColumn > -1 &&
          zColumn < gameItems.numFilas
        ) {
          if (gameItems.aCampoMinas[zrow][zColumn] === '💣') {
            numeroMinasAlrededor++
          }
        }
      }
    }
    cloneStateGameItems.aCampoMinas[row][column] = numeroMinasAlrededor
    setGameItems(cloneStateGameItems)
  }

  const addFLag = (casilla) => {
    let cloneStateGameItems = { ...gameItems }

    casilla.classList.toggle('icon-bandera')
    if (casilla.classList.contains('icon-bandera')) {
      cloneStateGameItems.numberFlags--
    } else {
      cloneStateGameItems.numberFlags++
    }
    setGameItems(cloneStateGameItems)
  }

  return (
    <>
      <section className='tablero w-full flex'>
        <div className='tablero_template my-0 mx-auto'>
          <header>
            Numero de banderas Disponibles {gameItems.numberFlags}
          </header>
          {gameItems.aCampoMinas.map((fila, indexRow) => (
            <div key={indexRow} className='flex'>
              {fila.map((_, indexColumn) => (
                <Square
                  key={indexColumn}
                  hasBomb={indexRow[indexColumn]}
                  row={indexRow}
                  column={indexColumn}
                  updateBoard={updateBoard}
                  addFLag={addFLag}
                >
                  {gameItems.aCampoMinas[indexRow][indexColumn]}
                </Square>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
