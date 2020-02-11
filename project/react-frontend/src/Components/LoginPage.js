import React, {Component} from 'react';
import LoginForm from "../Containers/LoginForm";
import ProfessorStore from "../Stores/ProfessorStore";
import StudentStore from "../Stores/StudentStore";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentsDB: [],
            username: ' ',
            password: ' ',
            professorsDB: [],
            OK_Professor: false,
            OK_Student: false,
            professorID: 0,
            studentID: 0
        };

        this.store = new ProfessorStore();
        this.storeStud = new StudentStore();

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        };

        this.handleClick = (evt) => {
            if (evt.target.name === "login_prof") {
                let ok = 1;
                
                console.log("this.state.professorsDB : " + this.state.professorsDB)
                this.state.professorsDB.forEach(prof => {
                    if (prof.usernameDB === this.state.username && prof.passwordDB === this.state.password) {
                        ok = 0;
                        this.state.professorID = prof.id
                        // this.setState({professorID:prof.id})
                    }
                });

                if (ok === 0) {
                    this.state.OK_Professor = true
                    // this.setState({OK_Professor:true})

                }

                if (this.state.OK_Professor===true) {
                    this.props.history.push('/professor/' + this.state.professorID)
                } else {
                    alert("Datele de logare pentru profesor au fost introduse gresit!")
                }
            } else if (evt.target.name === "login_stud") {

                let ok_s = 1;
                
                
                console.log("this.state.studentsDB : " + this.state.studentsDB)
                this.state.studentsDB.forEach(stud => {
                    console.log(stud + " afisare stud")
                    if (stud.usernameStudDB === this.state.username && stud.passwordStudDB === this.state.password) {
                        ok_s = 0;
                        this.state.studentID = stud.id
                        // this.setState({studentID:stud.id})
                    }
                });
                if (ok_s === 0) {
                    this.state.OK_Student = true;
                    // this.setState({OK_Student:true})
                }
                
                console.log("user input: " + this.state.username + " ----- " + this.state.password)

                if (this.state.OK_Student) {
                    this.props.history.push('/student/' + this.state.studentID)
                } else {
                    alert("Datele de logare pentru student au fost introduse gresit!")
                }
            }

        }

    }


    componentDidMount() {
        this.store.getProfessors();
        this.store.emitter.addListener('GET_PROFESSORS_SUCCESS', () => {
            this.setState({
                professorsDB: this.store.professorsDB
            })
        })

        console.log(this.store.professorsDB)

        this.storeStud.getStudents();
        this.storeStud.emitter.addListener('GET_STUDENTS_SUCCESS', () => {
            this.setState({
                studentsDB: this.storeStud.studentsDB
            })
        })


    }

    render() {
        return (
            <div>
                <LoginForm
                    handleChange={(event) => this.handleChange(event)}
                    handleClick={(event) => this.handleClick(event)}
                />
            </div>
        )

    }
}

export default Login;


