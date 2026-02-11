# Installation and Setup

## Prerequisites

- **Operating System**: Linux, macOS, Windows, or WebAssembly
- **Architecture**: x86_64, ARM64, RISC-V supported
- **Disk Space**: ~500MB for complete installation
- **Memory**: 2GB+ recommended for compilation

## Installation Methods

### Method 1: Official Package Manager

#### Linux (APT)
```bash
# Add Altru repository
curl -fsSL https://altru-lang.org/install.sh | sudo sh

# Install Altru
sudo apt update
sudo apt install altru-lang
```

#### macOS (Homebrew)
```bash
# Install via Homebrew
brew tap altru-lang/tap
brew install altru

# Or install directly
brew install altru-lang
```

#### Windows (Chocolatey)
```powershell
# Install via Chocolatey
choco install altru-lang
```

### Method 2: Direct Download

Visit the [official releases page](https://github.com/bxt-main/altru-lang/releases) and download the appropriate binary for your platform.

#### Linux/macOS
```bash
# Download and extract
wget https://github.com/bxt-main/altru-lang/releases/latest/altru-x86_64-linux.tar.gz
tar -xzf altru-x86_64-linux.tar.gz
sudo mv altru /usr/local/bin/

# Verify installation
altru --version
```

#### Windows
Download the `.zip` file, extract it, and add the directory to your PATH environment variable.

### Method 3: Build from Source

For development or custom builds:

```bash
# Clone the repository
git clone https://github.com/bxt-main/altru-lang.git
cd altru-lang

# Build the compiler
make build

# Install (optional)
sudo make install
```

## Verification

After installation, verify that everything works correctly:

```bash
# Check version
altru --version

# Create a simple test file
echo 'fn main(): println("Hello, Altru!")' > hello.altru

# Compile and run
altru run hello.altru
```

Expected output:
```
Hello, Altru!
```

## Configuration

### Environment Variables

- `ALTRU_HOME`: Override the default installation directory
- `ALTRU_PATH`: Additional paths to search for libraries
- `ALTRU_TARGET`: Default compilation target
- `ALTRU_PROFILE`: Default build profile (debug/release)

### Configuration File

Create `~/.config/altru/config.toml` for persistent settings:

```toml
[build]
default-target = "x86_64-unknown-linux-gnu"
default-profile = "release"

[toolchain]
channel = "stable"
components = ["clippy", "rustfmt", "llvm-tools"]

[http]
proxy = "http://proxy.company.com:8080"
timeout = 30
```

## IDE Integration

### VS Code
1. Install the "Altru Language Support" extension
2. Open an `.altru` file
3. The extension will automatically provide syntax highlighting, completion, and debugging

### Vim/Neovim
Install the `altru.vim` plugin:
```vim
Plug 'altru-lang/altru.vim'
```

### IntelliJ IDEA
Install the Altru plugin from the JetBrains marketplace.

## First Project Setup

Create your first Altru project:

```bash
# Initialize a new project
altru new my-first-project
cd my-first-project

# Build the project
altru build

# Run the project
altru run

# Run tests
altru test
```

Project structure:
```
my-first-project/
├── altru.toml          # Project configuration
├── src/
│   └── main.altru     # Main source file
└── tests/             # Test files
```

## Updating

Keep your Altru installation up to date:

```bash
# Using package manager
sudo apt update && sudo apt upgrade altru-lang  # Linux
brew upgrade altru                              # macOS
choco upgrade altru-lang                        # Windows

# Using altru toolchain
altru update
```

## Troubleshooting

### Common Issues

**"Command not found" after installation**
- Ensure the installation directory is in your PATH
- Restart your terminal or run `source ~/.bashrc`

**Compilation errors on first run**
- Ensure you have the required system dependencies installed
- On Ubuntu/Debian: `sudo apt install build-essential`
- On macOS: Install Xcode command line tools with `xcode-select --install`

**Permission denied errors**
- On Linux, you may need to use `sudo` for system-wide installation
- Alternatively, install to your home directory

### Getting Help

- **Documentation**: `altru help` or visit the official documentation
- **Community**: Join the Discord server or GitHub discussions
- **Issues**: Report bugs on GitHub Issues

## Next Steps

After successful installation, explore these resources:

1. **Language Tour**: Work through the interactive tutorial
2. **Standard Library**: Browse the comprehensive API documentation  
3. **Examples**: Study the example projects in the repository
4. **Community**: Join discussions and ask questions

You're now ready to start developing with Altru! 🚀