// $.getScript("../javascripts/chart-config.js", function(){
//    console.log("chart-config loaded");
// });



// Bar chart function
window.plotBarChart = function plc(hcsurl, chartId, legendId) {

  $.ajax({
    // url: 'https://hoopla-customer-statistics.appspot.com/query?id=ahxlfmhvb3BsYS1jdXN0b21lci1zdGF0aXN0aWNzchULEghBcGlRdWVyeRiAgICAgPKICgw',
    url: hcsurl,
    crossDomain: true,
    dataType: 'jsonp',
    context: document.body
    }).done(function(data) {

      var labels = data.rows.map(function(row) { return row[0]; })
      var data1 = data.rows.map(function(row) { return +row[1]; })
      // var data2 = data.rows.map(function(row) { return +row[2]; })

      // labels = labels.map(function(label) {
      //   return moment(label, 'YYYYMMDD').format('ddd');
      // });

      var cleanData = {
        labels : labels,
        datasets : [
          {
            label: 'Antall',
            fillColor : 'rgba(25, 174, 233,0.25)',
            strokeColor : 'rgba(25, 174, 233,1)',
            highlightFill : 'rgba(25, 174, 233,1)',
            highlightStroke : '#fff',
            data : data1
          }
        ]
      };

      var ctx = $("#"+chartId).get(0).getContext("2d");
      var myBarChart = new Chart(ctx).Bar(cleanData, {
       // Gridlines
        //  scaleGridLineColor: "rgba(255,255,255,0.1)"
      });
      generateLegend(legendId, cleanData.datasets);
  });
}


// Define line chart function

window.plotLineChart = function plc(hcsurl, chartId, legendId) {

  $.ajax({
    // url: 'https://hoopla-customer-statistics.appspot.com/query?id=ahxlfmhvb3BsYS1jdXN0b21lci1zdGF0aXN0aWNzchULEghBcGlRdWVyeRiAgICAgPKICgw',
    url: hcsurl,
    crossDomain: true,
    dataType: 'jsonp',
    context: document.body
    }).done(function(data) {

      var labels = data.rows.map(function(row) { return +row[0]; })
      var data1 = data.rows.map(function(row) { return +row[1]; })
      var data2 = data.rows.map(function(row) { return +row[2]; })
      // labels = labels.map(function(label) {
      //   return moment(label, 'YYYYMMDD').format('ddd');
      // });

      var cleanData = {
        labels : labels,
        datasets : [
          {
            label: 'Antall besøk',
            fillColor : 'rgba(255, 97, 130,0.25)',
            strokeColor : 'rgba(255, 97, 130,1)',
            pointColor : 'rgba(255, 97, 130,1)',
            pointStrokeColor : '#fff',
            data : data1
          },
          {
            label: 'Antall kjøp',
            fillColor : 'rgba(63, 211, 173,0.75)',
            strokeColor : 'rgba(63, 211, 173,1)',
            pointColor : 'rgba(63, 211, 173,1)',
            pointStrokeColor : '#fff',
            data : data2
          }
        ]
      };

      var ctx = $("#"+chartId).get(0).getContext("2d");
      var myLineChart = new Chart(ctx).Line(cleanData, {
       // Gridlines
          scaleGridLineColor: "rgba(255,255,255,0.1)"
      });
      generateLegend(legendId, cleanData.datasets);
  });
}




window.plotDonutChart = function pdc(hcsurl, chartId, legendId) {

  // Donut chart
  $.ajax({
    // url: 'https://hoopla-customer-statistics.appspot.com/query?id=ahxlfmhvb3BsYS1jdXN0b21lci1zdGF0aXN0aWNzchULEghBcGlRdWVyeRiAgICA7a2SCgw',
    url: hcsurl,
    crossDomain: true,
    dataType: 'jsonp',
    context: document.body
    }).done(function(data) {


      var labels  = data.rows.map(function(row) { return row[0]; })
      var data1 = data.rows.map(function(row) { return +row[1]; })


    var labelcolor = ["#3FD3AD", "#FF6383", "#5EC2F1", "#333045", "#AEABB9", "#BFF7E7", "#FFC6D0", "#95D8F8"];

      //var a = ["a", "b", "c"];
    var cleanData = [];
    data1.forEach(function(entry, i) {
      cleanData[i] = { value: entry, color: labelcolor[i], hightlight: labelcolor[i+1], label: labels[i] }
      console.log(entry);
      //console.log(labels[i]);
    });


      var ctx = $("#"+chartId).get(0).getContext("2d");
      var myDoughnutChart = new Chart(ctx).Doughnut(cleanData, {
        segmentStrokeColor : "#221F3A"
      });
      generateLegend(legendId, cleanData);
  });
}


 /**
   * Create a new canvas inside the specified element. Set it to be the width
   * and height of its container.
   * @param {string} id The id attribute of the element to host the canvas.
   * @return {RenderingContext} The 2D canvas context.
   */
  function makeCanvas(id) {
    var container = document.getElementById(id);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    container.innerHTML = '';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);

    return ctx;
  }

  /**
   * Create a visual legend inside the specified element based off of a
   * Chart.js dataset.
   * @param {string} id The id attribute of the element to host the legend.
   * @param {Array.<Object>} items A list of labels and colors for the legend.
   */
  function generateLegend(id, items) {
    var legend = document.getElementById(id);
    legend.innerHTML = items.map(function(item) {
      var color = item.color || item.fillColor;
      var label = item.label;
      return '<li><i style="background:' + color + '"></i>' + label + '</li>';
    }).join('');
  }



$(function() {

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(255,255,255,0.25)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#FFF",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    // Gridlines
    scaleGridLineColor: "rgba(255,255,255,1)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 10,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}

// $('#tab-content .single-tab').css('visibility','hidden');
// $('#tab-content .single-tab:first').css('visibility','visible');

// $('#nav li').click(function() {
//     $('#nav li a').removeClass("active");
//     $(this).find('a').addClass("active");
//     $('#tab-content .single-tab').css('visibility','hidden');

//     var indexer = $(this).index(); //gets the current index of (this) which is #nav li
//     $('#tab-content .single-tab:eq(' + indexer + ')').css('visibility','visible'); //uses whatever index the link has to open the corresponding box
// });

});




