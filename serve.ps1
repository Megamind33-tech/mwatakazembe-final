$ports = @(8080, 8081, 8082, 3000, 5000, 8000, 8085, 9000, 9090)
$started = $false
$listener = $null

foreach ($port in $ports) {
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://127.0.0.1:$port/")
        $listener.Start()
        Write-Host "PowerShell HTTP Server started at http://127.0.0.1:$port/"
        Write-Host "Press Ctrl+C to stop."
        $started = $true
        break
    } catch {
        $err = $_
        Write-Host "Port $port is busy or unavailable: $err"
        if ($listener) {
            try { $listener.Close() } catch {}
        }
    }
}

if (-not $started) {
    Write-Host "Failed to start listener on any of the specified ports."
    exit 1
}

$rootDir = Get-Location

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Parse local path
        $urlPath = [Uri]::UnescapeDataString($request.Url.AbsolutePath)
        
        # Security: prevent directory traversal by resolving relative paths and checking if it starts with the root dir path
        $fullPath = [System.IO.Path]::GetFullPath((Join-Path $rootDir $urlPath))
        
        if ($fullPath -like "$rootDir*") {
            $localPath = $fullPath
        } else {
            $localPath = $rootDir
        }

        if (Test-Path $localPath -PathType Container) {
            $localPath = Join-Path $localPath "index.html"
        }

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                Default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "200: $urlPath -> $contentType"
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain; charset=utf-8"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "404: $urlPath"
        }
        $response.OutputStream.Close()
    } catch {
        # Catch normal network drop / cancel errors to avoid crashing the server
        $err = $_
        Write-Host "Warning: $err"
    }
}
