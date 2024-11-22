// MEAL SWIPES SCREEN
import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

function ProfileScreen () {
    return (
        <Text>This is profile screen</Text>
    );
}

export default ProfileScreen;
//
// import React, { useState } from 'react';
// import { View, Text, TextInput, ScrollView, Button } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import styles from './styles';
//
// function ProfileScreen() {
//     const [profile, setProfile] = useState({
//         height: '',
//         weight: '',
//         sex: '',
//         dateOfBirth: '',
//         allergies: '',
//         dietaryRequirements: '',
//         goals: '',
//     });
//
//     const handleInputChange = (key, value) => {
//         setProfile({ ...profile, [key]: value });
//     };
//
//     const handleSaveProfile = () => {
//         console.log('Profile Saved:', profile); // Replace with actual save logic
//         alert('Profile has been saved!');
//     };
//
//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Personal Info / Settings</Text>
//
//             {/* Height Input */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Height (cm)</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={profile.height}
//                     placeholder="Enter your height"
//                     keyboardType="numeric"
//                     onChangeText={(value) => handleInputChange('height', value)}
//                 />
//             </View>
//
//             {/* Weight Input */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Weight (kg)</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={profile.weight}
//                     placeholder="Enter your weight"
//                     keyboardType="numeric"
//                     onChangeText={(value) => handleInputChange('weight', value)}
//                 />
//             </View>
//
//             {/* Sex Dropdown */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Sex</Text>
//                 <Picker
//                     selectedValue={profile.sex}
//                     style={{ height: 50, width: '100%' }}
//                     onValueChange={(value) => handleInputChange('sex', value)}
//                 >
//                     <Picker.Item label="Select your sex" value="" />
//                     <Picker.Item label="Male" value="Male" />
//                     <Picker.Item label="Female" value="Female" />
//                     <Picker.Item label="Other" value="Other" />
//                 </Picker>
//             </View>
//
//             {/* Date of Birth Input */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Date of Birth</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={profile.dateOfBirth}
//                     placeholder="YYYY-MM-DD"
//                     keyboardType="default"
//                     onChangeText={(value) => handleInputChange('dateOfBirth', value)}
//                 />
//             </View>
//
//             {/* Allergies Dropdown */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Allergies</Text>
//                 <Picker
//                     selectedValue={profile.allergies}
//                     style={{ height: 50, width: '100%' }}
//                     onValueChange={(value) => handleInputChange('allergies', value)}
//                 >
//                     <Picker.Item label="Select allergies" value="" />
//                     <Picker.Item label="None" value="None" />
//                     <Picker.Item label="Peanuts" value="Peanuts" />
//                     <Picker.Item label="Dairy" value="Dairy" />
//                     <Picker.Item label="Gluten" value="Gluten" />
//                 </Picker>
//             </View>
//
//             {/* Dietary Requirements Dropdown */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Dietary Requirements</Text>
//                 <Picker
//                     selectedValue={profile.dietaryRequirements}
//                     style={{ height: 50, width: '100%' }}
//                     onValueChange={(value) => handleInputChange('dietaryRequirements', value)}
//                 >
//                     <Picker.Item label="Select dietary requirement" value="" />
//                     <Picker.Item label="None" value="None" />
//                     <Picker.Item label="Vegetarian" value="Vegetarian" />
//                     <Picker.Item label="Vegan" value="Vegan" />
//                     <Picker.Item label="Keto" value="Keto" />
//                 </Picker>
//             </View>
//
//             {/* Goals Input */}
//             <View style={styles.optionBlock}>
//                 <Text style={styles.blockTitle}>Goals</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={profile.goals}
//                     placeholder="Enter your goals (e.g., lose weight)"
//                     onChangeText={(value) => handleInputChange('goals', value)}
//                 />
//             </View>
//
//             {/* Save Button */}
//             <View style={{ marginTop: 20 }}>
//                 <Button title="Save Profile" onPress={handleSaveProfile} />
//             </View>
//         </ScrollView>
//     );
// }
//
// export default ProfileScreen;
