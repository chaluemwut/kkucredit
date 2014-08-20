// alert('hello world 123');

//userContentWrapper
/*

topnews_main_stream
contentArea
feed_stream
  substream_0
  substream_1
*/

function kkuCredit() {
	// $("[class*='clearfix']").each(function(){
	// 	console.log(this.innerHTML);
	// });
	console.log($('#contentArea > #stream_pagelet > [id*="topnews_main_stream"] > [id*="feed_stream"] > [id*="substream"]').length);
	$('#contentArea > #stream_pagelet > [id*="topnews_main_stream"] > [id*="feed_stream"] > [id*="substream"] > div').each(function(){
		console.log(this.innerHTML);
	});
}

kkuCredit();