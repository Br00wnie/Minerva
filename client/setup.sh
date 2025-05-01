echo "🚀 Starting project setup..."

if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "⚠️ Node.js/npm not found! Installing..."
    sudo apt update && sudo apt install -y nodejs npm
    echo "✅ Node.js/npm installed successfully!"
fi

echo "📦 Installing project dependencies..."
npm install

echo "🎉 Setup finished successfully!"
echo "👉 Now you can run the project with: ./run.sh"