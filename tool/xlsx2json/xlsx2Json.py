# -*- coding:utf-8 -*-
# 上次修改时间 2019年6月13日21:26:06
# 修改人：lzw
# 修改功能：修改导出为json格式
# 修改功能：增加两个key值导出的功能,采用了json与python格式互转的方式书写数据

# 上次修改时间 2019年6月17日15:26:06
# 修改人：lzw
# 修改功能：添加对格式错误进行提示
# 修改功能：添加只对第一个工作表(sheet)进行解析

# 上次修改时间 2019年6月20日15:26:06
# 修改人：lzw
# 修改功能：修改key值可以是字符串与数字

# 上次修改时间 2019年6月20日15:28:06
# 修改人：lzw
# 修改功能：修改key值可以是字符串与数字
# 修改功能：修改key值为0时出现小数点

# 上次修改时间 2019年7月2日15:48:06
# 修改人：lzw
# 修改功能：修改第二个key值对比方法
# 修改功能：支持三个key

# 上次修改时间 2019年7月3日16:35:06
# 修改人：lzw
# 修改功能：对字段名称带有空格时提示

##上次修改时间 2019年7月3日19:41:06
# 修改人：lzw
# 修改功能：对不填内容,不添加对应字段到配表中

# 上次修改时间 2019年7月11日11:33:06
# 修改人：lzw
# 修改功能：对不填内容,不添加对应字段到配表中(修正a与o的导出内容)

# 上次修改时间 2019年7月11日16:43:06
# 修改人：lzw
# 修改功能：只对含有字段的内容进行解析,空白地方可以随意填写内容

# 上次修改时间 2019年7月12日14:14:06
# 修改人：lzw
# 修改功能：修改转换三个key值时,第二三个key类型为number类型无法转换的问题

# 上次修改时间 2019年7月30日15:39:06
# 修改人：lzw
# 修改功能：修改 无格式格规则 对应的列不导出数据

# 上次修改时间 2019年8月6日16:25:06
# 修改人：lzw
# 修改功能：修改 导出客户端需要用到的配表类型

# 上次修改时间 2019年8月14日19:54:06
# 修改人：lzw
# 修改功能：修改 导出客户端需要用到的配表对象类型

# 上次修改时间 2019年9月4日14:54:06
# 修改人：lzw
# 修改功能：增加空字段名称检查

# 上次修改时间 2019年9月5日17:24:06
# 修改人：lzw
# 修改功能：增加数字不必要固定int 或者 float 类型

# 上次修改时间 2019年9月5日17:24:06
# 修改人：lzw
# 修改功能：兼容合成数据类型

# 上次修改时间 2020年2月14日11:12:06
# 修改人：lzw
# 修改功能：兼容合成数据类型

# 上次修改时间 2020年3月31日14:17:06
# 修改人：lzw
# 修改功能：添加只导出前端或后端

# 上次修改时间 2020年5月19日16:17:06
# 修改人：lzw
# 修改功能：添加颜色打印(需要安装colorama模块)

# 上次修改时间 2020年5月25日11:54:06
# 修改人：lzw
# 修改功能：修复导出空字段的问题

# 上次修改时间 2020年8月12日11:54:06
# 修改人：lzw
# 修改功能：增加导出重复字段判断
# 修改功能：对应对应类型判断


import os
import sys
import codecs
import shutil
import xlrd  # excel操作库
import json
import random
import math
import datetime

from colorama import init

init(autoreset=True)


# 打印内容
def dePri(strd, type=31):
    # print("\033[0;30;40m\tHello World\033[0m") #黑色
    # print("\033[0;31;40m\tHello World\033[0m") #红色
    # print("\033[0;32;40m\tHello World\033[0m") #绿色
    # print("\033[0;33;40m\tHello World\033[0m") #黄色
    # print("\033[0;34;40m\tHello World\033[0m") #蓝色
    # print("\033[0;35;40m\tHello World\033[0m") #紫色
    # print("\033[0;36;40m\tHello World\033[0m") #浅蓝
    # print("\033[0;37;40m\tHello World\033[0m") #白色
    print("\033[0;" + str(type) + ";40m\t" + strd + "\033[0m")

#输出警告内容
def outputErrorContent(str):
    dePri(str)
    sys.exit()


#生成version文件
def makeVersionFile(path):

    writeCn = "{ \n";
    writeCn += "  \"1\": {\n    \"id\": 1,\n    \"version\": \""

    i = datetime.datetime.now();
    # print  ("当前的日期和时间是 %s" % i)
    # print  ("ISO格式的日期和时间是 %s" % i.isoformat())
    # print  ("当前的年份是 %s" % i.year)
    # print  ("当前的月份是 %s" % i.month)
    # print  ("当前的日期是  %s" % i.day)
    # print  ("dd/mm/yyyy 格式是  %s/%s/%s" % (i.day, i.month, i.year))
    # print  ("当前小时是 %s" % i.hour)
    # print  ("当前分钟是 %s" % i.minute)
    strDate = str(i.year)+ str(i.month)+ str(i.day)+ str(i.hour)+ str(i.minute)
    writeCn +=strDate;

    writeCn += "\"\n  }\n}"

    pathOut = path + "/client/version.json";
    fdt = codecs.open(pathOut, "w", "utf-8")
    fdt.write(writeCn)
    fdt.flush()
    fdt.close()




# 是否定义了格式
def isSpecifiedForamt(value):
    if value != u"i" and value != u"f" and value != u"s" and value != u"o" and value != u"a":
        return False
    return True


def isSpecifiedFieldName(value):
    if value == None:
        return False
    return True


def toString(v):
    if v == None:
        return None
    return (u"%s" % v)


def toHaveKey(v):
    if v == 0:
        v = 0
    elif hadleInt(v):
        v = hadleInt(v)
    else:
        v = v
    return v


def hadleInt(v):
    if v == None or v == "":
        return None
    try:
        v = int(float(v))
    except Exception, e:
        return None
    return v


def hadleFloat(v):
    if v == None or v == "":
        return None
    try:
        v = float(v)
    except Exception, e:
        return None
    return v


def hadleObject(v):
    if v == None or v == "":
        return None
    value = json.loads(v)
    isinstance(v,dict)
    return value


def hadlearray(v):
    if v == None or v == "":
        return None
    return json.loads(v)


def hadleString(v):
    if v == None or v == "":
        return None
    return json.loads(v)


def judgeTypeNum(v, type):
    try:
        strValue = math.modf(v)
        if strValue[0] > 0:
            return hadleFloat(v);
        else:
            return hadleInt(v);
    except:
        if (type == "i"):
            return hadleInt(v);
        elif (type == "f"):
            return hadleFloat(v);


def hadle(v, typeNe):
    if typeNe == "i":
        v = judgeTypeNum(v, typeNe);
        if v != None:
            if isinstance(v,(int,long)) ==False:
                outputErrorContent(u"类型 i 对应内容错误")
            return True, v
    elif typeNe == "f":
        v = judgeTypeNum(v, typeNe);
        if v != None:
            if isinstance(v,(int,float,long)) ==False:
                outputErrorContent(u"类型 f 对应内容错误")
            return True, v
    elif typeNe == "s":
        v = hadleString(v)
        if v != None:
            if isinstance(v,(unicode,str)) ==False:
                outputErrorContent(u"类型 s 对应内容错误")
            return True, v
    elif typeNe == "o":
        v = hadleObject(v)
        if v != None:
            if isinstance(v,dict) ==False:
                outputErrorContent(u"类型 o 对应内容错误")
            return True, v
    elif typeNe == "a":
        v = hadlearray(v)
        if v != None:
            if isinstance(v,list) ==False:
                outputErrorContent(u"类型 a 对应内容错误")
            return True, v
    else:
        v = json.loads(v)
        if v != None:
            return True, v

    return False, None


def check_middle_format(raw_msg):
    if (raw_msg.count("[") == raw_msg.count("]")):
        return False
    else:
        return True


def check_big_format(raw_msg):
    if (raw_msg.count("{") == raw_msg.count("}")):
        return False
    else:
        return True


# 根据key值的个数进行索引分配
def allotListBykey(dataChange, nameList, keyNum):
    keyCp = ""  # 用于匹配区分第一个key
    dictThi = {}  # 三级key内容
    dictSecond = {}  # 二级key内容
    dictAll = {}  # 一级key内容
    for k in range(0, len(dataChange)):
        if keyNum == 1:
            dictAll[dataChange[k][nameList[0]]] = dataChange[k]
        elif keyNum == 2:
            # 是否为最后一行
            if (k + 1) != len(dataChange):
                objC = {}
                objC[dataChange[k][nameList[keyNum - 1]]] = dataChange[k]
                key = dataChange[k][nameList[keyNum - 2]]
                keyCp = dataChange[k + 1][nameList[keyNum - 2]]
                reList = bUptoDict(dataChange, k, key, keyCp, dictSecond, objC)
                dictSecond = reList[0]
                bInsertOne = reList[1]
                if bInsertOne:
                    dictAll[dataChange[k][nameList[keyNum - 2]]] = dictSecond.copy();
                    dictSecond = {}
            else:
                objC = {}
                objC[dataChange[k][nameList[keyNum - 1]]] = dataChange[k]
                dictSecond.update(objC)
                dictAll[dataChange[k][nameList[keyNum - 2]]] = dictSecond.copy();
                dictSecond = {}
        elif keyNum == 3:
            # 是否为最后一行
            if (k + 1) != len(dataChange):
                # 获取名为最后一个key字典
                objC = {}
                objC[dataChange[k][nameList[keyNum - 1]]] = dataChange[k]
                # 获取对比的key 以下需要获取两个key加起来进行对比
                key = str(dataChange[k][nameList[keyNum - 2]]) + str(dataChange[k][nameList[keyNum - 3]])
                keyCp = str(dataChange[k + 1][nameList[keyNum - 2]]) + str(dataChange[k + 1][nameList[keyNum - 3]])
                # 根据上一个key是否相同返回是否需要插入上一级的对象
                reList = bUptoDict(dataChange, k, key, keyCp, dictThi, objC)
                dictThi = reList[0]
                bInsertOne = reList[1]
                if bInsertOne:
                    dictSecond[dataChange[k][nameList[keyNum - 2]]] = dictThi.copy();
                    dictThi = {}
                key = dataChange[k][nameList[keyNum - 3]]
                keyCp = dataChange[k + 1][nameList[keyNum - 3]]
                reListCp = bUptoDict(dataChange, k, key, keyCp, dictSecond, dictSecond)
                dictSecond = reListCp[0]
                bInsertTwo = reListCp[1]
                if bInsertTwo:
                    dictAll[dataChange[k][nameList[keyNum - 3]]] = dictSecond.copy()
                    dictSecond = {}
            else:
                # 连续嵌套
                objC = {}
                objC[dataChange[k][nameList[keyNum - 1]]] = dataChange[k]
                dictThi.update(objC)
                dictSecond[dataChange[k][nameList[keyNum - 2]]] = dictThi.copy()
                dictThi = {}
                dictSecond.update(dictSecond)
                dictAll[dataChange[k][nameList[keyNum - 3]]] = dictSecond.copy()
                dictSecond = {}

    return json.dumps(dictAll, sort_keys=True, ensure_ascii=False, indent=2)


# 判断是否需要插入上一级
def bUptoDict(dataChange, k, key, keyCp, dictCp, dictOr):
    bInsert = False;  # 是否需要插入
    if ((k + 1)) != len(dataChange) and key == keyCp:
        dictCp.update(dictOr)
    else:
        bInsert = True
        dictCp.update(dictOr)
    return dictCp, bInsert


# 找出数组内是否有相同的值
def bFindSameKey(arr):
    bFind = False;  # 是否找到
    obj = {}
    for key in arr:
        if(obj.has_key(key)):
            dePri(u"字段名 %s 重复,请修改后再试" % key)
            return True
        else:
            if(key!=""):
                obj[key] = 1
    return bFind


# 转换写入类型
def changeWriteType(ct):
    if ct == "i":
        return ": number;"
    elif ct == "f":
        return ": number;"
    elif ct == "a":
        return ": any[] = [];"
    elif ct == "o":
        return ": any;"
    elif ct == "s":
        return ": string;"
    else:
        return ": string;"


# 生成客户端写入配表类型
def wriiteClientCfgAct(path, className, nameType, nameAct, nameProp):
    StdClassName = "Std" + className.capitalize()
    writeCn = "class " + StdClassName + " { \n";
    for k in range(0, len(nameType)):
        writeCn += "    /** " + nameAct[k] + " */\n"
        writeCn += "    " + nameProp[k] + nameType[k] + "\n"
    writeCn += "}"
    pathOut = path + "/cfg/" + StdClassName + ".ts";
    fdt = codecs.open(pathOut, "w", "utf-8")
    fdt.write(writeCn)
    fdt.flush()
    fdt.close()


# 解析excel
def parseExcel(filenane, savepath):
    name = os.path.split(filenane)[1].split('.')[0]
    clientSavepath = os.path.join(savepath, "client", name) + ".json"
    serverSavepath = os.path.join(savepath, "server", name) + ".json"

    # 打开excel
    excel = xlrd.open_workbook(filenane)

    # 客户端所有数据体
    clientDictList = []
    # 服务端所有数据体
    serverDictList = []

    # 获取sheets
    sheets = excel.sheets()

    # 目前只对第一个表进行处理
    bFirstSheet = False;
    nProduceJson = 0  # 是否生成前后端Json文件 不填或0表示都生成 1表示生成前端 2表示生成后端 3表示都不生成
    
    ### yyq:单独对新增的LogDesStr.xlsx做处理 ###
    if name == "LogDesStr":
        print("spec handle LogDesStr.xlsx ...")
        nCounter = 0
        serverStr = "[\n"
        # 遍历所有的sheet
        for sheet in sheets:
            cols = sheet.ncols
            for r in xrange(0, sheet.nrows):
                for c in xrange(0, cols):
                    # r是行 c是列
                    
                    v = toHaveKey(sheet.cell_value(r, c));
                    nCounter = nCounter + 1
                    if r != sheet.nrows - 1:
                        serverStr = serverStr + "\"" +  v + "\",\n"
                    else:
                        serverStr = serverStr + "\"" +  v + "\"\n" #最后一行不加逗号

                    break#只需要第一列


            serverStr = serverStr + "]"
            serverfd = codecs.open(serverSavepath, "w", "utf-8")
            
            serverfd.write(serverStr)
            serverfd.flush()
            serverfd.close()
            break
        return


    # 遍历所有的sheet
    for sheet in sheets:
        cols = sheet.ncols

        # 记录已经执行过一次
        if bFirstSheet == True:
            break;

        # 判断行数是否满足要求，如果小于6行自判定为没有任何数据
        if sheet.nrows >= 6:
            # 读取第一行，判断是否有指定数据格式

            # 保存预设key值个数 默认为1个
            keyNum = 1

            nameType = []  # 字段类型
            nameAct = []  # 字段说明
            nameProp = []  # 字段属性
            bProduceStd = False  # 是否生成std配表

            nameList = []  # 字段列表
            # 读取第6行，判断是否有指定数据字段
            for c in xrange(0, cols):

                if c == 1:  # 保存获取key个数
                    keyNum = int(sheet.cell_value(1, 1))
                if isSpecifiedFieldName(sheet.cell_value(5, c)) != True:
                    print u"%s的%s表格未指定字段名:%d行%d列" % (os.path.split(filenane)[1], sheet.name, 5, c + 1)
                    os.system('pause')
                    sys.exit()

                keyName = sheet.cell_value(5, c)
                if (' ' in keyName):
                    print u"%s的%s表格:%d行%d列的字段名! %s !带有空格" % (os.path.split(filenane)[1], sheet.name, 5, c + 1, keyName)
                    print u"请去掉字段中的空格后重试"
                    os.system('pause')
                    sys.exit()

                if (keyName == "" and sheet.cell_value(0, c) != ""):
                    print u"%s的表格:%d行%d列的字段名: %s !为空! " % (os.path.split(filenane)[1], 5, c + 1, keyName)
                    print u"请填上字段名后重试"
                    os.system('pause')
                    sys.exit()

                # # 保存字段名称列表
                # if keyName != "":
                nameList.append(keyName)

                # 读取生成Std字段内容

                if c == 0:
                    nameType.append(changeWriteType(sheet.cell_value(0, c)))
                    nameAct.append(sheet.cell_value(4, c))
                    nameProp.append(sheet.cell_value(5, c))
                else:
                    if sheet.cell_value(3, c) == 1:
                        nameType.append(changeWriteType(sheet.cell_value(0, c)))
                        nameAct.append(sheet.cell_value(4, c))
                        nameProp.append(sheet.cell_value(5, c))

            # 读取是否单独生成前后端内容
            try:
                nProduceJson = hadleInt(sheet.cell_value(1, 3))
                if nProduceJson == None or nProduceJson == "":
                    nProduceJson = 0
                if nProduceJson != 0:
                    print u"！！2行D列配置了 0表示都生成 1表示生成前端 2表示生成后端 3表示都不生成！！";
            except:
                nProduceJson = 0;

            # 读取是否生成std配表
            try:
                bProduceStd = sheet.cell_value(1, 2);
            except:
                print u" %s配表的位于 2行C列的Std配表字段没有配置 请检查! " % (os.path.split(filenane)[1]);
                os.system('pause')
                sys.exit()

            # 判断key列表有没有重名
            if bProduceStd and bFindSameKey(nameList):
                os.system('pause')
                sys.exit()


            if bProduceStd and (nProduceJson == 0 or nProduceJson == 1):
                wriiteClientCfgAct(savepath, name, nameType, nameAct, nameProp)

            #生成版本更新配置日期
            makeVersionFile(savepath)

            clientStr = ""
            serverStr = ""
            # 读取第七行的数据
            for r in xrange(6, sheet.nrows):
                bBracket = False  # 是否需要加中括号
                clientObj = {}
                serverObj = {}
                for c in xrange(0, cols):
                    # r是行 c是列
                    if c == 0:
                        v = toHaveKey(sheet.cell_value(r, c));
                        if v == "":
                            break
                        if v == None:
                            print u"%s的%s表格数据格式不正确:%d行%d列" % (os.path.split(filenane)[1], sheet.name, r + 1, 1)
                            os.system('pause')
                            sys.exit()
                            return
                        clientObj[nameList[c]] = v
                        serverObj[nameList[c]] = v
                    else:
                        ret = [False, None]
                        if nameList[c] and sheet.cell_value(0, c):
                            try:
                                ret = hadle(sheet.cell_value(r, c), sheet.cell_value(0, c))
                            except:
                                li = [chr(i) for i in range(ord("A"), ord("Z") + 1)]
                                print u"%s的表格中的 %s 数据格式不正确:%d行%s列" % (
                                    os.path.split(filenane)[1], sheet.cell_value(r, c), r + 1, c)
                                os.system('pause')
                                sys.exit()
                            if ret[0] == True:
                                # 客户端判读是否写入
                                if (sheet.cell_value(3, c) and (
                                        sheet.cell_value(3, c) == 1 or sheet.cell_value(3, c) == "1")) or c == 0:
                                    clientObj[nameList[c]] = ret[1]
                                # 服务端判读是否写入
                                if (sheet.cell_value(2, c) and (
                                        sheet.cell_value(2, c) == 1 or sheet.cell_value(2, c) == "1")) or c == 0:
                                    serverObj[nameList[c]] = ret[1]
                if len(clientObj) > 0:
                    clientDictList.append(clientObj)
                if len(serverObj) > 0:
                    serverDictList.append(serverObj)

            if nProduceJson == 0 or nProduceJson == 1:
                # 写数据
                fd = codecs.open(clientSavepath, "w", "utf-8")
                clientStr = allotListBykey(clientDictList, nameList, keyNum)
                fd.write(clientStr)
                fd.flush()
                fd.close()

            if nProduceJson == 0 or nProduceJson == 2:
                serverfd = codecs.open(serverSavepath, "w", "utf-8")
                serverStr = allotListBykey(serverDictList, nameList, keyNum)
                serverfd.write(serverStr)
                serverfd.flush()
                serverfd.close()

        bFirstSheet = True


# 解析当前目录下或是自定目录下的xls或xlsx文件
# 当前pyhton文件的路径
curFilePath = os.path.split(os.path.realpath(sys.argv[0]))[0]
# xls或xlsx所在的目录
excelPath = curFilePath
# 是否发生错误
error = False
# 是否多个文件打包
many = False
# 指定的目录
if len(sys.argv) >= 2:
    if os.path.isdir(sys.argv[1]):
        excelPath = os.path.realpath(sys.argv[1])
    else:
        many = True
        for x in xrange(1, len(sys.argv)):
            try:
                parseExcel(os.path.realpath(sys.argv[x]), excelPath)  # 拖文件操作
            except ValueError, Argument:
                error = True
                dePri(u"打包错误请检查")
				 # 访问异常的错误编号和详细信息
                dePri(Argument)
                os.system('pause')
                
if not many:
    # print u"存储位置\n", excelPath
    server = os.path.join(excelPath, "server")
    if not os.path.exists(server):
        os.makedirs(server)
    client = os.path.join(excelPath, "client")
    if not os.path.exists(client):
        os.makedirs(client)
    cfg = os.path.join(excelPath, "cfg")
    if not os.path.exists(cfg):
        os.makedirs(cfg)
    # 遍历所有的xls或xlsx文件
    lists = os.listdir(excelPath)
    for x in lists:
        excelFile = os.path.join(excelPath, x)
        if os.path.isfile(excelFile) and (excelFile.endswith('xls') or excelFile.endswith('xlsx')) and not x.startswith(
                "~$") and not x.startswith("refresh"):
            try:
                print u"正在打包%s" % excelFile
                parseExcel(excelFile, excelPath)
            except:
                error = True
                dePri(u"打包错误请检查%s" % excelFile)
                # 访问异常的错误编号和详细信息
                dePri(e.args)
                dePri(str(e))
                dePri(repr(e))
                os.system('pause')

if not error:
    dePri(u"打包配表完毕", 32)
    os.system('pause')
# os.system('pause')