import React, { useState } from 'react';

function PageBar({setPage}){
    return (
        <div className="row">
            <div className="">
                <a className="btn-flat waves-effect" onClick={()=>setPage('RULES')}>Rules</a>
                <a className="btn-flat waves-effect" onClick={()=>setPage('PLAY')}>Play</a>
                <a className="btn-flat waves-effect" onClick={()=>setPage('LEADERBOARD')}>Leader Board</a>
                <a className="btn-flat waves-effect" onClick={()=>setPage('ADD STATE')}>Add State</a>
            </div>
        </div>
    );
}

function Scavenger(props){
    const [page,setPage] = useState('RULES');
    const [node,setNode] = useState('Start');

    return(<div className="container">
        <PageBar setPage={setPage}/>
    </div>);
}

export default Scavenger;