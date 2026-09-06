import type { WeekNumber } from './quiz-types';

export type CoverageItem = {
  week: WeekNumber;
  deck: string;
  slides: string;
  outcome: string;
  questionIds: readonly string[];
};

export const coverageAudit: CoverageItem[] = [
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '4-9', outcome: 'Data, information, and structured/semi-structured/unstructured data', questionIds: ['W1-C01', 'W1-C02', 'W1-C03', 'W1-S02'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '10-11', outcome: 'DBMS benefits, logical independence, and physical independence', questionIds: ['W1-C05', 'W1-C06', 'W1-C15', 'W1-C18', 'W1-X01'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '12-16', outcome: 'RDBMS, database server, clients, and concurrent network access', questionIds: ['W1-C04', 'W1-C07', 'W1-X02', 'W1-X10', 'W1-X01S'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '17-22', outcome: 'Relations, tuples, attributes, row order, PKs, CRUD, and constraints', questionIds: ['W1-C08', 'W1-C09', 'W1-C13', 'W1-C16', 'W1-X03', 'W1-X10'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '23-29', outcome: 'Pizza case: separating customer, order, product, and line-item facts', questionIds: ['W1-S03'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '30-32', outcome: 'Table structure/content operations and DDL/DML/DCL', questionIds: ['W1-C10', 'W1-C11', 'W1-C12', 'W1-X04', 'W1-X05'] },
  { week: 1, deck: 'Week 1-2 Databases Intro', slides: '33-45', outcome: 'Complete database development lifecycle and design-level distinctions', questionIds: ['W1-C14', 'W1-C17', 'W1-S04', 'W1-X06', 'W1-X07', 'W1-X08', 'W1-X09', 'W1-X11', 'W1-X02S'] },

  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '3-5', outcome: 'Iterative modelling, communication, ERD as a plan, and business rules', questionIds: ['W2-C19', 'W2-X01', 'W2-X02'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '6-11', outcome: 'Entities, occurrences, identifiers, domains, and attribute categories', questionIds: ['W2-C01', 'W2-C02', 'W2-C04', 'W2-C05', 'W2-C06', 'W2-C07', 'W2-X03', 'W2-X04', 'W2-X02S'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '12-20', outcome: 'Relationships, two-way reading, connectivity, cardinality, and participation', questionIds: ['W2-C08', 'W2-C09', 'W2-C10', 'W2-C11', 'W2-C20', 'W2-C22', 'W2-X05', 'W2-S01'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '21-22', outcome: 'Foreign-key placement on the many side', questionIds: ['W2-C12', 'W2-C26', 'W2-X06'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '23-27', outcome: 'Strong/weak entities, identifying relationships, composite identifiers, and PFKs', questionIds: ['W2-C13', 'W2-C14', 'W2-C15', 'W2-C23', 'W2-X07', 'W2-S02', 'W2-X03S'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '28-31', outcome: 'Resolving M:M and identifying the direct owner keys of associative entities', questionIds: ['W2-C16', 'W2-C17', 'W2-C24', 'W2-X08', 'W2-S03'] },
  { week: 2, deck: 'Week 2-1 Data Model Intro', slides: '32-33', outcome: 'Noun-verb analysis, design alternatives, and exam-ready conceptual modelling', questionIds: ['W2-X09', 'W2-X10', 'W2-X01S'] },

  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '2-7', outcome: 'ERD development method, entity selection, and entity-versus-attribute decisions', questionIds: ['W3-X01', 'W3-X02', 'W3-X05', 'W3-X02S'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '5, 8-9', outcome: 'Relation terminology, schema/instance, degree, cardinality, and distinct unordered tuples', questionIds: ['W3-C01', 'W3-C02', 'W3-X03', 'W3-X04', 'W3-X01S'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '10-13', outcome: 'Conceptual-to-logical-to-physical-to-implementation-to-instance cycle', questionIds: ['W3-C15', 'W3-X10', 'W3-S05'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '15-21', outcome: 'Superkeys, candidate/primary keys, stability, natural keys, and surrogate keys', questionIds: ['W3-C03', 'W3-C04', 'W3-C05', 'W3-C06', 'W3-C07', 'W3-C08', 'W3-X06', 'W3-X11', 'W3-S02', 'W3-S03'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '22-25', outcome: 'Foreign keys, referential integrity, legal instances, referential actions, and schema on write', questionIds: ['W3-C09', 'W3-C10', 'W3-C11', 'W3-C13', 'W3-C14', 'W3-X07', 'W3-S04'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '27-31', outcome: 'Flattening multivalued attributes and mapping logical relations to physical tables', questionIds: ['W3-C19', 'W3-C23', 'W3-C24', 'W3-X08', 'W3-S05'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '32-35', outcome: 'Unary/binary/ternary/n-ary degree and ternary-relation keys', questionIds: ['W3-C16', 'W3-C17', 'W3-S06'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '36-39', outcome: '1:M constraints, NOT NULL, NO ACTION, weak mapping, and CASCADE', questionIds: ['W3-C12', 'W3-C13', 'W3-X09', 'W3-S03'] },
  { week: 3, deck: 'Week 3-1 Keys Logical & Physical', slides: '40-42', outcome: 'Noun-verb application and full modelling of a historical toy-loan case', questionIds: ['W3-C25', 'W3-S08'] },

  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '2', outcome: 'Physical-design inputs, goals, and decisions', questionIds: ['W4-X01', 'W4-X01S'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '3-6', outcome: 'Mapping binary 1:1, 1:M, M:M, and identifying relationships', questionIds: ['W4-C01', 'W4-C02', 'W4-C03', 'W4-C04', 'W4-X02', 'W4-S01'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '7-11', outcome: 'Unary 1:1, 1:M, and M:M self-referencing mappings with roles', questionIds: ['W4-C05', 'W4-C06', 'W4-C07', 'W4-C22', 'W4-S02', 'W4-S03'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '13', outcome: 'Data-type selection for integrity, range, manipulation, storage, and performance', questionIds: ['W4-C21', 'W4-X01S'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '14', outcome: 'CHAR, VARCHAR, TEXT/BLOB, LONGTEXT/LONGBLOB, and ENUM', questionIds: ['W4-C08', 'W4-C09', 'W4-X03', 'W4-X04', 'W4-X05', 'W4-X15'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '15-16', outcome: 'Integer ranges, signed/unsigned, BIT, Boolean, floating point, and DECIMAL precision/scale', questionIds: ['W4-C10', 'W4-C11', 'W4-C12', 'W4-X06', 'W4-X07', 'W4-X08', 'W4-X09', 'W4-X16', 'W4-X17', 'W4-X18', 'W4-X19', 'W4-X02S', 'W4-X06S'] },
  { week: 4, deck: 'Week 4-1 Physical & Data Types', slides: '17', outcome: 'DATE, TIME, DATETIME, TIMESTAMP, YEAR, formats, ranges, and time zones', questionIds: ['W4-C13', 'W4-C14', 'W4-C15', 'W4-X10', 'W4-X20', 'W4-S05'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '3-9', outcome: 'Normalisation purpose and insertion/update/deletion anomalies', questionIds: ['W4-C16', 'W4-C17', 'W4-C18', 'W4-C23', 'W4-S06'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '11-13', outcome: 'Functional dependencies, determinants, partial/transitive dependencies, and Armstrong axioms', questionIds: ['W4-C19', 'W4-C24', 'W4-C25', 'W4-X21', 'W4-S07', 'W4-X03S'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '14, 16-20', outcome: 'UNF notation, excluding derived values, repeating groups, and conversion to 1NF', questionIds: ['W4-C20', 'W4-X11', 'W4-S08', 'W4-X04S'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '21-23', outcome: '2NF, composite keys, and removal of partial dependencies', questionIds: ['W4-C26', 'W4-C27', 'W4-C29', 'W4-X12', 'W4-S09'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '24-26', outcome: '3NF, transitive dependencies, decomposing determinants, and retaining FKs', questionIds: ['W4-C28', 'W4-X13', 'W4-S10'] },
  { week: 4, deck: 'Week 4-2 Normalisation', slides: '27-30', outcome: 'Scope boundary beyond 3NF and complete normalisation case studies', questionIds: ['W4-X14', 'W4-X05S'] },
];
