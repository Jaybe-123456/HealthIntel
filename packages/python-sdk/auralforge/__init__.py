"""Aural Forge Python SDK"""

from typing import Any, Dict, Optional

import httpx
from pydantic import BaseModel


class ClientConfig(BaseModel):
    api_key: str
    base_url: str = "https://api.auralforge.ai"


class Client:
    """Lightweight HTTP client for the Aural Forge API."""

    def __init__(self, api_key: str, base_url: Optional[str] = None):
        self.config = ClientConfig(api_key=api_key, base_url=base_url or ClientConfig.base_url)
        self._http = httpx.Client(base_url=self.config.base_url, headers=self._headers)

    def synthesize(self, *, voice_id: str, text: str, format: str = "mp3") -> Dict[str, Any]:
        response = self._http.post(
            "/v1/tts/synthesize",
            json={"voiceId": voice_id, "text": text, "format": format},
        )
        response.raise_for_status()
        return response.json()

    def transcribe(self, *, media_url: str) -> Dict[str, Any]:
        response = self._http.post("/v1/stt/transcribe", json={"mediaUrl": media_url})
        response.raise_for_status()
        return response.json()

    @property
    def _headers(self) -> Dict[str, str]:
        return {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.config.api_key}",
        }


__all__ = ["Client", "ClientConfig"]

