
var server_url = "https://www.sdc.com/sdc/kkucredit/";
// var server_url = "https://lab.socialdatacomputing.com/sdc/";

function createSourceButton(ref){
	ret = '<button id=pro_but_'+ref;
	ret += ' class="inline" style="position: relative; margin-left: 10px;height:19px;">';
	// ret +=' <span id=pro_span_'+ref+'></span>';
	ret += '</button>';
	return ret;
}

function createAssessmentButton(){
	ret = '<div class="right_div">';
	ret += ' <div class="inline" style="position: relative; margin-top: 3px;">Agree with credit </div>';
	// ret += '<div>';
	ret += ' <button class="inline">Yes</button>';
	ret += ' <button class="inline">No</button>';
	// ret += '</div>';
	ret += '</div>';
	return ret
}

function createProgressBar(ref){
	ret = '<div id=pro'+ref;
	ret += ' class="inline" ';
	ret += 'style="position: relative; margin-left: 10px;width:80px; height:18px;">';
	ret += ' </div>';
	return ret;
}

function createCreditDiv(divId){
	ret = '<div id='+divId+' style="position: relative; margin-top: 5px; width:100%; height:18px;">';
	ret += '<div class="inline" style="position: relative; margin-top: 3px;"> KKU credit </div>';
	ret += '<img class="inline" id=img_'+divId+' src="https://dl.dropboxusercontent.com/u/7385478/waiting.gif"  width="20" height="20" alt="Loading"/>';
	ret += createSourceButton(divId);
	ret += createAssessmentButton();
	ret += '</div>';
	return ret;
}

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
			//add ui
			var clearfix = $("[class*='clearfix']").find(attr);
			var target = jQuery($("[class*='clearfix'] > div > div").find(attr).children().children());
			var header = jQuery(target[2]);
			var refDivId = i+'_'+j;
			header.after(createCreditDiv(refDivId));

			//call ajax
			var userContent = $(attr).find("[class*='userContent']");
			var userContentText = userContent.text();
			var urlCall = server_url+"?ref="+refDivId+"&message="+userContentText;
			$.ajax({
				type: "GET",
				async: true,
				url: urlCall,
				withCredentials: true,
				success: function(result){
					// console.log(result);
					var ref = result['ref'];
					var credit = result['credit'];
					var source = result['source'];
					$("#img_"+ref).replaceWith(createProgressBar(ref));
					$("#pro_but_"+ref).text(source.length+' source');
					$("#pro"+ref).progressbar({
						value: credit*100
					}).children('.ui-progressbar-value')
					.html((credit*100).toPrecision(2) + '%')
					.css("display", "block");
				}
			});

		}
	});
 
});
console.log('end script');
