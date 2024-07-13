import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // Adjust the delay as needed

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className="flex items-center mb-4 text-black">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search events"
        className="border rounded-lg p-2 w-full"
      />
    </div>
  );
};

export default SearchBox;
