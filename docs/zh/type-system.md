---
layout: default
---
# 类型系统

## 基本类型

### 整数类型
- **有符号整数**: `i8`, `i16`, `i32`, `i64`
- **无符号整数**: `u8`, `u16`, `u32`, `u64`

### 浮点类型
- **单精度**: `f32`
- **双精度**: `f64`

### 布尔类型
- **布尔值**: `bool` (值为 `true` 或 `false`)

### 字符和字符串
- **字符**: `char` (Unicode标量值)
- **字符串**: `string` (UTF-8编码)

### 常用常数
- **数学常数**: `PI`, `E`, `INF`, `NAN`
- **布尔常数**: `true`, `false`
- **空值常数**: `null`

## 复合类型

### 数组
- **固定大小数组**: `[T; N]`
- **动态数组（向量）**: `vec[T]`
- **数组字面量**: `[1, 2, 3, 4, 5]`

### 元组
- **元组类型**: `(T1, T2, ..., Tn)`
- **元组字面量**: `(1, "hello", true)`

### 其他复合类型
- **切片**: `[T]` - 动态大小序列
- **结构体**: `struct Name: field: Type`
- **枚举**: `enum Name: Variant1, Variant2(T), ...`
- **联合类型**: `T1 | T2 | ... | Tn`
- **通道类型**: `chan T` - 用于goroutine通信

## 泛型系统

### 泛型函数
```Altru
fn identity[T](x: T) -> T:
    return x

fn max[T](a: T, b: T) -> T where T: Ord:
    if a > b:
        return a
    else:
        return b
```

### 泛型结构体
```Altru
struct Point[T]:
    x: T
    y: T

struct Result[T, E]:
    value: T | E
```

### 泛型约束
使用 `where` 子句指定trait约束：
```Altru
fn sort[T](items: [T]) -> [T] where T: Comparable[T]:
    ## 对可比较的项进行排序
    req items.len() >= 0
    ens result.len() == items.len()
    # 实现排序
```

## Trait 系统

### Trait定义
Trait定义接口契约，无继承，仅组合：
```Altru
trait Distance:
    ## 计算到另一个点的距离
    fn distance_to(self, other: Self) -> f64:
        req true
        ens result >= 0.0
```

### Trait实现
```Altru
impl Distance for Point:
    fn distance_to(self, other: Point) -> f64:
        let dx = self.x - other.x
        let dy = self.y - other.y
        return (dx * dx + dy * dy).sqrt()
```

### 支持特性
- **默认实现**: Trait可以提供默认方法实现
- **关联类型**: 支持在trait中定义关联类型
- **组合而非继承**: 通过组合多个trait实现多态

## 类型推断

### 推断规则
- **局部变量**: 支持类型推断
- **函数参数和返回值**: 必须显式标注类型
- **泛型参数**: 在函数调用时自动推断

### 示例
```Altru
let x = 42        # 推断为 i32
let y = "hello"   # 推断为 string
let z = [1, 2, 3] # 推断为 [i32; 3]
```

## 联合类型

### 语法
联合类型使用 `|` 操作符定义：
```Altru
type Number = i32 | f64 | string
```

### 模式匹配
必须使用模式匹配处理联合类型的所有可能情况：
```Altru
fn process_value(value: Number):
    match value:
        i32 n => handle_integer(n)
        f64 f => handle_float(f)
        string s => handle_string(s)
    # 编译器确保所有分支都被处理
```

## 类型安全保证

### 强静态类型
- **编译期类型检查**: 所有类型在编译期确定
- **无隐式转换**: 所有类型转换必须显式进行
- **模式匹配完备性**: match表达式必须覆盖所有可能的值

### 内存安全
- **所有权系统**: 防止内存泄漏和双重释放
- **借用检查**: 防止悬空指针和数据竞争
- **边界检查**: 数组访问自动进行边界检查

## 与AI集成

### AI辅助类型推断
```Altru
[ai_infer_types]
fn complex_function(data):
    # AI自动推断参数和返回值类型
    return processed_data
```

### 类型契约验证
```Altru
fn safe_operation[T](input: T) -> T where T: Validatable:
    req input.is_valid()?  # AI验证泛型类型的合法性
    return process(input)
```

## 性能特性

### 零成本抽象
- **单态化**: 泛型在编译期展开为具体类型
- **内联优化**: 小函数自动内联
- **死代码消除**: 未使用的代码路径被移除

### 运行时性能
- **无反射开销**: 类型信息在编译期完全擦除
- **直接内存访问**: 结构体字段直接映射到内存布局
- **高效的模式匹配**: 编译为跳转表或决策树

## 与其他语言对比

### vs Rust
- **相似点**: 所有权系统、强类型安全、零成本抽象
- **差异点**: Altru语法更简洁，内置AI辅助，更好的团队协作支持

### vs TypeScript
- **相似点**: 联合类型、类型推断
- **差异点**: Altru是编译到原生代码，提供真正的内存安全保证

### vs Go
- **相似点**: 简洁语法、并发模型
- **差异点**: Altru提供编译期内存安全，更强的类型系统

这个类型系统设计确保了Altru语言既安全又高效，同时保持了良好的开发体验。