(function ( $ ) {

	var autoPopulateNexForm = 'form.submit-nex-form .nex_form_auto_populate',
		renderNexForm = 'form.submit-nex-form .nf_multi_step_NEXFORMID :input',
		valArrayList = [],
		fileArrayList = [],
		chkArrayList = [];


    function setValueInInput(){

    	for (var data_key in valArrayList){

    		var previousSet = valArrayList[data_key]['val'],
    			ftype = valArrayList[data_key]['type'],
    			fname = valArrayList[data_key]['name'];


    		if((ftype && ftype == "select")){
           
				var select_options = previousSet;
				$('select[name="'+fname+'"]').find('option').prop('selected',false);
				
				for (var i = 0; i < select_options.length; i++) {
					$('select[name="'+fname+'"]').find('option[value="'+ select_options[i] +'"]').prop('selected',true);
					$('select[name="'+fname+'"]').trigger('change');
				}
			} else if(ftype && ftype == "checkbox"){
           
				var find_checks = previousSet;

				var real_val;
				for( var rvi = 0, len = valArrayList.length; rvi < len; rvi++ ) {
				    if( valArrayList[rvi]['name'] === "real_val__" + fname ) {
				        real_val = valArrayList[rvi];
				        break;
				    }
				}

				if( typeof real_val !== 'undefined' && typeof real_val['val'] !== 'undefined' ){
					find_checks = real_val['val'];
				}

				var checks = '';
				if( typeof find_checks === "object" ){
					checks = find_checks;
				} else if( typeof find_checks !== "undefined" ){
					checks = find_checks.split(', ');
				}

				for (i = 0; i < checks.length; i++) {
					
					//console.log(fname + " => " + checks[i]);

					var the_super_check = $(':checkbox[name="'+fname+'"][value="'+ checks[i].trim() +'"]');
					// console.log(the_super_check);
					// console.log("==========================");
					setTimeout(function(){ the_super_check.closest('label').trigger('click'); }, 100);

					the_super_check.prop('checked',true);
					the_super_check.trigger('change');
					
					the_super_check.parent().addClass('icon-checked');
					
					the_super_check.parent().find('.on-label').show();
					the_super_check.parent().find('.off-label').hide();
					
					the_super_check.parent().find('.on-icon').show();
					the_super_check.parent().find('.off-icon').hide();
				}

		   		// if( typeof checks === "string" ){
		   		// 	checks = checks.trim();

				// 	var the_super_check = $(':checkbox[name="'+fname+'"][value="'+ checks +'"]');
				// 	setTimeout(function(){ the_super_check.closest('label').trigger('click'); }, 100); 

				// 	the_super_check.prop('checked',true);
				// 	the_super_check.trigger('change');
					
				// 	the_super_check.parent().addClass('icon-checked');
					
				// 	the_super_check.parent().find('.on-label').show();
				// 	the_super_check.parent().find('.off-label').hide();
					
				// 	the_super_check.parent().find('.on-icon').show();
				// 	the_super_check.parent().find('.off-icon').hide();

				// } else if( typeof checks === "object" ){
			   	// 	for (i = 0; i < checks.length; i++) {

				// 		var the_super_check = $(':checkbox[name="'+fname+'"][value="'+ checks[i] +'"]');
				// 		setTimeout(function(){ the_super_check.closest('label').trigger('click'); }, 100); 

				// 		the_super_check.prop('checked',true);
				// 		the_super_check.trigger('change');
						
				// 		the_super_check.parent().addClass('icon-checked');
						
				// 		the_super_check.parent().find('.on-label').show();
				// 		the_super_check.parent().find('.off-label').hide();
						
				// 		the_super_check.parent().find('.on-icon').show();
				// 		the_super_check.parent().find('.off-icon').hide();
				// 	}
				// }

			} else if(ftype && ftype == "radio"){

				var real_radio_val;
				for( var rrvi = 0, rlen = valArrayList.length; rrvi < rlen; rrvi++ ) {
				    if( valArrayList[rrvi]['name'] === "real_val__" + fname ) {
				        real_radio_val = valArrayList[rrvi];
				        break;
				    }
				}

				//if( typeof real_radio_val !== 'undefined' && typeof real_radio_val['val'] !== 'undefined' && real_radio_val['val'].length > 0 ){
				if( typeof real_radio_val !== 'undefined' && typeof real_radio_val['val'] !== 'undefined' ){
					previousSet = real_radio_val['val'];
				}

				$(':radio[name="'+fname+'"][value="'+ previousSet +'"]').prop('checked',false);

				var the_super_check = $(':radio[name="'+fname+'"][value="'+ previousSet +'"]');
				setTimeout(function(){ the_super_check.closest('label').trigger('click'); }, 100); 

				the_super_check.prop('checked',true);
				the_super_check.trigger('change');

				the_super_check.parent().addClass('icon-checked');


				the_super_check.parent().find('.on-label').show();
				the_super_check.parent().find('.off-label').hide();

				the_super_check.parent().find('.on-icon').show();
				the_super_check.parent().find('.off-icon').hide();

        	} else {
				
				if(ftype && ftype == "file") {
					if( previousSet.length > 0 ){
						var obj = $('div[name="'+fname+'"]').closest('.form_field');
						nex_form_add_success(obj);
						nex_form_add_file_text(obj, previousSet);
					}
				} else{

					var check_type = $('input[name="'+fname+'"]').attr('type');

					if( check_type != "file" ){

						if( fname.includes("commontable_aligntop") && fname.includes("[details_of_cold_chain_space_available_name_of_block]") && fname.includes("commontable_aligntop[1]") === false ){
							$('.recreate-grid').trigger("click");
						}
	
						if(previousSet)
						{
							if($('input[name="'+fname+'"]').closest('.ui-nex-forms-container').hasClass('m_design'))
								$('input[name="'+fname+'"]').closest('.form_field').addClass('is_focused');	
						}
						
						var get_area_val = previousSet; 
						  if( typeof get_area_val === "undefined" ){
							  get_area_val = "";
						  }
	
						if( !$.isArray(get_area_val) && typeof get_area_val !== 'object' ){
							get_area_val = get_area_val.replace(/\n/g,'[BREAK]');
						}
	
						$('input[name="'+fname+'"]').val(get_area_val); 
						$('textarea[name="'+fname+'"]').html(get_area_val);	
					}
					
					
				}
        	}
	    }
    }

	jQuery(window).on('load', function()
	{
		$.ajax({
		    type: "post",
		    dataType: "json",
		    url: theme_js_vars.ajax_url,
		    data: {action: "send_edit_nex_form_data", record_id: record_id, nex_form_id: nex_form_id, user_id: user_id,mode: 'view'},
		    success: function(response){
		        valArrayList = response.data.form_data;
		        fileArrayList = response.data.file_data;

		        setTimeout(function(){ 
					setValueInInput();
				}, 800);
		    },
			error: function(xhr, status, error){
				alert("Error!" + xhr.status);
			}
		});
	});

	$(document).on( 'click', ".nf_ms_breadcrumb ul li",  function(){

		if( !jQuery(this).hasClass("visited") || !jQuery(this).hasClass("validated") ){
			var the_form = jQuery(this).closest('#nex-forms');
			var the_form_tag = the_form.find('form');
			var jump_to_step = parseInt(jQuery(this).attr('data-show-step'));
			
			var current_step_container = the_form.find('.step:eq('+ (parseInt(the_form.find('.current_step').text())-1) +')');

			if(!jump_to_step)
				jump_to_step = parseInt(jQuery(this).find('a').attr('data-show-step'));

			jQuery(this).closest('li').addClass('current').removeClass('visited');
			jQuery(this).closest('li').nextAll('li').removeClass('visited').removeClass('current');

			nex_form_go_to_step(the_form, jump_to_step, current_step_container, (jump_to_step-1));
			jQuery(this).closest('li').prevAll('li').addClass('visited');
		}
		
	});

	$(".nex-save-step").parent().parent().remove();
	$(".nex-submit").parent().parent().parent().parent().parent().parent().parent().parent().remove();

}( jQuery ));