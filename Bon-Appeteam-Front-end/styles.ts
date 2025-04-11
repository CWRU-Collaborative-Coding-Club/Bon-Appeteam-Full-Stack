import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f6f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    optionBlock: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    redOptionBlock: {
        backgroundColor: 'rgba(218,21,21,0.16)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    blockTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    progressBar: {
        height: 8,
        borderRadius: 5,
        marginLeft: 8,
        maxWidth: Dimensions.get('window').width - 175,
        borderWidth: 0.1,
        borderColor: '#000',
    },
    blue: {
        color: '#003071'
    },
    white: {
        color: '#FFFFFF'
    },
    lightblue: {
        color: '#A6D2E6'
    },
    darkblue: {
        color: '#09143A'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginTop: 8,
    },

    // New styles for swipe screen
    swipeTag: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    swipeTagText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#444',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    swipeCountRow: {
        flexDirection: 'row',
    },
    swipeCountSection: {
        alignItems: 'flex-end',
    },
    swipeLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 4,
    },
});

export default styles;
