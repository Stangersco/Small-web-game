let Data_;
let myChart;
let count;
let END;

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            if ("end" in data || END === 1) {
                END = 1
                Data_ = [0,0,0,0]
            } else {
                Data_ = data["params"];
                count = data["count"];}

            updateChart();
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}


function createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chartData = {
        labels: ['Speed', 'Fire', 'Pressure', 'Error'],
        datasets: [{
            data: Data_,
            label: false,
            barPercentage: 0.9,
            backgroundColor: [
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    };

    var options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                max: 1000
            }
        }
    };


    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options
    });
}


function updateChart() {
    if (!myChart) {
        createChart();
    } else {
        myChart.data.datasets[0].data = Data_;
        myChart.update();

        var countElement = document.getElementById('countID');
        countElement.textContent = 'Count: ' + count;
    }
}

fetchData();



function loadAction(act) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "/act", true);
    xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            fetchData();
        }
    };
    xhr2.send(JSON.stringify(act));
};

document.getElementById("act1").addEventListener("click", function() {
    loadAction('act1');
});

document.getElementById("act2").addEventListener("click", function() {
    loadAction('act2');
});

document.getElementById("act3").addEventListener("click", function() {
    loadAction('act3');
});

document.getElementById("act4").addEventListener("click", function() {
    loadAction('act4');
});



document.getElementById("resetButton").addEventListener("click", function() {
    var selectDifficult = document.getElementById("selectDifficult").value;
    var data = {
        "selectDifficult": selectDifficult,
        "infinityCheckbox": "no"
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/startGame", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = "/game";
        }
    };
    xhr.send(JSON.stringify(data));
});



