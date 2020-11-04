import React from 'react';

function Event(props){
    return (
        <div className="container event">
            <h2>Events</h2>
                <div className="row">
                    <div className="card event-scav">
                        <h5>Scavenger Hunt</h5>
                        <p>
                        Scavenger hunt is an event where 
                        people will engage in solving an interactive 
                        murder mystery by solving CTF-esque problems at 
                        each level. The event will have multiple storylines 
                        depending on the clue the player uncovers during 
                        the challenge. Hence, they will score points 
                        according to the different endings they will achieve.
                        </p>
                        <div className='event-btn-container'>
                            <a className="btn-flat waves-effect event-btn" href="/scavenger">Play!</a>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Event;