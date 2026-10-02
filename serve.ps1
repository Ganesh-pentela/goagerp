# GOAG Platform • Local HTTP Server Script
param (
    [int]$Port = 8080
)

$listener = New-Object System.Net.HttpListener
$prefixes = @("http://localhost:$Port/", "http://127.0.0.1:$Port/")
foreach ($p in $prefixes) {
    try {
        $listener.Prefixes.Add($p)
    } catch {}
}

try {
    $listener.Start()
    Write-Host "GOAG ERP Web Platform is live and serving at http://localhost:$Port/ and http://127.0.0.1:$Port/"
    Write-Host "Press Ctrl+C to terminate the local server."
    
    $mimeMap = @{
        ".html" = "text/html; charset=utf-8";
        ".htm"  = "text/html; charset=utf-8";
        ".css"  = "text/css; charset=utf-8";
        ".js"   = "application/javascript; charset=utf-8";
        ".json" = "application/json; charset=utf-8";
        ".jpg"  = "image/jpeg";
        ".jpeg" = "image/jpeg";
        ".png"  = "image/png";
        ".svg"  = "image/svg+xml";
        ".ico"  = "image/x-icon"
    }

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $rawUrl = $request.RawUrl
            if ($rawUrl -eq "/" -or [string]::IsNullOrWhiteSpace($rawUrl)) {
                $rawUrl = "/index.html"
            }

            $cleanPath = $rawUrl.Split('?')[0].TrimStart('/')
            $localFilePath = Join-Path (Get-Location) $cleanPath

            if (Test-Path $localFilePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
                $contentType = "application/octet-stream"
                if ($mimeMap.ContainsKey($ext)) {
                    $contentType = $mimeMap[$ext]
                }
                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
                $response.ContentLength64 = $bytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
                $response.StatusCode = 200
            } else {
                $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $cleanPath")
                $response.StatusCode = 404
                $response.ContentLength64 = $notFoundMsg.Length
                $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
            }
            $response.Close()
        } catch {
            Write-Host "Request error: $_"
        }
    }
} catch {
    Write-Host "Server error: $_"
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
