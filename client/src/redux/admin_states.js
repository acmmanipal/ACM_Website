import * as ActionTypes from './ActionTypes';

const initial={
    states:null
};

const admin_state=(state=initial,action)=>{
    switch(action.type){
        case ActionTypes.ADD_ADMIN_STATE:{
            return {states:action.payload};
        }
        default: return state;
    }
};

export default admin_state;