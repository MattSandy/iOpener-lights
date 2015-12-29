import random
import pattern
from utils.color_utils import hsvToRGB

from patterns.single import registerPattern 

class Rainbow(pattern.Pattern):
	def __init__(self, channel=0):
		pattern.Pattern.__init__(self, channel)

		self.hue = random.randint(0, 360) 
		self.speed = float(random.randint(20, 100))

	def update(self):
		self.hue = (self.hue + self.speed / 50.0) % 360

	def shader(self, coords, led_num):
		return map(lambda x: x * 255 % 256, hsvToRGB(self.hue, 1, 1))

registerPattern(Rainbow, "Solid Rainbow")