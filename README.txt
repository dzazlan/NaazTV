NaazTV - Apple TV-style Dhivehi home screen for the Nobel VIDAA TV
=================================================================

SET UP (Windows laptop)
1. Unzip this folder somewhere permanent, e.g. Documents\NaazTV
2. Double-click START-TV-SERVER.bat -> click Yes on the admin prompt.
3. The window shows an address like  http://192.168.1.50:8080
4. On the TV: open the Browser app, type that address, then bookmark it.
   Laptop and TV must be on the same Wi-Fi.
5. Keep the black server window open while watching. Close it to stop.

TIP: set the laptop to never sleep while plugged in
(Settings > System > Power), or the TV page won't load.
TIP: ask your router to always give the laptop the same IP
("DHCP reservation"), so the TV bookmark keeps working.

REMOTE
  Arrows   move between tiles (Left = next, because the layout is right-to-left)
  OK       open the app / channel
           Most channels now play full-screen right inside NaazTV.
           While watching: Up/Down = next/previous channel, OK = show channel name,
           Back = return to the home screen.
           If a channel's stream won't play, its website opens instead.
  Back     return to NaazTV from a channel; on the home screen jumps to the first tile
  After 5 minutes idle a big clock screensaver appears - press any key.

CHANGE CHANNELS / LINKS / LOCATION
  Open channels.js in Notepad. Each tile has a name, description, url and two colours.
  Save, then reload the page on the TV.
  Links marked (check) are guesses at PSM page addresses - if one doesn't open,
  go to https://www.psmnews.mv/stream on the laptop, click the channel, and copy its address.

No Windows? Any computer with Python works too:
  python -m http.server 8080      (run inside this folder)
