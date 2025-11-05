# Grant Firebase App Hosting backend access to all secrets
$projectId = "buildingbridgefoundation-3c04d"
$backendName = "buildingbridgefoundation"

Write-Host "Granting Firebase App Hosting backend access to all secrets..." -ForegroundColor Green
Write-Host "Backend: $backendName" -ForegroundColor Cyan

# All secrets as comma-separated list
$allSecrets = "MONGODB_URI,JWT_SECRET,NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,NEXT_PUBLIC_FIREBASE_APP_ID,NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,FIREBASE_SERVICE_ACCOUNT_TYPE,FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,FIREBASE_SERVICE_ACCOUNT_AUTH_URI,FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN"

Write-Host "Granting access to all secrets..." -ForegroundColor Yellow
firebase apphosting:secrets:grantaccess $allSecrets --backend $backendName --project $projectId

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Granted access to all secrets!" -ForegroundColor Green
} else {
    Write-Host "[FAILED] Could not grant access to secrets" -ForegroundColor Red
}

