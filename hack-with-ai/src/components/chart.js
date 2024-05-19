import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ReviewSentiment = (data) => {
  // const svgRef = useRef(null);
  var r_data = [ // Your data here (replace with actual data)
      { 'review': 'Some review', 'date': '09-05-2024', 'Sentiment': 0.7, 'Emotion': 'Joy' },
      { 'review': 'some review', 'date': '10-05-2024', 'Sentiment': 0.9, 'Emotion': 'Joy' }
    ];

  useEffect(() => {
    plotReviews(r_data);
  }, []);

  const plotReviews = (data) => {
    console.log(data);
    
    const margin = {top: 20, right: 30, bottom: 30, left: 40},
              width = 800 - margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;

        // Append the svg object to the body of the page
        const svg = d3.select("#chart")
                      .append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the date / time
        // const parseDate = d3.timeParse("%d-%m-%Y");

        // Format the data
        for(var d =0; d<2; d++){
            r_data[d].date = d3.timeParse(d.date);
            // console.log(r_data[d].date);
            // console.log(r_data[d].Sentiment);
            // console.log(r_data[d].Emotion);
        };

        // Set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Define the line
        const line = d3.line()
                       .x([d => x(d.date)])
                       .y(d => y(d["Sentiment Score"]));

        // Scale the range of the data
        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d["Sentiment Score"])]);

        // Add the valueline path
        svg.append("path")
           .data([1, 2])
           .attr("class", "line")
           .attr("d", line);

        // Add the X Axis
        svg.append("g")
           .attr("transform", `translate(0,${height})`)
           .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
           .call(d3.axisLeft(y));
  }

  return (
    <div id="chart">
      {/* <svg ref={svgRef}></svg> */}
      {/* Hello ! */}
    </div>
  );
};

export default ReviewSentiment;