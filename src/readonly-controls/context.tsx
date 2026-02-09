import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface ReadonlyControlConfig {
    formatDate?: (isoString: string) => string;
    formatDateTime?: (isoString: string) => string;
    formatTime?: (isoString: string) => string;
}

const defaultConfig: Required<ReadonlyControlConfig> = {
    formatDate: (isoString: string) => isoString,
    formatDateTime: (isoString: string) => isoString,
    formatTime: (isoString: string) => isoString,
};

const ReadonlyControlConfigContext = createContext<Required<ReadonlyControlConfig>>(defaultConfig);

export function ReadonlyControlConfigProvider({
    children,
    ...config
}: PropsWithChildren<ReadonlyControlConfig>) {
    const value: Required<ReadonlyControlConfig> = {
        formatDate: config.formatDate ?? defaultConfig.formatDate,
        formatDateTime: config.formatDateTime ?? defaultConfig.formatDateTime,
        formatTime: config.formatTime ?? defaultConfig.formatTime,
    };

    return (
        <ReadonlyControlConfigContext.Provider value={value}>
            {children}
        </ReadonlyControlConfigContext.Provider>
    );
}

export function useReadonlyControlConfig(): Required<ReadonlyControlConfig> {
    return useContext(ReadonlyControlConfigContext);
}
