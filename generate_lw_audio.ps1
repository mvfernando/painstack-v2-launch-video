# generate_lw_audio.ps1
# Generates ElevenLabs TTS voiceovers for all 5 Launch Week videos.
# Using Daniel (onwK4e9ZLuTAKqWW03F9) - Steady Broadcaster - calm, factual.
# Run from repo root: .\generate_lw_audio.ps1

$apiKey = "sk_828137a0c3a05a70d60dd5faf5d1a28598e70c9c9d7dadb1"
$voiceId = "onwK4e9ZLuTAKqWW03F9"
$outputDir = "public\audio"
$model = "eleven_multilingual_v2"
$voiceSettings = @{ stability = 0.4; similarity_boost = 0.75; style = 0.1 }

$scripts = @(
  @{
    file = "lw_v1_evidence.mp3"
    text = "Most AI validation tools give your idea a score. Eighty-seven out of a hundred. Based on what? Evidence Hub shows the work. Every Painstack score now links the real Reddit threads, Hacker News discussions and web sources behind it. You can click each source. Read the original post. See the date. So you can show evidence to investors or message the people describing the problem. The score isn't the product. The evidence is. Live now."
  },
  @{
    file = "lw_v2_agents.mp3"
    text = "A validation score doesn't tell you what to do next. So we built four agents that work on your specific blueprint. CEO: a 90-day roadmap and business-model options. CTO: MVP scope broken into 12 prompts. CMO: your ICP, channels and messaging. Market: live competitive analysis from Reddit and Hacker News. One workspace. Four perspectives. Decisions in minutes, not weeks. Live now on Painstack."
  },
  @{
    file = "lw_v3_cto.mp3"
    text = "The gap between a validated idea and a working MVP is where most founders stall. CTO Workspace closes it. You get 12 PRPs: Product Requirement Prompts, engineered to paste straight into Lovable, Cursor or Claude. Plus a system design, knowledge base and security checklist. Copy. Paste. Ship. No more blank prompt box. Live now."
  },
  @{
    file = "lw_v4_dataroom.mp3"
    text = "Founders spend weeks building investor documents from scratch. Dataroom generates eight of them from your validated blueprint. Pitch deck outline. One-pager. Executive summary. Financial model brief. Market analysis. Competitor matrix. Risk register. FAQ. Grounded in your blueprint, not generic templates. Live now."
  },
  @{
    file = "lw_v5_reddit.mp3"
    text = "The best startup signals are already on Reddit. Threads where hundreds of people describe the same problem. Paste any Reddit thread URL into Painstack. You get back a full blueprint: problem analysis, market sizing, competitors, MVP scope and a roadmap. In about 30 seconds. Try it on the latest thread in your niche. Live now."
  }
)

foreach ($item in $scripts) {
  $outPath = Join-Path $outputDir $item.file
  Write-Host "Generating: $($item.file) ..." -ForegroundColor Cyan

  $body = @{
    text           = $item.text
    model_id       = $model
    voice_settings = $voiceSettings
  } | ConvertTo-Json -Depth 5

  try {
    Invoke-RestMethod `
      -Method POST `
      -Uri "https://api.elevenlabs.io/v1/text-to-speech/$voiceId" `
      -Headers @{ "xi-api-key" = $apiKey; "Content-Type" = "application/json" } `
      -Body $body `
      -OutFile $outPath

    $size = (Get-Item $outPath).Length
    Write-Host "  OK $($item.file) - $([math]::Round($size/1KB, 1)) KB" -ForegroundColor Green
  }
  catch {
    Write-Host "  FAILED: $($item.file)" -ForegroundColor Red
    Write-Host "    $_" -ForegroundColor DarkRed
  }

  Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "Done! Files saved to: $outputDir" -ForegroundColor Yellow
