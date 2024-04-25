/*
Commands:
	/object className (Template for Craeting Moon Animator Objects)
	/expl text (Template for mexpl (i forgot what that is))
	/inher className (Template for "Inherited From:")
	/code ``code`` (creates a code snippet)

	/create ElementName (self explanatory)
	/set PropertyName Value (self explanatory)
	
	/p (sets the parent to the parentNode of the current parent)
	/sep ElementId (SetElementParent)
	/spf (SetPreFix)


*/

async function fetchData(url) {
	try {
		var response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		
		return response.text();
	} catch (error) {
		console.error('Fetch request failed:', error);
		
		return null;
	}
}

var data = "";

fetchData("data").then(rdata => {
	if (rdata !== null) {
		data = rdata;
	}
}); // why does js has to be like this mane

//

var prevElement = null;
var parent = null;
var prefix = "";

function nextline() {
	if (parent) {
		parent.appendChild(document.createElement("br"));
	}
}
function text(txt) {
	if (parent) {
		var ch = document.createElement("p");
		ch.textContent = txt;
		parent.appendChild(ch);
		
		prevElement = ch;
	}
}

function split(str, splitter, limit) {
	var lines = str.split(splitter);

	var args = []

	for (let i = 0; i < limit && i < lines.length; i++) {
		args.push(lines.shift());
	}
	var restOfLines = lines.join(' ');
	if (restOfLines.length > 0) { args.push(restOfLines) }
	
	return args;
}

function getargs(cmd, maxargs) {
	return split(cmd, " ", maxargs);
}

setTimeout(function(){
	var thing = split(document.location.href, "#", 2);
	
	data.split("\n").forEach(line => {
		if (line[0] === "/") {
			const args = line.split(" ");
			
			if (args[0] == "/") { return }
			
			switch(args[0]) {
				case "/object":
					var cn = args[1];
				
					var div = document.createElement("div");
					parent.appendChild(div);
					
					var a = document.createElement("a");
					a.className = "mobject";
					a.href = "#c." + cn
					a.addEventListener("click", (event) => {
					  document.location.href = thing[0] + "#c." + cn
					})	
					
					div.appendChild(a);
					parent = a;
					
					text(cn);
					prevElement.id = "c." + cn
					
					parent = div;
					prevElement = div;
					
					break
				case "/expl":
					text(args[1]);
					prevElement.className = "mexpl";
					
					break
				case "/inher":
					var cn = args[1];
					var div = parent;
					
					text("Inherited From:");
					
					var a = document.createElement("a");
					a.className = "minher";
					a.href = "#c." + cn
					a.addEventListener("click", (event) => {
					  document.location.href = thing[0] + "#c." + cn
					})
					
					div.appendChild(a);
					parent = a;
					
					text("- " + cn);
					
					a.addEventListener('click', function(event) {
						event.preventDefault();
						document.getElementById("c." + cn).scrollIntoView();
					});
					
					parent = div;
					prevElement = div;
					
					break
					
				case "/create":
					if (parent) {
						var element = document.createElement(args[1]);
						parent.appendChild(element);
						parent = element;
						prevElement = element;
					}
					
					break
				case "/set":
					if (prevElement) {
						prevElement[args[1]] = args[2];
					}
					
					break
				
				case "/sep":
					parent = document.getElementById(args[1]);
					prevElement = element;
					break
				case "/spf":
					prefix = getargs(line, 1)[1];
					break
				
				case "/p":
					if (prevElement) {
						parent = prevElement.parentElement;
						prevElement = parent;
					}
					
					break
			}
			
		} else {
			if (line == "") {
				nextline();
			} else {
				text(prefix + line)
			}
		}
	});
	
	var targetElement = document.getElementById(thing[1]);
	if (targetElement !== null) {
		targetElement.scrollIntoView();
	}
}, 1000);
