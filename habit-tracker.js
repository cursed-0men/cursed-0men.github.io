document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const ganttChartEl = document.getElementById('gantt');
    
    // Initialize FullCalendar
    try {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [
                {
                    title: 'Sample Event',
                    start: '2024-09-20'
                }
            ],
            editable: true,
            eventClick: function(info) {
                alert('Event: ' + info.event.title);
            }
        });
        calendar.render();
    } catch (error) {
        console.error('Error initializing FullCalendar:', error);
    }

    // Initialize Gantt Chart
    try {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";

        // Calculate the first and last date of the current month
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        gantt.config.start_date = startDate.toISOString().split('T')[0];
        gantt.config.end_date = endDate.toISOString().split('T')[0];
        
        gantt.init(ganttChartEl);

        // Sample data for Gantt chart with tasks for the current month
        gantt.parse({
            data: [
                { id: 1, text: "Task 1", start_date: startDate.toISOString().split('T')[0], duration: 5 },
                { id: 2, text: "Task 2", start_date: new Date(startDate.getFullYear(), startDate.getMonth(), 6).toISOString().split('T')[0], duration: 3 }
            ]
        });

        // Automatically scroll to the current date
        const currentDate = new Date().toISOString().split('T')[0];
        gantt.scrollTo(currentDate);
    } catch (error) {
        console.error('Error initializing Gantt chart:', error);
    }

    // Toggle views
    document.getElementById('view-calendar').addEventListener('click', function() {
        calendarEl.parentElement.style.display = 'block';
        ganttChartEl.parentElement.style.display = 'none';
    });
    
    document.getElementById('view-gantt').addEventListener('click', function() {
        calendarEl.parentElement.style.display = 'none';
        ganttChartEl.parentElement.style.display = 'block';
    });
    
    // Add Habit functionality
    document.getElementById('add-habit').addEventListener('click', function() {
        // Implement habit adding functionality here
        alert('Add habit functionality goes here');
    });
});
