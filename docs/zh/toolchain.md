# 工具链使用指南

## 核心命令 `altru`

Altru工具链的核心是一个名为 `altru` 的命令行工具，它集成了所有开发功能。

### 基本命令结构
```
altru [command] [options]
```

### 主要子命令

#### `altru build` - 构建项目
```bash
# 基本构建
altru build

# 发布版本构建
altru build --release

# 指定目标平台
altru build --target x86_64-unknown-linux-gnu

# 增量构建（默认）
altru build --incremental
```

#### `altru run` - 运行项目
```bash
# 编译并运行
altru run

# 运行特定文件
altru run src/main.altru

# 开发模式（热重载）
altru run --watch
```

#### `altru test` - 测试
```bash
# 运行所有测试
altru test

# 运行特定测试
altru test --filter "test_name"

# 代码覆盖率分析
altru test --coverage

# 并行测试
altru test --parallel
```

#### `altru check` - 静态检查
```bash
# 类型检查和契约验证
altru check

# AI安全分析
altru check --ai-security

# 性能分析
altru check --performance
```

#### `altru fmt` - 代码格式化
```bash
# 格式化当前项目
altru fmt

# 检查格式化差异（不修改）
altru fmt --check

# 使用自定义配置
altru fmt --config .altrufmt
```

#### `altru doc` - 文档生成
```bash
# 生成API文档
altru doc

# 生成HTML文档
altru doc --format html

# 启动文档服务器
altru doc --serve
```

#### `altru package` - 包管理
```bash
# 添加依赖
altru package add http@1.0

# 更新依赖
altru package update

# 发布包
altru package publish

# 列出依赖
altru package list
```

## 项目配置文件

### `altru.toml` - 项目配置
```toml
[package]
name = "my-project"
version = "0.1.0"
authors = ["Author <author@example.com>"]
edition = "2026"

[dependencies]
http = "1.0"
json = "0.5"

[dev-dependencies]
test-framework = "0.2"

[features]
default = ["std"]
std = []
no-std = []

[build]
target = "x86_64-unknown-linux-gnu"
profile = "release"
```

### `.altrufmt` - 代码格式化配置
```toml
max_width = 100
hard_tabs = false
tab_spaces = 4
newline_style = "unix"
```

## IDE集成

### VS Code插件
- 语法高亮
- 智能补全
- 实时错误检查
- 调试支持
- 代码导航

### Vim/Neovim支持
- 通过LSP协议集成
- 代码补全
- 错误跳转
- 重构支持

### 其他编辑器
- IntelliJ IDEA插件
- Emacs LSP支持
- Sublime Text插件

## 调试和分析工具

### 调试器
```bash
# 启动调试器
altru debug

# 连接到远程调试
altru debug --remote localhost:5000

# 附加到运行进程
altru debug --attach 12345
```

### 性能分析
```bash
# CPU性能分析
altru profile --cpu

# 内存使用分析
altru profile --memory

# 生成火焰图
altru profile --flamegraph
```

### 日志分析
```bash
# 实时日志监控
altru log --follow

# 结构化日志查询
altru log --query "level:error"

# 日志可视化
altru log --visualize
```

## AI辅助功能

### AI代码分析
```bash
# AI安全分析
altru ai-analyze --security

# AI性能优化建议
altru ai-optimize --report optimization.html

# 交互式编程助手
altru ai-assist
```

### AI代码生成
```bash
# 基于注释生成代码
altru ai-generate --from-comments

# 自动生成测试用例
altru ai-test --generate

# 代码重构建议
altru ai-refactor --suggest
```

## 构建系统高级功能

### 条件编译
```toml
# altru.toml
[features]
web = ["dep:http", "dep:web-framework"]
cli = ["dep:clap"]
```

```altru
// 源代码中使用特性
#[cfg(feature = "web")]
fn web_handler():
    // Web特定代码

#[cfg(feature = "cli")]  
fn cli_command():
    // CLI特定代码
```

### 交叉编译
```bash
# 为不同平台编译
altru build --target aarch64-apple-darwin
altru build --target x86_64-pc-windows-msvc
altru build --target wasm32-unknown-unknown
```

### 分布式构建
```bash
# 启用分布式构建
altru build --distributed

# 指定构建服务器
altru build --build-server build-server.example.com
```

## 包管理高级功能

### 私有包仓库
```toml
# altru.toml
[registries]
private = { url = "https://registry.company.com" }

[dependencies]
internal-lib = { version = "1.0", registry = "private" }
```

### Git依赖
```toml
[dependencies]
experimental-lib = { git = "https://github.com/user/repo.git", branch = "develop" }
```

### 本地路径依赖
```toml
[dependencies]
local-lib = { path = "../shared-library" }
```

## 最佳实践

### 项目结构
```
project/
├── altru.toml
├── src/
│   ├── main.altru
│   └── lib.altru
├── tests/
├── examples/
├── benches/          # 基准测试
└── scripts/          # 构建脚本
```

### 开发工作流
1. **初始化**: `altru new project-name`
2. **开发**: `altru run --watch`
3. **测试**: `altru test --coverage`
4. **格式化**: `altru fmt`
5. **检查**: `altru check`
6. **构建**: `altru build --release`
7. **发布**: `altru package publish`

### 团队协作
- 使用 `.altrufmt` 确保代码风格一致
- 在CI/CD中运行 `altru check` 和 `altru test`
- 使用语义化版本控制依赖
- 定期更新依赖以获取安全修复

这个工具链设计旨在提供现代化、一体化的开发体验，同时保持足够的灵活性和可扩展性。