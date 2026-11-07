# NaazTV - tiny web server for the TV (no install needed, uses built-in Windows PowerShell)
# Also relays live TV streams (/proxy?u=...) for channels the TV can't play directly.
param([int]$Port = 8080)

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = (Resolve-Path (Split-Path -Parent $MyInvocation.MyCommand.Path)).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$Port/")
try { $listener.Start() }
catch {
  Write-Host "Could not start on port $Port. Run START-TV-SERVER.bat (it asks for admin) or close the other program using port $Port." -ForegroundColor Red
  Read-Host "Press Enter to close"; exit 1
}

$mime = @{
  '.html'='text/html; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8';
  '.ttf'='font/ttf'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml';
  '.json'='application/json'; '.ico'='image/x-icon'; '.mp4'='video/mp4'; '.webp'='image/webp'
}

function Get-ProxyUrl([Uri]$base, [string]$ref) {
  $abs = New-Object Uri($base, $ref.Trim())
  return "/proxy?u=" + [Uri]::EscapeDataString($abs.AbsoluteUri)
}

function Convert-Playlist([string]$text, [Uri]$base) {
  $lines = $text -split "`r?`n"
  $out = New-Object System.Collections.Generic.List[string]
  foreach ($line in $lines) {
    if ($line.Trim() -eq '') { $out.Add($line) }
    elseif ($line.StartsWith('#')) {
      $m = [regex]::Match($line, 'URI="([^"]+)"')
      if ($m.Success) { $line = $line.Replace($m.Groups[1].Value, (Get-ProxyUrl $base $m.Groups[1].Value)) }
      $out.Add($line)
    }
    else { $out.Add((Get-ProxyUrl $base $line)) }
  }
  return ($out -join "`n")
}

function Send-Proxy($ctx) {
  $res = $ctx.Response
  $res.Headers.Add('Access-Control-Allow-Origin', '*')
  $target = $ctx.Request.QueryString['u']
  if (-not $target -or -not ($target -match '^https?://')) { $res.StatusCode = 400; return }
  $req = [Net.HttpWebRequest]::Create($target)
  $req.UserAgent = 'Mozilla/5.0 (SMART-TV; Linux) NaazTV'
  $req.Timeout = 15000
  $req.AutomaticDecompression = [Net.DecompressionMethods]::GZip -bor [Net.DecompressionMethods]::Deflate
  $up = $req.GetResponse()
  try {
    $ct = [string]$up.ContentType
    $isList = ($ct -match 'mpegurl') -or ($up.ResponseUri.AbsolutePath -match '\.m3u8$')
    $s = $up.GetResponseStream()
    if ($isList) {
      $text = (New-Object IO.StreamReader($s)).ReadToEnd()
      $bytes = [Text.Encoding]::UTF8.GetBytes((Convert-Playlist $text $up.ResponseUri))
      $res.ContentType = 'application/vnd.apple.mpegurl'
      $res.Headers.Add('Cache-Control', 'no-cache')
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      if ($ct) { $res.ContentType = $ct }
      $s.CopyTo($res.OutputStream)
    }
  } finally { $up.Close() }
}

Write-Host ""
Write-Host "  NaazTV server is running. Type ONE of these into the TV browser:" -ForegroundColor Green
Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
  Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
  ForEach-Object { Write-Host ("     http://{0}:{1}" -f $_.IPAddress, $Port) -ForegroundColor Yellow }
Write-Host ""
Write-Host "  Keep this window open while using the TV. Close it to stop."
Write-Host ""

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq 'proxy') { Send-Proxy $ctx; continue }
    if ($rel -eq '') { $rel = 'index.html' }
    $full = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if ($full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $full -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
      $res.Headers.Add('Cache-Control', 'no-cache')
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host ("{0}  {1}  /{2}" -f (Get-Date -Format 'HH:mm:ss'), $ctx.Request.RemoteEndPoint.Address, $rel)
    } else {
      $res.StatusCode = 404
    }
  } catch { try { $res.StatusCode = 502 } catch {} }
  finally { try { $res.Close() } catch {} }
}
