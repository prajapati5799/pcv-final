var highcharts_map_coordinates = [
    ['in-an', 0],
    ['in-wb', 1],
    ['in-ld', 2],
    ['in-5390', 3],
    ['in-py', 4],
    ['in-3464', 5],
    ['in-mz', 6],
    ['in-as', 7],
    ['in-pb', 8],
    ['in-ga', 9],
    ['in-2984', 10],
    ['in-jk', 11],
    ['in-hr', 12],
    ['in-nl', 13],
    ['in-mn', 14],
    ['in-tr', 15],
    ['in-mp', 16],
    ['in-ct', 17],
    ['in-ar', 18],
    ['in-ml', 19],
    ['in-kl', 20],
    ['in-tn', 21],
    ['in-ap', 22],
    ['in-ka', 23],
    ['in-mh', 24],
    ['in-or', 25],
    ['in-dn', 26],
    ['in-dl', 27],
    ['in-hp', 28],
    ['in-rj', 29],
    ['in-up', 30],
    ['in-ut', 31],
    ['in-jh', 32],
    ['in-ch', 33],
    ['in-br', 34,'#a62c11'],
    ['in-sk', 35,'#e32995'],
    ['in-ldk', 36],
    ['in-tel', 37],
];

function getWordCount( wordString ) {
    
    var words = wordString.split(" ");
    
    words = words.filter(function( words ) { 
        return words.length > 0
    }).length;

    return words;
}

function getWordFromString( wordString, limit ) {
    
    var words = wordString.split(" ");
    words = words.filter(function( words ) { 
        return words.length > 0
    });
    var limited_words = words.slice(0, limit);
    limited_words = limited_words.join(" ");
    return limited_words;
}

var websafeUnicode = function(oval) {
    return oval;
    
    if( oval.length > 0 ){
        
        /*oval = oval.replace('u2010',"-");
        oval = oval.replace('u2018',"'");
        oval = oval.replace('u2019',"'");
        //oval = oval.replace(/[\u2018\u2019\u201B]/g,"'");

        return oval;*/

        //strip iso-8859-1 and windows-1252 control characters
        oval = oval.replace(/[\u0081\u008D\u008F\u0090\u009D]/g,'');
        //Shift iso-8859-1 and windows-1252 up to unicode websafe equivalents
        oval = oval.replace(/[\u0080]/g,'\u20AC'); //euro sign
        oval = oval.replace(/[\u0082]/g,'\u201A'); //single low-9 quotation mark
        oval = oval.replace(/[\u0083]/g,'\u0192'); //florin currency symbol
        oval = oval.replace(/[\u0084]/g,'\u201E'); //double low-9 quotation mark
        oval = oval.replace(/[\u0085]/g,'\u2026'); //horizontal ellipsis
        oval = oval.replace(/[\u0086]/g,'\u2020'); //dagger
        oval = oval.replace(/[\u0087]/g,'\u2021'); //double dagger
        oval = oval.replace(/[\u0088]/g,'\u02C6'); //modifier letter circumflex accent
        oval = oval.replace(/[\u0089]/g,'\u2030'); //per mille sign
        oval = oval.replace(/[\u008A]/g,'\u0160'); //latin capital letter s with caron
        oval = oval.replace(/[\u008B]/g,'\u2039'); //single left-pointing angle quotation mark
        oval = oval.replace(/[\u008C]/g,'\u0152'); //latin capital ligature oe
        oval = oval.replace(/[\u008E]/g,'\u017D'); //latin capital letter z with caron
        oval = oval.replace(/[\u0091]/g,'\u2018'); //left single quotation mark
        oval = oval.replace(/[\u0092]/g,'\u2019'); //right single quotation mark
        oval = oval.replace(/[\u0093]/g,'\u201C'); //left double quotation mark
        oval = oval.replace(/[\u0094]/g,'\u201D'); //right double quotation mark
        oval = oval.replace(/[\u0095]/g,'\u2022'); //bullet
        oval = oval.replace(/[\u0096]/g,'\u2013'); //en dash
        oval = oval.replace(/[\u0097]/g,'\u2014'); //em dash
        oval = oval.replace(/[\u0098]/g,'\u02DC'); //small tilde
        oval = oval.replace(/[\u0099]/g,'\u2122'); //trade mark sign
        oval = oval.replace(/[\u009A]/g,'\u0161'); //latin small letter s with caron
        oval = oval.replace(/[\u009B]/g,'\u203A'); //single right-pointing angle quotation mark
        oval = oval.replace(/[\u009C]/g,'\u0153'); //latin small ligature oe
        oval = oval.replace(/[\u009E]/g,'\u017E'); //latin small letter z with caron
        oval = oval.replace(/[\u009F]/g,'\u0178'); //latin capital letter y with diaeresis
        //Replace nonbreaking space with regular space
        oval = oval.replace(/[\u00A0]/g,'\u0020');
        //Shift common punctiation down to ASCII
            //soft hyphen, hyphen, non-breaking-hyphen, figure dash, en dash, em dash, horizontal bar,
        //hyphen bullet, small em dash, small hyphen-minus and fullwidth hyphen-minus to hyphen-minus
        oval = oval.replace(/[\u00AD\u2010\u2011\u2012\u2013\u2014\u2015\u2043\uFE58\uFE63\uFE0D]/g,'\u002D');
        //left, right and high-reversed-9 single quotation mark to apostrophe
        oval = oval.replace(/[\u2018\u2019\u201B]/g,'\u0027');
        //left, right and high-reversed-9 double quotation mark to quotation mark
        oval = oval.replace(/[\u201C\u201D\u201F]/g,'\u0022');
        //single and double low-9 quotation mark to comma
        oval = oval.replace(/[\u201A\u201E]/g,'\u002C');
        //$(this).val(oval);
        return oval;
    }
};

function nex_form_go_to_step(container, go_to_step, current_step_container, last_visited_step, direction){						
	var the_form_tag = container.find('form');
	var the_form = container.find('.ui-nex-forms-container');
	var jump_to_step = (go_to_step-1);
	
	var to_step = the_form.find('.step:eq('+ (jump_to_step) +')');
	
	var current_step_num = parseInt(container.find('.current_step').text());
	var last_step_num = parseInt(container.find('.last_visited_step').text())
	
	if(direction=='back'){

		if(!to_step.hasClass('validated')){

			jump_to_step = jump_to_step-1;
			//if(go_to_step<parseInt(container.find('.current_step').text()))
			//	jump_to_step = jump_to_step+1;
			
			var get_valid_step = container.find('div.nf_ms_breadcrumb ul').find('li.current').prevAll('li.visited.validated').first();
			
			if(get_valid_step){
				get_valid_step.trigger('click')
			} else {

            }

			return //nf_go_to_step(container, jump_to_step, current_step_container, last_visited_step);
        }
    }
		
    if(!last_visited_step){
        last_visited_step = parseInt(container.find('.current_step').text());
    }
        

    container.find('.last_visited_step').text(last_visited_step);
    container.find('.current_step').text(go_to_step);

    container.find('input[name="ms_current_step"]').val(go_to_step);
    setTimeout(function() {container.find('input[name="ms_current_step"]').trigger('change')},400);

    var step_in_transition = (the_form.find('.step_transition_in').text()) ? the_form.find('.step_transition_in').text() : 'fadeIn';
    var step_out_transition = (the_form.find('.step_transition_out').text()) ? the_form.find('.step_transition_out').text() : 'fadeOut';

    the_form_tag.css('min-height',to_step.outerHeight()+'px')
    current_step_container.addClass('animated').addClass(step_out_transition);

    var set_total_steps = parseInt(nf_get_total_steps(the_form));
    var get_percentage = Math.round(100/(set_total_steps));
    var set_percentage = parseInt(get_percentage*(jump_to_step));

    if(set_percentage>=100){
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage').css('width','100%');
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage span').text('100%');	
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage').addClass('total_percent');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage').css('width','100%');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage span').text('100%');	
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage').addClass('total_percent');
    } else if(set_percentage<=0){
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage').css('width','5%');
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage span').text('0%');	
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage').css('width','5%');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage span').text('0%');	
    } else {
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage').css('width',(set_percentage)+'%');
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage span').text((set_percentage)+'%');
        container.find('div.nf_ms_breadcrumb .nf_progressbar_percentage').removeClass('total_percent');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage').css('width',(set_percentage)+'%');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage span').text((set_percentage)+'%');
        container.find('div.nf_step_breadcrumb .nf_progressbar_percentage').removeClass('total_percent');	
    }

    container.find('div.nf_ms_breadcrumb ul').find('li').removeClass('current');
    container.find('div.nf_ms_breadcrumb ul').find('li:eq('+ (jump_to_step) +')').addClass('current');
    
    container.find('div.nf_step_breadcrumb ol').find('li').removeClass('current');
    container.find('div.nf_step_breadcrumb ol').find('li:eq('+ (jump_to_step) +')').addClass('current');

    for(var i=jump_to_step;i>0;i--){
        container.find('div.nf_ms_breadcrumb ul').find('li:eq('+ (i-1) +')').addClass('visited');
        container.find('div.nf_step_breadcrumb ol').find('li:eq('+ (i-1) +')').addClass('visited');
        
        container.find('.step:eq('+ (i-1) +')').addClass('step_visited');
    }

    container.find('div.nf_ms_breadcrumb ul .current').removeClass('visited');
    
    container.find('div.nf_ms_breadcrumb ul li.visited:not(.validated)').removeClass('visited');
    
    container.find('div.nf_step_breadcrumb ol .current').removeClass('visited');

    var get_container = container.find('.ui-nex-forms-container');
    var has_time_limit = (get_container.hasClass('has_time_limit')) ? true : false;
    var timer_type = (get_container.hasClass('timer_overall')) ? 'overall' : 'per_step';
    var get_step_time_limit = to_step.attr('data-step-time-limit');
    
    var started = (get_container.attr('data-timer-started')=='true') ? true : false;
    var ended = (get_container.attr('data-timer-ended')=='true') ? true : false;
    
    var timer = get_container.find('.nf-timer');

    if(get_step_time_limit){
        var set_time_limit = (get_step_time_limit) ? parseInt(get_step_time_limit) : false;
    }
        
    if(timer_type=='per_step' && has_time_limit && ended==false){
        nf_timer_rebuild('ui',timer, true, timer_type, set_time_limit);
    }

    setTimeout(function() { current_step_container.hide()},301);
    setTimeout(function() { current_step_container.removeClass('animated').removeClass(step_out_transition) },1000)

    setTimeout(function() { 
        the_form.find('.step').hide();
        the_form.find('.step').removeClass('animated').removeClass(step_out_transition);
        to_step.addClass('animated').addClass(step_in_transition).show(); 
    },300);

    setTimeout(function() { 
        to_step.removeClass('animated').removeClass(step_in_transition); 
    },1000);

    var scroll_to_top = true;

    if(container.find('#ms_scroll_to_top').text()=='no'){
        scroll_to_top = false;
    }

    if(scroll_to_top){
        var offset = container.offset();
        setTimeout(function()
        {
            if(offset){
                jQuery("html, body").animate({ scrollTop:offset.top-250 },300 );
            }
        },300);
    }
}

function nex_form_add_success(obj){
    obj.addClass('has_success');
    obj.removeClass('has_error');
    obj.find('.success_msg.modern').addClass('animated').addClass('bounceIn');
    $('.appendix_field .success_msg').remove();
    obj.find('.error_message').parent().after('<div class="success_msg modern extra_padding"><i class="fa fa-check"></i></div>');	
    obj.find(".fileinput").addClass("fileinput-exists").removeClass("fileinput-new");
    obj.find(".fileinput").trigger("change.bs.fileinput");
}

function nex_form_clear_success(obj){
    obj.removeClass('has_success');
	obj.find('.success_msg').remove();
}

function nex_form_add_error(obj, error){
    obj.addClass('nf-has-error');
    obj.find('.success_msg').remove();
    obj.find('.error_message').parent().after('<div data-toggle="tooltip" data-title="'+ error +'" title="'+ error +'" class="error_msg modern extra_padding"><i class="fa fa-warning"></i></div></div>');
    //obj.removeClass('has_success');
    //obj.addClass('has_error');
    $('.error_msg[data-toggle="tooltip"]').tooltip_bs();
}

function nex_form_clear_error(obj){
    obj.removeClass('nf-has-error');
	obj.find('.error_msg').remove();
}

function nex_form_add_progressbar(obj){
    obj.find(".file-progressing").remove();
	obj.find(".fileinput").append('<div class="file-progressing"></div>');
}

function nex_form_add_progressbar_text(obj){
    obj.find(".file-progressing").html('Uploading(<span class="file-uploading-percentage">0%</span>)...');
}

function nex_form_add_progressbar_percentage(obj, percentComplete){
    obj.find(".file-uploading-percentage").html(percentComplete+'%');
}

function nex_form_add_file_text(obj, file){
    obj.find(".fileinput-filename").text(file);
    obj.find(".fileinput").removeClass("fileinput-new").addClass("fileinput-exists");
    setTimeout(
        function(){
            if( obj.find(".file-progressing").length === 0 ){
                nex_form_add_progressbar(obj);
            }
            obj.find(".file-progressing").html('<a href="'+ file +'" target="__blank">View/Download</a>');
        },900
    );
}

$("#nex-forms").on( 'keyup', "input[type='text'], textarea",  function(){

    if( !$(this).hasClass('numbers_only') && !$(this).hasClass('email') ){
        var error_msg = "Allow only these(.,-%!()&@) special characters.";
        
        nex_form_clear_error($(this).closest('.form_field'));
        $(".nex-step, .nex-save-step, .nex-submit, .prev-step, .nf_ms_breadcrumb ul li").attr("disabled", false).css('pointer-events', 'unset');

        //$(this).next('span').remove();
        var inputVal = $(this).val();
        var characterReg = /^\s*[a-zA-Z0-9,\s\.\,\-\%\!\(\)\&\@]+\s*$/;
        if( 
            typeof inputVal !== "undefined" && 
            typeof inputVal.length !== "undefined" && 
            inputVal.length > 0 && 
            !characterReg.test(inputVal) 
        ) {
            
            nex_form_add_error($(this).closest('.form_field'), error_msg);

            //$(this).after('<span class="error error-keyup-2">'+ error_msg +'</span>');
            $(".nex-step, .nex-save-step, .nex-submit, .prev-step, .nf_ms_breadcrumb ul li").css('pointer-events', 'none').attr("disabled", true);
        }
    }
});

function checkconnection() {
    var status = navigator.onLine;
    if (status) {
        //console.log('Internet connected !!');
    } else {
        alert('No internet Connection !!');
        window.location.reload();
    }
}

setInterval(function(){ 
	checkconnection();
}, 5000);
