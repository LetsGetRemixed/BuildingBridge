#!/bin/bash
# Script to set all Firebase App Hosting secrets
# Run this script from the project root directory
# Make sure you're logged in: firebase login

echo "Setting Firebase App Hosting secrets..."

# MongoDB
firebase apphosting:secrets:set MONGODB_URI --data "mongodb+srv://isaiahandcolby_db_user:W3tIVbgW2aJSz7U4@buildingbridge.jawjzcx.mongodb.net/?appName=buildingbridge"

# JWT Secret
firebase apphosting:secrets:set JWT_SECRET --data "hfgfgdrdrb5y45645y55g4jvn30f030c3f0ejc"

# Firebase Public Config
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_API_KEY --data "AIzaSyBczXDDuZa_35LxUWiZTWgTMbwYrvUGSVY"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN --data "buildingbridgefoundation-3c04d.firebaseapp.com"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_PROJECT_ID --data "buildingbridgefoundation-3c04d"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET --data "buildingbridgefoundation-3c04d.firebasestorage.app"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --data "259717250297"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_APP_ID --data "1:259717250297:web:e9411b0b17a666a1f7b628"
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID --data "G-RRS0RF928H"

# Firebase Service Account
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_TYPE --data "service_account"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_PROJECT_ID --data "buildingbridgefoundation-3c04d"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID --data "beb118579d36f1417003962daecc645921fcab74"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY --data "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCY2YMh6v+WgQvd\nm8BUqi5rISoXlBop/HJmFMlG/xsvch5d0eA5jlo4gTSFW657CbSVnpMnexaFRZeG\nX9xCDV/JstkMc5gXq0d/ptssiSMNJlYqgKRGLBTLqTBubFpF6yq//Ua73S+5Zf9C\nEsYJrXblrlQB/7VGqDh9QVP1mvC5mzieR6xj1/RYQS3arFsPPCZio3MzNMdouiah\ndtHUodWYE3MGN8ubplGG1HqMF9g5bthznY1tn4sPpuFdjB5blg6OYxFQJVLyyUyW\nl//kgiJGZf/TSwz7m76ohiHXp7L3Us4TEildYgJ+qf6KZbsd9bTCyx0T0U5I6SSJ\n9WCdc1s/AgMBAAECggEADgQH/8C2Ph1IMsJ48OqIBh/M5cuZWJdDADRQvpde7UtY\nGH9Jwc1ZXYwPflkJV1PtALlBQiIJzx+yBMrefhoO2gZx26/v1t/IVx68Q0mx8p88\n0HnqVlrtbz1s6Ps7jeTCD0fQyCJAoY4GSY9CJJoI6IfDQUmq3DdJssaeRcu23jYG\nqWZ6swemtPYGJFF3qV33ROtZIFP1dbaXj5vi5P1/0MbTr+qwxIhIywqJ5tpIl7MC\nbPE5JeI15i5LizfpbbbSYaEbbi2UJX1qrpk+jte0fHtFMCbpgKJ+NUo7hDHZfcAk\nDzujC/PYdv/Hmhn6EJkZ0WdATVaIljZNzSbEOaB1fQKBgQDVf5Wzr2skjogJjm04\nKHZhw+cQrv4CDmoTgrIqXY4JasXCdJWVyNshW9ExjcamVC1yPGPg0kJ70bGj0JsW\nHpvUAFUljVvp2EjbFDnJLQZ9zpyvh5M6OR4m9SxQmt1dMUoA81Mtq+Cz9JANxHKh\nSVXjp0TsMyHXmTCG1ISOWMGYlQKBgQC3Rx2oeAEhzti5h5Uqk4yt5fTu7/GZTEC6\nL4305PzjMKmpuKjj9aM8zl3f8slDXKgfOecXgUx/aQ9jBBfrQ+6H+ybGaRf+Bwf8\nncikJoGy5q65ef9ygTqRxGoTwl2thhDnOK3z779FWDqA2U6+/Ar1GoqczIsAfAKn\nJXlIVixrgwKBgA/XksUtjBa/WMrUvbgAEKC6h6fORFzksuxVs2C/Zm2+dYQzYHIn\n4FK+XGx/57Cp6GFkp8ij8Xj8m2DbdtaSWN/HUoohziMxAF75RjxuUd/999Ryi/Mz\nD9C2Op6Ujz5+DM67P33RFjBkQlgzLopXRb9Jxyx7stQrstUeaeOiJGNtAoGBAJ5E\nqVXcG44oY3sDnEqiFC/vjq3vQoERGiwt+LZsL/24/ip0LlR8wLQ3uVU1AZxMHVqp\n0+e2XmsAPKtS05z0kr2WootgIbnaNIlvb95g6kulbWj58x/cfMl4Bep+RAse5OXn\nSkCG3nNxl0PBZIEEgina+6wf7kFC1b+lWrCeycklAoGAJuoZiGHUST3mWYhvhwEX\n5U5vuDSIcex00nQRkTIOUAz0jHGantsx8Zxdbd0q4bqZ3tKzo6s0+VS8GLDeBT0s\neIWbr1ri1SUcw+BxFA/WmfRsOxxXBMxEY09N10XhFvPmVy8ecnhAqtGfWgjzjwgK\n5IJz0bZjWbfDg5niWoBXpFQ=\n-----END PRIVATE KEY-----"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL --data "firebase-adminsdk-fbsvc@buildingbridgefoundation-3c04d.iam.gserviceaccount.com"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_CLIENT_ID --data "112244432443725211344"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_AUTH_URI --data "https://accounts.google.com/o/oauth2/auth"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_TOKEN_URI --data "https://oauth2.googleapis.com/token"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL --data "https://www.googleapis.com/oauth2/v1/certs"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL --data "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40buildingbridgefoundation-3c04d.iam.gserviceaccount.com"
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN --data "googleapis.com"

echo "All secrets have been set!"
echo "Note: NEXT_PUBLIC_* variables are public and will be exposed in the client bundle."


