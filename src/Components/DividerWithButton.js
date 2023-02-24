import React from 'react'
import { PlusSmallIcon } from '@heroicons/react/24/solid'

export default function DividerWithButton(props) {
    return (
        <div className="relative my-3 drop-shadow-md">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <button
                    onClick={() => { props.addQn(1)}}
                    type="button"
                    className="inline-flex items-center shadow-sm px-4 py-1.5 mx-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmallIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>1 Qn</span>
                </button>
                <button
                    onClick={() => { props.addQn(2)}}
                    type="button"
                    className="inline-flex items-center shadow-sm px-4 py-1.5 mx-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmallIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>2 Qns</span>
                </button>
                <button
                    onClick={() => { props.addQn(3)}}
                    type="button"
                    className="inline-flex items-center shadow-sm px-4 py-1.5 mx-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusSmallIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>5 Qns</span>
                </button>
            </div>
        </div>
    )
}
