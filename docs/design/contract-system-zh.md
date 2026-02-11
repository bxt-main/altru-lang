# Altru 契约系统设计

## 概述
Altru 的契约系统基于 Design by Contract (DbC) 原则，提供编译期和运行时的契约验证机制。

## 核心关键字
- `req` - 前置条件（Requirement）
- `ens` - 后置条件（Ensurance）
- `inv` - 不变式（Invariant）

## 基本语法
```altru
fn divide(a: f64, b: f64) -> f64:
    req b != 0.0
    ens result == a / b
    return a / b
```

## 条件编译
使用 `?` 后缀将契约转换为运行时检查：
```altru
fn sqrt(x: f64) -> f64:
    req x >= 0.0?  # 编译为运行时检查
    ens result >= 0.0
    return x.sqrt()
```

## AI 集成
- AI 辅助契约生成
- 契约验证反馈和修复建议
- 智能契约优化