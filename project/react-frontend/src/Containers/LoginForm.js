import React from 'react';
import '../Style/style.css';
import '../Style/formLogin.css';

const LoginForm = (props) => (
    <form className="formLogin">
        <label><br/>
            Username: <br/>
            <input type="text" className="usernameLogin" placeholder="Enter username" name="username" defaultValue=""
                   onChange={props.handleChange}/>
            <br/>
        </label>
        <label><br/>
            Password: <br/>
            <input type="password" className="passLogin" placeholder="Enter password" name="password" defaultValue=""
                   onChange={props.handleChange}/>
            <br/>
        </label>
        <label><br/>
            <input type="button" name="login_prof" className="btnProf" value="Login Professor" onClick={props.handleClick}/>
        </label><br/>
        <label><br/>
            <input type="button" name="login_stud" className="btnStud" value="Login Student" onClick={props.handleClick}/>
        </label>


    </form>
);


export default LoginForm;
