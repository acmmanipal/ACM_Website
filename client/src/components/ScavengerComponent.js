import React, { useEffect, useRef, useState } from 'react';
import { actions, Control, Form } from 'react-redux-form';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { load_admin_states, load_leaders, load_user_states, scav_submit_answer,baseUrl } from '../redux/ActionCreators';
import {Redirect} from 'react-router-dom';
import M from 'materialize-css';
import * as ActionTypes from '../redux/ActionTypes';

const start=new Date("2020-11-05T00:00:00+05:30");
const end=new Date("2020-11-08T00:00:00+05:30");

function PageBar({page,setPage}){
    const rules=useRef(null);
    const play=useRef(null);
    const leader=useRef(null);
    const add=useRef(null);
    const btns=[rules,play,leader,add];
    const isAdmin=useSelector(state=>{if(state.user.loggedIn) return state.user.user.admin;
                                        else return false});
    useEffect(()=>{
        btns.forEach((btn)=> {if(btn.current) btn.current.classList.remove('scav-nav-selected');});
        if(rules.current){
            switch(page){
                case 'RULES':{
                    rules.current.classList.add('scav-nav-selected');
                    break;
                }
                case 'PLAY':{
                    play.current.classList.add('scav-nav-selected');
                    break;
                }
                case 'LEADERBOARD':{
                    leader.current.classList.add('scav-nav-selected');
                    break;
                }
                case 'ADD_STATE':{
                    add.current.classList.add('scav-nav-selected');
                    break;
                }
            }
        }
    },[page]);

    return (
        <div className="row">
            <div className="scav-nav">
                <a className="btn-flat waves-effect scav-nav-item" ref={rules} onClick={()=>setPage('RULES')}>Rules</a>
                <a className="btn-flat waves-effect scav-nav-item" ref={play} onClick={()=>setPage('PLAY')}>Play</a>
                <a className="btn-flat waves-effect scav-nav-item" ref={leader} onClick={()=>setPage('LEADERBOARD')}>Leader Board</a>
                {isAdmin&&<a className="btn-flat waves-effect scav-nav-item" ref={add} onClick={()=>setPage('ADD_STATE')}>Add State</a>}
            </div>
        </div>
    );
}

function Play(props){
    const user_state=useSelector(state=>state.user_state);
    const dispatch=useDispatch();
    const [stateName,setStateName]=useState('The Beginning');
    var currentState=user_state.states.filter(state=>state.name===stateName)[0];
    if(currentState===undefined) currentState={name:'',url:[],images:[],problem:''};
    useEffect(()=>dispatch(load_user_states()),[JSON.stringify(user_state)]);
   
    const handleSubmit = (values)=>{
        values={...values,state:stateName};
        dispatch(scav_submit_answer(values));
    };

    return(
        <div className="row">
            <div className="col s2">
                {user_state.states.map(state=>{
                    return (<div className="row">
                        <div className="col s12">
                            <a className="btn-flat waves-effect waves-white scav-state-btn" onClick={()=>setStateName(state.name)}>{state.name}</a>
                        </div>
                    </div>)  
                })}
            </div>
            <div className="col s10">
                <div className="row">
                    <div className="col s12 m8">
                        <h3>{stateName}</h3>
                    </div>
                    <div className="col s12 m4">
                        <div className="row">
                            <div className="col s6">
                                <div className="scav-score-label">Score: </div>
                            </div>
                            <div className="col s6">
                                <div className="scav-score-card">{user_state.score}</div>
                            </div>
                        </div>
                        
                        
                    </div>
                    
                </div>
                <div className="row">
                    <div className="scav-problem">
                        {currentState.problem}
                    </div>
                </div>
                <div className="row">
                    {currentState.images.map(image=>(
                        <div className="col s12 m5">
                            <img className="responsive-img" src={baseUrl+'/scavenger/state/image/'+currentState.name+'/'+image}/>
                        </div>
                    ))}
                </div>
                <div className="row">
                    {currentState.url.map(url=><a className="btn-flat waves-effect white-waves teal url-btn" onClick={()=>window.open(url, '_blank')} >Click Me</a>)}
                </div>
                <Form model="scav_answer" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text id="scav_answer" className="white-text" model=".answer" />
                            <label htmlFor="scav_answer">Hex Code</label>
                        </div> 
                    </div>
                    <div className="row">
                        <button type="submit" className="btn-flat waves-effect waves-white teal">Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

function LeaderBoard(props){
    const leaders=useSelector(state=>state.user_state.leaders);
    var count=0;
    const dispatch=useDispatch();
    useEffect(()=>dispatch(load_leaders()),[JSON.stringify(leaders)]);
    return(
    <div className="scav-leader">
        <table >
            <thead>
                <tr className="scav-leader-header">
                    <th className="scav-leader-title scav-rank">Rank</th>
                    <th className="scav-leader-title scav-name">Name</th>
                    <th className="scav-leader-title scav-user">Username</th>
                    <th className="scav-leader-title scav-mod">Last Successful Submission</th>
                    <th className="scav-leader-title scav-score">Score</th>
                </tr>
            </thead>
            <tbody>
                {leaders.map(leader=>(
                    <tr className="scav-leader-row" key={leader.username}>
                        <td className="scav-rank">{++count}</td>
                        <td className="scav-name">{leader.displayName}</td>
                        <td className="scav-user">{leader.username}</td>
                        <td className="scav-mod">{new Intl.DateTimeFormat('en-GB',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true}).format(new Date(leader.lastModified))}</td>
                        <td className="scav-score">{leader.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>);
}

function Rules(props){
    return(<div>
        <h2>Rules</h2>
        <ol className="scav-rules">
            <li className="scav-rule">Participants are only eligible for prizes provided that they have
registered for the hunt on techtatva.in with a valid user ID.</li>
            <li className="scav-rule">The hunt starts on 5th November-00:00 and ends on 9th
November-00:00.</li>
            <li className="scav-rule">There are multiple paths that one can take according to the clues
they follow and scores are awarded according to the difficulty level
of reaching each, however there is only one ‘correct’ murderer.</li>
            <li className="scav-rule">At each level, you will be given a problem statement and some
resources, either directly or indirectly, you have to use these to find
flags and unlock new states.</li>
            <li className="scav-rule">Each flag is in the form of a hexstring of 32 digits and only these
hexstrings will unlock new states.</li>
            <li className="scav-rule">The winners will be decided by their final score points, which will
differ according to the different endings reached/paths travelled. The maximum score you can reach is 750</li>
            <li className="scav-rule">In case of a tie, the time taken to reach the tied score will be
compared.</li>
            <li className="scav-rule">ACM Manipal reserves the rights to make any modifications to better
the event, important updates will be duly informed to the
participants.</li>
            <li className="scav-rule">Any violations such as cheating of any sort will lead to immediate
disqualifications, publishing any flag online is absolutely forbidden.</li>
            <li className="scav-rule">In case of any queries, feel free to reach out to us on our instagram
handle- acm_manipal or contact Shruti Verma- 7069973476.</li>
        </ol>
    </div>);
}

//Add image helper functions and component

function AddState(props){
    const states=useSelector(state=>state.admin_state.states);
    const [file,setFile] = useState(null);
    const [fileName,setFilename] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>dispatch(load_admin_states()),[JSON.stringify(states)]);

    function handleAddImage(values){
        const formData=new FormData();
        formData.append('file',file);
        axios.post(baseUrl+'/scavenger/image/'+values.name,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(response=>{
            if(response.status==200){
                M.toast({html:'Image Added'});
                dispatch(load_admin_states());
                dispatch(actions.reset('add_image'));
                setFile(null);
                setFilename('');
            }
            else M.toast({html:response.status+' '+response.statusText}); 
        },err=>{throw err;})
        .catch(err=>M.toast({html:err}));
    }
    
    function handleImageChange(event){
        setFilename(event.target.files[0].name);
        setFile(event.target.files[0]);
    }

    function handleAddState(values){
        fetch(baseUrl+'/scavenger/state',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values),
            credentials:'include'
        })
        .then(response=>{
            if(response.ok){
                M.toast({html:'State Added'});
                dispatch(load_admin_states());
                dispatch(actions.reset('add_state'));
            }else if(response.status===471){
                M.toast({html:'Your Session has Expired'});
                window.replace('/signIn');
                dispatch({type:ActionTypes.REMOVE_USER});
                localStorage.setItem('state',undefined);
            }
            else M.toast({html:response.status+' '+response.statusText}); 
        },err=>{throw err;})
        .catch(err=>M.toast({html:err}));
    }

    function handleAddChild(values){
        fetch(baseUrl+'/scavenger/children',
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values),
            credentials:'include'
        })
        .then(response=>{
            if(response.ok) {
                M.toast({html:'Child Added'});
                dispatch(load_admin_states());
                dispatch(actions.reset('add_child'));
            }else if(response.status===471){
                M.toast({html:'Your Session has Expired'});
                dispatch({type:ActionTypes.REMOVE_USER});
                localStorage.setItem('state',undefined);
            }
            else M.toast({html:response.status+' '+response.statusText});
        },err=>{throw err;})
        .catch(err=>M.toast({html:err}));
    }
    function handleAddURL(values){
        fetch(baseUrl+'/scavenger/url',
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values),
            credentials:'include'
        })
        .then(response=>{
            if(response.ok){
                M.toast({html:'URL Added'});
                dispatch(load_admin_states());
                dispatch(actions.reset('add_url'));
            }else if(response.status===471){
                M.toast({html:'Your Session has Expired'});
                dispatch({type:ActionTypes.REMOVE_USER});
                localStorage.setItem('state',undefined);
            }
            else M.toast({html:response.status+' '+response.statusText}); 
        },err=>{throw err;})
        .catch(err=>M.toast({html:err}));
    }

    function handleDeleteState(values){
        alert(JSON.stringify(values));
        fetch(baseUrl+'/scavenger/state',
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values),
            credentials:'include'
        })
        .then(response=>{
            if(response.ok){
                M.toast({html:'State Deleted'});
                dispatch(load_admin_states());
                dispatch(actions.reset('delete_state'));
            }else if(response.status===471){
                M.toast({html:'Your Session has Expired'});
                dispatch({type:ActionTypes.REMOVE_USER});
                localStorage.setItem('state',undefined);
            }
            else M.toast({html:response.status+' '+response.statusText});  
        },err=>{throw err;})
        .catch(err=>M.toast({html:err}));
    }

    return (
        <div className="scav-admin-interface">    
            <div className="card black scav-admin-card">
                <div className="row">
                    <h3>Add State</h3>
                </div>
                <Form model="add_state" onSubmit={handleAddState}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text model=".name" id="state_name" className="white-text"/>
                            <label for="state_name">State Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.textarea model=".problem" id="state_problem" className="scav-problem-box"/>
                            <label for="state_problem">Problem Statement</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <button type="submit" className="btn-flat waves-effect teal">Submit</button>  
                        </div>
                    </div>
                </Form>
                
            </div>
            <div className="card black scav-admin-card">
                <div className="row">
                    <h3>Add Child</h3>
                </div>
                <Form model="add_child" onSubmit={handleAddChild}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text model=".name" id="child_state_name" className="white-text"/>
                            <label for="child_state_name">State Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10 m3">
                            <Control.text model=".child_name" id="child_name" className="white-text"/>
                            <label for="child_name">Child Name</label>
                        </div>
                        <div className="input-field col s10 m3">
                            <Control.text model=".answer" id="state_answer" className="white-text"/>
                            <label for="state_answer">Answer</label>
                        </div>
                        <div className="input-field col s10 m3">
                            <Control.text model=".score" id="state_score" className="white-text"/>
                            <label for="state_score">Score</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <button type="submit" className="btn-flat waves-effect teal">Submit</button>  
                        </div>
                    </div>
                </Form>
            </div>
            <div className="card black scav-admin-card">
            <h3>Add Image</h3>
                <Form model="add_image" onSubmit={handleAddImage}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text model=".name" id="image_state_name" className="white-text"/>
                            <label for="image_state_name">State Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10 m3">
                            <Control.file model=".image" onChange={handleImageChange}/>
                            <p className="white-text">{fileName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <button type="submit" className="btn-flat waves-effect teal">Submit</button>  
                        </div>
                    </div>
                </Form>
            </div>
            <div className="card black scav-admin-card">
            <h3>Add URL</h3>
                <Form model="add_url" onSubmit={handleAddURL}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text model=".name" id="url_state_name" className="white-text"/>
                            <label for="url_state_name">State Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10 m3">
                        <Control.text model=".url" id="state_url" className="white-text"/>
                        <label for="state_url">URL</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <button type="submit" className="btn-flat waves-effect teal">Submit</button>  
                        </div>
                    </div>
                </Form>
            </div>
            <div className="card black scav-admin-card">
            <h3>Delete State</h3>
                <Form model="delete_state" onSubmit={handleDeleteState}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text model=".name" id="state_del" className="white-text"/>
                            <label for="state_del">State Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <button type="submit" className="btn-flat waves-effect teal">Submit</button>  
                        </div>
                    </div>
                </Form>
            </div>
            <h3>States</h3>
            {states&&(
                <div className="scav-admin-interface">
                    {states.map(state=>{
                        return (<div className="card black scav-admin-card">
                            <h4>Name: {state.name}</h4>
                            <p className="white-text">ProblemStatement : {state.problem}</p>
                            <h4>Children</h4>
                            {state.children.map(child=>{
                                return (<div className="row" key={child.name}>
                                    <hr/>
                                    <p className="white-text">Name: {child.name}</p><br/>
                                    <p className="white-text">Answer: {child.answer}</p><br/>
                                    <p className="white-text">Score: {child.score}</p><br/>
                                    <hr/>
                                </div>)
                            })}
                            <p className="white-text">URLs:</p>
                            {state.url.map(ur=>{
                                return (<div className="row" key={ur}>
                                    <p className="white-text">{ur}</p><br/>
                                </div>)
                            })}
                            <h4>Images: </h4>
                            <div className="row">
                            {state.images.map(image=>{
                                return (<div className="col s6" key={image}>
                                    <img className="responsive-img" src={baseUrl+'/scavenger/state/image/'+state.name+'/'+image}/><br/>
                                </div>)
                            })}
                            </div>
                        </div>)
                    })}
                </div>
            )}
        </div>
    );
}

function Scavenger(props){
    const [page,setPage] = useState('RULES');
    const loggedIn=useSelector(state=>state.user.loggedIn);
    const date=new Date();
    return(<div className="container scav">
        {(!loggedIn)&&<Redirect to="/signIn" />}
        {(date<start)&&<div className="not-started">The Show Hasn't Started Yet</div>}
        {(date>=start)&&(
            <>
            <PageBar page={page} setPage={setPage}/>
            {(date>end)&&<div className="scav-ended">You can keep playing! But score will no longer be counted towards leaderboard!</div>}
            {
                {
                    'ADD_STATE':<AddState />,
                    'PLAY':<Play />,
                    'LEADERBOARD':<LeaderBoard />,
                    'RULES':<Rules />
                }[page]
            }
            </>
        )}
        
    </div>);
}

export default Scavenger;