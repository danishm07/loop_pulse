# Loop Pulse - Core AI Engine

This repository contains the Next.js backend that powers the Loop Pulse mobile application. It acts as the data aggregation layer, API gateway, and LLM orchestrator.

## 🚀 Tech Stack & Technical Specs
* **Framework:** Next.js (App Router)
* **Deployment:** Vercel (Serverless Edge Functions)
* **Language:** TypeScript
* **Core APIs:** `/api/chat`, `/api/tts`, `/api/transcribe`, `/api/score`

## 🧠 AI Integrations & APIs
* **Groq (Llama 3.3 / Mixtral):** Handles the core NLP and conversational intelligence.
* **ElevenLabs:** Powers the high-fidelity, ultra-realistic Text-to-Speech (TTS) for the "Harold" persona. 
* **Perplexity API:** Used for deep "Discovery" context, fetching hyper-specific, real-time local gems and business data that standard LLMs lack.
* **Whisper / Groq STT:** Transcribes user voice memos (`.m4a`) into text with near-instant turnaround.

## 📊 Live Data Aggregation
* **City of Chicago Data Portal (Socrata API):** Fetches real-time, official CPD dispatch and crime data.
* **CTA API:** Retrieves live train tracker ETAs and system-wide transit alerts.
* **Additional Sources:** Weather, Air Quality Index (AQI), Ticketmaster (Events), Yelp (Spots).

## 🛠 Why We Chose This Stack
* **Groq over OpenAI:** For a voice-first assistant, latency is the bottleneck. Groq's LPU architecture provides unmatched tokens-per-second generation, allowing the Next.js backend to stream the response back to the phone almost instantaneously.
* **Vercel Serverless:** Next.js deployed on Vercel allows the `/api/chat` route to spin up edge functions globally, minimizing the cold-start time and handling high concurrency without managing a dedicated Node.js server.
* **Dynamic Grounding:** The backend dynamically injects real-time API data (CPD incidents, CTA delays, Weather) directly into the LLM's system prompt payload before inference. This prevents hallucinations and guarantees that "Harold" is always aware of the exact current state of Chicago.

## ⚙️ Local Setup
1. Clone the repository and run `npm install`
2. Create a `.env.local` file with the following keys:
   ```env
   GROQ_API_KEY=your_key
   ELEVENLABS_API_KEY=your_key
   PERPLEXITY_API_KEY=your_key
