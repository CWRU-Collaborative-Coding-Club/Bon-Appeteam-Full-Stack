import SQLite from "react-native-sqlite-storage";

// Open the SQLite database
function getDB() {
    const db = SQLite.openDatabase(
        { name: 'MealSwipeDB', location: 'default' },
        () => console.log('Database opened'),
        error => console.error('Error opening database', error)
    );
    return db;
}

// Function to create tables
const createTables = () => {
    getDB().transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS MealPlans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        totalSwipes INTEGER,
        unlimitedSwipes INTEGER,
        cafeSwipesDaily INTEGER,
        cafeSwipesWeekly INTEGER,
        lateNightSwipesDaily INTEGER,
        lateNightSwipesWeekly INTEGER,
        quickServiceSwipesDaily INTEGER,
        quickServiceSwipesWeekly INTEGER,
        portableSwipesDaily INTEGER,
        portableSwipesWeekly INTEGER,
        scholarSwipesDaily INTEGER,
        scholarSwipesWeekly INTEGER
      )`
        );
    });
};

// Function to insert meal plan data
const insertMealPlanData = () => {
    const mealPlans = [
        {
            name: 'Unlimited Plan',
            totalSwipes: -1, // -1 to indicate unlimited
            unlimitedSwipes: 1,
            cafeSwipesDaily: -1,
            cafeSwipesWeekly: -1,
            lateNightSwipesDaily: -1,
            lateNightSwipesWeekly: -1,
            quickServiceSwipesDaily: -1,
            quickServiceSwipesWeekly: -1,
            portableSwipesDaily: -1,
            portableSwipesWeekly: -1,
            scholarSwipesDaily: -1,
            scholarSwipesWeekly: -1,
        },
        {
            name: 'Classic 17',
            totalSwipes: 17,
            unlimitedSwipes: 0,
            cafeSwipesDaily: 3,
            cafeSwipesWeekly: 15,
            lateNightSwipesDaily: 2,
            lateNightSwipesWeekly: 10,
            quickServiceSwipesDaily: 2,
            quickServiceSwipesWeekly: 10,
            portableSwipesDaily: 1,
            portableSwipesWeekly: 5,
            scholarSwipesDaily: 1,
            scholarSwipesWeekly: 5,
        },
        {
            name: '14 Halal/Kosher',
            totalSwipes: 14,
            unlimitedSwipes: 0,
            cafeSwipesDaily: 2,
            cafeSwipesWeekly: 10,
            lateNightSwipesDaily: 2,
            lateNightSwipesWeekly: 10,
            quickServiceSwipesDaily: 2,
            quickServiceSwipesWeekly: 10,
            portableSwipesDaily: 1,
            portableSwipesWeekly: 5,
            scholarSwipesDaily: 1,
            scholarSwipesWeekly: 5,
        },
    ];

    mealPlans.forEach(plan => {
        getDB().transaction(tx => {
            tx.executeSql(
                `INSERT INTO MealPlans (
          name, totalSwipes, unlimitedSwipes, cafeSwipesDaily, cafeSwipesWeekly,
          lateNightSwipesDaily, lateNightSwipesWeekly, quickServiceSwipesDaily,
          quickServiceSwipesWeekly, portableSwipesDaily, portableSwipesWeekly,
          scholarSwipesDaily, scholarSwipesWeekly
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    plan.name, plan.totalSwipes, plan.unlimitedSwipes, plan.cafeSwipesDaily,
                    plan.cafeSwipesWeekly, plan.lateNightSwipesDaily, plan.lateNightSwipesWeekly,
                    plan.quickServiceSwipesDaily, plan.quickServiceSwipesWeekly, plan.portableSwipesDaily,
                    plan.portableSwipesWeekly, plan.scholarSwipesDaily, plan.scholarSwipesWeekly
                ],
                (tx, results) => {
                    console.log('Meal plan data inserted', results);
                },
                error => {
                    console.error('Error inserting meal plan data', error);
                }
            );
        });
    });
};

// Export the database and functions
export { getDB, createTables, insertMealPlanData };
