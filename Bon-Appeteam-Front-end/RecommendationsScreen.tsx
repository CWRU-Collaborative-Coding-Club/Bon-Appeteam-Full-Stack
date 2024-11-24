//if this file doesnt work then please pull from github


/* run app by doing:
*   back end     node express.js
*   front end    npx expo start
* */

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { ProgressContext } from './ProgressContext';
import styles from './styles';


function RecommendationsScreen() {
    const { updateProgress } = useContext(ProgressContext);
    const [recommendations, setRecommendations] = useState([]);

    // Fetch foods from the API
    useEffect(() => {

        const fetchFoods = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/foods');
                const data = (await response.json()) as Record<string, any>;
                // Convert object to array for mapping
                const formattedData = Object.entries(data).map(([foodName, foodData], index) => ({
                    option: foodName,
                    calories: foodData.calories,
                    carbs: foodData.carbs,
                    protein: foodData.protein,
                    fat: foodData.fat,
                    satfat: foodData.satfat,
                    transfat: foodData.transfat,
                    chol: foodData.chol,
                    sugars: foodData.sugars,
                    sodium: foodData.sodium,
                    dietaryfiber: foodData.dietaryfiber,
                    similarity: Math.random(), // Placeholder for actual similarity logic
                    location: Math.random() * 10, // Placeholder for actual location data
                    remainingSwipes: 10 - index, // Placeholder logic
                })).sort((a, b) => b.similarity - a.similarity); // Sort by similarity (descending)
                setRecommendations(formattedData);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods()
    }, []);

    const handlePress = (item) => {
        Alert.alert('Item Clicked', `You clicked on ${item.option}`);
        updateProgress({
            Calories: item.calories,
            Protein: item.protein,
            Carbohydrates: item.carbs,
            Fat: item.fat,
            Sugar: item.sugars,
            Sodium: item.sodium,
            Fiber: item.dietaryfiber,
            TransFats: item.transfat,
            SaturatedFats: item.satfat,
            Cholesterol: item.chol,
        });
    };

    return (
        <ScrollView style={styles.container}>
            {recommendations.map((rec, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionBlock}
                    onPress={() => handlePress(rec)}
                >
                    {/*<View key={index} style={styles.optionBlock}>*/}
                    <Text style={styles.blockTitle}>{rec.option}</Text>
                    <Text style={styles.label}>Calories: {rec.calories}</Text>
                    <Text style={styles.label}>Carbs: {rec.carbs}g</Text>
                    <Text style={styles.label}>Protein: {rec.protein}g</Text>
                    <Text style={styles.label}>Fat: {rec.fat}g</Text>
                    <Text style={styles.label}>Location: {rec.location.toFixed(2)} miles</Text>
                    <View style={styles.block}>
                        <Text style={styles.label}>Similarity: </Text>
                        <ProgressBar
                            progress={rec.similarity}
                            color={rec.similarity > 0.7 ? '#00c853' : rec.similarity > 0.4 ? '#ffeb3b' : '#d32f2f'}
                            style={styles.progressBar}
                        />
                        <Text style={styles.label}>  {(rec.similarity * 100).toFixed(2)}%</Text>
                    </View>
                {/*</View>*/}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

export default RecommendationsScreen;


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