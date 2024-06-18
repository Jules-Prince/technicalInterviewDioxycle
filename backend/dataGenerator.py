import threading
import random
import time
from utils import getDBConnection

voltageList = []

def generateVoltageData():
    while True:
        conn = getDBConnection()
        cursor = conn.cursor()
        voltage = random.uniform(2, 4)
        cursor.execute('INSERT INTO voltages (voltage) VALUES (?)', (voltage,))
        conn.commit()
        print(f"Appended voltage: {voltage}")
        cursor.close()
        time.sleep(5)

def startVoltageThread():
    daemonThread = threading.Thread(target=generateVoltageData)
    daemonThread.daemon = True
    daemonThread.start()
