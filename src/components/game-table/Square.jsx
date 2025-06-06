export const Square = ({ children, updateBoard, addFLag, row, column }) => {
  let setAttribute = 'f' + row + '_c' + column

  const handleClick = (miEvento) => {
    if (miEvento.type === 'contextmenu') {
      //obtenemos el elemento que ha disparado el evento
      let casilla = miEvento.currentTarget

      //detenemos el burbujeo del evento y su accion por defecto
      miEvento.stopPropagation()
      miEvento.preventDefault()

      //obtenemos la fila de las propiedades dataset.
      casilla.dataset.fila
      casilla.dataset.columna

      addFLag(casilla)
    }

    if (miEvento.type === 'click') {
      // console.log(miEvento)
      miEvento.stopPropagation()
      miEvento.preventDefault()

      let casilla = miEvento.currentTarget
      updateBoard(row, column, casilla)
    }
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`h-8 w-8 bg-[#BBBBBB] square`}
      id={setAttribute}
      data-fila={row}
      data-columna={column}
    >
      <span className='font-mono'>{children}</span>
    </div>
  )
}
