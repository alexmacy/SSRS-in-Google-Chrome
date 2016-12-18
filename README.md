# SSRS-in-Google-Chrome
An extension for Google Chrome for viewing SSRS reports.

SSRS reports are designed specifically for Internet Explorer and don't work in Google Chrome. The underlying reason for this is pretty simple: the report is rendered in the browser with the `overflow` style attribute set to `auto`. Internet Explorer interprets this differently than Google Chrome, so while the report appears in IE, it is effectively hidden in Chrome.

There are a few existing extensions that partially fix this issue, including:
- [SSRS Fix](//chrome.google.com/webstore/detail/ssrs-fix/gklhehemnkbjbccoeneabopaflildkah) by [Thom Richardson](//thomrichardson.net/)
- [SSRS Report Fix](//chrome.google.com/webstore/detail/ssrs-report-fix/fjbdfjiheheafbioiejbdpalmojkeobk) by [Isaac Moore's](//github.com/rmsy/SSRS-Fix)
- [SSRS Fix](//chrome.google.com/webstore/detail/ssrs-fix/jmmhecipbmkdjkclklmfiandlmelkgfc) by steve.ianson

These extensions can be a big help, but also have some limitations. Specifically one or more of the following requirements:

- The report must load automatically, not allowing for modifications of any report parameters.
- The user must click the extension's icon in order for the report to appear.
- The extension looks to modify specific element that may not be universal to all SSRS servers.



My attempt at a solution to these issues involves querying the DOM for the element that will be the parent of the report:
```
var reportViewer = document.querySelectorAll("span[id$='ReportViewer']")[0]
```

Attaching an event listener to watch for new elements being created when the finished report is rendered:
```
reportViewer.addEventListener("DOMNodeInserted", function() {...})
```

And finally cycling through all `<div>` elements within the new report and setting their `overflow` style attribute to `visible`. 

The event listener remains for any successive reports that the user may choose to run.
