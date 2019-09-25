# Whatsapp Web "Stalker" Extension

This is a small extension for Chrome, and has to be loaded manually. Checks the online status of a chat partner every x seconds and outputs a csv file.

# Installation
Download and unzip this repo somewhere on your computer.

Open up Google Chrome and go to chrome://extensions/

Enable developer mode with the switch on the top right. A new toolbar will show up; click *load unpacked extension*.
Select the root of this repository you just downloaded and unzipped.

# Usage

Just open Whatsapp Web and click on the chat partner you want to observe. Leave in running. Click on "Download Logs" when you're done.
Be aware that when changing chat partners, it can't track your actual *subject*.

**Please use with care.** This tool can be used for no good. This piece of software was made for demonstration purposes!

# Config

On the top of the page is a control menu. You can set the time interval between online checks (in *seconds*) and the check status.
You don't have to stop and start to change the interval duration.

Go to src -> inject -> inject.js if you want to change more options or change the default settings.

# Log Format

You will download a csv file, which can easily be used in an excel sheet. Note that the timestamps are in seconds.

# Known Bugs

*Not working?* You might have to disable the last-seen feature, so Whatsapp switches only between "online" and a blank space.

Since the extension is holding all the logs in the memory until you download them, there might be a memory problem when running for a long time.
Furthermore, the extension might not work when opening submenus.

When you reload or close the page the logs are *lost*. Make sure you download them! This might be fixed in a future update.

# Future Features

Switching between several user automatically, settings page, detecting other subpages.

# Support and Contributing

It can happen that Whatsapp Web changes the way it functions, so when there's a problem, just open an issue or open a pull request. 

