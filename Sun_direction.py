import math

"""
alpha 太阳高度角
phi 为当地维度(北纬为正)
omiga 为太阳时角
ST(direction_time) 为当地时间
delta 为太阳赤纬角
Day 以春分作为0天起计算的天数
"""

print_message:bool = True

def printb(*args):
    if print_message:
        print(*args)
    else:
        pass

def high_angle(sin_delta, phi, omiga):
    """
    太阳高度角sin_alpha
    """
    data = transform_tri(sin_delta) * math.cos(phi) * math.cos(omiga) + sin_delta * math.cos(phi)
    printb("太阳高度角sin alpha为:", data)
    printb("太阳高度角cos alpha为:", transform_tri(data))
    return (data,transform_tri(data))

def direction_angle(sin_delta, sin_alpha, phi):
    """
    太阳方位角 cos_gamma
    其中有 alpha == 太阳高度角
    """
    data = (sin_delta - (sin_alpha * math.sin(phi))) / (transform_tri(sin_alpha) * math.cos(phi))
    printb("太阳方位角sin gamma为:", transform_tri(data))
    printb("太阳方位角cos gamma为:", data)
    return (transform_tri(data),data)

def sun_time_angle(direction_time):
    """
    太阳时角omiga
    ST(direction_time) 当地时间
    """
    data = math.pi/12 * (direction_time - 12)
    printb("太阳时角omiga为:",data)
    return data

def sun_declination_angle(Day):
    """
    太阳赤纬角 sin_delta
    Day 距离春分的天数
    """
    data=math.sin(2 * math.pi * Day / 365) * math.sin(23.45 * math.pi/180)
    printb("太阳赤纬角sin detla为:",data)
    return data

def transform_tri(old_data):
    """
    cos与sin的转换关系 
    """
    new_data = (1 - (old_data ** 2)) ** 0.5
    return new_data

def 太阳高度角(Day, phi, direction_time):
    """
    Day 为春分为第0天计算天数
    phi 为当地纬度(北纬为正)
    ST(direction_time) 为当地时间
    """
    the_high_angle = high_angle(sun_declination_angle(Day), phi, sun_time_angle(direction_time))
    return the_high_angle

def 太阳方位角(Day, phi, direction_time):
    """
    Day 为春分为第0天计算天数
    phi 为当地纬度(北纬为正)
    ST(direction_time) 为当地时间
    """
    the_position_angle = direction_angle(sun_declination_angle(Day), 太阳高度角(Day, phi, direction_time)[0], phi)
    return the_position_angle
