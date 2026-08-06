import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import * as fs from "fs";
import 'dotenv/config';
import { Readable } from "stream";

const haleyVoice = 'evlmNgTfQhTg1om8fCgp';
const zachVoice = 'XZgCP7SDPjTJVTavedju';

function saveAudio(audio) {
  const fileStream = fs.createWriteStream("output.mp3");
  audio.pipe(fileStream);
}

async function main() {
    const elevenlabs = new ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_TOKEN,
    });

    try {
        const audioData = await elevenlabs.textToDialogue.convert({
        inputs: [
            {
                text: "Who's that?",
                voiceId: zachVoice,
            },
            {
                text: "It's Johnny Depp. He's my favorite actor. He's so good-looking! His new movie's great.",
                voiceId: haleyVoice,
            },
            {
                text: "Hmm... what else is on?",
                voiceId: zachVoice,
            },
            {
                text: "There's a concert. Oh, it's Adele! I love her new album. Her voice is amazing.",
                voiceId: haleyVoice,
            },
            {
                text: "Adele?",
                voiceId: zachVoice,
            },
            {
                text: "Yeah. She's a famous singer.",
                voiceId: haleyVoice,
            },
            {
                text: "Oh. Um, how about some sports?",
                voiceId: zachVoice,
            },
            {
                text: "Look. They're my favorite tennis players. Their matches are always exciting. You're a tennis fan, right?",
                voiceId: haleyVoice,
            },
            {
                text: "Um, not really. Where's the remote?",
                voiceId: zachVoice,
            },
            {
                text: "Here you go.",
                voiceId: haleyVoice,
            },
            {
                text: "Great — a football game. And it's our favorite team.",
                voiceId: zachVoice,
            },
            {
                text: "You mean [emphasized] your favorite team. You know I'm not a football fan.",
                voiceId: haleyVoice,
            }
        ],
        modelId: "eleven_v3", // Modelo por defecto (soporta text-to-speech)
        // Parámetros opcionales adicionales:
        languageCode: "en", // Código de idioma ISO 639-1 (opcional)
        // settings: {
        //   stability: 0.5
        // }
        });

        const fileStream = fs.createWriteStream("dialogue_generated.mp3");

        Readable.from(audioData).pipe(fileStream);

        fileStream.on("finish", () => {
            console.log("Audio generado con éxito");
        });
    } catch (error) {
        console.error("Error al generar el diálogo:", error);
    }
}

main();