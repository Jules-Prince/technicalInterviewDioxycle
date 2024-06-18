from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import threading
import time
import random

voltageList = []
molarFractions = {'CO': None, 'H2': None}

def appendVoltageData():
    while True:
        voltage = random.uniform(2, 4)
        voltageList.append(voltage)
        print(f"Appended voltage: {voltage}")
        time.sleep(5)
        
def computeEnergyEfficency():
    if molarFractions["CO"] is not None and molarFractions["H2"] is not None:
        # Convert molar fractions to float if they are not already
        CO = float(molarFractions["CO"])
        H2 = float(molarFractions["H2"])
        if CO == 0 and H2 == 0 :
            return None
        # Calculate efficiency
        efficiency = (CO / (CO + H2)) * (1.47 / voltageList[-1])
        print(f"Energy Efficiency: {efficiency}")
        
        lastVoltage = voltageList[-1] if voltageList else None
        return efficiency, lastVoltage
    return None, None

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

daemon_thread = threading.Thread(target=appendVoltageData)
daemon_thread.daemon = True
daemon_thread.start()

@app.route("/energy_efficiency", methods=["GET"])
def getEnergyEffiency():
    efficiency, lastVoltage = computeEnergyEfficency()
    response = {
        "energyEffiency": efficiency,
        "lastVoltageData": lastVoltage
    }
    return jsonify(response)

@app.route("/molar_fractions", methods=["POST"])
def setMolarFractions():
    data = request.get_json()
    if "CO" in data and "H2" in data :
        molarFractions['CO'] = data['CO']
        molarFractions['H2'] = data['H2']
        return jsonify({'message': 'Molar fractions updated successfully'}), 200
    else :
        return jsonify({'error': 'Invalid data, CO and H2 fields are required'}), 400

