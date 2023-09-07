# Downloaders and data scrapers
Webpage scrapers/data retrievers for various sites. To simplify the task of authentication, I expect anything I write will be written in JS for pasting into console when the site is loaded.

## JobPts
### Background
Jobpts is a service that companies use to allow recognizing other employees that give points that can be used for purchases or gift cards. 
company's site: https://semoscloud.com/product/jobpts/

Working/tested in early September 2023.

### Purpose of downloader
It may be desirable to have an extract of the recognitions given/received for use in performance reviews or when leaving a company. 

### Usage/Instructions
- **jobpts/receiver.js** can be used to retrieve json of the received recognitions.
- **jobpts/giver.js** can be used to retrieve the json of the given recognitions.

**Instructions** (same for both files): 
1. Copy the file contents of **giver.js** or **receiver.js** .
2. Open your company's JobPts site in Chrome/Edge.
3. Open developer tools (CTRL-SHIFT-I or F12).
4. Paste the script into the console tab of developer tools. 

The script can take some time depending on the amount of recognitions as it was written to retrieve the data synchronously for simplicity. 

Script can be modified to set a variable on the last line, but Chrome/Edge will display the variable as it is in the script, and the returned JSON can be copied easily.

### Room for improvement
- Asynchronous processing for faster retrieval
- ~~Just use the domain of the current page~~
- ~~Some indicator of progress~~

## LiveJournal
### Background
LiveJournal is an old blogging site that decreased in popularity outside of Russia, and there doesn't appear to be a simple backup method other than a by month export, which doesn't export formatting. I wrote this as a way to export old blogs as an RSS feed.

### Purpose of downloader
For nostalgia!

### Usage/Instructions
1. Open a page on www.livejournal.com (not your <username>.livejournal.com host).
2. Log in.
3. Open developer tools (CTRL-SHIFT-I or F12).
4. Paste the script from lj/ljBackup.js into the console tab of developer tools.
5. Run the script like the following example: ```getLjBackup("brad", 2002, 1, 2009, 12, true);```  This example would get Brad's (site founder) journal entries from 2002-2009 and output as RSS feed. The last variable indicates basic or RSS export (basic omits formatting like carriage returns). 

### Room for improvement
- Unsure, it's a work in progress.
