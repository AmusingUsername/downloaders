# Downloaders and data scrapers
Webpage scrapers/data retrievers for various sites. To simplify the task of authentication, I expect anything I write will be written in JS for pasting into console when the site is loaded.

## JobPts
### Background
Jobpts is a service that companies use to allow recognizing other employees that give points that can be used for purchases or gift cards. 
company's site: https://semoscloud.com/product/jobpts/

Working/tested in early September 2023.

### Purpose of scraper
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
