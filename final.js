// Pie Chart showing Roger Federer's career win-loss record
// Data source: ATP Tour career statistics
new Chart(document.getElementById('winLossChart'), {
    type: 'pie',
    data: {
        labels: ['Wins', 'Losses'],
        datasets: [{
            data: [1251, 275], // Federer's career wins/losses
            backgroundColor: ['#4CAF50', '#f44336']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Career Win/Loss Record'
            }
        }
    }
});

// Line Chart tracking Federer's serve speed evolution
// Data shows average first serve speed at major tournaments
// Speed measured in miles per hour (mph)
new Chart(document.getElementById('serveSpeedChart'), {
    type: 'line',
    data: {
        labels: ['2018 AO', '2018 W', '2019 AO', '2019 W', '2021 W'],
        datasets: [{
            label: 'Average Serve Speed (mph)',
            data: [119, 121, 118, 120, 117],
            borderColor: '#2196F3'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Serve Speed Evolution'
            }
        }
    }
});

// Bar Chart displaying Federer's Grand Slam achievements
// Shows progression through tournament stages
// Data represents total appearances at each stage
new Chart(document.getElementById('grandSlamChart'), {
    type: 'bar',
    data: {
        labels: ['Quarter-Finals', 'Semi-Finals', 'Finals', 'Titles'],
        datasets: [{
            label: 'Number of Appearances',
            data: [58, 46, 31, 20],
            backgroundColor: '#9C27B0'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Grand Slam Performance'
            }
        }
    }
});

// Radar Chart comparing key statistics between Federer and Nadal
// Data shows percentage-based comparison of playing styles
// Categories represent key performance indicators
new Chart(document.getElementById('h2hChart'), {
    type: 'radar',
    data: {
        labels: ['Aces', 'Win %', 'Break Points', 'Net Points', 'First Serve %'],
        datasets: [{
            label: 'Federer',
            data: [90, 82, 75, 85, 80],
            borderColor: '#FF9800',
            fill: true
        }, {
            label: 'Nadal',
            data: [75, 83, 85, 70, 85],
            borderColor: '#795548',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Federer vs Nadal Comparison'
            }
        }
    }
});
