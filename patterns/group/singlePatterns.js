var colorUtils = require(appRoot + 'libs/color_utils');
var util = require('util');
var Pattern = require(patternRoot + 'pattern');
var pattern_lib = require(patternRoot);

var SinglePatterns = function()
{
	SinglePatterns.super_.call(this);
    
    this.numPatterns = this.appConfig.num_lanterns;
    this.lastRun = 0;
    this.patterns = [];

	this.web_settings = {
		name: "Individual Patterns",
    }

    for(var i = 0; i < this.numPatterns; i++)
    {
        this.setNewPattern(i);
    }
}

util.inherits(SinglePatterns, Pattern);

SinglePatterns.prototype.setNewPattern = function(i)
{
    var pattern_num  = Math.randomInt(0, pattern_lib.single.patterns.length - 1);
    this.patterns[i] = {
        pattern: new pattern_lib.single.patterns[pattern_num],
        duration: Math.randomInt(20, 50)
    };
}

SinglePatterns.prototype.update = function()
{
    for(var i in this.patterns)
    {
        this.patterns[i].pattern.update();
    }

    var elapsed_time = Date.now() - this.lastRun;
    if(elapsed_time > 1000)
    {
        this.lastRun = Date.now();
        for(var i in this.patterns)
        {
            this.patterns[i].duration--;
            if(this.patterns[i].duration <= 0)
            {
                this.setNewPattern(i);
            }
        }
    }
}

SinglePatterns.prototype.shader = function(coords, led_num, tent_coords, lantern_num)
{
    if(!this.patterns[lantern_num])
    {
        return [0,0,0];
    }

    return this.patterns[lantern_num].pattern.shader(coords, led_num, tent_coords, lantern_num);
}

module.exports = SinglePatterns;
