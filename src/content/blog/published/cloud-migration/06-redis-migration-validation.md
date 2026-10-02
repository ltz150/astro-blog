---
title: "Redis 迁移与校验：同步模式、拓扑和 Key 冲突"
date: "2026-10-02"
updated: "2026-10-02"
id: "redis-migration-validation"
categories: "云迁移"
tags: ["云迁移", "Redis"]
cover: ""
hide: false
recommend: false
top: false
---

Redis 迁移需要同时确定源端拓扑、工具读取方式和目标端冲突策略。只比较少量 Key，不能证明整个实例迁移正确。

## 技术在哪些项目用到

| 项目 | 技术用途 | 证据边界 |
| --- | --- | --- |
| 项目 D | Redis 到 Redis 的演示、配置和校验命令 | 记录了旧版 RedisShake 操作；没有完整验收报告 |
| 项目 F | 迁移平台 Redis 配置初始化 | 培训 SQL，不能等同于完成 Redis 数据迁移 |
| 项目 H | 为迁移平台部署 Redis 依赖 | Docker 命令，仅证明部署方法 |

## 项目背景

项目 D 的配置使用 `source.type`、`target.type`，源目标均设为 standalone。命令笔记还讨论了 proxy、cluster、sync、rump 和 restore，但这些说明不代表每种拓扑都在项目中运行过。

## 实施步骤

1. **盘点拓扑与版本。** 确认源端是 standalone、sentinel、cluster 还是代理入口，列出 Redis 与工具版本。
2. **确认读取能力。** 旧笔记将 sync 与 SYNC／PSYNC 联系起来；托管实例是否允许相应能力，需要按实例类型核实。
3. **明确同步模式。** 原笔记中的 sync 包含全量后接增量，rump／restore 不应被当作同样具备持续增量能力。
4. **定义 Key 冲突策略。** 资料列出覆盖、遇冲突退出、保留目标值三种旧版选项。选择前先确认目标端是否已有业务数据。
5. **构造演练数据。** 原文通过循环生成测试 Key，并验证首尾样本。这适合验证链路，不能代替全量一致性检查。
6. **执行同步与观察。** 保存工具日志、同步阶段、错误以及追平状态。
7. **校验数据。** 原文记录了 `redis-full-check`。建议进一步核对 Key 类型、值和 TTL；过期 Key 的比较要建立相同时间边界。
8. **执行切换。** 控制源端写入，完成最终验证，再验证应用访问和写入。

## 问题与解决方法

### 工具配置版本混用

旧资料使用 `redis-shake.linux -type=sync -conf=...` 的启动形式。当前 RedisShake 仓库维护其他版本及配置体系，因此不能把旧配置直接套到新版本。[RedisShake 官方仓库](https://github.com/tair-opensource/RedisShake)

### proxy 与直连模式选择不当

原笔记提醒了分片访问倾斜和连接数问题。整理后的方法是先识别工具对拓扑的支持，再在演练中观察分片连接与同步效果；不能只因为“直连”就推定性能一定更好。

### 使用全量 Key 枚举进行验证

历史示例中有 `KEYS *` 和批量删除测试 Key 的操作。生产环境验证可考虑受控的 SCAN 或校验工具；遍历期间的数据变化仍需通过停写边界和重复核对处理。[Redis SCAN 文档](https://redis.io/docs/latest/commands/scan/)本文没有复用原删除命令。

## 经验与结果边界

该项目资料可以支持“搭建并准备演示 Redis 迁移”的叙述，缺少全量 Key 校验结果和最终切换证明。所有认证参数及真实实例标识都从公开文章中移除。

资料编号：S026—S028、S035、S049。
