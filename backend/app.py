import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from dataGenerator import startVoltageThread
from utils import computeEnergyEfficiency, getDBConnection, molarFractions
import sys

app = Flask(__name__)
CORS(app)

def createTable():
    conn = getDBConnection()

    with open('db/schema.sql') as f:
        conn.executescript(f.read())

    conn.close()

createTable()

startVoltageThread()

@app.route("/api/energy_efficiency", methods=["GET"])
def get_energy_efficiency():
    print("new energy_efficiency value asked", file=sys.stderr)
    efficiency, last_voltage = computeEnergyEfficiency()
    response = {
        "energyEfficiency": efficiency,
        "lastVoltageData": last_voltage
    }
    print(f"new energy_efficiency value : {response}", file=sys.stderr)
    return jsonify(response)

@app.route("/api/molar_fractions", methods=["POST"])
def set_molar_fractions():
    data = request.get_json()
    print(f"new molar fractions value : {data}", file=sys.stderr)
    if "CO" in data and "H2" in data:
        molarFractions['CO'] = data['CO']
        molarFractions['H2'] = data['H2']
        return jsonify({'message': 'Molar fractions updated successfully'}), 200
    else:
        return jsonify({'error': 'Invalid data, CO and H2 fields are required'}), 400

