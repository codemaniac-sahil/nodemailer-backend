# Task 2: Email Scheduler Backend

This project provides a backend API for scheduling and sending emails using [Agenda](https://github.com/agenda/agenda) and [Nodemailer](https://nodemailer.com/). The API accepts a request containing the email body, subject, recipient's email address, and scheduling time. It then uses Agenda to schedule the email to be sent one hour later.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

### Prerequisites

Please make sure you have Node.js installed. This project requires Node.js and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/codemaniac-sahil/nodemailer-backend.git
   cd nodemailer-backend
   ```
2. Install the dependencies:

```bash
npm install
```
## Usage

1. Start the server:
   ```bash
      npm start
   ```
2. The server will run on http://localhost:3000 by default.

## Configuration

Environment Variables
Create a .env file in the root of the project and set the following environment variables:

```bash
  PORT=3000
  SMTP_HOST=smtp.example.com
  SMTP_PORT=587
  SMTP_USER=your_email@example.com
  SMTP_PASS=your_email_password
```

## Agenda Configuration
Agenda is configured to use MongoDB for job persistence. Set up your MongoDB connection URL in the .env file:
```bash
MONGODB_URI=mongodb://localhost:27017/agenda
```

## API
[POST] /schedule-email
Schedules an email to be sent after 1 hour.

Endpoint: /schedule-email

Method: POST

Content-Type: application/json

Request Body

```bash
{
  "email": "recipient@example.com",
  "subject": "Email Subject",
  "body": "Email body content"
}
```

## Response
200 OK: Email scheduled successfully.
400 Bad Request: Missing or invalid parameters.

## Dependencies
Agenda: Job scheduling library for Node.js.

Nodemailer: Email sending library for Node.js.

Express: Web framework for Node.js.

dotenv: Loads environment variables from a .env file.

MongoDB: Used for persistence with Agenda.
