# Job Application Email Automation

A Google Apps Script that automates personalized job application emails using data stored in a Google Sheet.

## Features

* Sends personalized emails to HR contacts.
* Attaches a resume from Google Drive.
* Rotates email subject lines randomly.
* Marks emails as **Sent** or **Failed** in the spreadsheet.
* Records the date and time each email is sent.
* Limits the number of emails sent per execution to help comply with Gmail sending limits.

## Spreadsheet Structure

| Column | Description          |
| ------ | -------------------- |
| B      | Company Name         |
| C      | HR Name              |
| D      | HR Email             |
| E      | Job Role             |
| F      | Status (Sent/Failed) |
| G      | Sent Timestamp       |

## Prerequisites

* Google Account
* Google Apps Script
* Google Sheets
* Gmail
* Resume stored in Google Drive

## Configuration

Before running the script, configure the required values such as:

* Resume File ID
* LinkedIn Profile (optional)
* Maximum emails per execution

> **Important:** Do not commit sensitive information such as Google Drive IDs, API keys, or personal credentials to a public repository.

## How It Works

1. Reads HR details from Google Sheets.
2. Generates a personalized email for each row.
3. Attaches the resume from Google Drive.
4. Sends the email through Gmail.
5. Updates the status and timestamp in the spreadsheet.
6. Stops after reaching the configured email limit.

## Technologies Used

* Google Apps Script
* Google Sheets
* Gmail Service
* Google Drive Service

## License

This project is provided for learning and personal automation purposes.
