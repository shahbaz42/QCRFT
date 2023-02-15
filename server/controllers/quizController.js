import getSubtitles from "../utils/youtube-subtitles.js";
import  { generateQuizJSON } from "../utils/GPT.js";
import { createNewForm, updateDescription, addQuestions  } from "../utils/google-forms.js";


const createQuizController = async (req, res) => {
    try {
        const { url, num } = req.body;
        const youtube_video_id = url.split("v=")[1];
        const subtitles = await getSubtitles(youtube_video_id, {
            timestamps: false,
            removeFormatting: true,
        });
        console.log("subtitles fetched")
        const quizJSON = await generateQuizJSON({
            text : subtitles,
            noOfQuestions : Number(num),
        });
        console.log("quizJSON created")
        const form = await createNewForm({
            title: "Sample Form",
            document_title: undefined,
            tokens: req.user.tokens,
        });
        console.log("form created")
        // {
        //     formId: '1a-vo_Zr-M3jGI1XlDLbh0BkSA1h2eTMRcqBvXD1gIiw',
        //     info: { title: 'Sample Form', documentTitle: 'Sample Form' },
        //     revisionId: '00000002',
        //     responderUri: 'https://docs.google.com/forms/d/e/1FAIpQLSdUVlmrb_qxweJIcQOBLdLwkglsfjTNIjye0EjmOSkIGp3JMg/viewform'
        //   }
        const updateDescriptionResult = await updateDescription({
            formId: form.formId,
            description: quizJSON.description,
            tokens: req.user.tokens,
        });
        console.log("description updated")

        const addQuestionsResult = await addQuestions({
            formId: form.formId,
            questions: quizJSON.questions,
            tokens: req.user.tokens,
        });
        console.log("questions added")
        
        res.send(form.responderUri);

    } catch (err) {
        console.log("err----------------------------");
        console.log(err);
        res.status(500).json({
            result: "error",
            message: err.message
        })
    }
}

export { createQuizController }
