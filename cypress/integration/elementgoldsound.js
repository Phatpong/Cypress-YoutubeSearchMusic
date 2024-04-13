describe("Youtube Search Music For Elementgoldsound", () => {
	const songs = ["ธาตุทองซาว", "ลืมรูดซิบ", "ความรัก"];

	songs.forEach((song) => {
		it(`SearchMusic : ${song}`, () => {
			cy.visit("https://www.youtube.com");
			cy.get("input#search").click().type(`${song}`);
			cy.get("button#search-icon-legacy").click();
			// สร้าง ตัวแปร Arrayเปล่า มารอเก็บค่า  video ที่ find เจอ
			let videoList = [];
			// สร้างตัวแปร รอเก็บค่า index 0 ของ Video แรกที่เราได้เล่น
			let firstVideoTitle = "";
			cy.get("a#video-title")
				.should("be.visible")
				.each(($a, videoIndex) => {
					const titleText = $a.attr("title");
					const videoHref = $a.attr("href");
					videoList.push({ index: videoIndex, title: titleText, href: `https://www.youtube.com${videoHref}` });
					// สร้างตัวแปรมาเก็บ videoIndex เท่ากับ 0
					if (videoIndex === 0) {
						firstVideoTitle = titleText;
					}
				})
				// เก็บค่า video และ index ที่เจอ loopออกมาเก็บไว้ใน videoList
				.then(() => {
					videoList.forEach((video) => {
						cy.log(`Index: ${video.index} - Title: ${video.title} - Href : ${video.href}`);
					});
				});

			cy.get("a#video-title").eq(0).click();
			cy.wait(3000);
			// สร้างตัวแปร มารอเก็บค่า title Name ของ Video ที่กำลังเล่น
			let videoTitle = "";
			cy.get("div#title h1 yt-formatted-string")
				.should("be.visible")
				.then((videoName) => {
					videoTitle = videoName.text();
				});

			if (firstVideoTitle === videoTitle) {
				cy.log(`Video ตรงกันครับ `);
			} else {
				cy.log(`Video ไม่ตรงกันครับ`);
			}
		});
	});
});
