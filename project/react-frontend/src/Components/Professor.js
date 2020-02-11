import React, {Component} from 'react'
import ActivityList from "../Containers/ActivityList";
import ProfessorStore from "../Stores/ProfessorStore";
import AddActivityForm from "../Containers/AddActivityForm";
import Header from "../Containers/Header";
import '../Style/button.css';
import FeedbackStore from "../Stores/FeedbackStore";
import ActivityStore from "../Stores/ActivityStore";
import StudentStore from "../Stores/StudentStore";

class Professor extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.store = new ProfessorStore();
        this.storeFeedback = new FeedbackStore();
        this.storeActivity = new ActivityStore();
        this.storeStudent = new StudentStore();
        this.state = {
            professor: [],
            activities: [],
            showForm: false,
            professorID: 0,
            name: ' ',
            start_date: new Date(),
            end_date: new Date(),
            feedbacks: [],
            count_emoji1: 0,
            count_emoji2: 0,
            count_emoji3: 0,
            count_emoji4: 0,
            activity: {},
            idActivityFeedback: 0,
            specificFeedbacksActivity: [],
            professor: null,
            nameProf: '',
            specialty: ''

        };

        this.state.professorID = this.props.match.params.id;
    }
    
    handleClick = (evt) => {
        let check = false
        this.state.activities.forEach(act => {
            if (act.id == this.state.idActivityFeedback) {
                console.log(act)
                check = true
            }
        })
        
        console.log("ProfessorPage check id for sending to feedback page check: " + check)
        if (!check) {
            console.log("Feedback not avalaible for this activity")
            alert("Feedback-ul pentru aceasta activitate este indisponibil!!")
        } else {
         this.props.history.push('/feedbackforactivity/' + this.state.idActivityFeedback)
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    };

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.start_date > this.state.end_date || this.state.end_date < this.state.start_date) {
            alert("Data de inceput trebuie sa fie mai mica decat data de sfarsit!");
        } else {
            const activity = {name: this.state.name, start_date: this.state.start_date, end_date: this.state.end_date,
                count_emoji1: 0, count_emoji2: 0, count_emoji3: 0, count_emoji4: 0
            };
            this.store.addOne(activity, this.state.professorID)
        }
    }


    componentDidMount() {

        this.store.getProfessors()

        this.store.emitter.addListener('GET_PROFESSORS_SUCCESS', () => {
            this.setState({
                professor: this.store.professors
            })
        });

        this.store.getAllActivities(this.state.professorID)

        this.store.emitter.addListener('GET_PROFESSOR_ACTIVITIES_SUCCESS', () => {
            this.setState({
                activities: this.store.activities
            })
        });
        
        
        this.store.getProfessorById(this.state.professorID);

        this.store.emitter.addListener('GET_PROFESSOR_SUCCESS',()=>{
            this.setState({
                professor:this.store.professor,
                nameProf:this.store.professor.nameProf,
                specialty:this.store.professor.specialty

            })
        });
    }

    render() {
        return (
            <div>
                <Header nameProf={this.state.nameProf} specialty={this.state.specialty}/>
                <ActivityList activities={this.state.activities}/>
                
                <div className="containerForFeedbackProfessor">
                    <input type="text" className="inputTextProfessorFeedback" name="idActivityFeedback" 
                        placeholder="Activity ID" onChange={this.handleChange}/>
                    <input type="button" className="btnSeeFeedback" value="See feedback"
                        onClick={this.handleClick}/>
                
                </div>
                <input type="button" className="btnAddActivity" value="Add Activity"
                       onClick={this.handleShowForm}/>
                <AddActivityForm
                    handleChange={(event) => this.handleChange(event)}
                    handleSubmit={(event) => this.handleSubmit(event)}
                    showForm={this.state.showForm}
                />

            </div>
        )


    }
}

export default Professor;


// this.storeFeedback.getFeedbacks();
        //
        // this.storeFeedback.emitter.addListener('GET_FEEDBACK_SUCCESS', () => {
        //     this.setState({
        //         feedbacks: this.storeFeedback.feedbacks
        //     })
        // });
        //
        // this.state.feedbacks.forEach(feedback => {
        //
        //
        //     if (feedback.emoji === "smiley face") {
        //         // this.state.count_emoji1++;
        //         this.setState({count_emoji1: this.state.count_emoji1 + 1});
        //     } else if (feedback.emoji === "frowny face") {
        //         // this.state.count_emoji2++;
        //         this.setState({count_emoji2: this.state.count_emoji2 + 1});
        //     } else if (feedback.emoji === "surprised face") {
        //         // this.state.count_emoji3++;
        //         this.setState({count_emoji3: this.state.count_emoji3 + 1});
        //     } else if (feedback.emoji === "confused face") {
        //         // this.state.count_emoji4++;
        //         this.setState({count_emoji4: this.state.count_emoji4 + 1});
        //     }
        //
        //     let activity = {
        //         id: feedback.id_activity,
        //         name: this.state.activity.name,
        //         start_date: this.state.activity.start_date,
        //         end_date: this.state.activity.end_date,
        //         count_emoji1: this.state.count_emoji1, count_emoji2: this.state.count_emoji2,
        //         count_emoji3: this.state.count_emoji3, count_emoji4: this.state.count_emoji4,
        //         professorID: this.state.activity.professorID
        //     };
        //     console.log(JSON.stringify(activity))
        //
        //     this.storeActivity.updateEmoji(feedback.id_activity, activity);
        // });