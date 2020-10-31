import React, { useEffect, useRef, useState } from 'react';
import { Control, Form } from 'react-redux-form';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { load_admin_states, load_leaders, load_user_states, scav_submit_answer } from '../redux/ActionCreators';

const baseUrl='http://localhost:5000/api';

function PageBar({page,setPage}){
    const rules=useRef(null);
    const play=useRef(null);
    const leader=useRef(null);
    const add=useRef(null);
    const btns=[rules,play,leader,add];
    useEffect(()=>{
        btns.forEach((btn)=>btn.current.classList.remove('scav-nav-selected'));
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
    },[page]);

    return (
        <div className="row">
            <div className="scav-nav">
                <a className="btn-flat waves-effect scav-nav-item" ref={rules} onClick={()=>setPage('RULES')}>Rules</a>
                <a className="btn-flat waves-effect scav-nav-item" ref={play} onClick={()=>setPage('PLAY')}>Play</a>
                <a className="btn-flat waves-effect scav-nav-item" ref={leader} onClick={()=>setPage('LEADERBOARD')}>Leader Board</a>
                <a className="btn-flat waves-effect scav-nav-item" ref={add} onClick={()=>setPage('ADD_STATE')}>Add State</a>
            </div>
        </div>
    );
}

function Play(props){
    const user_state=useSelector(state=>state.user_state);
    const dispatch=useDispatch();
    const [stateName,setStateName]=useState('start');
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
                            <a className="btn-flat waves-effect waves-white" onClick={()=>setStateName(state.name)}>{state.name}</a>
                        </div>
                    </div>)  
                })}
            </div>
            <div className="col s10">
                <div className="row">
                    <h3>{stateName}</h3>
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
                    {currentState.url.map(url=><a className="btn-flat waves-effect white-waves teal" onClick={()=>window.open(url, '_blank')} >Click Me</a>)}
                </div>
                <Form model="scav_answer" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s10">
                            <Control.text id="scav_answer" className="white-text" model=".answer" />
                            <label htmlFor="scav_answer">Hex Code</label>
                        </div> 
                    </div>
                    <div className="row">
                        <button type="submit" className="btn-flat waves-effect waves-white">Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

function LeaderBoard(props){
    const leaders=useSelector(state=>state.user_state.leaders);
    const dispatch=useDispatch();
    useEffect(()=>dispatch(load_leaders()),[JSON.stringify(leaders)]);
    return(
    <div>
        <div className="scav-leader">
            <div className="scav-leader-header">
                    <div className="scav-leader-title">Name</div>
                    <div className="scav-leader-title">Username</div>
                    <div className="scav-leader-title">Last Successful Submission</div>
                    <div className="scav-leader-title">Score</div>
            </div>
            {leaders.map(leader=>(
                <div className="scav-leader-row">
                    <div className="scav-leader-data">{leader.displayName}</div>
                    <div className="scav-leader-data">{leader.username}</div>
                    <div className="scav-leader-data">{leader.lastModified}</div>
                    <div className="scav-leader-data">{leader.score}</div>
                </div>
            ))}
        </div>
    </div>);
}

function Rules(props){
    return(<div>

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
            if(response.ok) alert('Successful');
            else alert(response.status+' '+response.statusText); 
        },err=>{throw err;})
        .catch(err=>alert(err));
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
            if(response.ok) alert('Successful');
            else alert(response.status+' '+response.statusText); 
        },err=>{throw err;})
        .catch(err=>alert(err));
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
            if(response.ok) alert('Successful');
            else alert(response.status+' '+response.statusText); 
        },err=>{throw err;})
        .catch(err=>alert(err));
    }
    function handleAddURL(values){
        alert(JSON.stringify(values));
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
            if(response.ok) alert('Successful');
            else alert(response.status+' '+response.statusText); 
        },err=>{throw err;})
        .catch(err=>alert(err));
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
            if(response.ok) alert('Successful');
            else alert(response.status+' '+response.statusText); 
        },err=>{throw err;})
        .catch(err=>alert(err));
    }

    return (
        <div>    
            <div className="card black">
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
                            <Control.text model=".problem" id="state_problem" className="white-text"/>
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
            <div className="card black">
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
            <div className="card black">
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
            <div className="card black">
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
            <div className="card black">
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
                <div>
                    {states.map(state=>{
                        return (<div className="card black">
                            <h4>{state.name}</h4>
                            <p className="white-text">{state.problem}</p>
                            {state.children.map(child=>{
                                return (<div className="row">
                                    <p className="white-text">{child.name}</p><br/>
                                    <p className="white-text">{child.answer}</p><br/>
                                    <p className="white-text">{child.score}</p><br/>
                                </div>)
                            })}
                            {state.url.map(ur=>{
                                return (<div className="row">
                                    <p className="white-text">{ur}</p><br/>
                                </div>)
                            })}
                            {state.images.map(image=>{
                                return (<div className="row">
                                    <img className="responsive-img" src={baseUrl+'/scavenger/state/image/'+state.name+'/'+image}/><br/>
                                </div>)
                            })}
                        </div>)
                    })}
                </div>
            )}
        </div>
    );
}

function Scavenger(props){
    const [page,setPage] = useState('RULES');

    return(<div className="container scav">
        <PageBar page={page} setPage={setPage}/>
        {
            {
                'ADD_STATE':<AddState />,
                'PLAY':<Play />,
                'LEADERBOARD':<LeaderBoard />,
                'RULES':<Rules />
            }[page]
        }
    </div>);
}

export default Scavenger;