var base_url = "https://www.fbcredibility.com/sdc/";
// var base_url = "https://www.sdc.com/sdc/";
var server_url = base_url+"fbgetcredit";
var feedback_url = base_url+"fbfeedback";
// var server_url = "https://lab.socialdatacomputing.com/sdc/";

function createSourceButton(ref){
	ret = '<button id=pro_but_'+ref;
	ret += ' class="inline" style="position: relative; margin-left: 10px;height:19px;">';
	// ret +=' <span id=pro_span_'+ref+'></span>';
	ret += '</button>';
	return ret;
}

function createAssessmentButton(divId){
	ret = '<div class="right_div">';
	ret += ' <div class="inline" style="position: relative; margin-top: 3px;">Agree</div>';
	ret += ' <button id=feedback_yes_'+divId+' class="inline">Yes</button>';
	ret += ' <button id=feedback_no_'+divId+' class="inline">No</button>';
	// ret += 'comment';
	ret += '</div>';
	return ret
}

function createFBCredibilityDiv(divId) {
	ret = '<div id=kku_'+divId+' style="position: relative; margin-top: 5px; width:100%; height:18px;">';
	ret += '<div class="inline" style="position: relative; margin-top: 3px; color:#FF8000;">FB Credibility</div>';
	// ret += '<img class="inline" id=img_'+divId+' src="https://dl.dropboxusercontent.com/u/7385478/waiting.gif"  width="20" height="20" alt="Loading"/>';
	// ret += createSourceButton(divId);
	ret += '<div id=fb_result_'+divId+' class="inline" style="position: relative; margin-top: 4px; margin-left: 10px;">:</div>';
	// ret += '<img src="chrome-extension://kpdmecaibnbaihjbghbikjbmihelikeg/scal1.png"></img>';
	ret += createAssessmentButton(divId);
	ret += '</div>';
	return ret;
}

function templateDiv(divId, textContent) {
	ret = '<div id=kku_'+divId+' style="position: relative; margin-top: 5px; width:100%; height:18px;">';
	ret += '<div class="inline" style="position: relative; margin-top: 3px;">FB Credibility</div>';
	ret += textContent;
	ret += createAssessmentButton();
	ret += '</div>';
	return ret;	
}

function getObjId(link){
	if(link == undefined){
		return;
	}
	var first = link.substring(0,1);
	if(first == '/'){ //is posts type
		var short_url = link.split('/');
		if(short_url[2] == 'posts'){
			return short_url[3];
		}
		if(short_url[2] == 'photos'){
			return short_url[4];
		}
	}
	var base_url = link.replace("https://www.facebook.com/","");
	// https://www.facebook.com/OpenSourceForU/photos/a.112258614432.84824.58079349432/10152716463189433/?type=1
	var photo_type = base_url.split('/');
	if(photo_type[1] == 'photos'){
		return photo_type[3];
	}

	// video
	// https://www.facebook.com/video.php?v=10152712805877450
	var video_type = base_url.substring(0,9);
	if(video_type == 'video.php'){
		return base_url.replace("video.php?v=","");
	}

	//permalink permalink.php?story_fbid=910840168926902&id=100000027825211
	var permalink_type = base_url.substring(1,14);
	if(permalink_type == 'permalink.php'){
		var permalink_data = base_url.replace("permalink.php?story_fbid=","");
		var permalink_list = permalink_data.split('&');
		return permalink_list[0].substring(1, permalink_list[0].length);
	}

	return 'none';
}

function getURL(url){
    return $.ajax({
        type: "GET",
        url: url,
        cache: false,
        async: false
    }).responseText;
}

$(document).ready(function () {
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		localStorage.accessToken = response.farewell;
	});

	var removeList = [];

	setInterval(function(){
		if(!localStorage.accessToken){
			return;
		}
		$("[class*='userContentWrapper']").each(function(i){
			var sub_stream = $(this);
			var clearfix = $(sub_stream).find("[class='clearfix _5x46']");
			var info_source = $(clearfix).find("a");
			
			if($(clearfix).find("[id^='kku_']").length){
				// console.log('found');
			} else {
				var link_id = $(clearfix).find("span[class='fsm fwn fcg'] > a[class='_5pcq']");
				if(link_id == undefined){
					return;
				}
				// console.log('link id '+link_id.attr('href'));
				var post_id = getObjId(link_id.attr('href'));
				clearfix.append(createFBCredibilityDiv(i));
				$("#feedback_yes_"+i).click(function(){
					console.log('click feed back yes');
					var urlCall = feedback_url+"?feedback=yes";
					console.log('url '+urlCall);
					$.ajax({
						type: "GET",
						async: true,
						url: urlCall,
						withCredentials: true,
						success: function(result){
							console.log(result);
						}
					});
				});

				$("#feedback_no_"+i).click(function(){
					console.log('click feed back no');
					var urlCall = feedback_url+"?feedback=no";
					console.log('url '+urlCall);
					$.ajax({
						type: "GET",
						async: true,
						url: urlCall,
						withCredentials: true,
						success: function(result){
							console.log(result);
						}
					});
				});

				var token = localStorage.accessToken
				var urlCall = server_url+"?obj_id="+post_id+"&return_id="+i+"&token="+token;			
				$.ajax({
					type: "GET",
					async: true,
					url: urlCall,
					withCredentials: true,
					success: function(result){
						console.log(result);
						var ret_id = result['return_id'];
						// $('#kku_'+ret_id).css({"visibility":"hidden"});
						var divObj = $('#fb_result_'+ret_id);
						if (result['status'] == 0){
							divObj.attr('class', 'rating'+result['rating']);						
						} else {
							console.log('remove..');
							// removeList[removeList.length] = ret_id;resize-notaccess
							var kkuDiv = $('#kku_'+ret_id);
							kkuDiv.css("overflow", "hidden");
							kkuDiv.css("margin-top", "0px");
							kkuDiv.css("height", "1px");
							// kkuDiv.attr('class', 'resize-notaccess');
							// console.log(kkuDiv);
						}
					}
				});
			}
		});
	}, 3000);
 
});
console.log('end script');
