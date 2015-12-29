def hsvToRGB(h, s, v):
	"""Convert HSV color space to RGB color space
	
	@param h: Hue
	@param s: Saturation
	@param v: Value
	return (r, g, b)  
	"""
	import math
	hi = math.floor(h / 60.0) % 6
	f =  (h / 60.0) - math.floor(h / 60.0)
	p = v * (1.0 - s)
	q = v * (1.0 - (f*s))
	t = v * (1.0 - ((1.0 - f) * s))
	return {
		0: (v, t, p),
		1: (q, v, p),
		2: (p, v, t),
		3: (p, q, v),
		4: (t, p, v),
		5: (v, p, q),
	}[hi]
