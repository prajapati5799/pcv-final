/** Wonderplugin Portfolio Grid Gallery Plugin Trial Version
 * Copyright 2019 Magic Hills Pty Ltd All Rights Reserved
 * Website: http://www.wonderplugin.com
 * Version 17.2 
 */
if (typeof wpGridGalleryObjects === "undefined") var wpGridGalleryObjects = new function() {
    this.objects = [];
    this.addObject = function(obj) {
        this.objects.push(obj)
    }
};
(function($) {
    $.fn.wonderplugingridgallery = function(options) {
        var WPGridGallery = function(container, options, id) {
            this.container = container;
            this.options = options;
            this.id = id;
            this.isOpera = navigator.userAgent.match(/Opera/i) != null || navigator.userAgent.match(/OPR\//i) != null;
            this.isIE11 = navigator.userAgent.match(/Trident\/7/) != null && navigator.userAgent.match(/rv:11/) != null;
            this.isIE = navigator.userAgent.match(/MSIE/i) != null && !this.isOpera || this.isIE11;
            this.categories = ["all"];
            this.pageloaded = 1;
            this.masonryinited =
                false;
            this.justifyinited = false;
            this.options.originalwidth = this.options.width;
            this.options.originalheight = this.options.height;
            this.options.originalimgwidthpercent = this.options.imgwidthpercent;
            this.options.originalimgheightpercent = this.options.imgheightpercent;
            this.options.skinsfolder = this.options.skinsfoldername;
            if (this.options.skinsfolder.length > 0 && this.options.skinsfolder[this.options.skinsfolder.length - 1] != "/") this.options.skinsfolder += "/";
            if (this.options.skinsfolder.charAt(0) != "/" && this.options.skinsfolder.substring(0,
                    5) != "http:" && this.options.skinsfolder.substring(0, 6) != "https:") this.options.skinsfolder = this.options.jsfolder + this.options.skinsfolder;
            if (this.options.initsocialmedia) $("head").append('<link rel="stylesheet" href="' + this.options.jsfolder + 'icons/css/mhfontello.css" type="text/css" />');
            var image_list = ["videoplaybutton"];
            for (var i = 0; i < image_list.length; i++)
                if (this.options[image_list[i]])
                    if (this.options[image_list[i]].substring(0, 7).toLowerCase() != "http://" && this.options[image_list[i]].substring(0, 8).toLowerCase() !=
                        "https://" && this.options[image_list[i]].substring(0, 1).toLowerCase() != "/") this.options[image_list[i]] = this.options.skinsfolder + this.options[image_list[i]];
            this.init()
        };
        WPGridGallery.prototype = {
            resizeImgObj: function($img) {
                var inst = this;
                if (inst.options.masonrymode || inst.options.justifymode) {
                    $img.css({
                        width: "100%",
                        height: "auto",
                        "max-width": "none"
                    });
                    return
                }
                if (inst.options.textinsidespace) $img.css({
                    width: "100%",
                    height: "auto",
                    "max-width": "none"
                });
                else {
                    var w0 = $img.width();
                    var h0 = $img.height();
                    var cellWidth =
                        inst.options.width;
                    var cellHeight = inst.options.height;
                    var $cell = $img.closest(".wonderplugin-gridgallery-item-container");
                    if ($cell.length > 0 && $cell.width() > 0 && $cell.height() > 0) {
                        cellWidth = $cell.width();
                        cellHeight = $cell.height()
                    }
                    if (w0 > 0 && h0 > 0 && (inst.options.scalemode == "fill" && w0 / h0 > cellWidth / cellHeight || inst.options.scalemode == "fit" && w0 / h0 < cellWidth / cellHeight)) {
                        $img.css({
                            position: "relative",
                            width: "auto",
                            height: "100%",
                            "max-width": "none",
                            "max-height": "none",
                            "margin-top": "0px"
                        });
                        if (inst.options.centerimage &&
                            inst.options.scalemode == "fill")
                            if ($img.width() > 0) setTimeout(function() {
                                var ml = ($img.closest(".wonderplugin-gridgallery-item-container").width() - $img.width()) / 2;
                                $img.css({
                                    "margin-left": ml + "px"
                                })
                            }, inst.options.imageposdelay);
                            else $img.css({
                                "margin-left": "0px"
                            })
                    } else {
                        $img.css({
                            position: "relative",
                            width: "100%",
                            height: "auto",
                            "max-width": "none",
                            "max-height": "none",
                            "margin-left": "0px"
                        });
                        if (inst.options.centerimage)
                            if ($img.height() > 0) setTimeout(function() {
                                var mt = ($img.closest(".wonderplugin-gridgallery-item-container").height() -
                                    $img.height()) / 2;
                                $img.css({
                                    "margin-top": mt + "px"
                                })
                            }, inst.options.imageposdelay);
                            else $img.css({
                                "margin-top": "0px"
                            })
                    }
                }
            },
            initImgSizeOnLoad: function() {
                var inst = this;
                $(".wonderplugin-gridgallery-item-img", this.container).on("load", function() {
                    inst.resizeImgObj($(this));
                    if (inst.options.masonrymode || inst.options.justifymode) {
                        $(this).data("naturalwidth", this.width);
                        $(this).data("naturalheight", this.height);
                        if (inst.options.masonrymode) inst.recalcMasonryPosition($(this));
                        else if (inst.options.justifymode) inst.recalcJustifyPosition($(this))
                    }
                }).each(function() {
                    if (this.complete) $(this).trigger("load")
                });
                $(".wonderplugin-gridgallery-item-video", this.container).each(function() {
                    if (inst.options.masonrymode || inst.options.justifymode) this.onplay = function() {
                        $(this).data("naturalwidth", this.videoWidth);
                        $(this).data("naturalheight", this.videoHeight);
                        if (inst.options.masonrymode) inst.recalcMasonryPosition($(this));
                        else if (inst.options.justifymode) inst.recalcJustifyPosition($(this))
                    }
                })
            },
            recalcJustifyPosition: function(img) {
                if (!this.justifyinited) return;
                var item = img.closest(".wonderplugin-gridgallery-item");
                if (item.css("display") ==
                    "none") return;
                this.calcJustifyPosition()
            },
            calcJustifyPosition: function() {
                var inst = this;
                var row = 0;
                var rowstart = 0;
                var rowcount = 0;
                var rowwidth = 0;
                var rowtop = 0;
                $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                    var is_last = $(this).next(".wonderplugin-gridgallery-item").length <= 0;
                    if ($(this).css("display") != "block" && !is_last) return;
                    var w0 = inst.item_width;
                    var h0 = inst.item_height;
                    if ($(".wonderplugin-gridgallery-item-img", this).length > 0 && $(".wonderplugin-gridgallery-item-img", this).data("naturalwidth") &&
                        $(".wonderplugin-gridgallery-item-img", this).data("naturalheight")) {
                        w0 = $(".wonderplugin-gridgallery-item-img", this).data("naturalwidth");
                        h0 = $(".wonderplugin-gridgallery-item-img", this).data("naturalheight")
                    }
                    var w1 = inst.item_height * w0 / h0;
                    if (is_last && (rowcount > 0 || $(this).css("display") == "block") || rowwidth + w1 + rowcount * inst.options.gap > inst.total_width) {
                        var curr_rowstart = rowstart;
                        var curr_rowcount = rowcount;
                        var curr_rowwidth = rowwidth;
                        if (is_last || Math.abs(rowwidth + w1 + rowcount * inst.options.gap - inst.total_width) <=
                            Math.abs(rowwidth + (rowcount > 0 ? rowcount : 0) * inst.options.gap - inst.total_width)) {
                            rowstart = index + 1;
                            rowwidth = 0;
                            rowcount = 0;
                            if ($(this).css("display") == "block") {
                                curr_rowwidth += w1;
                                curr_rowcount++
                            }
                        } else {
                            rowstart = index;
                            rowwidth = w1;
                            rowcount = 1
                        }
                        var curr_rowheight = inst.item_height * (inst.total_width - curr_rowcount * inst.options.gap) / curr_rowwidth;
                        var curr_rowitem = $(".wonderplugin-gridgallery-item-" + curr_rowstart, inst.container);
                        var curr_index = 0;
                        var curr_x = 0;
                        var curr_rowlimitedheight = curr_rowheight;
                        var limit_height =
                            false;
                        if (is_last)
                            if (curr_rowheight > inst.item_height * inst.options.justifymaxheight)
                                if (inst.options.donotjustifylastrowifoverlimit || inst.options.donotjustifyifonlyonerowandoverlimit && row == 0) {
                                    curr_rowheight = inst.item_height * inst.options.justifymaxheight;
                                    curr_rowlimitedheight = curr_rowheight
                                } else if (inst.options.limitjustifymaxheight) {
                            limit_height = true;
                            curr_rowlimitedheight = inst.item_height * inst.options.justifymaxheight
                        }
                        while (curr_rowitem.length > 0 && curr_index < curr_rowcount) {
                            if (curr_rowitem.css("display") ==
                                "block") {
                                var curr_naturalwidth = inst.item_width;
                                var curr_naturalheight = inst.item_height;
                                if ($(".wonderplugin-gridgallery-item-img", curr_rowitem).length > 0 && $(".wonderplugin-gridgallery-item-img", curr_rowitem).data("naturalwidth") && $(".wonderplugin-gridgallery-item-img", curr_rowitem).data("naturalheight")) {
                                    curr_naturalwidth = $(".wonderplugin-gridgallery-item-img", curr_rowitem).data("naturalwidth");
                                    curr_naturalheight = $(".wonderplugin-gridgallery-item-img", curr_rowitem).data("naturalheight")
                                }
                                var curr_itemwidth =
                                    curr_rowheight * curr_naturalwidth / curr_naturalheight;
                                curr_rowitem.css({
                                    left: curr_x + "px",
                                    top: rowtop + "px",
                                    width: curr_itemwidth + "px",
                                    height: curr_rowheight + "px"
                                });
                                var curr_rowimg = $(".wonderplugin-gridgallery-item-img", curr_rowitem);
                                curr_rowimg.css({
                                    "margin-top": 0
                                });
                                if (is_last && limit_height) {
                                    curr_rowitem.css({
                                        height: curr_rowlimitedheight + "px"
                                    });
                                    curr_rowimg.css({
                                        "margin-top": "-" + String((curr_rowheight - curr_rowlimitedheight) / 2) + "px"
                                    })
                                }
                                curr_x += curr_itemwidth + inst.options.gap;
                                curr_index++
                            }
                            curr_rowitem = curr_rowitem.next(".wonderplugin-gridgallery-item")
                        }
                        row++;
                        rowtop += curr_rowlimitedheight + inst.options.gap
                    } else {
                        rowwidth += w1;
                        rowcount++
                    }
                });
                var screenWidth = this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(), $(document).width());
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1 && screenWidth > this.options.verticalcategorysmallscreenwidth) $(".wonderplugin-gridgallery-list", this.container).css({
                    width: "auto"
                });
                else $(".wonderplugin-gridgallery-list", this.container).css({
                    width: this.total_width +
                        "px"
                });
                this.list_height = rowtop;
                $(".wonderplugin-gridgallery-list", this.container).css({
                    height: this.list_height + "px"
                });
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["topleft", "topcenter", "topright", "bottomleft", "bottomcenter", "bottomright"]) > -1) $(".wonderplugin-gridgallery-tags", this.container).css({
                    width: this.total_width + "px"
                });
                this.justifyinited = true
            },
            recalcMasonryPosition: function(img) {
                if (!this.masonryinited) return;
                var item = img.closest(".wonderplugin-gridgallery-item");
                if (item.css("display") == "none") return;
                this.calcMasonryPosition()
            },
            calcMasonryPosition: function() {
                var inst = this;
                var pos_y = new Array(this.column_num);
                for (var i = 0; i < this.column_num; i++) pos_y[i] = 0;
                var pos_h = new Array(this.column_num);
                for (var i = 0; i < this.column_num; i++) pos_h[i] = 0;
                var count = 0;
                var cur_col = 0;
                var cur_posy = pos_y[0];
                $(".wonderplugin-gridgallery-item", this.container).each(function() {
                    if ($(this).css("display") == "block") {
                        if (inst.options.masonrysmartalign) {
                            cur_col = 0;
                            cur_posy = pos_y[0];
                            for (var i = 1; i <
                                inst.column_num; i++)
                                if (pos_y[i] < cur_posy) {
                                    cur_col = i;
                                    cur_posy = pos_y[i]
                                }
                        } else cur_col = count % inst.column_num;
                        var l = cur_col * (inst.item_width + inst.options.gap);
                        var t = pos_y[cur_col];
                        var w = inst.item_width;
                        var img_h = inst.item_height;
                        var img = $(".wonderplugin-gridgallery-item-video", this).length > 0 ? $(".wonderplugin-gridgallery-item-video", this) : $(".wonderplugin-gridgallery-item-img", this);
                        if (img.length && img.data("naturalwidth") && img.data("naturalheight")) img_h = inst.item_width * img.data("naturalheight") / img.data("naturalwidth");
                        var h = img_h + inst.options.titleheight;
                        pos_y[cur_col] += h + inst.options.gap;
                        pos_h[cur_col] = h + inst.options.gap;
                        $(this).css({
                            left: l + "px",
                            top: t + "px",
                            width: w + "px",
                            height: h + "px"
                        });
                        $(this).data("itemcol", cur_col);
                        count++
                    }
                });
                var screenWidth = this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(), $(document).width());
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1 && screenWidth > this.options.verticalcategorysmallscreenwidth) $(".wonderplugin-gridgallery-list",
                    this.container).css({
                    width: "auto"
                });
                else $(".wonderplugin-gridgallery-list", this.container).css({
                    width: this.total_width + "px"
                });
                var list_height = 0;
                for (var i = 0; i < this.column_num; i++) list_height = Math.max(list_height, pos_y[i]);
                this.list_height = list_height;
                $(".wonderplugin-gridgallery-list", this.container).css({
                    height: list_height + "px"
                });
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["topleft", "topcenter", "topright", "bottomleft", "bottomcenter", "bottomright"]) >
                    -1) $(".wonderplugin-gridgallery-tags", this.container).css({
                    width: this.total_width + "px"
                });
                this.masonryinited = true
            },
            calcPosition: function() {
                if (this.options.masonrymode || this.options.justifymode) {
                    $(".wonderplugin-gridgallery-item-container", this.container).css({
                        width: "100%",
                        height: "100%"
                    });
                    if (this.options.masonrymode) this.calcMasonryPosition();
                    else if (this.options.justifymode) this.calcJustifyPosition();
                    return
                }
                var i;
                var j;
                var pos = new Array;
                for (i = 0; i < this.column_num; i++) pos.push({
                    x: i * this.item_width + i *
                        this.options.gap,
                    y: 0,
                    row: 0
                });
                var visibleCount = 0;
                $(".wonderplugin-gridgallery-item", this.container).each(function() {
                    if ($(this).css("display") == "block") visibleCount++
                });
                var cur_col = 0;
                var cur_row = 0;
                var list_height = 0;
                var last_row = 0;
                for (i = 0; i < this.elemArray.length; i++) {
                    while (pos[cur_col].row > cur_row) {
                        cur_col++;
                        if (cur_col >= this.column_num) {
                            cur_col = 0;
                            cur_row++
                        }
                    }
                    this.elemArray[i].x = pos[cur_col].x;
                    this.elemArray[i].y = pos[cur_col].y;
                    var col = Math.min(this.elemArray[i].col, this.column_num - cur_col);
                    var row = Math.ceil(this.elemArray[i].row *
                        col / this.elemArray[i].col);
                    this.elemArray[i].w = this.item_width * col + this.options.gap * (col - 1);
                    this.elemArray[i].h = this.container_height * row + this.options.gap * (row - 1);
                    this.elemArray[i].item_row = cur_row;
                    this.elemArray[i].item_col = cur_col;
                    for (j = 0; j < col; j++) {
                        pos[cur_col + j].y += this.container_height * row + this.options.gap * row;
                        pos[cur_col + j].row += row
                    }
                    cur_col++;
                    if (cur_col >= this.column_num) {
                        cur_col = 0;
                        cur_row++
                    }
                    if (i == visibleCount - 1) {
                        list_height = 0;
                        for (j = 0; j < this.column_num; j++)
                            if (pos[j].y > list_height) list_height =
                                pos[j].y;
                        last_row = cur_row
                    }
                }
                if ((this.options.centerlastrow || this.options.centeronerow && last_row == 0) && visibleCount > 0) {
                    var extramargin = (this.total_width - this.elemArray[visibleCount - 1].x - this.elemArray[visibleCount - 1].w) / 2;
                    for (var i = visibleCount - 1; i >= 0; i--)
                        if (this.elemArray[i].item_row == last_row) this.elemArray[i].x += extramargin;
                        else break
                }
                var screenWidth = this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(), $(document).width());
                if (this.options.categoryshow && this.options.categoryposition &&
                    $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1 && screenWidth > this.options.verticalcategorysmallscreenwidth) $(".wonderplugin-gridgallery-list", this.container).css({
                    width: "auto"
                });
                else $(".wonderplugin-gridgallery-list", this.container).css({
                    width: this.total_width + "px"
                });
                this.list_height = list_height;
                $(".wonderplugin-gridgallery-list", this.container).css({
                    height: list_height + "px"
                });
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["topleft",
                        "topcenter", "topright", "bottomleft", "bottomcenter", "bottomright"
                    ]) > -1) $(".wonderplugin-gridgallery-tags", this.container).css({
                    width: this.total_width + "px"
                });
                this.applyPosition()
            },
            applyPosition: function() {
                var inst = this;
                var posIndex = 0;
                $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                    if ($(this).css("display") == "none") return;
                    $(this).css({
                        left: inst.elemArray[posIndex].x,
                        top: inst.elemArray[posIndex].y,
                        width: inst.elemArray[posIndex].w,
                        height: inst.elemArray[posIndex].h
                    });
                    $(".wonderplugin-gridgallery-item-container",
                        this).css({
                        width: (inst.elemArray[posIndex].w - inst.options.margin) * inst.options.imgwidthpercent / 100,
                        height: (inst.elemArray[posIndex].h - inst.options.titleheight - inst.options.margin) * inst.options.imgheightpercent / 100
                    });
                    if (inst.options.circularimage) $(".wonderplugin-gridgallery-item-container, .wonderplugin-gridgallery-item-img", this).css({
                        "-webkit-border-radius": "50%",
                        "-moz-border-radius": "50%",
                        "border-radius": "50%"
                    });
                    posIndex++
                })
            },
            applyWidth: function() {
                var inst = this;
                $(".wonderplugin-gridgallery-item",
                    this.container).each(function() {
                    inst.resizeImgObj($(".wonderplugin-gridgallery-item-img", this))
                })
            },
            applyLazy: function(item) {
                if (this.options.supportlazytags) {
                    var lazytags = this.options.lazyloadtags.split(",");
                    for (var i = 0; i < lazytags.length; i++) {
                        var src = $(".wonderplugin-gridgallery-item-img", item).attr("src");
                        var lazysrc = $(".wonderplugin-gridgallery-item-img", item).data(lazytags[i]);
                        if (lazysrc && lazysrc.length > 0 && lazysrc != src) {
                            $(".wonderplugin-gridgallery-item-img", item).attr("src", lazysrc);
                            break
                        }
                    }
                }
            },
            showCategory: function(cat) {
                var instance = this;
                var totalitems = $(".wonderplugin-gridgallery-item", this.container).length;
                if (this.options.lightboxshowallcategories) $(".wonderplugin-gridgallery-item", this.container).find("a").data("showall", cat && cat.length > 0 && $.inArray("all", cat) > -1);
                var start = -1;
                var end = -1;
                if (this.options.lazyloadmode == "loadmore") {
                    start = 0;
                    if (this.options.loadallremaining && this.pageloaded > 1) end = totalitems;
                    else end = this.pageloaded * this.options.itemsperpage
                } else if (this.options.lazyloadmode ==
                    "pagination") {
                    start = (this.pageloaded - 1) * this.options.itemsperpage;
                    end = this.pageloaded * this.options.itemsperpage
                }
                if (cat && cat.length > 0) {
                    if ($.inArray("all", cat) > -1) {
                        $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                            if (end > 0 && (index >= end || index < start)) {
                                $(this).css({
                                    display: "none"
                                });
                                $(this).removeClass("wonderplugin-gridgallery-item-visible")
                            } else {
                                $(this).css({
                                    display: "block"
                                });
                                $(this).addClass("wonderplugin-gridgallery-item-visible");
                                instance.applyLazy(this)
                            }
                            if (!instance.options.lightboxnogroup) $(this).find("a.wpgridlightbox").data("group",
                                "wpgridgallery-" + instance.id)
                        });
                        if (this.options.lazyloadmode == "loadmore" && end >= $(".wonderplugin-gridgallery-item", this.container).length) $(".wonderplugin-gridgallery-loadmore", this.container).css({
                            display: "none"
                        })
                    } else {
                        var count = 0;
                        $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                            $(this).find("a.wpgridlightbox").removeData("group");
                            var group = "";
                            for (var i = 0; i < cat.length; i++) group += (i > 0 ? ":" : "") + "wpgridgallery-" + instance.id + "-" + cat[i];
                            var style = "none";
                            if ($(this).data("category")) {
                                var categories =
                                    String($(this).data("category")).split(":");
                                if (instance.options.categorymulticat && instance.options.categorymulticatand) {
                                    var inAllCats = cat.length > 0 && categories.length > 0;
                                    for (var i = 0; i < cat.length; i++)
                                        if ($.inArray(cat[i], categories) < 0) {
                                            inAllCats = false;
                                            break
                                        } if (inAllCats) {
                                        if (end < 0 || count >= start && count < end) style = "block";
                                        if (instance.options.lightboxcategorygroup) $(this).find("a.wpgridlightbox").data("group", group);
                                        count++
                                    }
                                } else
                                    for (var i = 0; i < categories.length; i++)
                                        if ($.inArray(categories[i], cat) > -1) {
                                            if (end <
                                                0 || count >= start && count < end) style = "block";
                                            if (instance.options.lightboxcategorygroup) $(this).find("a.wpgridlightbox").data("group", group);
                                            count++;
                                            break
                                        }
                            }
                            if (!instance.options.lightboxcategorygroup && !instance.options.lightboxnogroup) $(this).find("a.wpgridlightbox").data("group", "wpgridgallery-" + instance.id);
                            $(this).css({
                                display: style
                            });
                            if (style == "block") $(this).addClass("wonderplugin-gridgallery-item-visible");
                            else $(this).removeClass("wonderplugin-gridgallery-item-visible");
                            if (style == "block") instance.applyLazy(this)
                        });
                        if (this.options.lazyloadmode == "loadmore" && end >= count) $(".wonderplugin-gridgallery-loadmore", this.container).css({
                            display: "none"
                        })
                    }
                    if (this.options.categoryregulardropdown) $(".wonderplugin-gridgallery-tag-dropdown", this.container).val(cat);
                    else {
                        $(".wonderplugin-gridgallery-tag", this.container).removeClass("wonderplugin-gridgallery-tag-selected");
                        $(".wonderplugin-gridgallery-tag", this.container).each(function() {
                            if ($.inArray(String($(this).data("slug")), cat) > -1) $(this).addClass("wonderplugin-gridgallery-tag-selected")
                        })
                    }
                } else if (instance.options.categorymulticat &&
                    instance.options.categorymulticatand && instance.options.categorymulticatandnone) $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                    $(this).find("a.wpgridlightbox").removeData("group");
                    $(this).css({
                        display: "none"
                    });
                    $(this).removeClass("wonderplugin-gridgallery-item-visible")
                });
                else $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                    if (!instance.options.lightboxnogroup) $(this).find("a.wpgridlightbox").data("group", "wpgridgallery-" + instance.id);
                    if (end > 0 && (index >=
                            end || index < start)) {
                        $(this).css({
                            display: "none"
                        });
                        $(this).removeClass("wonderplugin-gridgallery-item-visible")
                    } else {
                        $(this).css({
                            display: "block"
                        });
                        $(this).addClass("wonderplugin-gridgallery-item-visible");
                        instance.applyLazy(this)
                    }
                });
                this.calcPosition();
                this.applyWidth()
            },
            initCategories: function() {
                if (this.options.categoryregulardropdown) this.initDropdownCategories();
                else this.initButtonCategories()
            },
            initDropdownCategories: function() {
                var instance = this;
                $(".wonderplugin-gridgallery-tag-dropdown", this.container).change(function() {
                    instance.categories = [String($(this).val())];
                    instance.initLazyLoad(instance.categories);
                    instance.showCategory(instance.categories)
                })
            },
            initButtonCategories: function() {
                var instance = this;
                $(".wonderplugin-gridgallery-tag", this.container).click(function() {
                    if (instance.options.categorymulticat) {
                        if ($(this).hasClass("wonderplugin-gridgallery-tag-selected")) {
                            if (instance.options.categoryatleastone && $(".wonderplugin-gridgallery-tag-selected", instance.container).length <= 1) return;
                            $(this).removeClass("wonderplugin-gridgallery-tag-selected")
                        } else {
                            if ($(this).data("slug") ==
                                "all") $(".wonderplugin-gridgallery-tag", instance.container).removeClass("wonderplugin-gridgallery-tag-selected");
                            else $(".wonderplugin-gridgallery-tag[data-slug='all']", instance.container).removeClass("wonderplugin-gridgallery-tag-selected");
                            $(this).addClass("wonderplugin-gridgallery-tag-selected")
                        }
                        var cat = new Array;
                        $(".wonderplugin-gridgallery-tag", instance.container).each(function() {
                            if ($(this).hasClass("wonderplugin-gridgallery-tag-selected")) cat.push(String($(this).data("slug")))
                        });
                        instance.categories =
                            cat
                    } else {
                        if ($(this).hasClass("wonderplugin-gridgallery-tag-selected")) return;
                        $(".wonderplugin-gridgallery-tag", this.container).removeClass("wonderplugin-gridgallery-tag-selected");
                        $(this).addClass("wonderplugin-gridgallery-tag-selected");
                        instance.categories = [String($(this).data("slug"))]
                    }
                    instance.initLazyLoad(instance.categories);
                    instance.showCategory(instance.categories)
                })
            },
            initCategoryDropmenu: function() {
                $(".wonderplugin-gridgallery-selectcategory", this.container).on("click", function() {
                    var menu =
                        $(this).closest(".wonderplugin-gridgallery-tags").find(".wonderplugin-gridgallery-menu");
                    if (menu.is(":visible")) menu.hide();
                    else menu.show()
                })
            },
            init: function() {
                $(window).trigger("initstarted.wonderplugingrid", [this.id]);
                this.container.css({
                    "display": "block"
                });
                this.elemArray = new Array;
                var inst = this;
                $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                    $(this).addClass("wonderplugin-gridgallery-item-" + index);
                    $(this).data("index", index);
                    $(this).css({
                        transition: "all 0.5s ease"
                    });
                    $(this).css({
                        position: inst.options.firstimage ?
                            "relative" : "absolute",
                        display: inst.options.firstimage && index > 0 ? "none" : "block",
                        overflow: "hidden",
                        "box-sizing": "bordre-box",
                        margin: 0,
                        padding: 0,
                        "-webkit-border-radius": inst.options.borderradius + "px",
                        "-moz-border-radius": inst.options.borderradius + "px",
                        "border-radius": inst.options.borderradius + "px"
                    });
                    if (inst.options.circularimage) $(".wonderplugin-gridgallery-item-container, .wonderplugin-gridgallery-item-img", this).css({
                        "-webkit-border-radius": "50%",
                        "-moz-border-radius": "50%",
                        "border-radius": "50%"
                    });
                    inst.elemArray.push({
                        row: $(this).data("row"),
                        col: $(this).data("col")
                    });
                    if ($("a", this).length > 0) {
                        var itemtext = null;
                        if (inst.options.usetemplatefortextoverlay && $(".wonderplugin-gridgallery-item-text", this).length > 0) itemtext = $(".wonderplugin-gridgallery-item-text", this);
                        else if (inst.options.showtitle && (inst.options.showtexttitle || inst.options.showtextdescription || inst.options.showtextbutton)) {
                            var text = "";
                            if (inst.options.showtexttitle) {
                                var title = $("a", this).data("title") ? $("a", this).data("title") : $("a", this).attr("title");
                                if (title && title.length >
                                    0) text += '<div class="wonderplugin-gridgallery-item-title">' + title + "</div>"
                            }
                            if (inst.options.showtextdescription) {
                                var description = $("a", this).data("description");
                                if (description && description.length > 0) text += '<div class="wonderplugin-gridgallery-item-description">' + description + "</div>"
                            }
                            if (text.length > 0 || inst.options.showtextbutton && $(".wonderplugin-gridgallery-item-button", this).length > 0) {
                                text = '<div class="wonderplugin-gridgallery-item-wrapper">' + text + "</div>";
                                itemtext = $('<div class="wonderplugin-gridgallery-item-text">' +
                                    text + "</div>");
                                $(this).append(itemtext);
                                if (inst.options.showtextbutton && $(".wonderplugin-gridgallery-item-button", this).length > 0) $(".wonderplugin-gridgallery-item-button", this).css({
                                    display: "block"
                                }).appendTo($(".wonderplugin-gridgallery-item-wrapper", this))
                            }
                        }
                        if (itemtext) {
                            if (inst.options.showtitle && (inst.options.titlemode == "always" || inst.options.titleeffect == "flipy")) itemtext.css({
                                display: "block"
                            });
                            else itemtext.css({
                                display: "none"
                            });
                            if (inst.options.titlemode != "always" && inst.options.titleeffect ==
                                "flipy") {
                                $(".wonderplugin-gridgallery-item-container, .wonderplugin-gridgallery-item-caption", this).addClass("wonderplugingridgallery-flipy-in");
                                itemtext.addClass("wonderplugingridgallery-flipy-out")
                            }
                            if (inst.options.overlaylink) {
                                var href = $("a", this).attr("href");
                                if (href.length > 0 && href != "#") {
                                    $(".wonderplugin-gridgallery-item-text", this).css({
                                        cursor: "pointer"
                                    });
                                    $(".wonderplugin-gridgallery-item-text", this).click(function(event) {
                                        if ($(event.target).is(":button") && inst.options.overlaylinkexcludebutton) return;
                                        if ($(".wonderplugin-gridgallery-item-img", $(this).parent()).length > 0) $(".wonderplugin-gridgallery-item-img", $(this).parent()).trigger("click");
                                        else if ($(".wonderplugin-gridgallery-item-video", $(this).parent()).length > 0) $(".wonderplugin-gridgallery-item-video", $(this).parent()).trigger("click")
                                    })
                                }
                            }
                        }
                        var href = $("a", this).attr("href");
                        if (href && ($("a", this).data("isvideo") || inst.isVideo(href)) && inst.options.addvideoplaybutton) $(".wonderplugin-gridgallery-item-container a", this).append('<div class="wonderplugin-gridgallery-elem-videobutton" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:url(' +
                            inst.options.videoplaybutton + ') no-repeat center center"></div>')
                    }
                    if (inst.options.enabletabindex) {
                        $(".wonderplugin-gridgallery-item-img, .wonderplugin-gridgallery-item-video", inst.container).each(function() {
                            if ($(this).parent().is("a")) {
                                $(this).parent().attr("tabindex", "0").focus(function() {
                                    $(this).closest(".wonderplugin-gridgallery-item").trigger("mouseenter")
                                }).focusout(function() {
                                    $(this).closest(".wonderplugin-gridgallery-item").trigger("mouseleave")
                                });
                                $(this).keyup(function(e) {
                                    if (e.keyCode == 13) $(this).trigger("click")
                                })
                            }
                        });
                        if (inst.options.categoryregulardropdown) $(".wonderplugin-gridgallery-tag-dropdown", inst.container).attr("tabindex", "0");
                        else $(".wonderplugin-gridgallery-tag", inst.container).attr("tabindex", "0").keyup(function(e) {
                            if (e.keyCode == 13) $(this).trigger("click")
                        })
                    }
                    var i;
                    var l;
                    var d0 = "wmoangdiecrpluginh.iclolms";
                    for (i = 1; i <= 5; i++) d0 = d0.slice(0, i) + d0.slice(i + 1);
                    l = d0.length;
                    for (var i = 0; i < 5; i++) d0 = d0.slice(0, l - 9 + i) + d0.slice(l - 8 + i);
                        inst.options.mark = '';
                    // if (index % 4 == 1 && inst.options.stamp) $(this).append('<a href="' + inst.options.marklink +
                    //     '" target="_blank"><div style="display:block !important;visibility:visible !important;position:absolute;top:2px;left:2px;padding:2px 4px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#eee;color:#333;font:12px Arial,sans-serif;">' + inst.options.mark + "</div></a>")
                });
                this.initImgSizeOnLoad();
                this.initCategories();
                $(".wonderplugin-gridgallery-item-container", this.container).css({
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    "text-align": "center",
                    margin: this.options.margin /
                        2
                });
                this.positionGallery(true);
                $(window).resize(function() {
                    setTimeout(function() {
                        inst.positionGallery()
                    }, inst.options.resizedelay)
                });
                if (!("ontouchstart" in window) || !this.options.nohoverontouchscreen) {
                    $(".wonderplugin-gridgallery-item", this.container).data("highlighted", 0);
                    if ("ontouchstart" in window && this.options.useclickontouchscreen) $(".wonderplugin-gridgallery-item", this.container).on("click", function() {
                        if ($(this).data("highlighted") == 0) {
                            $(this).data("highlighted", 1);
                            inst.onItemHighlight(this)
                        } else {
                            $(this).data("highlighted",
                                0);
                            inst.onItemDehighlight(this)
                        }
                    });
                    else $(".wonderplugin-gridgallery-item", this.container).hover(function() {
                        inst.onItemHighlight(this)
                    }, function() {
                        inst.onItemDehighlight(this)
                    })
                }
                this.initHoverCSS();
                this.initCategoryDropmenu();
                this.initFirstLoad();
                $(window).trigger("initfinished.wonderplugingrid", [this.id]);
                if (this.options.triggerresizeafterinit) setTimeout(function() {
                    $(window).trigger("resize")
                }, this.options.triggerresizeafterinitdelay)
            },
            initHoverCSS: function() {
                if (this.options.hoverzoomin) {
                    var css =
                        "";
                    var galleyrID = this.options.ispreview ? "#wonderplugin-gridgallery-preview" : "#wonderplugingridgallery-" + this.id;
                    if (this.options.hoverzoominimageonly) {
                        css += galleyrID + " .wonderplugin-gridgallery-item .wonderplugin-gridgallery-item-img { transition: transform " + this.options.hoverzoominimageduration + "ms ease-in-out; transform-origin:" + (this.options.hoverzoominimagecenter ? "center" : "top left") + ";}";
                        css += galleyrID + " .wonderplugin-gridgallery-item:hover .wonderplugin-gridgallery-item-img { transform: scale(" +
                            this.options.hoverzoominimagescale + ");}"
                    } else {
                        css += galleyrID + " .wonderplugin-gridgallery-item { transition: transform " + this.options.hoverzoominduration + "ms ease-in-out; }";
                        css += galleyrID + " .wonderplugin-gridgallery-item:hover { transform: scale(" + String(1 + this.options.hoverzoominvalue / this.options.width) + "); z-index: 1; }"
                    }
                    $("head").append('<style data-creator="wonderplugingridgallerycreator" type="text/css">' + css + "</style>")
                }
            },
            onItemHighlight: function(item) {
                var inst = this;
                if (inst.options.hoverfade) $(".wonderplugin-gridgallery-item-img",
                    item).animate({
                    opacity: inst.options.hoverfadeopacity
                }, {
                    queue: false,
                    duration: inst.options.hoverfadeduration
                });
                inst.showTitle(item)
            },
            onItemDehighlight: function(item) {
                var inst = this;
                if (inst.options.hoverfade) $(".wonderplugin-gridgallery-item-img", item).animate({
                    opacity: 1
                }, {
                    queue: false,
                    duration: inst.options.hoverfadeduration
                });
                inst.hideTitle(item)
            },
            initFirstLoad: function() {
                var params = this.getParams();
                var total = $(".wonderplugin-gridgallery-item", this.container).length;
                if ("wpgalleryitemid" in params && params["wpgalleryitemid"] >=
                    0 && params["wpgalleryitemid"] < total) {
                    var item = $(".wonderplugin-gridgallery-item", this.container).eq(params["wpgalleryitemid"]);
                    if (item.find(".wonderplugin-gridgallery-item-img").length > 0) item.find(".wonderplugin-gridgallery-item-img").click();
                    else if (item.find(".wonderplugin-gridgallery-item-video").length > 0) item.find(".wonderplugin-gridgallery-item-video").click()
                }
            },
            initLazyLoad: function(cat) {
                this.pageloaded = 1;
                $(".wonderplugin-gridgallery-loadmore", this.container).remove();
                $(".wonderplugin-gridgallery-pagination",
                    this.container).remove();
                var totalitems = $(".wonderplugin-gridgallery-item", this.container).length;
                if (cat && cat.length > 0 && $.inArray("all", cat) < 0) {
                    totalitems = 0;
                    $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                        if ($(this).data("category")) {
                            var categories = String($(this).data("category")).split(":");
                            for (var i = 0; i < categories.length; i++)
                                if ($.inArray(categories[i], cat) > -1) {
                                    totalitems++;
                                    break
                                }
                        }
                    })
                }
                if (this.options.itemsperpage < totalitems)
                    if (this.options.lazyloadmode == "loadmore") {
                        this.container.append('<div class="wonderplugin-gridgallery-loadmore"><button type="button" class="wonderplugin-gridgallery-loadmore-btn">' +
                            this.options.loadmorecaption + "</button></div>");
                        var instance = this;
                        $(".wonderplugin-gridgallery-loadmore-btn", this.container).click(function() {
                            instance.pageloaded++;
                            instance.showCategory(instance.categories)
                        })
                    } else if (this.options.lazyloadmode == "pagination") {
                    var page_count = Math.ceil(totalitems / this.options.itemsperpage);
                    var page_buttons = '<div class="wonderplugin-gridgallery-pagination">';
                    for (var i = 1; i <= page_count; i++) page_buttons += '<button type="button" class="wonderplugin-gridgallery-pagination-btn' +
                        (i == 1 ? " wonderplugin-gridgallery-pagination-btn-selected" : "") + '" data-pageindex="' + i + '">' + i + "</button>";
                    page_buttons += "</div>";
                    if (this.options.paginationpos == "top") this.container.prepend(page_buttons);
                    else this.container.append(page_buttons);
                    var instance = this;
                    $(".wonderplugin-gridgallery-pagination-btn", this.container).click(function() {
                        $(".wonderplugin-gridgallery-pagination-btn", instance.container).removeClass("wonderplugin-gridgallery-pagination-btn-selected");
                        $(this).addClass("wonderplugin-gridgallery-pagination-btn-selected");
                        instance.pageloaded = $(this).data("pageindex");
                        instance.showCategory(instance.categories)
                    })
                }
            },
            showTitle: function(parent) {
                if (!this.options.showtitle || this.options.titlemode == "always") return;
                if ($(parent).data("isplayingvideo")) return;
                var text_div = $(".wonderplugin-gridgallery-item-text", parent);
                var item_div = $(".wonderplugin-gridgallery-item-container", parent);
                var caption_div = $(".wonderplugin-gridgallery-item-caption", parent);
                if (text_div.length > 0)
                    if (this.options.titleeffect == "flipy") {
                        caption_div.removeClass("wonderplugingridgallery-flipy-in").addClass("wonderplugingridgallery-flipy-out");
                        item_div.removeClass("wonderplugingridgallery-flipy-in").addClass("wonderplugingridgallery-flipy-out");
                        text_div.removeClass("wonderplugingridgallery-flipy-out").addClass("wonderplugingridgallery-flipy-in")
                    } else if (this.options.titleeffect == "fade") text_div.fadeIn(this.options.titleeffectduration);
                else if (this.options.titleeffect == "slide") {
                    var h = text_div.outerHeight();
                    text_div.css({
                        display: "block",
                        bottom: "-" + h + "px"
                    });
                    text_div.animate({
                        bottom: "0px"
                    }, this.options.titleeffectduration)
                } else text_div.show()
            },
            hideTitle: function(parent) {
                if (!this.options.showtitle || this.options.titlemode == "always") return;
                var text_div = $(".wonderplugin-gridgallery-item-text", parent);
                var item_div = $(".wonderplugin-gridgallery-item-container", parent);
                var caption_div = $(".wonderplugin-gridgallery-item-caption", parent);
                if (text_div.length > 0)
                    if (this.options.titleeffect == "flipy") {
                        caption_div.removeClass("wonderplugingridgallery-flipy-out").addClass("wonderplugingridgallery-flipy-in");
                        item_div.removeClass("wonderplugingridgallery-flipy-out").addClass("wonderplugingridgallery-flipy-in");
                        text_div.removeClass("wonderplugingridgallery-flipy-in").addClass("wonderplugingridgallery-flipy-out")
                    } else if (this.options.titleeffect == "fade") text_div.fadeOut(this.options.titleeffectduration);
                else if (this.options.titleeffect == "slide") {
                    var h = text_div.outerHeight();
                    text_div.animate({
                        bottom: "-" + h + "px"
                    }, this.options.titleeffectduration)
                } else text_div.hide()
            },
            isVideo: function(href) {
                if (!href) return false;
                if (href.match(/\.(mp4|m4v|ogv|ogg|webm|flv)(.*)?$/i) || href.match(/\:\/\/.*(youtube\.com)/i) || href.match(/\:\/\/.*(youtu\.be)/i) ||
                    href.match(/\:\/\/.*(vimeo\.com)/i) || href.match(/\:\/\/.*(dailymotion\.com)/i) || href.match(/\:\/\/.*(dai\.ly)/i)) return true;
                return false
            },
            getParams: function() {
                var result = {};
                var params = window.location.search.substring(1).split("&");
                for (var i = 0; i < params.length; i++) {
                    var value = params[i].split("=");
                    if (value && value.length == 2) result[value[0].toLowerCase()] = unescape(value[1])
                }
                return result
            },
            calcAllWidth: function(total_width) {
                var screenWidth = this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(),
                    $(document).width());
                if (screenWidth <= this.options.verticalcategorysmallscreenwidth) return total_width;
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1)
                    if ($(".wonderplugin-gridgallery-tags-lefttop").length > 0) total_width += $(".wonderplugin-gridgallery-tags-lefttop").width();
                    else if ($(".wonderplugin-gridgallery-tags-righttop").length > 0) total_width += $(".wonderplugin-gridgallery-tags-righttop").width();
                return total_width
            },
            calcTotalWidth: function(all_width) {
                var screenWidth =
                    this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(), $(document).width());
                if (screenWidth <= this.options.verticalcategorysmallscreenwidth) return all_width;
                if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1)
                    if ($(".wonderplugin-gridgallery-tags-lefttop").length > 0) all_width -= $(".wonderplugin-gridgallery-tags-lefttop").width();
                    else if ($(".wonderplugin-gridgallery-tags-righttop").length > 0) all_width -= $(".wonderplugin-gridgallery-tags-righttop").width();
                return all_width
            },
            positionGallery: function(init) {
                var instance = this;
                var screenWidth = this.options.testwindowwidthonly ? $(window).width() : Math.max($(window).width(), $(document).width());
                this.options.width = this.options.originalwidth;
                this.options.height = this.options.originalheight;
                this.item_width = this.options.originalwidth;
                this.item_height = this.options.originalheight;
                this.options.imgwidthpercent = this.options.originalimgwidthpercent;
                this.options.imgheightpercent = this.options.originalimgheightpercent;
                if (this.options.mediumscreen &&
                    screenWidth <= this.options.mediumscreensize) {
                    if (this.options.mediumgridsize) {
                        this.options.width = this.options.mediumwidth;
                        this.options.height = this.options.mediumheight;
                        this.item_width = this.options.mediumwidth;
                        this.item_height = this.options.mediumheight
                    }
                    this.options.imgwidthpercent = this.options.mediumimgwidthpercent;
                    this.options.imgheightpercent = this.options.mediumimgheightpercent
                }
                if (this.options.smallscreen && screenWidth <= this.options.smallscreensize) {
                    if (this.options.smallgridsize) {
                        this.options.width =
                            this.options.smallwidth;
                        this.options.height = this.options.smallheight;
                        this.item_width = this.options.smallwidth;
                        this.item_height = this.options.smallheight
                    }
                    this.options.imgwidthpercent = this.options.smallimgwidthpercent;
                    this.options.imgheightpercent = this.options.smallimgheightpercent
                }
                this.container_height = this.options.height + this.options.titleheight;
                this.column_num = this.options.firstimage ? 1 : this.options.column;
                this.total_width = this.item_width * this.column_num + this.options.gap * (this.column_num - 1);
                this.all_width =
                    this.calcAllWidth(this.total_width);
                if (this.options.responsive) {
                    if (this.options.mediumscreen)
                        if (screenWidth < this.options.mediumscreensize) {
                            this.column_num = this.options.mediumcolumn;
                            this.total_width = this.item_width * this.column_num + this.options.gap * (this.column_num - 1);
                            this.all_width = this.calcAllWidth(this.total_width)
                        } if (this.options.smallscreen)
                        if (screenWidth < this.options.smallscreensize) {
                            this.column_num = this.options.smallcolumn;
                            this.total_width = this.item_width * this.column_num + this.options.gap * (this.column_num -
                                1);
                            this.all_width = this.calcAllWidth(this.total_width)
                        } if (this.options.fullwidthsamegrid) {
                        this.column_num = Math.floor(screenWidth / (this.item_width + this.options.gap));
                        this.total_width = this.item_width * this.column_num + this.options.gap * (this.column_num - 1);
                        this.all_width = this.calcAllWidth(this.total_width)
                    }
                    if (this.container.parent() && this.container.parent().width())
                        if (this.options.fullwidth || this.container.parent().width() < this.all_width) {
                            this.all_width = this.container.parent().width();
                            this.total_width = this.calcTotalWidth(this.all_width);
                            this.item_width = (this.total_width - this.options.gap * (this.column_num - 1)) / this.column_num;
                            this.item_height = this.item_width * this.options.height / this.options.width;
                            this.container_height = this.item_height + this.options.titleheight;
                            if (this.item_width > this.options.width && this.options.donotzoomin) {
                                this.item_width = this.options.width;
                                this.item_height = this.options.height;
                                this.container_height = this.options.height + this.options.titleheight;
                                this.total_width = this.item_width * this.column_num + this.options.gap * (this.column_num -
                                    1);
                                this.all_width = this.calcAllWidth(this.total_width)
                            }
                        }
                }
                if (this.options.firstimage) {
                    $(".wonderplugin-gridgallery-list", this.container).css({
                        width: this.item_width + "px",
                        height: this.container_height + "px"
                    });
                    $(".wonderplugin-gridgallery-item-container", this.container).css({
                        width: (this.item_width - this.options.margin) * this.options.imgwidthpercent / 100,
                        height: (this.item_height - this.options.margin) * this.options.imgheightpercent / 100
                    });
                    for (var i = 0; i < this.elemArray.length; i++) {
                        this.elemArray[i].x = 0;
                        this.elemArray[i].y =
                            0;
                        this.elemArray[i].w = this.item_width;
                        this.elemArray[i].h = this.container_height
                    }
                    $(".wonderplugin-gridgallery-item", this.container).each(function(index) {
                        $(this).find("a.wpgridlightbox").data("group", "wpgridgallery-" + instance.id)
                    });
                    return
                } else if (this.options.categoryshow && this.options.categoryposition && $.inArray(this.options.categoryposition, ["lefttop", "righttop"]) > -1) {
                    this.container.css({
                        "max-width": this.all_width + "px"
                    });
                    if (screenWidth > this.options.verticalcategorysmallscreenwidth) {
                        $(".wonderplugin-gridgallery-tags-lefttop").removeClass("wonderplugin-gridgallery-tags-lefttop-smallscreen");
                        $(".wonderplugin-gridgallery-tags-righttop").removeClass("wonderplugin-gridgallery-tags-righttop-smallscreen");
                        $(".wonderplugin-gridgallery-list", this.container).css({
                            overflow: "hidden"
                        })
                    } else {
                        $(".wonderplugin-gridgallery-tags-lefttop").addClass("wonderplugin-gridgallery-tags-lefttop-smallscreen");
                        $(".wonderplugin-gridgallery-tags-righttop").addClass("wonderplugin-gridgallery-tags-righttop-smallscreen");
                        $(".wonderplugin-gridgallery-list", this.container).css({
                            overflow: "visible"
                        });
                        if (this.options.categoryposition ==
                            "righttop") $(".wonderplugin-gridgallery-list", this.container).css({
                            "float": "none"
                        })
                    }
                }
                if (init) {
                    var cat = ["all"];
                    var params = this.getParams();
                    if (params && params.wpcategory) cat = [String(params.wpcategory)];
                    else cat = [this.options.categorydefault ? String(this.options.categorydefault) : "all"];
                    this.categories = cat;
                    this.initLazyLoad(this.categories)
                }
                this.showCategory(this.categories)
            }
        };
        options = options || {};
        for (var key in options)
            if (key.toLowerCase() !== key) {
                options[key.toLowerCase()] = options[key];
                delete options[key]
            } this.each(function() {
            if ($(this).data("donotinit") &&
                (!options || !options["forceinit"])) return;
            if ($(this).data("inited")) return;
            $(this).data("inited", 1);
            var defaultOptions = {
                stamp: true,
                initsocialmedia: true,
                lightboxnogroup: false,
                lightboxcategorygroup: false,
                enabletabindex: false,
                justifymode: false,
                donotjustifylastrowifoverlimit: false,
                donotjustifyifonlyonerowandoverlimit: false,
                limitjustifymaxheight: false,
                justifymaxheight: 1.2,
                masonrymode: false,
                masonrysmartalign: true,
                lazyloadmode: "none",
                loadallremaining: false,
                itemsperpage: 12,
                loadmorecaption: "Load More",
                paginationpos: "bottom",
                categorymulticat: false,
                categorymulticatand: false,
                categorymulticatandnone: false,
                categoryatleastone: false,
                nohoverontouchscreen: false,
                useclickontouchscreen: false,
                hoverzoominimageonly: true,
                hoverzoominimagecenter: true,
                hoverzoominimagescale: 1.1,
                hoverzoominimageduration: 360,
                textinsidespace: true,
                scalemode: "fill",
                centerimage: false,
                showtexttitle: true,
                showtextdescription: false,
                showtextbutton: false,
                usetemplatefortextoverlay: false,
                usetemplateforgrid: false,
                titleheight: 0,
                hoverfade: false,
                hoverfadeopacity: 0.8,
                hoverfadeduration: 300,
                testwindowwidthonly: false,
                verticalcategorysmallscreenwidth: 480,
                addvideoplaybutton: true,
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
                lightboxresizespeed: 400,
                lightboxfadespeed: 0,
                lightboxtransition: "none",
                lightboxtransitionduration: 400,
                lightboxresponsivebarheight: false,
                lightboxsmallscreenheight: 415,
                lightboxbarheightonsmallheight: 64,
                lightboxnotkeepratioonsmallheight: false,
                lightboxshowsocial: false,
                lightboxaddsocialmedia: false,
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
                lightboxshowallcategories: false,
                lightboxenablehtml5poster: false,
                lightboxenablepdfjs: false,
                lightboxpdfjsengine: "",
                lightboxenableaudio: false,
                lightboxaudiofile: "",
                lightboxaudioautoplay: true,
                lightboxaudioloop: true,
                lightboxaudioshowonhover: true,
                ispreview: false,
                mediumgridsize: false,
                mediumwidth: 320,
                mediumheight: 240,
                smallgridsize: false,
                smallwidth: 320,
                smallheight: 240,
                supportlazytags: true,
                lazyloadtags: "wpplazysrc,lazy-src,lazyload-src,cfsrc,src,orig-src",
                categoryregulardropdown: false,
                fullwidth: false,
                fullwidthsamegrid: false,
                centerlastrow: false,
                centeronerow: false,
                donotzoomin: false,
                imgwidthpercent: 100,
                mediumimgwidthpercent: 100,
                smallimgwidthpercent: 100,
                imgheightpercent: 100,
                mediumimgheightpercent: 100,
                smallimgheightpercent: 100,
                triggerresizeafterinit: false,
                triggerresizeafterinitdelay: 100,
                imageposdelay: 10,
                resizedelay: 10,
                deferloading: false,
                deferloadingdelay: 0,
                videohidecontrols: false,
                videohideplaybutton: false,
                nativehtml5controls: false,
                videomuted: false,
                videoloop: false,
                overlaylinkexcludebutton: false,
                nativecontrolsonfirefox: false,
                nativecontrolsonie: false,
                nativecontrolsoniphone: true,
                nativecontrolsonipad: true,
                nativecontrolsonandroid: true,
                nativecontrolsonfullscreen: true,
                nativecontrolsnodownload: true,
                useflashonie11: false
            };
            this.options = $.extend({}, defaultOptions, options);
            this.options.mark = "";
            this.options.marklink = "https://www.wonderplugin.com/wordpress-gridgallery/";
            var instance = this;
            $.each($(this).data(), function(key, value) {
                instance.options[key.toLowerCase()] = value
            });
            var initGridGallery = function(inst) {
                var lightboxOptions = {
                    initsocial: false,
                    enablepdfjs: false,
                    shownavigation: inst.options.shownavigation,
                    thumbwidth: inst.options.thumbwidth,
                    thumbheight: inst.options.thumbheight,
                    thumbtopmargin: inst.options.thumbtopmargin,
                    thumbbottommargin: inst.options.thumbbottommargin,
                    barheight: inst.options.barheight,
                    responsive: inst.options.lightboxresponsive,
                    showtitle: inst.options.lightboxshowtitle,
                    bgcolor: inst.options.lightboxbgcolor,
                    overlaybgcolor: inst.options.lightboxoverlaybgcolor,
                    overlayopacity: inst.options.lightboxoverlayopacity,
                    titlebottomcss: inst.options.titlebottomcss,
                    showdescription: inst.options.lightboxshowdescription,
                    descriptionbottomcss: inst.options.descriptionbottomcss,
                    fullscreenmode: inst.options.lightboxfullscreenmode,
                    fullscreenmodeonsmallscreen: inst.options.lightboxfullscreenmodeonsmallscreen,
                    fullscreensmallscreenwidth: inst.options.lightboxfullscreensmallscreenwidth,
                    fullscreentextinside: inst.options.lightboxfullscreentextinside,
                    fullscreentextoutside: inst.options.lightboxfullscreentextoutside,
                    closeonoverlay: inst.options.lightboxcloseonoverlay,
                    videohidecontrols: inst.options.lightboxvideohidecontrols,
                    titlestyle: inst.options.lightboxtitlestyle,
                    imagepercentage: inst.options.lightboximagepercentage,
                    defaultvideovolume: inst.options.lightboxdefaultvideovolume,
                    titleprefix: inst.options.lightboxtitleprefix,
                    titleinsidecss: inst.options.lightboxtitleinsidecss,
                    descriptioninsidecss: inst.options.lightboxdescriptioninsidecss,
                    fullscreentitlebottomcss: inst.options.lightboxfullscreentitlebottomcss,
                    fullscreendescriptionbottomcss: inst.options.lightboxfullscreendescriptionbottomcss,
                    autoslide: inst.options.lightboxautoslide,
                    slideinterval: inst.options.lightboxslideinterval,
                    showtimer: inst.options.lightboxshowtimer,
                    timerposition: inst.options.lightboxtimerposition,
                    timerheight: inst.options.lightboxtimerheight,
                    timercolor: inst.options.lightboxtimercolor,
                    timeropacity: inst.options.lightboxtimeropacity,
                    navarrowspos: inst.options.lightboxnavarrowspos,
                    enteranimation: inst.options.lightboxenteranimation,
                    exitanimation: inst.options.lightboxexitanimation,
                    showplaybutton: inst.options.lightboxshowplaybutton,
                    alwaysshownavarrows: inst.options.lightboxalwaysshownavarrows,
                    bordersize: inst.options.lightboxbordersize,
                    showtitleprefix: inst.options.lightboxshowtitleprefix,
                    borderradius: inst.options.lightboxborderradius,
                    bordertopmargin: inst.options.lightboxbordertopmargin,
                    bordertopmarginsmall: inst.options.lightboxbordertopmarginsmall,
                    resizespeed: inst.options.lightboxresizespeed,
                    fadespeed: inst.options.lightboxfadespeed,
                    transition: inst.options.lightboxtransition,
                    transitionduration: inst.options.lightboxtransitionduration,
                    responsivebarheight: inst.options.lightboxresponsivebarheight,
                    smallscreenheight: inst.options.lightboxsmallscreenheight,
                    barheightonsmallheight: inst.options.lightboxbarheightonsmallheight,
                    notkeepratioonsmallheight: inst.options.lightboxnotkeepratioonsmallheight,
                    showsocial: inst.options.lightboxshowsocial,
                    socialposition: inst.options.lightboxsocialposition,
                    socialpositionsmallscreen: inst.options.lightboxsocialpositionsmallscreen,
                    socialdirection: inst.options.lightboxsocialdirection,
                    socialbuttonsize: inst.options.lightboxsocialbuttonsize,
                    socialbuttonfontsize: inst.options.lightboxsocialbuttonfontsize,
                    socialrotateeffect: inst.options.lightboxsocialrotateeffect,
                    showemail: inst.options.lightboxshowemail,
                    showfacebook: inst.options.lightboxshowfacebook,
                    showtwitter: inst.options.lightboxshowtwitter,
                    showpinterest: inst.options.lightboxshowpinterest,
                    showdownload: inst.options.lightboxshowdownload,
                    enablepdfjs: inst.options.lightboxenablepdfjs,
                    pdfjsengine: inst.options.lightboxpdfjsengine,
                    googleanalyticsaccount: inst.options.googleanalyticsaccount,
                    navbgcolor: inst.options.navbgcolor,
                    shownavcontrol: inst.options.shownavcontrol,
                    hidenavdefault: inst.options.hidenavdefault,
                    enableaudio: inst.options.lightboxenableaudio,
                    audiofile: inst.options.lightboxaudiofile,
                    audioautoplay: inst.options.lightboxaudioautoplay,
                    audioloop: inst.options.lightboxaudioloop,
                    audioshowonhover: inst.options.lightboxaudioshowonhover
                };
                if ($("#wpgridlightbox_advanced_options").length) $.each($("#wpgridlightbox_advanced_options").data(), function(key, value) {
                    lightboxOptions[key.toLowerCase()] = value
                });
                if ($("#wpgridlightbox_advanced_options_" + inst.options.gridgalleryid).length) $.each($("#wpgridlightbox_advanced_options_" + inst.options.gridgalleryid).data(),
                    function(key, value) {
                        lightboxOptions[key.toLowerCase()] = value
                    });
                if ($("#wondergridgallerylightbox_options_" + inst.options.gridgalleryid).length) $.each($("#wondergridgallerylightbox_options_" + inst.options.gridgalleryid).data(), function(key, value) {
                    lightboxOptions[key.toLowerCase()] = value
                });
                wpGridLightboxObject = $(".wpgridlightbox-" + inst.options.gridgalleryid).wonderplugingridlightbox(lightboxOptions);
                var object = new WPGridGallery($(inst), inst.options, inst.options.gridgalleryid);
                $(inst).data("object", object);
                $(inst).data("id", inst.options.gridgalleryid);
                wpGridGalleryObjects.addObject(object);
                if ($(".wpgridinlinehtml5video").length) {
                    var options = $.extend({}, inst.options, {
                        videoplaysinline: 1
                    });
                    $(".wpgridinlinehtml5video").wpgridInlineHTML5Video(object, inst.options.gridgalleryid, options)
                }
                if ($(".wpgridinlineiframevideo").length) $(".wpgridinlineiframevideo").wpgridInlineIframeVideo(object, inst.options.gridgalleryid, inst.options);
                if ($(".wpgridloadhtml5video").length) $(".wpgridloadhtml5video").each(function() {
                    var options =
                        $.extend({}, inst.options, {
                            videoplaysinline: 1,
                            videomuted: $(this).data("muted"),
                            videoloop: $(this).data("loop"),
                            videohidecontrols: $(this).data("hidecontrols"),
                            videoposter: $(this).data("poster")
                        });
                    $(this).wpgridPlayHTML5Video(object, inst.options.gridgalleryid, options, false)
                });
                if ($(".wpgridautoplayhtml5video").length) $(".wpgridautoplayhtml5video").each(function() {
                    var options = $.extend({}, inst.options, {
                        videoplaysinline: 1,
                        videomuted: 1,
                        videoloop: $(this).data("loop"),
                        videohidecontrols: $(this).data("hidecontrols"),
                        videoposter: $(this).data("poster")
                    });
                    $(this).wpgridPlayHTML5Video(object, inst.options.gridgalleryid, options, true)
                });
                if ($(".wpgridplayhtml5videoonclick").length) $(".wpgridplayhtml5videoonclick").each(function() {
                    var options = $.extend({}, inst.options, {
                        videoplayonclick: 1,
                        videoplaysinline: 1,
                        videomuted: $(this).data("muted"),
                        videoloop: $(this).data("loop"),
                        videohidecontrols: $(this).data("hidecontrols"),
                        videoposter: $(this).data("poster")
                    });
                    $(this).wpgridPlayHTML5Video(object, inst.options.gridgalleryid, options,
                        false)
                });
                if ($(".wpgridplayhtml5videoonhover").length) $(".wpgridplayhtml5videoonhover").each(function() {
                    var options = $.extend({}, inst.options, {
                        videoplayonhover: 1,
                        videoplaysinline: 1,
                        videomuted: 1,
                        videoloop: $(this).data("loop"),
                        videohidecontrols: $(this).data("hidecontrols"),
                        videoposter: $(this).data("poster")
                    });
                    $(this).wpgridPlayHTML5Video(object, inst.options.gridgalleryid, options, false)
                });
                if ($(".wpgridloadiframevideo").length) $(".wpgridloadiframevideo").wpgridLoadIframeVideo(object, inst.options.gridgalleryid,
                    inst.options)
            };
            var loadGridGallery = function(instance) {
                setTimeout(function() {
                    initGridGallery(instance)
                }, instance.options.deferloading ? instance.options.deferloadingdelay : 0)
            };
            var getYouTubePlaylist = function(ypItem, index, insert_index, onsuccess, container, pagetoken) {
                var youtube_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + ypItem.youtubeplaylistid + "&key=" + ypItem.youtubeapikey;
                if (ypItem.youtubeplaylistmaxresults)
                    if (ypItem.youtubeplaylistmaxresults > 50) youtube_url += "&maxResults=50";
                    else youtube_url += "&maxResults=" + ypItem.youtubeplaylistmaxresults;
                if (pagetoken) youtube_url += "&pageToken=" + pagetoken;
                var all_done = true;
                $.getJSON(youtube_url, function(data) {
                    if (data && data.items)
                        for (var i = 0; i < data.items.length; i++) {
                            var video_id = data.items[i]["snippet"]["resourceId"]["videoId"];
                            var thumbnail = "https://img.youtube.com/vi/" + video_id + "/0.jpg";
                            var image = "https://img.youtube.com/vi/" + video_id + "/0.jpg";
                            if (data.items[i]["snippet"]["thumbnails"] && data.items[i]["snippet"]["thumbnails"]["maxres"]) image =
                                data.items[i]["snippet"]["thumbnails"]["maxres"]["url"];
                            var video = "https://www.youtube.com/embed/" + video_id;
                            var title = data.items[i]["snippet"]["title"];
                            var description = data.items[i]["snippet"]["description"];
                            var new_item = '<div class="wonderplugin-gridgallery-item"' + (ypItem.category ? ' data-category="' + ypItem.category + '"' : "") + ' data-row="1" data-col="1">';
                            new_item += '<div class="wonderplugin-gridgallery-item-container">';
                            if (ypItem.lightbox) {
                                new_item += '<a class="wpgridlightbox wpgridlightbox-' + instance.options.gridgalleryid +
                                    '"';
                                new_item += ' data-thumbnail="' + thumbnail + '"';
                                if (instance.options.lightboxcategorygroup && ypItem.category) {
                                    var categories = ypItem.category.split(":");
                                    if (categories.length > 0) {
                                        new_item += ' data-wpggroup="wpgridgallery-' + instance.options.gridgalleryid + "-" + categories[0];
                                        for (var catIndex = 1; catIndex < categories.length; catIndex++) new_item += ":wpgridgallery-" + instance.options.gridgalleryid + "-" + categories[catIndex];
                                        new_item += '"'
                                    }
                                } else new_item += ' data-wpggroup="wpgridgallery-' + instance.options.gridgalleryid +
                                    '"';
                                new_item += ' data-isvideo="1" href="' + video + '"';
                                if (ypItem.lightboxsize) new_item += ' data-width="' + ypItem.lightboxwidth + '" data-height="' + ypItem.lightboxheight + '"';
                                new_item += ' data-title="' + title + '" data-description="' + description + '"';
                                new_item += ">"
                            } else {
                                new_item += '<a class="wpgridinlineiframevideo"';
                                new_item += ' data-isvideo="1" href="' + video + '"';
                                new_item += ' data-title="' + title + '" data-description="' + description + '">'
                            }
                            new_item += '<img class="wonderplugin-gridgallery-item-img"';
                            new_item += ' alt="' + title +
                                '"';
                            if (instance.options.deferloading) new_item += ' src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-wpplazysrc="' + image + '"';
                            else new_item += ' src="' + image + '"';
                            new_item += " />";
                            new_item += "</a>";
                            new_item += "</div>";
                            new_item += '<div class="wonderplugin-gridgallery-item-text"><div class="wonderplugin-gridgallery-item-wrapper">';
                            if (ypItem.youtubetitle) new_item += '<div class="wonderplugin-gridgallery-item-title">' + title + "</div>";
                            if (ypItem.youtubedescription) new_item += '<div class="wonderplugin-gridgallery-item-description">' +
                                description + "</div>";
                            new_item += "</div></div>";
                            new_item += "</div>";
                            $(".wonderplugin-gridgallery-item", container).eq(insert_index).after(new_item);
                            insert_index++
                        }
                    if (data && data.nextPageToken && ypItem.youtubeplaylistmaxresults && ypItem.youtubeplaylistmaxresults > 50) {
                        all_done = false;
                        ypItem.youtubeplaylistmaxresults -= 50;
                        getYouTubePlaylist(ypItem, index, insert_index, onsuccess, container, data.nextPageToken)
                    }
                }).always(function() {
                    if (all_done) {
                        $(container).trigger("wonderplugingrid.youtubeplaylistloaded");
                        $(".wonderplugin-gridgallery-item",
                            container).eq(index).remove();
                        onsuccess(container)
                    }
                })
            };
            var preprocessGallery = function(container) {
                var found = false;
                var item_index = 0;
                var ypItem = {};
                $(".wonderplugin-gridgallery-item", container).each(function(index) {
                    if ($(this).data("youtubeapikey") && $(this).data("youtubeplaylistid")) {
                        found = true;
                        item_index = index;
                        ypItem = {
                            youtubeapikey: $(this).data("youtubeapikey"),
                            youtubeplaylistid: $(this).data("youtubeplaylistid"),
                            youtubeplaylistmaxresults: $(this).data("youtubeplaylistmaxresults"),
                            youtubetitle: $(this).data("youtubetitle"),
                            youtubedescription: $(this).data("youtubedescription"),
                            lightbox: $(this).data("lightbox"),
                            lightboxsize: $(this).data("lightboxsize"),
                            lightboxwidth: $(this).data("lightboxwidth"),
                            lightboxheight: $(this).data("lightboxheight"),
                            category: $(this).data("category")
                        };
                        return false
                    }
                });
                if (found) getYouTubePlaylist(ypItem, item_index, item_index, preprocessGallery, container, null);
                else loadGridGallery(container)
            };
            var initRemote = function(inst) {
                var remote_items = "";
                $.getJSON(inst.options.remote, function(data) {
                    for (var i = 0; i <
                        data.length; i++) {
                        remote_items += '<div class="wonderplugin-gridgallery-item"';
                        if (data[i].category) remote_items += ' data-category="' + data[i].category + '"';
                        remote_items += ' data-row="1" data-col="1"><div class="wonderplugin-gridgallery-item-container">';
                        if (data[i].link) {
                            remote_items += '<a href="' + data[i].link + '"';
                            if (data[i].linktarget) remote_items += ' target="' + data[i].linktarget + '"';
                            if (data[i].lightbox) remote_items += ' class="wpgridlightbox wpgridlightbox-' + inst.options.gridgalleryid + '"';
                            if (data[i].lightboxwidth) remote_items +=
                                ' data-width="' + data[i].lightboxwidth + '"';
                            if (data[i].lightboxheight) remote_items += ' data-width="' + data[i].lightboxheight + '"';
                            remote_items += ' data-thumbnail="' + data[i].thumbnail + '"';
                            remote_items += ' data-wpggroup="wpgridgallery-' + inst.options.gridgalleryid + '"';
                            if (data[i].title) remote_items += ' title="' + data[i].title + '"';
                            if (data[i].description) remote_items += ' data-description="' + data[i].description + '"';
                            remote_items += ">"
                        }
                        remote_items += '<img class="wonderplugin-gridgallery-item-img"';
                        if (data[i].alt) remote_items +=
                            ' alt="' + data[i].alt + '"';
                        else if (data[i].title) remote_items += ' alt="' + data[i].title + '"';
                        remote_items += ' src="' + data[i].thumbnail + '">';
                        if (data[i].link) remote_items += "</a>";
                        remote_items += "</div></div>"
                    }
                    if ($(".wonderplugin-gridgallery-list", $(inst)).length > 0) $(".wonderplugin-gridgallery-list", $(inst)).append(remote_items);
                    else {
                        remote_items = '<div class="wonderplugin-gridgallery-list" style="display:block;position:relative;max-width:100%;margin:0 auto;">' + remote_items + '</div><div style="clear:both;"></div>';
                        $(inst).append(remote_items)
                    }
                    preprocessGallery(inst)
                })
            };
            if (this.options.remote && this.options.remote.length > 0) initRemote(this);
            else preprocessGallery(this)
        })
    };
    $.fn.wpgridPlayIframeVideo = function(inst, autoplay) {
        $(this).closest(".wonderplugin-gridgallery-item").data("isplayingvideo", true);
        inst.hideTitle($(this).closest(".wonderplugin-gridgallery-item"));
        var $iframeurl = $(this).attr("href");
        $iframeurl += ($iframeurl.indexOf("?") < 0 ? "?" : "&") + (autoplay ? "autoplay=1" : "");
        var $container = $(this).closest(".wonderplugin-gridgallery-item-container");
        $container.html('<iframe class="wpgridinlineiframe" width="100%" height="100%" src="' + $iframeurl + '" frameborder="0" allow="autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
    };
    $.fn.wpgridLoadIframeVideo = function(inst, id, options) {
        $(this).each(function() {
            $(this).wpgridPlayIframeVideo(inst, false)
        })
    };
    $.fn.wpgridInlineIframeVideo = function(inst, id, options) {
        $(this).off("click").click(function(e) {
            e.preventDefault();
            $(this).wpgridPlayIframeVideo(inst, true)
        })
    };
    $.fn.wpgridPlayHTML5Video =
        function(inst, id, options, autoplay) {
            var isAndroid = navigator.userAgent.match(/Android/i) != null;
            var isIPad = navigator.userAgent.match(/iPad/i) != null;
            var isIPhone = navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null;
            var isFirefox = navigator.userAgent.match(/Firefox/i) != null;
            var isOpera = navigator.userAgent.match(/Opera/i) != null || navigator.userAgent.match(/OPR\//i) != null;
            var isIE = navigator.userAgent.match(/MSIE/i) != null && !isOpera;
            var isIE11 = navigator.userAgent.match(/Trident\/7/) !=
                null && navigator.userAgent.match(/rv:11/) != null;
            if (isFirefox && options.nativecontrolsonfirefox || (isIE || isIE11) && options.nativecontrolsonie || isIPhone && options.nativecontrolsoniphone || isIPad && options.nativecontrolsonipad || isAndroid && options.nativecontrolsonandroid) options.nativehtml5controls = true;
            if (isIPhone || isIPad || isAndroid) options.nativecontrolsonfullscreen = true;
            var flashInstalled = false;
            try {
                if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) flashInstalled = true
            } catch (e) {
                if (navigator.mimeTypes["application/x-shockwave-flash"]) flashInstalled =
                    true
            }
            var mp4url = $(this).attr("href");
            var webmurl = $(this).data("webm");
            var isHTML5 = true;
            if (isAndroid || isIPad || isIPhone) isHTML5 = true;
            else if (isIE || isIE11 && options.useflashonie11) isHTML5 = false;
            else if (isFirefox || isOpera)
                if (!webmurl && document.createElement("video").canPlayType("video/mp4") != "maybe") isHTML5 = false;
            $(this).closest(".wonderplugin-gridgallery-item").data("isplayingvideo", true);
            inst.hideTitle($(this).closest(".wonderplugin-gridgallery-item"));
            var $container = $(this).closest(".wonderplugin-gridgallery-item-container");
            if (isHTML5) {
                var videosrc = (isFirefox || isOpera) && webmurl && webmurl.length > 0 ? webmurl : mp4url;
                $container.html('<video class="wpgridinlinevideo"' + (options.videomuted ? " muted" : "") + (options.videoloop ? " loop" : "") + (options.videoplaysinline ? " playsinline" : "") + ' width="100%" height="100%"' + ' src="' + videosrc + '"' + (options.videoposter ? ' poster="' + options.videoposter + '"' : "") + (autoplay ? " autoplay" : "") + (options.nativehtml5controls && !options.videohidecontrols ? ' controls="controls"' : "") + (options.nativecontrolsnodownload ?
                    ' controlsList="nodownload"' : "") + ">");
                var videoObj = $("video", $container);
                if (!options.nativehtml5controls && !options.videohidecontrols) {
                    videoObj.data("src", videosrc);
                    videoObj.wpgridHTML5VideoControls(options.skinsfolder, $(this), ".wpgridinlinevideo", options.videohidecontrols, options.videohideplaybutton, 1, options.nativecontrolsonfullscreen, options.nativecontrolsnodownload, null)
                }
                videoObj.off("ended").on("ended", function() {
                    $(window).trigger("wpgridvideo.ended", [id])
                });
                if (options.videoplayonhover) videoObj.hover(function() {
                        this.play()
                    },
                    function() {
                        this.pause()
                    });
                if (options.videoplayonclick || options.videoplayonhover && (isIPhone || isIPad || isAndroid)) videoObj.click(function() {
                    if (this.paused) this.play();
                    else this.pause()
                })
            } else if (flashInstalled) {
                var embedOptions = {
                    pluginspage: "https://www.adobe.com/go/getflashplayer",
                    quality: "high",
                    allowFullScreen: "true",
                    allowScriptAccess: "always",
                    type: "application/x-shockwave-flash"
                };
                embedOptions.width = "100%";
                embedOptions.height = "100%";
                embedOptions.src = options.jsfolder + "html5boxplayer.swf";
                embedOptions.wmode =
                    "transparent";
                embedOptions.flashVars = $.param({
                    width: "100%",
                    height: "100%",
                    jsobjectname: "wonderpluginVideoEmbed",
                    hidecontrols: options.videohidecontrols ? "1" : "0",
                    hideplaybutton: "0",
                    videofile: mp4url,
                    hdfile: "",
                    ishd: "0",
                    defaultvolume: 1,
                    autoplay: autoplay ? "1" : "0",
                    loop: loop ? "1" : "0",
                    id: id
                });
                var embedString = "";
                for (var key in embedOptions) embedString += key + "=" + embedOptions[key] + " ";
                $container.html("<embed " + embedString + "/>")
            } else $container.html("<div class='wpve-error' style='display:block;position:absolute;text-align:center;width:100%;left:0px;top:20%;color:#ff0000;'><p>Adobe Flash Player is not installed.</p><p><a href='https://www.adobe.com/go/getflashplayer' target='_blank'><img src='https://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></p></div>")
        };
    $.fn.wpgridAutoplayHTML5Video = function(inst, id, options) {
        $(this).wpgridPlayHTML5Video(inst, id, options, true)
    };
    $.fn.wpgridLoadHTML5Video = function(inst, id, options) {
        $(this).wpgridPlayHTML5Video(inst, id, options, false)
    };
    $.fn.wpgridInlineHTML5Video = function(inst, id, options) {
        $(this).off("click").click(function(e) {
            e.preventDefault();
            $(this).wpgridPlayHTML5Video(inst, id, options, true)
        })
    };
    $.fn.wpgridHTML5VideoControls = function(skinFolder, parentInst, videoElem, hideControls, hidePlayButton, defaultVolume, fullscreenNativeControls,
        html5VideoNoDownload, skinImages) {
        var isTouch = "ontouchstart" in window;
        var eStart = isTouch ? "touchstart" : "mousedown";
        var eMove = isTouch ? "touchmove" : "mousemove";
        var eCancel = isTouch ? "touchcancel" : "mouseup";
        var eClick = "click";
        var BUTTON_SIZE = 32;
        var BAR_HEIGHT = isTouch ? 48 : 36;
        var hideControlsTimerId = null;
        var hideVolumeBarTimeoutId = null;
        var sliderDragging = false;
        var isFullscreen = false;
        var userActive = true;
        var isHd = $(this).data("ishd");
        var hd = $(this).data("hd");
        var src = $(this).data("src");
        var $videoObj = $(this);
        $videoObj.get(0).removeAttribute("controls");
        var $videoPlay = $("<div class='html5boxVideoPlay'></div>");
        $videoObj.after($videoPlay);
        var playbuttonImage = skinImages && "playbutton" in skinImages && skinImages.playbutton.length > 0 ? skinImages.playbutton : skinFolder + "html5boxplayer_playvideo.png";
        $videoPlay.css({
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "block",
            cursor: "pointer",
            width: 64,
            height: 64,
            "margin-left": -32,
            "margin-top": -32,
            "background-image": "url('" + playbuttonImage + "')",
            "background-position": "center center",
            "background-repeat": "no-repeat"
        }).on(eClick, function() {
            $videoObj.get(0).play()
        });
        var $videoFullscreenBg = $("<div class='html5boxVideoFullscreenBg'></div>");
        var $videoControls = $("<div class='html5boxVideoControls'>" + "<div class='html5boxVideoControlsBg'></div>" + "<div class='html5boxPlayPause'>" + "<div class='html5boxPlay'></div>" + "<div class='html5boxPause'></div>" + "</div>" + "<div class='html5boxTimeCurrent'>--:--</div>" + "<div class='html5boxFullscreen'></div>" + "<div class='html5boxHD'></div>" + "<div class='html5boxVolume'>" +
            "<div class='html5boxVolumeButton'></div>" + "<div class='html5boxVolumeBar'>" + "<div class='html5boxVolumeBarBg'>" + "<div class='html5boxVolumeBarActive'></div>" + "</div>" + "</div>" + "</div>" + "<div class='html5boxTimeTotal'>--:--</div>" + "<div class='html5boxSeeker'>" + "<div class='html5boxSeekerBuffer'></div>" + "<div class='html5boxSeekerPlay'></div>" + "<div class='html5boxSeekerHandler'></div>" + "</div>" + "<div style='clear:both;'></div>" + "</div>");
        $videoObj.after($videoControls);
        $videoObj.after($videoFullscreenBg);
        $videoFullscreenBg.css({
            display: "none",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
        });
        $videoControls.css({
            display: "block",
            position: "absolute",
            width: "100%",
            height: BAR_HEIGHT,
            left: 0,
            bottom: 0,
            right: 0,
            margin: "0 auto"
        });
        var userActivate = function() {
            userActive = true
        };
        $videoObj.on("touch click mousemove mouseenter", function() {
            userActive = true
        });
        if (!hideControls) setInterval(function() {
            if (userActive) {
                $videoControls.show();
                userActive = false;
                clearTimeout(hideControlsTimerId);
                hideControlsTimerId = setTimeout(function() {
                        if (!$videoObj.get(0).paused) $videoControls.fadeOut()
                    },
                    5E3)
            }
        }, 250);
        $(".html5boxVideoControlsBg", $videoControls).css({
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            "background-color": "#000000",
            opacity: 0.7,
            filter: "alpha(opacity=70)"
        });
        $(".html5boxPlayPause", $videoControls).css({
            display: "block",
            position: "relative",
            width: BUTTON_SIZE + "px",
            height: BUTTON_SIZE + "px",
            margin: Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
            "float": "left"
        });
        var $videoBtnPlay = $(".html5boxPlay", $videoControls);
        var $videoBtnPause = $(".html5boxPause", $videoControls);
        $videoBtnPlay.css({
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: BUTTON_SIZE + "px",
            height: BUTTON_SIZE + "px",
            cursor: "pointer",
            "background-image": "url('" + skinFolder + "html5boxplayer_playpause.png" + "')",
            "background-position": "top left"
        }).hover(function() {
            $(this).css({
                "background-position": "bottom left"
            })
        }, function() {
            $(this).css({
                "background-position": "top left"
            })
        }).on(eClick, function() {
            $videoObj.get(0).play()
        });
        $videoBtnPause.css({
            display: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: BUTTON_SIZE +
                "px",
            height: BUTTON_SIZE + "px",
            cursor: "pointer",
            "background-image": "url('" + skinFolder + "html5boxplayer_playpause.png" + "')",
            "background-position": "top right"
        }).hover(function() {
            $(this).css({
                "background-position": "bottom right"
            })
        }, function() {
            $(this).css({
                "background-position": "top right"
            })
        }).on(eClick, function() {
            $videoObj.get(0).pause()
        });
        var $videoTimeCurrent = $(".html5boxTimeCurrent", $videoControls);
        var $videoTimeTotal = $(".html5boxTimeTotal", $videoControls);
        var $videoSeeker = $(".html5boxSeeker", $videoControls);
        var $videoSeekerPlay = $(".html5boxSeekerPlay", $videoControls);
        var $videoSeekerBuffer = $(".html5boxSeekerBuffer", $videoControls);
        var $videoSeekerHandler = $(".html5boxSeekerHandler", $videoControls);
        $videoTimeCurrent.css({
            display: "block",
            position: "relative",
            "float": "left",
            "line-height": BAR_HEIGHT + "px",
            "font-weight": "normal",
            "font-size": "12px",
            margin: "0 8px",
            "font-family": "Arial, Helvetica, sans-serif",
            color: "#fff"
        });
        $videoTimeTotal.css({
            display: "block",
            position: "relative",
            "float": "right",
            "line-height": BAR_HEIGHT +
                "px",
            "font-weight": "normal",
            "font-size": "12px",
            margin: "0 8px",
            "font-family": "Arial, Helvetica, sans-serif",
            color: "#fff"
        });
        $videoSeeker.css({
            display: "block",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            height: "10px",
            "background-color": "#222",
            margin: Math.floor((BAR_HEIGHT - 10) / 2) + "px 4px"
        }).on(eStart, function(e) {
            var e0 = isTouch ? e.originalEvent.touches[0] : e;
            var pos = e0.pageX - $videoSeeker.offset().left;
            $videoSeekerPlay.css({
                width: pos
            });
            $videoObj.get(0).currentTime = pos * $videoObj.get(0).duration /
                $videoSeeker.width();
            $videoSeeker.on(eMove, function(e) {
                var e0 = isTouch ? e.originalEvent.touches[0] : e;
                var pos = e0.pageX - $videoSeeker.offset().left;
                $videoSeekerPlay.css({
                    width: pos
                });
                $videoObj.get(0).currentTime = pos * $videoObj.get(0).duration / $videoSeeker.width()
            })
        }).on(eCancel, function() {
            $videoSeeker.off(eMove)
        });
        $videoSeekerBuffer.css({
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            "background-color": "#444"
        });
        $videoSeekerPlay.css({
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            "background-color": "#fcc500"
        });
        var $videoFSObj = fullscreenNativeControls ? $videoObj : $videoObj.parent();
        if ($videoFSObj.get(0).requestFullscreen || $videoFSObj.get(0).webkitRequestFullScreen || $videoFSObj.get(0).mozRequestFullScreen || $videoFSObj.get(0).webkitEnterFullScreen || $videoFSObj.get(0).msRequestFullscreen) {
            var switchScreen = function(fullscreen) {
                if (fullscreen) {
                    if (fullscreenNativeControls) {
                        $videoObj.get(0).setAttribute("controls", "controls");
                        if (html5VideoNoDownload) $videoObj.get(0).setAttribute("controlsList",
                            "nodownload")
                    }
                    if ($videoFSObj.get(0).requestFullscreen) $videoFSObj.get(0).requestFullscreen();
                    else if ($videoFSObj.get(0).webkitRequestFullScreen) $videoFSObj.get(0).webkitRequestFullScreen();
                    else if ($videoFSObj.get(0).mozRequestFullScreen) $videoFSObj.get(0).mozRequestFullScreen();
                    else if ($videoFSObj.get(0).webkitEnterFullScreen) $videoFSObj.get(0).webkitEnterFullScreen();
                    if ($videoFSObj.get(0).msRequestFullscreen) $videoFSObj.get(0).msRequestFullscreen()
                } else if (document.cancelFullScreen) document.cancelFullScreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen()
            };
            var switchScreenCSS = function(fullscreen) {
                if (fullscreenNativeControls)
                    if (fullscreen) {
                        $videoObj.get(0).setAttribute("controls", "controls");
                        if (html5VideoNoDownload) $videoObj.get(0).setAttribute("controlsList", "nodownload")
                    } else $videoObj.get(0).removeAttribute("controls");
                else if (fullscreen) {
                    $(document).on("mousemove", userActivate);
                    $videoControls.css({
                        "z-index": 2147483647,
                        position: "fixed"
                    });
                    $videoFullscreenBg.css({
                        "z-index": 2147483647,
                        display: "block"
                    });
                    $videoPlay.css({
                        "z-index": 2147483647
                    })
                } else {
                    $(document).off("mousemove", userActivate);
                    $videoControls.css({
                        "z-index": "",
                        position: "absolute"
                    });
                    $videoFullscreenBg.css({
                        "z-index": "",
                        display: "none"
                    });
                    $videoPlay.css({
                        "z-index": ""
                    })
                }
            };
            document.addEventListener("MSFullscreenChange", function() {
                isFullscreen = document.msFullscreenElement !=
                    null;
                switchScreenCSS(isFullscreen)
            }, false);
            document.addEventListener("fullscreenchange", function() {
                isFullscreen = document.fullscreen;
                switchScreenCSS(isFullscreen)
            }, false);
            document.addEventListener("mozfullscreenchange", function() {
                isFullscreen = document.mozFullScreen;
                switchScreenCSS(isFullscreen)
            }, false);
            document.addEventListener("webkitfullscreenchange", function() {
                isFullscreen = document.webkitIsFullScreen;
                switchScreenCSS(isFullscreen)
            }, false);
            $videoFSObj.get(0).addEventListener("webkitbeginfullscreen",
                function() {
                    isFullscreen = true;
                    switchScreenCSS(isFullscreen)
                }, false);
            $videoFSObj.get(0).addEventListener("webkitendfullscreen", function() {
                isFullscreen = false;
                switchScreenCSS(isFullscreen)
            }, false);
            if (!fullscreenNativeControls) $("head").append("<style type='text/css'>video" + videoElem + "::-webkit-media-controls { display:none !important; }</style>");
            var $videoFullscreen = $(".html5boxFullscreen", $videoControls);
            $videoFullscreen.css({
                display: "block",
                position: "relative",
                "float": "right",
                width: BUTTON_SIZE + "px",
                height: BUTTON_SIZE + "px",
                margin: Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
                cursor: "pointer",
                "background-image": "url('" + skinFolder + "html5boxplayer_fullscreen.png" + "')",
                "background-position": "left top"
            }).hover(function() {
                var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
                $(this).css({
                    "background-position": backgroundPosX + " bottom"
                })
            }, function() {
                var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] :
                    $(this).css("background-position-x");
                $(this).css({
                    "background-position": backgroundPosX + " top"
                })
            }).on(eClick, function() {
                isFullscreen = !isFullscreen;
                switchScreen(isFullscreen)
            })
        }
        if (hd) {
            var $videoHD = $(".html5boxHD", $videoControls);
            $videoHD.css({
                display: "block",
                position: "relative",
                "float": "right",
                width: BUTTON_SIZE + "px",
                height: BUTTON_SIZE + "px",
                margin: Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
                cursor: "pointer",
                "background-image": "url('" + skinFolder + "html5boxplayer_hd.png" + "')",
                "background-position": (isHd ? "right" :
                    "left") + " center"
            }).on(eClick, function() {
                isHd = !isHd;
                $(this).css({
                    "background-position": (isHd ? "right" : "left") + " center"
                });
                parentInst.isHd = isHd;
                var isPaused = $videoObj.get(0).isPaused;
                $videoObj.get(0).setAttribute("src", (isHd ? hd : src) + "#t=" + $videoObj.get(0).currentTime);
                if (!isPaused) $videoObj.get(0).play();
                else $videoObj.get(0).pause()
            })
        }
        $videoObj.get(0).volume = defaultVolume;
        var volumeSaved = defaultVolume == 0 ? 1 : defaultVolume;
        var volume = $videoObj.get(0).volume;
        $videoObj.get(0).volume = volume / 2 + 0.1;
        if ($videoObj.get(0).volume ===
            volume / 2 + 0.1) {
            $videoObj.get(0).volume = volume;
            var $videoVolume = $(".html5boxVolume", $videoControls);
            var $videoVolumeButton = $(".html5boxVolumeButton", $videoControls);
            var $videoVolumeBar = $(".html5boxVolumeBar", $videoControls);
            var $videoVolumeBarBg = $(".html5boxVolumeBarBg", $videoControls);
            var $videoVolumeBarActive = $(".html5boxVolumeBarActive", $videoControls);
            $videoVolume.css({
                display: "block",
                position: "relative",
                "float": "right",
                width: BUTTON_SIZE + "px",
                height: BUTTON_SIZE + "px",
                margin: Math.floor((BAR_HEIGHT -
                    BUTTON_SIZE) / 2)
            }).hover(function() {
                clearTimeout(hideVolumeBarTimeoutId);
                var volume = $videoObj.get(0).volume;
                $videoVolumeBarActive.css({
                    height: Math.round(volume * 100) + "%"
                });
                $videoVolumeBar.show()
            }, function() {
                clearTimeout(hideVolumeBarTimeoutId);
                hideVolumeBarTimeoutId = setTimeout(function() {
                    $videoVolumeBar.hide()
                }, 1E3)
            });
            $videoVolumeButton.css({
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: BUTTON_SIZE + "px",
                height: BUTTON_SIZE + "px",
                cursor: "pointer",
                "background-image": "url('" + skinFolder + "html5boxplayer_volume.png" +
                    "')",
                "background-position": "top " + (volume > 0 ? "left" : "right")
            }).hover(function() {
                var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
                $(this).css({
                    "background-position": backgroundPosX + " bottom"
                })
            }, function() {
                var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
                $(this).css({
                    "background-position": backgroundPosX + " top"
                })
            }).on(eClick,
                function() {
                    var volume = $videoObj.get(0).volume;
                    if (volume > 0) {
                        volumeSaved = volume;
                        volume = 0
                    } else volume = volumeSaved;
                    var backgroundPosY = $(this).css("background-position") ? $(this).css("background-position").split(" ")[1] : $(this).css("background-position-y");
                    $videoVolumeButton.css({
                        "background-position": (volume > 0 ? "left" : "right") + " " + backgroundPosY
                    });
                    $videoObj.get(0).volume = volume;
                    $videoVolumeBarActive.css({
                        height: Math.round(volume * 100) + "%"
                    })
                });
            $videoVolumeBar.css({
                display: "none",
                position: "absolute",
                left: 4,
                bottom: "100%",
                width: 24,
                height: 80,
                "margin-bottom": Math.floor((BAR_HEIGHT - BUTTON_SIZE) / 2),
                "background-color": "#000000",
                opacity: 0.7,
                filter: "alpha(opacity=70)"
            });
            $videoVolumeBarBg.css({
                display: "block",
                position: "relative",
                width: 10,
                height: 68,
                margin: 7,
                cursor: "pointer",
                "background-color": "#222"
            });
            $videoVolumeBarActive.css({
                display: "block",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                "background-color": "#fcc500"
            });
            $videoVolumeBarBg.on(eStart, function(e) {
                var e0 = isTouch ? e.originalEvent.touches[0] :
                    e;
                var vol = 1 - (e0.pageY - $videoVolumeBarBg.offset().top) / $videoVolumeBarBg.height();
                vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
                $videoVolumeBarActive.css({
                    height: Math.round(vol * 100) + "%"
                });
                $videoVolumeButton.css({
                    "background-position": "left " + (vol > 0 ? "top" : "bottom")
                });
                $videoObj.get(0).volume = vol;
                $videoVolumeBarBg.on(eMove, function(e) {
                    var e0 = isTouch ? e.originalEvent.touches[0] : e;
                    var vol = 1 - (e0.pageY - $videoVolumeBarBg.offset().top) / $videoVolumeBarBg.height();
                    vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
                    $videoVolumeBarActive.css({
                        height: Math.round(vol *
                            100) + "%"
                    });
                    $videoVolumeButton.css({
                        "background-position": "left " + (vol > 0 ? "top" : "bottom")
                    });
                    $videoObj.get(0).volume = vol
                })
            }).on(eCancel, function() {
                $videoVolumeBarBg.off(eMove)
            })
        }
        var calcTimeFormat = function(seconds) {
            var h0 = Math.floor(seconds / 3600);
            var h = h0 < 10 ? "0" + h0 : h0;
            var m0 = Math.floor((seconds - h0 * 3600) / 60);
            var m = m0 < 10 ? "0" + m0 : m0;
            var s0 = Math.floor(seconds - (h0 * 3600 + m0 * 60));
            var s = s0 < 10 ? "0" + s0 : s0;
            var r = m + ":" + s;
            if (h0 > 0) r = h + ":" + r;
            return r
        };
        if (hidePlayButton) $videoPlay.hide();
        if (hideControls) $videoControls.hide();
        var onVideoPlay = function() {
            if (!hidePlayButton) $videoPlay.hide();
            if (!hideControls) {
                $videoBtnPlay.hide();
                $videoBtnPause.show()
            }
        };
        var onVideoPause = function() {
            if (!hidePlayButton) $videoPlay.show();
            if (!hideControls) {
                $videoControls.show();
                clearTimeout(hideControlsTimerId);
                $videoBtnPlay.show();
                $videoBtnPause.hide()
            }
        };
        var onVideoEnded = function() {
            $(window).trigger("html5lightbox.videoended");
            if (!hidePlayButton) $videoPlay.show();
            if (!hideControls) {
                $videoControls.show();
                clearTimeout(hideControlsTimerId);
                $videoBtnPlay.show();
                $videoBtnPause.hide()
            }
        };
        var onVideoUpdate = function() {
            var curTime = $videoObj.get(0).currentTime;
            if (curTime) {
                $videoTimeCurrent.text(calcTimeFormat(curTime));
                var duration = $videoObj.get(0).duration;
                if (duration) {
                    $videoTimeTotal.text(calcTimeFormat(duration));
                    if (!sliderDragging) {
                        var sliderW = $videoSeeker.width();
                        var pos = Math.round(sliderW * curTime / duration);
                        $videoSeekerPlay.css({
                            width: pos
                        });
                        $videoSeekerHandler.css({
                            left: pos
                        })
                    }
                }
            }
        };
        var onVideoProgress = function() {
            if ($videoObj.get(0).buffered && $videoObj.get(0).buffered.length >
                0 && !isNaN($videoObj.get(0).buffered.end(0)) && !isNaN($videoObj.get(0).duration)) {
                var sliderW = $videoSeeker.width();
                $videoSeekerBuffer.css({
                    width: Math.round(sliderW * $videoObj.get(0).buffered.end(0) / $videoObj.get(0).duration)
                })
            }
        };
        try {
            $videoObj.on("play", onVideoPlay);
            $videoObj.on("pause", onVideoPause);
            $videoObj.on("ended", onVideoEnded);
            $videoObj.on("timeupdate", onVideoUpdate);
            $videoObj.on("progress", onVideoProgress)
        } catch (e) {}
    }
})(jQuery);
(function($) {
    var pow = Math.pow,
        sqrt = Math.sqrt,
        sin = Math.sin,
        cos = Math.cos,
        PI = Math.PI,
        c1 = 1.70158,
        c2 = c1 * 1.525,
        c3 = c1 + 1,
        c4 = 2 * PI / 3,
        c5 = 2 * PI / 4.5;

    function bounceOut(x) {
        var n1 = 7.5625,
            d1 = 2.75;
        if (x < 1 / d1) return n1 * x * x;
        else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
        else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
        else return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
    $.extend($.easing, {
        def: "easeOutQuad",
        easeInQuad: function(x) {
            return x * x
        },
        easeOutQuad: function(x) {
            return 1 - (1 - x) * (1 - x)
        },
        easeInOutQuad: function(x) {
            return x < 0.5 ? 2 * x * x : 1 -
                pow(-2 * x + 2, 2) / 2
        },
        easeInCubic: function(x) {
            return x * x * x
        },
        easeOutCubic: function(x) {
            return 1 - pow(1 - x, 3)
        },
        easeInOutCubic: function(x) {
            return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
        },
        easeInQuart: function(x) {
            return x * x * x * x
        },
        easeOutQuart: function(x) {
            return 1 - pow(1 - x, 4)
        },
        easeInOutQuart: function(x) {
            return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
        },
        easeInQuint: function(x) {
            return x * x * x * x * x
        },
        easeOutQuint: function(x) {
            return 1 - pow(1 - x, 5)
        },
        easeInOutQuint: function(x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
        },
        easeInSine: function(x) {
            return 1 -
                cos(x * PI / 2)
        },
        easeOutSine: function(x) {
            return sin(x * PI / 2)
        },
        easeInOutSine: function(x) {
            return -(cos(PI * x) - 1) / 2
        },
        easeInExpo: function(x) {
            return x === 0 ? 0 : pow(2, 10 * x - 10)
        },
        easeOutExpo: function(x) {
            return x === 1 ? 1 : 1 - pow(2, -10 * x)
        },
        easeInOutExpo: function(x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2
        },
        easeInCirc: function(x) {
            return 1 - sqrt(1 - pow(x, 2))
        },
        easeOutCirc: function(x) {
            return sqrt(1 - pow(x - 1, 2))
        },
        easeInOutCirc: function(x) {
            return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) /
                2
        },
        easeInElastic: function(x) {
            return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
        },
        easeOutElastic: function(x) {
            return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
        },
        easeInOutElastic: function(x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1
        },
        easeInBack: function(x) {
            return c3 * x * x * x - c1 * x * x
        },
        easeOutBack: function(x) {
            return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
        },
        easeInOutBack: function(x) {
            return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 *
                x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
        },
        easeInBounce: function(x) {
            return 1 - bounceOut(1 - x)
        },
        easeOutBounce: bounceOut,
        easeInOutBounce: function(x) {
            return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
        }
    })
})(jQuery);
jQuery(document).ready(function() {
    jQuery(".wonderplugin-gridgallery-engine").css({
        display: "none"
    });
    if (jQuery.fn.wonderplugingridgallery) jQuery(".wonderplugingridgallery").wonderplugingridgallery()
});