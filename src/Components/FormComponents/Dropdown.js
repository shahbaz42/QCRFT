const Dropdown = (props) => {
    return (
        <>
            <div className=''>
                <div className='text-left'>
                    <label htmlFor="location" className="text-sm font-medium text-gray-400">
                        {props.label}
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="mt-1 h-8 w-full border-dashed border-2 border-gray-400 hover:border-gray-800 focus:border-solid focus:border-gray-800 focus:outline-none"
                        defaultValue={props.menu[0].name}
                        onChange={(e) => {props.onChange(e)}}
                    >
                        {
                            props.menu.map((item, index) => {
                                return (
                                    <option>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

            </div>
        </>
    );
};
