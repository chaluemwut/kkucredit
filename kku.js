// alert('hello world 123');

//userContentWrapper
/*

topnews_main_stream
contentArea
feed_stream
  substream_0
  substream_1
*/

$(document).ready(function () {
	$("[id*='feed_stream_']").children().each(function(i){
		if (i == 0) return;
		var sub_stream = $(this);
		var news_feed_list = sub_stream.children().children();
		// console.log(news_feed_list.size());
		for(var j=0; j < news_feed_list.size(); j++){
			var news_feed = news_feed_list.get(j);
			var news_feed_html = jQuery(news_feed);
			var userContentWrapper = news_feed_html.children();
			var attr = userContentWrapper[0];
			console.log(attr);
			// var userContentWrapper = news_feed.children();
			// console.log(userContentWrapper);
		}
		// console.log(news_feed.size());
		// console.log(fee_obj.attr('class'));
		// var inner_obj = fee_obj.children();
		// console.log(inner_obj.attr('class'));
		// for(var j=0; j<inner_obj.size(); j++){
		// 	var each_news_feed = inner_obj.get(j);
		// 	console.log(each_news_feed.attr('class'));
		// }
	});
 
});
