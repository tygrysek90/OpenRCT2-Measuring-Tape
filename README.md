# OpenRCT2-Measuring-Tape
### Tired of counting tiles and finding perfect centres on your OpenRCT2 map?
### Measuring Tape plugin is here to give you hand!

<br/>

![measuring-tape-v0 2-foggia](https://github.com/user-attachments/assets/047ab387-d286-409b-99db-393ead079ce0)

## Jump to…
- [User Manual](#user-manual)
- [Thanks to…](#thanks-to)
- [Building from source](#building-from-source)
- [Contact the author](#contact-the-author)

## Release version v0.2 "Foggia"
The plugin is ready to download at the [Releases page](https://github.com/tygrysek90/OpenRCT2-Measuring-Tape/releases/tag/v0.2)  


## What's new?
Have a look at the [`changelog.md`](https://github.com/tygrysek90/OpenRCT2-Measuring-Tape/blob/main/changelog.md) - it comes with gifs and screenshots




____________
## Features

### Measure length
<img width="490" height="395" alt="Snímek obrazovky z 2025-09-25 13-34-05" src="https://github.com/user-attachments/assets/32a9bb86-dec3-495c-94ad-5a552d1cd302" />

### Measure area
<img width="490" height="395" alt="Snímek obrazovky z 2025-09-25 13-34-48" src="https://github.com/user-attachments/assets/1eadafe6-338c-4063-b056-66f1f5049db6" />

### Stacking and undo-able history of measurements
![meas-tape-hist-stack](https://github.com/user-attachments/assets/1ddcc70d-17da-4bf9-a981-8fd644bd5677)

### Find centre of map and map edges
<img width="608" height="653" alt="Snímek obrazovky z 2025-09-25 13-37-57" src="https://github.com/user-attachments/assets/424e4ca8-1e19-4203-ba39-b8f03833116b" />

### Configure objects used - simply
<img width="568" height="467" alt="Snímek obrazovky z 2025-09-30 16-54-36" src="https://github.com/user-attachments/assets/46399d97-3f74-4354-a903-be667d33d083" />

### Configure objects used - professional mode, to detail
<img width="567" height="467" alt="Snímek obrazovky z 2025-09-30 16-58-51" src="https://github.com/user-attachments/assets/78caa810-2856-49d9-9417-fffe229bd7f5" />


### And more...

____________
## Release version v0.2 "Foggia"
The plugin is ready to download at the [Releases page](https://github.com/tygrysek90/OpenRCT2-Measuring-Tape/releases/tag/v0.2)  


## Building from source
Note there are two branches kept for this project, main is held at current release, while dev is moving on. To roll-up, kindly follow instruction from https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template - with small spice: before `npm run build:dev` run `node rebuildPngToBase64.js`, as base64 version of images used on buttons is then rolled up in plugin.

Visual Studio Code users can clone this repository in editor and use Terminal -> Run task... menu options (including downloading `openrct2.d.ts` into lib directory and running `rebuildPngToBase64.js`)

## Contact the author
Bug reports, feature ideas or requests, any kind of collaboration - I am open-minded to chat about anything: contact me
via GitHub - you can make an Issue, or catch me via OpenRCT2 discord #plugin (or direct message)


____________

# User Manual


<img align="left" width="116" height="413" alt="main-win" src="https://github.com/user-attachments/assets/809d8521-7552-4f6b-91ad-b76d7ae77c85" />

#### Table of contctents
[Main window](#main-window)<br/>
[Configure window](#configure)<br/>
[Extra tools](#extra-tools)<br/>


### General

OpenRCT2-Measuring-Tape is a plugin for OpenRCT2. This plugin supports multiplayer. Generaly it can be used to measure distance or area on map, find center point between two points, or centre of area, as well. The plugin works not only by measuring, but as well it denotes measured values on the map graphicaly by placing "ghosts" - scenery objects with ghost flag on. Ghosts are by their nature not save-able, saving and reopening the park will make them perish. In multiplayer, the ghosts projected on the map are visible for all players and players that have "Scenery" permission are able to place them or remove them. In multiplayer, it is possible to remove ghosts placed by other players, as well obliterate all the ghost of all the players from the map.

.

.
## Main window
The main window consists of seven main sections. 

### Measurement output area
Topmost, there is area showing "Click and drag" by default, otherwise it shows result of measurement.
### Mode
There is a choice of two modes (tools) to choose from:
- <img width="47" height="36" alt="tape" src="https://github.com/user-attachments/assets/011c613f-3e02-45fd-b10a-3a3a4eaa2120" /> **Tape mode** works in one map tile wide tape, best suits for measuring distances. It is the default tool mode as well and hence is automaticaly active on plugin opening. To use it, utilize your pointing device (usualy mouse), press button, hold and move the cursor over the map. You can click the already pressed button to cancel the tool mode, or press ESC key.
- <img width="47" height="36" alt="area" src="https://github.com/user-attachments/assets/aacb40d5-5032-4efe-be6e-e5bad957ebd5" /> **Area mode** works as rectangle, measurement is shown for both sides.
### Show
This section control whetherere the ghosts will be shown for your measurement. The buttons are on/off switches. It is possible to have both on, as well as select only one or disable both. If both buttons are disabled a white gird will remain projected on the map to show your measurement. For multiplayer, you must posses scenery permissions, otherwise ghost displaying will not work and these buttons will have no effect.
- <img width="47" height="36" alt="show-ends" src="https://github.com/user-attachments/assets/f0f5b9e9-b958-4c8f-a081-e718ec77a76e" /> **Show the ends** The button is on/off switch, setting wheter your current measurement will have ghosts displayed at it's ends. Ghosts are selectable under Configuration. 
- <img width="47" height="36" alt="show-centre" src="https://github.com/user-attachments/assets/bf1b500e-6077-4855-81b1-77d33a2675f1" /> **Show the centre** The button is on/off switch, setting wheter your current measurement will have ghosts displayed at it's cenre. Ghosts are selectable as well.
### Sets
The ghost sets work as memory to remember where you placed the ghosts. It is possible to use sets to keep visual track of all your measurements or to use them as the a guidelines.
#### Lock buttons
- <img width="47" height="36" alt="lock-one" src="https://github.com/user-attachments/assets/2dcba418-5afd-4495-af3f-e5d4d2c9f02f" /> **Lock one** The button is on/off switch exclusive with Lock all button - you can not have Lock one and Lock all at one time - but you can disable both of them. Lock one keeps the last measurement ghost set. When it's off and Lock all is off as well, the ghosts are to disappear immediately after releasing pointer button (usually left mouse button)
- <img width="47" height="36" alt="lock-all" src="https://github.com/user-attachments/assets/822c07ae-8b6e-4cf3-9901-54fa1833d040" /> **Lock all** Setting this will make all your measurements stay on map in form of ghosts, whomse you can utilize as guidelines.
#### Remove buttons
- <img width="47" height="36" alt="remove-one" src="https://github.com/user-attachments/assets/eb72ebfd-3075-4160-ad0a-2e82f5e4b1e7" /> **Remove last set** Removes lastly placed set
- <img width="47" height="36" alt="remove-all" src="https://github.com/user-attachments/assets/38c54538-1b89-458b-9d6e-36a5dd6ecda0" /> **Remove all sets** Removes all the sets you have placed. In multiplayer, this doesn't affect ghosts placed by other players.
### Tiles
Tiles tools work with ghosts based on their poisition, contrary to **_Sets_** buttons operating on order of placement basissss 
- <img width="30" height="27" alt="erase-tile" src="https://github.com/user-attachments/assets/cbb4cf40-0f64-4d6c-a1e1-a6c9cdf4fd4e" /> **Erase ghosts from one tile** Using pointer device (usualy mouse) select a sigle tile to remove ghosts from -  all ghosts on the given tile will be removed. In multiplayer, this action affects all ghosts on chosen tile, no matter who placed them.
- <img width="30" height="27" alt="erase-area" src="https://github.com/user-attachments/assets/c7813d4a-2eb4-4537-9071-36e3d19eea4c" /> **Erase ghosts in given area** Using pointer device (usualy mouse) select a area to remove ghosts from. In multiplayer, this action affects all ghosts in given area, no matter who placed them.
- <img width="30" height="27" alt="erase-nuke" src="https://github.com/user-attachments/assets/5d8e7d10-c0e9-4197-b763-260d086fe4dd" /> **Nuke tool (obliterate all ghosts)** Prompts a window with waring message asking to confirm, after selecting yes, removes all ghosts from the map. Primarly this function is for multiplayer, but is useable in single-player as well.
### Extras
Buttons in this section always open a new window.
- <img width="30" height="27" alt="win-config" src="https://github.com/user-attachments/assets/0a01411c-6d1f-4ec5-a0f8-793620d9ba7b" /> **Configure**
- <img width="30" height="27" alt="win-abouthelp" src="https://github.com/user-attachments/assets/1ce65202-c621-41fd-a883-e31aed080cf4" /> **About & Help**
- <img width="30" height="27" alt="win-extra" src="https://github.com/user-attachments/assets/b1d92920-ef6a-49cd-819c-6523505b3053" /> **Extra tools**

## Extra tools
<img align="left" width="116" height="81" alt="extra-win" src="https://github.com/user-attachments/assets/728b73ac-fc89-4645-b2e0-6b57942ff39f" />
Extra tools offer tools that work with map as a whole, without need of using pointer device (usually mouse) to designate area on the map.

.

- <img width="47" height="36" alt="extra-map-bisect-edges" src="https://github.com/user-attachments/assets/0d49de56-ef80-4020-afb0-8f2c3efd2ffd" /> **Bisect map edges** Finds a centre of each map edge. This is can be useful for placing the entrance in perfect centre of map edge. Logic for displaying thes ghosts is the same as with measuring tape tool. A ghost placed on a tile denotes the centre lies on tile (defafufulu block), whetereere a ghost placed on the edge of the tile (defaluty a wall) signals the centre point lies on the edge. 
- <img width="47" height="36" alt="extra-map-centre" src="https://github.com/user-attachments/assets/848b0e14-61e6-49c3-8877-e48295264100" /> **Find map centre** Finds the centre of the map.



## Configure
<img align="left" width="550" height="451" alt="options-win" src="https://github.com/user-attachments/assets/341ca4e8-a52d-42fc-87c3-d5ad097600b0" />
The configure window serves to select objects that are used as the ghosts there after for your measurements. You can select from all objects of applicable type - either wall or small scenery, that are currently loaded in park you are playing. Your selection is automaticaly saved with the park save file. You can also opt to save your personal profile as game-wide settings, which once saved, Measuring Tape will try to utilize personal settings at first on newly opened parks (otherwise it will use selection saved with the park) - if your personal selection can not be satisfied with objects in any park you open, the plugin will auto fallback to plugin defaults, if that is possible, otherwise it will just select first object of each applicable type.

.

.

.

.

### Top right: Personal profile & Professional mode
<img align="left" width="162" height="182" alt="options-right" src="https://github.com/user-attachments/assets/597fd226-b168-4cd6-8e44-29a83d4054e2" />

#### Save all as default
Saves your current object choice into "shared plugin storage".
#### Load all defaults
Loads your previously saved object choice from "shared plugin storage"

.

#### Load plugin defaults
Loads hard-coded defaults
#### More setting options
When enabled, the left box will have more options, where you can (for exemple) set different ghosts for each of tape ends.

____________

# Thanks to

- **[Basssiiie](https://github.com/Basssiiie), [Sadret](https://github.com/Sadret)** - this plugin makes use of parts of their works, in the spirit of a open source
- Everyone on OpenRCT2 and DKMP discord servers, for creating such a nice and welcoming community!
