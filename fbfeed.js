let token;
$(document).ready(()=>
{
	 token = prompt("enter the token here");
	 $("button").click(function()
	 {
	 	fetch();
	 })
	

});
let fetch = ()=>
{
	$.ajax({
		type:"Get",
		dataType: 'json',
        async: true,
		url:'https://graph.facebook.com/me?fields=feed.limit(6){message,full_picture,id}&access_token=' + token,

		success:(data) =>
		{
			$("#load").hide();
			console.log(data);
			//loop through ids
			for(i=0;i<6;i++)
			{
				let y = data.feed.data[i].id;
				let x = data.feed.data[i].message;
				let im = data.feed.data[i].full_picture;
				console.log(y);
				let h = `<div class="card" style="width: 28rem;">
				<img class="card-img-top${[i]}" src="${im}" alt="Card image cap">
				<p class = name${[i]}>${x}</p>
  				<div class="card-body">

   				 <p class="card-text bord">Post's ID = ${y} </p>
  					</div>
				</div>
				<br>`
				$("#feed").append(h);

			}
			for(i=0;i<6;i++)
			{
				let x = data.feed.data[i].message;
				let im = data.feed.data[i].full_picture;
				if(x== undefined)
				{
					let g = `.name${i}`;
					console.log(g);
					$(g).html("");
					
				}
				if(im == undefined)
				{
					let img = `.card-img-top${i}`;
					console.log(img);
					$(img).remove();
				}

			}	
				
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