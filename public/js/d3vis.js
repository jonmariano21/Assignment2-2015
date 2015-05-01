var m = {top: 60, right: 20, bottom: 100, left: 40};
var w = 960 - m.right - m.left;
var h = 500 - m.top - m.bottom;
    
var igArray = [];

var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .1);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

var svg = d3.select("body").append("svg")
    .attr("width", w + m.right + m.left)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", "translate(" + m.left + "," + m.top + ")");

d3.json("/igMediaCounts", function(error, data) {

  igArray = data;

  // Parse numbers, and sort by value.
 // igArray.forEach(function(d) { d.counts.media = +d.counts.media; });
 // igArray.sort(function(a, b) { return b.counts.media - a.counts.media; });

  // Set the scale domain.
  x.domain([0, d3.max(data.users, function(d) { return d.counts.media; })]);
  y.domain(data.users.map(function(d) { return d.username; }));

  var bar = svg.selectAll("g.bar")
      .data(data.users)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.username) + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.counts.media); })
      .attr("height", y.rangeBand());

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.counts.media); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.counts.media); });

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});