/*
	CONFIG is here!

*/

var config = {
		updateInterval: 5, // in seconds
		clearLogOnDowload: true, // set to false if you want to keep old logs after downloading.
		started: true, //sets the autostart
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

//Create JS Node from HTML String
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


var onlinedata = "";
var timer= 0;

chrome.extension.sendMessage({}, function(response) {
	//this construct is needed for the extension, basically just waits for dom
	var readyStateCheckInterval = setInterval(function() { 
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		//toolbar html
		var toolbarHTML = ` 
		<div id="_toolbar_wrapper">	
			<div id="_toolbar"> 
				<div class="onoffswitch">
					<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" ${config.started ? "checked" : "" }>
					<label class="onoffswitch-label" for="myonoffswitch">
						<span class="onoffswitch-inner"></span>
						<span class="onoffswitch-switch"></span>
					</label>
				</div>
				<input type="number" value="${config.updateInterval}" id="_seconds" min="1" step="1" />
				<button id="_download">Download Log</button> 
			</div>
		</div>	
				` ;
		//convert to js node
		var toolbarNode = htmlToElement(toolbarHTML);
		
		//inject toolbar
		document.getElementById("app").prepend(toolbarNode);
		//document.body.prepend(toolbarNode);

		/*
			setting up event handlers here...
		*/

		//Download-btn
		$("#_download").click(function(){
			
			if(onlinedata.length <1)
				return;

			var now = Math.floor(Date.now()/1000);

			download("whatsapp-online-log-"+now+".csv", onlinedata);
			
			if(config.clearLogOnDowload)
				onlinedata = ""; //reset log
			
		});

		// seconds-input
		var secs = document.getElementById('_seconds');
		secs.addEventListener("change", function () {
			config.updateInterval = secs.value;
		}, false);
		

		// on-off-switch
		var switcher = document.getElementById('myonoffswitch');
		switcher.addEventListener("input", function (){
			config.started = switcher.checked;
		}, false);

		
		console.log("Injected WhatsappStalker.");
		
		setInterval(function() {
			//only proceed if a chat is shown and all is started
			if(!$('#main').length || !config.started) {
				return;
			}
			
						
			//only read data every x seconds
			if(timer+1 < config.updateInterval) {
				timer++;
				return;
			}
			
			timer = 0; //reset

			//get timestamp
			var now = Math.floor(Date.now()/1000);
			
			//read name from chat window
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