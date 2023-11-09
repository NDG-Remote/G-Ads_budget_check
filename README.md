# Manual - Google Ads Weekly Spend Monitoring Script

This JavaScript script is designed for Google Ads and serves the purpose of monitoring weekly campaign Ad spend. It provides email notifications in cases where the campaign's spending exceeds or falls short of the target by a margin of 10% or more.

## Getting Started

***First: Prepare the Google Sheet:***
1. Go to the Google Sheet Link --> https://docs.google.com/spreadsheets/d/1EdQj7lsxZO_9i0K3XhVRUs76z-M7m8mgYaXH2tgmf-M/edit?usp=sharing
1. Make a copy of the Sheet and save it in your Google Drive.
1. Fill in the exact campaign names and their monthly budgets in the yellowish fields.
1. Rename the tab(s) with the exact campaign name.
1. Optionally, add more tabs if you have more campaigns to monitor.
1. Go to the last tab, "Overspending Alert Weekly Budget".
1. Add the Google account number, client's name, the exact campaign names, and email address(es) where you want to receive alert emails.


**Second: Copy and Insert the Script:**
1. Copy the budget_script.js from this repository.
1. In your Google Ads Account, navigate to "Tools and Settings" --> "Scripts."
1. Add a new script.
1. Insert the script and place the URL of your Google Sheet between the square brackets "[ ]".
1. Preview it (you may need to authorize the script) and save it.

### Please Note:
If you wish to test the script, **consider temporarily adjusting the budget in the Google Sheet**. Because if everything is working correctly and Google Ads is not over or underspending in the current week, you won't receive an email.

## IMPORTANT:
! Only modify the yellowish fields in the Google Sheet.
! The Google Sheet includes additional columns designed for a Budget Monitoring Dashboard in Looker Studio, a feature not addressed within this GitHub repository. However, I recommend maintaining the sheet in its current state.
! Do not change the name of the last tab; it must remain "Overspending Alert Weekly Budget".


For detailed instructions, refer to [my tutorial video](/Tutorial.mp4)
