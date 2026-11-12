import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
} from 'react';

/** Nodes a control draws to the right of a field's answers, keyed by form field path (`[...parentPath, linkId].join('.')`). */
const FieldAccessoryContext = createContext<Record<string, ReactNode>>({});

// Pass a memoized map: a new object re-renders every control in the form.
export function FieldAccessoryProvider({
    accessories,
    children,
}: PropsWithChildren<{ accessories: Record<string, ReactNode> }>) {
    return (
        <FieldAccessoryContext.Provider value={accessories}>
            {children}
        </FieldAccessoryContext.Provider>
    );
}

export function useFieldAccessory(fieldPath: string[]): ReactNode {
    return useContext(FieldAccessoryContext)[fieldPath.join('.')] ?? null;
}
