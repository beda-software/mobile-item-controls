import React, { createContext, PropsWithChildren, useContext } from 'react';

/** Form field paths (`[...parentPath, linkId].join('.')`) whose answers a control draws highlighted. */
const HighlightedFieldsContext = createContext<string[]>([]);

export function HighlightedFieldsProvider({
    paths,
    children,
}: PropsWithChildren<{ paths: string[] }>) {
    return (
        <HighlightedFieldsContext.Provider value={paths}>
            {children}
        </HighlightedFieldsContext.Provider>
    );
}

export function useIsFieldHighlighted(fieldPath: string[]): boolean {
    return useContext(HighlightedFieldsContext).includes(fieldPath.join('.'));
}
