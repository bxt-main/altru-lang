# 快速开始

## 安装 Altru 编译器

```bash
# 从源码构建（推荐）
git clone https://github.com/bxt-main/altru-lang.git
cd altru-lang
make build

# 或者使用包管理器（未来支持）
# apt install altru-lang
```

## 创建第一个程序

创建文件 `hello.altru`:

```altru
## 打印问候消息
fn main():
    req true
    ens true
    
    print("Hello, Altru!")
```

## 编译和运行

```bash
# 编译程序
altru build hello.altru

# 运行程序  
./hello
```

## 基本语法示例

### 变量声明
```altru
# 不可变变量（默认）
let x = 42
let y: i32 = 42

# 常量
const MAX_VALUE = 100
```

### 函数定义
```altru
## 计算两个数的和
fn add(a: i32, b: i32) -> i32:
    req true
    ens result == a + b
    return a + b
```

### 控制流
```altru
# 条件语句
if x > 0:
    print("positive")
else:
    print("non-positive")

# 循环
for i in 0..10:
    print(i)
```

### 并发
```altru
# 启动goroutine
go my_function()

# 通道通信
let ch = make(chan string)
ch <- "message"
let msg = <-ch
```

## 下一步

- 阅读 [核心设计原则](design-principles.md)
- 查看 [语法规范 v0.2.1](specification-0.2.1.md)  
- 探索 [AI集成特性](ai-integration.md)
- 参考 [标准库文档](standard-library.md)