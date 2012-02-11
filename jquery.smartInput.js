(function($){
	$.fn.smartInput = function(options){
		/*
		 * Set default options.
		 */
		var defaults = {
			counterField:     false,
			labelInside:      false,
			labelColor:       "#d0d0d0",
			match:            false,
			matchClass:       "matched-input",
			maxChars:         140,
			onLimitReach:		function(){},
			strongLimit:		false
		};

		/*
		 * Extend options.
		 */
		var options = $.extend(defaults, options);

		/*
		 * For each matched element, perform the plugin.
		 */
		return this.each(function(){
			var $thiz = $(this);


			/*
			 * If the count char and counter field are specified,
			 * count chars and forward result in the counter block.
			 */
			if(options.maxChars && options.counterField)
			{
				/*
				 * Init the chars left value.
				 */
				$(options.counterField).html(options.maxChars - $thiz.attr("value").length); // Init counter value.

				/*
				 * Update when keyup or change.
				 */
				$thiz.bind('keyup change', function(){
					/*
					 * If strong limit, don't allow new chars in the field.
					 */
					if(options.strongLimit)
						$thiz.attr("value", $(this).attr("value").substr(0, options.maxChars));

					/*
					 * On limit reach function.
					 */
					var charsLeft = options.maxChars - $thiz.attr("value").length;
					if(charsLeft < 0)
					{
						/*
						 * Call the onLimitReach function.
						 */
						options.onLimitReach();
					}

					/*
					 * Update count value.
					 */
					$(options.counterField).html(charsLeft);

					/*
					 * If any regex match for input, set the class of successful match.
					 */
					if(options.match)
					{
						/*
						 * Depending on match shortcut, deduce regex equivalent.
						 */
						switch(options.match)
						{
							case 'email':
								options.match = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
								break;
						}

						/*
						 * Add class or remove it if no match.
						 */
						if($thiz.val().match(options.match)) $thiz.addClass(options.matchClass);
						else $thiz.removeClass(options.matchClass);
					}
				});
			} // End of if(options.maxChars && options.counterField)

			/*
			 * Add label inside if asked for.
			 */
			if(options.labelInside)
			{
				/*
				* Get object properties.
				*/
				var alt = $thiz.attr("alt");
				var value = $thiz.attr("value");

				/*
				 * Init label if alt specified and no value.
				 */
				if(value === '' && alt !== '')
				{
					$thiz.attr("value", alt);
					$thiz.attr("alt", "&");
					$thiz.css("color", options.labelColor);
				}

				/*
				 * On focus or blur, display the label or not.
				 */
				$thiz.focus(function(){

					var alt = $thiz.attr("alt");
					var value = $thiz.attr("value");

					if(alt === "&")
					{
						$thiz.attr("value", "");
						$thiz.attr("alt", value);
						$thiz.css("color", ''); // Back to default color.
					}

				}).blur(function(){

					var alt = $thiz.attr("alt");
					var value = $thiz.attr("value");

					if(value === '' && alt !== '')
					{
						$thiz.attr("value", alt);
						$thiz.attr("alt", "&");
						$thiz.css("color", options.labelColor);
					}

				});
			} // End of if(options.labelInside)
		});
	};
})(jQuery);
