import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const text = req.nextUrl.searchParams.get('text')
    if (!text) throw new Error("No text provided")

    const apiKey = process.env.ELEVENLABS_API_KEY
    const voiceId = process.env.ELEVENLABS_VOICE_ID ?? 'iP95p4xoKVk53GoZ742B'

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey ?? '',
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.65, similarity_boost: 0.55, style: 0.0, use_speaker_boost: false }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[TTS] ElevenLabs API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        voiceId,
        textLength: text.length
      })
      throw new Error(`ElevenLabs error (${response.status}): ${errorText}`)
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
