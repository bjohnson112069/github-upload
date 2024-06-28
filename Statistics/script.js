
function loadContent() {
    const links = document.querySelectorAll('a');
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const text = style.getPropertyValue('--text');
    const background = style.getPropertyValue('--background');
    const primary = style.getPropertyValue('--primary');
    const secondary = style.getPropertyValue('--secondary');
    const accent = style.getPropertyValue('--accent');

    var data = [
        ["10", 0],
        ["45", 225],
        ["65", 100],
        ["75", 160],
        ["110", 70],
        ["120", 80],
        ["166", 15],

        ["190", 160],
        ["215", 30],
        ["280", 100],
        ["332", 25],

        ["370", 200],
        ["390", 140],
        ["410", 160],
        ["465", 60],
        ["475", 200],
        ["485", 25],
        ["498", 80],

        ["540", 25],
        ["580", 0],
        ["640", 70],
        ["650", 140],
        ["664", 75],

        ["680", 180],
        ["700", 25] ,
        ["720", 190],
        ["740", 0],
        ["800", 80],
        ["820", 15],
        ["830", 150],

        ["835", 80],
        ["840", 150],
        ["850", 55],
        ["860", 70],
        ["910", 0],
        ["930", 120],
        ["980", 0],
        ["996", 25],
        ["1010", 0]
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // On page load...

    // create a data set
    const dataset = anychart.data.set(data);

    // get the current date/time
    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes();

    // map the data for all series
    const seriesData = dataset.mapAs({x: 0, value: 1});

    // create a line chart
    const chart = anychart.line();

    // Style the chart background
    chart.background().fill(`${background}`);
    chart.background().cornerType("round");
    chart.background().corners(12);

    // create the series and name them
    var series = chart.line(seriesData);
    series.name("Click-through rate");

    // style the line stroke for the series
    series.stroke(`3 ${accent}`);

    // style the y-axis labels
    const yAxis = chart.yAxis();
    const yLabels = yAxis.labels();
    chart.yAxis().labels().format("{%value}%");
    yLabels.fontFamily("Inter");
    yLabels.fontSize(12);
    yLabels.fontColor(`${primary}`);
    yAxis.drawLastLabel(false);
    chart.yScale().ticks().interval(75);

    // style the x-axis labels
    const xAxis = chart.xAxis();
    const xLabels = xAxis.labels();
    xLabels.fontFamily("Inter");
    xLabels.fontSize(12);
    xLabels.fontColor(`${primary}`);
    xAxis.drawFirstLabel(false);
    xAxis.drawLastLabel(false);
    chart.xScale(anychart.scales.linear());
    chart.xScale().ticks().interval(166);

    // style the tooltip
    const tooltip = series.tooltip();
    tooltip.background().fill(`${secondary}`);
    tooltip.padding("24px");
    tooltip.title(`${datetime}`);
    tooltip.titleFormat(`${datetime}`);
    tooltip.format("{%value}%")
    tooltip.fontSize(24);
    xLabels.fontFamily("Inter");
    tooltip.fontColor(`${text}`);

    // specify where to display the chart
    chart.container("graph");

    // draw the resulting chart
    chart.draw();

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

anychart.onDocumentReady(loadContent);
// window.addEventListener('DOMContentLoaded', loadContent);