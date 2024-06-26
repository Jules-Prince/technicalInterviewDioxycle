# Energy Efficiency Calculator

<img width="960" alt="Capture d’écran 2024-06-18 à 18 41 12" src="https://github.com/Jules-Prince/technicalInterviewDioxycle/assets/47424960/0c407eea-370e-4128-9651-1e1d9a5346fb">


This small application allows you to compute the energy efficiency value based on the molar fractions of CO and H2 gases. The voltage used in the calculation is randomly generated every 5 seconds on the backend.

## Energy Efficiency Formula

The energy efficiency (`EE`) is calculated using the following formula:

$EE=(Xco/(Xco+Xh2)) * (1.47/V)$

Where:

- \( X_CO \) is the molar fraction of CO gas,
- \( X_H2 \) is the molar fraction of H2 gas,
- \( V \) is the last generated voltage.

## Backend API Routes

The backend exposes the following routes:

- **GET /api/energy_efficiency**: Retrieves the computed value of energy efficiency and the last recorded voltage.

- **POST /api/molar_fractions**: Submits the values of CO and H2 molar fractions to update the calculation.

## Usage

To build the application using Docker:

```bash
docker compose build
```

To run the application:

```bash
docker compose up
```

Then the frontend is served on port 80.
