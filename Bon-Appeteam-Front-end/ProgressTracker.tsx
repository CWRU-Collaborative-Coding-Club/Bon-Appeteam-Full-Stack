import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { ProgressContext } from './ProgressContext';
import styles from './styles';

function ProgressTrackerScreen() {
    const { progress } = useContext(ProgressContext);

    return (
        <ScrollView style={styles.container}>
            {Object.keys(progress).map((key) => {
                const { currentValue, goalValue } = progress[key];
                const overGoal = currentValue > goalValue;

                // Ensure all values are properly rendered
                return (
                    <View key={key} style={overGoal ? styles.redOptionBlock : styles.optionBlock}>
                        <Text style={styles.blockTitle}>{key}</Text>
                        <View style={styles.block}>
                            <ProgressBar
                                progress={overGoal ? 1 : currentValue / goalValue}
                                color={ overGoal ? '#15611d': currentValue / goalValue > 0.7 ? '#00c853' : currentValue / goalValue > 0.4 ? '#ffeb3b' : '#d32f2f'}
                                style={styles.progressBar}
                            />
                            <Text>({currentValue} / {goalValue}{key == 'Calories' ? '' : 'g'})</Text>
                        </View>
                        <Text>Remaining: {(goalValue - currentValue).toFixed(2)}{key == 'Calories' ? '' : 'g'}</Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}

export default ProgressTrackerScreen;
