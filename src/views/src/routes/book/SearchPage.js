import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';

const SearchPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      setKeyword(params.get('keyword') || '');
    } else {
      setKeyword('');
    }
  }, [location.search]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="책 검색..."
        />
        <button type="submit">검색</button>
      </form>
      <SearchResult keyword={keyword} />
    </div>
  );
};

export default SearchPage;
