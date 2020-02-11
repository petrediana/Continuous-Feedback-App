import React, {Component} from 'react';
import '../Style/feedbackStyle.css';
import HeaderFeedback from "../Containers/HeaderFeedback";
import FeedbackStore from "../Stores/FeedbackStore";
import ActivityStore from "../Stores/ActivityStore";
import StudentStore from "../Stores/StudentStore";

class FeedbackPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: false,
            text: "",
            activityID: 0,
            studentID: 0,
            activity:{}
        };

        this.store = new FeedbackStore();
        this.storeActivity = new ActivityStore();
        this.storeStudent = new StudentStore();




        this.state.studentID = this.props.match.params.stud_id;
        this.state.activityID = this.props.match.params.activity_id;

        this.storeStudent.getActivityById(this.state.activityID);

        this.storeStudent.emitter.addListener('GET_ACTIVITY_SUCCESS', () => {
            this.setState({
                activity: this.storeStudent.activity
            })
        });

        this.onClickImage = (e) => {
            this.setState({showText: true, text: e.target.alt});
            let tempDate = new Date();
            if (e.target.name === "smiley_face") {
                let time_stamp = tempDate.getFullYear()
                    + '-' + (tempDate.getMonth() + 1)
                    + '-' + tempDate.getDate()
                    + ' ' + tempDate.getHours()
                    + ':' + tempDate.getMinutes()
                    + ':' + tempDate.getSeconds()
                    + ' timeZone:' + Intl.DateTimeFormat().resolvedOptions().timeZone
                    
                    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
                
                const feedback = {
                    time_stamp: time_stamp,
                    id_activity: this.state.activityID,
                    emoji: "smiley face",
                    studentId: this.state.studentID
                };
                this.store.addFeedback(feedback);
                console.log("clicked smiley_face -> should update count for emoji1")
                console.log("This should be the current activity ID: " + this.state.activityID)
                this.storeActivity.updateCountEmoji1(this.state.activityID)
                
               /* this.state.activity.count_emoji1++;
                this.storeActivity.updateEmoji(this.state.activityID, this.state.activity);*/
                
            } else if (e.target.name === "frowny_face") {
                let time_stamp = tempDate.getFullYear()
                    + '-' + (tempDate.getMonth() + 1)
                    + '-' + tempDate.getDate()
                    + ' ' + tempDate.getHours()
                    + ':' + tempDate.getMinutes()
                    + ':' + tempDate.getSeconds()
                    + ' timeZone:' + Intl.DateTimeFormat().resolvedOptions().timeZone
                const feedback = {
                    time_stamp: time_stamp,
                    id_activity: this.state.activityID,
                    emoji: "frowny face",
                    studentId: this.state.studentID
                };
                this.store.addFeedback(feedback);
                
                console.log("clicked frowny_face -> should update count for emoji2")
                console.log("This should be the current activity ID: " + this.state.activityID)
                this.storeActivity.updateCountEmoji2(this.state.activityID)
                
                /*this.state.activity.count_emoji2++;
                this.storeActivity.updateEmoji(this.state.activityID, this.state.activity);*/
            } else if (e.target.name === "surprised_face") {
                let time_stamp = tempDate.getFullYear()
                    + '-' + (tempDate.getMonth() + 1)
                    + '-' + tempDate.getDate()
                    + ' ' + tempDate.getHours()
                    + ':' + tempDate.getMinutes()
                    + ':' + tempDate.getSeconds()
                    + ' timeZone:' + Intl.DateTimeFormat().resolvedOptions().timeZone
                const feedback = {
                    time_stamp: time_stamp,
                    id_activity: this.state.activityID,
                    emoji: "surprised face",
                    studentId: this.state.studentID
                };
                this.store.addFeedback(feedback);
                
                console.log("clicked surprised_face -> should update count for emoji3")
                console.log("This should be the current activity ID: " + this.state.activityID)
                this.storeActivity.updateCountEmoji3(this.state.activityID)
                
                /*this.state.activity.count_emoji3++;
                this.storeActivity.updateEmoji(this.state.activityID, this.state.activity);*/
            } else if (e.target.name === "confused_face") {
                let time_stamp = tempDate.getFullYear()
                    + '-' + (tempDate.getMonth() + 1)
                    + '-' + tempDate.getDate()
                    + ' ' + tempDate.getHours()
                    + ':' + tempDate.getMinutes()
                    + ':' + tempDate.getSeconds()
                    + ' timeZone:' + Intl.DateTimeFormat().resolvedOptions().timeZone
                const feedback = {
                    time_stamp: time_stamp,
                    id_activity: this.state.activityID,
                    emoji: "confused face",
                    studentId: this.state.studentID
                };
                this.store.addFeedback(feedback);
                
                console.log("clicked confused_face -> should update count for emoji4")
                console.log("This should be the current activity ID: " + this.state.activityID)
                this.storeActivity.updateCountEmoji4(this.state.activityID)
                
                /*this.state.activity.count_emoji4++;
                this.storeActivity.updateEmoji(this.state.activityID, this.state.activity);*/
            }

        };
        this.viewText = () => {
            return (<div className="container right">
                <div className="content">
                    {`The feedback chosen is ${this.state.text}`}
                </div>
            </div>);
        }
    }



    render() {
        const styleIcon = {
            width: '200px',
            height: '200px'
        }

        return (
            <div>
                <HeaderFeedback/>
                <h1 align="center">Choose a feedback </h1>
                <div id="images" align="center">
                    <img
                        src="https://www.pngkey.com/png/detail/12-120666_15-smiley-face-png-for-free-on-mbtskoudsalg.png"
                        name="smiley_face"
                        alt="smiley face" onClick={this.onClickImage} style={styleIcon}/>
                    <img
                        src="https://www.clipartwiki.com/clipimg/detail/30-303348_sad-face-emoji-png-world-happiness-report-2018.png"
                        name="frowny_face"
                        alt="frowny face" onClick={this.onClickImage} style={styleIcon}/>

                </div>
                <div id="images" align="center">
                    <img src="https://i.pinimg.com/originals/c3/f9/c6/c3f9c686344b29808057c8d13a687c29.png"
                         name="surprised_face"
                         alt="surprised face" onClick={this.onClickImage} style={styleIcon}/>
                    <img src="https://i.pinimg.com/originals/03/a4/9f/03a49f0a620a3bca447e33a38946086e.png"
                         name="confused_face"
                         alt="confused face" onClick={this.onClickImage} style={styleIcon}/>
                </div>
                {this.state.showText === true && this.viewText()}
            </div>
        );
    }

}

export default FeedbackPage;
