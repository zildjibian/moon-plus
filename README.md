# MoonPlus
A Roblox plugin that allows you to mod Moon Animator 2.<br><br>

This also has premade mods, such as:
 - Autosave (every minute)
 - Audio Support
 - Bézier Easing
 - Catalog / Accessory Inserter
 - UI Support (use SurfaceGUI)
<br><br>

# Scripting

```lua
local _g = _G.MoonGlobal
local MoonPlus = _g.MoonPlus
```

## Functions
If you wanna add your own mod, these are some functions that might help.<br><br>

### MoonPlus.wfv()
```lua
MoonPlus.wfv(
  index: any,
  tbl: { any }
) -> tbl[index] -- wfv = WaitForVariable
```
Waits for a variable in a table.<br><br>

### MoonPlus.hookfunction()
```lua
MoonPlus.hookfunction(
  tbl: { any },
  method: any,
  hook: ( any ) -> any,
  hooktype: "before" | "after"
) -> any
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
