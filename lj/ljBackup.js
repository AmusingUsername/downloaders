//example: getLjBackup("brad", 2002, 1, 2009, 12, true); to get Brad's journal entries from 2002-2009 and output as RSS feed rather than basic (basic omits markup)
function getLjBackup(userName, startYear, startMonth, endYear, endMonth, rss){ 
  let currentMonth = startMonth;
  let currentYear = startYear;
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
        //use the postIds array to get the RSS individual entries and make a longer RSS feed of all entries
        postIds.forEach( 
          function(postId){
            postRss = getRssById(postId, userName);
            if(builtOutput == ""){
              builtOutput = postRss;
            } else {
              postRss = postRss.getElementsByTagName("item")[0];
              builtOutput.getElementsByTagName("channel")[0].appendChild(postRss);
            }
          }
        );
      }
    }
    const xs = new XMLSerializer();
    const xmlstring = xs.serializeToString(builtOutput);
    return xmlstring;
  }
}

function getNewExportMonth(userName, year, month){
  const exportUrl = "https://www.livejournal.com/export_do.bml?authas=";
  const xhr = new XMLHttpRequest();
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
  try{
  xhr.send(postData);
  } catch(err) {
    debugger;
    console.error(err);
  }
  
  if(xhr.status == 200){
    return xhr.responseXML;
  } else {
    console.error("xhr status " + xhr.status + "!!!");				
  }
}

function getRssById(postId, userName){
  //TODO: facing CORS and 401 issue because this endpoint is on a different domain without appropriate headers AND asks for digest authentication every request... 
  //no luck with legacy URLs. https://www.livejournal.com/users/username/data/rss?auth=digest&itemid=### redirects to username.livejournal.com
  const rssPostUrl = "https://" + userName + ".livejournal.com/data/rss?auth=digest&itemid=###";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", rssPostUrl.replace("###", postId), false);
  try{
  xhr.send();
  } catch(err) {
    debugger;
    console.error(err);
  }
  
  if(xhr.status == 200){
    return xhr.responseXML;
  } else {
    console.error("xhr status " + xhr.status + "!!!");				
  }
}

//comments urls:
// https://www.livejournal.com/export_comments.bml?get=comment_meta&startid=0
// (comments metadata, tying user to comment, but not clear how jitemid links to post) https://www.livejournal.com/export_comments.bml?get=comment_meta&startid=0
