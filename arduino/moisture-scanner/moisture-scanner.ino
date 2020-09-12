#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "ssid";
const char* password = "password";

int soilMoistureValue = 0;

class Sensor
{
  public:
    int pin;
    int currentValue;
};

Sensor sensorA;
Sensor sensorB;
Sensor sensorC;
Sensor sensorD;
Sensor sensorE;

Sensor sensors[5];

void setup()
{
  sensorA.pin = 15;
  sensorB.pin = 2;
  sensorC.pin = 34;
  sensorD.pin = 35;
  sensorE.pin = 32;

  sensorA.currentValue = 0;
  sensorB.currentValue = 0;
  sensorC.currentValue = 0;
  sensorD.currentValue = 0;
  sensorE.currentValue = 0;

  sensors[0] = sensorA;
  sensors[1] = sensorB;
  sensors[2] = sensorC;
  sensors[3] = sensorD;
  sensors[4] = sensorE;

  Serial.begin(9600);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi.");
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;

    http.begin("http://192.168.0.45:3000/measurements");

    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");

    int sensorsCount = sizeof(sensors) / sizeof(sensors[0]);
    for (int sensor_index = 0; sensor_index < sensorsCount; sensor_index++)
    {
      soilMoistureValue = 0;

      Sensor currentSensor = sensors[sensor_index];

      sensors[sensor_index].currentValue = analogRead(currentSensor.pin);
    }


    String json = String("{\"A\": ") + String(sensorA.currentValue) + String(',') +
                  String("\"B\": ") + String(sensorB.currentValue) + String(',') +
                  String("\"C\": ") + String(sensorC.currentValue) + String(',') +
                  String("\"D\": ") + String(sensorD.currentValue) + String(',') +
                  String("\"E\": ") + String(sensorE.currentValue) +
                  String('}');

    Serial.println(json);

    int httpResponseCode = http.POST(json);

    http.end();

    delay(5000);
  }


}
