// Benefits mapping utility
// This allows for dynamic addition of custom benefits while maintaining consistency

const BENEFITS_MAP = {
  health_insurance: { label: 'Health Insurance', icon: '🏥', description: 'Medical coverage' },
  dental_insurance: { label: 'Dental Insurance', icon: '🦷', description: 'Dental care' },
  vision_insurance: { label: 'Vision Insurance', icon: '👁️', description: 'Eye care' },
  life_insurance: { label: 'Life Insurance', icon: '🛡️', description: 'Life coverage' },
  retirement_plan: { label: 'Retirement Plan', icon: '💰', description: '401(k) & pension options' },
  living_wage_no_tipping: { label: 'Living Wage (No Tipping)', icon: '💵', description: 'No tipping—staff earn a living salary' },
  paid_time_off: { label: 'Paid Time Off', icon: '🏖️', description: 'Vacation days' },
  sick_leave: { label: 'Sick Leave', icon: '🤒', description: 'Health days' },
  parental_leave: { label: 'Parental Leave', icon: '👶', description: 'Family time' },
  flexible_schedule: { label: 'Flexible Schedule', icon: '⏰', description: 'Work-life balance' },
  employee_discount: { label: 'Employee Discount', icon: '🎫', description: 'Staff perks' },
  meal_allowance: { label: 'Meal Allowance', icon: '🍽️', description: 'Food benefits' },
  transportation_benefit: { label: 'Transportation Benefit', icon: '🚗', description: 'Commute assistance' },
  education_assistance: { label: 'Education Assistance', icon: '📚', description: 'Skill development' },
  gym_membership: { label: 'Gym Membership', icon: '💪', description: 'Fitness benefits' },
  other: { label: 'Other', icon: '✨', description: 'Custom benefits' }
};

// Custom benefits storage (in real app, this would be in a database)
let customBenefits = new Map();

// Standardize benefit input
export const standardizeBenefit = (benefit) => {
  if (!benefit) return '';
  return benefit.toLowerCase().trim().replace(/\s+/g, '_');
};

// Get benefit info
export const getBenefitInfo = (benefitKey) => {
  const standardized = standardizeBenefit(benefitKey);
  
  // Check standard benefits first
  if (BENEFITS_MAP[standardized]) {
    return BENEFITS_MAP[standardized];
  }
  
  // Check custom benefits
  if (customBenefits.has(standardized)) {
    return customBenefits.get(standardized);
  }
  
  // Return other as fallback
  return BENEFITS_MAP.other;
};

// Add custom benefit
export const addCustomBenefit = (benefit, icon = '✨', description = 'Custom benefit') => {
  const standardized = standardizeBenefit(benefit);
  const benefitInfo = {
    label: benefit.trim(),
    icon,
    description,
    isCustom: true
  };
  customBenefits.set(standardized, benefitInfo);
  return standardized;
};

// Get all benefits (standard + custom)
export const getAllBenefits = () => {
  const standardBenefits = Object.keys(BENEFITS_MAP).map(key => ({
    key,
    ...BENEFITS_MAP[key]
  }));
  
  const customBenefitsList = Array.from(customBenefits.entries()).map(([key, info]) => ({
    key,
    ...info
  }));
  
  return [...standardBenefits, ...customBenefitsList];
};

// Get custom benefits only
export const getCustomBenefits = () => {
  return Array.from(customBenefits.entries()).map(([key, info]) => ({
    key,
    ...info
  }));
};

// Check if benefit exists
export const benefitExists = (benefit) => {
  const standardized = standardizeBenefit(benefit);
  return standardized in BENEFITS_MAP || customBenefits.has(standardized);
};

// Get benefit icon
export const getBenefitIcon = (benefitKey) => {
  const info = getBenefitInfo(benefitKey);
  return info.icon;
};

// Get benefit label
export const getBenefitLabel = (benefitKey) => {
  const info = getBenefitInfo(benefitKey);
  return info.label;
};

// Get benefit description
export const getBenefitDescription = (benefitKey) => {
  const info = getBenefitInfo(benefitKey);
  return info.description;
};

export default BENEFITS_MAP; 