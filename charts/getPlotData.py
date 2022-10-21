import os


def getData():
    try:
        last_file = os.listdir('./plotData')[0]
        return open('./plotData/'+last_file, 'r')
    except:
        raise Exception("Images depends on logs, logs are not provided")


getData()
