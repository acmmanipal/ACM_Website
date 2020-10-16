import React, { useState,useEffect } from 'react';
import {Control, Form} from 'react-redux-form';
import {useDispatch,useSelector} from 'react-redux';
import { createContest, loadContests } from '../redux/ActionCreators';

function ContestMenu(props){
    const [isOpen,setIsOpen] = useState(false);
    const contests=useSelector(state=>state.contest.contests);
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(loadContests());
    },[JSON.stringify(contests)]);
    const  handleSubmit=(values)=>{
        dispatch(createContest(values));
    };
    return (
    <div className="container contest-menu">
        <h2>Contest Page</h2>
        <a className="btn-flat waves-effect waves-white contest-btn" onClick={()=>setIsOpen(!isOpen)}>Add Contest</a>
        {
            isOpen&&(
                <div className="card black contest-card">
                        <Form model="add_contest" onSubmit={(values)=>handleSubmit(values)}>
                            <div className="row">
                                <div className="input-field col s9">
                                    <Control.text className="white-text" model=".name" id="contest_name"/>
                                    <label for="contest_name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s9">
                                    <Control.text className="white-text" model=".description" id="contest_description"/>
                                    <label for="contest_description">Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <Control.text className="white-text" model=".start_date" id="contest_start_date" />
                                    <label for="contest_start_date">Start Date ( dd/mm/yyyy )</label>
                                </div>
                                <div className="input-field col s4">
                                    <Control.text className="white-text" model=".start_time" id="contest_start_time"/>
                                    <label for="contest_start_time">Start Time (hh:mm)</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <Control.text className="white-text" model=".end_date" id="contest_end_date"/>
                                    <label for="contest_end_date">End Date ( dd/mm/yyyy )</label>
                                </div>
                                <div className="input-field col s4">
                                    <Control.text className="white-text" model=".end_time" id="contest_end_time"/>
                                    <label for="contest_end_time">End Time (hh:mm)</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s4">
                                    <button type="submit" className="btn-flat waves-effect waves-white teal"> Add </button>
                                </div>
                            </div>
                        </Form>
                </div>                
            )
        }
        <div className="contest-wrapper">
            <ul>
                <div className="row">
                {contests.map(contest=>{
                    var start=new Date(contest.start);
                    var end=new Date(contest.end);
                    return(
                    <div className="col s12 m6">
                        <li key={contest.name}>
                            <div className="card black contest-display-card">
                                <h4>{contest.name}</h4>
                                <div className='contest-desc'>{contest.description}</div>
                                <div className="row">
                                    <div className="col s6 start"><h7>Begins at:<br/>{new Intl.DateTimeFormat('en-GB',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true}).format(new Date(start))}</h7></div>
                                    <div className="col s6 start"><h7>Ends at:<br/>{new Intl.DateTimeFormat('en-GB',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true}).format(new Date(end))}</h7></div>
                                </div>
                                <div className="row">
                                    <a className="btn-flat waves-effect teal">Go!</a>
                                </div>
                            </div>
                        </li>
                    </div>
                );
                })}
                </div>
            </ul>
        </div>
    </div>
    );
}

export default ContestMenu;