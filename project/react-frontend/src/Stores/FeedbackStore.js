import {EventEmitter} from 'fbemitter'

const SERVER = 'http://18.191.249.229:8080';

class FeedbackStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.feedbacks = [];
        this.specificFeedbacksActivity = [];
        this.smileyCount = 0;
        this.frownyCount = 0;
        this.surprisedCount = 0;
        this.confusedCount = 0;
    }

    async getFeedbacks() {
        try {
            let response = await fetch(`${SERVER}/feedback-api/feedbacks`)
            let data = await response.json();

            data.forEach(feedback => {
                this.feedbacks.push({id_activity: feedback.id_activity, emoji: feedback.emoji});
            });


            this.emitter.emit('GET_FEEDBACK_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_FEEDBACK_ERROR');
        }
    }
    
    async getSpecificFeedbackForActivity(idActivity) {
        try {
            let response = await fetch(`${SERVER}/feedback-api/feedbacks/${idActivity}`)
            let data = await response.json();
            
            this.specificFeedbacksActivity = data

            this.specificFeedbacksActivity.forEach(fdb => {
            if (fdb.emoji.includes("smiley")) {
                ++this.smileyCount
            }
            
            if (fdb.emoji.includes("frowny")) {
                ++this.frownyCount
            }
            
            if (fdb.emoji.includes("surprised")) {
                ++this.surprisedCount
            }
            
            if (fdb.emoji.includes("confused")) {
                ++this.confusedCount
            }
        })
            
            this.emitter.emit('GET_SPECIFIC_FEEDBACK_SUCCES')
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_SPECIFIC_FEEDBACK_ERROR');
        }
    }

    async addFeedback(feedback) {
        try {
            await fetch(`${SERVER}/feedback-api/feedbacks/add `, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            })

        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_FEEDBACK_ERROR')
        }
    }
}

export default FeedbackStore;