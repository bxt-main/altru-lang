# Altru Language Specification v0.2.1

**Version**: 0.2.1  
**Status**: Draft  
**Last Updated**: 2026-02-10

## 1. Overview

### 1.1 Design Goals
Altru is a future-oriented programming language designed to achieve human-AI co-programming, team collaboration development, and provide safe, efficient, and verifiable programming experience for the AI era.

### 1.2 Core Principles
- **Safety First**: Expose all potential bugs at compile-time
- **Clarity**: Concise syntax but unambiguous semantics
- **Verifiability**: All code contracts can be verified at compile-time
- **Performance Control**: Provide fine-grained performance and memory control
- **AI-Friendly**: Provide structured, understandable code representation for AI systems

## 2. Lexical Structure

### 2.1 Character Set
- UTF-8 encoding
- Unicode identifier support

### 2.2 Keywords
```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```

### 2.3 Identifiers
- Start with letter or underscore
- Can contain letters, digits, underscores
- Case-sensitive
- Follow snake_case naming convention

### 2.4 Comments
- **Single-line comment**: `# comment`
- **Documentation comment**: `## documentation` (for function/type contracts)
- **Multi-line comment**: `### multi-line comment ###`

### 2.5 Label System
- Labels placed on the line before function declaration, comma-separated
- Example: 
  ```altru
  [hot_replaceable, ai_processing(serialize="json")]
  fn my_function():
      # Function body
  ```

## 3. Type System

### 3.1 Basic Types
- **Integer types**: `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`
- **Floating-point types**: `f32`, `f64`
- **Boolean type**: `bool`
- **Character type**: `char` (Unicode scalar value)
- **String type**: `string` (UTF-8 encoded)

### 3.2 Common Constants
- **Mathematical constants**: `PI`, `E`, `INF`, `NAN`
- **Boolean constants**: `true`, `false`
- **Null constant**: `null`

### 3.3 Composite Types

#### Arrays
- **Fixed-size arrays**: `[T; N]`
- **Dynamic arrays (vectors)**: `vec[T]`
- **Array literals**: `[1, 2, 3, 4, 5]`

#### Tuples
- **Tuple types**: `(T1, T2, ..., Tn)`
- **Tuple literals**: `(1, "hello", true)`

#### Other Composite Types
- **Slices**: `[T]` - dynamic size sequences
- **Structs**: `struct Name: field: Type`
- **Enums**: `enum Name: Variant1, Variant2(T), ...`
- **Union types**: `T1 | T2 | ... | Tn`
- **Channel types**: `chan T` - for goroutine communication

### 3.4 Generic System
- **Generic functions**: `fn identity[T](x: T) -> T:`
- **Generic structs**: `struct Pair[T, U]: first: T, second: U`
- **Generic traits**: `trait Comparable[T]: fn compare(self, other: T) -> i32`
- **Type constraints**: `where` clause for specifying trait constraints

### 3.5 Trait System
- Traits define interface contracts
- No inheritance, composition only
- Support default implementations
- Support associated types

### 3.6 Type Inference
- Local variable type inference
- Function parameters and return values must be explicitly annotated

## 4. Syntax

### 4.1 Variable Declaration
```altru
# Immutable variables (default)
let x = 42
let y: i32 = 42

# Mutable variables (using const keyword for constants)
const MAX_VALUE = 100

# Interactive variables (externally modifiable)
let @config_value = "default"
```

### 4.2 Function Definition
```altru
## Calculate GCD of two integers
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

### 4.3 Control Flow
#### Conditional Statements
```altru
# Standard if-else
if condition:
    # true branch
else if other_condition:
    # other condition
else:
    # false branch

# Single-line if-else expression
let result = if x > 0: "positive" else: "non-positive"
```

#### Loops
```altru
# while loop
while condition:
    # loop body

# Efficient counting loop
for i in 0..10:
    # i from 0 to 9

# for loop (iteration)
for item in collection:
    # process each item

# Infinite loop
loop:
    # must have break statement
    if condition:
        break
```

#### Concurrency Primitives
```altru
# goroutine launch
go my_function()

# Channel operations
let ch = make(chan i32, 10)
ch <- 42          # send
let x = <-ch      # receive

# select statement
select:
    case msg = <-ch1:
        handle_msg(msg)
    case ch2 <- data:
        send_complete()
    default:
        # non-blocking operation
```

#### Pattern Matching
```altru
match value:
    # Basic patterns
    0 => "zero"
    1 => "one"
    # Range patterns
    2..10 => "small number"
    # Variable binding
    n if n > 10 => "large number: " + n.to_string()
    # Tuple destructuring
    (x, y) => "point at (" + x + ", " + y + ")"
    # Enum variants
    Ok(value) => "success: " + value
    Err(msg) => "error: " + msg
    # Wildcard
    _ => "unknown"
```

### 4.4 Expressions and Operators

#### Operator Precedence (highest to lowest)
1. **Postfix operators**: `()`, `[]`, `.`, `?`
2. **Unary operators**: `not`, `-`, `&`, `&mut`
3. **Multiplication/division**: `*`, `/`, `%`
4. **Addition/subtraction**: `+`, `-`
5. **Shift operators**: `<<`, `>>`
6. **Comparison operators**: `<`, `<=`, `>`, `>=`
7. **Equality operators**: `==`, `!=`
8. **Logical AND**: `and`
9. **Logical OR**: `or`
10. **Assignment operators**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`

### 4.5 Structs and Traits
```altru
## 2D Point structure
struct Point:
    x: f64
    y: f64

## Distance calculation trait
[math_trait]
trait Distance:
    ## Calculate distance to another point
    fn distance_to(self, other: Self) -> f64:
        req true
        ens result >= 0.0

impl Distance for Point:
    fn distance_to(self, other: Point) -> f64:
        let dx = self.x - other.x
        let dy = self.y - other.y
        return (dx * dx + dy * dy).sqrt()
```

### 4.6 Module System
```altru
# Module imports with aliases
use std::io as io_module
use std::collections::HashMap as Map

mod math:
    pub fn add(a: i32, b: i32) -> i32:
        ## Add two integers
        req true
        ens result == a + b
        return a + b
```

### 4.7 Macro System
```altru
# Declarative macros
macro vec![$($x:expr),*]:
    [$( $x ),*]

# Procedural macros (for code generation)
[derive(Debug, Clone)]
struct MyStruct:
    field: i32
```

## 5. Memory Management

### 5.1 Ownership System
- **Ownership rules**:
  - Each value has a unique owner
  - Ownership transfers on assignment (move semantics)
  - Value is automatically cleaned up when owner goes out of scope
  
- **Borrowing rules**:
  - Any number of immutable references (`&T`) allowed
  - Or exactly one mutable reference (`&mut T`)
  - References must always be valid (no dangling references)

### 5.2 Lifetimes
- **Lifetime annotations**: `'a`, `'b`, `'static`
- **Function lifetimes**:
  ```altru
  fn longest<'a>(x: &'a str, y: &'a str) -> &'a str:
      req x.len() >= 0 and y.len() >= 0
      ens result.len() >= x.len() or result.len() >= y.len()
      if x.len() > y.len():
          return x
      else:
          return y
  ```

## 6. Concurrency Model

### 6.1 Goroutine Model
```altru
# Launch goroutine
go process_data(data)

# Channel communication
let sender = make(chan string)
let receiver = make(chan i32)
```

### 6.2 Async/Await Model
```altru
async fn fetch_data(url: string) -> Result[string, string]:
    ## Asynchronous HTTP request
    req url.len() > 0
    ens result.is_ok() or result.is_err()
    # Asynchronous HTTP request
    return Ok("data")

async fn main():
    let data = await fetch_data("https://example.com")
    match data:
        Ok(content) => print(content)
        Err(error) => print("Error: " + error)
```

## 7. Runtime Features

### 7.1 Dynamic Function Replacement
```altru
[hot_replaceable, experimental]
fn experimental_algorithm(data: [f64]) -> f64:
    ## Experimental algorithm implementation
    req data.len() > 0
    ens result >= 0.0
    return 0.0
```

## 8. AI Integration Features

### 8.1 AI Processing Annotations
```altru
[ai_processing(serialize = "json", optimize = "simd")]
struct Vector3:
    x: f32
    y: f32
    z: f32
```

### 8.2 Contract System
- **req**: Preconditions (requirement)
- **ens**: Postconditions (ensurance)
- **? suffix**: Compiles to runtime checks
  ```altru
  req x > 0?  # Compiles to if !(x > 0) { panic("req failed") }
  ```

## 9. Error Handling

### 9.1 Result Type
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

## Appendix A: Complete Keyword List

```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```

## Version History

- **0.0.1** (2026-02-10): Initial draft version
- **0.1.0** (2026-02-10): Optimized version with 16 improvements
- **0.2.0** (2026-02-10): Integrated concurrency model, module system, generic system, macro system improvements
- **0.2.1** (2026-02-10): 
  - Added array and tuple usage examples
  - Simplified function and trait documentation comments (keep only design purpose)
  - Changed label system to function declaration line, comma-separated
  - Added operator precedence
  - Added super keyword usage examples