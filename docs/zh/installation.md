# 安装与配置

## 系统要求

- **操作系统**: Linux, Windows, macOS, 或其他Unix-like系统
- **内存**: 至少2GB RAM（推荐4GB以上）
- **磁盘空间**: 至少500MB可用空间
- **依赖**: Git, CMake (可选，用于从源码构建)

## 安装方法

### 方法1: 预编译二进制包（推荐）

#### Linux/macOS
```bash
# 下载并安装
curl -L https://github.com/bxt-main/altru-lang/releases/latest/download/altru-linux-x64.tar.gz | tar xz
sudo mv altru /usr/local/bin/

# 验证安装
altru --version
```

#### Windows
```powershell
# 使用PowerShell下载
Invoke-WebRequest -Uri "https://github.com/bxt-main/altru-lang/releases/latest/download/altru-windows-x64.zip" -OutFile "altru.zip"
Expand-Archive -Path "altru.zip" -DestinationPath "C:\Program Files\Altru"
# 添加到PATH环境变量
```

### 方法2: 从源码构建

```bash
# 克隆仓库
git clone https://github.com/bxt-main/altru-lang.git
cd altru-lang

# 构建（需要Rust工具链）
cargo build --release

# 安装到系统
sudo cp target/release/altru /usr/local/bin/
```

### 方法3: 包管理器（如果可用）

#### Homebrew (macOS)
```bash
brew install bxt-main/tap/altru
```

#### AUR (Arch Linux)
```bash
yay -S altru-lang
```

## 配置开发环境

### VS Code插件
1. 安装 "Altru Language Support" 插件
2. 插件会自动提供：
   - 语法高亮
   - 智能补全
   - 实时错误检查
   - 代码导航

### Vim/Neovim支持
```vim
" 使用vim-plug
Plug 'bxt-main/altru.vim'

" 启用LSP支持
call lsp#register_server({
    \ 'name': 'altru',
    \ 'cmd': {server_info->['altru', 'lsp']},
    \ 'whitelist': ['altru'],
    \ })
```

### IntelliJ IDEA
1. 安装 Altru 插件
2. 创建新项目时选择 Altru 语言
3. 插件提供完整的IDE功能

## 验证安装

创建一个简单的测试文件 `hello.altru`:

```altru
fn main():
    println("Hello, Altru!")

[main]
```

运行测试：

```bash
altru run hello.altru
```

预期输出：
```
Hello, Altru!
```

## 环境变量配置

### ALTRU_HOME
指定Altru的安装目录：
```bash
export ALTRU_HOME=/usr/local/lib/altru
```

### ALTRU_PATH
指定额外的模块搜索路径：
```bash
export ALTRU_PATH=$ALTRU_PATH:/path/to/custom/modules
```

### ALTRU_CONFIG
指定配置文件位置：
```bash
export ALTRU_CONFIG=~/.config/altru/config.toml
```

## 升级和维护

### 升级到新版本
```bash
# 如果使用预编译包
altru self-update

# 如果从源码构建
git pull origin main
cargo build --release
sudo cp target/release/altru /usr/local/bin/
```

### 清理缓存
```bash
# 清理构建缓存
altru clean

# 清理所有缓存
altru cache clean
```

## 故障排除

### 常见问题

#### 1. 命令未找到
确保 `/usr/local/bin` 在您的 PATH 中：
```bash
echo $PATH
# 如果没有，添加到 ~/.bashrc 或 ~/.zshrc
export PATH=$PATH:/usr/local/bin
```

#### 2. 权限错误
在Linux/macOS上，确保二进制文件有执行权限：
```bash
chmod +x /usr/local/bin/altru
```

#### 3. 依赖缺失
如果从源码构建失败，确保已安装Rust：
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## 下一步

安装完成后，建议：
1. 阅读 [快速开始指南](quick-start.md)
2. 浏览 [核心设计原则](design-principles.md)
3. 查看 [完整语法规范](specification-0.2.1-full.md)
4. 尝试 [示例项目](https://github.com/bxt-main/altru-examples)

如果您遇到任何问题，请在GitHub Issues中报告！