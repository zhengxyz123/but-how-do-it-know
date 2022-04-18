function render(f) {
	$.ajax({
		url: `books/${f}`,
		success: (data) => {
			$("#text").html(marked.parse(data));
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
