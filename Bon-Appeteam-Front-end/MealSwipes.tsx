import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';

const swipeData = [
  {
    category: 'Cafe swipes',
    today: 2,
    week: 10,
    locations: [
      'Elephant Step-Inn', 'HEC Press & Bakery', 'Plum Market Kitchen',
      'BRB Starbucks', 'Café on the Quad', 'Dunkin Donuts @ TVUC',
    ],
  },
  {
    category: 'Late night swipes',
    today: 1,
    week: 5,
    locations: [
      'The Den (Grubhub App Only)', 'Sparti-Que', 'Fribley Late',
    ],
  },
  {
    category: 'Quick service swipes',
    today: 0,
    week: 3,
    locations: [
      'KSL Bag-it/Sears Grab-it',
    ],
  },
  {
    category: 'Portable swipes',
    today: 2,
    week: 0,
    locations: [
      "Pinza's/8Twenty6", 'PK @ CWRU', 'Melt U', 'Cle Table (AM)',
      'Subway', 'Fujisan Sushi', 'Local Taco',
    ],
  },
  {
    category: "Jolly’s",
    today: 1,
    week: 4,
    locations: [
      'Jolly scholar', 'road scholar', 'southside scholar',
    ],
  },
];

const sortedSwipeData = swipeData.sort((a, b) => {
    if (a.week === 0 && b.week !== 0) return 1;
    if (a.week !== 0 && b.week === 0) return -1;
    if (a.today === 0 && b.today !== 0) return 1;
    if (a.today !== 0 && b.today === 0) return -1;
    return 0; 
  });

function MealSwipesScreen() {
  return (
    <ScrollView style={styles.container}>
      {swipeData.map((block, index) => (
        <View key={index} style={[styles.optionBlock, block.week === 0 ? { backgroundColor: '#fadbd8' } :  block.today === 0 ? { backgroundColor: '#fcf3cf' } : {} ]}>
          <View style={styles.headerRow}>
            <Text style={styles.blockTitle}>{block.category}</Text>
            <View style={styles.swipeCountSection}>
              <Text style={styles.swipeLabel}>Remaining swipes:</Text>
              <View style={styles.swipeCountRow}>
                <View style={styles.swipeTag}>
                  <Text style={styles.swipeTagText}>Week: {block.week}</Text>
                </View>
                <View style={styles.swipeTag}>
                  <Text style={styles.swipeTagText}>Day: {block.today}</Text>
                </View>
              </View>
            </View>
          </View>

          {block.locations.map((loc, i) => (
            <Text key={i} style={styles.label}>• {loc}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default MealSwipesScreen;
