document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const ganttChartEl = document.getElementById('gantt');

    // Initialize FullCalendar
    let calendar;
    try {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [],
            editable: true,
            eventClick: function(info) {
                alert('Event: ' + info.event.title);
            }
        });
    } catch (error) {
        console.error('Error initializing FullCalendar:', error);
    }

    // Initialize Gantt Chart
    try {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.init(ganttChartEl);
        gantt.parse({ data: [] });
    } catch (error) {
        console.error('Error initializing Gantt chart:', error);
    }

    // Function to create Google Calendar events for 21 days
    async function createCalendarEvents(title, start) {
        const duration = 21; // Fixed duration of 21 days
        const events = [];

        for (let i = 0; i < duration; i++) {
            const eventStart = new Date(start);
            eventStart.setDate(start.getDate() + i);
            const eventEnd = new Date(eventStart);
            eventEnd.setDate(eventEnd.getDate() + 1); // 1-day events

            events.push({
                title: title,
                start: eventStart.toISOString(),
                end: eventEnd.toISOString(),
            });
        }

        const response = await fetch('/create-multiple-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events }),
        });

        if (!response.ok) {
            console.error('Error creating events:', await response.text());
            return;
        }

        const result = await response.json();
        console.log(result);
    }

    // Add Habit functionality
    async function addHabit() {
        const title = prompt("Enter habit name:");
        const start = prompt("Enter start date (YYYY-MM-DD):");

        if (title && start) {
            // Add task to Gantt chart
            gantt.addTask({
                text: title,
                start_date: start,
                duration: 21
            });

            // Create Google Calendar events
            await createCalendarEvents(title, new Date(start));
        } else {
            alert("Invalid input. Please try again.");
        }
    }

    // Button to add a new habit
    document.getElementById('add-habit').addEventListener('click', addHabit);

    // Toggle views
    document.getElementById('view-calendar').addEventListener('click', function() {
        document.getElementById('calendar-view').style.display = 'block';
        document.getElementById('gantt-chart-view').style.display = 'none';

        calendar.changeView('dayGridMonth');
        calendar.render();
    });

    document.getElementById('view-gantt').addEventListener('click', function() {
        document.getElementById('calendar-view').style.display = 'none';
        document.getElementById('gantt-chart-view').style.display = 'block';
    });
});
