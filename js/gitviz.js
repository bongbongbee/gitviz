function loadChart(){
  visualizeHourlyAdditionsDeletions();
}


function visualizeHourlyAdditionsDeletions(){
  var margin = { top: 0, right: 0, bottom: 100, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 430 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 24),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
      days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      times = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"];


  var svgContainer = d3.select(".chart").append("svg")
                                       .attr("width",width)
                                       .attr("height",height)
                                       .append("g")
                                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dayLabels = svgContainer.selectAll(".dayLabel")
      .data(days)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 1 && i <= 5) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

  // //Add circles to the circleGroup
  // var rectangles = rectGroup.selectAll("rect")
  //                           .data(rectangleData)
  //                           .enter()
  //                           .append("rect");
  //
  // var rectangleAttributes = rectangles
  //                           .attr("x", function (d) { return d.rx; })
  //                           .attr("y", function (d) { return d.ry; })
  //                           .attr("height", function (d) { return d.height; })
  //                           .attr("width", function (d) { return d.width; })
  //                           .style("fill", function(d) { return d.color; });




}

loadChart();
