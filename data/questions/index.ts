import { Question } from '@/types';
import { algebraBasicsQuestions }            from './algebra-basics';
import { simplifyingQuestions }              from './simplifying';
import { multiplicationPowersQuestions }     from './multiplication-powers';
import { divisionRootsSubstitutionQuestions } from './division-roots-substitution';
import { equationsQuestions }                from './equations';
import { variablesBothSidesQuestions }       from './variables-both-sides';
import { extensionsQuestions }               from './extensions';

export const allQuestions: Question[] = [
  ...algebraBasicsQuestions,
  ...simplifyingQuestions,
  ...multiplicationPowersQuestions,
  ...divisionRootsSubstitutionQuestions,
  ...equationsQuestions,
  ...variablesBothSidesQuestions,
  ...extensionsQuestions,
];

export {
  algebraBasicsQuestions,
  simplifyingQuestions,
  multiplicationPowersQuestions,
  divisionRootsSubstitutionQuestions,
  equationsQuestions,
  variablesBothSidesQuestions,
  extensionsQuestions,
};
