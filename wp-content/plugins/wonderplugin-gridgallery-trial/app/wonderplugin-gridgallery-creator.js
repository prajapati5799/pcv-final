/** Wonderplugin Portfolio Grid Gallery Plugin Trial Version
 * Copyright 2019 Magic Hills Pty Ltd All Rights Reserved
 * Website: http://www.wonderplugin.com
 * Version 17.2 
 */
(function ($) {
    $(document).ready(function () {
        $(".wonderplugin-gridgallery-engine").css({
            display: "none"
        });
        $("#wonderplugin-gridgallery-fullwidth").change(function () {
            if ($(this).is(":checked")) $("#wonderplugin-gridgallery-fullwidthsamegrid").prop("checked", false)
        });
        $("#wonderplugin-gridgallery-fullwidthsamegrid").change(function () {
            if ($(this).is(":checked")) $("#wonderplugin-gridgallery-fullwidth").prop("checked", false)
        });
        $("#wonderplugin-gridgallery-justifymode").change(function () {
            if ($(this).is(":checked")) $("#wonderplugin-gridgallery-masonrymode").prop("checked",
                false)
        });
        $("#wonderplugin-gridgallery-masonrymode").change(function () {
            if ($(this).is(":checked")) $("#wonderplugin-gridgallery-justifymode").prop("checked", false)
        });
        $(".wonderplugin-select-audio").click(function () {
            var textId = $(this).data("textid");
            var media_uploader = wp.media.frames.file_frame = wp.media({
                title: "Select MP3",
                library: {
                    type: "audio"
                },
                button: {
                    text: "Select MP3"
                },
                multiple: false
            });
            media_uploader.on("select", function (event) {
                var selection = media_uploader.state().get("selection");
                var attachment = selection.first().toJSON();
                if (attachment.type == "audio") $("#" + textId).val(attachment.url)
            });
            media_uploader.open()
        });
        $(".wonderplugin-select-mediaimage").click(function () {
            var textId = $(this).data("textid");
            var displayId = $(this).data("displayid");
            var inputName = $(this).data("inputname");
            var media_uploader = wp.media.frames.file_frame = wp.media({
                title: "Select Image",
                library: {
                    type: "image"
                },
                button: {
                    text: "Select Image"
                },
                multiple: false
            });
            media_uploader.on("select", function (event) {
                var selection = media_uploader.state().get("selection");
                var attachment =
                    selection.first().toJSON();
                if (attachment.type == "image") {
                    $("#" + textId).val(attachment.url);
                    if ($("input:radio[name=" + inputName + "]:checked").val() == "custom") $("#" + displayId).attr("src", attachment.url)
                }
            });
            media_uploader.open()
        });
        var applyLightboxnavarrowsposOptions = function (val) {
            if (val == "inside") $(".wonderplugin-gridgallery-lightboxnavarrowspos-options").removeClass("wonderplugin-disabled");
            else $(".wonderplugin-gridgallery-lightboxnavarrowspos-options").addClass("wonderplugin-disabled")
        };
        $("#wonderplugin-gridgallery-lightboxnavarrowspos").change(function () {
            applyLightboxnavarrowsposOptions($(this).val())
        });
        $("#wonderplugin-gridgallery-categorymenucaption-multilingual").click(function () {
            var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
            var langlist = {};
            try {
                langlist = JSON.parse($("#wonderplugin-gridgallery-langlist").text())
            } catch (err) {}
            var form = '<div><table style="width:100%;">';
            form += "<tr>";
            for (var i = 0; i < langlist.length; i++) form += "<td>" + langlist[i].translated_name + "</td>";
            form += "</tr>";
            form += "<tr>";
            for (var i = 0; i < langlist.length; i++) form += '<td><input data-langcode="' + langlist[i].code + '" type="text" value="" class="wonderplugin-gridgallery-categorymenucaption-multilingual-input medium-text"></td>';
            form += "</tr>";
            form += "</table></div>";
            $(form).dialog({
                title: "Multilingual Translation",
                resizable: true,
                modal: true,
                width: 800,
                open: function () {
                    var catcaptionlangs = null;
                    try {
                        catcaptionlangs = JSON.parse($("#wonderplugin-gridgallery-categorymenucaption-langs").text())
                    } catch (err) {}
                    var defaulttext = $("#wonderplugin-gridgallery-categorymenucaption").val();
                    if (catcaptionlangs) {
                        for (var key in catcaptionlangs)
                            if (key == defaultlang) catcaptionlangs[key] = defaulttext;
                        $(".wonderplugin-gridgallery-categorymenucaption-multilingual-input").each(function () {
                            var langcode =
                                $(this).data("langcode");
                            if (langcode in catcaptionlangs) $(this).val(catcaptionlangs[langcode]);
                            else $(this).val(defaulttext)
                        })
                    } else $(".wonderplugin-gridgallery-categorymenucaption-multilingual-input").each(function () {
                        $(this).val(defaulttext)
                    })
                },
                buttons: {
                    "Ok": function () {
                        var catcaptionlangs;
                        if ($(".wonderplugin-gridgallery-categorymenucaption-multilingual-input").length > 0) {
                            catcaptionlangs = {};
                            $(".wonderplugin-gridgallery-categorymenucaption-multilingual-input").each(function () {
                                var langcode = $(this).data("langcode");
                                catcaptionlangs[langcode] = $(this).val()
                            })
                        }
                        if (catcaptionlangs) $("#wonderplugin-gridgallery-categorymenucaption-langs").text(JSON.stringify(catcaptionlangs));
                        $(this).dialog("destroy").remove()
                    },
                    "Cancel": function () {
                        $(this).dialog("destroy").remove()
                    }
                }
            })
        });
        $("#wonderplugin-gridgallery-category-multilingual").click(function () {
            var langlist = {};
            try {
                langlist = JSON.parse($("#wonderplugin-gridgallery-langlist").text())
            } catch (err) {}
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            var form =
                '<div><table style="width:100%;">';
            form += "<tr>";
            form += "<td>Slug</td>";
            for (var i = 0; i < langlist.length; i++) form += "<td>" + langlist[i].translated_name + "</td>";
            form += "</tr>";
            for (var i = 0; i < categories.length; i++) {
                form += "<tr>";
                form += "<td>" + categories[i].slug + "</td>";
                for (var j = 0; j < langlist.length; j++) form += '<td><input data-slug="' + categories[i].slug + '" data-langcode="' + langlist[j].code + '" type="text" value="" class="wonderplugin-gridgallery-category-multilingual-input medium-text"></td>';
                form += "</tr>"
            }
            form +=
                "</table></div>";
            $(form).dialog({
                title: "Multilingual Translation",
                resizable: true,
                modal: true,
                width: 800,
                open: function () {
                    var catlangs = null;
                    try {
                        catlangs = JSON.parse($("#wonderplugin-gridgallery-category-langs").text())
                    } catch (err) {}
                    if (catlangs) $(".wonderplugin-gridgallery-category-multilingual-input").each(function () {
                        var slug = $(this).data("slug");
                        var langcode = $(this).data("langcode");
                        if (slug in catlangs && langcode in catlangs[slug]) $(this).val(catlangs[slug][langcode])
                    });
                    else $(".wonderplugin-gridgallery-category-multilingual-input").each(function () {
                        var slug =
                            $(this).data("slug");
                        for (var i = 0; i < categories.length; i++)
                            if (slug == categories[i].slug) $(this).val(categories[i].caption)
                    })
                },
                buttons: {
                    "Ok": function () {
                        var catlangs;
                        if ($(".wonderplugin-gridgallery-category-multilingual-input").length > 0) {
                            catlangs = {};
                            $(".wonderplugin-gridgallery-category-multilingual-input").each(function () {
                                var slug = $(this).data("slug");
                                var langcode = $(this).data("langcode");
                                if (!(slug in catlangs)) catlangs[slug] = {};
                                catlangs[slug][langcode] = $(this).val()
                            })
                        }
                        if (catlangs) $("#wonderplugin-gridgallery-category-langs").text(JSON.stringify(catlangs));
                        $(this).dialog("destroy").remove()
                    },
                    "Cancel": function () {
                        $(this).dialog("destroy").remove()
                    }
                }
            })
        });
        $(".wonderplugin-tab-buttons-horizontal").each(function () {
            var index = $.wpgridgalleryCookie($(this).attr("id"));
            if (index >= 0) {
                $(this).children("li").removeClass("wonderplugin-tab-button-horizontal-selected");
                $(this).children("li").eq(index).addClass("wonderplugin-tab-button-horizontal-selected");
                var panelsID = $(this).data("panelsid");
                $("#" + panelsID).children("li").removeClass("wonderplugin-tab-horizontal-selected");
                $("#" + panelsID).children("li").eq(index).addClass("wonderplugin-tab-horizontal-selected")
            }
            $(this).find("li").each(function (index) {
                $(this).click(function () {
                    if ($(this).hasClass("wonderplugin-tab-button-horizontal-selected")) return;
                    $(this).parent().find("li").removeClass("wonderplugin-tab-button-horizontal-selected");
                    $(this).addClass("wonderplugin-tab-button-horizontal-selected");
                    var panelsID = $(this).parent().data("panelsid");
                    $("#" + panelsID).children("li").removeClass("wonderplugin-tab-horizontal-selected");
                    $("#" + panelsID).children("li").eq(index).addClass("wonderplugin-tab-horizontal-selected");
                    $.wpgridgalleryCookie($(this).parent().attr("id"), index)
                })
            })
        });
        $(document).on("click", ".wonderplugin-dialog-tab-button", function () {
            if ($(this).hasClass("wonderplugin-dialog-tab-button-selected")) return;
            var index = $(this).index();
            $(this).closest(".wonderplugin-dialog-tab-buttons").find("li").removeClass("wonderplugin-dialog-tab-button-selected");
            $(this).addClass("wonderplugin-dialog-tab-button-selected");
            var panelsID =
                $(this).closest(".wonderplugin-dialog-tab-buttons").data("panelsid");
            $("#" + panelsID).children("li").removeClass("wonderplugin-dialog-tab-panel-selected");
            $("#" + panelsID).children("li").eq(index).addClass("wonderplugin-dialog-tab-panel-selected")
        });
        $("#wonderplugin-gridgallery-toolbar").find("li").each(function (index) {
            $(this).click(function () {                
                if ($(this).hasClass("wonderplugin-tab-buttons-selected")) return;
                $(this).parent().find("li").removeClass("wonderplugin-tab-buttons-selected");
                if (!$(this).hasClass("laststep")) $(this).addClass("wonderplugin-tab-buttons-selected");
                $("#wonderplugin-gridgallery-tabs").children("li").removeClass("wonderplugin-tab-selected");
                $("#wonderplugin-gridgallery-tabs").children("li").eq(index).addClass("wonderplugin-tab-selected");
                $("#wonderplugin-gridgallery-tabs").removeClass("wonderplugin-tabs-grey");
                if (index == 4) previewGridgallery();
                else if (index == 5) publishGridgallery()
            })
        });

        function my_by_pass_func(){
            return true;
        }
        $(document).on("click", ".wonderplugin-foldername", function () {
            var parent = $(this).closest(".wonderplugin-foldername-item");
            if (parent.hasClass("wonderplugin-folder-opened")) {
                parent.removeClass("wonderplugin-folder-opened");
                $(".wonderplugin-foldername-list", parent).remove();
                return false
            } else parent.addClass("wonderplugin-folder-opening");
            var ajaxnonce = $("#wonderplugin-gridgallery-ajaxnonce").text();
            var folderseperator = $("#wonderplugin-gridgallery-folderseperator").text();
            var folder = $(this).data("foldername");
            var inst = $(this);
            $("#wonderplugin-folder-selected").html(folder);
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "wonderplugin_gridgallery_list_folder",
                    nonce: ajaxnonce,
                    foldername: folder
                },
                success: function (data) {
                    parent.addClass("wonderplugin-folder-opened");
                    if (data && data.length > 0) {
                        var listcode = '<ul class="wonderplugin-foldername-list">';
                        for (var i = 0; i < data.length; i++) listcode += '<li class="wonderplugin-foldername-item wonderplugin-folder"><a class="wonderplugin-foldername" href="#" data-foldername="' + folder + folderseperator + data[i] + '">' + data[i] + "</a></li>";
                        listcode += "</ul>";
                        inst.append(listcode)
                    }
                },
                error: function () {},
                complete: function () {
                    parent.removeClass("wonderplugin-folder-opening")
                }
            });
            return false
        });
        $("input[name=wonderplugin-gridgallery-usetemplatefortextoverlay]").click(function () {
            var useTemplate =
                $("input[name=wonderplugin-gridgallery-usetemplatefortextoverlay]:checked").val() == 1;
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-true").find("textarea").prop("disabled", !useTemplate);
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-false").find("input").prop("disabled", useTemplate);
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-false").find("label").css("opacity", useTemplate ? "0.6" : 1)
        });
        $("#wonderplugin-gridgallery-usetemplateforgrid").click(function () {
            $("#wonderplugin-gridgallery-templateforgrid").prop("disabled",
                !$(this).is(":checked"))
        });
        var socialbgcolor = {
            "facebook": "#3b5998",
            "dribbble": "#d94a8b",
            "dropbox": "#477ff2",
            "mail": "#4d83ff",
            "flickr": "#3c58e6",
            "git": "#4174ba",
            "gplus": "#e45104",
            "instagram": "#d400c8",
            "linkedin": "#458bb7",
            "pinterest": "#c92228",
            "reddit": "#ee5300",
            "skype": "#53adf5",
            "tumblr": "#415878",
            "twitter": "#03b3ee",
            "link": "#517dd9",
            "whatsapp": "#72be44",
            "youtube": "#c7221b"
        };
        var getURLParams = function (href) {
            var result = {};
            if (href.indexOf("?") < 0) return result;
            var params = href.substring(href.indexOf("?") +
                1).split("&");
            for (var i = 0; i < params.length; i++) {
                var value = params[i].split("=");
                if (value && value.length == 2 && value[0].toLowerCase() != "v") result[value[0].toLowerCase()] = value[1]
            }
            return result
        };
        var addMediaToList = function (data) {
            if ($("#wonderplugin-newestfirst").is(":checked")) wonderplugin_gridgallery_config.slides.unshift(data);
            else wonderplugin_gridgallery_config.slides.push(data)
        };
        var slideDialog = function (dialogType, onSuccess, data, dataIndex) {
            var dialogTitle = ["image", "video", "Youtube Video", "Vimeo Video",
                "Dailymotion Video", "Iframe Video", "", "", "", "", "", "", "", "", "Web Link"
            ];
            var langlist = {};
            try {
                langlist = JSON.parse($("#wonderplugin-gridgallery-langlist").text())
            } catch (err) {}
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div id='wonderplugin-dialog-langs' style='display:none;'></div>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'></h3>" + "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" +
                "<table class='wonderplugin-dialog-form'>";
            if (dialogType == 2 || dialogType == 3 || dialogType == 4 || dialogType == 5) {
                dialogCode += "<tr>" + "<th>Video URL</th>" + "<td><input name='wonderplugin-dialog-video' type='text' id='wonderplugin-dialog-video' value='' class='regular-text' />";
                if (dialogType == 2 || dialogType == 3 || dialogType == 4) dialogCode += " or <input type='button' class='button' id='wonderplugin-dialog-select-video' value='Enter' />";
                dialogCode += "</td></tr>"
            }
            if (dialogType == 1) dialogCode += "<tr>" + "<th>MP4 video URL</th>" +
                "<td><input name='wonderplugin-dialog-mp4' type='text' id='wonderplugin-dialog-mp4' value='' class='regular-text' /> or <input type='button' class='button' data-textid='wonderplugin-dialog-mp4' id='wonderplugin-dialog-select-mp4' value='Upload' /></td>" + "</tr>" + "<tr>" + "<tr>" + "<th>WebM video URL (Optional)</th>" + "<td><input name='wonderplugin-dialog-webm' type='text' id='wonderplugin-dialog-webm' value='' class='regular-text' /> or <input type='button' class='button' data-textid='wonderplugin-dialog-webm' id='wonderplugin-dialog-select-webm' value='Upload' /></td>" +
                "</tr>" + "<tr>";
            if (dialogType != 14) dialogCode += "<tr>" + "<th>" + (dialogType > 0 ? "Poster" : "") + " Image URL</th>" + "<td><input name='wonderplugin-dialog-image' type='text' id='wonderplugin-dialog-image' value='' class='regular-text' /> or <input type='button' class='button' data-textid='wonderplugin-dialog-image' id='wonderplugin-dialog-select-image' value='Upload' /></td>" + "</tr>" + "<tr id='wonderplugin-dialog-image-display-tr' style='display:none;'>" + "<th></th>" + "<td><img id='wonderplugin-dialog-image-display' style='width:80px;height:80px;' /></td>" +
                "</tr>";
            dialogCode += "<tr>" + "<th>Thumbnail URL</th>" + "<td>" + "<input name='wonderplugin-dialog-thumbnail' type='text' id='wonderplugin-dialog-thumbnail' value='' class='regular-text' /> or <input type='button' class='button' data-textid='wonderplugin-dialog-thumbnail' id='wonderplugin-dialog-select-thumbnail' value='Upload' />";
            if (dialogType != 14) dialogCode += "<p><label><input name='wonderplugin-dialog-displaythumbnail' type='checkbox' id='wonderplugin-dialog-displaythumbnail' value='' checked />Use thumbnail in grid</label></p>";
            dialogCode += "</td></tr>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' + j + '" id="wonderplugin-dialog-category-' + j + '" value="' + categories[i].slug + '" type="checkbox"/>' + categories[i].caption + "</label>";
                        j++
                    } dialogCode +=
                    "</td></tr>"
            }
            if (dialogType == 10) dialogCode += "<tr>" + "<th>PDF URL</th>" + "<td><input name='wonderplugin-dialog-pdf' type='text' id='wonderplugin-dialog-pdf' value='' class='regular-text' /> or <input type='button' class='button' data-textid='wonderplugin-dialog-pdf' id='wonderplugin-dialog-select-pdf' value='Upload' />" + "<ul style='list-style-type:square;margin-left:24px;'><li>To support PDF files, please install the free plugin <a href='https://www.wonderplugin.com/wordpress-pdf-embed/' target='_blank'>Wonder PDF Embed</a> first.</li><li>The PDF file must be hosted at the same domain as the WordPrss website</li></ul>" +
                "</td>" + "</tr>";
            dialogCode += "</table>";
            var tabTitle = "";
            if (dialogType == 0) tabTitle = "Lightbox and Weblink";
            else if (dialogType == 14) tabTitle = "Weblink";
            else tabTitle = "Lightbox";
            dialogCode += '<ul class="wonderplugin-dialog-tab-buttons" data-panelsid="wonderplugin-dialog-tab-panels-content">' + '<li class="wonderplugin-dialog-tab-button wonderplugin-dialog-tab-button-selected">Text</li>' + '<li class="wonderplugin-dialog-tab-button">' + tabTitle + "</li>" + '<li class="wonderplugin-dialog-tab-button">Video Thumbnail</li>' +
                '<li class="wonderplugin-dialog-tab-button">Social Media</li>' + "</ul>";
            dialogCode += '<ul class="wonderplugin-dialog-tab-panels" id="wonderplugin-dialog-tab-panels-content">' + '<li class="wonderplugin-dialog-tab-panel wonderplugin-dialog-tab-panel-selected">';
            dialogCode += "<table class='wonderplugin-dialog-form'>";
            dialogCode += "<tr>" + "<th>Title</th>" + "<td><input name='wonderplugin-dialog-image-title' type='text' id='wonderplugin-dialog-image-title' value='' class='large-text' /></td>" + "</tr>" + "<tr>" + "<th>Description</th>" +
                "<td><textarea name='wonderplugin-dialog-image-description' type='' id='wonderplugin-dialog-image-description' value='' class='large-text'></textarea></td>" + "</tr>" + "<th>Img alt text</th>" + "<td><label><input name='wonderplugin-dialog-image-altusetitle' type='checkbox' id='wonderplugin-dialog-image-altusetitle' checked /> Use Title as img alt text. To use a different text, uncheck the option and enter it below:  </label><br><input name='wonderplugin-dialog-image-alt' type='text' id='wonderplugin-dialog-image-alt' value='' class='large-text' disabled /></td>" +
                "</tr>" + "<tr>" + "<th>Button text</th>" + "<td><div style='float:left;'><input name='wonderplugin-dialog-image-button' type='text' id='wonderplugin-dialog-image-button' value='' class='regular-text' style='width:240px;'/> CSS:&nbsp;&nbsp;&nbsp;&nbsp;</div>" + "<div class='select-editable'><select onchange='this.nextElementSibling.value=this.value'>" + "<option value=''></option>" + "<option value='wpp-btn-blue-small'>wpp-btn-blue-small</option>" + "<option value='wpp-btn-blue-medium'>wpp-btn-blue-medium</option>" +
                "<option value='wpp-btn-blue-large'>wpp-btn-blue-large</option>" + "<option value='wpp-btn-blueborder-small'>wpp-btn-blueborder-small</option>" + "<option value='wpp-btn-blueborder-medium'>wpp-btn-blueborder-medium</option>" + "<option value='wpp-btn-blueborder-large'>wpp-btn-blueborder-large</option>" + "<option value='wpp-btn-orange-small'>wpp-btn-orange-small</option>" + "<option value='wpp-btn-orange-medium'>wpp-btn-orange-medium</option>" + "<option value='wpp-btn-orange-large'>wpp-btn-orange-large</option>" +
                "<option value='wpp-btn-orangeborder-small'>wpp-btn-orangeborder-small</option>" + "<option value='wpp-btn-orangeborder-medium'>wpp-btn-orangeborder-medium</option>" + "<option value='wpp-btn-orangeborder-large'>wpp-btn-orangeborder-large</option>" + "<option value='wpp-btn-navy-small'>wpp-btn-navy-small</option>" + "<option value='wpp-btn-navy-medium'>wpp-btn-navy-medium</option>" + "<option value='wpp-btn-navy-large'>wpp-btn-navy-large</option>" + "<option value='wpp-btn-navyborder-small'>wpp-btn-navyborder-small</option>" +
                "<option value='wpp-btn-navyborder-medium'>wpp-btn-navyborder-medium</option>" + "<option value='wpp-btn-navyborder-large'>wpp-btn-navyborder-large</option>" + "<option value='wpp-btn-white-small'>wpp-btn-white-small</option>" + "<option value='wpp-btn-white-medium'>wpp-btn-white-medium</option>" + "<option value='wpp-btn-white-large'>wpp-btn-white-large</option>" + "<option value='wpp-btn-whiteborder-small'>wpp-btn-whiteborder-small</option>" + "<option value='wpp-btn-whiteborder-medium'>wpp-btn-whiteborder-medium</option>" +
                "<option value='wpp-btn-whiteborder-large'>wpp-btn-whiteborder-large</option>" + "</select><input type='text' name='wonderplugin-dialog-image-buttoncss' id='wonderplugin-dialog-image-buttoncss' value='wpp-btn-blue-medium' /></div>" + "</td>" + "</tr>" + "<tr><th></th><td><label><input name='wonderplugin-dialog-image-buttonlightbox' type='checkbox' id='wonderplugin-dialog-image-buttonlightbox' value='' />Open current " + dialogTitle[dialogType] + " in lightbox when clicking the button</label></td></tr>" + "<tr>" +
                "<th>Button link</th>" + "<td><div style='float:left;'><input name='wonderplugin-dialog-image-buttonlink' type='text' id='wonderplugin-dialog-image-buttonlink' value='' class='regular-text' style='width:240px;'/> Target: </div>" + "<div class='select-editable'><select onchange='this.nextElementSibling.value=this.value'>" + "<option value=''></option>" + "<option value='_blank'>_blank</option>" + "<option value='_self'>_self</option>" + "<option value='_parent'>_parent</option>" + "<option value='_top'>_top</option>" +
                "</select><input name='wonderplugin-dialog-image-buttonlinktarget' type='text' id='wonderplugin-dialog-image-buttonlinktarget' value='' /></div></td>" + "</tr>";
            if (langlist && langlist.length > 1) dialogCode += '<tr colspan="2"><td><input type="button" class="button button-primary" id="wonderplugin-dialog-multilingual" value="Multilingual Translation"></td></tr>';
            dialogCode += "</table>";
            dialogCode += '</li><li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form'>";
            if (dialogType >=
                0 && dialogType <= 5) {
                dialogCode += "<tr>" + "<th>Click to open Lightbox popup</th>" + "<td>";
                if (dialogType == 0) dialogCode += "<label style='margin-right:16px;'><input name='wonderplugin-dialog-lightbox' type='checkbox' id='wonderplugin-dialog-lightbox' value='' checked /> Open current " + dialogTitle[dialogType] + " in Lightbox</label>";
                dialogCode += "<label><input name='wonderplugin-dialog-lightbox-size' type='checkbox' id='wonderplugin-dialog-lightbox-size' value='' /> Set Lightbox size </label>" + " <input name='wonderplugin-dialog-lightbox-width' type='text' id='wonderplugin-dialog-lightbox-width' value='960' class='small-text' /> / <input name='wonderplugin-dialog-lightbox-height' type='text' id='wonderplugin-dialog-lightbox-height' value='540' class='small-text' />";
                dialogCode += "</td></tr>"
            }
            if (dialogType == 0 || dialogType == 14) {
                dialogCode += "<tr><th>Click to open web link</th>" + "<td>" + "<input name='wonderplugin-dialog-weblink' type='text' id='wonderplugin-dialog-weblink' value='' class='regular-text' disabled />";
                if (dialogType != 14) dialogCode += "<br /><span style='font-size:12px;font-weight:bold;'>* Uncheck the option \"Open current image in Lightbox\" to enable weblink</span>";
                dialogCode += "</td>" + "</tr>" + "<tr><th>Set web link onclick JavaScript code</th>" + "<td>" + "<input name='wonderplugin-dialog-clickhandler' type='text' id='wonderplugin-dialog-clickhandler' value='' class='large-text' disabled />" +
                    "</td>" + "</tr>" + "<tr><th>Set web link target</th>" + "<td>" + "<div class='select-editable'><select onchange='this.nextElementSibling.value=this.value' id='wonderplugin-dialog-linktarget-select' disabled>" + "<option value=''></option>" + "<option value='_blank'>_blank</option>" + "<option value='_self'>_self</option>" + "<option value='_parent'>_parent</option>" + "<option value='_top'>_top</option>" + "</select>" + "<input name='wonderplugin-dialog-linktarget' type='text' id='wonderplugin-dialog-linktarget' value='' class='regular-text' disabled /></div>" +
                    "<label style='margin-left:16px;'><input name='wonderplugin-dialog-weblinklightbox' type='checkbox' id='wonderplugin-dialog-weblinklightbox' value='' />Open web link in Lightbox</label>" + "</td>" + "</tr>"
            } else if (dialogType >= 1 && dialogType <= 5) {
                dialogCode += "<tr><th>Video Playing</th>" + "<td>" + "<label><input name='wonderplugin-dialog-playvideoinline' type='checkbox' id='wonderplugin-dialog-playvideoinline' value='' /> Play the video in the grid</label>" + "<p><label><input name='wonderplugin-dialog-loadvideoinline' type='checkbox' id='wonderplugin-dialog-loadvideoinline' value='' /> Directly load the video in the grid</label></p>";
                if (dialogType == 1) dialogCode += "<p><label>&nbsp;&nbsp;&nbsp;&nbsp;<input name='wonderplugin-dialog-autoplaymutedvideoinline' type='checkbox' id='wonderplugin-dialog-autoplaymutedvideoinline' value='' /> Automatically play the muted video in the grid</label></p>" + "<p>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name='wonderplugin-dialog-playmutedvideoinlineonhover' type='checkbox' id='wonderplugin-dialog-playmutedvideoinlineonhover' value='' /> Play and pause the muted video on hover</label></p>" + "<p>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name='wonderplugin-dialog-playvideoinlineonclick' type='checkbox' id='wonderplugin-dialog-playvideoinlineonclick' value='' /> Play and pause the video on click</label></p>" +
                    "<p>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name='wonderplugin-dialog-playvideoinlinemuted' type='checkbox' id='wonderplugin-dialog-playvideoinlinemuted' value='' /> Muted</label>" + "&nbsp;&nbsp;&nbsp;&nbsp;<label><input name='wonderplugin-dialog-autoplaymutedvideoinlineloop' type='checkbox' id='wonderplugin-dialog-autoplaymutedvideoinlineloop' value='' /> Loop</label>" + "&nbsp;&nbsp;&nbsp;&nbsp;<label><input name='wonderplugin-dialog-autoplaymutedvideoinlinehidecontrols' type='checkbox' id='wonderplugin-dialog-autoplaymutedvideoinlinehidecontrols' value='' /> Hide controls</label></p>";
                dialogCode += "</td>" + "</tr>"
            }
            if (dialogType == 14) {
                dialogCode += "<tr><th></th><td>";
                dialogCode += "<label><input name='wonderplugin-dialog-lightbox-size' type='checkbox' id='wonderplugin-dialog-lightbox-size' value='' /> Set Lightbox size </label>" + " <input name='wonderplugin-dialog-lightbox-width' type='text' id='wonderplugin-dialog-lightbox-width' value='960' class='small-text' /> / <input name='wonderplugin-dialog-lightbox-height' type='text' id='wonderplugin-dialog-lightbox-height' value='540' class='small-text' />";
                dialogCode += "</td></tr>"
            }
            if (dialogType == 10) {
                dialogCode += "<tr><td colspan='2'>";
                dialogCode += "<label><input name='wonderplugin-dialog-lightbox-size' type='checkbox' id='wonderplugin-dialog-lightbox-size' value='' /> Set Lightbox size </label>" + " <input name='wonderplugin-dialog-lightbox-width' type='number' id='wonderplugin-dialog-lightbox-width' value='1024' class='small-text' /> / <input name='wonderplugin-dialog-lightbox-height' type='number' id='wonderplugin-dialog-lightbox-height' value='768' class='small-text' />";
                dialogCode += "</td></tr>"
            }
            dialogCode += "</table>";
            dialogCode += '</li><li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form'>";
            dialogCode += "<tr><th>Grid Thumbnail</th>" + "<td>" + "<label><input name='wonderplugin-dialog-usevideothumbnail' type='checkbox' id='wonderplugin-dialog-usevideothumbnail' value='' /> Display a muted HTML5 video as thumbnail in the grid</label>" + "<p>Video URL: <input name='wonderplugin-dialog-videothumbnail' type='text' id='wonderplugin-dialog-videothumbnail' disabled value='' class='regular-text' /> or <input type='button' class='button' disabled data-textid='wonderplugin-dialog-videothumbnail' id='wonderplugin-dialog-select-videothumbnail' value='Upload' /></p>" +
                "</td>" + "</tr>";
            dialogCode += "</table>";
            dialogCode += '</li><li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form'>";
            dialogCode += "<tr><th>Add Social Media</th><td>" + "<div class='wonderplugin-dialog-socialmedia-container'><div><select class='wonderplugin-dialog-socialmedia'>" + "<option value='facebook'>Facebook</option>" + "<option value='dribbble'>Dribbble</option>" + "<option value='dropbox'>Dropbox</option>" + "<option value='mail'>Email</option>" + "<option value='flickr'>Flickr</option>" +
                "<option value='git'>Git</option>" + "<option value='gplus'>Google+</option>" + "<option value='instagram'>Instagram</option>" + "<option value='linkedin'>Linkedin</option>" + "<option value='pinterest'>Pinterest</option>" + "<option value='reddit'>Reddit</option>" + "<option value='skype'>Skype</option>" + "<option value='tumblr'>Tumblr</option>" + "<option value='twitter'>Twitter</option>" + "<option value='link'>Website</option>" + "<option value='whatsapp'>Whatsapp</option>" + "<option value='youtube'>Youtube</option>" +
                "</select><span class='dashicons dashicons-plus-alt wonderplugin-dialog-addsocialmedia'></span></div></div>" + "</td></tr><tr><th></th><td>" + "<table class='wonderplugin-dialog-socialmedia-table'></table>" + "</td></tr>" + "<tr><th>Options</th><td>" + "<div style='display:inline-block;margin-right:8px;'>Target:</div><div style='display:inline-block;'><div class='select-editable'><select onchange='this.nextElementSibling.value=this.value' id='wonderplugin-dialog-socialmediatarget-select'>" + "<option value=''></option>" +
                "<option value='_blank'>_blank</option>" + "<option value='_self'>_self</option>" + "<option value='_parent'>_parent</option>" + "<option value='_top'>_top</option>" + "</select>" + "<input name='wonderplugin-dialog-socialmediatarget' type='text' id='wonderplugin-dialog-socialmediatarget' value='' class='regular-text' /></div></div>" + "<p><label><input name='wonderplugin-dialog-socialmediarotate' type='checkbox' id='wonderplugin-dialog-socialmediarotate' value='' checked />Enable button rotating effect on mouse hover</label></p>" +
                "</tr></tr>";
            dialogCode += "</table>";
            dialogCode += "</li></ul>";
            dialogCode += "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $slideDialog = $(dialogCode);
            $("body").append($slideDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() +
                    "px"
            });
            if (dialogType == 0) $("#wonderplugin-dialog-lightbox").click(function () {
                var is_checked = $(this).is(":checked");
                if ($("#wonderplugin-dialog-weblink").length) {
                    $("#wonderplugin-dialog-weblink").prop("disabled", is_checked);
                    if (is_checked) $("#wonderplugin-dialog-weblink").val("")
                }
                if ($("#wonderplugin-dialog-clickhandler").length) $("#wonderplugin-dialog-clickhandler").prop("disabled", is_checked);
                if ($("#wonderplugin-dialog-linktarget").length) {
                    $("#wonderplugin-dialog-linktarget").prop("disabled", is_checked);
                    if (is_checked) $("#wonderplugin-dialog-linktarget").val("")
                }
                if ($("#wonderplugin-dialog-linktarget-select").length) $("#wonderplugin-dialog-linktarget-select").prop("disabled", is_checked);
                if ($("#wonderplugin-dialog-weblinklightbox").length) $("#wonderplugin-dialog-weblinklightbox").prop("disabled", is_checked)
            });
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            $("#wonderplugin-dialog-title").html("Add " +
                dialogTitle[dialogType]);
            $("#wonderplugin-dialog-image-altusetitle").click(function () {
                $("#wonderplugin-dialog-image-alt").prop("disabled", $(this).is(":checked"))
            });
            $("#wonderplugin-dialog-usevideothumbnail").click(function () {
                $("#wonderplugin-dialog-videothumbnail").prop("disabled", !$(this).is(":checked"));
                $("#wonderplugin-dialog-select-videothumbnail").prop("disabled", !$(this).is(":checked"))
            });
            $(".wonderplugin-dialog-addsocialmedia").click(function () {
                var item = $(".wonderplugin-dialog-socialmedia").val();
                var itemtext = $(".wonderplugin-dialog-socialmedia option:selected").text();
                $(".wonderplugin-dialog-socialmedia-table").append('<tr class="wonderplugin-dialog-socialmedia-row" data-item="' + item + '"><td><div class="wonderplugin-dialog-socialmedia-button-container"><div class="mh-icon-' + item + ' wonderplugin-dialog-socialmedia-button" style="background-color:' + socialbgcolor[item] + ';"></div></div></td>' + '<td><span class="wonderplugin-dialog-socialmedia-title">' + itemtext + "</span></td>" + '<td><input class="wonderplugin-dialog-socialmedia-url" type="text" placeholder="Enter ' +
                    itemtext + " " + (item == "mail" ? "Address" : "URL") + '"></span></td>' + '<td><span class="dashicons dashicons-dismiss wonderplugin-dialog-removesocialmedia"></span></td></tr>')
            });
            $(".wonderplugin-dialog-socialmedia-table").on("click", ".wonderplugin-dialog-removesocialmedia", function () {
                $(this).closest(".wonderplugin-dialog-socialmedia-row").remove()
            });
            if (langlist && langlist.length > 1) $("#wonderplugin-dialog-multilingual").click(function () {
                var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
                var form =
                    '<div><ul class="wonderplugin-dialog-tab-buttons" data-panelsid="wonderplugin-dialog-tab-panels-multilingual">';
                for (var i = 0; i < langlist.length; i++) form += '<li class="wonderplugin-dialog-tab-button' + (defaultlang == langlist[i].code ? " wonderplugin-dialog-tab-button-selected" : "") + '">' + langlist[i].translated_name + (defaultlang == langlist[i].code ? " (default)" : "") + "</li>";
                form += "</ul>";
                form += '<ul class="wonderplugin-dialog-tab-panels" id="wonderplugin-dialog-tab-panels-multilingual">';
                for (var i = 0; i < langlist.length; i++) {
                    form +=
                        '<li data-langcode="' + langlist[i].code + '" class="wonderplugin-dialog-tab-panel-' + langlist[i].code + " wonderplugin-dialog-tab-panel" + (defaultlang == langlist[i].code ? " wonderplugin-dialog-tab-panel-selected" : "") + '">';
                    form += '<table style="width:100%;">';
                    form += '<tr><th>Title</th><td><input name="wonderplugin-dialog-multilingual-title" value="" type="text" class="large-text"></input></td></tr>';
                    form += '<tr><th>Description</th><td><textarea name="wonderplugin-dialog-multilingual-description" class="large-text"></textarea></td></tr>';
                    form += '<tr><th>Img Alt Text</th><td><input name="wonderplugin-dialog-multilingual-alt" value="" type="text" class="large-text"></input></td></tr>';
                    form += '<tr><th>Button Text</th><td><input name="wonderplugin-dialog-multilingual-button" value="" type="text" class="large-text"></input></td></tr>';
                    form += "</table>";
                    form += "</li>"
                }
                form += "</ul></div>";
                $(form).dialog({
                    title: "Multilingual Translation",
                    resizable: true,
                    modal: true,
                    width: 800,
                    open: function () {
                        var langs = null;
                        try {
                            langs = JSON.parse($("#wonderplugin-dialog-langs").text())
                        } catch (err) {}
                        var defaultlang =
                            $("#wonderplugin-gridgallery-defaultlang").text();
                        if (langs)
                            for (var key in langs) {
                                if (key == defaultlang) {
                                    langs[key].title = $("#wonderplugin-dialog-image-title").val();
                                    langs[key].description = $("#wonderplugin-dialog-image-description").val();
                                    langs[key].alt = $("#wonderplugin-dialog-image-alt").val();
                                    langs[key].button = $("#wonderplugin-dialog-image-button").val()
                                }
                                var panel = $("#wonderplugin-dialog-tab-panels-multilingual .wonderplugin-dialog-tab-panel-" + key);
                                if (panel.length > 0) {
                                    $("input[name=wonderplugin-dialog-multilingual-title]",
                                        panel).val(langs[key].title);
                                    $("textarea[name=wonderplugin-dialog-multilingual-description]", panel).val(langs[key].description);
                                    $("input[name=wonderplugin-dialog-multilingual-alt]", panel).val(langs[key].alt);
                                    $("input[name=wonderplugin-dialog-multilingual-button]", panel).val(langs[key].button)
                                }
                            } else
                                for (var i = 0; i < langlist.length; i++) {
                                    $("input[name=wonderplugin-dialog-multilingual-title]").val($("#wonderplugin-dialog-image-title").val());
                                    $("textarea[name=wonderplugin-dialog-multilingual-description]").val($("#wonderplugin-dialog-image-description").val());
                                    $("input[name=wonderplugin-dialog-multilingual-alt]").val($("#wonderplugin-dialog-image-alt").val());
                                    $("input[name=wonderplugin-dialog-multilingual-button]").val($("#wonderplugin-dialog-image-button").val())
                                }
                    },
                    buttons: {
                        "Ok": function () {
                            var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
                            var langs = {};
                            $("#wonderplugin-dialog-tab-panels-multilingual .wonderplugin-dialog-tab-panel").each(function (index) {
                                var langcode = $(this).data("langcode");
                                langs[langcode] = {
                                    title: $("input[name=wonderplugin-dialog-multilingual-title]",
                                        this).val(),
                                    description: $("textarea[name=wonderplugin-dialog-multilingual-description]", this).val(),
                                    alt: $("input[name=wonderplugin-dialog-multilingual-alt]", this).val(),
                                    button: $("input[name=wonderplugin-dialog-multilingual-button]", this).val()
                                };
                                if (langcode == defaultlang) {
                                    $("#wonderplugin-dialog-image-title").val(langs[langcode].title);
                                    $("#wonderplugin-dialog-image-description").val(langs[langcode].description);
                                    $("#wonderplugin-dialog-image-alt").val(langs[langcode].alt);
                                    $("#wonderplugin-dialog-image-button").val(langs[langcode].button)
                                }
                            });
                            $("#wonderplugin-dialog-langs").text(JSON.stringify(langs));
                            $(this).dialog("destroy").remove()
                        },
                        "Cancel": function () {
                            $(this).dialog("destroy").remove()
                        }
                    }
                })
            });
            var getSocialMedia = function () {
                var sociallist = [];
                $(".wonderplugin-dialog-socialmedia-row").each(function () {
                    sociallist.push({
                        "name": $(this).data("item"),
                        "url": $.trim($(".wonderplugin-dialog-socialmedia-url", this).val())
                    })
                });
                return JSON.stringify(sociallist)
            };
            var drawSocialMedia = function (socialmedia) {
                var sociallist = {};
                try {
                    sociallist = JSON.parse(socialmedia)
                } catch (err) {}
                for (var i =
                        0; i < sociallist.length; i++) {
                    var item = sociallist[i].name;
                    var itemtext = $('.wonderplugin-dialog-socialmedia option[value="' + item + '"]').text();
                    $(".wonderplugin-dialog-socialmedia-table").append('<tr class="wonderplugin-dialog-socialmedia-row" data-item="' + item + '"><td><div class="wonderplugin-dialog-socialmedia-button-container"><div class="mh-icon-' + item + ' wonderplugin-dialog-socialmedia-button" style="background-color:' + socialbgcolor[item] + ';"></div></div></td>' + '<td><span class="wonderplugin-dialog-socialmedia-title">' +
                        itemtext + "</span></td>" + '<td><input class="wonderplugin-dialog-socialmedia-url" type="text" value="' + sociallist[i].url + '"placeholder="Enter ' + itemtext + " " + (item == "mail" ? "Address" : "URL") + '"></span></td>' + '<td><span class="dashicons dashicons-dismiss wonderplugin-dialog-removesocialmedia"></span></td></tr>')
                }
            };
            if (dialogType == 14) {
                $("#wonderplugin-dialog-weblink").prop("disabled", false);
                $("#wonderplugin-dialog-clickhandler").prop("disabled", false);
                $("#wonderplugin-dialog-linktarget").prop("disabled",
                    false);
                $("#wonderplugin-dialog-linktarget-select").prop("disabled", false);
                $("#wonderplugin-dialog-weblinklightbox").prop("disabled", false)
            }
            if (data) {
                if (data.langs) $("#wonderplugin-dialog-langs").text(data.langs);
                if (dialogType == 2 || dialogType == 3 || dialogType == 4 || dialogType == 5) $("#wonderplugin-dialog-video").val(data.video);
                $("#wonderplugin-dialog-image").val(data.image);
                if (data.image) {
                    $("#wonderplugin-dialog-image-display-tr").css({
                        display: "table-row"
                    });
                    $("#wonderplugin-dialog-image-display").attr("src",
                        data.image)
                }
                $("#wonderplugin-dialog-thumbnail").val(data.thumbnail);
                if (data.displaythumbnail) $("#wonderplugin-dialog-displaythumbnail").prop("checked", true);
                else $("#wonderplugin-dialog-displaythumbnail").prop("checked", false);
                $("#wonderplugin-dialog-image-title").val(data.title);
                $("#wonderplugin-dialog-image-description").val(data.description);
                $("#wonderplugin-dialog-image-button").val(data.button);
                $("#wonderplugin-dialog-image-buttoncss").val(data.buttoncss);
                $("#wonderplugin-dialog-image-buttonlink").val(data.buttonlink);
                $("#wonderplugin-dialog-image-buttonlinktarget").val(data.buttonlinktarget);
                $("#wonderplugin-dialog-image-buttonlightbox").prop("checked", data.buttonlightbox);
                if (data.socialmedia) {
                    drawSocialMedia(data.socialmedia);
                    $("#wonderplugin-dialog-socialmediatarget").val(data.socialmediatarget);
                    $("#wonderplugin-dialog-socialmediarotate").prop("checked", data.socialmediarotate)
                }
                if ("altusetitle" in data) {
                    $("#wonderplugin-dialog-image-altusetitle").prop("checked", data.altusetitle);
                    $("#wonderplugin-dialog-image-alt").val(data.alt);
                    $("#wonderplugin-dialog-image-alt").prop("disabled", data.altusetitle)
                } else {
                    $("#wonderplugin-dialog-image-altusetitle").prop("checked", true);
                    $("#wonderplugin-dialog-image-alt").val("");
                    $("#wonderplugin-dialog-image-alt").prop("disabled", true)
                }
                if (dialogType == 1) {
                    $("#wonderplugin-dialog-mp4").val(data.mp4);
                    $("#wonderplugin-dialog-webm").val(data.webm)
                }
                if (dialogType == 0 || dialogType == 14) {
                    $("#wonderplugin-dialog-lightbox").prop("checked", data.lightbox);
                    $("#wonderplugin-dialog-weblink").val(data.weblink);
                    $("#wonderplugin-dialog-weblink").prop("disabled", data.lightbox);
                    $("#wonderplugin-dialog-clickhandler").val(data.clickhandler);
                    $("#wonderplugin-dialog-clickhandler").prop("disabled", data.lightbox);
                    $("#wonderplugin-dialog-linktarget").val(data.linktarget);
                    $("#wonderplugin-dialog-linktarget").prop("disabled", data.lightbox);
                    $("#wonderplugin-dialog-linktarget-select").prop("disabled", data.lightbox);
                    $("#wonderplugin-dialog-weblinklightbox").prop("checked", data.weblinklightbox);
                    $("#wonderplugin-dialog-weblinklightbox").prop("disabled",
                        data.lightbox)
                }
                if (dialogType == 10) $("#wonderplugin-dialog-pdf").val(data.pdf);
                if ("lightboxsize" in data) $("#wonderplugin-dialog-lightbox-size").prop("checked", data.lightboxsize);
                if (data.lightboxwidth) $("#wonderplugin-dialog-lightbox-width").val(data.lightboxwidth);
                if (data.lightboxheight) $("#wonderplugin-dialog-lightbox-height").val(data.lightboxheight);
                if (dialogType >= 1 && dialogType <= 5) {
                    $("#wonderplugin-dialog-playvideoinline").prop("checked", data.playvideoinline);
                    $("#wonderplugin-dialog-loadvideoinline").prop("checked",
                        data.loadvideoinline);
                    if (dialogType == 1) {
                        $("#wonderplugin-dialog-autoplaymutedvideoinline").prop("checked", data.autoplaymutedvideoinline);
                        $("#wonderplugin-dialog-autoplaymutedvideoinlineloop").prop("checked", data.autoplaymutedvideoinlineloop);
                        $("#wonderplugin-dialog-autoplaymutedvideoinlinehidecontrols").prop("checked", data.autoplaymutedvideoinlinehidecontrols);
                        $("#wonderplugin-dialog-playmutedvideoinlineonhover").prop("checked", data.playmutedvideoinlineonhover);
                        $("#wonderplugin-dialog-playvideoinlineonclick").prop("checked",
                            data.playvideoinlineonclick);
                        $("#wonderplugin-dialog-playvideoinlinemuted").prop("checked", data.playvideoinlinemuted)
                    }
                }
                if ("usevideothumbnail" in data) {
                    $("#wonderplugin-dialog-usevideothumbnail").prop("checked", data.usevideothumbnail);
                    $("#wonderplugin-dialog-videothumbnail").val(data.videothumbnail);
                    $("#wonderplugin-dialog-videothumbnail").prop("disabled", !data.usevideothumbnail);
                    $("#wonderplugin-dialog-select-videothumbnail").prop("disabled", !data.usevideothumbnail)
                }
                if (data.category) {
                    var categories =
                        data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" + i).val(), categories) !== -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
            }
            if (dialogType == 2 || dialogType == 3 || dialogType == 4) $("#wonderplugin-dialog-select-video").click(function () {
                var videoData = {
                    type: dialogType,
                    video: $.trim($("#wonderplugin-dialog-video").val()),
                    image: $.trim($("#wonderplugin-dialog-image").val()),
                    thumbnail: $.trim($("#wonderplugin-dialog-thumbnail").val()),
                    title: $.trim($("#wonderplugin-dialog-image-title").val()),
                    description: $.trim($("#wonderplugin-dialog-image-description").val()),
                    socialmedia: getSocialMedia(),
                    socialmediatarget: $.trim($("#wonderplugin-dialog-socialmediatarget").val()),
                    socialmediarotate: $("#wonderplugin-dialog-socialmediarotate").is(":checked"),
                    altusetitle: $("#wonderplugin-dialog-image-altusetitle").is(":checked"),
                    alt: $.trim($("#wonderplugin-dialog-image-alt").val()),
                    button: $.trim($("#wonderplugin-dialog-image-button").val()),
                    buttoncss: $.trim($("#wonderplugin-dialog-image-buttoncss").val()),
                    buttonlink: $.trim($("#wonderplugin-dialog-image-buttonlink").val()),
                    buttonlinktarget: $.trim($("#wonderplugin-dialog-image-buttonlinktarget").val()),
                    buttonlightbox: $("#wonderplugin-dialog-image-buttonlightbox").is(":checked")
                };
                $slideDialog.remove();
                onlineVideoDialog(dialogType, function (items) {
                    items.map(function (data) {
                        addMediaToList({
                            type: dialogType,
                            image: data.image,
                            thumbnail: data.thumbnail ? data.thumbnail : data.image,
                            displaythumbnail: data.displaythumbnail,
                            video: data.video,
                            mp4: data.mp4,
                            webm: data.webm,
                            title: data.title,
                            description: data.description,
                            socialmedia: data.socialmedia,
                            socialmediatarget: data.socialmediatarget,
                            socialmediarotate: data.socialmediarotate,
                            altusetitle: data.altusetitle,
                            alt: data.alt,
                            button: data.button,
                            buttoncss: data.buttoncss,
                            buttonlink: data.buttonlink,
                            buttonlinktarget: data.buttonlinktarget,
                            buttonlightbox: data.buttonlightbox,
                            weblink: data.weblink,
                            clickhandler: data.clickhandler,
                            linktarget: data.linktarget,
                            weblinklightbox: data.weblinklightbox,
                            lightbox: true,
                            lightboxsize: data.lightboxsize,
                            lightboxwidth: data.lightboxwidth,
                            lightboxheight: data.lightboxheight,
                            playvideoinline: data.playvideoinline,
                            loadvideoinline: data.loadvideoinline,
                            category: data.category,
                            langs: data.langs
                        })
                    });
                    updateMediaTable()
                }, videoData, true, dataIndex)
            });
            var get_media_langs = function (items, callback) {
                if (langlist && langlist.length > 1) {
                    var media = new Array;
                    for (var i = 0; i < items.length; i++) media.push(items[i].id);
                    var ajaxnonce = $("#wonderplugin-gridgallery-ajaxnonce").text();
                    var loading = '<div><div class="wonderplugin-dialog-loading"></div><p style="text-align:center;font-size:1.2em;">Loading multilingual text from Media Library ... </p></div>';
                    var loadingDialog = $(loading).dialog({
                        title: "Loading",
                        width: 500,
                        resizable: false,
                        modal: true
                    });
                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        data: {
                            action: "wonderplugin_gridgallery_get_media_langs",
                            nonce: ajaxnonce,
                            item: JSON.stringify(media)
                        },
                        success: function (data) {
                            if (data) {
                                var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
                                var currentlang = $("#wonderplugin-gridgallery-currentlang").text();
                                for (var i = 0; i < items.length; i++)
                                    for (var key in data)
                                        if (items[i].id == key) {
                                            items[i].langs = JSON.stringify(data[key]);
                                            if (currentlang != defaultlang && data[key])
                                                for (var langcode in data[key])
                                                    if (langcode == defaultlang) {
                                                        items[i].title = data[key][langcode].title;
                                                        items[i].description = data[key][langcode].description;
                                                        items[i].alt = data[key][langcode].alt;
                                                        break
                                                    } break
                                        }
                            }
                        },
                        complete: function () {
                            callback(items);
                            loadingDialog.dialog("destroy").remove()
                        }
                    })
                } else callback(items)
            };
            var media_upload_onclick = function (event) {
                event.preventDefault();
                var buttonId = $(this).attr("id");
                var textId = $(this).data("textid");
                var library_title;
                var library_type;
                if (buttonId == "wonderplugin-dialog-select-image" || buttonId == "wonderplugin-dialog-select-thumbnail") {
                    library_title = "Add Image";
                    library_type = "image"
                } else if (buttonId == "wonderplugin-dialog-select-pdf") {
                    library_title = "Add PDF";
                    library_type = "application"
                } else {
                    library_title = "Add Video";
                    library_type = "video"
                }
                var media_uploader = wp.media.frames.file_frame = wp.media({
                    title: library_title,
                    library: {
                        type: library_type
                    },
                    button: {
                        text: library_title
                    },
                    multiple: dialogType == 0 && buttonId == "wonderplugin-dialog-select-image"
                });
                media_uploader.on("select", function (event) {
                    var selection = media_uploader.state().get("selection");
                    if (dialogType == 0 && buttonId == "wonderplugin-dialog-select-image" && selection.length > 1) {
                        var items = [];
                        selection.map(function (attachment) {
                            attachment = attachment.toJSON();
                            if (attachment.type != "image") return;
                            var thumbnail;
                            var thumbnailsize = $("#wonderplugin-gridgallery-thumbnailsize").text();
                            if (thumbnailsize && thumbnailsize.length > 0 && attachment.sizes && attachment.sizes[thumbnailsize] && attachment.sizes[thumbnailsize].url) thumbnail =
                                attachment.sizes[thumbnailsize].url;
                            else if (attachment.sizes && attachment.sizes.medium && attachment.sizes.medium.url) thumbnail = attachment.sizes.medium.url;
                            else if (attachment.sizes && attachment.sizes.thumbnail && attachment.sizes.thumbnail.url) thumbnail = attachment.sizes.thumbnail.url;
                            else thumbnail = attachment.url;
                            var category = "";
                            for (var i = 0;; i++) {
                                if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                                if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" +
                                    i).val()
                            }
                            items.push({
                                id: attachment.id,
                                image: attachment.url,
                                thumbnail: thumbnail,
                                displaythumbnail: $("#wonderplugin-dialog-displaythumbnail").is(":checked"),
                                title: attachment.title,
                                description: attachment.description,
                                socialmedia: "",
                                socialmediatarget: "",
                                socialmediarotate: true,
                                altusetitle: attachment.alt && attachment.alt.length > 0 ? false : true,
                                alt: attachment.alt && attachment.alt.length > 0 ? attachment.alt : "",
                                button: "",
                                buttoncss: "wpp-btn-blue-medium",
                                buttonlink: "",
                                buttonlinktarget: "",
                                buttonlightbox: false,
                                weblink: "",
                                clickhandler: "",
                                linktarget: "",
                                weblinklightbox: false,
                                lightbox: $("#wonderplugin-dialog-lightbox").is(":checked"),
                                lightboxsize: $("#wonderplugin-dialog-lightbox-size").is(":checked"),
                                lightboxwidth: parseInt($.trim($("#wonderplugin-dialog-lightbox-width").val())),
                                lightboxheight: parseInt($.trim($("#wonderplugin-dialog-lightbox-height").val())),
                                playvideoinline: false,
                                loadvideoinline: false,
                                category: category
                            })
                        });
                        $slideDialog.remove();
                        get_media_langs(items, onSuccess)
                    } else {
                        attachment = selection.first().toJSON();
                        if (buttonId == "wonderplugin-dialog-select-image") {
                            if (attachment.type != "image") {
                                $("#wonderplugin-dialog-error").css({
                                    display: "block"
                                }).html("<p>Please select an image file</p>");
                                return
                            }
                            var thumbnail;
                            var thumbnailsize = $("#wonderplugin-gridgallery-thumbnailsize").text();
                            if (thumbnailsize && thumbnailsize.length > 0 && attachment.sizes && attachment.sizes[thumbnailsize] && attachment.sizes[thumbnailsize].url) thumbnail = attachment.sizes[thumbnailsize].url;
                            else if (attachment.sizes && attachment.sizes.medium && attachment.sizes.medium.url) thumbnail =
                                attachment.sizes.medium.url;
                            else if (attachment.sizes && attachment.sizes.thumbnail && attachment.sizes.thumbnail.url) thumbnail = attachment.sizes.thumbnail.url;
                            else thumbnail = attachment.url;
                            $("#wonderplugin-dialog-image-display-tr").css({
                                display: "table-row"
                            });
                            $("#wonderplugin-dialog-image-display").attr("src", attachment.url);
                            $("#wonderplugin-dialog-image").val(attachment.url);
                            $("#wonderplugin-dialog-thumbnail").val(thumbnail);
                            if (dialogType == 0 || $.trim($("#wonderplugin-dialog-image-title").val()).length <=
                                0 && $.trim($("#wonderplugin-dialog-image-description").val()).length <= 0) {
                                $("#wonderplugin-dialog-image-title").val(attachment.title);
                                $("#wonderplugin-dialog-image-description").val(attachment.description);
                                if (attachment.alt && attachment.alt.length > 0) {
                                    $("#wonderplugin-dialog-image-altusetitle").prop("checked", false);
                                    $("#wonderplugin-dialog-image-alt").val(attachment.alt);
                                    $("#wonderplugin-dialog-image-alt").prop("disabled", false)
                                }
                                get_media_langs([{
                                    id: attachment.id
                                }], function (data) {
                                    if (data && data.length >
                                        0) {
                                        $("#wonderplugin-dialog-langs").text(data[0].langs);
                                        var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
                                        var currentlang = $("#wonderplugin-gridgallery-currentlang").text();
                                        if (currentlang != defaultlang && data[0].langs) {
                                            var langs = {};
                                            try {
                                                langs = JSON.parse(data[0].langs)
                                            } catch (err) {}
                                            for (var langcode in langs)
                                                if (langcode == defaultlang) {
                                                    $("#wonderplugin-dialog-image-title").val(langs[langcode].title);
                                                    $("#wonderplugin-dialog-image-description").val(langs[langcode].description);
                                                    $("#wonderplugin-dialog-image-alt").val(langs[langcode].alt);
                                                    break
                                                }
                                        }
                                    }
                                })
                            }
                        } else if (buttonId == "wonderplugin-dialog-select-thumbnail") {
                            if (attachment.type != "image") {
                                $("#wonderplugin-dialog-error").css({
                                    display: "block"
                                }).html("<p>Please select an image file</p>");
                                return
                            }
                            $("#wonderplugin-dialog-thumbnail").val(attachment.url)
                        } else if (buttonId == "wonderplugin-dialog-select-pdf") {
                            if (attachment.type != "application" && attachment.subtype != "pdf") {
                                $("#wonderplugin-dialog-error").css({
                                    display: "block"
                                }).html("<p>Please select a pdf file</p>");
                                return
                            }
                            $("#" + textId).val(attachment.url);
                            $("#wonderplugin-dialog-pdf").removeClass("wonderplugin-dialog-inputbox-warning")
                        } else {
                            if (attachment.type != "video") {
                                $("#wonderplugin-dialog-error").css({
                                    display: "block"
                                }).html("<p>Please select a video file</p>");
                                return
                            }
                            $("#" + textId).val(attachment.url)
                        }
                    }
                    $("#wonderplugin-dialog-error").css({
                        display: "none"
                    }).empty()
                });
                media_uploader.open()
            };
            if (parseInt($("#wonderplugin-gridgallery-wp-history-media-uploader").text()) == 1) {
                var buttonId = "";
                var textId = "";
                var history_media_upload_onclick = function (event) {
                    buttonId =
                        $(this).attr("id");
                    textId = $(this).data("textid");
                    var mediaType = buttonId == "wonderplugin-dialog-select-image" || buttonId == "wonderplugin-dialog-select-thumbnail" ? "image" : "video";
                    tb_show("Upload " + mediaType, "media-upload.php?referer=wonderplugin-gridgallery&type=" + mediaType + "&TB_iframe=true", false);
                    return false
                };
                window.send_to_editor = function (html) {
                    tb_remove();
                    if (buttonId == "wonderplugin-dialog-select-image") {
                        var $img = $("img", html);
                        if (!$img.length) {
                            $("#wonderplugin-dialog-error").css({
                                display: "block"
                            }).html("<p>Please select an image file</p>");
                            return
                        }
                        var thumbnail = $img.attr("src");
                        var src = $(html).is("a") ? $(html).attr("href") : thumbnail;
                        $("#wonderplugin-dialog-image-display-tr").css({
                            display: "table-row"
                        });
                        $("#wonderplugin-dialog-image-display").attr("src", thumbnail);
                        $("#wonderplugin-dialog-image").val(src);
                        $("#wonderplugin-dialog-thumbnail").val(thumbnail);
                        $("#wonderplugin-dialog-image-title").val($("img", html).attr("title"))
                    } else if (buttonId == "wonderplugin-dialog-select-thumbnail") {
                        var $img = $("img", html);
                        if (!$img.length) {
                            $("#wonderplugin-dialog-error").css({
                                display: "block"
                            }).html("<p>Please select an image file</p>");
                            return
                        }
                        var src = $(html).is("a") ? $(html).attr("href") : $img.attr("src");
                        $("#wonderplugin-dialog-thumbnail").val(src)
                    } else {
                        if ($("img", html).length) {
                            $("#wonderplugin-dialog-error").css({
                                display: "block"
                            }).html("<p>Please select a video file</p>");
                            return
                        }
                        $("#" + textId).val($(html).attr("href"))
                    }
                    $("#wonderplugin-dialog-error").css({
                        display: "none"
                    }).empty()
                };
                $("#wonderplugin-dialog-select-image").click(history_media_upload_onclick);
                $("#wonderplugin-dialog-select-thumbnail").click(history_media_upload_onclick);
                if (dialogType == 1) {
                    $("#wonderplugin-dialog-select-mp4").click(history_media_upload_onclick);
                    $("#wonderplugin-dialog-select-webm").click(history_media_upload_onclick)
                }
            } else {
                $("#wonderplugin-dialog-select-image").click(media_upload_onclick);
                $("#wonderplugin-dialog-select-thumbnail").click(media_upload_onclick);
                if (dialogType == 1) {
                    $("#wonderplugin-dialog-select-mp4").click(media_upload_onclick);
                    $("#wonderplugin-dialog-select-webm").click(media_upload_onclick)
                }
                $("#wonderplugin-dialog-select-videothumbnail").click(media_upload_onclick);
                if (dialogType == 10) $("#wonderplugin-dialog-select-pdf").click(media_upload_onclick)
            }
            $("#wonderplugin-dialog-ok").click(function () {
                if (dialogType == 0 && $.trim($("#wonderplugin-dialog-image").val()).length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please select an image file</p>");
                    return
                }
                if (dialogType == 1 && $.trim($("#wonderplugin-dialog-mp4").val()).length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please select a video file</p>");
                    return
                }
                if ((dialogType ==
                        2 || dialogType == 3 || dialogType == 4 || dialogType == 5) && $.trim($("#wonderplugin-dialog-video").val()).length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please enter a video URL</p>");
                    return
                }
                if ($.trim($("#wonderplugin-dialog-thumbnail").val()).length <= 0 && (!$("#wonderplugin-dialog-usevideothumbnail").is(":checked") || $.trim($("#wonderplugin-dialog-videothumbnail").val()).length <= 0)) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please select a thumbnail image or a video thumbnail</p>");
                    return
                }
                if (dialogType == 10 && $.trim($("#wonderplugin-dialog-pdf").val()).length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please select a PDF file</p>");
                    $("#wonderplugin-dialog-pdf").addClass("wonderplugin-dialog-inputbox-warning");
                    return
                }
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" + i).val()
                }
                var langs = {};
                try {
                    langs = JSON.parse($("#wonderplugin-dialog-langs").text())
                } catch (err) {}
                var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
                for (var key in langs)
                    if (key == defaultlang) {
                        langs[key].title = $("#wonderplugin-dialog-image-title").val();
                        langs[key].description = $("#wonderplugin-dialog-image-description").val();
                        langs[key].alt = $("#wonderplugin-dialog-image-alt").val();
                        langs[key].button = $("#wonderplugin-dialog-image-button").val()
                    } var item = {
                    image: $.trim($("#wonderplugin-dialog-image").val()),
                    thumbnail: $.trim($("#wonderplugin-dialog-thumbnail").val()),
                    displaythumbnail: $("#wonderplugin-dialog-displaythumbnail").is(":checked"),
                    video: $.trim($("#wonderplugin-dialog-video").val()),
                    mp4: $.trim($("#wonderplugin-dialog-mp4").val()),
                    webm: $.trim($("#wonderplugin-dialog-webm").val()),
                    title: $.trim($("#wonderplugin-dialog-image-title").val()),
                    description: $.trim($("#wonderplugin-dialog-image-description").val()),
                    socialmedia: getSocialMedia(),
                    socialmediatarget: $.trim($("#wonderplugin-dialog-socialmediatarget").val()),
                    socialmediarotate: $("#wonderplugin-dialog-socialmediarotate").is(":checked"),
                    altusetitle: $("#wonderplugin-dialog-image-altusetitle").is(":checked"),
                    alt: $.trim($("#wonderplugin-dialog-image-alt").val()),
                    button: $.trim($("#wonderplugin-dialog-image-button").val()),
                    buttoncss: $.trim($("#wonderplugin-dialog-image-buttoncss").val()),
                    buttonlink: $.trim($("#wonderplugin-dialog-image-buttonlink").val()),
                    buttonlinktarget: $.trim($("#wonderplugin-dialog-image-buttonlinktarget").val()),
                    buttonlightbox: $("#wonderplugin-dialog-image-buttonlightbox").is(":checked"),
                    weblink: $.trim($("#wonderplugin-dialog-weblink").val()),
                    clickhandler: $.trim($("#wonderplugin-dialog-clickhandler").val()),
                    linktarget: $.trim($("#wonderplugin-dialog-linktarget").val()),
                    weblinklightbox: $("#wonderplugin-dialog-weblinklightbox").is(":checked"),
                    lightbox: dialogType == 0 ? $("#wonderplugin-dialog-lightbox").is(":checked") : dialogType == 14 ? false : true,
                    lightboxsize: $("#wonderplugin-dialog-lightbox-size").is(":checked"),
                    lightboxwidth: parseInt($.trim($("#wonderplugin-dialog-lightbox-width").val())),
                    lightboxheight: parseInt($.trim($("#wonderplugin-dialog-lightbox-height").val())),
                    playvideoinline: $("#wonderplugin-dialog-playvideoinline").is(":checked"),
                    loadvideoinline: $("#wonderplugin-dialog-loadvideoinline").is(":checked"),
                    usevideothumbnail: $("#wonderplugin-dialog-usevideothumbnail").is(":checked"),
                    videothumbnail: $.trim($("#wonderplugin-dialog-videothumbnail").val()),
                    category: category,
                    langs: langs ? JSON.stringify(langs) : ""
                };
                if (dialogType == 1) {
                    item["autoplaymutedvideoinline"] = $("#wonderplugin-dialog-autoplaymutedvideoinline").is(":checked");
                    item["autoplaymutedvideoinlineloop"] =
                        $("#wonderplugin-dialog-autoplaymutedvideoinlineloop").is(":checked");
                    item["autoplaymutedvideoinlinehidecontrols"] = $("#wonderplugin-dialog-autoplaymutedvideoinlinehidecontrols").is(":checked");
                    item["playmutedvideoinlineonhover"] = $("#wonderplugin-dialog-playmutedvideoinlineonhover").is(":checked");
                    item["playvideoinlineonclick"] = $("#wonderplugin-dialog-playvideoinlineonclick").is(":checked");
                    item["playvideoinlinemuted"] = $("#wonderplugin-dialog-playvideoinlinemuted").is(":checked")
                }
                if (!item.image && item.thumbnail &&
                    (!item.usevideothumbnail || !item.videothumbnail)) item.displaythumbnail = true;
                if (dialogType == 10) item.pdf = $.trim($("#wonderplugin-dialog-pdf").val());
                $slideDialog.remove();
                onSuccess([item])
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $slideDialog.remove()
            })
        };
        var youtubePlaylistDialog = function (onSuccess, data, dataIndex) {
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'>Add YouTube Playlist</h3>" +
                "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>YouTube API key</th>" + "<td><input name='wonderplugin-dialog-youtubeapikey' type='text' id='wonderplugin-dialog-youtubeapikey' value='' class='regular-text' /></td>" + "</tr>" + "<tr>" + "<th>YouTube playlist ID</th>" + "<td><input name='wonderplugin-dialog-youtubeplaylistid' type='text' id='wonderplugin-dialog-youtubeplaylistid' value='' class='regular-text' /></td>" + "</tr>" +
                "<tr>" + "<th>Maximum results</th>" + "<td><input name='wonderplugin-dialog-youtubeplaylistmaxresults' type='number' id='wonderplugin-dialog-youtubeplaylistmaxresults' value='50' class='small-text' /></td>" + "</tr>" + "<tr>" + "<th></th>" + "<td><label><input name='wonderplugin-dialog-youtubestatic' type='checkbox' id='wonderplugin-dialog-youtubestatic' value='' /> Do not create a dynamic YouTube playlist gallery, instead, retrieve videos in the playlist and add them to the gallery.</label>" + "</tr>" + "<tr>" +
                "<th>Text</th>" + "<td><label><input name='wonderplugin-dialog-youtubetitle' type='checkbox' id='wonderplugin-dialog-youtubetitle' value='' checked /> Show video title</label>" + "<p><label><input name='wonderplugin-dialog-youtubedescription' type='checkbox' id='wonderplugin-dialog-youtubedescription' value='' /> Show video description</label></p>" + "</tr>" + "<tr>" + "<th>Click to open Lightbox popup</th>" + "<td><label><input name='wonderplugin-dialog-lightbox' type='checkbox' id='wonderplugin-dialog-lightbox' value='' checked /> Open YouTube video in Lightbox</label>" +
                "</tr>" + "<tr><th>Lightbox size</th>" + "<td><label><input name='wonderplugin-dialog-lightbox-size' type='checkbox' id='wonderplugin-dialog-lightbox-size' value='' /> Set Lightbox size (px) </label>" + " <input name='wonderplugin-dialog-lightbox-width' type='text' id='wonderplugin-dialog-lightbox-width' value='960' class='small-text' /> / <input name='wonderplugin-dialog-lightbox-height' type='text' id='wonderplugin-dialog-lightbox-height' value='540' class='small-text' />" + "</td>" + "</tr>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' + j + '" id="wonderplugin-dialog-category-' + j + '" value="' + categories[i].slug + '" type="checkbox"/>' + categories[i].caption + "</label>";
                        j++
                    } dialogCode += "</td></tr>"
            }
            dialogCode += "</table>" +
                "<p style='margin-left:12px;text-align:left;'><a href='https://www.wonderplugin.com/youtube-api-key-and-playlist-id/' target='_blank'>Tutorial: How to apply for a YouTube API key and how to find your YouTube playlist ID</a></p>" + "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $playlistDialog =
                $(dialogCode);
            $("body").append($playlistDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            if (data) {
                $("#wonderplugin-dialog-youtubeapikey").val(data.youtubeapikey);
                $("#wonderplugin-dialog-youtubeplaylistid").val(data.youtubeplaylistid);
                $("#wonderplugin-dialog-youtubeplaylistmaxresults").val(data.youtubeplaylistmaxresults);
                $("#wonderplugin-dialog-youtubetitle").prop("checked", data.youtubetitle);
                $("#wonderplugin-dialog-youtubedescription").prop("checked", data.youtubedescription);
                if ("lightbox" in data) $("#wonderplugin-dialog-lightbox").prop("checked", data.lightbox);
                if ("lightboxsize" in data) $("#wonderplugin-dialog-lightbox-size").prop("checked", data.lightboxsize);
                if (data.lightboxwidth) $("#wonderplugin-dialog-lightbox-width").val(data.lightboxwidth);
                if (data.lightboxheight) $("#wonderplugin-dialog-lightbox-height").val(data.lightboxheight);
                if (data.category) {
                    var categories = data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" + i).val(), categories) !== -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
            }
            $("#wonderplugin-dialog-ok").click(function () {
                if ($.trim($("#wonderplugin-dialog-youtubeapikey").val()).length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please enter your YouTube API key</p>");
                    $("#wonderplugin-dialog-youtubeapikey").focus();
                    return
                }
                if ($.trim($("#wonderplugin-dialog-youtubeplaylistid").val()).length <=
                    0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please enter your YouTube playlist ID</p>");
                    $("#wonderplugin-dialog-youtubeplaylistid").focus();
                    return
                }
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" + i).val()
                }
                var item = {
                    youtubeapikey: $.trim($("#wonderplugin-dialog-youtubeapikey").val()),
                    youtubeplaylistid: $.trim($("#wonderplugin-dialog-youtubeplaylistid").val()),
                    youtubeplaylistmaxresults: $.trim($("#wonderplugin-dialog-youtubeplaylistmaxresults").val()),
                    youtubetitle: $("#wonderplugin-dialog-youtubetitle").is(":checked"),
                    youtubedescription: $("#wonderplugin-dialog-youtubedescription").is(":checked"),
                    lightbox: $("#wonderplugin-dialog-lightbox").is(":checked"),
                    lightboxsize: $("#wonderplugin-dialog-lightbox-size").is(":checked"),
                    lightboxwidth: parseInt($.trim($("#wonderplugin-dialog-lightbox-width").val())),
                    lightboxheight: parseInt($.trim($("#wonderplugin-dialog-lightbox-height").val())),
                    category: category
                };
                if ($("#wonderplugin-dialog-youtubestatic").is(":checked")) {
                    for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
                        if (wonderplugin_gridgallery_config.slides[i].type == 15 && wonderplugin_gridgallery_config.slides[i].youtubeplaylistid == item.youtubeplaylistid) wonderplugin_gridgallery_config.slides.splice(i, 1);
                    getYouTubePlaylist(item, null)
                } else {
                    $playlistDialog.remove();
                    onSuccess([item])
                }
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $playlistDialog.remove()
            })
        };
        var getYouTubePlaylist =
            function (item, pagetoken) {
                var youtube_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + item.youtubeplaylistid + "&key=" + item.youtubeapikey;
                if (item.youtubeplaylistmaxresults)
                    if (item.youtubeplaylistmaxresults > 50) youtube_url += "&maxResults=50";
                    else youtube_url += "&maxResults=" + item.youtubeplaylistmaxresults;
                if (pagetoken) youtube_url += "&pageToken=" + pagetoken;
                var all_done = true;
                $.getJSON(youtube_url, function (data) {
                    if (data && data.items)
                        for (var i = 0; i < data.items.length; i++) {
                            var video_id =
                                data.items[i]["snippet"]["resourceId"]["videoId"];
                            var thumbnail = "https://img.youtube.com/vi/" + video_id + "/0.jpg";
                            var image = "https://img.youtube.com/vi/" + video_id + "/0.jpg";
                            if (data.items[i]["snippet"]["thumbnails"]) {
                                if (data.items[i]["snippet"]["thumbnails"]["standard"]) thumbnail = data.items[i]["snippet"]["thumbnails"]["standard"]["url"];
                                if (data.items[i]["snippet"]["thumbnails"]["maxres"]) image = data.items[i]["snippet"]["thumbnails"]["maxres"]["url"]
                            }
                            var video = "https://www.youtube.com/embed/" + video_id;
                            var title = data.items[i]["snippet"]["title"];
                            var description = data.items[i]["snippet"]["description"];
                            var youtubeItem = {
                                type: 2,
                                image: image,
                                thumbnail: thumbnail,
                                displaythumbnail: true,
                                video: video,
                                mp4: "",
                                webm: "",
                                title: title,
                                description: description,
                                socialmedia: "",
                                socialmediatarget: "",
                                socialmediarotate: true,
                                altusetitle: true,
                                alt: title,
                                button: "",
                                buttoncss: "",
                                buttonlink: "",
                                buttonlinktarget: "",
                                buttonlightbox: false,
                                weblink: "",
                                clickhandler: "",
                                linktarget: "",
                                weblinklightbox: false,
                                lightbox: true,
                                lightboxsize: item.lightboxsize,
                                lightboxwidth: item.lightboxwidth,
                                lightboxheight: item.lightboxheight,
                                playvideoinline: !item.lightbox,
                                loadvideoinline: false,
                                usevideothumbnail: false,
                                videothumbnail: "",
                                category: item.category,
                                langs: ""
                            };
                            var bFound = false;
                            for (var j = 0; j < wonderplugin_gridgallery_config.slides.length; j++)
                                if (wonderplugin_gridgallery_config.slides[j].type == 2 && wonderplugin_gridgallery_config.slides[j].video == youtubeItem.video) {
                                    bFound = true;
                                    break
                                } if (!bFound) addMediaToList(youtubeItem)
                        }
                    if (data && data.nextPageToken && item.youtubeplaylistmaxresults &&
                        item.youtubeplaylistmaxresults > 50) {
                        all_done = false;
                        getYouTubePlaylist(item, data.nextPageToken)
                    }
                }).always(function () {
                    if (all_done) {
                        $(".wonderplugin-dialog-container").remove();
                        updateMediaTable()
                    }
                })
            };
        var onlineVideoDialog = function (dialogType, onSuccess, videoData, invokeFromSlideDialog, dataIndex) {
            var dialogTitle = ["Image", "Video", "Youtube Video", "Vimeo Video", "Dailymotion Video"];
            var dialogExample = ["", "", "https://www.youtube.com/watch?v=wswxQ3mhwqQ", "https://vimeo.com/147079122", "https://www.dailymotion.com/embed/video/x1yj6t9 or https://dai.ly/x1yj6t9"];
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'></h3>" + "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>Enter " + dialogTitle[dialogType] + " URL</th>" + "<td><input name='wonderplugin-dialog-video' type='text' id='wonderplugin-dialog-video' value='' class='regular-text' />" + "<p>URL Example: " +
                dialogExample[dialogType] + "<p>" + "</td>" + "</tr>";
            dialogCode += "</table>" + "<div id='wonderplugin-gridgallery-video-dialog-loading'></div>" + "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $videoDialog = $(dialogCode);
            $("body").append($videoDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() +
                    60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            if (!videoData) videoData = {
                type: dialogType
            };
            $("#wonderplugin-dialog-title").html("Add " + dialogTitle[dialogType]);
            var videoDataReturn = function () {
                $videoDialog.remove();
                slideDialog(dialogType, function (items) {
                    if (items && items.length > 0) {
                        if (typeof dataIndex !== "undefined" && dataIndex >= 0) wonderplugin_gridgallery_config.slides.splice(dataIndex, 1);
                        items.map(function (data) {
                            var result = {
                                type: dialogType,
                                image: data.image,
                                thumbnail: data.thumbnail ?
                                    data.thumbnail : data.image,
                                displaythumbnail: data.displaythumbnail,
                                video: data.video,
                                mp4: data.mp4,
                                webm: data.webm,
                                title: data.title,
                                description: data.description,
                                socialmedia: data.socialmedia,
                                socialmediatarget: data.socialmediatarget,
                                socialmediarotate: data.socialmediarotate,
                                altusetitle: data.altusetitle,
                                alt: data.alt,
                                button: data.button,
                                buttoncss: data.buttoncss,
                                buttonlink: data.buttonlink,
                                buttonlinktarget: data.buttonlinktarget,
                                buttonlightbox: data.buttonlightbox,
                                weblink: data.weblink,
                                clickhandler: data.clickhandler,
                                linktarget: data.linktarget,
                                weblinklightbox: data.weblinklightbox,
                                lightbox: data.lightbox,
                                lightboxsize: data.lightboxsize,
                                lightboxwidth: data.lightboxwidth,
                                lightboxheight: data.lightboxheight,
                                playvideoinline: data.playvideoinline,
                                loadvideoinline: data.loadvideoinline,
                                usevideothumbnail: data.usevideothumbnail,
                                videothumbnail: data.videothumbnail,
                                category: data.category,
                                langs: data.langs
                            };
                            if (typeof dataIndex !== "undefined" && dataIndex >= 0) wonderplugin_gridgallery_config.slides.splice(dataIndex, 0, result);
                            else addMediaToList(result)
                        });
                        updateMediaTable()
                    }
                }, videoData, dataIndex)
            };
            $("#wonderplugin-dialog-ok").click(function () {
                var href = $.trim($("#wonderplugin-dialog-video").val());
                if (href.length <= 0) {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please enter a " + dialogTitle[dialogType] + " URL</p>");
                    return
                }
                var protocol = "https:";
                if (dialogType == 2) {
                    var youtubeId = "";
                    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    var match = href.match(regExp);
                    if (match && match[7] && match[7].length == 11) youtubeId =
                        match[7];
                    else {
                        $("#wonderplugin-dialog-error").css({
                            display: "block"
                        }).html("<p>Please enter a valid Youtube URL</p>");
                        return
                    }
                    var result = protocol + "//www.youtube.com/embed/" + youtubeId;
                    var params = getURLParams(href);
                    var first = true;
                    for (var key in params) {
                        if (first) {
                            result += "?";
                            first = false
                        } else result += "&";
                        result += key + "=" + params[key]
                    }
                    videoData.video = result;
                    videoData.image = protocol + "//img.youtube.com/vi/" + youtubeId + "/0.jpg";
                    videoData.thumbnail = protocol + "//img.youtube.com/vi/" + youtubeId + "/0.jpg";
                    videoDataReturn()
                } else if (dialogType ==
                    3) {
                    var vimeoId = "";
                    var regExp = /^.*(vimeo\.com\/)((video\/)|(channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
                    var match = href.match(regExp);
                    if (match && match[6]) vimeoId = match[6];
                    else {
                        $("#wonderplugin-dialog-error").css({
                            display: "block"
                        }).html("<p>Please enter a valid Vimeo URL</p>");
                        return
                    }
                    var result = protocol + "//player.vimeo.com/video/" + vimeoId;
                    var params = getURLParams(href);
                    var first = true;
                    for (var key in params) {
                        if (first) {
                            result += "?";
                            first = false
                        } else result += "&";
                        result += key + "=" + params[key]
                    }
                    videoData.video =
                        result;
                    $("#wonderplugin-gridgallery-video-dialog-loading").css({
                        display: "block"
                    });
                    $.ajax({
                        url: protocol + "//vimeo.com/api/v2/video/" + vimeoId + ".json",
                        dataType: "json",
                        timeout: 3E3,
                        data: {
                            format: "json"
                        },
                        success: function (data) {
                            videoData.title = data[0].title;
                            videoData.description = data[0].description;
                            videoData.image = data[0].thumbnail_large;
                            videoData.thumbnail = data[0].thumbnail_medium;
                            videoDataReturn()
                        },
                        error: function () {
                            videoDataReturn()
                        }
                    })
                } else if (dialogType == 4) {
                    var dailymotionId = "";
                    if (href.match(/\:\/\/.*(dai\.ly)/i)) dailymotionId =
                        href.match(/(dai\.ly\/)([a-zA-Z0-9\-\_]+)/)[2];
                    else if (href.match(/dailymotion\.com\/embed\/video\//i)) dailymotionId = href.match(/(dailymotion\.com\/embed\/video\/)([a-zA-Z0-9\-\_]+)/)[2];
                    else {
                        $("#wonderplugin-dialog-error").css({
                            display: "block"
                        }).html("<p>Please enter a valid Dailymotion URL</p>");
                        return
                    }
                    var result = protocol + "//www.dailymotion.com/embed/video/" + dailymotionId;
                    var params = getURLParams(href);
                    var first = true;
                    for (var key in params) {
                        if (first) {
                            result += "?";
                            first = false
                        } else result += "&";
                        result +=
                            key + "=" + params[key]
                    }
                    videoData.video = result;
                    videoData.image = protocol + "//www.dailymotion.com/thumbnail/video/" + dailymotionId;
                    videoData.thumbnail = protocol + "//www.dailymotion.com/thumbnail/video/" + dailymotionId;
                    videoDataReturn()
                }
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $videoDialog.remove();
                if (invokeFromSlideDialog) videoDataReturn()
            })
        };
        var wpgEscapeHTML = function (str) {
            if (!str) return "";
            else return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g,
                "&#039;")
        };
        var updateMediaTable = function (category) {
            var selected_cat = category ? category : $("#wonderplugin-gridgallery-selectcategorylist").val();
            var mediaType = ["Image", "Video", "YouTube", "Vimeo", "Dailymotion", "Iframe Video", "WordPress Posts", "WooCommerce / Custom Posts", "", "", "PDF", "Import Folder", "HTML", "XML", "Web Link", "YouTube Playlist"];
            $("#wonderplugin-gridgallery-media-table").empty();
            for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++) {
                var thumbnail = "";
                if (wonderplugin_gridgallery_config.slides[i].type ==
                    6) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() + "images/wordpressposts.png";
                else if (wonderplugin_gridgallery_config.slides[i].type == 7) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() + "images/wordpresscustompost.png";
                else if (wonderplugin_gridgallery_config.slides[i].type == 11) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() + "images/importfolder.png";
                else if (wonderplugin_gridgallery_config.slides[i].type == 12) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() +
                    "images/htmlcode.png";
                else if (wonderplugin_gridgallery_config.slides[i].type == 13) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() + "images/importxml.png";
                else if (wonderplugin_gridgallery_config.slides[i].type == 15) thumbnail = $("#wonderplugin-gridgallery-pluginfolder").text() + "images/youtubeplaylist.png";
                else thumbnail = wonderplugin_gridgallery_config.slides[i].thumbnail;
                if (!thumbnail && wonderplugin_gridgallery_config.slides[i].usevideothumbnail && wonderplugin_gridgallery_config.slides[i].videothumbnail) thumbnail =
                    $("#wonderplugin-gridgallery-pluginfolder").text() + "images/videothumbnail.png";
                var style = "block";
                if (selected_cat && selected_cat != "all")
                    if (!wonderplugin_gridgallery_config.slides[i].category) style = "none";
                    else {
                        var categories = wonderplugin_gridgallery_config.slides[i].category.split(":");
                        if ($.inArray(selected_cat, categories) == -1) style = "none"
                    } var displayTitle = "";
                if ($("#wonderplugin-gridgallery-displaytitleineditor").text() == 1) displayTitle = '<div class="wonderplugin-gridgallery-media-table-title">' + wpgEscapeHTML(wonderplugin_gridgallery_config.slides[i].title) +
                    "</div>";
                $("#wonderplugin-gridgallery-media-table").append("<li style='display:" + style + ";' data-listindex=" + i + " >" + "<div class='wonderplugin-gridgallery-media-table-id'>" + (i + 1) + "</div>" + "<div class='wonderplugin-gridgallery-media-table-img'>" + "<img class='wonderplugin-gridgallery-media-table-image' data-order='" + i + "' src='" + thumbnail + "' />" + "</div>" + "<div class='wonderplugin-gridgallery-media-table-type'>" + mediaType[wonderplugin_gridgallery_config.slides[i].type] + "</div>" + displayTitle + "<div class='wonderplugin-gridgallery-media-table-buttons-edit'>" +
                    "<a class='wonderplugin-gridgallery-media-table-button wonderplugin-gridgallery-media-table-edit'>Edit</a>&nbsp;|&nbsp;" + "<a class='wonderplugin-gridgallery-media-table-button wonderplugin-gridgallery-media-table-delete'>Delete</a>" + "</div>" + "<div class='wonderplugin-gridgallery-media-table-buttons-move'>" + "<a class='wonderplugin-gridgallery-media-table-button wonderplugin-gridgallery-media-table-moveup'>Move Up</a>&nbsp;|&nbsp;" + "<a class='wonderplugin-gridgallery-media-table-button wonderplugin-gridgallery-media-table-movedown'>Move Down</a>" +
                    "</div>" + "<div style='clear:both;'></div>" + "</li>")
            }
            $(".wonderplugin-gridgallery-media-table-image").wpdraggable(wonderPluginMediaTableMove);
            $(".wonderplugin-gridgallery-media-table-help").css({
                display: wonderplugin_gridgallery_config.slides.length > 0 ? "none" : "block"
            });
            $("#wonderplugin-gridgallery-media-table").css({
                display: wonderplugin_gridgallery_config.slides.length > 0 ? "block" : "none"
            })
        };
        $("#wonderplugin-gridgallery-selectcategorylist").change(function () {
            updateMediaTable($(this).val())
        });
        $("#wonderplugin-add-image").click(function () {
            slideDialog(0,
                function (items) {
                    items.map(function (data) {
                        addMediaToList({
                            type: 0,
                            image: data.image,
                            thumbnail: data.thumbnail ? data.thumbnail : data.image,
                            displaythumbnail: data.displaythumbnail,
                            video: data.video,
                            mp4: data.mp4,
                            webm: data.webm,
                            title: data.title,
                            description: data.description,
                            socialmedia: data.socialmedia,
                            socialmediatarget: data.socialmediatarget,
                            socialmediarotate: data.socialmediarotate,
                            altusetitle: data.altusetitle,
                            alt: data.alt,
                            button: data.button,
                            buttoncss: data.buttoncss,
                            buttonlink: data.buttonlink,
                            buttonlinktarget: data.buttonlinktarget,
                            buttonlightbox: data.buttonlightbox,
                            weblink: data.weblink,
                            clickhandler: data.clickhandler,
                            linktarget: data.linktarget,
                            weblinklightbox: data.weblinklightbox,
                            lightbox: data.lightbox,
                            lightboxsize: data.lightboxsize,
                            lightboxwidth: data.lightboxwidth,
                            lightboxheight: data.lightboxheight,
                            playvideoinline: data.playvideoinline,
                            loadvideoinline: data.loadvideoinline,
                            usevideothumbnail: data.usevideothumbnail,
                            videothumbnail: data.videothumbnail,
                            category: data.category,
                            langs: data.langs
                        })
                    });
                    updateMediaTable()
                })
        });
        $("#wonderplugin-add-weblink").click(function () {
            slideDialog(14,
                function (items) {
                    items.map(function (data) {
                        addMediaToList({
                            type: 14,
                            image: "",
                            thumbnail: data.thumbnail,
                            displaythumbnail: true,
                            video: data.video,
                            mp4: data.mp4,
                            webm: data.webm,
                            title: data.title,
                            description: data.description,
                            socialmedia: data.socialmedia,
                            socialmediatarget: data.socialmediatarget,
                            socialmediarotate: data.socialmediarotate,
                            altusetitle: data.altusetitle,
                            alt: data.alt,
                            button: data.button,
                            buttoncss: data.buttoncss,
                            buttonlink: data.buttonlink,
                            buttonlinktarget: data.buttonlinktarget,
                            buttonlightbox: data.buttonlightbox,
                            weblink: data.weblink,
                            clickhandler: data.clickhandler,
                            linktarget: data.linktarget,
                            weblinklightbox: data.weblinklightbox,
                            lightbox: false,
                            lightboxsize: data.lightboxsize,
                            lightboxwidth: data.lightboxwidth,
                            lightboxheight: data.lightboxheight,
                            playvideoinline: data.playvideoinline,
                            loadvideoinline: data.loadvideoinline,
                            usevideothumbnail: data.usevideothumbnail,
                            videothumbnail: data.videothumbnail,
                            category: data.category,
                            langs: data.langs
                        })
                    });
                    updateMediaTable()
                })
        });
        $("#wonderplugin-add-video").click(function () {
            slideDialog(1,
                function (items) {
                    items.map(function (data) {
                        addMediaToList({
                            type: 1,
                            image: data.image,
                            thumbnail: data.thumbnail ? data.thumbnail : data.image,
                            displaythumbnail: data.displaythumbnail,
                            video: data.video,
                            mp4: data.mp4,
                            webm: data.webm,
                            title: data.title,
                            description: data.description,
                            socialmedia: data.socialmedia,
                            socialmediatarget: data.socialmediatarget,
                            socialmediarotate: data.socialmediarotate,
                            altusetitle: data.altusetitle,
                            alt: data.alt,
                            button: data.button,
                            buttoncss: data.buttoncss,
                            buttonlink: data.buttonlink,
                            buttonlinktarget: data.buttonlinktarget,
                            buttonlightbox: data.buttonlightbox,
                            weblink: data.weblink,
                            clickhandler: data.clickhandler,
                            linktarget: data.linktarget,
                            weblinklightbox: data.weblinklightbox,
                            lightbox: true,
                            lightboxsize: data.lightboxsize,
                            lightboxwidth: data.lightboxwidth,
                            lightboxheight: data.lightboxheight,
                            playvideoinline: data.playvideoinline,
                            loadvideoinline: data.loadvideoinline,
                            autoplaymutedvideoinline: data.autoplaymutedvideoinline,
                            autoplaymutedvideoinlineloop: data.autoplaymutedvideoinlineloop,
                            autoplaymutedvideoinlinehidecontrols: data.autoplaymutedvideoinlinehidecontrols,
                            playmutedvideoinlineonhover: data.playmutedvideoinlineonhover,
                            playvideoinlineonclick: data.playvideoinlineonclick,
                            playvideoinlinemuted: data.playvideoinlinemuted,
                            usevideothumbnail: data.usevideothumbnail,
                            videothumbnail: data.videothumbnail,
                            category: data.category,
                            langs: data.langs
                        })
                    });
                    updateMediaTable()
                })
        });
        $("#wonderplugin-add-youtube").click(function () {
            onlineVideoDialog(2, function (items) {
                items.map(function (data) {
                    addMediaToList({
                        type: 2,
                        image: data.image,
                        thumbnail: data.thumbnail ? data.thumbnail : data.image,
                        displaythumbnail: data.displaythumbnail,
                        video: data.video,
                        mp4: data.mp4,
                        webm: data.webm,
                        title: data.title,
                        description: data.description,
                        socialmedia: data.socialmedia,
                        socialmediatarget: data.socialmediatarget,
                        socialmediarotate: data.socialmediarotate,
                        altusetitle: data.altusetitle,
                        alt: data.alt,
                        button: data.button,
                        buttoncss: data.buttoncss,
                        buttonlink: data.buttonlink,
                        buttonlinktarget: data.buttonlinktarget,
                        buttonlightbox: data.buttonlightbox,
                        weblink: data.weblink,
                        clickhandler: data.clickhandler,
                        linktarget: data.linktarget,
                        weblinklightbox: data.weblinklightbox,
                        lightbox: true,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        playvideoinline: data.playvideoinline,
                        loadvideoinline: data.loadvideoinline,
                        usevideothumbnail: data.usevideothumbnail,
                        videothumbnail: data.videothumbnail,
                        category: data.category,
                        langs: data.langs
                    })
                });
                updateMediaTable()
            })
        });
        $("#wonderplugin-add-youtube-playlist").click(function () {
            youtubePlaylistDialog(function (items) {
                items.map(function (data) {
                    addMediaToList({
                        type: 15,
                        youtubeapikey: data.youtubeapikey,
                        youtubeplaylistid: data.youtubeplaylistid,
                        youtubeplaylistmaxresults: data.youtubeplaylistmaxresults,
                        youtubetitle: data.youtubetitle,
                        youtubedescription: data.youtubedescription,
                        lightbox: data.lightbox,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        category: data.category
                    })
                });
                updateMediaTable()
            })
        });
        $("#wonderplugin-add-vimeo").click(function () {
            onlineVideoDialog(3, function (items) {
                items.map(function (data) {
                    addMediaToList({
                        type: 3,
                        image: data.image,
                        thumbnail: data.thumbnail ? data.thumbnail : data.image,
                        displaythumbnail: data.displaythumbnail,
                        video: data.video,
                        mp4: data.mp4,
                        webm: data.webm,
                        title: data.title,
                        description: data.description,
                        socialmedia: data.socialmedia,
                        socialmediatarget: data.socialmediatarget,
                        socialmediarotate: data.socialmediarotate,
                        altusetitle: data.altusetitle,
                        alt: data.alt,
                        button: data.button,
                        buttoncss: data.buttoncss,
                        buttonlink: data.buttonlink,
                        buttonlinktarget: data.buttonlinktarget,
                        buttonlightbox: data.buttonlightbox,
                        weblink: data.weblink,
                        clickhandler: data.clickhandler,
                        linktarget: data.linktarget,
                        weblinklightbox: data.weblinklightbox,
                        lightbox: true,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        playvideoinline: data.playvideoinline,
                        loadvideoinline: data.loadvideoinline,
                        usevideothumbnail: data.usevideothumbnail,
                        videothumbnail: data.videothumbnail,
                        category: data.category,
                        langs: data.langs
                    })
                });
                updateMediaTable()
            })
        });
        $("#wonderplugin-add-dailymotion").click(function () {
            onlineVideoDialog(4, function (items) {
                items.map(function (data) {
                    wonderplugin_gridgallery_config.slides.push({
                        type: 2,
                        image: data.image,
                        thumbnail: data.thumbnail ? data.thumbnail : data.image,
                        video: data.video,
                        mp4: data.mp4,
                        hdmp4: data.hdmp4,
                        webm: data.webm,
                        hdwebm: data.hdwebm,
                        title: data.title,
                        description: data.description,
                        socialmedia: data.socialmedia,
                        socialmediatarget: data.socialmediatarget,
                        socialmediarotate: data.socialmediarotate,
                        altusetitle: data.altusetitle,
                        alt: data.alt,
                        button: data.button,
                        buttoncss: data.buttoncss,
                        buttonlink: data.buttonlink,
                        buttonlinktarget: data.buttonlinktarget,
                        buttonlightbox: data.buttonlightbox,
                        weblink: data.weblink,
                        clickhandler: data.clickhandler,
                        linktarget: data.linktarget,
                        weblinklightbox: data.weblinklightbox,
                        lightbox: true,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        playvideoinline: data.playvideoinline,
                        loadvideoinline: data.loadvideoinline,
                        usevideothumbnail: data.usevideothumbnail,
                        videothumbnail: data.videothumbnail,
                        category: data.category,
                        langs: data.langs
                    })
                });
                updateMediaTable()
            })
        });
        $("#wonderplugin-add-iframevideo").click(function () {
            slideDialog(5, function (items) {
                items.map(function (data) {
                    addMediaToList({
                        type: 5,
                        image: data.image,
                        thumbnail: data.thumbnail ? data.thumbnail : data.image,
                        displaythumbnail: data.displaythumbnail,
                        video: data.video,
                        mp4: data.mp4,
                        webm: data.webm,
                        title: data.title,
                        description: data.description,
                        socialmedia: data.socialmedia,
                        socialmediatarget: data.socialmediatarget,
                        socialmediarotate: data.socialmediarotate,
                        altusetitle: data.altusetitle,
                        alt: data.alt,
                        button: data.button,
                        buttoncss: data.buttoncss,
                        buttonlink: data.buttonlink,
                        buttonlinktarget: data.buttonlinktarget,
                        buttonlightbox: data.buttonlightbox,
                        weblink: data.weblink,
                        clickhandler: data.clickhandler,
                        linktarget: data.linktarget,
                        weblinklightbox: data.weblinklightbox,
                        lightbox: true,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        playvideoinline: data.playvideoinline,
                        loadvideoinline: data.loadvideoinline,
                        usevideothumbnail: data.usevideothumbnail,
                        videothumbnail: data.videothumbnail,
                        category: data.category,
                        langs: data.langs
                    })
                });
                updateMediaTable()
            })
        });
        $("#wonderplugin-add-pdf").click(function () {
            slideDialog(10, function (items) {
                items.map(function (data) {
                    addMediaToList({
                        type: 10,
                        image: data.image,
                        thumbnail: data.thumbnail ? data.thumbnail : data.image,
                        displaythumbnail: data.displaythumbnail,
                        pdf: data.pdf,
                        video: data.video,
                        mp4: data.mp4,
                        webm: data.webm,
                        title: data.title,
                        description: data.description,
                        socialmedia: data.socialmedia,
                        socialmediatarget: data.socialmediatarget,
                        socialmediarotate: data.socialmediarotate,
                        altusetitle: data.altusetitle,
                        alt: data.alt,
                        button: data.button,
                        buttoncss: data.buttoncss,
                        buttonlink: data.buttonlink,
                        buttonlinktarget: data.buttonlinktarget,
                        buttonlightbox: data.buttonlightbox,
                        weblink: data.weblink,
                        clickhandler: data.clickhandler,
                        linktarget: data.linktarget,
                        weblinklightbox: data.weblinklightbox,
                        lightbox: true,
                        lightboxsize: data.lightboxsize,
                        lightboxwidth: data.lightboxwidth,
                        lightboxheight: data.lightboxheight,
                        playvideoinline: data.playvideoinline,
                        loadvideoinline: data.loadvideoinline,
                        usevideothumbnail: data.usevideothumbnail,
                        videothumbnail: data.videothumbnail,
                        category: data.category,
                        langs: data.langs
                    })
                });
                updateMediaTable()
            })
        });
        var addPostsDialog = function (dialogType, onSuccess, data, dataIndex) {
            var dialogCode =
                "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'>Add Posts</h3>" + "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>Select Posts</th><td><select name='wonderplugin-dialog-postcategory' id='wonderplugin-dialog-postcategory'>";
            var catlist = {};
            try {
                catlist = JSON.parse($("#wonderplugin-gridgallery-catlist").text())
            } catch (err) {}
            dialogCode +=
                "<option value='-1'>Recent Posts</option>";
            dialogCode += "<option value='-2'>All Categories</option>";
            for (var key in catlist) dialogCode += "<option value='" + catlist[key].ID + "'>Category: " + catlist[key].cat_name + "</option>";
            dialogCode += "</select>";
            dialogCode += "<label style='margin-left:18px;'>Order by: <select name='wonderplugin-dialog-postorderby' id='wonderplugin-dialog-postorderby'></label>" + "<option value='date'>Date</option>" + "<option value='rand'>Random Order</option>" + "<option value='none'>No order</option>" +
                "<option value='ID'>ID</option>" + "<option value='author'>Author</option>" + "<option value='title'>Title</option>" + "<option value='modified'>Modified Date</option>" + "<option value='comment_count'>Number of Comments</option>" + "</select>";
            dialogCode += "</td></tr>";
            dialogCode += "<tr><th>Posts Tags</th><td><label><input name='wonderplugin-dialog-selectpostbytags' type='checkbox' id='wonderplugin-dialog-selectpostbytags' /> Select posts by tags: <input name='wonderplugin-dialog-posttags' id='wonderplugin-dialog-posttags' type='text' class='medium-text' /></label>  <a href='https://www.wonderplugin.com/wordpress-carousel-plugin/wordpress-posts-carousel-by-tags/' target='_blank'>Tutorial: How to get posts by tags</a></td></tr>";
            dialogCode += "<tr><th>Maximum Posts</th><td><input name='wonderplugin-dialog-postnumber' id='wonderplugin-dialog-postnumber' type='number' value='20' class='small-text' /><select name='wonderplugin-dialog-postorder' id='wonderplugin-dialog-postorder'><option value='DESC'>Descending</option><option value='ASC'>Ascending</option></select></td></tr>";
            dialogCode += "<tr><th>Date Range</th><td><label><input name='wonderplugin-dialog-postdaterange' type='checkbox' id='wonderplugin-dialog-postdaterange' /> Only get posts from the past <input name='wonderplugin-dialog-postdaterangeafter' id='wonderplugin-dialog-postdaterangeafter' type='number' value='30' class='small-text' /> days</label></td></tr>";
            dialogCode += "<tr><th>Title</th><td><input name='wonderplugin-dialog-posttitlefield' id='wonderplugin-dialog-posttitlefield' type='text' value='%post_title%' class='large-text' /><p><label><input name='wonderplugin-dialog-titlelink' type='checkbox' id='wonderplugin-dialog-titlelink' value='' /> Link title to the post page</label></p></td></tr>";
            dialogCode += "<tr><th>Description</th><td><textarea name='wonderplugin-dialog-postdescriptionfield' id='wonderplugin-dialog-postdescriptionfield' class='large-text'>%post_excerpt%</textarea><br>Maximum Excerpt Word Length<input name='wonderplugin-dialog-excerptlength' id='wonderplugin-dialog-excerptlength' type='number' value='25' class='small-text' /></td></tr>";
            dialogCode += "<tr><th>Thumbnail Image Size</th><td><select name='wonderplugin-dialog-featuredimagesize' id='wonderplugin-dialog-featuredimagesize'><option value='thumbnail'>Thumbnail</option><option value='medium'>Medium</option><option value='large' selected>Large</option><option value='full'>Full</option></select></td>";
            dialogCode += "<tr><th>When clicking on the image</th><td><label><input type='radio' name='wonderplugin-dialog-postlightbox' value='1' >Open the featured image in lightbox</label><label style='margin-left:24px;'><input name='wonderplugin-dialog-postlightbox-size' type='checkbox' id='wonderplugin-dialog-postlightbox-size' value='' /> Set Lightbox size </label><input name='wonderplugin-dialog-postlightbox-width' type='text' id='wonderplugin-dialog-postlightbox-width' value='960' class='small-text' /> / <input name='wonderplugin-dialog-postlightbox-height' type='text' id='wonderplugin-dialog-postlightbox-height' value='540' class='small-text' /><br>";
            dialogCode += "<label><input type='radio' name='wonderplugin-dialog-postlightbox' value='0' checked>Open the post page</label></td>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' + j + '" id="wonderplugin-dialog-category-' +
                            j + '" value="' + categories[i].slug + '" type="checkbox"/>' + categories[i].caption + "</label>";
                        j++
                    } dialogCode += "</td></tr>"
            }
            dialogCode += "<tr><th>Link Target</th><td><div class='select-editable'><select onchange='this.nextElementSibling.value=this.value'><option value=''></option><option value='_blank'>_blank</option><option value='_self'>_self</option><option value='_parent'>_parent</option><option value='_top'>_top</option></select><input type='text' name='wonderplugin-dialog-postlinktarget' id='wonderplugin-dialog-postlinktarget' value='' /></div></td></tr>";
            dialogCode += "<tr>" + "<th>Button text</th>" + "<td><div style='float:left;'><input name='wonderplugin-dialog-image-button' type='text' id='wonderplugin-dialog-image-button' value='' class='regular-text' style='width:240px;'/> CSS:&nbsp;&nbsp;&nbsp;&nbsp;</div>" + "<div class='select-editable'><select onchange='this.nextElementSibling.value=this.value'>" + "<option value=''></option>" + "<option value='wpp-btn-blue-small'>wpp-btn-blue-small</option>" + "<option value='wpp-btn-blue-medium'>wpp-btn-blue-medium</option>" +
                "<option value='wpp-btn-blue-large'>wpp-btn-blue-large</option>" + "<option value='wpp-btn-blueborder-small'>wpp-btn-blueborder-small</option>" + "<option value='wpp-btn-blueborder-medium'>wpp-btn-blueborder-medium</option>" + "<option value='wpp-btn-blueborder-large'>wpp-btn-blueborder-large</option>" + "<option value='wpp-btn-orange-small'>wpp-btn-orange-small</option>" + "<option value='wpp-btn-orange-medium'>wpp-btn-orange-medium</option>" + "<option value='wpp-btn-orange-large'>wpp-btn-orange-large</option>" +
                "<option value='wpp-btn-orangeborder-small'>wpp-btn-orangeborder-small</option>" + "<option value='wpp-btn-orangeborder-medium'>wpp-btn-orangeborder-medium</option>" + "<option value='wpp-btn-orangeborder-large'>wpp-btn-orangeborder-large</option>" + "<option value='wpp-btn-navy-small'>wpp-btn-navy-small</option>" + "<option value='wpp-btn-navy-medium'>wpp-btn-navy-medium</option>" + "<option value='wpp-btn-navy-large'>wpp-btn-navy-large</option>" + "<option value='wpp-btn-navyborder-small'>wpp-btn-navyborder-small</option>" +
                "<option value='wpp-btn-navyborder-medium'>wpp-btn-navyborder-medium</option>" + "<option value='wpp-btn-navyborder-large'>wpp-btn-navyborder-large</option>" + "<option value='wpp-btn-white-small'>wpp-btn-white-small</option>" + "<option value='wpp-btn-white-medium'>wpp-btn-white-medium</option>" + "<option value='wpp-btn-white-large'>wpp-btn-white-large</option>" + "<option value='wpp-btn-whiteborder-small'>wpp-btn-whiteborder-small</option>" + "<option value='wpp-btn-whiteborder-medium'>wpp-btn-whiteborder-medium</option>" +
                "<option value='wpp-btn-whiteborder-large'>wpp-btn-whiteborder-large</option>" + "</select><input type='text' name='wonderplugin-dialog-image-buttoncss' id='wonderplugin-dialog-image-buttoncss' value='wpp-btn-blue-medium' /></div>" + "</td>" + "</tr>";
            dialogCode += "</table>" + "<ul style='margin-left:24px;list-style-position:outside;list-style-type:square;text-align:left;'><li>The featured image of a post will be used as the image of the gallery item. For how to define featured images for posts, please view <a href='https://codex.wordpress.org/Post_Thumbnails' target='_blank'>WordPress Featured Images</a>.</li>" +
                "<li>The title of a post will be used as the title property of the gallery item.</li>" + "<li>The excerpt of a post will be used as the description property of the gallery item. For how to add excerpts for posts, please view <a href='https://codex.wordpress.org/Excerpt' target='_blank'>WordPress Excerpts</a>.</li></ul>" + "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" +
                "</div>" + "</div>" + "</div>";
            var $postsDialog = $(dialogCode);
            $("body").append($postsDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            if (data) {
                $("#wonderplugin-dialog-posttitlefield").val(data.posttitlefield);
                $("#wonderplugin-dialog-postdescriptionfield").val(data.postdescriptionfield);
                $("#wonderplugin-dialog-postcategory").val(data.postcategory);
                $("#wonderplugin-dialog-postorderby").val(data.postorderby);
                $("#wonderplugin-dialog-postorder").val(data.postorder);
                $("#wonderplugin-dialog-selectpostbytags").prop("checked", data.selectpostbytags);
                $("#wonderplugin-dialog-posttags").val(data.posttags);
                $("#wonderplugin-dialog-postdaterange").prop("checked", data.postdaterange);
                $("#wonderplugin-dialog-postdaterangeafter").val(data.postdaterangeafter);
                $("#wonderplugin-dialog-postnumber").val(data.postnumber);
                $("#wonderplugin-dialog-featuredimagesize").val(data.featuredimagesize);
                $("#wonderplugin-dialog-excerptlength").val(data.excerptlength);
                $("#wonderplugin-dialog-postlinktarget").val(data.postlinktarget);
                $("#wonderplugin-dialog-image-button").val(data.button);
                $("#wonderplugin-dialog-image-buttoncss").val(data.buttoncss);
                if (data.category) {
                    var categories = data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" + i).val(), categories) !== -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
                if ("postlightbox" in data) {
                    $("input[name=wonderplugin-dialog-postlightbox][value=" +
                        (data.postlightbox ? 1 : 0) + "]").prop("checked", true);
                    $("#wonderplugin-dialog-postlightbox-size").prop("checked", data.postlightboxsize);
                    $("#wonderplugin-dialog-postlightbox-width").val(data.postlightboxwidth);
                    $("#wonderplugin-dialog-postlightbox-height").val(data.postlightboxheight);
                    $("#wonderplugin-dialog-titlelink").prop("checked", data.posttitlelink)
                }
            }
            $("#wonderplugin-dialog-ok").click(function () {
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" +
                            i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" + i).val()
                }
                var item = {
                    type: dialogType,
                    posttitlefield: $("#wonderplugin-dialog-posttitlefield").val(),
                    postdescriptionfield: $("#wonderplugin-dialog-postdescriptionfield").val(),
                    postcategory: $("#wonderplugin-dialog-postcategory").val(),
                    postorderby: $("#wonderplugin-dialog-postorderby").val(),
                    postorder: $("#wonderplugin-dialog-postorder").val(),
                    selectpostbytags: $("#wonderplugin-dialog-selectpostbytags").is(":checked"),
                    posttags: $("#wonderplugin-dialog-posttags").val(),
                    postdaterange: $("#wonderplugin-dialog-postdaterange").is(":checked"),
                    postdaterangeafter: $("#wonderplugin-dialog-postdaterangeafter").val(),
                    postnumber: $("#wonderplugin-dialog-postnumber").val(),
                    featuredimagesize: $("#wonderplugin-dialog-featuredimagesize").val(),
                    excerptlength: $("#wonderplugin-dialog-excerptlength").val(),
                    postlinktarget: $("#wonderplugin-dialog-postlinktarget").val(),
                    button: $("#wonderplugin-dialog-image-button").val(),
                    buttoncss: $("#wonderplugin-dialog-image-buttoncss").val(),
                    category: category,
                    postlightbox: $("input[name=wonderplugin-dialog-postlightbox]:checked").val() == 1 ? true : false,
                    postlightboxsize: $("#wonderplugin-dialog-postlightbox-size").is(":checked"),
                    postlightboxwidth: parseInt($.trim($("#wonderplugin-dialog-postlightbox-width").val())),
                    postlightboxheight: parseInt($.trim($("#wonderplugin-dialog-postlightbox-height").val())),
                    posttitlelink: $("#wonderplugin-dialog-titlelink").is(":checked")
                };
                $postsDialog.remove();
                onSuccess(item)
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $postsDialog.remove()
            })
        };
        $("#wonderplugin-add-posts").click(function () {
            addPostsDialog(6, function (data) {
                addMediaToList(data);
                updateMediaTable()
            })
        });
        var addCustomPostDialog = function (dialogType, onSuccess, data, dataIndex) {
            var custompostlist = {};
            try {
                custompostlist = JSON.parse($("#wonderplugin-gridgallery-custompostlist").text())
            } catch (err) {}
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog wonderplugin-dialog-large'>" + "<h3 id='wonderplugin-dialog-title'>Add WooCommerce / Custom Posts</h3>" +
                "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form longhead'>";
            dialogCode += "<tr><th>Select Custom Post Type</th><td><select name='wonderplugin-dialog-customposttype' id='wonderplugin-dialog-customposttype'>";
            dialogCode += "<option value='-1'>Select A Custom Post Type</option>";
            for (var i = 0; i < custompostlist.length; i++) dialogCode += "<option value='" + custompostlist[i].name + "'>Custom Post Type: " + custompostlist[i].name + "</option>";
            dialogCode +=
                "</select></td></tr>";
            dialogCode += "<tr><th>Query by Taxonomy and Terms</th><td><div id='wonderplugin-dialog-taxonomy-container' data-taxonomytotal=1><div class='wonderplugin-dialog-taxonomy-row wonderplugin-dialog-taxonomy-row-first' ><select class='wonderplugin-dialog-taxonomy'>";
            dialogCode += "<option value='-1'>Select A Taxonomy</option>";
            dialogCode += "</select>";
            dialogCode += "<select class='wonderplugin-dialog-term'>";
            dialogCode += "<option value='-1'>Select A Term</option>";
            dialogCode += "</select><span class='dashicons dashicons-plus-alt wonderplugin-dialog-addtaxonomy'></span></div></div></td></tr>";
            dialogCode += "<tr class='wonderplugin-dialog-taxonomyrelation-container' style='display:none;'><th>Multiple taxonomy logical relationship</th><td><select name='wonderplugin-dialog-taxonomyrelation' id='wonderplugin-dialog-taxonomyrelation'><option value='OR'>OR</option><option value='AND'>AND</option></select></td></tr>";
            dialogCode += "<tr><th></th><td><a href='https://www.wonderplugin.com/wordpress-carousel-plugin/how-to-create-a-woocommerce-product-carousel/' target='_blank'>Tutorial: How to create a WooCommerce product gallery</a></td>";
            dialogCode += "</table>";
            dialogCode += '<ul class="wonderplugin-dialog-tab-buttons" data-panelsid="wonderplugin-dialog-tab-panels-content">' + '<li class="wonderplugin-dialog-tab-button wonderplugin-dialog-tab-button-selected">Text and Image</li>' + '<li class="wonderplugin-dialog-tab-button">Post Range</li>' + '<li class="wonderplugin-dialog-tab-button">WooCommerce</li>' + '<li class="wonderplugin-dialog-tab-button">Categories</li>' + "</ul>";
            dialogCode += '<ul class="wonderplugin-dialog-tab-panels" id="wonderplugin-dialog-tab-panels-content">';
            dialogCode += '<li class="wonderplugin-dialog-tab-panel wonderplugin-dialog-tab-panel-selected">';
            dialogCode += "<table class='wonderplugin-dialog-form longhead'>";
            dialogCode += "<tr><th>Field for Title</th><td><input style='vertical-align:middle;' name='wonderplugin-dialog-titlefield' id='wonderplugin-dialog-titlefield' type='text' class='large-text' value='%post_title%' /></td></tr>";
            dialogCode += "<tr><th>Field for Description</th><td><textarea name='wonderplugin-dialog-descriptionfield' id='wonderplugin-dialog-descriptionfield' rows='4' type='text' class='large-text'>%post_content%</textarea><p><a href='https://www.wonderplugin.com/wordpress-carousel-plugin/how-to-create-a-woocommerce-product-carousel/#step4' target='_blank'>Tutorial: How to add product price, star ratings, total sales and Add to Cart button to the carousel</a></p></td></tr>";
            dialogCode += "<tr><th>Maximum Post Content/Excerpt Word Length</th><td><input name='wonderplugin-dialog-textlength' id='wonderplugin-dialog-textlength' type='number' value='25' class='small-text' />";
            dialogCode += "<label style='margin-left:24px;'><input name='wonderplugin-dialog-titlelink' type='checkbox' id='wonderplugin-dialog-titlelink' value='' /> Link title to the post page</label></td></tr>";
            dialogCode += "<tr><th>Field for Image</th><td><input style='vertical-align:middle;' name='wonderplugin-dialog-imagefield' id='wonderplugin-dialog-imagefield' type='text' class='medium-text' value='%featured_image%' /><span style='margin-left:18px;'>Size: </span><select name='wonderplugin-dialog-customfeaturedimagesize' id='wonderplugin-dialog-customfeaturedimagesize'><option value='full'>Full</option><option value='large'>Large</option><option value='medium'>Medium</option><option value='thumbnail'>Thumbnail</option></select>";
            dialogCode += "<tr><th>Image options</th><td><label><input name='wonderplugin-dialog-imageaction' type='checkbox' id='wonderplugin-dialog-imageaction' checked /> Open the post page or image lightbox on clicking the image</label>";
            dialogCode += "<div style='margin-left:20px;margin-top:8px;'><label><input type='radio' name='wonderplugin-dialog-imageactionlightbox' value='1' >Open the image in lightbox</label><br>";
            dialogCode += "<label><input type='radio' name='wonderplugin-dialog-imageactionlightbox' value='0' checked>Click to open the post page</label><label style='margin-left:24px;'><input name='wonderplugin-dialog-openpostinlightbox' type='checkbox' id='wonderplugin-dialog-openpostinlightbox' value='' /> Open in lightbox</label></div></td>";
            dialogCode += "<tr><th></th><td><label><input name='wonderplugin-dialog-postlightboxsize' type='checkbox' id='wonderplugin-dialog-postlightboxsize' value='' /> Set Lightbox size </label><input name='wonderplugin-dialog-postlightboxwidth' type='number' id='wonderplugin-dialog-postlightboxwidth' value='960' class='small-text' /> / <input name='wonderplugin-dialog-postlightboxheight' type='number' id='wonderplugin-dialog-postlightboxheight' value='540' class='small-text' /></td></tr>";
            dialogCode += "<tr><th>Link Target</th><td><div class='select-editable'><select onchange='this.nextElementSibling.value=this.value'><option value=''></option><option value='_blank'>_blank</option><option value='_self'>_self</option><option value='_parent'>_parent</option><option value='_top'>_top</option></select><input type='text' name='wonderplugin-dialog-postlinktarget' id='wonderplugin-dialog-postlinktarget' value='' /></div></td></tr>";
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += '<li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form longhead'>";
            dialogCode += "<tr><th>Maximum Posts</th><td><input style='vertical-align:middle;' name='wonderplugin-dialog-postnumber' id='wonderplugin-dialog-postnumber' type='number' value='50' class='small-text' /><select name='wonderplugin-dialog-postorder' id='wonderplugin-dialog-postorder'><option value='DESC'>Descending</option><option value='ASC'>Ascending</option></select></td></tr>";
            dialogCode += "<tr><th>Date Range</th><td><label><input name='wonderplugin-dialog-postdaterange' type='checkbox' id='wonderplugin-dialog-postdaterange' /> Only get posts from the past <input name='wonderplugin-dialog-postdaterangeafter' id='wonderplugin-dialog-postdaterangeafter' type='number' value='30' class='small-text' /> days</label></td></tr>";
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += '<li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form longhead'>";
            dialogCode += "<tr><th>Query by WooCommerce Meta</th><td>";
            dialogCode += "<p><label><input name='wonderplugin-dialog-metaonsale' type='checkbox' id='wonderplugin-dialog-metaonsale' /> Select products on sale</label></p>";
            dialogCode += "<p><label><input name='wonderplugin-dialog-metatotalsales' type='checkbox' id='wonderplugin-dialog-metatotalsales' /> Select best selling products</label></p>";
            dialogCode += "<p><label><input name='wonderplugin-dialog-metafeatured' type='checkbox' id='wonderplugin-dialog-metafeatured' /> Featured products for WooCommerce Version 1 and 2. For WooCommerce Version 3, do NOT check this option, please view the following tutorial instead:</label></p>";
            dialogCode += "<p><a href='https://www.wonderplugin.com/wordpress-carousel-plugin/how-to-create-a-woocommerce-product-carousel/#step6' target='_blank'>Tutorial: How to create featured products carousel for WooCommerce 3 and above</a></p>";
            dialogCode += "</td></tr>";
            dialogCode += "<tr class='wonderplugin-dialog-metarelation-container' style='display:none;'><th>Meta Keys Logical Relationship</th><td><select name='wonderplugin-dialog-metarelation' id='wonderplugin-dialog-metarelation'><option value='OR'>OR</option><option value='AND'>AND</option></select></td></tr>";
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += '<li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form longhead'>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' +
                            j + '" id="wonderplugin-dialog-category-' + j + '" value="' + categories[i].slug + '" type="checkbox"/>' + categories[i].caption + "</label>";
                        j++
                    } dialogCode += "</td></tr>"
            }
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += "</ul>";
            dialogCode += "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $postsDialog =
                $(dialogCode);
            $("body").append($postsDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            var onCustomPostTypeChange = function (customposttype) {
                $(".wonderplugin-dialog-taxonomy").empty().append('<option value="-1">Select A Taxonomy</option>').val("-1");
                $(".wonderplugin-dialog-term").empty().append('<option value="-1">Select A Term</option>').val("-1");
                if (customposttype != "-1")
                    for (var i = 0; i < custompostlist.length; i++)
                        if (customposttype ==
                            custompostlist[i].name) {
                            if (custompostlist[i].taxonomies)
                                for (var j = 0; j < custompostlist[i].taxonomies.length; j++) $(".wonderplugin-dialog-taxonomy").append('<option value="' + custompostlist[i].taxonomies[j].name + '">Taxonomy: ' + custompostlist[i].taxonomies[j].name + "</option>");
                            break
                        }
            };
            var onTaxonomyChange = function (taxonomyid, customposttype, taxonomy) {
                var termElem = $(".wonderplugin-dialog-taxonomy-row").eq(taxonomyid).find(".wonderplugin-dialog-term");
                if (!termElem) return;
                termElem.empty().append('<option value="-1">Select A Term</option>').val("-1");
                if (customposttype != "-1" && taxonomy != "-1")
                    for (var i = 0; i < custompostlist.length; i++)
                        if (customposttype == custompostlist[i].name) {
                            if (custompostlist[i].taxonomies)
                                for (var j = 0; j < custompostlist[i].taxonomies.length; j++)
                                    if (taxonomy == custompostlist[i].taxonomies[j].name) {
                                        if (custompostlist[i].taxonomies[j].terms)
                                            for (var k = 0; k < custompostlist[i].taxonomies[j].terms.length; k++) termElem.append('<option value="' + custompostlist[i].taxonomies[j].terms[k].slug + '">Term: ' + custompostlist[i].taxonomies[j].terms[k].slug +
                                                "</option>");
                                        break
                                    } break
                        }
            };
            $("#wonderplugin-dialog-taxonomy-container").on("click", ".wonderplugin-dialog-addtaxonomy", function () {
                var total = $("#wonderplugin-dialog-taxonomy-container").data("taxonomytotal");
                var taxonomyCode = $("<div class='wonderplugin-dialog-taxonomy-row' ></div>");
                var taxonomySelect = $(".wonderplugin-dialog-taxonomy-row-first .wonderplugin-dialog-taxonomy").clone().val("-1");
                var termSelect = $(".wonderplugin-dialog-taxonomy-row-first .wonderplugin-dialog-term").clone().val("-1");
                var removeTaxonomy =
                    "<span class='dashicons dashicons-dismiss wonderplugin-dialog-removetaxonomy'></span>";
                taxonomyCode.append(taxonomySelect).append(termSelect).append(removeTaxonomy);
                $("#wonderplugin-dialog-taxonomy-container").append(taxonomyCode);
                $("#wonderplugin-dialog-taxonomy-container").data("taxonomytotal", total + 1);
                $(".wonderplugin-dialog-taxonomyrelation-container").css({
                    "display": total > 0 ? "table-row" : "none"
                })
            });
            $("#wonderplugin-dialog-taxonomy-container").on("click", ".wonderplugin-dialog-removetaxonomy", function () {
                $(this).closest(".wonderplugin-dialog-taxonomy-row").remove();
                var total = $("#wonderplugin-dialog-taxonomy-container").data("taxonomytotal");
                $("#wonderplugin-dialog-taxonomy-container").data("taxonomytotal", total - 1);
                $(".wonderplugin-dialog-taxonomyrelation-container").css({
                    "display": total > 2 ? "table-row" : "none"
                })
            });
            $("#wonderplugin-dialog-customposttype").on("change", function () {
                onCustomPostTypeChange($(this).val())
            });
            $("#wonderplugin-dialog-taxonomy-container").on("change", ".wonderplugin-dialog-taxonomy", function () {
                var taxonomyid = $(this).closest(".wonderplugin-dialog-taxonomy-row").index();
                onTaxonomyChange(taxonomyid, $("#wonderplugin-dialog-customposttype").val(), $(this).val())
            });
            $("#wonderplugin-dialog-metatotalsales,#wonderplugin-dialog-metafeatured").on("click", function () {
                if ($("#wonderplugin-dialog-metatotalsales").is(":checked") && $("#wonderplugin-dialog-metafeatured").is(":checked")) $(".wonderplugin-dialog-metarelation-container").css({
                    display: "table-row"
                });
                else $(".wonderplugin-dialog-metarelation-container").css({
                    display: "none"
                })
            });
            if (data) {
                $("#wonderplugin-dialog-customposttype").val(data.customposttype);
                var total = 1;
                for (total = 1;; total++)
                    if ("taxonomy" + total in data && "term" + total in data) {
                        $("#wonderplugin-dialog-taxonomy-container").data("taxonomytotal", total + 1);
                        var taxonomyCode = $("<div class='wonderplugin-dialog-taxonomy-row' ></div>");
                        var taxonomySelect = $(".wonderplugin-dialog-taxonomy-row-first .wonderplugin-dialog-taxonomy").clone().val("-1");
                        var termSelect = $(".wonderplugin-dialog-taxonomy-row-first .wonderplugin-dialog-term").clone().val("-1");
                        var removeTaxonomy = "<span class='dashicons dashicons-dismiss wonderplugin-dialog-removetaxonomy'></span>";
                        taxonomyCode.append(taxonomySelect).append(termSelect).append(removeTaxonomy);
                        $("#wonderplugin-dialog-taxonomy-container").append(taxonomyCode)
                    } else break;
                $(".wonderplugin-dialog-taxonomyrelation-container").css({
                    "display": total > 1 ? "table-row" : "none"
                });
                if (data.customposttype != "-1") {
                    onCustomPostTypeChange(data.customposttype);
                    for (var i = 0; i < total; i++) {
                        $(".wonderplugin-dialog-taxonomy-row").eq(i).find(".wonderplugin-dialog-taxonomy").val(data["taxonomy" + i]);
                        onTaxonomyChange(i, data.customposttype, data["taxonomy" +
                            i]);
                        if (data["taxonomy" + i] != "-1") $(".wonderplugin-dialog-taxonomy-row").eq(i).find(".wonderplugin-dialog-term").val(data["term" + i])
                    }
                }
                $("#wonderplugin-dialog-taxonomyrelation").val(data.taxonomyrelation);
                $("#wonderplugin-dialog-metaonsale").prop("checked", data.metaonsale);
                $("#wonderplugin-dialog-metatotalsales").prop("checked", data.metatotalsales);
                $("#wonderplugin-dialog-metafeatured").prop("checked", data.metafeatured);
                $("#wonderplugin-dialog-metarelation").val(data.metarelation);
                if (data.metatotalsales &&
                    data.metafeatured) $(".wonderplugin-dialog-metarelation-container").css({
                    display: "table-row"
                });
                else $(".wonderplugin-dialog-metarelation-container").css({
                    display: "none"
                });
                $("#wonderplugin-dialog-postnumber").val(data.postnumber);
                $("#wonderplugin-dialog-postorder").val(data.postorder);
                $("#wonderplugin-dialog-postdaterange").prop("checked", data.postdaterange);
                $("#wonderplugin-dialog-postdaterangeafter").val(data.postdaterangeafter);
                $("#wonderplugin-dialog-titlefield").val(data.titlefield);
                $("#wonderplugin-dialog-descriptionfield").val(data.descriptionfield);
                $("#wonderplugin-dialog-textlength").val(data.textlength);
                $("#wonderplugin-dialog-titlelink").prop("checked", data.titlelink);
                $("#wonderplugin-dialog-imagefield").val(data.imagefield);
                $("#wonderplugin-dialog-customfeaturedimagesize").val(data.customfeaturedimagesize);
                $("#wonderplugin-dialog-imageaction").prop("checked", data.imageaction);
                $("input[name=wonderplugin-dialog-imageactionlightbox][value=" + (data.imageactionlightbox ? 1 : 0) + "]").prop("checked", true);
                $("#wonderplugin-dialog-openpostinlightbox").prop("checked",
                    data.openpostinlightbox);
                $("#wonderplugin-dialog-postlightboxsize").prop("checked", data.postlightboxsize);
                $("#wonderplugin-dialog-postlightboxwidth").val(data.postlightboxwidth);
                $("#wonderplugin-dialog-postlightboxheight").val(data.postlightboxheight);
                $("#wonderplugin-dialog-postlinktarget").val(data.postlinktarget);
                if (data.category) {
                    var categories = data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" +
                                i).val(), categories) !== -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
            }
            $("#wonderplugin-dialog-ok").click(function () {
                if ($("#wonderplugin-dialog-customposttype").val() == "-1") {
                    $("#wonderplugin-dialog-error").css({
                        display: "block"
                    }).html("<p>Please select a custom post type</p>");
                    return
                }
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" +
                        i).val()
                }
                var item = {
                    type: dialogType,
                    customposttype: $("#wonderplugin-dialog-customposttype").val(),
                    taxonomyrelation: $("#wonderplugin-dialog-taxonomyrelation").val(),
                    metaonsale: $("#wonderplugin-dialog-metaonsale").is(":checked"),
                    metatotalsales: $("#wonderplugin-dialog-metatotalsales").is(":checked"),
                    metafeatured: $("#wonderplugin-dialog-metafeatured").is(":checked"),
                    metarelation: $("#wonderplugin-dialog-metarelation").val(),
                    postnumber: $("#wonderplugin-dialog-postnumber").val(),
                    postorder: $("#wonderplugin-dialog-postorder").val(),
                    postdaterange: $("#wonderplugin-dialog-postdaterange").is(":checked"),
                    postdaterangeafter: $("#wonderplugin-dialog-postdaterangeafter").val(),
                    titlefield: $("#wonderplugin-dialog-titlefield").val(),
                    descriptionfield: $("#wonderplugin-dialog-descriptionfield").val(),
                    textlength: parseInt($.trim($("#wonderplugin-dialog-textlength").val())),
                    titlelink: $("#wonderplugin-dialog-titlelink").is(":checked"),
                    imagefield: $("#wonderplugin-dialog-imagefield").val(),
                    customfeaturedimagesize: $("#wonderplugin-dialog-customfeaturedimagesize").val(),
                    imageaction: $("#wonderplugin-dialog-imageaction").is(":checked"),
                    imageactionlightbox: $("input[name=wonderplugin-dialog-imageactionlightbox]:checked").val() == 1 ? true : false,
                    openpostinlightbox: $("#wonderplugin-dialog-openpostinlightbox").is(":checked"),
                    postlightboxsize: $("#wonderplugin-dialog-postlightboxsize").is(":checked"),
                    postlightboxwidth: parseInt($.trim($("#wonderplugin-dialog-postlightboxwidth").val())),
                    postlightboxheight: parseInt($.trim($("#wonderplugin-dialog-postlightboxheight").val())),
                    postlinktarget: $.trim($("#wonderplugin-dialog-postlinktarget").val()),
                    category: category
                };
                for (var i = 0; i < $(".wonderplugin-dialog-taxonomy-row").length; i++) {
                    item["taxonomy" + i] = $(".wonderplugin-dialog-taxonomy-row").eq(i).find(".wonderplugin-dialog-taxonomy").val();
                    item["term" + i] = $(".wonderplugin-dialog-taxonomy-row").eq(i).find(".wonderplugin-dialog-term").val()
                }
                $postsDialog.remove();
                onSuccess(item)
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $postsDialog.remove()
            })
        };
        $("#wonderplugin-add-custompost").click(function () {
            addCustomPostDialog(7, function (data) {
                addMediaToList(data);
                updateMediaTable()
            })
        });
        var addHTMLDialog = function (dialogType, onSuccess, data, dataIndex) {
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'>Add HTML / Shortcode / Soundcloud Embed Code</h3>" + "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>HTML/Shortcode</th><td><textarea name='wonderplugin-dialog-htmlcode' type='' id='wonderplugin-dialog-htmlcode' value='' class='large-text' rows=10></textarea></td></th>" +
                "</tr>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' + j + '" id="wonderplugin-dialog-category-' + j + '" value="' + categories[i].slug + '" type="checkbox"/>' + categories[i].caption + "</label>";
                        j++
                    } dialogCode += "</td></tr>"
            }
            dialogCode +=
                "</table>";
            dialogCode += "<ul style='margin-left:24px;list-style-position:outside;list-style-type:square;text-align:left;'>" + "<li>Shortcodes may not work in the plugin preview. Please add the gallery to a post or page to test the shortcode.</li>" + "</ul>";
            dialogCode += "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" +
                "</div>" + "</div>";
            var $htmlDialog = $(dialogCode);
            $("body").append($htmlDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            if (data) {
                $("#wonderplugin-dialog-htmlcode").val(data.htmlcode);
                if (data.category) {
                    var categories = data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" + i).val(), categories) !==
                            -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
            }
            $("#wonderplugin-dialog-ok").click(function () {
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") + $("#wonderplugin-dialog-category-" + i).val()
                }
                var item = {
                    type: dialogType,
                    htmlcode: $("#wonderplugin-dialog-htmlcode").val(),
                    category: category
                };
                $htmlDialog.remove();
                onSuccess(item)
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $htmlDialog.remove()
            })
        };
        $("#wonderplugin-add-html").click(function () {
            addHTMLDialog(12, function (data) {
                addMediaToList(data);
                updateMediaTable()
            })
        });
        $("#wonderplugin-reverselist").click(function () {
            wonderplugin_gridgallery_config.slides.reverse();
            updateMediaTable()
        });
        $("#wonderplugin-updatevimeothumb").click(function () {
            $("<div></div>").html("Are you sure to update all Vimeo thumbnail images?").dialog({
                title: "Update Vimeo Thumbs",
                resizable: false,
                modal: true,
                buttons: {
                    "Yes": function () {
                        $(this).dialog("close");
                        updateVimeoThumbs()
                    },
                    "No": function () {
                        $(this).dialog("close")
                    },
                    "Cancel": function () {
                        $(this).dialog("close")
                    }
                }
            })
        });
        var updateVimeoThumbs = function () {
            var loading = '<div><div class="wonderplugin-dialog-loading"></div><p style="text-align:center;font-size:1.2em;">Updating Vimeo thumbnail images ... </p></div>';
            var loadingDialog = $(loading).dialog({
                title: "Update Vimeo Thumbs",
                width: 500,
                resizable: false,
                modal: true
            });
            var processCount = 0;
            var finishProcess = function () {
                processCount++;
                if (processCount >= wonderplugin_gridgallery_config.slides.length) {
                    loadingDialog.dialog("destroy").remove();
                    updateMediaTable()
                }
            };
            for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
                if (wonderplugin_gridgallery_config.slides[i].type == 3 && wonderplugin_gridgallery_config.slides[i].video) {
                    var regExp = /^.*(vimeo\.com\/)((video\/)|(channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
                    var match = wonderplugin_gridgallery_config.slides[i].video.match(regExp);
                    if (match && match[6]) $.ajax({
                        url: "https://vimeo.com/api/v2/video/" + match[6] + ".json",
                        dataType: "json",
                        timeout: 3E3,
                        data: {
                            format: "json"
                        },
                        indexValue: i,
                        success: function (data) {
                            wonderplugin_gridgallery_config.slides[this.indexValue].image = data[0].thumbnail_large;
                            wonderplugin_gridgallery_config.slides[this.indexValue].thumbnail = data[0].thumbnail_medium
                        },
                        complete: function () {
                            finishProcess()
                        }
                    });
                    else finishProcess()
                } else finishProcess()
        };
        $("#wonderplugin-deleteall").click(function () {
            $("<div></div>").html("Are you sure to remove all items?").dialog({
                title: "Wonder Grid Gallery",
                resizable: false,
                modal: true,
                buttons: {
                    "Yes": function () {
                        $(this).dialog("close");
                        wonderplugin_gridgallery_config.slides.length = 0;
                        updateMediaTable()
                    },
                    "No": function () {
                        $(this).dialog("close")
                    },
                    "Cancel": function () {
                        $(this).dialog("close")
                    }
                }
            })
        });
        $("#wonderplugin-quickedit").click(function () {
            if ($(".form-quick-edit").length > 0) return;
            quickEditDialog()
        });
        var saveQuickEdit = function () {
            $(".table-quick-edit-item").each(function () {
                var index = $(this).data("dataindex");
                var type = $(this).data("datatype");
                if (type == 12) wonderplugin_gridgallery_config.slides[index].htmlcode = $("textarea[name=quick-edit-htmlcode]",
                    this).val();
                else {
                    wonderplugin_gridgallery_config.slides[index].title = $("input[name=quick-edit-title]", this).val();
                    wonderplugin_gridgallery_config.slides[index].description = $("input[name=quick-edit-description]", this).val();
                    wonderplugin_gridgallery_config.slides[index].alt = $.trim($("input[name=quick-edit-alt]", this).val());
                    if (wonderplugin_gridgallery_config.slides[index].alt) wonderplugin_gridgallery_config.slides[index].altusetitle = false
                }
                if (type == 0) {
                    wonderplugin_gridgallery_config.slides[index].weblink =
                        $.trim($("input[name=quick-edit-weblink]", this).val());
                    if (wonderplugin_gridgallery_config.slides[index].weblink) wonderplugin_gridgallery_config.slides[index].lightbox = false
                }
                var category = "";
                for (var i = 0;; i++) {
                    var cat_checkbox = $("input[name=quick-edit-category-" + i + "]", this);
                    if (cat_checkbox.length <= 0) break;
                    if (cat_checkbox.is(":checked")) category += (category.length > 0 ? ":" : "") + cat_checkbox.val()
                }
                wonderplugin_gridgallery_config.slides[index].category = category
            })
        };
        var quickEditDialog = function () {
            var form = $('<div class="form-quick-edit"><div class="form-quick-edit-buttons"><button class="quick-edit-save button-secondary">Save Quick Edit</button><button class="quick-edit-exit button-secondary">Exit Quik Edit Mode</button></div><div><p style="text-align:center;font-weight:bold;">Click the Save Quick Edit button to save your changes before exit the quick edit mode.</p></div><div class="table-quick-edit"></div></div>');
            $(".quick-edit-exit", form).click(function () {
                $("<div></div>").html("Are you sure to exit the quick edit mode? <p>Make sure you have clicked the Save Quick Edit button to save the changes before exiting!</p>").dialog({
                    title: "Quick Edit Mode",
                    resizable: false,
                    modal: true,
                    width: 560,
                    buttons: {
                        "Yes": function () {
                            $(this).dialog("close");
                            $("#wonderplugin-gridgallery-media-table").empty();
                            updateMediaTable()
                        },
                        "No": function () {
                            $(this).dialog("close")
                        },
                        "Cancel": function () {
                            $(this).dialog("close")
                        }
                    }
                })
            });
            $(".quick-edit-save",
                form).click(function () {
                saveQuickEdit();
                $("<div></div>").html("Saved!").dialog({
                    title: "Wonder Grid Gallery",
                    resizable: false,
                    modal: true,
                    buttons: {
                        "Ok": function () {
                            $(this).dialog("close")
                        }
                    }
                })
            });
            var form_table = $(".table-quick-edit", form);
            var selected_cat = $("#wonderplugin-gridgallery-selectcategorylist").val();
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            var show_cat = categories && categories.length > 1;
            for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++) {
                var data =
                    wonderplugin_gridgallery_config.slides[i];
                if (selected_cat != "all")
                    if (!data.category || $.inArray(selected_cat, data.category.split(":")) == -1) continue;
                if (data.type >= 0 && data.type <= 5 || data.type == 10 || data.type == 12) {
                    var data_table = $('<table class="table-quick-edit-item"><tr><th rowspan="6"><p class="quick-edit-id"></p><img class="quick-edit-thumbnail"></th></tr>' + (data.type == 12 ? '<tr><td>HTML code</td><td><textarea name="quick-edit-htmlcode" class="large-text" rows="5"></textarea></td></tr>' : '<tr><td>Title</td><td><input name="quick-edit-title"></td></tr><tr><td>Description</td><td><input name="quick-edit-description"></td></tr><tr><td>Alt</td><td><input name="quick-edit-alt"></td></tr>') +
                        (data.type == 0 ? '<tr><td>Web link</td><td><input name="quick-edit-weblink"></td></tr>' : "") + (show_cat ? '<tr><td>Category</td><td><div class="quick-edit-category"></div></td></tr>' : "") + "</table>");
                    $(".quick-edit-id", data_table).html(i + 1);
                    if (data.type == 12) {
                        $("textarea[name=quick-edit-htmlcode]", data_table).val(data.htmlcode);
                        $(".quick-edit-thumbnail", data_table).attr("src", $("#wonderplugin-gridgallery-pluginfolder").text() + "images/htmlcode.png")
                    } else {
                        $(".quick-edit-thumbnail", data_table).attr("src", data.thumbnail);
                        $("input[name=quick-edit-title]", data_table).val(data.title);
                        $("input[name=quick-edit-description]", data_table).val(data.description);
                        $("input[name=quick-edit-alt]", data_table).val(data.alt);
                        $("input[name=quick-edit-weblink]", data_table).val(data.weblink)
                    }
                    if (show_cat) {
                        var j = 0;
                        var catCode = "";
                        for (var k = 0; k < categories.length; k++)
                            if (categories[k].slug != "all") {
                                var is_checked = data.category ? $.inArray(categories[k].slug, data.category.split(":")) !== -1 : false;
                                catCode += '<label><input class="quick-edit-category-checkbox" name="quick-edit-category-' +
                                    j + '" value="' + categories[k].slug + '" type="checkbox"' + (is_checked ? " checked" : "") + ">" + categories[k].caption + "</label>";
                                j++
                            } $(".quick-edit-category", data_table).append(catCode)
                    }
                    data_table.data("dataindex", i);
                    data_table.data("datatype", data.type);
                    form_table.append(data_table);
                    form_table.append("<hr>")
                }
            }
            $("#wonderplugin-gridgallery-media-table").empty();
            $("#wonderplugin-gridgallery-media-table").append(form)
        };
        $("#wonderplugin-globalsettings").click(function () {
            globalSettingsDialog()
        });
        var globalSettingsDialog =
            function () {
                var form = '<table class="table-global-settings">';
                form += "<tr>";
                form += '<td><label><input name="wonderplugin-globalsettings-displaythumbnail" type="checkbox" value="">Use thumbnail in grid</label></td>';
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="displaythumbnail">Apply the Option</button></td>';
                form += "</tr>";
                form += "<tr>";
                form += '<td><label><input name="wonderplugin-globalsettings-altusetitle" type="checkbox" value="">Use Title as img alt text</label></td>';
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="altusetitle">Apply the Option</button></td>';
                form += "</tr>";
                form += "<tr>";
                form += '<td><label><input name="wonderplugin-globalsettings-lightbox" type="checkbox" value="">Open current image in Lightbox <i>(for images only)</i></label></td>';
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="lightbox">Apply the Option</button></td>';
                form += "</tr>";
                form += "<tr>";
                form += '<td><label><input name="wonderplugin-globalsettings-lightboxsize" type="checkbox" value="">Set Lightbox size</label> <label><input name="wonderplugin-globalsettings-lightboxwidth" type="number" value="960" class="small-text"></label> / <label><input name="wonderplugin-globalsettings-lightboxheight" type="number" value="540" class="small-text"></label></td>';
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="lightboxsize">Apply the Option</button></td>';
                form += "</tr>";
                form += "<tr>";
                form += "<td><label>Web link target <i>(for images only)</i>: </label>";
                form += '<div class="select-editable" style="display:inline-block;float:none;"><select onchange="this.nextElementSibling.value=this.value">';
                form += '<option value=""></option>';
                form += '<option value="_blank">_blank</option>';
                form += '<option value="_self">_self</option>';
                form += '<option value="_parent">_parent</option>';
                form += '<option value="_top">_top</option>';
                form += '</select><input name="wonderplugin-globalsettings-linktarget" type="text" value="" /></div>';
                form += "</td>";
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="linktarget">Apply the Option</button></td>';
                form += "</tr>";
                form += "<tr>";
                form += '<td><label><input name="wonderplugin-globalsettings-weblinklightbox" type="checkbox" value="">Open web link in Lightbox <i>(for images only)</i></label></td>';
                form += '<td><button class="button button-secondary wonderplugin-globalsettings-apply" data-option="weblinklightbox">Apply the Option</button></td>';
                form +=
                    "</tr>";
                form += "<tr>";
                form += '<td colspan="2"><p style="text-align:center;"><i><b>Click the button "Apply the Option" to apply the selection of the option to all images/videos in the gallery.</b></i></p></td>';
                form += "</tr>";
                form += "</table>";
                $(form).dialog({
                    title: "Apply Options To All Items In The Gallery",
                    resizable: true,
                    modal: true,
                    width: 600,
                    buttons: {
                        "Close": function () {
                            $(this).dialog("destroy").remove()
                        }
                    }
                });
                $(document).off("click", ".wonderplugin-globalsettings-apply").on("click", ".wonderplugin-globalsettings-apply",
                    function () {
                        var option = $(this).data("option");
                        for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
                            if (option == "displaythumbnail") wonderplugin_gridgallery_config.slides[i].displaythumbnail = $("input[name=wonderplugin-globalsettings-displaythumbnail]").is(":checked");
                            else if (option == "altusetitle") wonderplugin_gridgallery_config.slides[i].altusetitle = $("input[name=wonderplugin-globalsettings-altusetitle]").is(":checked");
                        else if (option == "lightbox") {
                            if (wonderplugin_gridgallery_config.slides[i].type ==
                                0) wonderplugin_gridgallery_config.slides[i].lightbox = $("input[name=wonderplugin-globalsettings-lightbox]").is(":checked")
                        } else if (option == "lightboxsize") {
                            wonderplugin_gridgallery_config.slides[i].lightboxsize = $("input[name=wonderplugin-globalsettings-lightboxsize]").is(":checked");
                            wonderplugin_gridgallery_config.slides[i].lightboxwidth = parseInt($.trim($("input[name=wonderplugin-globalsettings-lightboxwidth]").val()));
                            wonderplugin_gridgallery_config.slides[i].lightboxheight = parseInt($.trim($("input[name=wonderplugin-globalsettings-lightboxheight]").val()))
                        } else if (option ==
                            "linktarget") {
                            if (wonderplugin_gridgallery_config.slides[i].type == 0) wonderplugin_gridgallery_config.slides[i].linktarget = $("input[name=wonderplugin-globalsettings-linktarget]").val()
                        } else if (option == "weblinklightbox")
                            if (wonderplugin_gridgallery_config.slides[i].type == 0) wonderplugin_gridgallery_config.slides[i].weblinklightbox = $("input[name=wonderplugin-globalsettings-weblinklightbox]").is(":checked");
                        $("<div><h2>Option Applied to All Items</h2></div>").dialog({
                            title: "",
                            modal: true,
                            open: function (e) {
                                var parentDialog =
                                    $(e.target).closest(".ui-dialog");
                                parentDialog.css("background-color", "#eee");
                                parentDialog.find(".ui-dialog-titlebar, .ui-dialog-buttonpane").css("background-color", "#eee")
                            },
                            buttons: {
                                "Close": function () {
                                    $(this).dialog("close")
                                }
                            }
                        })
                    })
            };
        $("#wonderplugin-sortlist").click(function () {
            sortDialog(function () {
                updateMediaTable()
            })
        });
        var sortDialog = function (onSuccess) {
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog wonderplugin-dialog-small'>" +
                "<h3 id='wonderplugin-dialog-title'>Sort List</h3>" + "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<p id='wonderplugin-dialog-sortmessage' style='display:none;'>It may take a while, please wait ......</p>" + "<p id='wonderplugin-dialog-sortoptions'>Sort By: ";
            dialogCode += "<select name='wonderplugin-dialog-sortby' id='wonderplugin-dialog-sortby'>" + "<option value='url'>URL</option>" + "<option value='file'>Filename</option>" + "<option value='title'>Title</option>" + "</select>";
            dialogCode += "<select name='wonderplugin-dialog-sortorder' id='wonderplugin-dialog-sortorder'>" + "<option value='asc'>Ascending</option>" + "<option value='desc'>Descending</option>" + "</select>";
            dialogCode += "</p>" + "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-sortok' value='Close' style='display:none;' />" +
                "</div>" + "</div>" + "</div>";
            var $sortDialog = $(dialogCode);
            $("body").append($sortDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 120) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            $("#wonderplugin-dialog-ok").click(function () {
                $("#wonderplugin-dialog-sortoptions").hide();
                $("#wonderplugin-dialog-sortmessage").show();
                $("#wonderplugin-dialog-ok").hide();
                $("#wonderplugin-dialog-cancel").hide();
                $("#wonderplugin-dialog-sortok").hide();
                $sortby =
                    $("#wonderplugin-dialog-sortby").val();
                $sortorder = $("#wonderplugin-dialog-sortorder").val();
                wonderplugin_gridgallery_config.slides.sort(function (a, b) {
                    if (a.type < 0 || a.type > 5 || b.type < 0 || b.type > 5) return 0;
                    var ret = 0;
                    if ($sortby == "url") ret = a.image.localeCompare(b.image);
                    else if ($sortby == "title") ret = a.title.localeCompare(b.title);
                    else if ($sortby == "file") {
                        var filea = a.image.substring(a.image.lastIndexOf("/") + 1);
                        var fileb = b.image.substring(b.image.lastIndexOf("/") + 1);
                        ret = filea.localeCompare(fileb)
                    }
                    if ($sortorder ==
                        "desc") ret = -ret;
                    return ret
                });
                $("#wonderplugin-dialog-sortmessage").html("Sorting finished!");
                $("#wonderplugin-dialog-sortok").show()
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $sortDialog.remove()
            });
            $("#wonderplugin-dialog-sortok").click(function () {
                $sortDialog.remove();
                onSuccess()
            })
        };
        var addXMLDialog = function (dialogType, onSuccess, data, dataIndex) {
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'>XML</h3>" +
                "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>XML URL</th><td><input name='wonderplugin-dialog-xmlurl' type='text' id='wonderplugin-dialog-xmlurl' class='large-text'/></td></th>" + "</tr>";
            dialogCode += "</table>";
            dialogCode += "<ul style='margin-left:24px;list-style-position:outside;list-style-type:square;text-align:left;'>" + "<li>Tutorial: <a href='https://www.wonderplugin.com/wordpress-grid-gallery/how-to-create-a-wordpress-gallery-from-an-xml-file/' target='_blank'>How to create a gallery from an XML file</a></li>" +
                "</ul>";
            dialogCode += "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $xmlDialog = $(dialogCode);
            $("body").append($xmlDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() + "px"
            });
            if (data) $("#wonderplugin-dialog-xmlurl").val(data.xmlurl);
            $("#wonderplugin-dialog-ok").click(function () {
                var item = {
                    type: dialogType,
                    xmlurl: $("#wonderplugin-dialog-xmlurl").val()
                };
                $xmlDialog.remove();
                onSuccess(item)
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $xmlDialog.remove()
            })
        };
        var addFolderDialog = function (dialogType, onSuccess, data, dataIndex) {
            var dialogCode = "<div class='wonderplugin-dialog-container wonderplugin-dialog-container-fixed'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" + "<h3 id='wonderplugin-dialog-title'>Import Folder</h3>" +
                "<div class='error' id='wonderplugin-dialog-error' style='display:none;'></div>";
            dialogCode += '<ul class="wonderplugin-dialog-tab-buttons" data-panelsid="wonderplugin-dialog-tab-panels-content">' + '<li class="wonderplugin-dialog-tab-button wonderplugin-dialog-tab-button-selected">Select a Folder</li>' + '<li class="wonderplugin-dialog-tab-button">File Options</li>' + '<li class="wonderplugin-dialog-tab-button">Categories and Lightbox</li>' + "</ul>";
            dialogCode += '<ul class="wonderplugin-dialog-tab-panels" id="wonderplugin-dialog-tab-panels-content">' +
                '<li class="wonderplugin-dialog-tab-panel wonderplugin-dialog-tab-panel-selected">';
            dialogCode += "<p style='text-align:left;'><span style='font-weight:bold;'>Selected Folder</span>: <span id='wonderplugin-folder-selected'></span></p>";
            dialogCode += "<div id='wonderplugin-folder-tree'></div>";
            dialogCode += '</li><li class="wonderplugin-dialog-tab-panel">';
            dialogCode += '<table id="wonderplugin-dialog-form">';
            dialogCode += '<tr><th>Sorting order</th><td><select name="wonderplugin-dialog-sortorder" id="wonderplugin-dialog-sortorder"><option value="ASC">Ascending</option><option value="DESC">Descending</option></select></td>';
            dialogCode += '<tr><th>Image extensions</th><td><input name="wonderplugin-dialog-imageext" id="wonderplugin-dialog-imageext" type="text" value="jpg|jpeg|gif|png" class="large-text" /></td></tr>';
            dialogCode += '<tr><th>Video extensions</th><td><input name="wonderplugin-dialog-videoext" id="wonderplugin-dialog-videoext" type="text" value="mp4|m4v" class="large-text" /></td></tr>';
            dialogCode += '<tr><th>Thumbnail suffix</th><td><input name="wonderplugin-dialog-thumbname" id="wonderplugin-dialog-thumbname" type="text" value="-thumb" class="large-text" /></td></tr>';
            dialogCode += '<tr><th>Poster suffix</th><td><input name="wonderplugin-dialog-postername" id="wonderplugin-dialog-postername" type="text" value="-poster" class="large-text" /></td></tr>';
            dialogCode += '<tr><th></th><td><p class="wonderplugin-dialog-help">* If myimage.jpg and myimage-thumb.jpg are found in the folder, myimage-thumb.jpg will be used as the thumbnail of the image.</p><p class="wonderplugin-dialog-help">* If myvideo.mp4, myvideo-thumb.jpg and myvideo-poster.jpg are found in the folder, myvideo-thumb.jpg will be used as the thumbnail, myvideo-poster.jpg will be used as the poster image.</p></td></tr>';
            dialogCode += '<tr><th>Title</th><td><label><input name="wonderplugin-dialog-usefilenameastitle" type="checkbox" id="wonderplugin-dialog-usefilenameastitle" value="" /> Use filename for title</label></td></tr>';
            dialogCode += '<tr><th>List.xml</th><td><label><input name="wonderplugin-dialog-onlyusexml" type="checkbox" id="wonderplugin-dialog-onlyusexml" value="" /> Only load items defined in list.xml file</label></td></tr>';
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += '<li class="wonderplugin-dialog-tab-panel">';
            dialogCode += "<table class='wonderplugin-dialog-form longhead'>";
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            if (categories && categories.length > 1) {
                dialogCode += "<tr><th>Categories</th><td>";
                var j = 0;
                for (var i = 0; i < categories.length; i++)
                    if (categories[i].slug != "all") {
                        dialogCode += '<label style="margin-right:24px;"><input name="wonderplugin-dialog-category-' + j + '" id="wonderplugin-dialog-category-' + j + '" value="' + categories[i].slug + '" type="checkbox"/>' +
                            categories[i].caption + "</label>";
                        j++
                    } dialogCode += "</td></tr>"
            }
            dialogCode += "<tr><th>Lightbox</th><td>";
            dialogCode += "<label><input name='wonderplugin-dialog-lightbox' type='checkbox' id='wonderplugin-dialog-lightbox' value='' checked /> Open in Lightbox</label>";
            dialogCode += "<label style='margin-left:24px;'><input name='wonderplugin-dialog-lightboxsize' type='checkbox' id='wonderplugin-dialog-lightboxsize' value='' /> Set Lightbox size (px): </label>" + "<input name='wonderplugin-dialog-lightboxwidth' type='number' id='wonderplugin-dialog-lightboxwidth' value='960' class='small-text' /> / <input name='wonderplugin-dialog-lightboxheight' type='number' id='wonderplugin-dialog-lightboxheight' value='540' class='small-text' />";
            dialogCode += "</td></tr>";
            dialogCode += "</table>";
            dialogCode += "</li>";
            dialogCode += "</ul>";
            dialogCode += "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $folderDialog = $(dialogCode);
            $("body").append($folderDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": "60px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() +
                    "px"
            });
            var folderlist = {};
            try {
                folderlist = JSON.parse($("#wonderplugin-gridgallery-folderlist").text())
            } catch (err) {}
            if (folderlist == -1) $("#wonderplugin-folder-tree").html("No permissions to browse folders.");
            else if (folderlist && folderlist.length > 0) {
                var foldercode = "<ul class='wonderplugin-foldername-list'>";
                for (var i = 0; i < folderlist.length; i++) foldercode += "<li class='wonderplugin-foldername-item wonderplugin-folder'><a class='wonderplugin-foldername' href='#' data-foldername='" + folderlist[i] + "'>" + folderlist[i] +
                    "</a></li>";
                foldercode += "</ul>";
                $("#wonderplugin-folder-tree").html(foldercode)
            }
            if (data) {
                $("#wonderplugin-folder-selected").text(data.folder);
                $("#wonderplugin-dialog-sortorder").val(data.sortorder);
                $("#wonderplugin-dialog-imageext").val(data.imageext);
                $("#wonderplugin-dialog-videoext").val(data.videoext);
                $("#wonderplugin-dialog-thumbname").val(data.thumbname);
                $("#wonderplugin-dialog-postername").val(data.postername);
                $("#wonderplugin-dialog-usefilenameastitle").prop("checked", data.usefilenameastitle);
                $("#wonderplugin-dialog-onlyusexml").prop("checked", data.onlyusexml);
                if (data.category) {
                    var categories = data.category.split(":");
                    for (var i = 0;; i++) {
                        if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                        if (jQuery.inArray($("#wonderplugin-dialog-category-" + i).val(), categories) !== -1) $("#wonderplugin-dialog-category-" + i).prop("checked", true)
                    }
                }
                $("#wonderplugin-dialog-lightbox").prop("checked", data.lightbox);
                $("#wonderplugin-dialog-lightboxsize").prop("checked", data.lightboxsize);
                $("#wonderplugin-dialog-lightboxwidth").val(data.lightboxwidth);
                $("#wonderplugin-dialog-lightboxheight").val(data.lightboxheight)
            }
            $("#wonderplugin-dialog-ok").click(function () {
                var selectedfolder = $.trim($("#wonderplugin-folder-selected").text());
                if (!selectedfolder || selectedfolder.length <= 0) $("#wonderplugin-dialog-error").css({
                    display: "block"
                }).html("<p>Please select a folder</p>");
                var category = "";
                for (var i = 0;; i++) {
                    if ($("#wonderplugin-dialog-category-" + i).length <= 0) break;
                    if ($("#wonderplugin-dialog-category-" + i).is(":checked")) category += (category.length > 0 ? ":" : "") +
                        $("#wonderplugin-dialog-category-" + i).val()
                }
                var item = {
                    type: dialogType,
                    folder: selectedfolder,
                    sortorder: $("#wonderplugin-dialog-sortorder").val(),
                    imageext: $("#wonderplugin-dialog-imageext").val(),
                    videoext: $("#wonderplugin-dialog-videoext").val(),
                    thumbname: $("#wonderplugin-dialog-thumbname").val(),
                    postername: $("#wonderplugin-dialog-postername").val(),
                    usefilenameastitle: $("#wonderplugin-dialog-usefilenameastitle").is(":checked"),
                    onlyusexml: $("#wonderplugin-dialog-onlyusexml").is(":checked"),
                    category: category,
                    lightbox: $("#wonderplugin-dialog-lightbox").is(":checked"),
                    lightboxsize: $("#wonderplugin-dialog-lightboxsize").is(":checked"),
                    lightboxwidth: parseInt($.trim($("#wonderplugin-dialog-lightboxwidth").val())),
                    lightboxheight: parseInt($.trim($("#wonderplugin-dialog-lightboxheight").val()))
                };
                $folderDialog.remove();
                onSuccess(item)
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $folderDialog.remove()
            })
        };
        $("#wonderplugin-add-folder").click(function () {
            addFolderDialog(11, function (data) {
                addMediaToList(data);
                updateMediaTable()
            })
        });
        $("#wonderplugin-import-xml").click(function () {
            addXMLDialog(13, function (data) {
                addMediaToList(data);
                updateMediaTable()
            })
        });
        $(document).on("click", ".wonderplugin-gridgallery-media-table-edit", function () {
            var index = $(this).parent().parent().index();
            var mediaType = wonderplugin_gridgallery_config.slides[index].type;
            if (mediaType == 15) youtubePlaylistDialog(function (items) {
                if (items && items.length > 0) {
                    wonderplugin_gridgallery_config.slides.splice(index, 1);
                    items.map(function (data) {
                        wonderplugin_gridgallery_config.slides.splice(index,
                            0, {
                                type: 15,
                                youtubeapikey: data.youtubeapikey,
                                youtubeplaylistid: data.youtubeplaylistid,
                                youtubeplaylistmaxresults: data.youtubeplaylistmaxresults,
                                youtubetitle: data.youtubetitle,
                                youtubedescription: data.youtubedescription,
                                lightbox: data.lightbox,
                                lightboxsize: data.lightboxsize,
                                lightboxwidth: data.lightboxwidth,
                                lightboxheight: data.lightboxheight,
                                category: data.category
                            })
                    });
                    updateMediaTable()
                }
            }, wonderplugin_gridgallery_config.slides[index], index);
            else if (mediaType == 6) addPostsDialog(6, function (data) {
                wonderplugin_gridgallery_config.slides.splice(index,
                    1);
                wonderplugin_gridgallery_config.slides.splice(index, 0, data);
                updateMediaTable()
            }, wonderplugin_gridgallery_config.slides[index], index);
            else if (mediaType == 11) addFolderDialog(11, function (data) {
                wonderplugin_gridgallery_config.slides.splice(index, 1);
                wonderplugin_gridgallery_config.slides.splice(index, 0, data);
                updateMediaTable()
            }, wonderplugin_gridgallery_config.slides[index], index);
            else if (mediaType == 12) addHTMLDialog(12, function (data) {
                wonderplugin_gridgallery_config.slides.splice(index, 1);
                wonderplugin_gridgallery_config.slides.splice(index,
                    0, data);
                updateMediaTable()
            }, wonderplugin_gridgallery_config.slides[index], index);
            else if (mediaType == 13) addXMLDialog(13, function (data) {
                wonderplugin_gridgallery_config.slides.splice(index, 1);
                wonderplugin_gridgallery_config.slides.splice(index, 0, data);
                updateMediaTable()
            }, wonderplugin_gridgallery_config.slides[index], index);
            else if (mediaType == 7) addCustomPostDialog(7, function (data) {
                    wonderplugin_gridgallery_config.slides.splice(index, 1);
                    wonderplugin_gridgallery_config.slides.splice(index, 0, data);
                    updateMediaTable()
                },
                wonderplugin_gridgallery_config.slides[index], index);
            else slideDialog(mediaType, function (items) {
                if (items && items.length > 0) {
                    wonderplugin_gridgallery_config.slides.splice(index, 1);
                    items.map(function (data) {
                        var options = {
                            type: mediaType,
                            image: data.image,
                            thumbnail: data.thumbnail ? data.thumbnail : data.image,
                            displaythumbnail: data.displaythumbnail,
                            video: data.video,
                            mp4: data.mp4,
                            webm: data.webm,
                            title: data.title,
                            description: data.description,
                            socialmedia: data.socialmedia,
                            socialmediatarget: data.socialmediatarget,
                            socialmediarotate: data.socialmediarotate,
                            altusetitle: data.altusetitle,
                            alt: data.alt,
                            button: data.button,
                            buttoncss: data.buttoncss,
                            buttonlink: data.buttonlink,
                            buttonlinktarget: data.buttonlinktarget,
                            buttonlightbox: data.buttonlightbox,
                            weblink: data.weblink,
                            clickhandler: data.clickhandler,
                            linktarget: data.linktarget,
                            weblinklightbox: data.weblinklightbox,
                            lightbox: mediaType == 0 ? data.lightbox : mediaType == 14 ? false : true,
                            lightboxsize: data.lightboxsize,
                            lightboxwidth: data.lightboxwidth,
                            lightboxheight: data.lightboxheight,
                            playvideoinline: data.playvideoinline,
                            loadvideoinline: data.loadvideoinline,
                            usevideothumbnail: data.usevideothumbnail,
                            videothumbnail: data.videothumbnail,
                            category: data.category,
                            langs: data.langs
                        };
                        if (mediaType == 1) {
                            options["autoplaymutedvideoinline"] = data.autoplaymutedvideoinline;
                            options["autoplaymutedvideoinlineloop"] = data.autoplaymutedvideoinlineloop;
                            options["autoplaymutedvideoinlinehidecontrols"] = data.autoplaymutedvideoinlinehidecontrols;
                            options["playmutedvideoinlineonhover"] = data.playmutedvideoinlineonhover;
                            options["playvideoinlineonclick"] = data.playvideoinlineonclick;
                            options["playvideoinlinemuted"] =
                                data.playvideoinlinemuted
                        }
                        if (mediaType == 10) options.pdf = data.pdf;
                        wonderplugin_gridgallery_config.slides.splice(index, 0, options)
                    });
                    updateMediaTable()
                }
            }, wonderplugin_gridgallery_config.slides[index], index)
        });
        $(document).on("click", ".wonderplugin-gridgallery-media-table-delete", function () {
            var $tr = $(this).parent().parent();
            var index = $tr.data("listindex");
            wonderplugin_gridgallery_config.slides.splice(index, 1);
            $tr.remove();
            $("#wonderplugin-gridgallery-media-table").find("li").each(function (index) {
                $(this).data("listindex",
                    index);
                $(this).find(".wonderplugin-gridgallery-media-table-id").text(index + 1);
                $(this).find("img").data("order", index);
                $(this).find("img").css({
                    top: 0,
                    left: 0
                })
            })
        });
        var wonderPluginMediaTableMove = function (i, j) {
            var visible_len = $("#wonderplugin-gridgallery-media-table").find("li:visible").length;
            if (j < 0) j = 0;
            if (j > visible_len - 1) j = visible_len - 1;
            j = $("#wonderplugin-gridgallery-media-table").find("li:visible").eq(j).data("listindex");
            var len = wonderplugin_gridgallery_config.slides.length;
            if (j < 0) j = 0;
            if (j > len - 1) j =
                len - 1;
            if (i == j) {
                $("#wonderplugin-gridgallery-media-table").find("li").eq(i).find("img").css({
                    top: 0,
                    left: 0
                });
                return
            }
            var $tr = $("#wonderplugin-gridgallery-media-table").find("li").eq(i);
            var data = wonderplugin_gridgallery_config.slides[i];
            wonderplugin_gridgallery_config.slides.splice(i, 1);
            wonderplugin_gridgallery_config.slides.splice(j, 0, data);
            var $trj = $("#wonderplugin-gridgallery-media-table").find("li").eq(j);
            $tr.remove();
            if (j > i) $trj.after($tr);
            else $trj.before($tr);
            $("#wonderplugin-gridgallery-media-table").find("li").each(function (index) {
                $(this).data("listindex",
                    index);
                $(this).find(".wonderplugin-gridgallery-media-table-id").text(index + 1);
                $(this).find("img").data("order", index);
                $(this).find("img").css({
                    top: 0,
                    left: 0
                })
            });
            $tr.find("img").wpdraggable(wonderPluginMediaTableMove)
        };
        $(document).on("click", ".wonderplugin-gridgallery-media-table-moveup", function () {
            var $tr = $(this).parent().parent();
            var index = $tr.data("listindex");
            var data = wonderplugin_gridgallery_config.slides[index];
            wonderplugin_gridgallery_config.slides.splice(index, 1);
            if (index == 0) {
                wonderplugin_gridgallery_config.slides.push(data);
                var $last = $tr.parent().find("li:last");
                $tr.remove();
                $last.after($tr)
            } else {
                wonderplugin_gridgallery_config.slides.splice(index - 1, 0, data);
                var $prev = $tr.prev();
                $tr.remove();
                $prev.before($tr)
            }
            $("#wonderplugin-gridgallery-media-table").find("li").each(function (index) {
                $(this).data("listindex", index);
                $(this).find(".wonderplugin-gridgallery-media-table-id").text(index + 1);
                $(this).find("img").data("order", index);
                $(this).find("img").css({
                    top: 0,
                    left: 0
                })
            });
            $tr.find("img").wpdraggable(wonderPluginMediaTableMove)
        });
        $(document).on("click", ".wonderplugin-gridgallery-media-table-movedown", function () {
            var $tr = $(this).parent().parent();
            var index = $tr.data("listindex");
            var len = wonderplugin_gridgallery_config.slides.length;
            var data = wonderplugin_gridgallery_config.slides[index];
            wonderplugin_gridgallery_config.slides.splice(index, 1);
            if (index == len - 1) {
                wonderplugin_gridgallery_config.slides.unshift(data);
                var $first = $tr.parent().find("li:first");
                $tr.remove();
                $first.before($tr)
            } else {
                wonderplugin_gridgallery_config.slides.splice(index +
                    1, 0, data);
                var $next = $tr.next();
                $tr.remove();
                $next.after($tr)
            }
            $("#wonderplugin-gridgallery-media-table").find("li").each(function (index) {
                $(this).data("listindex", index);
                $(this).find(".wonderplugin-gridgallery-media-table-id").text(index + 1);
                $(this).find("img").data("order", index);
                $(this).find("img").css({
                    top: 0,
                    left: 0
                })
            });
            $tr.find("img").wpdraggable(wonderPluginMediaTableMove)
        });
        var configSkinOptions = {
            width: 320,
            height: 240,
            googleanalyticsaccount: "",
            masonrymode: false,
            justifymode: false,
            donotjustifylastrowifoverlimit: false,
            donotjustifyifonlyonerowandoverlimit: true,
            limitjustifymaxheight: true,
            justifymaxheight: 1.3,
            random: false,
            circularimage: false,
            centerimage: true,
            firstimage: false,
            enabletabindex: false,
            showtitle: false,
            showtexttitle: false,
            showtextdescription: false,
            showtextbutton: false,
            usetemplatefortextoverlay: true,
            templatefortextoverlay: '<div class="wonderplugin-gridgallery-item-socialmedia">__SOCIALMEDIA__</div>\n<div class="wonderplugin-gridgallery-item-title">__TITLE__</div>\n<div class="wonderplugin-gridgallery-item-description">__DESCRIPTION__</div>\n<div class="wonderplugin-gridgallery-item-button">__BUTTON__</div>',
            usetemplateforgrid: false,
            templateforgrid: '<div class="wonderplugin-gridgallery-item-container">__IMAGE__</div>\n<div class="wonderplugin-gridgallery-item-caption">\n\t<div class="wonderplugin-gridgallery-item-caption-socialmedia">__SOCIALMEDIA__</div>\n\t<div class="wonderplugin-gridgallery-item-caption-title">__TITLE__</div>\n</div>',
            overlaylink: false,
            donotaddtext: false,
            textinsidespace: false,
            scalemode: "fill",
            titlemode: "mouseover",
            titleeffect: "slide",
            titleeffectduration: 300,
            titleheight: 0,
            shownavigation: true,
            navbgcolor: "rgba(0,0,0,0.2)",
            shownavcontrol: true,
            hidenavdefault: false,
            thumbwidth: 90,
            thumbheight: 60,
            thumbtopmargin: 12,
            thumbbottommargin: 4,
            barheight: 64,
            lightboxnogroup: false,
            lightboxcategorygroup: false,
            lightboxshowallcategories: false,
            lightboxresponsive: true,
            lightboxshowtitle: true,
            lightboxbgcolor: "#fff",
            lightboxoverlaybgcolor: "#000",
            lightboxoverlayopacity: 0.9,
            titlebottomcss: "color:#333; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;",
            lightboxshowdescription: false,
            descriptionbottomcss: "color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
            lightboxfullscreenmode: false,
            lightboxfullscreenmodeonsmallscreen: false,
            lightboxfullscreensmallscreenwidth: 800,
            lightboxfullscreentextinside: false,
            lightboxfullscreentextoutside: true,
            lightboxcloseonoverlay: true,
            lightboxvideohidecontrols: false,
            lightboxenablehtml5poster: false,
            lightboxresponsivebarheight: false,
            lightboxsmallscreenheight: 415,
            lightboxbarheightonsmallheight: 64,
            lightboxnotkeepratioonsmallheight: false,
            lightboxtitlestyle: "bottom",
            lightboximagepercentage: 75,
            lightboxdefaultvideovolume: 1,
            lightboxtitleprefix: "%NUM / %TOTAL",
            lightboxtitleinsidecss: "color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left;",
            lightboxdescriptioninsidecss: "color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
            lightboxfullscreentitlebottomcss: "color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 8px 8px;",
            lightboxfullscreendescriptionbottomcss: "color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
            lightboxautoslide: false,
            lightboxslideinterval: 5E3,
            lightboxshowtimer: true,
            lightboxtimerposition: "bottom",
            lightboxtimerheight: 2,
            lightboxtimercolor: "#dc572e",
            lightboxtimeropacity: 1,
            lightboxnavarrowspos: "inside",
            lightboxenteranimation: "",
            lightboxexitanimation: "",
            lightboxshowplaybutton: true,
            lightboxalwaysshownavarrows: false,
            lightboxbordersize: 8,
            lightboxshowtitleprefix: true,
            lightboxborderradius: 0,
            lightboxbordertopmargin: 48,
            lightboxbordertopmarginsmall: 36,
            lightboxadvancedoptions: "",
            lightboxresizespeed: 400,
            lightboxfadespeed: 0,
            lightboxtransition: "none",
            lightboxtransitionduration: 400,
            lightboxaddsocialmedia: false,
            lightboxshowsocial: false,
            lightboxsocialposition: "position:absolute;top:100%;right:0;",
            lightboxsocialpositionsmallscreen: "position:absolute;top:100%;right:0;left:0;",
            lightboxsocialdirection: "horizontal",
            lightboxsocialbuttonsize: 32,
            lightboxsocialbuttonfontsize: 18,
            lightboxsocialrotateeffect: true,
            lightboxshowemail: false,
            lightboxshowfacebook: true,
            lightboxshowtwitter: true,
            lightboxshowpinterest: true,
            lightboxshowdownload: false,
            lightboxenableaudio: false,
            lightboxaudiofile: "",
            lightboxaudioautoplay: true,
            lightboxaudioloop: true,
            lightboxaudioshowonhover: true,
            applylinktotext: false,
            hoverfade: false,
            hoverfadeopacity: 0.8,
            hoverfadeduration: 300,
            hoverzoominimagecenter: true,
            categoryshow: false,
            categoryhideall: false,
            categorymulticat: false,
            categorymulticatand: false,
            categoryatleastone: false,
            categoryposition: "topleft",
            categorystyle: "wpp-category-greybutton",
            categorymenucaption: "Select Category",
            categorydefault: "all",
            verticalcategorysmallscreenwidth: 480,
            addvideoplaybutton: true,
            videoplaybuttonmode: "defined",
            imgwidthpercent: 100,
            mediumimgwidthpercent: 100,
            smallimgwidthpercent: 100,
            imgheightpercent: 100,
            mediumimgheightpercent: 100,
            smallimgheightpercent: 100,
            mediumgridsize: false,
            mediumwidth: 320,
            mediumheight: 240,
            smallgridsize: false,
            smallwidth: 320,
            smallheight: 240
        };
        var defaultSkinOptions = {};
        for (var key in WONDERPLUGIN_GRIDGALLERY_SKIN_TEMPLATE) {
            defaultSkinOptions[key] = {};
            for (var option in configSkinOptions) defaultSkinOptions[key][option] = configSkinOptions[option];
            for (var option in WONDERPLUGIN_GRIDGALLERY_SKIN_TEMPLATE[key]) defaultSkinOptions[key][option] = WONDERPLUGIN_GRIDGALLERY_SKIN_TEMPLATE[key][option]
        }
        var defaultStyleOptions = {};
        for (var key in WONDERPLUGIN_GRIDGALLERY_STYLE_TEMPLATE) {
            defaultStyleOptions[key] = {};
            for (var option in configSkinOptions) defaultStyleOptions[key][option] = configSkinOptions[option];
            for (var option in WONDERPLUGIN_GRIDGALLERY_STYLE_TEMPLATE[key]) defaultStyleOptions[key][option] =
                WONDERPLUGIN_GRIDGALLERY_STYLE_TEMPLATE[key][option]
        }
        var defaultCategoryStyleOptions = {};
        for (var key in WONDERPLUGIN_GRIDGALLERY_CATEGORY_TEMPLATE) {
            defaultCategoryStyleOptions[key] = {};
            for (var option in WONDERPLUGIN_GRIDGALLERY_CATEGORY_TEMPLATE[key]) defaultCategoryStyleOptions[key][option] = WONDERPLUGIN_GRIDGALLERY_CATEGORY_TEMPLATE[key][option]
        }
        var printSkinOptions = function (options) {
            $("#wonderplugin-gridgallery-responsive").prop("checked", options.responsive);
            $("#wonderplugin-gridgallery-column").val(options.column);
            $("#wonderplugin-gridgallery-gridtemplate").val(options.gridtemplate);
            $("#wonderplugin-gridgallery-mediumscreen").prop("checked", options.mediumscreen);
            $("#wonderplugin-gridgallery-mediumcolumn").val(options.mediumcolumn);
            $("#wonderplugin-gridgallery-mediumscreensize").val(options.mediumscreensize);
            $("#wonderplugin-gridgallery-smallscreen").prop("checked", options.smallscreen);
            $("#wonderplugin-gridgallery-smallcolumn").val(options.smallcolumn);
            $("#wonderplugin-gridgallery-smallscreensize").val(options.smallscreensize)
        };
        var printStyleOptions = function (options) {
            $("#wonderplugin-gridgallery-mediumgridsize").prop("checked", options.mediumgridsize);
            $("#wonderplugin-gridgallery-mediumwidth").val(options.mediumwidth);
            $("#wonderplugin-gridgallery-mediumheight").val(options.mediumheight);
            $("#wonderplugin-gridgallery-smallgridsize").prop("checked", options.smallgridsize);
            $("#wonderplugin-gridgallery-smallwidth").val(options.smallwidth);
            $("#wonderplugin-gridgallery-smallheight").val(options.smallheight);
            $("#wonderplugin-gridgallery-width").val(options.width);
            $("#wonderplugin-gridgallery-height").val(options.height);
            $("#wonderplugin-gridgallery-random").prop("checked", options.random);
            $("#wonderplugin-gridgallery-centerimage").prop("checked", options.centerimage);
            $("#wonderplugin-gridgallery-circularimage").prop("checked", options.circularimage);
            $("#wonderplugin-gridgallery-firstimage").prop("checked", options.firstimage);
            $("#wonderplugin-gridgallery-enabletabindex").prop("checked", options.enabletabindex);
            $("#wonderplugin-gridgallery-masonrymode").prop("checked",
                options.masonrymode);
            $("#wonderplugin-gridgallery-justifymode").prop("checked", options.justifymode);
            $("#wonderplugin-gridgallery-donotjustifylastrowifoverlimit").prop("checked", options.donotjustifylastrowifoverlimit);
            $("#wonderplugin-gridgallery-donotjustifyifonlyonerowandoverlimit").prop("checked", options.donotjustifyifonlyonerowandoverlimit);
            $("#wonderplugin-gridgallery-limitjustifymaxheight").prop("checked", options.limitjustifymaxheight);
            $("#wonderplugin-gridgallery-justifymaxheight").val(options.justifymaxheight);
            $("#wonderplugin-gridgallery-scalemode").val(options.scalemode);
            $("#wonderplugin-gridgallery-showtitle").prop("checked", options.showtitle);
            $("#wonderplugin-gridgallery-showtexttitle").prop("checked", options.showtexttitle);
            $("#wonderplugin-gridgallery-showtextdescription").prop("checked", options.showtextdescription);
            $("#wonderplugin-gridgallery-showtextbutton").prop("checked", options.showtextbutton);
            $("#wonderplugin-gridgallery-overlaylink").prop("checked", options.overlaylink);
            $("#wonderplugin-gridgallery-donotaddtext").prop("checked",
                options.donotaddtext);
            $("#wonderplugin-gridgallery-titlemode").val(options.titlemode);
            $("#wonderplugin-gridgallery-titleeffect").val(options.titleeffect);
            $("#wonderplugin-gridgallery-titleeffectduration").val(options.titleeffectduration);
            $("#wonderplugin-gridgallery-titleheight").val(options.titleheight);
            $("#wonderplugin-gridgallery-imgwidthpercent").val(options.imgwidthpercent);
            $("#wonderplugin-gridgallery-mediumimgwidthpercent").val(options.mediumimgwidthpercent);
            $("#wonderplugin-gridgallery-smallimgwidthpercent").val(options.smallimgwidthpercent);
            $("#wonderplugin-gridgallery-imgheightpercent").val(options.imgheightpercent);
            $("#wonderplugin-gridgallery-mediumimgheightpercent").val(options.mediumimgheightpercent);
            $("#wonderplugin-gridgallery-smallimgheightpercent").val(options.smallimgheightpercent);
            $("#wonderplugin-gridgallery-applylinktotext").prop("checked", options.applylinktotext);
            $("input[name=wonderplugin-gridgallery-usetemplatefortextoverlay][value=" + (options.usetemplatefortextoverlay ? 1 : 0) + "]").prop("checked", true);
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-true").find("textarea").prop("disabled",
                !options.usetemplatefortextoverlay);
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-false").find("input").prop("disabled", options.usetemplatefortextoverlay);
            $(".wonderplugin-gridgallery-usetemplatefortextoverlay-false").find("label").css("opacity", options.usetemplatefortextoverlay ? "0.6" : 1);
            $("#wonderplugin-gridgallery-templatefortextoverlay").val(options.templatefortextoverlay);
            $("#wonderplugin-gridgallery-usetemplateforgrid").prop("checked", options.usetemplateforgrid);
            $("#wonderplugin-gridgallery-templateforgrid").val(options.templateforgrid);
            $("#wonderplugin-gridgallery-templateforgrid").prop("disabled", !options.usetemplateforgrid);
            $("#wonderplugin-gridgallery-categoryshow").prop("checked", options.categoryshow);
            $("#wonderplugin-gridgallery-categoryhideall").prop("checked", options.categoryhideall);
            $("#wonderplugin-gridgallery-categorymulticat").prop("checked", options.categorymulticat);
            $("#wonderplugin-gridgallery-categorymulticatand").prop("checked", options.categorymulticatand);
            $("#wonderplugin-gridgallery-categoryatleastone").prop("checked",
                options.categoryatleastone);
            $("#wonderplugin-gridgallery-categoryposition").val(options.categoryposition);
            $("#wonderplugin-gridgallery-categorystyle").val(options.categorystyle);
            $("#wonderplugin-gridgallery-categorydefault").val(options.categorydefault);
            $("#wonderplugin-gridgallery-verticalcategorysmallscreenwidth").val(options.verticalcategorysmallscreenwidth);
            $("#wonderplugin-gridgallery-categorymenucaption").val(options.categorymenucaption);
            var showmenucaption = options.categorystyle && (options.categorystyle.match("dropdownmenu$") ||
                options.categorystyle.match("regular-dropdown$"));
            $(".wonderplugin-gridgallery-category-dropdownmenu-options").css({
                display: showmenucaption ? "block" : "none"
            });
            $("#wonderplugin-gridgallery-deferloading").prop("checked", options.deferloading);
            $("#wonderplugin-gridgallery-deferloadingdelay").val(options.deferloadingdelay);
            $("#wonderplugin-gridgallery-nohoverontouchscreen").prop("checked", options.nohoverontouchscreen);
            $("#wonderplugin-gridgallery-hoverzoomin").prop("checked", options.hoverzoomin);
            $("#wonderplugin-gridgallery-hoverzoominimageonly").prop("checked",
                options.hoverzoominimageonly);
            $("#wonderplugin-gridgallery-hoverzoominimagecenter").prop("checked", options.hoverzoominimagecenter);
            $("#wonderplugin-gridgallery-hoverzoominvalue").val(options.hoverzoominvalue);
            $("#wonderplugin-gridgallery-hoverzoominduration").val(options.hoverzoominduration);
            $("#wonderplugin-gridgallery-hoverzoominimagescale").val(options.hoverzoominimagescale);
            $("#wonderplugin-gridgallery-hoverzoominimageduration").val(options.hoverzoominimageduration);
            $("#wonderplugin-gridgallery-hoverfade").prop("checked",
                options.hoverfade);
            $("#wonderplugin-gridgallery-hoverfadeopacity").val(options.hoverfadeopacity);
            $("#wonderplugin-gridgallery-hoverfadeduration").val(options.hoverfadeduration);
            $("#wonderplugin-gridgallery-googleanalyticsaccount").val(options.googleanalyticsaccount);
            $("#wonderplugin-gridgallery-gap").val(options.gap);
            $("#wonderplugin-gridgallery-margin").val(options.margin);
            $("#wonderplugin-gridgallery-borderradius").val(options.borderradius);
            $("#wonderplugin-gridgallery-addvideoplaybutton").prop("checked",
                options.addvideoplaybutton);
            $("input:radio[name=wonderplugin-gridgallery-videoplaybuttonmode][value=" + options.videoplaybuttonmode + "]").prop("checked", true);
            if (options.videoplaybuttonmode == "custom") {
                $("#wonderplugin-gridgallery-customvideoplaybutton").val(options.videoplaybutton);
                $("#wonderplugin-gridgallery-displayvideoplaybutton").attr("src", options.videoplaybutton)
            } else {
                $("#wonderplugin-gridgallery-videoplaybutton").val(options.videoplaybutton);
                $("#wonderplugin-gridgallery-displayvideoplaybutton").attr("src",
                    $("#wonderplugin-gridgallery-jsfolder").text() + "skins/default/" + options.videoplaybutton)
            }
            $("#wonderplugin-gridgallery-skincss").val(options.skincss)
        };
        var printCategoryStyleOptions = function (options) {
            $("#wonderplugin-gridgallery-categorycss").val(options.categorycss)
        };
        var printOptions = function (options) {
            $("#wonderplugin-gridgallery-shownavigation").prop("checked", options.shownavigation);
            $("#wonderplugin-gridgallery-lightboxnogroup").prop("checked", options.lightboxnogroup);
            $("#wonderplugin-gridgallery-lightboxcategorygroup").prop("checked",
                options.lightboxcategorygroup);
            $("#wonderplugin-gridgallery-lightboxresponsive").prop("checked", options.lightboxresponsive);
            $("#wonderplugin-gridgallery-lightboxshowtitle").prop("checked", options.lightboxshowtitle);
            $("#wonderplugin-gridgallery-lightboxshowdescription").prop("checked", options.lightboxshowdescription);
            $("#wonderplugin-gridgallery-lightboxshowallcategories").prop("checked", options.lightboxshowallcategories);
            $("#wonderplugin-gridgallery-shownavcontrol").prop("checked", options.shownavcontrol);
            $("#wonderplugin-gridgallery-hidenavdefault").prop("checked", options.hidenavdefault);
            $("#wonderplugin-gridgallery-navbgcolor").val(options.navbgcolor);
            $("#wonderplugin-gridgallery-lightboxbgcolor").val(options.lightboxbgcolor);
            $("#wonderplugin-gridgallery-lightboxoverlaybgcolor").val(options.lightboxoverlaybgcolor);
            $("#wonderplugin-gridgallery-lightboxoverlayopacity").val(options.lightboxoverlayopacity);
            $("#wonderplugin-gridgallery-lightboxvideohidecontrols").prop("checked", options.lightboxvideohidecontrols);
            $("#wonderplugin-gridgallery-lightboxenablehtml5poster").prop("checked", options.lightboxenablehtml5poster);
            $("#wonderplugin-gridgallery-lightboxfullscreenmode").prop("checked", options.lightboxfullscreenmode);
            $("#wonderplugin-gridgallery-lightboxcloseonoverlay").prop("checked", options.lightboxcloseonoverlay);
            $("#wonderplugin-gridgallery-lightboxtitlestyle").val(options.lightboxtitlestyle);
            $("#wonderplugin-gridgallery-lightboximagepercentage").val(options.lightboximagepercentage);
            $("#wonderplugin-gridgallery-lightboxdefaultvideovolume").val(options.lightboxdefaultvideovolume);
            $("#wonderplugin-gridgallery-lightboxtitleprefix").val(options.lightboxtitleprefix);
            $("#wonderplugin-gridgallery-lightboxtitleinsidecss").val(options.lightboxtitleinsidecss);
            $("#wonderplugin-gridgallery-lightboxdescriptioninsidecss").val(options.lightboxdescriptioninsidecss);
            $("#wonderplugin-gridgallery-lightboxadvancedoptions").val(options.lightboxadvancedoptions);
            $("#wonderplugin-gridgallery-lightboxfullscreentitlebottomcss").val(options.lightboxfullscreentitlebottomcss);
            $("#wonderplugin-gridgallery-lightboxfullscreendescriptionbottomcss").val(options.lightboxfullscreendescriptionbottomcss);
            $("#wonderplugin-gridgallery-lightboxfullscreenmodeonsmallscreen").prop("checked", options.lightboxfullscreenmodeonsmallscreen);
            $("#wonderplugin-gridgallery-lightboxfullscreensmallscreenwidth").val(options.lightboxfullscreensmallscreenwidth);
            $("#wonderplugin-gridgallery-lightboxfullscreentextinside").prop("checked", options.lightboxfullscreentextinside);
            $("#wonderplugin-gridgallery-lightboxfullscreentextoutside").prop("checked", options.lightboxfullscreentextoutside);
            $("#wonderplugin-gridgallery-lightboxresponsivebarheight").prop("checked",
                options.lightboxresponsivebarheight);
            $("#wonderplugin-gridgallery-lightboxnotkeepratioonsmallheight").prop("checked", options.lightboxnotkeepratioonsmallheight);
            $("#wonderplugin-gridgallery-lightboxsmallscreenheight").val(options.lightboxsmallscreenheight);
            $("#wonderplugin-gridgallery-lightboxbarheightonsmallheight").val(options.lightboxbarheightonsmallheight);
            $("#wonderplugin-gridgallery-lightboxautoslide").prop("checked", wonderplugin_gridgallery_config.lightboxautoslide);
            $("#wonderplugin-gridgallery-lightboxshowtimer").prop("checked",
                wonderplugin_gridgallery_config.lightboxshowtimer);
            $("#wonderplugin-gridgallery-lightboxshowplaybutton").prop("checked", wonderplugin_gridgallery_config.lightboxshowplaybutton);
            $("#wonderplugin-gridgallery-lightboxalwaysshownavarrows").prop("checked", wonderplugin_gridgallery_config.lightboxalwaysshownavarrows);
            $("#wonderplugin-gridgallery-lightboxshowtitleprefix").prop("checked", wonderplugin_gridgallery_config.lightboxshowtitleprefix);
            $("#wonderplugin-gridgallery-lightboxslideinterval").val(wonderplugin_gridgallery_config.lightboxslideinterval);
            $("#wonderplugin-gridgallery-lightboxtimerposition").val(wonderplugin_gridgallery_config.lightboxtimerposition);
            $("#wonderplugin-gridgallery-lightboxtimerheight").val(wonderplugin_gridgallery_config.lightboxtimerheight);
            $("#wonderplugin-gridgallery-lightboxtimercolor").val(wonderplugin_gridgallery_config.lightboxtimercolor);
            $("#wonderplugin-gridgallery-lightboxtimeropacity").val(wonderplugin_gridgallery_config.lightboxtimeropacity);
            $("#wonderplugin-gridgallery-lightboxnavarrowspos").val(wonderplugin_gridgallery_config.lightboxnavarrowspos);
            $("#wonderplugin-gridgallery-lightboxbordersize").val(wonderplugin_gridgallery_config.lightboxbordersize);
            $("#wonderplugin-gridgallery-lightboxborderradius").val(wonderplugin_gridgallery_config.lightboxborderradius);
            $("#wonderplugin-gridgallery-lightboxbordertopmargin").val(wonderplugin_gridgallery_config.lightboxbordertopmargin);
            $("#wonderplugin-gridgallery-lightboxbordertopmarginsmall").val(wonderplugin_gridgallery_config.lightboxbordertopmarginsmall);
            $("#wonderplugin-gridgallery-lightboxenteranimation").val(wonderplugin_gridgallery_config.lightboxenteranimation);
            $("#wonderplugin-gridgallery-lightboxexitanimation").val(wonderplugin_gridgallery_config.lightboxexitanimation);
            applyLightboxnavarrowsposOptions(wonderplugin_gridgallery_config.lightboxnavarrowspos);
            $("#wonderplugin-gridgallery-lightboxresizespeed").val(wonderplugin_gridgallery_config.lightboxresizespeed);
            $("#wonderplugin-gridgallery-lightboxfadespeed").val(wonderplugin_gridgallery_config.lightboxfadespeed);
            $("#wonderplugin-gridgallery-lightboxtransition").val(wonderplugin_gridgallery_config.lightboxtransition);
            $("#wonderplugin-gridgallery-lightboxtransitionduration").val(wonderplugin_gridgallery_config.lightboxtransitionduration);
            $("#wonderplugin-gridgallery-lightboxaddsocialmedia").prop("checked", wonderplugin_gridgallery_config.lightboxaddsocialmedia);
            $("#wonderplugin-gridgallery-lightboxshowsocial").prop("checked", wonderplugin_gridgallery_config.lightboxshowsocial);
            $("#wonderplugin-gridgallery-lightboxsocialposition").val(wonderplugin_gridgallery_config.lightboxsocialposition);
            $("#wonderplugin-gridgallery-lightboxsocialpositionsmallscreen").val(wonderplugin_gridgallery_config.lightboxsocialpositionsmallscreen);
            $("#wonderplugin-gridgallery-lightboxsocialdirection").val(wonderplugin_gridgallery_config.lightboxsocialdirection);
            $("#wonderplugin-gridgallery-lightboxsocialbuttonsize").val(wonderplugin_gridgallery_config.lightboxsocialbuttonsize);
            $("#wonderplugin-gridgallery-lightboxsocialbuttonfontsize").val(wonderplugin_gridgallery_config.lightboxsocialbuttonfontsize);
            $("#wonderplugin-gridgallery-lightboxsocialrotateeffect").prop("checked", wonderplugin_gridgallery_config.lightboxsocialrotateeffect);
            $("#wonderplugin-gridgallery-lightboxshowemail").prop("checked",
                wonderplugin_gridgallery_config.lightboxshowemail);
            $("#wonderplugin-gridgallery-lightboxshowfacebook").prop("checked", wonderplugin_gridgallery_config.lightboxshowfacebook);
            $("#wonderplugin-gridgallery-lightboxshowtwitter").prop("checked", wonderplugin_gridgallery_config.lightboxshowtwitter);
            $("#wonderplugin-gridgallery-lightboxshowpinterest").prop("checked", wonderplugin_gridgallery_config.lightboxshowpinterest);
            $("#wonderplugin-gridgallery-lightboxshowdownload").prop("checked", wonderplugin_gridgallery_config.lightboxshowdownload);
            $("#wonderplugin-gridgallery-lightboxenableaudio").prop("checked", wonderplugin_gridgallery_config.lightboxenableaudio);
            $("#wonderplugin-gridgallery-lightboxaudiofile").val(wonderplugin_gridgallery_config.lightboxaudiofile);
            $("#wonderplugin-gridgallery-lightboxaudioautoplay").prop("checked", wonderplugin_gridgallery_config.lightboxaudioautoplay);
            $("#wonderplugin-gridgallery-lightboxaudioloop").prop("checked", wonderplugin_gridgallery_config.lightboxaudioloop);
            $("#wonderplugin-gridgallery-lightboxaudioshowonhover").prop("checked",
                wonderplugin_gridgallery_config.lightboxaudioshowonhover);
            $("#wonderplugin-gridgallery-thumbwidth").val(options.thumbwidth);
            $("#wonderplugin-gridgallery-thumbheight").val(options.thumbheight);
            $("#wonderplugin-gridgallery-thumbtopmargin").val(options.thumbtopmargin);
            $("#wonderplugin-gridgallery-thumbbottommargin").val(options.thumbbottommargin);
            $("#wonderplugin-gridgallery-barheight").val(options.barheight);
            $("#wonderplugin-gridgallery-titlebottomcss").val(options.titlebottomcss);
            $("#wonderplugin-gridgallery-descriptionbottomcss").val(options.descriptionbottomcss);
            $("#wonderplugin-gridgallery-lazyloadmode").val(options.lazyloadmode);
            $("#wonderplugin-gridgallery-itemsperpage").val(options.itemsperpage);
            $("#wonderplugin-gridgallery-loadmorecaption").val(options.loadmorecaption);
            $("#wonderplugin-gridgallery-loadmorecssstyle").val(options.loadmorecssstyle);
            $("#wonderplugin-gridgallery-loadmorecss").val(options.loadmorecss);
            $("#wonderplugin-gridgallery-paginationcssstyle").val(options.paginationcssstyle);
            $("#wonderplugin-gridgallery-paginationcss").val(options.paginationcss);
            $("#wonderplugin-gridgallery-paginationpos").val(options.paginationpos);
            $("#wonderplugin-gridgallery-lazyloadimages").prop("checked", options.lazyloadimages);
            $("#wonderplugin-gridgallery-loadallremaining").prop("checked", options.loadallremaining);
            $("#wonderplugin-gridgallery-donotzoomin").prop("checked", options.donotzoomin);
            $("#wonderplugin-gridgallery-supportshortcode").prop("checked", options.supportshortcode);
            $("#wonderplugin-gridgallery-fullwidth").prop("checked", options.fullwidth);
            $("#wonderplugin-gridgallery-fullwidthsamegrid").prop("checked",
                options.fullwidthsamegrid);
            $("#wonderplugin-gridgallery-aextraprops").val(options.aextraprops);
            $("#wonderplugin-gridgallery-imgextraprops").val(options.imgextraprops);
            $("#wonderplugin-gridgallery-taglinkextraprops").val(options.taglinkextraprops);
            $("#wonderplugin-gridgallery-nameseparator").val(options.nameseparator);
            printSkinOptions(options);
            printStyleOptions(options);
            printCategoryStyleOptions(options)
        };
        $("input:radio[name=wonderplugin-gridgallery-skin]").click(function () {
            if ($(this).val() == wonderplugin_gridgallery_config.skin) return;
            $(".wonderplugin-tab-skin").find("img").removeClass("selected");
            $("input:radio[name=wonderplugin-gridgallery-skin]:checked").parent().find("img").addClass("selected");
            wonderplugin_gridgallery_config.skin = $(this).val();
            printSkinOptions(defaultSkinOptions[$(this).val()])
        });
        $("input:radio[name=wonderplugin-gridgallery-style]").click(function () {
            if ($(this).val() == wonderplugin_gridgallery_config.style) return;
            $(".wonderplugin-tab-style").find("img").removeClass("selected");
            $("input:radio[name=wonderplugin-gridgallery-style]:checked").parent().find("img").addClass("selected");
            wonderplugin_gridgallery_config.style = $(this).val();
            printStyleOptions(defaultStyleOptions[$(this).val()])
        });
        $("#wonderplugin-gridgallery-categorystyle").change(function () {
            if ($(this).val() == wonderplugin_gridgallery_config.categorystyle) return;
            wonderplugin_gridgallery_config.categorystyle = $(this).val();
            printCategoryStyleOptions(defaultCategoryStyleOptions[$(this).val()]);
            var ismenu = wonderplugin_gridgallery_config.categorystyle && (wonderplugin_gridgallery_config.categorystyle.match("dropdownmenu$") ||
                wonderplugin_gridgallery_config.categorystyle.match("regular-dropdown$"));
            $(".wonderplugin-gridgallery-category-dropdownmenu-options").css({
                display: ismenu ? "block" : "none"
            })
        });
        $("#wonderplugin-gridgallery-loadmorecssstyle").change(function () {
            if ($(this).val() == wonderplugin_gridgallery_config.loadmorecssstyle) return;
            wonderplugin_gridgallery_config.loadmorecssstyle = $(this).val();
            $("#wonderplugin-gridgallery-loadmorecss").val(WONDERPLUGIN_GRIDGALLERY_LOADMORE_STYLE[wonderplugin_gridgallery_config.loadmorecssstyle])
        });
        $("#wonderplugin-gridgallery-paginationcssstyle").change(function () {
            if ($(this).val() == wonderplugin_gridgallery_config.paginationcssstyle) return;
            wonderplugin_gridgallery_config.paginationcssstyle = $(this).val();
            $("#wonderplugin-gridgallery-paginationcss").val(WONDERPLUGIN_GRIDGALLERY_PAGINATION_STYLE[wonderplugin_gridgallery_config.paginationcssstyle])
        });
        $(".wonderplugin-gridgallery-options-menu-item").each(function (index) {
            $(this).click(function () {
                if ($(this).hasClass("wonderplugin-gridgallery-options-menu-item-selected")) return;
                $(".wonderplugin-gridgallery-options-menu-item").removeClass("wonderplugin-gridgallery-options-menu-item-selected");
                $(this).addClass("wonderplugin-gridgallery-options-menu-item-selected");
                $(".wonderplugin-gridgallery-options-tab").removeClass("wonderplugin-gridgallery-options-tab-selected");
                $(".wonderplugin-gridgallery-options-tab").eq(index).addClass("wonderplugin-gridgallery-options-tab-selected")
            })
        });
        var updateGridgalleryOptions = function () {
            wonderplugin_gridgallery_config.catlangs = $.trim($("#wonderplugin-gridgallery-category-langs").text());
            var catcaptionlangs = {};
            try {
                catcaptionlangs = JSON.parse($("#wonderplugin-gridgallery-categorymenucaption-langs").text())
            } catch (err) {}
            var defaultlang = $("#wonderplugin-gridgallery-defaultlang").text();
            if (catcaptionlangs) {
                for (var key in catcaptionlangs)
                    if (key == defaultlang) catcaptionlangs[key] = $("#wonderplugin-gridgallery-categorymenucaption").val();
                wonderplugin_gridgallery_config.catcaptionlangs = JSON.stringify(catcaptionlangs)
            }
            wonderplugin_gridgallery_config.newestfirst = $("#wonderplugin-newestfirst").is(":checked");
            wonderplugin_gridgallery_config.name = $.trim($("#wonderplugin-gridgallery-name").val());
            wonderplugin_gridgallery_config.skin = $("input:radio[name=wonderplugin-gridgallery-skin]:checked").val();
            wonderplugin_gridgallery_config.style = $("input:radio[name=wonderplugin-gridgallery-style]:checked").val();
            wonderplugin_gridgallery_config.width = parseInt($.trim($("#wonderplugin-gridgallery-width").val()));
            wonderplugin_gridgallery_config.height = parseInt($.trim($("#wonderplugin-gridgallery-height").val()));
            wonderplugin_gridgallery_config.googleanalyticsaccount =
                $.trim($("#wonderplugin-gridgallery-googleanalyticsaccount").val());
            wonderplugin_gridgallery_config.gap = parseInt($.trim($("#wonderplugin-gridgallery-gap").val()));
            wonderplugin_gridgallery_config.margin = parseInt($.trim($("#wonderplugin-gridgallery-margin").val()));
            wonderplugin_gridgallery_config.borderradius = parseInt($.trim($("#wonderplugin-gridgallery-borderradius").val()));
            wonderplugin_gridgallery_config.deferloading = $("#wonderplugin-gridgallery-deferloading").is(":checked");
            wonderplugin_gridgallery_config.deferloadingdelay =
                parseInt($.trim($("#wonderplugin-gridgallery-deferloadingdelay").val()));
            wonderplugin_gridgallery_config.nohoverontouchscreen = $("#wonderplugin-gridgallery-nohoverontouchscreen").is(":checked");
            wonderplugin_gridgallery_config.hoverzoomin = $("#wonderplugin-gridgallery-hoverzoomin").is(":checked");
            wonderplugin_gridgallery_config.hoverzoominimageonly = $("#wonderplugin-gridgallery-hoverzoominimageonly").is(":checked");
            wonderplugin_gridgallery_config.hoverzoominimagecenter = $("#wonderplugin-gridgallery-hoverzoominimagecenter").is(":checked");
            wonderplugin_gridgallery_config.hoverzoominvalue = parseInt($.trim($("#wonderplugin-gridgallery-hoverzoominvalue").val()));
            wonderplugin_gridgallery_config.hoverzoominduration = parseInt($.trim($("#wonderplugin-gridgallery-hoverzoominduration").val()));
            wonderplugin_gridgallery_config.hoverzoominimagescale = parseFloat($.trim($("#wonderplugin-gridgallery-hoverzoominimagescale").val()));
            wonderplugin_gridgallery_config.hoverzoominimageduration = parseInt($.trim($("#wonderplugin-gridgallery-hoverzoominimageduration").val()));
            wonderplugin_gridgallery_config.hoverfade = $("#wonderplugin-gridgallery-hoverfade").is(":checked");
            wonderplugin_gridgallery_config.hoverfadeopacity = parseFloat($.trim($("#wonderplugin-gridgallery-hoverfadeopacity").val()));
            wonderplugin_gridgallery_config.hoverfadeduration = parseInt($.trim($("#wonderplugin-gridgallery-hoverfadeduration").val()));
            wonderplugin_gridgallery_config.addvideoplaybutton = $("#wonderplugin-gridgallery-addvideoplaybutton").is(":checked");
            wonderplugin_gridgallery_config.videoplaybuttonmode =
                $("input[name=wonderplugin-gridgallery-videoplaybuttonmode]:checked").val();
            if (wonderplugin_gridgallery_config.videoplaybuttonmode == "custom") wonderplugin_gridgallery_config.videoplaybutton = $.trim($("#wonderplugin-gridgallery-customvideoplaybutton").val());
            else wonderplugin_gridgallery_config.videoplaybutton = $.trim($("#wonderplugin-gridgallery-videoplaybutton").val());
            wonderplugin_gridgallery_config.random = $("#wonderplugin-gridgallery-random").is(":checked");
            wonderplugin_gridgallery_config.centerimage =
                $("#wonderplugin-gridgallery-centerimage").is(":checked");
            wonderplugin_gridgallery_config.circularimage = $("#wonderplugin-gridgallery-circularimage").is(":checked");
            wonderplugin_gridgallery_config.firstimage = $("#wonderplugin-gridgallery-firstimage").is(":checked");
            wonderplugin_gridgallery_config.enabletabindex = $("#wonderplugin-gridgallery-enabletabindex").is(":checked");
            wonderplugin_gridgallery_config.masonrymode = $("#wonderplugin-gridgallery-masonrymode").is(":checked");
            wonderplugin_gridgallery_config.justifymode =
                $("#wonderplugin-gridgallery-justifymode").is(":checked");
            wonderplugin_gridgallery_config.donotjustifylastrowifoverlimit = $("#wonderplugin-gridgallery-donotjustifylastrowifoverlimit").is(":checked");
            wonderplugin_gridgallery_config.donotjustifyifonlyonerowandoverlimit = $("#wonderplugin-gridgallery-donotjustifyifonlyonerowandoverlimit").is(":checked");
            wonderplugin_gridgallery_config.limitjustifymaxheight = $("#wonderplugin-gridgallery-limitjustifymaxheight").is(":checked");
            wonderplugin_gridgallery_config.justifymaxheight =
                parseInt($.trim($("#wonderplugin-gridgallery-justifymaxheight").val()));
            wonderplugin_gridgallery_config.scalemode = $("#wonderplugin-gridgallery-scalemode").val();
            wonderplugin_gridgallery_config.showtitle = $("#wonderplugin-gridgallery-showtitle").is(":checked");
            wonderplugin_gridgallery_config.showtexttitle = $("#wonderplugin-gridgallery-showtexttitle").is(":checked");
            wonderplugin_gridgallery_config.showtextdescription = $("#wonderplugin-gridgallery-showtextdescription").is(":checked");
            wonderplugin_gridgallery_config.showtextbutton =
                $("#wonderplugin-gridgallery-showtextbutton").is(":checked");
            wonderplugin_gridgallery_config.overlaylink = $("#wonderplugin-gridgallery-overlaylink").is(":checked");
            wonderplugin_gridgallery_config.donotaddtext = $("#wonderplugin-gridgallery-donotaddtext").is(":checked");
            wonderplugin_gridgallery_config.titlemode = $("#wonderplugin-gridgallery-titlemode").val();
            wonderplugin_gridgallery_config.titleeffect = $("#wonderplugin-gridgallery-titleeffect").val();
            wonderplugin_gridgallery_config.titleeffectduration =
                parseInt($.trim($("#wonderplugin-gridgallery-titleeffectduration").val()));
            wonderplugin_gridgallery_config.titleheight = parseInt($.trim($("#wonderplugin-gridgallery-titleheight").val()));
            wonderplugin_gridgallery_config.imgwidthpercent = parseInt($.trim($("#wonderplugin-gridgallery-imgwidthpercent").val()));
            wonderplugin_gridgallery_config.mediumimgwidthpercent = parseInt($.trim($("#wonderplugin-gridgallery-mediumimgwidthpercent").val()));
            wonderplugin_gridgallery_config.smallimgwidthpercent = parseInt($.trim($("#wonderplugin-gridgallery-smallimgwidthpercent").val()));
            wonderplugin_gridgallery_config.imgheightpercent = parseInt($.trim($("#wonderplugin-gridgallery-imgheightpercent").val()));
            wonderplugin_gridgallery_config.mediumimgheightpercent = parseInt($.trim($("#wonderplugin-gridgallery-mediumimgheightpercent").val()));
            wonderplugin_gridgallery_config.smallimgheightpercent = parseInt($.trim($("#wonderplugin-gridgallery-smallimgheightpercent").val()));
            wonderplugin_gridgallery_config.applylinktotext = $("#wonderplugin-gridgallery-applylinktotext").is(":checked");
            wonderplugin_gridgallery_config.usetemplatefortextoverlay =
                $("input[name=wonderplugin-gridgallery-usetemplatefortextoverlay]:checked").val() == 1;
            wonderplugin_gridgallery_config.templatefortextoverlay = $.trim($("#wonderplugin-gridgallery-templatefortextoverlay").val());
            wonderplugin_gridgallery_config.usetemplateforgrid = $("#wonderplugin-gridgallery-usetemplateforgrid").is(":checked");
            wonderplugin_gridgallery_config.templateforgrid = $.trim($("#wonderplugin-gridgallery-templateforgrid").val());
            wonderplugin_gridgallery_config.categoryshow = $("#wonderplugin-gridgallery-categoryshow").is(":checked");
            wonderplugin_gridgallery_config.categoryhideall = $("#wonderplugin-gridgallery-categoryhideall").is(":checked");
            wonderplugin_gridgallery_config.categorymulticat = $("#wonderplugin-gridgallery-categorymulticat").is(":checked");
            wonderplugin_gridgallery_config.categorymulticatand = $("#wonderplugin-gridgallery-categorymulticatand").is(":checked");
            wonderplugin_gridgallery_config.categoryatleastone = $("#wonderplugin-gridgallery-categoryatleastone").is(":checked");
            wonderplugin_gridgallery_config.categoryposition =
                $("#wonderplugin-gridgallery-categoryposition").val();
            wonderplugin_gridgallery_config.categorystyle = $("#wonderplugin-gridgallery-categorystyle").val();
            wonderplugin_gridgallery_config.categorydefault = $("#wonderplugin-gridgallery-categorydefault").val();
            wonderplugin_gridgallery_config.verticalcategorysmallscreenwidth = parseInt($.trim($("#wonderplugin-gridgallery-verticalcategorysmallscreenwidth").val()));
            wonderplugin_gridgallery_config.categorycss = $.trim($("#wonderplugin-gridgallery-categorycss").val());
            wonderplugin_gridgallery_config.categorymenucaption = $.trim($("#wonderplugin-gridgallery-categorymenucaption").val());
            wonderplugin_gridgallery_config.lazyloadmode = $("#wonderplugin-gridgallery-lazyloadmode").val();
            wonderplugin_gridgallery_config.itemsperpage = parseInt($.trim($("#wonderplugin-gridgallery-itemsperpage").val()));
            wonderplugin_gridgallery_config.loadmorecaption = $.trim($("#wonderplugin-gridgallery-loadmorecaption").val());
            wonderplugin_gridgallery_config.loadmorecssstyle = $("#wonderplugin-gridgallery-loadmorecssstyle").val();
            wonderplugin_gridgallery_config.loadmorecss = $.trim($("#wonderplugin-gridgallery-loadmorecss").val());
            wonderplugin_gridgallery_config.paginationcssstyle = $("#wonderplugin-gridgallery-paginationcssstyle").val();
            wonderplugin_gridgallery_config.paginationcss = $.trim($("#wonderplugin-gridgallery-paginationcss").val());
            wonderplugin_gridgallery_config.paginationpos = $("#wonderplugin-gridgallery-paginationpos").val();
            wonderplugin_gridgallery_config.lazyloadimages = $("#wonderplugin-gridgallery-lazyloadimages").is(":checked");
            wonderplugin_gridgallery_config.loadallremaining = $("#wonderplugin-gridgallery-loadallremaining").is(":checked");
            wonderplugin_gridgallery_config.responsive = $("#wonderplugin-gridgallery-responsive").is(":checked");
            wonderplugin_gridgallery_config.donotzoomin = $("#wonderplugin-gridgallery-donotzoomin").is(":checked");
            wonderplugin_gridgallery_config.supportshortcode = $("#wonderplugin-gridgallery-supportshortcode").is(":checked");
            wonderplugin_gridgallery_config.fullwidth = $("#wonderplugin-gridgallery-fullwidth").is(":checked");
            wonderplugin_gridgallery_config.fullwidthsamegrid = $("#wonderplugin-gridgallery-fullwidthsamegrid").is(":checked");
            wonderplugin_gridgallery_config.column = parseInt($.trim($("#wonderplugin-gridgallery-column").val()));
            wonderplugin_gridgallery_config.gridtemplate = $.trim($("#wonderplugin-gridgallery-gridtemplate").val()).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            wonderplugin_gridgallery_config.mediumgridsize = $("#wonderplugin-gridgallery-mediumgridsize").is(":checked");
            wonderplugin_gridgallery_config.mediumwidth =
                parseInt($.trim($("#wonderplugin-gridgallery-mediumwidth").val()));
            wonderplugin_gridgallery_config.mediumheight = parseInt($.trim($("#wonderplugin-gridgallery-mediumheight").val()));
            wonderplugin_gridgallery_config.smallgridsize = $("#wonderplugin-gridgallery-smallgridsize").is(":checked");
            wonderplugin_gridgallery_config.smallwidth = parseInt($.trim($("#wonderplugin-gridgallery-smallwidth").val()));
            wonderplugin_gridgallery_config.smallheight = parseInt($.trim($("#wonderplugin-gridgallery-smallheight").val()));
            wonderplugin_gridgallery_config.mediumcolumn = parseInt($.trim($("#wonderplugin-gridgallery-mediumcolumn").val()));
            wonderplugin_gridgallery_config.mediumscreen = $("#wonderplugin-gridgallery-mediumscreen").is(":checked");
            wonderplugin_gridgallery_config.mediumscreensize = parseInt($.trim($("#wonderplugin-gridgallery-mediumscreensize").val()));
            wonderplugin_gridgallery_config.smallcolumn = parseInt($.trim($("#wonderplugin-gridgallery-smallcolumn").val()));
            wonderplugin_gridgallery_config.smallscreen = $("#wonderplugin-gridgallery-smallscreen").is(":checked");
            wonderplugin_gridgallery_config.smallscreensize = parseInt($.trim($("#wonderplugin-gridgallery-smallscreensize").val()));
            wonderplugin_gridgallery_config.skincss = $.trim($("#wonderplugin-gridgallery-skincss").val());
            wonderplugin_gridgallery_config.donotinit = $("#wonderplugin-gridgallery-donotinit").is(":checked");
            wonderplugin_gridgallery_config.addinitscript = $("#wonderplugin-gridgallery-addinitscript").is(":checked");
            wonderplugin_gridgallery_config.triggerresize = $("#wonderplugin-gridgallery-triggerresize").is(":checked");
            wonderplugin_gridgallery_config.triggerresizedelay = parseInt($.trim($("#wonderplugin-gridgallery-triggerresizedelay").val()));
            wonderplugin_gridgallery_config.triggerresizeafterinit = $("#wonderplugin-gridgallery-triggerresizeafterinit").is(":checked");
            wonderplugin_gridgallery_config.triggerresizeafterinitdelay = parseInt($.trim($("#wonderplugin-gridgallery-triggerresizeafterinitdelay").val()));
            wonderplugin_gridgallery_config.removeinlinecss = $("#wonderplugin-gridgallery-removeinlinecss").is(":checked");
            wonderplugin_gridgallery_config.aextraprops = $.trim($("#wonderplugin-gridgallery-aextraprops").val());
            wonderplugin_gridgallery_config.imgextraprops = $.trim($("#wonderplugin-gridgallery-imgextraprops").val());
            wonderplugin_gridgallery_config.taglinkextraprops = $.trim($("#wonderplugin-gridgallery-taglinkextraprops").val());
            wonderplugin_gridgallery_config.nameseparator = $("#wonderplugin-gridgallery-nameseparator").val();
            wonderplugin_gridgallery_config.customcss = $.trim($("#wonderplugin-gridgallery-custom-css").val());
            wonderplugin_gridgallery_config.dataoptions = $.trim($("#wonderplugin-gridgallery-data-options").val());
            wonderplugin_gridgallery_config.customjs = $.trim($("#wonderplugin-gridgallery-customjs").val());
            wonderplugin_gridgallery_config.shownavigation = $("#wonderplugin-gridgallery-shownavigation").is(":checked");
            wonderplugin_gridgallery_config.thumbwidth = parseInt($.trim($("#wonderplugin-gridgallery-thumbwidth").val()));
            wonderplugin_gridgallery_config.thumbheight = parseInt($.trim($("#wonderplugin-gridgallery-thumbheight").val()));
            wonderplugin_gridgallery_config.thumbtopmargin = parseInt($.trim($("#wonderplugin-gridgallery-thumbtopmargin").val()));
            wonderplugin_gridgallery_config.thumbbottommargin = parseInt($.trim($("#wonderplugin-gridgallery-thumbbottommargin").val()));
            wonderplugin_gridgallery_config.barheight = parseInt($.trim($("#wonderplugin-gridgallery-barheight").val()));
            wonderplugin_gridgallery_config.shownavcontrol = $("#wonderplugin-gridgallery-shownavcontrol").is(":checked");
            wonderplugin_gridgallery_config.hidenavdefault =
                $("#wonderplugin-gridgallery-hidenavdefault").is(":checked");
            wonderplugin_gridgallery_config.navbgcolor = $.trim($("#wonderplugin-gridgallery-navbgcolor").val());
            wonderplugin_gridgallery_config.lightboxnogroup = $("#wonderplugin-gridgallery-lightboxnogroup").is(":checked");
            wonderplugin_gridgallery_config.lightboxcategorygroup = $("#wonderplugin-gridgallery-lightboxcategorygroup").is(":checked");
            wonderplugin_gridgallery_config.lightboxresponsive = $("#wonderplugin-gridgallery-lightboxresponsive").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowallcategories = $("#wonderplugin-gridgallery-lightboxshowallcategories").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowtitle = $("#wonderplugin-gridgallery-lightboxshowtitle").is(":checked");
            wonderplugin_gridgallery_config.titlebottomcss = $.trim($("#wonderplugin-gridgallery-titlebottomcss").val());
            wonderplugin_gridgallery_config.lightboxshowdescription = $("#wonderplugin-gridgallery-lightboxshowdescription").is(":checked");
            wonderplugin_gridgallery_config.descriptionbottomcss =
                $.trim($("#wonderplugin-gridgallery-descriptionbottomcss").val());
            wonderplugin_gridgallery_config.lightboxbgcolor = $.trim($("#wonderplugin-gridgallery-lightboxbgcolor").val());
            wonderplugin_gridgallery_config.lightboxoverlaybgcolor = $.trim($("#wonderplugin-gridgallery-lightboxoverlaybgcolor").val());
            wonderplugin_gridgallery_config.lightboxoverlayopacity = parseFloat($.trim($("#wonderplugin-gridgallery-lightboxoverlayopacity").val()));
            wonderplugin_gridgallery_config.lightboxvideohidecontrols = $("#wonderplugin-gridgallery-lightboxvideohidecontrols").is(":checked");
            wonderplugin_gridgallery_config.lightboxenablehtml5poster = $("#wonderplugin-gridgallery-lightboxenablehtml5poster").is(":checked");
            wonderplugin_gridgallery_config.lightboxfullscreenmode = $("#wonderplugin-gridgallery-lightboxfullscreenmode").is(":checked");
            wonderplugin_gridgallery_config.lightboxcloseonoverlay = $("#wonderplugin-gridgallery-lightboxcloseonoverlay").is(":checked");
            wonderplugin_gridgallery_config.lightboxtitlestyle = $.trim($("#wonderplugin-gridgallery-lightboxtitlestyle").val());
            wonderplugin_gridgallery_config.lightboxdefaultvideovolume =
                parseFloat($.trim($("#wonderplugin-gridgallery-lightboxdefaultvideovolume").val()));
            wonderplugin_gridgallery_config.lightboximagepercentage = parseInt($.trim($("#wonderplugin-gridgallery-lightboximagepercentage").val()));
            wonderplugin_gridgallery_config.lightboxtitleprefix = $("#wonderplugin-gridgallery-lightboxtitleprefix").val();
            wonderplugin_gridgallery_config.lightboxtitleinsidecss = $.trim($("#wonderplugin-gridgallery-lightboxtitleinsidecss").val());
            wonderplugin_gridgallery_config.lightboxdescriptioninsidecss =
                $.trim($("#wonderplugin-gridgallery-lightboxdescriptioninsidecss").val());
            wonderplugin_gridgallery_config.lightboxadvancedoptions = $.trim($("#wonderplugin-gridgallery-lightboxadvancedoptions").val());
            wonderplugin_gridgallery_config.lightboxfullscreentitlebottomcss = $.trim($("#wonderplugin-gridgallery-lightboxfullscreentitlebottomcss").val());
            wonderplugin_gridgallery_config.lightboxfullscreendescriptionbottomcss = $.trim($("#wonderplugin-gridgallery-lightboxfullscreendescriptionbottomcss").val());
            wonderplugin_gridgallery_config.lightboxfullscreenmodeonsmallscreen =
                $("#wonderplugin-gridgallery-lightboxfullscreenmodeonsmallscreen").is(":checked");
            wonderplugin_gridgallery_config.lightboxfullscreensmallscreenwidth = parseInt($.trim($("#wonderplugin-gridgallery-lightboxfullscreensmallscreenwidth").val()));
            wonderplugin_gridgallery_config.lightboxfullscreentextinside = $("#wonderplugin-gridgallery-lightboxfullscreentextinside").is(":checked");
            wonderplugin_gridgallery_config.lightboxfullscreentextoutside = $("#wonderplugin-gridgallery-lightboxfullscreentextoutside").is(":checked");
            wonderplugin_gridgallery_config.lightboxresponsivebarheight = $("#wonderplugin-gridgallery-lightboxresponsivebarheight").is(":checked");
            wonderplugin_gridgallery_config.lightboxnotkeepratioonsmallheight = $("#wonderplugin-gridgallery-lightboxnotkeepratioonsmallheight").is(":checked");
            wonderplugin_gridgallery_config.lightboxsmallscreenheight = parseInt($.trim($("#wonderplugin-gridgallery-lightboxsmallscreenheight").val()));
            wonderplugin_gridgallery_config.lightboxbarheightonsmallheight = parseInt($.trim($("#wonderplugin-gridgallery-lightboxbarheightonsmallheight").val()));
            wonderplugin_gridgallery_config.lightboxaddsocialmedia = $("#wonderplugin-gridgallery-lightboxaddsocialmedia").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowsocial = $("#wonderplugin-gridgallery-lightboxshowsocial").is(":checked");
            wonderplugin_gridgallery_config.lightboxsocialposition = $.trim($("#wonderplugin-gridgallery-lightboxsocialposition").val());
            wonderplugin_gridgallery_config.lightboxsocialpositionsmallscreen = $.trim($("#wonderplugin-gridgallery-lightboxsocialpositionsmallscreen").val());
            wonderplugin_gridgallery_config.lightboxsocialdirection = $.trim($("#wonderplugin-gridgallery-lightboxsocialdirection").val());
            wonderplugin_gridgallery_config.lightboxsocialbuttonsize = parseInt($.trim($("#wonderplugin-gridgallery-lightboxsocialbuttonsize").val()));
            wonderplugin_gridgallery_config.lightboxsocialbuttonfontsize = parseInt($.trim($("#wonderplugin-gridgallery-lightboxsocialbuttonfontsize").val()));
            wonderplugin_gridgallery_config.lightboxsocialrotateeffect = $("#wonderplugin-gridgallery-lightboxsocialrotateeffect").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowemail = $("#wonderplugin-gridgallery-lightboxshowemail").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowfacebook = $("#wonderplugin-gridgallery-lightboxshowfacebook").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowtwitter = $("#wonderplugin-gridgallery-lightboxshowtwitter").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowpinterest = $("#wonderplugin-gridgallery-lightboxshowpinterest").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowdownload =
                $("#wonderplugin-gridgallery-lightboxshowdownload").is(":checked");
            wonderplugin_gridgallery_config.lightboxenableaudio = $("#wonderplugin-gridgallery-lightboxenableaudio").is(":checked");
            wonderplugin_gridgallery_config.lightboxaudiofile = $.trim($("#wonderplugin-gridgallery-lightboxaudiofile").val());
            wonderplugin_gridgallery_config.lightboxaudioautoplay = $("#wonderplugin-gridgallery-lightboxaudioautoplay").is(":checked");
            wonderplugin_gridgallery_config.lightboxaudioloop = $("#wonderplugin-gridgallery-lightboxaudioloop").is(":checked");
            wonderplugin_gridgallery_config.lightboxaudioshowonhover = $("#wonderplugin-gridgallery-lightboxaudioshowonhover").is(":checked");
            wonderplugin_gridgallery_config.lightboxautoslide = $("#wonderplugin-gridgallery-lightboxautoslide").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowtimer = $("#wonderplugin-gridgallery-lightboxshowtimer").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowplaybutton = $("#wonderplugin-gridgallery-lightboxshowplaybutton").is(":checked");
            wonderplugin_gridgallery_config.lightboxalwaysshownavarrows =
                $("#wonderplugin-gridgallery-lightboxalwaysshownavarrows").is(":checked");
            wonderplugin_gridgallery_config.lightboxshowtitleprefix = $("#wonderplugin-gridgallery-lightboxshowtitleprefix").is(":checked");
            wonderplugin_gridgallery_config.lightboxslideinterval = parseInt($.trim($("#wonderplugin-gridgallery-lightboxslideinterval").val()));
            wonderplugin_gridgallery_config.lightboxtimerheight = parseInt($.trim($("#wonderplugin-gridgallery-lightboxtimerheight").val()));
            wonderplugin_gridgallery_config.lightboxbordersize =
                parseInt($.trim($("#wonderplugin-gridgallery-lightboxbordersize").val()));
            wonderplugin_gridgallery_config.lightboxborderradius = parseInt($.trim($("#wonderplugin-gridgallery-lightboxborderradius").val()));
            wonderplugin_gridgallery_config.lightboxbordertopmargin = parseInt($.trim($("#wonderplugin-gridgallery-lightboxbordertopmargin").val()));
            wonderplugin_gridgallery_config.lightboxbordertopmarginsmall = parseInt($.trim($("#wonderplugin-gridgallery-lightboxbordertopmarginsmall").val()));
            wonderplugin_gridgallery_config.lightboxtimeropacity =
                parseFloat($.trim($("#wonderplugin-gridgallery-lightboxtimeropacity").val()));
            wonderplugin_gridgallery_config.lightboxtimerposition = $.trim($("#wonderplugin-gridgallery-lightboxtimerposition").val());
            wonderplugin_gridgallery_config.lightboxtimercolor = $.trim($("#wonderplugin-gridgallery-lightboxtimercolor").val());
            wonderplugin_gridgallery_config.lightboxnavarrowspos = $.trim($("#wonderplugin-gridgallery-lightboxnavarrowspos").val());
            wonderplugin_gridgallery_config.lightboxenteranimation = $.trim($("#wonderplugin-gridgallery-lightboxenteranimation").val());
            wonderplugin_gridgallery_config.lightboxexitanimation = $.trim($("#wonderplugin-gridgallery-lightboxexitanimation").val());
            wonderplugin_gridgallery_config.lightboxresizespeed = parseInt($.trim($("#wonderplugin-gridgallery-lightboxresizespeed").val()));
            wonderplugin_gridgallery_config.lightboxfadespeed = parseInt($.trim($("#wonderplugin-gridgallery-lightboxfadespeed").val()));
            wonderplugin_gridgallery_config.lightboxtransition = $.trim($("#wonderplugin-gridgallery-lightboxtransition").val());
            wonderplugin_gridgallery_config.lightboxtransitionduration =
                parseInt($.trim($("#wonderplugin-gridgallery-lightboxtransitionduration").val()));
            for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
                if (wonderplugin_gridgallery_config.slides[i].type == 1 || wonderplugin_gridgallery_config.slides[i].type == 2 || wonderplugin_gridgallery_config.slides[i].type == 3 || wonderplugin_gridgallery_config.slides[i].type == 4 || wonderplugin_gridgallery_config.slides[i].type == 5) wonderplugin_gridgallery_config.slides[i].lightbox = true
        };
        var gen_categories = function (categorylist,
            categoryposition, categorystyle, categorydefault, categoryhideall, categorymenucaption) {
            var categorys = {};
            try {
                categorys = JSON.parse(categorylist)
            } catch (err) {}
            var categoryregulardropdown = categorystyle && categorystyle.match("regular-dropdown$");
            if (categoryregulardropdown) {
                var code = '<div class="wonderplugin-gridgallery-tags wonderplugin-gridgallery-tags-' + categoryposition + ' wpp-category-regular-dropdown">';
                code += '<label><span class="wonderplugin-gridgallery-tag-dropdown-caption">' + categorymenucaption + '</span><select class="wonderplugin-gridgallery-tag-dropdown">';
                for (var i in categorys) {
                    if (categoryhideall && categorys[i].slug == "all") continue;
                    code += '<option value="' + categorys[i].slug + '">' + categorys[i].caption + "</option>"
                }
                code += "</select></label>";
                code += "</div>"
            } else {
                var ismenu = categorystyle && categorystyle.match("dropdownmenu$");
                var code = '<div class="wonderplugin-gridgallery-tags wonderplugin-gridgallery-tags-' + categoryposition + " " + categorystyle + '">';
                if (ismenu) {
                    code += '<div class="wonderplugin-gridgallery-selectcategory">' + categorymenucaption + "</div>";
                    code += '<div class="wonderplugin-gridgallery-menu">'
                }
                for (var i in categorys) {
                    if (categoryhideall &&
                        categorys[i].slug == "all") continue;
                    code += '<div class="wonderplugin-gridgallery-tag" data-slug="' + categorys[i].slug + '">' + categorys[i].caption + "</div>"
                }
                if (ismenu) code += "</div>";
                code += "</div>"
            }
            return code
        };
        var generate_button_code = function (slidelist, i, gridgalleryid, socialmedia) {
            var button_code = "";
            if (slidelist[i].button && slidelist[i].button.length > 0) {
                if (slidelist[i].buttonlightbox) {
                    button_code += "<a";
                    if (wonderplugin_gridgallery_config.aextraprops) button_code += " " + wonderplugin_gridgallery_config.aextraprops;
                    button_code += ' class="wpgridlightbox wpgridlightbox-' + gridgalleryid + '" data-thumbnail="' + slidelist[i].thumbnail + '"';
                    if (wonderplugin_gridgallery_config.lightboxcategorygroup && slidelist[i].category && slidelist[i].category.length > 0) {
                        var categories = slidelist[i].category.split(":");
                        for (var k = 0; k < categories.length; k++)
                            if (k == 0) button_code += ' data-wpggroup="wpgridgallery-' + gridgalleryid + "-" + categories[k];
                            else button_code += ":wpgridgallery-" + gridgalleryid + "-" + categories[k];
                        if (categories.length > 0) button_code +=
                            '"'
                    } else if (!wonderplugin_gridgallery_config.lightboxnogroup) button_code += ' data-wpggroup="wpgridgallery-' + gridgalleryid + '"';
                    if (slidelist[i].type == 0) button_code += ' href="' + slidelist[i].image + '"';
                    else if (slidelist[i].type == 1) {
                        button_code += ' href="' + slidelist[i].mp4 + '"';
                        if (slidelist[i].webm) button_code += ' data-webm="' + slidelist[i].webm + '"'
                    } else if (slidelist[i].type == 2 || slidelist[i].type == 3 || slidelist[i].type == 4 || slidelist[i].type == 5) {
                        button_code += ' href="' + slidelist[i].video + '"';
                        if (slidelist[i].type ==
                            5) button_code += " data-mediatype=12"
                    } else if (slidelist[i].type == 10) button_code += ' href="' + slidelist[i].pdf + '"';
                    if (slidelist[i].lightboxsize) button_code += ' data-width="' + slidelist[i].lightboxwidth + '" data-height="' + slidelist[i].lightboxheight + '"'
                } else if (slidelist[i].buttonlink && slidelist[i].buttonlink.length > 0) {
                    button_code += "<a";
                    if (wonderplugin_gridgallery_config.aextraprops) button_code += " " + wonderplugin_gridgallery_config.aextraprops;
                    button_code += ' href="' + slidelist[i].buttonlink + '"';
                    if (slidelist[i].buttonlinktarget &&
                        slidelist[i].buttonlinktarget.length > 0) button_code += ' target="' + slidelist[i].buttonlinktarget + '"'
                }
                if (slidelist[i].buttonlightbox || slidelist[i].buttonlink && slidelist[i].buttonlink.length > 0) {
                    if (!wonderplugin_gridgallery_config.donotaddtext) {
                        if (slidelist[i].title && slidelist[i].title.length > 0) button_code += ' data-title="' + slidelist[i].title.replace(/"/g, "&quot;") + '"';
                        if (slidelist[i].description && slidelist[i].description.length > 0) button_code += ' data-description="' + slidelist[i].description.replace(/"/g,
                            "&quot;") + '"';
                        if (wonderplugin_gridgallery_config.lightboxaddsocialmedia && slidelist[i].socialmedia && slidelist[i].socialmedia.length > 0) button_code += '" data-socialmedia="' + socialmedia.replace(/"/g, "&quot;") + '"'
                    }
                    button_code += ">"
                }
                button_code += '<button class="' + slidelist[i].buttoncss + '">' + slidelist[i].button + "</button>";
                if (slidelist[i].buttonlightbox || slidelist[i].buttonlink && slidelist[i].buttonlink.length > 0) button_code += "</a>"
            }
            return button_code
        };
        var generate_a_code = function (slidelist, i, gridgalleryid,
            socialmedia) {
            var code_template = "";
            if (slidelist[i].lightbox) {
                var inline_video = slidelist[i].type >= 1 && slidelist[i].type <= 5 && (slidelist[i].playvideoinline || slidelist[i].loadvideoinline);
                code_template += "<a";
                if (wonderplugin_gridgallery_config.aextraprops) code_template += " " + wonderplugin_gridgallery_config.aextraprops;
                if (slidelist[i].type == 1 && wonderplugin_gridgallery_config.lightboxenablehtml5poster) code_template += ' data-html5videoposter="' + slidelist[i].image + '"';
                if (!inline_video) {
                    code_template += ' class="wpgridlightbox wpgridlightbox-' +
                        gridgalleryid + '" data-thumbnail="' + slidelist[i].thumbnail + '"';
                    if (wonderplugin_gridgallery_config.lightboxcategorygroup && slidelist[i].category && slidelist[i].category.length > 0) {
                        var categories = slidelist[i].category.split(":");
                        for (var k = 0; k < categories.length; k++)
                            if (k == 0) code_template += ' data-wpggroup="wpgridgallery-' + gridgalleryid + "-" + categories[k];
                            else code_template += ":wpgridgallery-" + gridgalleryid + "-" + categories[k];
                        if (categories.length > 0) code_template += '"'
                    } else if (!wonderplugin_gridgallery_config.lightboxnogroup) code_template +=
                        ' data-wpggroup="wpgridgallery-' + gridgalleryid + '"'
                } else if (slidelist[i].loadvideoinline)
                    if (slidelist[i].type == 1) {
                        if (slidelist[i].autoplaymutedvideoinline) code_template += ' class="wpgridautoplayhtml5video"';
                        else if (slidelist[i].playmutedvideoinlineonhover) code_template += ' class="wpgridplayhtml5videoonhover"';
                        else if (slidelist[i].playvideoinlineonclick) code_template += ' class="wpgridplayhtml5videoonclick"';
                        else code_template += ' class="wpgridloadhtml5video"';
                        code_template += ' data-poster="' + slidelist[i].image +
                            '"';
                        code_template += " data-muted=" + (slidelist[i].playvideoinlinemuted ? "1" : "0");
                        code_template += " data-loop=" + (slidelist[i].autoplaymutedvideoinlineloop ? "1" : "0");
                        code_template += " data-hidecontrols=" + (slidelist[i].autoplaymutedvideoinlinehidecontrols ? "1" : "0")
                    } else code_template += ' class="wpgridloadiframevideo"';
                else if (slidelist[i].type == 1) code_template += ' class="wpgridinlinehtml5video"';
                else code_template += ' class="wpgridinlineiframevideo"';
                if (slidelist[i].type >= 1 && slidelist[i].type <= 5) code_template +=
                    ' data-isvideo="1"';
                if (slidelist[i].type == 0) code_template += ' href="' + slidelist[i].image + '"';
                else if (slidelist[i].type == 1) {
                    code_template += ' href="' + slidelist[i].mp4 + '"';
                    if (slidelist[i].webm) code_template += ' data-webm="' + slidelist[i].webm + '"'
                } else if (slidelist[i].type == 2 || slidelist[i].type == 3 || slidelist[i].type == 4 || slidelist[i].type == 5) {
                    code_template += ' href="' + slidelist[i].video + '"';
                    if (slidelist[i].type == 5) code_template += " data-mediatype=12"
                } else if (slidelist[i].type == 10) code_template += ' href="' + slidelist[i].pdf +
                    '"';
                if (!inline_video && slidelist[i].lightboxsize) code_template += ' data-width="' + slidelist[i].lightboxwidth + '" data-height="' + slidelist[i].lightboxheight + '"'
            } else if (slidelist[i].weblink) {
                code_template += "<a";
                if (wonderplugin_gridgallery_config.aextraprops) code_template += " " + wonderplugin_gridgallery_config.aextraprops;
                code_template += ' href="' + slidelist[i].weblink + '"';
                if (slidelist[i].linktarget && slidelist[i].linktarget.length > 0) code_template += ' target="' + slidelist[i].linktarget + '"';
                if (slidelist[i].clickhandler &&
                    slidelist[i].clickhandler.length > 0) code_template += ' onclick="' + slidelist[i].clickhandler.replace(/"/g, "&quot;") + '"';
                if (slidelist[i].weblinklightbox) {
                    code_template += '" class="wpgridlightbox wpgridlightbox-' + gridgalleryid + '" data-thumbnail="' + slidelist[i].thumbnail + '"';
                    if (wonderplugin_gridgallery_config.lightboxcategorygroup && slidelist[i].category && slidelist[i].category.length > 0) {
                        var categories = slidelist[i].category.split(":");
                        for (var k = 0; k < categories.length; k++)
                            if (k == 0) code_template += ' data-wpggroup="wpgridgallery-' +
                                gridgalleryid + "-" + categories[k];
                            else code_template += ":wpgridgallery-" + gridgalleryid + "-" + categories[k];
                        if (categories.length > 0) code_template += '"'
                    } else if (!wonderplugin_gridgallery_config.lightboxnogroup) code_template += ' data-wpggroup="wpgridgallery-' + gridgalleryid + '"';
                    if (slidelist[i].lightboxsize) code_template += ' data-width="' + slidelist[i].lightboxwidth + '" data-height="' + slidelist[i].lightboxheight + '"'
                }
            } else code_template += '<a href="#" onClick="return false;" style="cursor:default;"';
            if (!wonderplugin_gridgallery_config.donotaddtext) {
                if (slidelist[i].title &&
                    slidelist[i].title.length > 0) code_template += ' data-title="' + slidelist[i].title.replace(/"/g, "&quot;") + '"';
                if (slidelist[i].description && slidelist[i].description.length > 0) code_template += ' data-description="' + slidelist[i].description.replace(/"/g, "&quot;") + '"';
                if (wonderplugin_gridgallery_config.lightboxaddsocialmedia && slidelist[i].socialmedia && slidelist[i].socialmedia.length > 0) code_template += '" data-socialmedia="' + socialmedia.replace(/"/g, "&quot;") + '"'
            }
            code_template += ">";
            return code_template
        };
        var generate_image_code =
            function (slidelist, i, gridgalleryid, socialmedia) {
                var code_template = "";
                if (!wonderplugin_gridgallery_config.applylinktotext) code_template += generate_a_code(slidelist, i, gridgalleryid, socialmedia);
                if (slidelist[i].usevideothumbnail && slidelist[i].videothumbnail) code_template += '<video class="wonderplugin-gridgallery-item-video" muted loop autoplay playsinline width="100%" height="100%" src="' + slidelist[i].videothumbnail + '">';
                else {
                    code_template += "<img";
                    if (wonderplugin_gridgallery_config.imgextraprops) code_template +=
                        " " + wonderplugin_gridgallery_config.imgextraprops;
                    code_template += ' class="wonderplugin-gridgallery-item-img" src="';
                    if (slidelist[i].displaythumbnail) code_template += slidelist[i].thumbnail;
                    else code_template += slidelist[i].image;
                    code_template += '" />'
                }
                if (!wonderplugin_gridgallery_config.applylinktotext) code_template += "</a>";
                if (!wonderplugin_gridgallery_config.usetemplatefortextoverlay)
                    if (slidelist[i].button && slidelist[i].button.length > 0) {
                        var button_code = '<div class="wonderplugin-gridgallery-item-button" style="display:none;">';
                        button_code += generate_button_code(slidelist, i, gridgalleryid, socialmedia);
                        button_code += "</div>";
                        code_template += button_code
                    } return code_template
            };

        function generate_socialmedia_code(slide) {
            socialmedia = "";
            sociallist = {};
            try {
                sociallist = JSON.parse(slide.socialmedia)
            } catch (err) {}
            socialtarget = slide.socialmediatarget ? ' target="' + slide.socialmediatarget + '"' : "";
            socialrotate = slide.socialmediarotate ? " wpgridgallery-socialmedia-rotate" : "";
            if (sociallist) $.each(sociallist, function (index, social) {
                socialurl = social.name ==
                    "mail" && social.url && social.url.substring(0, 7) !== "mailto:" ? "mailto:" + social.url : social.url;
                socialmedia += '<div class="wpgridgallery-socialmedia-button"><a' + socialtarget + ' href="' + socialurl + '">' + '<div class="wpgridgallery-socialmedia-icon' + socialrotate + " mh-icon-" + social.name + '" style="background-color:' + socialbgcolor[social.name] + ';"></div>' + "</a></div>"
            });
            return socialmedia
        }
        var previewGridgallery = function () {
            updateGridgalleryOptions();
            $("#wonderplugin-gridgallery-preview-container").empty();
            var previewCode =
                "<div id='wonderplugin-gridgallery-preview'";
            if (wonderplugin_gridgallery_config.dataoptions && wonderplugin_gridgallery_config.dataoptions.length > 0) previewCode += " " + wonderplugin_gridgallery_config.dataoptions;
            previewCode += "></div>";
            $("#wonderplugin-gridgallery-preview-container").html(previewCode);
            $("head").find("style").each(function () {
                if ($(this).data("creator") == "wonderplugingridgallerycreator") $(this).remove()
            });
            var gridgalleryid = wonderplugin_gridgallery_config.id > 0 ? wonderplugin_gridgallery_config.id :
                0;
            if (wonderplugin_gridgallery_config.customcss && wonderplugin_gridgallery_config.customcss.length > 0) {
                var customcss = wonderplugin_gridgallery_config.customcss.replace(/#wonderplugingridgallery-GRIDGALLERYID/g, "#wonderplugin-gridgallery-preview");
                customcss = customcss.replace(/GRIDGALLERYID/g, gridgalleryid);
                $("head").append("<style type='text/css' data-creator='wonderplugingridgallerycreator'>" + customcss + "</style>")
            }
            if (wonderplugin_gridgallery_config.skincss && wonderplugin_gridgallery_config.skincss.length >
                0) $("head").append("<style type='text/css' data-creator='wonderplugingridgallerycreator'>" + wonderplugin_gridgallery_config.skincss.replace(/#wonderplugingridgallery-GRIDGALLERYID/g, "#wonderplugin-gridgallery-preview") + "</style>");
            if (wonderplugin_gridgallery_config.categorycss && wonderplugin_gridgallery_config.categorycss.length > 0) $("head").append("<style type='text/css' data-creator='wonderplugingridgallerycreator'>" + wonderplugin_gridgallery_config.categorycss.replace(/#wonderplugingridgallery-GRIDGALLERYID/g,
                "#wonderplugin-gridgallery-preview") + "</style>");
            if (wonderplugin_gridgallery_config.loadmorecss && wonderplugin_gridgallery_config.loadmorecss.length > 0) $("head").append("<style type='text/css' data-creator='wonderplugingridgallerycreator'>" + wonderplugin_gridgallery_config.loadmorecss.replace(/#wonderplugingridgallery-GRIDGALLERYID/g, "#wonderplugin-gridgallery-preview") + "</style>");
            if (wonderplugin_gridgallery_config.paginationcss && wonderplugin_gridgallery_config.paginationcss.length > 0) $("head").append("<style type='text/css' data-creator='wonderplugingridgallerycreator'>" +
                wonderplugin_gridgallery_config.paginationcss.replace(/#wonderplugingridgallery-GRIDGALLERYID/g, "#wonderplugin-gridgallery-preview") + "</style>");
            var code = "";
            $("#wpgridlightbox_advanced_options").remove();
            if (wonderplugin_gridgallery_config.lightboxadvancedoptions && wonderplugin_gridgallery_config.lightboxadvancedoptions.length > 0) {
                code += "<div id='wpgridlightbox_advanced_options'";
                code += " " + wonderplugin_gridgallery_config.lightboxadvancedoptions;
                code += "></div>"
            }
            if (wonderplugin_gridgallery_config.categorylist &&
                wonderplugin_gridgallery_config.categoryshow && wonderplugin_gridgallery_config.categoryposition && $.inArray(wonderplugin_gridgallery_config.categoryposition, ["topleft", "topcenter", "topright", "lefttop", "righttop"]) > -1) code += gen_categories(wonderplugin_gridgallery_config.categorylist, wonderplugin_gridgallery_config.categoryposition, wonderplugin_gridgallery_config.categorystyle, wonderplugin_gridgallery_config.categorydefault, wonderplugin_gridgallery_config.categoryhideall, wonderplugin_gridgallery_config.categorymenucaption);
            var hasPosts = false;
            var hasFolder = false;
            var hasXML = false;
            var hasYouTubePlaylist = false;
            if (wonderplugin_gridgallery_config.slides.length > 0) {
                code += '<div class="wonderplugin-gridgallery-list" style="display:block;position:relative;max-width:100%;margin:0 auto;">';
                var templates = wonderplugin_gridgallery_config.gridtemplate.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                templates = templates.match(/<div\s.+?<\/div>/g);
                var slidelist = wonderplugin_gridgallery_config.slides.slice(0);
                var slidelen =
                    slidelist.length;
                if (wonderplugin_gridgallery_config.random)
                    for (var i = slidelen - 1; i > 0; i--) {
                        if (i == 1 && Math.random() < 0.5) break;
                        var index = Math.floor(Math.random() * i);
                        var temp = slidelist[index];
                        slidelist[index] = slidelist[i];
                        slidelist[i] = temp
                    }
                var j = 0;
                for (var i = 0; i < slidelist.length; i++) {
                    if (slidelist[i].type == 6 || slidelist[i].type == 7) {
                        hasPosts = true;
                        continue
                    } else if (slidelist[i].type == 11) {
                        hasFolder = true;
                        continue
                    } else if (slidelist[i].type == 13) {
                        hasXML = true;
                        continue
                    } else if (slidelist[i].type == 15) {
                        hasYouTubePlaylist =
                            true;
                        continue
                    }
                    var socialmedia = slidelist[i].socialmedia && slidelist[i].socialmedia.length > 0 ? generate_socialmedia_code(slidelist[i]) : "";
                    var content = "";
                    if (slidelist[i].type == 12) content = slidelist[i].htmlcode;
                    else content = generate_image_code(slidelist, i, gridgalleryid, socialmedia);
                    var code_template = "";
                    if (wonderplugin_gridgallery_config.usetemplateforgrid && wonderplugin_gridgallery_config.templateforgrid) {
                        var gridtext = wonderplugin_gridgallery_config.templateforgrid;
                        gridtext = gridtext.replace(/__IMAGE__/g, content);
                        gridtext = gridtext.replace(/__SOCIALMEDIA__/g, socialmedia);
                        gridtext = gridtext.replace(/__TITLE__/g, slidelist[i].title ? slidelist[i].title.replace(/"/g, "&quot;") : "");
                        gridtext = gridtext.replace(/__DESCRIPTION__/g, slidelist[i].description ? slidelist[i].description.replace(/"/g, "&quot;") : "");
                        gridtext = gridtext.replace(/__BUTTON__/g, generate_button_code(slidelist, i, gridgalleryid, socialmedia));
                        code_template += gridtext
                    } else code_template += '<div class="wonderplugin-gridgallery-item-container">' + content + "</div>";
                    if (wonderplugin_gridgallery_config.usetemplatefortextoverlay && wonderplugin_gridgallery_config.templatefortextoverlay) {
                        var itemtext = wonderplugin_gridgallery_config.templatefortextoverlay;
                        itemtext = itemtext.replace(/__SOCIALMEDIA__/g, socialmedia);
                        itemtext = itemtext.replace(/__TITLE__/g, slidelist[i].title ? slidelist[i].title.replace(/"/g, "&quot;") : "");
                        itemtext = itemtext.replace(/__DESCRIPTION__/g, slidelist[i].description ? slidelist[i].description.replace(/"/g, "&quot;") : "");
                        itemtext = itemtext.replace(/__BUTTON__/g,
                            generate_button_code(slidelist, i, gridgalleryid, socialmedia));
                        itemtext = '<div class="wonderplugin-gridgallery-item-text"><div class="wonderplugin-gridgallery-item-wrapper">' + itemtext + "</div></div>";
                        if (wonderplugin_gridgallery_config.applylinktotext) code_template += generate_a_code(slidelist, i, gridgalleryid, socialmedia);
                        code_template += itemtext;
                        if (wonderplugin_gridgallery_config.applylinktotext) code_template += "</a>"
                    }
                    var div_item = wonderplugin_gridgallery_config.firstimage && i > 0 ? '<div class="wonderplugin-gridgallery-item" style="display:none;"' :
                        '<div class="wonderplugin-gridgallery-item"';
                    if (slidelist[i].category) div_item += ' data-category="' + slidelist[i].category + '"';
                    code += templates[j].replace("<div", div_item).replace("</div>", code_template + "</div>");
                    j++;
                    if (j >= templates.length) j = 0
                }
                code += '<div style="clear:both;"></div>';
                code += "</div>"
            }
            if (wonderplugin_gridgallery_config.categorylist && wonderplugin_gridgallery_config.categoryshow && wonderplugin_gridgallery_config.categoryposition && $.inArray(wonderplugin_gridgallery_config.categoryposition, ["bottomleft",
                    "bottomcenter", "bottomright"
                ]) > -1) code += gen_categories(wonderplugin_gridgallery_config.categorylist, wonderplugin_gridgallery_config.categoryposition, wonderplugin_gridgallery_config.categorystyle, wonderplugin_gridgallery_config.categorydefault, wonderplugin_gridgallery_config.categoryhideall, wonderplugin_gridgallery_config.categorymenucaption);
            code += '<div style="clear:both;"></div>';
            var jsfolder = $("#wonderplugin-gridgallery-jsfolder").text();
            var gridgalleryOptions = $.extend({}, {
                gridgalleryid: gridgalleryid,
                jsfolder: jsfolder,
                ispreview: true,
                skinsfoldername: "skins/default/"
            }, wonderplugin_gridgallery_config);
            gridgalleryOptions.categoryregulardropdown = wonderplugin_gridgallery_config.categorystyle && wonderplugin_gridgallery_config.categorystyle.match("regular-dropdown$");
            var totalwidth = wonderplugin_gridgallery_config.firstimage ? gridgalleryOptions.width : gridgalleryOptions.width * gridgalleryOptions.column + gridgalleryOptions.gap * (gridgalleryOptions.column - 1);
            var maxwidth = wonderplugin_gridgallery_config.fullwidth ||
                wonderplugin_gridgallery_config.fullwidthsamegrid ? "100%" : totalwidth + "px";
            if (gridgalleryOptions.responsive) $("#wonderplugin-gridgallery-preview").css({
                display: "none",
                position: "relative",
                width: "100%",
                "max-width": maxwidth
            });
            else $("#wonderplugin-gridgallery-preview").css({
                display: "none",
                position: "relative",
                width: totalwidth + "px"
            });
            $("#wonderplugin-gridgallery-preview").html(code);
            $("#wonderplugin-gridgallery-preview").wonderplugingridgallery(gridgalleryOptions);
            if (hasPosts) $("#wonderplugin-gridgallery-preview-message").html("The WordPress posts gallery is not available in the Preview tab. To view the effect, save and publish the gallery, then clik the View Gallery link. Or you can add the provided shortcode to a post or page to view the effect.");
            else if (hasFolder) $("#wonderplugin-gridgallery-preview-message").html("The WordPress folder gallery is not available in the Preview tab. To view the effect, save and publish the gallery, then clik the View Gallery link. Or you can add the provided shortcode to a post or page to view the effect.");
            else if (hasXML) $("#wonderplugin-gridgallery-preview-message").html("The XML gallery is not available in the Preview tab. To view the effect, save and publish the gallery, then clik the View Gallery link. Or you can add the provided shortcode to a post or page to view the effect.");
            else if (hasYouTubePlaylist) $("#wonderplugin-gridgallery-preview-message").html("The YouTube playlist gallery is not available in the Preview tab. To view the effect, save and publish the gallery, then clik the View Gallery link. Or you can add the provided shortcode to a post or page to view the effect.");
            else $("#wonderplugin-gridgallery-preview-message").empty()
        };
        var postPublish = function (message, afterajax) {
            $("#wonderplugin-gridgallery-publish-loading").hide();
            var formnonce = $("#wonderplugin-gridgallery-saveformnonce").html();
            var errorHtml = "";
            if (afterajax)
                if (message) {
                    errorHtml += "<div class='error'><p>Error message: " + message + "</p></div>";
                    errorHtml += "<div class='error'><p>WordPress Ajax call failed. Please click the button below and save with POST method</p></div>"
                } else {
                    errorHtml += "<div class='error'><p>WordPress Ajax call failed. Please check your WordPress configuration file and make sure the WP_DEBUG is set to false.</p></div>";
                    errorHtml += "<div class='error'><p>Please click the button below and save with POST method</p></div>"
                }
            else errorHtml +=
                "<div class='updated'><p>Please click the button below and save with POST method</p></div>";
            errorHtml += "<form method='post'>";
            errorHtml += formnonce;
            errorHtml += "<input type='hidden' name='wonderplugin-gridgallery-save-item-post-value' id='wonderplugin-gridgallery-save-item-post-value' value='" + JSON.stringify(wonderplugin_gridgallery_config).replace(/"/g, "&quot;").replace(/'/g, "&#39;") + "' />";
            errorHtml += "<p class='submit'><input type='submit' name='wonderplugin-gridgallery-save-item-post' id='wonderplugin-gridgallery-save-item-post' class='button button-primary' value='Save & Publish with Post Method'  /></p>";
            errorHtml += "</form>";
            $("#wonderplugin-gridgallery-publish-information").html(errorHtml)
        };
        var displayCheck = function (days) {
            var code = days < 30 ? "<p>The trial version will expire in " + String(30 - days) + ' days. To continue using the plugin after expiration, please <a href="https://www.wonderplugin.com/wordpress-gridgallery/order/" target="_blank">Upgrade to the Pro Version</a>.</p>' : '<p>The 30-day trial period has expired. To continue using the plugin, please <a href="https://www.wonderplugin.com/wordpress-gridgallery/order/" target="_blank">Upgrade to the Pro Version</a>.</p>';
            $("<div></div>").html(code).dialog({
                title: "Wonder Grid Gallery Trial Version",
                resizable: false,
                modal: true,
                width: 480,
                open: function () {
                    $(this).siblings(".ui-dialog-buttonpane").find("button:eq(1)").focus()
                },
                buttons: {
                    "Close": function () {
                        $(this).dialog("close")
                    },
                    "Upgrade to the Pro Version": function () {
                        window.open("https://www.wonderplugin.com/wordpress-gridgallery/order/", "_blank")
                    }
                }
            })
        };
        var checkDays = function () {
            var checkOptions = {
                check: 1
            };
            if (!checkOptions.check || $("#wonderplugin_gridgallery_initd").length <
                0) return -1;
            var initTime = parseInt($("#wonderplugin_gridgallery_initd").text());
            if (isNaN(initTime) || initTime <= 0) return -1;
            return Math.floor((Math.floor((new Date).getTime() / 1E3) - initTime) / 86400)
        };
        var initCheck = function () {
            var days = checkDays();
            if (days < 15) return;
            displayCheck(days)
        };
        // initCheck();
        var publishGridgallery = function () {
            if ($(".form-quick-edit").length > 0) saveQuickEdit();
            // var days = checkDays();
            // if (days >= 30) {
            //     $("#wonderplugin-gridgallery-publish-information").html('<p>The 30-day trial period has expired. To continue using the plugin, please <a href="https://www.wonderplugin.com/wordpress-gridgallery/order/" target="_blank">Upgrade to the Pro Version</a>.</p>');
            //     displayCheck(days);
            //     return
            // }
            $("#wonderplugin-gridgallery-publish-loading").show();
            updateGridgalleryOptions();
            var usepostsave = $("#wonderplugin-gridgallery-usepostsave").text() == "1";
            if (usepostsave) {
                postPublish("", false);
                return
            }
            var ajaxnonce = $("#wonderplugin-gridgallery-ajaxnonce").text();
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "wonderplugin_gridgallery_save_config",
                    nonce: ajaxnonce,
                    item: JSON.stringify(wonderplugin_gridgallery_config)
                },
                success: function (data) {
                    $("#wonderplugin-gridgallery-publish-loading").hide();
                    if (data && data.success && data.id >= 0) {
                        if (wonderplugin_gridgallery_config.id == "-1") {
                            var urlparams = {};
                            var searcharr = window.location.search.substring(1).split("&");
                            for (var i = 0; i < searcharr.length; i++) {
                                var value = searcharr[i].split("=");
                                if (value && value.length == 2) urlparams[value[0]] = value[1]
                            }
                            urlparams["page"] = "wonderplugin_gridgallery_edit_item";
                            urlparams["itemid"] = data.id;
                            window.history.pushState(null, null, window.location.href.split("?")[0] + "?" + $.param(urlparams))
                        }
                        wonderplugin_gridgallery_config.id = data.id;
                        $("#wonderplugin-gridgallery-publish-information").html("<div class='updated'><p>The gallery has been saved and published: <a href='" + $("#wonderplugin-gridgallery-viewadminurl").text() + "&itemid=" + data.id + "' target='_blank'>View Gallery</a></p></div>" + "<div class='updated'><p>To embed the gridgallery into your page or post, use shortcode:  [wonderplugin_gridgallery id=" + data.id + "]</p></div>" + "<div class='updated'><p>To embed the gridgallery into your template, use php code:  &lt;?php echo do_shortcode('[wonderplugin_gridgallery id=" +
                            data.id + "]'); ?&gt;</p></div>")
                    } else {
                        wonderplugin_gridgallery_config.gridtemplate = wonderplugin_gridgallery_config.gridtemplate.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
                        postPublish(data && data.message ? data.message : "", true)
                    }
                },
                error: function () {
                    $("#wonderplugin-gridgallery-publish-loading").hide();
                    postPublish("", true)
                }
            })
        };
        var editCategory = function (category) {
            var dialogCode = "<div class='wonderplugin-dialog-container'>" + "<div class='wonderplugin-dialog-bg'></div>" + "<div class='wonderplugin-dialog'>" +
                "<h3 id='wonderplugin-dialog-title'>" + (category ? "Edit Category" : "Add Category") + "</h3>" + "<div id='wonderplugin-dialog-error' style='display:none;'></div>" + "<table class='wonderplugin-dialog-form'>" + "<tr>" + "<th>Caption</th>" + "<td><input name='wonderplugin-dialog-caption' type='text' id='wonderplugin-dialog-caption' value='' class='regular-text' />" + "</td>" + "</tr>" + "<tr>" + "<th>Slug (Only A-Z, a-z, 0-9 allowed)</th>" + "<td><input name='wonderplugin-dialog-slug' type='text' id='wonderplugin-dialog-slug' value='' class='regular-text' />" +
                "</td>" + "</tr>";
            dialogCode += "</table>" + "<div class='wonderplugin-dialog-buttons'>" + "<input type='button' class='button button-primary' id='wonderplugin-dialog-ok' value='OK' />" + "<input type='button' class='button' id='wonderplugin-dialog-cancel' value='Cancel' />" + "</div>" + "</div>" + "</div>";
            var $categoryDialog = $(dialogCode);
            $("body").append($categoryDialog);
            $(".wonderplugin-dialog").css({
                "margin-top": String($(document).scrollTop() + 60) + "px"
            });
            $(".wonderplugin-dialog-bg").css({
                height: $(document).height() +
                    "px"
            });
            if (category) {
                $("#wonderplugin-dialog-slug").val(category.slug);
                if (category.slug == "all") $("#wonderplugin-dialog-slug").attr("readonly", true);
                $("#wonderplugin-dialog-caption").val(category.caption)
            }
            $("#wonderplugin-dialog-ok").click(function () {
                var slug = $.trim($("#wonderplugin-dialog-slug").val()).replace(/[^a-zA-Z0-9]/g, "");
                var caption = $.trim($("#wonderplugin-dialog-caption").val());
                if (slug.length <= 0) {
                    $("#wonderplugin-dialog-error").show().html("Please enter a slug for the category");
                    return
                }
                if (caption.length <=
                    0) {
                    $("#wonderplugin-dialog-error").show().html("Please enter a caption for the category");
                    return
                }
                var categories = {};
                try {
                    categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
                } catch (err) {}
                if (category) {
                    if (slug != category.slug) {
                        for (var i = 0; i < categories.length; i++)
                            if (categories[i].slug == slug) {
                                $("#wonderplugin-dialog-error").show().html("Duplicated slug");
                                return
                            } for (var i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
                            if (wonderplugin_gridgallery_config.slides[i].category) {
                                var slideCats =
                                    wonderplugin_gridgallery_config.slides[i].category.split(":");
                                for (var j = 0; j < slideCats.length; j++)
                                    if (slideCats[j] == category.slug) slideCats[j] = slug;
                                wonderplugin_gridgallery_config.slides[i].category = slideCats.join(":")
                            } if ($(".form-quick-edit .quick-edit-category-checkbox").length > 0) $(".form-quick-edit .quick-edit-category-checkbox").each(function () {
                            if ($(this).attr("value") == category.slug) $(this).attr("value", slug)
                        })
                    }
                    for (var i = 0; i < categories.length; i++)
                        if (categories[i].slug == category.slug) {
                            categories[i].slug =
                                slug;
                            categories[i].caption = caption
                        }
                } else {
                    for (var i = 0; i < categories.length; i++)
                        if (categories[i].slug == slug) {
                            $("#wonderplugin-dialog-error").show().html("Duplicated slug");
                            return
                        } categories.push({
                        "slug": slug,
                        "caption": caption
                    })
                }
                wonderplugin_gridgallery_config.categorylist = JSON.stringify(categories);
                printCategoryOptions();
                $categoryDialog.remove()
            });
            $("#wonderplugin-dialog-cancel").click(function () {
                $categoryDialog.remove()
            })
        };
        var printCategoryOptions = function () {
            var categories = {};
            try {
                categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
            } catch (err) {}
            var code =
                "";
            for (var i = 0; i < categories.length; i++) code += '<div data-categoryid="' + i + '" class="wonderplugin-gridgallery-category' + (categories[i].slug == "all" ? "" : " wonderplugin-gridgallery-category-single") + '">' + '<div class="wonderplugin-gridgallery-category-caption">' + categories[i].caption + "</div>" + '<div class="wonderplugin-gridgallery-category-buttons"><span data-categoryid="' + i + '" class="wonderplugin-gridgallery-category-edit">Edit</span>' + (categories[i].slug == "all" ? "" : '<span data-categoryid="' + i + '" class="wonderplugin-gridgallery-category-delete">Delete</span>') +
                "</div>" + "</div>";
            code += '<div class="wonderplugin-gridgallery-addcategory">Add Category</div>';
            $("#wonderplugin-gridgallery-categorylist").html(code);
            $(".wonderplugin-gridgallery-category-single .wonderplugin-gridgallery-category-caption").wpcategorydrag(function (dragid, dropid) {
                if (dragid <= 0 || dropid <= 0) return;
                var categories = {};
                try {
                    categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
                } catch (err) {}
                var data = categories[dragid];
                categories.splice(dragid, 1);
                categories.splice(dropid, 0, data);
                wonderplugin_gridgallery_config.categorylist = JSON.stringify(categories);
                printCategoryOptions()
            });
            $(".wonderplugin-gridgallery-category-edit").click(function () {
                var id = $(this).data("categoryid");
                var categories = {};
                try {
                    categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
                } catch (err) {}
                editCategory(categories[id])
            });
            $(".wonderplugin-gridgallery-category-delete").click(function () {
                var id = $(this).data("categoryid");
                var categories = {};
                try {
                    categories = JSON.parse(wonderplugin_gridgallery_config.categorylist)
                } catch (err) {}
                categories.splice(id,
                    1);
                wonderplugin_gridgallery_config.categorylist = JSON.stringify(categories);
                printCategoryOptions()
            });
            $(".wonderplugin-gridgallery-addcategory").click(function () {
                editCategory()
            });
            var default_cat = $("#wonderplugin-gridgallery-categorydefault").val();
            var code = "";
            for (var i = 0; i < categories.length; i++) code += '<option value="' + categories[i].slug + '">' + categories[i].caption + "</option>";
            $("#wonderplugin-gridgallery-categorydefault").html(code);
            $('#wonderplugin-gridgallery-categorydefault option[value="' + default_cat +
                '"]').attr("selected", "selected");
            var selected_cat = $("#wonderplugin-gridgallery-selectcategorylist").val();
            var code = "";
            for (var i = 0; i < categories.length; i++) code += '<option value="' + categories[i].slug + '">' + categories[i].caption + "</option>";
            $("#wonderplugin-gridgallery-selectcategorylist").html(code);
            $('#wonderplugin-gridgallery-selectcategorylist option[value="' + selected_cat + '"]').attr("selected", "selected");
            if (wonderplugin_gridgallery_config.catlangs) {
                var langlist = {};
                try {
                    langlist = JSON.parse($("#wonderplugin-gridgallery-langlist").text())
                } catch (err) {}
                var catlangs = {};
                try {
                    catlangs = JSON.parse(wonderplugin_gridgallery_config.catlangs)
                } catch (err) {}
                if (catlangs) {
                    for (var key in catlangs) {
                        var bfound = false;
                        for (var i = 0; i < categories.length; i++)
                            if (key == categories[i].slug) {
                                bfound = true;
                                break
                            } if (!bfound) delete catlangs[key]
                    }
                    for (var i = 0; i < categories.length; i++)
                        if (!(categories[i].slug in catlangs)) {
                            catlangs[categories[i].slug] = {};
                            for (var j = 0; j < langlist.length; j++) catlangs[categories[i].slug][langlist[j].code] = categories[i].caption
                        }
                }
                $("#wonderplugin-gridgallery-category-langs").text(JSON.stringify(catlangs))
            }
            if (wonderplugin_gridgallery_config.catcaptionlangs) $("#wonderplugin-gridgallery-categorymenucaption-langs").text(wonderplugin_gridgallery_config.catcaptionlangs)
        };
        var default_options = {
            id: -1,
            newestfirst: false,
            name: "My Grid Gallery",
            categorylist: '[{"slug":"all","caption":"Show All"}]',
            slides: [],
            skin: "tiles",
            style: "classic",
            categorystyle: "wpp-category-greybutton",
            categorymenucaption: "Select Category",
            lazyloadmode: "none",
            itemsperpage: 12,
            loadmorecaption: "Load More",
            loadmorecssstyle: "wpp-loadmore-greybutton",
            paginationcssstyle: "wpp-pagination-greybutton",
            paginationpos: "bottom",
            lazyloadimages: true,
            loadallremaining: false,
            donotinit: false,
            addinitscript: false,
            triggerresize: false,
            triggerresizedelay: 500,
            triggerresizeafterinit: false,
            triggerresizeafterinitdelay: 500,
            removeinlinecss: true,
            nohoverontouchscreen: false,
            deferloading: false,
            deferloadingdelay: 0,
            donotzoomin: false,
            supportshortcode: false,
            fullwidth: false,
            fullwidthsamegrid: false,
            imgextraprops: "",
            aextraprops: "",
            taglinkextraprops: "",
            nameseparator: ", ",
            mediumgridsize: false,
            mediumwidth: 320,
            mediumheight: 240,
            smallgridsize: false,
            smallwidth: 320,
            smallheight: 240,
            customcss: "",
            dataoptions: "",
            customjs: ""
        };
        default_options["loadmorecss"] =
            WONDERPLUGIN_GRIDGALLERY_LOADMORE_STYLE[default_options.loadmorecssstyle];
        default_options["paginationcss"] = WONDERPLUGIN_GRIDGALLERY_PAGINATION_STYLE[default_options.paginationcssstyle];
        var wonderplugin_gridgallery_config = $.extend({}, default_options, defaultSkinOptions[default_options["skin"]], defaultStyleOptions[default_options["style"]], defaultCategoryStyleOptions[default_options["categorystyle"]]);
        var gridgalleryId = parseInt($("#wonderplugin-gridgallery-id").text());
        if (gridgalleryId >= 0) {
            var saved_config = {};
            try {
                saved_config = JSON.parse($("#wonderplugin-gridgallery-id-config").text())
            } catch (err) {}
            if (saved_config.skin == "withborder") {
                saved_config.skin = "tiles";
                saved_config.style = "border"
            }
            if (!("centerimage" in saved_config)) saved_config.centerimage = false;
            if (!("nohoverontouchscreen" in saved_config)) saved_config.nohoverontouchscreen = false;
            if (!("hoverzoominimageonly" in saved_config)) saved_config.hoverzoominimageonly = false;
            if (!("deferloading" in saved_config)) {
                saved_config.deferloading = false;
                saved_config.deferloadingdelay =
                    0
            }
            if (!("textinsidespace" in saved_config) && (saved_config.skin == "caption" || saved_config.skin == "circularwithtext")) saved_config.textinsidespace = true;
            $.extend(wonderplugin_gridgallery_config, saved_config);
            wonderplugin_gridgallery_config.id = gridgalleryId
        }
        var i;
        var j;
        for (i = 0; i < wonderplugin_gridgallery_config.slides.length; i++) {
            if (!("buttonlightbox" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["buttonlightbox"] = false;
            if (!("lightbox" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["lightbox"] =
                true;
            if (!("lightboxsize" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["lightboxsize"] = false;
            if (!("displaythumbnail" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["displaythumbnail"] = true;
            if (!("lightboxwidth" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["lightboxwidth"] = 960;
            if (!("lightboxheight" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["lightboxheight"] =
                540;
            if (!("weblinklightbox" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["weblinklightbox"] = false;
            if (!("altusetitle" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["altusetitle"] = true;
            if (!("alt" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["alt"] = "";
            if (!("clickhandler" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["clickhandler"] = "";
            if ("postlightbox" in
                wonderplugin_gridgallery_config.slides[i]) {
                if (wonderplugin_gridgallery_config.slides[i].postlightbox !== true && wonderplugin_gridgallery_config.slides[i].postlightbox !== false) wonderplugin_gridgallery_config.slides[i].postlightbox = wonderplugin_gridgallery_config.slides[i].postlightbox && wonderplugin_gridgallery_config.slides[i].postlightbox.toLowerCase() === "true";
                if (wonderplugin_gridgallery_config.slides[i].postlightboxsize !== true && wonderplugin_gridgallery_config.slides[i].postlightboxsize !== false) wonderplugin_gridgallery_config.slides[i].postlightboxsize =
                    wonderplugin_gridgallery_config.slides[i].postlightboxsize && wonderplugin_gridgallery_config.slides[i].postlightboxsize.toLowerCase() === "true";
                if (wonderplugin_gridgallery_config.slides[i].posttitlelink !== true && wonderplugin_gridgallery_config.slides[i].posttitlelink !== false) wonderplugin_gridgallery_config.slides[i].posttitlelink = wonderplugin_gridgallery_config.slides[i].posttitlelink && wonderplugin_gridgallery_config.slides[i].posttitlelink.toLowerCase() === "true"
            }
            if (!("playvideoinline" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["playvideoinline"] =
                false;
            if (!("loadvideoinline" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["loadvideoinline"] = false;
            if (!("autoplaymutedvideoinline" in wonderplugin_gridgallery_config.slides[i])) {
                wonderplugin_gridgallery_config.slides[i]["autoplaymutedvideoinline"] = false;
                wonderplugin_gridgallery_config.slides[i]["autoplaymutedvideoinlineloop"] = false;
                wonderplugin_gridgallery_config.slides[i]["autoplaymutedvideoinlinehidecontrols"] = false;
                wonderplugin_gridgallery_config.slides[i]["playmutedvideoinlineonhover"] =
                    false;
                wonderplugin_gridgallery_config.slides[i]["playvideoinlineonclick"] = false;
                wonderplugin_gridgallery_config.slides[i]["playvideoinlinemuted"] = false
            }
            if (!("usevideothumbnail" in wonderplugin_gridgallery_config.slides[i])) {
                wonderplugin_gridgallery_config.slides[i]["usevideothumbnail"] = false;
                wonderplugin_gridgallery_config.slides[i]["videothumbnail"] = ""
            }
            if (!("socialmedia" in wonderplugin_gridgallery_config.slides[i])) {
                wonderplugin_gridgallery_config.slides[i]["socialmedia"] = "";
                wonderplugin_gridgallery_config.slides[i]["socialmediatarget"] =
                    "";
                wonderplugin_gridgallery_config.slides[i]["socialmediarotate"] = true
            }
            if (wonderplugin_gridgallery_config.slides[i].type == 6) {
                if (!("postorder" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].postorder = "DESC";
                if (!("postdaterange" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].postdaterange = false;
                else if (wonderplugin_gridgallery_config.slides[i].postdaterange !== true && wonderplugin_gridgallery_config.slides[i].postdaterange !==
                    false) wonderplugin_gridgallery_config.slides[i].postdaterange = wonderplugin_gridgallery_config.slides[i].postdaterange && wonderplugin_gridgallery_config.slides[i].postdaterange.toLowerCase() === "true";
                if (!("postdaterangeafter" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].postdaterangeafter = 30;
                if (!("selectpostbytags" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].selectpostbytags = false;
                else if (wonderplugin_gridgallery_config.slides[i].selectpostbytags !==
                    true && wonderplugin_gridgallery_config.slides[i].selectpostbytags !== false) wonderplugin_gridgallery_config.slides[i].selectpostbytags = wonderplugin_gridgallery_config.slides[i].selectpostbytags && wonderplugin_gridgallery_config.slides[i].selectpostbytags.toLowerCase() === "true";
                if (!("posttags" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].posttags = "";
                if (!("postorderby" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].postorderby =
                    "date";
                if (!("posttitlefield" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].posttitlefield = "%post_title%";
                if (!("postdescriptionfield" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i].postdescriptionfield = "%post_excerpt%"
            }
            if (wonderplugin_gridgallery_config.slides[i].type == 11)
                if (!("onlyusexml" in wonderplugin_gridgallery_config.slides[i])) wonderplugin_gridgallery_config.slides[i]["onlyusexml"] = false
        }
        var slideBoolOptions = ["usevideothumbnail",
            "playmutedvideoinlineonhover", "playvideoinlineonclick", "playvideoinlinemuted", "autoplaymutedvideoinline", "autoplaymutedvideoinlineloop", "autoplaymutedvideoinlinehidecontrols", "lightbox", "lightboxsize", "playvideoinline", "loadvideoinline", "displaythumbnail", "weblinklightbox", "buttonlightbox", "altusetitle", "usefilenameastitle", "onlyusexml", "youtubetitle", "youtubedescription", "titlelink", "imageactionlightbox", "openpostinlightbox", "postlightboxsize", "postdaterange", "metaonsale", "metatotalsales", "metafeatured"
        ];
        for (i = 0; i < wonderplugin_gridgallery_config.slides.length; i++)
            for (j = 0; j < slideBoolOptions.length; j++)
                if (wonderplugin_gridgallery_config.slides[i][slideBoolOptions[j]] !== true && wonderplugin_gridgallery_config.slides[i][slideBoolOptions[j]] !== false) wonderplugin_gridgallery_config.slides[i][slideBoolOptions[j]] = wonderplugin_gridgallery_config.slides[i][slideBoolOptions[j]] && wonderplugin_gridgallery_config.slides[i][slideBoolOptions[j]].toLowerCase() === "true";
        var boolOptions = ["mediumgridsize", "smallgridsize",
            "applylinktotext", "fullwidth", "fullwidthsamegrid", "supportshortcode", "donotzoomin", "enabletabindex", "masonrymode", "newestfirst", "random", "showtitle", "showtexttitle", "showtextdescription", "showtextbutton", "overlaylink", "donotaddtext", "responsive", "nohoverontouchscreen", "hoverzoomin", "hoverzoominimageonly", "hoverzoominimagecenter", "hoverfade", "shownavigation", "mediumscreen", "smallscreen", "usetemplatefortextoverlay", "usetemplateforgrid", "deferloading", "justifymode", "donotjustifylastrowifoverlimit", "donotjustifyifonlyonerowandoverlimit",
            "limitjustifymaxheight", "lightboxshowallcategories", "lightboxnogroup", "lightboxcategorygroup", "lightboxresponsive", "lightboxshowtitle", "lightboxshowdescription", "centerimage", "circularimage", "firstimage", "textinsidespace", "donotinit", "addinitscript", "categorymulticatand", "categoryshow", "categoryhideall", "categorymulticat", "categoryatleastone", "addvideoplaybutton", "lightboxfullscreenmode", "lightboxcloseonoverlay", "lightboxvideohidecontrols", "lightboxenablehtml5poster", "lightboxfullscreenmodeonsmallscreen",
            "lightboxfullscreentextinside", "lightboxfullscreentextoutside", "lightboxresponsivebarheight", "lightboxnotkeepratioonsmallheight", "lazyloadimages", "triggerresize", "loadallremaining", "triggerresizeafterinit", "removeinlinecss", "shownavcontrol", "hidenavdefault", "lightboxaddsocialmedia", "lightboxshowsocial", "lightboxshowemail", "lightboxshowfacebook", "lightboxshowtwitter", "lightboxshowpinterest", "lightboxshowdownload", "lightboxsocialrotateeffect", "lightboxenableaudio", "lightboxaudioautoplay", "lightboxaudioloop",
            "lightboxaudioshowonhover", "lightboxautoslide", "lightboxshowtimer", "lightboxshowplaybutton", "lightboxalwaysshownavarrows", "lightboxshowtitleprefix"
        ];
        for (i = 0; i < boolOptions.length; i++)
            if (wonderplugin_gridgallery_config[boolOptions[i]] !== true && wonderplugin_gridgallery_config[boolOptions[i]] !== false) wonderplugin_gridgallery_config[boolOptions[i]] = wonderplugin_gridgallery_config[boolOptions[i]] && wonderplugin_gridgallery_config[boolOptions[i]].toLowerCase() === "true";
        if (wonderplugin_gridgallery_config.dataoptions &&
            wonderplugin_gridgallery_config.dataoptions.length > 0) wonderplugin_gridgallery_config.dataoptions = wonderplugin_gridgallery_config.dataoptions.replace(/\\"/g, '"').replace(/\\'/g, "'");
        var printConfig = function () {
            $("#wonderplugin-newestfirst").prop("checked", wonderplugin_gridgallery_config.newestfirst);
            $("#wonderplugin-gridgallery-name").val(wonderplugin_gridgallery_config.name);
            printCategoryOptions();
            updateMediaTable();
            $(".wonderplugin-tab-skin").find("img").removeClass("selected");
            $("input:radio[name=wonderplugin-gridgallery-skin][value=" +
                wonderplugin_gridgallery_config.skin + "]").prop("checked", true);
            $("input:radio[name=wonderplugin-gridgallery-skin][value=" + wonderplugin_gridgallery_config.skin + "]").parent().find("img").addClass("selected");
            $(".wonderplugin-tab-style").find("img").removeClass("selected");
            $("input:radio[name=wonderplugin-gridgallery-style][value=" + wonderplugin_gridgallery_config.style + "]").prop("checked", true);
            $("input:radio[name=wonderplugin-gridgallery-style][value=" + wonderplugin_gridgallery_config.style + "]").parent().find("img").addClass("selected");
            printOptions(wonderplugin_gridgallery_config);
            $("#wonderplugin-gridgallery-donotinit").prop("checked", wonderplugin_gridgallery_config.donotinit);
            $("#wonderplugin-gridgallery-addinitscript").prop("checked", wonderplugin_gridgallery_config.addinitscript);
            $("#wonderplugin-gridgallery-triggerresize").prop("checked", wonderplugin_gridgallery_config.triggerresize);
            $("#wonderplugin-gridgallery-triggerresizedelay").val(wonderplugin_gridgallery_config.triggerresizedelay);
            $("#wonderplugin-gridgallery-triggerresizeafterinit").prop("checked",
                wonderplugin_gridgallery_config.triggerresizeafterinit);
            $("#wonderplugin-gridgallery-triggerresizeafterinitdelay").val(wonderplugin_gridgallery_config.triggerresizeafterinitdelay);
            $("#wonderplugin-gridgallery-removeinlinecss").prop("checked", wonderplugin_gridgallery_config.removeinlinecss);
            $("#wonderplugin-gridgallery-custom-css").val(wonderplugin_gridgallery_config.customcss);
            $("#wonderplugin-gridgallery-data-options").val(wonderplugin_gridgallery_config.dataoptions);
            $("#wonderplugin-gridgallery-customjs").val(wonderplugin_gridgallery_config.customjs)
        };
        printConfig()
    });
    $.fn.wpdraggable = function (callback) {
        this.css("cursor", "move").on("mousedown", function (e) {
            var $dragged = $(this);
            var x = $dragged.offset().left - e.pageX;
            var y = $dragged.offset().top - e.pageY;
            var z = $dragged.css("z-index");
            $(document).on("mousemove.wpdraggable", function (e) {
                $dragged.css({
                    "z-index": 999
                }).offset({
                    left: x + e.pageX,
                    top: y + e.pageY
                });
                e.preventDefault()
            }).one("mouseup", function () {
                $(this).off("mousemove.wpdraggable click.wpdraggable");
                $dragged.css("z-index", z);
                var i = $dragged.data("order");
                var coltotal = Math.floor($dragged.parent().parent().parent().innerWidth() / $dragged.parent().parent().outerWidth());
                var row = Math.floor(($dragged.offset().top - $dragged.parent().parent().parent().offset().top) / $dragged.parent().parent().outerHeight());
                var col = Math.floor(($dragged.offset().left - $dragged.parent().parent().parent().offset().left) / $dragged.parent().parent().outerWidth());
                var j = row * coltotal + col;
                callback(i, j)
            });
            e.preventDefault()
        });
        return this
    };
    $.fn.wpcategorydrag = function (callback) {
        var getdropid =
            function ($dragged) {
                var dropid = $dragged.data("categoryid");
                var $siblings = $dragged.siblings(".wonderplugin-gridgallery-category-single");
                if ($siblings.length > 0)
                    for (var i = 0; i < $siblings.length; i++)
                        if ($dragged.offset().left > $siblings.eq(i).offset().left && $dragged.offset().left < $siblings.eq(i).offset().left + $siblings.eq(i).outerWidth(true) && $dragged.offset().top > $siblings.eq(i).offset().top && $dragged.offset().top < $siblings.eq(i).offset().top + $siblings.eq(i).outerHeight(true)) {
                            dropid = $siblings.eq(i).data("categoryid");
                            break
                        } return dropid
            };
        this.css("cursor", "move").on("mousedown", function (e) {
            var $dragged = $(this).parent();
            var x = $dragged.offset().left - e.pageX;
            var y = $dragged.offset().top - e.pageY;
            var z = $dragged.css("z-index");
            $dragged.css({
                border: "1px dotted #333"
            });
            $(document).on("mousemove.wpcategorydrag", function (e) {
                $dragged.css({
                    "z-index": 999
                }).offset({
                    left: x + e.pageX,
                    top: y + e.pageY
                });
                $(".wonderplugin-gridgallery-category-caption").css({
                    border: "1px solid #ccc"
                });
                var dropid = getdropid($dragged);
                if (dropid != $dragged.data("categoryid")) {
                    var $siblings =
                        $dragged.siblings(".wonderplugin-gridgallery-category-single");
                    if ($siblings.length > 0)
                        for (var i = 0; i < $siblings.length; i++)
                            if (dropid == $siblings.eq(i).data("categoryid")) $siblings.eq(i).find(".wonderplugin-gridgallery-category-caption").css({
                                border: "2px solid #d54e21"
                            })
                }
                e.preventDefault()
            }).one("mouseup", function () {
                $(this).off("mousemove.wpcategorydrag click.wpcategorydrag");
                $dragged.css({
                    "z-index": z,
                    border: "none"
                });
                var dropid = getdropid($dragged);
                callback($dragged.data("categoryid"), dropid)
            })
        });
        return this
    }
})(jQuery);
(function ($) {
    $(document).ready(function () {
        var wp_replace_list = new Array({
            "search": "",
            "replace": ""
        });
        init_render();
        render_list();

        function update_list() {
            wp_replace_list = new Array;
            for (var i = 0;; i++) {
                if ($("#olddomain" + i).length <= 0) break;
                wp_replace_list.push({
                    "search": $.trim($("#olddomain" + i).val()),
                    "replace": $.trim($("#newdomain" + i).val())
                })
            }
        }

        function render_list() {
            var replace_code = "";
            for (var i = 0; i < wp_replace_list.length; i++) {
                replace_code += '<p><input type="text" size="40" name="olddomain' + i + '" id="olddomain' +
                    i + '" placeholder="Search" value="' + wp_replace_list[i].search + '" >';
                replace_code += '<span class="dashicons dashicons-arrow-right-alt" style="margin:0 12px;line-height:inherit;"></span>';
                replace_code += '<input type="text" size="40" name="newdomain' + i + '" id="newdomain' + i + '" placeholder="Replace" value="' + wp_replace_list[i].replace + '" >';
                replace_code += '<span class="dashicons dashicons-no wp-delete-replace-list" style="margin:0 12px;line-height:inherit;cursor:pointer;" data-listid=' + i + "></span></p>"
            }
            $("#wp-search-replace").html(replace_code)
        }

        function init_render() {
            $("body").on("click", ".wp-delete-replace-list", function () {
                update_list();
                wp_replace_list.splice($(this).data("listid"), 1);
                render_list()
            });
            $("#wp-add-replace-list").click(function () {
                update_list();
                wp_replace_list.push({
                    "search": "",
                    "replace": ""
                });
                render_list();
                return false
            });
            $("#wp-import-submit").click(function () {
                if (!$("#wp-importxml").val()) {
                    $("#wp-import-error").show().html("<p>Error: please select an exported .xml file.</p>");
                    return false
                } else $("#wp-import-error").hide();
                update_list();
                for (var i = 0; i < wp_replace_list.length; i++) {
                    if (wp_replace_list[i].search.length > 0 && wp_replace_list[i].replace.length <= 0) {
                        $("#wp-replace-error").show().html("<p>Error: please enter the new domain or delete the whole row.</p>");
                        return false
                    }
                    if (wp_replace_list[i].search.length <= 0 && wp_replace_list[i].replace.length > 0) {
                        $("#wp-replace-error").show().html("<p>Error: please enter the old domain or delete the whole row.</p>");
                        return false
                    }
                }
            })
        }
    })
})(jQuery);
(function ($) {
    $(document).ready(function () {
        var wp_replace_list = new Array({
            "search": "",
            "replace": ""
        });
        init_render();
        render_list();

        function update_list() {
            wp_replace_list = new Array;
            for (var i = 0;; i++) {
                if ($("#standalonesearch" + i).length <= 0) break;
                wp_replace_list.push({
                    "search": $("#standalonesearch" + i).val(),
                    "replace": $("#standalonereplace" + i).val()
                })
            }
        }

        function render_list() {
            var replace_code = "";
            for (var i = 0; i < wp_replace_list.length; i++) {
                replace_code += '<p><input type="text" size="40" name="standalonesearch' +
                    i + '" id="standalonesearch' + i + '" placeholder="Search" value="' + wp_replace_list[i].search + '" >';
                replace_code += '<span class="dashicons dashicons-arrow-right-alt" style="margin:0 12px;line-height:inherit;"></span>';
                replace_code += '<input type="text" size="40" name="standalonereplace' + i + '" id="standalonereplace' + i + '" placeholder="Replace" value="' + wp_replace_list[i].replace + '" >';
                replace_code += '<span class="dashicons dashicons-no wp-standalone-delete-replace-list" style="margin:0 12px;line-height:inherit;cursor:pointer;" data-listid=' +
                    i + "></span></p>"
            }
            $("#wp-standalone-search-replace").html(replace_code)
        }

        function init_render() {
            $("body").on("click", ".wp-standalone-delete-replace-list", function () {
                update_list();
                wp_replace_list.splice($(this).data("listid"), 1);
                render_list()
            });
            $("#wp-add-standalone-replace-list").click(function () {
                update_list();
                wp_replace_list.push({
                    "search": "",
                    "replace": ""
                });
                render_list();
                return false
            });
            $("#wp-search-replace-submit").click(function () {
                update_list();
                for (var i = 0; i < wp_replace_list.length; i++) {
                    if (wp_replace_list[i].search.length >
                        0 && wp_replace_list[i].replace.length <= 0) {
                        $("#wp-standalone-replace-error").show().html("<p>Error: please enter the string to replace or delete the whole row.</p>");
                        return false
                    }
                    if (wp_replace_list[i].search.length <= 0 && wp_replace_list[i].replace.length > 0) {
                        $("#wp-standalone-replace-error").show().html("<p>Error: please enter the string to search or delete the whole row.</p>");
                        return false
                    }
                }
            })
        }
    });
    $.wpgridgalleryCookie = function (key, value, options) {
        if (typeof value !== "undefined") {
            options = $.extend({}, {
                    path: "/"
                },
                options);
            if (options.expires) {
                var seconds = options.expires;
                options.expires = new Date;
                options.expires.setTime(options.expires.getTime() + seconds * 1E3)
            }
            return document.cookie = key + "=" + encodeURIComponent(value) + (options.expires ? ";expires=" + options.expires.toUTCString() : "") + (options.path ? ";path=" + options.path : "")
        }
        var result = null;
        var cookies = document.cookie ? document.cookie.split(";") : [];
        for (var i in cookies) {
            var parts = $.trim(cookies[i]).split("=");
            if (parts.length && parts[0] == key) {
                result = decodeURIComponent(parts[1]);
                break
            }
        }
        return result
    };
    $.wpgridgalleryRemoveCookie = function (key) {
        return $.wpgridgalleryCookie(key, "", $.extend({}, {
            expires: -1
        }))
    }
})(jQuery);