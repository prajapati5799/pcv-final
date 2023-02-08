(function ( $ ) {

	var autoPopulateNexForm = 'form.submit-nex-form .nex_form_auto_populate',
		renderNexForm = 'form.submit-nex-form .nf_multi_step_NEXFORMID :input',
		valArrayList = [],
		fileArrayList = [],
		chkArrayList = [];

    function inputStoreSet(cname, cvalue, type) {
        //console.log(cname + " => " + cvalue);
		
		if( type == 'file' ){
			var new_val = $("#file_"+cname).html();
			if( typeof new_val !== "undefined" ){
				cvalue = new_val;
			} else {
				cvalue = "";
			}
		}

        var found = false;
        if( typeof cvalue !== "undefined" ){
	        
	        for (var key in valArrayList){
		    	if( valArrayList[key]['name'] == cname ){
		    		valArrayList[key]['val'] = cvalue;
		    		found = true;
		    	}
		    }

		    if( !found ){
		    	valArrayList.push({ name: cname, val: cvalue, type: type });
		    }
	    }
    };

	function store(name, type, dom) {
        
		if($(dom).is('select'))
		 	type = 'select';
			
		if(type === "select" && $(dom).attr('multiple'))
		{
			var select_options = [];
			$(dom).find('option:selected').each(
				function()
				{
					select_options.push(jQuery(this).attr('value'));	
				}
			);

			inputStoreSet(name, select_options, type);
		}
		else if(type === "checkbox")
		{
			if(jQuery.inArray( $(dom).attr("name"), chkArrayList ) !== -1){
				return false;
			}

			chkArrayList.push($(dom).attr("name"));

			var checkboxes = $(dom).closest('.input_container');
			var checks = [];

			checkboxes.find('input[type="checkbox"]').each(
				function()
				{
					if(jQuery(this).attr('checked')=='checked'){
						checks.push(jQuery(this).val());
					} else if( typeof jQuery(this).attr('checked') == "undefined" ){
						if( jQuery(this).parent().parent().parent(".radio_selected").length ){
							checks.push(jQuery(this).val());
						}
					}
				}
			);

			inputStoreSet(name, checks, type);
		}
		else if(type === "radio") 
		{
          	inputStoreSet(name, $(dom).val(), type);
        } 
		else 
		{
		  	var get_area_val = $(dom).attr('value');
		  	
		  	if( typeof get_area_val === "undefined" || get_area_val.length == 0 ){
		  		get_area_val = dom.value;
		  	}

		  	if( typeof get_area_val === "undefined" ){
		  		get_area_val = "";
		  	}

			if( !$.isArray(get_area_val) && typeof get_area_val !== 'object' ){
				get_area_val = get_area_val.replace(/\n/g,'[BREAK]');
			}
			
			inputStoreSet(name, get_area_val, type);
        }
    };

    function findFormInput(class_id){

    	$(class_id).each(
		    function(index){  

		        var ele = $(this),
		        	ele_type = ele.attr('type'),
		        	ele_name = ele.attr('name');

		        if( typeof ele_type === "undefined" && typeof ele_name !== "undefined" ){
					store(ele_name, ele_type, this);
		        } else if( typeof ele_type !== "undefined" && typeof ele_name !== "undefined" ){
					store(ele_name, ele_type, this);
		        }
		    }
		);
    };


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
					// no action
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
							get_area_val = get_area_val.replace(/\[BREAK\]/g,'\n'); 
						}

						$('input[name="'+fname+'"]').val(get_area_val); 
						$('textarea[name="'+fname+'"]').html(get_area_val);	
					}
				}
        	}
	    }
    }

    function setArrayListVariableValues(){
    	$.ajax({
		    type: "post",
		    dataType: "json",
		    url: theme_js_vars.ajax_url,
		    data: {action: "store_edit_nex_form_data",nex_form_id: $('input[name="nex_forms_Id"]').val(),record_id: record_id,user_id: user_id,data: valArrayList,mode: 'edit'},
		    success: function(response){
		    },
			error: function(xhr, status, error){
				alert("Error!" + xhr.status);
			}
		});

		chkArrayList = [];
    };


	jQuery(window).on('load', function()
	{
		$(".submit-nex-form").append('<div id="nex-form-files"></div>');
		$.ajax({
		    type: "post",
		    dataType: "json",
		    url: theme_js_vars.ajax_url,
		    data: {action: "send_edit_nex_form_data", record_id: record_id, nex_form_id: nex_form_id, user_id: user_id,mode: 'edit'},
		    success: function(response){
		        valArrayList = response.data.form_data;
				fileArrayList = response.data.file_data;

				$("#nex-form-files").html(response.file_html_data);
				
				if( response.is_redirect ){
					window.location.href = response.redirect_url;
				}

				if( response.data.form_data.length == 0 ){
					window.location.href = response.redirect_url;
				}

		        setTimeout(function(){ 
					setValueInInput();
				}, 800);
		    },
			error: function(xhr, status, error){
				alert("Error!" + xhr.status);
			}
		});
	});

	$(document).on( 'click', ".nex-step",  function(){
		var current_step = $(".current_step").html();
		var newRenderNexForm = renderNexForm.replace("NEXFORMID", current_step);
		
		findFormInput(newRenderNexForm);
		setTimeout(function(){ 
			setArrayListVariableValues();
		}, 1000);
	});

	$(document).on( 'click', ".nex-save-step",  function(){
		var current_step = $(".current_step").html();
		var newRenderNexForm = renderNexForm.replace("NEXFORMID", current_step);
		
		findFormInput(newRenderNexForm);
		setTimeout(function(){ 
			setArrayListVariableValues();
			alert("Application saved successfully.");
		}, 1000);

		return false;
	});

	$(document).on( 'click', ".nex-submit",  function(){
		if ( confirm('Are you sure want to submit application?') ){

			var current_step = $(".current_step").html();
			var newRenderNexForm = renderNexForm.replace("NEXFORMID", current_step);
			
			findFormInput(newRenderNexForm);
	        
	        $.ajax({
			    type: "post",
			    dataType: "json",
			    url: theme_js_vars.ajax_url,
			    data: {action: "store_edit_nex_form_data",nex_form_id: $('input[name="nex_forms_Id"]').val(),record_id: record_id,user_id: user_id,data: valArrayList,mode: 'edit'},
			    success: function(response){},
				error: function(xhr, status, error){
					alert("Error!" + xhr.status);
				}
			});

			return true;
	    }

	    return false;
	});
	
	$(document).on( 'change', "input[type='file']",  function(){
		var required_ext = $(this).parent().parent().find('.get_file_ext').html(),
		required_ext_split = required_ext.split('\n'),
		required_ext_split_final = required_ext_split.filter(function (e) {return e.length != 0;}),
		current_val_ext = $(this).val().split('.').pop().toLowerCase(),
		current_file_name = $(this).attr('name'),
		user_id = $("input[name=user_id]").val(),
		nex_form_id = $("input[name=nex_forms_Id]").val(),
		
		obj = $(this).closest('.form_field'),
		error  = $(this).closest('.form_field').find('.error_message').attr('data-secondary-message');

		nex_form_clear_error(obj);
		nex_form_clear_success(obj);
		
		if($.inArray(current_val_ext, required_ext_split_final) != -1) {
			var file_data = $(this).prop('files')[0];   
			var form_data = new FormData();                  
			form_data.append(current_file_name, file_data);
			form_data.append('user_id', user_id);
			form_data.append('nex_form_id', nex_form_id);
			form_data.append('action', 'action_upload_form_file');

			nex_form_add_progressbar(obj);
			
			$.ajax({
				xhr: function() {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener("progress", function(evt) {
						if (evt.lengthComputable) {
							var percentComplete = ((evt.loaded / evt.total) * 100);
							nex_form_add_progressbar_percentage(obj, percentComplete);
						}
					}, false);
					return xhr;
				},
				url: theme_js_vars.ajax_url,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				beforeSend: function(){
					nex_form_add_progressbar_text(obj);
				},
				success: function(php_script_response){
					$("#nex-form-files").html(php_script_response.html);

					nex_form_add_success(obj);
					nex_form_add_file_text(obj, php_script_response.file_array[0].val);
				},
				error: function(xhr, status, error){
					var ajax_error = "Status: " + xhr.status + "\nError: " + error;
					alert(ajax_error);
					nex_form_clear_error(obj);
					nex_form_add_progressbar(obj);
					nex_form_add_error(obj, ajax_error);
				}
			});
		} else {
			nex_form_add_error(obj, error);
		}
	    return false;
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

	//$(".nex-submit").parent().parent().parent().parent().parent().parent().parent().parent().remove();

}( jQuery ));