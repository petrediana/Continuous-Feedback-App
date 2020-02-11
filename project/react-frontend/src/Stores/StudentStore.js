import {EventEmitter} from 'fbemitter'

const SERVER = 'http://18.191.249.229:8080';

class StudentStore {
    constructor() {
        this.studentsDB = [];
        this.activities = [];
        this.emitter = new EventEmitter();
        this.activity = null;
        this.student = null;
    }

    // async getActivities() {
    //     try {
    //         let response = await fetch(`${SERVER}/activity-api/activities`);
    //         let data = await response.json();
    //         this.activities = data;
    //
    //         this.emitter.emit('GET_ACTIVITIES_SUCCESS');
    //
    //
    //     } catch (err) {
    //         console.warn(err);
    //         this.emitter.emit('GET_ACTIVITIES_ERROR');
    //     }
    // }

    async getActivityById(activityID) {
        try {
            let response = await fetch(`${SERVER}/activity-api/activities/${activityID}`)
            let data = await response.json();
            this.activity = {id: data.id, name: data.name, start_date: data.start_date, end_date: data.end_date};
            this.emitter.emit('GET_ACTIVITY_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_ACTIVITY_ERROR');
        }


    }
    
    
    async getStudentById(studentID) {
        try {
            let response = await fetch(`${SERVER}/student-api/students/${studentID}`)
            let data = await response.json();
            this.student = {id: data.id, nameStud: data.name};
            this.emitter.emit('GET_STUDENT_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_STUDENT_ERROR');
        }


    }

    async getStudents() {
        try {
            let response = await fetch(`${SERVER}/student-api/students`);
            let data = await response.json();

            data.forEach(stud => {
                this.studentsDB.push({id: stud.id, usernameStudDB: stud.username, passwordStudDB: stud.pass});
            });

            this.emitter.emit('GET_STUDENTS_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_STUDENTS_ERROR');
        }
    }
}

export default StudentStore;
