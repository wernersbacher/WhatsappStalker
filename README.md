# Whatsapp Web Status Checker

Extension for Chrome, has to be loaded manually. Checks the status every x seconds. (default is 10s)

# Installation

Open up Google Chrome and go to chrome://extensions/

Enable developer mode with the switch on the top right. A new toolbar will show up, and *load unpacked extension*.
Select the root of this repository (just download and unzip)

# Usage

Just open Whatsapp Web and click on the chat partner you want to observe. Leave in running. Click on "Download Logs" when you're done.
*Attention:* You might have to disable the last-seen feature, so Whatsapp switches only between "online" and a blank space.

**Please use with care.** This tool can be used for no good. This piece of software was made for demonstration purposes!

# Config

Go to src -> inject -> inject.js and change the settings there.

# Log Format

You will download a csv file, which can easily be used in an excel sheed. Note that the timestamps are in seconds.

# Known Bugs

Since the extension is holding all the logs in the memory until you download them, there might be a memory problem when running for a long time.
Furthermore, the extension might not work when opening submenus.

When you reload or close the page the logs are *lost*. Make sure you download them! This might be fixed in a future update.

# Future Features

Switching between several user automatically, settings page, detecting other subpages.

# Support and Contributing

It can happen that Whatsapp Web changes the way it functions, so when there's a problem, just open an issue or open a pull request. 

No Licence yet, so use it like freeware and don't say its yours :)