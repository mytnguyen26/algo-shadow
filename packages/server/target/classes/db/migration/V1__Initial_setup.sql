-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords only
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                             );

-- Create experiments table
CREATE TABLE IF NOT EXISTS experiments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    algorithm_name VARCHAR(255) NOT NULL,
    algorithm_inputs INTEGER[] NOT NULL,
    execution_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
