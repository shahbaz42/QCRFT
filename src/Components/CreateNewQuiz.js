import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useWindowSize from '../hooks/useWindowSize';

const CreateNewQuizBox = () => {
    const urlRef = useRef(null);
    const { token } = useAuth();
    const { subtitles, setSubtitles } = useApp();
    const [ loading, setLoading ] = useState(false);
    const [ sidebarOpen, setSidebarOpen ] = useState(true);
    const { width } = useWindowSize();

    useEffect(() => {
        if(width < 768){
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }

    }, [width])

    const {
        transcript,
        setTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
    }

    const textAreaHandler = (e) => {
        setSubtitles(e.target.value);
        setTranscript(e.target.value);
    }

    useEffect(() => {
        setSubtitles(transcript);
    }, [transcript])

    const fetchSubtitle = async () => {
        console.log("fetching subtitle");
        const url = urlRef.current.value;
        const params = {
            url: url
        }
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/quiz/getSubtitle`, { params, headers });
        setSubtitles(response.data.subtitles);
        setLoading(false);
    }

    return (
        <>
            {/* <div className='absolute right-0 top rotate-90' style={{"right" : "-12px"}}>
                
                <div className='bg-white rounded-br-xl inline rounded-bl-xl p-2 text-lg font-medium text-gray-600 drop-shadow-md hover:drop-shadow-xl hover:cursor-pointer'>
                    Reference
                </div>
            </div> */}
            <div className="right-sidebar bg-white h-screen relative drop-shadow-xl hover:drop-shadow-2xl" style={{width:`${sidebarOpen ?'540px':'0'}`, transition:"width 0.4s" }}>
                <div className='relative inline-block rotate-90' style={{ right: "68px", top: "100px" }}>
                    <div 
                        className='bg-white rounded-br-xl rounded-bl-xl p-2 text-lg text-center font-medium text-gray-600 drop-shadow-md hover:drop-shadow-xl hover:cursor-pointer'
                        style={{width : "100px", height: "46px"}}
                        onClick={() => { setSidebarOpen(!sidebarOpen) }}
                    >
                        Reference
                    </div>
                </div>
                <div className='relative bg-white block w-full  border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <div>
                        <div className="mt-1">
                            <div className='inline-block' style={{ width: "calc(100% - 85px - 45px - 40px )" }}>
                                <input ref={urlRef} className="dashed-input-indigo" type="text" name="name" id="name" placeholder="Youtube Link" />
                            </div>
                            <div className='inline-block' style={{ width: "85px", marginLeft: "20px" }}>
                                <button onClick={(e) => { fetchSubtitle(e); setLoading(true) }} className={`dashed-button-indigo dashed-microphone-button ${loading ? 'animate-pulse' : null}`}> {`${loading ? 'Fetching' : 'Fetch'}`} </button>
                            </div>
                            <div className='inline-block rounded-full w-11' style={{ marginLeft: "20px" }}>
                                <button onClick={(listening) ? SpeechRecognition.stopListening : startListening} className={`dashed-microphone-button ${listening ? 'animate-pulse' : null} `}>
                                    <MicrophoneIcon className='inline-block w-2/3 ' />
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <textarea className="dashed-textarea-indigo hideScroll" value={subtitles} onChange={textAreaHandler} style={{ height: "38vh" }} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const CreateNewQuizBigButton = (props) => {
    return (
        <div className="my-4">
            <button
                onClick={() => { props.setCreateQuizClicked(!props.createQuizClicked) }}
                type="button"
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 25 25"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mx-auto h-12 w-12 text-gray-400"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>

                <span className="mt-2 block text-lg font-medium text-gray-900">Create a new Quiz</span>
            </button>
        </div>
    )
}


export default function CreateNewQuiz() {
    const [createQuizClicked, setCreateQuizClicked] = useState(false)
    return (
        <>
            {!createQuizClicked ?
                <CreateNewQuizBigButton createQuizClicked={createQuizClicked} setCreateQuizClicked={setCreateQuizClicked} />
                :
                <CreateNewQuizBox />
            }
        </>
    )
}
