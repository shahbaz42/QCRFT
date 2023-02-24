import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Dropdown = (props) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    const handleClick = (event) => {
        setSelected(event.target.value);
        setOpen(false);
        props.onChange(event);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="m-5" ref={dropdownRef}>
                <div
                    className={`dropdown-animate shadow-sm inline-block w-full border-2 border-gray-400 sm:text-sm hover:border-gray-800 focus:ring-black ${(open) ? 'border-black border-solid' : 'border-dashed'} `}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex justify-between text-gray-400 hover:text-gray-800 focus:text-gray-800">
                        <p className="flex px-4 h-11 flex-col justify-center text-gray-600">
                            {selected}
                        </p>
                        <ChevronDownIcon className="w-5 h-11 mx-3 flex flex-col justify-center" />
                    </div>

                    {open && (
                        <div>
                            <div className="mx-0">
                                {
                                    props.menu.map((item, index) => {
                                        return (
                                            <button value={item.value} key={index} onClick={(e) => { handleClick(e) }} style={{ width: "calc(100% - 3px)" }} className="h-10 m-0.5 px-3 flex flex-col justify-center text-left hover:border-gray-800 hover:border-dashed hover:border-2">
                                                {item.name}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// const Area = () => {
//   return (
//     <>
//       <Dropdown menu={[{name : "A", value: 0}, {name : "B", value: 1}, {name : "C", value: 2}]} onChange={(e) => {console.log(e.target.value)}} />

//     </>
//   )
// }

export default Dropdown;