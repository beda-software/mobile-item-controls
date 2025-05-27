import { createContext } from 'react';

export const ValueSetExpandProvider = createContext((_answerValueSet: string | undefined, _searchText: string) => {
    return Promise.resolve([]);
});
