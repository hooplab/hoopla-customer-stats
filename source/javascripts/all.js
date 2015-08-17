$.getScript("../javascripts/chart-config.js", function(){

   console.log("chart-config loaded");

});



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
            fillColor : 'rgba(108, 104, 131,0.25)',
            strokeColor : 'rgba(108, 104, 131,1)',
            pointColor : 'rgba(108, 104, 131,1)',
            pointStrokeColor : '#fff',
            data : data1
          },
          {
            label: 'Antall kjøp',
            fillColor : 'rgba(94, 194, 241,0.25)',
            strokeColor : 'rgba(94, 194, 241,1)',
            pointColor : 'rgba(94, 194, 241,1)',
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
