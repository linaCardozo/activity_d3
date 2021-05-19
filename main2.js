const canvas = d3.select("#canvas");

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json"
).then((data) => {
  /*data = data.sort(function (a, b) {
    return d3.ascending(
      parseInt(a.purchasingpower),
      parseInt(b.purchasingpower)
    );
  });*/

  console.log(data);

  const width = 700;
  const height = 500;
  const margin = { top: 60, left: 60, bottom: 50, right: 100 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 35000]).range([0, iwidth]);
  const y = d3.scaleLinear().domain([0, 90]).range([iheight, 0]);

  const dots = g.selectAll("dots").data(data);

  dots
    .enter()
    .append("circle")
    .attr("class", "circle")
    .style("fill", "steelblue")
    .attr("r", function (data, index) {
      radius = data.population / 2500000;
      return radius;
    })
    .attr("cx", (d) => x(d.purchasingpower))
    .attr("cy", (d) => y(d.lifeexpectancy));

  g.selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    .style("font-size", "10px")
    .attr("class", "label")
    .attr("x", function (d) {
      return x(d.purchasingpower) + 15;
    })
    .attr("y", function (d) {
      return y(d.lifeexpectancy) - 8;
    })
    .attr("dy", ".75em")
    .text(function (d) {
      return d.country;
    });

  g.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", width / 2 - 30)
    .attr("y", iheight + 35)
    .text("Purchasing power");

  g.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", -120)
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .text("Life expectancy (years)");

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
});
