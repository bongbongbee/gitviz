function loadChart(){
  visualizeHourlyAdditionsDeletions();
}


function visualizeHourlyAdditionsDeletions(){
  var rectangleData = [
     { "rx": 0, "ry": 0, "height": 30, "width": 30, "color" : "blue" },
     { "rx": 0, "ry": 30, "height": 30, "width": 30, "color" : "red" }];


  var svgContainer = d3.select(".chart").append("svg")
                                       .attr("width",200)
                                       .attr("height",200);
  var rectGroup = svgContainer.append("g");

  //Add circles to the circleGroup
  var rectangles = rectGroup.selectAll("rect")
                            .data(rectangleData)
                            .enter()
                            .append("rect");

  var rectangleAttributes = rectangles
                            .attr("x", function (d) { return d.rx; })
                            .attr("y", function (d) { return d.ry; })
                            .attr("height", function (d) { return d.height; })
                            .attr("width", function (d) { return d.width; })
                            .style("fill", function(d) { return d.color; });

}

loadChart();
