import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = (props) => (

    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className="">
                Professor: {props.nameProf},  with specialty : {props.specialty}
            </Typography>
        </Toolbar>

    </AppBar>

);

export default Header;
