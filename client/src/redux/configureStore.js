import {createStore,combineReducers,applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {forgot_password, register,signIn} from './form';
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
        ...createForms({
            register:register,
            signIn:signIn,
            forgot_password:forgot_password
        })
    }),persistedState,applyMiddleware(thunk,logger));
    store.subscribe(()=>saveToLocalStorage(store.getState()));
    return store;
};