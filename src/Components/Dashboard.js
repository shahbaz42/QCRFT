/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Draggable from 'react-draggable'
import MCQ from './Questions/MCQ'
import DividerWithButton from './DividerWithButton'
import RightSidebar from './RightSidebar'
import CreateGoogleFormButton from './CreateGoogleFormButton';
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import NoQuizCreatedBox from './CreateForm/NoQuizCreatedBox'
import FormDescription from './CreateForm/FormDescription'
import useWindowSize from '../hooks/useWindowSize'
import {
    ChartBarIcon,
    FolderIcon,
    InboxIcon,
    Bars3Icon,
    XMarkIcon,
    AdjustmentsHorizontalIcon,
    DocumentPlusIcon,
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'New Quiz', href: '#', icon: DocumentPlusIcon, current: true },
    { name: 'Setting', href: '#', icon: AdjustmentsHorizontalIcon, current: false },
    { name: 'Forms', href: '#', icon: FolderIcon, current: false },
    { name: 'Resources', href: '#', icon: InboxIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const { quizData, setQuizData, addQuestions, quizCreated } = useApp();
    const { currentUser, logout } = useAuth();
    const nodeRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowSize();

    // const [ quizData, setQuizData ] = useState({
    //     "title": "Create a Quiz",
    //     "description": "Please Create a Quiz",
    //     "questions": [
    //         // {
    //         //     "question": "What is the name of OpenAI's language model?",
    //         //     "type": "RADIO",
    //         //     "options": ["Bert", "ChatGPT", "GPT-1", "GPT-3"],
    //         //     "answer": 1
    //         // },
    //         // {
    //         //     "question": "Which company recently invested 10 billion dollars in OpenAI?",
    //         //     "type": "RADIO",
    //         //     "options": ["Google", "Microsoft", "Amazon", "Apple"],
    //         //     "answer": 1
    //         // }
    //     ]
    // });

    useEffect(() => {
    }, []);


    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">QuizCraft</h1>
                                    </div>
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-base font-medium'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="inline-block h-10 w-10"
                                                src={currentUser.picture}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{currentUser.name}</p>
                                            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 hover:cursor hover:underline" onClick={logout}>Logout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0" style={{ position: "fixed", height: "100vh", zIndex: 2 }}>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 border-r drop-shadow-xl hover:drop-shadow-2xl border-white bg-white">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">QuizCraft</h1>
                            </div>
                            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 "
                                        src={currentUser.picture}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{currentUser.name}</p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 hover:cursor-pointer hover:underline" onClick={logout}>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 py-0.5 sm:pl-3 sm:py-1.5 bg-gray-100">
                            <button
                                type="button"
                                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                                <h1 className='-mt-0.5 text-2xl font-bold inline-flex tracking-tight text-gray-800 sm:text-2xl' style={{ marginLeft: "calc(50vw - 102px)"}}> QuizCraft</h1>
                    </div>
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-2xl md:ml-4 md:-mt-2 px-4 sm:px-6 md:px-8" style={{}}>
                                {
                                    (width > 768) ?
                                        <Draggable nodeRef={nodeRef}>
                                            <div ref={nodeRef}>
                                                {(quizCreated) ? <FormDescription /> : <NoQuizCreatedBox />}

                                                <div ref={nodeRef} className="py-4" style={{ position: "relative", zIndex: 1 }}>
                                                    {
                                                        quizData.questions.map((question, index) => {
                                                            return (
                                                                <MCQ key={index} qn={index + 1} header={question.question} options={question.options} answer={question.answer} />
                                                            )
                                                        })
                                                    }

                                                    {(quizCreated) && <DividerWithButton addQn={addQuestions} />}
                                                    <CreateGoogleFormButton />
                                                </div>
                                            </div>
                                        </Draggable>
                                        :
                                        <div >
                                            {(quizCreated) ? <FormDescription /> : <NoQuizCreatedBox />}

                                            <div className="py-4" style={{ position: "relative", zIndex: 1 }}>
                                                {
                                                    quizData.questions.map((question, index) => {
                                                        return (
                                                            <MCQ key={index} qn={index + 1} header={question.question} options={question.options} answer={question.answer} />
                                                        )
                                                    })
                                                }
                                                
                                                <CreateGoogleFormButton />
                                            </div>
                                        </div>
                                }

                                <div className='fixed right-0 top-0 h-screen bg-white' style={{ zIndex: 22 }}>
                                    <RightSidebarWrapper />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

const RightSidebarWrapper = (props) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="right-8 h-screen top-0 min-w-1/3" style={{ "zIndex": 22 }} >
            <div>

            </div>
            <RightSidebar />
        </div>
    )
}

