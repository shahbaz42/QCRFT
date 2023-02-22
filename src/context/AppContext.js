import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AppContext = React.createContext();

export function useApp() {
    return useContext(AppContext)
}

export function AppProvider({ children }) {
    // to do : use localstorage for persistence.
    const { token } = useAuth();
    const [ subtitles, setSubtitles ] = useState("");
    const [ youtubeLink, setYoutubelink ] = useState("");
    const [ formLink, setFormLink ] = useState("");
    const [ quizData, setQuizData ] = useState({
        "title": "Create a Quiz",
        "description": "Please Create a Quiz",
        "questions": []
    });


    const addQuestions = async (num) => {
        // to implement warning when subtitle is not present.
        // depending on num call the api and add questions.
        // generate qArr
        // todo error handling

        const URL = `${process.env.REACT_APP_SERVER_URL}/api/quiz/createQuizJSONFromText`;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const data = {
            text: subtitles,
            num: num
        }
        const result = await axios.post(URL, data, { headers });
        console.log(result.data);
        // push the questions to the quizData question array.
        setQuizData( { ...quizData, questions: [...quizData.questions, ...result.data.quizJSON.questions] });
        console.log({quizData});
    
    }

    const createGoogleForm = async () => {
        // to implement warning when subtitle is not present.
        // depending on num call the api and add questions.
        // generate qArr
        // todo error handling

        const URL = `${process.env.REACT_APP_SERVER_URL}/api/quiz/createGoogleFormFromQuizJSON`;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const data = {
            quizJSON: quizData,
        }
        const result = await axios.post(URL, data, { headers });
        console.log(result.data);
        setFormLink(result.data.formLink);
        // push the questions to the quizData question array.
        // setQuizData( { ...quizData, questions: [...quizData.questions, ...result.data.quizJSON.questions] });
        // console.log({quizData});
    }
    

    const value = {
        subtitles,
        setSubtitles,
        youtubeLink,
        setYoutubelink,
        quizData,
        setQuizData,
        addQuestions,
        formLink,
        createGoogleForm
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}