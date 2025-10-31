# Appwrite Sites Quick Setup Script
# Run this before deploying to verify everything is ready

Write-Host "🚀 Appwrite Sites Pre-Deployment Check" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules found" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .appwriterc exists
if (Test-Path ".appwriterc") {
    Write-Host "✅ .appwriterc configuration found" -ForegroundColor Green
} else {
    Write-Host "❌ .appwriterc not found!" -ForegroundColor Red
    exit 1
}

# Check if appwrite.json exists
if (Test-Path "appwrite.json") {
    Write-Host "✅ appwrite.json configuration found" -ForegroundColor Green
} else {
    Write-Host "❌ appwrite.json not found!" -ForegroundColor Red
    exit 1
}

# Test build
Write-Host ""
Write-Host "🔨 Testing production build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Build output:" -ForegroundColor Cyan
    $buildStats = Get-ChildItem -Path "dist" -Recurse -File | Measure-Object -Property Length -Sum
    Write-Host "   Total size: $([math]::Round($buildStats.Sum / 1MB, 2)) MB" -ForegroundColor White
    Write-Host "   Total files: $($buildStats.Count)" -ForegroundColor White
    Write-Host ""
    Write-Host "✨ Your project is ready for Appwrite Sites deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Commit and push your changes to GitHub" -ForegroundColor White
    Write-Host "2. Go to https://cloud.appwrite.io" -ForegroundColor White
    Write-Host "3. Navigate to Sites and click 'Create Site'" -ForegroundColor White
    Write-Host "4. Connect your GitHub repository" -ForegroundColor White
    Write-Host "5. Deploy! 🚀" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}
