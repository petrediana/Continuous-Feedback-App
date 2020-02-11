import React, {Component} from 'react'
import Professor from "../Components/Professor";
import Student from "../Components/Student";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Login from "../Components/LoginPage";
import Activity from "../Components/Activity";
import FeedbackPage from "../Components/FeedbackPage";
import FeedbackForActivityPage from "../Components/FeedbackForActivityPage";

class AppNavigation extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/professor/:id" component={Professor}/>
                    <Route path="/student/:id" component={Student}/>
                    <Route path="/activity/:stud_id/:activity_id" component={Activity}/>
                    <Route path="/feedback/:stud_id/:activity_id" component={FeedbackPage}/>
                    <Route path="/feedbackforactivity/:activity_id" component={FeedbackForActivityPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default AppNavigation;
