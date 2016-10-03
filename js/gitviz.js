var margin = { top: 30, right: 0, bottom: 100, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
    days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
    defaultUrl = 'https://api.github.com/repos/',
    defaultUserRepo = 'tungnk1993/scrapy',
    defaultStats = '/stats/punch_card';

var dayIndex = 0;
var hourIndex = 1;
var commitsIndex = 2;

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Commits:</strong> <span style='color:white'>" + d[commitsIndex] + "</span>";
  });

var svgContainer;

function initChart(){
  svgContainer = d3.select(".chart").append("svg")
                                       .attr("width",width + margin.left + margin.right)
                                       .attr("height",height + margin.top + margin.bottom)
                                       .append("g")
                                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svgContainer.call(tip);

  var dayLabels = svgContainer.selectAll(".dayLabel")
      .data(days)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 1 && i <= 5  ) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

  var timeLabels = svgContainer.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function(d, i) { return "timeLabel mono axis axis-worktime"; });
}


function getHourlyCommitsFromGithub(userRepo){
  if(userRepo.length <= 0){
    userRepo = defaultUserRepo;
  }

  var url = defaultUrl + userRepo + defaultStats;

  console.log('Getting data from: '+ userRepo);
  d3.json(url, function(json){
    createHeatMap(json);
  });
}

function createHeatMap(data){
      var colorScale = d3.scaleQuantile()
          .domain([0, buckets - 1, d3.max(data,
            function (d) {
              return d[commitsIndex];
            })])
          .range(colors);


      var cards = svgContainer.selectAll(".hour")
          .data(data, function(d) {
            return d[dayIndex]+':'+d[hourIndex];
          });


      // EXIT old elements not present in new data.
      cards.exit().remove();


      cards.enter()
          .append("rect")
          .attr("x", function(d) { return (d[hourIndex]) * gridSize; })
          .attr("y", function(d) { return (d[dayIndex]) * gridSize; })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "hour bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", colors[0])
          .merge(cards)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .transition().duration(1000)
              .style("fill", function(d) {
                return colorScale(d[commitsIndex]);
              });

      var legend = svgContainer.selectAll(".legend")
          .data([0].concat(colorScale.quantiles()), function(d) { return d; });

      legend.exit().remove();

      legend.enter().append("g")
          .attr("class", "legend");


      svgContainer.selectAll(".legend").append("rect")
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", function(d, i) { return colors[i]; });

      svgContainer.selectAll(".legend").append("text")
        .attr("class", "mono")
        .text(function(d) { return "≥ " + Math.round(d); })
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height + gridSize);


}

function visualizeClickHandler(){
  var userRepo = document.getElementById("inputUserRepo").value;
  getHourlyCommitsFromGithub(userRepo);
  console.log(userRepo);
}

initChart();
getHourlyCommitsFromGithub(defaultUserRepo);
