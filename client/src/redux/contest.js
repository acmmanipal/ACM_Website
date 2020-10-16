import * as ActionTypes from './ActionTypes';

const initial={
    loading:false,
    errMess:'',
    failed:false,
    contests:[]
};

const contest = (state=initial,action) =>{
    switch(action.type){
        case ActionTypes.CONTEST_LOADING: return {...state,loading:true,errMess:'',failed:false};
        case ActionTypes.CONTEST_ADD: return {...state,loading:false,errMess:'',failed:false,contests:action.payload};
        case ActionTypes.CONTEST_FAILED : return {...state,loading:false,errMess:action.payload,failed:true};
        case ActionTypes.CONTEST_ADD_ONE: return {...state,contests:state.contests.concat(action.payload)};
        default:return state;
    }
};

export default contest;