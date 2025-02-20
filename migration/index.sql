use smarthome;
CREATE TABLE IF NOT EXISTS data_sensors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    light FLOAT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS history_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO data_sensors (temperature, humidity, light) VALUES
(25.5, 60.2, 300),
(27.0, 55.5, 450),
(29.3, 70.1, 600),
(22.8, 50.0, 200),
(26.7, 65.3, 320),
(30.2, 75.0, 580),
(24.4, 52.7, 400),
(28.1, 68.2, 500),
(23.5, 48.9, 250),
(31.0, 80.1, 700),
(26.0, 62.5, 350),
(28.5, 58.0, 470),
(30.1, 72.3, 620),
(21.9, 49.5, 180),
(25.8, 66.7, 310),
(32.0, 78.5, 590),
(23.7, 51.2, 410),
(27.3, 69.8, 530),
(22.5, 47.8, 260),
(33.2, 82.0, 750);


INSERT INTO history_actions (device, action) VALUES
('Fan', 'Turn On'),
('Light', 'Turn Off'),
('Heater', 'Turn On'),
('AC', 'Turn Off'),
('Door', 'Turn On'),
('Window', 'Turn Off'),
('Pump', 'Turn On'),
('Alarm', 'Turn Off'),
('TV', 'Turn On'),
('Speaker', 'Turn Off'),
('Window', 'Turn On'),
('Window', 'Turn Off'),
('Pump', 'Turn On'),
('Pump', 'Turn Off'),
('Alarm', 'Turn On'),
('Alarm', 'Turn Off'),
('TV', 'Turn On'),
('TV', 'Turn Off'),
('Speaker', 'Turn On'),
('Speaker', 'Turn Off');


