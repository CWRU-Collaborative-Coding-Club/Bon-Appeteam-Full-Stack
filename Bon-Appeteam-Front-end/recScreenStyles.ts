import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    recommendation: {
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
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    progressBar: {
        // flex: 1,
        height: 8,
        borderRadius: 5,
        marginLeft: 8,
        maxWidth: Dimensions.get('window').width - 150,
        borderWidth: 0.1,
        borderColor: '#000',
    },
});

export default styles;