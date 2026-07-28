# bunny-tools

Shell scripts for managing images on the [Bunny](https://bunny.net) storage zone
and CDN that backs the site, plus local image-conversion helpers that produce the
WebP variants the site expects.

## Dependencies

Install everything with Homebrew:

```bash
brew install bash imagemagick webp viu python
```

| Tool | Homebrew formula | Used by | Notes |
|---|---|---|---|
| **Bash 4+** | `bash` | all scripts | macOS ships Bash 3.2, which lacks `mapfile` (used by `upload-folder.sh`). The scripts start with `#!/usr/bin/env bash`, so a Homebrew Bash earlier in your `PATH` is picked up automatically. |
| **ImageMagick** (`magick`) | `imagemagick` | `photo-batch-dual-size.sh`, `music-single-size.sh` | Reads image dimensions / handles source formats. |
| **cwebp** | `webp` | `photo-batch-dual-size.sh`, `music-single-size.sh` | Encodes the WebP output. |
| **viu** | `viu` | `viu-file.sh` | Renders images inline in the terminal. |
| **python3** | `python` | `list-files.sh`, `purge-file.sh` | Formats the JSON listing / URL-encodes purge targets. Also provided by the Xcode Command Line Tools if you already have those. |
| **curl** | — | all Bunny API scripts | Ships with macOS; no install needed. |

## Configuration

The Bunny scripts read credentials from a `.env` file in this directory (already
present, git-ignored). Required keys:

| Var | Purpose |
|---|---|
| `BUNNY_STORAGE_ZONE` | Storage zone name. |
| `BUNNY_REGION` | Storage region (`de`/`default`, or a region code like `ny`). |
| `BUNNY_ACCESS_KEY` | Read-write storage password (upload / delete). |
| `BUNNY_READONLY_KEY` | Read-only storage password (list / view). |
| `BUNNY_CDN_URL` | Pull-zone base URL, e.g. `https://your-zone.b-cdn.net` (purge). |
| `BUNNY_API_KEY` | Account API key (purge). |

The local image-conversion scripts (`photo-batch-dual-size.sh`,
`music-single-size.sh`) need no `.env`.

## Scripts

**Bunny storage / CDN**

- `list-files.sh [path]` — list files in the bucket (formatted table).
- `upload-file.sh <local-file> [remote-path] [-n]` — upload one file.
- `upload-folder.sh <local-folder> [remote-path] [-r] [-n]` — upload a folder (`-r` recurses).
- `delete-file.sh <remote-path> [-y] [-n]` — delete one file from the bucket.
- `purge-file.sh <remote-path> [-n]` — drop one file from the CDN edge cache.
- `viu-file.sh <remote-path> [viu args...]` — preview a bucket image in the terminal.

`-n` is a dry run on the scripts that support it.

**Local image conversion**

- `photo-batch-dual-size.sh <input-folder> [output-folder]` — convert a folder into
  `<name>_thumb.webp` (1000px) and `<name>_full.webp` (2560px) variants.
- `music-single-size.sh <image> [output-folder]` — convert one image to a single
  `<name>.webp` (2560px longest edge).
