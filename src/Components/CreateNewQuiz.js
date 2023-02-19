import { useState } from 'react'
import PillShapedInput from './PillShapedInput'

export default function CreateNewQuiz() {
    const [createQuizClicked, setCreateQuizClicked] = useState(false)
    return (
        <>
            {!createQuizClicked &&
                <div className="my-4">
                    <button
                        onClick={() => { setCreateQuizClicked(!createQuizClicked) }}
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
            }

            {createQuizClicked &&
                <div className="my-4">
                    <div className='relative bg-white block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        <PillShapedInput />
                    </div>
                </div>
            }
        </>
    )
}
