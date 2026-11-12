import React, { createContext, PropsWithChildren, useContext } from 'react';

/** How the consuming app renders FHIR date/time values — used by both editable and readonly controls. */
export interface ControlConfig {
    formatDate?: (isoString: string) => string;
    formatDateTime?: (isoString: string) => string;
    formatTime?: (isoString: string) => string;
}

const defaultConfig: Required<ControlConfig> = {
    formatDate: (isoString: string) => isoString,
    formatDateTime: (isoString: string) => isoString,
    formatTime: (isoString: string) => isoString,
};

const ControlConfigContext =
    createContext<Required<ControlConfig>>(defaultConfig);

export function ControlConfigProvider({
    children,
    ...config
}: PropsWithChildren<ControlConfig>) {
    const value: Required<ControlConfig> = {
        formatDate: config.formatDate ?? defaultConfig.formatDate,
        formatDateTime: config.formatDateTime ?? defaultConfig.formatDateTime,
        formatTime: config.formatTime ?? defaultConfig.formatTime,
    };

    return (
        <ControlConfigContext.Provider value={value}>
            {children}
        </ControlConfigContext.Provider>
    );
}

export function useControlConfig(): Required<ControlConfig> {
    return useContext(ControlConfigContext);
}

/** Formats a stored FHIR value for display; falls back to the raw value for unhandled types. */
export function formatValueForDisplay(
    value: string,
    type: string,
    config: Required<ControlConfig>
) {
    switch (type) {
        case 'date':
            return config.formatDate(value);
        case 'dateTime':
            return config.formatDateTime(value);
        case 'time':
            return config.formatTime(value);
        default:
            return value;
    }
}
