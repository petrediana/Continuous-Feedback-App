import {EventEmitter} from 'fbemitter'

const SERVER = 'http://18.191.249.229:8080'

class ProfessorStore {
    constructor() {
        this.professors = [];
        this.activities = [];
        this.professorsDB = [];
        this.professor = null;

        this.emitter = new EventEmitter();
    }

    async getProfessors() {
        //console.log("aaaa getProfessors()")
        try {
            //let response = await fetch(` ${SERVER}/professor-api/professors`)
            let response = await fetch(`${SERVER}/professor-api/professors`)
            let data = await response.json();
            
            data.forEach(prof => {
                this.professorsDB.push({id: prof.id, usernameDB: prof.username, passwordDB: prof.pass});
            });


            this.emitter.emit('GET_PROFESSORS_SUCCESS');
        } catch (err) {
            console.log("aaaaaaa in getProfessors intra pe catch")
            console.warn(err);
            this.emitter.emit('GET_PROFESSORS_ERROR');
        }
    }
    
     async getProfessorById(professorID) {
        try {
            let response = await fetch(`${SERVER}/professor-api/professors/${professorID}`)
            let data = await response.json();
            this.professor = {id: data.id, nameProf: data.name, specialty: data.specialty};
            this.emitter.emit('GET_PROFESSOR_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_PROFESSOR_ERROR');
        }


    }
    

    async addOne(activity, professorID) {
        try {
            await fetch(`${SERVER}/professor-api/professors/${professorID}/activities/add `, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activity)
            })
            this.getAllActivities(professorID)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_ACTIVITY_ERROR')
        }
    }


    async getAllActivities(professorID) {
        try {
            let response = await fetch(`${SERVER}/professor-api/professors/${professorID}/activities`)
            let data = await response.json();
            this.activities = data;

            this.emitter.emit('GET_PROFESSOR_ACTIVITIES_SUCCESS');


        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_PROFESSOR_ACTIVITIES_ERROR');
        }
    }
}

export default ProfessorStore;
