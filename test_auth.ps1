# Test Authentication & Server-Side Redaction
$body = @{ username = 'technician.test'; password = 'Tech@GOAG2026' } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri 'http://localhost:8085/api/auth/login' -Method Post -ContentType 'application/json' -Body $body

Write-Host "=== 1. TECHNICIAN LOGIN RESPONSE ==="
Write-Host "Success: $($loginRes.success)"
Write-Host "Token: $($loginRes.token)"
Write-Host "User: $($loginRes.user.name) [$($loginRes.user.role)]"
Write-Host "Can View Financials: $($loginRes.canViewFinancials)"
Write-Host "Authorized Modules: $($loginRes.authorizedModules -join ', ')"

$headers = @{ Authorization = "Bearer $($loginRes.token)" }

Write-Host "`n=== 2. TECHNICIAN WORK ORDERS (TEST REDACTION) ==="
$woRes = Invoke-RestMethod -Uri 'http://localhost:8085/api/work-orders' -Headers $headers
$wo = $woRes.workOrders[0]
Write-Host "WO ID: $($wo.id)"
Write-Host "Unit: $($wo.unitSerial)"
Write-Host "Technician: $($wo.assignedTechnicianName)"
Write-Host "Financials Field Value: $($wo.financials)"

Write-Host "`n=== 3. TECHNICIAN ATTEMPTS ACCOUNTS ACCESS (EXPECT 403) ==="
try {
    $acctRes = Invoke-RestMethod -Uri 'http://localhost:8085/api/accounts/invoices' -Headers $headers
    Write-Host "FAILED! Technician was allowed access to accounts!"
} catch {
    Write-Host "PASS! Server returned: $($_.Exception.Message)"
}
