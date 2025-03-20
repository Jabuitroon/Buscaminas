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

  const updateBoard = (row, column, casilla) => {
    console.log('Click en', 'f' + row + '_c' + column)
    let cloneStateGameItems = { ...gameItems }

    let squareTarget = cloneStateGameItems.aCampoMinas[row][column]

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

        if (squareTarget == '💣') return
        searchBombsAround(cloneStateGameItems, row, column, casilla)
      } else return
    }
  }

  let searchBombsAround = (cloneStateGameItems, numFilas, numColumnas, element) => {
    let rowsQuantity = gameItems.aCampoMinas.length
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
      cloneStateGameItems.aCampoMinas[numFilas][numColumnas] =
        numeroMinasAlrededor
    }
    console.log(cloneStateGameItems.aCampoMinas)
    element.classList.add(
      `${cloneStateGameItems.aCampoMinas[numFilas][numColumnas]}`
    )
    setGameItems(cloneStateGameItems)
  }

  const addFLag = (casilla) => {
    let cloneStateGameItems = { ...gameItems }

    if (!casilla.classList.contains('destapado')) {
      casilla.classList.toggle('icon-bandera')
    } else return
    if (casilla.classList.contains('icon-bandera')) {
      cloneStateGameItems.numberFlags--
    } else {
      cloneStateGameItems.numberFlags++
    }
    setGameItems(cloneStateGameItems)
  }

  useEffect(() => {
    esparcirMinas(gameItems)
  }, [])

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
