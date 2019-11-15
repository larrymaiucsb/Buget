var CHART = document.getElementById('myChart');
Chart.defaults.scale.ticks.beginAtZero = true;

var myChart = new Chart(CHART, {
    type: 'pie',
    data: {
        labels: ['Food', 'Clothes', 'Entertainment', 'Supplies', 'Other'],
        datasets: [{
            label: 'Types of purchases',
            backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9','#ff9e9e'],
            data: [0,0,0,0,0]
            
        }]
    },
    options: {
        cutoutPercentage: 50,
        animation: {
            animateScale: true
        }
    }
});
function updateData(type, value){
    var index;
    switch(type){
        case "food":
            index = 0;
            break;
        case "clothes":
            index = 1;
            break;
        case "entertainment":
            index = 2;
            break;
        case "supplies":
            index = 3;
            break;
        case "other":
        default:
            index = 4;
            break;
    }
    myChart.data.datasets[0].data[index] += value;
    myChart.update();
}