# Language Specification v0.2.1

## Overview

### Design Goals
Altru is a programming language designed for the AI era, aiming to achieve human-AI co-programming, team collaboration development, and providing safe, efficient, and verifiable programming experience.

### Core Principles
- **Safety First**: Expose all potential bugs at compile time
- **Explicitness**: Clean syntax but clear semantics, no ambiguity
- **Verifiability**: All code contracts can be verified at compile time  
- **Performance Control**: Provide fine-grained performance and memory control
- **AI-friendly**: Provide structured, understandable code representation for AI systems

## Key Features Summary

### Syntax Style
- Python-style clean and readable syntax
- Minimal syntactic noise
- Intuitive and short keywords

### Type System
- **Basic Types**: `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`, `f32`, `f64`, `bool`, `char`, `string`
- **Composite Types**: Arrays `[T; N]`, vectors `vec[T]`, tuples `(T1, T2, ...)`, structs, enums, union types `T1 | T2`
- **Generics**: Full generic support with trait constraints using `where` clauses
- **Type Inference**: Local variable type inference, explicit function signatures required

### Memory Management
- **Ownership System**: Compile-time memory safety without garbage collector
- **Borrowing Rules**: Multiple immutable references or single mutable reference
- **Manual Allocation**: Explicit memory control with `alloc()` and `free()`
- **Memory Safety**: No dangling pointers, buffer overflows, or data races

### Concurrency Model
- **Goroutines**: Lightweight concurrent execution units
- **Channels**: Type-safe communication with `chan T`
- **Async/Await**: Modern asynchronous programming model
- **Dataflow Programming**: Stream-based processing pipelines
- **Event-driven**: Built-in event handling system

### AI Integration Features
- **AI Processing Annotations**: `[ai_processing(serialize="json", optimize="simd")]`
- **Contract System**: Mandatory preconditions (`req`) and postconditions (`ens`)
- **Compile-time AI Verification**: Automatic contract validation and optimization suggestions
- **Hot Function Replacement**: Runtime function replacement for A/B testing and updates

### Error Handling
- **Result Type**: `enum Result[T, E]: Ok(T), Err(E)`
- **Error Propagation**: `?` operator for automatic error propagation
- **Compile-time Validation**: Contract violations caught at compile time

### Toolchain
- **Package Management**: Cargo.toml-style dependency management
- **Build Commands**: `Altru build`, `Altru run`, `Altru test`, `Altru doc`
- **IDE Integration**: Real-time AI assistance and code analysis

## Target Applications

- Operating system development
- Compiler and toolchain development  
- Game engines
- AI computing and machine learning
- Database systems
- High-concurrency services
- Web development

## Future Extensions

- Quantum computing support
- Blockchain integration
- Edge computing optimization
- Enhanced AI-native features

This specification represents the current state of the Altru language as of version 0.2.1 (February 10, 2026).