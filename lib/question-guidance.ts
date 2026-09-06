import type { ChoiceQuestion, ShortQuestion } from './quiz-types';

export type TopicGuidance = {
  knowledge: string;
  analysis: string;
  extension: string;
};

type GuidanceRule = TopicGuidance & { pattern: RegExp };

const rules: GuidanceRule[] = [
  {
    pattern: /Data and information|Data categories/,
    knowledge: 'Data、information，以及 structured、semi-structured、unstructured data 的判别。',
    analysis: 'Data 是未经语境解释的事实；information 是经过处理并能支持理解或决策的数据。分类时应看是否存在预先确定且稳定的结构，而不是只看文件是否有行列。',
    extension: '考试可能给出 XML、社交媒体内容或 spreadsheet 让你分类。Spreadsheet 有单元格并不必然等于 relational structured data；关键是 schema 是否固定并受到约束。',
  },
  {
    pattern: /Data independence/,
    knowledge: 'Logical data independence 与 physical data independence。',
    analysis: '先判断变化发生在哪一层：logical schema 的实体、属性或关系变化属于 logical change；文件组织、压缩或存储位置变化属于 physical change。独立性的含义是上层程序尽量不受下层变化影响。',
    extension: '常见反向陷阱是把“搬到 cloud”说成 logical change，或把“增加 attribute”说成 physical change。先定位变化层级，再判断 independence。',
  },
  {
    pattern: /DBMS|RDBMS|Database systems|Client-server/,
    knowledge: 'Database、DBMS、RDBMS、database server、client 与 application/web server 的角色。',
    analysis: 'Database 是受管理的数据集合；DBMS 是管理它的软件；RDBMS 以 relations 表示数据。客户端发送请求，数据库服务器上的 DBMS 执行请求并维护共享数据与约束。',
    extension: 'MySQL Server 是 DBMS/server 端；MySQL Workbench 是 client/admin tool。多用户并发、权限、完整性、恢复和数据独立性都是 DBMS 的核心价值。',
  },
  {
    pattern: /Relational model|Relational terminology|Relations|Terminology|Relational design|Relational constraints/,
    knowledge: 'Relational model 的 relation、tuple/row/record、attribute/column/field、degree 与 cardinality。',
    analysis: 'Relation 可视为无序且无重复 tuple 的二维结构；每个 attribute 名在 relation 内唯一，每个单元格只存一个值。Degree 是属性数，cardinality 是当前 tuple 数。',
    extension: '不要把 relationship cardinality 与 relation cardinality 混淆：前者描述实体关联数量，后者只是 relation 当前有多少行。行的显示顺序不属于 relation 的语义。',
  },
  {
    pattern: /Database languages|CRUD|Table structure/,
    knowledge: 'DDL、DML、DCL，以及表结构操作与 CRUD。',
    analysis: 'DDL 定义或修改 schema（CREATE、ALTER、DROP、RENAME）；DML 读取或改变表中数据（SELECT、INSERT、UPDATE、DELETE）；DCL 控制权限（GRANT、REVOKE）。CRUD 的 Create 通常对应 INSERT 一条记录，而不是 CREATE TABLE。',
    extension: '考试常利用同一个英文词 create 混淆层级：CREATE TABLE 是 DDL；在已有表中“create a customer record”是 INSERT/DML。',
  },
  {
    pattern: /Database lifecycle|Design levels|Physical design|Conceptual-to-instance cycle/,
    knowledge: 'Database development lifecycle，以及 conceptual、logical、physical design 的产物与边界。',
    analysis: 'Requirements 先确定业务规则；conceptual model 描述实体与关系；logical model 转成 relations、attributes 和 keys 且不绑定厂商；physical design 决定 DBMS-specific types、indexes、constraints 等；之后才 implementation、loading、testing 和 maintenance。',
    extension: '一道场景题可能要求判断“现在处于哪一阶段”。看到 business meaning 想 conceptual；看到 PK/FK relation 想 logical；看到 VARCHAR、index 或 ON DELETE 想 physical/implementation。',
  },
  {
    pattern: /Data modelling process|Data models|Conceptual modelling|ERD|Entity discovery|Entity selection|Entity types|Entity versus attribute|Noun-verb|ER design alternatives|Design audit/,
    knowledge: 'ER modelling 的目的、迭代流程、实体选择和 noun-verb analysis。',
    analysis: 'ERD 是业务数据需求的计划，不存储实例数据。名词只能作为 entity/attribute 候选，动词只能作为 relationship 候选；最终必须根据身份、属性、用途和 business rules 判断，并在建模后逐条反向验证。',
    extension: '系统本身、纯粹的系统用户和报表输出通常不是业务实体。Address 是否为 entity 取决于是否要存多个地址、独立结构或复用，而不是取决于单词本身。',
  },
  {
    pattern: /Attributes|Domains|Identifiers|Naming conventions|Attribute types/,
    knowledge: 'Attribute、domain、identifier，以及 simple/composite、single/multivalued、stored/derived、mandatory/optional。',
    analysis: 'Domain 是允许值集合；identifier 必须唯一且非空。Composite attribute 可拆分，multivalued attribute 对同一 occurrence 可有多个值，derived attribute 可由其他数据计算，optional attribute 允许缺值。',
    extension: '概念模型中不要用固定的 Skill1、Skill2、Skill3 假装解决 multivalued data。若数量没有稳定上限，通常应建立新 entity/relationship；属性名按课程约定避免空格。',
  },
  {
    pattern: /Cardinality|Participation|Relationships|Business rules/,
    knowledge: 'Relationship、connectivity、minimum/maximum cardinality 与 optional/mandatory participation。',
    analysis: 'Connectivity 给出 1:1、1:M、M:M；cardinality 还要写出每一侧的 minimum 和 maximum。may 通常意味着 minimum 0，must/every 意味着 minimum 1；关系必须从两个方向分别读。',
    extension: '不要从少量 sample rows 推断 cardinality。当前只有一个 child 并不能证明 maximum=1；业务规则才是约束来源。',
  },
  {
    pattern: /[Ww]eak|Strong|Identifying/,
    knowledge: 'Strong/weak entity、identifying relationship、owner、composite key 与 PFK。',
    analysis: 'Weak entity 同时满足两点：存在依赖 owner，而且其 identifier 部分或全部借用 owner 的 PK。借来的键在 child 中既是 PK 的组成部分又是 FK，因此是 PFK。',
    extension: 'Mandatory participation 本身不足以证明 weak。只要 child 有独立标识，它仍可能是 strong entity；另外 weak entity 也可以继续作为另一 weak entity 的 owner。',
  },
  {
    pattern: /M:M|Associative|Mapping audit/,
    knowledge: 'M:M relationship 的解析、associative entity/relation、PFK 和 relationship attributes。',
    analysis: 'Relational database 不能直接实现 M:M，因此要创建 associative relation，把两端 PK 作为 FKs，通常组合成 PK。只依赖这次配对的 Quantity、Grade、DateAssigned 等属性放在 associative relation。',
    extension: '如果同一对实体可在不同时间重复发生，两个 FK 可能不足以唯一识别 occurrence；需要加入日期、开始时间或独立 surrogate key，并保留适当的唯一约束。',
  },
  {
    pattern: /Schema and instance|Schema on write/,
    knowledge: 'Schema、instance、integrity constraints、legal instance 与 schema on write。',
    analysis: 'Schema 定义 relation 的名称、attributes、types 和 constraints；instance 是某一时刻的数据。Legal instance 必须满足 schema 中所有 integrity constraints，这些约束会在写入或修改数据时检查。',
    extension: '插入一行通常只改变 instance，不改变 schema。反之，新增 column 或 constraint 改变 schema，即使当前数据行完全不变。',
  },
  {
    pattern: /Natural|Surrogate|Primary-key|Keys|Identifier data types/,
    knowledge: 'Superkey、candidate key、primary/alternate key，以及 natural 与 surrogate key。',
    analysis: 'Superkey 能唯一识别 tuple；candidate key 还必须 minimal；从 candidate keys 中选一个 primary key，其余是 alternate keys。Surrogate key 没有业务含义，但加入它不能删除原 natural-key 的业务唯一性。',
    extension: '样本中“刚好唯一”不等于业务上保证唯一。选 PK 时考虑 minimal、stable、non-null；编码型 identifier 可能需要 character type 来保留前导零。',
  },
  {
    pattern: /Foreign|Referential|Constraint coverage|Constraints|Implementation constraints/,
    knowledge: 'Foreign key、referential integrity、mandatory participation 与 referential actions。',
    analysis: 'FK 必须匹配被引用 relation 的候选/主键值，或在允许时为 NULL。NOT NULL 实现 child 的 mandatory participation；NO ACTION/RESTRICT 阻止删除仍被引用的 parent；CASCADE 将动作传播到 child。',
    extension: '选择 CASCADE 不能只图方便：独立业务记录通常应阻止误删；真正由 owner 决定存在的 weak rows 更适合随 owner 删除。',
  },
  {
    pattern: /N-ary|Ternary/,
    knowledge: 'Relationship degree，以及 ternary/n-ary relationship 到 relation 的映射。',
    analysis: 'Degree 由参与的 entity types 数量决定。映射 n-ary relationship 时，新 relation 包含每个 participant 的 PK 作为 FK，加上 relationship attributes；这些 FKs 常形成 superkey，但是否足够唯一仍取决于业务规则。',
    extension: '不要轻易把一个真正的 ternary relationship 拆成三个 binary relationships，因为这样可能产生原业务中不存在的组合。若同一 triple 可重复出现，还需日期等 key component。',
  },
  {
    pattern: /Binary|Unary|Mapping case|Mapping$|Conceptual-to-physical mapping|Multivalued mapping|Multivalued attributes/,
    knowledge: 'Conceptual relationship/attribute 到 logical relation、PK/FK，再到 physical design 的映射规则。',
    analysis: '1:M 把 one-side PK 放到 many side；1:1 通常把 mandatory-side PK 放到 optional side以减少 NULL；M:M 建 associative relation。Unary relationship 使用 self-FK，unary M:M 则需要两个有不同 role names 的 self-FKs。',
    extension: '映射后必须再次检查 minimum participation、uniqueness 和重复历史。一个 self-FK 只能表达每个 occurrence 至多一个 parent；若两边都 many，必须有 associative relation。',
  },
  {
    pattern: /Character|MySQL character/,
    knowledge: 'MySQL CHAR、VARCHAR、TEXT/BLOB、LONGTEXT/LONGBLOB 与 ENUM。',
    analysis: 'CHAR 是固定长度并右侧补空格；VARCHAR 只存实际字符并设最大长度；TEXT/BLOB 适合较长内容且不与普通 row data 同样内联；ENUM 将值限制在声明集合。',
    extension: '固定短代码适合 CHAR，可变姓名和 email 适合 VARCHAR，长文本适合 TEXT。不要把数字外观误当成数值语义：含前导零且不计算的 code 仍应使用 character type。',
  },
  {
    pattern: /Integer|Boolean|Bit types/,
    knowledge: 'MySQL integer ranges、SIGNED/UNSIGNED、BIT，以及 Boolean 的存储。',
    analysis: '选择最小但能覆盖完整业务范围的 integer type；UNSIGNED 把负数范围让给更大的非负范围。BIT(M) 存 M 个 bits；MySQL Boolean 在课程材料中按 TINYINT 风格用 1/0 表示。',
    extension: '不要用 INT(M) 表示“最多 M 位数字”；M 不是数值容量或小数位。考试给最大值时，应比较 TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT 的范围。',
  },
  {
    pattern: /Decimal|Exact numeric|Approximate numeric|Floating-point|Data types|MySQL data types/,
    knowledge: 'MySQL data-type 选择，以及 exact DECIMAL 与 approximate FLOAT/DOUBLE。',
    analysis: 'Data type 必须覆盖所有可能值、支持运算、帮助 integrity，并兼顾 storage/performance。DECIMAL(M,D) 是精确 fixed-point，M 为总位数、D 为小数位；FLOAT/DOUBLE 是近似值。',
    extension: 'Money 通常选 DECIMAL 而不是 FLOAT。科学测量可接受 floating-point 误差；identifier 则不应为了外观是数字就选 numeric type。',
  },
  {
    pattern: /Temporal/,
    knowledge: 'MySQL DATE、TIME、DATETIME、TIMESTAMP 与 YEAR。',
    analysis: 'DATE 只有日期；TIME 可表示时间或持续时长；DATETIME 保存给定的日期时间；TIMESTAMP 以 UTC 为基础并按连接时区转换；YEAR 保存年份。',
    extension: '选择 DATETIME 还是 TIMESTAMP 要看业务语义。跨时区事件记录常需要 TIMESTAMP；“当地墙上时间”的预约若不希望自动换算，通常用 DATETIME。还要注意课程材料中的 TIMESTAMP 2038 范围。',
  },
  {
    pattern: /Anomalies/,
    knowledge: 'Denormalised data 中的 insertion、update 与 deletion anomalies。',
    analysis: 'Insertion anomaly 是无法独立新增一个事实；update anomaly 是同一事实重复存储、必须多处修改；deletion anomaly 是删除一行时意外丢失另一类事实。根源通常是多个实体事实混在一张表。',
    extension: '判断 anomaly 时不要只看操作名称，要看“不希望发生的副作用”。Normalisation 通过把不同 functional dependencies 分到适当 relations 来减少这些问题。',
  },
  {
    pattern: /Functional dependencies|Armstrong|Normalisation terminology/,
    knowledge: 'Functional dependency、determinant、partial/transitive dependency 与 Armstrong’s axioms。',
    analysis: 'X → Y 表示任意 legal instance 中，相同 X 必须对应相同 Y；X 是 determinant。Armstrong 基本公理是 reflexivity、augmentation、transitivity，可用于推导隐含 dependencies。',
    extension: 'FD 来自业务语义，不是只看当前样本。Partial dependency 只依赖 composite key 的一部分；transitive dependency 是 non-key attribute 通过另一 non-key attribute 间接依赖 key。',
  },
  {
    pattern: /Normal|1NF|2NF|3NF|UNF|Second Normal Form|Third Normal Form|Exam scope/,
    knowledge: 'Normalisation 从 UNF 到 1NF、2NF、3NF 的逐步分解。',
    analysis: '1NF 去 repeating groups、保证每格单值；2NF 去 non-key attribute 对 composite key 一部分的 partial dependency；3NF 去 non-key attribute 之间的 transitive dependency，并在原 relation 保留 FK。',
    extension: '先准确写出 PK 和 FDs 再分解。单属性 PK 的 1NF relation 自动满足 2NF，但不一定满足 3NF；课程 Quiz 范围止于 3NF，BCNF 及更高 normal forms 不在本范围。',
  },
];

export const findTopicGuidance = (topic: string) => rules.find((rule) => rule.pattern.test(topic));

export const getTopicGuidance = (topic: string): TopicGuidance => findTopicGuidance(topic) ?? {
  knowledge: `${topic} 的定义、规则与场景应用。`,
  analysis: '先识别题干中的业务规则，再将定义和映射规则逐项应用到给定场景。',
  extension: '复习时应能把同一规则应用到新的业务案例，并检查 keys、cardinality 与 integrity constraints 是否一致。',
};

export const choiceAnalysis = (question: ChoiceQuestion) => {
  const guidance = getTopicGuidance(question.topic);
  const answers = question.correct.map((index) => `${String.fromCharCode(65 + index)}. ${question.options[index]}`).join('；');
  const selectionRule = question.kind === 'multiple' ? '这是多选题，所有正确项必须同时成立，漏选或多选都说明规则应用不完整。' : '这是单选题，应选择唯一最符合题干定义或业务规则的选项。';
  return `正确答案是 ${answers}。${guidance.analysis}${selectionRule}`;
};

export const shortAnalysis = (question: ShortQuestion) => {
  const guidance = getTopicGuidance(question.topic);
  return `本题作答应包含参考答案中的关键对象、方向、基数或约束，并使用准确的英文术语。${guidance.analysis}`;
};
