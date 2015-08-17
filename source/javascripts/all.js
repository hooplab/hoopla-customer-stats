$.getScript("javascripts/chart-config.js", function(){

   console.log("chart-config loaded");

});

$(function() {

// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
var ctx2 = $("#myChart2").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
// var myNewChart = new Chart(ctx);



  // Linechart
  $.ajax({
    url: 'https://hoopla-customer-statistics.appspot.com/query?id=ahxlfmhvb3BsYS1jdXN0b21lci1zdGF0aXN0aWNzchULEghBcGlRdWVyeRiAgICAgPKICgw',
    crossDomain: true,
    dataType: 'jsonp',
    context: document.body
    }).done(function(data) {
      console.log("loaded");

      var labels = data.rows.map(function(row) { return +row[0]; })
      var data1 = data.rows.map(function(row) { return +row[1]; })
      var data2 = data.rows.map(function(row) { return +row[2]; })
      labels = labels.map(function(label) {
        return moment(label, 'YYYYMMDD').format('ddd');
      });

      console.log(labels);
      console.log(data1);

      var cleanData = {
        labels : labels,
        datasets : [
          {
            label: 'Last 20',
            fillColor : 'rgba(108, 104, 131,0.25)',
            strokeColor : 'rgba(108, 104, 131,1)',
            pointColor : 'rgba(108, 104, 131,1)',
            pointStrokeColor : '#fff',
            data : data1
          },
          {
            label: 'Last 30',
            fillColor : 'rgba(94, 194, 241,0.25)',
            strokeColor : 'rgba(94, 194, 241,1)',
            pointColor : 'rgba(94, 194, 241,1)',
            pointStrokeColor : '#fff',
            data : data2
          }
        ]
      };

      var myLineChart = new Chart(ctx).Line(cleanData);
  });



  $.ajax({
    url: 'https://hoopla-customer-statistics.appspot.com/query?id=ahxlfmhvb3BsYS1jdXN0b21lci1zdGF0aXN0aWNzchULEghBcGlRdWVyeRiAgICA7a2SCgw',
    crossDomain: true,
    dataType: 'jsonp',
    context: document.body
    }).done(function(data) {
      console.log("loaded");

      var labels  = data.rows.map(function(row) { return row[0]; })
      var data1 = data.rows.map(function(row) { return +row[1]; })

      console.log(labels);
      console.log(data1);

      // labels = labels.map(function(label) {
      //   return moment(label, 'YYYYMMDD').format('ddd');
      // });

      // console.log(labels);
      // console.log(data1);


      // var cleanData = [
      //   {
      //     value: 100,
      //     color: "#9966EE",
      //     highlight: "#6699EE",
      //     label: "rsss"
      //   }
      // ]
    var labelcolor = ["#3FD3AD", "#FF6383", "#5EC2F1", "#333045", "#AEABB9", "#BFF7E7", "#FFC6D0", "#95D8F8"];

      //var a = ["a", "b", "c"];
    var specialdata = [];
    data1.forEach(function(entry, i) {
      specialdata[i] = { value: entry, color: labelcolor[i], hightlight: labelcolor[i+1], label: labels[i] }
      console.log(entry);
      //console.log(labels[i]);
    });


      // var cleanData = {

      //   datasets : [
      //     {
      //       value: data1,
      //       color: "#9966EE",
      //       highlight: "#6699EE",
      //       label: labels
      //     }
      //   ]
      // };


      // var cleanData = {
      //   labels : labels,
      //   datasets : [
      //     {
      //       label: 'Last 20',
      //       fillColor : 'rgba(151,187,205,0.5)',
      //       strokeColor : 'rgba(151,187,205,1)',
      //       pointColor : 'rgba(151,187,205,1)',
      //       pointStrokeColor : '#fff',
      //       value : data1
      //     }
      //   ]
      // };
      //var myLineChart = new Chart(ctx).Line(cleanData);
      var myDoughnutChart = new Chart(ctx2).Doughnut(specialdata);
  });

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







});
