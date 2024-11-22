import { StatusBar } from "expo-status-bar";
import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import ProgressTrackerScreen from './ProgressTracker';
import ProfileScreen from "./ProfileScreen";
import MealSwipesScreen from './MealSwipes';
import RecommendationsScreen from './RecommendationsScreen';
import styles from './styles';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: styles.white.color,
                tabBarInactiveTintColor: styles.white.color,
                tabBarActiveBackgroundColor: styles.darkblue.color,
                tabBarInactiveBackgroundColor: styles.blue.color,
            }}>
                <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
                <Tab.Screen name="Progress Tracker" component={ProgressTrackerScreen} />
                <Tab.Screen name="Meal Swipes" component={MealSwipesScreen} />
                <Tab.Screen name="Personal Info" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;