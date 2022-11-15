from dotenv import dotenv_values
import json
import os


def extractDataFromFile(target=1):
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
                    rawfileData.append(data[target])
                except:
                    raise Exception(
                        "There's a problem with your data structure")
            file_stream.close()

            files.append(rawfileData)
    except:
        raise Exception("Images depends on logs, logs are not provided")
    finally:
        return [files, epoch]


def getExtraGeneticData(container):
    extraData = extractDataFromFile(2)

    for _, dataSet in enumerate(extraData[0]):
        for _, rawData in enumerate(dataSet):
            rawData[0]["schema_population"] = len(rawData)
            container.append(rawData[0])

    return container


def getExtraGraspData(container):
    extraData = extractDataFromFile(2)
    for _, reader in enumerate(extraData):
        print(reader)
    return container


def getPlotData():
    config = dotenv_values(".env")

    # Getting environmental data
    method = list(config.items())[2][1]

    filesData = extractDataFromFile()
    extraPlots = []
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

    if (method == "genetic"):
        return [plots, getExtraGeneticData(extraPlots)]
    elif (method == "grasp"):
        return [plots, getExtraGraspData(extraPlots)]
    else:
        return plots


getPlotData()
