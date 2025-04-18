const { userProfile } = require("./userProfile");

export function scoreMeal(arr) {
   //const [food, cal, car, pro, fat, sugar] = arr;
    const name = arr[0];
    const cal = arr[1];
    const car = arr[8];
    const pro = arr[11];
    const fat = arr[3];
    const sugar = arr[10];
    const fiber = arr[9];
    const sodium = arr[7];
    let user;   //placeholder until we know how to access the user

    // Get remaining daily allowances
    const remainingCal = user.getDailyCalorieIntake() - user.dailyCaloriesConsumed;
    const remainingCarbs = user.dailyCarbs - user.dailyCarbsConsumed;
    const remainingProtein = user.dailyProtein - user.dailyProteinConsumed;
    const remainingFat = user.dailyFat - user.dailyFatConsumed;

    // Calculate dynamic macro percentages based on remaining needs
    const totalRemainingMacros = remainingCarbs + remainingProtein + remainingFat;

    // Base targets (will be adjusted based on consumption)
    let f_percentage = remainingFat / totalRemainingMacros;
    let p_percentage = remainingProtein / totalRemainingMacros;
    let c_percentage = remainingCarbs / totalRemainingMacros;

    // Apply goal-based adjustments
    const weightDifference = user.getGoalWeight() - user.getWeight();
    if (weightDifference > 0) { // Weight gain
        // Boost protein importance if not already high
        p_percentage = Math.max(p_percentage, (1.5 * user.weight * 4)/user.dailyCalorieIntake);
        // Ensure minimum fat
        f_percentage = Math.max(f_percentage, 0.25);
    }
    else if (weightDifference < 0) { // Weight loss
        // Higher protein and fat for satiety
        p_percentage = Math.max(p_percentage, 0.25);
        f_percentage = Math.max(f_percentage, 0.25);
    }

    // Normalize to sum to 1
    const sum = c_percentage + p_percentage + f_percentage;
    c_percentage /= sum;
    p_percentage /= sum;
    f_percentage /= sum;

    // Calculate macro alignment (1 - normalized difference)
    const c_align = 1 - (Math.abs(c_percentage - (car * 4) / cal) / c_percentage);
    const p_align = 1 - (Math.abs(p_percentage - (pro * 4) / cal) / p_percentage);
    const f_align = 1 - (Math.abs(f_percentage - (fat * 9) / cal) / f_percentage);

    // Calculate negative attribute scores
    const sugarMaxPerCal = 0.025;
    const sodiumMaxPerCal = 0.75;
    const fiberMinPerCal = 0.014;

    // Sugar and sodium: penalize more heavily as consumption approaches limit
    const sugarConsumedRatio = (user.dailySugarConsumed || 0) / (user.dailyCalorieIntake * sugarMaxPerCal);
    const sodiumConsumedRatio = (user.dailySodiumConsumed || 0) / (user.dailyCalorieIntake * sodiumMaxPerCal);

    const sugar_score = 1 - Math.min(1, sugarConsumedRatio + (sugar/cal)/sugarMaxPerCal);
    const sodium_score = 1 - Math.min(1, sodiumConsumedRatio + (sodium/cal)/sodiumMaxPerCal);

    // Fiber: reward more for helping reach target
    const fiberConsumedRatio = (user.dailyFiberConsumed || 0) / (user.dailyCalorieIntake * fiberMinPerCal);
    const fiber_score = Math.min(1, (fiberConsumedRatio + (fiber/cal)/fiberMinPerCal));

    // Calculate urgency factors (how important each macro is right now)
    const carbUrgency = Math.min(1, remainingCarbs / (user.dailyCarbs * 0.2)); // Becomes urgent when <20% left
    const proteinUrgency = Math.min(1, remainingProtein / (user.dailyProtein * 0.2));
    const fatUrgency = Math.min(1, remainingFat / (user.dailyFat * 0.2));

    // Weight factors now consider urgency
    const macroWeight = 0.6;
    const sugarWeight = 0.15;
    const sodiumWeight = 0.15;
    const fiberWeight = 0.1;

    // Calculate weighted score
    const score =
        (macroWeight * (
            (carbUrgency * c_align) +
            (proteinUrgency * p_align) +
            (fatUrgency * f_align)
        ) / 3) +
        (sugarWeight * sugar_score) +
        (sodiumWeight * sodium_score) +
        (fiberWeight * fiber_score);

    return Math.max(0, Math.min(1, score));
}