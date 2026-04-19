import { Topic, LessonCard, Question } from '@/types';

// Inline checkpoint questions (short, reused from seed bank for structure clarity)
const cpQ = (id: string, topic: Topic['id'], sub: string, prompt: string, answer: string, hint: string): Question => ({
  id, topic, subtopic: sub, difficulty: 'easy', type: 'fill-blank',
  prompt, correctAnswer: answer, hint, explanation: '', errorTag: 'mixed-terms-confusion',
});

const algebraBasicsCards: LessonCard[] = [
  {
    id: 'lc-ab-1',
    title: 'What is a Variable?',
    explanation: 'In algebra, a letter (like x, y, or n) is used to represent a number we don\'t know yet. We call this a variable. Think of it as a mystery box 📦 — we solve the puzzle to find what\'s inside.',
    keyPoints: [
      'A variable is a letter that stands for an unknown number',
      'Common variables: x, y, n, a, b',
      'You can use any letter',
    ],
    examples: [
      {
        problem: 'In the expression 3x + 2',
        steps: ['x is the variable', '3 is multiplied by x (the coefficient)', '2 is a plain number (a constant)'],
        answer: 'x is the variable',
      },
    ],
    commonMistake: '⚠️ Don\'t mix up the variable and the coefficient. In 5y, the variable is y, not 5.',
    checkpointQuestion: cpQ('cp-ab-1', 'algebra-basics', 'variables', 'In the term 4k, what is the variable?', 'k', 'Look for the letter.'),
  },
  {
    id: 'lc-ab-2',
    title: 'Coefficients & Constants',
    explanation: 'A coefficient is the number in front of a variable. A constant is a plain number with no variable.',
    keyPoints: [
      'Coefficient = number in front of a variable',
      'Constant = a plain number (no variable)',
      'In x, the invisible coefficient is 1',
    ],
    examples: [
      {
        problem: '7a − 3',
        steps: ['7 is the coefficient of a', '−3 is a constant', 'a is the variable'],
        answer: 'coefficient = 7, constant = −3',
      },
    ],
    commonMistake: '⚠️ When you see just x (no number in front), the coefficient is 1, not 0.',
    checkpointQuestion: cpQ('cp-ab-2', 'algebra-basics', 'coefficients', 'What is the coefficient in 9m?', '9', 'The number in front of m.'),
  },
  {
    id: 'lc-ab-3',
    title: 'Like & Unlike Terms',
    explanation: 'Like terms have the same variable part (same letter AND same power). Only like terms can be added or subtracted.',
    keyPoints: [
      'Like terms: same variable AND same power',
      '3x and 7x are like terms (both have x)',
      '3x and 3y are NOT like terms (different letters)',
      '3x and 3x² are NOT like terms (different powers)',
    ],
    examples: [
      {
        problem: 'Are 5ab and −2ab like terms?',
        steps: ['Both have the variable part ab', 'Both have the same power (ab = a¹b¹)', 'Different coefficients (5 and −2), but that\'s fine'],
        answer: 'Yes — they are like terms',
      },
    ],
    commonMistake: '⚠️ 4x² and 4x are NOT like terms — x² and x have different powers.',
    checkpointQuestion: cpQ('cp-ab-3', 'algebra-basics', 'like-terms', 'Are 3y and 8y like terms? (yes/no)', 'yes', 'Check: same variable, same power?'),
  },
  {
    id: 'lc-ab-4',
    title: 'Words into Expressions',
    explanation: 'Maths problems in words can be written as algebra. Learning the key words unlocks this skill.',
    keyPoints: [
      'Sum / plus / more than → +',
      'Difference / less than / decreased by → −',
      'Product / times / multiplied by → ×',
      'Quotient / divided by / ratio of → ÷',
      '"More than n" = n + something',
    ],
    examples: [
      {
        problem: '"Six more than a number n"',
        steps: ['"More than" → addition', '"Six more than n" → n + 6'],
        answer: 'n + 6',
      },
      {
        problem: '"Twice a number minus 3"',
        steps: ['"Twice" → × 2 → 2n', '"Minus 3" → − 3'],
        answer: '2n − 3',
      },
    ],
    commonMistake: '⚠️ "5 less than n" = n − 5, NOT 5 − n. The order matters!',
    checkpointQuestion: cpQ('cp-ab-4', 'algebra-basics', 'words-to-expressions', 'Write "four times a number p" as an expression.', '4p', 'Times = multiply.'),
  },
];

const simplifyingCards: LessonCard[] = [
  {
    id: 'lc-si-1',
    title: 'Combining Like Terms',
    explanation: 'When you simplify, you add or subtract like terms. Think of it like sorting: x-apples go with x-apples, y-oranges go with y-oranges.',
    keyPoints: [
      'Only like terms can be combined',
      'Add/subtract the coefficients; variable part stays the same',
      '3x + 5x = 8x (not 8x²)',
    ],
    examples: [
      {
        problem: 'Simplify  4a + 3b − 2a + b',
        steps: ['Group a terms: 4a − 2a = 2a', 'Group b terms: 3b + b = 4b', 'Write together: 2a + 4b'],
        answer: '2a + 4b',
      },
    ],
    commonMistake: '⚠️ 3x + 2y ≠ 5xy. Different variables cannot be added!',
    checkpointQuestion: cpQ('cp-si-1', 'simplifying', 'combine-like-terms', 'Simplify:  5x + 3x', '8x', 'Add the coefficients: 5 + 3.'),
  },
  {
    id: 'lc-si-2',
    title: 'Simplifying with Negative Terms',
    explanation: 'Negative coefficients trip people up. Keep the sign attached to the coefficient and work carefully.',
    keyPoints: [
      'The sign belongs to the term it\'s in front of',
      '−3x means the coefficient is −3',
      'Adding a negative = subtracting',
    ],
    examples: [
      {
        problem: 'Simplify  7x − 3x + 2',
        steps: ['x terms: 7x − 3x = 4x', 'Constants: +2 stays', 'Answer: 4x + 2'],
        answer: '4x + 2',
      },
    ],
    commonMistake: '⚠️ When expanding −2(x − 3): −2 × (−3) = +6, not −6.',
    checkpointQuestion: cpQ('cp-si-2', 'simplifying', 'combine-like-terms', 'Simplify:  −2y + 9y', '7y', 'Think: −2 + 9 = ?'),
  },
];

const multiplicationPowersCards: LessonCard[] = [
  {
    id: 'lc-mp-1',
    title: 'Multiplying Monomials',
    explanation: 'To multiply monomials, multiply the numbers together and add the exponents of matching variables.',
    keyPoints: [
      'Multiply the coefficients',
      'Add exponents of the same variable',
      'Different variables just sit next to each other',
    ],
    examples: [
      {
        problem: '3x² × 4x',
        steps: ['Numbers: 3 × 4 = 12', 'x variables: x² × x = x^(2+1) = x³', 'Answer: 12x³'],
        answer: '12x³',
      },
    ],
    commonMistake: '⚠️ x² × x³ = x⁵ (ADD exponents), not x⁶ (don\'t multiply them).',
    checkpointQuestion: cpQ('cp-mp-1', 'multiplication-powers', 'multiply-monomials', 'Simplify:  2x × 3x', '6x²', 'Multiply coefficients and add exponents.'),
  },
  {
    id: 'lc-mp-2',
    title: 'The Distributive Law',
    explanation: 'When a number or variable sits outside brackets, it multiplies EVERY term inside.',
    keyPoints: [
      'a(b + c) = ab + ac',
      'Multiply EVERY term inside by the outside factor',
      'Don\'t forget signs!',
    ],
    examples: [
      {
        problem: '4(2x − 3)',
        steps: ['4 × 2x = 8x', '4 × (−3) = −12', 'Answer: 8x − 12'],
        answer: '8x − 12',
      },
    ],
    commonMistake: '⚠️ 3(x + 2) ≠ 3x + 2. You must also multiply the 2 by 3.',
    checkpointQuestion: cpQ('cp-mp-2', 'multiplication-powers', 'distributive-law', 'Expand:  5(x + 3)', '5x + 15', 'Multiply 5 by each term inside.'),
  },
  {
    id: 'lc-mp-3',
    title: 'Powers & Exponents',
    explanation: 'An exponent (power) tells you how many times to multiply a number by itself.',
    keyPoints: [
      'x² = x × x',
      'x³ = x × x × x',
      'aᵐ × aⁿ = aᵐ⁺ⁿ (add when multiplying same base)',
      '(aᵐ)ⁿ = aᵐˣⁿ (multiply when power of a power)',
    ],
    examples: [
      {
        problem: '2³',
        steps: ['2³ = 2 × 2 × 2', '= 4 × 2', '= 8'],
        answer: '8',
      },
    ],
    commonMistake: '⚠️ 2³ ≠ 6. It is 2 × 2 × 2 = 8, not 2 × 3.',
    checkpointQuestion: cpQ('cp-mp-3', 'multiplication-powers', 'powers', 'What is 4²?', '16', '4 × 4 = ?'),
  },
];

const divisionRootsCards: LessonCard[] = [
  {
    id: 'lc-dr-1',
    title: 'Dividing Monomials',
    explanation: 'To divide monomials, divide the numbers and SUBTRACT exponents of matching variables.',
    keyPoints: [
      'Divide the coefficients',
      'Subtract exponents of same variable',
      'aᵐ ÷ aⁿ = aᵐ⁻ⁿ',
    ],
    examples: [
      {
        problem: '8x³ ÷ 2x',
        steps: ['Numbers: 8 ÷ 2 = 4', 'x: x³ ÷ x = x^(3−1) = x²', 'Answer: 4x²'],
        answer: '4x²',
      },
    ],
    commonMistake: '⚠️ Divide (not subtract) the coefficients. Subtract (not divide) the exponents.',
    checkpointQuestion: cpQ('cp-dr-1', 'division-roots-substitution', 'divide-monomials', 'Simplify: 10x² ÷ 5x', '2x', 'Divide numbers, subtract exponents.'),
  },
  {
    id: 'lc-dr-2',
    title: 'Square & Cube Roots',
    explanation: 'The square root (√) is the opposite of squaring. The cube root (∛) is the opposite of cubing.',
    keyPoints: [
      '√16 = 4 because 4² = 16',
      '√ asks: "what number times itself gives this?"',
      '∛8 = 2 because 2³ = 8',
      'Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100',
    ],
    examples: [
      {
        problem: '√36',
        steps: ['Ask: what × what = 36?', '6 × 6 = 36', 'So √36 = 6'],
        answer: '6',
      },
    ],
    commonMistake: '⚠️ √9 = 3, not 4.5. Always look for the exact whole number.',
    checkpointQuestion: cpQ('cp-dr-2', 'division-roots-substitution', 'square-roots', 'Find √81', '9', '9 × 9 = 81.'),
  },
  {
    id: 'lc-dr-3',
    title: 'Substitution',
    explanation: 'Substitution means replacing variables with numbers and calculating. Always use brackets when substituting to avoid sign mistakes.',
    keyPoints: [
      'Replace every instance of the variable',
      'Use brackets: e.g., x = −2 → 3(−2)',
      'Follow BODMAS/BEDMAS for order of operations',
    ],
    examples: [
      {
        problem: 'If x = 3, find 2x² − 5',
        steps: ['Replace x with 3', '2(3)² − 5', '= 2 × 9 − 5', '= 18 − 5 = 13'],
        answer: '13',
      },
    ],
    commonMistake: '⚠️ If x = −2, then x² = (−2)² = 4, not −4.',
    checkpointQuestion: cpQ('cp-dr-3', 'division-roots-substitution', 'substitution', 'If a = 4, find 3a + 2', '14', 'Replace a with 4 first.'),
  },
];

const equationsCards: LessonCard[] = [
  {
    id: 'lc-eq-1',
    title: 'What is an Equation?',
    explanation: 'An equation is like a balance scale ⚖️. Both sides must stay equal. Whatever you do to one side, you MUST do to the other.',
    keyPoints: [
      'An equation has an equals sign (=)',
      'Both sides must stay balanced',
      'Solve by doing the OPPOSITE (inverse) operation',
    ],
    examples: [
      {
        problem: 'Solve  x + 4 = 9',
        steps: ['Inverse of +4 is −4', 'Subtract 4 from BOTH sides', 'x + 4 − 4 = 9 − 4', 'x = 5'],
        answer: 'x = 5',
      },
    ],
    commonMistake: '⚠️ Always do the same operation to BOTH sides, never just one.',
    checkpointQuestion: cpQ('cp-eq-1', 'equations', 'one-step-add-subtract', 'Solve: x + 6 = 14', 'x = 8', 'Subtract 6 from both sides.'),
  },
  {
    id: 'lc-eq-2',
    title: 'Two-Step Equations',
    explanation: 'Two-step equations need two operations to isolate x. Always deal with addition/subtraction BEFORE multiplication/division.',
    keyPoints: [
      'Step 1: Move constants (add or subtract)',
      'Step 2: Isolate variable (multiply or divide)',
      'Check by substituting your answer back in',
    ],
    examples: [
      {
        problem: 'Solve  3x + 5 = 14',
        steps: ['Step 1: −5 both sides → 3x = 9', 'Step 2: ÷3 both sides → x = 3', 'Check: 3(3) + 5 = 14 ✓'],
        answer: 'x = 3',
      },
    ],
    commonMistake: '⚠️ Don\'t divide before moving constants. 3x + 5 = 14 → first subtract 5, THEN divide by 3.',
    checkpointQuestion: cpQ('cp-eq-2', 'equations', 'two-step', 'Solve: 2x + 1 = 9', 'x = 4', 'Subtract 1, then divide by 2.'),
  },
];

const variablesBothSidesCards: LessonCard[] = [
  {
    id: 'lc-vb-1',
    title: 'Variables on Both Sides',
    explanation: 'When variables appear on both sides of the equation, move them all to one side first. Choose the side that gives a positive coefficient for x.',
    keyPoints: [
      'Move all x-terms to one side',
      'Move all constants to the other side',
      'Then solve as a two-step equation',
    ],
    examples: [
      {
        problem: 'Solve  5x + 2 = 3x + 10',
        steps: ['Move x: subtract 3x from both → 2x + 2 = 10', 'Move constant: subtract 2 from both → 2x = 8', 'Divide by 2 → x = 4', 'Check: 5(4)+2=22, 3(4)+10=22 ✓'],
        answer: 'x = 4',
      },
    ],
    commonMistake: '⚠️ Subtract the SMALLER x-coefficient to keep x positive. It\'s easier.',
    checkpointQuestion: cpQ('cp-vb-1', 'variables-both-sides', 'collect-variables', 'Solve: 4x = x + 12', 'x = 4', 'Subtract x from both sides first.'),
  },
  {
    id: 'lc-vb-2',
    title: 'Equations with Brackets',
    explanation: 'When you see brackets, always expand (use the distributive law) FIRST, then solve.',
    keyPoints: [
      'Expand brackets before solving',
      'Collect like terms',
      'Solve step by step',
    ],
    examples: [
      {
        problem: 'Solve  2(x + 3) = x + 10',
        steps: ['Expand: 2x + 6 = x + 10', 'Move x: 2x − x + 6 = 10 → x + 6 = 10', 'Subtract 6: x = 4'],
        answer: 'x = 4',
      },
    ],
    commonMistake: '⚠️ Don\'t forget to multiply every term inside the bracket.',
    checkpointQuestion: cpQ('cp-vb-2', 'variables-both-sides', 'collect-variables-and-constants', 'Solve: 3(x + 1) = 2x + 7', 'x = 4', 'Expand 3(x+1) first.'),
  },
];

const extensionsCards: LessonCard[] = [
  {
    id: 'lc-ex-1',
    title: 'Exponential Equations',
    explanation: 'In an exponential equation, the variable is an exponent. To solve, write both sides using the same base.',
    keyPoints: [
      'Get both sides as the same base',
      'If bases match, exponents must match',
      'Know your powers: 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32',
    ],
    examples: [
      {
        problem: 'Solve  2ˣ = 8',
        steps: ['Write 8 as a power of 2: 8 = 2³', '2ˣ = 2³', 'Bases equal → x = 3'],
        answer: 'x = 3',
      },
    ],
    commonMistake: '⚠️ 2ˣ = 8 does NOT mean x = 8 ÷ 2. You must express 8 as 2³.',
    checkpointQuestion: cpQ('cp-ex-1', 'extensions', 'exponential-equations', 'Solve: 3ˣ = 27', 'x = 3', '27 = 3 × 3 × 3 = 3³.'),
  },
  {
    id: 'lc-ex-2',
    title: 'Word Problems into Equations',
    explanation: 'Word problems describe a situation. Your job is to convert the words into an equation, then solve it.',
    keyPoints: [
      'Define your variable: "Let x = ..."',
      'Write an equation from the words',
      'Solve the equation',
      'Check your answer makes sense',
    ],
    examples: [
      {
        problem: 'A number is tripled and 4 is added. The result is 19. Find the number.',
        steps: ['Let n = the number', 'Equation: 3n + 4 = 19', 'Subtract 4: 3n = 15', 'Divide by 3: n = 5', 'Check: 3(5) + 4 = 19 ✓'],
        answer: 'n = 5',
      },
    ],
    commonMistake: '⚠️ Always define what your variable represents before you write the equation.',
    checkpointQuestion: cpQ('cp-ex-2', 'extensions', 'word-sums', 'A number plus 9 equals 17. What is it?', '8', 'Let x = number. x + 9 = 17.'),
  },
];

export const topics: Topic[] = [
  {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    shortTitle: 'Basics',
    description: 'Variables, terms, coefficients, like terms, and turning words into algebra.',
    icon: '🔤',
    color: 'bg-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    accentHex: '#7c3aed',
    subtopics: ['variables', 'coefficients', 'constants', 'terms', 'like-terms', 'words-to-expressions'],
    lessonCards: algebraBasicsCards,
    weekNumber: 1,
  },
  {
    id: 'simplifying',
    title: 'Simplifying Expressions',
    shortTitle: 'Simplifying',
    description: 'Combine like terms and simplify algebraic expressions.',
    icon: '✂️',
    color: 'bg-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    accentHex: '#2563eb',
    subtopics: ['combine-like-terms', 'cannot-combine', 'mixed-practice'],
    lessonCards: simplifyingCards,
    weekNumber: 2,
  },
  {
    id: 'multiplication-powers',
    title: 'Multiplication & Powers',
    shortTitle: 'Powers',
    description: 'Multiply monomials, distributive law, powers, squares and cubes.',
    icon: '⚡',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    accentHex: '#f97316',
    subtopics: ['multiply-monomials', 'distributive-law', 'powers', 'squares-cubes'],
    lessonCards: multiplicationPowersCards,
    weekNumber: 3,
  },
  {
    id: 'division-roots-substitution',
    title: 'Division, Roots & Substitution',
    shortTitle: 'Roots & Sub',
    description: 'Divide monomials, find square and cube roots, and substitute values.',
    icon: '√',
    color: 'bg-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
    accentHex: '#0d9488',
    subtopics: ['divide-monomials', 'square-roots', 'cube-roots', 'substitution'],
    lessonCards: divisionRootsCards,
    weekNumber: 4,
  },
  {
    id: 'equations',
    title: 'Equations',
    shortTitle: 'Equations',
    description: 'Solve one-step and two-step equations and check answers.',
    icon: '⚖️',
    color: 'bg-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    accentHex: '#16a34a',
    subtopics: ['one-step-add-subtract', 'one-step-multiply-divide', 'two-step', 'checking-substitution'],
    lessonCards: equationsCards,
    weekNumber: 5,
  },
  {
    id: 'variables-both-sides',
    title: 'Variables on Both Sides',
    shortTitle: 'Both Sides',
    description: 'Collect variables, collect constants, and solve step-by-step.',
    icon: '↔️',
    color: 'bg-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    accentHex: '#e11d48',
    subtopics: ['collect-variables', 'collect-constants', 'collect-variables-and-constants', 'mixed-revision'],
    lessonCards: variablesBothSidesCards,
    weekNumber: 6,
  },
  {
    id: 'extensions',
    title: 'Extensions',
    shortTitle: 'Extensions',
    description: 'Words into expressions, equations with brackets, exponential equations, and word sums.',
    icon: '🚀',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    accentHex: '#d97706',
    subtopics: ['words-to-expressions', 'equations-brackets', 'exponential-equations', 'word-sums'],
    lessonCards: extensionsCards,
    weekNumber: 7,
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}
