import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';


const App = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/api/example')
            .then(response => setData(response.data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <View style={styles.container}>
            <Text>{data}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;