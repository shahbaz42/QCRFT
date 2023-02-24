import { useApp } from '../../context/AppContext';

export default function NoQuizCreatedBox() {
    const { setQuizCreated } = useApp();
    return (
        <div className=" p-3 bg-white drop-shadow-md hover:drop-shadow-lg">
            <div className="">
                <button
                    type="button"
                    onClick={(e) => { setQuizCreated(true) }}
                    className="relative block w-full border-2 border-gray-400 hover:border-gray-800  bg-white border-dashed focus:border-solid p-12 text-cente"
                >
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        viewBox="0 0 25 25"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                        />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">Create a new Quiz</span>
                </button>
            </div>
        </div>
    )
}

