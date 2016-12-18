var reportViewer = document.querySelectorAll("span[id$='ReportViewer']")[0]

reportViewer.addEventListener("DOMNodeInserted", function() {
	var divs = this.querySelectorAll("table[id$='fixedTable']")[0]
		.lastElementChild.lastElementChild
		.getElementsByTagName("div")
	
	for (i=0; i<divs.length; i++) {
		divs[i].style.overflow = 'visible'
	}		
});