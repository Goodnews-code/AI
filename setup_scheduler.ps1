# 🛠 Windows Task Scheduler Automator for AI Tutor Bot
# Registers a daily task at 9:00 AM to trigger node telegram_notifier.js

$TaskName = "TypeScript_React_Course_Tutor"
$ScriptPath = Join-Path $PSScriptRoot "telegram_notifier.js"
$WorkDir = $PSScriptRoot

Write-Host "Creating action for script at: $ScriptPath" -ForegroundColor Cyan

# 1. Define the action to run node telegram_notifier.js
$Action = New-ScheduledTaskAction -Execute "node" -Argument "telegram_notifier.js" -WorkingDirectory $WorkDir

# 2. Define daily trigger at 9:00 AM
$Trigger = New-ScheduledTaskTrigger -Daily -At "09:00:00"

# 3. Configure robust settings:
# - StartWhenAvailable: Run the task as soon as possible if a scheduled start is missed (e.g. computer was asleep or off).
# - AllowStartIfOnBatteries: Ensure it runs even if the laptop is unplugged.
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Write-Host "Registering task '$TaskName' in Windows Task Scheduler..." -ForegroundColor Cyan

# 4. Register the task (overwrites if it already exists)
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Force

Write-Host "✅ Success! Daily task scheduled at 9:00 AM every morning." -ForegroundColor Green
Write-Host "The bot will automatically wake up, send your daily course materials, and listen for your replies." -ForegroundColor Green
