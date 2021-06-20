$(document).ajaxError(() => {
	alert("章节不存在");
});

function render(f, e) {
	$.get(f, (data, s) => {
		if (s == "success") {
			$(e).html(marked(data));
			document.title = $(`${e} h1`).first().text();
			$(e).find("a").each((i, j) => {
				if ($(j).attr("href").indexOf("//") == -1) {
					$(j).attr("href", `javascript:render("${$(j).attr("href")}", "${e}")`)
				}
			});
			Cookies.set("page", f, {"expires": 7});
		}
	});
}

