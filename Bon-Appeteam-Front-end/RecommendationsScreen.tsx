//if this file doesnt work then please pull from github


/*
*   back end     node express.js
*   front end    npx expo start
* */



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

function RecommendationsScreen() {
    const [recommendations, setRecommendations] = useState<any[]>([]);

    // Fetch foods from the API
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/foods');
                const data = await response.json();
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
                }));
                setRecommendations(formattedData);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []);

    return (
        <ScrollView style={{ padding: 20 }}>
            {recommendations.map((rec, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{rec.option}</Text>
                    <Text>Calories: {rec.calories}</Text>
                    <Text>Carbs: {rec.carbs}g</Text>
                    <Text>Protein: {rec.protein}g</Text>
                    <Text>Fat: {rec.fat}g</Text>
                    <Text>Location: {rec.location.toFixed(2)} miles</Text>
                    <Text>Remaining Swipes: {rec.remainingSwipes} swipes left</Text>
                    <ProgressBar
                        progress={rec.similarity}
                        color={rec.similarity > 0.7 ? '#00c853' : rec.similarity > 0.4 ? '#ffeb3b' : '#d32f2f'}
                        style={{ height: 10, marginTop: 5 }}
                    />
                </View>
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