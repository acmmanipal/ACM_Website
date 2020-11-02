import React,{useState,useEffect} from 'react';
import BoardMemberCard from "./BoardMemberCard";
import M from "materialize-css";
import board from "../static/board-members.json";

function autoplay() {
    if (document.getElementById("slider")) {
      M.Carousel.getInstance(document.getElementById("slider")).next();
      setTimeout(autoplay, 5000);
    }
  }

function Board(props){
    const [boardmembers] = useState(board);
    useEffect(() => {
        const elems = document.querySelectorAll(".carousel");
        M.Carousel.init(elems, { duration: 1000, padding: 200 });
        autoplay();
      });
    return(
        <div id="board" className="board">
        <div className="container">
          <h2>Meet The Board</h2>
          <div className="row">
            <div className="col s12" id="prod-car">
              <div id="slider" className="carousel">
                <>
                  {boardmembers.map( (boardmember) => (
                    <BoardMemberCard key={boardmember.position + boardmember.name} {...boardmember}/>
                  ))}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Board;