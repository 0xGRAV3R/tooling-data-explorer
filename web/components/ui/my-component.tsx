import React, { useState, ChangeEvent } from 'react';

const MyComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = () => {
    window.location.href = `http://localhost:3000/account/${inputValue}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
        
        <label className="input input-bordered flex items-center gap-2">
        <input 
        type="text" 
        id="test"
        value={inputValue}
        onChange={handleInputChange}
        className="grow" 
        placeholder="Search Address" />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
        </label>

        
        <button onClick={handleSubmit} className="btn btn-sm" style={{ marginTop: '0.25rem' }}>Search</button>
        
      <br /><br />
    </div>
  );
};

export default MyComponent;
