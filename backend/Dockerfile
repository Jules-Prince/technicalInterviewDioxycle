FROM python:3.12

# Set working directory inside the container
WORKDIR /app

# Copy and install requirements first for caching
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code to the container
COPY backend/ .

# Expose the Flask port
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]