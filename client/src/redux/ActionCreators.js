import { actions } from 'react-redux-form';
import * as ActionTypes from './ActionTypes';

const convertToDate=(date,time)=>{
    date=date.split('/');
    time=time.split(':');
    var res=new Date();
    res.setDate(date[0]);
    res.setMonth(parseInt(date[1])-1);
    res.setFullYear(date[2]);
    res.setHours(time[0]);
    res.setMinutes(time[1]);
    return res;
};

export const createContest = (values) => (dispatch)=>{
    
    var start=convertToDate(values.start_date,values.start_time);
    var end=convertToDate(values.end_date,values.end_time);
    var pay={name:values.name,description:values.description,start:start,end:end};
    fetch('http://localhost:5000/api/contest',
    {
        method:'POST',
        body:JSON.stringify(pay),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    }).then(response=>{
        if(response.ok) return response.json();
        else{
            var err=new Error(response.status+' '+response.statusText);
            throw err;
        }
    },(err)=>{throw err;})
    .then(response=>{
        dispatch({type:ActionTypes.CONTEST_ADD_ONE,payload:response});
        dispatch(actions.reset('add_contest'));
    },(err)=>{throw err;})
    .catch(err=>{
        alert(err+'(from create');
    });
};

export const loadContests = ()=> (dispatch) =>{
    dispatch({type:ActionTypes.CONTEST_LOADING});
    fetch('http://localhost:5000/api/contest',{
        method:'GET',
        credentials:"include"
    }).then(response=>{
        if(response.ok) return response.json();
        else{
            var err=new Error(response.status+' '+response.statusText);
            throw err;
        }
    },err=>{throw err;})
    .then(response=>{
        dispatch({type:ActionTypes.CONTEST_ADD,payload:response});
    },err=>{throw err;})
    .catch(err=>alert(err+'(from load)'));
};