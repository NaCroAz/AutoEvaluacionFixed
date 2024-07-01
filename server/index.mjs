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

//! Gemini crea el examen de forma aleatoria 
const makeGeminiRequest = async (prompt, tipo) => {
    try {
        console.log('Iniciando solicitud a la API de Gemini');
        const apiKey = process.env.GEMINI_API_KEY;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", systemInstruction: `sos un profesor de ${tipo} de un escuela argentina; Al momento de generar el examen apegate a este formato:

¡Vamos a practicar! Responde las siguientes preguntas:

1. Pregunta 1

2. Pregunta 2

3. Pregunta 3

Recuerda escribir tu respuesta con el formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..."

¡Mucha suerte/;

Prohibido el uso de texto en negrita (bold text), asteriscos (asterisks, "*"), doble asteriscos (double asterisks, "**") y emojis completamente.;

Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.;

No permitir respuestas que puedan ser dañinas para la psique de una persona o que contengan contenido no apto para todo publico.;

Esto solo se aplica si no es autodidacta: Aclarar al usuario que no se pueden hacer preguntas que estén fuera de topico (programa de estudio argentino);`

        });

        let modelPrompt = prompt;
        switch (tipo) {
            case 'primario':
                modelPrompt += '; Responder con la pedagogia que se necesita para tratar con niños';
                modelPrompt += '; Apegarse al plan de estudio argentino a nivel primario para crear el examen del tema pedido por el usuario.';
                modelPrompt += '; Prohibido el uso de texto en negrita (bold text), asteriscos (asterisks, "*"), doble asteriscos (double asterisks, "**") y emojis completamente.';
                modelPrompt += '; Prohibir preguntas que no entren dentro del plan de estudio argentino.';
                modelPrompt += '; Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.';
                modelPrompt += '; No permitir respuestas que puedan ser dañinas para la psique de un menor de edad o que contengan contenido no apto para su edad.';
                modelPrompt += '; Aclarar al usuario que no se pueden hacer preguntas que estén fuera de topico (programa de estudio argentino).';

                //EXAMEN
                modelPrompt += '; Limitar las preguntas de opción múltiple a tres opciones.';
                modelPrompt += '; Las preguntas con respuestas abiertas no deben ser demasiado extensas y no pueden exceder un máximo de dos por examen.';
                modelPrompt += '; pida al usuario contestar los puntos del examen con formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..., ..."';

                //RESPUESTA
                modelPrompt += '; Si la respuesta del usuario tiene formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..., ..." calificarlo en base al examen enviado previamente';
                modelPrompt += '; Puntuar la resolucion del alumno con calificacion del 1 a 10 (con decimales) y comunicarsela al usuario con feedback';

                break;
            case 'secundario':
                modelPrompt += '; Responder con la pedagogia que se necesita para tratar con adolescentes';
                modelPrompt += '; Apegarse al plan de estudio argentino a nivel secundario para crear el examen (de 6 preguntas) del tema pedido por el usuario.';
                modelPrompt += '; Prohibido el uso de texto en negrita (bold text), asteriscos (asterisks, "*"), doble asteriscos (double asterisks, "**") y emojis completamente.';
                modelPrompt += '; Prohibir preguntas que no entren dentro del plan de estudio argentino.';
                modelPrompt += '; Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.';
                modelPrompt += '; No permitir respuestas que puedan ser dañinas para la psique de un menor de edad o que contengan contenido no apto para su edad.';
                modelPrompt += '; Aclarar al usuario que no se pueden hacer preguntas que estén fuera de topico (programa de estudio argentino).';

                //EXAMEN
                modelPrompt += '; Limitar las preguntas de opción múltiple a tres opciones.';
                modelPrompt += '; Las preguntas con respuestas abiertas no deben ser demasiado extensas y no pueden exceder un máximo de dos por examen.';
                modelPrompt += '; pida al usuario contestar los puntos del examen con formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..."';

                //RESPUESTA
                modelPrompt += '; Si la respuesta del usuario tiene formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..." calificarlo en base al examen enviado previamente';
                modelPrompt += '; Puntuar la resolucion del alumno con calificacion del 1 a 10 (con decimales) y comunicarsela al usuario con feedback';
                modelPrompt += '; cuando el usuario devuelva las respuestas hacerle una retroalimentacion y darle una calificacion del 1 al 10';
                break;
            case 'superior':
                modelPrompt += '; Responder con la pedagogia que se necesita para tratar con el adulto joven';
                modelPrompt += '; Apegarse al plan de estudio argentino a nivel terciario para crear el examen (de 6 preguntas) del tema pedido por el usuario.';
                modelPrompt += '; Prohibido el uso de texto en negrita (bold text), asteriscos (asterisks, "*"), doble asteriscos (double asterisks, "**") y emojis completamente.';
                modelPrompt += '; Prohibir preguntas que no entren dentro del plan de estudio argentino.';
                modelPrompt += '; Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.';
                modelPrompt += '; No permitir respuestas que puedan ser dañinas para la psique de la persona o que contengan contenido no apto para su edad.';
                modelPrompt += '; Aclarar al usuario que no se pueden hacer preguntas que estén fuera de topico (programa de estudio argentino).';

                //EXAMEN
                modelPrompt += '; Limitar las preguntas de opción múltiple a tres opciones.';
                modelPrompt += '; Las preguntas con respuestas abiertas no deben ser demasiado extensas y no pueden exceder un máximo de dos por examen.';
                modelPrompt += '; pida al usuario contestar los puntos del examen con formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..."';

                //RESPUESTA
                modelPrompt += '; Si la respuesta del usuario tiene formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..." calificarlo en base al examen enviado previamente';
                modelPrompt += '; Puntuar la resolucion del alumno con calificacion del 1 a 10 (con decimales) y comunicarsela al usuario con feedback';
                break;
            case 'autodidacta':
                modelPrompt += '; Responder con la pedagogia que se necesita para tratar con el adulto';
                modelPrompt += '; Apegarse al plan de un autodidacta para crear el examen (de 6 preguntas) del tema pedido por el usuario.';
                modelPrompt += '; Prohibido el uso de texto en negrita (bold text), asteriscos (asterisks, "*"), doble asteriscos (double asterisks, "**") y emojis completamente.';
                modelPrompt += '; Prohibir preguntas que no sean para ayudar en el aprendizaje.';
                modelPrompt += '; Prohibir preguntas que requieran o usen imágenes, dibujos u cualquier otro medio para su resolución.';
                modelPrompt += '; No permitir respuestas que puedan ser dañinas para la psique de la persona o que contengan contenido muy explicito.';
                modelPrompt += '; Aclarar al usuario que no se pueden hacer preguntas que estén fuera de topico.';

                //EXAMEN
                modelPrompt += '; Limitar las preguntas de opción múltiple a tres opciones.';
                modelPrompt += '; Las preguntas con respuestas abiertas no deben ser demasiado extensas y no pueden exceder un máximo de dos por examen.';
                modelPrompt += '; pida al usuario contestar los puntos del examen con formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..."';

                //RESPUESTA
                modelPrompt += '; Si la respuesta del usuario tiene formato "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3, ..." calificarlo en base al examen enviado previamente';
                modelPrompt += '; Puntuar la resolucion del alumno con calificacion del 1 a 10 (con decimales) y comunicarsela al usuario con feedback';
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

//! Gemini Evalua la respuesta
const makeEvaluationGemini = async (examen, respuestasUsuario) => {
    try {
        console.log('Iniciando evaluación de la respuesta...');
        const apiKey = process.env.GEMINI_API_KEY;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Lo único que harás es verificar si las respuestas de ${respuestasUsuario} están correctas en relación con ${examen} y devolver únicamente este modelo: APROBADO, NO APROBADO, o "No hay ninguna respuesta". También calcularás la puntuación del examen con la cantidad total de preguntas divididas en 10, con un máximo de 10 y un mínimo de 1. Dar una breve retroalimentacion con respecto a las respuestas incorrectas. Si aprueba o desaprueba decir que debe ingresar otro temario o otro examen de un tema.`,
        });

        const prompt = `Preguntas: ${examen.map(q => q.pregunta).join('\n')}\nRespuestas: ${Object.values(respuestasUsuario).join('\n')}`;
        const result = await model.generateContent(prompt);
        const response = result.response;

        return response.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error al realizar la evaluación de la respuesta:', error);
        throw error;
    }
};

// Function to evaluate the exam
const puntuarExamen = (respuestasUsuario, examen) => {
    let puntaje = 0;

    examen.forEach(pregunta => {
        if (pregunta.tipo === 'opcion_multiple') {
            const numeroRespuesta = `respuesta_${pregunta.numero}`;
            if (respuestasUsuario[numeroRespuesta] === pregunta.respuesta_correcta) {
                puntaje += 1;
            }
        } else if (pregunta.tipo === 'desarrollo') {
            puntaje += 1;
        }
    });

    return puntaje;
};

app.post('/evaluar-examen', async (req, res) => {
    try {
        const { respuestasUsuario, preguntas } = req.body;

        // Parsea las preguntas del examen desde un string a un arreglo de objetos
        const examen = preguntas.split('\n').map(pregunta => ({ pregunta }));

        // Llama a la función para evaluar el examen
        const resultadoEvaluacion = await makeEvaluationGemini(examen, respuestasUsuario);

        // Envía el resultado de la evaluación como respuesta
        res.status(200).json({ resultadoEvaluacion });
    } catch (error) {
        console.error('Error en el endpoint /evaluar-examen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint to generate a question
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
