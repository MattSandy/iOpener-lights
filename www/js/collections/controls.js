define([
	'jquery',
	'underscore', 
	'backbone',
	'models/controls/slider',
	'models/controls/dropdown',
	'models/controls/touchpad',
], function($, _, Backbone, SliderControl, DropdownControl, TouchpadControl){
	var controls = Backbone.Collection.extend({
		model: function(attrs, options){
			switch(attrs.type)
			{
				case "slider":
					return new SliderControl(attrs, options);
					break;

				case "dropdown":
					return new DropdownControl(attrs, options);
					break;

                case "touchpad":
                    return new TouchpadControl(attrs, options);
                    break;
			}
		},
		
		setControls: function(controls){
			var models = [];
			_.each(controls, function(data){
				switch(data.type)
				{
					case "slider":
						var model = new SliderControl(data);
						break;

					case "dropdown":
						var model = new DropdownControl(data);
						break;

                    case "touchpad":
                        var model = new TouchpadControl(data);
                        break;
				}
				
				models.push(model);
			}, this);


			this.reset(models);
		},
	});

	return controls;
});

