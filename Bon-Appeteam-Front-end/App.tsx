// import { StatusBar } from "expo-status-bar";
// import {
//     Button,
//     StyleSheet,
//     Text,
//     View,
//     SafeAreaView,
//     ScrollView,
//     TouchableOpacity,
// } from "react-native";

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import ProgressTrackerScreen from './ProgressTracker';
import ProfileScreen from "./ProfileScreen";
import MealSwipesScreen from './MealSwipes';
import RecommendationsScreen from './RecommendationsScreen';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {
    return (
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
                                tabBarIcon: ({color,size}) => (
                                    <Ionicons name="map-outline"
                                              color={styles.white.color} size={24} />),
                            }} />
                <Tab.Screen name="Progress Tracker" component={ProgressTrackerScreen}
                            options={{ tabBarLabel: 'Progress',
                                tabBarIcon: ({color,size}) => (
                                    <Ionicons name="checkmark-circle-outline"
                                              color={styles.white.color} size={24} />),
                            }} />
                <Tab.Screen name="Meal Swipes" component={MealSwipesScreen}
                            options={{ tabBarLabel: 'Meal Swipes',
                                tabBarIcon: ({color,size}) => (
                                    <Ionicons name="reader-outline"
                                              color={styles.white.color} size={24} />),
                            }} />
                <Tab.Screen name="Personal Info" component={ProfileScreen}
                            options={{ tabBarLabel: 'Info',
                                tabBarIcon: ({color,size}) => (
                                    <Ionicons name="person-outline"
                                              color={styles.white.color} size={24} />),
                            }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;