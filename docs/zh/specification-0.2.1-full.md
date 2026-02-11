# Altru 语言规范 v0.2.1 - 完整版

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
  ```Altru
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
- **数组操作示例**:
  ```Altru
  ## 创建和操作数组
  let numbers = [1, 2, 3, 4, 5]
  let empty_array: [i32; 0] = []
  let repeated: [i32; 5] = [0; 5]  # [0, 0, 0, 0, 0]
  
  # 访问元素
  let first = numbers[0]
  let last = numbers[numbers.len() - 1]
  
  # 数组切片
  let slice = numbers[1..3]  # [2, 3]
  ```

#### 元组
- **元组类型**: `(T1, T2, ..., Tn)`
- **元组字面量**: `(1, "hello", true)`
- **元组操作示例**:
  ```Altru
  ## 使用元组返回多个值
  let point = (3.0, 4.0)
  let (x, y) = point  # 解构赋值
  
  # 访问元组元素
  let x_coord = point.0
  let y_coord = point.1
  
  # 函数返回元组
  fn get_bounds() -> (i32, i32):
      ## 返回最小值和最大值
      req true
      ens result.0 <= result.1
      return (0, 100)
  
  let (min, max) = get_bounds()
  ```

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
  ```Altru
  fn sort[T](items: [T]) -> [T] where T: Comparable[T]:
      ## 对可比较的项进行排序
      req items.len() >= 0
      ens result.len() == items.len()
      # 实现排序
  ```

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
```Altru
# 不可变变量（默认）
let x = 42
let y: i32 = 42

# 可变变量（使用const关键字表示常量）
const MAX_VALUE = 100

# 可交互变量（外部可修改）
let @config_value = "default"
```

### 4.2 函数定义
```Altru
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
```Altru
# 标准if-else
if condition:
    # true分支
else if other_condition:
    # 其他条件
else:
    # false分支

# 单行if-else表达式
let result = if x > 0: "positive" else: "non-positive"
```

#### 循环
```Altru
# while循环
while condition:
    # 循环体

# 高效计数循环
for i in 0..10:
    # i从0到9

# for循环（迭代）
for item in collection:
    # 处理每个item

# 无限循环
loop:
    # 必须有break语句
    if condition:
        break
```

#### 并发原语
```Altru
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

#### 模式匹配（细化）
```Altru
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

#### 逻辑运算符
- `and` - 逻辑与
- `or` - 逻辑或  
- `not` - 逻辑非

#### 比较运算符
- `==`, `!=`, `<`, `<=`, `>`, `>=`

#### 算术运算符
- `+`, `-`, `*`, `/`, `%`

#### 赋值运算符
- `=`, `+=`, `-=`, `*=`, `/=`, `%=`

#### 通道运算符
- `<-` - 通道发送/接收

#### 长语句换行
```Altru
let complex_calculation = very_long_function_name(
    param1,
    param2,
    param3
) + another_long_expression

# 或者使用反斜杠
let result = first_part + \
             second_part + \
             third_part
```

### 4.5 结构体和Trait
```Altru
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
```Altru
# 模块导入带别名
use std::io as io_module
use std::collections::HashMap as Map

# 包管理声明（Cargo.toml风格）
[package]
name = "my_project"
version = "0.1.0"
authors = ["Author <author@example.com>"]

[dependencies]
altru_std = "0.2.0"

mod math:
    pub fn add(a: i32, b: i32) -> i32:
        ## 两个整数相加
        req true
        ens result == a + b
        return a + b
    
    # 默认私有，无需priv关键字
    fn private_helper():
        # 私有函数
```

### 4.7 宏系统
```Altru
# 声明式宏
macro vec![$($x:expr),*]:
    [$( $x ),*]

# 使用宏
let numbers = vec![1, 2, 3, 4, 5]

# 过程宏（用于代码生成）
[derive(Debug, Clone)]
struct MyStruct:
    field: i32
```

### 4.8 Super关键字用法
```Altru
## 基础trait定义
trait Animal:
    fn speak(self) -> string:
        req true
        ens result.len() > 0
        return "generic animal sound"

## 继承trait（通过组合）
trait Mammal:
    fn is_warm_blooded(self) -> bool:
        req true
        ens result == true
        return true

## 具体实现
struct Dog:
    name: string

impl Animal for Dog:
    fn speak(self) -> string:
        req self.name.len() > 0
        ens result.len() > 0
        return self.name + " says woof!"

impl Mammal for Dog:
    # Mammal trait的默认实现已足够

## 在方法中使用super调用父trait方法
impl Dog:
    fn generic_speak(self) -> string:
        ## 调用Animal trait的默认实现
        return super::Animal::speak(self)
    
    fn detailed_info(self) -> string:
        ## 组合多个trait的方法
        let sound = self.speak()
        let warm = if self.is_warm_blooded(): "warm-blooded" else: "cold-blooded"
        return self.name + " is " + warm + " and says: " + sound
```

## 5. 内存管理

### 5.1 所有权系统（细化）
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
  ```Altru
  fn longest<'a>(x: &'a str, y: &'a str) -> &'a str:
      req x.len() >= 0 and y.len() >= 0
      ens result.len() >= x.len() or result.len() >= y.len()
      if x.len() > y.len():
          return x
      else:
          return y
  ```

### 5.3 手动内存分配
```Altru
# 分配内存
let ptr = alloc(sizeof(MyStruct))
# 使用内存
# ...
# 释放内存
free(ptr)
```

### 5.4 内存安全保证
- 编译期检查所有指针访问
- 无悬空指针
- 无缓冲区溢出
- 无数据竞争

## 6. 字符串处理

### 6.1 字符串字面量
- **普通字符串**: `"hello"`
- **原始字符串**: `r"raw string with \n and quotes"`
- **多行字符串**: 
  ```
  """
  This is a
  multi-line string
  """
  ```

### 6.2 字符串操作
- 字符串连接: `"hello" + "world"`
- 字符串插值: `"Value: ${value}"`
- 转义序列: `\n`, `\t`, `\"`, `\\`

## 7. 并发模型

### 7.1 Goroutine模型
```Altru
# 启动goroutine
go process_data(data)

# 通道通信
let sender = make(chan string)
let receiver = make(chan i32)

go sender_task(sender)
go receiver_task(receiver)
```

### 7.2 Async/Await模型
```Altru
async fn fetch_data(url: string) -> Result[string, string]:
    ## 异步HTTP请求
    req url.len() > 0
    ens result.is_ok() or result.is_err()
    # 异步HTTP请求
    return Ok("data")

async fn main():
    let data = await fetch_data("https://example.com")
    match data:
        Ok(content) => print(content)
        Err(error) => print("Error: " + error)
```

### 7.3 数据流编程
```Altru
## 创建数据流管道
let pipeline = stream::from(vec[1, 2, 3, 4, 5])
    .map(|x| x * 2)
    .filter(|x| x > 5)
    .collect()
```

### 7.4 事件驱动
```Altru
## 定义事件处理器
event on_click(button_id: string):
    ## 处理点击事件
    req button_id.len() > 0
    handle_button_click(button_id)
```

### 7.5 线程同步
- 无共享可变状态
- 通过消息传递进行通信
- 内置原子操作
- 互斥锁和读写锁支持

## 8. 运行时特性

### 8.1 动态函数替换
```Altru
[hot_replaceable, experimental]
fn experimental_algorithm(data: [f64]) -> f64:
    ## 实验性算法实现
    req data.len() > 0
    ens result >= 0.0
    return 0.0
```

### 8.2 AB测试支持
```Altru
[ab_test(old_version = "v1.0", new_version = "v1.1"), performance_test]
fn optimized_function(input: Input) -> Output:
    ## 同时运行新旧版本进行对比
    req input.is_valid()
    ens result.is_valid()
```

## 9. AI集成特性

### 9.1 AI处理标注
```Altru
[ai_processing(serialize = "json", optimize = "simd")]
struct Vector3:
    x: f32
    y: f32
    z: f32
```

### 9.2 契约系统
- **req**: 前置条件（requirement）
- **ens**: 后置条件（ensurance）
- **?后缀**: 编译为相应条件的判断
  ```Altru
  req x > 0?  # 编译为 if !(x > 0) { panic("req failed") }
  ```

### 9.3 编译期AI验证
- 自动验证函数契约
- 检查类型安全
- 验证内存安全
- 优化建议生成

## 10. 日志系统

### 10.1 Log模块
```Altru
use std::log

# 设置日志级别
log::set_level(log::INFO)

# 不同级别的日志
log::debug("Debug message")
log::info("Info message") 
log::warn("Warning message")
log::error("Error message")

# 带样式的日志
log::info(style="bold", "Important info")
log::error(color="red", "Critical error")

# 输出到不同途径
log::to_file("app.log")
log::to_console()
log::to_network("127.0.0.1:514")
```

### 10.2 日志级别
- `TRACE` - 最详细的信息
- `DEBUG` - 调试信息
- `INFO` - 一般信息
- `WARN` - 警告信息
- `ERROR` - 错误信息

## 11. 错误处理

### 11.1 Result类型
```Altru
enum Result[T, E]:
    Ok(T)
    Err(E)

fn divide(a: f64, b: f64) -> Result[f64, string]:
    req b != 0.0?
    ens result.is_ok() implies result.unwrap() == a / b
    if b == 0.0:
        return Err("Division by zero")
    return Ok(a / b)
```

### 11.2 错误传播
```Altru
fn complex_calculation() -> Result[f64, string]:
    req true
    ens result.is_ok() implies result.unwrap() > 0.0
    let x = divide(10.0, 2.0)?  # ?操作符传播错误
    let y = divide(x, 0.0)?
    return Ok(y)
```

## 12. 包管理

### 12.1 依赖声明
```toml
# Altru.toml
[package]
name = "my_app"
version = "0.1.0"
edition = "2026"

[dependencies]
http = "0.2"
serde = { version = "1.0", features = ["json"] }

[dev-dependencies]
test_utils = "0.1"
```

### 12.2 构建命令
- `Altru build` - 构建项目
- `Altru run` - 运行项目
- `Altru test` - 运行测试
- `Altru doc` - 生成文档

## 附录A: 保留关键字完整列表

```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```

## 附录B: 标准库概览

### B.1 核心模块
- `std::core`: 基础类型和操作
- `std::mem`: 内存操作
- `std::ptr`: 指针操作
- `std::slice`: 切片操作
- `std::log`: 日志系统

### B.2 数据结构
- `std::vec`: 动态数组
- `std::map`: 哈希映射
- `std::set`: 集合
- `std::queue`: 队列
- `std::channel`: 通道实现

### B.3 并发
- `std::thread`: 线程管理
- `std::sync`: 同步原语
- `std::stream`: 数据流处理
- `std::async`: 异步运行时

### B.4 I/O
- `std::io`: 输入输出
- `std::fs`: 文件系统
- `std::net`: 网络操作

### B.5 宏系统
- `std::macro`: 宏处理工具
- `std::proc_macro`: 过程宏支持

## 版本历史

- **0.0.1** (2026-02-10): 初始草案版本
- **0.1.0** (2026-02-10): 优化版本，包含16项改进
- **0.2.0** (2026-02-10): 整合并发模型、模块系统、泛型系统、宏系统改进
- **0.2.1** (2026-02-10): 
  - 增加数组和元组使用范例
  - 简化函数和trait文档注释（只保留设计目的）
  - 标签系统改为函数声明前一行，逗号分隔
  - 补充运算符优先级
  - 添加super关键字用法示例