import React, { createContext, useState } from 'react';

const SearchContext=createContext();

export function SearchContextProvider(children:any) {
    const [keyword, onChangeText] = useState('');
    return (
        <SearchContext.Provider value={{keyword, onChangeText}}>
            {children}
        </SearchContext.Provider>
    );
}



export default SearchContext;