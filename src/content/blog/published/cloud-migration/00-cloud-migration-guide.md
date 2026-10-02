---
title: "云迁移技术实践资料集"
date: "2026-10-02"
updated: "2026-10-02"
id: "cloud-migration-guide"
categories: "云迁移"
tags: ["云迁移", "阅读索引"]
cover: ""
hide: false
recommend: true
top: true
---

这组文章根据历史纯文本项目资料整理，以技术为主线组织背景、使用项目、实施步骤和问题分析。项目名称、人员、账号、密钥、地址、内部域名、资源标识及业务明细已从文章中移除。

资料中的操作记录、方案建议和阶段结果分别表述。文章中标明的补充措施尚未在原环境重新执行；历史工具配置不等同于当前版本用法。

[整篇阅读：技术实践汇编](/article/cloud-migration-compendium)

## 文章目录

- [迁云评估与网络准备：先解决可达性，再开始搬数据](/article/cloud-migration-network-planning)
- [用 Docker 部署迁移工具：服务依赖和网络模式要一起设计](/article/docker-migration-tools)
- [DTS 与 DRDS 批量迁移：映射、预检查和增量延迟治理](/article/dts-drds-batch-migration)
- [MaxCompute 与 DataWorks 迁移：数据、结构和调度必须共同校验](/article/maxcompute-dataworks-migration)
- [OSS 对象存储迁移：全量、重试与删除一致性](/article/oss-object-storage-migration)
- [Redis 迁移与校验：同步模式、拓扑和 Key 冲突](/article/redis-migration-validation)
- [MongoDB 增量同步：副本集、检查点与同步范围](/article/mongodb-incremental-sync)
- [异构数仓到 Hologres：先核对主键和类型，再批量导入](/article/hologres-warehouse-migration)
- [SQL 行数相同但结果不同：无序集合聚合的排查过程](/article/sql-unordered-aggregation)
- [迁移监控与验收：把运行日志变成可判断的证据](/article/migration-monitoring-acceptance)
- [多产品迁移的割接：按能力边界设计验证和问题闭环](/article/multi-product-migration-cutover)

- [鉴权超时的网络路径排查：用受控绕行验证瓶颈假设](/article/auth-timeout-network-debugging)
- [ADS 分区导出到 MaxCompute：字段与分区列要分别映射](/article/ads-partition-export-maxcompute)
- [OTS 与专有云内部复制工具：状态指标和切换操作的边界](/article/ots-internal-replication)
- [DataWorks 任务导出资料的整理：业务 SQL 与调度配置要一起核对](/article/dataworks-task-dependency-review)

## 技术与项目对应

| 技术 | 项目 | 证据状态 |
| --- | --- | --- |
| 上云评估与网络准备 | G、H、K；通用培训案例 | 流程、问题记录和准备阶段 |
| Docker 迁移平台部署 | H、K；F 培训环境 | 部署记录，未见完整验收 |
| DTS／DRDS 批量迁移 | H；F 辅助材料；D 演示 | 配置、脚本和问题记录 |
| MaxCompute／DataWorks | H、K、I | 阶段状态、操作材料及日志 |
| OSS／ossimport | D、H、K | 演示、阶段状态与部署记录 |
| RedisShake | D | 演示配置与操作笔记 |
| MongoShake | D | 演示配置与操作笔记 |
| 异构数仓／Hologres | K | 脚本与失败记录 |
| SQL 一致性排查 | E | 有定位结论，未见最终修复验收 |
| dstat／日志分析 | B、I、K、H | 监控、过程日志和现场快照 |
| OTS／内部复制工具 | H | 阶段描述、源码，未重新运行 |
| 鉴权超时网络排查 | K | 排查计划和转维配置 |
| ADS 分区导出 | K | 问题说明，未见最终验收 |
| DataWorks 任务导出 | H | 代码与配置归档，未重新导入 |

## 阅读与发布

本文档集的项目字母是匿名代号，不包含真实名称对应表。文章内的 S 编号用于本地溯源，不链接私密目录。可分别发布每篇文章，并通过这份目录建立导航。

只上传本目录中的 Markdown 文件。原始资料、凭据、私密来源索引和核验记录保存在相邻的独立目录中。
