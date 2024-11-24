import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState({
        Calories: { currentValue: 0, goalValue: 2000 },
        Protein: { currentValue: 0, goalValue: 50 },
        Carbohydrates: { currentValue: 0, goalValue: 300 },
        Fiber: { currentValue: 0, goalValue: 30 },
        Sugar: { currentValue: 0, goalValue: 40 },
        Sodium: { currentValue: 0, goalValue: 2300 },
        Fat: { currentValue: 0, goalValue: 70 },
        TransFats: { currentValue: 0, goalValue: 2 },
        SaturatedFats: { currentValue: 0, goalValue: 20 },
        Cholesterol: { currentValue: 0, goalValue: 300 },
    });

    const updateProgress = (updates) => {
        setProgress((prev) => {
            const updatedProgress = { ...prev };
            Object.keys(updates).forEach((key) => {
                if (updatedProgress[key]) {
                    updatedProgress[key].currentValue += updates[key];
                }
            });
            return updatedProgress;
        });
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};
