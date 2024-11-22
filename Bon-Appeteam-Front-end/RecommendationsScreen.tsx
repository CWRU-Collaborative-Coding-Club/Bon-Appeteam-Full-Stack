// npx expo start
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styles from './styles';
import { HARDCODED_FOODS } from '../Bon-Appeteam-Back-end/foods.js';


function RecommendationsScreen() {
    const recommendations = Object.entries(HARDCODED_FOODS).map(([foodName, foodData], index) => ({
        option: foodName,
        similarity: Math.random(), // Replace this with an actual similarity calculation
        location: Math.random() * 10, // Replace this with actual location data
        remainingSwipes: 10 - index, // Replace this with actual logic if needed
    }));

    /*
    let recommendations = [
        {
            option: 'Option 1',
            similarity: 0.2,
            location: 2,
            remainingSwipes: 5,
        },
        {
            option: 'Option 2',
            similarity: 0.9,
            location: 5,
            remainingSwipes: 4,
        },
        {
            option: 'Option 3',
            similarity: 0.9,
            location: 50,
            remainingSwipes: 42,
        },
        {
            option: 'Option 4',
            similarity: 0.5,
            location: 0.2,
            remainingSwipes: 2,
        },
    ].sort((a, b) => b.similarity - a.similarity);
    */
    return (
        <ScrollView style={styles.container}>
            {recommendations.map((rec, index) => (
                <View key={index} style={styles.optionBlock}>
                    <Text style={styles.blockTitle}>{rec.option}</Text>
                    <View style={styles.block}>
                        <Text style={styles.label}>Similarity: </Text>
                        <ProgressBar
                            progress={rec.similarity}
                            color={rec.similarity > 0.7 ? '#00c853' : rec.similarity > 0.4 ? '#ffeb3b' : '#d32f2f'}
                            style={styles.progressBar}
                        />
                    </View>
                    <Text style={styles.label}>Location: {rec.location} miles</Text>
                    <Text style={styles.label}>Remaining Swipes: {rec.remainingSwipes} swipes left</Text>
                </View>
            ))}
        </ScrollView>
    );
}

export default RecommendationsScreen;
