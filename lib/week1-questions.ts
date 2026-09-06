import { multiple, short, single } from './quiz-types';

export const week1Choice = [
  single('W1-C01', 1, 'Data and information', 'Which statement best distinguishes data from information?', 1, [
    'Data is always numeric, whereas information is always textual.',
    'Data consists of raw facts; information is data interpreted in context.',
    'Data is stored in tables, whereas information cannot be stored.',
    'Data and information are identical terms in database modelling.',
  ]),
  single('W1-C02', 1, 'Data categories', 'Which example is most clearly semi-structured data?', 2, [
    'A relation with fixed columns and declared domains',
    'A scanned handwritten letter with no machine-readable structure',
    'An XML document whose elements may vary between records',
    'A MySQL table constrained by a primary key',
  ]),
  single('W1-C03', 1, 'Data categories', 'A spreadsheet has different columns on different sheets and no enforced schema. Which classification is safest?', 1, [
    'It is automatically structured because it has cells.',
    'It may be semi-structured because its organisation is not governed by one stable schema.',
    'It is always unstructured because it is not stored by a DBMS.',
    'It is relational because rows are visible.',
  ]),
  single('W1-C04', 1, 'Database systems', 'Which statement about a database and a DBMS is correct?', 0, [
    'A database is the organised data; a DBMS is the software that manages it.',
    'A DBMS is the stored data; a database is the software interface.',
    'A database and a DBMS are always the same physical file.',
    'A DBMS is only a diagram used during conceptual design.',
  ]),
  single('W1-C05', 1, 'Data independence', 'A new attribute is added to the logical schema without requiring every application to be rewritten. Which property is demonstrated?', 2, [
    'Concurrent access',
    'Physical data independence',
    'Logical data independence',
    'Referential integrity',
  ]),
  single('W1-C06', 1, 'Data independence', 'The database files move from a local disk to cloud storage while the logical schema stays unchanged. What does this illustrate?', 1, [
    'Logical data independence',
    'Physical data independence',
    'Entity integrity',
    'Data normalisation',
  ]),
  single('W1-C07', 1, 'Client-server', 'What is the role of MySQL Workbench in the course environment?', 3, [
    'It is the database being managed.',
    'It replaces the MySQL Server process.',
    'It is a physical storage device for table files.',
    'It is a client and administration tool that sends requests to MySQL Server.',
  ]),
  single('W1-C08', 1, 'Relational model', 'Which property belongs to a relation?', 2, [
    'The physical order of rows carries business meaning.',
    'Two attributes in the same relation may have the same name.',
    'Each cell contains one value for one attribute.',
    'Every relation must contain exactly one foreign key.',
  ]),
  single('W1-C09', 1, 'Relational terminology', 'A relation currently has 12 tuples and 5 attributes. What are its cardinality and degree?', 1, [
    'Cardinality 5; degree 12',
    'Cardinality 12; degree 5',
    'Cardinality 17; degree 1',
    'Both are 12 because tuples determine the schema.',
  ]),
  single('W1-C10', 1, 'Database languages', 'Which command is an example of DDL?', 2, [
    'INSERT INTO Customer ...',
    'GRANT SELECT ON Customer ...',
    'ALTER TABLE Customer ADD Email VARCHAR(80)',
    'UPDATE Customer SET ...',
  ]),
  single('W1-C11', 1, 'Database languages', 'Which operation is DML?', 0, [
    'DELETE FROM Booking WHERE BookingID = 8',
    'DROP TABLE Booking',
    'REVOKE UPDATE ON Booking FROM user1',
    'CREATE INDEX BookingDateIndex ON Booking(Date)',
  ]),
  single('W1-C12', 1, 'Database languages', 'Which statement belongs to DCL?', 3, [
    'SELECT * FROM Staff',
    'CREATE TABLE Staff (...)',
    'ALTER TABLE Staff ADD Phone VARCHAR(20)',
    'GRANT SELECT ON Staff TO analyst',
  ]),
  single('W1-C13', 1, 'CRUD and SQL', 'In CRUD terminology, the Create operation for an existing table usually maps to which SQL action?', 1, [
    'CREATE TABLE',
    'INSERT',
    'ALTER',
    'GRANT',
  ]),
  single('W1-C14', 1, 'Database lifecycle', 'During which lifecycle stage are DBMS-specific data types and indexes primarily selected?', 3, [
    'Requirements definition and analysis',
    'Conceptual design',
    'Logical design',
    'Physical design',
  ]),
  multiple('W1-C15', 1, 'DBMS benefits', 'Which are typical benefits provided by a DBMS? Select all that apply.', [0, 1, 3], [
    'Controlled concurrent access',
    'Integrity and security mechanisms',
    'A guarantee that every business requirement has been discovered',
    'Backup and recovery support',
  ]),
  multiple('W1-C16', 1, 'Relational model', 'Which statements describe relations? Select all that apply.', [0, 2, 3], [
    'Attribute names are unique within a relation.',
    'Tuple order is part of the relation\'s meaning.',
    'Each tuple must be distinguishable from every other tuple.',
    'Each cell contains a single value for its attribute.',
  ]),
  multiple('W1-C17', 1, 'Database lifecycle', 'Which activities belong before implementation in the database development lifecycle? Select all that apply.', [0, 1, 2], [
    'Requirements analysis',
    'Conceptual design',
    'Logical and physical design',
    'Loading live rows before constraints are defined',
  ]),
  multiple('W1-C18', 1, 'Data independence', 'Which changes are primarily physical rather than logical? Select all that apply.', [0, 2], [
    'Moving files to a different storage device',
    'Adding a new entity type to the schema',
    'Changing file organisation or compression',
    'Replacing CustomerName with FirstName and Surname in the logical schema',
  ]),
];

export const week1Short = [
  short('W1-S01', 1, 'Database systems', 'Distinguish database, DBMS, RDBMS, database server and MySQL Workbench.', 'A database is the organised data. A DBMS is the software that stores and manages databases. An RDBMS is a DBMS based on the relational model. A database server runs the DBMS and stores databases. MySQL Workbench is a client/administration tool.'),
  short('W1-S02', 1, 'Data categories', 'Classify a fixed-schema customer table, an XML product feed and a collection of free-form videos as structured, semi-structured or unstructured data.', 'Customer table: structured. XML product feed: semi-structured. Free-form videos: unstructured.'),
  short('W1-S03', 1, 'Relational design', 'An order may contain several products and Quantity varies for each order-product pair. State why one OrderLine relation is needed.', 'OrderLine represents each Order–Product occurrence and stores Quantity without repeating Order or Product facts. Its key normally contains OrderID and ProductID.'),
  short('W1-S04', 1, 'Database lifecycle', 'Put these stages in order and state the main output of each: physical design, requirements analysis, implementation, conceptual design, logical design.', 'Requirements analysis → business facts and rules; conceptual design → entities, attributes and relationships; logical design → relations and keys; physical design → DBMS-specific types and constraints; implementation → working database objects.'),
];
