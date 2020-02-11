import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const HeaderStudent = (props) => (

    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className="">
                Student: {props.nameStud}
            </Typography>

        </Toolbar>

    </AppBar>

);

export default HeaderStudent;
