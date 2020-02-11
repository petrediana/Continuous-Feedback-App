import React, {Component} from 'react'
import StudentStore from "../Stores/StudentStore";
import ActivityStore from "../Stores/ActivityStore";
import HeaderStudent from "../Containers/HeaderStudent";
import '../Style/button.css';

class Student extends Component {
    constructor(props) {
        super(props);
        this.store = new StudentStore();
        this.storeActivity = new ActivityStore()
        this.state = {
            activities: [],
            studentID: 0,
            activityID: 0,
            activity: null,
            student: null,
            nameStud: ''
        };

        this.state.studentID = this.props.match.params.id;

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        };


        this.handleClick = (evt) => {
            // check if the input activity exits in the db
            let check = false
            this.state.activities.forEach(act => {
                //console.log(act)
                if (act.id == this.state.activityID) {
                    check = true
                    this.state.activity = act
                }
            })
            
            console.log("Check variable value is: " + check)
            
            if (!check) {
                console.log("There is no activity with this id!!!: " + this.state.activityID)
                alert("Activitatea introdusa nu exista!!")
            } else {
                
                console.log('Input for activity: ' + this.state.activityID)
    
                /*this.store.emitter.addListener('GET_ACTIVITY_SUCCESS', () => {
                    this.setState({
                        activity: this.store.activity
                    })
                });
                this.store.getActivityById(this.state.activityID);
                debugger*/
    
                if (this.state.activity !== null) {
                    console.log("This is the input activity: " + this.state.activity.name)
                    let today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
    
                    today = yyyy + '-' + mm + '-' + dd;
                    
                    let start_date = ""
                    for (let i = 0; i < 10; ++i)
                         start_date += this.state.activity.start_date[i];
                    console.log("Fixed start date: " + start_date)
                    
                    let end_date = ""
                    for (let i = 0; i < 10; ++i)
                         end_date += this.state.activity.end_date[i];
                    console.log("Fixed end date: " + end_date)
                    
                     console.log("Current Date: " + today + " Start date: " + start_date +
                            " End date: " + end_date)
                    
                    if (today >= start_date && today <= end_date) {
                        console.log("Activity valid!!!")
                        this.props.history.push('/activity/' + this.state.studentID + "/" + this.state.activityID)
                    } else {
                        alert("Activitatea nu este disponibila!")
                        console.log("Activity not valid!!!")
                    }
                }
            }
        }

    }

    componentDidMount() {
       this.storeActivity.getActivities()
        this.storeActivity.emitter.addListener('GET_ACTIVITIES_SUCCESS', () => {
            this.setState({
                activities : this.storeActivity.activities
            })
        })
        
        this.store.getStudentById(this.state.studentID);

        this.store.emitter.addListener('GET_STUDENT_SUCCESS',()=>{
            this.setState({
                student:this.store.student,
                nameStud:this.store.student.nameStud,
            
            })
        });
    }


    render() {
        return (
            <div>
                <HeaderStudent nameStud={this.state.nameStud}/>

                <label><br/>
                    <input type="text" className="activityID" placeholder="Enter access code for activity"
                           name="activityID" defaultValue="" onChange={this.handleChange}/>
                    <br/>
                </label>
                <input type="button" className="btnAccess" value="Access Activity" onClick={this.handleClick}/>
            </div>
        )

    }
}

export default Student;
