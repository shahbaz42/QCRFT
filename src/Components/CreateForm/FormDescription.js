import { useApp } from '../../context/AppContext';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function FormDescription() {
    const { quizData, setQuizData } = useApp();
    return (
        <div className=" p-3 rounded-xl bg-white drop-shadow-md hover:drop-shadow-lg">
            <div className="relative block w-full border-2 border-gray-200 bg-white border-dashed rounded-lg p-4 hover:border-gray-300 ">

                <div className='inline-block ml-2'>
                    <DocumentTextIcon className=" h-9 w-9 text-gray-600" />
                </div>
                <div className='inline-block ml-3'>
                    <input
                        type="text"
                        value={quizData.title}
                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                        placeholder="Enter Quiz Title"
                        className="text-gray-700 text-xl font-medium w-full outline-none hover:underline hover:decoration-dashed hover:decoration-2 hover:underline-offset-4 hover:decoration-gray-500 focus:underline focus:decoration-dashed focus:underline-offset-4 focus:decoration-gray-500 focus:decoration-2"
                    />
                    <input
                        type="text"
                        value={quizData.description}
                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                        placeholder="Enter Quiz Description"
                        className="text-gray-600 mt-1 text-sm font-normal w-full outline-none hover:underline hover:decoration-dashed hover:decoration-2 hover:underline-offset-4 hover:decoration-gray-500 focus:underline focus:decoration-dashed focus:underline-offset-4 focus:decoration-gray-500 focus:decoration-2"
                    />
                </div>


            </div>
        </div>
    )
}
