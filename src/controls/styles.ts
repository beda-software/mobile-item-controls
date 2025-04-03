import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        margin: 8,
        gap: 8,
        position: 'relative',
    },
    text: {
        fontSize: 16,
        fontWeight: 600,
    },
    textContainer: {
        gap: 8,
    },
    inputText: {
        fontSize: 16,
        width: '100%',
    },
    inputContainer: {
        borderRadius: 16,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
    },
    addButtonContainer: {
        padding: 16,
        backgroundColor: '#3366ff',
        alignSelf: 'center',
        width: 200,
        borderRadius: 16,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        textAlign: 'center',
    },

    // choice
    selectOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    selectBackground: {
        width: 12,
        height: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    isSelectedBackground: {
        backgroundColor: 'black',
    },
    selectText: {
        fontSize: 16,
        width: '100%',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        margin: 4,
    },
    chipText: {
        marginRight: 6,
    },
    chipClose: {
        paddingHorizontal: 4,
    },
    repeatsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
});
