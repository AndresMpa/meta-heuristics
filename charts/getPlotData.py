import json
import os


def getData():
    try:
        # files = []
        files_directions = os.listdir('./logs')
        for dir in files_directions:
            file_stream = open('./logs/'+dir)
            file_data = json.load(file_stream)
            for data in file_data:
                print(data['cost'])
        '''
            file_stream.close()
        return files
        '''
    except:
        raise Exception("Images depends on logs, logs are not provided")


def cleanData():
    filesData = getData()
    print(filesData)
    '''
    for data in filesData:
        print("")
        print(data[1])
    '''


cleanData()
