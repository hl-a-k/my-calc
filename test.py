import Sun_direction as sd

# 距离春分的时间段
days = [-59,-28,31,61,92,122,153,184,214,245,275]
# 当地纬度
phi = 39.4
# 当地时间
STs = [9,10.5,12,13.5,15]

sd.print_message = False

for day in days:
    for ST in STs:
        datas = sd.太阳高度角(day, phi, ST)
        print(round(datas[0],3),round(datas[1],3))


# https://zhuanlan.zhihu.com/p/619404817
# orekit 