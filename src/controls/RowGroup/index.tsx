import React, { createContext, useContext } from 'react';

import { View } from 'react-native';
import { GroupItemProps, QuestionItems } from 'sdc-qrf';

import { renderText } from '../../components/TextRender';
import { S as GroupStyles } from '../Group/styles';
import { S, styles } from '../styles';

export const RowLayoutContext = createContext(false);

export function useRowLayout() {
    return useContext(RowLayoutContext);
}

export function RowGroup(props: GroupItemProps) {
    const { questionItem, parentPath, context } = props;
    const { linkId, item, text, helpText } = questionItem;

    return (
        <GroupStyles.Container>
            {text || helpText ? (
                <View style={styles.textContainer}>
                    {renderText(text, styles.text)}
                    {renderText(helpText)}
                </View>
            ) : null}

            <S.Row>
                <RowLayoutContext.Provider value={true}>
                    <QuestionItems
                        questionItems={item ?? []}
                        parentPath={[...parentPath, linkId, 'items']}
                        context={context[0]!}
                    />
                </RowLayoutContext.Provider>
            </S.Row>
        </GroupStyles.Container>
    );
}
