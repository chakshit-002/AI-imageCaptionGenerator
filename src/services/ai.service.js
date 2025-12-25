// import { GoogleGenAI } from "@google/genai";
const { GoogleGenAI } = require('@google/genai')
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});



async function captionGeneration(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile
            },
        },
        {
            text: "Caption this Image."
        },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            You are an expert in generating captions for images.
            You generate single  caption for the image.
            Your caption should  be short and concise.
            You use hashtags and emojis in the caption.
            `
        }
    });

    return  response.text;
}


module.exports = captionGeneration