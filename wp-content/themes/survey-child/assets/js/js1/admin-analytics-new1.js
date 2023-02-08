$ = jQuery;
var state_map_data = [],
    state_map_data1 = [],
    state_map_data2 = [],
    state_map_data3 = [],
    state_map_data4 = [],
    district_map_data = [],
    district_map_data1 = [],
    district_map_data2 = [],
    district_map_data3 = [],
    district_map_data4 = [],
    district_map_tooltip_pointFormat,
    district_map_min,
    district_map_max,

    state_map_series_name1 = theme_js_vars.map_indicator1,
    state_map_series_name2 = theme_js_vars.map_indicator2,
    state_map_series_name3 = theme_js_vars.map_indicator3,
    state_map_series_name4 = theme_js_vars.map_indicator4,

    state_map_series_color1 = theme_js_vars.map_color1,
    state_map_series_color2 = theme_js_vars.map_color2,
    state_map_series_color3 = theme_js_vars.map_color3,
    state_map_series_color4 = theme_js_vars.map_color4,

    state_map_tooltip_headerFormat = '',
    state_map_tooltip_pointFormat = theme_js_vars.state_map_tooltip_pointFormat,
    state_map_tooltip = {headerFormat: state_map_tooltip_headerFormat,pointFormat: state_map_tooltip_pointFormat},


    horizontal_chart_data = [],
    horizontal_xAxis_state_data = theme_js_vars.horizontal_xAxis_state_data,
    horizontal_xAxis_district_data = [],
    horizontal_tooltip_pointFormat = theme_js_vars.horizontal_tooltip_pointFormat,
    horizontal_yAxis_min = 0,

    horizontal_series_name1 = theme_js_vars.map_indicator1,
    horizontal_series_name2 = theme_js_vars.map_indicator2,
    horizontal_series_name3 = theme_js_vars.map_indicator3,
    horizontal_series_name4 = theme_js_vars.map_indicator4,

    horizontal_series_color1 = theme_js_vars.h_line_color1,
    horizontal_series_color2 = theme_js_vars.h_line_color2,
    horizontal_series_color3 = theme_js_vars.h_line_color3,
    horizontal_series_color4 = theme_js_vars.h_line_color4,

    // Another Horizontal
    another_main_chart_title,
    another_horizontal_chart_data = [],
    another_horizontal_xAxis_state_data = theme_js_vars.horizontal_xAxis_state_data,
    another_horizontal_xAxis_district_data = [],
    another_horizontal_tooltip_pointFormat = theme_js_vars.horizontal_tooltip_pointFormat,
    another_horizontal_yAxis_min = 0,

    another_horizontal_series_name1 = theme_js_vars.map_indicator1,
    another_horizontal_series_name2 = theme_js_vars.map_indicator2,
    another_horizontal_series_name3 = theme_js_vars.map_indicator3,
    another_horizontal_series_name4 = theme_js_vars.map_indicator4,

    another_horizontal_series_color1 = theme_js_vars.another_h_line_color1,
    another_horizontal_series_color2 = theme_js_vars.another_h_line_color2,
    another_horizontal_series_color3 = theme_js_vars.another_h_line_color3,
    another_horizontal_series_color4 = theme_js_vars.another_h_line_color4,

    bubble_chart_data = [],
    bubble_tooltip_pointFormat = theme_js_vars.bubble_tooltip_pointFormat,
    bubble_xAxis_min = 0,
    bubble_yAxis_min = 0,

    analytic_title = '',
    main_chart_title = '',
    analytics_form = "analytics_form",
    report_theme = "report_theme",
    report_indicator = "report_indicator",
    report_state = "report_state",
    report_year = "report_year",
    report_ch_district = "report_ch_district",
    profile_state_container = "profile_state_container",
    distrcit_cold_chain_container = "distrcit_cold_chain_container",
    state_map_container = "map_state_container",
    district_map_container = "map_district_container",
    map_district_indicator = "map_district_indicator",
    horizontal_chart_container = "horizontal_container",
    another_horizontal_container = "another_horizontal_container",
    bubble_chart_container = "bubble_container",
    blank_image_div = "blank_image_div",
    

    $loader_div = $("#loader"),
    $comming_soon_div = $("#comming_soon_div"),
    $chart_title = $("#chart_title"),
    
    $analytics_form = $("#" + analytics_form),
    $report_theme = $("#" + report_theme),
    $report_indicator = $("#" + report_indicator),
    $report_state = $("#" + report_state),
    $report_year = $("#" + report_year),
    $report_ch_district = $("#" + report_ch_district),
    $profile_state_container = $("#" + profile_state_container),
    $distrcit_cold_chain_container = $("#" + distrcit_cold_chain_container),
    $map_district_indicator = $("#" + map_district_indicator),

    $state_map_container = $("#" + state_map_container),
    $district_map_container = $("#" + district_map_container),
    $horizontal_chart_container = $("#" + horizontal_chart_container),
    $bubble_chart_container = $("#" + bubble_chart_container), 
    $another_horizontal_container = $("#" + another_horizontal_container), 
    $blank_image_div = $("#" + blank_image_div), 
    $export_field = $("input[name='export_type']"), 
    

    state_dropdown_list = theme_js_vars.state_dropdown,
    //state_dropdown_list = '',
    state_dropdown_init = '<option value="all">All States</option>',
    state_dropdown_dif_init = '<option value="">Choose State</option>',

    ele_hide = function(ele){
        ele.hide();
    },

    ele_show = function(ele){
        ele.show();
    },

    select_ele_reset = function(ele){
        ele.prop("selectedIndex", 0);
    },

    select_ele_reload = function(ele, val){
        ele.html(val);
    },

    export_field_update = function(val){
        $export_field.val(val);
    },

    export_field_reset = function(){
        $export_field.val("");
    },

    random_number = function(){
        return Math.floor((Math.random() * 100) + 1);
    },

    update_chart_title = function(){
        $chart_title.html(analytic_title);
    },

    update_all_state_dropdown = function(){
        $report_state.html("");
        $report_state.html(state_dropdown_init);
        $report_state.append(state_dropdown_list);
    },

    update_choose_state_dropdown = function(){
        $report_state.html("");
        $report_state.html(state_dropdown_dif_init);
        $report_state.append(state_dropdown_list);
    },

    map_chart_vari = Highcharts.mapChart(state_map_container, {
        chart: {
            map: 'countries/in/in-all-ladakhdisputed',
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
                        //fontWeight: 'bold',
                        fontWeight: 'normal',
                        fontSize: 10,
                        //textOverflow: 'clip',
                        textShadow: false,
                        textOutline: false
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
            name: state_map_series_name1,
            color: state_map_series_color1,
            data: state_map_data1,
            tooltip: state_map_tooltip
        }, {
            name: state_map_series_name2,
            color: state_map_series_color2,
            data: state_map_data2,
            tooltip: state_map_tooltip
        }, {
            name: state_map_series_name3,
            color: state_map_series_color3,
            data: state_map_data3,
            tooltip: state_map_tooltip
        }, {
            name: state_map_series_name4,
            color: state_map_series_color4,
            data: state_map_data4,
            tooltip: state_map_tooltip
        }]
    }),

    horizontal_chart_vari = Highcharts.chart(horizontal_chart_container, {
        chart: {
            type: 'bar',
            //height: '800px'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: horizontal_xAxis_state_data,
            title: {
                text: null
            }
        },
        yAxis: {
            min: horizontal_yAxis_min,
            max: 100,
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
                    //enabled: true
                    enabled: false
                },
                tooltip: {
                    //headerFormat: '',
                    pointFormat: horizontal_tooltip_pointFormat,
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
            name: null,
            color: horizontal_series_color1,
            data: []
        }]
    }),

    another_horizontal_chart_vari = Highcharts.chart(another_horizontal_container, {
        chart: {
            type: 'bar',
            //height: '800px'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: another_horizontal_xAxis_state_data,
            title: {
                text: null
            }
        },
        yAxis: {
            min: another_horizontal_yAxis_min,
            max: 100,
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
                    //enabled: true
                    enabled: false
                },
                tooltip: {
                    //headerFormat: '',
                    pointFormat: another_horizontal_tooltip_pointFormat,
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
            name: null,
            color: another_horizontal_series_color1,
            data: []
        }]
    }),

    bubble_chart_vari = Highcharts.chart(bubble_chart_container, {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
    
        legend: {
            enabled: false
        },
    
        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
        },
    
        accessibility: {
            point: {
                //valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
            }
        },
        
        credits: {
            enabled: false
        },
    
        xAxis: {
            //min: bubble_xAxis_min,
            gridLineWidth: 1,
            title: {
                text: ''
            },
            labels: {
                //format: '{value} gr'
            },
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {
                        fontStyle: 'italic'
                    },
                    text: ''
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: ''
            }
        },
    
        yAxis: {
            //min: bubble_yAxis_min,
            startOnTick: false,
            endOnTick: false,
            title: {
                text: ''
            },
            labels: {
                //format: '{value} gr'
            },
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {
                        //fontStyle: 'italic'
                    },
                    //text: 'Safe sugar intake 50g/day',
                    x: -10
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: ''
            }
        },
    
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormat: bubble_tooltip_pointFormat,
            footerFormat: '',
            followPointer: true
        },
    
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
    
        series: [{
            data: bubble_chart_data
        }]
    
    }),

    d3_margin = { top: 20, right: 0, bottom: 0, left: 0 },
    d3_width = 500 - d3_margin.left - d3_margin.right,
    d3_height = 500 - d3_margin.top - d3_margin.bottom,

    color = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
    .range(d3.schemeSet3),

    svg = d3.select("#" + district_map_container)
    .append("svg")
    .attr("width", d3_width + (d3_margin.right + d3_margin.left))
    .attr("height", d3_height + (d3_margin.top + d3_margin.bottom))
    .append('g')
    .attr('class', 'map'),

    mainG = svg.append("g").attr("transform", `translate(${d3_margin.left},${d3_margin.top})`).attr("class", "states"),

    reload_state_map_data = function(){
        var indicator_val = $report_indicator.find(":selected").val();

        var smc1 = state_map_series_color1;
        var smc2 = state_map_series_color2;
        var smc3 = state_map_series_color3;
        var smc4 = state_map_series_color4;

        if( indicator_val == "bi__3_3__drop_p1" || indicator_val == "bi__3_3__drop_mr1" || indicator_val == "ds__15_1__reported_any_case" || indicator_val == "ds__15_2__afp_cases" || indicator_val == "ds__15_3__reported_outbreaks" ){
            smc1 = state_map_series_color4;
            smc2 = state_map_series_color3;
            smc3 = state_map_series_color2;
            smc4 = state_map_series_color1;
        }

        map_chart_vari.update({
            title: {
                text: ''
            }
        });
    
        map_chart_vari.series[1].update({
            name: state_map_series_name1,
            color: smc1,
            data: state_map_data1,
            tooltip: state_map_tooltip
        }, false);
    
        map_chart_vari.series[2].update({
            name: state_map_series_name2,
            color: smc2,
            data: state_map_data2,
            tooltip: state_map_tooltip
        }, false);
    
        map_chart_vari.series[3].update({
            name: state_map_series_name3,
            color: smc3,
            data: state_map_data3,
            tooltip: state_map_tooltip
        }, false);
    
        map_chart_vari.series[4].update({
            name: state_map_series_name4,
            color: smc4,
            data: state_map_data4,
            tooltip: state_map_tooltip
        }, false);
    
        map_chart_vari.redraw();
    },

    reload_horizontal_chart_data = function(){
        //horizontal_chart_vari.series[0].setData(data10);
        //horizontal_chart_vari.series[0].setTitle(data10);

        horizontal_chart_vari.update({
            series: [{
                name: main_chart_title,
                data: horizontal_chart_data
            }]
        }, true, true);

        horizontal_chart_vari.update({
            title: {
                text: ''
            }
        });

        horizontal_chart_vari.update({
            yAxis: {
                min: horizontal_yAxis_min,
                title: {
                    text: ""
                }
            }
        });

        horizontal_chart_vari.update({
            plotOptions: {
                bar: {
                    tooltip: {
                        pointFormat: horizontal_tooltip_pointFormat,
                    },
                }
            }
        });

        horizontal_chart_vari.update({
            xAxis: {
                categories: horizontal_xAxis_state_data
            }
        });
    },

    reload_another_horizontal_chart_data = function(){
        //horizontal_chart_vari.series[0].setData(data10);
        //horizontal_chart_vari.series[0].setTitle(data10);

        another_horizontal_chart_vari.update({
            series: [{
                name: another_main_chart_title,
                data: another_horizontal_chart_data
            }]
        }, true, true);

        another_horizontal_chart_vari.update({
            title: {
                text: ''
            }
        });

        another_horizontal_chart_vari.update({
            yAxis: {
                min: horizontal_yAxis_min,
                title: {
                    text: ""
                }
            }
        });

        another_horizontal_chart_vari.update({
            plotOptions: {
                bar: {
                    tooltip: {
                        pointFormat: horizontal_tooltip_pointFormat,
                    },
                }
            }
        });

        another_horizontal_chart_vari.update({
            xAxis: {
                categories: horizontal_xAxis_state_data
            }
        });
    },

    // https://jsfiddle.net/BlackLabel/rnms2u4z/
    reload_bubble_chart_data = function(){
        bubble_chart_vari.update({
            series: [{
                data: bubble_chart_data
            }]
        }, true, true);

        bubble_chart_vari.update({
            xAxis: {
                title: {
                    text: main_chart_title
                }
            },
            tooltip: {
                pointFormat: bubble_tooltip_pointFormat,
            },
        });

        if (!bubble_chart_vari.xAxis[0].tickPositions.includes(bubble_xAxis_min)) {
            bubble_chart_vari.update({
                xAxis: {
                    min: bubble_xAxis_min
                }
            })
        }

        if (!bubble_chart_vari.yAxis[0].tickPositions.includes(bubble_yAxis_min)) {
            bubble_chart_vari.update({
                yAxis: {
                  min: bubble_yAxis_min
                }
            })
        }
    },

    clear_district_indicators = function(){
        $('#' + map_district_indicator + ' .district_points').each(function(index) {
            $map_district_indicator.children('.district_points').children('span').get(index).nextSibling.remove();
        });
    },

    fetch_data = function(){
        var form_data = new FormData($analytics_form[0]);

        $.ajax({
            type        : "post",
            url         : theme_js_vars.ajax_url,
            data        : form_data,
            dataType    : 'json',
            processData : false,
            contentType : false,
            success     : function(response){

                analytic_title = response.analytic_title;

                var report_theme_val = $report_theme.find(":selected").val(),
                    report_state_val = $report_state.find(":selected").val(),
                    indicator_val = $report_indicator.find(":selected").val(),
                    report_state_attr_label = $report_state.find(":selected").data('label');

                if( report_theme_val != "profile" || indicator_val == "ccvl__16_6__cold_chain_space_available" ){
                    main_chart_title = response.chart_title;
                    update_chart_title();
                }

                if( report_theme_val == "profile" || indicator_val == "ccvl__16_6__cold_chain_space_available" ){
                    $profile_state_container.html(response.state_profile);
                    
                    if( typeof response.state_filter !== "undefined" && response.state_filter.length > 0 ){
                        $report_ch_district.html("");
                        $report_ch_district.html(response.state_filter);
                    }

                } else if( report_state_val != "all" ){

                    if (d3.select("#" + report_state).node().value == 'all') {
                        return false;
                    }

                    district_map_data1 = response.district_map.range1.data;
                    district_map_data2 = response.district_map.range2.data;
                    district_map_data3 = response.district_map.range3.data;
                    district_map_data4 = response.district_map.range4.data;
                    bubble_xAxis_min = response.district_map.bubble_xAxis_min;
                    bubble_yAxis_min = response.district_map.bubble_yAxis_min;

                    district_map_tooltip_pointFormat = response.district_map.district_map_tooltip.pointFormat;
                    district_map_min = response.district_map.min_point;
                    district_map_max = response.district_map.max_point;

                    district_map_data = [...district_map_data1, ...district_map_data2, ...district_map_data3, ...district_map_data4];

                    tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function (d) {
                        
                        var d3_district_name = d.properties.Dist_Name,
                            d3_state_name = d.properties.Dist_Name,
                            d3_district_name_lower = d3_district_name.toLowerCase(),
                            d3_is_exists_district;

                        d3_is_exists_district = district_map_data.find(e => e[0] === d3_district_name_lower);

                        if( typeof d3_is_exists_district === "undefined" ){
                            return d3_district_name + ": <b>0" + district_map_tooltip_pointFormat;
                        } else {
                            return d3_district_name + ": <b>" + d3_is_exists_district[1] + district_map_tooltip_pointFormat;
                        }
                    })
                
                    svg.call(tip);
                
                    mainG.selectAll("text").remove();
                
                    let preparedData = data[0].features.filter(d => d.properties.State_Name == report_state_attr_label);
                
                
                    // Horizontal chart updates
                    horizontal_chart_data = [];
                    horizontal_xAxis_state_data = [];
                    horizontal_chart_data = response.district_horizontal.data;
                    horizontal_tooltip_pointFormat = response.district_horizontal.horizontal_tooltip_pointFormat;
                    horizontal_xAxis_state_data = response.district_horizontal.horizontal_xAxis_district_data;
                    horizontal_yAxis_min = response.district_horizontal.horizontal_yAxis_min;
                    reload_horizontal_chart_data();

                    if( indicator_val == "prs__11_7__meetings_held" || indicator_val == "prs__11_10__meetings_cold_chain" || indicator_val == "prs__12_4__aefi_committee_meetings" ){
                        // Another Horizontal chart
                        another_horizontal_chart_data = response.district_another_horizontal.data;
                        another_horizontal_tooltip_pointFormat = response.district_another_horizontal.horizontal_tooltip_pointFormat;
                        another_horizontal_xAxis_state_data = response.district_another_horizontal.horizontal_xAxis_state_data;
                        another_horizontal_yAxis_min = response.district_another_horizontal.horizontal_yAxis_min;
                        another_main_chart_title = response.another_chart_title;

                        reload_another_horizontal_chart_data();
                    }

                    // Buble chart
                    bubble_chart_data = response.district_bubble.data;
                    bubble_tooltip_pointFormat = response.district_bubble.bubble_tooltip_pointFormat;
                    reload_bubble_chart_data();
                

                    preparedData = {
                        type: "FeatureCollection",
                        crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                        features: preparedData
                    }
                
                    if (d3.select("#" + report_state).node().value == 'all') {
                        preparedData = data[0];
                    }
                    
                    var projectionData = d3.geoMercator()
                        .fitExtent([[10, 10], [d3_width, d3_height]], preparedData);
                    
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
                        .attr('class', d => {
                        
                            var d3_district_name = d.properties.Dist_Name,
                                d3_district_name_lower = d3_district_name.toLowerCase(),
                                d3_is_exists_district1,
                                d3_is_exists_district2,
                                d3_is_exists_district3,
                                d3_is_exists_district4;
    
                            d3_is_exists_district1 = district_map_data1.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district2 = district_map_data2.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district3 = district_map_data3.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district4 = district_map_data4.find(e => e[0] === d3_district_name_lower);
    
                            if( typeof d3_is_exists_district1 !== "undefined" ){
                                return "text-4";
                            } else if( typeof d3_is_exists_district2 !== "undefined" ){
                                return "text-3";
                            } else if( typeof d3_is_exists_district3 !== "undefined" ){
                                return "text-2";
                            } else if( typeof d3_is_exists_district4 !== "undefined" ){
                                return "text-1";
                            }
                            
                            return 'text-0';
                        });
                
                    const allPaths = mainG
                        .selectAll("path")
                        .data(preparedData.features);	
                
                    allPaths.enter()
                        .append('path')
                        .merge(allPaths)
                        .style("fill", d => {
                        
                            var d3_district_name = d.properties.Dist_Name,
                                d3_district_name_lower = d3_district_name.toLowerCase(),
                                d3_is_exists_district1,
                                d3_is_exists_district2,
                                d3_is_exists_district3,
                                d3_is_exists_district4;

                            var dmc1 = state_map_series_color1;
                            var dmc2 = state_map_series_color2;
                            var dmc3 = state_map_series_color3;
                            var dmc4 = state_map_series_color4;

                            if( indicator_val == "bi__3_3__drop_p1" || indicator_val == "bi__3_3__drop_mr1" || indicator_val == "ds__15_1__reported_any_case" || indicator_val == "ds__15_2__afp_cases" || indicator_val == "ds__15_3__reported_outbreaks" ){
                                dmc1 = state_map_series_color4;
                                dmc2 = state_map_series_color3;
                                dmc3 = state_map_series_color2;
                                dmc4 = state_map_series_color1;
                            }
    
                            d3_is_exists_district1 = district_map_data1.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district2 = district_map_data2.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district3 = district_map_data3.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district4 = district_map_data4.find(e => e[0] === d3_district_name_lower);
    
                            if( typeof d3_is_exists_district4 !== "undefined" ){
                                return dmc4;
                            } else if( typeof d3_is_exists_district3 !== "undefined" ){
                                return dmc3;
                            } else if( typeof d3_is_exists_district2 !== "undefined" ){
                                return dmc2;
                            } else if( typeof d3_is_exists_district1 !== "undefined" ){
                                return dmc1;
                            }
                            //return color(Math.floor(Math.random() * 100));
                            return '#d3d3d3';
                        })
                        .attr('class', d => {
                        
                            var d3_district_name = d.properties.Dist_Name,
                                d3_district_name_lower = d3_district_name.toLowerCase(),
                                d3_is_exists_district1,
                                d3_is_exists_district2,
                                d3_is_exists_district3,
                                d3_is_exists_district4;
    
                            d3_is_exists_district1 = district_map_data1.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district2 = district_map_data2.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district3 = district_map_data3.find(e => e[0] === d3_district_name_lower);
                            d3_is_exists_district4 = district_map_data4.find(e => e[0] === d3_district_name_lower);
    
                            if( typeof d3_is_exists_district1 !== "undefined" ){
                                return "path-4";
                            } else if( typeof d3_is_exists_district2 !== "undefined" ){
                                return "path-3";
                            } else if( typeof d3_is_exists_district3 !== "undefined" ){
                                return "path-2";
                            } else if( typeof d3_is_exists_district4 !== "undefined" ){
                                return "path-1";
                            }
                            
                            return 'path-0';
                        })
                        .style('stroke', '#CCCCCC')
                        .style('stroke-width', 0.5)
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
                                .style("stroke", "#CCCCCC")
                                .style("stroke-width", 0.3);
                        })
                
                        .transition()
                        .duration(1000)
                        .attr("d", pathData);
                
                    allPaths.exit().remove();
                    
                    
                    clear_district_indicators();
                    $map_district_indicator.children('.district_points').eq(0).children('span').after(response.district_map.range4.title);
                    $map_district_indicator.children('.district_points').eq(1).children('span').after(response.district_map.range3.title);
                    $map_district_indicator.children('.district_points').eq(2).children('span').after(response.district_map.range2.title);
                    $map_district_indicator.children('.district_points').eq(3).children('span').after(response.district_map.range1.title);

                    
                    if( indicator_val == "prs__11_4__stfi_meetings" || indicator_val == "prs__11_7__meetings_held" || indicator_val == "prs__11_10__meetings_cold_chain" || indicator_val == "prs__12_4__aefi_committee_meetings" ){
                        ele_hide($district_map_container);    
                        ele_hide($map_district_indicator);    
                    } else {
                        ele_show($map_district_indicator);
                    }

                } else {
                    state_map_series_name1 = response.state_map.range1.title;
                    state_map_data1 = response.state_map.range1.data;

                    state_map_series_name2 = response.state_map.range2.title;
                    state_map_data2 = response.state_map.range2.data;

                    state_map_series_name3 = response.state_map.range3.title;
                    state_map_data3 = response.state_map.range3.data;

                    state_map_series_name4 = response.state_map.range4.title;
                    state_map_data4 = response.state_map.range4.data;

                    state_map_tooltip = response.state_map.state_map_tooltip;

                    // Horizontal chart
                    horizontal_chart_data = response.state_horizontal.data;
                    horizontal_tooltip_pointFormat = response.state_horizontal.horizontal_tooltip_pointFormat;
                    horizontal_xAxis_state_data = response.state_horizontal.horizontal_xAxis_state_data;
                    horizontal_yAxis_min = response.state_horizontal.horizontal_yAxis_min;

                    // Buble chart
                    bubble_chart_data = response.state_bubble.data;
                    bubble_tooltip_pointFormat = response.state_bubble.bubble_tooltip_pointFormat;

                    reload_state_map_data();
                    reload_horizontal_chart_data();
                    reload_bubble_chart_data();
                    
                    if( indicator_val == "prs__11_4__stfi_meetings" || indicator_val == "prs__11_7__meetings_held" || indicator_val == "prs__11_10__meetings_cold_chain" || indicator_val == "prs__12_4__aefi_committee_meetings" ){
                        // Another Horizontal chart
                        another_horizontal_chart_data = response.state_another_horizontal.data;
                        another_horizontal_tooltip_pointFormat = response.state_another_horizontal.horizontal_tooltip_pointFormat;
                        another_horizontal_xAxis_state_data = response.state_another_horizontal.horizontal_xAxis_state_data;
                        another_horizontal_yAxis_min = response.state_another_horizontal.horizontal_yAxis_min;
                        another_main_chart_title = response.another_chart_title;

                        reload_another_horizontal_chart_data();
                    }
                    
                }

                ele_hide($loader_div);
            },
            error       : function(xhr, status, error){
                alert("Error!" + xhr.status);
                ele_hide($loader_div);
            }
        });
    },

    init = function(){
        ele_hide($comming_soon_div);
        ele_hide($report_indicator);
        ele_hide($report_state);
        ele_hide($state_map_container);
        ele_hide($district_map_container);
        ele_hide($map_district_indicator);
        ele_hide($horizontal_chart_container);
        ele_hide($bubble_chart_container);
        ele_hide($chart_title);
        ele_hide($report_year);
        ele_hide($report_ch_district);
        ele_hide($profile_state_container);
        ele_hide($distrcit_cold_chain_container);
        ele_hide($another_horizontal_container);

        select_ele_reload($report_indicator, "");
        select_ele_reload($report_year, "");
        select_ele_reload($report_ch_district, "");
        select_ele_reset($report_state);
    };

init();

// $('#' + map_district_indicator + ' .district_points').each(function() {
//     $(this).children("span").css('background-color', $(this).data('color'));
// });

$(document).on( 'change', '#' + report_theme, function () {
    var request_indicator_val = $(this).val();

    export_field_reset();
    ele_hide($report_indicator);
    ele_hide($report_state);
    ele_hide($state_map_container);
    ele_hide($district_map_container);
    ele_hide($map_district_indicator);
    ele_hide($horizontal_chart_container);
    ele_hide($bubble_chart_container);
    ele_hide($chart_title);
    ele_hide($report_year);
    ele_hide($report_ch_district);
    ele_hide($profile_state_container);
    ele_hide($distrcit_cold_chain_container);
    ele_hide($another_horizontal_container);
    
    
    select_ele_reload($report_indicator, "");
    select_ele_reload($report_year, "");
    select_ele_reload($report_ch_district, "");
    select_ele_reset($report_state);
    $profile_state_container.html("");
    $distrcit_cold_chain_container.html("");

    update_all_state_dropdown();

    if( request_indicator_val == "bi" ){
        select_ele_reload($report_indicator, theme_js_vars.indicator.bi);
    } else if( request_indicator_val == "ccvl" ){
        select_ele_reload($report_indicator, theme_js_vars.indicator.ccvl);
    } else if( request_indicator_val == "prs" ){
        select_ele_reload($report_indicator, theme_js_vars.indicator.prs);
    } else if( request_indicator_val == "ds" ){
        select_ele_reload($report_indicator, theme_js_vars.indicator.ds);
    }

    if( request_indicator_val == "profile" ){
        ele_show($loader_div);
        ele_hide($report_indicator);
        ele_show($profile_state_container);
        ele_show($report_state);
        ele_hide($blank_image_div);
        fetch_data();
    } else if( request_indicator_val != "" ){
        ele_show($report_indicator);
        ele_hide($comming_soon_div);
        ele_show($blank_image_div);
    } else {
        ele_hide($report_indicator);
    }
});

$(document).on( 'change', '#' + report_indicator, function () {
    var indicator_ele_val = $(this).val();

    export_field_reset();
    ele_hide($another_horizontal_container);

    if( indicator_ele_val == "" ){
        ele_hide($report_state);
        ele_hide($state_map_container);
        ele_hide($district_map_container);
        ele_hide($map_district_indicator);
        ele_hide($horizontal_chart_container);
        ele_hide($bubble_chart_container);
        ele_hide($chart_title);
        ele_hide($report_year);
        ele_hide($report_ch_district);
        ele_hide($profile_state_container);
        ele_hide($distrcit_cold_chain_container);
        
        select_ele_reload($report_year, "");
        select_ele_reload($report_ch_district, "");
        select_ele_reset($report_state);
        $profile_state_container.html("");
        $distrcit_cold_chain_container.html("");
        ele_show($blank_image_div);

        return false;
    }

    ele_hide($blank_image_div);

    var dmc1 = state_map_series_color4;
    var dmc2 = state_map_series_color3;
    var dmc3 = state_map_series_color2;
    var dmc4 = state_map_series_color1;
    if( indicator_ele_val == "bi__3_3__drop_p1" || indicator_ele_val == "bi__3_3__drop_mr1" || indicator_ele_val == "ds__15_1__reported_any_case" || indicator_ele_val == "ds__15_2__afp_cases" || indicator_ele_val == "ds__15_3__reported_outbreaks" ){
        dmc1 = state_map_series_color1;
        dmc2 = state_map_series_color2;
        dmc3 = state_map_series_color3;
        dmc4 = state_map_series_color4;
    }

    main_chart_title = $('option:selected', this).attr('data-label');
    //update_chart_title();
    select_ele_reset($report_state);
    select_ele_reset($report_year);
    
    ele_show($loader_div);
    ele_show($chart_title);
    ele_show($report_state);
    ele_hide($district_map_container);
    ele_hide($map_district_indicator);
    ele_hide($profile_state_container);
    ele_hide($distrcit_cold_chain_container);
    ele_hide($report_ch_district);
    $profile_state_container.html("");
    $distrcit_cold_chain_container.html("");

    select_ele_reload($report_ch_district, "");

    update_all_state_dropdown();

    if( indicator_ele_val == "bi__3_2__pd1_hims" || indicator_ele_val == "bi__3_2__pd1_nfhs" || indicator_ele_val == "bi__3_2__pd1_monitoring" ){
        fetch_data();

        // Show map, horizontal chart and hide year dropdown
        ele_hide($report_year);
        ele_hide($report_state);

        // Show charts
        ele_show($state_map_container);
        ele_show($horizontal_chart_container);
        ele_hide($bubble_chart_container);
    } else if( indicator_ele_val == "bi__8_1__vaccine_wastage" ){
        fetch_data();
        
        // Show map, bubble chart and show year dropdown
        //main_chart_title = main_chart_title + " " + theme_js_vars.year.bi__8_1__vaccine_wastage_default;
        //update_chart_title();

        select_ele_reload($report_year, theme_js_vars.year.bi__8_1__vaccine_wastage);
        ele_show($report_year);

        // Show charts
        ele_show($state_map_container);
        // ele_show($bubble_chart_container);
        // ele_hide($horizontal_chart_container);
        ele_hide($bubble_chart_container);
        ele_show($horizontal_chart_container);
    } else if( indicator_ele_val == "ccvl__16_4__ccp_evin" ){
        fetch_data();
        
        // Show map, bubble chart and hide year dropdown
        ele_show($state_map_container);
        // ele_show($bubble_chart_container);
        // ele_hide($horizontal_chart_container);
        ele_show($report_state);
        ele_hide($bubble_chart_container);
        ele_show($horizontal_chart_container);
    } else if( indicator_ele_val == "ccvl__9_2_1__vaccine_van" || indicator_ele_val == "ccvl__9_2_2__vaccine_van" ){
        fetch_data();
        
        // Show map chart and hide year dropdown
        ele_show($state_map_container);
        ele_hide($bubble_chart_container);
        ele_hide($horizontal_chart_container);
        ele_hide($report_state);
    } else if( indicator_ele_val == "prs__11_4__stfi_meetings" || indicator_ele_val == "prs__11_7__meetings_held" || indicator_ele_val == "prs__11_10__meetings_cold_chain" || indicator_ele_val == "prs__12_4__aefi_committee_meetings" ){
        fetch_data();
        
        // Show horizontal chart and show year dropdown

        // if(indicator_ele_val == "prs__11_4__stfi_meetings"){
        //     //main_chart_title = main_chart_title + " " + theme_js_vars.year.prs__11_4__stfi_meetings_default;
        //     select_ele_reload($report_year, theme_js_vars.year.prs__11_4__stfi_meetings);
        // } else if(indicator_ele_val == "prs__11_7__meetings_held"){
        //     //main_chart_title = main_chart_title + " " + theme_js_vars.year.prs__11_7__meetings_held_default;
        //     select_ele_reload($report_year, theme_js_vars.year.prs__11_7__meetings_held);
        // } else if(indicator_ele_val == "prs__11_10__meetings_cold_chain"){
        //     //main_chart_title = main_chart_title + " " + theme_js_vars.year.prs__11_10__meetings_cold_chain_default;
        //     select_ele_reload($report_year, theme_js_vars.year.prs__11_10__meetings_cold_chain);
        // } else if(indicator_ele_val == "prs__12_4__aefi_committee_meetings"){
        //     //main_chart_title = main_chart_title + " " + theme_js_vars.year.prs__12_4__aefi_committee_meetings_default;
        //     select_ele_reload($report_year, theme_js_vars.year.prs__12_4__aefi_committee_meetings);
        // }
        // //update_chart_title();
        // ele_show($report_year);

        // Show charts
        ele_show($horizontal_chart_container);
        ele_show($another_horizontal_container);
        ele_hide($state_map_container);
        ele_hide($district_map_container);
        ele_hide($bubble_chart_container);
        ele_hide($report_year);
    } else if( indicator_ele_val == "ds__15_1__reported_any_case" || indicator_ele_val == "ds__15_2__afp_cases" || indicator_ele_val == "ds__15_3__reported_outbreaks" ){
        fetch_data();
        
        // Show map, horizontal chart and show year dropdown

        if(indicator_ele_val == "ds__15_1__reported_any_case"){
            //main_chart_title = main_chart_title + " " + theme_js_vars.year.ds__15_1__reported_any_case_default;
            select_ele_reload($report_year, theme_js_vars.year.ds__15_1__reported_any_case);
        } else if(indicator_ele_val == "ds__15_2__afp_cases"){
            //main_chart_title = main_chart_title + " " + theme_js_vars.year.ds__15_2__afp_cases_default;
            select_ele_reload($report_year, theme_js_vars.year.ds__15_2__afp_cases);
        } else if(indicator_ele_val == "ds__15_3__reported_outbreaks"){
            //main_chart_title = main_chart_title + " " + theme_js_vars.year.ds__15_3__reported_outbreaks_default;
            select_ele_reload($report_year, theme_js_vars.year.ds__15_3__reported_outbreaks);
        }
        //update_chart_title();
        ele_show($report_year);

        // Show charts
        ele_show($state_map_container);
        ele_show($horizontal_chart_container);
        ele_hide($bubble_chart_container);
    } else if( indicator_ele_val == "ccvl__16_6__cold_chain_space_available" ){

        update_choose_state_dropdown();
        
        ele_hide($state_map_container);
        ele_hide($bubble_chart_container);
        ele_hide($horizontal_chart_container);
        ele_show($report_state);
        ele_hide($loader_div);
        ele_hide($chart_title);
    } else if( indicator_ele_val == "ccvl__16_3__evin" ){
        fetch_data();
        
        // Show map, horizontal chart and hide year dropdown
        ele_hide($report_year);
        ele_hide($report_state);

        // Show charts
        ele_show($state_map_container);
        ele_show($horizontal_chart_container);
        ele_hide($bubble_chart_container);
    } else {
        fetch_data();
        
        // Show map, horizontal chart and hide year dropdown
        ele_hide($report_year);

        // Show charts
        ele_show($state_map_container);
        ele_show($horizontal_chart_container);
        ele_hide($bubble_chart_container);
    }


    $map_district_indicator.children('.district_points').eq(0).data('color', dmc1);
    $map_district_indicator.children('.district_points').eq(1).data('color', dmc2);
    $map_district_indicator.children('.district_points').eq(2).data('color', dmc3);
    $map_district_indicator.children('.district_points').eq(3).data('color', dmc4);

    $('#' + map_district_indicator + ' .district_points').each(function() {
        $(this).children("span").css('background-color', $(this).data('color'));
    });

});

$(document).on( 'change', '#' + report_state, function () {
    var state_ele_val = $(this).val(),
        indicator_val = $report_indicator.find(":selected").val(),
        theme_ele_val = $report_theme.find(":selected").val();

    export_field_reset();
    ele_hide($another_horizontal_container);

    if( indicator_val == "ccvl__16_6__cold_chain_space_available" ){
        if( state_ele_val.length == 0 ){
            return false;
        }
    }
    
    ele_show($loader_div);
    ele_hide($map_district_indicator);
    ele_hide($profile_state_container);
    ele_hide($distrcit_cold_chain_container);
    $profile_state_container.html("");
    $distrcit_cold_chain_container.html("");
    fetch_data();
    
    if( theme_ele_val == "profile" ){
        ele_show($loader_div);
        ele_show($profile_state_container);
        ele_show($report_state);

        ele_hide($report_indicator);
        ele_hide($state_map_container);
        ele_hide($horizontal_chart_container);
        ele_hide($bubble_chart_container);
        ele_hide($district_map_container);
    } else if( indicator_val == "ccvl__16_6__cold_chain_space_available" ){
        ele_show($loader_div);
        ele_show($report_indicator);
        ele_show($profile_state_container);
        ele_show($distrcit_cold_chain_container);
        ele_show($report_state);
        ele_show($report_ch_district);

        ele_hide($state_map_container);
        ele_hide($horizontal_chart_container);
        ele_hide($bubble_chart_container);
        ele_hide($district_map_container);
    } else if( state_ele_val == "all" ){

        if( indicator_val == "prs__11_4__stfi_meetings" ){
            ele_show($report_year);
        }

        ele_show($state_map_container);
        ele_hide($district_map_container);

    } else {

        if( indicator_val == "prs__11_4__stfi_meetings" ){
            ele_hide($report_year);
        }
        ele_hide($state_map_container);
        ele_show($district_map_container);
    }

    if( indicator_val == "prs__11_4__stfi_meetings" || indicator_val == "prs__11_7__meetings_held" || indicator_val == "prs__11_10__meetings_cold_chain" || indicator_val == "prs__12_4__aefi_committee_meetings" ){

        if( indicator_val !== "prs__11_4__stfi_meetings" ){
            ele_show($another_horizontal_container);
        } else if( indicator_val == "prs__11_4__stfi_meetings" && state_ele_val == 'all' ){
            ele_show($another_horizontal_container);
        }

        ele_hide($state_map_container);
        ele_hide($district_map_container);
        ele_hide($map_district_indicator);
        ele_hide($report_year);
    }
});

$(document).on( 'change', '#' + report_year, function () {
    var year_ele_val = $(this).val(),
        report_indicator_label = $report_indicator.find(":selected").attr('data-label');

    //main_chart_title = report_indicator_label + " " + $('option:selected', this).attr('data-label');
    //update_chart_title();

    fetch_data();
});

$(document).on( 'click', '.district_points', function () {
    var clicks = $(this).data('clicks'),
        path = $(this).data('path'),
        text = $(this).data('text'),
        color = $(this).data('color');
    
    if (clicks) {
        // odd clicks
        d3.selectAll(path).style("fill", color);
        d3.selectAll(text).style("display", "block");
        $(this).removeClass('disabled');
        
    } else {
        // even clicks
        d3.selectAll(path).style("fill", 'white');
        d3.selectAll(text).style("display", "none");
        $(this).addClass('disabled');
    }
    $(this).data("clicks", !clicks);
});

$(document).on( 'click', '.district_cold_chain', function () {
    ele_show($loader_div);

    var data_id = $(this).data('id'),
        form_data = new FormData($analytics_form[0]);

    form_data.append('cold_chain_district', data_id);

    $.ajax({
        type        : "post",
        url         : theme_js_vars.ajax_url,
        data        : form_data,
        dataType    : 'json',
        processData : false,
        contentType : false,
        success     : function(response){
            $distrcit_cold_chain_container.html(response.state_profile);
            ele_hide($loader_div);
        },
        error       : function(xhr, status, error){
            alert("Error!" + xhr.status);
            ele_hide($loader_div);
            ele_hide($loader_div);
        }
    });
});

$(document).on( 'change', '#' + report_ch_district, function () {
    // $distrcit_cold_chain_container.html("");
    // $(this).find("option:selected").each(function () { 
    //     var optionValue = $(this).attr("value"); 
    //     if (optionValue) { 
    //         $("#profile_state_container table tbody tr").not(".filter" + optionValue).hide(); 
    //         $(".filter" + optionValue).show();
    //     } else { 
    //         $("#profile_state_container table tbody tr").show(); 
    //     } 
    // }); 

    $distrcit_cold_chain_container.html("");
    ele_show($loader_div);

    var data_id = $(this).val(),
        form_data = new FormData($analytics_form[0]);

    form_data.append('cold_chain_district', data_id);

    if( data_id > 0 ){
        ele_hide($profile_state_container);
        ele_show($distrcit_cold_chain_container);
    } else {
        ele_show($profile_state_container);
        ele_hide($distrcit_cold_chain_container);
    }

    $.ajax({
        type        : "post",
        url         : theme_js_vars.ajax_url,
        data        : form_data,
        dataType    : 'json',
        processData : false,
        contentType : false,
        success     : function(response){
            $distrcit_cold_chain_container.html(response.state_profile);
            ele_hide($loader_div);
        },
        error       : function(xhr, status, error){
            alert("Error!" + xhr.status);
            ele_hide($loader_div);
            ele_hide($loader_div);
        }
    });
});

$(document).on( 'click', '#export_csv_profile', function () {
    export_field_update("export_csv_profile");
    $analytics_form.submit();
});