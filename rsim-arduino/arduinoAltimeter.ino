#include <SPI.h>
#include <SD.h>
#include <Adafruit_BMP280.h>

Adafruit_BMP280 bmp;
File data;
int count=0;
void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  SD.begin();
  if (!bmp.begin(0x76)) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring!"));
    while (1);
  }
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
  data = SD.open("test.txt", FILE_WRITE);
}

void loop() {
  // nothing happens after setup
  if (data&&count<500) {
    data.println(bmp.readAltitude(1019.66));
    Serial.println(bmp.readAltitude(1019.66));
    count++;
  }
  else{
    data.close();
    Serial.println("closed");
  }
  delay(10);
}
