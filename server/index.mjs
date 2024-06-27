import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const makeGeminiRequest = async (prompt, tipo) => {
    try {
        console.log('Iniciando solicitud a la API de Gemini');
        const apiKey = process.env.GEMINI_API_KEY;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "sos un profesor de primaria de un escuela argentina"});

        let modelPrompt = prompt;
        switch (tipo) {
            case 'primario':
                modelPrompt += '; Responder como un profesor de nivel primario';
                modelPrompt += '; Apegarse al plan de estudio argentino para nivel primario en áreas como Matemáticas, Ciencias Naturales, Lengua, Geografía, etc.';
                modelPrompt += '; Prohibir el uso de texto en negrita (bold text), asteriscos (asterisks), doble asteriscos (double asterisks) y emojis completamente.';
                modelPrompt += '; Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.';
                modelPrompt += '; Evitar cambiar a temas que no estén relacionados con la educación de nivel primario.';
                modelPrompt += '; No permitir respuestas que puedan ser dañinas para la psique de un menor de edad o que contengan contenido no apto para su edad.';
                modelPrompt += '; Aclarar al usuario que no se pueden hacer preguntas que estén fuera del ámbito de la educación de nivel primario.';

                //EXAMEN
                modelPrompt += '; Limitar las preguntas de opción múltiple a un máximo de cuatro opciones y un mínimo de tres opciones.';
                modelPrompt += '; Las preguntas con respuestas abiertas no deben ser demasiado extensas y no pueden exceder un máximo de tres por examen.';
                break;
            case 'secundario':
                modelPrompt += '; responder como un profesor de nivel secundario (prohibido usar emojis)';
                break;
            case 'superior':
                modelPrompt += '; responder como un profesor de nivel terciario (prohibido usar emojis)';
                break;
            case 'autodidacta':
                modelPrompt += '; responder como un autodidacta (prohibido usar emojis)';
                break;
            default:
                throw new Error(`Tipo '${tipo}' no reconocido`);
        }

        const result = await model.generateContent(modelPrompt);
        const response = result.response;
        return response.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error('Error al realizar la solicitud a la API de Gemini:', error);
        throw error;
    }
};

const generarExamen = (temas) => {
    let examen = [];

    temas.forEach(tema => {
        let pregunta = {
            tema: tema,
            tipo: 'opcion_multiple',
            pregunta: 'Pregunta relacionada al tema...',
            opciones: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
            respuesta_correcta: 'Opción correcta'
        };
        examen.push(pregunta);

        let preguntaDesarrollo = {
            tema: tema,
            tipo: 'desarrollo',
            pregunta: 'Pregunta de desarrollo relacionada al tema...'
        };
        examen.push(preguntaDesarrollo);
    });
    return examen;
}

const puntuarExamen = (respuestasUsuario, examen) => {
    let puntaje = 0;

    examen.forEach(pregunta => {
        if (pregunta.tipo === 'opcion_multiple') {
            if (respuestasUsuario[pregunta.tema] === pregunta.respuesta_correcta) {
                puntaje += 1;
            }
        }
    });

    return puntaje;
};

app.post('/generate-question', async (req, res) => {
    try {
        const { prompt, tipo } = req.body; // Obtiene prompt y tipo del cuerpo del mensaje
        const questionData = await makeGeminiRequest(prompt, tipo);
        console.log('Datos de la pregunta recibidos:', questionData);

        res.status(200).json({ question: questionData });
    } catch (error) {
        console.error('Error al generar la pregunta:', error);
        res.status(500).json({ error: 'Error al generar la pregunta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
