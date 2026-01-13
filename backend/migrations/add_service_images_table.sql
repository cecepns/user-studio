-- Migration to support multiple images per service

-- Create service_images table if it does not exist
CREATE TABLE IF NOT EXISTS service_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Seed primary image from existing services where applicable
INSERT INTO service_images (service_id, image_url, is_primary, sort_order)
SELECT s.id, s.image, true, 0
FROM services s
WHERE s.image IS NOT NULL
  AND s.image <> ''
  AND NOT EXISTS (
    SELECT 1
    FROM service_images si
    WHERE si.service_id = s.id
  );

