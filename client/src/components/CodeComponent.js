import React from 'react';
import {Form,Control} from 'react-redux-form';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../subcomponents/DropdownComponent';

function runCode(src,inp){
    
}

function Code(props){
    const state=useSelector(state=>state);
    const dispatch=useDispatch();
    return (
        <div className="code-component">
            <div className="container">
                <div className="row">
                    <div className="editor">
                    <Form model="code">
                        <div className="row">
                            <div className="col s2">
                                <Dropdown model="code" param="lang" selected={state.code.lang} items={['C++','Python','Java']}/>
                            </div>
                        </div>
                        <div className="row">
                            <Control.textarea model=".source_code" type="textarea" className="code">{state.code.source_code}</Control.textarea>
                        </div>      
                    </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="input-output">
                        <div className="col s6">
                            <Form model="code_test">
                                <label for="input">Custom Input</label>
                                <Control.textarea model=".input" type="textarea" className="input" id="input"/> 
                            </Form>
                        </div>
                        <label for="output">Output</label>
                        <div className="col s6 output" id="output">
                        </div>
                        
                    </div>
                </div>
                <div className="code-buttons">
                <a className="waves-effect waves-white btn-flat bttn">Run Code</a>
                <a className="waves-effect waves-white btn-flat bttn">Submit</a>
                </div>
            </div>
        </div>
    );
}

export default Code;