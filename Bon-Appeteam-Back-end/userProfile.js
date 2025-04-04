/**
 * UserProfile class manages user nutritional data and tracks consumption
 * against goals for weight management and health.
 */
export class UserProfile {
    /**
     * Creates a new user profile with nutritional goals
     * @param {number} height - User height in inches
     * @param {number} weight - User weight in pounds
     * @param {number} age - User age in years
     * @param {string} biologicalSex - 'male', 'female', or other
     * @param {number} goalWeight - Target weight in pounds
     * @param {number} timetable - Weeks to reach goal
     * @param {number} hours - Weekly activity hours
     */
    constructor(height, weight, age, biologicalSex, goalWeight, timetable, hours) {
        // Time tracking
        this.daysPassed = 0;
        this.weeksPassed = 0;

        // User characteristics
        this.height = height;    // Inches (to be converted to cm)
        this.weight = weight;    // Pounds (to be converted to kg)
        this.age = age;
        this.biologicalSex = biologicalSex.toLowerCase();
        this.activityLevel = this.calcActivityLevel(hours);
        this.goalWeight = goalWeight;
        this.timetable = timetable;

        // Initialize nutritional values
        this.initializeNutritionalValues();

        // Initialize consumption trackers
        this.initializeConsumptionTrackers();

        // Set initial macro percentages based on goals
        this.setInitialMacroPercentages();
    }

    /* ======================== */
    /*  INITIALIZATION METHODS  */
    /* ======================== */

    /**
     * Sets up base nutritional targets
     */
    initializeNutritionalValues() {
        // Calorie targets
        this.weeklyCalorieIntake = this.calcCalorieIntake();
        this.dailyCalorieIntake = this.weeklyCalorieIntake / 7;
        this.timetableCalorieIntake = this.weeklyCalorieIntake * this.timetable;

        // Macro targets (carbs, protein, fat)
        this.weeklyCarbs = this.calcCarbs();
        this.dailyCarbs = this.weeklyCarbs / 7;
        this.timetableCarbs = this.weeklyCarbs * this.timetable;

        this.weeklyProtein = this.calcProtein();
        this.dailyProtein = this.weeklyProtein / 7;
        this.timetableProtein = this.weeklyProtein * this.timetable;

        this.weeklyFat = this.calcFat();
        this.dailyFat = this.weeklyFat / 7;
        this.timetableFat = this.weeklyFat * this.timetable;

        // Macro percentages
        this.c_percentage = this.weeklyCarbs * 4 / this.weeklyCalorieIntake;
        this.p_percentage = this.weeklyProtein * 4 / this.weeklyCalorieIntake;
        this.f_percentage = this.weeklyFat * 9 / this.weeklyCalorieIntake;
    }

    /**
     * Initializes all consumption tracking properties
     */
    initializeConsumptionTrackers() {
        // Calorie consumption
        this.dailyCaloriesConsumed = 0;
        this.weeklyCaloriesConsumed = 0;
        this.timetableCaloriesConsumed = 0;

        // Macro consumption
        this.dailyCarbsConsumed = 0;
        this.weeklyCarbsConsumed = 0;
        this.timetableCarbsConsumed = 0;

        this.dailyProteinConsumed = 0;
        this.weeklyProteinConsumed = 0;
        this.timetableProteinConsumed = 0;

        this.dailyFatConsumed = 0;
        this.weeklyFatConsumed = 0;
        this.timetableFatConsumed = 0;

        // Micronutrient tracking
        this.dailySugarConsumed = 0;
        this.dailySodiumConsumed = 0;
        this.dailyFiberConsumed = 0;
    }

    /**
     * Sets initial macro ratios based on weight goals
     */
    setInitialMacroPercentages() {
        const weightDifference = this.goalWeight - this.weight;

        if (weightDifference > 0) {  // Weight gain
            this.f_percentage = 0.3;
            this.p_percentage = (1.5 * this.weight * 4) / this.dailyCalorieIntake;
            this.c_percentage = 1 - this.f_percentage - this.p_percentage;
        }
        else if (weightDifference < 0) {  // Weight loss
            this.f_percentage = 0.25;
            this.p_percentage = 0.25;
            this.c_percentage = 0.5;
        }
        else {  // Weight maintenance
            this.f_percentage = 0.3;
            this.p_percentage = 0.2;
            this.c_percentage = 0.5;
        }
    }

    /* ===================== */
    /*  CONSUMPTION METHODS  */
    /* ===================== */

    /**
     * Updates consumption trackers with new meal data
     * @param {Array} arr - Meal data array [food, calories, carbs, protein, fat, sugar, sodium, fiber]
     */
    updateConsumption(arr) {
        const [_, calories, carbs, protein, fat, sugar = 0, sodium = 0, fiber = 0] = arr;

        // Update calorie consumption
        this.dailyCaloriesConsumed += calories;
        this.weeklyCaloriesConsumed += calories;
        this.timetableCaloriesConsumed += calories;

        // Update macro consumption
        this.dailyCarbsConsumed += carbs;
        this.weeklyCarbsConsumed += carbs;
        this.timetableCarbsConsumed += carbs;

        this.dailyProteinConsumed += protein;
        this.weeklyProteinConsumed += protein;
        this.timetableProteinConsumed += protein;

        this.dailyFatConsumed += fat;
        this.weeklyFatConsumed += fat;
        this.timetableFatConsumed += fat;

        // Update micronutrients
        this.dailySugarConsumed += sugar;
        this.dailySodiumConsumed += sodium;
        this.dailyFiberConsumed += fiber;
    }

    /**
     * Resets daily values and adjusts targets based on progress
     */
    updateDailyValues() {
        this.daysPassed++;
        this.weeksPassed = Math.floor(this.daysPassed / 7);

        const daysRemaining = (this.timetable * 7) - this.daysPassed;

        // Calculate remaining nutrients
        const caloriesRemaining = this.timetableCalorieIntake - this.timetableCaloriesConsumed;
        const carbsRemaining = this.timetableCarbs - this.timetableCarbsConsumed;
        const fatRemaining = this.timetableFat - this.timetableFatConsumed;
        const proteinRemaining = this.timetableProtein - this.timetableProteinConsumed;

        // Update daily targets
        this.dailyCalories = caloriesRemaining / daysRemaining;
        this.dailyCarbs = carbsRemaining / daysRemaining;
        this.dailyFat = fatRemaining / daysRemaining;
        this.dailyProtein = proteinRemaining / daysRemaining;

        // Validate and adjust calorie targets if needed
        if (!this.validCalorieCount(this.dailyCalories)) {
            this.adjustForInvalidCalories();
        }

        // Update weekly targets
        this.weeklyCalories = this.dailyCalories * 7;
        this.weeklyCarbs = this.dailyCarbs * 7;
        this.weeklyFat = this.dailyFat * 7;
        this.weeklyProtein = this.dailyProtein * 7;

        // Reset daily consumption
        this.resetDailyConsumption();

        // Weekly reset if needed
        if (this.daysPassed % 7 === 0) {
            this.resetWeeklyConsumption();
        }
    }

    /**
     * Adjusts targets when daily calories fall outside healthy ranges
     */
    adjustForInvalidCalories() {
        const minDailyCalories = this.biologicalSex === 'female' ? 1200 :
            this.biologicalSex === 'male' ? 1500 : 1350;

        const caloriesRemaining = this.timetableCalorieIntake - this.timetableCaloriesConsumed;
        const daysRemaining = (this.timetable * 7) - this.daysPassed;
        const neededDailyCalories = Math.max(minDailyCalories, caloriesRemaining / daysRemaining);

        if (neededDailyCalories > caloriesRemaining / daysRemaining) {
            // Calculate needed extension
            const neededDays = Math.ceil(caloriesRemaining / neededDailyCalories);
            const extensionWeeks = Math.ceil((neededDays - daysRemaining) / 7);
            this.timetable += extensionWeeks;

            // Recalculate with new timetable
            this.weeklyCalorieIntake = this.calcCalorieIntake();
            this.dailyCalories = neededDailyCalories;
        }

        // Recalculate macro targets
        this.dailyCarbs = this.c_percentage * this.dailyCalories / 4;
        this.dailyFat = this.f_percentage * this.dailyCalories / 9;
        this.dailyProtein = this.p_percentage * this.dailyCalories / 4;
    }

    /**
     * Resets all daily consumption trackers
     */
    resetDailyConsumption() {
        this.dailyCaloriesConsumed = 0;
        this.dailyCarbsConsumed = 0;
        this.dailyProteinConsumed = 0;
        this.dailyFatConsumed = 0;
        this.dailySugarConsumed = 0;
        this.dailySodiumConsumed = 0;
        this.dailyFiberConsumed = 0;
    }

    /**
     * Resets all weekly consumption trackers
     */
    resetWeeklyConsumption() {
        this.weeklyCaloriesConsumed = 0;
        this.weeklyCarbsConsumed = 0;
        this.weeklyProteinConsumed = 0;
        this.weeklyFatConsumed = 0;
    }

    /* ====================== */
    /*  CALCULATION METHODS  */
    /* ====================== */

    /**
     * Calculates activity level (0-4) based on weekly activity hours
     * @param {number} hours - Weekly activity hours
     * @returns {number} Activity level (0-4)
     */
    calcActivityLevel(hours) {
        if (hours < 5) return 0;
        if (hours < 10) return 1;
        if (hours < 15) return 2;
        if (hours < 20) return 3;
        return 4;
    }

    /**
     * Calculates weekly calorie intake based on goals
     * @returns {number} Weekly calorie target
     */
    calcCalorieIntake() {
        const bmr = this.calcBMR();
        const tdee = this.calcEnergyExpenditure(bmr, this.activityLevel);
        const weightChange = this.goalWeight - this.weight;

        let calories = Math.round(7 * tdee + (weightChange * 7000 / this.timetable));

        if (!this.validCalorieCount(calories / 7) || !this.validWeightChange(weightChange)) {
            return 0;  // Should trigger error handling in calling code
        }

        return calories;
    }

    /**
     * Calculates Basal Metabolic Rate (BMR)
     * @returns {number} BMR in calories
     */
    calcBMR() {
        let bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age;

        switch (this.biologicalSex) {
            case 'male': return bmr + 5;
            case 'female': return bmr - 161;
            default: return bmr - 78;
        }
    }

    /**
     * Calculates Total Daily Energy Expenditure (TDEE)
     * @param {number} bmr - Basal Metabolic Rate
     * @param {number} activityLevel - 0-4 activity level
     * @returns {number} TDEE in calories
     */
    calcEnergyExpenditure(bmr, activityLevel) {
        const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
        return bmr * multipliers[activityLevel];
    }

    /**
     * Calculates weekly carbohydrate target (45-65% of calories)
     * @returns {number} Weekly carbs in grams
     */
    calcCarbs() {
        return 0.5 * this.weeklyCalorieIntake * (1/4);  // Middle of 45-65% range
    }

    /**
     * Calculates weekly fat target (20-35% of calories)
     * @returns {number} Weekly fat in grams
     */
    calcFat() {
        return 0.25 * this.weeklyCalorieIntake * (1/9);  // Middle of 20-35% range
    }

    /**
     * Calculates weekly protein target (10-35% of calories)
     * @returns {number} Weekly protein in grams
     */
    calcProtein() {
        return 0.25 * this.weeklyCalorieIntake * (1/4);  // Middle of 10-35% range
    }

    /* ===================== */
    /*  VALIDATION METHODS  */
    /* ===================== */

    /**
     * Validates if calorie count is within healthy ranges
     * @param {number} cals - Daily calories to validate
     * @returns {boolean} True if calorie count is valid
     */
    validCalorieCount(cals) {
        const MIN_CALS = {
            female: 1200,
            male: 1500,
            other: 1350
        };

        const MAX_CALS = this.activityLevel < 4 ? 4000 : 7000;
        const minCals = MIN_CALS[this.biologicalSex] || MIN_CALS.other;

        return cals >= minCals && cals <= MAX_CALS;
    }

    /**
     * Validates if weight change goal is healthy (≤2 lbs/week)
     * @param {number} change - Total weight change goal in pounds
     * @returns {boolean} True if weight change is valid
     */
    validWeightChange(change) {
        return Math.abs(change / this.timetable) <= 2;
    }

    /* ===================== */
    /*  GETTER/SETTER METHODS  */
    /* ===================== */

    // Note: Modern JS can use get/set syntax instead of getX() methods
    get height() { return this._height; }
    get weight() { return this._weight; }
    get age() { return this._age; }
    get biologicalSex() { return this._biologicalSex; }
    get activityLevel() { return this._activityLevel; }
    get goalWeight() { return this._goalWeight; }
    get timetable() { return this._timetable; }
    get weeklyCalorieIntake() { return this._weeklyCalorieIntake; }
    get dailyCalorieIntake() { return this._dailyCalorieIntake; }

    set height(value) { this._height = value; }
    set weight(value) { this._weight = value; }
    set age(value) { this._age = value; }
    set biologicalSex(value) { this._biologicalSex = value.toLowerCase(); }
    set activityLevel(value) {
        if (value >= 0 && value <= 4) this._activityLevel = value;
    }
    set goalWeight(value) { this._goalWeight = value; }
    set timetable(value) { this._timetable = value; }
    set weeklyCalorieIntake(value) { this._weeklyCalorieIntake = value; }
    set dailyCalorieIntake(value) { this._dailyCalorieIntake = value; }

    /* ===================== */
    /*  HELPER METHODS  */
    /* ===================== */

    /**
     * Gets urgency factors for macros (0-1) based on remaining amounts
     * @returns {Object} Urgency factors for carbs, protein, fat
     */
    getMacroUrgencies() {
        return {
            carbs: Math.min(1, (this.dailyCarbs - this.dailyCarbsConsumed) / (this.dailyCarbs * 0.2)),
            protein: Math.min(1, (this.dailyProtein - this.dailyProteinConsumed) / (this.dailyProtein * 0.2)),
            fat: Math.min(1, (this.dailyFat - this.dailyFatConsumed) / (this.dailyFat * 0.2))
        };
    }

    /**
     * Gets ratios of remaining macros
     * @returns {Object} Ratios of remaining carbs, protein, fat
     */
    getRemainingRatios() {
        const remainingCarbs = this.dailyCarbs - this.dailyCarbsConsumed;
        const remainingProtein = this.dailyProtein - this.dailyProteinConsumed;
        const remainingFat = this.dailyFat - this.dailyFatConsumed;

        const total = remainingCarbs + remainingProtein + remainingFat;

        return {
            carbs: remainingCarbs / total,
            protein: remainingProtein / total,
            fat: remainingFat / total
        };
    }

    /**
     * Checks for midnight and updates days if needed
     */
    updateDays() {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            if (now.getDay() === 0) {  // Sunday
                this.updateDailyValues();
            }
        }
    }
}