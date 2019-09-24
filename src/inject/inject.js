chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		
		
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		
		setInterval(function() {
		  
		  var txt = "offline";
		  var lastSeen = $('#main [title="online"]').length;
		  if(lastSeen)
			  txt = "online";
		  
		  
		  console.log(Math.floor(Date.now()) + ":" + txt);
		}, 2000);

	}
	}, 10);
});