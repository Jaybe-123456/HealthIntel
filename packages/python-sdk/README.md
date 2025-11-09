# Aural Forge Python SDK

```bash
pip install auralforge
```

## Usage

```python
from auralforge import Client

client = Client(api_key="your_api_key")

job = client.tts.synthesize(
    voice_id="voice_studio_helena",
    text="Welcome to Aural Forge",
    format="mp3"
)

print(job["jobId"])
```

