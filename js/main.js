(function barChart(){

  //variables
  var margin = {top: 20, right: 20, bottom: 100, left: 80 },//define margins
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      x = d3.scaleBand().rangeRound([0,width]).paddingInner(0.4),//x axis range
      y = d3.scaleLinear().range([height, 0]);//y axis range

  //draw axis
  var xAxis = d3.axisBottom().scale(x);
  var yAxis = d3.axisLeft().scale(y).ticks(5);

  //svg
  var svg = d3.select('#barGraph')
            .append('svg')
            .attr('width', width + margin.left + margin.right)//width canvas
            .attr('height', height + margin.top + margin.bottom)//height canvas
            .attr('style', 'border: 1px solid #d6d6d6;')
            .append('g')//everything in a group
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            //translate de group with the values of margins


  d3.json('js/data/dataJson.json', function(response){

    x.domain( response.map(function(d){
      return d.name;
    }));

    y.domain([0, d3.max(response, function(d){
      return d.rank;
    })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '1em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .text('Member Rank')
        .style('text-anchor', 'end')
        .attr('fill', 'grey')
        .attr('transform', 'rotate(-90)')
        .attr('dy', '-4em');

    svg.selectAll('bars')
        .data(response)
        .enter()
        .append('rect')
        .attr('fill', 'orange')
        .attr('x', function(d) {
          return x(d.name);
        })
        .attr('y', function(d){
          return y(d.rank)
        })
        .attr('width', x.bandwidth())
        .transition()
        .delay(300)
        .duration(1000)
        .attr('height', function(d){
          return height - y(d.rank);
        });
  });

})();
