# Grant Firebase App Hosting permission to all secrets
$projectId = "buildingbridgefoundation-3c04d"
$projectNumber = "259717250297"
$serviceAccount = "service-$projectNumber@gcp-sa-apphosting.iam.gserviceaccount.com"

Write-Host "Granting Firebase App Hosting access to all secrets..." -ForegroundColor Green
Write-Host "Service Account: $serviceAccount" -ForegroundColor Cyan

$secrets = @(
    "MONGODB_URI",
    "JWT_SECRET",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
    "FIREBASE_SERVICE_ACCOUNT_TYPE",
    "FIREBASE_SERVICE_ACCOUNT_PROJECT_ID",
    "FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID",
    "FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY",
    "FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL",
    "FIREBASE_SERVICE_ACCOUNT_CLIENT_ID",
    "FIREBASE_SERVICE_ACCOUNT_AUTH_URI",
    "FIREBASE_SERVICE_ACCOUNT_TOKEN_URI",
    "FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL",
    "FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL",
    "FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN"
)

foreach ($secret in $secrets) {
    Write-Host "Granting access to $secret..." -ForegroundColor Yellow
    gcloud secrets add-iam-policy-binding $secret --project=$projectId --member="serviceAccount:$serviceAccount" --role="roles/secretmanager.secretAccessor"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Granted access to $secret" -ForegroundColor Green
    } else {
        Write-Host "[FAILED] Could not grant access to $secret" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "All permissions have been processed!" -ForegroundColor Green
