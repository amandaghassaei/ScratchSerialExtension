
// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  if (Serial.available()){
    Serial.print("received: ");
    Serial.println(Serial.readString());
  }
//  delay(1);
}



