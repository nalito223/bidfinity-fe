const accountsData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone_number: '555-555-5555',
    account_type: 'buyer',
    hosted_projects: [1],
    bookmarked_projects: [2],
    country: 'USA',
    business_name: 'Acme Corporation',
    image: 'https://example.com/profile.jpg'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'janedoe@example.com',
    password: 'password456',
    phone_number: '555-555-5556',
    account_type: 'supplier',
    hosted_projects: [2],
    bookmarked_projects: [1],
    country: 'USA',
    business_name: null,
    image: 'https://example.com/profile.jpg'
  },
  {
    id: 3,
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob@example.com',
    password: 'password789',
    phone_number: '555-555-5557',
    account_type: 'buyer',
    hosted_projects: [3],
    bookmarked_projects: [2],
    country: 'USA',
    business_name: 'XYZ Corporation',
    image: 'https://example.com/profile.jpg'
  }
];

const uploadsData = [
  {
    id: 1,
    filename: 'document1.pdf',
    filesize: 1024,
    mimetype: 'application/pdf',
    s3_object_key: 's3://my-bucket/document1.pdf',
    uploaded_at: '2022-01-01 12:00:00'
  },
  {
    id: 2,
    filename: 'document2.pdf',
    filesize: 2048,
    mimetype: 'application/pdf',
    s3_object_key: 's3://my-bucket/document2.pdf',
    uploaded_at: '2022-01-02 12:00:00'
  },
  {
    id: 3,
    filename: 'document3.pdf',
    filesize: 4096,
    mimetype: 'application/pdf',
    s3_object_key: 's3://my-bucket/document3.pdf',
    uploaded_at: '2022-01-03 12:00:00'
  }
];

const projectsData = [
  {
    id: 1,
    project_title: 'Build a new website',
    created_date: '2022-01-01',
    location: 'New York, NY',
    project_summary: 'We need a new website for our business',
    status: 'in progress',
    contact_information: 'johndoe@example.com',
    upload_id: 1
  },
  {
    id: 2,
    project_title: 'Launch a marketing campaign',
    created_date: '2022-01-02',
    location: 'Los Angeles, CA',
    project_summary: 'We want to reach a new audience',
    status: 'completed',
    contact_information: 'janedoe@example.com',
    upload_id: 2
  },
  {
    id: 3,
    project_title: 'Develop a mobile app',
    created_date: '2022-01-03',
    location: 'San Francisco, CA',
    project_summary: 'We need an app for our customers',
    status: 'in progress',
    contact_information: 'bob@example.com',
    upload_id: 3
  }
]

module.exports = {
  accountsData,
  uploadsData,
  projectsData
};


// Schema for back end

// CREATE TABLE accounts (
//   id SERIAL PRIMARY KEY,
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   phone_number VARCHAR(20),
//   account_type VARCHAR(50),
//   hosted_projects INTEGER[],
//   bookmarked_projects INTEGER[],
//   country VARCHAR(255),
//   business_name VARCHAR(255),
//   image VARCHAR(255)
// );
// CREATE TABLE projects (
//   id SERIAL PRIMARY KEY,
//   project_title VARCHAR(255) NOT NULL,
//   created_date DATE NOT NULL,
//   location VARCHAR(255),
//   project_summary TEXT,
//   status VARCHAR(50),
//   contact_information VARCHAR(255),
//   upload_id INTEGER REFERENCES uploads(id)
// );
// CREATE TABLE uploads (
//   id SERIAL PRIMARY KEY,
//   filename VARCHAR(255) NOT NULL,
//   filesize INTEGER NOT NULL,
//   mimetype VARCHAR(255) NOT NULL,
//   s3_object_key VARCHAR(255) NOT NULL,
//   uploaded_at TIMESTAMP NOT NULL DEFAULT NOW()
// );