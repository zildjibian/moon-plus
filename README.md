# MoonPlus
A Roblox plugin that allows you to mod Moon Animator 2.<br><br>

This also has premade mods, such as:
 - Autosave (Configurable)
 - <a href="https://youtu.be/9lsvWiSNLZ0">Audio Support</a>
 - Bézier Easing
 - Catalog / Accessory Inserter
 - Outfit Loader
 - UI Support (use SurfaceGUI)
<br><br>

# Scripting

<a href="https://zildjibian.github.io/moon-plus">
 Moon Animator Documentation (unfinished)
</a><br><br>

```lua
local _g = _G.MoonGlobal
local MoonPlus = _g.MoonPlus

type HookTable = {
  orig =  function,
  hooked = function,

  before = { function },
  after = { function }
}
```

## Functions
If you wanna add your own mod, these are some functions that might help.<br><br>

### MoonPlus.wfv()
```lua
MoonPlus.wfv(
  index: any,
  tbl: { any } -- Default = _g
) -> tbl[index] -- wfv = WaitForVariable
```
Waits for a variable in a table.<br><br>

### MoonPlus.hookfunction()
```lua
MoonPlus.hookfunction(
  tbl: { any },
  method: any,
  hook: ( any ) -> any,
  hooktype: "before" | "after" -- Default = "before"
) -> HookTable
```
Changes a function inside a table, example:
```lua
local t = {}
t.func = function(arg)
  print("original called,", arg)
  return arg + 10
end

print( t.func(4) )
-- the line above will output "original called, 4", then "14"

MoonPlus.hookfunction(
  t, "func",
  function(arg)
    return arg * 2
  end,
  "before"
)

MoonPlus.hookfunction(
  t, "func",
  function(arg)
    print("returned", arg)
    return arg
  end,
  "after"
)

print( t.func(4) )
-- the line above will output "original called, 8", then "returned 18", then "18"
```
### MoonPlus.gethooktable()
```lua
MoonPlus.gethooktable( hooked: function ) -> HookTable?
```
Gets a HookTable from a hooked function, returns nil if it is not a hooked function.
# Example Mod
This Mod shows a popup when opening Moon Animator
```lua
local _g = _G.MoonGlobal
local MoonPlus = _g.MoonPlus

-- wait for MoonPlus to load
repeat MoonPlus = _g.MoonPlus wait() until MoonPlus

local once = false

-- hook _g.Windows.MoonAnimator.OnOpen
MoonPlus.hookfunction(
  _g.Windows.MoonAnimator, "OnOpen",
  function(pass)
    if not once then
      once = true
      -- add a delay so it doesn't break
      delay(0.1, function()
        -- shows the popup
        _g.Windows.MsgBox.Popup(_g.Windows.MoonAnimator,
          {
            Title = "Example Mod", 
            Content = "Hello world!",
            Button1 = {"ok", _g.BLANK_FUNC},
            Button2 = {"cool", _g.BLANK_FUNC}
          })
      end)
    end
    
    return pass
  end,
  'after'
)
```
