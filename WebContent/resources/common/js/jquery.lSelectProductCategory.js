/*
 * Copyright 2005-2013 rsico. All rights reserved.
 * Support: http://www.wit.net
 * License: http://www.wit.net/license
 * 
 * JavaScript - lSelect
 * Version: 3.0
 */

(function($) {
	$.fn.extend({
		lSelectProductCategory: function(options) {
			var settings = {
				//choose: "请选择...",
				emptyValue: "",
				cssStyle: {"margin-right": "4px","width": "223px","height":"250px","background":"none",},
				url: null,
				type: "GET"
			};
			$.extend(settings, options);
			
			var cache = {};
			return this.each(function() {
				var $input = $(this);
				var id = $input.val();
				var treePath = $input.attr("treePath");
				var selectName = $input.attr("name") + "_select";
				if (treePath != null && treePath != "") {
					var ids = (treePath + id + ",").split(",");
					var $position = $input;
					for (var i = 1; i < ids.length; i ++) {
						$position = addSelect($position, ids[i - 1], ids[i]);
					}
				} else {
					addSelect($input, null, null);
				}
				
				function addSelect($position, parentId, currentId) {
					$position.nextAll("select[name=" + selectName + "]").remove();
					if ($position.is("select") && (parentId == null || parentId == "")) {
						return false;
					}
					if (cache[parentId] == null) {
						$.ajax({
							url: settings.url,
							type: settings.type,
							data: parentId != null ? {parentId: parentId} : null,
							dataType: "json",
							cache: false,
							async: false,
							success: function(data) {
								cache[parentId] = data;
							}
						});
					}
					var data = cache[parentId];
					if ($.isEmptyObject(data)) {
						return false;
					}
					var i = 1;
					var select = '<select  size="12" onChange="show()" name="' + selectName + '" id="select_'+ i +'">';
					if (settings.emptyValue != null && settings.choose != null) {
						select += '<option value="' + settings.emptyValue + '">' + settings.choose + '</option>';
					}
					$.each(data, function(value, name) {
						if(value == currentId) {
							select += '<option value="' + value + '" selected="selected">' + name + '</option>';
						} else {
							select += '<option value="' + value + '">' + name + '</option>';
						}
					});
					select += '</select>';
					return $(select).css(settings.cssStyle).insertAfter($position).bind("change", function() {
						var $this = $(this);
						if ($this.val() == "") {
							var $prev = $this.prev("select[name=" + selectName + "]");
							if ($prev.size() > 0) {
								$input.val($prev.val());
							} else {
								$input.val(settings.emptyValue);
							}
						} else {
							$input.val($this.val());
						}
						addSelect($this, $this.val(), null);
						settings.fn($this);
					});
				}
			});
			
		}
	});
})(jQuery);