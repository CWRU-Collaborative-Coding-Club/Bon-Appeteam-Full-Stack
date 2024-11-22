// MEAL SWIPES SCREEN
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styles from './styles';

function ProgressTrackerScreen() {
    let recommendations = [
        {
            option: 'Calories',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Protein',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Carbohydrates',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Fiber',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Sugar',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Sodium',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Fat',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Trans Fats',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Saturated Fats',
            currentValue: 0.2,
            goalValue: 2,
        },
        {
            option: 'Cholesterol',
            currentValue: 0.2,
            goalValue: 2,
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {recommendations.map((rec, index) => (
                <View key={index} style={styles.optionBlock}>
                    <Text style={styles.blockTitle}>{rec.option}</Text>
                    <View style={styles.block}>
                        <ProgressBar
                            progress={rec.currentValue/rec.goalValue}
                            color={rec.currentValue/rec.goalValue > 0.7 ? '#00c853' : rec.currentValue/rec.goalValue > 0.4 ? '#ffeb3b' : '#d32f2f'}
                            style={styles.progressBar}
                        />
                        <Text style={styles.block}> ({rec.currentValue} / {rec.goalValue}g)</Text>
                    </View>
                    <Text>Until goal: {rec.goalValue-rec.currentValue}g</Text>
                    {/*<Text style={styles.label}>{rec.currentValue} / {rec.goalValue}</Text>*/}
                </View>
            ))}
        </ScrollView>
    );
}

export default ProgressTrackerScreen;