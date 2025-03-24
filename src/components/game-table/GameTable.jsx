import { useEffect } from 'react'
import { Square } from './Square'
import { LogIn } from 'lucide-react'

export function GameTable({ stateTable, modifyTable }) {
  let cloneStateGameItems = { ...stateTable }

  // Copia de la matriz para alterar
  cloneStateGameItems.tablePlayer = Array.from(
    { length: cloneStateGameItems.numFilas },
    () => Array(cloneStateGameItems.numColumnas).fill('')
  )

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

  console.log('state', cloneStateGameItems)

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
    </>
  )
}
