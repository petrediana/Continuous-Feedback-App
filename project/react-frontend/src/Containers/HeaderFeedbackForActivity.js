import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const HeaderFeedbackForActivity = (props) => (

    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className="">
                Feedback for activity with id : {props.idActivityFeedback}
            </Typography>
        </Toolbar>

    </AppBar>

);

export default HeaderFeedbackForActivity;
