import React, { createContext, useState, useContext, ReactNode } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { lightTheme, darkTheme } from './theme';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    themeType: ThemeType;
    changeTheme: (themeType: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeType, setThemeType] = useState<ThemeType>('light');

    const changeTheme = (newThemeType: ThemeType) => {
        setThemeType(newThemeType);
    };

    const theme = themeType === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ themeType, changeTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
