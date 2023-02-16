# MyPPCStore-ImportToast
A simple tool to import closing sheets from Toast. Works exclusively with myppcstore. This program is not officially endorsed by, nor directly affiliated with, Pizza Pie Cafe. This tool remains Copyright (c) Erik Christensen, all other programs are property of their respective owners.

For more information about Pizza Pie Cafe, visit https://pizzapiecafe.co, or follow your local location's instagram!
<h2>Getting Started</h2>
Using this tool is very simple.
<ol>
  <li>Dowload Tampermonkey: https://tampermonkey.net</li>
  <li>Dowload raw script: https://github.com/Lord-Vader4606/MyPPCStore-ImportToast/raw/main/ImportFromToast.user.js
    <ul><li>If you have Tampermonkey installed, this should open a new script install window</li></ul>
  </li>
  <li>Verify it is working - login to your https://myppcstore.com account and go do daily close sheet, you should see "Import from ToastPOS" where the "Import from Link POS" button was</li>
</ol>
<h2>Updating</h2>
If you installed the script via the raw script link, it will automatically update when a new version is available, alternatively you can update it manually either by following the raw link again or the following steps:
<ol>
  <li>Click on Tampermonkey</li>
  <li>Click "Dashboard"</li>
  <li>Click on the "Import from Toast" script</li>
  <li>Click "settings" on the top navigation</li>
  <li>Scroll down to "updates" check the "check for updates" button</li>
  <li>Paste the raw script link (see above) into the "Update URL" field</li>
  <li>Press save</li>
</ol>
This will automatically check for an update and install one if available, it will also enable automatic updates in the future so the script is automatically updated on your computer if an update is pushed here.
<h2>Troubleshooting</h2>
<ul>
  <li><strong>Trouble Installing TamperMonkey</strong>
  <ul><li>I did not create TamperMonkey, nor do I know how to support it in its entirety. The TamperMonkey install site is probably your best bet     https://www.tampermonkey.net/faq.php.</li></ul>
  </li>
  <li><strong>My computer says I need admin access</strong>
  <ul><li>That is correct, because you are installing an app onto your device (TamperMonkey) that also needs permission to edit other apps on your device  (your browser). You will need to grant it administrator access - though this will likely happen automatically, it is safe to grant it manually if prompted.</li></ul>
  </li>
  <li><strong>Installing the file from the repository didn’t work</strong>
  <ul><li>If the installation didn’t happen automatically, it’s likely that your TamperMonkey installation is invalid. You can try installing the script manually by opening the repository file and then copy and pasting the code into a TamperMonkey script which you can create on the Dashboard. However, if this doesn’t work either, consult the “Trouble Installing TamperMonkey” area for help.</li></ul>
  <li><strong>How do I create closing sheets, the button is still there?</strong>
  <ul><li>Use the dropdown, instead of the save button. It will work the same, just needs one extra button click. Running the import script may have unintended consequences on this page.</li><li><strong>UPDATE:</strong>As of v0.2 this issue has been resolved</li></ul>
  </li>
  <li><strong>MyPPCStore over/short is not displaying correctly</strong>
  <ul><li>Save the sheet, refresh the page, then open up the edit page. Change any of the numbers or clear the field and type the number back, it just means the site itself doesn’t realize the number has changed. This is not a bug on the script but a bug on MyPPCStore, so I unfortunately can’t do anything to fix it.</li></ul>
  </li>
  <li><strong>I have another issue</strong>
  <ul><li>Email me at using my ppc email. Though I'd like to note that except when there are house accounts, the script has (so far) had a 100% success rate for me. If you are experiencing issues it likely means you either installed it incorrectly or did not load Toast correctly.</li></ul>
  </li>
</ul>
