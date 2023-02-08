jQuery(document).ready(function($) {

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var max = '';
            var startDate = new Date(data[9]);

            var min = $('#min').datepicker("getDate");
            var max_date = $('#max').datepicker("getDate");

            if (min != null || max_date != null) {
                
                if (Date.parse(startDate)) {

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
            var startDate = new Date(data[10]);

            var fmin = $('#fmin').datepicker("getDate");
            var max_date = $('#fmax').datepicker("getDate");

            if (fmin != null || max_date != null) {

                if (Date.parse(startDate)) {

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

    var state_datatable = $('#state_datatable').DataTable({
        "paging":   true,
        "ordering": true,
        "info":     true,
        "searching": true,
        "order": [[ 1, "asc" ]],
        "dom": 'lrtip',
        "columnDefs": [
            {
                "targets": [ 9 ],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [ 10 ],
                "visible": false,
                "searchable": true
            }
        ]

    });

    $('#state_datatable_length').remove();

    $('#min, #max, #fmin, #fmax').datepicker({ dateFormat: 'dd/mm/yy' });

    $('#districtSearch').click(function () {

        $("#min").datepicker({ onSelect: function () { state_datatable.draw(); }, changeMonth: true, changeYear: true });
        $("#max").datepicker({ onSelect: function () { state_datatable.draw(); }, changeMonth: true, changeYear: true });

        $("#fmin").datepicker({ onSelect: function () { state_datatable.draw(); }, changeMonth: true, changeYear: true });
        $("#fmax").datepicker({ onSelect: function () { state_datatable.draw(); }, changeMonth: true, changeYear: true });

        state_datatable.draw();
        //CSV download purpose
        var dst_sub_from    = $('#min').val();
        var dst_sub_to      = $('#max').val();
        var final_sub_from  = $('#fmin').val();
        var final_sub_to    = $('#fmax').val();

        //Set value in form
        $('.dst_sub_from').val(dst_sub_from);
        $('.dst_sub_to').val(dst_sub_to);
        $('.final_sub_from').val(final_sub_from);
        $('.final_sub_to').val(final_sub_to);


    });

    // EDIT: Capture enter press as well
    $("#searchdistrictinput").keypress(function(e) {
        // You can use $(this) here, since this once again refers to your text input            
        if(e.which === 13) {
            e.preventDefault(); // Prevent form submit
            state_datatable.search($(this).val()).draw();
        }
    });
});
