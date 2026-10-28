"""Remove vocals with Demucs; no legacy Spleeter/TensorFlow 2.12 pins."""

from pathlib import Path
import subprocess
import sys


def removeSpeech(audioFile):
    source = Path(audioFile).resolve(strict=True)
    output = source.parent / "separated"
    subprocess.run(
        [
            sys.executable,
            "-m",
            "demucs",
            "--two-stems=vocals",
            "-n",
            "htdemucs",
            "--out",
            str(output),
            str(source),
        ],
        check=True,
        timeout=1800,
    )
    result = output / "htdemucs" / source.stem / "no_vocals.wav"
    if not result.is_file():
        raise RuntimeError("Demucs did not produce accompaniment audio")
    return str(result)
