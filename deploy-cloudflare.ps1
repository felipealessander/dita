$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distRoot = Join-Path $projectRoot "dist"
$releaseRoot = Join-Path $projectRoot ".cloudflare-publish"
$releaseServer = Join-Path $releaseRoot "server"
$releaseClient = Join-Path $releaseRoot "client"
$wranglerConfigPath = Join-Path $releaseServer "wrangler.json"
$wrangler = Join-Path $projectRoot "node_modules\.bin\wrangler.cmd"
$npm = "npm.cmd"
$subst = "$env:SystemRoot\System32\subst.exe"

if (-not (Test-Path -LiteralPath $wrangler)) {
  throw "Wrangler nao encontrado. Execute npm install antes de publicar."
}

Push-Location $projectRoot
try {
  & $npm run build
  if ($LASTEXITCODE -ne 0) {
    throw "O build da Dita falhou com codigo $LASTEXITCODE."
  }
}
finally {
  Pop-Location
}

$distServer = Join-Path $distRoot "server"
$distClient = Join-Path $distRoot "client"

if (-not (Test-Path -LiteralPath (Join-Path $distServer "index.js"))) {
  throw "O build nao gerou dist\server\index.js."
}

$resolvedProject = [System.IO.Path]::GetFullPath($projectRoot).TrimEnd("\") + "\"
$resolvedRelease = [System.IO.Path]::GetFullPath($releaseRoot).TrimEnd("\") + "\"

if (-not $resolvedRelease.StartsWith($resolvedProject, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Diretorio temporario fora do projeto: $resolvedRelease"
}

if (Test-Path -LiteralPath $releaseRoot) {
  Remove-Item -LiteralPath $releaseRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $releaseServer -Force | Out-Null
New-Item -ItemType Directory -Path $releaseClient -Force | Out-Null
Copy-Item -Path (Join-Path $distServer "*") -Destination $releaseServer -Recurse -Force
Copy-Item -Path (Join-Path $distClient "*") -Destination $releaseClient -Recurse -Force

$wranglerConfig = @'
{
  "name": "dita-performance-2026",
  "main": "index.js",
  "compatibility_date": "2026-07-30",
  "compatibility_flags": ["nodejs_compat"],
  "no_bundle": true,
  "rules": [
    {
      "type": "ESModule",
      "globs": ["**/*.js", "**/*.mjs"]
    }
  ],
  "assets": {
    "directory": "../client"
  },
  "observability": {
    "enabled": true
  }
}
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($wranglerConfigPath, $wranglerConfig, $utf8NoBom)

$drive = $null
foreach ($letterCode in 90..68) {
  $candidate = "{0}:" -f [char]$letterCode
  if (-not (Test-Path -LiteralPath "$candidate\")) {
    $drive = $candidate
    break
  }
}

if (-not $drive) {
  throw "Nenhuma letra de unidade livre foi encontrada para preparar a publicacao."
}

$mappedByScript = $false
try {
  & $subst $drive $releaseRoot
  if ($LASTEXITCODE -ne 0) {
    throw "Nao foi possivel criar a unidade temporaria $drive."
  }
  $mappedByScript = $true
  $env:WRANGLER_LOG_PATH = "$drive\wrangler.log"

  Push-Location "$drive\server"
  try {
    & $wrangler deploy `
      --config ".\wrangler.json" `
      --keep-vars

    if ($LASTEXITCODE -ne 0) {
      throw "A publicacao da Dita falhou com codigo $LASTEXITCODE."
    }
  }
  finally {
    Pop-Location
  }
}
finally {
  if ($mappedByScript) {
    & $subst $drive /D | Out-Null
  }
}

Write-Host ""
Write-Host "Dita publicada em:"
Write-Host "https://dita-performance-2026.felipe-56f.workers.dev/"
