if (false) {
	async function fetchData(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			
			return data;
		} catch (error) {
			console.error('Fetch request failed:', error);
			
			return null;
		}
	}

	const data = fetchData("https://raw.githubusercontent.com/zildjibian/moon-plus/main/docs/data")
}

/*
Commands:
	/object className (Template for Craeting Moon Animator Objects)
	/expl text (Template for mexpl (i forgot what that is))
	/inher className (Template for "Inherited From:")
	/code code (creates a code snippet)

	/create ElementName (self explanatory)
	/set PropertyName Value (self explanatory)
	
	/p (sets the parent to the parentNode of the current parent)
	/sep ElementId (SetElementParent)
	/spf (SetPreFix)


*/

const data = `// Global Variables
/sep globals
/spf _g.
ver: number

toolbar: PluginToolbar

http: HttpService
chs: ChangeHistoryService
insert: InsertService
asset: AssetService
input_serv: UserInputService
run_serv: RunService
studioServ: StudioService

BLANK_FUNC() -> void

plugin: Plugin

Mouse: PluginMouse
MouseFilter: Folder
ReleaseHandlesCon: RBXScriptConnection?

new_ui: Folder
rigs: Folder
anis: Folder

window_folder: Folder
ui3d: Folder

DOUBLE_CLICC_TIME: number

DEFAULT_FPS: number
current_fps: number

MIN_FRAMES: number
DEFAULT_FRAMES: number
MAX_FRAMES: number

bone_handle_size: number
show_bone_cones: boolean
show_bone_spheres: boolean
show_part_handles: boolean
no_hide_handles: boolean
full_part_handles: boolean
scale_handles: boolean

set_kf_color(value: boolean) -> void

time_offset: number

AllMenuItems: { MenuItem }

NIL_VALUE: userdata

/spf 
insert more global variables here

/sep classes
/
// Object
/object Object
/expl Constructor
- Object:new(create: any) -> Object

/spf - Object.
/expl Properties
ThemedItems: { Instance }
ParentObjectGroups: { [string]: ObjectGroup }

/spf - Object:
/expl Methods
Destroy() -> void
AddPaintedItem(item: Instance, paintData: { property: any }) -> void
RemovePaintedItem(item: Instance) -> void
SetItemPaint(item: Instance, paintData: { property: any }, tweenTime: number) -> void
/
/p

/spf 
// Ease
/object Ease
/inher Object

/expl Constructor
- Ease:new(ease_type: string, params: { any }) -> Ease

/spf - Ease.
/expl Properties
ease_type: string
params: { any }
_func: (number) -> (number)
_poolcount: number

/spf - Ease:
/expl Methods
Tableize() -> table(ease_tbl)
Serialize() -> Instance(ease_folder)
Equals(other_ease: Ease) -> boolean

/spf - Ease.
/expl Others
LINEAR() -> Ease:new("Linear")
LINEAR_tbl() -> Ease:new("Linear"):Tableize()
CONSTANT() -> Ease:new("Constant")
DIR_PARAMS = { ["Direction"] = true }
PARAM_DATA: { [string]: { name: string, input_type: number, default: number, inc: number, frame_relative: boolean? } }
EASE_DATA: { [string]: { Color: Color3, Params: { [string]: boolean }? } }
EASE_LIST: { { string (name), string (displayName) } }
DIR_LIST: typeof(Ease.EASE_LIST)
Detableize(ease_tbl: table(ease_tbl)) -> Ease
Deserialize(ease_folder: Instance(ease_folder)) -> Ease
/
/p

/spf 
// GuiElement
/object GuiElement
/inher Object

/expl Constructor
- GuiElement:new(UI: Instance) -> GuiElement

/expl Properties
- GuiElement.UI: Instance
/
/p

/spf
// ObjectGroup
/object ObjectGroup
/inher Object

/expl Constructor
- ObjectGroup:new(name: string) -> ObjectGroup

/spf - ObjectGroup.
/expl Properties
name: string
Objects: { Object }
GroupLookup: { [string]: ObjectGroup }
size: number
dict: { [string]: Object }
inds: { [string]: number }

/spf - ObjectGroup:
/expl Methods
Move(Object: Object, index: number) -> void
Add(Object: Object) -> void
Insert(Object: Object, index: number) -> void
Remove(Object: Object) -> void
RemoveAt(index: number) -> void
Clear() -> void
IndexOf(Object: Object) -> void
Iterate(func: (object: Object, objectGroup: ObjectGroup) -> boolean?, object_filter: string?) -> void
Contains(Object: Object) -> boolean
/
/p

/spf 
// Path
/object Path
/inher Object

/expl Constructor
- Path:new(Item: Instance) -> Path

/spf - Path.
/expl Properties
Item: Instance
Format: string
ItemType: string
InstanceNames: { string }
InstanceTypes: { string }

/spf - Path:
/expl Methods
Serialize() -> {ItemType: string, InstanceNames: {string}, InstanceTypes: {string}
GetItem() -> Instance

/spf - Path.
/expl Others
Deserialize(tbl: {ItemType: string, InstanceNames: {string}, InstanceTypes: {string}}) -> Path?
GetPath(Item: Instance) -> string, string, {string}, {string}
ParsePath(ItemType: string, InstanceNames: {string}, InstanceTypes: {string}) -> Instance
CheckIfUnique(Item: Instance) -> boolean
/
/p`;

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

function getargs(cmd, maxargs) {
	var lines = cmd.split(' ');

	var args = []

	for (let i = 0; i < maxargs; i++) {
		args.push(lines.shift());
	}
	var restOfLines = lines.join(' ');

	return [args.join(' '), restOfLines]
}

document.addEventListener('DOMContentLoaded', function() {
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
});







