	function findStr(str,n){
			var temp=0;
			for(var i=0;i<str.length;i++){
				if(str.charAt(i)==n){
					temp++;
				};
			};
			return temp;
		};
		window.onload=function() {
			var userName=document.getElementById("userName");
			var psd=document.getElementById("psd");
			var psd1=document.getElementById("psd1");
			var unmInfo=document.getElementsByClassName('unmInfo')[0];
			var count=document.getElementsByClassName('count')[0];
			var psdInfo=document.getElementsByClassName('psdInfo')[0];
			var psd1Info=document.getElementsByClassName('psd1Info')[0];
			var fl=document.getElementsByClassName("fl")[0];
			var name_length=0;
			var re_n=/[^\d]/g;
			var re_t=/[^a-zA-Z]/g
			userName.onfocus=function(){
				unmInfo.style.display="inline-block";
				unmInfo.innerHTML='用户名应为4~25个字符';
				unmInfo.style.color="red";
			}
			userName.onkeyup=function(){
				count.style.visibility="visible";
				name_length=getLength(this.value);
				count.innerHTML=name_length+"个字符";
				if(name_length==0){
					count.style.visibility="hidden";
				}
			}
			userName.onblur=function(){
				if(this.value==""){
					unmInfo.innerHTML='用户名应为4~25个字符';
				}else if(name_length>25){
					unmInfo.innerHTML='长度超过25个字符';
				}else if(name_length<4){
					unmInfo.innerHTML='长度少于4个字符';
				}else{
					unmInfo.innerHTML='OK';
					unmInfo.style.color="green";
				}
			}

			psd.onfocus=function(){
				psdInfo.style.display="inline-block";
				psdInfo.innerHTML='密码在6-16位之间！';
			}
			psd.onkeyup=function(){
				if(this.value.length>5){
					fl.className="active";
					psd1.removeAttribute("disabled");
					psd1Info.style.display="inline-block";
					psd1Info.innerHTML='再输入一次';
				}else{
					fl.className="";
					psd1.setAttribute("disabled","disabled");
					psd1Info.style.display="none";
					psd1.value="";
				}
				if(this.value.length>10){
					fl.className="active1";
				}else{
					fl.className="";
					psd1.value="";
				}

			}
			psd.onblur=function(){
				var m=findStr(this.value,this.value[0]);
				if(this.value==""){
					psdInfo.innerHTML='请输入密码';
				}else if(m==this.value.length){
					psdInfo.innerHTML='不能有相同字符';
				}else if(this.value.length<6||this.value.length>16){
					psdInfo.innerHTML='密码在6-16位之间！';
				}else if(!re_n.test(this.value)){
					psdInfo.innerHTML='不能全为数字';
				}else if(!re_t.test(this.value)){
					psdInfo.innerHTML='不能全为字母';
				}else{
					psdInfo.innerHTML='OK';
					psdInfo.style.color="green";
					
				}
			}

			psd1.onblur=function(){
				if(this.value!=psd.value){
					psd1Info.innerHTML='两次输入的密码不一致';
				}else{
					psd1Info.innerHTML='OK';
					psd1Info.style.color="green";
				}
			}
		}
		function getLength(str){
			return str.replace(/[^\x00-xff]/g,"xx").length;
		}
		

$(function(){
	//先验证用户名是否存在
	
	$("#userName").blur(function(){
		//alert("10000");
		$.get("checkUser.php",
			{
				"userName":$("#userName").val()
				
			},
			function(data){
				if(data=="1"){
						$(".unmInfo").html("此用户名可用");						
					}else{
						$(".unmInfo").html("该用户名已注册");
					}
				}		
		);
	});
	//如果用户名没有被注册，点击提交按钮的时候，将这个会员信息通过后台添加进数据库
	$("#btn1").click(function(){
		if($(".unmInfo").html()=="该用户名已注册"&& $(".psd1Info").html()=="两次输入的密码不一致"){
			return false;
		}else if($(".unmInfo").html()=="此用户名可用" && $(".psd1Info").html()=="OK"){
			$.post(
				"addUser.php",
				{
					"userName":$("#userName").val(),
					"userPass":$("#psd").val()
				},
				
				function(data){
					saveCookie("userName",$("#userName").val(),7);
					location.href="index.html";
				}
		);
		}
	});
});
