# MoonPlus
A Roblox plugin that allows you to mod Moon Animator 2.<br><br>

# Scripting

```lua
local _g = _G.MoonGlobal
local MoonPlus = _g.MoonPlus
```

## Functions

### MoonPlus.wfv()
```lua
MoonPlus.wfv(
  index: any,
  tbl: { any }
) -> tbl[index] -- wfv = WaitForVariable
```
Waits for a variable in a table.

### MoonPlus.hookfunction()
```lua
MoonPlus.hookfunction(
  tbl: { any },
  method: any,
  hook: ( any ) -> any,
  hooktype: "before" | "after"
)
```
Changes a function inside a table.
