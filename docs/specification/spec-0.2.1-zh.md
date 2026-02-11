# Altru 编程语言规范 v0.2.1

**版本**: 0.2.1  
**状态**: 草案  
**最后更新**: 2026-02-10

## 1. 概述

### 1.1 设计目标
Altru 是一种面向未来的编程语言，旨在实现人机共用、团队协作开发，并为AI时代提供安全、高效、可验证的编程体验。

### 1.2 核心原则
- **安全性优先**: 编译期暴露所有潜在Bug
- **明确性**: 语法简洁但语义明确，无歧义
- **可验证性**: 所有代码契约可在编译期验证
- **性能可控**: 提供细粒度的性能和内存控制
- **AI友好**: 为AI系统提供结构化、可理解的代码表示

## 2. 词法结构

### 2.1 字符集
- UTF-8 编码
- 支持 Unicode 标识符

### 2.2 关键字
```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```

### 2.3 标识符
- 以字母或下划线开头
- 可包含字母、数字、下划线
- 区分大小写
- 遵循 snake_case 命名约定

### 2.4 注释
- **单行注释**: `# comment`
- **文档注释**: `## documentation` (用于函数/类型契约)
- **多行注释**: `### multi-line comment ###`

### 2.5 标签系统
- 标签放在函数声明的前一行，用逗号分隔不同标签
- 示例: 
  ```altru
  [hot_replaceable, ai_processing(serialize="json")]
  fn my_function():
      # 函数体
  ```

## 3. 类型系统

### 3.1 基本类型
- **整数类型**: `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`
- **浮点类型**: `f32`, `f64`
- **布尔类型**: `bool`
- **字符类型**: `char` (Unicode scalar value)
- **字符串类型**: `string` (UTF-8 encoded)

### 3.2 常用常数
- **数学常数**: `PI`, `E`, `INF`, `NAN`
- **布尔常数**: `true`, `false`
- **空值常数**: `null`

### 3.3 复合类型

#### 数组
- **固定大小数组**: `[T; N]`
- **动态数组（向量）**: `vec[T]`
- **数组字面量**: `[1, 2, 3, 4, 5]`

#### 元组
- **元组类型**: `(T1, T2, ..., Tn)`
- **元组字面量**: `(1, "hello", true)`

#### 其他复合类型
- **切片**: `[T]` - 动态大小序列
- **结构体**: `struct Name: field: Type`
- **枚举**: `enum Name: Variant1, Variant2(T), ...`
- **联合类型**: `T1 | T2 | ... | Tn`
- **通道类型**: `chan T` - 用于goroutine通信

### 3.4 泛型系统
- **泛型函数**: `fn identity[T](x: T) -> T:`
- **泛型结构体**: `struct Pair[T, U]: first: T, second: U`
- **泛型trait**: `trait Comparable[T]: fn compare(self, other: T) -> i32`
- **类型约束**: `where` 子句用于指定trait约束

### 3.5 Trait 系统
- Trait 定义接口契约
- 无继承，仅组合
- 支持默认实现
- 支持关联类型

### 3.6 类型推断
- 局部变量类型推断
- 函数参数和返回值必须显式标注

## 4. 语法

### 4.1 变量声明简化
```altru
# 不可变变量（默认）
let x = 42
let y: i32 = 42

# 可变变量（使用const关键字表示常量）
const MAX_VALUE = 100
```

### 4.2 函数定义
```altru
## 计算两个整数的最大公约数
[math_utils, pure_function]
fn gcd(a: u32, b: u32) -> u32:
    req a >= 0 and b >= 0
    ens result > 0 or (a == 0 and b == 0)
    
    let mut x = a
    let mut y = b
    
    while y != 0:
        let temp = y
        y = x % y
        x = temp
    
    return x
```

### 4.3 控制流
#### 条件语句
```altru
# 标准if-else
if condition:
    # true分支
else if other_condition:
    # 其他条件
else:
    # false分支
```

#### 循环
```altru
# while循环
while condition:
    # 循环体

# 高效计数循环
for i in 0..10:
    # i从0到9

# 无限循环
loop:
    # 必须有break语句
```

#### 并发原语
```altru
# goroutine启动
go my_function()

# 通道操作
let ch = make(chan i32, 10)
ch <- 42          # 发送
let x = <-ch      # 接收

# select语句
select:
    case msg = <-ch1:
        handle_msg(msg)
    case ch2 <- data:
        send_complete()
    default:
        # 非阻塞操作
```

#### 模式匹配
```altru
match value:
    # 基本模式
    0 => "zero"
    1 => "one"
    # 范围模式
    2..10 => "small number"
    # 变量绑定
    n if n > 10 => "large number: " + n.to_string()
    # 元组解构
    (x, y) => "point at (" + x + ", " + y + ")"
    # 枚举变体
    Ok(value) => "success: " + value
    Err(msg) => "error: " + msg
    # 通配符
    _ => "unknown"
```

### 4.4 表达式和运算符

#### 运算符优先级（从高到低）
1. **后缀运算符**: `()`, `[]`, `.`, `?`
2. **一元运算符**: `not`, `-`, `&`, `&mut`
3. **乘除运算符**: `*`, `/`, `%`
4. **加减运算符**: `+`, `-`
5. **移位运算符**: `<<`, `>>`
6. **比较运算符**: `<`, `<=`, `>`, `>=`
7. **相等运算符**: `==`, `!=`
8. **与运算符**: `and`
9. **或运算符**: `or`
10. **赋值运算符**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`

### 4.5 结构体和Trait
```altru
## 二维点结构
struct Point:
    x: f64
    y: f64

## 可计算距离的trait
[math_trait]
trait Distance:
    ## 计算到另一个点的距离
    fn distance_to(self, other: Self) -> f64:
        req true
        ens result >= 0.0

impl Distance for Point:
    fn distance_to(self, other: Point) -> f64:
        let dx = self.x - other.x
        let dy = self.y - other.y
        return (dx * dx + dy * dy).sqrt()
```

### 4.6 模块系统
```altru
# 模块导入带别名
use std::io as io_module
use std::collections::HashMap as Map

mod math:
    pub fn add(a: i32, b: i32) -> i32:
        ## 两个整数相加
        req true
        ens result == a + b
        return a + b
```

### 4.7 宏系统
```altru
# 声明式宏
macro vec![$($x:expr),*]:
    [$( $x ),*]

# 使用宏
let numbers = vec![1, 2, 3, 4, 5]
```

## 5. 内存管理

### 5.1 所有权系统
- **所有权规则**:
  - 每个值都有唯一的所有者
  - 所有权在赋值时转移（move语义）
  - 当所有者离开作用域时，值被自动清理
  
- **借用规则**:
  - 可以有任意数量的不可变引用（&T）
  - 或者恰好一个可变引用（&mut T）
  - 引用必须总是有效的（无悬空引用）

### 5.2 生命周期
- **生命周期标注**: `'a`, `'b`, `'static`
- **函数中的生命周期**:
  ```altru
  fn longest<'a>(x: &'a str, y: &'a str) -> &'a str:
      if x.len() > y.len():
          return x
      else:
          return y
  ```

## 6. 并发模型

### 6.1 Goroutine模型
```altru
# 启动goroutine
go process_data(data)

# 通道通信
let sender = make(chan string)
let receiver = make(chan i32)
```

### 6.2 Async/Await模型
```altru
async fn fetch_data(url: string) -> Result[string, string]:
    ## 异步HTTP请求
    return Ok("data")

async fn main():
    let data = await fetch_data("https://example.com")
    match data:
        Ok(content) => print(content)
        Err(error) => print("Error: " + error)
```

### 6.3 数据流编程
```altru
## 创建数据流管道
let pipeline = stream::from(vec[1, 2, 3, 4, 5])
    .map(|x| x * 2)
    .filter(|x| x > 5)
    .collect()
```

## 7. AI集成特性

### 7.1 AI处理标注
```altru
[ai_processing(serialize = "json", optimize = "simd")]
struct Vector3:
    x: f32
    y: f32
    z: f32
```

### 7.2 契约系统
- **req**: 前置条件（requirement）
- **ens**: 后置条件（ensurance）
- **?后缀**: 编译为相应条件的判断

### 7.3 编译期AI验证
- 自动验证函数契约
- 检查类型安全
- 验证内存安全
- 优化建议生成

## 8. 错误处理

### 8.1 Result类型
```altru
enum Result[T, E]:
    Ok(T)
    Err(E)

fn divide(a: f64, b: f64) -> Result[f64, string]:
    req b != 0.0?
    if b == 0.0:
        return Err("Division by zero")
    return Ok(a / b)
```

### 8.2 错误传播
```altru
fn complex_calculation() -> Result[f64, string]:
    let x = divide(10.0, 2.0)?  # ?操作符传播错误
    let y = divide(x, 0.0)?
    return Ok(y)
```

## 附录A: 保留关键字完整列表

```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```