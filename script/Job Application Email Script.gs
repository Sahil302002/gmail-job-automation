function sendJobApplicationEmails() {

  // ==============================
  // SHEET CONFIGURATION
  // ==============================

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Sheet1");

  const data = sheet.getDataRange().getValues();

  // ==============================
  // YOUR CONFIGURATION
  // ==============================

  // Resume File ID
  const resumeFileId = "1iXXXXXXXXXXXXXXXXXXXXXXXXXX";

  // LinkedIn Profile
  const linkedinProfile =
    "https://www.linkedin.com/in/sahilgupta-dataanalyst/";
// Resume File
const resumeFile = DriveApp.getFileById(resumeFileId);

// ==============================
// EMAIL LIMIT PER RUN
// ==============================

const maxEmailsPerRun = 20;

let emailsSent = 0;

// ==============================
// SUBJECT ROTATION
// ==============================

const subjects = [
  "Application for Data Analyst Opportunity",
  "Application for Power BI Developer Role",
  "Microsoft PL-300 Certified | Open to BI Opportunities",
  "Application for Business Intelligence Role",
  "Open to Work | Power BI & Data Analytics"
];

// ==============================
// LOOP THROUGH ROWS
// ==============================

for (let i = 1; i < data.length; i++) {

  // Stop after limit
  if (emailsSent >= maxEmailsPerRun) {

    Logger.log("Email limit reached.");
    break;
  }

  // ==============================
  // COLUMN MAPPING
  // ==============================

  const companyName = String(data[i][1] || "").trim(); // Column B
  const hrName = String(data[i][2] || "").trim();      // Column C
  const email = String(data[i][3] || "").trim();       // Column D
  const hiringFor = String(data[i][4] || "").trim();   // Column E
  const status = String(data[i][5] || "").trim();      // Column F

  // ==============================
  // SKIP CONDITIONS
  // ==============================

  if (!email) {

    Logger.log(`Row ${i + 1}: Email missing`);
    continue;
  }

  if (status === "Sent") {

    Logger.log(`Row ${i + 1}: Already sent`);
    continue;
  }

  // ==============================
  // RANDOM SUBJECT
  // ==============================

  const subject =
    subjects[Math.floor(Math.random() * subjects.length)];

  // ==============================
  // EMAIL TEMPLATE
  // ==============================

  const body = `
Dear ${hrName},

I hope you are doing well.

My name is Sahil Gupta, and I am actively seeking opportunities in Data Analytics, Power BI, and Business Intelligence domains. I recently came across the opening for the ${hiringFor} role at ${companyName} and would like to express my interest in the position.

I am a Microsoft PL-300 Certified Power BI Developer with hands-on experience in developing end-to-end BI and reporting solutions using Power BI, SQL, Python, Microsoft Fabric, DAX, and Excel.

Over the course of my experience, I have developed 9+ Power BI dashboards and automated reporting solutions across sales, finance, marketing, and operational analytics, including:

• KPI dashboards and business reporting
• Data modeling and DAX development
• SQL integrations and ETL workflows
• REST API integrations and automation
• Scheduled refresh setup and Power BI Service configuration
• CRM analytics and reporting automation

Additionally, I have practical experience with:

• SQL querying and performance optimization
• Python-based data processing and automation
• Microsoft Fabric and Power Automate
• Interactive data visualization and analytics
• Enterprise BI reporting solutions

I am currently based in Ahmedabad, Gujarat, and am open to remote, hybrid, or onsite opportunities.

Please find my resume attached for your consideration.

LinkedIn Profile:
${linkedinProfile}

I would welcome the opportunity to discuss how my technical expertise and analytical skills can contribute to the team at ${companyName}.

Thank you for your time and consideration. I look forward to hearing from you.

Best Regards,
Sahil Gupta

`;

  // ==============================
  // SEND EMAIL
  // ==============================

  try {

    GmailApp.sendEmail(
      email,
      subject,
      body,
      {
        attachments: [resumeFile.getBlob()],
        name: "Sahil"
      }
    );

    // ==============================
    // UPDATE STATUS
    // ==============================

    sheet.getRange(i + 1, 6).setValue("Sent");

    sheet.getRange(i + 1, 7).setValue(new Date());

    emailsSent++;

    Logger.log(`Email sent to ${email}`);

    // ==============================
    // DELAY BETWEEN EMAILS
    // ==============================

    Utilities.sleep(15000);

  } catch (error) {

    Logger.log(`Failed for ${email}: ${error}`);

    sheet.getRange(i + 1, 6).setValue("Failed");
  }
}

Logger.log(`Total emails sent: ${emailsSent}`);
}