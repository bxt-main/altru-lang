# 错误处理

## Result类型

Altru使用`Result`枚举类型来处理可能失败的操作：

```altru
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

## 错误传播

使用`?`操作符可以自动传播错误：

```altru
fn complex_calculation() -> Result[f64, string]:
    req true
    ens result.is_ok() implies result.unwrap() > 0.0
    let x = divide(10.0, 2.0)?  # ?操作符传播错误
    let y = divide(x, 0.0)?
    return Ok(y)
```

## 契约系统集成

错误处理与契约系统紧密集成，确保错误条件在编译期得到验证：

- **req**: 前置条件，用于验证输入参数
- **ens**: 后置条件，用于验证返回值
- **?后缀**: 将契约转换为运行时检查

## 异常处理

对于不可恢复的错误，Altru提供panic机制：

```altru
fn unreachable_code():
    panic("This should never happen")

fn safe_array_access(arr: [i32], index: i32) -> i32:
    if index < 0 or index >= arr.len():
        panic("Array index out of bounds")
    return arr[index]
```

## 自定义错误类型

开发者可以定义自己的错误类型：

```altru
enum MyError:
    InvalidInput(string)
    NetworkError(string)
    FileNotFound(string)

fn process_file(filename: string) -> Result[string, MyError]:
    if !file_exists(filename):
        return Err(MyError::FileNotFound(filename))
    # 处理文件...
    return Ok(content)
```

## 错误组合和转换

支持错误类型的组合和转换：

```altru
fn convert_error[T, E1, E2](result: Result[T, E1], converter: fn(E1) -> E2) -> Result[T, E2]:
    match result:
        Ok(value) => Ok(value)
        Err(error) => Err(converter(error))
```

## AI辅助错误处理

AI系统可以提供错误处理建议：

- 检测未处理的错误情况
- 建议合适的错误类型
- 自动生成错误处理代码
- 提供错误恢复策略

## 最佳实践

- 使用`Result`类型处理可恢复错误
- 使用`panic`处理不可恢复的编程错误
- 为错误类型提供有意义的信息
- 在API边界进行错误转换
- 使用契约系统预防错误发生