# MoonPlus
A Roblox plugin that allows you to mod Moon Animator 2.<br><br>

<b><a href="https://create.roblox.com/store/asset/17171181036/MoonPlus">Link to Plugin</a></b><br><br>

This also has premade mods, such as:
 - Autosave (Configurable)
 - <a href="https://youtu.be/9lsvWiSNLZ0">Audio Support</a>
 - Bézier Easing
 - Catalog / Accessory Inserter
 - Outfit Loader
 - UI Support
<br><br>

## Support Moon Animator!
- <a href="https://www.patreon.com/moonanimator">Patreon</a>
- <a href="https://create.roblox.com/store/plugins?creatorName=xsixx">Moon Animator Themes</a><br><br>

# Scripting

<a href="https://zildjibian.github.io/moon-plus">
 Moon Animator Documentation (unfinished)
</a><br><br>

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
  tbl: { any } -- Default = _g
) -> tbl[index] -- wfv = WaitForVariable
```
Waits for a variable in a table.<br><br>

### MoonPlus.NewSignal()
```lua
MoonPlus.NewSignal(
  name: string?
) -> Signal -- equals to _g.class.Signal:new(name)
```
Creates a Signal, example:
```lua
local Signal = MoonPlus.NewSignal("Example")

Signal:Connect(function(a1, a2)
  print(a1 * a2)
end)

Signal:Once(function(a1, a2)
  print(a1 + a2)
end)

Signal:Fire(25, 5) -- prints "125" then "30"
Signal:Fire(4, 9) -- prints "36"

-- Other Functions:
--   Signal:Wait()
--   Signal:Destroy()
```

### MoonPlus.hookfunction()
```lua
type HookTable = {
  orig =  function,
  hooked = function,

  before = { function },
  after = { function }
}

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
-- the line above will print "original called, 4", then "14"

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
-- the line above will print "original called, 8", then "returned 18", then "18"
```
### MoonPlus.gethooktable()
```lua
MoonPlus.gethooktable( hooked: function ) -> HookTable?
```
Gets a HookTable from a hooked function, returns nil if it is not a hooked function.
## Signals
imitates RBXScriptSignal
```lua
local Signals = MoonPlus.Signals

-- .Updated
Signals.Updated:Connect(function(frame)
  print(frame)
end)
-- fires everytime the animator changes keyframe
```
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
