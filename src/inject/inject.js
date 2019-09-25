/*
	CONFIG is here!

*/

var config = {
		updateInterval: 5, // in seconds
		clearLogOnDowload: true, // set to false if you want to keep old logs after downloading.
		consoleOutput: false, // for debugging and testing
	}

/*
	DON'T CHANGE ANYTHING BEYOND THIS (except you know what ya do)
*/

//Downloading a string as file
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("\uFEFF"+text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var onlinedata = "";
var timer= 0;

chrome.extension.sendMessage({}, function(response) {
	//this construct is needed for the extension, basically just waits for dom
	var readyStateCheckInterval = setInterval(function() { 
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		
		console.log("Injected WhatsappStalker.");
		
		setInterval(function() {
			//only proceed if a chat is shown
			if(!$('#main').length) {
				return;
			}
			
			var now = Math.floor(Date.now()/1000);
			
			//inject dl button if there is none
			if(!$("#__downloadwa").length) {
				var container = document.getElementById('main').children[1];
				container.innerHTML = '<button style="margin-right: 11px; background: white; padding: 10px;" id="__downloadwa">Download Log</button>'+container.innerHTML;
						
				$("#__downloadwa").click(function(){
					
					download("whatsapp-online-log-"+now+".csv", onlinedata);
					
					if(config.clearLogOnDowload)
						onlinedata = ""; //reset log
					
				});
			}
			
			//only read data every x seconds
			if(timer+1 < config.updateInterval) {
				timer++;
				return;
			}
			
			timer = 0; //reset
			
			// read name from chat window
			var name = $('#main [dir="auto"]').attr("title");

			var online = "0";
			var lastSeen = $('#main [title="online"]').length;
			if(lastSeen)
				online = "1";

			//creating the ouput line for csv file
			var output = now + ":" + name + ":" + online;

			//append to data
			onlinedata += output+"\n";

			//output if setting is set
			if(config.consoleOutput)
				console.log(output);
		  
		}, 1000);

	}
	}, 10);
});