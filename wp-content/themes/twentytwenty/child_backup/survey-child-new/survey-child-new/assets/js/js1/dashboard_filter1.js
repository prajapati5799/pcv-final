jQuery(document).ready(function($) {

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var max = '';
            var startDate = new Date(data[3]);

            var min = $('#min').datepicker("getDate");
            var max_date = $('#max').datepicker("getDate");

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
            /*if (min == null && max == null) { return true; }
            if (min == null && startDate <= max) { return true;}
            if(max == null && startDate >= min) {return true;}
            if (startDate <= max && startDate >= min) { return true; }
            return false;*/
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var fmax = '';
            var startDate = new Date(data[4]);

            var fmin = $('#fmin').datepicker("getDate");
            var max_date = $('#fmax').datepicker("getDate");

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

            /*if (fmin == null && fmax == null) { return true; }
            if (fmin == null && startDate <= fmax) { return true;}
            if(fmax == null && startDate >= fmin) {return true;}
            if (startDate <= fmax && startDate >= fmin) { return true; }
            return false;*/
        }
    );
    
    $('#min, #max, #fmin, #fmax').datepicker({ dateFormat: 'dd/mm/yy' });

    var table = $('#stateSurvey').DataTable({
        "paging":   true,
        "ordering": true,
        "info":     true,
        "searching": true,
        "order": [[ 1, "asc" ]],
        "dom": 'lrtip',
        /*"columnDefs": [
            { "searchable": false, "targets": [0,1,5,6,7] }
        ],*/

    });

    $('#stateSurvey_length').remove();


    $('#districtSearch').click(function () {

       table.column(2).search($("#searchdistrictinput").val()).draw();

       if($("#astate_filter").val()){
            table.column(0).search($("#astate_filter").val()).draw(); 
       }       

        $("#min").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
        $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });

        $("#fmin").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
        $("#fmax").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });

        //CSV download purpose
        var fusername       = $('#searchdistrictinput').val();
        var dst_sub_from    = $('#min').val();
        var dst_sub_to      = $('#max').val();
        var final_sub_from  = $('#fmin').val();
        var final_sub_to    = $('#fmax').val();
        var fstate          = $('#astate_filter').val();

        //Set value in form
        $('.fusername').val(fusername);
        $('.dst_sub_from').val(dst_sub_from);
        $('.dst_sub_to').val(dst_sub_to);
        $('.final_sub_from').val(final_sub_from);
        $('.final_sub_to').val(final_sub_to);
        $('.fstate').val(fstate);


    });

    // EDIT: Capture enter press as well
    $("#searchdistrictinput").keypress(function(e) {
        // You can use $(this) here, since this once again refers to your text input            
        if(e.which === 13) {
            e.preventDefault(); // Prevent form submit
            table.search($(this).val()).draw();
        }
    });




});

