from dataGenerator import voltageList
import random

molarFractions = {'CO': None, 'H2': None}

def compute_energy_efficiency():
    if molarFractions["CO"] is not None and molarFractions["H2"] is not None:
        CO = float(molarFractions["CO"])
        H2 = float(molarFractions["H2"])
        if CO == 0 and H2 == 0:
            return None, None
        
        efficiency = (CO / (CO + H2)) * (1.47 / voltageList[-1])
        print(f"Energy Efficiency: {efficiency}")
        
        last_voltage = voltageList[-1] if voltageList else None
        return efficiency, last_voltage
    return None, None
