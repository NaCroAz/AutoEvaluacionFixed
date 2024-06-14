import express from 'express';
import { google } from 'googleapis';
import OpenAIApi from 'openai';
import cors from 'cors';


const app = express();
const port = 3003;
app.use(cors())

// Configuración de OAuth2Client de Google
const oauth2Client = new google.auth.OAuth2(
  'client',
  'secret',
  'URL'
);

oauth2Client.setCredentials({
  refresh_token: 'refresh',
});

const forms = google.forms({ version: 'v1', auth: oauth2Client });

// Configuración del cliente OpenAI
const openai = new OpenAIApi({
  apiKey: 'openaiapi'
});

// Ruta para crear formulario
app.post('/crear-formulario', async (req, res) => {
  try {
    const form = {
      info: { title: "Autoevaluación de Estudiantes" },
      items: [
        {
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
        // Añadir más preguntas según sea necesario
      ],
    };

    const createdForm = await forms.forms.create({ requestBody: form });
    res.status(200).json(createdForm.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para generar pregunta
app.get('/generar-pregunta', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Genera una pregunta de opción múltiple sobre matemáticas para estudiantes de secundaria",
      max_tokens: 150,
    });

    const question = response.data.choices[0].text.trim();
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
