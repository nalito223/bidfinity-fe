const accountsData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone_number: '555-555-5555',
    account_type: 'buyer',
    hosted_projects: [7, 2],
    bookmarked_projects: [2],
    country: 'USA',
    business_name: 'Acme Corporation',
    image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'janedoe@example.com',
    password: 'password456',
    phone_number: '555-555-5556',
    account_type: 'supplier',
    hosted_projects: [1, 3],
    bookmarked_projects: [1],
    country: 'USA',
    business_name: null,
    image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
  },
  {
    id: 3,
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob@example.com',
    password: 'password789',
    phone_number: '555-555-5557',
    account_type: 'buyer',
    hosted_projects: [4, 5, 6],
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
  project_title: 'Design and install new garden beds',
  created_date: '2022-02-01',
  location: '90210',
  project_summary: 'Looking for someone to help design and install new garden beds in our backyard. We would like a mix of perennials and annuals.',
  status: 'closed',
  contact_information: 'janedoe@example.com',
  upload_id: 4
  },
  {
  id: 2,
  project_title: 'Install new paver patio',
  created_date: '2022-02-03',
  location: '10016',
  project_summary: 'We need a new patio installed in our backyard. We want to use pavers and would like it to be large enough for a table and chairs.',
  status: 'open',
  contact_information: 'johndoe@example.com',
  upload_id: 5
  },
  {
  id: 3,
  project_title: 'Build a retaining wall',
  created_date: '2022-02-05',
  location: '60611',
  project_summary: 'We need a retaining wall built in our front yard to help with erosion control. We are looking for someone experienced in building retaining walls with natural stone.',
  status: 'closed',
  contact_information: 'bob@example.com',
  upload_id: 6
  },
  {
  id: 4,
  project_title: 'Install new irrigation system',
  created_date: '2022-02-07',
  location: '94110',
  project_summary: 'We need a new irrigation system installed in our front yard. We have a mix of grass and plants and want to make sure everything is getting the right amount of water.',
  status: 'open',
  contact_information: 'janedoe@example.com',
  upload_id: 7
  },
  {
  id: 5,
  project_title: 'Add new plants to front yard',
  created_date: '2022-02-10',
  location: '75201',
  project_summary: 'Looking for someone to help us add new plants to our front yard. We want to add some color and texture and are open to suggestions!',
  status: 'closed',
  contact_information: 'johndoe@example.com',
  upload_id: 8
  },
  {
  id: 6,
  project_title: 'Build a pergola',
  created_date: '2022-02-12',
  location: '90024',
  project_summary: 'We would like to add a pergola to our backyard to provide some shade. We would like it to be large enough to fit a table and chairs underneath.',
  status: 'open',
  contact_information: 'bob@example.com',
  upload_id: 9
  },
  {
  id: 7,
  project_title: 'Install new fence',
  created_date: '2022-02-15',
  location: '60657',
  project_summary: 'We need a new fence installed in our backyard. We want a wooden fence that provides some privacy.',
  status: 'closed',
  contact_information: 'janedoe@example.com',
  upload_id: 10
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