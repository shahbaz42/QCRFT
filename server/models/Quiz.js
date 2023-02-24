import mongoose, { Mongoose } from 'mongoose';

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description : {
        type :String
    },
    questions : [
        {
            question: {
                type: String
            },
            type : {
                type: String
            },
            options : [],
            answer : {
                type : Number
            }
        }
    ],
    formId: {
        type : String
    },
    formURL: {
        type: String
    },
    conversationId : {
        ref: 'Conversation',
        type: mongoose.Schema.Types.ObjectId
    }
});

const Quiz = mongoose.model('Quiz', quizSchema );
export default Quiz;