let token;
$(document).ready(()=>
{
	 token = prompt("enter the token here");
	fetch();

});
let fetch = ()=>
{
	$.ajax({
		type:"Get",
		dataType: 'json',
        async: true,
		url:'https://graph.facebook.com/me?fields=id,name,picture{url},cover&access_token=' + token,

		success:(data) =>
		{
			$("#load").hide();
			console.log(data);
			console.log(data.picture.data.url);
			$("#profile").html(`<img src="${data.picture.data.url}"class="img-fluid profileSize"/>`);
			$(".img").css('background-image', 'url(' + data.cover.source + ')');
			$(".img").addClass('resize');

			$("#border").html(`<p>ID: ${data.id}</p>`);
			$("#border").append(`<p>NAME: ${data.name}</p>`);
		},
		error:(err)=>
		{
			$("body").append(`<p>${err.responseJSON.error.message}</p>`);
			$("#load").hide();
		},
		beforeSend:()=>
		{
			$("#load").append(`<img src="ajax-loader.gif" style="width: 30%">`);
		}
	});
}