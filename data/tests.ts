import { MiniTest } from '@/types';
import { algebraBasicsQuestions }            from './questions/algebra-basics';
import { simplifyingQuestions }              from './questions/simplifying';
import { multiplicationPowersQuestions }     from './questions/multiplication-powers';
import { divisionRootsSubstitutionQuestions } from './questions/division-roots-substitution';
import { equationsQuestions }                from './questions/equations';
import { variablesBothSidesQuestions }       from './questions/variables-both-sides';
import { extensionsQuestions }               from './questions/extensions';

function pick(arr: MiniTest['questions'], ids: string[]) {
  return arr.filter(q => ids.includes(q.id));
}

export const miniTests: MiniTest[] = [
  {
    id: 'test-basics',
    title: 'Algebra Basics Quiz',
    description: 'Variables, coefficients, like terms, and words into expressions.',
    topics: ['algebra-basics'],
    questions: pick(algebraBasicsQuestions, ['ab-001','ab-002','ab-006','ab-009','ab-010','ab-015','ab-016','ab-018','ab-020','ab-024']),
    timeLimit: 10,
  },
  {
    id: 'test-simplifying',
    title: 'Simplifying Expressions Quiz',
    description: 'Combine like terms, expand, and simplify.',
    topics: ['simplifying'],
    questions: pick(simplifyingQuestions, ['si-001','si-002','si-004','si-005','si-007','si-009','si-013','si-015','si-018','si-020']),
    timeLimit: 10,
  },
  {
    id: 'test-powers',
    title: 'Multiplication & Powers Quiz',
    description: 'Monomials, distributive law, powers.',
    topics: ['multiplication-powers'],
    questions: pick(multiplicationPowersQuestions, ['mp-001','mp-006','mp-007','mp-008','mp-010','mp-011','mp-014','mp-015','mp-019','mp-020']),
    timeLimit: 10,
  },
  {
    id: 'test-roots-sub',
    title: 'Division, Roots & Substitution Quiz',
    description: 'Divide monomials, roots, and substitution.',
    topics: ['division-roots-substitution'],
    questions: pick(divisionRootsSubstitutionQuestions, ['dr-001','dr-003','dr-005','dr-007','dr-011','dr-013','dr-015','dr-016','dr-018','dr-025']),
    timeLimit: 10,
  },
  {
    id: 'test-equations',
    title: 'Equations Quiz',
    description: 'One-step and two-step equations.',
    topics: ['equations'],
    questions: pick(equationsQuestions, ['eq-001','eq-003','eq-005','eq-006','eq-008','eq-010','eq-011','eq-013','eq-015','eq-019']),
    timeLimit: 10,
  },
  {
    id: 'test-both-sides',
    title: 'Variables on Both Sides Quiz',
    description: 'Solve equations with x on both sides.',
    topics: ['variables-both-sides'],
    questions: pick(variablesBothSidesQuestions, ['vb-001','vb-003','vb-005','vb-007','vb-009','vb-011','vb-012','vb-014','vb-016','vb-018']),
    timeLimit: 10,
  },
  {
    id: 'test-mixed-1',
    title: 'Mixed Revision Test A',
    description: 'Algebra Basics + Simplifying + Powers — mixed questions.',
    topics: ['algebra-basics', 'simplifying', 'multiplication-powers'],
    questions: [
      ...pick(algebraBasicsQuestions,        ['ab-001','ab-006','ab-009','ab-014','ab-020']),
      ...pick(simplifyingQuestions,          ['si-001','si-004','si-009','si-013','si-018']),
      ...pick(multiplicationPowersQuestions, ['mp-001','mp-006','mp-008','mp-014','mp-020']),
    ],
    timeLimit: 15,
  },
  {
    id: 'test-mixed-2',
    title: 'Mixed Revision Test B',
    description: 'Division, Roots, Equations, Variables on Both Sides, Extensions.',
    topics: ['division-roots-substitution','equations','variables-both-sides','extensions'],
    questions: [
      ...pick(divisionRootsSubstitutionQuestions, ['dr-002','dr-011','dr-016','dr-021','dr-025']),
      ...pick(equationsQuestions,                 ['eq-002','eq-005','eq-012','eq-015','eq-019']),
      ...pick(variablesBothSidesQuestions,        ['vb-004','vb-007','vb-015']),
      ...pick(extensionsQuestions,                ['ex-008','ex-013']),
    ],
    timeLimit: 15,
  },
  {
    id: 'test-full',
    title: 'Full Term Test',
    description: 'All topics — comprehensive 30-question term test.',
    topics: ['algebra-basics','simplifying','multiplication-powers','division-roots-substitution','equations','variables-both-sides','extensions'],
    questions: [
      algebraBasicsQuestions[0],  algebraBasicsQuestions[5],  algebraBasicsQuestions[8],  algebraBasicsQuestions[11], algebraBasicsQuestions[17],
      simplifyingQuestions[0],    simplifyingQuestions[3],    simplifyingQuestions[6],    simplifyingQuestions[12],   simplifyingQuestions[17],
      multiplicationPowersQuestions[0], multiplicationPowersQuestions[5], multiplicationPowersQuestions[7], multiplicationPowersQuestions[13], multiplicationPowersQuestions[19],
      divisionRootsSubstitutionQuestions[0], divisionRootsSubstitutionQuestions[4], divisionRootsSubstitutionQuestions[10], divisionRootsSubstitutionQuestions[15], divisionRootsSubstitutionQuestions[24],
      equationsQuestions[0], equationsQuestions[4], equationsQuestions[10], equationsQuestions[14], equationsQuestions[18],
      variablesBothSidesQuestions[0], variablesBothSidesQuestions[3], variablesBothSidesQuestions[6],
      extensionsQuestions[7], extensionsQuestions[11],
    ],
    timeLimit: 30,
  },
];

export function getTestById(id: string): MiniTest | undefined {
  return miniTests.find(t => t.id === id);
}
