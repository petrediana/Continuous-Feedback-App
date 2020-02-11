import React, {Component} from 'react'
import ActivityListStud from "../Containers/ActivityListStud";
import StudentStore from "../Stores/StudentStore";
import HeaderActivity from "../Containers/HeaderActivity";


class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityID: 0,
            studentID: 0,
            activity: {},


        };
        this.store = new StudentStore();

        this.state.studentID = this.props.match.params.stud_id;
        this.state.activityID = this.props.match.params.activity_id;



        this.handleClick = (evt) => {
            if (this.state.activity != null) {
                this.props.history.push('/feedback/' + this.state.studentID + '/' + this.state.activityID)
            }
        }
    }

    componentDidMount() {
        this.store.getActivityById(this.state.activityID);
        this.store.emitter.addListener('GET_ACTIVITY_SUCCESS', () => {
            this.setState({
                activity: this.store.activity
            })
        });


    }

    render() {
        return (
            <div>
                <HeaderActivity/>
                <ActivityListStud activity={this.state.activity}/>
                <input type="button" className="btnAccess" value="Add Feedback" onClick={this.handleClick}/>
            </div>
        )
    }
}

export default Activity;