//calories density - 10% weight

var CalDensity_Score  = 100 - (Calper100g *0.2);


//macro information

//macronutrient balance --> protein + carbs - 20% weight
    //assume goal ratio/number for macros
    //protein > g 
    //carbs & fats --> punish greater for being over goal than under  
    //still punish diff both ways 
var MacroNutrBalance_Score = (protein - cabrs) * 0.1;
//concept macro
function macroScore(){
  var macroweight; 
  var proteinweight;
  var carbgreaterweight;
  var carblessweight;
  var fatgreaterweight;
  var fatlessweight;
  
  
  var protein, carbs, fats;
  var goal_protein, goal_carbs, goal_fats, cal;

  var sum = 0;

  if(protein < goal_protein){
    sum += (goal_protein - protein)*proteinweight;
  }
  if(carbs > goal_carbs){
    sum += (carbs - goal_carbs)*carbgreaterweight;
  }else{
    sum += (goal_carbs - carbs)*carblessweight;
  }
  if(fats > goal_fats){
    sum += (fats - goal_fats)*fatgreaterweight;
  }else{
    sum += (goal_fats - fats)*fatlessweight;
  }
  
  return sum*macroweight;
}


//sugar - 20% weight
    //assume goal ratio/number for sugar
    //punish sugar only for being greater 
    //assume that can't eat "too little" sugar
function sugarScore(){
  var sugar, goal_sugar, sugarweight;
  var sum = 0;
  if(sugar > goal_sugar){
    sum += (sugar - goal_sugar)
  }

  return sum * sugarweight;
}

var AddedSugar_Score = 100 - (AddedSugarsPer100g*2);

//sodium
    //assume goal ratio/number for sodium
    //assume most people eat too much sodium
    //however, should not eat no sodium
    //punish difference, punish greater for eating too much
function sodiumnScore(){
  var sodium, goal_sodium, sodiumgreaterweight, sodiumlessweight, sodiumweight;
  var sum = 0;
  if(sodium > goal_sodium){
    sum += (sodium - goal_sodium)*sodiumgreaterweight;
  }else{
    sum += (goal_sodium - sodium)*sodiumlessweight;
  }

  return sum*sodiumweight;
}

//fiber - 15% weight
    //assume goal ratio/number for fiber
    //punish diff both ways, slightly more for under
    //too much fiber can be bad for digestion 
function fiberScore(){
  var fiber, goal_fiber, fibergreaterweight, fiberlessweight, fiberweight;
  var sum = 0;
  if(fiber > goal_fiber){
    sum += (fiber - goal_fiber)*fibergreaterweight;
  }else{
    sum += (goal_fiber - fiber)*fiberlessweight;
  }

  return sum*fiberweight;
}
var Fiber_Score = FiberPer100g*5;

//nutrient density --> vitamins/ through fruits and vegetables

var NutrDensity_Score = TotalMicroNutrPer100g * Factor;

//Unsaturated vs. Saturated Fat Ratio (USF) Score

var USF = (UnsatFat/(SatFat + 1)) * 100;

//Healthiness score
function Health_Score (Cal_Weight, MacroNutr_Weight, Sugar_Weight, Fiber_Weigth, NutrDensity_Weight, USEF_Weight){

  var Healthiness_Score = CalDensity_Score * Cal_Weight + MacroNutrBalance_Score *     MacroNutr_Weight + AddedSugar_Score * Sugar_Weight + Fiber_Score * Fiber_Weigth + NutrDensity_Score * NutrDensity_Weight + USF * USEF_Weight;

  return Healthiness_Score;
}


//sum all score functions