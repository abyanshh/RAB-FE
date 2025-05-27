# doctors
CREATE TABLE public.doctors (
    doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    bio TEXT,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    avatar_url TEXT,
    location VARCHAR(100),
    available_days VARCHAR(10)[],
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    average_rating NUMERIC(2,1) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0
);

-- Foreign key dari tabel appointments
ALTER TABLE appointments
ADD CONSTRAINT appointments_doctor_id_fkey
FOREIGN KEY (doctor_id)
REFERENCES doctors(doctor_id)
ON DELETE CASCADE;

-- Foreign key dari tabel doctor_ratings
ALTER TABLE doctor_ratings
ADD CONSTRAINT doctor_ratings_doctor_id_fkey
FOREIGN KEY (doctor_id)
REFERENCES doctors(doctor_id)
ON DELETE CASCADE;

# users
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    username VARCHAR(50) UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    full_name VARCHAR(100),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    alamat TEXT,
    phone_number VARCHAR(15),
    tanggal_lahir DATE
);

-- Contoh foreign key dari tabel lain (harus dibuat di tabel-tabel tersebut):
ALTER TABLE appointments ADD CONSTRAINT appointments_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE comments ADD CONSTRAINT comments_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE doctor_ratings ADD CONSTRAINT doctor_ratings_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE forums ADD CONSTRAINT forums_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;


CREATE TABLE appointments (
    appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    doctor_id UUID NOT NULL,
    appointment_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    
    -- Foreign Key Constraints
    CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    
    CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id) ON DELETE CASCADE
);