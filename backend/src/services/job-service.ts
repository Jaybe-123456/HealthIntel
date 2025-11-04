import type { FastifyInstance } from "fastify";

export async function listJobs(app: FastifyInstance, workspaceId: string) {
  // TODO: query Postgres once schema is in place
  app.log.debug({ workspaceId }, "Listing jobs");
  return [
    {
      id: "job_tts_01",
      type: "tts",
      status: "completed",
      creditsUsed: 120,
      createdAt: new Date().toISOString()
    },
    {
      id: "job_dub_02",
      type: "dubbing",
      status: "processing",
      creditsUsed: 480,
      createdAt: new Date().toISOString()
    }
  ];
}

export async function getJob(app: FastifyInstance, workspaceId: string, jobId: string) {
  app.log.debug({ workspaceId, jobId }, "Fetching job");
  return {
    id: jobId,
    type: "tts",
    status: "completed",
    resultUrl: "https://cdn.auralforge.ai/jobs/mock/audio.mp3",
    metadata: {}
  };
}
