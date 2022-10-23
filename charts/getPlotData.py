import json
import os


def getData():
    files = []
    epoch = []
    try:
        files_directions = os.listdir("./logs")
        for dir in files_directions:
            rawfileData = []
            epoch.append(dir[18:len(dir)-5])
            file_stream = open("./logs/"+dir)
            file_data = json.load(file_stream)
            for data in file_data:
                try:
                    rawfileData.append(data[1])
                except:
                    rawfileData.append(data)
            file_stream.close()

            files.append(rawfileData)
    except:
        raise Exception("Images depends on logs, logs are not provided")
    finally:
        return [files, epoch]


def clearData():
    filesData = getData()
    plots = []

    for index, files in enumerate(filesData[0]):
        plotData = {
            "title": filesData[1][index].replace("_", " ")[15:27],
            "limitVolume": [],
            "factible": [],
            "methods": [],
            "volume": [],
            "cost": []
        }
        for data in files:
            plotData["limitVolume"] = data["limitVolume"]
            plotData["methods"] = data["methods"]

            plotData["factible"].append(data["factible"])
            plotData["volume"].append(data["volume"])
            plotData["cost"].append(data["cost"])
        plots.append(plotData)

    return plots
