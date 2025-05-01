Write-Host "🚀 Starting project setup..." 

if (-not (Get-Command node -ErrorAction SilentlyContinue) -or -not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Node.js/npm not found!"
    if (Get-Command choco -ErrorAction SilentlyContinue) {
        Write-Host "Trying to install Node.js via Chocolatey..."
        choco install nodejs -y
    }
    else {
        Write-Host "❌ Chocolatey not found. Please install Node.js manually from https://nodejs.org/"
        exit 1
    }   
    Write-Host "✅ Node.js/npm installed successfully!"
}

Write-Host "📦 Installing project dependencies..."
npm install

Write-Host "🎉 Setup finished successfully!"
Write-Host "👉 Now you can run the project with: ./run.ps1"