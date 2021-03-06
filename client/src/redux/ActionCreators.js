import { actions } from 'react-redux-form';
import * as ActionTypes from './ActionTypes';
import M from "materialize-css";
import user_state from './user_state';
export const baseUrl= 'http://localhost:5000/api';
export const baseUrlPublic='http://localhost:5000/public';

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
    fetch(baseUrl+'/contest',
    {
        method:'POST',
        body:JSON.stringify(pay),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    }).then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            M.toast({html:'Your Session has Expired'});
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
        }
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
    fetch(baseUrl+'/contest',{
        method:'GET',
        credentials:"include"
    }).then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            M.toast({html:'Your Session has Expired'});
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
        }
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

export const login = (values)=>(dispatch)=>{
    fetch(baseUrl+'/users/login',
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
            return response.json();
        } else if(response.status===401){
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            throw new Error('Invalid username or password');
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err;})
    .then(response=>{
        dispatch({type:ActionTypes.ADD_USER,payload:response.user});
        dispatch(actions.reset('signIn'));
    },err=>{throw(err);})
    .catch(err=>M.toast({html:err}));
};

export const login_with_token = (values)=>(dispatch)=>{
    fetch(baseUrl+'/users/jwt_login',
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
            return response.json();
        } else if(response.status===471){
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            throw new Error('Invalid username or password');
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err;})
    .then(response=>{
        dispatch({type:ActionTypes.ADD_USER,payload:response.user});
        dispatch(actions.reset('token'));
    },err=>{throw(err);})
    .catch(err=>M.toast({html:err}));
};

export const load_admin_states =() =>(dispatch)=>{
    fetch(baseUrl+'/scavenger/state',
    {
        method:'GET',
        credentials:'include'
    })
    .then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            M.toast({html:'Your Session has Expired'});
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            return {
                states:null
            };
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err})
    .then(response=>{
        dispatch({type:ActionTypes.ADD_ADMIN_STATE,payload:response.states});
    },err=>{throw err;})
    .catch(err=>alert(err));
}; 

export const load_user_states =() =>(dispatch)=>{
    fetch(baseUrl+'/scavenger/user_state',
    {
        method:'GET',
        credentials:'include'
    })
    .then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            M.toast({html:'Your Session has Expired'});
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            return {
                states:[],
                score:0,
                leaders:[]
            };
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err})
    .then(response=>{
        dispatch({type:ActionTypes.ADD_USER_STATE,payload:response});
    },err=>{throw err;})
    .catch(err=>alert(err));
};

export const scav_submit_answer = (values) => (dispatch) =>{
    fetch(baseUrl+'/scavenger/answer',
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(values),
        credentials:'include'
    })
    .then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            throw new Error('Session Expired');
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err;})
    .then(response=>{
        if(response.correct){
            M.toast({html:'You scored '+response.level_score+' points xD'});
            if(response.total===750) M.toast({html:'Congratulations Sherlock! You solved the case!'});
            dispatch(load_user_states());
            dispatch({type:ActionTypes.CHANGE_SCORE,payload:response.total});
            dispatch(actions.reset('scav_answer'));
        }else{
            M.toast({html:'No new states unlocked :/'});
        }
    },err=>{throw err;})
    .catch(err=>M.toast({html:err}));
};

export const load_leaders = () => (dispatch) =>{
    fetch(baseUrl+'/scavenger/leaderboard',
    {
        method:'GET',
        credentials:'include'
    })
    .then(response=>{
        if(response.ok) return response.json();
        else if(response.status===471){
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
            throw new Error('Session Expired');
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err})
    .then(response=>{
        dispatch({type:ActionTypes.CHANGE_LEADER,payload:response.leaders});
    },err=>{throw err;})
    .catch(err=>alert(err));
};

export const logout = () =>(dispatch)=>{
    fetch(baseUrl+'/users/logout',{
        method:'GET',
        credentials:'include'
    })
    .then(response=>{
        if(response.ok) {
            M.toast({html:'Logged Out'}) ;
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
        }
        else if(response.status===471){
            M.toast({html:'Your Session has Expired'});
            dispatch({type:ActionTypes.REMOVE_USER});
            localStorage.setItem('state',undefined);
        }
        else throw new Error(response.status+' '+response.statusText);
    },err=>{throw err;})
    .catch(err=>M.toast({html:err}));
};