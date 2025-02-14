const SQLite = require('react-native-sqlite-storage');

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const db = SQLite.openDatabase(
    { name: 'MealSwipeData.db', location: 'default' },
    () => console.log('Database opened!'),
    (error) => console.error('Error opening database:', error)
);
