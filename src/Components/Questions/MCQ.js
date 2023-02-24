export default function MCQ(props) {
    return (
      <div className="bg-white overflow-hidden drop-shadow-md divide-y my-3 divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-600" >{props.qn} : {props.header}</h3>
        </div>
        <div className="px-4 py-4 sm:px-6">
         {/* from props.options array create radio buttons */}
            {props.options.map((option, index) => {
                return (
                    <div key={index} className="flex items-center">
                        <input
                            id={option}
                            name={props.name}
                            type="radio"
                            checked={props.answer === index}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <label htmlFor={option} className="ml-3 block text-md font-normal text-gray-700" >
                            {option}
                        </label>
                    </div>
                )
            })}
        </div>
      </div>
    )
  }