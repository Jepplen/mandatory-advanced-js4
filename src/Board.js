import React from "react";

function Board({cells, onClickCell}){

  return (
    <>
      <div className="board">
        {cells.map(cell => (
          <div
            className="cell"
            key={cell.id}
            onClick={() => onClickCell(cell.id)}
            style={{backgroundColor: cell.backgroundColor}}>     
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
