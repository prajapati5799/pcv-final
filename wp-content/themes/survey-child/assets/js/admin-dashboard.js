"use strict";
var ctx, ctx1, load_timer, search_timer = "",
    randomScalingFactor = function() {
        return Math.round(100 * Math.random())
    },
    lineChartData = "",
    form_analytics_chart = "",
    chart_options = {
        responsive: !0,
        legend: {
            display: !1
        },
        tooltips: {
            intersect: !1
        }
    };

function nf_print_chart(e, t) {
    var a = {
        action: "nf_print_chart",
        ajax: 1,
        form_id: t || 0,
        year_selected: jQuery('select[name="stats_per_year"]').val(),
        month_selected: jQuery('select[name="stats_per_month"]').val(),
        chart_type: e
    };
    jQuery(".chart-container").addClass("faded"), jQuery.post(theme_js_vars.ajax_url, a, function(t) {
        jQuery(".chart-container .data_set").html(t);
        form_analytics_chart.destroy();
        jQuery(".chart-container").removeClass("faded");
        form_analytics_chart = new Chart(ctx, {
            type: e,
            data: lineChartData,
            options: chart_options
        })
    })
}

jQuery(document).ready(function($) {

    ctx = document.getElementById("chart_canvas").getContext("2d"), 
    form_analytics_chart = new Chart(ctx, {
        type: "line",
        data: lineChartData,
        options: chart_options
    });

    ctx1 = document.getElementById("chart_canvas1").getContext("2d"), 
    new Chart(ctx1, {
        type: "doughnut",
        data: {
            labels: theme_js_vars.dashboard_pie_chart.labels,
            datasets: [
            {
                data: dashboard_pie_record,
                backgroundColor: theme_js_vars.dashboard_pie_chart.backgroundColor,
                hoverBackgroundColor: theme_js_vars.dashboard_pie_chart.hoverBackgroundColor,
                borderColor : theme_js_vars.dashboard_pie_chart.borderColor
            }]
        },
        options: chart_options
    });

    nf_print_chart('line', $(".database_table.wap_nex_forms tr.active").attr("id"));

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var max = '';
            var startDate = new Date(data[2]);

            var min = $('#date-district-min').datepicker("getDate");
            var max_date = $('#date-district-max').datepicker("getDate");

            if (min != null || max_date != null) {

                if( Date.parse(startDate) ){

                    if( typeof max_date !== 'undefined' && max_date != null ){
                        max_date.setHours(23);
                        max_date.setMinutes(59);
                        max_date.setSeconds(59);
    
                        max = new Date(max_date);
                    }
    
                    if (min && !isNaN(min)) {
                        if (startDate < min) {
                            return false;
                        }
                    }
    
                    if (max && !isNaN(max)) {
                        if (startDate > max) {
                            return false;
                        }
                    }
    
                    return true;
                }

                return false;
            }

            return true;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var fmax = '';
            var startDate = new Date(data[3]);

            var fmin = $('#date-final-min').datepicker("getDate");
            var max_date = $('#date-final-max').datepicker("getDate");

            if (fmin != null || max_date != null) {

                if( Date.parse(startDate) ){

                    if( typeof max_date !== 'undefined' && max_date != null ){
                        max_date.setHours(23);
                        max_date.setMinutes(59);
                        max_date.setSeconds(59);
    
                        fmax = new Date(max_date);
                    }
    
                    if (fmin && !isNaN(fmin)) {
                        if (startDate < fmin) {
                            return false;
                        }
                    }
    
                    if (fmax && !isNaN(fmax)) {
                        if (startDate > fmax) {
                            return false;
                        }
                    }
    
                    return true;
                }

                return false;
            }

            return true;
        }
    );
    
    $('#date-district-min, #date-district-max, #date-final-min, #date-final-max').datepicker({ dateFormat: 'dd/mm/yy' });

    var table = $('#admin_dashboard_tbl').DataTable({
        "paging":   true,
        "ordering": true,
        "info":     true,
        "searching": true,
        "order": [[ 1, "asc" ]],
        "dom": 'lrtip',
    });

    var firstDay = new Date();
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    table.column(0).search(nextWeek).draw();

    $('#admin_dashboard_tbl_length').remove();
    $('#admin_dashboard_tbl_wrapper tbody tr').remove();
    $('#admin_dashboard_tbl_info').html("");
    $('#admin_dashboard_tbl_paginate').html("");


    $('#dashboard-filter-btn').click(function () {

        table.column(0).search($("#dashboard-search-string").val()).draw();
        table.column(1).search($("#dashboard-search-string").val()).draw();

        if($("#dashboard_state_filter").val()){
            table.column(0).search($("#dashboard_state_filter").val()).draw(); 
        }

        table.draw();

        //CSV download purpose
        var fusername       = $('#dashboard-search-string').val();
        var dst_sub_from    = $('#date-district-min').val();
        var dst_sub_to      = $('#date-district-max').val();
        var final_sub_from  = $('#date-final-min').val();
        var final_sub_to    = $('#date-final-max').val();
        var fstate          = $('#dashboard_state_filter').val();

        //Set value in form
        $('.fusername').val(fusername);
        $('.dst_sub_from').val(dst_sub_from);
        $('.dst_sub_to').val(dst_sub_to);
        $('.final_sub_from').val(final_sub_from);
        $('.final_sub_to').val(final_sub_to);
        $('.fstate').val(fstate);
    });

    $("#dashboard-search-string").keypress(function(e) {
        if(e.which === 13) {
            e.preventDefault();
            table.search($(this).val()).draw();
        }
    });

    $(document).on("click", ".switch_chart", function() {
        $("#chart_canvas").removeClass("hide_chart"), "global" == $(this).attr("data-chart-type") && $("#chart_canvas").addClass("hide_chart"), $(".switch_chart").removeClass("active"), $(this).addClass("active"), nf_print_chart($(this).attr("data-chart-type"), $(".database_table.wap_nex_forms tr.active").attr("id"))
    }),
    
    $(document).on("change", 'select[name="stats_per_form"], select[name="stats_per_year"], select[name="stats_per_month"]', function() {
        nf_print_chart($(".switch_chart.active").attr("data-chart-type"), $('select[name="stats_per_form"] option:selected').val())
    });
});

