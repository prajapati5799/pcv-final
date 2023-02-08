"use strict";!function(n){function i(t,e){var s;(function(t,e){t.addClass("bootstrap-colorpalette");var s=[];n.each(e,function(t,e){s.push("<div>"),n.each(e,function(t,e){var i=['<button type="button" class="btn-color" style="background-color:',e,'" data-value="',e,'" title="',e,'"></button>'].join("");s.push(i)}),s.push("</div>")}),t.html(s.join(""))})(this.element=t,e&&e.colors||o),(s=this).element.on("click",function(t){var e,i=n(t.target).closest(".btn-color");i[0]&&(e=i.attr("data-value"),s.value=e,s.element.trigger({type:"selectColor",color:e,element:s.element}))})}var o=[["#000000","#424242","#636363","#9C9C94","#CEC6CE","#EFEFEF","#F7F7F7","#FFFFFF"],["#FF0000","#FF9C00","#FFFF00","#00FF00","#00FFFF","#0000FF","#9C00FF","#FF00FF"],["#F7C6CE","#FFE7CE","#FFEFC6","#D6EFD6","#CEDEE7","#CEE7F7","#D6D6E7","#E7D6DE"],["#E79C9C","#FFC69C","#FFE79C","#B5D6A5","#A5C6CE","#9CC6EF","#B5A5D6","#D6A5BD"],["#E76363","#F7AD6B","#FFD663","#94BD7B","#73A5AD","#6BADDE","#8C7BC6","#C67BA5"],["#CE0000","#E79439","#EFC631","#6BA54A","#4A7B8C","#3984C6","#634AA5","#A54A7B"],["#9C0000","#B56308","#BD9400","#397B21","#104A5A","#085294","#311873","#731842"],["#630000","#7B3900","#846300","#295218","#083139","#003163","#21104A","#4A1031"]];n.fn.extend({colorPalette:function(e){return this.each(function(){var t=n(this);t.data("colorpalette")||t.data("colorpalette",new i(t,e))}),this}})}(jQuery),function(l){function s(t){this.value={h:0,s:0,b:0,a:1},this.origFormat=null,t&&(void 0!==t.toLowerCase?this.setColor(t):void 0!==t.h&&(this.value=t))}function o(t,e){this.element=l(t).addClass("colorpicker-element"),this.options=l.extend({},i,this.element.data(),e),this.component=this.options.component,this.component=!1!==this.component&&this.element.find(this.component),this.component&&0===this.component.length&&(this.component=!1),this.container=!0===this.options.container?this.element:this.options.container,this.container=!1!==this.container&&l(this.container),this.input=this.element.is("input")?this.element:!!this.options.input&&this.element.find(this.options.input),this.input&&0===this.input.length&&(this.input=!1),this.color=new s(!1!==this.options.color?this.options.color:this.getValue()),this.format=!1!==this.options.format?this.options.format:this.color.origFormat,this.picker=l(this.options.template),this.picker.addClass(this.options.inline?"colorpicker-inline colorpicker-visible":"colorpicker-hidden"),this.options.horizontal&&this.picker.addClass("colorpicker-horizontal"),"rgba"!==this.format&&"hsla"!==this.format||this.picker.addClass("colorpicker-with-alpha"),this.picker.on("mousedown.colorpicker",l.proxy(this.mousedown,this)),this.picker.appendTo(this.container?this.container:l("body")),!1!==this.input&&(this.input.on({"keyup.colorpicker":l.proxy(this.keyup,this)}),!1===this.component&&this.element.on({"focus.colorpicker":l.proxy(this.show,this)}),!1===this.options.inline&&this.element.on({"focusout.colorpicker":l.proxy(this.hide,this)})),!1!==this.component&&this.component.on({"click.colorpicker":l.proxy(this.show,this)}),!1===this.input&&!1===this.component&&this.element.on({"click.colorpicker":l.proxy(this.show,this)}),this.update(),l(l.proxy(function(){this.element.trigger("create")},this))}var i={horizontal:!(s.prototype={constructor:s,_sanitizeNumber:function(t){return"number"==typeof t?t:!isNaN(t)&&null!==t&&""!==t&&void 0!==t&&void 0!==t.toLowerCase?parseFloat(t):1},setColor:function(t){t=t.toLowerCase(),this.value=this.stringToHSB(t)||{h:0,s:0,b:0,a:1}},stringToHSB:function(o){o=o.toLowerCase();var a=this,r=!1;return l.each(this.stringParsers,function(t,e){var i=e.re.exec(o),s=i&&e.parse.apply(a,[i]),n=e.format||"rgba";return!s||(r=n.match(/hsla?/)?a.RGBtoHSB.apply(a,a.HSLtoRGB.apply(a,s)):a.RGBtoHSB.apply(a,s),a.origFormat=n,!1)}),r},setHue:function(t){this.value.h=1-t},setSaturation:function(t){this.value.s=t},setBrightness:function(t){this.value.b=1-t},setAlpha:function(t){this.value.a=parseInt(100*(1-t),10)/100},toRGB:function(t,e,i,s){var n,o,a,r,l,h,c,u;switch(t=t||this.value.h,e=e||this.value.s,i=i||this.value.b,s=s||this.value.a,t&&void 0===e&&void 0===i&&(e=t.s,i=t.v,t=t.h),h=i*(1-e),c=i*(1-(l=6*t-(r=Math.floor(6*t)))*e),u=i*(1-(1-l)*e),r%6){case 0:n=i,o=u,a=h;break;case 1:n=c,o=i,a=h;break;case 2:n=h,o=i,a=u;break;case 3:n=h,o=c,a=i;break;case 4:n=u,o=h,a=i;break;case 5:n=i,o=h,a=c}return{r:Math.floor(255*n),g:Math.floor(255*o),b:Math.floor(255*a),a:s}},toHex:function(t,e,i,s){var n=this.toRGB(t,e,i,s);return"#"+(1<<24|parseInt(n.r)<<16|parseInt(n.g)<<8|parseInt(n.b)).toString(16).substr(1)},toHSL:function(t,e,i,s){t=t||this.value.h,e=e||this.value.s,i=i||this.value.b,s=s||this.value.a;var n=t,o=(2-e)*i,a=e*i;return a/=0<o&&o<=1?o:2-o,o/=2,1<a&&(a=1),{h:isNaN(n)?0:n,s:isNaN(a)?0:a,l:isNaN(o)?0:o,a:isNaN(s)?0:s}},RGBtoHSB:function(t,e,i,s){var n,o,a,r;return t/=255,e/=255,i/=255,n=((n=0==(r=(a=Math.max(t,e,i))-Math.min(t,e,i))?null:a===t?(e-i)/r:a===e?(i-t)/r+2:(t-e)/r+4)+360)%6*60/360,o=0==r?0:r/a,{h:this._sanitizeNumber(n),s:o,b:a,a:this._sanitizeNumber(s)}},HueToRGB:function(t,e,i){return i<0?i+=1:1<i&&--i,6*i<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t},HSLtoRGB:function(t,e,i,s){var n;e<0&&(e=0);var o=2*i-(n=i<=.5?i*(1+e):i+e-i*e),a=t+1/3,r=t,l=t-1/3;return[Math.round(255*this.HueToRGB(o,n,a)),Math.round(255*this.HueToRGB(o,n,r)),Math.round(255*this.HueToRGB(o,n,l)),this._sanitizeNumber(s)]},toString:function(t){switch(t=t||"rgba"){case"rgb":return"rgb("+(e=this.toRGB()).r+","+e.g+","+e.b+")";case"rgba":var e;return"rgba("+(e=this.toRGB()).r+","+e.g+","+e.b+","+e.a+")";case"hsl":var i=this.toHSL();return"hsl("+Math.round(360*i.h)+","+Math.round(100*i.s)+"%,"+Math.round(100*i.l)+"%)";case"hsla":i=this.toHSL();return"hsla("+Math.round(360*i.h)+","+Math.round(100*i.s)+"%,"+Math.round(100*i.l)+"%,"+i.a+")";case"hex":return this.toHex();default:return!1}},stringParsers:[{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,format:"hex",parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),1]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,format:"hex",parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),1]}},{re:/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,format:"rgb",parse:function(t){return[t[1],t[2],t[3],1]}},{re:/rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,format:"rgb",parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],1]}},{re:/rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,format:"rgba",parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,format:"rgba",parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,format:"hsl",parse:function(t){return[t[1]/360,t[2]/100,t[3]/100,t[4]]}},{re:/hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,format:"hsla",parse:function(t){return[t[1]/360,t[2]/100,t[3]/100,t[4]]}},{re:/^([a-z]{3,})$/,format:"alias",parse:function(t){var e=this.colorNameToHex(t[0])||"#000000",i=this.stringParsers[0].re.exec(e);return i&&this.stringParsers[0].parse.apply(this,[i])}}],colorNameToHex:function(t){var e={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c","indigo ":"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};return void 0!==e[t.toLowerCase()]&&e[t.toLowerCase()]}}),inline:!1,color:!1,format:!1,input:"input",container:!1,component:".add-on, .input-group-addon",sliders:{saturation:{maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setBrightness"},hue:{maxLeft:0,maxTop:100,callLeft:!1,callTop:"setHue"},alpha:{maxLeft:0,maxTop:100,callLeft:!1,callTop:"setAlpha"}},slidersHorz:{saturation:{maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setBrightness"},hue:{maxLeft:100,maxTop:0,callLeft:"setHue",callTop:!1},alpha:{maxLeft:100,maxTop:0,callLeft:"setAlpha",callTop:!1}},template:'<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div></div>'};o.version="2.0.0-beta",o.Color=s,o.prototype={constructor:o,destroy:function(){this.picker.remove(),this.element.removeData("colorpicker").off(".colorpicker"),!1!==this.input&&this.input.off(".colorpicker"),!1!==this.component&&this.component.off(".colorpicker"),this.element.removeClass("colorpicker-element"),this.element.trigger({type:"destroy"})},reposition:function(){if(!1!==this.options.inline)return!1;var t=this.component?this.component.offset():this.element.offset();this.picker.css({top:t.top+(this.component?this.component.outerHeight():this.element.outerHeight()),left:t.left})},show:function(t){return!this.isDisabled()&&(this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"),this.reposition(),l(window).on("resize.colorpicker",l.proxy(this.reposition,this)),!this.hasInput()&&t&&t.stopPropagation&&t.preventDefault&&(t.stopPropagation(),t.preventDefault()),!1===this.options.inline&&l(window.document).on({"mousedown.colorpicker":l.proxy(this.hide,this)}),void this.element.trigger({type:"showPicker",color:this.color}))},hide:function(){this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"),l(window).off("resize.colorpicker",this.reposition),l(document).off({"mousedown.colorpicker":this.hide}),this.update(),this.element.trigger({type:"hidePicker",color:this.color})},updateData:function(t){return t=t||this.color.toString(this.format),this.element.data("color",t),t},updateInput:function(t){return t=t||this.color.toString(this.format),!1!==this.input&&this.input.prop("value",t),t},updatePicker:function(t){void 0!==t&&(this.color=new s(t));var e=!1===this.options.horizontal?this.options.sliders:this.options.slidersHorz,i=this.picker.find("i");return 0!==i.length?(!1===this.options.horizontal?(e=this.options.sliders,i.eq(1).css("top",e.hue.maxTop*(1-this.color.value.h)).end().eq(2).css("top",e.alpha.maxTop*(1-this.color.value.a))):(e=this.options.slidersHorz,i.eq(1).css("left",e.hue.maxLeft*(1-this.color.value.h)).end().eq(2).css("left",e.alpha.maxLeft*(1-this.color.value.a))),i.eq(0).css({top:e.saturation.maxTop-this.color.value.b*e.saturation.maxTop,left:this.color.value.s*e.saturation.maxLeft}),this.picker.find(".colorpicker-saturation").css("backgroundColor",this.color.toHex(this.color.value.h,1,1,1)),this.picker.find(".colorpicker-alpha").css("backgroundColor",this.color.toHex()),this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor",this.color.toString(this.format)),t):void 0},updateComponent:function(t){var e;return t=t||this.color.toString(this.format),!1!==this.component&&(0<(e=this.component.find("i").eq(0)).length?e.css({backgroundColor:t}):this.component.css({backgroundColor:t})),t},update:function(t){var e=this.updateComponent();return!1===this.getValue(!1)&&!0!==t||(this.updateInput(e),this.updateData(e)),this.updatePicker(),e},setValue:function(t){this.color=new s(t),this.update(),this.element.trigger({type:"changeColor",color:this.color,value:t})},getValue:function(t){var e;return t=void 0===t?"#000000":t,void 0!==(e=this.hasInput()?this.input.val():this.element.data("color"))&&""!==e&&null!==e||(e=t),e},hasInput:function(){return!1!==this.input},isDisabled:function(){return!!this.hasInput()&&!0===this.input.prop("disabled")},disable:function(){return!!this.hasInput()&&(this.input.prop("disabled",!0),!0)},enable:function(){return!!this.hasInput()&&(this.input.prop("disabled",!1),!0)},currentSlider:null,mousePointer:{left:0,top:0},mousedown:function(t){t.stopPropagation(),t.preventDefault();var e=l(t.target).closest("div"),i=this.options.horizontal?this.options.slidersHorz:this.options.sliders;if(!e.is(".colorpicker")){if(e.is(".colorpicker-saturation"))this.currentSlider=l.extend({},i.saturation);else if(e.is(".colorpicker-hue"))this.currentSlider=l.extend({},i.hue);else{if(!e.is(".colorpicker-alpha"))return!1;this.currentSlider=l.extend({},i.alpha)}var s=e.offset();this.currentSlider.guide=e.find("i")[0].style,this.currentSlider.left=t.pageX-s.left,this.currentSlider.top=t.pageY-s.top,this.mousePointer={left:t.pageX,top:t.pageY},l(document).on({"mousemove.colorpicker":l.proxy(this.mousemove,this),"mouseup.colorpicker":l.proxy(this.mouseup,this)}).trigger("mousemove")}return!1},mousemove:function(t){t.stopPropagation(),t.preventDefault();var e=Math.max(0,Math.min(this.currentSlider.maxLeft,this.currentSlider.left+((t.pageX||this.mousePointer.left)-this.mousePointer.left))),i=Math.max(0,Math.min(this.currentSlider.maxTop,this.currentSlider.top+((t.pageY||this.mousePointer.top)-this.mousePointer.top)));return this.currentSlider.guide.left=e+"px",this.currentSlider.guide.top=i+"px",this.currentSlider.callLeft&&this.color[this.currentSlider.callLeft].call(this.color,e/100),this.currentSlider.callTop&&this.color[this.currentSlider.callTop].call(this.color,i/100),this.update(!0),this.element.trigger({type:"changeColor",color:this.color}),!1},mouseup:function(t){return t.stopPropagation(),t.preventDefault(),l(document).off({"mousemove.colorpicker":this.mousemove,"mouseup.colorpicker":this.mouseup}),!1},keyup:function(t){var e;38===t.keyCode?(this.color.value.a<1&&(this.color.value.a=Math.round(100*(this.color.value.a+.01))/100),this.update(!0)):40===t.keyCode?(0<this.color.value.a&&(this.color.value.a=Math.round(100*(this.color.value.a-.01))/100),this.update(!0)):(e=this.input.val(),this.color=new s(e),!1!==this.getValue(!1)&&(this.updateData(),this.updateComponent(),this.updatePicker())),this.element.trigger({type:"changeColor",color:this.color,value:e})}},l.bscolorpicker=o,l.fn.bscolorpicker=function(s){var n=arguments;return this.each(function(){var t=l(this),e=t.data("colorpicker"),i="object"==typeof s?s:{};e||"string"==typeof s?"string"==typeof s&&e[s].apply(e,Array.prototype.slice.call(n,1)):t.data("colorpicker",new o(this,i))})},l.fn.bscolorpicker.constructor=o}(window.jQuery),jQuery,function(b){b.expr[":"].icontains=function(t,e,i){return 0<=b(t).text().toUpperCase().indexOf(i[3].toUpperCase())};var h=function(t,e,i){i&&(i.stopPropagation(),i.preventDefault()),this.$element=b(t),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=b.extend({},b.fn.selectpicker.defaults,this.$element.data(),"object"==typeof e&&e),null===this.options.title&&(this.options.title=this.$element.attr("title")),this.val=h.prototype.val,this.render=h.prototype.render,this.refresh=h.prototype.refresh,this.setStyle=h.prototype.setStyle,this.selectAll=h.prototype.selectAll,this.deselectAll=h.prototype.deselectAll,this.init()};h.prototype={constructor:h,init:function(){var e=this,t=this.$element.attr("id");this.$element.hide(),this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement),this.$menu=this.$newElement.find("> .dropdown-menu"),this.$button=this.$newElement.find("> button"),this.$searchbox=this.$newElement.find("input"),void 0!==t&&(this.$button.attr("data-id",t),b('label[for="'+t+'"]').click(function(t){t.preventDefault(),e.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.liHeight(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this)},createDropdown:function(){var t=this.multiple?" show-tick":"",e=this.autofocus?" autofocus":"",i=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",s=this.options.liveSearch?'<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" /></div>':"";return b('<div class="btn-group  bootstrap-select'+t+'"><button type="button" class="btn dropdown-toggle align_left the_input_element selectpicker" data-toggle="dropdown"'+e+'><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu the_input_element open">'+i+s+'<ul class="dropdown-menu inner the_input_element selectpicker" role="menu"></ul></div></div>')},createView:function(){var t=this.createDropdown(),e=this.createLi();return t.find("ul").append(e),t},reloadLi:function(){this.destroyLi();var t=this.createLi();this.$menu.find("ul").append(t)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var l=this,h=[],i="";return this.$element.find("option").each(function(){var t,e,i=b(this),s=i.attr("class")||"",n=i.attr("style")||"",o=i.data("content")?i.data("content"):i.html(),a=void 0!==i.data("subtext")?'<small class="muted text-muted">'+i.data("subtext")+"</small>":"",r=void 0!==i.data("icon")?'<i class="'+l.options.iconBase+" "+i.data("icon")+'"></i> ':"";""!==r&&(i.is(":disabled")||i.parent().is(":disabled"))&&(r="<span>"+r+"</span>"),i.data("content")||(o=r+'<span class="text">'+o+a+"</span>"),l.options.hideDisabled&&(i.is(":disabled")||i.parent().is(":disabled"))?h.push('<a style="min-height: 0; padding: 0"></a>'):i.parent().is("optgroup")&&!0!==i.data("divider")?0===i.index()?(e=i.parent().attr("label"),t=void 0!==i.parent().data("subtext")?'<small class="muted text-muted">'+i.parent().data("subtext")+"</small>":"",e=(i.parent().data("icon")?'<i class="'+i.parent().data("icon")+'"></i> ':"")+'<span class="text">'+e+t+"</span>",h.push(0!==i[0].index?'<div class="div-contain"><div class="divider"></div></div><dt>'+e+"</dt>"+l.createA(o,"opt "+s,n):"<dt>"+e+"</dt>"+l.createA(o,"opt "+s,n))):h.push(l.createA(o,"opt "+s,n)):h.push(!0===i.data("divider")?'<div class="div-contain"><div class="divider"></div></div>':!0===b(this).data("hidden")?"":l.createA(o,s,n))}),b.each(h,function(t,e){i+="<li rel="+t+">"+e+"</li>"}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),b(i)},createA:function(t,e,i){return'<a tabindex="0" class="'+e+'" style="'+i+'">'+t+'<i class="'+this.options.iconBase+" "+this.options.tickIcon+' icon-ok check-mark"></i></a>'},render:function(t){var s=this;!1!==t&&this.$element.find("option").each(function(t){s.setDisabled(t,b(this).is(":disabled")||b(this).parent().is(":disabled")),s.setSelected(t,b(this).is(":selected"))}),this.tabIndex();var e,i,n=this.$element.find("option:selected").map(function(){var t=b(this),e=t.data("icon")&&s.options.showIcon?'<i class="'+s.options.iconBase+" "+t.data("icon")+'"></i> ':"",i=s.options.showSubtext&&t.attr("data-subtext")&&!s.multiple?' <small class="muted text-muted">'+t.data("subtext")+"</small>":"";return t.data("content")&&s.options.showContent?t.data("content"):void 0!==t.attr("title")?t.attr("title"):e+t.html()+i}).toArray(),o=this.multiple?n.join(this.options.multipleSeparator):n[0];this.multiple&&-1<this.options.selectedTextFormat.indexOf("count")&&(e=this.options.selectedTextFormat.split(">"),i=this.options.hideDisabled?":not([disabled])":"",(1<e.length&&n.length>e[1]||1==e.length&&2<=n.length)&&(o=this.options.countSelectedText.replace("{0}",n.length).replace("{1}",this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])'+i).length))),o=o||(void 0!==this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",b.trim(o)),this.$newElement.find(".filter-option").html(o)},setStyle:function(t,e){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device/gi,""));var i=t||this.options.style;"add"==e?this.$button.addClass(i):"remove"==e?this.$button.removeClass(i):(this.$button.removeClass(this.options.style),this.$button.addClass(i))},liHeight:function(){var t=this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus",!1).end().appendTo("body"),e=t.addClass("open").find("> .dropdown-menu"),i=e.find("li > a").outerHeight(),s=this.options.header?e.find(".popover-title").outerHeight():0,n=this.options.liveSearch?e.find(".bootstrap-select-searchbox").outerHeight():0;t.remove(),this.$newElement.data("liHeight",i).data("headerHeight",s).data("searchHeight",n)},setSize:function(){function e(){i=r.$newElement.offset().top-v.scrollTop(),s=v.height()-i-c}var i,s,t,n,o,a,r=this,l=this.$menu,h=l.find(".inner"),c=this.$newElement.outerHeight(),u=this.$newElement.data("liHeight"),d=this.$newElement.data("headerHeight"),p=this.$newElement.data("searchHeight"),f=l.find("li .divider").outerHeight(!0),m=parseInt(l.css("padding-top"))+parseInt(l.css("padding-bottom"))+parseInt(l.css("border-top-width"))+parseInt(l.css("border-bottom-width")),g=this.options.hideDisabled?":not(.disabled)":"",v=b(window),_=m+parseInt(l.css("margin-top"))+parseInt(l.css("margin-bottom"))+2;e(),this.options.header&&l.css("padding-top",0),"auto"==this.options.size?((t=function(){var t;e(),a=s-_,r.options.dropupAuto&&r.$newElement.toggleClass("dropup",s<i&&a-_<l.height()),r.$newElement.hasClass("dropup")&&(a=i-_),t=3<l.find("li").length+l.find("dt").length?3*u+_-2:0,l.css({"max-height":a+"px",overflow:"hidden","min-height":t+"px"}),h.css({"max-height":a-d-p-m+"px","overflow-y":"auto","min-height":t-m+"px"})})(),b(window).resize(t),b(window).scroll(t)):this.options.size&&"auto"!=this.options.size&&l.find("li"+g).length>this.options.size&&(n=l.find("li"+g+" > *").filter(":not(.div-contain)").slice(0,this.options.size).last().parent().index(),o=l.find("li").slice(0,n+1).find(".div-contain").length,a=u*this.options.size+o*f+m,r.options.dropupAuto&&this.$newElement.toggleClass("dropup",s<i&&a<l.height()),l.css({"max-height":a+d+p+"px",overflow:"hidden"}),h.css({"max-height":a-m+"px","overflow-y":"auto"}))},setWidth:function(){var t,e;"auto"==this.options.width?(this.$menu.css("min-width","0"),e=(t=this.$newElement.clone().appendTo("body")).find("> .dropdown-menu").css("width"),t.remove(),this.$newElement.css("width",e)):"fit"==this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width","")),this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){function t(t){n.addClass(t.attr("class")).toggleClass("dropup",t.hasClass("dropup")),e=t.offset(),i=t.hasClass("dropup")?0:t[0].offsetHeight,n.css({top:e.top+i,left:e.left,width:t[0].offsetWidth,position:"absolute"})}var e,i,s=this,n=b("<div />");this.$newElement.on("click",function(){t(b(this)),n.appendTo(s.options.container),n.toggleClass("open",!b(this).hasClass("open")),n.append(s.$menu)}),b(window).resize(function(){t(s.$newElement)}),b(window).on("scroll",function(){t(s.$newElement)}),b("html").on("click",function(t){b(t.target).closest(s.$newElement).length<1&&n.removeClass("open")})},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement),this.options.container&&this.$menu.hide()},refresh:function(){this.$lis=null,this.reloadLi(),this.render(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},update:function(){this.reloadLi(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},setSelected:function(t,e){null==this.$lis&&(this.$lis=this.$menu.find("li")),b(this.$lis[t]).toggleClass("selected",e)},setDisabled:function(t,e){null==this.$lis&&(this.$lis=this.$menu.find("li")),e?b(this.$lis[t]).addClass("disabled").find("a").attr("href","#").attr("tabindex",-1):b(this.$lis[t]).removeClass("disabled").find("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var t=this;this.isDisabled()?this.$button.addClass("disabled").attr("tabindex",-1):(this.$button.hasClass("disabled")&&this.$button.removeClass("disabled"),-1==this.$button.attr("tabindex")&&(this.$element.data("tabindex")||this.$button.removeAttr("tabindex"))),this.$button.click(function(){return!t.isDisabled()})},tabIndex:function(){this.$element.is("[tabindex]")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex")))},clickListener:function(){var r=this;b("body").on("touchstart.dropdown",".dropdown-menu",function(t){t.stopPropagation()}),this.$newElement.on("click",function(){r.setSize(),r.options.liveSearch||r.multiple||setTimeout(function(){r.$menu.find(".selected a").focus()},10)}),this.$menu.on("click","li a",function(t){var e,i,s,n=b(this).parent().index(),o=r.$element.val(),a=r.$element.prop("selectedIndex");r.multiple&&t.stopPropagation(),t.preventDefault(),r.isDisabled()||b(this).parent().hasClass("disabled")||(s=(i=(e=r.$element.find("option")).eq(n)).prop("selected"),r.multiple?(i.prop("selected",!s),r.setSelected(n,!s)):(e.prop("selected",!1),i.prop("selected",!0),r.$menu.find(".selected").removeClass("selected"),r.setSelected(n,!0)),r.multiple?r.options.liveSearch&&r.$searchbox.focus():r.$button.focus(),(o!=r.$element.val()&&r.multiple||a!=r.$element.prop("selectedIndex")&&!r.multiple)&&r.$element.change())}),this.$menu.on("click","li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)",function(t){t.target==this&&(t.preventDefault(),t.stopPropagation(),r.options.liveSearch?r.$searchbox.focus():r.$button.focus())}),this.$menu.on("click",".popover-title .close",function(){r.$button.focus()}),this.$searchbox.on("click",function(t){t.stopPropagation()}),this.$element.change(function(){r.render(!1)})},liveSearchListener:function(){var e=this,t=b('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api",function(){e.$menu.find(".active").removeClass("active"),e.$searchbox.val()&&(e.$searchbox.val(""),e.$menu.find("li").show(),t.parent().length&&t.remove()),e.multiple||e.$menu.find(".selected").addClass("active"),setTimeout(function(){e.$searchbox.focus()},10)}),this.$searchbox.on("input propertychange",function(){e.$searchbox.val()?(e.$menu.find("li").show().not(":icontains("+e.$searchbox.val()+")").hide(),e.$menu.find("li").filter(":visible:not(.no-results)").length?t.parent().length&&t.remove():(t.parent().length&&t.remove(),t.html(e.options.noneResultsText+' "'+e.$searchbox.val()+'"').show(),e.$menu.find("li").last().after(t))):(e.$menu.find("li").show(),t.parent().length&&t.remove()),e.$menu.find("li.active").removeClass("active"),e.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(),b(this).focus()}),this.$menu.on("mouseenter","a",function(t){e.$menu.find(".active").removeClass("active"),b(t.currentTarget).parent().not(".disabled").addClass("active")}),this.$menu.on("mouseleave","a",function(){e.$menu.find(".active").removeClass("active")})},val:function(t){return void 0!==t?(this.$element.val(t),this.$element.change(),this.$element):this.$element.val()},selectAll:function(){this.$element.find("option").prop("selected",!0).attr("selected","selected"),this.render()},deselectAll:function(){this.$element.find("option").prop("selected",!1).removeAttr("selected"),this.render()},keydown:function(t){var e,i,s,n,o,a,r,l,h,c,u,d,p,f={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"},m=(p=b(this)).parent();p.is("input")&&(m=p.parent().parent()),(l=m.data("this")).options.liveSearch&&(m=p.parent().parent()),l.options.container&&(m=l.$menu),e=b("[role=menu] li:not(.divider) a",m),!(c=l.$menu.parent().hasClass("open"))&&/([0-9]|[A-z])/.test(String.fromCharCode(t.keyCode))&&(l.setSize(),l.$menu.parent().addClass("open"),c=l.$menu.parent().hasClass("open"),l.$searchbox.focus()),l.options.liveSearch&&(/(^9$|27)/.test(t.keyCode)&&c&&0===l.$menu.find(".active").length&&(t.preventDefault(),l.$menu.parent().removeClass("open"),l.$button.focus()),e=b("[role=menu] li:not(.divider):visible",m),p.val()||/(38|40)/.test(t.keyCode)||0===e.filter(".active").length&&(e=l.$newElement.find("li").filter(":icontains("+f[t.keyCode]+")"))),e.length&&(/(38|40)/.test(t.keyCode)?(i=e.index(e.filter(":focus")),n=e.parent(":not(.disabled):visible").first().index(),o=e.parent(":not(.disabled):visible").last().index(),s=e.eq(i).parent().nextAll(":not(.disabled):visible").eq(0).index(),a=e.eq(i).parent().prevAll(":not(.disabled):visible").eq(0).index(),r=e.eq(s).parent().prevAll(":not(.disabled):visible").eq(0).index(),l.options.liveSearch&&(e.each(function(t){b(this).is(":not(.disabled)")&&b(this).data("index",t)}),i=e.index(e.filter(".active")),n=e.filter(":not(.disabled):visible").first().data("index"),o=e.filter(":not(.disabled):visible").last().data("index"),s=e.eq(i).nextAll(":not(.disabled):visible").eq(0).data("index"),a=e.eq(i).prevAll(":not(.disabled):visible").eq(0).data("index"),r=e.eq(s).prevAll(":not(.disabled):visible").eq(0).data("index")),h=p.data("prevIndex"),38==t.keyCode&&(l.options.liveSearch&&--i,i!=r&&a<i&&(i=a),i<n&&(i=n),i==h&&(i=o)),40==t.keyCode&&(l.options.liveSearch&&(i+=1),-1==i&&(i=0),i!=r&&i<s&&(i=s),o<i&&(i=o),i==h&&(i=n)),p.data("prevIndex",i),l.options.liveSearch?(t.preventDefault(),p.is(".dropdown-toggle")||(e.removeClass("active"),e.eq(i).addClass("active").find("a").focus(),p.focus())):e.eq(i).focus()):p.is("input")||(d=[],e.each(function(){b(this).parent().is(":not(.disabled)")&&b.trim(b(this).text().toLowerCase()).substring(0,1)==f[t.keyCode]&&d.push(b(this).parent().index())}),u=b(document).data("keycount"),u++,b(document).data("keycount",u),b.trim(b(":focus").text().toLowerCase()).substring(0,1)!=f[t.keyCode]?(u=1,b(document).data("keycount",u)):u>=d.length&&(b(document).data("keycount",0),u>d.length&&(u=1)),e.eq(d[u-1]).focus()),/(13|32|^9$)/.test(t.keyCode)&&c&&(/(32)/.test(t.keyCode)||t.preventDefault(),l.options.liveSearch?/(32)/.test(t.keyCode)||(l.$menu.find(".active a").click(),p.focus()):b(":focus").click(),b(document).data("keycount",0)),(/(^9$|27)/.test(t.keyCode)&&c&&(l.multiple||l.options.liveSearch)||/(27)/.test(t.keyCode)&&!c)&&(l.$menu.parent().removeClass("open"),l.$button.focus()))},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},destroy:function(){this.$newElement.remove(),this.$element.remove()}},b.fn.selectpicker=function(o,a){var r,l=arguments,t=this.each(function(){if(b(this).is("select")){var t,e=b(this),i=e.data("selectpicker"),s="object"==typeof o&&o;if(i){if(s)for(var n in s)i.options[n]=s[n]}else e.data("selectpicker",i=new h(this,s,a));"string"==typeof o&&(r=i[t=o]instanceof Function?([].shift.apply(l),i[t].apply(i,l)):i.options[t])}});return void 0!==r?r:t},b.fn.selectpicker.defaults={style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",noneSelectedText:"Nothing selected",noneResultsText:"No results match",countSelectedText:"{0} of {1} selected",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,multipleSeparator:", ",iconBase:"fa ",tickIcon:"fa-check"},b(document).data("keycount",0).on("keydown",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input",h.prototype.keydown).on("focusin.modal",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input",function(t){t.stopPropagation()})}(window.jQuery),function(u){function s(t,e){this.itemsArray=[],this.$element=u(t),this.$element.hide(),this.isSelect="SELECT"===t.tagName,this.multiple=this.isSelect&&t.hasAttribute("multiple"),this.objectItems=e&&e.itemValue,this.placeholderText=t.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=u('<div class="bootstrap-tagsinput form-control "></div>'),this.$input=u('<input  size="'+this.inputSize+'" type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.after(this.$container),this.build(e)}function n(t,e){var i;"function"!=typeof t[e]&&(i=t[e],t[e]=function(t){return t[i]})}function d(t){return t?e.text(t).html():""}function l(t){var e,i=0;return document.selection?(t.focus(),(e=document.selection.createRange()).moveStart("character",-t.value.length),i=e.text.length):!t.selectionStart&&"0"!=t.selectionStart||(i=t.selectionStart),i}var o={tagClass:"label label-info",setTagClass:"label label-info",setTagIcon:"fa fa-tag",itemValue:function(t){return t?t.toString():t},itemText:function(t){return this.itemValue(t)},freeInput:!0,maxTags:void 0,confirmKeys:[13],onTagExists:function(t,e){e.hide().fadeIn()}};s.prototype={constructor:s,add:function(t,e){var i=this;if(!(i.options.maxTags&&i.itemsArray.length>=i.options.maxTags||!1!==t&&!t)){if("object"==typeof t&&!i.objectItems)throw"Can't add objects when itemValue option is not set";if(!t.toString().match(/^\s*$/)){if(i.isSelect&&!i.multiple&&0<i.itemsArray.length&&i.remove(i.itemsArray[0]),"string"==typeof t&&"INPUT"===this.$element[0].tagName){var s=t.split(",");if(1<s.length){for(var n=0;n<s.length;n++)this.add(s[n],!0);return void(e||i.pushVal())}}var o,a,r,l=i.options.itemValue(t),h=i.options.itemText(t),c=(i.options.tagClass,u.grep(i.itemsArray,function(t){return i.options.itemValue(t)===l})[0]);c?i.options.onTagExists&&(o=u(".tag",i.$container).filter(function(){return u(this).data("item")===c}),i.options.onTagExists(t,o)):(i.itemsArray.push(t),(a=u('<span class="tag label '+this.$element.attr("data-tag-class")+'"><span id="tag-icon" class="'+this.$element.attr("data-tag-icon")+'"></span> '+d(h)+'<span data-role="remove"></span></span>')).data("item",t),i.findInputWrapper().before(a),a.after(" "),i.isSelect&&!u('option[value="'+escape(l)+'"]',i.$element)[0]&&((r=u("<option selected>"+d(h)+"</option>")).data("item",t),r.attr("value",l),i.$element.append(r)),e||i.pushVal(),i.options.maxTags===i.itemsArray.length&&i.$container.addClass("bootstrap-tagsinput-max"),i.$element.trigger(u.Event("itemAdded",{item:t})))}}},remove:function(e,t){var i=this;i.objectItems&&(e="object"==typeof e?u.grep(i.itemsArray,function(t){return i.options.itemValue(t)==i.options.itemValue(e)})[0]:u.grep(i.itemsArray,function(t){return i.options.itemValue(t)==e})[0]),e&&(u(".tag",i.$container).filter(function(){return u(this).data("item")===e}).remove(),u("option",i.$element).filter(function(){return u(this).data("item")===e}).remove(),i.itemsArray.splice(u.inArray(e,i.itemsArray),1)),t||i.pushVal(),i.options.maxTags>i.itemsArray.length&&i.$container.removeClass("bootstrap-tagsinput-max"),i.$element.trigger(u.Event("itemRemoved",{item:e}))},removeAll:function(){var t=this;for(u(".tag",t.$container).remove(),u("option",t.$element).remove();0<t.itemsArray.length;)t.itemsArray.pop();t.pushVal(),t.options.maxTags&&!this.isEnabled()&&this.enable()},refresh:function(){var o=this;u(".tag",o.$container).each(function(){var t=u(this),e=t.data("item"),i=o.options.itemValue(e),s=o.options.itemText(e),n=o.options.tagClass(e);t.attr("class",null),t.addClass("tag "+d(n)),t.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=d(s),o.isSelect&&u("option",o.$element).filter(function(){return u(this).data("item")===e}).attr("value",i)})},items:function(){return this.itemsArray},pushVal:function(){var e=this,t=u.map(e.items(),function(t){return e.options.itemValue(t).toString()});e.$element.val(t,!0).trigger("change")},build:function(t){var r=this;r.options=u.extend({},o,t);var e,i,s,a=r.options.typeahead||{};r.objectItems&&(r.options.freeInput=!1),n(r.options,"itemValue"),n(r.options,"itemText"),n(r.options,"tagClass"),r.options.source&&(a.source=r.options.source),a.source&&u.fn.typeahead&&("function"!=typeof(e=a)[i="source"]&&(s=e[i],e[i]=function(){return s}),r.$input.typeahead({source:function(t,n){function e(t){for(var e=[],i=0;i<t.length;i++){var s=r.options.itemText(t[i]);o[s]=t[i],e.push(s)}n(e)}this.map={};var o=this.map,i=a.source(t);u.isFunction(i.success)?i.success(e):u.when(i).then(e)},updater:function(t){r.add(this.map[t])},matcher:function(t){return-1!==t.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(t){return t.sort()},highlighter:function(t){var e=new RegExp("("+this.query+")","gi");return t.replace(e,"<strong>$1</strong>")}})),r.$container.on("click",u.proxy(function(){r.$input.focus()},r)),r.$container.on("keydown","input",u.proxy(function(t){var e,i,s=u(t.target),n=r.findInputWrapper();switch(t.which){case 8:0!==l(s[0])||(e=n.prev())&&r.remove(e.data("item"));break;case 46:0!==l(s[0])||(i=n.next())&&r.remove(i.data("item"));break;case 37:var o=n.prev();0===s.val().length&&o[0]&&(o.before(n),s.focus());break;case 39:var a=n.next();0===s.val().length&&a[0]&&(a.after(n),s.focus());break;default:r.options.freeInput&&0<=u.inArray(t.which,r.options.confirmKeys)&&(r.add(s.val()),s.val(""),t.preventDefault())}s.attr("size",Math.max(this.inputSize,s.val().length))},r)),r.$container.on("click","[data-role=remove]",u.proxy(function(t){r.remove(u(t.target).closest(".tag").data("item"))},r)),r.options.itemValue===o.itemValue&&("INPUT"===r.$element[0].tagName?r.add(r.$element.val()):u("option",r.$element).each(function(){r.add(u(this).attr("value"),!0)}))},destroy:function(){var t=this;t.$container.off("keypress","input"),t.$container.off("click","[role=remove]"),t.$container.remove(),t.$element.removeData("tagsinput"),t.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var t=this.$input[0],e=this.$container[0];t&&t.parentNode!==e;)t=t.parentNode;return u(t)}},u.fn.tagsinput=function(e){var i=[];return this.each(function(){var t=u(this).data("tagsinput");t?i.push(""):(t=new s(this,e),u(this).data("tagsinput",t),i.push(t),"SELECT"===this.tagName&&u("option",u(this)).attr("selected","selected"),u(this).val(u(this).val()))}),"string"!=typeof e||1<i.length?i:i[0]},u.fn.tagsinput.Constructor=s;var e=u("<div />");u(function(){u("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery),function(a){function s(t,e){var i;this.$element=a(t),this.$input=this.$element.find(":file"),0!==this.$input.length&&(this.name=this.$input.attr("name")||e.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),0===this.$hidden.length&&(this.$hidden=a('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileinput-preview"),i=this.$preview.css("height"),"inline"!=this.$preview.css("display")&&"0px"!=i&&"none"!=i&&this.$preview.css("line-height",i),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen())}var i="Microsoft Internet Explorer"==window.navigator.appName;s.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},s.prototype.change=function(i){var s,t,n,o;void 0===i.target.files&&(i.target.files=i.target&&i.target.value?[{name:i.target.value.replace(/^.+\\/,"")}]:[]),0!==i.target.files.length&&(this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name),s=i.target.files[0],0<this.$preview.length&&(void 0!==s.type?s.type.match("image.*"):s.name.match(/\.(gif|png|jpe?g)$/i))&&"undefined"!=typeof FileReader?(t=new FileReader,n=this.$preview,o=this.$element,t.onload=function(t){var e=a("<img>").attr("src",t.target.result);i.target.files[0].result=t.target.result,o.find(".fileinput-filename").text(s.name),"none"!=n.css("max-height")&&e.css("max-height",parseInt(n.css("max-height"),10)-parseInt(n.css("padding-top"),10)-parseInt(n.css("padding-bottom"),10)-parseInt(n.css("border-top"),10)-parseInt(n.css("border-bottom"),10)),n.html(e),o.addClass("fileinput-exists").removeClass("fileinput-new"),o.trigger("change.bs.fileinput",i.target.files)},t.readAsDataURL(s)):(this.$element.find(".fileinput-filename").text(s.name),this.$preview.text(s.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")))},s.prototype.clear=function(t){var e;t&&t.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name",""),i?(e=this.$input.clone(!0),this.$input.after(e),this.$input.remove(),this.$input=e):this.$input.val(""),this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),!1!==t&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},s.prototype.reset=function(){this.clear(!1),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},s.prototype.trigger=function(t){this.$input.trigger("click"),t.preventDefault()},a.fn.fileinput=function(i){return this.each(function(){var t=a(this),e=t.data("fileinput");e||t.data("fileinput",e=new s(this,i)),"string"==typeof i&&e[i]()})},a.fn.fileinput.Constructor=s,a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(t){var e,i=a(this);i.data("fileinput")||(i.fileinput(i.data()),0<(e=a(t.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]')).length&&(t.preventDefault(),e.trigger("click.bs.fileinput")))})}(jQuery),function(c,u){function s(t){this.element=t,this.options=c.extend({},e)}var n="nexchecks",o="plugin_"+n,e={label:"",labelPosition:"right",customClass:"",color:"blue"};s.prototype={init:function(t){c.extend(this.options,t);var e,i,s,n,o,a,r,l,h=c(this.element);h.parent().addClass("has-pretty-child"),0<h.parent().find("a").length||(h.css("display","none"),e=h.data("type")!==u?h.data("type"):h.attr("type"),h.data("label")!==u?h.data("label"):this.options.label,i=h.data("labelposition")!==u?"label"+h.data("labelposition"):"label"+this.options.labelPosition,s=h.data("customclass")!==u?h.data("customclass"):this.options.customClass,n=h.data("color")!==u?h.data("color"):this.options.color,o=!0===h.prop("disabled")?"disabled":"",a=["pretty"+e,i,s,n].join(" "),h.wrap('<div class="clearfix '+a+'"></div>').parent().html(),r=[],l=h.prop("checked")?"checked":"",r.push('<a class="fa ui-state-default '+l+" "+o+'"></a>'),h.parent().append(r.join("\n")))},enable:function(){c(this.element).removeAttr("disabled").parent().find("a:first").removeClass("disabled")},disable:function(){c(this.element).attr("disabled","disabled").parent().find("a:first").addClass("disabled")},destroy:function(){var t=c(this.element);t.clone().removeAttr("style").insertBefore(t.parent()),t.parent().remove()}},c.fn[n]=function(t){var e,i;if(this.data(o)instanceof s||this.data(o,new s(this)),(i=this.data(o)).element=this,void 0===t||"object"==typeof t)"function"==typeof i.init&&i.init(t);else{if("string"==typeof t&&"function"==typeof i[t])return e=Array.prototype.slice.call(arguments,1),i[t].apply(i,e);c.error("Method "+t+" does not exist on jQuery."+n)}}}(jQuery),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(k){k.ui=k.ui||{};k.ui.version="1.12.1";var n,i=0,r=Array.prototype.slice;k.cleanData=(n=k.cleanData,function(t){for(var e,i,s=0;null!=(i=t[s]);s++)try{(e=k._data(i,"events"))&&e.remove&&k(i).triggerHandler("remove")}catch(t){}n(t)}),k.widget=function(t,i,e){var s,n,o,a={},r=t.split(".")[0],l=r+"-"+(t=t.split(".")[1]);return e||(e=i,i=k.Widget),k.isArray(e)&&(e=k.extend.apply(null,[{}].concat(e))),k.expr[":"][l.toLowerCase()]=function(t){return!!k.data(t,l)},k[r]=k[r]||{},s=k[r][t],n=k[r][t]=function(t,e){if(!this._createWidget)return new n(t,e);arguments.length&&this._createWidget(t,e)},k.extend(n,s,{version:e.version,_proto:k.extend({},e),_childConstructors:[]}),(o=new i).options=k.widget.extend({},o.options),k.each(e,function(e,s){function n(){return i.prototype[e].apply(this,arguments)}function o(t){return i.prototype[e].apply(this,t)}k.isFunction(s)?a[e]=function(){var t,e=this._super,i=this._superApply;return this._super=n,this._superApply=o,t=s.apply(this,arguments),this._super=e,this._superApply=i,t}:a[e]=s}),n.prototype=k.widget.extend(o,{widgetEventPrefix:s&&o.widgetEventPrefix||t},a,{constructor:n,namespace:r,widgetName:t,widgetFullName:l}),s?(k.each(s._childConstructors,function(t,e){var i=e.prototype;k.widget(i.namespace+"."+i.widgetName,n,e._proto)}),delete s._childConstructors):i._childConstructors.push(n),k.widget.bridge(t,n),n},k.widget.extend=function(t){for(var e,i,s=r.call(arguments,1),n=0,o=s.length;n<o;n++)for(e in s[n])i=s[n][e],s[n].hasOwnProperty(e)&&void 0!==i&&(k.isPlainObject(i)?t[e]=k.isPlainObject(t[e])?k.widget.extend({},t[e],i):k.widget.extend({},i):t[e]=i);return t},k.widget.bridge=function(o,e){var a=e.prototype.widgetFullName||o;k.fn[o]=function(i){var t="string"==typeof i,s=r.call(arguments,1),n=this;return t?this.length||"instance"!==i?this.each(function(){var t,e=k.data(this,a);return"instance"===i?(n=e,!1):e?k.isFunction(e[i])&&"_"!==i.charAt(0)?(t=e[i].apply(e,s))!==e&&void 0!==t?(n=t&&t.jquery?n.pushStack(t.get()):t,!1):void 0:k.error("no such method '"+i+"' for "+o+" widget instance"):k.error("cannot call methods on "+o+" prior to initialization; attempted to call method '"+i+"'")}):n=void 0:(s.length&&(i=k.widget.extend.apply(null,[i].concat(s))),this.each(function(){var t=k.data(this,a);t?(t.option(i||{}),t._init&&t._init()):k.data(this,a,new e(i,this))})),n}},k.Widget=function(){},k.Widget._childConstructors=[],k.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,e){e=k(e||this.defaultElement||this)[0],this.element=k(e),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=k(),this.hoverable=k(),this.focusable=k(),this.classesElementLookup={},e!==this&&(k.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=k(e.style?e.ownerDocument:e.document||e),this.window=k(this.document[0].defaultView||this.document[0].parentWindow)),this.options=k.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:k.noop,_create:k.noop,_init:k.noop,destroy:function(){var i=this;this._destroy(),k.each(this.classesElementLookup,function(t,e){i._removeClass(e,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:k.noop,widget:function(){return this.element},option:function(t,e){var i,s,n,o=t;if(0===arguments.length)return k.widget.extend({},this.options);if("string"==typeof t)if(o={},t=(i=t.split(".")).shift(),i.length){for(s=o[t]=k.widget.extend({},this.options[t]),n=0;n<i.length-1;n++)s[i[n]]=s[i[n]]||{},s=s[i[n]];if(t=i.pop(),1===arguments.length)return void 0===s[t]?null:s[t];s[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=e}return this._setOptions(o),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,s;for(e in t)s=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&s&&s.length&&(i=k(s.get()),this._removeClass(s,e),i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(n){var o=[],a=this;function t(t,e){for(var i,s=0;s<t.length;s++)i=a.classesElementLookup[t[s]]||k(),i=n.add?k(k.unique(i.get().concat(n.element.get()))):k(i.not(n.element).get()),a.classesElementLookup[t[s]]=i,o.push(t[s]),e&&n.classes[t[s]]&&o.push(n.classes[t[s]])}return n=k.extend({element:this.element,classes:this.options.classes||{}},n),this._on(n.element,{remove:"_untrackClassesElement"}),n.keys&&t(n.keys.match(/\S+/g)||[],!0),n.extra&&t(n.extra.match(/\S+/g)||[]),o.join(" ")},_untrackClassesElement:function(i){var s=this;k.each(s.classesElementLookup,function(t,e){-1!==k.inArray(i.target,e)&&(s.classesElementLookup[t]=k(e.not(i.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(a,r,t){var l,h=this;"boolean"!=typeof a&&(t=r,r=a,a=!1),t?(r=l=k(r),this.bindings=this.bindings.add(r)):(t=r,r=this.element,l=this.widget()),k.each(t,function(t,e){function i(){if(a||!0!==h.options.disabled&&!k(this).hasClass("ui-state-disabled"))return("string"==typeof e?h[e]:e).apply(h,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||k.guid++);var s=t.match(/^([\w:-]*)\s*(.*)$/),n=s[1]+h.eventNamespace,o=s[2];o?l.on(n,o,i):r.on(n,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e).off(e),this.bindings=k(this.bindings.not(t).get()),this.focusable=k(this.focusable.not(t).get()),this.hoverable=k(this.hoverable.not(t).get())},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(k(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(k(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(k(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(k(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var s,n,o=this.options[t];if(i=i||{},(e=k.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],n=e.originalEvent)for(s in n)s in e||(e[s]=n[s]);return this.element.trigger(e,i),!(k.isFunction(o)&&!1===o.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},k.each({show:"fadeIn",hide:"fadeOut"},function(o,a){k.Widget.prototype["_"+o]=function(e,t,i){var s;"string"==typeof t&&(t={effect:t});var n=t?!0!==t&&"number"!=typeof t&&t.effect||a:o;"number"==typeof(t=t||{})&&(t={duration:t}),s=!k.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),s&&k.effects&&k.effects.effect[n]?e[o](t):n!==o&&e[n]?e[n](t.duration,t.easing,i):e.queue(function(t){k(this)[o](),i&&i.call(e[0]),t()})}});var o,x,C,s,a,l,h,c,D;k.widget;function I(t,e,i){return[parseFloat(t[0])*(c.test(t[0])?e/100:1),parseFloat(t[1])*(c.test(t[1])?i/100:1)]}function T(t,e){return parseInt(k.css(t,e),10)||0}x=Math.max,C=Math.abs,s=/left|center|right/,a=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,h=/^\w+/,c=/%$/,D=k.fn.position,k.position={scrollbarWidth:function(){if(void 0!==o)return o;var t,e,i=k("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),s=i.children()[0];return k("body").append(i),t=s.offsetWidth,i.css("overflow","scroll"),t===(e=s.offsetWidth)&&(e=i[0].clientWidth),i.remove(),o=t-e},getScrollInfo:function(t){var e=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),i=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),s="scroll"===e||"auto"===e&&t.width<t.element[0].scrollWidth;return{width:"scroll"===i||"auto"===i&&t.height<t.element[0].scrollHeight?k.position.scrollbarWidth():0,height:s?k.position.scrollbarWidth():0}},getWithinInfo:function(t){var e=k(t||window),i=k.isWindow(e[0]),s=!!e[0]&&9===e[0].nodeType;return{element:e,isWindow:i,isDocument:s,offset:!i&&!s?k(t).offset():{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:e.outerWidth(),height:e.outerHeight()}}},k.fn.position=function(u){if(!u||!u.of)return D.apply(this,arguments);u=k.extend({},u);var d,p,f,m,g,t,e,v=k(u.of),_=k.position.getWithinInfo(u.within),b=k.position.getScrollInfo(_),y=(u.collision||"flip").split(" "),w={},i=9===(e=(t=v)[0]).nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:k.isWindow(e)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:e.preventDefault?{width:0,height:0,offset:{top:e.pageY,left:e.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()};return v[0].preventDefault&&(u.at="left top"),p=i.width,f=i.height,m=i.offset,g=k.extend({},m),k.each(["my","at"],function(){var t,e,i=(u[this]||"").split(" ");1===i.length&&(i=s.test(i[0])?i.concat(["center"]):a.test(i[0])?["center"].concat(i):["center","center"]),i[0]=s.test(i[0])?i[0]:"center",i[1]=a.test(i[1])?i[1]:"center",t=l.exec(i[0]),e=l.exec(i[1]),w[this]=[t?t[0]:0,e?e[0]:0],u[this]=[h.exec(i[0])[0],h.exec(i[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===u.at[0]?g.left+=p:"center"===u.at[0]&&(g.left+=p/2),"bottom"===u.at[1]?g.top+=f:"center"===u.at[1]&&(g.top+=f/2),d=I(w.at,p,f),g.left+=d[0],g.top+=d[1],this.each(function(){var i,t,a=k(this),r=a.outerWidth(),l=a.outerHeight(),e=T(this,"marginLeft"),s=T(this,"marginTop"),n=r+e+T(this,"marginRight")+b.width,o=l+s+T(this,"marginBottom")+b.height,h=k.extend({},g),c=I(w.my,a.outerWidth(),a.outerHeight());"right"===u.my[0]?h.left-=r:"center"===u.my[0]&&(h.left-=r/2),"bottom"===u.my[1]?h.top-=l:"center"===u.my[1]&&(h.top-=l/2),h.left+=c[0],h.top+=c[1],i={marginLeft:e,marginTop:s},k.each(["left","top"],function(t,e){k.ui.position[y[t]]&&k.ui.position[y[t]][e](h,{targetWidth:p,targetHeight:f,elemWidth:r,elemHeight:l,collisionPosition:i,collisionWidth:n,collisionHeight:o,offset:[d[0]+c[0],d[1]+c[1]],my:u.my,at:u.at,within:_,elem:a})}),u.using&&(t=function(t){var e=m.left-h.left,i=e+p-r,s=m.top-h.top,n=s+f-l,o={target:{element:v,left:m.left,top:m.top,width:p,height:f},element:{element:a,left:h.left,top:h.top,width:r,height:l},horizontal:i<0?"left":0<e?"right":"center",vertical:n<0?"top":0<s?"bottom":"middle"};p<r&&C(e+i)<p&&(o.horizontal="center"),f<l&&C(s+n)<f&&(o.vertical="middle"),x(C(e),C(i))>x(C(s),C(n))?o.important="horizontal":o.important="vertical",u.using.call(this,t,o)}),a.offset(k.extend(h,{using:t}))})},k.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,a=t.left-e.collisionPosition.marginLeft,r=n-a,l=a+e.collisionWidth-o-n;e.collisionWidth>o?0<r&&l<=0?(i=t.left+r+e.collisionWidth-o-n,t.left+=r-i):t.left=!(0<l&&r<=0)&&l<r?n+o-e.collisionWidth:n:0<r?t.left+=r:0<l?t.left-=l:t.left=x(t.left-a,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,o=e.within.height,a=t.top-e.collisionPosition.marginTop,r=n-a,l=a+e.collisionHeight-o-n;e.collisionHeight>o?0<r&&l<=0?(i=t.top+r+e.collisionHeight-o-n,t.top+=r-i):t.top=!(0<l&&r<=0)&&l<r?n+o-e.collisionHeight:n:0<r?t.top+=r:0<l?t.top-=l:t.top=x(t.top-a,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,a=n.width,r=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,h=l-r,c=l+e.collisionWidth-a-r,u="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,d="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,p=-2*e.offset[0];h<0?((i=t.left+u+d+p+e.collisionWidth-a-o)<0||i<C(h))&&(t.left+=u+d+p):0<c&&(0<(s=t.left-e.collisionPosition.marginLeft+u+d+p-r)||C(s)<c)&&(t.left+=u+d+p)},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,a=n.height,r=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,h=l-r,c=l+e.collisionHeight-a-r,u="top"===e.my[1]?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,d="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,p=-2*e.offset[1];h<0?((s=t.top+u+d+p+e.collisionHeight-a-o)<0||s<C(h))&&(t.top+=u+d+p):0<c&&(0<(i=t.top-e.collisionPosition.marginTop+u+d+p-r)||C(i)<c)&&(t.top+=u+d+p)}},flipfit:{left:function(){k.ui.position.flip.left.apply(this,arguments),k.ui.position.fit.left.apply(this,arguments)},top:function(){k.ui.position.flip.top.apply(this,arguments),k.ui.position.fit.top.apply(this,arguments)}}};k.ui.position,k.extend(k.expr[":"],{data:k.expr.createPseudo?k.expr.createPseudo(function(e){return function(t){return!!k.data(t,e)}}):function(t,e,i){return!!k.data(t,i[3])}}),k.fn.extend({disableSelection:(t="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}),enableSelection:function(){return this.off(".ui-disableSelection")}});var t,u,d,p,f,e,m,g,v,_,b,y,w,S,P,M,A,H,z,E,O,$,N="ui-effects-",F="ui-effects-style",W="ui-effects-animated",L=k;function R(t,e,i){var s=v[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:t<0?0:s.max<t?s.max:t)}function B(a){var r=m(),l=r._rgba=[];return a=a.toLowerCase(),y(e,function(t,e){var i,s=e.re.exec(a),n=s&&e.parse(s),o=e.space||"rgba";if(n)return i=r[o](n),r[g[o].cache]=i[g[o].cache],l=r._rgba=i._rgba,!1}),l.length?("0,0,0,0"===l.join()&&u.extend(l,p.transparent),r):p[a]}function Y(t,e,i){return 6*(i=(i+1)%1)<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t}function q(t){var e,i,s=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,n={};if(s&&s.length&&s[0]&&s[s[0]])for(i=s.length;i--;)"string"==typeof s[e=s[i]]&&(n[k.camelCase(e)]=s[e]);else for(e in s)"string"==typeof s[e]&&(n[e]=s[e]);return n}function j(t,e,i,s){return k.isPlainObject(t)&&(t=(e=t).effect),t={effect:t},null==e&&(e={}),k.isFunction(e)&&(s=e,i=null,e={}),"number"!=typeof e&&!k.fx.speeds[e]||(s=i,i=e,e={}),k.isFunction(i)&&(s=i,i=null),e&&k.extend(t,e),i=i||e.duration,t.duration=k.fx.off?0:"number"==typeof i?i:i in k.fx.speeds?k.fx.speeds[i]:k.fx.speeds._default,t.complete=s||e.complete,t}function V(t){return!t||"number"==typeof t||k.fx.speeds[t]||("string"==typeof t&&!k.effects.effect[t]||(k.isFunction(t)||"object"==typeof t&&!t.effect))}function K(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t)||["",0,i,s,0];return{top:parseFloat(n[1])||0,right:"auto"===n[2]?i:parseFloat(n[2]),bottom:"auto"===n[3]?s:parseFloat(n[3]),left:parseFloat(n[4])||0}}k.effects={effect:{}},f=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],m=(u=L).Color=function(t,e,i,s){return new u.Color.fn.parse(t,e,i,s)},g={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},v={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},_=m.support={},b=u("<p>")[0],y=u.each,b.style.cssText="background-color:rgba(1,1,1,.5)",_.rgba=-1<b.style.backgroundColor.indexOf("rgba"),y(g,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),m.fn=u.extend(m.prototype,{parse:function(n,t,e,i){if(n===d)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=u(n).css(t),t=d);var o=this,s=u.type(n),a=this._rgba=[];return t!==d&&(n=[n,t,e,i],s="array"),"string"===s?this.parse(B(n)||p._default):"array"===s?(y(g.rgba.props,function(t,e){a[e.idx]=R(n[e.idx],e)}),this):"object"===s?(y(g,n instanceof m?function(t,e){n[e.cache]&&(o[e.cache]=n[e.cache].slice())}:function(t,i){var s=i.cache;y(i.props,function(t,e){if(!o[s]&&i.to){if("alpha"===t||null==n[t])return;o[s]=i.to(o._rgba)}o[s][e.idx]=R(n[t],e,!0)}),o[s]&&u.inArray(null,o[s].slice(0,3))<0&&(o[s][3]=1,i.from&&(o._rgba=i.from(o[s])))}),this):void 0},is:function(t){var n=m(t),o=!0,a=this;return y(g,function(t,e){var i,s=n[e.cache];return s&&(i=a[e.cache]||e.to&&e.to(a._rgba)||[],y(e.props,function(t,e){if(null!=s[e.idx])return o=s[e.idx]===i[e.idx]})),o}),o},_space:function(){var i=[],s=this;return y(g,function(t,e){s[e.cache]&&i.push(t)}),i.pop()},transition:function(t,a){var e=(h=m(t))._space(),i=g[e],s=0===this.alpha()?m("transparent"):this,r=s[i.cache]||i.to(s._rgba),l=r.slice(),h=h[i.cache];return y(i.props,function(t,e){var i=e.idx,s=r[i],n=h[i],o=v[e.type]||{};null!==n&&(null===s?l[i]=n:(o.mod&&(o.mod/2<n-s?s+=o.mod:o.mod/2<s-n&&(s-=o.mod)),l[i]=R((n-s)*a+s,e)))}),this[e](l)},blend:function(t){if(1===this._rgba[3])return this;var e=this._rgba.slice(),i=e.pop(),s=m(t)._rgba;return m(u.map(e,function(t,e){return(1-i)*s[e]+i*t}))},toRgbaString:function(){var t="rgba(",e=u.map(this._rgba,function(t,e){return null==t?2<e?1:0:t});return 1===e[3]&&(e.pop(),t="rgb("),t+e.join()+")"},toHslaString:function(){var t="hsla(",e=u.map(this.hsla(),function(t,e){return null==t&&(t=2<e?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===e[3]&&(e.pop(),t="hsl("),t+e.join()+")"},toHexString:function(t){var e=this._rgba.slice(),i=e.pop();return t&&e.push(~~(255*i)),"#"+u.map(e,function(t){return 1===(t=(t||0).toString(16)).length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),m.fn.parse.prototype=m.fn,g.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/255,i=t[1]/255,s=t[2]/255,n=t[3],o=Math.max(e,i,s),a=Math.min(e,i,s),r=o-a,l=o+a,h=.5*l,c=a===o?0:e===o?60*(i-s)/r+360:i===o?60*(s-e)/r+120:60*(e-i)/r+240,u=0==r?0:h<=.5?r/l:r/(2-l);return[Math.round(c)%360,u,h,null==n?1:n]},g.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],n=t[3],o=s<=.5?s*(1+i):s+i-s*i,a=2*s-o;return[Math.round(255*Y(a,o,e+1/3)),Math.round(255*Y(a,o,e)),Math.round(255*Y(a,o,e-1/3)),n]},y(g,function(l,t){var i=t.props,a=t.cache,r=t.to,h=t.from;m.fn[l]=function(t){if(r&&!this[a]&&(this[a]=r(this._rgba)),t===d)return this[a].slice();var e,s=u.type(t),n="array"===s||"object"===s?t:arguments,o=this[a].slice();return y(i,function(t,e){var i=n["object"===s?t:e.idx];null==i&&(i=o[e.idx]),o[e.idx]=R(i,e)}),h?((e=m(h(o)))[a]=o,e):m(o)},y(i,function(a,r){m.fn[a]||(m.fn[a]=function(t){var e,i=u.type(t),s="alpha"===a?this._hsla?"hsla":"rgba":l,n=this[s](),o=n[r.idx];return"undefined"===i?o:("function"===i&&(t=t.call(this,o),i=u.type(t)),null==t&&r.empty?this:("string"===i&&(e=f.exec(t))&&(t=o+parseFloat(e[2])*("+"===e[1]?1:-1)),n[r.idx]=t,this[s](n)))})})}),m.hook=function(t){var e=t.split(" ");y(e,function(t,o){u.cssHooks[o]={set:function(t,e){var i,s,n="";if("transparent"!==e&&("string"!==u.type(e)||(i=B(e)))){if(e=m(i||e),!_.rgba&&1!==e._rgba[3]){for(s="backgroundColor"===o?t.parentNode:t;(""===n||"transparent"===n)&&s&&s.style;)try{n=u.css(s,"backgroundColor"),s=s.parentNode}catch(t){}e=e.blend(n&&"transparent"!==n?n:"_default")}e=e.toRgbaString()}try{t.style[o]=e}catch(t){}}},u.fx.step[o]=function(t){t.colorInit||(t.start=m(t.elem,o),t.end=m(t.end),t.colorInit=!0),u.cssHooks[o].set(t.elem,t.start.transition(t.end,t.pos))}})},m.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),u.cssHooks.borderColor={expand:function(i){var s={};return y(["Top","Right","Bottom","Left"],function(t,e){s["border"+e+"Color"]=i}),s}},p=u.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"},M=["add","remove","toggle"],A={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1},k.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,e){k.fx.step[e]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(L.style(t.elem,e,t.end),t.setAttr=!0)}}),k.fn.addBack||(k.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),k.effects.animateClass=function(n,t,e,i){var o=k.speed(t,e,i);return this.queue(function(){var i=k(this),t=i.attr("class")||"",e=(e=o.children?i.find("*").addBack():i).map(function(){return{el:k(this),start:q(this)}}),s=function(){k.each(M,function(t,e){n[e]&&i[e+"Class"](n[e])})};s(),e=e.map(function(){return this.end=q(this.el[0]),this.diff=function(t,e){var i,s,n={};for(i in e)s=e[i],t[i]!==s&&(A[i]||!k.fx.step[i]&&isNaN(parseFloat(s))||(n[i]=s));return n}(this.start,this.end),this}),i.attr("class",t),e=e.map(function(){var t=this,e=k.Deferred(),i=k.extend({},o,{queue:!1,complete:function(){e.resolve(t)}});return this.el.animate(this.diff,i),e.promise()}),k.when.apply(k,e.get()).done(function(){s(),k.each(arguments,function(){var e=this.el;k.each(this.diff,function(t){e.css(t,"")})}),o.complete.call(i[0])})})},k.fn.extend({addClass:(P=k.fn.addClass,function(t,e,i,s){return e?k.effects.animateClass.call(this,{add:t},e,i,s):P.apply(this,arguments)}),removeClass:(S=k.fn.removeClass,function(t,e,i,s){return 1<arguments.length?k.effects.animateClass.call(this,{remove:t},e,i,s):S.apply(this,arguments)}),toggleClass:(w=k.fn.toggleClass,function(t,e,i,s,n){return"boolean"==typeof e||void 0===e?i?k.effects.animateClass.call(this,e?{add:t}:{remove:t},i,s,n):w.apply(this,arguments):k.effects.animateClass.call(this,{toggle:t},e,i,s)}),switchClass:function(t,e,i,s,n){return k.effects.animateClass.call(this,{add:e,remove:t},i,s,n)}}),k.expr&&k.expr.filters&&k.expr.filters.animated&&(k.expr.filters.animated=(H=k.expr.filters.animated,function(t){return!!k(t).data(W)||H(t)})),!1!==k.uiBackCompat&&k.extend(k.effects,{save:function(t,e){for(var i=0,s=e.length;i<s;i++)null!==e[i]&&t.data(N+e[i],t[0].style[e[i]])},restore:function(t,e){for(var i,s=0,n=e.length;s<n;s++)null!==e[s]&&(i=t.data(N+e[s]),t.css(e[s],i))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(i){if(i.parent().is(".ui-effects-wrapper"))return i.parent();var s={width:i.outerWidth(!0),height:i.outerHeight(!0),float:i.css("float")},t=k("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:i.width(),height:i.height()},n=document.activeElement;try{n.id}catch(t){n=document.body}return i.wrap(t),i[0]!==n&&!k.contains(i[0],n)||k(n).trigger("focus"),t=i.parent(),"static"===i.css("position")?(t.css({position:"relative"}),i.css({position:"relative"})):(k.extend(s,{position:i.css("position"),zIndex:i.css("z-index")}),k.each(["top","left","bottom","right"],function(t,e){s[e]=i.css(e),isNaN(parseInt(s[e],10))&&(s[e]="auto")}),i.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),i.css(e),t.css(s).show()},removeWrapper:function(t){var e=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),t[0]!==e&&!k.contains(t[0],e)||k(e).trigger("focus")),t}}),k.extend(k.effects,{version:"1.12.1",define:function(t,e,i){return i||(i=e,e="effect"),k.effects.effect[t]=i,k.effects.effect[t].mode=e,i},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();1<e&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(F,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(F)||"",t.removeData(F)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(t){var e,i=t.css("position"),s=t.position();return t.css({marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),/^(static|relative)/.test(i)&&(i="absolute",e=k("<"+t[0].nodeName+">").insertAfter(t).css({display:/^(inline|ruby)/.test(t.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight"),float:t.css("float")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),t.data(N+"placeholder",e)),t.css({position:i,left:s.left,top:s.top}),e},removePlaceholder:function(t){var e=N+"placeholder",i=t.data(e);i&&(i.remove(),t.removeData(e))},cleanUp:function(t){k.effects.restoreStyle(t),k.effects.removePlaceholder(t)},setTransition:function(s,t,n,o){return o=o||{},k.each(t,function(t,e){var i=s.cssUnit(e);0<i[0]&&(o[e]=i[0]*n+i[1])}),o}}),k.fn.extend({effect:function(){function t(t){var e=k(this),i=k.effects.mode(e,r)||o;e.data(W,!0),l.push(i),o&&("show"===i||i===o&&"hide"===i)&&e.show(),o&&"none"===i||k.effects.saveStyle(e),k.isFunction(t)&&t()}var s=j.apply(this,arguments),n=k.effects.effect[s.effect],o=n.mode,e=s.queue,i=e||"fx",a=s.complete,r=s.mode,l=[];if(k.fx.off||!n)return r?this[r](s.duration,a):this.each(function(){a&&a.call(this)});function h(t){var e=k(this);function i(){k.isFunction(a)&&a.call(e[0]),k.isFunction(t)&&t()}s.mode=l.shift(),!1===k.uiBackCompat||o?"none"===s.mode?(e[r](),i()):n.call(e[0],s,function(){e.removeData(W),k.effects.cleanUp(e),"hide"===s.mode&&e.hide(),i()}):(e.is(":hidden")?"hide"===r:"show"===r)?(e[r](),i()):n.call(e[0],s,i)}return!1===e?this.each(t).each(h):this.queue(i,t).queue(i,h)},show:(O=k.fn.show,function(t){if(V(t))return O.apply(this,arguments);var e=j.apply(this,arguments);return e.mode="show",this.effect.call(this,e)}),hide:(E=k.fn.hide,function(t){if(V(t))return E.apply(this,arguments);var e=j.apply(this,arguments);return e.mode="hide",this.effect.call(this,e)}),toggle:(z=k.fn.toggle,function(t){if(V(t)||"boolean"==typeof t)return z.apply(this,arguments);var e=j.apply(this,arguments);return e.mode="toggle",this.effect.call(this,e)}),cssUnit:function(t){var i=this.css(t),s=[];return k.each(["em","px","%","pt"],function(t,e){0<i.indexOf(e)&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):K(this.css("clip"),this)},transfer:function(t,e){var i=k(this),s=k(t.to),n="fixed"===s.css("position"),o=k("body"),a=n?o.scrollTop():0,r=n?o.scrollLeft():0,l=s.offset(),h={top:l.top-a,left:l.left-r,height:s.innerHeight(),width:s.innerWidth()},c=i.offset(),u=k("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({top:c.top-a,left:c.left-r,height:i.innerHeight(),width:i.innerWidth(),position:n?"fixed":"absolute"}).animate(h,t.duration,t.easing,function(){u.remove(),k.isFunction(e)&&e()})}}),k.fx.step.clip=function(t){t.clipInit||(t.start=k(t.elem).cssClip(),"string"==typeof t.end&&(t.end=K(t.end,t.elem)),t.clipInit=!0),k(t.elem).cssClip({top:t.pos*(t.end.top-t.start.top)+t.start.top,right:t.pos*(t.end.right-t.start.right)+t.start.right,bottom:t.pos*(t.end.bottom-t.start.bottom)+t.start.bottom,left:t.pos*(t.end.left-t.start.left)+t.start.left})},$={},k.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,t){$[t]=function(t){return Math.pow(t,e+2)}}),k.extend($,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;t<((e=Math.pow(2,--i))-1)/11;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),k.each($,function(t,e){k.easing["easeIn"+t]=e,k.easing["easeOut"+t]=function(t){return 1-e(1-t)},k.easing["easeInOut"+t]=function(t){return t<.5?e(2*t)/2:1-e(-2*t+2)/2}});k.effects,k.effects.define("blind","hide",function(t,e){var i={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},s=k(this),n=t.direction||"up",o=s.cssClip(),a={clip:k.extend({},o)},r=k.effects.createPlaceholder(s);a.clip[i[n][0]]=a.clip[i[n][1]],"show"===t.mode&&(s.cssClip(a.clip),r&&r.css(k.effects.clipToBox(a)),a.clip=o),r&&r.animate(k.effects.clipToBox(a),t.duration,t.easing),s.animate(a,{queue:!1,duration:t.duration,easing:t.easing,complete:e})}),k.effects.define("bounce",function(t,e){var i,s,n,o=k(this),a=t.mode,r="hide"===a,l="show"===a,h=t.direction||"up",c=t.distance,u=t.times||5,d=2*u+(l||r?1:0),p=t.duration/d,f=t.easing,m="up"===h||"down"===h?"top":"left",g="up"===h||"left"===h,v=0,_=o.queue().length;for(k.effects.createPlaceholder(o),n=o.css(m),c=c||o["top"==m?"outerHeight":"outerWidth"]()/3,l&&((s={opacity:1})[m]=n,o.css("opacity",0).css(m,g?2*-c:2*c).animate(s,p,f)),r&&(c/=Math.pow(2,u-1)),(s={})[m]=n;v<u;v++)(i={})[m]=(g?"-=":"+=")+c,o.animate(i,p,f).animate(s,p,f),c=r?2*c:c/2;r&&((i={opacity:0})[m]=(g?"-=":"+=")+c,o.animate(i,p,f)),o.queue(e),k.effects.unshift(o,_,1+d)}),k.effects.define("clip","hide",function(t,e){var i={},s=k(this),n=t.direction||"vertical",o="both"===n,a=o||"horizontal"===n,r=o||"vertical"===n,l=s.cssClip();i.clip={top:r?(l.bottom-l.top)/2:l.top,right:a?(l.right-l.left)/2:l.right,bottom:r?(l.bottom-l.top)/2:l.bottom,left:a?(l.right-l.left)/2:l.left},k.effects.createPlaceholder(s),"show"===t.mode&&(s.cssClip(i.clip),i.clip=l),s.animate(i,{queue:!1,duration:t.duration,easing:t.easing,complete:e})}),k.effects.define("drop","hide",function(t,e){var i,s=k(this),n="show"===t.mode,o=t.direction||"left",a="up"===o||"down"===o?"top":"left",r="up"===o||"left"===o?"-=":"+=",l="+="==r?"-=":"+=",h={opacity:0};k.effects.createPlaceholder(s),i=t.distance||s["top"==a?"outerHeight":"outerWidth"](!0)/2,h[a]=r+i,n&&(s.css(h),h[a]=l+i,h.opacity=1),s.animate(h,{queue:!1,duration:t.duration,easing:t.easing,complete:e})}),k.effects.define("explode","hide",function(t,e){var i,s,n,o,a,r,l=t.pieces?Math.round(Math.sqrt(t.pieces)):3,h=l,c=k(this),u="show"===t.mode,d=c.show().css("visibility","hidden").offset(),p=Math.ceil(c.outerWidth()/h),f=Math.ceil(c.outerHeight()/l),m=[];function g(){m.push(this),m.length===l*h&&(c.css({visibility:"visible"}),k(m).remove(),e())}for(i=0;i<l;i++)for(o=d.top+i*f,r=i-(l-1)/2,s=0;s<h;s++)n=d.left+s*p,a=s-(h-1)/2,c.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-s*p,top:-i*f}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:p,height:f,left:n+(u?a*p:0),top:o+(u?r*f:0),opacity:u?0:1}).animate({left:n+(u?0:a*p),top:o+(u?0:r*f),opacity:u?1:0},t.duration||500,t.easing,g)}),k.effects.define("fade","toggle",function(t,e){var i="show"===t.mode;k(this).css("opacity",i?0:1).animate({opacity:i?1:0},{queue:!1,duration:t.duration,easing:t.easing,complete:e})}),k.effects.define("fold","hide",function(e,t){var i=k(this),s=e.mode,n="show"===s,o="hide"===s,a=e.size||15,r=/([0-9]+)%/.exec(a),l=!!e.horizFirst?["right","bottom"]:["bottom","right"],h=e.duration/2,c=k.effects.createPlaceholder(i),u=i.cssClip(),d={clip:k.extend({},u)},p={clip:k.extend({},u)},f=[u[l[0]],u[l[1]]],m=i.queue().length;r&&(a=parseInt(r[1],10)/100*f[o?0:1]),d.clip[l[0]]=a,p.clip[l[0]]=a,p.clip[l[1]]=0,n&&(i.cssClip(p.clip),c&&c.css(k.effects.clipToBox(p)),p.clip=u),i.queue(function(t){c&&c.animate(k.effects.clipToBox(d),h,e.easing).animate(k.effects.clipToBox(p),h,e.easing),t()}).animate(d,h,e.easing).animate(p,h,e.easing).queue(t),k.effects.unshift(i,m,4)}),k.effects.define("highlight","show",function(t,e){var i=k(this),s={backgroundColor:i.css("backgroundColor")};"hide"===t.mode&&(s.opacity=0),k.effects.saveStyle(i),i.css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(s,{queue:!1,duration:t.duration,easing:t.easing,complete:e})}),k.effects.define("size",function(n,e){var t,o,i,s=k(this),a=["fontSize"],r=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],l=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],h=n.mode,c="effect"!==h,u=n.scale||"both",d=n.origin||["middle","center"],p=s.css("position"),f=s.position(),m=k.effects.scaledDimensions(s),g=n.from||m,v=n.to||k.effects.scaledDimensions(s,0);k.effects.createPlaceholder(s),"show"===h&&(i=g,g=v,v=i),o={from:{y:g.height/m.height,x:g.width/m.width},to:{y:v.height/m.height,x:v.width/m.width}},"box"!==u&&"both"!==u||(o.from.y!==o.to.y&&(g=k.effects.setTransition(s,r,o.from.y,g),v=k.effects.setTransition(s,r,o.to.y,v)),o.from.x!==o.to.x&&(g=k.effects.setTransition(s,l,o.from.x,g),v=k.effects.setTransition(s,l,o.to.x,v))),"content"!==u&&"both"!==u||o.from.y!==o.to.y&&(g=k.effects.setTransition(s,a,o.from.y,g),v=k.effects.setTransition(s,a,o.to.y,v)),d&&(t=k.effects.getBaseline(d,m),g.top=(m.outerHeight-g.outerHeight)*t.y+f.top,g.left=(m.outerWidth-g.outerWidth)*t.x+f.left,v.top=(m.outerHeight-v.outerHeight)*t.y+f.top,v.left=(m.outerWidth-v.outerWidth)*t.x+f.left),s.css(g),"content"!==u&&"both"!==u||(r=r.concat(["marginTop","marginBottom"]).concat(a),l=l.concat(["marginLeft","marginRight"]),s.find("*[width]").each(function(){var t=k(this),e=k.effects.scaledDimensions(t),i={height:e.height*o.from.y,width:e.width*o.from.x,outerHeight:e.outerHeight*o.from.y,outerWidth:e.outerWidth*o.from.x},s={height:e.height*o.to.y,width:e.width*o.to.x,outerHeight:e.height*o.to.y,outerWidth:e.width*o.to.x};o.from.y!==o.to.y&&(i=k.effects.setTransition(t,r,o.from.y,i),s=k.effects.setTransition(t,r,o.to.y,s)),o.from.x!==o.to.x&&(i=k.effects.setTransition(t,l,o.from.x,i),s=k.effects.setTransition(t,l,o.to.x,s)),c&&k.effects.saveStyle(t),t.css(i),t.animate(s,n.duration,n.easing,function(){c&&k.effects.restoreStyle(t)})})),s.animate(v,{queue:!1,duration:n.duration,easing:n.easing,complete:function(){var t=s.offset();0===v.opacity&&s.css("opacity",g.opacity),c||(s.css("position","static"===p?"relative":p).offset(t),k.effects.saveStyle(s)),e()}})}),k.effects.define("scale",function(t,e){var i=k(this),s=t.mode,n=parseInt(t.percent,10)||(0===parseInt(t.percent,10)||"effect"!==s?0:100),o=k.extend(!0,{from:k.effects.scaledDimensions(i),to:k.effects.scaledDimensions(i,n,t.direction||"both"),origin:t.origin||["middle","center"]},t);t.fade&&(o.from.opacity=1,o.to.opacity=0),k.effects.effect.size.call(this,o,e)}),k.effects.define("puff","hide",function(t,e){var i=k.extend(!0,{},t,{fade:!0,percent:parseInt(t.percent,10)||150});k.effects.effect.scale.call(this,i,e)}),k.effects.define("pulsate","show",function(t,e){var i=k(this),s=t.mode,n="show"===s,o=n||"hide"===s,a=2*(t.times||5)+(o?1:0),r=t.duration/a,l=0,h=1,c=i.queue().length;for(!n&&i.is(":visible")||(i.css("opacity",0).show(),l=1);h<a;h++)i.animate({opacity:l},r,t.easing),l=1-l;i.animate({opacity:l},r,t.easing),i.queue(e),k.effects.unshift(i,c,1+a)}),k.effects.define("shake",function(t,e){var i=1,s=k(this),n=t.direction||"left",o=t.distance||20,a=t.times||3,r=2*a+1,l=Math.round(t.duration/r),h="up"===n||"down"===n?"top":"left",c="up"===n||"left"===n,u={},d={},p={},f=s.queue().length;for(k.effects.createPlaceholder(s),u[h]=(c?"-=":"+=")+o,d[h]=(c?"+=":"-=")+2*o,p[h]=(c?"-=":"+=")+2*o,s.animate(u,l,t.easing);i<a;i++)s.animate(d,l,t.easing).animate(p,l,t.easing);s.animate(d,l,t.easing).animate(u,l/2,t.easing).queue(e),k.effects.unshift(s,f,1+r)}),k.effects.define("slide","show",function(t,e){var i,s,n=k(this),o={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},a=t.mode,r=t.direction||"left",l="up"===r||"down"===r?"top":"left",h="up"===r||"left"===r,c=t.distance||n["top"==l?"outerHeight":"outerWidth"](!0),u={};k.effects.createPlaceholder(n),i=n.cssClip(),s=n.position()[l],u[l]=(h?-1:1)*c+s,u.clip=n.cssClip(),u.clip[o[r][1]]=u.clip[o[r][0]],"show"===a&&(n.cssClip(u.clip),n.css(l,u[l]),u.clip=i,u[l]=s),n.animate(u,{queue:!1,duration:t.duration,easing:t.easing,complete:e})});!1!==k.uiBackCompat&&k.effects.define("transfer",function(t,e){k(this).transfer(t,e)});k.ui.focusable=function(t,e){var i,s,n,o,a,r=t.nodeName.toLowerCase();return"area"===r?(s=(i=t.parentNode).name,!(!t.href||!s||"map"!==i.nodeName.toLowerCase())&&(0<(n=k("img[usemap='#"+s+"']")).length&&n.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(r)?(o=!t.disabled)&&(a=k(t).closest("fieldset")[0])&&(o=!a.disabled):o="a"===r&&t.href||e,o&&k(t).is(":visible")&&function(t){var e=t.css("visibility");for(;"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}(k(t)))},k.extend(k.expr[":"],{focusable:function(t){return k.ui.focusable(t,null!=k.attr(t,"tabindex"))}});k.ui.focusable,k.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):k(this[0].form)},k.ui.formResetMixin={_formResetHandler:function(){var e=k(this);setTimeout(function(){var t=e.data("ui-form-reset-instances");k.each(t,function(){this.refresh()})})},_bindFormResetHandler:function(){var t;this.form=this.element.form(),this.form.length&&((t=this.form.data("ui-form-reset-instances")||[]).length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t))},_unbindFormResetHandler:function(){var t;this.form.length&&((t=this.form.data("ui-form-reset-instances")).splice(k.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))}};"1.7"===k.fn.jquery.substring(0,3)&&(k.each(["Width","Height"],function(t,i){var n="Width"===i?["Left","Right"]:["Top","Bottom"],s=i.toLowerCase(),o={innerWidth:k.fn.innerWidth,innerHeight:k.fn.innerHeight,outerWidth:k.fn.outerWidth,outerHeight:k.fn.outerHeight};function a(t,e,i,s){return k.each(n,function(){e-=parseFloat(k.css(t,"padding"+this))||0,i&&(e-=parseFloat(k.css(t,"border"+this+"Width"))||0),s&&(e-=parseFloat(k.css(t,"margin"+this))||0)}),e}k.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){k(this).css(s,a(this,t)+"px")})},k.fn["outer"+i]=function(t,e){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){k(this).css(s,a(this,t,!0,e)+"px")})}}),k.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))});var U,X;k.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},k.ui.escapeSelector=(U=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,function(t){return t.replace(U,"\\$1")}),k.fn.labels=function(){var t,e,i,s,n;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(s=this.eq(0).parents("label"),(i=this.attr("id"))&&(n=(t=this.eq(0).parents().last()).add(t.length?t.siblings():this.siblings()),e="label[for='"+k.ui.escapeSelector(i)+"']",s=s.add(n.find(e).addBack(e))),this.pushStack(s))},k.fn.scrollParent=function(t){var e=this.css("position"),i="absolute"===e,s=t?/(auto|scroll|hidden)/:/(auto|scroll)/,n=this.parents().filter(function(){var t=k(this);return(!i||"static"!==t.css("position"))&&s.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==e&&n.length?n:k(this[0].ownerDocument||document)},k.extend(k.expr[":"],{tabbable:function(t){var e=k.attr(t,"tabindex"),i=null!=e;return(!i||0<=e)&&k.ui.focusable(t,i)}}),k.fn.extend({uniqueId:(X=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++X)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&k(this).removeAttr("id")})}}),k.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=k(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),t.collapsible||!1!==t.active&&null!=t.active||(t.active=0),this._processPanels(),t.active<0&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():k()}},_createIcons:function(){var t,e,i=this.options.icons;i&&(t=k("<span>"),this._addClass(t,"ui-accordion-header-icon","ui-icon "+i.header),t.prependTo(this.headers),e=this.active.children(".ui-accordion-header-icon"),this._removeClass(e,i.header)._addClass(e,null,i.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){"active"!==t?("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||!1!==this.options.active||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons())):this._activate(e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!t)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var e=k.ui.keyCode,i=this.headers.length,s=this.headers.index(t.target),n=!1;switch(t.keyCode){case e.RIGHT:case e.DOWN:n=this.headers[(s+1)%i];break;case e.LEFT:case e.UP:n=this.headers[(s-1+i)%i];break;case e.SPACE:case e.ENTER:this._eventHandler(t);break;case e.HOME:n=this.headers[0];break;case e.END:n=this.headers[i-1]}n&&(k(t.target).attr("tabIndex",-1),k(n).attr("tabIndex",0),k(n).trigger("focus"),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===k.ui.keyCode.UP&&t.ctrlKey&&k(t.currentTarget).prev().trigger("focus")},refresh:function(){var t=this.options;this._processPanels(),!1===t.active&&!0===t.collapsible||!this.headers.length?(t.active=!1,this.active=k()):!1===t.active?this._activate(0):this.active.length&&!k.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=k()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var i,t=this.options,e=t.heightStyle,s=this.element.parent();this.active=this._findActive(t.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var t=k(this),e=t.uniqueId().attr("id"),i=t.next(),s=i.uniqueId().attr("id");t.attr("aria-controls",s),i.attr("aria-labelledby",e)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(t.event),"fill"===e?(i=s.height(),this.element.siblings(":visible").each(function(){var t=k(this),e=t.css("position");"absolute"!==e&&"fixed"!==e&&(i-=t.outerHeight(!0))}),this.headers.each(function(){i-=k(this).outerHeight(!0)}),this.headers.next().each(function(){k(this).height(Math.max(0,i-k(this).innerHeight()+k(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.headers.next().each(function(){var t=k(this).is(":visible");t||k(this).show(),i=Math.max(i,k(this).css("height","").height()),t||k(this).hide()}).height(i))},_activate:function(t){var e=this._findActive(t)[0];e!==this.active[0]&&(e=e||this.active[0],this._eventHandler({target:e,currentTarget:e,preventDefault:k.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):k()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&k.each(t.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var e,i,s=this.options,n=this.active,o=k(t.currentTarget),a=o[0]===n[0],r=a&&s.collapsible,l=r?k():o.next(),h=n.next(),c={oldHeader:n,oldPanel:h,newHeader:r?k():o,newPanel:l};t.preventDefault(),a&&!s.collapsible||!1===this._trigger("beforeActivate",t,c)||(s.active=!r&&this.headers.index(o),this.active=a?k():o,this._toggle(c),this._removeClass(n,"ui-accordion-header-active","ui-state-active"),s.icons&&(e=n.children(".ui-accordion-header-icon"),this._removeClass(e,null,s.icons.activeHeader)._addClass(e,null,s.icons.header)),a||(this._removeClass(o,"ui-accordion-header-collapsed")._addClass(o,"ui-accordion-header-active","ui-state-active"),s.icons&&(i=o.children(".ui-accordion-header-icon"),this._removeClass(i,null,s.icons.header)._addClass(i,null,s.icons.activeHeader)),this._addClass(o.next(),"ui-accordion-content-active")))},_toggle:function(t){var e=t.newPanel,i=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=e,this.prevHide=i,this.options.animate?this._animate(e,i,t):(i.hide(),e.show(),this._toggleComplete(t)),i.attr({"aria-hidden":"true"}),i.prev().attr({"aria-selected":"false","aria-expanded":"false"}),e.length&&i.length?i.prev().attr({tabIndex:-1,"aria-expanded":"false"}):e.length&&this.headers.filter(function(){return 0===parseInt(k(this).attr("tabIndex"),10)}).attr("tabIndex",-1),e.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(t,i,e){function s(){r._toggleComplete(e)}var n,o,a,r=this,l=0,h=t.css("box-sizing"),c=t.length&&(!i.length||t.index()<i.index()),u=this.options.animate||{},d=c&&u.down||u;return"number"==typeof d&&(a=d),"string"==typeof d&&(o=d),o=o||d.easing||u.easing,a=a||d.duration||u.duration,i.length?t.length?(n=t.show().outerHeight(),i.animate(this.hideProps,{duration:a,easing:o,step:function(t,e){e.now=Math.round(t)}}),void t.hide().animate(this.showProps,{duration:a,easing:o,complete:s,step:function(t,e){e.now=Math.round(t),"height"!==e.prop?"content-box"===h&&(l+=e.now):"content"!==r.options.heightStyle&&(e.now=Math.round(n-i.outerHeight()-l),l=0)}})):i.animate(this.hideProps,a,o,s):t.animate(this.showProps,a,o,s)},_toggleComplete:function(t){var e=t.oldPanel,i=e.prev();this._removeClass(e,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),e.length&&e.parent()[0].className,this._trigger("activate",null,t)}}),k.ui.safeActiveElement=function(e){var i;try{i=e.activeElement}catch(t){i=e.body}return(i=i||e.body).nodeName||(i=e.body),i},k.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(t){var e=k(t.target),i=k(k.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&e.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),e.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&i.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var e,i;this.previousFilter||(e=k(t.target).closest(".ui-menu-item"),i=k(t.currentTarget),e[0]===i[0]&&(this._removeClass(i.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(t,i)))},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(t){this._delay(function(){k.contains(this.element[0],k.ui.safeActiveElement(this.document[0]))||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){var t=this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),t.children().each(function(){var t=k(this);t.data("ui-menu-submenu-caret")&&t.remove()})},_keydown:function(t){var e,i,s,n,o=!0;switch(t.keyCode){case k.ui.keyCode.PAGE_UP:this.previousPage(t);break;case k.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case k.ui.keyCode.HOME:this._move("first","first",t);break;case k.ui.keyCode.END:this._move("last","last",t);break;case k.ui.keyCode.UP:this.previous(t);break;case k.ui.keyCode.DOWN:this.next(t);break;case k.ui.keyCode.LEFT:this.collapse(t);break;case k.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case k.ui.keyCode.ENTER:case k.ui.keyCode.SPACE:this._activate(t);break;case k.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,i=this.previousFilter||"",n=!1,s=96<=t.keyCode&&t.keyCode<=105?(t.keyCode-96).toString():String.fromCharCode(t.keyCode),clearTimeout(this.filterTimer),s===i?n=!0:s=i+s,e=this._filterMenuItems(s),(e=n&&-1!==e.index(this.active.next())?this.active.nextAll(".ui-menu-item"):e).length||(s=String.fromCharCode(t.keyCode),e=this._filterMenuItems(s)),e.length?(this.focus(t,e),this.previousFilter=s,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(t){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var t,e,i,s,n=this,o=this.options.icons.submenu,a=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),e=a.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=k(this),e=t.prev(),i=k("<span>").data("ui-menu-submenu-caret",!0);n._addClass(i,"ui-menu-icon","ui-icon "+o),e.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",e.attr("id"))}),this._addClass(e,"ui-menu","ui-widget ui-widget-content ui-front"),(t=a.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function(){var t=k(this);n._isDivider(t)&&n._addClass(t,"ui-menu-divider","ui-widget-content")}),s=(i=t.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(i,"ui-menu-item")._addClass(s,"ui-menu-item-wrapper"),t.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!k.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){var i;"icons"===t&&(i=this.element.find(".ui-menu-icon"),this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,e.submenu)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",String(t)),this._toggleClass(null,"ui-state-disabled",!!t)},focus:function(t,e){var i,s,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),(i=e.children(".ui-menu")).length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(t){var e,i,s,n,o,a;this._hasScroll()&&(e=parseFloat(k.css(this.activeMenu[0],"borderTopWidth"))||0,i=parseFloat(k.css(this.activeMenu[0],"paddingTop"))||0,s=t.offset().top-this.activeMenu.offset().top-e-i,n=this.activeMenu.scrollTop(),o=this.activeMenu.height(),a=t.outerHeight(),s<0?this.activeMenu.scrollTop(n+s):o<s+a&&this.activeMenu.scrollTop(n+s-o+a))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",t,{item:this.active}),this.active=null)},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(t){var e=k.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(e)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var t=i?this.element:k(e&&e.target).closest(this.element.find(".ui-menu"));t.length||(t=this.element),this._close(t),this.blur(e),this._removeClass(t.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=t},this.delay)},_close:function(t){(t=t||(this.active?this.active.parent():this.element)).find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(t){return!k(t.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(t){var e,i,s;this.active?this.isLastItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return(e=k(this)).offset().top-i-s<0}),this.focus(t,e)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())):this.next(t)},previousPage:function(t){var e,i,s;this.active?this.isFirstItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return 0<(e=k(this)).offset().top-i+s}),this.focus(t,e)):this.focus(t,this.activeMenu.find(this.options.items).first())):this.next(t)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||k(t.target).closest(".ui-menu-item");var e={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,e)},_filterMenuItems:function(t){var e=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),i=new RegExp("^"+e,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return i.test(k.trim(k(this).children(".ui-menu-item-wrapper").text()))})}});k.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var i,s,n,t=this.element[0].nodeName.toLowerCase(),e="textarea"===t,o="input"===t;this.isMultiLine=e||!o&&this._isContentEditable(this.element),this.valueMethod=this.element[e||o?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(t){if(this.element.prop("readOnly"))s=n=i=!0;else{s=n=i=!1;var e=k.ui.keyCode;switch(t.keyCode){case e.PAGE_UP:i=!0,this._move("previousPage",t);break;case e.PAGE_DOWN:i=!0,this._move("nextPage",t);break;case e.UP:i=!0,this._keyEvent("previous",t);break;case e.DOWN:i=!0,this._keyEvent("next",t);break;case e.ENTER:this.menu.active&&(i=!0,t.preventDefault(),this.menu.select(t));break;case e.TAB:this.menu.active&&this.menu.select(t);break;case e.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(t),t.preventDefault());break;default:s=!0,this._searchTimeout(t)}}},keypress:function(t){if(i)return i=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||t.preventDefault());if(!s){var e=k.ui.keyCode;switch(t.keyCode){case e.PAGE_UP:this._move("previousPage",t);break;case e.PAGE_DOWN:this._move("nextPage",t);break;case e.UP:this._keyEvent("previous",t);break;case e.DOWN:this._keyEvent("next",t)}}},input:function(t){if(n)return n=!1,void t.preventDefault();this._searchTimeout(t)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){this.cancelBlur?delete this.cancelBlur:(clearTimeout(this.searching),this.close(t),this._change(t))}}),this._initSource(),this.menu=k("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==k.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(t,e){var i,s;if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),void this.document.one("mousemove",function(){k(t.target).trigger(t.originalEvent)});s=e.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:s})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(s.value),(i=e.item.attr("aria-label")||s.value)&&k.trim(i).length&&(this.liveRegion.children().hide(),k("<div>").text(i).appendTo(this.liveRegion))},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==k.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=k("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(t){var e=this.menu.element[0];return t.target===this.element[0]||t.target===e||k.contains(e,t.target)},_closeOnClickOutside:function(t){this._isEventTargetInWidget(t)||this.close()},_appendTo:function(){var t=this.options.appendTo;return(t=t&&(t.jquery||t.nodeType?k(t):this.document.find(t).eq(0)))&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_initSource:function(){var i,s,n=this;k.isArray(this.options.source)?(i=this.options.source,this.source=function(t,e){e(k.ui.autocomplete.filter(i,t.term))}):"string"==typeof this.options.source?(s=this.options.source,this.source=function(t,e){n.xhr&&n.xhr.abort(),n.xhr=k.ajax({url:s,data:t,dataType:"json",success:function(t){e(t)},error:function(){e([])}})}):this.source=this.options.source},_searchTimeout:function(s){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),e=this.menu.element.is(":visible"),i=s.altKey||s.ctrlKey||s.metaKey||s.shiftKey;t&&(!t||e||i)||(this.selectedItem=null,this.search(null,s))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):!1!==this._trigger("search",e)?this._search(t):void 0},_search:function(t){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return k.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(t){t=t&&this._normalize(t),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:k.map(t,function(t){return"string"==typeof t?{label:t,value:t}:k.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var e=this.menu.element.empty();this._renderMenu(e,t),this.isNewMenu=!0,this.menu.refresh(),e.show(),this._resizeMenu(),e.position(k.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(i,t){var s=this;k.each(t,function(t,e){s._renderItemData(i,e)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(t,e){return k("<li>").append(k("<div>").text(e.label)).appendTo(t)},_move:function(t,e){if(this.menu.element.is(":visible"))return this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[t](e);this.search(null,e)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(t,e),e.preventDefault())},_isContentEditable:function(t){if(!t.length)return!1;var e=t.prop("contentEditable");return"inherit"===e?this._isContentEditable(t.parent()):"true"===e}}),k.extend(k.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,e){var i=new RegExp(k.ui.autocomplete.escapeRegex(e),"i");return k.grep(t,function(t){return i.test(t.label||t.value||t)})}}),k.widget("ui.autocomplete",k.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(1<t?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var e;this._superApply(arguments),this.options.disabled||this.cancelSearch||(e=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),k("<div>").text(e).appendTo(this.liveRegion))}});k.ui.autocomplete;var G=/ui-corner-([a-z]){2,6}/g;k.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var a=this,r=[];k.each(this.options.items,function(n,t){var e,o={};if(t)return"controlgroupLabel"===n?((e=a.element.find(t)).each(function(){var t=k(this);t.children(".ui-controlgroup-label-contents").length||t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),a._addClass(e,null,"ui-widget ui-widget-content ui-state-default"),void(r=r.concat(e.get()))):void(k.fn[n]&&(o=a["_"+n+"Options"]?a["_"+n+"Options"]("middle"):{classes:{}},a.element.find(t).each(function(){var t,e=k(this),i=e[n]("instance"),s=k.widget.extend({},o);"button"===n&&e.parent(".ui-spinner").length||((i=i||e[n]()[n]("instance"))&&(s.classes=a._resolveClassesValues(s.classes,i)),e[n](s),t=e[n]("widget"),k.data(t[0],"ui-controlgroup-data",i||e[n]("instance")),r.push(t[0]))})))}),this.childWidgets=k(k.unique(r)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(e){this.childWidgets.each(function(){var t=k(this).data("ui-controlgroup-data");t&&t[e]&&t[e]()})},_updateCornerClass:function(t,e){var i=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,"ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"),this._addClass(t,null,i)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],s},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:e&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(i,s){var n={};return k.each(i,function(t){var e=s.options.classes[t]||"",e=k.trim(e.replace(G,""));n[t]=(e+" "+i[t]).replace(/\s+/g," ")}),n},_setOption:function(t,e){"direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"!==t?this.refresh():this._callChildMethod(e?"disable":"enable")},refresh:function(){var n,o=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),n=this.childWidgets,this.options.onlyVisible&&(n=n.filter(":visible")),n.length&&(k.each(["first","last"],function(t,e){var i,s=n[e]().data("ui-controlgroup-data");s&&o["_"+s.widgetName+"Options"]?((i=o["_"+s.widgetName+"Options"](1===n.length?"only":e)).classes=o._resolveClassesValues(i.classes,s),s.element[s.widgetName](i)):o._updateCornerClass(n[e](),e)}),this._callChildMethod("refresh"))}});k.widget("ui.checkboxradio",[k.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var t,e,i=this,s=this._super()||{};return this._readType(),e=this.element.labels(),this.label=k(e[e.length-1]),this.label.length||k.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){i.originalLabel+=3===this.nodeType?k(this).text():this.outerHTML}),this.originalLabel&&(s.label=this.originalLabel),null!=(t=this.element[0].disabled)&&(s.disabled=t),s},_create:function(){var t=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),t&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var t=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===t&&/radio|checkbox/.test(this.type)||k.error("Can't create checkboxradio on element.nodeName="+t+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var t=this.element[0].name,e="input[name='"+k.ui.escapeSelector(t)+"']";return t?(this.form.length?k(this.form[0].elements).filter(e):k(e).filter(function(){return 0===k(this).form().length})).not(this.element):k([])},_toggleClasses:function(){var t=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",t)._toggleClass(this.icon,null,"ui-icon-blank",!t),"radio"===this.type&&this._getRadioGroup().each(function(){var t=k(this).checkboxradio("instance");t&&t._removeClass(t.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(t,e){if("label"!==t||e){if(this._super(t,e),"disabled"===t)return this._toggleClass(this.label,null,"ui-state-disabled",e),void(this.element[0].disabled=e);this.refresh()}},_updateIcon:function(t){var e="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=k("<span>"),this.iconSpace=k("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(e+=t?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,t?"ui-icon-blank":"ui-icon-check")):e+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",e),t||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){var t=this.label.contents().not(this.element[0]);this.icon&&(t=t.not(this.icon[0])),this.iconSpace&&(t=t.not(this.iconSpace[0])),t.remove(),this.label.append(this.options.label)},refresh:function(){var t=this.element[0].checked,e=this.element[0].disabled;this._updateIcon(t),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),null!==this.options.label&&this._updateLabel(),e!==this.options.disabled&&this._setOptions({disabled:e})}}]);var Q;k.ui.checkboxradio;k.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,e=this._super()||{};return this.isInput=this.element.is("input"),null!=(t=this.element[0].disabled)&&(e.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(e.label=this.originalLabel),e},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(t){t.keyCode===k.ui.keyCode.SPACE&&(t.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(t,e){var i="iconPosition"!==t,s=i?this.options.iconPosition:e,n="top"===s||"bottom"===s;this.icon?i&&this._removeClass(this.icon,null,this.options.icon):(this.icon=k("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),i&&this._addClass(this.icon,null,e),this._attachIcon(s),n?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=k("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(s))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var e=void 0===t.showLabel?this.options.showLabel:t.showLabel,i=void 0===t.icon?this.options.icon:t.icon;e||i||(t.showLabel=!0),this._super(t)},_setOption:function(t,e){"icon"===t&&(e?this._updateIcon(t,e):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,e),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!e),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(e):(this.element.html(e),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,e),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",e),(this.element[0].disabled=e)&&this.element.blur())},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),!1!==k.uiBackCompat&&(k.widget("ui.button",k.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,e){"text"!==t?("showLabel"===t&&(this.options.text=e),"icon"===t&&(this.options.icons.primary=e),"icons"===t&&(e.primary?(this._super("icon",e.primary),this._super("iconPosition","beginning")):e.secondary&&(this._super("icon",e.secondary),this._super("iconPosition","end"))),this._superApply(arguments)):this._super("showLabel",e)}}),k.fn.button=(Q=k.fn.button,function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?Q.apply(this,arguments):(k.ui.checkboxradio||k.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}),k.fn.buttonset=function(){return k.ui.controlgroup||k.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))});var J;k.ui.button;function Z(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},k.extend(this._defaults,this.regional[""]),this.regional.en=k.extend(!0,{},this.regional[""]),this.regional["en-US"]=k.extend(!0,{},this.regional.en),this.dpDiv=tt(k("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function tt(t){var e="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.on("mouseout",e,function(){k(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&k(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&k(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",e,et)}function et(){k.datepicker._isDisabledDatepicker(J.inline?J.dpDiv.parent()[0]:J.input[0])||(k(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),k(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&k(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&k(this).addClass("ui-datepicker-next-hover"))}function it(t,e){for(var i in k.extend(t,e),e)null==e[i]&&(t[i]=e[i]);return t}k.extend(k.ui,{datepicker:{version:"1.12.1"}}),k.extend(Z.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return it(this._defaults,t||{}),this},_attachDatepicker:function(t,e){var i,s=t.nodeName.toLowerCase(),n="div"===s||"span"===s;t.id||(this.uuid+=1,t.id="dp"+this.uuid),(i=this._newInst(k(t),n)).settings=k.extend({},e||{}),"input"===s?this._connectDatepicker(t,i):n&&this._inlineDatepicker(t,i)},_newInst:function(t,e){return{id:t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1"),input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:e,dpDiv:e?tt(k("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,e){var i=k(t);e.append=k([]),e.trigger=k([]),i.hasClass(this.markerClassName)||(this._attachments(i,e),i.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(e),k.data(t,"datepicker",e),e.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,e){var i,s,n,o=this._get(e,"appendText"),a=this._get(e,"isRTL");e.append&&e.append.remove(),o&&(e.append=k("<span class='"+this._appendClass+"'>"+o+"</span>"),t[a?"before":"after"](e.append)),t.off("focus",this._showDatepicker),e.trigger&&e.trigger.remove(),"focus"!==(i=this._get(e,"showOn"))&&"both"!==i||t.on("focus",this._showDatepicker),"button"!==i&&"both"!==i||(s=this._get(e,"buttonText"),n=this._get(e,"buttonImage"),e.trigger=k(this._get(e,"buttonImageOnly")?k("<img/>").addClass(this._triggerClass).attr({src:n,alt:s,title:s}):k("<button type='button'></button>").addClass(this._triggerClass).html(n?k("<img/>").attr({src:n,alt:s,title:s}):s)),t[a?"before":"after"](e.trigger),e.trigger.on("click",function(){return k.datepicker._datepickerShowing&&k.datepicker._lastInput===t[0]?k.datepicker._hideDatepicker():(k.datepicker._datepickerShowing&&k.datepicker._lastInput!==t[0]&&k.datepicker._hideDatepicker(),k.datepicker._showDatepicker(t[0])),!1}))},_autoSize:function(t){var e,i,s,n,o,a;this._get(t,"autoSize")&&!t.inline&&(o=new Date(2009,11,20),(a=this._get(t,"dateFormat")).match(/[DM]/)&&(e=function(t){for(n=s=i=0;n<t.length;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length))},_inlineDatepicker:function(t,e){var i=k(t);i.hasClass(this.markerClassName)||(i.addClass(this.markerClassName).append(e.dpDiv),k.data(t,"datepicker",e),this._setDate(e,this._getDefaultDate(e),!0),this._updateDatepicker(e),this._updateAlternate(e),e.settings.disabled&&this._disableDatepicker(t),e.dpDiv.css("display","block"))},_dialogDatepicker:function(t,e,i,s,n){var o,a,r,l,h,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=k("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),k("body").append(this._dialogInput),(c=this._dialogInst=this._newInst(this._dialogInput,!1)).settings={},k.data(this._dialogInput[0],"datepicker",c)),it(c.settings,s||{}),e=e&&e.constructor===Date?this._formatDate(c,e):e,this._dialogInput.val(e),this._pos=n?n.length?n:[n.pageX,n.pageY]:null,this._pos||(a=document.documentElement.clientWidth,r=document.documentElement.clientHeight,l=document.documentElement.scrollLeft||document.body.scrollLeft,h=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[a/2-100+l,r/2-150+h]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=i,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),k.blockUI&&k.blockUI(this.dpDiv),k.data(this._dialogInput[0],"datepicker",c),this},_destroyDatepicker:function(t){var e,i=k(t),s=k.data(t,"datepicker");i.hasClass(this.markerClassName)&&(e=t.nodeName.toLowerCase(),k.removeData(t,"datepicker"),"input"===e?(s.append.remove(),s.trigger.remove(),i.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):"div"!==e&&"span"!==e||i.removeClass(this.markerClassName).empty(),J===s&&(J=null))},_enableDatepicker:function(e){var t,i,s=k(e),n=k.data(e,"datepicker");s.hasClass(this.markerClassName)&&("input"===(t=e.nodeName.toLowerCase())?(e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):"div"!==t&&"span"!==t||((i=s.children("."+this._inlineClass)).children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=k.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var t,i,s=k(e),n=k.data(e,"datepicker");s.hasClass(this.markerClassName)&&("input"===(t=e.nodeName.toLowerCase())?(e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):"div"!==t&&"span"!==t||((i=s.children("."+this._inlineClass)).children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=k.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;e<this._disabledInputs.length;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(t){try{return k.data(t,"datepicker")}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,e,i){var s,n,o,a,r=this._getInst(t);if(2===arguments.length&&"string"==typeof e)return"defaults"===e?k.extend({},k.datepicker._defaults):r?"all"===e?k.extend({},r.settings):this._get(r,e):null;s=e||{},"string"==typeof e&&((s={})[e]=i),r&&(this._curInst===r&&this._hideDatepicker(),n=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(r,"min"),a=this._getMinMaxDate(r,"max"),it(r.settings,s),null!==o&&void 0!==s.dateFormat&&void 0===s.minDate&&(r.settings.minDate=this._formatDate(r,o)),null!==a&&void 0!==s.dateFormat&&void 0===s.maxDate&&(r.settings.maxDate=this._formatDate(r,a)),"disabled"in s&&(s.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(k(t),r),this._autoSize(r),this._setDate(r,n),this._updateAlternate(r),this._updateDatepicker(r))},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(t){var e,i,s,n=k.datepicker._getInst(t.target),o=!0,a=n.dpDiv.is(".ui-datepicker-rtl");if(n._keyEvent=!0,k.datepicker._datepickerShowing)switch(t.keyCode){case 9:k.datepicker._hideDatepicker(),o=!1;break;case 13:return(s=k("td."+k.datepicker._dayOverClass+":not(."+k.datepicker._currentClass+")",n.dpDiv))[0]&&k.datepicker._selectDay(t.target,n.selectedMonth,n.selectedYear,s[0]),(e=k.datepicker._get(n,"onSelect"))?(i=k.datepicker._formatDate(n),e.apply(n.input?n.input[0]:null,[i,n])):k.datepicker._hideDatepicker(),!1;case 27:k.datepicker._hideDatepicker();break;case 33:k.datepicker._adjustDate(t.target,t.ctrlKey?-k.datepicker._get(n,"stepBigMonths"):-k.datepicker._get(n,"stepMonths"),"M");break;case 34:k.datepicker._adjustDate(t.target,t.ctrlKey?+k.datepicker._get(n,"stepBigMonths"):+k.datepicker._get(n,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&k.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&k.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&k.datepicker._adjustDate(t.target,a?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&k.datepicker._adjustDate(t.target,t.ctrlKey?-k.datepicker._get(n,"stepBigMonths"):-k.datepicker._get(n,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&k.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&k.datepicker._adjustDate(t.target,a?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&k.datepicker._adjustDate(t.target,t.ctrlKey?+k.datepicker._get(n,"stepBigMonths"):+k.datepicker._get(n,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&k.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?k.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var e,i,s=k.datepicker._getInst(t.target);if(k.datepicker._get(s,"constrainInput"))return e=k.datepicker._possibleChars(k.datepicker._get(s,"dateFormat")),i=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||i<" "||!e||-1<e.indexOf(i)},_doKeyUp:function(t){var e=k.datepicker._getInst(t.target);if(e.input.val()!==e.lastVal)try{k.datepicker.parseDate(k.datepicker._get(e,"dateFormat"),e.input?e.input.val():null,k.datepicker._getFormatConfig(e))&&(k.datepicker._setDateFromField(e),k.datepicker._updateAlternate(e),k.datepicker._updateDatepicker(e))}catch(t){}return!0},_showDatepicker:function(t){var e,i,s,n,o,a,r;"input"!==(t=t.target||t).nodeName.toLowerCase()&&(t=k("input",t.parentNode)[0]),k.datepicker._isDisabledDatepicker(t)||k.datepicker._lastInput===t||(r=k.datepicker._getInst(t),k.datepicker._curInst&&k.datepicker._curInst!==r&&(k.datepicker._curInst.dpDiv.stop(!0,!0),r&&k.datepicker._datepickerShowing&&k.datepicker._hideDatepicker(k.datepicker._curInst.input[0])),!1!==(i=(e=k.datepicker._get(r,"beforeShow"))?e.apply(t,[t,r]):{})&&(it(r.settings,i),r.lastVal=null,k.datepicker._lastInput=t,k.datepicker._setDateFromField(r),k.datepicker._inDialog&&(t.value=""),k.datepicker._pos||(k.datepicker._pos=k.datepicker._findPos(t),k.datepicker._pos[1]+=t.offsetHeight),s=!1,k(t).parents().each(function(){return!(s|="fixed"===k(this).css("position"))}),n={left:k.datepicker._pos[0],top:k.datepicker._pos[1]},k.datepicker._pos=null,r.dpDiv.empty(),r.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),k.datepicker._updateDatepicker(r),n=k.datepicker._checkOffset(r,n,s),r.dpDiv.css({position:k.datepicker._inDialog&&k.blockUI?"static":s?"fixed":"absolute",display:"none",left:n.left+"px",top:n.top+"px"}),r.inline||(o=k.datepicker._get(r,"showAnim"),a=k.datepicker._get(r,"duration"),r.dpDiv.css("z-index",function(t){for(var e,i;t.length&&t[0]!==document;){if(("absolute"===(e=t.css("position"))||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}(k(t))+1),k.datepicker._datepickerShowing=!0,k.effects&&k.effects.effect[o]?r.dpDiv.show(o,k.datepicker._get(r,"showOptions"),a):r.dpDiv[o||"show"](o?a:null),k.datepicker._shouldFocusInput(r)&&r.input.trigger("focus"),k.datepicker._curInst=r)))},_updateDatepicker:function(t){this.maxRows=4,(J=t).dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var e,i=this._getNumberOfMonths(t),s=i[1],n=t.dpDiv.find("."+this._dayOverClass+" a");0<n.length&&et.apply(n.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),1<s&&t.dpDiv.addClass("ui-datepicker-multi-"+s).css("width",17*s+"em"),t.dpDiv[(1!==i[0]||1!==i[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===k.datepicker._curInst&&k.datepicker._datepickerShowing&&k.datepicker._shouldFocusInput(t)&&t.input.trigger("focus"),t.yearshtml&&(e=t.yearshtml,setTimeout(function(){e===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),e=t.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(t,e,i){var s=t.dpDiv.outerWidth(),n=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,a=t.input?t.input.outerHeight():0,r=document.documentElement.clientWidth+(i?0:k(document).scrollLeft()),l=document.documentElement.clientHeight+(i?0:k(document).scrollTop());return e.left-=this._get(t,"isRTL")?s-o:0,e.left-=i&&e.left===t.input.offset().left?k(document).scrollLeft():0,e.top-=i&&e.top===t.input.offset().top+a?k(document).scrollTop():0,e.left-=Math.min(e.left,e.left+s>r&&s<r?Math.abs(e.left+s-r):0),e.top-=Math.min(e.top,e.top+n>l&&n<l?Math.abs(n+a):0),e},_findPos:function(t){for(var e,i=this._getInst(t),s=this._get(i,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||k.expr.filters.hidden(t));)t=t[s?"previousSibling":"nextSibling"];return[(e=k(t).offset()).left,e.top]},_hideDatepicker:function(t){var e,i,s,n,o=this._curInst;!o||t&&o!==k.data(t,"datepicker")||this._datepickerShowing&&(e=this._get(o,"showAnim"),i=this._get(o,"duration"),s=function(){k.datepicker._tidyDialog(o)},k.effects&&(k.effects.effect[e]||k.effects[e])?o.dpDiv.hide(e,k.datepicker._get(o,"showOptions"),i,s):o.dpDiv["slideDown"===e?"slideUp":"fadeIn"===e?"fadeOut":"hide"](e?i:null,s),e||s(),this._datepickerShowing=!1,(n=this._get(o,"onClose"))&&n.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),k.blockUI&&(k.unblockUI(),k("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(t){var e,i;k.datepicker._curInst&&(e=k(t.target),i=k.datepicker._getInst(e[0]),(e[0].id===k.datepicker._mainDivId||0!==e.parents("#"+k.datepicker._mainDivId).length||e.hasClass(k.datepicker.markerClassName)||e.closest("."+k.datepicker._triggerClass).length||!k.datepicker._datepickerShowing||k.datepicker._inDialog&&k.blockUI)&&(!e.hasClass(k.datepicker.markerClassName)||k.datepicker._curInst===i)||k.datepicker._hideDatepicker())},_adjustDate:function(t,e,i){var s=k(t),n=this._getInst(s[0]);this._isDisabledDatepicker(s[0])||(this._adjustInstDate(n,e+("M"===i?this._get(n,"showCurrentAtPos"):0),i),this._updateDatepicker(n))},_gotoToday:function(t){var e,i=k(t),s=this._getInst(i[0]);this._get(s,"gotoCurrent")&&s.currentDay?(s.selectedDay=s.currentDay,s.drawMonth=s.selectedMonth=s.currentMonth,s.drawYear=s.selectedYear=s.currentYear):(e=new Date,s.selectedDay=e.getDate(),s.drawMonth=s.selectedMonth=e.getMonth(),s.drawYear=s.selectedYear=e.getFullYear()),this._notifyChange(s),this._adjustDate(i)},_selectMonthYear:function(t,e,i){var s=k(t),n=this._getInst(s[0]);n["selected"+("M"===i?"Month":"Year")]=n["draw"+("M"===i?"Month":"Year")]=parseInt(e.options[e.selectedIndex].value,10),this._notifyChange(n),this._adjustDate(s)},_selectDay:function(t,e,i,s){var n,o=k(t);k(s).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||((n=this._getInst(o[0])).selectedDay=n.currentDay=k("a",s).html(),n.selectedMonth=n.currentMonth=e,n.selectedYear=n.currentYear=i,this._selectDate(t,this._formatDate(n,n.currentDay,n.currentMonth,n.currentYear)))},_clearDate:function(t){var e=k(t);this._selectDate(e,"")},_selectDate:function(t,e){var i,s=k(t),n=this._getInst(s[0]);e=null!=e?e:this._formatDate(n),n.input&&n.input.val(e),this._updateAlternate(n),(i=this._get(n,"onSelect"))?i.apply(n.input?n.input[0]:null,[e,n]):n.input&&n.input.trigger("change"),n.inline?this._updateDatepicker(n):(this._hideDatepicker(),this._lastInput=n.input[0],"object"!=typeof n.input[0]&&n.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(t){var e,i,s,n=this._get(t,"altField");n&&(e=this._get(t,"altFormat")||this._get(t,"dateFormat"),i=this._getDate(t),s=this.formatDate(e,i,this._getFormatConfig(t)),k(n).val(s))},noWeekends:function(t){var e=t.getDay();return[0<e&&e<6,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(i,o,t){if(null==i||null==o)throw"Invalid arguments";if(""===(o="object"==typeof o?o.toString():o+""))return null;for(var e,s,n,a=0,r=(t?t.shortYearCutoff:null)||this._defaults.shortYearCutoff,l="string"!=typeof r?r:(new Date).getFullYear()%100+parseInt(r,10),h=(t?t.dayNamesShort:null)||this._defaults.dayNamesShort,c=(t?t.dayNames:null)||this._defaults.dayNames,u=(t?t.monthNamesShort:null)||this._defaults.monthNamesShort,d=(t?t.monthNames:null)||this._defaults.monthNames,p=-1,f=-1,m=-1,g=-1,v=!1,_=function(t){var e=x+1<i.length&&i.charAt(x+1)===t;return e&&x++,e},b=function(t){var e=_(t),i="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,s=new RegExp("^\\d{"+("y"===t?i:1)+","+i+"}"),n=o.substring(a).match(s);if(!n)throw"Missing number at position "+a;return a+=n[0].length,parseInt(n[0],10)},y=function(t,e,i){var s=-1,n=k.map(_(t)?i:e,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(k.each(n,function(t,e){var i=e[1];if(o.substr(a,i.length).toLowerCase()===i.toLowerCase())return s=e[0],a+=i.length,!1}),-1!==s)return s+1;throw"Unknown name at position "+a},w=function(){if(o.charAt(a)!==i.charAt(x))throw"Unexpected literal at position "+a;a++},x=0;x<i.length;x++)if(v)"'"!==i.charAt(x)||_("'")?w():v=!1;else switch(i.charAt(x)){case"d":m=b("d");break;case"D":y("D",h,c);break;case"o":g=b("o");break;case"m":f=b("m");break;case"M":f=y("M",u,d);break;case"y":p=b("y");break;case"@":p=(n=new Date(b("@"))).getFullYear(),f=n.getMonth()+1,m=n.getDate();break;case"!":p=(n=new Date((b("!")-this._ticksTo1970)/1e4)).getFullYear(),f=n.getMonth()+1,m=n.getDate();break;case"'":_("'")?w():v=!0;break;default:w()}if(a<o.length&&(s=o.substr(a),!/^\s+/.test(s)))throw"Extra/unparsed characters found in date: "+s;if(-1===p?p=(new Date).getFullYear():p<100&&(p+=(new Date).getFullYear()-(new Date).getFullYear()%100+(p<=l?0:-100)),-1<g)for(f=1,m=g;;){if(m<=(e=this._getDaysInMonth(p,f-1)))break;f++,m-=e}if((n=this._daylightSavingAdjust(new Date(p,f-1,m))).getFullYear()!==p||n.getMonth()+1!==f||n.getDate()!==m)throw"Invalid date";return n},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,formatDate:function(i,t,e){if(!t)return"";function n(t){var e=a+1<i.length&&i.charAt(a+1)===t;return e&&a++,e}function s(t,e,i){var s=""+e;if(n(t))for(;s.length<i;)s="0"+s;return s}function o(t,e,i,s){return n(t)?s[e]:i[e]}var a,r=(e?e.dayNamesShort:null)||this._defaults.dayNamesShort,l=(e?e.dayNames:null)||this._defaults.dayNames,h=(e?e.monthNamesShort:null)||this._defaults.monthNamesShort,c=(e?e.monthNames:null)||this._defaults.monthNames,u="",d=!1;if(t)for(a=0;a<i.length;a++)if(d)"'"!==i.charAt(a)||n("'")?u+=i.charAt(a):d=!1;else switch(i.charAt(a)){case"d":u+=s("d",t.getDate(),2);break;case"D":u+=o("D",t.getDay(),r,l);break;case"o":u+=s("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=s("m",t.getMonth()+1,2);break;case"M":u+=o("M",t.getMonth(),h,c);break;case"y":u+=n("y")?t.getFullYear():(t.getFullYear()%100<10?"0":"")+t.getFullYear()%100;break;case"@":u+=t.getTime();break;case"!":u+=1e4*t.getTime()+this._ticksTo1970;break;case"'":n("'")?u+="'":d=!0;break;default:u+=i.charAt(a)}return u},_possibleChars:function(i){for(var t="",e=!1,s=function(t){var e=n+1<i.length&&i.charAt(n+1)===t;return e&&n++,e},n=0;n<i.length;n++)if(e)"'"!==i.charAt(n)||s("'")?t+=i.charAt(n):e=!1;else switch(i.charAt(n)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":s("'")?t+="'":e=!0;break;default:t+=i.charAt(n)}return t},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(t){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(r,t,e){var i,s,n=null==t||""===t?e:"string"==typeof t?function(t){try{return k.datepicker.parseDate(k.datepicker._get(r,"dateFormat"),t,k.datepicker._getFormatConfig(r))}catch(t){}for(var e=(t.toLowerCase().match(/^c/)?k.datepicker._getDate(r):null)||new Date,i=e.getFullYear(),s=e.getMonth(),n=e.getDate(),o=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=o.exec(t);a;){switch(a[2]||"d"){case"d":case"D":n+=parseInt(a[1],10);break;case"w":case"W":n+=7*parseInt(a[1],10);break;case"m":case"M":s+=parseInt(a[1],10),n=Math.min(n,k.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),n=Math.min(n,k.datepicker._getDaysInMonth(i,s))}a=o.exec(t)}return new Date(i,s,n)}(t):"number"==typeof t?isNaN(t)?e:(i=t,(s=new Date).setDate(s.getDate()+i),s):new Date(t.getTime());return(n=n&&"Invalid Date"===n.toString()?e:n)&&(n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0)),this._daylightSavingAdjust(n)},_daylightSavingAdjust:function(t){return t?(t.setHours(12<t.getHours()?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){return!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay))},_attachHandlers:function(t){var e=this._get(t,"stepMonths"),i="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){k.datepicker._adjustDate(i,-e,"M")},next:function(){k.datepicker._adjustDate(i,+e,"M")},hide:function(){k.datepicker._hideDatepicker()},today:function(){k.datepicker._gotoToday(i)},selectDay:function(){return k.datepicker._selectDay(i,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return k.datepicker._selectMonthYear(i,this,"M"),!1},selectYear:function(){return k.datepicker._selectMonthYear(i,this,"Y"),!1}};k(this).on(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,l,h,c,u,d,p,f,m,g,v,_,b,y,w,x,k,C,D,I,T,S,P,M,A,H,z,E,O,$,N,F,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),B=this._get(t,"isRTL"),Y=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),j=this._get(t,"navigationAsDateFormat"),V=this._getNumberOfMonths(t),K=this._get(t,"showCurrentAtPos"),U=this._get(t,"stepMonths"),X=1!==V[0]||1!==V[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),Q=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-K,tt=t.drawYear;if(Z<0&&(Z+=12,tt--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-V[0]*V[1]+1,J.getDate())),e=Q&&e<Q?Q:e;this._daylightSavingAdjust(new Date(tt,Z,1))>e;)--Z<0&&(Z=11,tt--);for(t.drawMonth=Z,t.drawYear=tt,i=this._get(t,"prevText"),i=j?this.formatDate(i,this._daylightSavingAdjust(new Date(tt,Z-U,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,tt,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=j?this.formatDate(n,this._daylightSavingAdjust(new Date(tt,Z+U,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,tt,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:R,a=j?this.formatDate(a,r,this._getFormatConfig(t)):a,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",h=Y?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(B?l:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(B?"":l)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),m=this._get(t,"monthNamesShort"),g=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),_=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",x=0;x<V[0];x++){for(k="",this.maxRows=4,C=0;C<V[1];C++){if(D=this._daylightSavingAdjust(new Date(tt,Z,t.selectedDay)),I=" ui-corner-all",T="",X){if(T+="<div class='ui-datepicker-group",1<V[1])switch(C){case 0:T+=" ui-datepicker-group-first",I=" ui-corner-"+(B?"right":"left");break;case V[1]-1:T+=" ui-datepicker-group-last",I=" ui-corner-"+(B?"left":"right");break;default:T+=" ui-datepicker-group-middle",I=""}T+="'>"}for(T+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+I+"'>"+(/all|left/.test(I)&&0===x?B?o:s:"")+(/all|right/.test(I)&&0===x?B?s:o:"")+this._generateMonthYearHeader(t,Z,tt,Q,J,0<x||0<C,f,m)+"</div><table class='ui-datepicker-calendar'><thead><tr>",S=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;w<7;w++)S+="<th scope='col'"+(5<=(w+c+6)%7?" class='ui-datepicker-week-end'":"")+"><span title='"+d[P=(w+c)%7]+"'>"+p[P]+"</span></th>";for(T+=S+"</tr></thead><tbody>",M=this._getDaysInMonth(tt,Z),tt===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,M)),A=(this._getFirstDayOfMonth(tt,Z)-c+7)%7,H=Math.ceil((A+M)/7),z=X&&this.maxRows>H?this.maxRows:H,this.maxRows=z,E=this._daylightSavingAdjust(new Date(tt,Z,1-A)),O=0;O<z;O++){for(T+="<tr>",$=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(E)+"</td>":"",w=0;w<7;w++)N=g?g.apply(t.input?t.input[0]:null,[E]):[!0,""],W=(F=E.getMonth()!==Z)&&!_||!N[0]||Q&&E<Q||J&&J<E,$+="<td class='"+(5<=(w+c+6)%7?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(E.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===E.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!v?"":" "+N[1]+(E.getTime()===G.getTime()?" "+this._currentClass:"")+(E.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(F&&!v||!N[2]?"":" title='"+N[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+E.getMonth()+"' data-year='"+E.getFullYear()+"'")+">"+(F&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+E.getDate()+"</span>":"<a class='ui-state-default"+(E.getTime()===R.getTime()?" ui-state-highlight":"")+(E.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+E.getDate()+"</a>")+"</td>",E.setDate(E.getDate()+1),E=this._daylightSavingAdjust(E);T+=$+"</tr>"}11<++Z&&(Z=0,tt++),k+=T+="</tbody></table>"+(X?"</div>"+(0<V[0]&&C===V[1]-1?"<div class='ui-datepicker-row-break'></div>":""):"")}y+=k}return y+=h,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var l,h,c,u,d,p,f,m,g=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),_=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!g)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(l=s&&s.getFullYear()===i,h=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;c<12;c++)(!l||c>=s.getMonth())&&(!h||c<=n.getMonth())&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(_||(b+=y+(!o&&g&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),f=(p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e})(u[0]),m=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";f<=m;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),_&&(b+=(!o&&g&&v?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),"M"!==i&&"Y"!==i||this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&e<i?i:e;return s&&s<n?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(e<0?e:n[0]*n[1]),1));return e<0&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||e.getFullYear()<=r)},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return{shortYearCutoff:e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),k.fn.datepicker=function(t){if(!this.length)return this;k.datepicker.initialized||(k(document).on("mousedown",k.datepicker._checkExternalClick),k.datepicker.initialized=!0),0===k("#"+k.datepicker._mainDivId).length&&k("body").append(k.datepicker.dpDiv);var e=Array.prototype.slice.call(arguments,1);return"string"==typeof t&&("isDisabled"===t||"getDate"===t||"widget"===t)||"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?k.datepicker["_"+t+"Datepicker"].apply(k.datepicker,[this[0]].concat(e)):this.each(function(){"string"==typeof t?k.datepicker["_"+t+"Datepicker"].apply(k.datepicker,[this].concat(e)):k.datepicker._attachDatepicker(this,t)})},k.datepicker=new Z,k.datepicker.initialized=!1,k.datepicker.uuid=(new Date).getTime(),k.datepicker.version="1.12.1";k.datepicker,k.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var st=!1;k(document).on("mouseup",function(){st=!1});k.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(t){if(!0===k.data(t.target,e.widgetName+".preventClickEvent"))return k.removeData(t.target,e.widgetName+".preventClickEvent"),t.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!st){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var e=this,i=1===t.which,s=!("string"!=typeof this.options.cancel||!t.target.nodeName)&&k(t.target).closest(this.options.cancel).length;return i&&!s&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=!1!==this._mouseStart(t),!this._mouseStarted)?(t.preventDefault(),!0):(!0===k.data(t.target,this.widgetName+".preventClickEvent")&&k.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return e._mouseMove(t)},this._mouseUpDelegate=function(t){return e._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),st=!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(k.ui.ie&&(!document.documentMode||document.documentMode<9)&&!t.button)return this._mouseUp(t);if(!t.which)if(t.originalEvent.altKey||t.originalEvent.ctrlKey||t.originalEvent.metaKey||t.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,t),this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&k.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,st=!1,t.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),k.ui.plugin={add:function(t,e,i){var s,n=k.ui[t].prototype;for(s in i)n.plugins[s]=n.plugins[s]||[],n.plugins[s].push([e,i[s]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;n<o.length;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},k.ui.safeBlur=function(t){t&&"body"!==t.nodeName.toLowerCase()&&k(t).trigger("blur")};k.widget("ui.draggable",k.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){(this.helper||this.element).is(".ui-draggable-dragging")?this.destroyOnClear=!0:(this._removeHandleClassName(),this._mouseDestroy())},_mouseCapture:function(t){var e=this.options;return!(this.helper||e.disabled||0<k(t.target).closest(".ui-resizable-handle").length)&&(this.handle=this._getHandle(t),!!this.handle&&(this._blurActiveElement(t),this._blockFrames(!0===e.iframeFix?"iframe":e.iframeFix),!0))},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=k(this);return k("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var e=k.ui.safeActiveElement(this.document[0]);k(t.target).closest(e).length||k.ui.safeBlur(e)},_mouseStart:function(t){var e=this.options;return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),k.ui.ddmanager&&(k.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=0<this.helper.parents().filter(function(){return"fixed"===k(this).css("position")}).length,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this._setContainment(),!1===this._trigger("start",t)?(this._clear(),!1):(this._cacheHelperProportions(),k.ui.ddmanager&&!e.dropBehaviour&&k.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),k.ui.ddmanager&&k.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(t,e){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!e){var i=this._uiHash();if(!1===this._trigger("drag",t,i))return this._mouseUp(new k.Event("mouseup",t)),!1;this.position=i.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",k.ui.ddmanager&&k.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var e=this,i=!1;return k.ui.ddmanager&&!this.options.dropBehaviour&&(i=k.ui.ddmanager.drop(this,t)),this.dropped&&(i=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!i||"valid"===this.options.revert&&i||!0===this.options.revert||k.isFunction(this.options.revert)&&this.options.revert.call(this.element,i)?k(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==e._trigger("stop",t)&&e._clear()}):!1!==this._trigger("stop",t)&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),k.ui.ddmanager&&k.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),k.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new k.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!k(t.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(t){var e=this.options,i=k.isFunction(e.helper),s=i?k(e.helper.apply(this.element[0],[t])):"clone"===e.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===e.appendTo?this.element[0].parentNode:e.appendTo),i&&s[0]===this.element[0]&&this._setPositionRelative(),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),k.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),e=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==e&&k.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,i,s=this.options,n=this.document[0];this.relativeContainer=null,s.containment?"window"!==s.containment?"document"!==s.containment?s.containment.constructor!==Array?("parent"===s.containment&&(s.containment=this.helper[0].parentNode),(i=(e=k(s.containment))[0])&&(t=/(scroll|auto)/.test(e.css("overflow")),this.containment=[(parseInt(e.css("borderLeftWidth"),10)||0)+(parseInt(e.css("paddingLeft"),10)||0),(parseInt(e.css("borderTopWidth"),10)||0)+(parseInt(e.css("paddingTop"),10)||0),(t?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(e.css("borderRightWidth"),10)||0)-(parseInt(e.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(e.css("borderBottomWidth"),10)||0)-(parseInt(e.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=e)):this.containment=s.containment:this.containment=[0,0,k(n).width()-this.helperProportions.width-this.margins.left,(k(n).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=[k(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,k(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,k(window).scrollLeft()+k(window).width()-this.helperProportions.width-this.margins.left,k(window).scrollTop()+(k(window).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=null},_convertPositionTo:function(t,e){e=e||this.position;var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(i=this.relativeContainer?(s=this.relativeContainer.offset(),[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=!i||n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1],o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=!i||o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(t,e,i){return i=i||this._uiHash(),k.ui.plugin.call(this,t,[e,i,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),i.offset=this.positionAbs),k.Widget.prototype._trigger.call(this,t,e,i)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),k.ui.plugin.add("draggable","connectToSortable",{start:function(e,t,i){var s=k.extend({},t,{item:i.element});i.sortables=[],k(i.options.connectToSortable).each(function(){var t=k(this).sortable("instance");t&&!t.options.disabled&&(i.sortables.push(t),t.refreshPositions(),t._trigger("activate",e,s))})},stop:function(e,t,i){var s=k.extend({},t,{item:i.element});i.cancelHelperRemoval=!1,k.each(i.sortables,function(){var t=this;t.isOver?(t.isOver=0,i.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,s))})},drag:function(i,s,n){k.each(n.sortables,function(){var t=!1,e=this;e.positionAbs=n.positionAbs,e.helperProportions=n.helperProportions,e.offset.click=n.offset.click,e._intersectsWith(e.containerCache)&&(t=!0,k.each(n.sortables,function(){return this.positionAbs=n.positionAbs,this.helperProportions=n.helperProportions,this.offset.click=n.offset.click,this!==e&&this._intersectsWith(this.containerCache)&&k.contains(e.element[0],this.element[0])&&(t=!1),t})),t?(e.isOver||(e.isOver=1,n._parent=s.helper.parent(),e.currentItem=s.helper.appendTo(e.element).data("ui-sortable-item",!0),e.options._helper=e.options.helper,e.options.helper=function(){return s.helper[0]},i.target=e.currentItem[0],e._mouseCapture(i,!0),e._mouseStart(i,!0,!0),e.offset.click.top=n.offset.click.top,e.offset.click.left=n.offset.click.left,e.offset.parent.left-=n.offset.parent.left-e.offset.parent.left,e.offset.parent.top-=n.offset.parent.top-e.offset.parent.top,n._trigger("toSortable",i),n.dropped=e.element,k.each(n.sortables,function(){this.refreshPositions()}),n.currentItem=n.element,e.fromOutside=n),e.currentItem&&(e._mouseDrag(i),s.position=e.position)):e.isOver&&(e.isOver=0,e.cancelHelperRemoval=!0,e.options._revert=e.options.revert,e.options.revert=!1,e._trigger("out",i,e._uiHash(e)),e._mouseStop(i,!0),e.options.revert=e.options._revert,e.options.helper=e.options._helper,e.placeholder&&e.placeholder.remove(),s.helper.appendTo(n._parent),n._refreshOffsets(i),s.position=n._generatePosition(i,!0),n._trigger("fromSortable",i),n.dropped=!1,k.each(n.sortables,function(){this.refreshPositions()}))})}}),k.ui.plugin.add("draggable","cursor",{start:function(t,e,i){var s=k("body"),n=i.options;s.css("cursor")&&(n._cursor=s.css("cursor")),s.css("cursor",n.cursor)},stop:function(t,e,i){var s=i.options;s._cursor&&k("body").css("cursor",s._cursor)}}),k.ui.plugin.add("draggable","opacity",{start:function(t,e,i){var s=k(e.helper),n=i.options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(t,e,i){var s=i.options;s._opacity&&k(e.helper).css("opacity",s._opacity)}}),k.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,e,i){var s=i.options,n=!1,o=i.scrollParentNotHidden[0],a=i.document[0];o!==a&&"HTML"!==o.tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+o.offsetHeight-t.pageY<s.scrollSensitivity?o.scrollTop=n=o.scrollTop+s.scrollSpeed:t.pageY-i.overflowOffset.top<s.scrollSensitivity&&(o.scrollTop=n=o.scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+o.offsetWidth-t.pageX<s.scrollSensitivity?o.scrollLeft=n=o.scrollLeft+s.scrollSpeed:t.pageX-i.overflowOffset.left<s.scrollSensitivity&&(o.scrollLeft=n=o.scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-k(a).scrollTop()<s.scrollSensitivity?n=k(a).scrollTop(k(a).scrollTop()-s.scrollSpeed):k(window).height()-(t.pageY-k(a).scrollTop())<s.scrollSensitivity&&(n=k(a).scrollTop(k(a).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-k(a).scrollLeft()<s.scrollSensitivity?n=k(a).scrollLeft(k(a).scrollLeft()-s.scrollSpeed):k(window).width()-(t.pageX-k(a).scrollLeft())<s.scrollSensitivity&&(n=k(a).scrollLeft(k(a).scrollLeft()+s.scrollSpeed)))),!1!==n&&k.ui.ddmanager&&!s.dropBehaviour&&k.ui.ddmanager.prepareOffsets(i,t)}}),k.ui.plugin.add("draggable","snap",{start:function(t,e,i){var s=i.options;i.snapElements=[],k(s.snap.constructor!==String?s.snap.items||":data(ui-draggable)":s.snap).each(function(){var t=k(this),e=t.offset();this!==i.element[0]&&i.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:e.top,left:e.left})})},drag:function(t,e,i){for(var s,n,o,a,r,l,h,c,u,d=i.options,p=d.snapTolerance,f=e.offset.left,m=f+i.helperProportions.width,g=e.offset.top,v=g+i.helperProportions.height,_=i.snapElements.length-1;0<=_;_--)l=(r=i.snapElements[_].left-i.margins.left)+i.snapElements[_].width,c=(h=i.snapElements[_].top-i.margins.top)+i.snapElements[_].height,m<r-p||l+p<f||v<h-p||c+p<g||!k.contains(i.snapElements[_].item.ownerDocument,i.snapElements[_].item)?(i.snapElements[_].snapping&&i.options.snap.release&&i.options.snap.release.call(i.element,t,k.extend(i._uiHash(),{snapItem:i.snapElements[_].item})),i.snapElements[_].snapping=!1):("inner"!==d.snapMode&&(s=Math.abs(h-v)<=p,n=Math.abs(c-g)<=p,o=Math.abs(r-m)<=p,a=Math.abs(l-f)<=p,s&&(e.position.top=i._convertPositionTo("relative",{top:h-i.helperProportions.height,left:0}).top),n&&(e.position.top=i._convertPositionTo("relative",{top:c,left:0}).top),o&&(e.position.left=i._convertPositionTo("relative",{top:0,left:r-i.helperProportions.width}).left),a&&(e.position.left=i._convertPositionTo("relative",{top:0,left:l}).left)),u=s||n||o||a,"outer"!==d.snapMode&&(s=Math.abs(h-g)<=p,n=Math.abs(c-v)<=p,o=Math.abs(r-f)<=p,a=Math.abs(l-m)<=p,s&&(e.position.top=i._convertPositionTo("relative",{top:h,left:0}).top),n&&(e.position.top=i._convertPositionTo("relative",{top:c-i.helperProportions.height,left:0}).top),o&&(e.position.left=i._convertPositionTo("relative",{top:0,left:r}).left),a&&(e.position.left=i._convertPositionTo("relative",{top:0,left:l-i.helperProportions.width}).left)),!i.snapElements[_].snapping&&(s||n||o||a||u)&&i.options.snap.snap&&i.options.snap.snap.call(i.element,t,k.extend(i._uiHash(),{snapItem:i.snapElements[_].item})),i.snapElements[_].snapping=s||n||o||a||u)}}),k.ui.plugin.add("draggable","stack",{start:function(t,e,i){var s,n=i.options,o=k.makeArray(k(n.stack)).sort(function(t,e){return(parseInt(k(t).css("zIndex"),10)||0)-(parseInt(k(e).css("zIndex"),10)||0)});o.length&&(s=parseInt(k(o[0]).css("zIndex"),10)||0,k(o).each(function(t){k(this).css("zIndex",s+t)}),this.css("zIndex",s+o.length))}}),k.ui.plugin.add("draggable","zIndex",{start:function(t,e,i){var s=k(e.helper),n=i.options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(t,e,i){var s=i.options;s._zIndex&&k(e.helper).css("zIndex",s._zIndex)}});k.ui.draggable;k.widget("ui.resizable",k.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(t,e){if("hidden"===k(t).css("overflow"))return!1;var i,s=e&&"left"===e?"scrollLeft":"scrollTop";return 0<t[s]||(t[s]=1,i=0<t[s],t[s]=0,i)},_create:function(){var t,e=this.options,i=this;this._addClass("ui-resizable"),k.extend(this,{_aspectRatio:!!e.aspectRatio,aspectRatio:e.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:e.helper||e.ghost||e.animate?e.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(k("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,t={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(t),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(t),this._proportionallyResize()),this._setupHandles(),e.autoHide&&k(this.element).on("mouseenter",function(){e.disabled||(i._removeClass("ui-resizable-autohide"),i._handles.show())}).on("mouseleave",function(){e.disabled||i.resizing||(i._addClass("ui-resizable-autohide"),i._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();function t(t){k(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()}var e;return this.elementIsWrapper&&(t(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles()}},_setupHandles:function(){var t,e,i,s,n,o=this.options,a=this;if(this.handles=o.handles||(k(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=k(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),i=this.handles.split(","),this.handles={},e=0;e<i.length;e++)s="ui-resizable-"+(t=k.trim(i[e])),n=k("<div>"),this._addClass(n,"ui-resizable-handle "+s),n.css({zIndex:o.zIndex}),this.handles[t]=".ui-resizable-"+t,this.element.append(n);this._renderAxis=function(t){var e,i,s,n;for(e in t=t||this.element,this.handles)this.handles[e].constructor===String?this.handles[e]=this.element.children(this.handles[e]).first().show():(this.handles[e].jquery||this.handles[e].nodeType)&&(this.handles[e]=k(this.handles[e]),this._on(this.handles[e],{mousedown:a._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(i=k(this.handles[e],this.element),n=/sw|ne|nw|se|n|s/.test(e)?i.outerHeight():i.outerWidth(),s=["padding",/ne|nw|n/.test(e)?"Top":/se|sw|s/.test(e)?"Bottom":/^e$/.test(e)?"Right":"Left"].join(""),t.css(s,n),this._proportionallyResize()),this._handles=this._handles.add(this.handles[e])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){a.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=n&&n[1]?n[1]:"se")}),o.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(t){var e,i,s=!1;for(e in this.handles)(i=k(this.handles[e])[0])!==t.target&&!k.contains(i,t.target)||(s=!0);return!this.options.disabled&&s},_mouseStart:function(t){var e,i,s,n=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),e=this._num(this.helper.css("left")),i=this._num(this.helper.css("top")),n.containment&&(e+=k(n.containment).scrollLeft()||0,i+=k(n.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:e,top:i},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:e,top:i},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof n.aspectRatio?n.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=k(".ui-resizable-"+this.axis).css("cursor"),k("body").css("cursor","auto"===s?this.axis+"-resize":s),this._addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var e,i,s=this.originalMousePosition,n=this.axis,o=t.pageX-s.left||0,a=t.pageY-s.top||0,r=this._change[n];return this._updatePrevProperties(),r&&(e=r.apply(this,[t,o,a]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(e=this._updateRatio(e,t)),e=this._respectSize(e,t),this._updateCache(e),this._propagate("resize",t),i=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),k.isEmptyObject(i)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges())),!1},_mouseStop:function(t){this.resizing=!1;var e,i,s,n,o,a,r,l=this.options,h=this;return this._helper&&(s=(i=(e=this._proportionallyResizeElements).length&&/textarea/i.test(e[0].nodeName))&&this._hasScroll(e[0],"left")?0:h.sizeDiff.height,n=i?0:h.sizeDiff.width,o={width:h.helper.width()-n,height:h.helper.height()-s},a=parseFloat(h.element.css("left"))+(h.position.left-h.originalPosition.left)||null,r=parseFloat(h.element.css("top"))+(h.position.top-h.originalPosition.top)||null,l.animate||this.element.css(k.extend(o,{top:r,left:a})),h.helper.height(h.size.height),h.helper.width(h.size.width),this._helper&&!l.animate&&this._proportionallyResize()),k("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o=this.options,a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0};(this._aspectRatio||t)&&(e=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,e>a.minWidth&&(a.minWidth=e),s>a.minHeight&&(a.minHeight=s),i<a.maxWidth&&(a.maxWidth=i),n<a.maxHeight&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,h=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&h&&(t.left=r-e.minWidth),s&&h&&(t.left=r-e.maxWidth),a&&c&&(t.top=l-e.minHeight),n&&c&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];e<4;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;e<this._proportionallyResizeElements.length;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,e=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||k("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++e.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize;return{left:this.originalPosition.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize;return{top:this.originalPosition.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(t,e,i){return k.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,e,i]))},sw:function(t,e,i){return k.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,e,i]))},ne:function(t,e,i){return k.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,e,i]))},nw:function(t,e,i){return k.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,e,i]))}},_propagate:function(t,e){k.ui.plugin.call(this,t,[e,this.ui()]),"resize"!==t&&this._trigger(t,e,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),k.ui.plugin.add("resizable","animate",{stop:function(e){var i=k(this).resizable("instance"),t=i.options,s=i._proportionallyResizeElements,n=s.length&&/textarea/i.test(s[0].nodeName),o=n&&i._hasScroll(s[0],"left")?0:i.sizeDiff.height,a=n?0:i.sizeDiff.width,r={width:i.size.width-a,height:i.size.height-o},l=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,h=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(k.extend(r,h&&l?{top:h,left:l}:{}),{duration:t.animateDuration,easing:t.animateEasing,step:function(){var t={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};s&&s.length&&k(s[0]).css({width:t.width,height:t.height}),i._updateCache(t),i._propagate("resize",e)}})}}),k.ui.plugin.add("resizable","containment",{start:function(){var i,s,t,e,n,o,a,r=k(this).resizable("instance"),l=r.options,h=r.element,c=l.containment,u=c instanceof k?c.get(0):/parent/.test(c)?h.parent().get(0):c;u&&(r.containerElement=k(u),/document/.test(c)||c===document?(r.containerOffset={left:0,top:0},r.containerPosition={left:0,top:0},r.parentData={element:k(document),left:0,top:0,width:k(document).width(),height:k(document).height()||document.body.parentNode.scrollHeight}):(i=k(u),s=[],k(["Top","Right","Left","Bottom"]).each(function(t,e){s[t]=r._num(i.css("padding"+e))}),r.containerOffset=i.offset(),r.containerPosition=i.position(),r.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},t=r.containerOffset,e=r.containerSize.height,n=r.containerSize.width,o=r._hasScroll(u,"left")?u.scrollWidth:n,a=r._hasScroll(u)?u.scrollHeight:e,r.parentData={element:u,left:t.left,top:t.top,width:o,height:a}))},resize:function(t){var e,i,s,n,o=k(this).resizable("instance"),a=o.options,r=o.containerOffset,l=o.position,h=o._aspectRatio||t.shiftKey,c={top:0,left:0},u=o.containerElement,d=!0;u[0]!==document&&/static/.test(u.css("position"))&&(c=r),l.left<(o._helper?r.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-r.left:o.position.left-c.left),h&&(o.size.height=o.size.width/o.aspectRatio,d=!1),o.position.left=a.helper?r.left:0),l.top<(o._helper?r.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-r.top:o.position.top),h&&(o.size.width=o.size.height*o.aspectRatio,d=!1),o.position.top=o._helper?r.top:0),s=o.containerElement.get(0)===o.element.parent().get(0),n=/relative|absolute/.test(o.containerElement.css("position")),s&&n?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),e=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-c.left:o.offset.left-r.left)),i=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-c.top:o.offset.top-r.top)),e+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-e,h&&(o.size.height=o.size.width/o.aspectRatio,d=!1)),i+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-i,h&&(o.size.width=o.size.height*o.aspectRatio,d=!1)),d||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=k(this).resizable("instance"),e=t.options,i=t.containerOffset,s=t.containerPosition,n=t.containerElement,o=k(t.helper),a=o.offset(),r=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!e.animate&&/relative/.test(n.css("position"))&&k(this).css({left:a.left-s.left-i.left,width:r,height:l}),t._helper&&!e.animate&&/static/.test(n.css("position"))&&k(this).css({left:a.left-s.left-i.left,width:r,height:l})}}),k.ui.plugin.add("resizable","alsoResize",{start:function(){var t=k(this).resizable("instance").options;k(t.alsoResize).each(function(){var t=k(this);t.data("ui-resizable-alsoresize",{width:parseFloat(t.width()),height:parseFloat(t.height()),left:parseFloat(t.css("left")),top:parseFloat(t.css("top"))})})},resize:function(t,i){var e=k(this).resizable("instance"),s=e.options,n=e.originalSize,o=e.originalPosition,a={height:e.size.height-n.height||0,width:e.size.width-n.width||0,top:e.position.top-o.top||0,left:e.position.left-o.left||0};k(s.alsoResize).each(function(){var t=k(this),s=k(this).data("ui-resizable-alsoresize"),n={},e=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];k.each(e,function(t,e){var i=(s[e]||0)+(a[e]||0);i&&0<=i&&(n[e]=i||null)}),t.css(n)})},stop:function(){k(this).removeData("ui-resizable-alsoresize")}}),k.ui.plugin.add("resizable","ghost",{start:function(){var t=k(this).resizable("instance"),e=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}),t._addClass(t.ghost,"ui-resizable-ghost"),!1!==k.uiBackCompat&&"string"==typeof t.options.ghost&&t.ghost.addClass(this.options.ghost),t.ghost.appendTo(t.helper)},resize:function(){var t=k(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=k(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),k.ui.plugin.add("resizable","grid",{resize:function(){var t,e=k(this).resizable("instance"),i=e.options,s=e.size,n=e.originalSize,o=e.originalPosition,a=e.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,l=r[0]||1,h=r[1]||1,c=Math.round((s.width-n.width)/l)*l,u=Math.round((s.height-n.height)/h)*h,d=n.width+c,p=n.height+u,f=i.maxWidth&&i.maxWidth<d,m=i.maxHeight&&i.maxHeight<p,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,g&&(d+=l),v&&(p+=h),f&&(d-=l),m&&(p-=h),/^(se|s|e)$/.test(a)?(e.size.width=d,e.size.height=p):/^(ne)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.top=o.top-u):/^(sw)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.left=o.left-c):((p-h<=0||d-l<=0)&&(t=e._getPaddingPlusBorderDimensions(this)),0<p-h?(e.size.height=p,e.position.top=o.top-u):(p=h-t.height,e.size.height=p,e.position.top=o.top+n.height-p),0<d-l?(e.size.width=d,e.position.left=o.left-c):(d=l-t.width,e.size.width=d,e.position.left=o.left+n.width-d))}});k.ui.resizable;k.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var e=k(this).css(t).offset().top;e<0&&k(this).css("top",t.top-e)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&k.fn.draggable&&this._makeDraggable(),this.options.resizable&&k.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?k(t):this.document.find(t||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(t=e.parent.children().eq(e.index)).length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:k.noop,enable:k.noop,close:function(t){var e=this;this._isOpen&&!1!==this._trigger("beforeClose",t)&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||k.ui.safeBlur(k.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){e._trigger("close",t)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!1,s=this.uiDialog.siblings(".ui-front:visible").map(function(){return+k(this).css("z-index")}).get(),n=Math.max.apply(null,s);return n>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",n+1),i=!0),i&&!e&&this._trigger("focus",t),i},open:function(){var t=this;this._isOpen?this._moveToTop()&&this._focusTabbable():(this._isOpen=!0,this.opener=k(k.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"))},_focusTabbable:function(){var t=this._focusedElement;(t=t||this.element.find("[autofocus]")).length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).trigger("focus")},_keepFocus:function(t){function e(){var t=k.ui.safeActiveElement(this.document[0]);this.uiDialog[0]===t||k.contains(this.uiDialog[0],t)||this._focusTabbable()}t.preventDefault(),e.call(this),this._delay(e)},_createWrapper:function(){this.uiDialog=k("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===k.ui.keyCode.ESCAPE)return t.preventDefault(),void this.close(t);var e,i,s;t.keyCode!==k.ui.keyCode.TAB||t.isDefaultPrevented()||(e=this.uiDialog.find(":tabbable"),i=e.filter(":first"),s=e.filter(":last"),t.target!==s[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==i[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){s.trigger("focus")}),t.preventDefault()):(this._delay(function(){i.trigger("focus")}),t.preventDefault()))},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=k("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(t){k(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=k("<button type='button'></button>").button({label:k("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),t=k("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(t,"ui-dialog-title"),this._title(t),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(t){this.options.title?t.text(this.options.title):t.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=k("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=k("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var n=this,t=this.options.buttons;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),k.isEmptyObject(t)||k.isArray(t)&&!t.length?this._removeClass(this.uiDialog,"ui-dialog-buttons"):(k.each(t,function(t,e){var i,s;e=k.isFunction(e)?{click:e,text:t}:e,e=k.extend({type:"button"},e),i=e.click,s={icon:e.icon,iconPosition:e.iconPosition,showLabel:e.showLabel,icons:e.icons,text:e.text},delete e.click,delete e.icon,delete e.iconPosition,delete e.showLabel,delete e.icons,"boolean"==typeof e.text&&delete e.text,k("<button></button>",e).button(s).appendTo(n.uiButtonSet).on("click",function(){i.apply(n.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){var n=this,o=this.options;function a(t){return{position:t.position,offset:t.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(t,e){n._addClass(k(this),"ui-dialog-dragging"),n._blockFrames(),n._trigger("dragStart",t,a(e))},drag:function(t,e){n._trigger("drag",t,a(e))},stop:function(t,e){var i=e.offset.left-n.document.scrollLeft(),s=e.offset.top-n.document.scrollTop();o.position={my:"left top",at:"left"+(0<=i?"+":"")+i+" top"+(0<=s?"+":"")+s,of:n.window},n._removeClass(k(this),"ui-dialog-dragging"),n._unblockFrames(),n._trigger("dragStop",t,a(e))}})},_makeResizable:function(){var o=this,a=this.options,t=a.resizable,e=this.uiDialog.css("position"),i="string"==typeof t?t:"n,e,s,w,se,sw,ne,nw";function r(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:a.maxWidth,maxHeight:a.maxHeight,minWidth:a.minWidth,minHeight:this._minHeight(),handles:i,start:function(t,e){o._addClass(k(this),"ui-dialog-resizing"),o._blockFrames(),o._trigger("resizeStart",t,r(e))},resize:function(t,e){o._trigger("resize",t,r(e))},stop:function(t,e){var i=o.uiDialog.offset(),s=i.left-o.document.scrollLeft(),n=i.top-o.document.scrollTop();a.height=o.uiDialog.height(),a.width=o.uiDialog.width(),a.position={my:"left top",at:"left"+(0<=s?"+":"")+s+" top"+(0<=n?"+":"")+n,of:o.window},o._removeClass(k(this),"ui-dialog-resizing"),o._unblockFrames(),o._trigger("resizeStop",t,r(e))}}).css("position",e)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=k(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),e=k.inArray(this,t);-1!==e&&t.splice(e,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};k.each(t,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(s=!0),t in i.resizableRelatedOptions&&(n[t]=e)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(t,e){var i,s,n=this.uiDialog;"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:k("<a>").text(""+this.options.closeText).html()}),"draggable"===t&&((i=n.is(":data(ui-draggable)"))&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&((s=n.is(":data(ui-resizable)"))&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||!1===e||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=k(this);return k("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return!!k(t.target).closest(".ui-dialog").length||!!k(t.target).closest(".ui-datepicker").length},_createOverlay:function(){var e;this.options.modal&&(e=!0,this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=k("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1))},_destroyOverlay:function(){var t;this.options.modal&&this.overlay&&((t=this.document.data("ui-dialog-overlays")-1)?this.document.data("ui-dialog-overlays",t):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null)}}),!1!==k.uiBackCompat&&k.widget("ui.dialog",k.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(t,e){"dialogClass"===t&&this.uiDialog.removeClass(this.options.dialogClass).addClass(e),this._superApply(arguments)}});k.ui.dialog;k.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,e=this.options,i=e.accept;this.isover=!1,this.isout=!0,this.accept=k.isFunction(i)?i:function(t){return t.is(i)},this.proportions=function(){if(!arguments.length)return t||(t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight});t=arguments[0]},this._addToManager(e.scope),e.addClasses&&this._addClass("ui-droppable")},_addToManager:function(t){k.ui.ddmanager.droppables[t]=k.ui.ddmanager.droppables[t]||[],k.ui.ddmanager.droppables[t].push(this)},_splice:function(t){for(var e=0;e<t.length;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var t=k.ui.ddmanager.droppables[this.options.scope];this._splice(t)},_setOption:function(t,e){var i;"accept"===t?this.accept=k.isFunction(e)?e:function(t){return t.is(e)}:"scope"===t&&(i=k.ui.ddmanager.droppables[this.options.scope],this._splice(i),this._addToManager(e)),this._super(t,e)},_activate:function(t){var e=k.ui.ddmanager.current;this._addActiveClass(),e&&this._trigger("activate",t,this.ui(e))},_deactivate:function(t){var e=k.ui.ddmanager.current;this._removeActiveClass(),e&&this._trigger("deactivate",t,this.ui(e))},_over:function(t){var e=k.ui.ddmanager.current;e&&(e.currentItem||e.element)[0]!==this.element[0]&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this._addHoverClass(),this._trigger("over",t,this.ui(e)))},_out:function(t){var e=k.ui.ddmanager.current;e&&(e.currentItem||e.element)[0]!==this.element[0]&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this._removeHoverClass(),this._trigger("out",t,this.ui(e)))},_drop:function(e,t){var i=t||k.ui.ddmanager.current,s=!1;return!(!i||(i.currentItem||i.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var t=k(this).droppable("instance");if(t.options.greedy&&!t.options.disabled&&t.options.scope===i.options.scope&&t.accept.call(t.element[0],i.currentItem||i.element)&&nt(i,k.extend(t,{offset:t.element.offset()}),t.options.tolerance,e))return!(s=!0)}),!s&&(!!this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",e,this.ui(i)),this.element)))},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var nt=k.ui.intersect=function(t,e,i,s){if(!e.offset)return!1;var n=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,a=n+t.helperProportions.width,r=o+t.helperProportions.height,l=e.offset.left,h=e.offset.top,c=l+e.proportions().width,u=h+e.proportions().height;switch(i){case"fit":return l<=n&&a<=c&&h<=o&&r<=u;case"intersect":return l<n+t.helperProportions.width/2&&a-t.helperProportions.width/2<c&&h<o+t.helperProportions.height/2&&r-t.helperProportions.height/2<u;case"pointer":return ot(s.pageY,h,e.proportions().height)&&ot(s.pageX,l,e.proportions().width);case"touch":return(h<=o&&o<=u||h<=r&&r<=u||o<h&&u<r)&&(l<=n&&n<=c||l<=a&&a<=c||n<l&&c<a);default:return!1}};function ot(t,e,i){return e<=t&&t<e+i}!(k.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(t,e){var i,s,n=k.ui.ddmanager.droppables[t.options.scope]||[],o=e?e.type:null,a=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();t:for(i=0;i<n.length;i++)if(!(n[i].options.disabled||t&&!n[i].accept.call(n[i].element[0],t.currentItem||t.element))){for(s=0;s<a.length;s++)if(a[s]===n[i].element[0]){n[i].proportions().height=0;continue t}n[i].visible="none"!==n[i].element.css("display"),n[i].visible&&("mousedown"===o&&n[i]._activate.call(n[i],e),n[i].offset=n[i].element.offset(),n[i].proportions({width:n[i].element[0].offsetWidth,height:n[i].element[0].offsetHeight}))}},drop:function(t,e){var i=!1;return k.each((k.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&nt(t,this,this.options.tolerance,e)&&(i=this._drop.call(this,e)||i),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,e)))}),i},dragStart:function(t,e){t.element.parentsUntil("body").on("scroll.droppable",function(){t.options.refreshPositions||k.ui.ddmanager.prepareOffsets(t,e)})},drag:function(o,a){o.options.refreshPositions&&k.ui.ddmanager.prepareOffsets(o,a),k.each(k.ui.ddmanager.droppables[o.options.scope]||[],function(){var t,e,i,s,n;this.options.disabled||this.greedyChild||!this.visible||(n=!(s=nt(o,this,this.options.tolerance,a))&&this.isover?"isout":s&&!this.isover?"isover":null)&&(this.options.greedy&&(e=this.options.scope,(i=this.element.parents(":data(ui-droppable)").filter(function(){return k(this).droppable("instance").options.scope===e})).length&&((t=k(i[0]).droppable("instance")).greedyChild="isover"===n)),t&&"isover"===n&&(t.isover=!1,t.isout=!0,t._out.call(t,a)),this[n]=!0,this["isout"===n?"isover":"isout"]=!1,this["isover"===n?"_over":"_out"].call(this,a),t&&"isout"===n&&(t.isout=!1,t.isover=!0,t._over.call(t,a)))})},dragStop:function(t,e){t.element.parentsUntil("body").off("scroll.droppable"),t.options.refreshPositions||k.ui.ddmanager.prepareOffsets(t,e)}})!==k.uiBackCompat&&k.widget("ui.droppable",k.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}});k.ui.droppable,k.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=k("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(t){if(void 0===t)return this.options.value;this.options.value=this._constrainedValue(t),this._refreshValue()},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=!1===t,"number"!=typeof t&&(t=0),!this.indeterminate&&Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,e=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).width(e.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,t===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=k("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),k.widget("ui.selectable",k.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var s=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){s.elementPos=k(s.element[0]).offset(),s.selectees=k(s.options.filter,s.element[0]),s._addClass(s.selectees,"ui-selectee"),s.selectees.each(function(){var t=k(this),e=t.offset(),i={left:e.left-s.elementPos.left,top:e.top-s.elementPos.top};k.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=k("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(i){var s=this,t=this.options;this.opos=[i.pageX,i.pageY],this.elementPos=k(this.element[0]).offset(),this.options.disabled||(this.selectees=k(t.filter,this.element[0]),this._trigger("start",i),k(t.appendTo).append(this.helper),this.helper.css({left:i.pageX,top:i.pageY,width:0,height:0}),t.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var t=k.data(this,"selectable-item");t.startselected=!0,i.metaKey||i.ctrlKey||(s._removeClass(t.$element,"ui-selected"),t.selected=!1,s._addClass(t.$element,"ui-unselecting"),t.unselecting=!0,s._trigger("unselecting",i,{unselecting:t.element}))}),k(i.target).parents().addBack().each(function(){var t,e=k.data(this,"selectable-item");if(e)return t=!i.metaKey&&!i.ctrlKey||!e.$element.hasClass("ui-selected"),s._removeClass(e.$element,t?"ui-unselecting":"ui-selected")._addClass(e.$element,t?"ui-selecting":"ui-unselecting"),e.unselecting=!t,e.selecting=t,(e.selected=t)?s._trigger("selecting",i,{selecting:e.element}):s._trigger("unselecting",i,{unselecting:e.element}),!1}))},_mouseDrag:function(s){if(this.dragged=!0,!this.options.disabled){var t,n=this,o=this.options,a=this.opos[0],r=this.opos[1],l=s.pageX,h=s.pageY;return l<a&&(t=l,l=a,a=t),h<r&&(t=h,h=r,r=t),this.helper.css({left:a,top:r,width:l-a,height:h-r}),this.selectees.each(function(){var t=k.data(this,"selectable-item"),e=!1,i={};t&&t.element!==n.element[0]&&(i.left=t.left+n.elementPos.left,i.right=t.right+n.elementPos.left,i.top=t.top+n.elementPos.top,i.bottom=t.bottom+n.elementPos.top,"touch"===o.tolerance?e=!(i.left>l||i.right<a||i.top>h||i.bottom<r):"fit"===o.tolerance&&(e=i.left>a&&i.right<l&&i.top>r&&i.bottom<h),e?(t.selected&&(n._removeClass(t.$element,"ui-selected"),t.selected=!1),t.unselecting&&(n._removeClass(t.$element,"ui-unselecting"),t.unselecting=!1),t.selecting||(n._addClass(t.$element,"ui-selecting"),t.selecting=!0,n._trigger("selecting",s,{selecting:t.element}))):(t.selecting&&((s.metaKey||s.ctrlKey)&&t.startselected?(n._removeClass(t.$element,"ui-selecting"),t.selecting=!1,n._addClass(t.$element,"ui-selected"),t.selected=!0):(n._removeClass(t.$element,"ui-selecting"),t.selecting=!1,t.startselected&&(n._addClass(t.$element,"ui-unselecting"),t.unselecting=!0),n._trigger("unselecting",s,{unselecting:t.element}))),t.selected&&(s.metaKey||s.ctrlKey||t.startselected||(n._removeClass(t.$element,"ui-selected"),t.selected=!1,n._addClass(t.$element,"ui-unselecting"),t.unselecting=!0,n._trigger("unselecting",s,{unselecting:t.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,k(".ui-unselecting",this.element[0]).each(function(){var t=k.data(this,"selectable-item");i._removeClass(t.$element,"ui-unselecting"),t.unselecting=!1,t.startselected=!1,i._trigger("unselected",e,{unselected:t.element})}),k(".ui-selecting",this.element[0]).each(function(){var t=k.data(this,"selectable-item");i._removeClass(t.$element,"ui-selecting")._addClass(t.$element,"ui-selected"),t.selecting=!1,t.selected=!0,t.startselected=!0,i._trigger("selected",e,{selected:t.element})}),this._trigger("stop",e),this.helper.remove(),!1}}),k.widget("ui.selectmenu",[k.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=k()},_drawButton:function(){var t,e=this,i=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=k("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),t=k("<span>").appendTo(this.button),this._addClass(t,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(i).appendTo(this.button),!1!==this.options.width&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){e._rendered||e._refreshMenu()})},_drawMenu:function(){var s=this;this.menu=k("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=k("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(t,e){t.preventDefault(),s._setSelection(),s._select(e.item.data("ui-selectmenu-item"),t)},focus:function(t,e){var i=e.item.data("ui-selectmenu-item");null!=s.focusIndex&&i.index!==s.focusIndex&&(s._trigger("focus",t,{item:i}),s.isOpen||s._select(i,t)),s.focusIndex=i.index,s.button.attr("aria-activedescendant",s.menuItems.eq(i.index).attr("id"))}}).menu("instance"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var t,e=this.element.find("option");this.menu.empty(),this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,e.length&&(t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this._rendered?(this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t)))},_position:function(){this.menuWrap.position(k.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(t){var e=k("<span>");return this._setText(e,t.label),this._addClass(e,"ui-selectmenu-text"),e},_renderMenu:function(s,t){var n=this,o="";k.each(t,function(t,e){var i;e.optgroup!==o&&(i=k("<li>",{text:e.optgroup}),n._addClass(i,"ui-selectmenu-optgroup","ui-menu-divider"+(e.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),i.appendTo(s),o=e.optgroup),n._renderItemData(s,e)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(t,e){var i=k("<li>"),s=k("<div>",{title:e.element.attr("title")});return e.disabled&&this._addClass(i,null,"ui-state-disabled"),this._setText(s,e.label),i.append(s).appendTo(t)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),n+=":not(.ui-state-disabled)"),(s="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](n).eq(-1):i[t+"All"](n).eq(0)).length&&this.menuInstance.focus(e,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?((t=window.getSelection()).removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(k(t.target).closest(".ui-selectmenu-menu, #"+k.ui.escapeSelector(this.ids.button)).length||this.close(t))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection()).rangeCount&&(this.range=t.getRangeAt(0)):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(t){var e=!0;switch(t.keyCode){case k.ui.keyCode.TAB:case k.ui.keyCode.ESCAPE:this.close(t),e=!1;break;case k.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case k.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case k.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case k.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case k.ui.keyCode.LEFT:this._move("prev",t);break;case k.ui.keyCode.RIGHT:this._move("next",t);break;case k.ui.keyCode.HOME:case k.ui.keyCode.PAGE_UP:this._move("first",t);break;case k.ui.keyCode.END:case k.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),e=!1}e&&t.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(t)),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){var i;"icons"===t&&(i=this.button.find("span.ui-icon"),this._removeClass(i,null,this.options.icons.button)._addClass(i,null,e.button)),this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"width"===t&&this._resizeButton()},_setOptionDisabled:function(t){this._super(t),this.menuInstance.option("disabled",t),this.button.attr("aria-disabled",t),this._toggleClass(this.button,null,"ui-state-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var t=this.options.appendTo;return(t=t&&(t.jquery||t.nodeType?k(t):this.document.find(t).eq(0)))&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;!1!==t?(null===t&&(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t)):this.button.css("width","")},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var t=this._super();return t.disabled=this.element.prop("disabled"),t},_parseOptions:function(t){var i=this,s=[];t.each(function(t,e){s.push(i._parseOption(k(e),t))}),this.items=s},_parseOption:function(t,e){var i=t.parent("optgroup");return{element:t,index:e,value:t.val(),label:t.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||t.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),k.widget("ui.slider",k.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,e=this.options,i=this.element.find(".ui-slider-handle"),s=[],n=e.values&&e.values.length||1;for(i.length>n&&(i.slice(n).remove(),i=i.slice(0,n)),t=i.length;t<n;t++)s.push("<span tabindex='0'></span>");this.handles=i.add(k(s.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(t){k(this).data("ui-slider-handle-index",t).attr("tabIndex",0)})},_createRange:function(){var t=this.options;t.range?(!0===t.range&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:k.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=k("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),"min"!==t.range&&"max"!==t.range||this._addClass(this.range,"ui-slider-range-"+t.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(t){var e,i,s,n,o,a,r,l=this,h=this.options;return!h.disabled&&(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e),s=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var e=Math.abs(i-l.values(t));(e<s||s===e&&(t===l._lastChangedValue||l.values(t)===h.min))&&(s=e,n=k(this),o=t)}),!1!==this._start(t,o)&&(this._mouseSliding=!0,this._handleIndex=o,this._addClass(n,null,"ui-state-active"),n.trigger("focus"),a=n.offset(),r=!k(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=r?{left:0,top:0}:{left:t.pageX-a.left-n.width()/2,top:t.pageY-a.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,i),this._animateOff=!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n="horizontal"===this.orientation?(e=this.elementSize.width,t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),o=n/e;return 1<o&&(o=1),o<0&&(o=0),"vertical"===this.orientation&&(o=1-o),i=this._valueMax()-this._valueMin(),s=this._valueMin()+o*i,this._trimAlignValue(s)},_uiHash:function(t,e,i){var s={handle:this.handles[t],handleIndex:t,value:void 0!==e?e:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==e?e:this.values(t),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(t,e){return this._trigger("start",t,this._uiHash(e))},_slide:function(t,e,i){var s,n=this.value(),o=this.values();this._hasMultipleValues()&&(s=this.values(e?0:1),n=this.values(e),2===this.options.values.length&&!0===this.options.range&&(i=0===e?Math.min(s,i):Math.max(s,i)),o[e]=i),i!==n&&!1!==this._trigger("slide",t,this._uiHash(e,i,o))&&(this._hasMultipleValues()?this.values(e,i):this.value(i))},_stop:function(t,e){this._trigger("stop",t,this._uiHash(e))},_change:function(t,e){this._keySliding||this._mouseSliding||(this._lastChangedValue=e,this._trigger("change",t,this._uiHash(e)))},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),void this._change(null,0)):this._value()},values:function(t,e){var i,s,n;if(1<arguments.length)return this.options.values[t]=this._trimAlignValue(e),this._refreshValue(),void this._change(null,t);if(!arguments.length)return this._values();if(!k.isArray(t))return this._hasMultipleValues()?this._values(t):this.value();for(i=this.options.values,s=t,n=0;n<i.length;n+=1)i[n]=this._trimAlignValue(s[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,e){var i,s=0;switch("range"===t&&!0===this.options.range&&("min"===e?(this.options.value=this._values(0),this.options.values=null):"max"===e&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),k.isArray(this.options.values)&&(s=this.options.values.length),this._super(t,e),t){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(e),this.handles.css("horizontal"===e?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),i=s-1;0<=i;i--)this._change(null,i);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(t){this._super(t),this._toggleClass(null,"ui-state-disabled",!!t)},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;s<i.length;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(t<=this._valueMin())return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=0<this.options.step?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=0<i?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step;(t=Math.round((t-e)/i)*i+e)>this.options.max&&(t-=i),this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=t.toString(),i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(t){"vertical"===t&&this.range.css({width:"",left:""}),"horizontal"===t&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var e,i,t,s,n,o=this.options.range,a=this.options,r=this,l=!this._animateOff&&a.animate,h={};this._hasMultipleValues()?this.handles.each(function(t){i=(r.values(t)-r._valueMin())/(r._valueMax()-r._valueMin())*100,h["horizontal"===r.orientation?"left":"bottom"]=i+"%",k(this).stop(1,1)[l?"animate":"css"](h,a.animate),!0===r.options.range&&("horizontal"===r.orientation?(0===t&&r.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},a.animate),1===t&&r.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:a.animate})):(0===t&&r.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},a.animate),1===t&&r.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:a.animate}))),e=i}):(t=this.value(),s=this._valueMin(),n=this._valueMax(),i=n!==s?(t-s)/(n-s)*100:0,h["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](h,a.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},a.animate),"max"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:100-i+"%"},a.animate),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},a.animate),"max"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:100-i+"%"},a.animate))},_handleEvents:{keydown:function(t){var e,i,s,n=k(t.target).data("ui-slider-handle-index");switch(t.keyCode){case k.ui.keyCode.HOME:case k.ui.keyCode.END:case k.ui.keyCode.PAGE_UP:case k.ui.keyCode.PAGE_DOWN:case k.ui.keyCode.UP:case k.ui.keyCode.RIGHT:case k.ui.keyCode.DOWN:case k.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(k(t.target),null,"ui-state-active"),!1===this._start(t,n)))return}switch(s=this.options.step,e=i=this._hasMultipleValues()?this.values(n):this.value(),t.keyCode){case k.ui.keyCode.HOME:i=this._valueMin();break;case k.ui.keyCode.END:i=this._valueMax();break;case k.ui.keyCode.PAGE_UP:i=this._trimAlignValue(e+(this._valueMax()-this._valueMin())/this.numPages);break;case k.ui.keyCode.PAGE_DOWN:i=this._trimAlignValue(e-(this._valueMax()-this._valueMin())/this.numPages);break;case k.ui.keyCode.UP:case k.ui.keyCode.RIGHT:if(e===this._valueMax())return;i=this._trimAlignValue(e+s);break;case k.ui.keyCode.DOWN:case k.ui.keyCode.LEFT:if(e===this._valueMin())return;i=this._trimAlignValue(e-s)}this._slide(t,n,i)},keyup:function(t){var e=k(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,e),this._change(t,e),this._removeClass(k(t.target),null,"ui-state-active"))}}}),k.widget("ui.sortable",k.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return e<=t&&t<e+i},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var t=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),k.each(this.items,function(){t._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;0<=t;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,e){var i=null,s=!1,n=this;return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(t),k(t.target).parents().each(function(){if(k.data(this,n.widgetName+"-item")===n)return i=k(this),!1}),k.data(t.target,n.widgetName+"-item")===n&&(i=k(t.target)),!!i&&(!(this.options.handle&&!e&&(k(this.options.handle,i).find("*").addBack().each(function(){this===t.target&&(s=!0)}),!s))&&(this.currentItem=i,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(t,e,i){var s,n,o=this.options;if((this.currentContainer=this).refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},k.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",o.cursor),this.storedStylesheet=k("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(n)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!i)for(s=this.containers.length-1;0<=s;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return k.ui.ddmanager&&(k.ui.ddmanager.current=this),k.ui.ddmanager&&!o.dropBehaviour&&k.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var e,i,s,n,o=this.options,a=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=a=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=a=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=a=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=a=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-this.document.scrollTop()<o.scrollSensitivity?a=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<o.scrollSensitivity&&(a=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),t.pageX-this.document.scrollLeft()<o.scrollSensitivity?a=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(a=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),!1!==a&&k.ui.ddmanager&&!o.dropBehaviour&&k.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e=this.items.length-1;0<=e;e--)if(s=(i=this.items[e]).item[0],(n=this._intersectsWithPointer(i))&&i.instance===this.currentContainer&&!(s===this.currentItem[0]||this.placeholder[1===n?"next":"prev"]()[0]===s||k.contains(this.placeholder[0],s)||"semi-dynamic"===this.options.type&&k.contains(this.element[0],s))){if(this.direction=1===n?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(i))break;this._rearrange(t,i),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),k.ui.ddmanager&&k.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,e){var i,s,n,o;if(t)return k.ui.ddmanager&&!this.options.dropBehaviour&&k.ui.ddmanager.drop(this,t),this.options.revert?(s=(i=this).placeholder.offset(),o={},(n=this.options.axis)&&"x"!==n||(o.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),n&&"y"!==n||(o.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,k(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){i._clear(t)})):this._clear(t,e),!1},cancel:function(){if(this.dragging){this._mouseUp(new k.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var t=this.containers.length-1;0<=t;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),k.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?k(this.domPosition.prev).after(this.currentItem):k(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var t=this._getItemsAsjQuery(e&&e.connected),i=[];return e=e||{},k(t).each(function(){var t=(k(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);t&&i.push((e.key||t[1]+"[]")+"="+(e.key&&e.expression?t[1]:t[2]))}),!i.length&&e.key&&i.push(e.key+"="),i.join("&")},toArray:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},e.each(function(){i.push(k(t.item||this).attr(t.attribute||"id")||"")}),i},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||r<s+h&&s+h<l,d="y"===this.options.axis||o<e+c&&e+c<a,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:o<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<a&&r<s+this.helperProportions.height/2&&n-this.helperProportions.height/2<l},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width);return!(!s||!n)&&(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1))},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!=t&&(0<t?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!=t&&(0<t?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(t){var e,i,s,n,o=[],a=[],r=this._connectWith();if(r&&t)for(e=r.length-1;0<=e;e--)for(i=(s=k(r[e],this.document[0])).length-1;0<=i;i--)(n=k.data(s[i],this.widgetFullName))&&n!==this&&!n.options.disabled&&a.push([k.isFunction(n.options.items)?n.options.items.call(n.element):k(n.options.items,n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),n]);function l(){o.push(this)}for(a.push([k.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):k(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),e=a.length-1;0<=e;e--)a[e][0].each(l);return k(o)},_removeCurrentsFromItems:function(){var i=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=k.grep(this.items,function(t){for(var e=0;e<i.length;e++)if(i[e]===t.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var e,i,s,n,o,a,r,l,h=this.items,c=[[k.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):k(this.options.items,this.element),this]],u=this._connectWith();if(u&&this.ready)for(e=u.length-1;0<=e;e--)for(i=(s=k(u[e],this.document[0])).length-1;0<=i;i--)(n=k.data(s[i],this.widgetFullName))&&n!==this&&!n.options.disabled&&(c.push([k.isFunction(n.options.items)?n.options.items.call(n.element[0],t,{item:this.currentItem}):k(n.options.items,n.element),n]),this.containers.push(n));for(e=c.length-1;0<=e;e--)for(o=c[e][1],i=0,l=(a=c[e][0]).length;i<l;i++)(r=k(a[i])).data(this.widgetName+"-item",o),h.push({item:r,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){var e,i,s,n;for(this.floating=!!this.items.length&&("x"===this.options.axis||this._isFloating(this.items[0].item)),this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset()),e=this.items.length-1;0<=e;e--)(i=this.items[e]).instance!==this.currentContainer&&this.currentContainer&&i.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?k(this.options.toleranceElement,i.item):i.item,t||(i.width=s.outerWidth(),i.height=s.outerHeight()),n=s.offset(),i.left=n.left,i.top=n.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(e=this.containers.length-1;0<=e;e--)n=this.containers[e].element.offset(),this.containers[e].containerCache.left=n.left,this.containers[e].containerCache.top=n.top,this.containers[e].containerCache.width=this.containers[e].element.outerWidth(),this.containers[e].containerCache.height=this.containers[e].element.outerHeight();return this},_createPlaceholder:function(i){var s,n=(i=i||this).options;n.placeholder&&n.placeholder.constructor!==String||(s=n.placeholder,n.placeholder={element:function(){var t=i.currentItem[0].nodeName.toLowerCase(),e=k("<"+t+">",i.document[0]);return i._addClass(e,"ui-sortable-placeholder",s||i.currentItem[0].className)._removeClass(e,"ui-sortable-helper"),"tbody"===t?i._createTrPlaceholder(i.currentItem.find("tr").eq(0),k("<tr>",i.document[0]).appendTo(e)):"tr"===t?i._createTrPlaceholder(i.currentItem,e):"img"===t&&e.attr("src",i.currentItem.attr("src")),s||e.css("visibility","hidden"),e},update:function(t,e){s&&!n.forcePlaceholderSize||(e.height()||e.height(i.currentItem.innerHeight()-parseInt(i.currentItem.css("paddingTop")||0,10)-parseInt(i.currentItem.css("paddingBottom")||0,10)),e.width()||e.width(i.currentItem.innerWidth()-parseInt(i.currentItem.css("paddingLeft")||0,10)-parseInt(i.currentItem.css("paddingRight")||0,10)))}}),i.placeholder=k(n.placeholder.element.call(i.element,i.currentItem)),i.currentItem.after(i.placeholder),n.placeholder.update(i,i.placeholder)},_createTrPlaceholder:function(t,e){var i=this;t.children().each(function(){k("<td>&#160;</td>",i.document[0]).attr("colspan",k(this).attr("colspan")||1).appendTo(e)})},_contactContainers:function(t){for(var e,i,s,n,o,a,r,l,h,c=null,u=null,d=this.containers.length-1;0<=d;d--)if(!k.contains(this.currentItem[0],this.containers[d].element[0]))if(this._intersectsWith(this.containers[d].containerCache)){if(c&&k.contains(this.containers[d].element[0],c.element[0]))continue;c=this.containers[d],u=d}else this.containers[d].containerCache.over&&(this.containers[d]._trigger("out",t,this._uiHash(this)),this.containers[d].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[u].containerCache.over||(this.containers[u]._trigger("over",t,this._uiHash(this)),this.containers[u].containerCache.over=1);else{for(i=1e4,s=null,n=(l=c.floating||this._isFloating(this.currentItem))?"left":"top",o=l?"width":"height",h=l?"pageX":"pageY",e=this.items.length-1;0<=e;e--)k.contains(this.containers[u].element[0],this.items[e].item[0])&&this.items[e].item[0]!==this.currentItem[0]&&(a=this.items[e].item.offset()[n],r=!1,t[h]-a>this.items[e][o]/2&&(r=!0),Math.abs(t[h]-a)<i&&(i=Math.abs(t[h]-a),s=this.items[e],this.direction=r?"up":"down"));if(!s&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[u])return void(this.currentContainer.containerCache.over||(this.containers[u]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1));s?this._rearrange(t,s,null,!0):this._rearrange(t,null,this.containers[u].element,!0),this._trigger("change",t,this._uiHash()),this.containers[u]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[u],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[u]._trigger("over",t,this._uiHash(this)),this.containers[u].containerCache.over=1}},_createHelper:function(t){var e=this.options,i=k.isFunction(e.helper)?k(e.helper.apply(this.element[0],[t,this.currentItem])):"clone"===e.helper?this.currentItem.clone():this.currentItem;return i.parents("body").length||k("parent"!==e.appendTo?e.appendTo:this.currentItem[0].parentNode)[0].appendChild(i[0]),i[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),i[0].style.width&&!e.forceHelperSize||i.width(this.currentItem.width()),i[0].style.height&&!e.forceHelperSize||i.height(this.currentItem.height()),i},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),k.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&k.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&k.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,i,s=this.options;"parent"===s.containment&&(s.containment=this.helper[0].parentNode),"document"!==s.containment&&"window"!==s.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===s.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===s.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(s.containment)||(t=k(s.containment)[0],e=k(s.containment).offset(),i="hidden"!==k(t).css("overflow"),this.containment=[e.left+(parseInt(k(t).css("borderLeftWidth"),10)||0)+(parseInt(k(t).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(k(t).css("borderTopWidth"),10)||0)+(parseInt(k(t).css("paddingTop"),10)||0)-this.margins.top,e.left+(i?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(k(t).css("borderLeftWidth"),10)||0)-(parseInt(k(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(i?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(k(t).css("borderTopWidth"),10)||0)-(parseInt(k(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,e){e=e||this.position;var i="absolute"===t?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&k.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(s[0].tagName);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():n?0:s.scrollTop())*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():n?0:s.scrollLeft())*i}},_generatePosition:function(t){var e,i,s=this.options,n=t.pageX,o=t.pageY,a="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&k.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,r=/(html|body)/i.test(a[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),s.grid&&(e=this.originalPageY+Math.round((o-this.originalPageY)/s.grid[1])*s.grid[1],o=!this.containment||e-this.offset.click.top>=this.containment[1]&&e-this.offset.click.top<=this.containment[3]?e:e-this.offset.click.top>=this.containment[1]?e-s.grid[1]:e+s.grid[1],i=this.originalPageX+Math.round((n-this.originalPageX)/s.grid[0])*s.grid[0],n=!this.containment||i-this.offset.click.left>=this.containment[0]&&i-this.offset.click.left<=this.containment[2]?i:i-this.offset.click.left>=this.containment[0]?i-s.grid[0]:i+s.grid[0])),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():r?0:a.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():r?0:a.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)"auto"!==this._storedCSS[i]&&"static"!==this._storedCSS[i]||(this._storedCSS[i]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();function n(e,i,s){return function(t){s._trigger(e,t,i._uiHash(i))}}for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;0<=i;i--)e||s.push(n("deactivate",this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(n("out",this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(i=0;i<s.length;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){!1===k.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(t){var e=t||this;return{helper:e.helper,placeholder:e.placeholder||k([]),position:e.position,originalPosition:e.originalPosition,offset:e.positionAbs,item:e.currentItem,sender:t?t.element:null}}});function at(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}k.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var s=this._super(),n=this.element;return k.each(["min","max","step"],function(t,e){var i=n.attr(e);null!=i&&i.length&&(s[e]=i)}),s},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){this.cancelBlur?delete this.cancelBlur:(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t))},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((0<e?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(t){var e;function i(){this.element[0]===k.ui.safeActiveElement(this.document[0])||(this.element.trigger("focus"),this.previous=e,this._delay(function(){this.previous=e}))}e=this.element[0]===k.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),!1!==this._start(t)&&this._repeat(null,k(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){if(k(t.currentTarget).hasClass("ui-state-active"))return!1!==this._start(t)&&void this._repeat(null,k(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&0<this.uiSpinner.height()&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(t){var e=this.options,i=k.ui.keyCode;switch(t.keyCode){case i.UP:return this._repeat(null,1,t),!0;case i.DOWN:return this._repeat(null,-1,t),!0;case i.PAGE_UP:return this._repeat(null,e.page,t),!0;case i.PAGE_DOWN:return this._repeat(null,-e.page,t),!0}return!1},_start:function(t){return!(!this.spinning&&!1===this._trigger("start",t))&&(this.counter||(this.counter=1),this.spinning=!0)},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&!1===this._trigger("spin",e,{value:i})||(this._value(i),this.counter++)},_increment:function(t){var e=this.options.incremental;return e?k.isFunction(e)?e(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=t.toString(),i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e=this.options,i=null!==e.min?e.min:0,s=t-i;return t=i+(s=Math.round(s/e.step)*e.step),t=parseFloat(t.toFixed(this._precision())),null!==e.max&&t>e.max?e.max:null!==e.min&&t<e.min?e.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){var i,s,n;if("culture"===t||"numberFormat"===t)return i=this._parse(this.element.val()),this.options[t]=e,void this.element.val(this._format(i));"max"!==t&&"min"!==t&&"step"!==t||"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,e.up),n=this.buttons.last().find(".ui-icon"),this._removeClass(n,null,this.options.icons.down),this._addClass(n,null,e.down)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:at(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null!==t&&t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&null!==(i=this._parse(t))&&(e||(i=this._adjustValue(i)),t=this._format(i)),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:at(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:at(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:at(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:at(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){if(!arguments.length)return this._parse(this.element.val());at(this._value).call(this,t)},widget:function(){return this.uiSpinner}}),!1!==k.uiBackCompat&&k.widget("ui.spinner",k.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}});var rt;k.ui.spinner;k.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:(rt=/#.*$/,function(t){var e=t.href.replace(rt,""),i=location.href.replace(rt,"");try{e=decodeURIComponent(e)}catch(t){}try{i=decodeURIComponent(i)}catch(t){}return 1<t.hash.length&&e===i}),_create:function(){var e=this,t=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,t.collapsible),this._processTabs(),t.active=this._initialActive(),k.isArray(t.disabled)&&(t.disabled=k.unique(t.disabled.concat(k.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),!1!==this.options.active&&this.anchors.length?this.active=this._findActive(t.active):this.active=k(),this._refresh(),this.active.length&&this.load(t.active)},_initialActive:function(){var i=this.options.active,t=this.options.collapsible,s=location.hash.substring(1);return null===i&&(s&&this.tabs.each(function(t,e){if(k(e).attr("aria-controls")===s)return i=t,!1}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==i&&-1!==i||(i=!!this.tabs.length&&0)),!1!==i&&-1===(i=this.tabs.index(this.tabs.eq(i)))&&(i=!t&&0),!t&&!1===i&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):k()}},_tabKeydown:function(t){var e=k(k.ui.safeActiveElement(this.document[0])).closest("li"),i=this.tabs.index(e),s=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case k.ui.keyCode.RIGHT:case k.ui.keyCode.DOWN:i++;break;case k.ui.keyCode.UP:case k.ui.keyCode.LEFT:s=!1,i--;break;case k.ui.keyCode.END:i=this.anchors.length-1;break;case k.ui.keyCode.HOME:i=0;break;case k.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),void this._activate(i);case k.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),void this._activate(i!==this.options.active&&i);default:return}t.preventDefault(),clearTimeout(this.activating),i=this._focusNextTab(i,s),t.ctrlKey||t.metaKey||(e.attr("aria-selected","false"),this.tabs.eq(i).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",i)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===k.ui.keyCode.UP&&(t.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(t){return t.altKey&&t.keyCode===k.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===k.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,e){var i=this.tabs.length-1;for(;-1!==k.inArray((i<t&&(t=0),t<0&&(t=i),t),this.options.disabled);)t=e?t+1:t-1;return t},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){"active"!==t?(this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),e||!1!==this.options.active||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e)):this._activate(e)},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,e=this.tablist.children(":has(a[href])");t.disabled=k.map(e.filter(".ui-state-disabled"),function(t){return e.index(t)}),this._processTabs(),!1!==t.active&&this.anchors.length?this.active.length&&!k.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=k()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=k()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var l=this,t=this.tabs,e=this.anchors,i=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(t){k(this).is(".ui-state-disabled")&&t.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){k(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return k("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=k(),this.anchors.each(function(t,e){var i,s,n,o=k(e).uniqueId().attr("id"),a=k(e).closest("li"),r=a.attr("aria-controls");l._isLocal(e)?(n=(i=e.hash).substring(1),s=l.element.find(l._sanitizeSelector(i))):(i="#"+(n=a.attr("aria-controls")||k({}).uniqueId()[0].id),(s=l.element.find(i)).length||(s=l._createPanel(n)).insertAfter(l.panels[t-1]||l.tablist),s.attr("aria-live","polite")),s.length&&(l.panels=l.panels.add(s)),r&&a.data("ui-tabs-aria-controls",r),a.attr({"aria-controls":n,"aria-labelledby":o}),s.attr("aria-labelledby",o)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),t&&(this._off(t.not(this.tabs)),this._off(e.not(this.anchors)),this._off(i.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(t){return k("<div>").attr("id",t).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(t){var e,i,s;for(k.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1),s=0;i=this.tabs[s];s++)e=k(i),!0===t||-1!==k.inArray(s,t)?(e.attr("aria-disabled","true"),this._addClass(e,null,"ui-state-disabled")):(e.removeAttr("aria-disabled"),this._removeClass(e,null,"ui-state-disabled"));this.options.disabled=t,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!0===t)},_setupEvents:function(t){var i={};t&&k.each(t.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,e=this.element.parent();"fill"===t?(i=e.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=k(this),e=t.css("position");"absolute"!==e&&"fixed"!==e&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=k(this).outerHeight(!0)}),this.panels.each(function(){k(this).height(Math.max(0,i-k(this).innerHeight()+k(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,k(this).height("").height())}).height(i))},_eventHandler:function(t){var e=this.options,i=this.active,s=k(t.currentTarget).closest("li"),n=s[0]===i[0],o=n&&e.collapsible,a=o?k():this._getPanelForTab(s),r=i.length?this._getPanelForTab(i):k(),l={oldTab:i,oldPanel:r,newTab:o?k():s,newPanel:a};t.preventDefault(),s.hasClass("ui-state-disabled")||s.hasClass("ui-tabs-loading")||this.running||n&&!e.collapsible||!1===this._trigger("beforeActivate",t,l)||(e.active=!o&&this.tabs.index(s),this.active=n?k():s,this.xhr&&this.xhr.abort(),r.length||a.length||k.error("jQuery UI Tabs: Mismatching fragment identifier."),a.length&&this.load(this.tabs.index(s),t),this._toggle(t,l))},_toggle:function(t,e){var i=this,s=e.newPanel,n=e.oldPanel;function o(){i.running=!1,i._trigger("activate",t,e)}function a(){i._addClass(e.newTab.closest("li"),"ui-tabs-active","ui-state-active"),s.length&&i.options.show?i._show(s,i.options.show,o):(s.show(),o())}this.running=!0,n.length&&this.options.hide?this._hide(n,this.options.hide,function(){i._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),a()}):(this._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),n.hide(),a()),n.attr("aria-hidden","true"),e.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),s.length&&n.length?e.oldTab.attr("tabIndex",-1):s.length&&this.tabs.filter(function(){return 0===k(this).attr("tabIndex")}).attr("tabIndex",-1),s.attr("aria-hidden","false"),e.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var e,i=this._findActive(t);i[0]!==this.active[0]&&(i.length||(i=this.active),e=i.find(".ui-tabs-anchor")[0],this._eventHandler({target:e,currentTarget:e,preventDefault:k.noop}))},_findActive:function(t){return!1===t?k():this.tabs.eq(t)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+k.ui.escapeSelector(t)+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){k.data(this,"ui-tabs-destroy")?k(this).remove():k(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var t=k(this),e=t.data("ui-tabs-aria-controls");e?t.attr("aria-controls",e).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var t=this.options.disabled;!1!==t&&(t=void 0!==i&&(i=this._getIndex(i),k.isArray(t)?k.map(t,function(t){return t!==i?t:null}):k.map(this.tabs,function(t,e){return e!==i?e:null})),this._setOptionDisabled(t))},disable:function(t){var e=this.options.disabled;if(!0!==e){if(void 0===t)e=!0;else{if(t=this._getIndex(t),-1!==k.inArray(t,e))return;e=k.isArray(e)?k.merge([t],e).sort():[t]}this._setOptionDisabled(e)}},load:function(t,s){t=this._getIndex(t);function n(t,e){"abort"===e&&o.panels.stop(!1,!0),o._removeClass(i,"ui-tabs-loading"),a.removeAttr("aria-busy"),t===o.xhr&&delete o.xhr}var o=this,i=this.tabs.eq(t),e=i.find(".ui-tabs-anchor"),a=this._getPanelForTab(i),r={tab:i,panel:a};this._isLocal(e[0])||(this.xhr=k.ajax(this._ajaxSettings(e,s,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(i,"ui-tabs-loading"),a.attr("aria-busy","true"),this.xhr.done(function(t,e,i){setTimeout(function(){a.html(t),o._trigger("load",s,r),n(i,e)},1)}).fail(function(t,e){setTimeout(function(){n(t,e)},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{url:t.attr("href").replace(/#.*$/,""),beforeSend:function(t,e){return n._trigger("beforeLoad",i,k.extend({jqXHR:t,ajaxSettings:e},s))}}},_getPanelForTab:function(t){var e=k(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+e))}}),!1!==k.uiBackCompat&&k.widget("ui.tabs",k.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}});k.ui.tabs;k.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var t=k(this).attr("title")||"";return k("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(t,e){var i=(t.attr("aria-describedby")||"").split(/\s+/);i.push(e),t.data("ui-tooltip-id",e).attr("aria-describedby",k.trim(i.join(" ")))},_removeDescribedBy:function(t){var e=t.data("ui-tooltip-id"),i=(t.attr("aria-describedby")||"").split(/\s+/),s=k.inArray(e,i);-1!==s&&i.splice(s,1),t.removeData("ui-tooltip-id"),(i=k.trim(i.join(" ")))?t.attr("aria-describedby",i):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=k("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=k([])},_setOption:function(t,e){var i=this;this._super(t,e),"content"===t&&k.each(this.tooltips,function(t,e){i._updateContent(e.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var s=this;k.each(this.tooltips,function(t,e){var i=k.Event("blur");i.target=i.currentTarget=e.element[0],s.close(i,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var t=k(this);if(t.is("[title]"))return t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")}))},_enable:function(){this.disabledTitles.each(function(){var t=k(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))}),this.disabledTitles=k([])},open:function(t){var i=this,e=k(t?t.target:this.element).closest(this.options.items);e.length&&!e.data("ui-tooltip-id")&&(e.attr("title")&&e.data("ui-tooltip-title",e.attr("title")),e.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&e.parents().each(function(){var t,e=k(this);e.data("ui-tooltip-open")&&((t=k.Event("blur")).target=t.currentTarget=this,i.close(t,!0)),e.attr("title")&&(e.uniqueId(),i.parents[this.id]={element:this,title:e.attr("title")},e.attr("title",""))}),this._registerCloseHandlers(t,e),this._updateContent(e,t))},_updateContent:function(e,i){var t,s=this.options.content,n=this,o=i?i.type:null;if("string"==typeof s||s.nodeType||s.jquery)return this._open(i,e,s);(t=s.call(e[0],function(t){n._delay(function(){e.data("ui-tooltip-open")&&(i&&(i.type=o),this._open(i,e,t))})}))&&this._open(i,e,t)},_open:function(t,e,i){var s,n,o,a,r=k.extend({},this.options.position);function l(t){r.of=t,n.is(":hidden")||n.position(r)}i&&((s=this._find(e))?s.tooltip.find(".ui-tooltip-content").html(i):(e.is("[title]")&&(t&&"mouseover"===t.type?e.attr("title",""):e.removeAttr("title")),s=this._tooltip(e),n=s.tooltip,this._addDescribedBy(e,n.attr("id")),n.find(".ui-tooltip-content").html(i),this.liveRegion.children().hide(),(a=k("<div>").html(n.find(".ui-tooltip-content").html())).removeAttr("name").find("[name]").removeAttr("name"),a.removeAttr("id").find("[id]").removeAttr("id"),a.appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:l}),l(t)):n.position(k.extend({of:e},this.options.position)),n.hide(),this._show(n,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(o=this.delayedShow=setInterval(function(){n.is(":visible")&&(l(r.of),clearInterval(o))},k.fx.interval)),this._trigger("open",t,{tooltip:n})))},_registerCloseHandlers:function(t,i){var e={keyup:function(t){var e;t.keyCode===k.ui.keyCode.ESCAPE&&((e=k.Event(t)).currentTarget=i[0],this.close(e,!0))}};i[0]!==this.element[0]&&(e.remove=function(){this._removeTooltip(this._find(i).tooltip)}),t&&"mouseover"!==t.type||(e.mouseleave="close"),t&&"focusin"!==t.type||(e.focusout="close"),this._on(!0,i,e)},close:function(t){var e,i=this,s=k(t?t.currentTarget:this.element),n=this._find(s);n?(e=n.tooltip,n.closing||(clearInterval(this.delayedShow),s.data("ui-tooltip-title")&&!s.attr("title")&&s.attr("title",s.data("ui-tooltip-title")),this._removeDescribedBy(s),n.hiding=!0,e.stop(!0),this._hide(e,this.options.hide,function(){i._removeTooltip(k(this))}),s.removeData("ui-tooltip-open"),this._off(s,"mouseleave focusout keyup"),s[0]!==this.element[0]&&this._off(s,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&k.each(this.parents,function(t,e){k(e.element).attr("title",e.title),delete i.parents[t]}),n.closing=!0,this._trigger("close",t,{tooltip:e}),n.hiding||(n.closing=!1))):s.removeData("ui-tooltip-open")},_tooltip:function(t){var e=k("<div>").attr("role","tooltip"),i=k("<div>").appendTo(e),s=e.uniqueId().attr("id");return this._addClass(i,"ui-tooltip-content"),this._addClass(e,"ui-tooltip","ui-widget ui-widget-content"),e.appendTo(this._appendTo(t)),this.tooltips[s]={element:t,tooltip:e}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var e=t.closest(".ui-front, dialog");return e.length||(e=this.document[0].body),e},_destroy:function(){var n=this;k.each(this.tooltips,function(t,e){var i=k.Event("blur"),s=e.element;i.target=i.currentTarget=s[0],n.close(i,!0),k("#"+t).remove(),s.data("ui-tooltip-title")&&(s.attr("title")||s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),!1!==k.uiBackCompat&&k.widget("ui.tooltip",k.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}});k.ui.tooltip}),function(e){function i(t,e){var i,s;1<t.originalEvent.touches.length||(t.preventDefault(),i=t.originalEvent.changedTouches[0],(s=document.createEvent("MouseEvents")).initMouseEvent(e,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),t.target.dispatchEvent(s))}var s,t,n,o;e.support.touch="ontouchend"in document,e.support.touch&&(t=e.ui.mouse.prototype,n=t._mouseInit,o=t._mouseDestroy,t._touchStart=function(t){!s&&this._mouseCapture(t.originalEvent.changedTouches[0])&&(s=!0,this._touchMoved=!1,i(t,"mouseover"),i(t,"mousemove"),i(t,"mousedown"))},t._touchMove=function(t){s&&(this._touchMoved=!0,i(t,"mousemove"))},t._touchEnd=function(t){s&&(i(t,"mouseup"),i(t,"mouseout"),this._touchMoved||i(t,"click"),s=!1)},t._mouseInit=function(){var t=this;t.element.bind({touchstart:e.proxy(t,"_touchStart"),touchmove:e.proxy(t,"_touchMove"),touchend:e.proxy(t,"_touchEnd")}),n.call(t)},t._mouseDestroy=function(){var t=this;t.element.unbind({touchstart:e.proxy(t,"_touchStart"),touchmove:e.proxy(t,"_touchMove"),touchend:e.proxy(t,"_touchEnd")}),o.call(t)})}(jQuery);


// Spectrum Colorpicker v1.8.0
// https://github.com/seballot/spectrum
// Author: Brian Grinstead
// License: MIT

(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory);
    }
    else if (typeof exports == "object" && typeof module == "object") { // CommonJS
        module.exports = factory(require('jquery'));
    }
    else { // Browser
        factory(jQuery);
    }
})(function($, undefined) {
    "use strict";

    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false, // Deprecated - use type instead
        type: '', // text, color, component or flat
        showInput: false,
        allowEmpty: true,
        showButtons: true,
        clickoutFiresChange: true,
        showInitial: false,
        showPalette: true,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 8,
        locale: "en",
        cancelText: "<span class='fa fa-undo' title='Undo'></span>",
        chooseText: "<span class='fa fa-check' ></span>",
        togglePaletteMoreText: "<span class='fa fa-chevron-right'></span>",
        togglePaletteLessText: "<span class='fa fa-chevron-left'></span>",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: "name",
        className: "", // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: "",
        replacerClassName: "",
        showAlpha: true,
        theme: "sp-dark",
        palette: [
			["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2979FF","#40C4FF","#00bcd4"],
			["#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#795548"],
			["#607d8b","#337ab7","#5bc0de","#f0ad4e","#5cb85c","#d9534f"],
			
            ["#000000","#444444","#5b5b5b","#999999","#bcbcbc","#eeeeee","#f3f6f4","#ffffff"],
            ["#f44336","#744700","#ce7e00","#8fce00","#2986cc","#16537e","#6a329f","#c90076"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#cc0000","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#990000","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#660000","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        selectionPalette: [],
        disabled: false,
        offset: null
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9660;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                    "<div class='sp-palette-button-container sp-cf'>",
                        "<button type='button' class='sp-palette-toggle'></button>",
                    "</div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-clear sp-clear-display'>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<button class='sp-cancel' href='#'></button>",
                        "<button type='button' class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className, opts) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var current = p[i];
            if(current) {
                var tiny = tinycolor(current);
                var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
                var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
                html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
            } else {
                html.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;" /></span>');
            }
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        o.locale = o.locale || window.navigator.language;
        if (o.locale) o.locale = o.locale.split('-')[0].toLowerCase(); // handle locale like "fr-FR"
        if (o.locale != 'en' && $.spectrum.localization[o.locale]) {
            o = $.extend({}, $.spectrum.localization[o.locale], o);
        }
        var opts = $.extend({}, defaultOpts, o);

        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            type = opts.type,
            flat = (type == 'flat'),
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            isDragging = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = [],
            paletteArray = [],
            paletteLookup = {},
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            abortNextInputChange = false,
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            pickerContainer = container.find(".sp-picker-container"),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            clearButton = container.find(".sp-clear"),
            chooseButton = container.find(".sp-choose"),
            toggleButton = container.find(".sp-palette-toggle"),
            isInput = boundElement.is("input"),
            isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
            shouldReplace = isInput && type == 'color',
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            currentPreferredFormat = opts.preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
            isEmpty = !initialColor,
            allowEmpty = opts.allowEmpty;

        // Element to be updated with the input color. Populated in initialize method
        var originalInputContainer = null,
            colorizeElement = null,
            colorizeElementInitialColor = null,
            colorizeElementInitialBackground = null;

        //If there is a label for this element, when clicked on, show the colour picker
        var thisId = boundElement.attr('id');
        if(thisId !== undefined && thisId.length > 0) {
            var label = $('label[for="'+thisId+'"]');
            if(label.length) {
                label.on('click', function(e){
                    e.preventDefault();
                    boundElement.spectrum('show');
                    return false;
                });
            }
        }
        
        function applyOptions() {

            if (opts.showPaletteOnly) {
                opts.showPalette = true;
            }

            toggleButton.html(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

            if (opts.palette) {
                palette = opts.palette.slice(0);
                paletteArray = $.isArray(palette[0]) ? palette : [palette];
                paletteLookup = {};
                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }

                // if showPaletteOnly and didn't set initialcolor
                // set initialcolor to first palette
                if (opts.showPaletteOnly && !opts.color) {
                    initialColor = (palette[0][0] === '') ? palette[0][0] : Object.keys(paletteLookup)[0];
                }
            }

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-clear-enabled", allowEmpty);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className).addClass(opts.containerClassName);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            originalInputContainer = $('<span class="sp-original-input-container"></span>');
            ['margin'].forEach(function(cssProp) {
                originalInputContainer.css(cssProp, boundElement.css(cssProp));
            });
            // inline-flex by default, switching to flex if needed
            if (boundElement.css('display') == 'block') originalInputContainer.css('display', 'flex');

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            } else if (type == 'text') {
                originalInputContainer.addClass('sp-colorize-container');
                boundElement.addClass('spectrum sp-colorize').wrap(originalInputContainer);
            } else if (type == 'component') {
                boundElement.addClass('spectrum').wrap(originalInputContainer);
                var addOn = $(["<div class='sp-colorize-container sp-add-on'>",
                    "<div class='sp-colorize'></div> ",
                "</div>"].join(''));
                addOn.width(boundElement.outerHeight() + 'px')
                     .css('border-radius', boundElement.css('border-radius'))
                     .css('border', boundElement.css('border'));
                boundElement.addClass('with-add-on').before(addOn);
            }

            colorizeElement = boundElement.parent().find('.sp-colorize');
            colorizeElementInitialColor = colorizeElement.css('color');
            colorizeElementInitialBackground = colorizeElement.css('background-color');

            if (!allowEmpty) {
                clearButton.hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            }
            else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            updateSelectionPaletteFromStorage();

            offsetElement.on("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            [textInput, boundElement].forEach(function(input) {
                input.change(function() { setFromTextInput(input.val()); });
                input.on("paste", function () {
                    setTimeout(function() { setFromTextInput(input.val()); }, 1);
                });
                input.keydown(function (e) { if (e.keyCode == 13) {
                    setFromTextInput($(input).val());
                    if (input == boundElement) hide();
                } });
            });

            cancelButton.html(opts.cancelText);
            cancelButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                revert();
                /*hide();*/
				move();
				 updateOriginalInput(true);
				
				
            });

            clearButton.attr("title", opts.clearText);
            clearButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                isEmpty = true;
                move();

                if(flat) {
                    //for the flat style, this is a change event
                    updateOriginalInput(true);
                }
            });

            chooseButton.html(opts.chooseText);
            chooseButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (IE && textInput.is(":focus")) {
                    textInput.trigger('change');
                }

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            toggleButton.html(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
            toggleButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                opts.showPaletteOnly = !opts.showPaletteOnly;

                // To make sure the Picker area is drawn on the right, next to the
                // Palette area (and not below the palette), first move the Palette
                // to the left to make space for the picker, plus 5px extra.
                // The 'applyOptions' function puts the whole container back into place
                // and takes care of the button-text and the sp-palette-only CSS class.
                if (!opts.showPaletteOnly && !flat) {
                    container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                }
                applyOptions();
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                isEmpty = false;
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            }, dragStart, dragStop);

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                }
                else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - (currentValue * dragHeight);
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }

                move();

            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = tinycolor(initialColor).format || opts.preferredFormat;
                addColorToSelectionPalette(initialColor);
            } else if (initialColor === '') {
                set(initialColor);
                updateUI();
            } else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function paletteElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                }
                else {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();

                    // If the picker is going to close immediately, a palette selection
                    // is a change.  Otherwise, it's a move only.
                    if (opts.hideAfterPaletteSelect) {
                        updateOriginalInput(true);
                        //hide();
                    } else {
                        updateOriginalInput();
                    }
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.on(paletteEvent, ".sp-thumb-el", paletteElementClick);
            initialColorContainer.on(paletteEvent, ".sp-thumb-el:nth-child(1)", { ignore: true }, paletteElementClick);
        }

        function updateSelectionPaletteFromStorage() {

            if (localStorageKey) {
                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var localStorage = window.localStorage;
                    var oldPalette = localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var rgb = tinycolor(color).toRgbString();
                if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                    selectionPalette.push(rgb);
                    while(selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            if (opts.showPalette) {
                for (var i = 0; i < selectionPalette.length; i++) {
                    var rgb = tinycolor(selectionPalette[i]).toRgbString();

                    if (!paletteLookup[rgb]) {
                        unique.push(selectionPalette[i]);
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
            });

            updateSelectionPaletteFromStorage();

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            isDragging = true;
            container.addClass(draggingClass);
            shiftMovementDirection = null;
            boundElement.trigger('dragstart.spectrum', [ get() ]);
        }

        function dragStop() {
            isDragging = false;
            container.removeClass(draggingClass);
            boundElement.trigger('dragstop.spectrum', [ get() ]);
        }

        function setFromTextInput(value) {
            if (abortNextInputChange) { abortNextInputChange = false; return; }
            if ((value === null || value === "") && allowEmpty) {
                set(null);
                move();
                updateOriginalInput();
            }
            else {
                var tiny = tinycolor(value);
                if (tiny.isValid()) {
                    set(tiny);
                    move();
                    updateOriginalInput();
                }
                else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            // debugger;
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [ get() ]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).on("keydown.spectrum", onkeydown);
            $(doc).on("click.spectrum", clickout);
            $(window).on("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [ colorOnShow ]);
        }

        function onkeydown(e) {
            // Close on ESC
            if (e.keyCode === 27) {
                hide();
            }
        }

        function clickout(e) {
            // Return on right click.
            if (e.button == 2) { return; }

            // If a drag event was happening during the mouseup, don't hide
            // on click.
            if (isDragging) { return; }

            if (clickoutFiresChange) {
                updateOriginalInput(true);
            }
            else {
                revert();
            }
            hide();
        }

        function hide() {
            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).off("keydown.spectrum", onkeydown);
            $(doc).off("click.spectrum", clickout);
            $(window).off("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [ get() ]);
        }

        function revert() {
            set(colorOnShow, true);
            updateOriginalInput(true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                // Update UI just in case a validation error needs
                // to be cleared.
                updateUI();
                return;
            }

            var newColor, newHsv;
            if ((!color || color === undefined) && allowEmpty) {
                isEmpty = true;
            } else {
                isEmpty = false;
                newColor = tinycolor(color);
                newHsv = newColor.toHsv();

                currentHue = (newHsv.h % 360) / 360;
                currentSaturation = newHsv.s;
                currentValue = newHsv.v;
                currentAlpha = newHsv.a;
            }
            updateUI();

            if (newColor && newColor.isValid() && !ignoreFormatChange) {
                currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
            }
        }

        function get(opts) {
            opts = opts || { };

            if (allowEmpty && isEmpty) {
                return null;
            }

            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 1000) / 1000
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [ get() ]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                displayColor = '';

             //reset background info for preview element
            previewElement.removeClass("sp-clear-display");
            previewElement.css('background-color', 'transparent');

            if (!realColor && allowEmpty) {
                // Update the replaced elements background with icon indicating no color selection
                previewElement.addClass("sp-clear-display");
            }
            else {
                var realHex = realColor.toHexString(),
                    realRgb = realColor.toRgbString();

                // Update the replaced elements background color (with actual selected color)
                if (rgbaSupport || realColor.alpha === 1) {
                    previewElement.css("background-color", realRgb);
                }
                else {
                    previewElement.css("background-color", "transparent");
                    previewElement.css("filter", realColor.toFilter());
                }

                if (opts.showAlpha) {
                    var rgb = realColor.toRgb();
                    rgb.a = 0;
                    var realAlpha = tinycolor(rgb).toRgbString();
                    var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                    if (IE) {
                        alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                    }
                    else {
                        alphaSliderInner.css("background", "-webkit-" + gradient);
                        alphaSliderInner.css("background", "-moz-" + gradient);
                        alphaSliderInner.css("background", "-ms-" + gradient);
                        // Use current syntax gradient on unprefixed property.
                        alphaSliderInner.css("background",
                            "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                    }
                }

                displayColor = realColor.toString(format);
            }

            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(displayColor);
            }
            boundElement.val(displayColor);
            if (opts.type == "text" || opts.type == "component") {
                var color = realColor;
                if (color && colorizeElement) {
                    var textColor = (color.isLight() || color.getAlpha() < 0.4) ? 'black' : 'white';
                    colorizeElement.css('background-color', color.toRgbString()).css('color', textColor);
                } else {
                    colorizeElement.css('background-color', colorizeElementInitialBackground)
                                   .css('color', colorizeElementInitialColor);
                }
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            if(allowEmpty && isEmpty) {
                //if selected color is empty, hide the helpers
                alphaSlideHelper.hide();
                slideHelper.hide();
                dragHelper.hide();
            }
            else {
                //make sure helpers are visible
                alphaSlideHelper.show();
                slideHelper.show();
                dragHelper.show();

                // Where to show the little circle in that displays your current selected color
                var dragX = s * dragWidth;
                var dragY = dragHeight - (v * dragHeight);
                dragX = Math.max(
                    -dragHelperHeight,
                    Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
                );
                dragY = Math.max(
                    -dragHelperHeight,
                    Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
                );
                dragHelper.css({
                    "top": dragY + "px",
                    "left": dragX + "px"
                });

                var alphaX = currentAlpha * alphaWidth;
                alphaSlideHelper.css({
                    "left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
                });

                // Where to show the bar that displays your current selected hue
                var slideY = (currentHue) * slideHeight;
                slideHelper.css({
                    "top": (slideY - slideHelperHeight) + "px"
                });
            }
        }

        function updateOriginalInput(fireCallback) {
            var color = get(),
                displayColor = '',
                hasChanged = !tinycolor.equals(color, colorOnShow);

            if (color) {
                displayColor = color.toString(currentPreferredFormat);
                // Update the selection palette with the current color
                addColorToSelectionPalette(color);
            }

            if (fireCallback && hasChanged) {
                callbacks.change(color);
                // we trigger the change event or input, but the input change event is also binded
                // to some spectrum processing, that we do no need
                abortNextInputChange = true;
                boundElement.trigger('change', [ color ]);
            }
        }

        function reflow() {
            if (!visible) {
                return; // Calculations would be useless and wouldn't be reliable anyways
            }
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                if (opts.offset) {
                    container.offset(opts.offset);
                } else {
                    container.offset(getOffset(container, offsetElement));
                }
            }

            updateHelperLocations();

            if (opts.showPalette) {
                drawPalette();
            }

            boundElement.trigger('reflow.spectrum');
        }

        function destroy() {
            boundElement.show().removeClass('spectrum with-add-on sp-colorize');
            offsetElement.off("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            if (colorizeElement) {
                colorizeElement.css('background-color', colorizeElementInitialBackground)
                               .css('color', colorizeElementInitialColor);
            }
            var originalInputContainer = boundElement.closest('.sp-original-input-container');
            if (originalInputContainer.length > 0) {
                originalInputContainer.after(boundElement).remove();
            }
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;

            if (optionName === "preferredFormat") {
                currentPreferredFormat = opts.preferredFormat;
            }
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        function setOffset(coord) {
            opts.offset = coord;
            reflow();
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            offset: setOffset,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        var offsetLeft = offset.left;
        var offsetTop = offset.top;

        offsetTop += inputHeight;

        offsetLeft -=
            Math.min(offsetLeft, (offsetLeft + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offsetLeft + dpWidth - viewWidth) : 0);

        offsetTop -=
            Math.min(offsetTop, ((offsetTop + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return {
            top: offsetTop,
            bottom: offset.bottom,
            left: offsetLeft,
            right: offset.right,
            width: offset.width,
            height: offset.height
        };
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && doc.documentMode < 9 && !e.button) {
                    return stop();
                }

                var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                var pageX = t0 && t0.pageX || e.pageX;
                var pageY = t0 && t0.pageY || e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }

        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).on(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    move(e);

                    prevent(e);
                }
            }
        }

        function stop() {
            if (dragging) {
                $(doc).off(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");

                // Wait a tick before notifying observers to allow the click event
                // to fire in Chrome.
                setTimeout(function() {
                    onstop.apply(element, arguments);
                }, 0);
            }
            dragging = false;
        }

        $(element).on("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }

    function inputTypeColorSupport() {
        return $.fn.spectrum.inputTypeColorSupport();
    }

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {
                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var options = $.extend({}, $(this).data(), opts);
            // Infer default type from input params and deprecated options
            if (!$(this).is('input')) options.type = 'noInput';
            else if (options.flat || options.type == "flat") options.type = 'flat';
            else if ($(this).attr('type') == 'color') options.type = 'color';
            else options.type = options.type || 'component';

            var spect = spectrum(this, options);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
        if (typeof inputTypeColorSupport._cachedResult === "undefined") {
            var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
            inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
        }
        return inputTypeColorSupport._cachedResult;
    };

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInputs = $("input[type=color]");
        if (colorInputs.length && !inputTypeColorSupport()) {
            colorInputs.spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor v1.1.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function() {

    var trimLeft = /^[\s,#]+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        math = Math,
        mathRound = math.round,
        mathMin = math.min,
        mathMax = math.max,
        mathRandom = math.random;

    var tinycolor = function(color, opts) {

        color = (color) ? color : '';
        opts = opts || { };

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
           return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color;
        this._r = rgb.r;
        this._g = rgb.g;
        this._b = rgb.b;
        this._a = rgb.a;
        this._roundA = mathRound(1000 * this._a) / 1000;
        this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) { this._r = mathRound(this._r); }
        if (this._g < 1) { this._g = mathRound(this._g); }
        if (this._b < 1) { this._b = mathRound(this._b); }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
        isDark: function() {
            return this.getBrightness() < 128;
        },
        isLight: function() {
            return !this.isDark();
        },
        isValid: function() {
            return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
            return this._format;
        },
        getAlpha: function() {
            return this._a;
        },
        getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        setAlpha: function(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(1000 * this._a) / 1000;
            return this;
        },
        toHsv: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
            return (this._a == 1) ?
              "hsv("  + h + ", " + s + "%, " + v + "%)" :
              "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
        },
        toHsl: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
            return (this._a == 1) ?
              "hsl("  + h + ", " + s + "%, " + l + "%)" :
              "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
        },
        toHex: function(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function() {
            return rgbaToHex(this._r, this._g, this._b, this._a);
        },
        toHex8String: function() {
            return '#' + this.toHex8();
        },
        toRgb: function() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
              "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
              "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
            var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = s.toHex8String();
            }

            return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
        },
        toString: function(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },

        _applyModification: function(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function() {
            return this._applyModification(lighten, arguments);
        },
        brighten: function() {
            return this._applyModification(brighten, arguments);
        },
        darken: function() {
            return this._applyModification(darken, arguments);
        },
        desaturate: function() {
            return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
            return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
            return this._applyModification(greyscale, arguments);
        },
        spin: function() {
            return this._applyModification(spin, arguments);
        },

        _applyCombination: function(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
            return this._applyCombination(analogous, arguments);
        },
        complement: function() {
            return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
            return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
            return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
            return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
            return this._applyCombination(tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    }
                    else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if (typeof color == "object") {
            if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                color.s = convertToPercentage(color.s);
                color.v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, color.s, color.v);
                ok = true;
                format = "hsv";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                color.s = convertToPercentage(color.s);
                color.l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, color.s, color.l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b){
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if(s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if(max == min) {
            h = 0; // achromatic
        }
        else {
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
     function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }
        // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b and a are contained in the set [0, 255]
        // Returns an 8 character hex
        function rgbaToHex(r, g, b, a) {

            var hex = [
                pad2(convertDecimalToHex(a)),
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        return hex.join("");
    }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) { return false; }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function saturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function lighten (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function brighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
        return tinycolor(rgb);
    }

    function darken (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (mathRound(hsl.h) + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
            tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
        ];
    }

    function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v}));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function(color1, color2, amount) {
        amount = (amount === 0) ? 0 : (amount || 50);

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;
        var w = p * 2 - 1;
        var a = rgb2.a - rgb1.a;

        var w1;

        if (w * a == -1) {
            w1 = w;
        } else {
            w1 = (w + a) / (1 + w * a);
        }

        w1 = (w1 + 1) / 2;

        var w2 = 1 - w1;

        var rgba = {
            r: rgb2.r * w1 + rgb1.r * w2,
            g: rgb2.g * w1 + rgb1.g * w2,
            b: rgb2.b * w1 + rgb1.b * w2,
            a: rgb2.a * p  + rgb1.a * (1 - p)
        };

        return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/AERT#color-contrast>

    // `readability`
    // Analyze the 2 colors and returns an object with the following properties:
    //    `brightness`: difference in brightness between the two colors
    //    `color`: difference in color/hue between the two colors
    tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        var rgb1 = c1.toRgb();
        var rgb2 = c2.toRgb();
        var brightnessA = c1.getBrightness();
        var brightnessB = c2.getBrightness();
        var colorDiff = (
            Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
            Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
            Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
        );

        return {
            brightness: Math.abs(brightnessA - brightnessB),
            color: colorDiff
        };
    };

    // `readable`
    // http://www.w3.org/TR/AERT#color-contrast
    // Ensure that foreground and background color combinations provide sufficient contrast.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    tinycolor.isReadable = function(color1, color2) {
        var readability = tinycolor.readability(color1, color2);
        return readability.brightness > 125 && readability.color > 500;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // *Example*
    //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
    tinycolor.mostReadable = function(baseColor, colorList) {
        var bestColor = null;
        var bestScore = 0;
        var bestIsReadable = false;
        for (var i=0; i < colorList.length; i++) {

            // We normalize both around the "acceptable" breaking point,
            // but rank brightness constrast higher than hue.

            var readability = tinycolor.readability(baseColor, colorList[i]);
            var readable = readability.brightness > 125 && readability.color > 500;
            var score = 3 * (readability.brightness / 125) + (readability.color / 500);

            if ((readable && ! bestIsReadable) ||
                (readable && bestIsReadable && score > bestScore) ||
                ((! readable) && (! bestIsReadable) && score > bestScore)) {
                bestIsReadable = readable;
                bestScore = score;
                bestColor = tinycolor(colorList[i]);
            }
        }
        return bestColor;
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = { };
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) { n = "100%"; }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if ((math.abs(n - max) < 0.000001)) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = (n * 100) + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    var matchers = (function() {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    })();

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        }
        else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if ((match = matchers.rgb.exec(color))) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if ((match = matchers.rgba.exec(color))) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if ((match = matchers.hsl.exec(color))) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if ((match = matchers.hsla.exec(color))) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if ((match = matchers.hsv.exec(color))) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if ((match = matchers.hsva.exec(color))) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if ((match = matchers.hex8.exec(color))) {
            return {
                a: convertHexToDecimal(match[1]),
                r: parseIntFromHex(match[2]),
                g: parseIntFromHex(match[3]),
                b: parseIntFromHex(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex6.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if ((match = matchers.hex3.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    window.tinycolor = tinycolor;
    })();

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

});

// Spectrum Colorpicker
// Arabic (ar) localization
// https://github.com/seballot/spectrum
(function ( $ ) {

  var localization = $.spectrum.localization["ar"] = {
      cancelText: "إلغاء",
      chooseText: "إختار",
      clearText: "إرجاع الألوان على ما كانت",
      noColorSelectedText: "لم تختار أي لون",
      togglePaletteMoreText: "أكثر",
      togglePaletteLessText: "أقل"
  };

})( jQuery );

// Spectrum Colorpicker
// Catalan (ca) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["ca"] = {
        cancelText: "Cancel·lar",
        chooseText: "Escollir",
        clearText: "Esborrar color seleccionat",
        noColorSelectedText: "Cap color seleccionat",
        togglePaletteMoreText: "Més",
        togglePaletteLessText: "Menys"
    };

})( jQuery );

// Spectrum Colorpicker
// Czech (cs) localization
// https://github.com/seballot/spectrum
// author localization cs Pavel Laupe Dvorak pavel@pavel-dvorak.cz

(function ( $ ) {

    var localization = $.spectrum.localization["cs"] = {
        cancelText: "zrušit",
        chooseText: "vybrat",
        clearText: "Resetovat výměr barev",
        noColorSelectedText: "Žádná barva nebyla vybrána",
        togglePaletteMoreText: "více",
        togglePaletteLessText: "méně"
    };

})( jQuery );
// Spectrum Colorpicker
// German (de) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["de"] = {
        cancelText: "Abbrechen",
        chooseText: "Wählen",
        clearText: "Farbauswahl zurücksetzen",
        noColorSelectedText: "Keine Farbe ausgewählt",
        togglePaletteMoreText: "Mehr",
        togglePaletteLessText: "Weniger"
    };

})( jQuery );

// Spectrum Colorpicker
// Danish (dk) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["dk"] = {
		cancelText: "annuller",
		chooseText: "Vælg"
    };

})( jQuery );

// Spectrum Colorpicker
// Spanish (es) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["es"] = {
        cancelText: "Cancelar",
        chooseText: "Elegir",
        clearText: "Borrar color seleccionado",
        noColorSelectedText: "Ningún color seleccionado",
        togglePaletteMoreText: "Más",
        togglePaletteLessText: "Menos"
    };

})( jQuery );

// Spectrum Colorpicker
// Estonian (et) localization
// https://github.com/bgrins/spectrum

 (function ( $ ) {

     var localization = $.spectrum.localization["et"] = {
        cancelText: "Katkesta",
        chooseText: "Vali",
        clearText: "Tühista värvivalik",
        noColorSelectedText: "Ühtki värvi pole valitud",
        togglePaletteMoreText: "Rohkem",
        togglePaletteLessText: "Vähem"
    };

 })( jQuery );

// Spectrum Colorpicker
// Persian (fa) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["fa"] = {
        cancelText: "لغو",
        chooseText: "انتخاب",
        clearText: "تنظیم مجدد رنگ",
        noColorSelectedText: "هیچ رنگی انتخاب نشده است!",
        togglePaletteMoreText: "بیشتر",
        togglePaletteLessText: "کمتر"
    };

})( jQuery );

// Spectrum Colorpicker
// Finnish (fi) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["fi"] = {
        cancelText: "Kumoa",
        chooseText: "Valitse"
    };

})( jQuery );

// Spectrum Colorpicker
// French (fr) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["fr"] = {
        cancelText: "Annuler",
        chooseText: "Valider",
        clearText: "Effacer couleur sélectionnée",
        noColorSelectedText: "Aucune couleur sélectionnée",
        togglePaletteMoreText: "Plus",
        togglePaletteLessText: "Moins"
    };

})( jQuery );

// Spectrum Colorpicker
// Greek (gr) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["gr"] = {
        cancelText: "Ακύρωση",
        chooseText: "Επιλογή",
        clearText: "Καθαρισμός επιλεγμένου χρώματος",
        noColorSelectedText: "Δεν έχει επιλεχθεί κάποιο χρώμα",
        togglePaletteMoreText: "Περισσότερα",
        togglePaletteLessText: "Λιγότερα"
    };

})( jQuery );

// Spectrum Colorpicker
// Hebrew (he) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["he"] = {
        cancelText: "בטל בחירה",
        chooseText: "בחר צבע",
        clearText: "אפס בחירה",
        noColorSelectedText: "לא נבחר צבע",
        togglePaletteMoreText: "עוד צבעים",
        togglePaletteLessText: "פחות צבעים"
    };

})( jQuery );

// Spectrum Colorpicker
// Croatian (hr) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["hr"] = {
        cancelText: "Odustani",
        chooseText: "Odaberi",
        clearText: "Poništi odabir",
        noColorSelectedText: "Niti jedna boja nije odabrana",
        togglePaletteMoreText: "Više",
        togglePaletteLessText: "Manje"
    };

})( jQuery );

// Spectrum Colorpicker
// Hungarian (hu) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

  var localization = $.spectrum.localization["hu"] = {
      cancelText: "Mégsem",
      chooseText: "Mentés",
      clearText: "A színválasztás visszaállítása",
      noColorSelectedText: "Nincs szín kijelölve",
      togglePaletteMoreText: "Több",
      togglePaletteLessText: "Kevesebb"
  };

})( jQuery );

// Spectrum Colorpicker
// Indonesia/Bahasa Indonesia (id) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["id"] = {
        cancelText: "Batal",
        chooseText: "Pilih",
        clearText: "Hapus Pilihan Warna",
        noColorSelectedText: "Warna Tidak Dipilih",
        togglePaletteMoreText: "tambah",
        togglePaletteLessText: "kurangi"
    };

})( jQuery );

// Spectrum Colorpicker
// Italian (it) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["it"] = {
		cancelText: "annulla",
		chooseText: "scegli",
		clearText: "Annulla selezione colore",
		noColorSelectedText: "Nessun colore selezionato"
	};

})( jQuery );

// Spectrum Colorpicker
// Japanese (ja) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["ja"] = {
        cancelText: "中止",
        chooseText: "選択"
    };

})( jQuery );

// Spectrum Colorpicker
// Korean (ko) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["ko"] = {
        cancelText: "취소",
        chooseText: "선택",
        clearText: "선택 초기화",
        noColorSelectedText: "선택된 색상 없음",
        togglePaletteMoreText: "더보기",
        togglePaletteLessText: "줄이기"
    };

})( jQuery );

// Spectrum Colorpicker
// Lithuanian (lt) localization
// https://github.com/liesislukas

(function ( $ ) {

    var localization = $.spectrum.localization["lt"] = {
        cancelText: "Atšaukti",
        chooseText: "Pasirinkti",
        clearText: "Išvalyti pasirinkimą",
        noColorSelectedText: "Spalva nepasirinkta",
        togglePaletteMoreText: "Daugiau",
        togglePaletteLessText: "Mažiau"
    };

})( jQuery );

// Spectrum Colorpicker
// Norwegian, Bokmål (nb-no) localization
// https://github.com/greendimka

(function ( $ ) {

    var localization = $.spectrum.localization["nb-no"] = {
        cancelText: "Avbryte",
        chooseText: "Velg",
        clearText: "Tilbakestill",
        noColorSelectedText: "Farge er ikke valgt",
        togglePaletteMoreText: "Mer",
        togglePaletteLessText: "Mindre"
    };

})( jQuery );

// Spectrum Colorpicker
// Dutch (nl-nl) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["nl-nl"] = {
        cancelText: "Annuleer",
        chooseText: "Kies",
        clearText: "Wis kleur selectie",
        togglePaletteMoreText: 'Meer',
        togglePaletteLessText: 'Minder'
    };

})( jQuery );

// Spectrum Colorpicker
// Polish (pl) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["pl"] = {
        cancelText: "Anuluj",
        chooseText: "Wybierz",
        clearText: "Usuń wybór koloru",
        noColorSelectedText: "Nie wybrano koloru",
        togglePaletteMoreText: "Więcej",
        togglePaletteLessText: "Mniej"
    };

})( jQuery );

// Spectrum Colorpicker
// Brazilian (pt-br) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["pt-br"] = {
        cancelText: "Cancelar",
        chooseText: "Escolher",
        clearText: "Limpar cor selecionada",
        noColorSelectedText: "Nenhuma cor selecionada",
        togglePaletteMoreText: "Mais",
        togglePaletteLessText: "Menos"
    };

})( jQuery );

// Spectrum Colorpicker
// Portuguese (pt-pt) localization
// https://github.com/bgrins/spectrum

 (function ( $ ) {

     var localization = $.spectrum.localization["pt-pt"] = {
        cancelText: "Cancelar",
        chooseText: "Escolher",
        clearText: "Limpar cor seleccionada",
        noColorSelectedText: "Nenhuma cor seleccionada",
        togglePaletteMoreText: "Mais",
        togglePaletteLessText: "Menos"
    };

 })( jQuery );

// Spectrum Colorpicker
// Russian (ru) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["ru"] = {
        cancelText: "Отмена",
        chooseText: "Выбрать",
        clearText: "Сбросить",
        noColorSelectedText: "Цвет не выбран",
        togglePaletteMoreText: "Ещё",
        togglePaletteLessText: "Скрыть"
    };

})( jQuery );

// Spectrum Colorpicker
// Swedish (sv) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["sv"] = {
        cancelText: "Avbryt",
        chooseText: "Välj"
    };

})( jQuery );

// Spectrum Colorpicker
// Turkish (tr) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["tr"] = {
		cancelText: "iptal",
		chooseText: "tamam"
	};

})( jQuery );

// Spectrum Colorpicker
// Simplified Chinese (zh-cn) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["zh-cn"] = {
        cancelText: "取消",
        chooseText: "选择",
        clearText: "清除",
        togglePaletteMoreText: "更多选项",
        togglePaletteLessText: "隐藏",
        noColorSelectedText: "尚未选择任何颜色"
    };

})( jQuery );

// Spectrum Colorpicker
// Traditional Chinese (zh-tw) localization
// https://github.com/seballot/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["zh-tw"] = {
        cancelText: "取消",
        chooseText: "選擇",
        clearText: "清除",
        togglePaletteMoreText: "更多選項",
        togglePaletteLessText: "隱藏",
        noColorSelectedText: "尚未選擇任何顏色"
    };

})( jQuery );


