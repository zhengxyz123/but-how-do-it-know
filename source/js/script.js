r = new marked.Renderer();
r.image = (href, title, text) => {
	if (text.indexOf(":left:") == 0) {
		return `<img alt="${text.slice(6)}" src="${href}">`;
	} else if (text.indexOf(":right:") == 0) {
		return `<div align="right"><img alt="${text.slice(7)}" src="${href}"></div>`;
	} else {
		return `<div align="center"><img alt="${text}" src="${href}"></div>`;
	}
}
marked.setOptions({renderer: r});

function render(f) {
	$.ajax({
		url: `books/${f}`,
		success: (data) => {
			$("#text").html(marked(data));
			$(document).title = $("#text h1").first().text();
			$("#text").find("a").each((i, j) => {
				if (($(j).attr("href").indexOf("//") == -1) &&
				($(j).attr("href").indexOf(".md") == $(j).attr("href").length - 3)) {
					$(j).attr("href", `javascript:render("${$(j).attr("href")}")`);
				}
			});
			Cookies.set("page", f, {"expires": 30});
			$("body").scrollTop(0);
		},
		error: (xhr) => {
			$("#text").html(`<h5 align="center">错误代码: ${xhr.status}</h5>
				<p align="center">页面 <code>${f}</code> 未找到</p>`);
		}
	});
}

