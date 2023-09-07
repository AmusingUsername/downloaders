//example: getLjBackup("brad", 2002, 1, 2009, 12, true); to get Brad's journal entries from 2002-2009 and output as RSS feed rather than basic (basic omits markup)
function getLjBackup(userName, startYear, startMonth, endYear, endMonth, rss){ 
  let currentMonth = startMonth;
  let currentYear = startYear;
  const rssPostUrl = "https://" + userName + ".livejournal.com/data/rss?auth=digest&itemid=###";
  let responseXML = "";
  const postIds = [];
  let builtOutput = "";
  const templateEntryBasic = { itemid: "", logtime: "", subject: "", event: "", current_mood: "", current_music: ""};
  const templageEntryRSS=  { pubDate: "", title: "", link: "", description: "", comments: "", lj_reply_count: "", lj_music: "", lj_mood: ""};
  
  if(userName){
    //get the list of post IDs or the basic export
    while(currentYear <= endYear){
      while(currentMonth <= 12){
        responseXML = getNewExportMonth(userName, currentYear, currentMonth);
        if(rss){ //save an array of the post IDs 
          for(entry of responseXML.getElementsByTagName("entry")){
              postIds.push(entry.getElementsByTagName("itemid")[0].childNodes[0].nodeValue);               
          }
        } else { //add entries to basic output
          if(builtOutput == ""){
            builtOutput = responseXML;
          } else {
            for(entry of responseXML.getElementsByTagName("entry")){
              builtOutput.getElementsByTagName("livejournal")[0].appendChild(entry);
            }
          }
        }

        if(currentYear == endYear && currentMonth == endMonth){
            break;
        }
        currentMonth++;
      }
      currentMonth = 1;
      currentYear++;

      if(rss){
        //TODO: use the postIds array to get the RSS individual entries and make a longer RSS feed of all entries
      }
    }
  return builtOutput;
  }
}

function getNewExportMonth(userName, year, month){
    const exportUrl = "https://www.livejournal.com/export_do.bml?authas=";
    let xhr = new XMLHttpRequest();
    const postData = new FormData();
    
    postData.append('what', 'journal');
    postData.append('format', 'xml');
    postData.append('header', 'on');
    postData.append('encid', '2');
    postData.append('field_itemid', 'on');
    postData.append('field_eventtime', 'on');
    postData.append('field_logtime', 'on');
    postData.append('field_subject', 'on');
    postData.append('field_event', 'on');
    postData.append('field_security', 'on');
    postData.append('field_allowmask', 'on');
    postData.append('field_currents', 'on');
    postData.append('year', year);
    postData.append('month', month.toLocaleString('en-US', {minimumIntegerDigits: 2}));

    xhr.open("POST", exportUrl + userName, false);
    xhr.send(postData);

    if(xhr.status == 200){
        return xhr.responseXML;
    } else {
        console.error("xhr status " + xhr.status + "!!!");				
    }
}
