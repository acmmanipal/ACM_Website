import {createStore,combineReducers,applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {code, code_test, add_contest, forgot_password, register,signIn, token, add_state, add_child, add_image, add_url, delete_state, scav_answer, reset_password} from './form';
import contest from './contest';
import user from './user';
import admin_state from './admin_states';
import user_state from './user_state';
const saveToLocalStorage=(state)=>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    }catch(e){
        console.log(e);
    }
};

const loadFromLocalStorage = ()=>{
    try{
        const serializedState=localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    }catch(e){
        console.log(e);
        return undefined;
    }
};

const persistedState=loadFromLocalStorage();

export const configureStore = ()=>{
    const store=createStore(combineReducers({
        contest:contest,
        user:user,
        admin_state:admin_state,
        user_state:user_state,
        ...createForms({
            register:register,
            signIn:signIn,
            forgot_password:forgot_password,
            code:code,
            token:token,
            code_test:code_test,
            add_contest:add_contest,
            add_state:add_state,
            add_child:add_child,
            add_image:add_image,
            add_url:add_url,
            delete_state:delete_state,
            scav_answer:scav_answer,
            reset_password:reset_password
        })
    }),persistedState,applyMiddleware(thunk,logger));
    store.subscribe(()=>saveToLocalStorage(store.getState()));
    return store;
};