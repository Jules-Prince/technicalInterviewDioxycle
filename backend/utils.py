import sqlite3
import os

molarFractions = {'CO': None, 'H2': None}

def getDBConnection():
    dbPath = os.path.join(os.path.dirname(__file__), 'data', 'voltages.db')
    conn = sqlite3.connect(dbPath)
    conn.row_factory = sqlite3.Row
    return conn

def getLatestVoltage():
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute('SELECT voltage FROM voltages ORDER BY timestamp DESC LIMIT 1')
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

def computeEnergyEfficiency():
    if molarFractions["CO"] is not None and molarFractions["H2"] is not None:
        CO = float(molarFractions["CO"])
        H2 = float(molarFractions["H2"])
        if CO == 0 and H2 == 0:
            return None, None
        
        last_voltage = getLatestVoltage()
        if last_voltage is None:
            return None, None

        efficiency = (CO / (CO + H2)) * (1.47 / last_voltage)
        print(f"Energy Efficiency: {efficiency}")
        
        return efficiency, last_voltage
    return None, None

