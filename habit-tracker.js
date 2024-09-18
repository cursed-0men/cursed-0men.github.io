document.addEventListener('DOMContentLoaded', function() {
      const calendarEl = document.getElementById('calendar-view');
      const ganttChartEl = document.getElementById('gantt-chart-view');
      
      // Initialize FullCalendar
      const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth'
          // Add other options and event handlers here
      });
      calendar.render();
      
      // Toggle views
      document.getElementById('view-calendar').addEventListener('click', function() {
          calendarEl.style.display = 'block';
          ganttChartEl.style.display = 'none';
      });
      
      document.getElementById('view-gantt').addEventListener('click', function() {
          calendarEl.style.display = 'none';
          ganttChartEl.style.display = 'block';
      });
      
      // Add Habit functionality
      document.getElementById('add-habit').addEventListener('click', function() {
          // Show modal or form for adding new habit
          alert('Add habit functionality goes here');
      });
  });
  