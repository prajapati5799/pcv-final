var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [];
    data10 = [];
    district_data_for_horizontal = [];
    district_names_for_horizontal = [];
    
var state_data = [
    ["chhattisgarh", Math.floor((Math.random() * 100) + 1), "727"],
    ["tripura", Math.floor((Math.random() * 100) + 1), "725"],
    ["jharkhand", Math.floor((Math.random() * 100) + 1), "726"],
    ["manipur", Math.floor((Math.random() * 100) + 1), "720"],
    ["odisha", Math.floor((Math.random() * 100) + 1), "728"],
    ["meghalaya", Math.floor((Math.random() * 100) + 1), "721"],
    ["uttarakhand", Math.floor((Math.random() * 100) + 1), "729"],
    ["arunanchal pradesh", Math.floor((Math.random() * 100) + 1), "718"],
    ["nagaland", Math.floor((Math.random() * 100) + 1), "723"],
    ["sikkim", Math.floor((Math.random() * 100) + 1), "724"],
    ["mizoram", Math.floor((Math.random() * 100) + 1), "722"],
    ["assam", Math.floor((Math.random() * 100) + 1), "717"],
    ["jammu and kashmir", Math.floor((Math.random() * 100) + 1), "756"],
    ["ladakh", Math.floor((Math.random() * 100) + 1), "757"]
];

var random_number = function(){
    return Math.floor((Math.random() * 100) + 1);
};

var generate_random_data = function(){
    data1 = [],
    data2 = [],
    data3 = [],
    data4 = [];

    for( var si = 0; si <= 11; si++ ){
    
        var random_numner_1 = random_number();

        //console.log(state_data[si][0]);
        //data1[si] = [["test" + si]];

        if( random_numner_1 >= 0 && random_numner_1 <= 25 ){
            //console.log("1 => " + random_numner_1);
            data1[si] = [state_data[si][0], random_numner_1, state_data[si][2]];
        }

        if( random_numner_1 >= 26 && random_numner_1 <= 50 ){
            //console.log("2 => " + random_numner_1);
            data2[si] = [state_data[si][0], random_numner_1, state_data[si][2]];
        }

        if( random_numner_1 >= 51 && random_numner_1 <= 75 ){
            //console.log("3 => " + random_numner_1);
            data3[si] = [state_data[si][0], random_numner_1, state_data[si][2]];
        }

        if( random_numner_1 >= 76 && random_numner_1 <= 100 ){
            //console.log("4 => " + random_numner_1);
            data4[si] = [state_data[si][0], random_numner_1, state_data[si][2]];
        }

        data10[si] = [random_numner_1];

    }

    data1 = data1.filter(function(){return true;});
    data2 = data2.filter(function(){return true;});
    data3 = data3.filter(function(){return true;});
    data4 = data4.filter(function(){return true;});
    data10 = data10.filter(function(){return true;});

    // console.log(data1);
    // console.log(data2);
    // console.log(data3);
    // console.log(data4);
};

var map_chart_vari = Highcharts.mapChart('map_container', {
    chart: {
        map: 'countries/in/custom/in-all-disputed',
        spacingBottom: 20
    },
    title: {
        text: ""
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: true,
        reversed: true
    },
    plotOptions: {
        map: {
            allAreas: false, 
            //joinBy: ['hc-a2'],
            dataLabels: {
                enabled: true,
                allowOverlap: true,
                color: '#000000',
                style: {
                    //fontWeight: 'bold'
                },
                format: '{point.name}',
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}',
            }
        }
    },
    series: [{
        type: 'map',
        color: 'white',
        name: 'Areas',
        data: highcharts_map_coordinates,
        dataLabels: {
            enabled: false,
            format: '{point.name}'
        },
        showInLegend: false,
    },{
        name: '<= 25',
        color: '#e76f51',
        data: data1,
        tooltip: {headerFormat: '',pointFormat: '{point.name}: <b>{point.value}%</b>'}
    }, {
        name: '<= 50',
        color: '#e9c46a',
        data: data2,
        tooltip: {headerFormat: '',pointFormat: '{point.name}: <b>{point.value}%</b>'}
    }, {
        name: '<= 75',
        color: '#2a9d8f',
        data: data3,
        tooltip: {headerFormat: '',pointFormat: '{point.name}: <b>{point.value}%</b>'}
    }, {
        name: '<= 100',
        color: '#264653',
        data: data4,
        tooltip: {headerFormat: '',pointFormat: '{point.name}: <b>{point.value}%</b>'}
    }]
});

var horizontal_chart_vari = Highcharts.chart('horizontal_container', {
    chart: {
        type: 'bar',
        //height: '800px'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: [
            'Arunachal Pradesh',
            'Assam',
            'Chhatisgarh',
            'Jammu and Kashmir',
            'Jharkhand',
            'Ladakh',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Sikkim',
            'Tripura',
            'Uttarakhand'
        ],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
       
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            },
            tooltip: {
                //headerFormat: '',
                pointFormat: '<b>{point.y}</b>',
            },
        },
        series: {
            //pointWidth: 10
        }
    },
    
    credits: {
        enabled: false
    },
    series: [{
        name: '<= 25',
        color: '#264653',
        data: data10
    }]
});



$('#report_theme').bind('change', function() {
    $("#comming_soon_div").show();
    $("#analytics_div").hide();
    $("#report_state").hide();

    if( $(this).val() == "ds" ){
        $("#report_indicator").show();
    } else {
        $("#report_indicator").hide();
    }
});

$('#report_indicator').bind('change', function() {
    generate_random_data();

    $("#comming_soon_div").hide();
    $("#analytics_div").show();
    $("#report_state").show();

    $("#map_container").show();
    $("#map_district_container").hide();
    $("#report_state").val("all");
    

    var chart_title = $('option:selected', this).attr('data-label');

    //var map_chart_vari = $('#container').highcharts();
    map_chart_vari.update({
        title: {
            text: ''
        }
    });
    $("#chart_title").html(chart_title);

    map_chart_vari.series[1].update({
        data: data1
    }, false);

    map_chart_vari.series[2].update({
        data: data2
    }, false);

    map_chart_vari.series[3].update({
        data: data3
    }, false);

    map_chart_vari.series[4].update({
        data: data4
    }, false);

    map_chart_vari.redraw();

    // ===================== Update Horizontal chart
    horizontal_chart_vari.series[0].setData(data10);
    //horizontal_chart_vari.series[0].setTitle(data10);

    var horizontal_chart_vari_series = [{
        name: chart_title,
        data: data10
      }
    ];

    horizontal_chart_vari.update({
        series: horizontal_chart_vari_series
    }, true, true);

    horizontal_chart_vari.update({
        title: {
            text: ''
        }
    });

    horizontal_chart_vari.update({
        yAxis: {
            title: {
                text: ""
            }
        }
    });

    // =========================================

    // console.log($("#container").highcharts().series);

    // $("#container").highcharts().series[3].update({
    //     data: [["chhattisgarh","98.70","727"],["tripura","97.60","725"],["jharkhand","97.80","726"],["manipur","93.80","720"],["odisha","99.80","728"],["meghalaya","88.70","721"],["uttarakhand","93.80","729"],["arunanchal pradesh","95.40","718"],["nagaland","94.90","723"],["sikkim","98.20","724"],["mizoram","96.20","722"],["assam","97.50","717"]]
    // });

    // $("#container").highcharts().redraw();
});

// District map
$("#map_district_container").hide();

var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>State: </strong><span class='details'>" + d.properties.State_Name + "<br></span>" + "<strong>Dist: </strong><span class='details'>" + (d.properties.Dist_Name) + "</span><br>" + "<strong>Value: </strong><span class='details'>" + Math.floor((Math.random() * 100) + 1) + "</span>";
    })

var margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
    .range(d3.schemeSet3);

var svg = d3.select("#map_district_container")
    .append("svg")
    .attr("width", width + (margin.right + margin.left))
    .attr("height", height + (margin.top + margin.bottom))
    .append('g')
    .attr('class', 'map');

svg.call(tip);

const mainG = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class", "states");

function onSelectState() {

    if( d3.select("#report_state").node().value == "all" ){

        $("#map_container").show();
        $("#map_district_container").hide();

        generate_random_data();

        horizontal_chart_vari.series[0].setData(data10);

        var horizontal_chart_vari_series = [{
            name: chart_title,
            data: data10
        }];

        horizontal_chart_vari.update({
            series: horizontal_chart_vari_series
        }, true, true);

        horizontal_chart_vari.update({
            xAxis: {
                categories: [
                    'Arunachal Pradesh',
                    'Assam',
                    'Chhatisgarh',
                    'Jammu and Kashmir',
                    'Jharkhand',
                    'Ladakh',
                    'Manipur',
                    'Meghalaya',
                    'Mizoram',
                    'Nagaland',
                    'Odisha',
                    'Sikkim',
                    'Tripura',
                    'Uttarakhand'
                ]
            }
        });

    } else {

        $("#map_container").hide();
        $("#map_district_container").show();

        mainG.selectAll("text").remove();

        let preparedData = data[0].features.filter(d => d.properties.State_Name == d3.select("#report_state").node().value);

        district_names_for_horizontal = [];
        district_data_for_horizontal = [];

        $.each( preparedData, function( key, value ){
            district_names_for_horizontal[key] = [value.properties.Dist_Name];
            district_data_for_horizontal[key] = [Math.floor((Math.random() * 100) + 1)];
        });

        // Horizontal chart updates
        var horizontal_chart_vari_series = [{
            data: district_data_for_horizontal
          }
        ];

        horizontal_chart_vari.update({
            series: horizontal_chart_vari_series
        }, true, true);
    
        horizontal_chart_vari.update({
            xAxis: {
                categories: district_names_for_horizontal
            }
        });

        preparedData = {
            type: "FeatureCollection",
            crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            features: preparedData
        }

        if (d3.select("#report_state").node().value == 'all') {
            preparedData = data[0];
        }
        
        var projectionData = d3.geoMercator()
            .fitExtent([[10, 10], [width, height]], preparedData);
        
        var pathData = d3.geoPath().projection(projectionData);

        mainG.selectAll("text")
            .data(preparedData.features)
            .enter()
            .append("text")
            .text(function(d) {
                return d.properties.Dist_Name;
                })
            .attr("transform", function(d) { 
                var centroid = pathData.centroid(d);
                return "translate(" + centroid[0] + "," + centroid[1] + ")"
            })
            .attr("class","labels");

        const allPaths = mainG
            .selectAll("path")
            .data(preparedData.features);	

        allPaths.enter()
            .append('path')
            .merge(allPaths)
            .style("fill", d => {
                return color(Math.floor(Math.random() * 100))
            })
            .style('stroke', 'white')
            .style('stroke-width', 0.3)
            .style("opacity", 0.8)
            .on('mouseover', function (d) {
                tip.show(d);

                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3);
            })
            .on('mouseout', function (d) {
                tip.hide(d);

                d3.select(this)
                    .style("opacity", 0.8)
                    .style("stroke", "white")
                    .style("stroke-width", 0.3);
            })

            .transition()
            .duration(1000)
            .attr("d", pathData);

        allPaths.exit().remove();
    }
}




// generate_random_data();
// $("#comming_soon_div").hide();
// $("#analytics_div").show();

// map_chart_vari.update({
//     title: {
//         text: ''
//     }
// });
// $("#chart_title").html(chart_title);

// map_chart_vari.series[1].update({
//     data: data1
// }, false);

// map_chart_vari.series[2].update({
//     data: data2
// }, false);

// map_chart_vari.series[3].update({
//     data: data3
// }, false);

// map_chart_vari.series[4].update({
//     data: data4
// }, false);

// map_chart_vari.redraw();