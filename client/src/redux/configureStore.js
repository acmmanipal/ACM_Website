import {createStore,combineReducers,applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {code, code_test, add_contest, forgot_password, register,signIn, token} from './form';
import contest from './contest';
import user from './user';
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
        const serializedState=localStorage.get('state');
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
        ...createForms({
            register:register,
            signIn:signIn,
            forgot_password:forgot_password,
            code:code,
            token:token,
            code_test:code_test,
            add_contest:add_contest
        })
    }),persistedState,applyMiddleware(thunk,logger));
    store.subscribe(()=>saveToLocalStorage(store.getState()));
    return store;
};