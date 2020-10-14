import React from 'react';
import {Form,Control} from 'react-redux-form';
import {useDispatch, useSelector} from 'react-redux';

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
                        <Control.textarea model=".source_code" type="text-area" className="code"/>
                    </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="input-output">
                        <div className="col s6">
                            <Form model="code_test">
                                <Control.textarea model=".input" type="text-area" className="input" id="input"/>
                                <label for="input">Custom Input</label>
                            </Form>
                        </div>
                        <div className="col s6 output" id="output">
                        </div>
                        <label for="output">Output</label>
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