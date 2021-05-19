const canvas = d3.select("#canvas");

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
).then((data) => {
  data = data.sort(function (a, b) {
    return d3.ascending(parseInt(a.value), parseInt(b.value));
  });

  console.log(data);

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 80, bottom: 50, right: 100 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleLinear()
    .range([0, iwidth])
    .domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, iheight])
    .padding(0.1);

  const bars = g.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", 0)
    .attr("y", (d) => y(d.name))
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.value));

  // Value label to the right of each bar
  bars
    .append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
      return y(d.name) + y.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
      return x(d.value) + 3;
    })
    .text(function (d) {
      return d.value;
    });

  g.selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("font-size", "12px")
    .attr("x", function (d) {
      return x(d.value) + 5;
    })
    .attr("y", function (d) {
      return y(d.name) + 15;
    })
    .attr("dy", ".75em")
    .text(function (d) {
      return d.value;
    });

  g.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", iwidth - 240)
    .attr("y", iheight + 40)
    .text("Refugees");

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
});
