import { useState } from 'react'

export const Square = ({ hasBomb, children , updateBoard, addFLag, row, column }) => {
  const [isSelected, setIsSelected] = useState(false)

  let setAttribute = 'f' + row + '_c' + column

  const handleClick = (miEvento) => {
    // isSelected ? setIsSelected(false) : setIsSelected(true)
    if (miEvento.type === 'contextmenu') {
      //obtenemos el elemento que ha disparado el evento
      let casilla = miEvento.currentTarget
      

      //detenemos el burbujeo del evento y su accion por defecto
      miEvento.stopPropagation()
      miEvento.preventDefault()

      //obtenemos la fila de las propiedades dataset.
      let fila = casilla.dataset.fila
      let columna = casilla.dataset.columna

      console.log(fila, columna)
      addFLag(casilla)
    }

    if (miEvento.type === 'click') {
      // console.log(miEvento)
      miEvento.stopPropagation()
      miEvento.preventDefault()
      updateBoard(row, column)
    }
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`square ${
        isSelected ? 'is-selected' : ''
      } h-8 w-8 bg-[#BBBBBB]`}
      id={setAttribute}
      data-fila={row}
      data-columna={column}
    >
      {children}
    </div>
  )
}
