# Altru Language Specification v0.2.1 - Complete

## 1. Overview

### 1.1 Design Goals
Altru is a programming language designed for the AI era, aiming to achieve human-AI co-programming, team collaboration development, and providing safe, efficient, and verifiable programming experience.

### 1.2 Core Principles
- **Safety First**: Expose all potential bugs at compile time
- **Explicitness**: Clean syntax but clear semantics, no ambiguity
- **Verifiability**: All code contracts can be verified at compile time  
- **Performance Control**: Provide fine-grained performance and memory control
- **AI-friendly**: Provide structured, understandable code representation for AI systems

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
- Case sensitive
- Follow snake_case naming convention

### 2.4 Comments
- **Single-line comments**: `# comment`
- **Documentation comments**: `## documentation` (for function/type contracts)
- **Multi-line comments**: `### multi-line comment ###`

### 2.5 Annotation System
- Annotations placed on line before function declaration, comma-separated
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
- **Array operations example**:
  ```altru
  ## Create and operate on arrays
  let numbers = [1, 2, 3, 4, 5]
  let empty_array: [i32; 0] = []
  let repeated: [i32; 5] = [0; 5]  # [0, 0, 0, 0, 0]
  
  # Access elements
  let first = numbers[0]
  let last = numbers[numbers.len() - 1]
  
  # Array slices
  let slice = numbers[1..3]  # [2, 3]
  ```

#### Tuples
- **Tuple types**: `(T1, T2, ..., Tn)`
- **Tuple literals**: `(1, "hello", true)`
- **Tuple operations example**:
  ```altru
  ## Use tuples to return multiple values
  let point = (3.0, 4.0)
  let (x, y) = point  # Destructuring assignment
  
  # Access tuple elements
  let x_coord = point.0
  let y_coord = point.1
  
  # Function returning tuple
  fn get_bounds() -> (i32, i32):
      ## Return minimum and maximum values
      req true
      ens result.0 <= result.1
      return (0, 100)
  
  let (min, max) = get_bounds()
  ```

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
  ```altru
  fn sort[T](items: [T]) -> [T] where T: Comparable[T]:
      ## Sort comparable items
      req items.len() >= 0
      ens result.len() == items.len()
      # Implement sorting
  ```

### 3.5 Trait System
- Traits define interface contracts
- No inheritance, composition only
- Support default implementations
- Support associated types

### 3.6 Type Inference
- Local variable type inference
- Function parameters and return values must be explicitly annotated

## 4. Syntax

### 4.1 Variable Declarations
```altru
# Immutable variables (default)
let x = 42
let y: i32 = 42

# Mutable variables (const keyword for constants)
const MAX_VALUE = 100

# Interactive variables (externally modifiable)
let @config_value = "default"
```

### 4.2 Function Definitions
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
    # other conditions
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

#### Logical Operators
- `and` - logical AND
- `or` - logical OR  
- `not` - logical NOT

#### Comparison Operators
- `==`, `!=`, `<`, `<=`, `>`, `>=`

#### Arithmetic Operators
- `+`, `-`, `*`, `/`, `%`

#### Assignment Operators
- `=`, `+=`, `-=`, `*=`, `/=`, `%=`

#### Channel Operators
- `<-` - channel send/receive

#### Long Statement Line Breaking
```altru
let complex_calculation = very_long_function_name(
    param1,
    param2,
    param3
) + another_long_expression

# Or using backslash
let result = first_part + \
             second_part + \
             third_part
```

### 4.5 Structs and Traits
```altru
## 2D point structure
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

# Package management declaration (Cargo.toml style)
[package]
name = "my_project"
version = "0.1.0"
authors = ["Author <author@example.com>"]

[dependencies]
altru_std = "0.2.0"

mod math:
    pub fn add(a: i32, b: i32) -> i32:
        ## Add two integers
        req true
        ens result == a + b
        return a + b
    
    # Default private, no priv keyword needed
    fn private_helper():
        # Private function
```

### 4.7 Macro System
```altru
# Declarative macros
macro vec![$($x:expr),*]:
    [$( $x ),*]

# Using macros
let numbers = vec![1, 2, 3, 4, 5]

# Procedural macros (for code generation)
[derive(Debug, Clone)]
struct MyStruct:
    field: i32
```

### 4.8 Super Keyword Usage
```altru
## Base trait definition
trait Animal:
    fn speak(self) -> string:
        req true
        ens result.len() > 0
        return "generic animal sound"

## Inherited trait (via composition)
trait Mammal:
    fn is_warm_blooded(self) -> bool:
        req true
        ens result == true
        return true

## Concrete implementation
struct Dog:
    name: string

impl Animal for Dog:
    fn speak(self) -> string:
        req self.name.len() > 0
        ens result.len() > 0
        return self.name + " says woof!"

impl Mammal for Dog:
    # Mammal trait's default implementation is sufficient

## Using super to call parent trait methods
impl Dog:
    fn generic_speak(self) -> string:
        ## Call Animal trait's default implementation
        return super::Animal::speak(self)
    
    fn detailed_info(self) -> string:
        ## Combine methods from multiple traits
        let sound = self.speak()
        let warm = if self.is_warm_blooded(): "warm-blooded" else: "cold-blooded"
        return self.name + " is " + warm + " and says: " + sound
```

## 5. Memory Management

### 5.1 Ownership System
- **Ownership rules**:
  - Each value has a unique owner
  - Ownership transfers on assignment (move semantics)
  - Value is automatically cleaned up when owner goes out of scope
  
- **Borrowing rules**:
  - Any number of immutable references (`&T`) allowed
  - Or exactly one mutable reference (`&mut T`) allowed
  - References must always be valid (no dangling references)

### 5.2 Lifetimes
- **Lifetime annotations**: `'a`, `'b`, `'static`
- **Lifetimes in functions**:
  ```altru
  fn longest<'a>(x: &'a str, y: &'a str) -> &'a str:
      req x.len() >= 0 and y.len() >= 0
      ens result.len() >= x.len() or result.len() >= y.len()
      if x.len() > y.len():
          return x
      else:
          return y
  ```

### 5.3 Manual Memory Allocation
```altru
# Allocate memory
let ptr = alloc(sizeof(MyStruct))
# Use memory
# ...
# Free memory
free(ptr)
```

### 5.4 Memory Safety Guarantees
- Compile-time checking of all pointer accesses
- No dangling pointers
- No buffer overflows
- No data races

## 6. String Handling

### 6.1 String Literals
- **Regular strings**: `"hello"`
- **Raw strings**: `r"raw string with \n and quotes"`
- **Multi-line strings**: 
  ```
  """
  This is a
  multi-line string
  """
  ```

### 6.2 String Operations
- String concatenation: `"hello" + "world"`
- String interpolation: `"Value: ${value}"`
- Escape sequences: `\n`, `\t`, `\"`, `\\`

## 7. Concurrency Model

### 7.1 Goroutine Model
```altru
# Launch goroutine
go process_data(data)

# Channel communication
let sender = make(chan string)
let receiver = make(chan i32)

go sender_task(sender)
go receiver_task(receiver)
```

### 7.2 Async/Await Model
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

### 7.3 Dataflow Programming
```altru
## Create dataflow pipeline
let pipeline = stream::from(vec[1, 2, 3, 4, 5])
    .map(|x| x * 2)
    .filter(|x| x > 5)
    .collect()
```

### 7.4 Event-driven
```altru
## Define event handler
event on_click(button_id: string):
    ## Handle click event
    req button_id.len() > 0
    handle_button_click(button_id)
```

### 7.5 Thread Synchronization
- No shared mutable state
- Communication via message passing
- Built-in atomic operations
- Mutex and read-write lock support

## 8. Runtime Features

### 8.1 Dynamic Function Replacement
```altru
[hot_replaceable, experimental]
fn experimental_algorithm(data: [f64]) -> f64:
    ## Experimental algorithm implementation
    req data.len() > 0
    ens result >= 0.0
    return 0.0
```

### 8.2 AB Testing Support
```altru
[ab_test(old_version = "v1.0", new_version = "v1.1"), performance_test]
fn optimized_function(input: Input) -> Output:
    ## Run both versions simultaneously for comparison
    req input.is_valid()
    ens result.is_valid()
```

## 9. AI Integration Features

### 9.1 AI Processing Annotations
```altru
[ai_processing(serialize = "json", optimize = "simd")]
struct Vector3:
    x: f32
    y: f32
    z: f32
```

### 9.2 Contract System
- **req**: Preconditions (requirement)
- **ens**: Postconditions (ensurance)
- **? suffix**: Compiles to runtime checks
  ```altru
  req x > 0?  # Compiles to if !(x > 0) { panic("req failed") }
  ```

### 9.3 Compile-time AI Verification
- Automatic contract validation
- Type safety checking
- Memory safety verification
- Optimization suggestion generation

## 10. Logging System

### 10.1 Log Module
```altru
use std::log

# Set log level
log::set_level(log::INFO)

# Different log levels
log::debug("Debug message")
log::info("Info message") 
log::warn("Warning message")
log::error("Error message")

# Styled logging
log::info(style="bold", "Important info")
log::error(color="red", "Critical error")

# Output to different destinations
log::to_file("app.log")
log::to_console()
log::to_network("127.0.0.1:514")
```

### 10.2 Log Levels
- `TRACE` - Most detailed information
- `DEBUG` - Debugging information
- `INFO` - General information
- `WARN` - Warning information
- `ERROR` - Error information

## 11. Error Handling

### 11.1 Result Type
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

### 11.2 Error Propagation
```altru
fn complex_calculation() -> Result[f64, string]:
    req true
    ens result.is_ok() implies result.unwrap() > 0.0
    let x = divide(10.0, 2.0)?  # ? operator propagates errors
    let y = divide(x, 0.0)?
    return Ok(y)
```

## 12. Package Management

### 12.1 Dependency Declaration
```toml
# altru.toml
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

### 12.2 Build Commands
- `altru build` - Build project
- `altru run` - Run project
- `altru test` - Run tests
- `altru doc` - Generate documentation

## Appendix A: Complete Keyword List

```
fn, let, const, if, else, while, for, in, match, trait, impl, type, struct, enum, union, mod, use, pub, async, await, event, stream, yield, return, break, continue, true, false, null, self, super, and, or, not, as, req, ens, where, macro, chan, go, select, generic, T, make
```

## Appendix B: Standard Library Overview

### B.1 Core Modules
- `std::core`: Basic types and operations
- `std::mem`: Memory operations
- `std::ptr`: Pointer operations
- `std::slice`: Slice operations
- `std::log`: Logging system

### B.2 Data Structures
- `std::vec`: Dynamic arrays
- `std::map`: Hash maps
- `std::set`: Sets
- `std::queue`: Queues
- `std::channel`: Channel implementation

### B.3 Concurrency
- `std::thread`: Thread management
- `std::sync`: Synchronization primitives
- `std::stream`: Dataflow processing
- `std::async`: Async runtime

### B.4 I/O
- `std::io`: Input/output
- `std::fs`: File system
- `std::net`: Network operations

### B.5 Macro System
- `std::macro`: Macro processing tools
- `std::proc_macro`: Procedural macro support

## Version History

- **0.0.1** (2026-02-10): Initial draft version
- **0.1.0** (2026-02-10): Optimized version with 16 improvements
- **0.2.0** (2026-02-10): Integrated concurrency model, module system, generic system, macro system improvements
- **0.2.1** (2026-02-10): 
  - Added array and tuple usage examples
  - Simplified function and trait documentation comments (keep only design purpose)
  - Changed annotation system to function declaration line above, comma-separated
  - Added operator precedence
  - Added super keyword usage examples