import threading
import random
import time

voltageList = []

def generateVoltageData():
    while True:
        voltage = random.uniform(2, 4)
        voltageList.append(voltage)
        print(f"Appended voltage: {voltage}")
        time.sleep(5)

def startVoltageThread():
    daemonThread = threading.Thread(target=generateVoltageData)
    daemonThread.daemon = True
    daemonThread.start()
