import React from 'react';

const SearchBox = () => {
  return (
    <div className="my-4 mx-auto w-full max-w-md">
      <div className="relative rounded-full shadow-sm">
        <input 
          type="search" 
          placeholder="Search Events" 
          className="w-full pl-4 pr-10 py-2 border-2 border-gray-300 rounded-full text-sm leading-none text-gray-700"
          style={{ transition: 'all 0.3s', outline: 'none' }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button type="submit" className="text-gray-500 focus:text-gray-700 p-1 focus:outline-none">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.905 14.32a1 1 0 01-.707-.293l-2.137-2.137a1 1 0 01-.21-.33 6 6 0 111.414-1.414 1 1 0 01.33.21l2.137 2.137a1 1 0 01-1.414 1.414l-.007-.007zM10 16A6 6 0 104 10a6 6 0 006 6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
