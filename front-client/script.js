function submitRdvForm(event) {
    event.preventDefault();

    const doctor = document.getElementById("doctor").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Envoi des données vers le backend
    fetch("http://localhost:5000/api/rdv", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor, name, email, date, time }),
    })
    .then(response => response.json())
    .then(data => {
        // Affichage du message de confirmation
        document.getElementById("confirmation-message").style.display = "block";
        console.log(data.message);

        // Réinitialisation du formulaire
        document.getElementById("rdv-form").reset();
    })
    .catch(error => console.error("Erreur:", error));
}
