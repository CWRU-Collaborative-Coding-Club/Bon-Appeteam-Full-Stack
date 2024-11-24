import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import ProgressTrackerScreen from './ProgressTracker';
import ProfileScreen from "./ProfileScreen";
import MealSwipesScreen from './MealSwipes';
import RecommendationsScreen from './RecommendationsScreen';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { ProgressProvider } from './ProgressContext';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <ProgressProvider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{
                    tabBarActiveTintColor: styles.white.color,
                    tabBarInactiveTintColor: styles.white.color,
                    tabBarActiveBackgroundColor: styles.darkblue.color,
                    tabBarInactiveBackgroundColor: styles.blue.color,
                    //tabBarLabelStyle: {fontSize: 11, fontFamily:'Arial'}, // Palatino, Iowan Old Style
                }}>
                    <Tab.Screen name="Recommendations" component={RecommendationsScreen}
                                options={{ tabBarLabel: 'Recommendations',
                                    tabBarIcon: () => (
                                        <Ionicons name="map-outline"
                                                  color={styles.white.color} size={24} />),
                                }} />
                    <Tab.Screen name="Progress Tracker" component={ProgressTrackerScreen}
                                options={{ tabBarLabel: 'Progress',
                                    tabBarIcon: () => (
                                        <Ionicons name="checkmark-circle-outline"
                                                  color={styles.white.color} size={24} />),
                                }} />
                    <Tab.Screen name="Meal Swipes" component={MealSwipesScreen}
                                options={{ tabBarLabel: 'Meal Swipes',
                                    tabBarIcon: () => (
                                        <Ionicons name="reader-outline"
                                                  color={styles.white.color} size={24} />),
                                }} />
                    <Tab.Screen name="Personal Info" component={ProfileScreen}
                                options={{ tabBarLabel: 'Info',
                                    tabBarIcon: () => (
                                        <Ionicons name="person-outline"
                                                  color={styles.white.color} size={24} />),
                                }}/>
                </Tab.Navigator>
            </NavigationContainer>
        </ProgressProvider>
    );
}

export default App;