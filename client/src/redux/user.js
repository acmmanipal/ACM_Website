import * as ActionTypes from './ActionTypes';

const initial={
    user:null,
    loggedIn:false
};

const user=(state=initial,action)=>{

    switch(action.type){
        case ActionTypes.ADD_USER : return {loggedIn:true,user:action.payload};
        case ActionTypes.REMOVE_USER : return {loggedIn:false,user:null};
        default:return state;
    }
};

export default user;