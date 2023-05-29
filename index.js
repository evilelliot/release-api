const express = require("express");
const axios = require("axios");
const { incrementVersion } = require("./versionUtils");

const app = express();
const port = 3000 || process.env.port;
app.get("/get", async()=>{
    req.json({message : "I'm working fine!"});
});
// Get auto
app.get("/get-auto/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const token = req.query.token; // Obtiene el token de la consulta

    // Configuración de la solicitud a la API de GitHub
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GitHub Release API",
      },
    };

    // Realiza la solicitud a la API de GitHub para obtener los releases
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      options
    );

    // Obtiene el tag_name de la última versión
    const latestRelease = response.data[0].tag_name;
    const value = latestRelease;
    res.json(incrementVersion(value)); // Devuelve la última versión en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la última versión" });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
