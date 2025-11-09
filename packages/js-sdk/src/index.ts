import fetch from "cross-fetch";

export interface AuralForgeClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class AuralForgeClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor({ apiKey, baseUrl = "https://api.auralforge.ai" }: AuralForgeClientOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async synthesizeTts(payload: {
    voiceId: string;
    text: string;
    format?: "mp3" | "wav" | "pcm";
  }) {
    const response = await fetch(`${this.baseUrl}/v1/tts/synthesize`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async transcribe(payload: { mediaUrl: string; enableDiarization?: boolean }) {
    const response = await fetch(`${this.baseUrl}/v1/stt/transcribe`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async listVoices() {
    const response = await fetch(`${this.baseUrl}/v1/voices/catalog`, {
      headers: this.headers()
    });
    return this.handleResponse(response);
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Aural Forge API error: ${response.status} ${error}`);
    }
    return response.json();
  }
}
