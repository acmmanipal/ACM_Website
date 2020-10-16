import React,{useState} from 'react';
import {actions} from 'react-redux-form';
import {useDispatch,useSelector} from 'react-redux';

function Dropdown({selected,model,param,items}){
    const [isOpen,setIsOpen]=useState(false);
    const dispatch=useDispatch();
    const state=useSelector(state=>state[model]);
    const handleClick=(model,param,selection)=>{
        dispatch(actions.change(model,{...state,[param]:selection}));
        setTimeout(setIsOpen(false),4000);
    };
    return(
    <div className="conatiner">
        <a className="btn-flat waves-effect waves-white drop" onClick={()=>setIsOpen(!isOpen)}>{selected}</a>
        {
            isOpen&&(
                <ul className="drop-list">
                    {
                    items.map((item)=>(
                    <li key={item}>
                        <a className='btn-flat waves-effect waves-teal drop-item' onClick={()=>handleClick(model,param,item)}>
                        {item}
                        </a>       
                    </li>
                ))
                    }
                </ul>)
        }
    </div>
    );
}

export default Dropdown;