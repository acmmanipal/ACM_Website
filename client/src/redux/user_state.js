import * as ActionTypes from './ActionTypes';

const initial = {
    states:[],
    score:0,
    leaders:[]
};

const user_state = (state=initial,action)=>{
    switch(action.type){
        case ActionTypes.ADD_USER_STATE:return {...state,states:action.payload};
        case ActionTypes.CHANGE_SCORE:return {...state,score:action.payload};
        case ActionTypes.CHANGE_LEADER:return {...state,leaders:action.payload};
        default:return state;
    }
};

export default user_state;