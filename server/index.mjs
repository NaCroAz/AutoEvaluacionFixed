import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

// Configuración de OAuth2Client de Google
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const forms = google.forms({ version: 'v1', auth: oauth2Client });

// Ruta para crear formulario
app.post('/crear-formulario', async (req, res) => {
  try {
    // Crear el formulario con solo el título
    const form = {
      info: { title: "Autoevaluación de Estudiantes" }
    };

    const createdForm = await forms.forms.create({ requestBody: form });
    const formId = createdForm.data.formId;

    // Añadir preguntas usando batchUpdate
    const requests = [
      {
        createItem: {
          item: {
            title: "Pregunta 1",
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: "Opción 1" },
                    { value: "Opción 2" },
                    { value: "Opción 3" },
                    { value: "Opción 4" }
                  ],
                },
              },
            },
          },
          location: {
            index: 0
          }
        }
      }
      // Añadir más preguntas según sea necesario
    ];

    await forms.forms.batchUpdate({
      formId: formId,
      requestBody: { requests }
    });

    // Recuperar el formulario actualizado
    const updatedForm = await forms.forms.get({ formId });
    res.status(200).json(updatedForm.data);
  } catch (error) {
    console.error('Error al crear el formulario:', error);
    res.status(500).json({ error: error.message });
  }
});

// Función para hacer una solicitud a la API de Gemini con manejo de errores
const makeGeminiRequest = async () => {
  try {
    const response = await axios.post('https://api.gemini.com/v1/generate-question', {
      prompt: "Genera una pregunta de opción múltiple sobre matemáticas para estudiantes de secundaria.",
      apiKey: process.env.GEMINI_API_KEY
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta de la API:', error.response.data);
    } else if (error.request) {
      console.error('Error en la solicitud a la API:', error.request);
    } else {
      console.error('Error general:', error.message);
    }
    throw error;
  }
};

// Ruta para generar pregunta
app.get('/generate-question', async (req, res) => {
  try {
    const questionData = await makeGeminiRequest();
    const question = questionData.question.trim();
    res.status(200).json({ question });
  } catch (error) {
    console.error('Error al generar la pregunta:', error);
    res.status(500).json({ error: 'Error al generar la pregunta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
