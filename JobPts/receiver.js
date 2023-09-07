function getRecognitions(){
  const appDomain = window.location.host; 
  let totalPages = 0;
  let currentPage = 0;
  const listHeaderUrl = 'https://' + appDomain + '/services/GetListOfRecognitionsForUser.xsjs?type=receiver';
  const listUrl = 'https://' + appDomain + '/services/GetListOfRecognitionsForUser.xsjs?type=receiver&pageParam=###&SearchParam=';
  const recognitionUrl = 'https://' + appDomain + '/services/GetRecognitionDetails.xsjs?type=receiver&id=###'
  let recognitionList = [];
  let allRecognitions = [];

  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", listHeaderUrl, false);
  xhr1.send();
  if(xhr1.status == 200){
    totalPages = JSON.parse(xhr1.responseText).pagination.TotalPages;
  } else {
    console.error("xhr1 status " + xhr1.status + "!!!");
  }
  
  console.info("retrieving list of recognitions");
  while(currentPage < totalPages)
  {
    currentPage++;
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", listUrl.replace('###', currentPage), false);
    xhr2.send();
    if(xhr2.status == 200){
      recognitionList = recognitionList.concat(JSON.parse(xhr2.responseText).result)
    } else {
      console.error("xhr2 status " + xhr2.status + "!!!");				
    }
  }
  
  console.info("retrieving recognitions");
  recognitionList.forEach(
    function(arrayItem) {
      allRecognitions.push(getRecognition(recognitionUrl.replace('###', arrayItem.Id)))
      switch(allRecognitions.length) { 
        case Math.round(recognitionList.length/4):
          console.info("25% complete");
          break;
        case Math.round(recognitionList.length/2):
          console.info("50% complete");
          break;
        case Math.round(3*recognitionList.length/4):
          console.info("75% complete");
          break;
      }
    }
	);
  return allRecognitions;
}

function getRecognition(url) {
  const tempRecognition = {RecognizeMessage: "", FullNameGiver : "", ApprovalMessage: "", TransactionDate: ""}; 
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  if(xhr.status == 200){
    let recognition = JSON.parse(xhr.responseText);
    tempRecognition.RecognizeMessage = recognition.RecognizeMessage;
    tempRecognition.FullNameGiver = recognition.FullNameGiver;
    tempRecognition.ApprovalMessage = recognition.ApprovalMessage;
    tempRecognition.TransactionDate = recognition.TransactionDate;
    return tempRecognition;
  } else {
    console.error("xhr status " + xhr.status + "!!!");
  }
}
getRecognitions()
