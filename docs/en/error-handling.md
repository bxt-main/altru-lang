---
layout: default
---
---
layout: en
---
# Error Handling

## Result Type

Altru uses the `Result` type for error handling, which is an enum that can represent either a successful value or an error:

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

## Error Propagation

The `?` operator provides convenient error propagation:

```Altru
fn complex_calculation() -> Result[f64, string]:
    req true
    ens result.is_ok() implies result.unwrap() > 0.0
    let x = divide(10.0, 2.0)?  # ? operator propagates errors
    let y = divide(x, 0.0)?
    return Ok(y)
```

When the `?` operator is used on a `Result`, it will:
- If the result is `Ok(value)`, extract and return the value
- If the result is `Err(error)`, immediately return the error from the current function

## Pattern Matching for Error Handling

Explicit pattern matching provides full control over error handling:

```Altru
match divide(10.0, 0.0):
    Ok(value) => println("Result: ${value}")
    Err(msg) => println("Error: ${msg}")
```

## Contract Integration

Error handling integrates with the contract system through runtime checks:

```Altru
fn safe_sqrt(x: f64) -> Result[f64, string]:
    req x >= 0.0?  # Runtime check that returns Err if violated
    ens result.is_ok() implies result.unwrap() >= 0.0
    return Ok(x.sqrt())
```

## Custom Error Types

Custom error types can be defined for more structured error handling:

```Altru
enum MathError:
    DivisionByZero
    InvalidInput(string)
    Overflow

fn precise_divide(a: i32, b: i32) -> Result[i32, MathError]:
    if b == 0:
        return Err(MathError::DivisionByZero)
    if a == i32::MIN and b == -1:
        return Err(MathError::Overflow)
    return Ok(a / b)
```

## Error Chaining

Errors can be chained to provide context:

```Altru
fn process_file(filename: string) -> Result[Data, string]:
    let content = read_file(filename).map_err(|e| "Failed to read file: ${e}")?
    let data = parse_content(content).map_err(|e| "Failed to parse content: ${e}")?
    return Ok(data)
```

## Panic vs Result

- **Panic**: Used for unrecoverable errors or programming bugs
- **Result**: Used for recoverable errors that should be handled gracefully

```Altru
# Panic for unrecoverable errors
fn unreachable():
    panic("This should never happen")

# Result for recoverable errors
fn file_operation(filename: string) -> Result[(), string]:
    # Handle file not found, permission denied, etc.
```

## AI-assisted Error Handling

The AI system can suggest appropriate error handling patterns:

```Altru
[ai_suggest_error_handling]
fn risky_operation(input: Input) -> Output:
    # AI may suggest converting this to Result type
    # or adding appropriate error checks
```

## Best Practices

1. **Use Result for recoverable errors**: Always return `Result` for operations that can fail in expected ways
2. **Be specific with error types**: Use custom error enums rather than generic strings when possible
3. **Provide context**: Chain errors to maintain context about what went wrong
4. **Don't ignore Results**: Always handle or explicitly ignore `Result` values
5. **Use contracts for validation**: Use `req` contracts with `?` for input validation

## Integration with Other Features

### With Generics
```Altru
fn try_operation[T, E](input: T) -> Result[T, E] where E: Error:
    # Generic error handling
```

### With Concurrency
```Altru
async fn async_operation() -> Result[Data, Error]:
    let result = await fetch_data()
    match result:
        Ok(data) => Ok(process_data(data))
        Err(e) => Err(Error::Network(e))
```

### With Memory Safety
Error handling integrates with ownership system to ensure memory safety even in error paths:

```Altru
fn process_with_cleanup() -> Result[Output, Error]:
    let resource = acquire_resource()
    let result = do_work(resource)
    release_resource(resource)  # Guaranteed to run even if error occurs
    return result
```

This comprehensive error handling system ensures that Altru programs can gracefully handle failures while maintaining safety and performance guarantees.