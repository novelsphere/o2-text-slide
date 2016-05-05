/* global $ o2 MessageLayer KeySpline Tag */
(function() {
	MessageLayer.textCustomizers.slideTextCustomizer = function(textLayer, oldTexts, newTexts) {
		var offsetX       = 'textSlideOffsetX'      in textLayer ? textLayer.textSlideOffsetX      : 0,
			offsetY       = 'textSlideOffsetY'      in textLayer ? textLayer.textSlideOffsetY      : 20,
			slideDuration = 'textSlideDuration'     in textLayer ? textLayer.textSlideDuration     : 700,
			fadeDuration  = 'textSlideFadeDuration' in textLayer ? textLayer.textSlideFadeDuration : 350,
			fadeDelay     = textLayer.delaySpeed,
			ended         = false;

		if (offsetX === undefined) {
			offsetX = 100;
		}
		if (offsetY === undefined) {
			offsetY = 100;
		}
		if (slideDuration === undefined) {
			slideDuration = 1000;
		}
		if (fadeDelay === undefined) {
			fadeDelay = 100;
		}
		if (fadeDuration === undefined) {
			fadeDuration = 1000;
		}

		this.isAnimation = true;

		var timingFunction = new KeySpline(0.0, 0.0, 0.58, 1.0);

		this.perform = function() {
			var percentage = this.timePassed / slideDuration;
			var _this = this;
			newTexts.forEach(function(thisText, index) {

				var thisPercentage = (_this.timePassed - index * fadeDelay) / fadeDuration;
				if (thisPercentage < 0) {
					thisText.styles.visible = false;
					return;
				}
				if (thisPercentage > 1)thisPercentage = 1;

				thisText.styles.visible = true;
				thisText.styles.opacity = thisPercentage;
				thisText.needRedraw = true;

				//slide
				thisPercentage = timingFunction.get(thisPercentage);
				if (thisPercentage > 1)thisPercentage = 1;

				var _offsetY = (1 - thisPercentage) * offsetY,
					_offsetX = (1 - thisPercentage) * offsetX;

				thisText.rect.y += _offsetY;
				thisText.rect.x += _offsetX;

				if (index === newTexts.length - 1 && thisPercentage >= 1 && percentage >= 1) {
					ended = true;
				}
			});
		};

		this.isEnded = function() {
			return ended;
		};
	};


	var originalPosition = Tag.actions.position.action;

	$.extend(Tag.actions.position.rules, {
		slide             : {type:"BOOLEAN"},
		slideoffsetx      : {type:"INT"},
		slideoffsety      : {type:"INT"},
		slideduration     : {type:"INT"},
		slidefadeduration : {type:"INT"}
	});
	Tag.actions.position.action = function(args) {
		var layer;
		if (('layer' in args) && ('page' in args)) {
			layer = args.layer[args.page];
		} else {
			layer = o2.currentMessageLayer;
		}
		if (args.slide) {
			if (layer.textCustomizers.indexOf('slideTextCustomizer') == -1) {
				layer.textCustomizers.push('slideTextCustomizer');
			}
		} else if (args.slide === false) {
			let index = layer.textCustomizers.indexOf('slideTextCustomizer');
			if (index >= 0) {
				layer.textCustomizers.splice(index, 1);
			}
		}
		if ('slideoffsetx' in args) {
			layer.textSlideOffsetX = args.slideoffsetx;
		}
		if ('slideoffsety' in args) {
			layer.textSlideOffsetY = args.slideoffsety;
		}
		if ('slideduration' in args) {
			layer.textSlideDuration = args.slideduration;
		}
		if ('slidefadeduration' in args) {
			layer.textSlideFadeDuration = args.slidefadeduration;
		}
		return originalPosition.apply(this, arguments);
	};
})();