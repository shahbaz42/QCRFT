import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv'
dotenv.config()

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAPI_KEY,
})

const getResponse = async (qn) => {
    return new Promise(async (resolve, reject) => {
        try {
            const qnU = qn.substring(0, 13500);
            const res = await api.sendMessage(qnU);
            resolve(res.text);
        } catch (err) {
            reject(err);
        }
    })
}

const generateQuizJSON = async ({
    text = "Earth is an amazing planet.",
    noOfQuestions = 2,
    difficulty = "Easy",
    options = "4",
    creativityLevel = "Optimal",
    length = "Short",
    tone = "Formal"
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const template =
                `Please generate a JSON document consisting of ${noOfQuestions} questions with "${options} options" each. strictly following the format (enclosed in <format></format> tags) below, from text enclosed in <text></text> tags:
            <format>
                {
                    "title" : "Title of the quiz",
                    "description" : "Description of the quiz",
                    "questions" :[
                        {
                            "question" : "Question text.",
                            "type" : "RADIO",
                            "options" : [ ],
                            "answer" : 0
                        },
                    ]
                }
            </format>

            Please make sure to check the following:
            1. question can only be a string
            2. type can only be "RADIO"
            3. options can only be an array of strings of size ${options} i.e. ${options} options for each question.
            4. answer is the index of the correct answer
            5. output only the JSON document nothing else.
            6. The questions should be of ${difficulty} difficulty.
            7. creativityLevel should be ${creativityLevel}.
            8. The questions should be ${length}.
            9. The tone of the questions should be ${tone}.
            
            <text>
            ${text}
            </text>
            `
            const res = await getResponse(template);
            const quizJSON = JSON.parse(res);
            resolve(quizJSON);
        } catch (err) {
            reject(err);
        }
    })

}

// const test = async () => {
//     const res = await generateQuizJSON({
//         text: `An earthquake is the shaking of the surface of the earth due to the sudden release of energy in the earth’s crust. As a result, seismic waves (also known as S waves) are created. The seismic activities in an area determine the type and intensity of the earthquake.
//         Earthquakes are caused due to sudden tectonic movements in the earth’s crust. When the tectonic plates slide over one another, there is a cause of orogeny which results in earthquakes and volcanoes. These disturbances cause vibrations that spread in all directions. As there is a relative motion of these plates, there is stress built up, which breaks by releasing the stored energy known as shock waves.
//         `,
//         noOfQuestions: 2,
//     });
//     console.log("Begin");
//     console.log(res);
// }
// test();

export { generateQuizJSON, getResponse }