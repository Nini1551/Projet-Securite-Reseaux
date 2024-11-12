const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.error("Erreur de connexion à MongoDB:", err));

// Modèle de données pour un rendez-vous
const rdvSchema = new mongoose.Schema({
    doctor: String,
    name: String,
    email: String,
    date: String,
    time: String,
});

const Rdv = mongoose.model("Rdv", rdvSchema);

// Endpoint pour enregistrer un rendez-vous (POST)
app.post("/api/rdv", async (req, res) => {
    try {
        const newRdv = new Rdv(req.body);
        await newRdv.save();
        res.status(201).json({ message: "Rendez-vous enregistré avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'enregistrement du rendez-vous" });
    }
});

// Endpoint pour récupérer tous les rendez-vous (GET)
app.get("/api/rdv", async (req, res) => {
    try {
        const rdvs = await Rdv.find(); // Récupérer tous les rendez-vous
        res.status(200).json(rdvs); // Renvoie la liste des rendez-vous en JSON
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
    }
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
