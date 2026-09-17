import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import multer from 'multer';
import ffmpegPath from 'ffmpeg-static';
import youtubedl from 'youtube-dl-exec';

const app = express();
const PORT = process.env.PORT || 3001;
const TMP_DIR = path.join(process.cwd(), 'tmp');

await fs.mkdir(TMP_DIR, { recursive: true });

const upload = multer({
    dest: TMP_DIR,
    limits: { fileSize: 500 * 1024 * 1024 },
});

const cookieMode = process.env.YT_COOKIE_MODE || 'none';
const cookieBrowser = process.env.YT_COOKIE_BROWSER || 'chrome';
const cookieFilePath = process.env.YT_COOKIES_FILE || '';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const parseTimeToSeconds = (value) => {
    if (!value || typeof value !== 'string') return 0;
    const parts = value
        .trim()
        .split(':')
        .map((part) => Number(part));
    if (parts.some((part) => Number.isNaN(part))) return 0;

    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }

    return Number(parts[0] || 0);
};

const cleanupFiles = async (...files) => {
    for (const file of files) {
        try {
            await fs.unlink(file);
        } catch {
            // Ignore cleanup errors
        }
    }
};

app.post(
    '/api/cut-video',
    upload.fields([
        { name: 'videoFile', maxCount: 1 },
        { name: 'cookiesFile', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const {
                videoUrl,
                startTime,
                endTime,
                cookieMode: requestCookieMode,
                browserName,
            } = req.body || {};
            const effectiveCookieMode = requestCookieMode || cookieMode;
            const effectiveBrowserName = browserName || cookieBrowser;
            const uploadedCookiesFile = req.files?.cookiesFile?.[0]?.path;
            const cookieSource = uploadedCookiesFile || cookieFilePath;
            const startSeconds = parseTimeToSeconds(startTime);
            const endSeconds = parseTimeToSeconds(endTime);
            const duration = endSeconds - startSeconds;

            if (!req.files?.videoFile && !videoUrl) {
                return res
                    .status(400)
                    .json({ error: 'Please upload a video file or provide a YouTube URL.' });
            }

            if (startSeconds <= 0 && !startTime) {
                return res.status(400).json({ error: 'Start time is required.' });
            }

            if (endSeconds <= startSeconds || duration <= 0) {
                return res.status(400).json({ error: 'End time must be later than start time.' });
            }

            const stamp = Date.now();
            const outputPath = path.join(TMP_DIR, `shorts-cut-${stamp}.mp4`);
            let sourcePath = req.files?.videoFile?.[0]?.path;

            if (!sourcePath && videoUrl) {
                sourcePath = path.join(TMP_DIR, `source-${stamp}.mp4`);

                try {
                    const dlOptions = {
                        format: 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b',
                        output: sourcePath,
                        mergeOutputFormat: 'mp4',
                        noWarnings: true,
                        noProgress: true,
                        noCheckCertificates: true,
                        restrictFilenames: true,

                        // Required for current YouTube JS challenge solving
                        jsRuntimes: `node:${process.execPath}`,
                    };

                    if (effectiveCookieMode === 'browser') {
                        dlOptions.cookiesFromBrowser = effectiveBrowserName;
                    } else if (effectiveCookieMode === 'file') {
                        if (!cookieSource) {
                            return res.status(400).json({
                                error: 'Cookie file is required when cookie mode is set to file.',
                            });
                        }
                        dlOptions.cookies = cookieSource;
                    }

                    await youtubedl(videoUrl, dlOptions);
                } catch (error) {
                    console.error('YouTube download error:', error);
                    return res.status(400).json({
                        error: 'YouTube download is blocked or the browser cookies are not valid. Use a valid cookie-enabled browser session or upload the source video file instead.',
                    });
                }
            }

            if (!sourcePath) {
                return res.status(400).json({ error: 'No source video was provided.' });
            }

            try {
                await fs.access(sourcePath);
            } catch {
                return res
                    .status(400)
                    .json({ error: 'Source video could not be found for clipping.' });
            }

            await new Promise((resolve, reject) => {
                const ffmpeg = spawn(ffmpegPath, [
                    '-y',
                    '-ss',
                    String(startSeconds),
                    '-i',
                    sourcePath,
                    '-t',
                    String(duration),
                    '-c:v',
                    'libx264',
                    '-preset',
                    'veryfast',
                    '-crf',
                    '18',
                    '-pix_fmt',
                    'yuv420p',
                    '-c:a',
                    'aac',
                    '-movflags',
                    '+faststart',
                    outputPath,
                ]);

                ffmpeg.on('error', reject);
                ffmpeg.on('exit', (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`FFmpeg failed with exit code ${code}`));
                    }
                });
            });

            res.download(outputPath, 'shorts-cut.mp4', async () => {
                await cleanupFiles(sourcePath, outputPath);
            });
        } catch (error) {
            console.error('Cut video error:', error);
            res.status(500).json({ error: error.message || 'Failed to create clip.' });
        }
    },
);

app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shorts Clip API running on http://localhost:${PORT}`);
});
