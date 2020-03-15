

/**

Div names for now:
<div id="case_graph" style="width:1200px;height:600px;"></div>
<div id="pie_graph" style="width:1200px;height:600px;"></div>
<div id="cases_day_graph" style="width:1200px;height:600px;"></div>
<div id="region_graph" style="width:1200px; height:600px"></div>
 */


/**
 * Colors for charts
 */
const orange = "#FF7F0E";   // Active
const blue = "#1F77B4";
const red = "#D62728";      // Confirmed
const green = "#2CA02C";    // Recovered
const grey = "#7F7F7F";     // Dead
const gridColor =  "#E6E6E6"; // Color of grid lines

/**
 * DATA SETUP
 */

/**
 * Dates for plots
 */
const x_dates = ['2020-02-26','2020-02-27', '2020-02-28', '2020-02-29',
                '2020-03-01', '2020-03-02', '2020-03-03',
                '2020-03-04','2020-03-05', '2020-03-06', '2020-03-07',
                '2020-03-08','2020-03-09', '2020-03-10', '2020-03-11',
                '2020-03-12','2020-03-13', '2020-03-14'
            ];
/**
 * Total cumulative counts (running sum)
 */
const cumulative_confirmed_cases = [0,1,1,1,1,1,2,2,5,10,10,10,10,13,17,41,109,115];
const cumulative_recovered_cases = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const cumulative_active_cases = [0,1,1,1,1,1,2,2,5,10,10,10,10,13,17,41,109,114];
const cumulative_death_counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

/**
 * Daily counts
 */
const daily_confirmed_cases = [0,1,0,0,0,0,1,0,3,5,0,0,0,3,4,24,68,6];
const daily_recovered_cases = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const daily_death = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

/**
 * Region confirmed cases
 */

const sorted_region_data = [
    ["Jõhvi", 0],
    ["Virumaa", 3],
    ["Tartu", 6],
    ["Võru", 9],
    ["Pärnu", 12],
    ["Saaremaa", 31],
    ["Tallinn/Harjumaa", 54],
]

/**
 * Plots the progression as a line chart.
 */
function progressionChart() {
    var confirmed = {
        x: x_dates,
        y: cumulative_confirmed_cases,
        mode: 'lines',
        name: 'Kinnitatud juhud',
        marker: {
        //    color: 'rgb(164, 194, 244)',
        //    size: 12,
            color: red,
            line: {
                color: red,
                width: 1
            }
        }
    };
    
    var recovered = {
        x: x_dates,
        y: cumulative_recovered_cases,
        mode: 'lines',
        name: 'Taastunud',
        marker: {
            //    color: 'rgb(164, 194, 244)',
            //    size: 12,
                color: green,
                line: {
                color: green,
                width: 1
                }
            },
    }

    var active = {
        x: x_dates,
        y: cumulative_active_cases,
        mode: 'lines',
        name: 'Aktiivsed',
        marker: {
                color: orange,
                line: {
                color: orange,
                width: 1
                }
            },
    };

    var death = {
        x: x_dates,
        y: cumulative_death_counts,
        mode: 'lines',
        name: 'Hukkunud',
        marker: {
                color: red,
                line: {
                color: red,
                width: 1
                }
            },
    };

    
    var data = [ confirmed, recovered, active, death ];
    
    var layout = {xaxis: {tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      },
        gridcolor: gridColor,
    },
    yaxis: {
      title: 'Juhtumite arv',
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      },
      gridcolor:gridColor,
    }};
    
    Plotly.newPlot('case_graph', data, layout);

};



/**
 * Chars for plotting cases per day
 * Based on: https://plot.ly/javascript/bar-charts/
 */
function casesPerDay() {
            
    var confirmed = {
        x: x_dates,
        y: daily_confirmed_cases,
        name: 'Kinnitatud haigusjuhtumid',
        marker: {color: red},
        type: 'bar'
      };
      
      var recovered = {
        x: x_dates,
        y: daily_recovered_cases,
        name: 'Taastumised',
        marker: {color: green},
        type: 'bar'
      };
      
      var death = {
        x: x_dates,
        y: daily_death,
        name: 'Hukkumine',
        marker: {color: grey},
        type: 'bar'
      };
      
      var data = [confirmed, recovered, death];
      
      var layout = {
        title: 'Juhtumid',
        xaxis: {tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)',
          },
          gridcolor: gridColor,
        },
        yaxis: {
          title: 'Juhtumite arv',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          },
          gridcolor: gridColor,
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.2,
        grid: {

        }
      };
      
      Plotly.newPlot('cases_day_graph', data, layout);
}


/**
 * Plots the pie chart of active counts, deaths and recovered.
 */
function pieChart() {
    var data = [{
        values: [115, 1, 0],
        labels: ['Aktiivsed', 'Tervenenud', 'Hukkunud'],
        marker: {
            colors:  [orange, green, grey],
        },
        type: 'pie'
      }];
      

      var layout = {
      //    title: 'Show Edit in Chart Studio Button'
      };
      
      Plotly.newPlot('pie_graph', data, layout);
};

/**
 * Plot for municipalities
 */
function regionChart(srt_region) {

    // Sort by second key
    //const new_arr = region_confirmed_cases.sort((a,b) => a[1] > b[1]);
    //console.log(new_arr);
    // reextract x and y
    let new_x = [];
    let new_y = [];
    for (let i = 0; i < srt_region.length; i++) {
        new_x.push(srt_region[i][1]);
        new_y.push(srt_region[i][0]);
    }


    var data = [{
        type: 'bar',
        x: new_x,
        y: new_y,
        orientation: 'h',
        marker: {
            color: blue,
            opacity: 0.9
        }
      }];

      var layout = {
        xaxis: {
                title: 'Juhtumite arv',
                gridcolor: gridColor,
            },
        yaxis: {
            gridcolor: gridColor
        }
        };
      
      Plotly.newPlot('region_graph', data, layout);
}



progressionChart();
//pieChart();
casesPerDay();
regionChart(sorted_region_data);