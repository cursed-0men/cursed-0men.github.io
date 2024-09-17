document.addEventListener('DOMContentLoaded', () => {
      const calendarContainer = document.getElementById('calendar-container');
      const ganttContainer = document.getElementById('gantt-container');
  
      // Simple Calendar Implementation
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      
      let calendarHTML = '<table><thead><tr>';
      for (let i = 0; i < 7; i++) {
          calendarHTML += `<th>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</th>`;
      }
      calendarHTML += '</tr></thead><tbody><tr>';
      
      // Fill in the days of the calendar
      for (let i = 0; i < firstDay.getDay(); i++) {
          calendarHTML += '<td></td>';
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
          if ((day + firstDay.getDay() - 1) % 7 === 0 && day !== 1) {
              calendarHTML += '</tr><tr>';
          }
          calendarHTML += `<td>${day}</td>`;
      }
      
      calendarHTML += '</tr></tbody></table>';
      calendarContainer.innerHTML = calendarHTML;
  
      // Simple Gantt Chart Implementation
      const tasks = [
          { name: 'Task 1', start: 1, end: 5 },
          { name: 'Task 2', start: 6, end: 10 },
          { name: 'Task 3', start: 11, end: 15 },
      ];
  
      let ganttHTML = '<div class="gantt-chart-container">';
      tasks.forEach(task => {
          ganttHTML += `<div class="gantt-task" style="left: ${task.start * 20}px; width: ${task.end - task.start + 1 * 20}px;">
                          ${task.name}
                        </div>`;
      });
      ganttHTML += '</div>';
      ganttContainer.innerHTML = ganttHTML;
  });
  