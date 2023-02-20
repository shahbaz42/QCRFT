import { google } from 'googleapis';
import dotenv from "dotenv";
dotenv.config();

const createFormObject = async (tokens) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );
      oauth2Client.setCredentials(tokens);
      const forms = google.forms({
        version: 'v1',
        auth: oauth2Client,
      });
      resolve(forms);
    } catch (error) {
      reject(error)
    }
  })
}

const createNewForm = async ({
  title = "Sample Form",
  document_title = undefined,
  tokens
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const forms = await createFormObject(tokens);
      if (document_title === undefined) { document_title = title }
      const newForm = {
        info: {
          title,
          document_title,
        },
      };
      const res = await forms.forms.create({
        requestBody: newForm,
      });
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  })
}

const updateDescription = async ({
  formId,
  description = "Sample Description",
  tokens
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const forms = await createFormObject(tokens);
      const update = {
        requests: [
          {
            updateFormInfo: {
              info: {
                description: description
              },
              updateMask: "description"
            }
          },
        ]
      }
      const res = await forms.forms.batchUpdate({
        formId,
        requestBody: update
      });
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}

const setQuiz = async({
  formId,
  quiz=false,
  tokens,
}) => {
  return new Promise(async(resolve, reject) => {
    try{
      const forms = await createFormObject(tokens);
      const updateRequest = {
        requests: [
          {
            updateSettings: {
              settings: {
                quizSettings: {
                  isQuiz: quiz,
                },
              },
              updateMask: 'quizSettings.isQuiz',
            },
          },
        ],
      };

      const res = await forms.forms.batchUpdate({
        formId,
        requestBody: updateRequest
      });
      resolve(res.data);
    } catch(err){
      reject(err);
    }
  })
}

// // below code is for testing the above function.
// const test = async() => {
//   try {
//     const result = await setQuiz({
//       formId : "1r8FJfDV16peXNz9-CJtynpgrXX2JFe7Pvq9i5_7jgZE",
//       quiz: false,
//       tokens
//     })
//     console.log(result);
//   } catch (err) {
//     console.log(err)
//   }
// }

// test();


const quizData = JSON.parse(`{
  "title" : "ChatGPT Quiz",
  "description": "Test your knowledge of ChatGPT",
  "questions" :[
      {
          "question" : "What is the name of OpenAI's language model?",
          "type" : "RADIO",
          "options" : [ "Bert", "ChatGPT", "GPT-1", "GPT-3" ],
          "answer" : 1
      },
      {
          "question" : "Which company recently invested 10 billion dollars in OpenAI?",
          "type" : "RADIO",
          "options" : [ "Google", "Microsoft", "Amazon", "Apple" ],
          "answer" : 1
      }
  ]
}`)

const addQuestions = async ({
  formId,
  questions,
  score = 1,
  required = false,
  textWhenRight = "You got it!",
  textWhenWrong = "Sorry, that's wrong",
  tokens
}) => {

  const createRequestArray = (questions) => {
    let requests = [];
    questions.forEach((question, index) => {
      let request = {
        createItem: {
          item: {
            title: question.question,
            questionItem: {
                question: {
                    required: true,
                    grading: {
                        pointValue: score,
                        correctAnswers: {
                            answers: [{"value": question.options[question.answer]}]
                        },
                        whenRight: {text: textWhenRight},
                        whenWrong: {text: textWhenWrong}
                    },
                    choiceQuestion: {
                        type: question.type,
                        options: [
                        ]
                    }
                }
            }
        },
          location: {
            index: 0
          }
        }
      }
      question.options.forEach((option, index) => {
        request.createItem.item.questionItem.question.choiceQuestion.options.push({
          value: option,
          isOther: false
        })
      })
      requests.push(request);
    })
    return requests;
  }


  return new Promise(async (resolve, reject) => {
    try {
      const forms = await createFormObject(tokens);
      const requests = createRequestArray(questions);
      const update = {
        requests
      }
      const res = await forms.forms.batchUpdate({
        formId,
        requestBody: update
      });
      console.log(res.data);
      resolve(res.data)

    } catch (error) {
      console.log(error);
      reject(error)
    }
  })
}


// test
// createNewForm({ title: "Monkey42", document_title: "My Monkey Form", tokens});
// updateDescription({
//   formId: "1r8FJfDV16peXNz9-CJtynpgrXX2JFe7Pvq9i5_7jgZE",
//   description: "This is a test",
//   tokens
// })

// const questions = quizData.questions
// addQuestion({
//   formId: "1r8FJfDV16peXNz9-CJtynpgrXX2JFe7Pvq9i5_7jgZE",
//   questions : quizData.questions,
//   tokens
// })

export {
  createNewForm,
  updateDescription,
  setQuiz,
  addQuestions
}