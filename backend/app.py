from flask import Flask, request, jsonify
from flask_cors import CORS
from dataGenerator import startVoltageThread
from utils import compute_energy_efficiency, molarFractions
import sys

app = Flask(__name__)
CORS(app)

# Start the background thread for voltage generation
startVoltageThread()

@app.route("/api/energy_efficiency", methods=["GET"])
def get_energy_efficiency():
    print("new energy_efficiency value asked", file=sys.stderr)
    efficiency, last_voltage = compute_energy_efficiency()
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

