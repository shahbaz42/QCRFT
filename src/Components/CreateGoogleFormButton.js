import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

export default function CreateGoogleFormButton() {
    const { quizData, createGoogleForm, formLink } = useApp();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [formLink]);

    return (
        <>
            {quizData.questions.length > 0 &&
                <div className="my-20">
                    <button
                        onClick={() => {
                            setLoading(true);
                            createGoogleForm();
                        }}
                        type="button"
                        className={`relative block w-full border-2 rounded-full border-dashed p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${formLink.length > 0
                                ? 'border-gray-500'
                                : 'border-gray-500'
                            }`}
                    >
                        {
                            (formLink.length === 0 && !loading) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 25 25"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="mx-auto h-12 w-12 text-gray-400"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                            </svg>
                        }

                        {
                            (formLink.length > 0) &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 25 25"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="mx-auto h-12 w-12 text-indigo-600"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                />
                            </svg>

                        }


                        <span className="mt-2 block text-lg font-medium text-gray-900">
                            {loading && "Creating Form..."}
                            {(!loading && formLink.length === 0) && "Create Google Form"}
                        </span>
                        {(formLink.length > 0) &&
                            <Link to={formLink} target="_blank" className="mt-2 block text-lg font-medium text-gray-900" >
                                {formLink.substring(0, 30) + "..."}
                            </Link>
                        }
                    </button>
                </div>
            }
        </>

    )
}
