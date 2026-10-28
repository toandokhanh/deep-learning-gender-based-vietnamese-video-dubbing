# Research artifacts

Trained model and pretrained checkpoint binaries are excluded from the source tree. `artifacts.json` lists their original paths, byte sizes and SHA-256 hashes. Restore only trusted artifacts into those exact paths before using the associated notebooks or media pipeline. Pickle-based model files can execute code when loaded.

The local cleanup preserved the original binaries outside this repository in `../.cleanup-backups/2026-10-28/deep-learning-gender-based-vietnamese-video-dubbing/`, with the same directory structure. This local backup is not a download source for other users. A public artifact release, its hosting location and redistribution permissions still need to be selected by the repository owner; no download URL is invented here.

Notebook outputs are cleared in the source tree. Original notebook outputs are also retained in that local backup; selected result figures remain in `images/` and `Gender-Classification/Results/`.
