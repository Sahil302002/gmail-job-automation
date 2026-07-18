function sendJobApplicationEmails() {

const sheet = SpreadsheetApp
.getActiveSpreadsheet()
.getSheetByName("Sheet2");

const data = sheet.getDataRange().getValues();

const resumeFileId = "1iztVFt_UTdzBJgPMbsPoFeXxWcyj-AH0";

const linkedinProfile =
"https://www.linkedin.com/in/sahilgupta-dataanalyst/";

const My_Profile  =
"https://github.com/Sahil302002";

const resumeFile =
DriveApp.getFileById(resumeFileId);

const maxEmailsPerRun = 20;

let emailsSent = 0;

for (let i = 1; i < data.length; i++) {


if (emailsSent >= maxEmailsPerRun) {
  break;
}

const hrName =
  String(data[i][0] || "").trim();

const email =
  String(data[i][1] || "").trim();

const company =
  String(data[i][3] || "").trim();

const status =
  String(data[i][4] || "").trim();


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  sheet.getRange(i + 1, 5).setValue("Invalid Email");
  continue;
}


if (!email) continue;

if (
  status === "Sent" ||
  status === "Delivered" ||
  status === "Hard Bounce" ||
  status === "Soft Bounce" ||
  status === "Failed"
) {
  continue;
}


const subject =
"Application for Power BI Developer / Data Analyst Opportunity";


const body = `

Dear ${hrName || "Hiring Manager"},

I hope you are doing well.

I am reaching out to express my interest in any current or upcoming opportunities at ${company} related to Power BI Developer, Data Analyst, Reporting Analyst, MIS Analyst or Business Intelligence opportunities.

I am a Microsoft PL-300 Certified Data Analyst/ Power BI Developer with hands-on experience in Power BI, SQL, DAX, Power Query, Microsoft Fabric, Excel, and data analytics.

My experience includes building interactive dashboards, KPI reporting solutions, data models, ETL processes, REST API Integrations and business intelligence solutions that help organizations make data-driven decisions.

My key skills include:

• Power BI, DAX & Data Modeling
• SQL & Database Querying
• Power Query (M) & ETL Development
• Microsoft Fabric & Power Automate
• Python Automation & Data Processing
• REST API Integrations
• Advanced Excel & Google Sheets
• Reporting & Dashboard Automation
• Power BI Paginated Report

During my experience, I have worked on Sales, Finance, Marketing, Healthcare, and Operations reporting projects, developing dashboards and automated reporting solutions that improved data accessibility and decision-making.

Additionally, I have experience supporting business operations through MIS reporting, Excel/Google Sheets automation, lead management, and cross-functional collaboration with sales, finance, and operations teams.

I am currently based in Ahmedabad, Gujarat, and am open to remote, hybrid, or onsite opportunities. I am also willing to relocate for the right opportunity and can join immediately.


Please find my resume attached for your review.

LinkedIn: ${linkedinProfile}
Github Profil: ${My_Profile} 
Thank you for your time and consideration. I look forward to hearing from you.

Best Regards,

Sahil Gupta
`;


try {

  GmailApp.sendEmail(
  email,
  subject,
  body,
  {
    htmlBody: body.replace(/\n/g, "<br>"),
    attachments: [
      resumeFile.getBlob()
    ],
    name: "Sahil Gupta"
  }
);

  sheet
    .getRange(i + 1, 5)
    .setValue("Sent");

  sheet
    .getRange(i + 1, 6)
    .setValue(new Date());

  sheet
    .getRange(i + 1, 7)
    .setValue("");

  emailsSent++;

  Utilities.sleep(15000);

} catch (e) {

  sheet
    .getRange(i + 1, 5)
    .setValue("Failed");

  sheet
    .getRange(i + 1, 7)
    .setValue(e.toString());

}


}

}
