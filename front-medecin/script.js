document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const appointmentsListElement = document.getElementById('appointments-list');
  
    // Récupérer les rendez-vous via l'API
    fetch('http://localhost:5000/api/rdv')
      .then(response => response.json())
      .then(appointments => {
        renderCalendar();
        renderAppointments(appointments);
      })
      .catch(error => {
        console.error('Erreur de récupération des rendez-vous:', error);
      });
  
    // Fonction pour afficher le calendrier du mois actuel
    function renderCalendar() {
      const date = new Date();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay();
  
      // Clear the calendar
      calendarElement.innerHTML = '';
  
      // Ajouter des cases vides pour les jours précédant le début du mois
      for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        calendarElement.appendChild(emptyDay);
      }
  
      // Ajouter les jours du mois
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
      }
    }
  
    // Fonction pour afficher les rendez-vous dans la liste
    function renderAppointments(appointments) {
      appointments.forEach(appointment => {
        const listItem = document.createElement('li');
        const appointmentDate = new Date(appointment.date);
  
        listItem.innerHTML = `
          <span class="date">${appointmentDate.toLocaleDateString()} à ${appointment.time}</span><br>
          Médecin : ${appointment.doctor}<br>
          Patient : ${appointment.name}
        `;
  
        appointmentsListElement.appendChild(listItem);
  
        // Marquer les jours réservés sur le calendrier
        const calendarDays = document.querySelectorAll('.calendar div');
        calendarDays.forEach(day => {
          const dayNumber = parseInt(day.textContent, 10);
          if (dayNumber === appointmentDate.getDate()) {
            day.classList.add('reserved');
          }
        });
      });
    }
  });
  