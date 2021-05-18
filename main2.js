const canvas = d3.select("#canvas");

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json"
).then((data) => {
  /*data = data.sort(function (a, b) {
    return d3.ascending(parseInt(a.population), parseInt(b.population));
  });*/

  console.log(data);

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.lifeexpectancy))
    .range([iheight, 0])
    .padding(0.1);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.purchasingpower))
    .range([0, iwidth])
    .padding(0.1);

  const dots = g.selectAll("dots").data(data);

  dots
    .enter()
    .append("circle")
    .attr("class", "circle")
    .style("fill", "steelblue")
    .attr("r", 3.5)
    .attr("cx", (d) => x(d.purchasingpower))
    .attr("cy", (d) => y(d.lifeexpectancy))
    .attr("height", y.bandwidth())
    .attr("width", x.bandwidth());

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
});
