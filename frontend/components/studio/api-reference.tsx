const snippets = [
  {
    title: "Text-to-Speech",
    language: "TypeScript",
    code: `import fetch from "node-fetch";

const response = await fetch("https://api.auralforge.ai/v1/tts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ${process.env.AURALFORGE_API_KEY}"
  },
  body: JSON.stringify({
    voiceId: "voice_studio_helena",
    text: "Launching localized audio at enterprise scale.",
    format: "mp3",
    voiceSettings: { tempo: 1.05, energy: 0.3 }
  })
});

const buffer = await response.arrayBuffer();`
  },
  {
    title: "Webhook handlers",
    language: "TypeScript",
    code: `import Fastify from "fastify";

const app = Fastify();

app.post("/webhooks/auralforge", async (request, reply) => {
  const event = request.body;

  if (event.type === "job.completed") {
    await completeJob(event.data.jobId);
  }

  reply.status(200).send({ received: true });
});

await app.listen({ port: 3000 });`
  },
  {
    title: "Python SDK",
    language: "Python",
    code: `from auralforge import Client

client = Client(api_key="${AURALFORGE_API_KEY}")

job = client.tts.synthesize(
    voice_id="voice_creative_camille",
    text="Bonjour tout le monde.",
    language="fr-FR",
    output_format="wav"
)

job.wait_until_complete()
audio_url = job.result.media_url`
  }
];

export function ApiReference() {
  return (
    <section className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-20 lg:px-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">REST API</h2>
            <p className="text-sm text-slate-300">
              Authenticate with API keys scoped per project. Endpoints cover TTS, STT, voice cloning, dubbing jobs, conversation sessions, music renders, and usage reporting. OpenAPI spec and Postman collection included.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Rate limiting with burst + sustained quotas</li>
              <li>• Webhooks for job lifecycle, billing events</li>
              <li>• Regional endpoints (NA/EU) with data residency</li>
              <li>• Terraform + CLI for automation</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">SDKs</h3>
            <p className="text-sm text-slate-300">
              Official JavaScript/TypeScript and Python SDKs expose typed clients with retries, idempotency keys, and streaming support.
            </p>
            <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-4 text-xs text-brand-100">
              npm install @auralforge/sdk • pip install auralforge
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <div
              key={snippet.title}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <p className="text-xs uppercase tracking-widest text-brand-200">{snippet.title}</p>
              <pre className="mt-4 flex-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
                <code>{snippet.code}</code>
              </pre>
              <span className="mt-4 text-[10px] uppercase tracking-widest text-slate-500">
                {snippet.language}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
