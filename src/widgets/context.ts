import { createContext } from 'react';

export interface QuestionnaireNavigation {
    isActivePage?: boolean;
    next?: () => void;
}

export const PagerViewContext = createContext<
    QuestionnaireNavigation | undefined
>(undefined);
