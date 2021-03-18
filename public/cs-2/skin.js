// Garden Gnome Software - Skin
// Pano2VR 6.1.1/17856
// Filename: Truong CS 1 - Bo logo.ggsk
// Generated 2020-04-28T14:36:24

function pano2vrSkin(player,base) {
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('opt_3d_preview', 2, true);
	player.addVariable('open_tag', 0, "");
	player.addVariable('close_nodes', 2, false);
	player.addVariable('category_visible', 2, true);
	player.addVariable('category_follow', 2, true);
	player.addVariable('category_visible_1', 2, false);
	player.addVariable('node_visible', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._screentint=document.createElement('div');
		el.ggId="screentint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 7.65%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.onclick=function (e) {
			me._image_popup.style[domTransition]='none';
			me._image_popup.style.visibility='hidden';
			me._image_popup.ggVisible=false;
			me._popup_image.ggText=basePath + "";
			me._popup_image.ggSubElement.style.width = '0px';
			me._popup_image.ggSubElement.style.height = '0px';
			me._popup_image.ggSubElement.src='';
			me._popup_image.ggSubElement.src=me._popup_image.ggText;
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszOzA7MCIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQg'+
			'MC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszOzA7MCIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiByPSIwIiBjeT0iMyIgY3g9IjE2Ij4KICA8YW5pbWF0ZSBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIHI9IjAiIGN5PSIzIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMi'+
			'AwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image+";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_popup.appendChild(me._loading_image);
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._maps_google=document.createElement('div');
		el.ggId="Maps_Google";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 64.71%;';
		hs+='left : 14.55%;';
		hs+='position : absolute;';
		hs+='top : 9.53%;';
		hs+='visibility : hidden;';
		hs+='width : 71.82%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._maps_google.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._maps_google.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectangle_10=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 3px;';
		hs+='border-radius : 3px;';
		hs+='background : #000000;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 96.5393%;';
		hs+='left : 1.45671%;';
		hs+='position : absolute;';
		hs+='top : 1.9091%;';
		hs+='visibility : inherit;';
		hs+='width : 96.9596%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_10.ggUpdatePosition=function (useTransition) {
		}
		me._maps_google.appendChild(me._rectangle_10);
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 20px;';
		hs+='border-radius : 20px;';
		hs+='background : rgba(0,0,0,0.745098);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 64px;';
		hs+='left : 0.0667105%;';
		hs+='position : absolute;';
		hs+='top : -0.636323%;';
		hs+='visibility : inherit;';
		hs+='width : 62px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
		}
		me._maps_google.appendChild(me._rectangle_1);
		el=me._map_1=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 95.27%;';
		hs+='left : 1.85%;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 2.46%;';
		hs+='visibility : inherit;';
		hs+='width : 96.2%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_1.ggUpdateConditionTimer=function () {
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdatePosition=function (useTransition) {
		}
		me._map_1.ggNodeChange=function () {
			if (me._map_1.ggLastActivMarker) {
				if (me._map_1.ggLastActivMarker._div.ggDeactivate) me._map_1.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_1.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_1.ggLastActivMarker=marker;
			}
			if (player.getMapType(me._map_1.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_1.ggChangeMap(mapId);
					}
				}
			}
			if (me._map_1.ggLastNodeId && me._map_1.ggGoogleMarkerArray.hasOwnProperty(me._map_1.ggLastNodeId)) {
				me._map_1.ggGoogleMarkerClusterer.addMarker(me._map_1.ggGoogleMarkerArray[me._map_1.ggLastNodeId]);
			}
			if (me._map_1.ggGoogleMarkerArray.hasOwnProperty(id)) {
				me._map_1.ggGoogleMarkerClusterer.removeMarker(me._map_1.ggGoogleMarkerArray[id]);
				me._map_1.ggGoogleMarkerArray[id].setMap(me._map_1.ggMap);
			}
			me._map_1.ggLastNodeId = id;
		}
		me._maps_google.appendChild(me._map_1);
		el=me._ht_maps_google_close=document.createElement('div');
		els=me._ht_maps_google_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_maps_google_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_maps_google_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0w'+
			'LjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4x'+
			'LTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_maps_google_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_Maps_Google_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : -0.55%;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_maps_google_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_maps_google_close.onclick=function (e) {
			me._maps_google.style[domTransition]='none';
			me._maps_google.style.visibility='hidden';
			me._maps_google.ggVisible=false;
		}
		me._ht_maps_google_close.onmouseover=function (e) {
			me._ht_maps_google_close__img.style.visibility='hidden';
			me._ht_maps_google_close__imgo.style.visibility='inherit';
		}
		me._ht_maps_google_close.onmouseout=function (e) {
			me._ht_maps_google_close__img.style.visibility='inherit';
			me._ht_maps_google_close__imgo.style.visibility='hidden';
		}
		me._ht_maps_google_close.ggUpdatePosition=function (useTransition) {
		}
		me._maps_google.appendChild(me._ht_maps_google_close);
		me.divSkin.appendChild(me._maps_google);
		el=me._userdata=document.createElement('div');
		el.ggId="userdata";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 30.47%;';
		hs+='left : 27.5%;';
		hs+='position : absolute;';
		hs+='top : 36%;';
		hs+='visibility : hidden;';
		hs+='width : 45.43%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._userdata.onclick=function (e) {
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
		}
		me._userdata.ggUpdatePosition=function (useTransition) {
		}
		el=me._userdatabg=document.createElement('div');
		el.ggId="userdatabg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : rgba(0,0,0,0.843137);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 99.6158%;';
		hs+='left : -0.75%;';
		hs+='position : absolute;';
		hs+='top : -0.77%;';
		hs+='visibility : inherit;';
		hs+='width : 100.78%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdatabg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdatabg.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdatabg);
		el=me._title=document.createElement('div');
		els=me._title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 12%;';
		hs+='left : 16.17%;';
		hs+='position : absolute;';
		hs+='top : 3.14%;';
		hs+='visibility : inherit;';
		hs+='width : 81.67%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._title.ggUpdateText=function() {
			var hs="<b>"+me.ggUserdata.title+"<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._title.ggUpdateText();
		player.addListener('changenode', function() {
			me._title.ggUpdateText();
		});
		el.appendChild(els);
		me._title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._title.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._title);
		el=me._description=document.createElement('div');
		els=me._description__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="description";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 63.3217%;';
		hs+='left : 4.06%;';
		hs+='position : absolute;';
		hs+='top : 20.08%;';
		hs+='visibility : inherit;';
		hs+='width : 92.58%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._description.ggUpdateText=function() {
			var hs=me.ggUserdata.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._description.ggUpdateText();
		player.addListener('changenode', function() {
			me._description.ggUpdateText();
		});
		el.appendChild(els);
		me._description.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._description.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._description);
		el=me._copyright=document.createElement('div');
		els=me._copyright__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="copyright";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 11%;';
		hs+='left : 4.17%;';
		hs+='position : absolute;';
		hs+='top : 87.57%;';
		hs+='visibility : inherit;';
		hs+='width : 91.6667%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._copyright.ggUpdateText=function() {
			var hs="&#169; "+me.ggUserdata.copyright;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._copyright.ggUpdateText();
		player.addListener('changenode', function() {
			me._copyright.ggUpdateText();
		});
		el.appendChild(els);
		me._copyright.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._copyright.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._copyright);
		el=me._ht_userdataoff=document.createElement('div');
		els=me._ht_userdataoff__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMzkuMTc2cHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMzOS4xNzYgMzM5LjE3NiIgeD0iMHB4IiBpZD0iQ2FwYV8xIiBoZWlnaHQ9IjMzOS4xNzZweCIgdmlld0JveD0iMCAwIDMzOS4xNzYgMzM5LjE3NiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPHBhdGggZD0iTTIyOS44MDMsMTY5LjU4OWw2NS4wODYtNjUuMDg2YzQuMTM1LTQuMTMsNi4xOTktOS4xNDgsNi4xOTktMTUuMDU0YzAtNS45MDQtMi4wNy0xMC45MjEtNi4xOTktMTUuMDUzJiN4ZDsmI3hhOyYjeDk7bC0zMC4xMDUtMzAuMTFjLTQuMTMzLTQuMTMxLTkuMTQ5LTYuMTk4LTE1LjA1My02LjE5OGMtNS45MDUs'+
			'MC0xMC45MjIsMi4wNjYtMTUuMDU2LDYuMTk4bC02NS4wODYsNjUuMDg2bC02NS4wODctNjUuMDg2JiN4ZDsmI3hhOyYjeDk7Yy00LjEzLTQuMTMxLTkuMTQ3LTYuMTk4LTE1LjA1NC02LjE5OGMtNS45MDIsMC0xMC45MiwyLjA2Ni0xNS4wNTQsNi4xOThsLTMwLjEwOCwzMC4xMWMtNC4xMzEsNC4xMjktNi4xOTksOS4xNDktNi4xOTksMTUuMDUzJiN4ZDsmI3hhOyYjeDk7YzAsNS45MDYsMi4wNjYsMTAuOTIxLDYuMTk5LDE1LjA1NGw2NS4wODUsNjUuMDg2bC02NS4wODUsNjUuMDg3Yy00LjEzMSw0LjEzMy02LjE5OSw5LjE0OC02LjE5OSwxNS4wNTcmI3hkOyYjeGE7JiN4OTtjMCw1LjksMi4wNj'+
			'YsMTAuOTE4LDYuMTk5LDE1LjA1MWwzMC4xMDksMzAuMTA3YzQuMTMyLDQuMTM1LDkuMTUyLDYuMTk3LDE1LjA1Myw2LjE5N2M1LjkwNiwwLDEwLjkyMS0yLjA2OCwxNS4wNTQtNi4xOTcmI3hkOyYjeGE7JiN4OTtsNjUuMDg3LTY1LjA4OGw2NS4wOTMsNjUuMDg4YzQuMTMxLDQuMTM1LDkuMTQ1LDYuMTk3LDE1LjA1NSw2LjE5N2M1LjkwMiwwLDEwLjkyLTIuMDY4LDE1LjA1Mi02LjE5N2wzMC4xMDEtMzAuMTA3JiN4ZDsmI3hhOyYjeDk7YzQuMTM1LTQuMTI4LDYuMTk5LTkuMTQ5LDYuMTk5LTE1LjA1MWMwLTUuOTA3LTIuMDY0LTEwLjkyNC02LjE5OS0xNS4wNTdMMjI5LjgwMywxNjkuNTg5eiIg'+
			'ZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K';
		me._ht_userdataoff__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_userdataoff__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMzkuMTc2cHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMzOS4xNzYgMzM5LjE3NiIgeD0iMHB4IiBpZD0iQ2FwYV8xIiBoZWlnaHQ9IjMzOS4xNzZweCIgdmlld0JveD0iMCAwIDMzOS4xNzYgMzM5LjE3NiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPHBhdGggZD0iTTI0Ny4yNDUsMTY5LjU5bDgzLjkzOC04My45MzhjNS4zMzItNS4zMjcsNy45OTQtMTEuNzk4LDcuOTk0LTE5LjQxNGMwLTcuNjE0LTIuNjctMTQuMDg0LTcuOTk0LTE5LjQxNCYjeGQ7JiN4YTsmI3g5O0wyOTIuMzU1LDcuOTkzQzI4Ny4wMjUsMi42NjUsMjgwLjU1NywwLDI3Mi45NDMsMGMtNy42MTYsMC0x'+
			'NC4wODQsMi42NjUtMTkuNDE2LDcuOTkzTDE2OS41OSw5MS45MzFMODUuNjUxLDcuOTkzJiN4ZDsmI3hhOyYjeDk7QzgwLjMyNSwyLjY2NSw3My44NTQsMCw2Ni4yMzcsMGMtNy42MTEsMC0xNC4wODMsMi42NjUtMTkuNDE0LDcuOTkzTDcuOTk0LDQ2LjgyNEMyLjY2Nyw1Mi4xNSwwLDU4LjYyNCwwLDY2LjIzOCYjeGQ7JiN4YTsmI3g5O2MwLDcuNjE2LDIuNjY0LDE0LjA4NCw3Ljk5NCwxOS40MTRsODMuOTM3LDgzLjkzOEw3Ljk5NCwyNTMuNTI3QzIuNjY3LDI1OC44NTksMCwyNjUuMzI3LDAsMjcyLjk0NSYjeGQ7JiN4YTsmI3g5O2MwLDcuNjA5LDIuNjY0LDE0LjA4Miw3Ljk5NCwxOS40MWwzOC'+
			'44MywzOC44MjhjNS4zMyw1LjMzMiwxMS44MDMsNy45OTIsMTkuNDE0LDcuOTkyYzcuNjE2LDAsMTQuMDg0LTIuNjY4LDE5LjQxNC03Ljk5MiYjeGQ7JiN4YTsmI3g5O2w4My45MzktODMuOTM4bDgzLjk0NSw4My45MzhjNS4zMjcsNS4zMzIsMTEuNzkzLDcuOTkyLDE5LjQxNiw3Ljk5MmM3LjYxLDAsMTQuMDgyLTIuNjY4LDE5LjQxMS03Ljk5MmwzOC44MTgtMzguODI4JiN4ZDsmI3hhOyYjeDk7YzUuMzMyLTUuMzIzLDcuOTk0LTExLjgwMSw3Ljk5NC0xOS40MWMwLTcuNjE4LTIuNjYyLTE0LjA4Ni03Ljk5NC0xOS40MThMMjQ3LjI0NSwxNjkuNTl6IiBmaWxsPSIjRkZGREZEIi8+Cjwvc3ZnPgo='+
			'';
		me._ht_userdataoff__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_userdata-off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 26px;';
		hs+='left : 1.14%;';
		hs+='position : absolute;';
		hs+='top : 0.79%;';
		hs+='visibility : inherit;';
		hs+='width : 26px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_userdataoff.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_userdataoff.onclick=function (e) {
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
		}
		me._ht_userdataoff.onmouseover=function (e) {
			me._ht_userdataoff__img.style.visibility='hidden';
			me._ht_userdataoff__imgo.style.visibility='inherit';
		}
		me._ht_userdataoff.onmouseout=function (e) {
			me._ht_userdataoff__img.style.visibility='inherit';
			me._ht_userdataoff__imgo.style.visibility='hidden';
		}
		me._ht_userdataoff.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._ht_userdataoff);
		me.divSkin.appendChild(me._userdata);
		el=me._sound=document.createElement('div');
		el.ggId="sound";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 98px;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 128px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._sound.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._sound.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._volume_bar_mask=document.createElement('div');
		el.ggId="volume_bar_mask";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1.2,sy:1.2 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 7px;';
		hs+='left : 12px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 101px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._volume_bar_mask.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_bar_mask.ggUpdatePosition=function (useTransition) {
		}
		el=me._volume_meter=document.createElement('div');
		el.ggId="volume_meter";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #c8c8c8;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_meter.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_meter.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_meter);
		el=me._volume_level_five=document.createElement('div');
		el.ggId="volume_level_five";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 80px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_level_five.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_level_five.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_level_five);
		el=me._volume_level_four=document.createElement('div');
		el.ggId="volume_level_four";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 60px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_level_four.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_level_four.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_level_four);
		el=me._volume_level_three=document.createElement('div');
		el.ggId="volume_level_three";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_level_three.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_level_three.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_level_three);
		el=me._volume_level_two=document.createElement('div');
		el.ggId="volume_level_two";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 20px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_level_two.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_level_two.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_level_two);
		el=me._volume_level_one=document.createElement('div');
		el.ggId="volume_level_one";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_level_one.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_level_one.ggUpdatePosition=function (useTransition) {
		}
		me._volume_bar_mask.appendChild(me._volume_level_one);
		me._sound.appendChild(me._volume_bar_mask);
		el=me._vol_up=document.createElement('div');
		els=me._vol_up__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyI+CiAgPHBhdGggZD0iTTE2LjAzMiw4LjkxN2MtMC40NDMtMC4xODYtMC45NTctMC4wODgtMS4zMDEsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4zMTUsMC0wLjYyNCwwLjEyNy0wLjg0NiwwLjM1Yy0wLjIyMywwLjIyMy0wLjM1MSwwLjUzMS0wLjM1MSwwLjg0NnY1LjI5N2MwLDAuMzE0LDAuMTI4LDAuNjIzLDAuMzUx'+
			'LDAuODQ3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjIyMywwLjIyMiwwLjUzMSwwLjM1LDAuODQ2LDAuMzVoMi4yMzhsMy4xMDMsMy4wMzhjMC4yMjgsMC4yMjIsMC41MzEsMC4zNDEsMC44MzgsMC4zNDFjMC4xNTYsMCwwLjMxMy0wLjAzMSwwLjQ2Mi0wLjA5NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40NDItMC4xODYsMC43MzMtMC42MjIsMC43MzMtMS4xMDNWMTAuMDE5QzE2Ljc2NSw5LjUzOSwxNi40NzQsOS4xMDIsMTYuMDMyLDguOTE3eiBNMTQuMzcyLDE5LjIyOGwtMS40MTgtMS4zODgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjIyNS0wLjIyMS0wLjUyMi0wLjM0Mi'+
			'0wLjgzNy0wLjM0MmgtMS41MzF2LTIuOTA1bDEuNTMxLDBjMC4zMTUsMCwwLjYxMi0wLjEyMiwwLjgzNy0wLjM0MWwxLjQxOC0xLjM4OVYxOS4yMjh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuOTE0LDE1LjEwMWgtMS42MTZ2LTEuNjE2YzAtMC41MTQtMC40MTctMC45My0wLjkzLTAuOTNjLTAuNTE1LDAtMC45MzIsMC40MTYtMC45MzIsMC45M3YxLjYxNmgtMS42MTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxNCwwLTAuOTMsMC40MTYtMC45MywwLjkzYzAsMC41MTQsMC40MTYsMC45MywwLjkzLDAuOTNoMS42MTV2MS42MTZjMCwwLjUxNCwwLjQxNywwLjkzMSwwLjkzMiww'+
			'LjkzMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MTMsMCwwLjkzLTAuNDE3LDAuOTMtMC45MzF2LTEuNjE2aDEuNjE2YzAuNTE0LDAsMC45MzEtMC40MTcsMC45MzEtMC45M0MyNC44NDUsMTUuNTE3LDI0LjQyOCwxNS4xMDEsMjMuOTE0LDE1LjEwMXogTTE2LDMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NiwxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTIzLjE0Ny'+
			'wyMy4xNDdjLTEuODMzLDEuODMtNC4zNTMsMi45NTktNy4xNDcsMi45NmMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NmMyLjc5NSwwLDUuMzEzLDEuMTI5LDcuMTQ3LDIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4x'+
			'NDd6Ii8+CiA8L2c+CiA8ZyBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIj4KICA8cGF0aCBkPSJNMTYuMDMyLDguOTE3Yy0wLjQ0My0wLjE4Ni0wLjk1Ny0wLjA4OC0xLjMwMSwwLjI0OGwtMy4xMDMsMy4wMzdsLTIuMjM4LDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjMxNSwwLTAuNjI0LDAuMTI3LTAuODQ2LDAuMzVjLTAuMjIzLDAuMjIzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk3YzAsMC4zMTQsMC4xMjgsMC42MjMsMC4zNTEsMC44NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUsMC44ND'+
			'YsMC4zNWgyLjIzOGwzLjEwMywzLjAzOGMwLjIyOCwwLjIyMiwwLjUzMSwwLjM0MSwwLjgzOCwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMxLDAuNDYyLTAuMDk0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQ0Mi0wLjE4NiwwLjczMy0wLjYyMiwwLjczMy0xLjEwM1YxMC4wMTlDMTYuNzY1LDkuNTM5LDE2LjQ3NCw5LjEwMiwxNi4wMzIsOC45MTd6IE0xNC4zNzIsMTkuMjI4bC0xLjQxOC0xLjM4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI1LTAuMjIxLTAuNTIyLTAuMzQyLTAuODM3LTAuMzQyaC0xLjUzMXYtMi45MDVsMS41MzEsMGMwLjMxNSwwLDAuNjEyLTAuMTIyLDAuODM3'+
			'LTAuMzQxbDEuNDE4LTEuMzg5VjE5LjIyOHomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0yMy45MTQsMTUuMTAxaC0xLjYxNnYtMS42MTZjMC0wLjUxNC0wLjQxNy0wLjkzLTAuOTMtMC45M2MtMC41MTUsMC0wLjkzMiwwLjQxNi0wLjkzMiwwLjkzdjEuNjE2aC0xLjYxNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuNTE0LDAtMC45MywwLjQxNi0wLjkzLDAuOTNjMCwwLjUxNCwwLjQxNiwwLjkzLDAuOTMsMC45M2gxLjYxNXYxLjYxNmMwLDAuNTE0LDAuNDE3LDAuOTMxLDAuOTMyLDAuOTMxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjUxMywwLDAuOTMtMC40MTcsMC45My0wLjkzMX'+
			'YtMS42MTZoMS42MTZjMC41MTQsMCwwLjkzMS0wLjQxNywwLjkzMS0wLjkzQzI0Ljg0NSwxNS41MTcsMjQuNDI4LDE1LjEwMSwyMy45MTQsMTUuMTAxeiBNMTYsMy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAwMS01LjMx'+
			'NC0xLjEzLTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2YzIuNzk1LDAsNS4zMTMsMS4xMjksNy4xNDcsMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0N3oiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._vol_up__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._vol_up__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIj4KICA8cGF0aCBkPSJNMTYuMDMyLDguOTE3Yy0wLjQ0My0wLjE4Ni0wLjk1Ny0wLjA4OC0xLjMwMSwwLjI0OGwtMy4xMDMsMy4wMzdsLTIuMjM4LDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjMxNSwwLTAuNjI0LDAuMTI3LTAuODQ2LDAuMzVjLTAuMjIzLDAu'+
			'MjIzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk3YzAsMC4zMTQsMC4xMjgsMC42MjMsMC4zNTEsMC44NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUsMC44NDYsMC4zNWgyLjIzOGwzLjEwMywzLjAzOGMwLjIyOCwwLjIyMiwwLjUzMSwwLjM0MSwwLjgzOCwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMxLDAuNDYyLTAuMDk0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQ0Mi0wLjE4NiwwLjczMy0wLjYyMiwwLjczMy0xLjEwM1YxMC4wMTlDMTYuNzY1LDkuNTM5LDE2LjQ3NCw5LjEwMiwxNi4wMzIsOC45MTd6IE0xNC4zNzIsMTkuMjI4bC0xLj'+
			'QxOC0xLjM4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI1LTAuMjIxLTAuNTIyLTAuMzQyLTAuODM3LTAuMzQyaC0xLjUzMXYtMi45MDVsMS41MzEsMGMwLjMxNSwwLDAuNjEyLTAuMTIyLDAuODM3LTAuMzQxbDEuNDE4LTEuMzg5VjE5LjIyOHomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0yMy45MTQsMTUuMTAxaC0xLjYxNnYtMS42MTZjMC0wLjUxNC0wLjQxNy0wLjkzLTAuOTMtMC45M2MtMC41MTUsMC0wLjkzMiwwLjQxNi0wLjkzMiwwLjkzdjEuNjE2aC0xLjYxNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuNTE0LDAtMC45MywwLjQxNi0wLjkzLDAuOTNjMCwwLjUxNCww'+
			'LjQxNiwwLjkzLDAuOTMsMC45M2gxLjYxNXYxLjYxNmMwLDAuNTE0LDAuNDE3LDAuOTMxLDAuOTMyLDAuOTMxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjUxMywwLDAuOTMtMC40MTcsMC45My0wLjkzMXYtMS42MTZoMS42MTZjMC41MTQsMCwwLjkzMS0wLjQxNywwLjkzMS0wLjkzQzI0Ljg0NSwxNS41MTcsMjQuNDI4LDE1LjEwMSwyMy45MTQsMTUuMTAxeiBNMTYsMy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNUMyOC40OT'+
			'ksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAwMS01LjMxNC0xLjEzLTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2YzIuNzk1LDAsNS4zMTMsMS4xMjksNy4xNDcsMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzEsMS44MzMsMi45'+
			'NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0N3oiLz4KIDwvZz4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCI+CiAgPHBhdGggZD0iTTE2LjAzMiw4LjkxN2MtMC40NDMtMC4xODYtMC45NTctMC4wODgtMS4zMDEsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4zMTUsMC0wLjYyNCwwLjEyNy0wLjg0NiwwLjM1Yy0wLjIyMywwLj'+
			'IyMy0wLjM1MSwwLjUzMS0wLjM1MSwwLjg0NnY1LjI5N2MwLDAuMzE0LDAuMTI4LDAuNjIzLDAuMzUxLDAuODQ3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjIyMywwLjIyMiwwLjUzMSwwLjM1LDAuODQ2LDAuMzVoMi4yMzhsMy4xMDMsMy4wMzhjMC4yMjgsMC4yMjIsMC41MzEsMC4zNDEsMC44MzgsMC4zNDFjMC4xNTYsMCwwLjMxMy0wLjAzMSwwLjQ2Mi0wLjA5NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40NDItMC4xODYsMC43MzMtMC42MjIsMC43MzMtMS4xMDNWMTAuMDE5QzE2Ljc2NSw5LjUzOSwxNi40NzQsOS4xMDIsMTYuMDMyLDguOTE3eiBNMTQuMzcyLDE5LjIyOGwtMS40'+
			'MTgtMS4zODgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjIyNS0wLjIyMS0wLjUyMi0wLjM0Mi0wLjgzNy0wLjM0MmgtMS41MzF2LTIuOTA1bDEuNTMxLDBjMC4zMTUsMCwwLjYxMi0wLjEyMiwwLjgzNy0wLjM0MWwxLjQxOC0xLjM4OVYxOS4yMjh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuOTE0LDE1LjEwMWgtMS42MTZ2LTEuNjE2YzAtMC41MTQtMC40MTctMC45My0wLjkzLTAuOTNjLTAuNTE1LDAtMC45MzIsMC40MTYtMC45MzIsMC45M3YxLjYxNmgtMS42MTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxNCwwLTAuOTMsMC40MTYtMC45MywwLjkzYzAsMC41MTQsMC'+
			'40MTYsMC45MywwLjkzLDAuOTNoMS42MTV2MS42MTZjMCwwLjUxNCwwLjQxNywwLjkzMSwwLjkzMiwwLjkzMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MTMsMCwwLjkzLTAuNDE3LDAuOTMtMC45MzF2LTEuNjE2aDEuNjE2YzAuNTE0LDAsMC45MzEtMC40MTcsMC45MzEtMC45M0MyNC44NDUsMTUuNTE3LDI0LjQyOCwxNS4xMDEsMjMuOTE0LDE1LjEwMXogTTE2LDMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NiwxMi41LTEyLjVDMjguNDk5'+
			'LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTIzLjE0NywyMy4xNDdjLTEuODMzLDEuODMtNC4zNTMsMi45NTktNy4xNDcsMi45NmMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NmMyLjc5NSwwLDUuMzEzLDEuMTI5LDcuMTQ3LDIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMxLDEuODMzLDIuOT'+
			'U5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._vol_up__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="vol_up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='left : 82px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 33px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vol_up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vol_up.onclick=function (e) {
			player.changeVolume("_main",0.2);
			if (player.transitionsDisabled) {
				me._volume_meter.style[domTransition]='none';
			} else {
				me._volume_meter.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._volume_meter.ggParameter.rx+=20;me._volume_meter.ggParameter.ry+=0;
			if (me._volume_meter.ggParameter.rx>20) me._volume_meter.ggParameter.rx=20;
			me._volume_meter.style[domTransform]=parameterToTransform(me._volume_meter.ggParameter);
		}
		me._vol_up.onmouseover=function (e) {
			me._vol_up__img.style.visibility='hidden';
			me._vol_up__imgo.style.visibility='inherit';
		}
		me._vol_up.onmouseout=function (e) {
			me._vol_up__img.style.visibility='inherit';
			me._vol_up__imgo.style.visibility='hidden';
		}
		me._vol_up.ggUpdatePosition=function (useTransition) {
		}
		me._sound.appendChild(me._vol_up);
		el=me._vol_down=document.createElement('div');
		els=me._vol_down__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyI+CiAgPHBhdGggZD0iTTIzLjY3MSwxNS4xMDFoLTQuNjA2Yy0wLjUxNSwwLTAuOTMxLDAuNDE3LTAuOTMxLDAuOTNzMC40MTYsMC45MzEsMC45MzEsMC45MzFoNC42MDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNTE0LDAsMC45MzEtMC40MTcsMC45MzEtMC45MzFTMjQuMTg1LDE1LjEwMSwyMy42NzEsMTUuMTAxeiBNMTYuMDMxLDguOTE3Yy0wLjQ0My0wLjE4Ny0w'+
			'Ljk1OC0wLjA4OC0xLjMwMSwwLjI0OGwtMy4xMDIsMy4wMzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bC0yLjIzOSwwYy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzVjLTAuMjIzLDAuMjIzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk2YzAsMC4zMTUsMC4xMjcsMC42MjMsMC4zNTEsMC44NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUsMC44NDYsMC4zNWgyLjIzOGwzLjEwMywzLjAzOGMwLjIyOCwwLjIyMywwLjUzMSwwLjM0MSwwLjgzOSwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMsMC40NjItMC4wOTMmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7YzAuNDQyLTAuMTg3LDAuNzMzLTAuNjIzLDAuNzMzLTEuMTA0VjEwLjAxOUMxNi43NjQsOS41NCwxNi40NzQsOS4xMDIsMTYuMDMxLDguOTE3eiBNMTQuMzcxLDE5LjIyOGwtMS40MTgtMS4zODgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjIyNS0wLjIyMS0wLjUyMi0wLjM0Mi0wLjgzNy0wLjM0MmgtMS41M3YtMi45MDVsMS41MzEsMGMwLjMxNSwwLDAuNjEyLTAuMTIxLDAuODM3LTAuMzQxbDEuNDE3LTEuMzg4VjE5LjIyOHogTTE2LDMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi40OTksMTIu'+
			'NSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NiwxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTIzLjE0NywyMy4xNDdjLTEuODMzLDEuODMtNC4zNTMsMi45NTktNy4xNDcsMi45NmMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NmMyLjc5NSwwLDUuMzEzLDEuMTI5LDcuMT'+
			'Q3LDIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDd6Ii8+CiA8L2c+CiA8ZyBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIj4KICA8cGF0aCBkPSJNMjMuNjcxLDE1LjEwMWgtNC42MDZjLTAuNTE1LDAtMC45MzEsMC40MTctMC45MzEsMC45M3MwLjQxNiwwLjkzMSwwLjkzMSwwLjkzMWg0LjYwNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MTQsMCwwLjkzMS0wLjQxNywwLjkzMS0wLjkzMVMyNC4xODUsMTUu'+
			'MTAxLDIzLjY3MSwxNS4xMDF6IE0xNi4wMzEsOC45MTdjLTAuNDQzLTAuMTg3LTAuOTU4LTAuMDg4LTEuMzAxLDAuMjQ4bC0zLjEwMiwzLjAzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsLTIuMjM5LDBjLTAuMzE1LDAtMC42MjMsMC4xMjctMC44NDYsMC4zNWMtMC4yMjMsMC4yMjMtMC4zNTEsMC41MzEtMC4zNTEsMC44NDZ2NS4yOTZjMCwwLjMxNSwwLjEyNywwLjYyMywwLjM1MSwwLjg0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4yMjMsMC4yMjIsMC41MzEsMC4zNSwwLjg0NiwwLjM1aDIuMjM4bDMuMTAzLDMuMDM4YzAuMjI4LDAuMjIzLDAuNTMxLDAuMzQxLDAuODM5LDAuMzQxYz'+
			'AuMTU2LDAsMC4zMTMtMC4wMywwLjQ2Mi0wLjA5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40NDItMC4xODcsMC43MzMtMC42MjMsMC43MzMtMS4xMDRWMTAuMDE5QzE2Ljc2NCw5LjU0LDE2LjQ3NCw5LjEwMiwxNi4wMzEsOC45MTd6IE0xNC4zNzEsMTkuMjI4bC0xLjQxOC0xLjM4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI1LTAuMjIxLTAuNTIyLTAuMzQyLTAuODM3LTAuMzQyaC0xLjUzdi0yLjkwNWwxLjUzMSwwYzAuMzE1LDAsMC42MTItMC4xMjEsMC44MzctMC4zNDFsMS40MTctMS4zODhWMTkuMjI4eiBNMTYsMy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M5LjA5'+
			'NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAwMS01LjMxNC0xLjEzLTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44Mz'+
			'EsNC4zNTItMi45Niw3LjE0Ni0yLjk2YzIuNzk1LDAsNS4zMTMsMS4xMjksNy4xNDcsMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0N3oiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._vol_down__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._vol_down__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIj4KICA8cGF0aCBkPSJNMjMuNjcxLDE1LjEwMWgtNC42MDZjLTAuNTE1LDAtMC45MzEsMC40MTctMC45MzEsMC45M3MwLjQxNiwwLjkzMSwwLjkzMSwwLjkzMWg0LjYwNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MTQsMCwwLjkzMS0wLjQxNywwLjkzMS0wLjkz'+
			'MVMyNC4xODUsMTUuMTAxLDIzLjY3MSwxNS4xMDF6IE0xNi4wMzEsOC45MTdjLTAuNDQzLTAuMTg3LTAuOTU4LTAuMDg4LTEuMzAxLDAuMjQ4bC0zLjEwMiwzLjAzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsLTIuMjM5LDBjLTAuMzE1LDAtMC42MjMsMC4xMjctMC44NDYsMC4zNWMtMC4yMjMsMC4yMjMtMC4zNTEsMC41MzEtMC4zNTEsMC44NDZ2NS4yOTZjMCwwLjMxNSwwLjEyNywwLjYyMywwLjM1MSwwLjg0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4yMjMsMC4yMjIsMC41MzEsMC4zNSwwLjg0NiwwLjM1aDIuMjM4bDMuMTAzLDMuMDM4YzAuMjI4LDAuMjIzLDAuNTMxLDAuMzQxLD'+
			'AuODM5LDAuMzQxYzAuMTU2LDAsMC4zMTMtMC4wMywwLjQ2Mi0wLjA5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40NDItMC4xODcsMC43MzMtMC42MjMsMC43MzMtMS4xMDRWMTAuMDE5QzE2Ljc2NCw5LjU0LDE2LjQ3NCw5LjEwMiwxNi4wMzEsOC45MTd6IE0xNC4zNzEsMTkuMjI4bC0xLjQxOC0xLjM4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI1LTAuMjIxLTAuNTIyLTAuMzQyLTAuODM3LTAuMzQyaC0xLjUzdi0yLjkwNWwxLjUzMSwwYzAuMzE1LDAsMC42MTItMC4xMjEsMC44MzctMC4zNDFsMS40MTctMS4zODhWMTkuMjI4eiBNMTYsMy41JiN4ZDsmI3hhOyYjeDk7JiN4'+
			'OTsmI3g5O0M5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAwMS01LjMxNC0xLjEzLTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xND'+
			'djMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2YzIuNzk1LDAsNS4zMTMsMS4xMjksNy4xNDcsMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0N3oiLz4KIDwvZz4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCI+CiAgPHBhdGggZD0iTTIzLjY3MSwxNS4xMDFoLTQuNjA2Yy0wLjUxNSwwLTAu'+
			'OTMxLDAuNDE3LTAuOTMxLDAuOTNzMC40MTYsMC45MzEsMC45MzEsMC45MzFoNC42MDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNTE0LDAsMC45MzEtMC40MTcsMC45MzEtMC45MzFTMjQuMTg1LDE1LjEwMSwyMy42NzEsMTUuMTAxeiBNMTYuMDMxLDguOTE3Yy0wLjQ0My0wLjE4Ny0wLjk1OC0wLjA4OC0xLjMwMSwwLjI0OGwtMy4xMDIsMy4wMzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bC0yLjIzOSwwYy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzVjLTAuMjIzLDAuMjIzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk2YzAsMC4zMTUsMC4xMjcsMC42MjMsMC4zNTEsMC'+
			'44NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUsMC44NDYsMC4zNWgyLjIzOGwzLjEwMywzLjAzOGMwLjIyOCwwLjIyMywwLjUzMSwwLjM0MSwwLjgzOSwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMsMC40NjItMC4wOTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNDQyLTAuMTg3LDAuNzMzLTAuNjIzLDAuNzMzLTEuMTA0VjEwLjAxOUMxNi43NjQsOS41NCwxNi40NzQsOS4xMDIsMTYuMDMxLDguOTE3eiBNMTQuMzcxLDE5LjIyOGwtMS40MTgtMS4zODgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjIyNS0wLjIyMS0wLjUyMi0wLjM0Mi0wLjgz'+
			'Ny0wLjM0MmgtMS41M3YtMi45MDVsMS41MzEsMGMwLjMxNSwwLDAuNjEyLTAuMTIxLDAuODM3LTAuMzQxbDEuNDE3LTEuMzg4VjE5LjIyOHogTTE2LDMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NiwxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTIzLjE0NywyMy4xNDdjLTEuODMzLDEuODMtNC4zNTMsMi45NTktNy4xNDcsMi45NmMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy'+
			'03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NmMyLjc5NSwwLDUuMzEzLDEuMTI5LDcuMTQ3LDIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._vol_down__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="vol_down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 33px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vol_down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vol_down.onclick=function (e) {
			player.changeVolume("_main",-0.2);
			if (player.transitionsDisabled) {
				me._volume_meter.style[domTransition]='none';
			} else {
				me._volume_meter.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._volume_meter.ggParameter.rx+=-20;me._volume_meter.ggParameter.ry+=0;
			if (me._volume_meter.ggParameter.rx<-80) me._volume_meter.ggParameter.rx=-80;
			me._volume_meter.style[domTransform]=parameterToTransform(me._volume_meter.ggParameter);
		}
		me._vol_down.onmouseover=function (e) {
			me._vol_down__img.style.visibility='hidden';
			me._vol_down__imgo.style.visibility='inherit';
		}
		me._vol_down.onmouseout=function (e) {
			me._vol_down__img.style.visibility='inherit';
			me._vol_down__imgo.style.visibility='hidden';
		}
		me._vol_down.ggUpdatePosition=function (useTransition) {
		}
		me._sound.appendChild(me._vol_down);
		el=me._set_volume=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="set_volume";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -39px;';
		hs+='position : absolute;';
		hs+='top : -31px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._set_volume.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._set_volume.ggUpdatePosition=function (useTransition) {
		}
		me._sound.appendChild(me._set_volume);
		me.divSkin.appendChild(me._sound);
		el=me._hide_elements=document.createElement('div');
		el.ggId="hide_elements";
		el.ggDx=-16;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 27px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_elements.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_elements.onmouseover=function (e) {
			me.elementMouseOver['hide_elements']=true;
		}
		me._hide_elements.onmouseout=function (e) {
			me.elementMouseOver['hide_elements']=false;
		}
		me._hide_elements.ontouchend=function (e) {
			me.elementMouseOver['hide_elements']=false;
		}
		me._hide_elements.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._svg_background_menu=document.createElement('div');
		els=me._svg_background_menu__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NjQuNjY1cHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgNDkuNjE4IDAgODY0LjY2NSAyMzIiIHg9IjBweCIgaWQ9Ik9CSkVDVFMiIGhlaWdodD0iMjMycHgiIHZpZXdCb3g9IjQ5LjYxOCAwIDg2NC42NjUgMjMyIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBvcGFjaXR5PSIwLjUiPgogIDxwb2x5Z29uIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIzMTAuODY3LDcuNTAyIDM0NC42MTUsNjAuNzk0IDMxMC44NjcsMTE0LjA4NyAmI3hkOyYjeGE7JiN4OTsmI3g5OzI0My4zNywxMTQuMDg3IDIwOS42MjIsNjAuNzk0IDI0My4zNyw3LjUwMiAmI3g5OyIgc3Ryb2tlLXdp'+
			'ZHRoPSIwLjI1IiBzdHJva2U9IiM3MjcxNzYiLz4KICA8cG9seWdvbiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMzEwLjg2NywxMTcuMjQ3IDM0NC42MTUsMTcwLjU0IDMxMC44NjcsMjIzLjgzMSAmI3hkOyYjeGE7JiN4OTsmI3g5OzI0My4zNywyMjMuODMxIDIwOS42MjIsMTcwLjU0IDI0My4zNywxMTcuMjQ3ICYjeDk7IiBzdHJva2Utd2lkdGg9IjAuMjUiIHN0cm9rZT0iIzcyNzE3NiIvPgogIDxwb2x5Z29uIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgb3BhY2l0eT0iMC43IiBwb2ludHM9IjIwOC41MjUsNjIuMjU2ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MjA4LjI5Niw2Mi4yNTYgMT'+
			'g5Ljk1MSw2Mi4yNTYgMTg5LjcyMiw2Mi4yNTYgMTU1Ljk3NCwxMTUuNTQ4IDE4OS43MjIsMTY4Ljg0MSAxODkuOTUxLDE2OC44NDEgMjA4LjI5NiwxNjguODQxIDIwOC41MjUsMTY4Ljg0MSAmI3hkOyYjeGE7JiN4OTsmI3g5OzI0Mi4yNzMsMTE1LjU0OCAmI3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBmaWxsPSIjNjA2MDYwIiBzdHJva2U9IiM3MjcxNzYiLz4KIDwvZz4KIDxnIG9wYWNpdHk9IjAuNSI+CiAgPHBvbHlnb24gc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjcyMS41MzQsNy41MDIgNzU1LjI4Miw2MC43OTQgNzIxLjUzNCwxMTQuMDg3ICYjeGQ7JiN4YTsmI3g5OyYjeDk7'+
			'NjU0LjAzNiwxMTQuMDg3IDYyMC4yODgsNjAuNzk0IDY1NC4wMzYsNy41MDIgJiN4OTsiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlPSIjNzI3MTc2Ii8+CiAgPHBvbHlnb24gc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjcyMS41MzQsMTE3LjI0NyA3NTUuMjgyLDE3MC41NCA3MjEuNTM0LDIyMy44MzEgJiN4ZDsmI3hhOyYjeDk7JiN4OTs2NTQuMDM2LDIyMy44MzEgNjIwLjI4OCwxNzAuNTQgNjU0LjAzNiwxMTcuMjQ3ICYjeDk7IiBzdHJva2Utd2lkdGg9IjAuMjUiIHN0cm9rZT0iIzcyNzE3NiIvPgogIDxwb2x5Z29uIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgb3BhY2l0eT0iMC'+
			'43IiBwb2ludHM9Ijc3NS4wMjUsNjIuMjU2ICYjeGQ7JiN4YTsmI3g5OyYjeDk7Nzc0Ljc5Niw2Mi4yNTYgNzU2LjQ1MSw2Mi4yNTYgNzU2LjIyMiw2Mi4yNTYgNzIyLjQ3NCwxMTUuNTQ4IDc1Ni4yMjIsMTY4Ljg0MSA3NTYuNDUxLDE2OC44NDEgNzc0Ljc5NiwxNjguODQxIDc3NS4wMjUsMTY4Ljg0MSAmI3hkOyYjeGE7JiN4OTsmI3g5OzgwOC43NzMsMTE1LjU0OCAmI3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBmaWxsPSIjNjA2MDYwIiBzdHJva2U9IiM3MjcxNzYiLz4KIDwvZz4KIDxnIG9wYWNpdHk9IjAuNSI+CiAgPHBvbHlnb24gc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9Ijg3'+
			'Ny41MzQsNy41MDIgOTExLjI4Miw2MC43OTQgODc3LjUzNCwxMTQuMDg3ICYjeGQ7JiN4YTsmI3g5OyYjeDk7ODEwLjAzNiwxMTQuMDg3IDc3Ni4yODgsNjAuNzk0IDgxMC4wMzYsNy41MDIgJiN4OTsiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlPSIjNzI3MTc2Ii8+CiAgPHBvbHlnb24gc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9Ijg3Ny41MzQsMTE3LjI0NyA5MTEuMjgyLDE3MC41NCA4NzcuNTM0LDIyMy44MzEgJiN4ZDsmI3hhOyYjeDk7JiN4OTs4MTAuMDM2LDIyMy44MzEgNzc2LjI4OCwxNzAuNTQgODEwLjAzNiwxMTcuMjQ3ICYjeDk7IiBzdHJva2Utd2lkdGg9IjAuMjUiIH'+
			'N0cm9rZT0iIzcyNzE3NiIvPgogPC9nPgogPGcgb3BhY2l0eT0iMC41Ij4KICA8cG9seWdvbiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTU0LjUzNCw3LjUwMiAxODguMjgxLDYwLjc5NCAxNTQuNTM0LDExNC4wODcgJiN4ZDsmI3hhOyYjeDk7JiN4OTs4Ny4wMzYsMTE0LjA4NyA1My4yODgsNjAuNzk0IDg3LjAzNiw3LjUwMiAmI3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBzdHJva2U9IiM3MjcxNzYiLz4KICA8cG9seWdvbiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTU0LjUzNCwxMTcuMjQ3IDE4OC4yODEsMTcwLjU0IDE1NC41MzQsMjIzLjgzMSAmI3hkOyYjeGE7'+
			'JiN4OTsmI3g5Ozg3LjAzNiwyMjMuODMxIDUzLjI4OCwxNzAuNTQgODcuMDM2LDExNy4yNDcgJiN4OTsiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlPSIjNzI3MTc2Ii8+CiA8L2c+CiA8ZyBvcGFjaXR5PSIwLjY1Ij4KICA8cG9seWdvbiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNTE2LjIsOC4xNjggNTQ5Ljk0OCw2MS40NiA1MTYuMiwxMTQuNzUzICYjeGQ7JiN4YTsmI3g5OyYjeDk7NDQ4LjcwMiwxMTQuNzUzIDQxNC45NTQsNjEuNDYgNDQ4LjcwMiw4LjE2OCAmI3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBzdHJva2U9IiM3MjcxNzYiLz4KICA8cG9seWdvbiBzdHJva2UtbW'+
			'l0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNTE2LjIsMTE3LjkxMyA1NDkuOTQ4LDE3MS4yMDYgNTE2LjIsMjI0LjQ5NyAmI3hkOyYjeGE7JiN4OTsmI3g5OzQ0OC43MDIsMjI0LjQ5NyA0MTQuOTU0LDE3MS4yMDYgNDQ4LjcwMiwxMTcuOTEzICYjeDk7IiBzdHJva2Utd2lkdGg9IjAuMjUiIHN0cm9rZT0iIzcyNzE3NiIvPgogIDxwb2x5Z29uIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSI0MTMuNTI2LDYyLjE0MiA0NDcuMjc0LDExNS40MzQgNDEzLjUyNiwxNjguNzI1ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzQ2LjAyNywxNjguNzI1IDMxMi4yNzksMTE1LjQzNCAzNDYuMDI3LDYyLjE0MiAm'+
			'I3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBzdHJva2U9IiM3MjcxNzYiLz4KICA8cG9seWdvbiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNjE5LjE5Miw2Mi4yNTYgNjUyLjk0LDExNS41NDggNjE5LjE5MiwxNjguODQxICYjeGQ7JiN4YTsmI3g5OyYjeDk7NTUxLjY5NCwxNjguODQxIDUxNy45NDgsMTE1LjU0OCA1NTEuNjk0LDYyLjI1NiAmI3g5OyIgc3Ryb2tlLXdpZHRoPSIwLjI1IiBzdHJva2U9IiM3MjcxNzYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._svg_background_menu__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg Background_Menu";
		el.ggDx=15.5;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : -5px;';
		hs+='height : 72px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 305px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_background_menu.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._svg_background_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hide_elements.appendChild(me._svg_background_menu);
		el=me._infouser_data=document.createElement('div');
		els=me._infouser_data__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MzguNTMzcHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQzOC41MzMgNDM4LjUzMyIgeD0iMHB4IiBpZD0iQ2FwYV8xIiBoZWlnaHQ9IjQzOC41MzNweCIgdmlld0JveD0iMCAwIDQzOC41MzMgNDM4LjUzMyIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGc+CiAgPGNpcmNsZSBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHI9IjE3NS44OCIgY3k9IjIxOC41ODUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgY3g9IjIyMC40OTUiLz4KICA8cGF0aCBkPSJNMzkzLjk3NSwxMTkuNjUxYy0xNy44NjctMzAuNjEyLTQyLjEwNS01NC44NS03Mi43MTktNzIuNzE3Yy0zMC42'+
			'MTgtMTcuODY4LTY0LjA0My0yNi43OTktMTAwLjI5OS0yNi43OTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMzYuMjUxLDAtNjkuNjg2LDguOTMyLTEwMC4zLDI2Ljc5OWMtMzAuNjE0LDE3Ljg2NS01NC44NTIsNDIuMTAzLTcyLjcyLDcyLjcxN2MtMTcuODcsMzAuNjE2LTI2LjgwMSw2NC4wNTEtMjYuODAxLDEwMC4zMDEmI3hkOyYjeGE7JiN4OTsmI3g5O3M4LjkzNCw2OS42NzgsMjYuNzk4LDEwMC4yOTdjMTcuODY4LDMwLjYxMSw0Mi4xMDQsNTQuODQ5LDcyLjcyLDcyLjcxOWMzMC42MTYsMTcuODY3LDY0LjA0OCwyNi43OTksMTAwLjMsMjYuNzk5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMzYuMjUsMC'+
			'w2OS42ODctOC45MzIsMTAwLjMwMS0yNi43OTljMzAuNjEzLTE3Ljg2Myw1NC44NTItNDIuMTA3LDcyLjcxNi03Mi43MTljMTcuODY1LTMwLjYxNCwyNi43OTUtNjQuMDQ5LDI2Ljc5NS0xMDAuMjk3JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNDIwLjc2NywxODMuNjk5LDQxMS44MzUsMTUwLjI2MywzOTMuOTc1LDExOS42NTF6IE0xODcuNjUyLDcwLjA4NmMwLTIuNDMsMC43NzktNC40MjMsMi4zNDItNS45ODImI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjU2MS0xLjU2LDMuNTU4LTIuMzQzLDUuOTg0LTIuMzQzaDQ5Ljk1OGMyLjQyNSwwLDQuNDIzLDAuNzgzLDUuOTc3LDIuMzQzYzEuNTYxLDEuNTYsMi4z'+
			'NDUsMy41NTMsMi4zNDUsNS45ODJ2NDEuNjI5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwyLjQyOS0wLjc4NCw0LjQyNC0yLjM0NSw1Ljk4MWMtMS41NTQsMS41NjEtMy41NTIsMi4zNDEtNS45NzcsMi4zNDFoLTQ5Ljk1OGMtMi40MjcsMC00LjQyNC0wLjc4LTUuOTg0LTIuMzQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNTYzLTEuNTU3LTIuMzQyLTMuNTU0LTIuMzQyLTUuOTgxVjcwLjA4NkwxODcuNjUyLDcwLjA4NnogTTI4Ny41NiwzNDQuODM3YzAsMi40MjYtMC43ODUsNC40MjItMi4zNDEsNS45NzkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS41NTIsMS41NjMtMy41NTEsMi4zNDItNS45OCwyLj'+
			'M0MkgxNjIuNjc0Yy0yLjQzMSwwLTQuNDIzLTAuNzc5LTUuOTg0LTIuMzQyYy0xLjU2MS0xLjU1Ny0yLjM0LTMuNTUzLTIuMzQtNS45ODJ2LTQxLjYyOSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMi40MzMsMC43NzktNC40MjQsMi4zNC01Ljk4M2MxLjU2Mi0xLjU1OCwzLjU1Ni0yLjM0Miw1Ljk4NC0yLjM0MmgyNC45Nzh2LTgzLjI1NWgtMjQuOTc4Yy0yLjQzMSwwLTQuNDIyLTAuNzc5LTUuOTg0LTIuMzQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS41NjEtMS41Ni0yLjM0LTMuNTU1LTIuMzQtNS45ODV2LTQxLjYyN2MwLTIuNDI5LDAuNzc5LTQuNDIyLDIuMzQtNS45ODRjMS41NjMtMS41NjEsMy41'+
			'NTgtMi4zMzksNS45ODQtMi4zMzloODMuMjYzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMi40MjUsMCw0LjQyMywwLjc3OCw1Ljk3NywyLjMzOWMxLjU2MSwxLjU2MywyLjM0NSwzLjU1NSwyLjM0NSw1Ljk4NHYxMzMuMjExaDI0Ljk3MmMyLjQzMiwwLDQuNDI4LDAuNzc5LDUuOTg4LDIuMzM5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS41NTIsMS41NjEsMi4zMzgsMy41NTcsMi4zMzgsNS45ODR2NDEuNjNMMjg3LjU2LDM0NC44MzdMMjg3LjU2LDM0NC44Mzd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._infouser_data__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._infouser_data__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MzguNTMzcHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQzOC41MzMgNDM4LjUzMyIgeD0iMHB4IiBpZD0iQ2FwYV8xIiBoZWlnaHQ9IjQzOC41MzNweCIgdmlld0JveD0iMCAwIDQzOC41MzMgNDM4LjUzMyIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGc+CiAgPGNpcmNsZSBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHI9IjE5MyIgY3k9IjIxNy43NjciIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgY3g9IjIxOC43NjciLz4KICA8cGF0aCBkPSJNNDA5LjEzMywxMDkuMjAzYy0xOS42MDctMzMuNTkyLTQ2LjIwNS02MC4xODktNzkuNzk4LTc5Ljc5NkMyOTUuNzM1'+
			'LDkuODAxLDI1OS4wNTgsMCwyMTkuMjczLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMzkuNzgxLDAtNzYuNDcsOS44MDEtMTEwLjA2MywyOS40MDdjLTMzLjU5NSwxOS42MDQtNjAuMTkyLDQ2LjIwMS03OS44LDc5Ljc5NkM5LjgwMSwxNDIuOCwwLDE3OS40ODksMCwyMTkuMjY3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwzOS43OCw5LjgwNCw3Ni40NjIsMjkuNDA3LDExMC4wNjJjMTkuNjA3LDMzLjU5Miw0Ni4yMDQsNjAuMTg5LDc5Ljc5OSw3OS43OThjMzMuNTk3LDE5LjYwNSw3MC4yODMsMjkuNDA3LDExMC4wNjMsMjkuNDA3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMzkuNzgsMCw3Ni40Ny05LjgwMi'+
			'wxMTAuMDY1LTI5LjQwN2MzMy41OTMtMTkuNjAzLDYwLjE4OS00Ni4yMDYsNzkuNzk1LTc5Ljc5OGMxOS42MDQtMzMuNTk2LDI5LjQwMy03MC4yODQsMjkuNDAzLTExMC4wNjImI3hkOyYjeGE7JiN4OTsmI3g5O0M0MzguNTMzLDE3OS40ODUsNDI4LjczMiwxNDIuNzk1LDQwOS4xMzMsMTA5LjIwM3ogTTE4Mi43MjcsNTQuODEzYzAtMi42NjYsMC44NTUtNC44NTMsMi41Ny02LjU2NSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuNzEyLTEuNzExLDMuOTAzLTIuNTcsNi41NjctMi41N2g1NC44MmMyLjY2MiwwLDQuODUzLDAuODU5LDYuNTYxLDIuNTdjMS43MTEsMS43MTIsMi41NzIsMy44OTksMi41NzIs'+
			'Ni41NjV2NDUuNjgyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwyLjY2NC0wLjg2MSw0Ljg1NC0yLjU3Miw2LjU2NGMtMS43MDgsMS43MTItMy44OTgsMi41NjgtNi41NjEsMi41NjhoLTU0LjgyYy0yLjY2NCwwLTQuODU0LTAuODU2LTYuNTY3LTIuNTY4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNzE1LTEuNzA5LTIuNTctMy45LTIuNTctNi41NjRWNTQuODEzeiBNMjkyLjM1OCwzNTYuMzFjMCwyLjY2Mi0wLjg2Miw0Ljg1My0yLjU2OSw2LjU2MWMtMS43MDQsMS43MTQtMy44OTYsMi41Ny02LjU2MywyLjU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtIMTU1LjMxN2MtMi42NjcsMC00Ljg1NC0wLjg1Ni02Lj'+
			'U2Ny0yLjU3Yy0xLjcxMi0xLjcwOC0yLjU2OC0zLjg5OC0yLjU2OC02LjU2NHYtNDUuNjgyYzAtMi42NywwLjg1Ni00Ljg1NCwyLjU2OC02LjU2NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuNzEzLTEuNzA5LDMuOTAzLTIuNTcsNi41NjctMi41N2gyNy40MXYtOTEuMzU4aC0yNy40MWMtMi42NjcsMC00Ljg1My0wLjg1NS02LjU2Ny0yLjU2OGMtMS43MTItMS43MTEtMi41NjgtMy45MDEtMi41NjgtNi41NjcmI3hkOyYjeGE7JiN4OTsmI3g5O3YtNDUuNjc5YzAtMi42NjYsMC44NTYtNC44NTMsMi41NjgtNi41NjdjMS43MTUtMS43MTMsMy45MDUtMi41NjgsNi41NjctMi41NjhoOTEuMzY4YzIuNjYy'+
			'LDAsNC44NTMsMC44NTUsNi41NjEsMi41NjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjcxMSwxLjcxNCwyLjU3MiwzLjkwMSwyLjU3Miw2LjU2N3YxNDYuMTc5aDI3LjQwMWMyLjY2OSwwLDQuODU5LDAuODU0LDYuNTcsMi41NjVjMS43MDQsMS43MTMsMi41NjUsMy45MDEsMi41NjUsNi41Njd2NDUuNjgzJiN4ZDsmI3hhOyYjeDk7JiN4OTtIMjkyLjM1OEwyOTIuMzU4LDM1Ni4zMXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._infouser_data__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="info-User data";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : -1px;';
		hs+='cursor : pointer;';
		hs+='height : 31px;';
		hs+='left : -96px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 31px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._infouser_data.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._infouser_data.onclick=function (e) {
			me._userdata.ggVisible = !me._userdata.ggVisible;
			var flag=me._userdata.ggVisible;
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility=((flag)&&(Number(me._userdata.style.opacity)>0||!me._userdata.style.opacity))?'inherit':'hidden';
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
		}
		me._infouser_data.onmouseover=function (e) {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility=(Number(me._tt_info.style.opacity)>0||!me._tt_info.style.opacity)?'inherit':'hidden';
			me._tt_info.ggVisible=true;
			me._infouser_data__img.style.visibility='hidden';
			me._infouser_data__imgo.style.visibility='inherit';
			me.elementMouseOver['infouser_data']=true;
			me._tt_info.logicBlock_visible();
		}
		me._infouser_data.onmouseout=function (e) {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility='hidden';
			me._tt_info.ggVisible=false;
			me._infouser_data__img.style.visibility='inherit';
			me._infouser_data__imgo.style.visibility='hidden';
			me.elementMouseOver['infouser_data']=false;
			me._tt_info.logicBlock_visible();
		}
		me._infouser_data.ontouchend=function (e) {
			me.elementMouseOver['infouser_data']=false;
			me._tt_info.logicBlock_visible();
		}
		me._infouser_data.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_info=document.createElement('div');
		els=me._tt_info__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -36px;';
		hs+='position : absolute;';
		hs+='top : 33px;';
		hs+='visibility : hidden;';
		hs+='width : 102px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 102px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Information";
		el.appendChild(els);
		me._tt_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['infouser_data'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_info.style[domTransition]='';
				if (me._tt_info.ggCurrentLogicStateVisible == 0) {
					me._tt_info.style.visibility=(Number(me._tt_info.style.opacity)>0||!me._tt_info.style.opacity)?'inherit':'hidden';
					me._tt_info.ggVisible=true;
				}
				else {
					me._tt_info.style.visibility="hidden";
					me._tt_info.ggVisible=false;
				}
			}
		}
		me._tt_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_info_white=document.createElement('div');
		els=me._tt_info_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 102px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 102px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Information";
		el.appendChild(els);
		me._tt_info_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_info_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_info.appendChild(me._tt_info_white);
		me._infouser_data.appendChild(me._tt_info);
		me._hide_elements.appendChild(me._infouser_data);
		el=me._google_map=document.createElement('div');
		els=me._google_map__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDkwIDYxMiA2MTIiIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNjEycHgiIHZpZXdCb3g9IjAgOTAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGNpcmNsZSByPSIyNzcuNSIgY3k9IjM5NiIgZmlsbD0iIzAyMDIwMiIgY3g9IjMwNyIvPgogPHBhdGggZD0iTTQ3NS41MzMsMjc5LjIyMmMwLTQ4Ljk2My0zOC4wMTItODguNjE1LTg0Ljk0Ny04OC42MTVjLTM4LjExMywwLTcwLjMzOSwyNi4xNDMtODEuMTA5LDYyLjE4NUgxNzMuNzg3JiN4ZDsmI3hhOyYjeDk7Yy0xNC44MTEsMC0yNi43MDgsMTIuMDI1LTI2'+
			'LjcwOCwyNi43MjV2MjY1LjQyM2MwLDE0LjgxOCwxMi4wMTgsMjYuNzI1LDI2LjcwOCwyNi43MjVoMjY1LjI1MiYjeGQ7JiN4YTsmI3g5O2MxNC44MTMsMCwyNi43MDgtMTIuMDI2LDI2LjcwOC0yNi43MjVWMzI1LjMwNEM0NzEuNzg2LDMxMS45NjcsNDc1LjUzMywyOTcuMDUsNDc1LjUzMywyNzkuMjIyeiIgZmlsbD0iI0ZGRkZGRiIvPgogPHBhdGggZD0iTTQzMi41OTcsMjU3LjI4N0gxODIuNDU0Yy0xMy45NjYsMC0yNS4xODUsMTEuMzMzLTI1LjE4NSwyNS4xODZ2MjUwLjE0MyYjeGQ7JiN4YTsmI3g5O2MwLDEzLjk2NiwxMS4zMzMsMjUuMTg1LDI1LjE4NSwyNS4xODVoMjUwLjE0M2MxMy45Nj'+
			'YsMCwyNS4xODYtMTEuMzM0LDI1LjE4Ni0yNS4xODVWMjgyLjQ3MyYjeGQ7JiN4YTsmI3g5O0M0NTcuNzgyLDI2OC41MDYsNDQ2LjU2MywyNTcuMjg3LDQzMi41OTcsMjU3LjI4N3oiIGZpbGw9IiNDQ0NDQ0MiLz4KIDxwYXRoIGQ9Ik0xOTcuNzc0LDMyNS41MzZsNDMuNTE5LTY4Ljk0NEgxNzcuNjdjLTE0LjQyNywwLTI2LjEzNSwxMS43MDgtMjYuMTM1LDI2LjEzNnYzOS42MTZ2Ny4wOTZ2MTE1Ljg5MiYjeGQ7JiN4YTsmI3g5O2w0Ny42NTgsMzQuNTMybDkxLjQxMy0xNDcuNzA2TDE5Ny43NzQsMzI1LjUzNnoiIGZpbGw9IiM4MjgyODIiLz4KIDxwYXRoIGQ9Ik00NDUuNjQzLDI1OC40ODR2MjYu'+
			'OTYzbC0xNDIuNjIsMjQ0LjkxMWwtMTUxLjYwNS04NC40MzZ2OTUuMDc5YzAsMTQuNDI4LDExLjcwNywyNi4xMzUsMjYuMTM0LDI2LjEzNSYjeGQ7JiN4YTsmI3g5O2gyNTguMjc3YzE0LjQyNywwLDI2LjEzNC0xMS43MDcsMjYuMTM0LTI2LjEzNVYyODIuNjA4QzQ2MS45NjIsMjcxLjcyOSw0NTUuMjIxLDI2Mi4zODcsNDQ1LjY0MywyNTguNDg0eiIgZmlsbD0iIzVFNUU1RSIvPgogPHBvbHlnb24gcG9pbnRzPSI0NjEuOTYyLDMzMi41MTQgMjA0LjI3OSwzMjMuNjQ0IDI0Ni4xNDEsMjU2LjU5MiAyMzEuNzE0LDI1Ni41OTIgMTkwLjA4OCwzMjMuMTcyIDE1MS41MzUsMzIxLjg3MSAmI3hkOyYjeG'+
			'E7JiN4OTsxNTEuNTM1LDMzNC4xNyAyNzkuOTYzLDMzOC41NDUgMjQ5LjMzNCwzODcuNzQgMjExLjM3NCwzNjMuNDk3IDIwNC44NywzNzMuOTA0IDI0Mi44MywzOTguMTQ2IDE5Ni4xMTksNDczLjI0IDIwNi41MjUsNDc5Ljc0NCAmI3hkOyYjeGE7JiN4OTsyOTQuMTU0LDMzOS4wMTggNDYxLjk2MiwzNDQuODEzICIgZmlsbD0iI0ZGRkZGRiIvPgogPHBhdGggZD0iTTQ0MC41NTcsMjU3LjA2NUwyOTUuMTAxLDUxNS4zNDFsLTE0My41NjUtODEuMDA4djI4LjE0N2wxMzEuNjIyLDc0LjE0NmwtMTcuMTQ3LDMwLjM5M2gyOC4xNDUmI3hkOyYjeGE7JiN4OTtsMTAuMjg5LTE4LjMzbDMyLjY0LDE4LjMz'+
			'aDUwLjAyMmwtNzAuNi0zOS43MzZsMTQzLjQ0Ny0yNTQuNzI2QzQ1Ni42NDIsMjY0LjUxNiw0NDkuMzA5LDI1OC42MDMsNDQwLjU1NywyNTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgogPHBhdGggZD0iTTM5MC41NTMsMTk0LjEwOWMtNDQuOTMsMC04MS4zMTUsMzguNDE2LTgxLjMxNSw4NS44NTVjMCw2Ny4yNzMsNTQuMTU0LDkxLjc1Miw4MS4zMTUsMTQ5LjE5OSYjeGQ7JiN4YTsmI3g5O2MyNy4xNjMtNTcuNDQ3LDgxLjMxNi04Mi4wMTUsODEuMzE2LTE0OS4xOTlDNDcxLjg2OSwyMzIuNTI1LDQzNS40ODIsMTk0LjEwOSwzOTAuNTUzLDE5NC4xMDl6IiBmaWxsPSIjRkY1NzU3Ii8+CiA8Y2lyY2'+
			'xlIHI9IjQxLjc0MiIgY3k9IjI3My41NiIgZmlsbD0iI0ZGRkZGRiIgY3g9IjM5MS43MTgiLz4KPC9zdmc+Cg==';
		me._google_map__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._google_map__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDkwIDYxMiA2MTIiIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNjEycHgiIHZpZXdCb3g9IjAgOTAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGNpcmNsZSByPSIzMDYiIGN5PSIzOTYiIGZpbGw9IiMwMjAyMDIiIGN4PSIzMDYiLz4KIDxwYXRoIGQ9Ik00OTEuODQxLDI2Ny4yMjljMC01My45OTItNDEuOTE0LTk3LjcxNi05My42NzEtOTcuNzE2Yy00Mi4wMjYsMC03Ny41NjIsMjguODI3LTg5LjQzOSw2OC41NzFIMTU5LjEwNiYjeGQ7JiN4YTsmI3g5O2MtMTYuMzMyLDAtMjkuNDUxLDEzLjI2LTI5LjQ1'+
			'MSwyOS40Njl2MjkyLjY4M2MwLDE2LjM0MSwxMy4yNTIsMjkuNDY5LDI5LjQ1MSwyOS40NjloMjkyLjQ5NWMxNi4zMzIsMCwyOS40NS0xMy4yNjIsMjkuNDUtMjkuNDY5JiN4ZDsmI3hhOyYjeDk7VjMxOC4wNDNDNDg3LjcxLDMwMy4zMzYsNDkxLjg0MSwyODYuODg3LDQ5MS44NDEsMjY3LjIyOXoiIGZpbGw9IiNGRkZGRkYiLz4KIDxwYXRoIGQ9Ik00NDQuNDk1LDI0My4wNDFIMTY4LjY2M2MtMTUuNCwwLTI3Ljc3MiwxMi40OTgtMjcuNzcyLDI3Ljc3MnYyNzUuODMzYzAsMTUuNCwxMi40OTgsMjcuNzcxLDI3Ljc3MiwyNy43NzEmI3hkOyYjeGE7JiN4OTtoMjc1LjgzMmMxNS40LDAsMjcuNzcyLT'+
			'EyLjQ5NywyNy43NzItMjcuNzcxVjI3MC44MTNDNDcyLjI2OCwyNTUuNDEzLDQ1OS44OTYsMjQzLjA0MSw0NDQuNDk1LDI0My4wNDF6IiBmaWxsPSIjQ0NDQ0NDIi8+CiA8cGF0aCBkPSJNMTg1LjU1NiwzMTguM2w0Ny45ODktNzYuMDI1aC03MC4xNThjLTE1LjkwOSwwLTI4LjgxOSwxMi45MS0yOC44MTksMjguODE5djQzLjY4NXY3LjgyNXYxMjcuNzk1JiN4ZDsmI3hhOyYjeDk7bDUyLjU1MywzOC4wNzlsMTAwLjgwMS0xNjIuODc1TDE4NS41NTYsMzE4LjN6IiBmaWxsPSIjODI4MjgyIi8+CiA8cGF0aCBkPSJNNDU4Ljg4MiwyNDQuMzYxdjI5LjczMkwzMDEuNjE1LDU0NC4xNThMMTM0LjQzOSw0'+
			'NTEuMDV2MTA0Ljg0NWMwLDE1LjkwOSwxMi45MDksMjguODE4LDI4LjgxOCwyOC44MTgmI3hkOyYjeGE7JiN4OTtoMjg0LjgwMmMxNS45MDksMCwyOC44MTgtMTIuOTA5LDI4LjgxOC0yOC44MThWMjcwLjk2M0M0NzYuODc3LDI1OC45NjYsNDY5LjQ0MywyNDguNjY1LDQ1OC44ODIsMjQ0LjM2MXoiIGZpbGw9IiM1RTVFNUUiLz4KIDxwb2x5Z29uIHBvaW50cz0iNDc2Ljg3NywzMjUuOTkzIDE5Mi43MjksMzE2LjIxMyAyMzguODkxLDI0Mi4yNzQgMjIyLjk4MiwyNDIuMjc0IDE3Ny4wODEsMzE1LjY5MiAxMzQuNTY4LDMxNC4yNTcgJiN4ZDsmI3hhOyYjeDk7MTM0LjU2OCwzMjcuODIgMjc2LjE4Ni'+
			'wzMzIuNjQ1IDI0Mi40MTIsMzg2Ljg5MiAyMDAuNTUzLDM2MC4xNTkgMTkzLjM4LDM3MS42MzQgMjM1LjI0LDM5OC4zNjcgMTgzLjczMSw0ODEuMTc0IDE5NS4yMDcsNDg4LjM0NiAmI3hkOyYjeGE7JiN4OTsyOTEuODM1LDMzMy4xNjYgNDc2Ljg3NywzMzkuNTU2ICIgZmlsbD0iI0ZGRkZGRiIvPgogPHBhdGggZD0iTTQ1My4yNzMsMjQyLjc5NkwyOTIuODc4LDUyNy41OThsLTE1OC4zMS04OS4zMjd2MzEuMDM3bDE0NS4xMzksODEuNzYybC0xOC45MDgsMzMuNTE1aDMxLjAzNiYjeGQ7JiN4YTsmI3g5O2wxMS4zNDUtMjAuMjEzbDM1Ljk5MiwyMC4yMTNoNTUuMTZsLTc3Ljg1MS00My44MTdMNDc0'+
			'LjY2LDI1OS44NzlDNDcxLjAxLDI1MS4wMTIsNDYyLjkyNCwyNDQuNDkyLDQ1My4yNzMsMjQyLjc5NnoiIGZpbGw9IiNGRkZGRkYiLz4KIDxwYXRoIGQ9Ik0zOTguMTM0LDE3My4zNzRjLTQ5LjU0NCwwLTg5LjY2Nyw0Mi4zNjEtODkuNjY3LDk0LjY3M2MwLDc0LjE4Myw1OS43MTYsMTAxLjE3NSw4OS42NjcsMTY0LjUyMSYjeGQ7JiN4YTsmI3g5O2MyOS45NTMtNjMuMzQ2LDg5LjY2OC05MC40MzgsODkuNjY4LTE2NC41MjFDNDg3LjgwMiwyMTUuNzM1LDQ0Ny42NzksMTczLjM3NCwzOTguMTM0LDE3My4zNzR6IiBmaWxsPSIjRkY1NzU3Ii8+CiA8Y2lyY2xlIHI9IjQ2LjAyOSIgY3k9IjI2MC45OD'+
			'UiIGZpbGw9IiNGRkZGRkYiIGN4PSIzOTkuNDE5Ii8+Cjwvc3ZnPgo=';
		me._google_map__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="Google Map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 31px;';
		hs+='left : 128px;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 31px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._google_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._google_map.onclick=function (e) {
			me._maps_google.ggVisible = !me._maps_google.ggVisible;
			var flag=me._maps_google.ggVisible;
			me._maps_google.style[domTransition]='none';
			me._maps_google.style.visibility=((flag)&&(Number(me._maps_google.style.opacity)>0||!me._maps_google.style.opacity))?'inherit':'hidden';
		}
		me._google_map.onmouseover=function (e) {
			me._google_map__img.style.visibility='hidden';
			me._google_map__imgo.style.visibility='inherit';
			me.elementMouseOver['google_map']=true;
			me._tt_map.logicBlock_visible();
		}
		me._google_map.onmouseout=function (e) {
			me._google_map__img.style.visibility='inherit';
			me._google_map__imgo.style.visibility='hidden';
			me.elementMouseOver['google_map']=false;
			me._tt_map.logicBlock_visible();
		}
		me._google_map.ontouchend=function (e) {
			me.elementMouseOver['google_map']=false;
			me._tt_map.logicBlock_visible();
		}
		me._google_map.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_map=document.createElement('div');
		els=me._tt_map__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_Map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -37px;';
		hs+='position : absolute;';
		hs+='top : 31px;';
		hs+='visibility : hidden;';
		hs+='width : 105px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Map Google";
		el.appendChild(els);
		me._tt_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_map.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['google_map'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_map.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_map.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_map.style[domTransition]='';
				if (me._tt_map.ggCurrentLogicStateVisible == 0) {
					me._tt_map.style.visibility=(Number(me._tt_map.style.opacity)>0||!me._tt_map.style.opacity)?'inherit':'hidden';
					me._tt_map.ggVisible=true;
				}
				else {
					me._tt_map.style.visibility="hidden";
					me._tt_map.ggVisible=false;
				}
			}
		}
		me._tt_map.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((103-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		el=me._tt_map_white=document.createElement('div');
		els=me._tt_map_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_Map_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 105px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 105px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Map Google";
		el.appendChild(els);
		me._tt_map_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_map_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_map.appendChild(me._tt_map_white);
		me._google_map.appendChild(me._tt_map);
		me._hide_elements.appendChild(me._google_map);
		el=me._button_fullscreen=document.createElement('div');
		el.ggId="button_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -48px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_fullscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._button_image_normalscreen=document.createElement('div');
		els=me._button_image_normalscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxyZWN0IHdpZHRoPSIzMi4xIiB4PSItMjA2LjIiIGhlaWdodD0iMjIuMiIgeT0iMzk3IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTExOC45LDM2Ni0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE2OC42LDQyMC4zYzAsMi4zLTEuOSw0LjItNC4yLDQuMmgtMzQuNWMtMi4zLDAtNC4yLTEuOS00LjItNC4ydi0yNC41YzAtMi4zLDEuOS00LjIsNC4yLTQu'+
			'MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtoMzQuNWMyLjMsMCw0LjIsMS45LDQuMiw0LjJMLTE2OC42LDQyMC4zTC0xNjguNiw0MjAuM3ogTS0xMzYuOCwzNzIuNmwtMTcuNSwxMi42Yy0wLjEsMC0wLjEsMC4xLTAuMiwwLjFsMC43LDAuOWwzLjMsNC43JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjIsMC4zLDAuMiwwLjUsMC4xLDAuOWMtMC4yLDAuNC0wLjUsMC41LTAuOCwwLjVsLTE2LjIsMC4xYy0wLjQsMC0wLjYtMC4xLTAuOC0wLjRjLTAuMi0wLjItMC4yLTAuNS0wLjEtMC44bDUuMi0xNS40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjEtMC4zLDAuNC0wLjYsMC44LTAuNmMwLj'+
			'QsMCwwLjcsMC4xLDAuOSwwLjNsMy4zLDQuNmwwLjYsMC44YzAsMCwwLjEtMC4xLDAuMS0wLjFsMTcuNS0xMi42YzAuNy0wLjUsMS42LTAuMywyLjEsMC40bDEuNCwxLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzUuOSwzNzEuMi0xMzYuMSwzNzIuMS0xMzYuOCwzNzIuNnoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTM2LjQsMzcwLjVsLTEuNC0xLjljLTAuNS0wLjctMS41LTAuOC0yLjEtMC40bC0xNy41LDEyLjZjLTAuMSwwLTAuMSwwLjEtMC4xLDAuMWwtMC42LTAuOGwtMy4zLTQuNiYjeGQ7JiN4YTsm'+
			'I3g5OyYjeDk7JiN4OTtjLTAuMi0wLjMtMC40LTAuNC0wLjktMC4zYy0wLjQsMC0wLjcsMC4zLTAuOCwwLjZsLTUuMiwxNS40Yy0wLjEsMC4zLTAuMSwwLjYsMC4xLDAuOGMwLjIsMC4zLDAuNCwwLjQsMC44LDAuNGwxNi4yLTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC43LTAuMSwwLjgtMC41YzAuMi0wLjQsMC4yLTAuNi0wLjEtMC45bC0zLjMtNC43bC0wLjctMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxNy41LTEyLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzYuMSwzNzIuMS0xMzUuOSwzNzEuMi0xMzYuNCwzNzAuNXoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPH'+
			'BhdGggZD0iTS0xNzIuOCwzOTEuNmgtMzQuNWMtMi4zLDAtNC4yLDEuOS00LjIsNC4ydjI0LjVjMCwyLjMsMS45LDQuMiw0LjIsNC4yaDM0LjVjMi4zLDAsNC4yLTEuOSw0LjItNC4ydi0yNC41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTY4LjYsMzkzLjUtMTcwLjUsMzkxLjYtMTcyLjgsMzkxLjZ6IE0tMTc0LDQxOS4yaC0zMi4xVjM5N2gzMi4xVjQxOS4yeiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_image_normalscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_normalscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxyZWN0IHdpZHRoPSIzNS43IiB4PSItMjA5LjYiIGhlaWdodD0iMjQuNiIgeT0iMzk3IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNGMzNC40LDAsNjIuNC0yNy45LDYyLjQtNjIuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNjcuOSw0MjIuOWMwLDIuNi0yLjEsNC43LTQuNyw0LjdoLTM4LjNjLTIuNiwwLTQuNy0yLjEtNC43LTQuN3YtMjcuMiYjeGQ7JiN4YTsm'+
			'I3g5OyYjeDk7JiN4OTtjMC0yLjYsMi4xLTQuNyw0LjctNC43aDM4LjNjMi42LDAsNC43LDIuMSw0LjcsNC43TC0xNjcuOSw0MjIuOUwtMTY3LjksNDIyLjl6IE0tMTMyLjUsMzY5LjlsLTE5LjUsMTRjLTAuMSwwLTAuMSwwLjEtMC4yLDAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsMC43LDFsMy43LDUuMmMwLjIsMC4zLDAuMiwwLjYsMC4xLDFjLTAuMiwwLjQtMC41LDAuNi0wLjksMC42bC0xOCwwLjFjLTAuNCwwLTAuNy0wLjEtMC45LTAuNGMtMC4yLTAuMy0wLjItMC41LTAuMS0wLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDUuOC0xNy4xYzAuMS0wLjQsMC40LTAuNywwLjgtMC43Yz'+
			'AuNSwwLDAuNywwLjEsMSwwLjRsMy42LDUuMWwwLjcsMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxOS41LTE0YzAuOC0wLjUsMS44LTAuNCwyLjQsMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wxLjUsMi4xQy0xMzEuNiwzNjguMy0xMzEuOCwzNjkuNC0xMzIuNSwzNjkuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTMyLjEsMzY3LjVsLTEuNS0yLjFjLTAuNS0wLjgtMS42LTAuOS0yLjQtMC40bC0xOS41LDE0Yy0wLjEsMC0wLjEsMC4xLTAuMiwwLjFsLTAuNy0wLjlsLTMuNi01LjEmI3hkOyYjeGE7JiN4'+
			'OTsmI3g5OyYjeDk7Yy0wLjItMC4zLTAuNS0wLjQtMS0wLjRjLTAuNSwwLTAuNywwLjMtMC44LDAuN2wtNS44LDE3LjFjLTAuMSwwLjQtMC4xLDAuNywwLjEsMC45YzAuMiwwLjMsMC41LDAuNCwwLjksMC40bDE4LTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC44LTAuMiwwLjktMC42YzAuMi0wLjQsMC4yLTAuNy0wLjEtMWwtMy43LTUuMmwtMC43LTFjMC4xLDAsMC4xLTAuMSwwLjItMC4xbDE5LjUtMTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzEuOCwzNjkuNC0xMzEuNiwzNjguMy0xMzIuMSwzNjcuNXoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNz'+
			'IuNiwzOTFoLTM4LjNjLTIuNiwwLTQuNywyLjEtNC43LDQuN3YyNy4yYzAsMi42LDIuMSw0LjcsNC43LDQuN2gzOC4zYzIuNiwwLDQuNy0yLjEsNC43LTQuN3YtMjcuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE2Ny45LDM5My4xLTE3MCwzOTEtMTcyLjYsMzkxeiBNLTE3My45LDQyMS42aC0zNS43VjM5N2gzNS43VjQyMS42eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_image_normalscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_normalscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_normalscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_normalscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_image_normalscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_image_normalscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_image_normalscreen.style[domTransition]='';
				if (me._button_image_normalscreen.ggCurrentLogicStateVisible == 0) {
					me._button_image_normalscreen.style.visibility=(Number(me._button_image_normalscreen.style.opacity)>0||!me._button_image_normalscreen.style.opacity)?'inherit':'hidden';
					me._button_image_normalscreen.ggVisible=true;
				}
				else {
					me._button_image_normalscreen.style.visibility="hidden";
					me._button_image_normalscreen.ggVisible=false;
				}
			}
		}
		me._button_image_normalscreen.onclick=function (e) {
			player.exitFullscreen();
		}
		me._button_image_normalscreen.onmouseover=function (e) {
			me._button_image_normalscreen__img.style.visibility='hidden';
			me._button_image_normalscreen__imgo.style.visibility='inherit';
			me.elementMouseOver['button_image_normalscreen']=true;
			me._tt_exit_fullscreen.logicBlock_visible();
		}
		me._button_image_normalscreen.onmouseout=function (e) {
			me._button_image_normalscreen__img.style.visibility='inherit';
			me._button_image_normalscreen__imgo.style.visibility='hidden';
			me.elementMouseOver['button_image_normalscreen']=false;
			me._tt_exit_fullscreen.logicBlock_visible();
		}
		me._button_image_normalscreen.ontouchend=function (e) {
			me.elementMouseOver['button_image_normalscreen']=false;
			me._tt_exit_fullscreen.logicBlock_visible();
		}
		me._button_image_normalscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_exit_fullscreen=document.createElement('div');
		els=me._tt_exit_fullscreen__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_exit_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -45px;';
		hs+='position : absolute;';
		hs+='top : 33px;';
		hs+='visibility : hidden;';
		hs+='width : 122px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Exit Fullscreen";
		el.appendChild(els);
		me._tt_exit_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_exit_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['button_image_normalscreen'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_exit_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_exit_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_exit_fullscreen.style[domTransition]='';
				if (me._tt_exit_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._tt_exit_fullscreen.style.visibility=(Number(me._tt_exit_fullscreen.style.opacity)>0||!me._tt_exit_fullscreen.style.opacity)?'inherit':'hidden';
					me._tt_exit_fullscreen.ggVisible=true;
				}
				else {
					me._tt_exit_fullscreen.style.visibility="hidden";
					me._tt_exit_fullscreen.ggVisible=false;
				}
			}
		}
		me._tt_exit_fullscreen.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((120-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		el=me._tt_exit_fullscreen_white=document.createElement('div');
		els=me._tt_exit_fullscreen_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_exit_fullscreen_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 122px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Exit Fullscreen";
		el.appendChild(els);
		me._tt_exit_fullscreen_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_exit_fullscreen_white.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((120-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._tt_exit_fullscreen.appendChild(me._tt_exit_fullscreen_white);
		me._button_image_normalscreen.appendChild(me._tt_exit_fullscreen);
		me._button_fullscreen.appendChild(me._button_image_normalscreen);
		el=me._button_image_fullscreen=document.createElement('div');
		els=me._button_image_fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMjA2LjIsNDE5LjJoNjIuM3YtNDQuM2gtNjIuM1Y0MTkuMnogTS0xNzguOSwzOTcuM2MwLDAsMTcuNy0xMi43LDE3LjctMTIuN2wtNC01LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjItMC4zLTAuMi0wLjUtMC4xLTAuOWMwLjItMC40LDAuNS0wLjUsMC44LTAuNWwxNi4yLTAuMWMwLjQsMCwwLjYsMC4xLDAuOCwwLjRjMC4yLDAuMiwwLjIsMC41LDAuMSwwLjhsLTUuMiwxNS40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4xLDAuMy0wLjQsMC42LTAuOCwwLjZjLTAuNCwwLTAuNy0wLjEtMC45LTAuM2wtMy45LTUuNGMwLDAt'+
			'MTcuNywxMi43LTE3LjcsMTIuN2MtMC43LDAuNS0xLjYsMC4zLTIuMS0wLjRsLTEuNC0xLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNzkuNywzOTguOC0xNzkuNSwzOTcuOC0xNzguOSwzOTcuM3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtTLTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTM4LjQsNDIwLjNjMCwyLjMtMS45LDQuMi00LjIsNC4yaC02NC43Yy0yLjMsMC00LjItMS45LTQuMi'+
			'00LjJ2LTQ2LjdjMC0yLjMsMS45LTQuMiw0LjItNC4yaDY0LjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuMywwLDQuMiwxLjksNC4yLDQuMlY0MjAuM3oiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNDcuNCwzNzcuOWMtMC4yLTAuMy0wLjQtMC40LTAuOC0wLjRsLTE2LjIsMC4xYy0wLjQsMC0wLjcsMC4xLTAuOCwwLjVjLTAuMiwwLjQtMC4yLDAuNiwwLjEsMC45bDQsNS42JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMSwwLTE3LjcsMTIuNy0xNy43LDEyLjdjLTAuNywwLjUtMC44LDEuNS0wLjQsMi4xbDEuNCwxLjljMC41'+
			'LDAuNywxLjUsMC44LDIuMSwwLjRjMCwwLDE3LjYtMTIuNywxNy43LTEyLjdsMy45LDUuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjMsMC40LDAuNCwwLjksMC4zYzAuNCwwLDAuNy0wLjMsMC44LTAuNmw1LjItMTUuNEMtMTQ3LjIsMzc4LjQtMTQ3LjIsMzc4LjEtMTQ3LjQsMzc3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTS0xNDIuNyw0MjQuNmgtNjQuN2MtMi4zLDAtNC4yLTEuOS00LjItNC4ydi00Ni43YzAtMi4zLDEuOS00LjIsNC4yLTQuMmg2NC43YzIuMywwLDQuMiwxLjksNC4yLDQuMnY0Ni43JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTEzOC40LDQyMi43LTE0MC4zLD'+
			'QyNC42LTE0Mi43LDQyNC42eiBNLTIwNi4yLDQxOS4yaDYyLjN2LTQ0LjNoLTYyLjNWNDE5LjJ6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_fullscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_fullscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMjA5LjYsNDIxLjZoNjkuM3YtNDkuM2gtNjkuM1Y0MjEuNnogTS0xNzkuMywzOTcuNGMwLDAsMTkuNi0xNC4xLDE5LjctMTQuMWwtNC41LTYuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMi0wLjMtMC4yLTAuNi0wLjEtMWMwLjItMC40LDAuNS0wLjYsMC45LTAuNmwxOC0wLjFjMC40LDAsMC43LDAuMSwwLjksMC40YzAuMiwwLjMsMC4yLDAuNSwwLjEsMC45bC01LjgsMTcuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMSwwLjQtMC40LDAuNy0wLjgsMC43Yy0wLjUsMC0wLjctMC4xLTEtMC40bC00LjMtNmMtMC4xLDAuMS0x'+
			'OS43LDE0LjEtMTkuNywxNC4xYy0wLjgsMC41LTEuOCwwLjQtMi40LTAuNGwtMS41LTIuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE4MC4yLDM5OS0xODAsMzk3LjktMTc5LjMsMzk3LjR6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNHMyNy45LDYyLjQsNjIuNCw2Mi40YzM0LjQsMCw2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNC40LDQyMi45YzAsMi42LTIuMSw0LjctNC43LDQuN2gtNzEuOGMtMi42LDAtNC43LTIuMS00Lj'+
			'ctNC43di01MS44YzAtMi42LDIuMS00LjcsNC43LTQuN2g3MS44JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MyLjYsMCw0LjcsMi4xLDQuNyw0LjdWNDIyLjl6IiBmaWxsPSIjMDAwMDAwIi8+CiAgPC9nPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTQ0LjMsMzc1LjhjLTAuMi0wLjMtMC41LTAuNC0wLjktMC40bC0xOCwwLjFjLTAuNCwwLTAuOCwwLjItMC45LDAuNmMtMC4yLDAuNC0wLjIsMC43LDAuMSwxbDQuNSw2LjImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xLDAtMTkuNywxNC4xLTE5LjcsMTQuMWMtMC44LDAuNS0wLjksMS42LTAuNCwyLjRsMS41LDIuMWMwLjUs'+
			'MC44LDEuNiwwLjksMi40LDAuNGMwLDAsMTkuNi0xNC4xLDE5LjctMTQuMWw0LjMsNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjMsMC41LDAuNCwxLDAuNGMwLjUsMCwwLjctMC4zLDAuOC0wLjdsNS44LTE3LjFDLTE0NC4xLDM3Ni4zLTE0NC4xLDM3Ni0xNDQuMywzNzUuOHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8cGF0aCBkPSJNLTEzOS4xLDQyNy42aC03MS44Yy0yLjYsMC00LjctMi4xLTQuNy00Ljd2LTUxLjhjMC0yLjYsMi4xLTQuNyw0LjctNC43aDcxLjhjMi42LDAsNC43LDIuMSw0LjcsNC43djUxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTM0LjQsNDI1LjUtMTM2LjUsNDI3LjYtMT'+
			'M5LjEsNDI3LjZ6IE0tMjA5LjYsNDIxLjZoNjkuM3YtNDkuM2gtNjkuM1Y0MjEuNnoiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_image_fullscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_image_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_image_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_image_fullscreen.style[domTransition]='';
				if (me._button_image_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._button_image_fullscreen.style.visibility="hidden";
					me._button_image_fullscreen.ggVisible=false;
				}
				else {
					me._button_image_fullscreen.style.visibility=(Number(me._button_image_fullscreen.style.opacity)>0||!me._button_image_fullscreen.style.opacity)?'inherit':'hidden';
					me._button_image_fullscreen.ggVisible=true;
				}
			}
		}
		me._button_image_fullscreen.onclick=function (e) {
			player.enterFullscreen();
		}
		me._button_image_fullscreen.onmouseover=function (e) {
			me._button_image_fullscreen__img.style.visibility='hidden';
			me._button_image_fullscreen__imgo.style.visibility='inherit';
			me.elementMouseOver['button_image_fullscreen']=true;
			me._tt_enter_fullscreen.logicBlock_visible();
		}
		me._button_image_fullscreen.onmouseout=function (e) {
			me._button_image_fullscreen__img.style.visibility='inherit';
			me._button_image_fullscreen__imgo.style.visibility='hidden';
			me.elementMouseOver['button_image_fullscreen']=false;
			me._tt_enter_fullscreen.logicBlock_visible();
		}
		me._button_image_fullscreen.ontouchend=function (e) {
			me.elementMouseOver['button_image_fullscreen']=false;
			me._tt_enter_fullscreen.logicBlock_visible();
		}
		me._button_image_fullscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_enter_fullscreen=document.createElement('div');
		els=me._tt_enter_fullscreen__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_enter_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -31px;';
		hs+='position : absolute;';
		hs+='top : 33px;';
		hs+='visibility : hidden;';
		hs+='width : 95px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Full Screen";
		el.appendChild(els);
		me._tt_enter_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_enter_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['button_image_fullscreen'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_enter_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_enter_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_enter_fullscreen.style[domTransition]='';
				if (me._tt_enter_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._tt_enter_fullscreen.style.visibility=(Number(me._tt_enter_fullscreen.style.opacity)>0||!me._tt_enter_fullscreen.style.opacity)?'inherit':'hidden';
					me._tt_enter_fullscreen.ggVisible=true;
				}
				else {
					me._tt_enter_fullscreen.style.visibility="hidden";
					me._tt_enter_fullscreen.ggVisible=false;
				}
			}
		}
		me._tt_enter_fullscreen.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((93-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		el=me._tt_enter_fullscreen_white=document.createElement('div');
		els=me._tt_enter_fullscreen_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_enter_fullscreen_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 95px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Full Screen";
		el.appendChild(els);
		me._tt_enter_fullscreen_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_enter_fullscreen_white.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((93-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._tt_enter_fullscreen.appendChild(me._tt_enter_fullscreen_white);
		me._button_image_fullscreen.appendChild(me._tt_enter_fullscreen);
		me._button_fullscreen.appendChild(me._button_image_fullscreen);
		me._hide_elements.appendChild(me._button_fullscreen);
		el=me._button_auto_rotate=document.createElement('div');
		el.ggId="button_auto_rotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_auto_rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_auto_rotate.ggUpdatePosition=function (useTransition) {
		}
		el=me._stop_rotate_image=document.createElement('div');
		els=me._stop_rotate_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjFTLTE0NCwzNDAuOS0xNzUsMzQwLjl6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTS0xOTYuMSwzNzAuNGM1LjgtNC42LDEzLjEtNy40LDIxLjEtNy40YzcuNywwLDE0LjksMi42LDIwLjYsN2wtNi40LDYuNGMtNC0yLjgtOC45LTQuNC0xNC4yLTQuNGMtNS44LDAtMTEuMSwyLTE1LjMsNS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNiwwLjUtMS40LDAuNC0yLTAuMmMtMC41LTAuNS0zLjEtMy41LTQtNC40Qy0xOTYuOSwzNzIt'+
			'MTk2LjgsMzcxLTE5Ni4xLDM3MC40eiBNLTIxNy4yLDM5N2MtMC41LDAtMC44LTAuMi0xLjEtMC43JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMy0wLjUtMC4yLTEsMC4xLTEuM2wxMi43LTE3LjhjMC4zLTAuNCwwLjYtMC42LDEuMS0wLjZjMC40LDAsMC43LDAuMiwxLDAuNmwxMi44LDE3LjhjMC4zLDAuNCwwLjQsMC45LDAuMSwxLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4zLDAuNS0wLjYsMC43LTEuMSwwLjdoLTcuNmgtMC42YzAsNS4yLDEuNywxMC4xLDQuNSwxNC4xbC02LjQsNi40Yy00LjQtNS43LTctMTIuOC03LjEtMjAuNWgtMC41SC0yMTcuMnogTS0yMDcuMiw0MzIuMyYjeGQ7JiN4YT'+
			'smI3g5OyYjeDk7Yy0wLjQsMC0wLjgtMC4xLTEuMS0wLjRsLTEuNy0xLjdjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmw2Ni02NmMwLjMtMC4zLDAuNy0wLjQsMS4xLTAuNHMwLjgsMC4xLDEuMSwwLjRsMS43LDEuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNiwwLjYsMC42LDEuNiwwLDIuMmwtNjYsNjZDLTIwNi40LDQzMi4yLTIwNi44LDQzMi4zLTIwNy4yLDQzMi4zeiBNLTE1My45LDQyMy4zYy01LjgsNC42LTEzLjEsNy40LTIxLjEsNy40JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTcuNywwLTE0LjgtMi42LTIwLjUtNi45bDYuNC02LjRjNCwyLjcsOC44LDQuMywxNCw0LjNjNS44LDAsMTEuMS0yLDE1'+
			'LjMtNS4zYzAuNi0wLjUsMS40LTAuNCwyLDAuMmMwLjUsMC41LDMuMSwzLjUsNCw0LjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTUzLjEsNDIxLjgtMTUzLjIsNDIyLjgtMTUzLjksNDIzLjN6IE0tMTQ0LjUsNDE2LjljLTAuMywwLjQtMC42LDAuNi0xLjEsMC42Yy0wLjQsMC0wLjctMC4yLTEtMC42bC0xMi44LTE3LjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4zLTAuNC0wLjQtMC45LTAuMS0xLjNjMC4zLTAuNSwwLjYtMC43LDEuMS0wLjdoNy42aDAuN2MwLTUuMy0xLjYtMTAuMS00LjQtMTQuMmw2LjQtNi40YzQuNCw1LjcsNywxMi45LDcsMjAuNmgwLjVoNy43JiN4ZDsmI3hhOyYjeDk7JiN4OT'+
			'tjMC41LDAsMC44LDAuMiwxLjEsMC43YzAuMywwLjUsMC4yLDEtMC4xLDEuM0wtMTQ0LjUsNDE2Ljl6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNDIuOCwzNjEuN2MwLjQsMCwwLjgsMC4xLDEuMSwwLjRsMS43LDEuN2MwLjYsMC42LDAuNiwxLjYsMCwyLjJsLTY2LDY2Yy0wLjMsMC4zLTAuNywwLjQtMS4xLDAuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQsMC0wLjgtMC4xLTEuMS0wLjRsLTEuNy0xLjdjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmw2Ni02NkMtMTQzLjYsMzYxLjgtMTQzLjIsMzYxLjctMTQyLjgsMzYxLjciIGZpbGw9IiNG'+
			'RkZGRkYiLz4KICA8Zz4KICAgPHBhdGggZD0iTS0xOTIuMywzNzcuMWMwLjYsMC42LDEuNCwwLjYsMiwwLjJjNC4yLTMuMyw5LjUtNS4zLDE1LjMtNS4zYzUuMywwLDEwLjEsMS42LDE0LjIsNC40bDYuNC02LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy01LjctNC40LTEyLjktNy0yMC42LTdjLTgsMC0xNS4zLDIuOC0yMS4xLDcuNGMtMC43LDAuNS0wLjgsMS42LTAuMSwyLjNDLTE5NS40LDM3My43LTE5Mi44LDM3Ni42LTE5Mi4zLDM3Ny4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTEzMS43LDM5Ny43Yy0wLjMtMC41LTAuNi0wLjctMS4xLTAuN2gtNy43aC0wLjVjMC03Lj'+
			'ctMi42LTE0LjktNy0yMC42bC02LjQsNi40YzIuOCw0LDQuNCw4LjksNC40LDE0LjImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7aC0wLjdoLTcuNmMtMC41LDAtMC44LDAuMi0xLjEsMC43Yy0wLjMsMC41LTAuMiwxLDAuMSwxLjNsMTIuOCwxNy44YzAuMywwLjQsMC42LDAuNiwxLDAuNmMwLjUsMCwwLjgtMC4yLDEuMS0wLjZsMTIuNy0xNy44JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTMxLjUsMzk4LjYtMTMxLjQsMzk4LjItMTMxLjcsMzk3Ljd6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNLTIwOSwzOTdjMC4xLDcuNywyLjcsMTQuOCw3LjEsMjAuNWw2'+
			'LjQtNi40Yy0yLjgtNC00LjUtOC44LTQuNS0xNC4xaDAuNmg3LjZjMC41LDAsMC44LTAuMiwxLjEtMC43JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjMtMC41LDAuMi0xLTAuMS0xLjNsLTEyLjgtMTcuOGMtMC4zLTAuNC0wLjYtMC42LTEtMC42Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjZsLTEyLjcsMTcuOGMtMC4zLDAuNC0wLjQsMC45LTAuMSwxLjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMywwLjUsMC42LDAuNywxLjEsMC43aDcuN0gtMjA5eiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE1Ny43LDQxNi42Yy0wLjYtMC42LTEuNC0wLjYtMi0wLjJjLTQuMiwzLjMtOS'+
			'41LDUuMy0xNS4zLDUuM2MtNS4yLDAtMTAtMS42LTE0LTQuM2wtNi40LDYuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjNS43LDQuMywxMi44LDYuOSwyMC41LDYuOWM4LDAsMTUuMy0yLjgsMjEuMS03LjRjMC43LTAuNSwwLjgtMS42LDAuMS0yLjNDLTE1NC42LDQyMC4xLTE1Ny4yLDQxNy4xLTE1Ny43LDQxNi42eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._stop_rotate_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._stop_rotate_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNFMtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0tMTk4LjUsMzY3LjVjNi40LTUuMSwxNC42LTguMiwyMy41LTguMmM4LjYsMCwxNi41LDIuOSwyMi45LDcuOGwtNy4yLDcuMmMtNC41LTMuMS05LjktNC45LTE1LjctNC45Yy02LjQsMC0xMi4zLDIuMi0xNyw1LjkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LDAuNS0xLjYsMC40LTIuMi0wLjJjLTAuNi0wLjYtMy41LTMuOC00LjQtNC45'+
			'Qy0xOTkuMywzNjkuMi0xOTkuMywzNjguMS0xOTguNSwzNjcuNXogTS0yMjEuOSwzOTdjLTAuNSwwLTAuOS0wLjItMS4yLTAuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMtMC41LTAuMi0xLjEsMC4xLTEuNWwxNC4xLTE5LjhjMC4zLTAuNCwwLjYtMC42LDEuMi0wLjZjMC40LDAsMC43LDAuMiwxLjEsMC42bDE0LjIsMTkuOGMwLjMsMC40LDAuNCwxLDAuMSwxLjUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4zLDAuNS0wLjYsMC43LTEuMiwwLjdoLTguNWgtMC43YzAuMSw1LjgsMS45LDExLjIsNSwxNS42bC03LjEsNy4xYy00LjktNi4zLTcuOC0xNC4yLTcuOS0yMi44aC0wLjZILTIyMS45eiBNLT'+
			'IxMC43LDQzNi4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNCwwLTAuOS0wLjItMS4yLTAuNWwtMS44LTEuOGMtMC43LTAuNy0wLjctMS43LDAtMi40bDczLjMtNzMuM2MwLjMtMC4zLDAuOC0wLjUsMS4yLTAuNXMwLjksMC4yLDEuMiwwLjVsMS44LDEuOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNywwLjcsMC43LDEuNywwLDIuNGwtNzMuMyw3My4zQy0yMDkuOSw0MzYuMS0yMTAuMyw0MzYuMy0yMTAuNyw0MzYuM3ogTS0xNTEuNSw0MjYuM2MtNi40LDUuMS0xNC42LDguMi0yMy41LDguMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy04LjUsMC0xNi40LTIuOS0yMi44LTcuN2w3LjItNy4yYzQuNCwzLDku'+
			'OCw0LjgsMTUuNiw0LjhjNi40LDAsMTIuMy0yLjIsMTctNS45YzAuNy0wLjUsMS42LTAuNCwyLjIsMC4yYzAuNiwwLjYsMy41LDMuOCw0LjQsNC45JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTE1MC43LDQyNC41LTE1MC43LDQyNS43LTE1MS41LDQyNi4zeiBNLTE0MS4xLDQxOS4xYy0wLjMsMC40LTAuNiwwLjYtMS4yLDAuNmMtMC40LDAtMC43LTAuMi0xLjEtMC42bC0xNC4yLTE5LjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4zLTAuNC0wLjQtMS0wLjEtMS41YzAuMy0wLjUsMC42LTAuNywxLjItMC43aDguNGgwLjdjMC01LjgtMS44LTExLjMtNC45LTE1LjdsNy4yLTcuMmM0LjksNi40LDcuOCwxNC'+
			'4zLDcuOCwyMi45aDAuNmg4LjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjUsMCwwLjksMC4yLDEuMiwwLjdjMC4zLDAuNSwwLjIsMS4xLTAuMSwxLjVMLTE0MS4xLDQxOS4xeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTM5LjMsMzU3LjdjMC40LDAsMC45LDAuMiwxLjIsMC41bDEuOCwxLjhjMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjNjLTAuMywwLjMtMC44LDAuNS0xLjIsMC41JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuOS0wLjItMS4yLTAuNWwtMS44LTEuOGMtMC43LTAuNy0wLjctMS43LDAtMi40bDczLjMtNzMuM0MtMTQw'+
			'LjEsMzU3LjktMTM5LjcsMzU3LjctMTM5LjMsMzU3LjciIGZpbGw9IiNGRkZGRkYiLz4KICA8Zz4KICAgPHBhdGggZD0iTS0xOTQuMiwzNzQuOWMwLjYsMC42LDEuNSwwLjcsMi4yLDAuMmM0LjctMy43LDEwLjYtNS45LDE3LTUuOWM1LjgsMCwxMS4zLDEuOCwxNS43LDQuOWw3LjItNy4yJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtNi40LTQuOS0xNC4zLTcuOC0yMi45LTcuOGMtOC45LDAtMTcsMy4xLTIzLjUsOC4yYy0wLjgsMC42LTAuOCwxLjgtMC4yLDIuNkMtMTk3LjcsMzcxLjEtMTk0LjgsMzc0LjQtMTk0LjIsMzc0Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRoIGQ9Ik0tMTI2Lj'+
			'ksMzk3LjdjLTAuMy0wLjUtMC42LTAuNy0xLjItMC43aC04LjZoLTAuNmMwLTguNi0yLjktMTYuNS03LjgtMjIuOWwtNy4yLDcuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMy4xLDQuNSw0LjksOS45LDQuOSwxNS43aC0wLjdoLTguNGMtMC41LDAtMC45LDAuMi0xLjIsMC43Yy0wLjMsMC41LTAuMiwxLjEsMC4xLDEuNWwxNC4yLDE5LjhjMC4zLDAuNCwwLjYsMC42LDEuMSwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNSwwLDAuOS0wLjIsMS4yLTAuNmwxNC4xLTE5LjhDLTEyNi43LDM5OC44LTEyNi42LDM5OC4zLTEyNi45LDM5Ny43eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4K'+
			'ICA8Zz4KICAgPHBhdGggZD0iTS0yMTIuNywzOTdjMC4xLDguNiwzLDE2LjUsNy45LDIyLjhsNy4xLTcuMWMtMy4xLTQuNC01LTkuOC01LTE1LjZoMC43aDguNWMwLjUsMCwwLjktMC4yLDEuMi0wLjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMy0wLjUsMC4yLTEuMS0wLjEtMS41bC0xNC4yLTE5LjhjLTAuMy0wLjQtMC42LTAuNi0xLjEtMC42Yy0wLjUsMC0wLjksMC4yLTEuMiwwLjZsLTE0LjEsMTkuOGMtMC4zLDAuNC0wLjQsMS0wLjEsMS41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjMsMC41LDAuNiwwLjcsMS4yLDAuN2g4LjZILTIxMi43eiIgZmlsbD0iI0ZGRkZGRiIvPgogIC'+
			'A8cGF0aCBkPSJNLTE1NS44LDQxOC44Yy0wLjYtMC42LTEuNS0wLjctMi4yLTAuMmMtNC43LDMuNy0xMC42LDUuOS0xNyw1LjljLTUuOCwwLTExLjEtMS44LTE1LjYtNC44bC03LjIsNy4yJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2M2LjMsNC44LDE0LjIsNy43LDIyLjgsNy43YzguOSwwLDE3LTMuMSwyMy41LTguMmMwLjgtMC42LDAuOC0xLjgsMC4yLTIuNkMtMTUyLjMsNDIyLjYtMTU1LjIsNDE5LjQtMTU1LjgsNDE4Ljh6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._stop_rotate_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="stop_rotate_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._stop_rotate_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._stop_rotate_image.onclick=function (e) {
			player.stopAutorotate();
			me._stop_rotate_image.style[domTransition]='none';
			me._stop_rotate_image.style.visibility='hidden';
			me._stop_rotate_image.ggVisible=false;
			me._start_rotate_image.style[domTransition]='none';
			me._start_rotate_image.style.visibility=(Number(me._start_rotate_image.style.opacity)>0||!me._start_rotate_image.style.opacity)?'inherit':'hidden';
			me._start_rotate_image.ggVisible=true;
		}
		me._stop_rotate_image.onmouseover=function (e) {
			me._stop_rotate_image__img.style.visibility='hidden';
			me._stop_rotate_image__imgo.style.visibility='inherit';
			me.elementMouseOver['stop_rotate_image']=true;
			me._tt_stop_auto_rotate.logicBlock_visible();
		}
		me._stop_rotate_image.onmouseout=function (e) {
			me._stop_rotate_image__img.style.visibility='inherit';
			me._stop_rotate_image__imgo.style.visibility='hidden';
			me.elementMouseOver['stop_rotate_image']=false;
			me._tt_stop_auto_rotate.logicBlock_visible();
		}
		me._stop_rotate_image.ontouchend=function (e) {
			me.elementMouseOver['stop_rotate_image']=false;
			me._tt_stop_auto_rotate.logicBlock_visible();
		}
		me._stop_rotate_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_stop_auto_rotate=document.createElement('div');
		els=me._tt_stop_auto_rotate__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_stop_auto_rotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -36px;';
		hs+='position : absolute;';
		hs+='top : 33px;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Stop Rotate";
		el.appendChild(els);
		me._tt_stop_auto_rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_stop_auto_rotate.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['stop_rotate_image'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_stop_auto_rotate.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_stop_auto_rotate.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_stop_auto_rotate.style[domTransition]='';
				if (me._tt_stop_auto_rotate.ggCurrentLogicStateVisible == 0) {
					me._tt_stop_auto_rotate.style.visibility=(Number(me._tt_stop_auto_rotate.style.opacity)>0||!me._tt_stop_auto_rotate.style.opacity)?'inherit':'hidden';
					me._tt_stop_auto_rotate.ggVisible=true;
				}
				else {
					me._tt_stop_auto_rotate.style.visibility="hidden";
					me._tt_stop_auto_rotate.ggVisible=false;
				}
			}
		}
		me._tt_stop_auto_rotate.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((97-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		el=me._tt_stop_auto_rotate_white=document.createElement('div');
		els=me._tt_stop_auto_rotate_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_stop_auto_rotate_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Stop Rotate";
		el.appendChild(els);
		me._tt_stop_auto_rotate_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_stop_auto_rotate_white.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((97-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._tt_stop_auto_rotate.appendChild(me._tt_stop_auto_rotate_white);
		me._stop_rotate_image.appendChild(me._tt_stop_auto_rotate);
		me._button_auto_rotate.appendChild(me._stop_rotate_image);
		el=me._start_rotate_image=document.createElement('div');
		els=me._start_rotate_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7eiBNLTE1My45LDQyMy42Yy01LjgsNC42LTEzLjEsNy40LTIxLjEsNy40aDBjLTE4LjcsMC0zNC0xNS4yLTM0LTM0aC0wLjVoLTcuN2MtMC41LDAtMC44LTAuMi0xLjEtMC43Yy0wLjMtMC41LTAuMi0xLDAuMS0xLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2wxMi43LTE3LjhjMC4zLTAuNCwwLjYtMC42LDEuMS0wLjZjMC40LDAsMC43LDAuMiwx'+
			'LDAuNmwxMi44LDE3LjhjMC4zLDAuNCwwLjQsMC45LDAuMSwxLjNjLTAuMywwLjUtMC42LDAuNy0xLjEsMC43aC03LjZoLTAuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMTMuOCwxMS4yLDI1LDI1LDI1aDBjNS44LDAsMTEuMS0yLDE1LjMtNS4zYzAuNi0wLjUsMS40LTAuNCwyLDAuMmMwLjUsMC41LDMuMSwzLjUsNCw0LjRDLTE1My4xLDQyMi0xNTMuMiw0MjMuMS0xNTMuOSw0MjMuNnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNLTE3OSwzOTdjMC0yLjIsMS44LTQsNC00YzIuMiwwLDQsMS44LDQsNGMwLDIuMi0xLjgsNC00LDRDLTE3Ny4yLDQwMS0xNzksMzk5LjItMTc5LDM5N3ogTS0xNDQuNSw0MT'+
			'YuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMsMC40LTAuNiwwLjYtMS4xLDAuNmMtMC40LDAtMC43LTAuMi0xLTAuNmwtMTIuOC0xNy44Yy0wLjMtMC40LTAuNC0wLjktMC4xLTEuM2MwLjMtMC41LDAuNi0wLjcsMS4xLTAuN2g3LjZoMC43JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xMy44LTExLjItMjUtMjUtMjVoMGMtNS44LDAtMTEuMSwyLTE1LjMsNS4zYy0wLjYsMC41LTEuNCwwLjQtMi0wLjJjLTAuNS0wLjUtMy4xLTMuNS00LTQuNGMtMC42LTAuNy0wLjYtMS44LDAuMS0yLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2M1LjgtNC42LDEzLjEtNy40LDIxLjEtNy40aDBjMTguNywwLDM0LDE1LjIs'+
			'MzQsMzRoMC41aDcuN2MwLjUsMCwwLjgsMC4yLDEuMSwwLjdjMC4zLDAuNSwwLjIsMS0wLjEsMS4zTC0xNDQuNSw0MTYuOXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE1My43LDQyMS4zYy0wLjgtMC45LTMuNS0zLjktNC00LjRjLTAuNi0wLjYtMS40LTAuNi0yLTAuMmMtNC4yLDMuMy05LjUsNS4zLTE1LjMsNS4zaDAmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMTMuOCwwLTI1LTExLjItMjUtMjVoMC43aDcuNmMwLjUsMCwwLjgtMC4yLDEuMS0wLjdjMC4zLTAuNSwwLjItMS0wLjEtMS4zbC0xMi44LTE3LjhjLTAuMy0wLjQtMC42LTAuNi0xLT'+
			'AuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjZsLTEyLjcsMTcuOGMtMC4zLDAuNC0wLjQsMC45LTAuMSwxLjNjMC4zLDAuNSwwLjYsMC43LDEuMSwwLjdoNy43aDAuNWMwLDE4LjcsMTUuMiwzNCwzNCwzNGgwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjOCwwLDE1LjMtMi44LDIxLjEtNy40Qy0xNTMuMiw0MjMuMS0xNTMuMSw0MjItMTUzLjcsNDIxLjN6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTS0xMzEuNywzOTcuN2MtMC4zLTAuNS0wLjYtMC43LTEuMS0wLjdoLTcuN2gtMC41YzAtMTguNy0xNS4yLTM0LTM0LTM0aDBjLTgsMC0xNS4zLDIuOC0yMS4xLDcu'+
			'NCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjcsMC41LTAuOCwxLjYtMC4xLDIuM2MwLjgsMC45LDMuNSwzLjksNCw0LjRjMC42LDAuNiwxLjQsMC42LDIsMC4yYzQuMi0zLjMsOS41LTUuMywxNS4zLTUuM2gwYzEzLjgsMCwyNSwxMS4yLDI1LDI1aC0wLjcmI3hkOyYjeGE7JiN4OTsmI3g5O2gtNy42Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjdjLTAuMywwLjUtMC4yLDEsMC4xLDEuM2wxMi44LDE3LjhjMC4zLDAuNCwwLjYsMC42LDEsMC42YzAuNSwwLDAuOC0wLjIsMS4xLTAuNmwxMi43LTE3LjgmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMxLjUsMzk4LjctMTMxLjQsMzk4LjItMTMxLjcsMzk3Ljd6Ii'+
			'BmaWxsPSIjRkZGRkZGIi8+CiAgPGNpcmNsZSByPSI0IiBjeT0iMzk3IiBmaWxsPSIjRkZGRkZGIiBjeD0iLTE3NSIvPgogPC9nPgo8L3N2Zz4K';
		me._start_rotate_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._start_rotate_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjdjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjctMTc1LDMzNC43eiBNLTE1MS41LDQyNi42Yy02LjQsNS4xLTE0LjYsOC4yLTIzLjUsOC4yaDBjLTIwLjgsMC0zNy43LTE2LjktMzcuNy0zNy43aC0wLjZoLTguNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4yLTEuMi0wLjdjLTAuMy0wLjUtMC4yLTEuMSwwLjEtMS41bDE0LjEtMTkuOGMwLjMtMC40LDAuNi0wLjYsMS4yLTAuNmMw'+
			'LjQsMCwwLjcsMC4yLDEuMSwwLjZsMTQuMiwxOS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuNCwwLjQsMSwwLjEsMS41Yy0wLjMsMC41LTAuNiwwLjctMS4yLDAuN2gtOC40aC0wLjdjMCwxNS4zLDEyLjQsMjcuNywyNy43LDI3LjdoMGM2LjQsMCwxMi4zLTIuMiwxNy01LjkmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjctMC41LDEuNi0wLjQsMi4yLDAuMmMwLjYsMC42LDMuNSwzLjgsNC40LDQuOUMtMTUwLjcsNDI0LjgtMTUwLjcsNDI2LTE1MS41LDQyNi42eiBNLTE3OS40LDM5N2MwLTIuNCwyLTQuNCw0LjQtNC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMi40LDAsNC40LDIsNC40LDQuNGMwLD'+
			'IuNC0yLDQuNC00LjQsNC40Qy0xNzcuNCw0MDEuNC0xNzkuNCwzOTkuNS0xNzkuNCwzOTd6IE0tMTQxLjEsNDE5LjFjLTAuMywwLjQtMC42LDAuNi0xLjIsMC42JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNCwwLTAuNy0wLjItMS4xLTAuNmwtMTQuMi0xOS44Yy0wLjMtMC40LTAuNC0xLTAuMS0xLjVjMC4zLTAuNSwwLjYtMC43LDEuMi0wLjdoOC40aDAuN2MwLTE1LjMtMTIuNC0yNy43LTI3LjctMjcuN2gwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTYuNCwwLTEyLjMsMi4yLTE3LDUuOWMtMC43LDAuNS0xLjYsMC40LTIuMi0wLjJjLTAuNi0wLjYtMy41LTMuOC00LjQtNC45Yy0wLjctMC44LTAuNi0y'+
			'LDAuMi0yLjZjNi40LTUuMSwxNC42LTguMiwyMy41LTguMmgwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMjAuOCwwLDM3LjcsMTYuOSwzNy43LDM3LjdoMC42aDguNmMwLjUsMCwwLjksMC4yLDEuMiwwLjdjMC4zLDAuNSwwLjIsMS4xLTAuMSwxLjVMLTE0MS4xLDQxOS4xeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTUxLjQsNDI0Yy0wLjktMS0zLjktNC4zLTQuNC00LjljLTAuNi0wLjYtMS41LTAuNy0yLjItMC4yYy00LjcsMy43LTEwLjYsNS45LTE3LDUuOWgwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTE1LjMsMC0yNy43LTEyLjQtMjcuNy0yNy'+
			'43aDAuN2g4LjRjMC41LDAsMC45LTAuMiwxLjItMC43czAuMi0xLjEtMC4xLTEuNWwtMTQuMi0xOS44Yy0wLjMtMC40LTAuNi0wLjYtMS4xLTAuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjksMC4yLTEuMiwwLjZsLTE0LjEsMTkuOGMtMC4zLDAuNC0wLjQsMS0wLjEsMS41YzAuMywwLjUsMC42LDAuNywxLjIsMC43aDguNmgwLjZjMCwyMC44LDE2LjksMzcuNywzNy43LDM3LjdoMCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzguOSwwLDE3LTMuMSwyMy41LTguMkMtMTUwLjcsNDI2LTE1MC43LDQyNC44LTE1MS40LDQyNHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8cGF0aCBkPSJNLTEyNi45LDM5'+
			'Ny44Yy0wLjMtMC41LTAuNi0wLjctMS4yLTAuN2gtOC42aC0wLjZjMC0yMC44LTE2LjktMzcuNy0zNy43LTM3LjdoMGMtOC45LDAtMTcsMy4xLTIzLjUsOC4yJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuOCwwLjYtMC44LDEuOC0wLjIsMi42YzAuOSwxLDMuOSw0LjMsNC40LDQuOWMwLjYsMC42LDEuNSwwLjcsMi4yLDAuMmM0LjctMy43LDEwLjYtNS45LDE3LTUuOWgwYzE1LjMsMCwyNy43LDEyLjQsMjcuNywyNy43JiN4ZDsmI3hhOyYjeDk7JiN4OTtoLTAuN2gtOC40Yy0wLjUsMC0wLjksMC4yLTEuMiwwLjdjLTAuMywwLjUtMC4yLDEuMSwwLjEsMS41bDE0LjIsMTkuOGMwLjMsMC40LDAuNiwwLj'+
			'YsMS4xLDAuNmMwLjUsMCwwLjktMC4yLDEuMi0wLjZsMTQuMS0xOS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTEyNi43LDM5OC45LTEyNi42LDM5OC4zLTEyNi45LDM5Ny44eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDxjaXJjbGUgcj0iNC40IiBjeT0iMzk3IiBmaWxsPSIjRkZGRkZGIiBjeD0iLTE3NSIvPgogPC9nPgo8L3N2Zz4K';
		me._start_rotate_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="start_rotate_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._start_rotate_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._start_rotate_image.onclick=function (e) {
			player.startAutorotate("0.1","5","1");
			me._start_rotate_image.style[domTransition]='none';
			me._start_rotate_image.style.visibility='hidden';
			me._start_rotate_image.ggVisible=false;
			me._stop_rotate_image.style[domTransition]='none';
			me._stop_rotate_image.style.visibility=(Number(me._stop_rotate_image.style.opacity)>0||!me._stop_rotate_image.style.opacity)?'inherit':'hidden';
			me._stop_rotate_image.ggVisible=true;
		}
		me._start_rotate_image.onmouseover=function (e) {
			me._start_rotate_image__img.style.visibility='hidden';
			me._start_rotate_image__imgo.style.visibility='inherit';
			me.elementMouseOver['start_rotate_image']=true;
			me._tt_start_auto_rotate.logicBlock_visible();
		}
		me._start_rotate_image.onmouseout=function (e) {
			me._start_rotate_image__img.style.visibility='inherit';
			me._start_rotate_image__imgo.style.visibility='hidden';
			me.elementMouseOver['start_rotate_image']=false;
			me._tt_start_auto_rotate.logicBlock_visible();
		}
		me._start_rotate_image.ontouchend=function (e) {
			me.elementMouseOver['start_rotate_image']=false;
			me._tt_start_auto_rotate.logicBlock_visible();
		}
		me._start_rotate_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_start_auto_rotate=document.createElement('div');
		els=me._tt_start_auto_rotate__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_start_auto_rotate";
		el.ggDx=-1.5;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : -19px;';
		hs+='height : 18px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Auto Rotate";
		el.appendChild(els);
		me._tt_start_auto_rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_start_auto_rotate.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['start_rotate_image'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_start_auto_rotate.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_start_auto_rotate.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_start_auto_rotate.style[domTransition]='';
				if (me._tt_start_auto_rotate.ggCurrentLogicStateVisible == 0) {
					me._tt_start_auto_rotate.style.visibility=(Number(me._tt_start_auto_rotate.style.opacity)>0||!me._tt_start_auto_rotate.style.opacity)?'inherit':'hidden';
					me._tt_start_auto_rotate.ggVisible=true;
				}
				else {
					me._tt_start_auto_rotate.style.visibility="hidden";
					me._tt_start_auto_rotate.ggVisible=false;
				}
			}
		}
		me._tt_start_auto_rotate.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((97-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		el=me._tt_start_auto_rotate_white=document.createElement('div');
		els=me._tt_start_auto_rotate_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_start_auto_rotate_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 99px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Auto Rotate";
		el.appendChild(els);
		me._tt_start_auto_rotate_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_start_auto_rotate_white.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((97-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._tt_start_auto_rotate.appendChild(me._tt_start_auto_rotate_white);
		me._start_rotate_image.appendChild(me._tt_start_auto_rotate);
		me._button_auto_rotate.appendChild(me._start_rotate_image);
		me._hide_elements.appendChild(me._button_auto_rotate);
		el=me._button_direction=document.createElement('div');
		el.ggId="button_direction";
		el.ggDx=15;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : -1px;';
		hs+='height : 62px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 82px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_direction.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_direction.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._button_image_right=document.createElement('div');
		els=me._button_image_right__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xNDksMzk4LjFsLTMwLjEsMzAuMWMtMC42LDAuNi0xLjYsMC42LTIuMiwwbC0xMS4zLTExLjNjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmwxNy43LTE3LjcmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTcuNy0xNy43Yy0wLjYtMC42LTAuNi0xLjYsMC0yLjJsMTEuMy0xMS4zYzAuNi0wLjYsMS42LTAuNiwyLjIsMGwzMC4x'+
			'LDMwYzAuMywwLjMsMC40LDAuNywwLjQsMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTE0OC41LDM5Ny40LTE0OC42LDM5Ny44LTE0OSwzOTguMXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE5Mi41LDM3OS4zbDE3LjcsMTcuN2wtMTcuNywxNy43Yy0wLjYsMC42LTAuNiwxLjYsMCwyLjJsMTEuMywxMS4zYzAuNiwwLjYsMS42LDAuNiwyLjIsMGwzMC4xLTMwLjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjMtMC4zLDAuNS0wLjcsMC40LTEuMWMwLTAuNC0wLjEtMC44LTAuNC0xLjFsLTMwLjEtMzBjLTAuNi0wLjYtMS42LTAuNi0yLjIsMGwtMT'+
			'EuMywxMS4zQy0xOTMuMSwzNzcuNy0xOTMuMSwzNzguNy0xOTIuNSwzNzkuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._button_image_right__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_right__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE0Ni4xLDM5OC4ybC0zMy41LDMzLjRjLTAuNywwLjctMS43LDAuNy0yLjQsMGwtMTIuNS0xMi41Yy0wLjctMC43LTAuNy0xLjcsMC0yLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wxOS43LTE5LjdsLTE5LjctMTkuN2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcs'+
			'Mi40LDBsMzMuNSwzMy40YzAuMywwLjMsMC41LDAuOCwwLjUsMS4yJiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTE0NS42LDM5Ny40LTE0NS43LDM5Ny45LTE0Ni4xLDM5OC4yeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTk0LjQsMzc3LjNsMTkuNywxOS43bC0xOS43LDE5LjdjLTAuNywwLjctMC43LDEuNywwLDIuNGwxMi41LDEyLjVjMC43LDAuNywxLjcsMC43LDIuNCwwbDMzLjUtMzMuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMy0wLjMsMC41LTAuOCwwLjUtMS4zYzAtMC40LTAuMi0wLjktMC41LTEuMmwtMzMuNS0zMy40Yy0wLjctMC43LT'+
			'EuNy0wLjctMi40LDBsLTEyLjUsMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xOTUuMSwzNzUuNi0xOTUuMSwzNzYuNi0xOTQuNCwzNzcuM3oiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_image_right__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_right";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 57px;';
		hs+='position : absolute;';
		hs+='top : 14px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_right.onmouseover=function (e) {
			me._button_image_right__img.style.visibility='hidden';
			me._button_image_right__imgo.style.visibility='inherit';
		}
		me._button_image_right.onmouseout=function (e) {
			me._button_image_right__img.style.visibility='inherit';
			me._button_image_right__imgo.style.visibility='hidden';
			me.elementMouseDown['button_image_right']=false;
		}
		me._button_image_right.onmousedown=function (e) {
			me.elementMouseDown['button_image_right']=true;
		}
		me._button_image_right.onmouseup=function (e) {
			me.elementMouseDown['button_image_right']=false;
		}
		me._button_image_right.ontouchend=function (e) {
			me.elementMouseDown['button_image_right']=false;
		}
		me._button_image_right.ggUpdatePosition=function (useTransition) {
		}
		me._button_direction.appendChild(me._button_image_right);
		el=me._button_image_left=document.createElement('div');
		els=me._button_image_left__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjhjLTMxLDAtNTYuMiwyNS4xLTU2LjIsNTYuMnMyNS4xLDU2LjIsNTYuMiw1Ni4yczU2LjItMjUuMSw1Ni4yLTU2LjImI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTE4LjgsMzY2LTE0NCwzNDAuOC0xNzUsMzQwLjh6IE0tMTU3LjUsNDE2LjlsLTExLjMsMTEuM2MtMC42LDAuNi0xLjUsMC42LTIuMiwwbC0zMC4yLTMwLjFjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOCwwLjQtMS4ybDMwLjItMzAuMWMwLjYtMC42LDEuNS0wLjYsMi4yLDBsMTEuMywxMS4zYzAuNiwwLjYsMC42LDEuNSww'+
			'LDIuMmwtMTcuNywxNy43bDE3LjcsMTcuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNTYuOSw0MTUuNC0xNTYuOSw0MTYuMy0xNTcuNSw0MTYuOXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE1Ny41LDQxNC43bC0xNy43LTE3LjdsMTcuNy0xNy43YzAuNi0wLjYsMC42LTEuNSwwLTIuMmwtMTEuMy0xMS4zYy0wLjYtMC42LTEuNS0wLjYtMi4yLDBsLTMwLjIsMzAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMsMC4zLTAuNCwwLjctMC40LDEuMmMwLDAuNCwwLjIsMC44LDAuNCwxLjFsMzAuMiwzMC4xYzAuNiwwLjYsMS41LDAuNiwyLjIsMG'+
			'wxMS4zLTExLjNDLTE1Ni45LDQxNi4zLTE1Ni45LDQxNS40LTE1Ny41LDQxNC43JiN4ZDsmI3hhOyYjeDk7JiN4OTt6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_left__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_left__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTIuNiwzNjIuNi0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6IE0tMTU1LjYsNDE5LjFsLTEyLjUsMTIuNWMtMC43LDAuNy0xLjcsMC43LTIuNCwwbC0zMy41LTMzLjRjLTAuMy0wLjMtMC41LTAuOC0wLjUtMS4yJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDMzLjUtMzMuNGMwLjctMC43LDEuNy0wLjcsMi40LDBsMTIuNSwxMi41YzAuNywwLjcsMC43'+
			'LDEuNywwLDIuNGwtMTkuNywxOS43bDE5LjcsMTkuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNTQuOSw0MTcuNC0xNTQuOSw0MTguNC0xNTUuNiw0MTkuMXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE1NS42LDQxNi43bC0xOS43LTE5LjdsMTkuNy0xOS43YzAuNy0wLjcsMC43LTEuNywwLTIuNGwtMTIuNS0xMi41Yy0wLjctMC43LTEuNy0wLjctMi40LDBsLTMzLjUsMzMuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMsMC4zLTAuNSwwLjgtMC41LDEuM2MwLDAuNCwwLjIsMC45LDAuNSwxLjJsMzMuNSwzMy40YzAuNywwLjcsMS43LDAuNy'+
			'wyLjQsMGwxMi41LTEyLjVDLTE1NC45LDQxOC40LTE1NC45LDQxNy40LTE1NS42LDQxNi43JiN4ZDsmI3hhOyYjeDk7JiN4OTt6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_left__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -6px;';
		hs+='position : absolute;';
		hs+='top : 14px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_left.onmouseover=function (e) {
			me._button_image_left__img.style.visibility='hidden';
			me._button_image_left__imgo.style.visibility='inherit';
		}
		me._button_image_left.onmouseout=function (e) {
			me._button_image_left__img.style.visibility='inherit';
			me._button_image_left__imgo.style.visibility='hidden';
			me.elementMouseDown['button_image_left']=false;
		}
		me._button_image_left.onmousedown=function (e) {
			me.elementMouseDown['button_image_left']=true;
		}
		me._button_image_left.onmouseup=function (e) {
			me.elementMouseDown['button_image_left']=false;
		}
		me._button_image_left.ontouchend=function (e) {
			me.elementMouseDown['button_image_left']=false;
		}
		me._button_image_left.ggUpdatePosition=function (useTransition) {
		}
		me._button_direction.appendChild(me._button_image_left);
		el=me._button_image_down=document.createElement('div');
		els=me._button_image_down__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7eiBNLTE0My44LDM5Mi45bC0zMCwzMC4xYy0wLjMsMC4zLTAuNywwLjQtMS4xLDAuNGMtMC40LDAtMC44LTAuMS0xLjEtMC40bC0zMC4xLTMwLjFjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmwxMS4zLTExLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjYtMC42LDEuNi0wLjYsMi4yLDBsMTcuNywxNy43bDE3LjctMTcuN2MwLjYtMC42LDEuNi0w'+
			'LjYsMi4yLDBsMTEuMywxMS4zQy0xNDMuMiwzOTEuNC0xNDMuMiwzOTIuMy0xNDMuOCwzOTIuOXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE1Ny4zLDM3OS41bC0xNy43LDE3LjdsLTE3LjctMTcuN2MtMC42LTAuNi0xLjYtMC42LTIuMiwwbC0xMS4zLDExLjNjLTAuNiwwLjYtMC42LDEuNiwwLDIuMmwzMC4xLDMwLjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjMsMC4zLDAuNywwLjUsMS4xLDAuNGMwLjQsMCwwLjgtMC4xLDEuMS0wLjRsMzAtMzAuMWMwLjYtMC42LDAuNi0xLjYsMC0yLjJsLTExLjMtMTEuM0MtMTU1LjcsMzc4LjktMTU2Lj'+
			'csMzc4LjktMTU3LjMsMzc5LjV6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_down__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_down__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE0MC40LDM5Mi41bC0zMy40LDMzLjVjLTAuMywwLjMtMC44LDAuNS0xLjIsMC41Yy0wLjUsMC0wLjktMC4xLTEuMy0wLjVsLTMzLjQtMzMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjctMC43LTAuNy0xLjcsMC0yLjRsMTIuNS0xMi41YzAuNy0wLjcsMS43LTAuNywyLjQsMGwxOS43LDE5LjdsMTkuNy0xOS43YzAuNy0w'+
			'LjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTM5LjcsMzkwLjctMTM5LjcsMzkxLjgtMTQwLjQsMzkyLjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNTUuMywzNzcuNmwtMTkuNywxOS43bC0xOS43LTE5LjdjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNSwxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzMuNCwzMy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDMzLjQtMzMuNWMwLjctMC43LDAuNy0xLjcsMC0yLj'+
			'RsLTEyLjUtMTIuNUMtMTUzLjYsMzc2LjktMTU0LjYsMzc2LjktMTU1LjMsMzc3LjYmI3hkOyYjeGE7JiN4OTsmI3g5O3oiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_image_down__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 26px;';
		hs+='position : absolute;';
		hs+='top : 31px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_down.onmouseover=function (e) {
			me._button_image_down__img.style.visibility='hidden';
			me._button_image_down__imgo.style.visibility='inherit';
		}
		me._button_image_down.onmouseout=function (e) {
			me._button_image_down__img.style.visibility='inherit';
			me._button_image_down__imgo.style.visibility='hidden';
			me.elementMouseDown['button_image_down']=false;
		}
		me._button_image_down.onmousedown=function (e) {
			me.elementMouseDown['button_image_down']=true;
		}
		me._button_image_down.onmouseup=function (e) {
			me.elementMouseDown['button_image_down']=false;
		}
		me._button_image_down.ontouchend=function (e) {
			me.elementMouseDown['button_image_down']=false;
		}
		me._button_image_down.ggUpdatePosition=function (useTransition) {
		}
		me._button_direction.appendChild(me._button_image_down);
		el=me._button_image_up=document.createElement('div');
		els=me._button_image_up__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7eiBNLTE0My44LDQwMy4ybC0xMS4zLDExLjNjLTAuNiwwLjYtMS42LDAuNi0yLjIsMGwtMTcuNy0xNy43bC0xNy43LDE3LjdjLTAuNiwwLjYtMS42LDAuNi0yLjIsMGwtMTEuMy0xMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmwzMC0zMC4xYzAuMy0wLjMsMC43LTAuNCwxLjEtMC40YzAuNCwwLDAuOCww'+
			'LjEsMS4xLDAuNGwzMC4xLDMwLjFDLTE0My4yLDQwMS43LTE0My4yLDQwMi42LTE0My44LDQwMy4yeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTkyLjcsNDE0LjVsMTcuNy0xNy43bDE3LjcsMTcuN2MwLjYsMC42LDEuNiwwLjYsMi4yLDBsMTEuMy0xMS4zYzAuNi0wLjYsMC42LTEuNiwwLTIuMmwtMzAuMS0zMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMy0wLjMtMC43LTAuNS0xLjEtMC40Yy0wLjQsMC0wLjgsMC4xLTEuMSwwLjRsLTMwLDMwLjFjLTAuNiwwLjYtMC42LDEuNiwwLDIuMmwxMS4zLDExLjMmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O0MtMTk0LjMsNDE1LjEtMTkzLjMsNDE1LjEtMTkyLjcsNDE0LjV6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_up__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_up__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE0MC40LDQwMy45bC0xMi41LDEyLjVjLTAuNywwLjctMS43LDAuNy0yLjQsMGwtMTkuNy0xOS43bC0xOS43LDE5LjdjLTAuNywwLjctMS43LDAuNy0yLjQsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0xMi41LTEyLjVjLTAuNy0wLjctMC43LTEuNywwLTIuNGwzMy40LTMzLjVjMC4zLTAuMywwLjgtMC41LDEuMi0wLjVjMC41'+
			'LDAsMC45LDAuMSwxLjMsMC41bDMzLjQsMzMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMzkuNyw0MDIuMi0xMzkuNyw0MDMuMy0xNDAuNCw0MDMuOXoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE5NC43LDQxNi40bDE5LjctMTkuN2wxOS43LDE5LjdjMC43LDAuNywxLjcsMC43LDIuNCwwbDEyLjUtMTIuNWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTMzLjQtMzMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMtMC4zLTAuOC0wLjUtMS4zLTAuNWMtMC40LDAtMC45LDAuMi0xLjIsMC41bC0zMy40LDMzLjVjLTAuNywwLjctMC43LDEuNywwLD'+
			'IuNGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTk2LjQsNDE3LjEtMTk1LjQsNDE3LjEtMTk0LjcsNDE2LjR6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._button_image_up__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 26px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_up.onmouseover=function (e) {
			me._button_image_up__img.style.visibility='hidden';
			me._button_image_up__imgo.style.visibility='inherit';
		}
		me._button_image_up.onmouseout=function (e) {
			me._button_image_up__img.style.visibility='inherit';
			me._button_image_up__imgo.style.visibility='hidden';
			me.elementMouseDown['button_image_up']=false;
		}
		me._button_image_up.onmousedown=function (e) {
			me.elementMouseDown['button_image_up']=true;
		}
		me._button_image_up.onmouseup=function (e) {
			me.elementMouseDown['button_image_up']=false;
		}
		me._button_image_up.ontouchend=function (e) {
			me.elementMouseDown['button_image_up']=false;
		}
		me._button_image_up.ggUpdatePosition=function (useTransition) {
		}
		me._button_direction.appendChild(me._button_image_up);
		me._hide_elements.appendChild(me._button_direction);
		el=me._zoomin=document.createElement('div');
		els=me._zoomin__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIyLjA2MSwxNC44MDNoLTQuODY0VjkuOTM4YzAtMC42NjEtMC41MzYtMS4xOTctMS4xOTctMS4xOTdjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N3Y0Ljg2NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtIOS45MzhjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTdjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDQuODY2djQuODY1YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5'+
			'NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtNC44NjVoNC44NjRjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NkMyMy4yNTcsMTUuMzM5LDIyLjcyMiwxNC44MDMsMjIuMDYxLDE0LjgwM3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0Ni'+
			'wyMy4xNDZjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6IiBz'+
			'dHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBkPSJNMjIuMDYxLDE0LjgwM2gtNC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3djQuODY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0g5LjkzOGMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjY2MSwwLDEuMTk3LTAuNT'+
			'M2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01'+
			'LjMxNC0xLjEyOS03LjE0Ni0yLjk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMD'+
			'AwMDAiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomin__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomin__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIj4KICA8cGF0aCBkPSJNMjIuMDYxLDE0LjgwM2gtNC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3djQuODY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0g5LjkzOGMtMC42NjEsMC0x'+
			'LjE5NiwwLjUzNi0xLjE5NiwxLjE5N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MD'+
			'MtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAuMDAxLDUuMzEzLDEu'+
			'MTMsNy4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCI+CiAgPHBhdGggZD0iTTIyLjA2MSwxNC44MDNoLTQuODY0VjkuOTM4YzAtMC42NjEtMC41MzYtMS4xOTctMS4xOTctMS4xOTdjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N3Y0Ljg2NSYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7JiN4OTtIOS45MzhjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTdjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDQuODY2djQuODY1YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtNC44NjVoNC44NjRjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NkMyMy4yNTcsMTUuMzM5LDIyLjcyMiwxNC44MDMsMjIuMDYxLDE0LjgwM3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2Ljkw'+
			'Myw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDZjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxJiN4ZDsmI3hhOyYjeDk7Ji'+
			'N4OTsmI3g5O2MyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._zoomin__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -47px;';
		hs+='position : absolute;';
		hs+='top : -31px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomin.onmouseover=function (e) {
			me._zoomin__img.style.visibility='hidden';
			me._zoomin__imgo.style.visibility='inherit';
		}
		me._zoomin.onmouseout=function (e) {
			me._zoomin__img.style.visibility='inherit';
			me._zoomin__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.onmousedown=function (e) {
			me.elementMouseDown['zoomin']=true;
		}
		me._zoomin.onmouseup=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ontouchend=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ggUpdatePosition=function (useTransition) {
		}
		me._hide_elements.appendChild(me._zoomin);
		el=me._zoomout=document.createElement('div');
		els=me._zoomout__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYmI3hkOyYj'+
			'eGE7JiN4OTsmI3g5OyYjeDk7YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3Lj'+
			'E0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyIvPgogPC9nPgogPGc+CiAgPHBhdGggZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNjYxLDAsMS4x'+
			'OTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuOD'+
			'k0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgo8L3N2Zz4K';
		me._zoomout__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomout__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIj4KICA8cGF0aCBkPSJNMjEuNzU4LDE0LjgwNEgxMC4yNDFjLTAuNjYsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDExLjUxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwx'+
			'LjE5Ny0xLjE5NkMyMi45NTUsMTUuMzM5LDIyLjQxOSwxNC44MDQsMjEuNzU4LDE0LjgwNHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LD'+
			'UuODkzLDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+CiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxs'+
			'PSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiPgogIDxwYXRoIGQ9Ik0yMS43NTgsMTQuODA0SDEwLjI0MWMtMC42NiwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMTEuNTE3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2QzIyLjk1NSwxNS4zMzksMjIuNDE5LDE0LjgwNCwyMS43NTgsMTQuODA0eiBNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMT'+
			'IuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0yMy4xNDYsMjMuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjFjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NiwyLjk2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7'+
			'JiN4OTtjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomout__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : -31px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomout.onmouseover=function (e) {
			me._zoomout__img.style.visibility='hidden';
			me._zoomout__imgo.style.visibility='inherit';
		}
		me._zoomout.onmouseout=function (e) {
			me._zoomout__img.style.visibility='inherit';
			me._zoomout__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.onmousedown=function (e) {
			me.elementMouseDown['zoomout']=true;
		}
		me._zoomout.onmouseup=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ontouchend=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ggUpdatePosition=function (useTransition) {
		}
		me._hide_elements.appendChild(me._zoomout);
		el=me._toggle_sound_control=document.createElement('div');
		els=me._toggle_sound_control__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OC42NTZweCIgZW5hYm'+
			'xlLWJhY2tncm91bmQ9Im5ldyAwLjI5OCAwLjMxNiA4OC42NTYgODguNTYzIiB4PSIwcHgiIGlkPSJPQkpFQ1RTIiBoZWlnaHQ9Ijg4LjU2M3B4IiB2aWV3Qm94PSIwLjI5OCAwLjMxNiA4OC42NTYgODguNTYzIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8Zz4KICA8Y2lyY2xlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcj0iMzIuMDc5IiBjeT0iNDUuMTE2IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiIGN4PSI0NC42NiIvPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTczLjA4NywyMi4yMzZMNzMuMDg3LDIyLjIzNmMwLjAw'+
			'MS0wLjAwMS0zLjE3MS00LjIwNi02LjY4MS02LjU1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwNS0wLjAwMy0wLjAxLTAuMDA2LTAuMDE2LTAuMDEyQzYwLjE0MywxMC45NDIsNTIuNTcxLDguMzc1LDQ0LjYsOC4zNzVjLTkuNjc2LDAtMTguNzczLDMuNzY4LTI1LjYxNCwxMC42MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy02Ljg0Miw2Ljg0MS0xMC42MSwxNS45MzktMTAuNjEsMjUuNjEzYzAsOC4yNTIsMi43NSwxNi4wNzcsNy44MDMsMjIuNDQ3YzAuMDAzLDAuMDA1LDAuMDA3LDAuMDEsMC4wMDgsMC4wMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjE1OSwxLjc4NiwzLjgxLDQuMTQ2LDQuOTQyLD'+
			'UuMTE1bC0wLjAwMSwwLjAwMWMwLjA0MiwwLjAzNiwwLjA4MiwwLjA2OCwwLjEyMSwwLjEwM2MwLjI1NiwwLjIxOCwwLjQwOSwwLjM0MywwLjQwOSwwLjM0M2gwLjAwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzYuNDU3LDUuMzA1LDE0LjQ3NSw4LjE5OSwyMi45NCw4LjE5OWM5LjY3NSwwLDE4Ljc3Mi0zLjc2OSwyNS42MTMtMTAuNjA5czEwLjYxLTE1Ljk0LDEwLjYxLTI1LjYxNCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzgwLjgyMywzNi4zODMsNzguMDk4LDI4LjU5MSw3My4wODcsMjIuMjM2eiBNNTkuMDg5LDY3LjQxYzAsMi4wNzEtMS42ODQsMy43NTItMy43NTEsMy43NTJjLTAuNjYxLDAtMS4zMTYt'+
			'MC4xODEtMS44OTctMC41MjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wNzctMC4wNDQtMC4xNDUtMC4wOTgtMC4yMDktMC4xNTdMMzcuNDg0LDU1LjgyM2wtMC4wMDUsMC4wMDRjLTAuNjk4LTAuNTg3LTEuMDc2LTAuMzYtMS4wNzYtMC4zNmgtNi43OTJoLTIuNTZoLTAuNDM3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTIuMDY2LDAtMy43NDctMS42ODMtMy43NDctMy43NVYzNi4yNzFjMC0yLjA2NiwxLjY4MS0zLjc0OSwzLjc0Ny0zLjc0OWgxMC4wNWMwLjIwMSwwLDAuMzk4LTAuMDQ0LDAuNTc5LTAuMTMxbDE1Ljk4OS0xNC44ODUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA2NS0wLjA2LDAuMTM1LT'+
			'AuMTE0LDAuMjA5LTAuMTU3YzAuNTgxLTAuMzQyLDEuMjM2LTAuNTIzLDEuODk3LTAuNTIzYzIuMDY4LDAsMy43NTEsMS42ODUsMy43NTEsMy43NTF2NS40MDlsMC4wMDEtMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O3Y4LjIzMmwwLDBMNTkuMDg5LDY3LjQxTDU5LjA4OSw2Ny40MXoiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgo8L3N2Zz4K';
		me._toggle_sound_control__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._toggle_sound_control__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OC42NTZweCIgZW5hYm'+
			'xlLWJhY2tncm91bmQ9Im5ldyAwLjI5OCAwLjMxNiA4OC42NTYgODguNTYzIiB4PSIwcHgiIGlkPSJPQkpFQ1RTIiBoZWlnaHQ9Ijg4LjU2M3B4IiB2aWV3Qm94PSIwLjI5OCAwLjMxNiA4OC42NTYgODguNTYzIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8Zz4KICA8Y2lyY2xlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcj0iMzguNjEiIGN5PSI0NS4yMjEiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgY3g9IjQ0LjY3MyIvPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTc4Ljg4OCwxNy42ODRMNzguODg4LDE3LjY4NGMwLjAw'+
			'MS0wLjAwMS0zLjgxNi01LjA2My04LjA0MS03Ljg5MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwNi0wLjAwNC0wLjAxMy0wLjAwOC0wLjAyLTAuMDE0QzYzLjMwOCw0LjA5LDU0LjE5NCwxLDQ0LjYsMUMzMi45NTQsMSwyMi4wMDUsNS41MzUsMTMuNzcxLDEzLjc3MSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzUuNTM2LDIyLjAwNCwxLDMyLjk1NSwxLDQ0LjU5OWMwLDkuOTMyLDMuMzExLDE5LjM1LDkuMzkyLDI3LjAxNmMwLjAwNCwwLjAwNiwwLjAwOCwwLjAxMiwwLjAxLDAuMDImI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjM5NSwyLjE1LDQuNTg2LDQuOTksNS45NDgsNi4xNTZsLTAuMDAyLDAuMDAyYz'+
			'AuMDUsMC4wNDMsMC4wOTksMC4wODIsMC4xNDYsMC4xMjNjMC4zMDgsMC4yNjIsMC40OTIsMC40MTIsMC40OTIsMC40MTJoMC4wMDImI3hkOyYjeGE7JiN4OTsmI3g5O2M3Ljc3MSw2LjM4NSwxNy40MjIsOS44NjksMjcuNjEsOS44NjljMTEuNjQ2LDAsMjIuNTk1LTQuNTM1LDMwLjgyOC0xMi43N3MxMi43NzEtMTkuMTg2LDEyLjc3MS0zMC44MjkmI3hkOyYjeGE7JiN4OTsmI3g5O0M4OC4xOTgsMzQuNzExLDg0LjkxOCwyNS4zMzIsNzguODg4LDE3LjY4NHogTTYyLjA0LDcyLjA1NGMwLDIuNDkyLTIuMDI2LDQuNTE2LTQuNTE2LDQuNTE2Yy0wLjc5NSwwLTEuNTg0LTAuMjE3LTIuMjgzLTAuNjI3'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMDkyLTAuMDUzLTAuMTc0LTAuMTE3LTAuMjUyLTAuMTg5TDM2LjAzNiw1OC4xMDlsLTAuMDA2LDAuMDA0Yy0wLjg0LTAuNzA3LTEuMjk1LTAuNDM0LTEuMjk1LTAuNDM0SDI2LjU2aC0zLjA4MWgtMC41MjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMi40ODcsMC00LjUxLTIuMDI1LTQuNTEtNC41MTN2LTE4LjU5YzAtMi40ODYsMi4wMjItNC41MTIsNC41MS00LjUxMmgxMi4wOTdjMC4yNDEsMCwwLjQ3OS0wLjA1NCwwLjY5Ni0wLjE1OEw1NC45ODksMTEuOTkmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA3OC0wLjA3MiwwLjE2Mi0wLjEzNywwLjI1Mi0wLjE4OG'+
			'MwLjY5OS0wLjQxMiwxLjQ4OC0wLjYzLDIuMjgzLTAuNjNjMi40ODksMCw0LjUxNiwyLjAyNyw0LjUxNiw0LjUxNnY2LjUxbDAuMDAxLTAuMDAydjkuOTA4JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMCwwTDYyLjA0LDcyLjA1NEw2Mi4wNCw3Mi4wNTR6IiBzdHJva2U9IiMwMDAwMDAiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._toggle_sound_control__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="toggle_sound_control";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 31px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -97px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._toggle_sound_control.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._toggle_sound_control.onclick=function (e) {
			var flag=me._sound.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._sound.style[domTransition]='none';
			} else {
				me._sound.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._sound.style.opacity='0';
				me._sound.style.visibility='hidden';
			} else {
				me._sound.style.opacity='1';
				me._sound.style.visibility=me._sound.ggVisible?'inherit':'hidden';
			}
			me._sound.ggOpacitiyActive=!flag;
		}
		me._toggle_sound_control.onmouseover=function (e) {
			me._tt_sound.style[domTransition]='none';
			me._tt_sound.style.visibility=(Number(me._tt_sound.style.opacity)>0||!me._tt_sound.style.opacity)?'inherit':'hidden';
			me._tt_sound.ggVisible=true;
			me._toggle_sound_control__img.style.visibility='hidden';
			me._toggle_sound_control__imgo.style.visibility='inherit';
			me.elementMouseOver['toggle_sound_control']=true;
			me._tt_sound.logicBlock_visible();
		}
		me._toggle_sound_control.onmouseout=function (e) {
			me._tt_sound.style[domTransition]='none';
			me._tt_sound.style.visibility='hidden';
			me._tt_sound.ggVisible=false;
			me._toggle_sound_control__img.style.visibility='inherit';
			me._toggle_sound_control__imgo.style.visibility='hidden';
			me.elementMouseOver['toggle_sound_control']=false;
			me._tt_sound.logicBlock_visible();
		}
		me._toggle_sound_control.ontouchend=function (e) {
			me.elementMouseOver['toggle_sound_control']=false;
			me._tt_sound.logicBlock_visible();
		}
		me._toggle_sound_control.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_sound=document.createElement('div');
		els=me._tt_sound__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_sound";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -21px;';
		hs+='position : absolute;';
		hs+='top : -25px;';
		hs+='visibility : hidden;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 70px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Sound";
		el.appendChild(els);
		me._tt_sound.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_sound.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['toggle_sound_control'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_sound.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_sound.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_sound.style[domTransition]='';
				if (me._tt_sound.ggCurrentLogicStateVisible == 0) {
					me._tt_sound.style.visibility=(Number(me._tt_sound.style.opacity)>0||!me._tt_sound.style.opacity)?'inherit':'hidden';
					me._tt_sound.ggVisible=true;
				}
				else {
					me._tt_sound.style.visibility="hidden";
					me._tt_sound.ggVisible=false;
				}
			}
		}
		me._tt_sound.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_sound_white=document.createElement('div');
		els=me._tt_sound_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_sound_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 70px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Sound";
		el.appendChild(els);
		me._tt_sound_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_sound_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_sound.appendChild(me._tt_sound_white);
		me._toggle_sound_control.appendChild(me._tt_sound);
		me._hide_elements.appendChild(me._toggle_sound_control);
		me.divSkin.appendChild(me._hide_elements);
		el=me._loading=document.createElement('div');
		el.ggId="loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading.onclick=function (e) {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		me._loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._loadingbg=document.createElement('div');
		el.ggId="loadingbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+=cssPrefix + 'border-radius : 3px;';
		hs+='border-radius : 3px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 1px solid rgba(83,83,83,0.862745);';
		hs+='cursor : default;';
		hs+='height : 59px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 209px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loadingbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbg.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbg);
		el=me._loadingtext=document.createElement('div');
		els=me._loadingtext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loadingtext";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 16px;';
		hs+='position : absolute;';
		hs+='top : 12px;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loadingtext.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loadingtext.ggUpdateText();
		});
		el.appendChild(els);
		me._loadingtext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingtext.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingtext);
		el=me._loadingbar=document.createElement('div');
		el.ggId="loadingbar";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #808080;';
		hs+='cursor : default;';
		hs+='height : 12px;';
		hs+='left : 15px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : inherit;';
		hs+='width : 181px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		me._loadingbar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbar.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbar);
		me.divSkin.appendChild(me._loading);
		el=me._hide_timer=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=5000;
		el.ggId="hide_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 489px;';
		hs+='position : absolute;';
		hs+='top : 764px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_timer.ggIsActive=function() {
			return (me._hide_timer.ggTimestamp + me._hide_timer.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_timer.ggActivate=function () {
			if (player.transitionsDisabled) {
				me._hide_elements.style[domTransition]='none';
			} else {
				me._hide_elements.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._hide_elements.style.opacity='1';
			me._hide_elements.style.visibility=me._hide_elements.ggVisible?'inherit':'hidden';
		}
		me._hide_timer.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._hide_elements.style[domTransition]='none';
			} else {
				me._hide_elements.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._hide_elements.style.opacity='0.4';
			me._hide_elements.style.visibility=me._hide_elements.ggVisible?'inherit':'hidden';
		}
		me._hide_timer.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._hide_timer);
		el=me._video_screentint_youtube=document.createElement('div');
		el.ggId="video_screentint_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : -0.0454545%;';
		hs+='position : absolute;';
		hs+='top : -0.0588235%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_screentint_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_screentint_youtube.onclick=function (e) {
			me._video_screentint_youtube.style[domTransition]='none';
			me._video_screentint_youtube.style.visibility='hidden';
			me._video_screentint_youtube.ggVisible=false;
			me._popup_video_youtube.ggInitMedia('');
			me._popup_video_youtube.style[domTransition]='none';
			me._popup_video_youtube.style.visibility='hidden';
			me._popup_video_youtube.ggVisible=false;
			me._video_popup_youtube.style[domTransition]='none';
			me._video_popup_youtube.style.visibility='hidden';
			me._video_popup_youtube.ggVisible=false;
			me._video_popup_close_youtube.style[domTransition]='none';
			me._video_popup_close_youtube.style.visibility='hidden';
			me._video_popup_close_youtube.ggVisible=false;
		}
		me._video_screentint_youtube.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._video_screentint_youtube);
		el=me._video_popup_youtube=document.createElement('div');
		el.ggId="video_popup_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_youtube=document.createElement('div');
		els=me._loading_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiA8Y2lyY2xlIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuMTI1cyIgZHVyPSIxcyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszOzA7MCIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQg'+
			'MC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszOzA7MCIgYXR0cmlidXRlTmFtZT0iciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiByPSIwIiBjeT0iMyIgY3g9IjE2Ij4KICA8YW5pbWF0ZSBiZWdpbj0iMC4zNzVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIi'+
			'ByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIHI9IjAiIGN5PSIzIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjYyNXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMi'+
			'AwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwOzM7MDswIiBhdHRyaWJ1dGVOYW1lPSJyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIHI9IjAiIGN5PSIzIiBjeD0iMTYiPgogIDxhbmltYXRlIGJlZ2luPSIwLjg3NXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRl'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgcj0iMCIgY3k9IjMiIGN4PSIxNiI+CiAgPGFuaW1hdGUgYmVnaW49IjAuNXMiIGR1cj0iMXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzswOzAiIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_youtube.appendChild(me._loading_video_youtube);
		el=me._popup_video_youtube=document.createElement('div');
		me._popup_video_youtube.seekbars = [];
		me._popup_video_youtube.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_youtube.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_youtube.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_youtube.hasChildNodes()) {
				me._popup_video_youtube.removeChild(me._popup_video_youtube.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_youtube.ggVideoNotLoaded ==false && me._popup_video_youtube.ggDeactivate) { me._popup_video_youtube.ggDeactivate(); }
				me._popup_video_youtube.ggVideoNotLoaded = true;
			me._popup_video_youtube.ggYoutubeApiReady = function() { me._popup_video_youtube.ggYoutubeApiLoaded = true;}
				return;
			}
			me._popup_video_youtube.ggVideoNotLoaded = false;
			me._popup_video_youtube__vid=document.createElement('iframe');
			me._popup_video_youtube__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;controls=1&amp;loop=0&amp;enablejsapi=0&amp;rel=0';
			var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
			me._popup_video_youtube__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_youtube__vid.setAttribute('width', '100%');
			me._popup_video_youtube__vid.setAttribute('height', '100%');
			me._popup_video_youtube__vid.setAttribute('allow', 'autoplay');
			me._popup_video_youtube__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_youtube__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_youtube.appendChild(me._popup_video_youtube__vid);
			me._popup_video_youtube.ggVideoSource = media;
			if (me._popup_video_youtube.ggYoutubeApiLoaded && me._popup_video_youtube.ggYoutubeApiLoaded == true) {me._popup_video_youtube.ggYoutubeApiReady();}
		}
		el.ggId="popup_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_youtube.appendChild(me._popup_video_youtube);
		me.divSkin.appendChild(me._video_popup_youtube);
		el=me._video_popup_close_youtube=document.createElement('div');
		els=me._video_popup_close_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._video_popup_close_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._video_popup_close_youtube__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0w'+
			'LjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4x'+
			'LTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._video_popup_close_youtube__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="video_popup_close_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_close_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_close_youtube.onclick=function (e) {
			me._video_screentint_youtube.style[domTransition]='none';
			me._video_screentint_youtube.style.visibility='hidden';
			me._video_screentint_youtube.ggVisible=false;
			me._popup_video_youtube.ggInitMedia('');
			me._popup_video_youtube.style[domTransition]='none';
			me._popup_video_youtube.style.visibility='hidden';
			me._popup_video_youtube.ggVisible=false;
			me._video_popup_youtube.style[domTransition]='none';
			me._video_popup_youtube.style.visibility='hidden';
			me._video_popup_youtube.ggVisible=false;
			me._video_popup_close_youtube.style[domTransition]='none';
			me._video_popup_close_youtube.style.visibility='hidden';
			me._video_popup_close_youtube.ggVisible=false;
		}
		me._video_popup_close_youtube.onmouseover=function (e) {
			me._video_popup_close_youtube__img.style.visibility='hidden';
			me._video_popup_close_youtube__imgo.style.visibility='inherit';
		}
		me._video_popup_close_youtube.onmouseout=function (e) {
			me._video_popup_close_youtube__img.style.visibility='inherit';
			me._video_popup_close_youtube__imgo.style.visibility='hidden';
		}
		me._video_popup_close_youtube.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._video_popup_close_youtube);
		el=me._manu_background=document.createElement('div');
		el.ggId="manu_background";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.501961);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._manu_background.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._manu_background.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible_1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._manu_background.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._manu_background.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._manu_background.style[domTransition]='opacity 500ms ease 0ms';
				if (me._manu_background.ggCurrentLogicStateAlpha == 0) {
					me._manu_background.style.visibility=me._manu_background.ggVisible?'inherit':'hidden';
					me._manu_background.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._manu_background.style.opacity == 0.0) { me._manu_background.style.visibility="hidden"; } }, 505);
					me._manu_background.style.opacity=0;
				}
			}
		}
		me._manu_background.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_scroller=document.createElement('div');
		els=me._node_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 99px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 149.5px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller.ggScrollByX = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0) return;
			me._node_scroller.ggScrollPosX = (me._node_scroller__horScrollFg.offsetLeft + diffX);
			me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
			me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
		}
		me._node_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller.ggScrollPosX >= me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth)) {
					me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller.ggScrollPosX <= 0)) {
					me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller.ggScrollByY = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0) return;
			me._node_scroller.ggScrollPosY = (me._node_scroller__vertScrollFg.offsetTop + diffY);
			me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
			me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
		}
		me._node_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller.ggScrollPosY >= me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight)) {
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller.ggScrollPosY <= 0)) {
					me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0))) * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0))) * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller.ggDragLastX = t[0].clientX;
			me._node_scroller.ggDragLastY = t[0].clientY;
			me._node_scroller__content.ontouchend = function() {
				me._node_scroller__content.ontouchend = null;
				me._node_scroller__content.ontouchmove = null;
			}
			me._node_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._node_scroller.ggDragLastX;
				var diffY = t[0].clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastX = t[0].clientX;
				me._node_scroller.ggDragLastY = t[0].clientY;
				me._node_scroller.ggScrollByX(-diffX);
				me._node_scroller.ggScrollByY(-diffY);
			}
		}
		elVertScrollBg = me._node_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 850px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 850px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller.ggScrollPosY = 0;
		me._node_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastY = e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller.ggDragLastY = t[0].clientY;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffY = t[0].clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragLastY = t[0].clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller.ggScrollHeight;
			if (e.offsetY < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(100%  -  50px);';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible_1') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller.style.visibility=me._node_scroller.ggVisible?'inherit':'hidden';
					me._node_scroller.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller.style.opacity == 0.0) { me._node_scroller.style.visibility="hidden"; } }, 505);
					me._node_scroller.style.opacity=0;
				}
			}
		}
		me._node_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._node_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._node_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._node_scroller__vertScrollBg.style.visibility = 'inherit';
					me._node_scroller__vertScrollFg.style.visibility = 'inherit';
					me._node_scroller.ggVertScrollVisible = true;
				} else {
					me._node_scroller__vertScrollBg.style.visibility = 'hidden';
					me._node_scroller__vertScrollFg.style.visibility = 'hidden';
					me._node_scroller.ggVertScrollVisible = false;
				}
				if(me._node_scroller.ggVertScrollVisible) {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth - 15;
					if (me._node_scroller.ggHorScrollVisible) {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight - 15;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height - me._node_scroller__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height;
						me._node_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller__vertScrollBg.style.height = me._node_scroller.ggAvailableHeight + 'px';
					me._node_scroller.ggVPercentVisible = me._node_scroller.ggAvailableHeightWithScale / contentHeight;
					if (me._node_scroller.ggVPercentVisible > 1.0) me._node_scroller.ggVPercentVisible = 1.0;
					me._node_scroller.ggScrollHeight =  Math.round(me._node_scroller__vertScrollBg.offsetHeight * me._node_scroller.ggVPercentVisible);
					me._node_scroller__vertScrollFg.style.height = me._node_scroller.ggScrollHeight + 'px';
					me._node_scroller.ggScrollPosY = me._node_scroller.ggScrollPosYPercent * me._node_scroller.ggAvailableHeight;
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
					me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				} else {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth;
					me._node_scroller.ggScrollPosY = 0;
					me._node_scroller.ggScrollPosYPercent = 0.0;
					me._node_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller.ggVertScrollVisible) {
					me.updateSize(me._node_scroller);
					me._node_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 140;
		el.ggHeight = 100;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_active = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner.ggUpdating == true) return;
			me._node_cloner.ggUpdating = true;
			var el=me._node_cloner;
			var curNumCols = 0;
			curNumCols = me._node_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner.callChildLogicBlocks_changenode();
			me._node_cloner.callChildLogicBlocks_mouseover();
			me._node_cloner.callChildLogicBlocks_active();
			me._node_cloner.callChildLogicBlocks_changevisitednodes();
			me._node_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner.parentNode.classList.contains('ggskin_subelement') && me._node_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 100px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner.childNodes.length; i++) {
				var child=me._node_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner.ggUpdatePosition=function (useTransition) {
				me._node_cloner.ggUpdate();
		}
		me._node_cloner.ggNodeChange=function () {
			me._node_cloner.ggUpdateConditionNodeChange();
		}
		me._node_scroller__content.appendChild(me._node_cloner);
		me._manu_background.appendChild(me._node_scroller);
		el=me._category_scroller=document.createElement('div');
		els=me._category_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 36px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 149px;';
		hs+="";
		els.setAttribute('style',hs);
		me._category_scroller.ggScrollByX = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0) return;
			me._category_scroller.ggScrollPosX = (me._category_scroller__horScrollFg.offsetLeft + diffX);
			me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
			me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
		}
		me._category_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._category_scroller.ggHorScrollVisible || diffX == 0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._category_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._category_scroller.ggScrollPosX >= me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth)) {
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._category_scroller.ggScrollPosX <= 0)) {
					me._category_scroller.ggScrollPosX = Math.max(me._category_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
			me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + me._category_scroller.ggContentLeftOffset + 'px';
			me._category_scroller.ggScrollPosXPercent = (me._category_scroller__horScrollFg.offsetLeft / me._category_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._category_scroller.ggScrollByY = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0) return;
			me._category_scroller.ggScrollPosY = (me._category_scroller__vertScrollFg.offsetTop + diffY);
			me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
			me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
		}
		me._category_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._category_scroller.ggVertScrollVisible || diffY == 0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._category_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._category_scroller.ggScrollPosY >= me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight)) {
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._category_scroller.ggScrollPosY <= 0)) {
					me._category_scroller.ggScrollPosY = Math.max(me._category_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
			me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + me._category_scroller.ggContentTopOffset + 'px';
			me._category_scroller.ggScrollPosYPercent = (me._category_scroller__vertScrollFg.offsetTop / me._category_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._category_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._category_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._category_scroller.offsetWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._category_scroller.offsetWidth - (me._category_scroller.ggVertScrollVisible ? 15 : 0))) * me._category_scroller.ggHPercentVisible);
					me._category_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._category_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._category_scroller.offsetHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._category_scroller.offsetHeight - (me._category_scroller.ggHorScrollVisible ? 15 : 0))) * me._category_scroller.ggVPercentVisible);
					me._category_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._category_scroller.ggDragLastX = t[0].clientX;
			me._category_scroller.ggDragLastY = t[0].clientY;
			me._category_scroller__content.ontouchend = function() {
				me._category_scroller__content.ontouchend = null;
				me._category_scroller__content.ontouchmove = null;
			}
			me._category_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._category_scroller.ggDragLastX;
				var diffY = t[0].clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastX = t[0].clientX;
				me._category_scroller.ggDragLastY = t[0].clientY;
				me._category_scroller.ggScrollByX(-diffX);
				me._category_scroller.ggScrollByY(-diffY);
			}
		}
		elHorScrollBg = me._category_scroller__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 178px; height: 15px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._category_scroller__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 178px; height: 15px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		me._category_scroller.ggScrollPosX = 0;
		me._category_scroller.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragLastX = e.clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastX = t[0].clientX;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffX = t[0].clientX - me._category_scroller.ggDragLastX;
				me._category_scroller.ggDragLastX = t[0].clientX;
				me._category_scroller.ggScrollByX(diffX);
			}
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._category_scroller.ggScrollWidth;
			if (e.offsetX < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__horScrollBg.getBoundingClientRect();
			var diffX = me._category_scroller.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._category_scroller.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._category_scroller.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._category_scroller.ggScrollByXSmooth(20 * wheelDelta);
		});
		elVertScrollBg = me._category_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 480px; background-color: rgba(128,128,128,0.752941); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._category_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 480px; background-color: rgba(192,192,192,0.752941); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._category_scroller.ggScrollPosY = 0;
		me._category_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._category_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastY = e.clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._category_scroller.ggDragLastY = t[0].clientY;
			document.ontouchend = function() {
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
			var t = e.touches;
				var diffY = t[0].clientY - me._category_scroller.ggDragLastY;
				me._category_scroller.ggDragLastY = t[0].clientY;
				me._category_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._category_scroller.ggScrollHeight;
			if (e.offsetY < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._category_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._category_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._category_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._category_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._category_scroller.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._category_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="category_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(100%  -  50px);';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_scroller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_scroller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('node_visible') == true)) || 
				((player.getVariableValue('category_visible_1') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._category_scroller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._category_scroller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._category_scroller.style[domTransition]='opacity 500ms ease 0ms';
				if (me._category_scroller.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._category_scroller.style.opacity == 0.0) { me._category_scroller.style.visibility="hidden"; } }, 505);
					me._category_scroller.style.opacity=0;
				}
				else {
					me._category_scroller.style.visibility=me._category_scroller.ggVisible?'inherit':'hidden';
					me._category_scroller.style.opacity=1;
				}
			}
		}
		me._category_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if (contentWidth > offsetWidthWithScale) {
					me._category_scroller__horScrollBg.style.visibility = 'inherit';
					me._category_scroller__horScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggHorScrollVisible = true;
				} else {
					me._category_scroller__horScrollBg.style.visibility = 'hidden';
					me._category_scroller__horScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggHorScrollVisible = false;
				}
				if ((me._category_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._category_scroller.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._category_scroller__vertScrollBg.style.visibility = 'inherit';
					me._category_scroller__vertScrollFg.style.visibility = 'inherit';
					me._category_scroller.ggVertScrollVisible = true;
					if (!me._category_scroller.ggHorScrollVisible && (contentWidth > offsetWidthWithScale - me._category_scroller__vertScrollBg.getBoundingClientRect().width)) {
						me._category_scroller__horScrollBg.style.visibility = 'inherit';
						me._category_scroller__horScrollFg.style.visibility = 'inherit';
						me._category_scroller.ggHorScrollVisible = true;
					}
				} else {
					me._category_scroller__vertScrollBg.style.visibility = 'hidden';
					me._category_scroller__vertScrollFg.style.visibility = 'hidden';
					me._category_scroller.ggVertScrollVisible = false;
				}
				if(me._category_scroller.ggHorScrollVisible) {
					me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight - 15;
					if (me._category_scroller.ggVertScrollVisible) {
						me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth - 15;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width - me._category_scroller__horScrollBg.getBoundingClientRect().height;
					} else {
						me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth;
						me._category_scroller.ggAvailableWidthWithScale = me._category_scroller.getBoundingClientRect().width;
					}
					me._category_scroller__horScrollBg.style.width = me._category_scroller.ggAvailableWidth + 'px';
					me._category_scroller.ggHPercentVisible = me._category_scroller.ggAvailableWidthWithScale / contentWidth;
					if (me._category_scroller.ggHPercentVisible > 1.0) me._category_scroller.ggHPercentVisible = 1.0;
					me._category_scroller.ggScrollWidth = Math.round(me._category_scroller__horScrollBg.offsetWidth * me._category_scroller.ggHPercentVisible);
					me._category_scroller__horScrollFg.style.width = me._category_scroller.ggScrollWidth + 'px';
					me._category_scroller.ggScrollPosX = me._category_scroller.ggScrollPosXPercent * me._category_scroller.ggAvailableWidth;
					me._category_scroller.ggScrollPosX = Math.min(me._category_scroller.ggScrollPosX, me._category_scroller__horScrollBg.offsetWidth - me._category_scroller__horScrollFg.offsetWidth);
					me._category_scroller__horScrollFg.style.left = me._category_scroller.ggScrollPosX + 'px';
					me._category_scroller__content.style.left = -(Math.round(me._category_scroller.ggScrollPosX / me._category_scroller.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				} else {
					me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight;
					me._category_scroller.ggScrollPosX = 0;
					me._category_scroller.ggScrollPosXPercent = 0.0;
					me._category_scroller__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(me._category_scroller.ggVertScrollVisible) {
					me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth - 15;
					if (me._category_scroller.ggHorScrollVisible) {
						me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight - 15;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height - me._category_scroller__vertScrollBg.getBoundingClientRect().width;
						me._category_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._category_scroller.ggAvailableHeight = me._category_scroller.offsetHeight;
						me._category_scroller.ggAvailableHeightWithScale = me._category_scroller.getBoundingClientRect().height;
						me._category_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._category_scroller__vertScrollBg.style.height = me._category_scroller.ggAvailableHeight + 'px';
					me._category_scroller.ggVPercentVisible = me._category_scroller.ggAvailableHeightWithScale / contentHeight;
					if (me._category_scroller.ggVPercentVisible > 1.0) me._category_scroller.ggVPercentVisible = 1.0;
					me._category_scroller.ggScrollHeight =  Math.round(me._category_scroller__vertScrollBg.offsetHeight * me._category_scroller.ggVPercentVisible);
					me._category_scroller__vertScrollFg.style.height = me._category_scroller.ggScrollHeight + 'px';
					me._category_scroller.ggScrollPosY = me._category_scroller.ggScrollPosYPercent * me._category_scroller.ggAvailableHeight;
					me._category_scroller.ggScrollPosY = Math.min(me._category_scroller.ggScrollPosY, me._category_scroller__vertScrollBg.offsetHeight - me._category_scroller__vertScrollFg.offsetHeight);
					me._category_scroller__vertScrollFg.style.top = me._category_scroller.ggScrollPosY + 'px';
					me._category_scroller__content.style.top = -(Math.round(me._category_scroller.ggScrollPosY / me._category_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				} else {
					me._category_scroller.ggAvailableWidth = me._category_scroller.offsetWidth;
					me._category_scroller.ggScrollPosY = 0;
					me._category_scroller.ggScrollPosYPercent = 0.0;
					me._category_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._category_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._category_scroller.ggHorScrollVisible || vertScrollWasVisible != me._category_scroller.ggVertScrollVisible) {
					me.updateSize(me._category_scroller);
					me._category_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._category_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 140;
		el.ggHeight = 37;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		el.ggUpdate = function(filter) {
			if(me._category_cloner.ggUpdating == true) return;
			me._category_cloner.ggUpdating = true;
			var el=me._category_cloner;
			var curNumCols = 0;
			curNumCols = me._category_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._category_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._category_cloner.ggHeight) + 'px';
				parameter.left=(column * me._category_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_category_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._category_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._category_cloner.parentNode.classList.contains('ggskin_subelement') && me._category_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._category_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"",title:"All"},
			];
		el.ggId="category_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 37px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._category_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._category_cloner.childNodes.length; i++) {
				var child=me._category_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._category_cloner.ggUpdatePosition=function (useTransition) {
				me._category_cloner.ggUpdate();
		}
		me._category_cloner.ggNodeChange=function () {
			me._category_cloner.ggUpdateConditionNodeChange();
		}
		me._category_scroller__content.appendChild(me._category_cloner);
		me._manu_background.appendChild(me._category_scroller);
		me.divSkin.appendChild(me._manu_background);
		el=me._menu_open=document.createElement('div');
		els=me._menu_open__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxyZWN0IHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjMxNyIgeD0iODguNSIgaGVpZ2h0PSIzMTQiIHk9IjEwNC41IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiLz4KIDxwYXRoIGQ9Ik00NTMuMzMyLDBINTguNjY4QzI2LjMwNSwwLDAsMjYuMzA1LDAsNTguNjY4djM5NC42NjRDMCw0ODUuNjk1LDI2LjMwNSw1MTIsNTguNjY4LDUxMmgzOTQu'+
			'NjY0JiN4ZDsmI3hhOyYjeDk7QzQ4NS42OTUsNTEyLDUxMiw0ODUuNjk1LDUxMiw0NTMuMzMyVjU4LjY2OEM1MTIsMjYuMzA1LDQ4NS42OTUsMCw0NTMuMzMyLDB6IE0zNDEuMzMyLDM2Mi42NjhIMTcwLjY2OCYjeGQ7JiN4YTsmI3g5O2MtMTEuNzk3LDAtMjEuMzM2LTkuNTU5LTIxLjMzNi0yMS4zMzZjMC0xMS43NzMsOS41MzktMjEuMzMyLDIxLjMzNi0yMS4zMzJoMTcwLjY2NGMxMS43OTcsMCwyMS4zMzYsOS41NTksMjEuMzM2LDIxLjMzMiYjeGQ7JiN4YTsmI3g5O0MzNjIuNjY4LDM1My4xMDksMzUzLjEyOSwzNjIuNjY4LDM0MS4zMzIsMzYyLjY2OHogTTM0MS4zMzIsMjc3LjMzMkgxNzAuNj'+
			'Y4Yy0xMS43OTcsMC0yMS4zMzYtOS41NTUtMjEuMzM2LTIxLjMzMiYjeGQ7JiN4YTsmI3g5O3M5LjUzOS0yMS4zMzIsMjEuMzM2LTIxLjMzMmgxNzAuNjY0YzExLjc5NywwLDIxLjMzNiw5LjU1NSwyMS4zMzYsMjEuMzMyUzM1My4xMjksMjc3LjMzMiwzNDEuMzMyLDI3Ny4zMzJ6IE0zNDEuMzMyLDE5MkgxNzAuNjY4JiN4ZDsmI3hhOyYjeDk7Yy0xMS43OTcsMC0yMS4zMzYtOS41NTktMjEuMzM2LTIxLjMzMmMwLTExLjc3Nyw5LjUzOS0yMS4zMzYsMjEuMzM2LTIxLjMzNmgxNzAuNjY0YzExLjc5NywwLDIxLjMzNiw5LjU1OSwyMS4zMzYsMjEuMzM2JiN4ZDsmI3hhOyYjeDk7QzM2Mi42NjgsMTgy'+
			'LjQ0MSwzNTMuMTI5LDE5MiwzNDEuMzMyLDE5MnoiLz4KPC9zdmc+Cg==';
		me._menu_open__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="menu_open";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_open.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('category_visible_1') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._menu_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._menu_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStatePosition == 0) {
					me._menu_open.style.left='130px';
					me._menu_open.style.top='5px';
				}
				else {
					me._menu_open.style.left='5px';
					me._menu_open.style.top='5px';
				}
			}
		}
		me._menu_open.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['menu_open'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('category_visible_1') == false))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_open.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_open.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_open.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStateAlpha == 0) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
				else if (me._menu_open.ggCurrentLogicStateAlpha == 1) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=0.6;
				}
				else {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
			}
		}
		me._menu_open.onclick=function (e) {
			if (
				(
					((player.getVariableValue('node_visible') == false))
				)
			) {
				player.setVariableValue('category_visible_1', !player.getVariableValue('category_visible_1'));
			}
			player.setVariableValue('node_visible', false);
		}
		me._menu_open.onmouseover=function (e) {
			me.elementMouseOver['menu_open']=true;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.onmouseout=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ontouchend=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._menu_open);
		me._map_1.ggMarkerInstances=[];
		me._map_1.ggMapId = 'googlehybrid';
		me._map_1.ggLastNodeId=null;
		me._map_1.ggMarkerArray=[];
		me._map_1.ggGoogleMarkerArray=[];
		me._map_1.ggLastZoom = -1;
		me._map_1.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_1.ggRadar.update=function() {
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			var radar=me._map_1.ggRadar;
			var map=me._map_1.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
				pan -= me._map_1.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat()) && (gps[1]==radar.activeNodeLatLng.lng())) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.976563;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat() * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng();
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat();
					radar_path.push(new google.maps.LatLng(y, x));
				}
				if (radar.poly) {
					radar.poly.setMap(null);
					radar.poly = null;
				}
				radar.poly = new google.maps.Polygon({
					paths: radar_path,
					strokeColor: '#ff0000',
					strokeOpacity: 0.8,
					strokeWeight: 1,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				});
				radar.poly.setMap(map);
			} else {
				if (radar) {
					activeNodeLatLng = new google.maps.LatLng(0,0);
					if (radar.poly) {
						radar.poly.setMap(null);
						radar.poly = null;
					}
				}
			}
		}
		me._map_1.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_1.ggInitMap=function(keepZoom) {
			me._map_1.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_1.ggMapId);
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (mapType == 'file') {
				me._map_1.style.backgroundColor = mapDetails['bgcolor'];
				me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_1.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = new google.maps.LatLng(0,0);
			}
			if (mapType == 'web') {
				var mapTypeId;
				if (me._map_1.ggMapId == 'googleroadmap') {
					mapTypeId = google.maps.MapTypeId.ROADMAP;
				} else if (me._map_1.ggMapId == 'googlehybrid') {
					mapTypeId = google.maps.MapTypeId.HYBRID;
				} else if (me._map_1.ggMapId == 'googlesatellite') {
					mapTypeId = google.maps.MapTypeId.SATELLITE;
				} else if (me._map_1.ggMapId == 'googleterrain') {
					mapTypeId = google.maps.MapTypeId.TERRAIN;
				} else {
					mapTypeId = mapDetails['mapprovider'];
				}
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 14;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 14;
				var mapOptions = {
					zoom: initZoom,
					center: activeNodeLatLng,
					mapTypeId: mapTypeId,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				if (mapTypeId == 'googlecustomstyle') {
					var styledMapType = new google.maps.StyledMapType(JSON.parse(mapDetails['googlecustomstylecode']), {name: 'Styled Map'});
					me._map_1.ggMap.mapTypes.set('styled_map', styledMapType);
					me._map_1.ggMap.setMapTypeId('styled_map');
				}
				if (mapTypeId == 'openstreetmap') {
					me._map_1.ggMap.mapTypes.set('openstreetmap', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['mapstyle'] == 'streets') {
								return 'https://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							} else if (mapDetails['mapstyle'] == 'outdoors') {
								return 'https://a.tile.opentopomap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapstyle'] == 'outdoors' ? 17 : 18
					}));
				}
				if (mapTypeId == 'mapbox') {
					me._map_1.ggMap.mapTypes.set('mapbox', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['styleurl'] == '') {
								return 'https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] + '/' + zoom + '/' + coord.x + '/' + coord.y + '@2x.png?access_token=' + mapDetails['mapkey'];
							} else {
								var styleurlstring = mapDetails['styleurl'];
								styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
								return 'https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/' + zoom + '/' + coord.x + '/' + coord.y + '@2x?access_token=' + mapDetails['mapkey'];
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: 18
					}));
				}
				if (mapTypeId == 'custom') {
					me._map_1.ggMap.mapTypes.set('custom', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							var urlString = mapDetails['mapurltemplate'];
							urlString = urlString.replace('{s}', 'a');
							urlString = urlString.replace('{z}', zoom);
							urlString = urlString.replace('{x}', coord.x);
							urlString = urlString.replace('{y}', coord.y);
							return urlString;
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapmaxzoom']
					}));
				}
			} else if (mapType == 'file') {
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 7;
				var mapOptions = {
				  backgroundColor: mapDetails['bgcolor'],
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: activeNodeLatLng,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				var customMapType = new google.maps.ImageMapType({
					getTileUrl: function(coord, zoom) {
						if (me._map_1.ggTileAvailable(coord.x, coord.y, zoom)) {
							return basePath + 'images/maptiles/' + me._map_1.ggMapId + '/' + zoom + '/' + coord.x + '_' + coord.y + '.' + mapDetails['tileformat'];
						} else {
							return null;
						}
					},
					tileSize: new google.maps.Size(256, 256),
					minZoom: 7,
					maxZoom: 7 + mapDetails['zoomlevels'],
					name: mapDetails['title'],
				});
				me._map_1.ggMap.mapTypes.set(me._map_1.ggMapId, customMapType);
				me._map_1.ggMap.setMapTypeId(me._map_1.ggMapId);
				google.maps.event.addListener(me._map_1.ggMap, 'center_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
				google.maps.event.addListener(me._map_1.ggMap, 'zoom_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
			}
		}
		me._map_1.ggClearMap=function() {
		me._map_1.ggMap = null;
		me._map_1.ggClearMapMarkers();
		me._map_1.ggMapNotLoaded = true;
		}
		me._map_1.ggClearMapMarkers=function() {
			me._map_1.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_1.ggGoogleMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.setMap(null);
					me._map_1.ggGoogleMarkerClusterer.removeMarker(marker);
				}
			}
			me._map_1.ggGoogleMarkerArray=[];
		}
		me._map_1.ggCenterNode=function() {
			if (!me._map_1.ggMap) return;
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = new google.maps.LatLng(gps[0], gps[1]);
				me._map_1.ggMap.panTo(markerLocation);
			}
		}
		me._map_1.ggFitBounds=function(force) {
			if (!me._map_1.ggMarkerBounds.isEmpty()) {
				if (me._map_1.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_1.ggGoogleMarkerArray).length > 1) {
					me._map_1.ggMap.fitBounds(me._map_1.ggMarkerBounds, 30);
				} else {
					me._map_1.ggMap.setCenter(me._map_1.ggMarkerBounds.getCenter());
					if (player.getMapType(me._map_1.ggMapId) == 'web') {
						me._map_1.ggMap.setZoom(18);
					} else {
						me._map_1.ggMap.setZoom(7);
					}
				}
			}
		}
		me._map_1.ggInitMapMarkers=function(updateMapBounds) {
			me._map_1.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_1.ggFilteredIds = [];
			if (me._map_1.ggFilter != '') {
				var filter = me._map_1.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
			}
			var marker;
			var markerLocation;
			me._map_1.ggGoogleMarkerClusterer = new MarkerClusterer(me._map_1.ggMap, [], {imagePath: basePath + './3rdparty/google_markerclusterer/m', maxZoom: 17});
			me._map_1.ggMarkerBounds = new google.maps.LatLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_1.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_1.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = new google.maps.LatLng(gps[0], gps[1]);
					marker = new google.maps.Marker({position: markerLocation,map: me._map_1.ggMap});
					marker.setTitle(player.getNodeTitle(id));
					marker.setClickable(true);
					marker.ggId=id;
					google.maps.event.addListener(marker, 'click', function() {
						player.openNext('{' + this.ggId + '}');
						activeNodeLatLng=me.position;
						lastFov=-1; // force radar update
					});
					me._map_1.ggGoogleMarkerArray[id] = marker;
					if (id != currentId) {
						me._map_1.ggGoogleMarkerClusterer.addMarker(marker);
					} else {
						marker.setMap(me._map_1.ggMap);
					}
					me._map_1.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && !me._map_1.ggMarkerBounds.isEmpty() && updateMapBounds) {
				me._map_1.ggFitBounds(false);
			}
			skin.updateSize(me._map_1);
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_1.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'file') {
				return;
			}
			if (me._map_1.ggMap) {
				me._map_1.ggLastZoom = me._map_1.ggMap.getZoom();
			}
			me._map_1.ggMapId = mapId;
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(true);
			me._map_1.ggInitMapMarkers(false);
		}
		me._map_1.ggInCheckBounds=false;
		me._map_1.ggCheckBounds=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				var mapWidthInDeg = tileInDeg * (tmpWidth / 256);
			var mapHeightInDeg = mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				var mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				var mapWidthInDeg = mapHeightInDeg * mapAR;
			}
			if (me._map_1.ggInCheckBounds) return;
			me._map_1.ggInCheckBounds = true;
			var mapCenter = me._map_1.ggMap.getCenter();
			var currentZoom = me._map_1.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_1.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_1.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng();
			var y = mapCenter.lat();
			if (mapWidthInDeg < me._map_1.clientWidth * pixelInDeg) {
				x = mapWidthInDeg / 2;
			} else {
			if (x > mapWidthInDeg - xOffset) x = mapWidthInDeg - xOffset;
			if (x < xOffset) x = xOffset;
			}
			if (mapHeightInDeg < me._map_1.clientHeight * pixelInDeg) {
				y = -mapHeightInDeg / 2;
			} else {
			if (y < -mapHeightInDeg + yOffset) y = -mapHeightInDeg + yOffset;
			if (y > -yOffset) y = -yOffset;
			}
			me._map_1.ggMap.setCenter(new google.maps.LatLng(y, x));
			me._map_1.ggInCheckBounds = false;
		}
		me._set_volume.ggMarkerNormal=null;
		me._set_volume.ggMarkerInstances.push(null);
		me._set_volume.ggMarkerActive=null;
		me._set_volume.ggMarkerInstances.push(null);
		for (var i = 0; i < me._set_volume.childNodes.length; i++) {
			me._set_volume.ggMarkerInstances.push(me._set_volume.childNodes[i]);
		}
		me._popup_video_youtube.ggVideoSource = '';
		me._popup_video_youtube.ggVideoNotLoaded = true;
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(false);
			me._map_1.ggInitMapMarkers(true);
			player.setVolume("_main",0.8);
			me._node_cloner.ggUpdate();
			me._category_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
			me._node_scroller.ggUpdatePosition();
			me._category_scroller.ggUpdatePosition();
		});
		player.addListener('beforechangenode', function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
			me._loading.ggVisible=true;
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_image_mouseover = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image0 && hotspotTemplates['ht_image'][i]._tt_ht_image0.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image0.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image1_mouseover = function(){
		if(hotspotTemplates['ht_image-1']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image-1'].length; i++) {
				if (hotspotTemplates['ht_image-1'][i]._tt_ht_image && hotspotTemplates['ht_image-1'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image-1'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview8 && hotspotTemplates['ht_node'][i]._hotspot_preview8.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview8.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._checkmark_tick_node8 && hotspotTemplates['ht_node'][i]._checkmark_tick_node8.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._checkmark_tick_node8.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changevisitednodes = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._checkmark_tick_node8 && hotspotTemplates['ht_node'][i]._checkmark_tick_node8.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._checkmark_tick_node8.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_y_mouseover = function(){
		if(hotspotTemplates['ht_node Y']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node Y'].length; i++) {
				if (hotspotTemplates['ht_node Y'][i]._hotspot_preview7 && hotspotTemplates['ht_node Y'][i]._hotspot_preview7.logicBlock_visible) {
					hotspotTemplates['ht_node Y'][i]._hotspot_preview7.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_y_active = function(){
		if(hotspotTemplates['ht_node Y']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node Y'].length; i++) {
				if (hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7 && hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7.logicBlock_visible) {
					hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_y_changevisitednodes = function(){
		if(hotspotTemplates['ht_node Y']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node Y'].length; i++) {
				if (hotspotTemplates['ht_node Y'][i]._ht_node_visited && hotspotTemplates['ht_node Y'][i]._ht_node_visited.logicBlock_visible) {
					hotspotTemplates['ht_node Y'][i]._ht_node_visited.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node Y'][i]._ht_node_image7 && hotspotTemplates['ht_node Y'][i]._ht_node_image7.logicBlock_visible) {
					hotspotTemplates['ht_node Y'][i]._ht_node_image7.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7 && hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7.logicBlock_visible) {
					hotspotTemplates['ht_node Y'][i]._checkmark_tick_node7.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node9h_mouseover = function(){
		if(hotspotTemplates['ht_node-9h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-9h'].length; i++) {
				if (hotspotTemplates['ht_node-9h'][i]._hotspot_preview6 && hotspotTemplates['ht_node-9h'][i]._hotspot_preview6.logicBlock_visible) {
					hotspotTemplates['ht_node-9h'][i]._hotspot_preview6.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node9h_active = function(){
		if(hotspotTemplates['ht_node-9h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-9h'].length; i++) {
				if (hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6 && hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6.logicBlock_visible) {
					hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node9h_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-9h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-9h'].length; i++) {
				if (hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6 && hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6.logicBlock_visible) {
					hotspotTemplates['ht_node-9h'][i]._checkmark_tick_node6.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node10h30_mouseover = function(){
		if(hotspotTemplates['ht_node-10h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-10h30'].length; i++) {
				if (hotspotTemplates['ht_node-10h30'][i]._hotspot_preview5 && hotspotTemplates['ht_node-10h30'][i]._hotspot_preview5.logicBlock_visible) {
					hotspotTemplates['ht_node-10h30'][i]._hotspot_preview5.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node10h30_active = function(){
		if(hotspotTemplates['ht_node-10h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-10h30'].length; i++) {
				if (hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5 && hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5.logicBlock_visible) {
					hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node10h30_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-10h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-10h30'].length; i++) {
				if (hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5 && hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5.logicBlock_visible) {
					hotspotTemplates['ht_node-10h30'][i]._checkmark_tick_node5.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node12h_mouseover = function(){
		if(hotspotTemplates['ht_node-12h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-12h'].length; i++) {
				if (hotspotTemplates['ht_node-12h'][i]._hotspot_preview4 && hotspotTemplates['ht_node-12h'][i]._hotspot_preview4.logicBlock_visible) {
					hotspotTemplates['ht_node-12h'][i]._hotspot_preview4.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node12h_active = function(){
		if(hotspotTemplates['ht_node-12h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-12h'].length; i++) {
				if (hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4 && hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4.logicBlock_visible) {
					hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node12h_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-12h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-12h'].length; i++) {
				if (hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4 && hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4.logicBlock_visible) {
					hotspotTemplates['ht_node-12h'][i]._checkmark_tick_node4.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node1h30_mouseover = function(){
		if(hotspotTemplates['ht_node-1h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-1h30'].length; i++) {
				if (hotspotTemplates['ht_node-1h30'][i]._hotspot_preview3 && hotspotTemplates['ht_node-1h30'][i]._hotspot_preview3.logicBlock_visible) {
					hotspotTemplates['ht_node-1h30'][i]._hotspot_preview3.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node1h30_active = function(){
		if(hotspotTemplates['ht_node-1h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-1h30'].length; i++) {
				if (hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3 && hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3.logicBlock_visible) {
					hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node1h30_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-1h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-1h30'].length; i++) {
				if (hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3 && hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3.logicBlock_visible) {
					hotspotTemplates['ht_node-1h30'][i]._checkmark_tick_node3.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node3h_mouseover = function(){
		if(hotspotTemplates['ht_node-3h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-3h'].length; i++) {
				if (hotspotTemplates['ht_node-3h'][i]._hotspot_preview2 && hotspotTemplates['ht_node-3h'][i]._hotspot_preview2.logicBlock_visible) {
					hotspotTemplates['ht_node-3h'][i]._hotspot_preview2.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node3h_active = function(){
		if(hotspotTemplates['ht_node-3h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-3h'].length; i++) {
				if (hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2 && hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2.logicBlock_visible) {
					hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node3h_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-3h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-3h'].length; i++) {
				if (hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2 && hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2.logicBlock_visible) {
					hotspotTemplates['ht_node-3h'][i]._checkmark_tick_node2.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node4h30_mouseover = function(){
		if(hotspotTemplates['ht_node-4h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-4h30'].length; i++) {
				if (hotspotTemplates['ht_node-4h30'][i]._hotspot_preview1 && hotspotTemplates['ht_node-4h30'][i]._hotspot_preview1.logicBlock_visible) {
					hotspotTemplates['ht_node-4h30'][i]._hotspot_preview1.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node4h30_active = function(){
		if(hotspotTemplates['ht_node-4h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-4h30'].length; i++) {
				if (hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1 && hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1.logicBlock_visible) {
					hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node4h30_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-4h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-4h30'].length; i++) {
				if (hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1 && hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1.logicBlock_visible) {
					hotspotTemplates['ht_node-4h30'][i]._checkmark_tick_node1.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node6h_mouseover = function(){
		if(hotspotTemplates['ht_node-6h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-6h'].length; i++) {
				if (hotspotTemplates['ht_node-6h'][i]._hotspot_preview0 && hotspotTemplates['ht_node-6h'][i]._hotspot_preview0.logicBlock_visible) {
					hotspotTemplates['ht_node-6h'][i]._hotspot_preview0.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node6h_active = function(){
		if(hotspotTemplates['ht_node-6h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-6h'].length; i++) {
				if (hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0 && hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0.logicBlock_visible) {
					hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node6h_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-6h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-6h'].length; i++) {
				if (hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0 && hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0.logicBlock_visible) {
					hotspotTemplates['ht_node-6h'][i]._checkmark_tick_node0.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node7h30_mouseover = function(){
		if(hotspotTemplates['ht_node-7h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-7h30'].length; i++) {
				if (hotspotTemplates['ht_node-7h30'][i]._hotspot_preview && hotspotTemplates['ht_node-7h30'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node-7h30'][i]._hotspot_preview.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node7h30_active = function(){
		if(hotspotTemplates['ht_node-7h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-7h30'].length; i++) {
				if (hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node && hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node.logicBlock_visible) {
					hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node7h30_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-7h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-7h30'].length; i++) {
				if (hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node && hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node.logicBlock_visible) {
					hotspotTemplates['ht_node-7h30'][i]._checkmark_tick_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodefly_mouseover = function(){
		if(hotspotTemplates['ht_node-fly']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-fly'].length; i++) {
				if (hotspotTemplates['ht_node-fly'][i]._hotspot_previewfly && hotspotTemplates['ht_node-fly'][i]._hotspot_previewfly.logicBlock_visible) {
					hotspotTemplates['ht_node-fly'][i]._hotspot_previewfly.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodefly_active = function(){
		if(hotspotTemplates['ht_node-fly']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-fly'].length; i++) {
				if (hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly && hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly.logicBlock_visible) {
					hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodefly_changevisitednodes = function(){
		if(hotspotTemplates['ht_node-fly']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-fly'].length; i++) {
				if (hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly && hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly.logicBlock_visible) {
					hotspotTemplates['ht_node-fly'][i]._checkmark_tick_nodefly.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
		var newMarker=[];
		var id=player.getCurrentNode();
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId.length > 0) && (nodeMarker[i].ggMarkerNodeId.charAt(0)=='{') && (nodeMarker[i].ggMarkerNodeId.substr(1, nodeMarker[i].ggMarkerNodeId.length - 2)==id) && (id!='')) match=true;  // }
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._map_1.ggUpdateConditionTimer();
		if (me.elementMouseOver['hide_elements']) {
			me._hide_timer.ggTimeout=Number("5") * 1000.0;
			me._hide_timer.ggTimestamp=skin.ggCurrentTime;
		}
		if (me.elementMouseDown['button_image_right']) {
			player.changePanLog(-1,true);
		}
		if (me.elementMouseDown['button_image_left']) {
			player.changePanLog(1,true);
		}
		if (me.elementMouseDown['button_image_down']) {
			player.changeTiltLog(-1,true);
		}
		if (me.elementMouseDown['button_image_up']) {
			player.changeTiltLog(1,true);
		}
		if (me.elementMouseDown['zoomin']) {
			player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout']) {
			player.changeFovLog(1,true);
		}
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		if (me._hide_timer.ggLastIsActive!=me._hide_timer.ggIsActive()) {
			me._hide_timer.ggLastIsActive=me._hide_timer.ggIsActive();
			if (me._hide_timer.ggLastIsActive) {
				if (player.transitionsDisabled) {
					me._hide_elements.style[domTransition]='none';
				} else {
					me._hide_elements.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._hide_elements.style.opacity='1';
				me._hide_elements.style.visibility=me._hide_elements.ggVisible?'inherit':'hidden';
			} else {
				if (player.transitionsDisabled) {
					me._hide_elements.style[domTransition]='none';
				} else {
					me._hide_elements.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._hide_elements.style.opacity='0.4';
				me._hide_elements.style.visibility=me._hide_elements.ggVisible?'inherit':'hidden';
			}
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 75px;';
		hs+='position : absolute;';
		hs+='top : 219px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_image.onclick=function (e) {
			skin._image_popup.style[domTransition]='none';
			skin._image_popup.style.visibility=(Number(skin._image_popup.style.opacity)>0||!skin._image_popup.style.opacity)?'inherit':'hidden';
			skin._image_popup.ggVisible=true;
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			me._tt_ht_image0.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image0.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ontouchend=function (e) {
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image0.logicBlock_visible();
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_image0=document.createElement('div');
		els=me._ht_image_image0__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk2LjMsNDE0LjdoNDIuN3YtNDRoLTQyLjdWNDE0Ljd6IE0tMTU1LjUsNDEyLjlILTE4M2wxOS0xOC42YzAuMy0wLjMsMC42LTAuNCwxLTAuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC43LDAuMSwxLDAuNGw2LjUsNi40VjQxMi45eiBNLTE2Mi45LDM3NmMyLjIsMCw0LDEuOCw0LDRjMCwyLjItMS44LDQtNCw0Yy0yLjIsMC00LTEuOC00LTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNjYuOCwzNzcuOC0xNjUuMSwzNzYtMTYyLjksMzc2eiBNLTE5NC41LDM5Ny44bDkuNy05LjRjMC4zLTAuMywwLjYtMC40LDEtMC40'+
			'YzAuNCwwLDAuNywwLjEsMSwwLjRsMTEuMiwxMC45bC0xMy45LDEzLjZoLTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7TC0xOTQuNSwzOTcuOEwtMTk0LjUsMzk3Ljh6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE0OS41LDQyNS41YzAsMS4zLTEsMi4zLTIuMywyLjNoLTQ2LjRjLTEuMywwLTIuMy0xLTIuMy0yLjN2LTU3YzAtMS4zLDEtMi4zLDIuMy'+
			'0yLjNoNDYuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM0wtMTQ5LjUsNDI1LjVMLTE0OS41LDQyNS41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNTEuOCwzNjYuMmgtNDYuNGMtMS4zLDAtMi4zLDEtMi4zLDIuM3Y1N2MwLDEuMywxLDIuMywyLjMsMi4zaDQ2LjRjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNDkuNSwzNjcuMi0xNTAuNSwzNjYuMi0xNTEuOCwzNjYuMnogTS0xNTMuNyw0MTQuN2gtNDIuN3YtNDRoNDIuN1Y0MTQu'+
			'N3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSByPSI0IiBjeT0iMzc5LjkiIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYyLjkiLz4KICAgPHBhdGggZD0iTS0xNzEuNywzOTkuM2wtMTEuMi0xMC45Yy0wLjMtMC4zLTAuNi0wLjQtMS0wLjRzLTAuNywwLjEtMSwwLjRsLTkuNyw5LjR2MTUuMWg5TC0xNzEuNywzOTkuM3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNjMsMzkzLjljLTAuNCwwLTAuNywwLjEtMSwwLjRsLTE5LDE4LjZoMjcuNXYtMTIuMmwtNi41LTYuNEMtMTYyLjIsMzk0LTE2Mi42LDM5My45LTE2MywzOTMuOXoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+CiA8L2'+
			'c+Cjwvc3ZnPgo=';
		me._ht_image_image0__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_image_image0__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk4LjcsNDE2LjZoNDcuNHYtNDguOWgtNDcuNFY0MTYuNnogTS0xNTMuMyw0MTQuNmgtMzAuNmwyMS4xLTIwLjZjMC4zLTAuMywwLjctMC41LDEuMS0wLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNCwwLDAuOCwwLjIsMS4xLDAuNWw3LjIsNy4xVjQxNC42eiBNLTE2MS41LDM3My42YzIuNCwwLDQuNCwyLDQuNCw0LjRjMCwyLjQtMiw0LjQtNC40LDQuNHMtNC40LTItNC40LTQuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE2NS45LDM3NS42LTE2NCwzNzMuNi0xNjEuNSwzNzMuNnogTS0xOTYuNywzOTcuOWwxMC43LTEwLjVj'+
			'MC4zLTAuMywwLjctMC41LDEuMS0wLjVzMC44LDAuMiwxLjEsMC40bDEyLjQsMTIuMmwtMTUuNCwxNS4xaC0xMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE5Ni43LDM5Ny45TC0xOTYuNywzOTcuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6IE0tMTQ2LjcsNDI4LjdjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC01MS42Yy0xLjQsMC0yLjYtMS'+
			'4xLTIuNi0yLjZ2LTYzLjRjMC0xLjQsMS4xLTIuNiwyLjYtMi42aDUxLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNCwwLDIuNiwxLjEsMi42LDIuNkwtMTQ2LjcsNDI4LjdMLTE0Ni43LDQyOC43eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDkuMiwzNjIuOGgtNTEuNmMtMS40LDAtMi42LDEuMS0yLjYsMi42djYzLjRjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDUxLjZjMS40LDAsMi42LTEuMSwyLjYtMi42di02My40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTQ2LjcsMzYzLjktMTQ3LjgsMzYyLjgt'+
			'MTQ5LjIsMzYyLjh6IE0tMTUxLjMsNDE2LjZoLTQ3LjR2LTQ4LjloNDcuNFY0MTYuNnoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSByPSI0LjQiIGN5PSIzNzgiIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYxLjUiLz4KICAgPHBhdGggZD0iTS0xNzEuMywzOTkuNWwtMTIuNC0xMi4yYy0wLjMtMC4zLTAuNy0wLjQtMS4xLTAuNGMtMC40LDAtMC44LDAuMi0xLjEsMC41bC0xMC43LDEwLjV2MTYuOGgxMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE3MS4zLDM5OS41eiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE2MS42LDM5My41Yy0wLjQsMC0wLjgsMC4yLTEuMSwwLjVsLT'+
			'IxLjEsMjAuNmgzMC42VjQwMWwtNy4yLTcuMUMtMTYwLjgsMzkzLjctMTYxLjIsMzkzLjUtMTYxLjYsMzkzLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_image_image0__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_image_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_image0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_image0.onmouseover=function (e) {
			me._ht_image_image0__img.style.visibility='hidden';
			me._ht_image_image0__imgo.style.visibility='inherit';
		}
		me._ht_image_image0.onmouseout=function (e) {
			me._ht_image_image0__img.style.visibility='inherit';
			me._ht_image_image0__imgo.style.visibility='hidden';
		}
		me._ht_image_image0.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image.appendChild(me._ht_image_image0);
		el=me._tt_ht_image0=document.createElement('div');
		els=me._tt_ht_image0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 4px;';
		hs+=cssPrefix + 'border-radius: 4px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp;"+me.hotspot.title+"&nbsp;";
		el.appendChild(els);
		me._tt_ht_image0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image0.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image0.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image0.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image0.style[domTransition]='';
				if (me._tt_ht_image0.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image0.style.visibility=(Number(me._tt_ht_image0.style.opacity)>0||!me._tt_ht_image0.style.opacity)?'inherit':'hidden';
					me._tt_ht_image0.ggVisible=true;
				}
				else {
					me._tt_ht_image0.style.visibility="hidden";
					me._tt_ht_image0.ggVisible=false;
				}
			}
		}
		me._tt_ht_image0.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image.appendChild(me._tt_ht_image0);
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_ht_image1(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image1=document.createElement('div');
		el.ggId="ht_image-1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 75px;';
		hs+='position : absolute;';
		hs+='top : 219px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_image1.onclick=function (e) {
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image1.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image1.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image1']=true;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image1.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image1']=false;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image1.ontouchend=function (e) {
			me.elementMouseOver['ht_image1']=false;
			me._tt_ht_image.logicBlock_visible();
		}
		me._ht_image1.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_image=document.createElement('div');
		els=me._ht_image_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk2LjMsNDE0LjdoNDIuN3YtNDRoLTQyLjdWNDE0Ljd6IE0tMTU1LjUsNDEyLjlILTE4M2wxOS0xOC42YzAuMy0wLjMsMC42LTAuNCwxLTAuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC43LDAuMSwxLDAuNGw2LjUsNi40VjQxMi45eiBNLTE2Mi45LDM3NmMyLjIsMCw0LDEuOCw0LDRjMCwyLjItMS44LDQtNCw0Yy0yLjIsMC00LTEuOC00LTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNjYuOCwzNzcuOC0xNjUuMSwzNzYtMTYyLjksMzc2eiBNLTE5NC41LDM5Ny44bDkuNy05LjRjMC4zLTAuMywwLjYtMC40LDEtMC40'+
			'YzAuNCwwLDAuNywwLjEsMSwwLjRsMTEuMiwxMC45bC0xMy45LDEzLjZoLTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7TC0xOTQuNSwzOTcuOEwtMTk0LjUsMzk3Ljh6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE0OS41LDQyNS41YzAsMS4zLTEsMi4zLTIuMywyLjNoLTQ2LjRjLTEuMywwLTIuMy0xLTIuMy0yLjN2LTU3YzAtMS4zLDEtMi4zLDIuMy'+
			'0yLjNoNDYuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM0wtMTQ5LjUsNDI1LjVMLTE0OS41LDQyNS41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNTEuOCwzNjYuMmgtNDYuNGMtMS4zLDAtMi4zLDEtMi4zLDIuM3Y1N2MwLDEuMywxLDIuMywyLjMsMi4zaDQ2LjRjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNDkuNSwzNjcuMi0xNTAuNSwzNjYuMi0xNTEuOCwzNjYuMnogTS0xNTMuNyw0MTQuN2gtNDIuN3YtNDRoNDIuN1Y0MTQu'+
			'N3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSByPSI0IiBjeT0iMzc5LjkiIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYyLjkiLz4KICAgPHBhdGggZD0iTS0xNzEuNywzOTkuM2wtMTEuMi0xMC45Yy0wLjMtMC4zLTAuNi0wLjQtMS0wLjRzLTAuNywwLjEtMSwwLjRsLTkuNyw5LjR2MTUuMWg5TC0xNzEuNywzOTkuM3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNjMsMzkzLjljLTAuNCwwLTAuNywwLjEtMSwwLjRsLTE5LDE4LjZoMjcuNXYtMTIuMmwtNi41LTYuNEMtMTYyLjIsMzk0LTE2Mi42LDM5My45LTE2MywzOTMuOXoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+CiA8L2'+
			'c+Cjwvc3ZnPgo=';
		me._ht_image_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_image_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGJhc2VQcm9maWxlPSJ0aW55IiB4PSIwcHgiIGlkPSJMYXllcl8xIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB5PSIwcHgiIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk4LjcsNDE2LjZoNDcuNHYtNDguOWgtNDcuNFY0MTYuNnogTS0xNTMuMyw0MTQuNmgtMzAuNmwyMS4xLTIwLjZjMC4zLTAuMywwLjctMC41LDEuMS0wLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNCwwLDAuOCwwLjIsMS4xLDAuNWw3LjIsNy4xVjQxNC42eiBNLTE2MS41LDM3My42YzIuNCwwLDQuNCwyLDQuNCw0LjRjMCwyLjQtMiw0LjQtNC40LDQuNHMtNC40LTItNC40LTQuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE2NS45LDM3NS42LTE2NCwzNzMuNi0xNjEuNSwzNzMuNnogTS0xOTYuNywzOTcuOWwxMC43LTEwLjVj'+
			'MC4zLTAuMywwLjctMC41LDEuMS0wLjVzMC44LDAuMiwxLjEsMC40bDEyLjQsMTIuMmwtMTUuNCwxNS4xaC0xMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE5Ni43LDM5Ny45TC0xOTYuNywzOTcuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6IE0tMTQ2LjcsNDI4LjdjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC01MS42Yy0xLjQsMC0yLjYtMS'+
			'4xLTIuNi0yLjZ2LTYzLjRjMC0xLjQsMS4xLTIuNiwyLjYtMi42aDUxLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNCwwLDIuNiwxLjEsMi42LDIuNkwtMTQ2LjcsNDI4LjdMLTE0Ni43LDQyOC43eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDkuMiwzNjIuOGgtNTEuNmMtMS40LDAtMi42LDEuMS0yLjYsMi42djYzLjRjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDUxLjZjMS40LDAsMi42LTEuMSwyLjYtMi42di02My40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTQ2LjcsMzYzLjktMTQ3LjgsMzYyLjgt'+
			'MTQ5LjIsMzYyLjh6IE0tMTUxLjMsNDE2LjZoLTQ3LjR2LTQ4LjloNDcuNFY0MTYuNnoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSByPSI0LjQiIGN5PSIzNzgiIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYxLjUiLz4KICAgPHBhdGggZD0iTS0xNzEuMywzOTkuNWwtMTIuNC0xMi4yYy0wLjMtMC4zLTAuNy0wLjQtMS4xLTAuNGMtMC40LDAtMC44LDAuMi0xLjEsMC41bC0xMC43LDEwLjV2MTYuOGgxMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE3MS4zLDM5OS41eiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE2MS42LDM5My41Yy0wLjQsMC0wLjgsMC4yLTEuMSwwLjVsLT'+
			'IxLjEsMjAuNmgzMC42VjQwMWwtNy4yLTcuMUMtMTYwLjgsMzkzLjctMTYxLjIsMzkzLjUtMTYxLjYsMzkzLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_image_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_image_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_image.onmouseover=function (e) {
			me._ht_image_image__img.style.visibility='hidden';
			me._ht_image_image__imgo.style.visibility='inherit';
		}
		me._ht_image_image.onmouseout=function (e) {
			me._ht_image_image__img.style.visibility='inherit';
			me._ht_image_image__imgo.style.visibility='hidden';
		}
		me._ht_image_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image1.appendChild(me._ht_image_image);
		el=me._tt_ht_image=document.createElement('div');
		els=me._tt_ht_image__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 4px;';
		hs+=cssPrefix + 'border-radius: 4px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="&nbsp;"+me.hotspot.title+"&nbsp;";
		el.appendChild(els);
		me._tt_ht_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image1'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image.style[domTransition]='';
				if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image.style.visibility=(Number(me._tt_ht_image.style.opacity)>0||!me._tt_ht_image.style.opacity)?'inherit':'hidden';
					me._tt_ht_image.ggVisible=true;
				}
				else {
					me._tt_ht_image.style.visibility="hidden";
					me._tt_ht_image.ggVisible=false;
				}
			}
		}
		me._tt_ht_image.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image1.appendChild(me._tt_ht_image);
		me.__div = me._ht_image1;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 75px;';
		hs+='position : absolute;';
		hs+='top : 157px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_info.onclick=function (e) {
			skin._screentint.ggVisible = !skin._screentint.ggVisible;
			var flag=skin._screentint.ggVisible;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=((flag)&&(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity))?'inherit':'hidden';
			skin._userdata.style[domTransition]='none';
			skin._userdata.style.visibility='hidden';
			skin._userdata.ggVisible=false;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_info_image=document.createElement('div');
		els=me._ht_info_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzNDM0MzQyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE04Ljg1NCw4'+
			'Ljg1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS4zMTMsNy4wMj'+
			'IsMTguNzk1LDUuODkzLDE2LDUuODkybDAsMEMxMy4yMDUsNS44OTMsMTAuNjg2LDcuMDIyLDguODU0LDguODUzTDguODU0LDguODUzeiIvPgogIDwvZz4KICA8Zz4KICAgPHBhdGggZD0iTTE0Ljk2MywxMC4wNVY5LjUyMWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk3LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzYsMS4xOTYsMS4xOTZsMCwwdjAuNTI5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8'+
			'cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0wLjY2MS0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMi4yMjZjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDEuMDMxdjUuMzc5aC0xLjIwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNi'+
			'wxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KIDxnIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiPgogIDxnPgogICA8cGF0aCBkPSJNMy41LDE2QzMuNSw5LjA5Niw5LjA5NiwzLjUsMTYsMy41bDAsMGM2LjkwMywwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0w'+
			'LjAwMSw2LjkwMy01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwMywzLjUsMTZMMy41LDE2eiBNOC44NTQsOC44NTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBjMC4wMDEsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMCwwYzEuODMyLDEuODMxLDQuMzUyLDIuOTYsNy4xNDYsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMCw1LjMxNC0xLjEyOSw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMiwyLjk1OS00LjM1MiwyLjk2LTcuMTQ2bD'+
			'AsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjEuMzEzLDcuMDIyLDE4Ljc5NSw1Ljg5MywxNiw1Ljg5MmwwLDBDMTMuMjA1LDUuODkzLDEwLjY4Niw3LjAyMiw4Ljg1NCw4Ljg1M0w4Ljg1NCw4Ljg1M3oiLz4KICA8L2c+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xNC45NjMsMTAuMDVWOS41MjFjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ny0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM2LDEuMTk2LDEuMTk2bDAsMHYwLjUyOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYxLTAuNTM2LDEuMTk2'+
			'LTEuMTk2LDEuMTk2bDAsMEMxNS41LDExLjI0NywxNC45NjMsMTAuNzExLDE0Ljk2MywxMC4wNUwxNC45NjMsMTAuMDV6Ii8+CiAgIDxnPgogICAgPHBhdGggZD0iTTE4LjUzMiwyMC4zOTFoLTEuMTc2di02LjQ3M2MwLTAuMDIxLTAuMDA1LTAuMDQyLTAuMDA2LTAuMDYzYzAtMC4wMTQsMC4wMDQtMC4wMjYsMC4wMDQtMC4wNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAtMC42NjEtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTIuMjI2Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgxLjAzMXY1LjM3OWgtMS'+
			'4yMDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoNC43NzVjMC42NiwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMTkuNzI5LDIwLjkyNiwxOS4xOTIsMjAuMzkxLDE4LjUzMiwyMC4zOTF6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_info_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYmFzZVByb2ZpbGU9ImJhc2ljIiB3aWR0aD0iMzJweCIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2'+
			'h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjM0MzQzNDIj4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEy'+
			'LjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwYzAuMDAxLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMGMxLjgzMiwxLjgzMSw0LjM1MiwyLjk2LDcuMTQ2LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAsNS4zMTQtMS4xMjksNy4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMz'+
			'E0LTIuOTYtNy4xNDdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNMTQuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2MS0wLjUzNiwxLjE5Ni0xLjE5NiwxLjE5NmwwLDBDMTUuNSwxMS4y'+
			'NDcsMTQuOTYzLDEwLjcxMSwxNC45NjMsMTAuMDVMMTQuOTYzLDEwLjA1eiIvPgogICA8Zz4KICAgIDxwYXRoIGQ9Ik0xOC41MzIsMjAuMzkxaC0xLjE3NnYtNi40NzNjMC0wLjAyMS0wLjAwNS0wLjA0Mi0wLjAwNi0wLjA2M2MwLTAuMDE0LDAuMDA0LTAuMDI2LDAuMDA0LTAuMDQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTAuNjYxLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7QzE5LjcyOSwyMC45MjYsMTkuMTkyLDIwLjM5MSwxOC41MzIsMjAuMzkxeiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBzdHJva2Utd2lkdGg9IjAuMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIj4KICA8Zz4K'+
			'ICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwYzAuMDAxLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMGMxLjgzMiwxLjgzMSw0LjM1MiwyLj'+
			'k2LDcuMTQ2LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAsNS4zMTQtMS4xMjksNy4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYtNy4xNDdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNMTQuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEs'+
			'MC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2MS0wLjUzNiwxLjE5Ni0xLjE5NiwxLjE5NmwwLDBDMTUuNSwxMS4yNDcsMTQuOTYzLDEwLjcxMSwxNC45NjMsMTAuMDVMMTQuOTYzLDEwLjA1eiIvPgogICA8Zz4KICAgIDxwYXRoIGQ9Ik0xOC41MzIsMjAuMzkxaC0xLjE3NnYtNi40NzNjMC0wLjAyMS0wLjAwNS0wLjA0Mi0wLjAwNi0wLjA2M2MwLTAuMDE0LDAuMDA0LTAuMDI2LDAuMDA0LTAuMDQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2'+
			'MwLTAuNjYxLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7QzE5LjcyOSwyMC45MjYsMTkuMTkyLDIwLjM5MSwxOC41MzIsMjAuMzkxeiIv'+
			'PgogICA8L2c+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_info_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -17px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_image.onmouseover=function (e) {
			me._ht_info_image__img.style.visibility='hidden';
			me._ht_info_image__imgo.style.visibility='inherit';
		}
		me._ht_info_image.onmouseout=function (e) {
			me._ht_info_image__img.style.visibility='inherit';
			me._ht_info_image__imgo.style.visibility='hidden';
		}
		me._ht_info_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.appendChild(me._ht_info_image);
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 24px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : 20px;';
		hs+='visibility : hidden;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 151px;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 4px;';
		hs+=cssPrefix + 'border-radius: 4px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information.style[domTransition]='';
				if (me._tt_information.ggCurrentLogicStateVisible == 0) {
					me._tt_information.style.visibility=(Number(me._tt_information.style.opacity)>0||!me._tt_information.style.opacity)?'inherit':'hidden';
					me._tt_information.ggVisible=true;
				}
				else {
					me._tt_information.style.visibility="hidden";
					me._tt_information.ggVisible=false;
				}
			}
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.appendChild(me._tt_information);
		me.__div = me._ht_info;
	};
	function SkinHotspotClass_ht_video_youtube(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_youtube=document.createElement('div');
		el.ggId="ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='top : 200px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_video_youtube.onclick=function (e) {
			skin._popup_video_youtube.ggInitMedia(me.hotspot.url);
			skin._video_screentint_youtube.style[domTransition]='none';
			skin._video_screentint_youtube.style.visibility=(Number(skin._video_screentint_youtube.style.opacity)>0||!skin._video_screentint_youtube.style.opacity)?'inherit':'hidden';
			skin._video_screentint_youtube.ggVisible=true;
			if (skin._popup_video_youtube.ggVideoNotLoaded) {
				skin._popup_video_youtube.ggInitMedia(skin._popup_video_youtube.ggVideoSource);
			}
			skin._popup_video_youtube.style[domTransition]='none';
			skin._popup_video_youtube.style.visibility=(Number(skin._popup_video_youtube.style.opacity)>0||!skin._popup_video_youtube.style.opacity)?'inherit':'hidden';
			skin._popup_video_youtube.ggVisible=true;
			skin._video_popup_youtube.style[domTransition]='none';
			skin._video_popup_youtube.style.visibility=(Number(skin._video_popup_youtube.style.opacity)>0||!skin._video_popup_youtube.style.opacity)?'inherit':'hidden';
			skin._video_popup_youtube.ggVisible=true;
			skin._video_popup_close_youtube.style[domTransition]='none';
			skin._video_popup_close_youtube.style.visibility=(Number(skin._video_popup_close_youtube.style.opacity)>0||!skin._video_popup_close_youtube.style.opacity)?'inherit':'hidden';
			skin._video_popup_close_youtube.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_youtube']=true;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ontouchend=function (e) {
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
		}
		me._ht_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_video_youtube=document.createElement('div');
		els=me._ht_video_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDE3OS40NjcgNjEyIDQzMy4wNjciIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNDMzLjA2N3B4IiB2aWV3Qm94PSIwIDE3OS40NjcgNjEyIDQzMy4wNjciIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxjaXJjbGUgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMzYuNSIgY3k9IjM5Ni4wMDEiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgY3g9IjI5MiIvPgogPHBhdGggZD0iTTQ1NS4xMjUsMjE1LjUwMWgtMjk4LjI1Yy01OC41MTYsMC0xMDUuOTUyLDQ3LjQzNy0xMDUuOTUyLDEwNS45NTN2MTQ5LjA5NCYj'+
			'eGQ7JiN4YTsmI3g5O2MwLDU4LjUxNSw0Ny40MzcsMTA1Ljk1MiwxMDUuOTUyLDEwNS45NTJoMjk4LjI1YzU4LjUxNiwwLDEwNS45NTItNDcuNDM4LDEwNS45NTItMTA1Ljk1MlYzMjEuNDU0JiN4ZDsmI3hhOyYjeDk7QzU2MS4wNzcsMjYyLjkzOCw1MTMuNjQxLDIxNS41MDEsNDU1LjEyNSwyMTUuNTAxeiBNMzgzLjQ3LDQwMy4yNTVsLTEzOS41MDEsNjYuNTMzYy0zLjcxNywxLjc3Mi04LjAxMS0wLjkzOC04LjAxMS01LjA1NlYzMjcuNTA3JiN4ZDsmI3hhOyYjeDk7YzAtNC4xNzcsNC40MDYtNi44ODMsOC4xMzEtNC45OTZsMTM5LjUsNzAuNjkyQzM4Ny43MzgsMzk1LjMwNiwzODcuNjY2LDQwMS'+
			'4yNTQsMzgzLjQ3LDQwMy4yNTV6IiBmaWxsPSIjRjYxQzBEIi8+Cjwvc3ZnPgo=';
		me._ht_video_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_video_youtube__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDQzMy4wNjciIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNDMzLjA2N3B4IiB2aWV3Qm94PSIwIDAgNjEyIDQzMy4wNjciIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxjaXJjbGUgcj0iMTQwIiBjeT0iMjEzLjAzNCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjI5NS41Ii8+CiA8cGF0aCBkPSJNNDg0Ljg5NiwwSDEyNy4xMDRDNTYuOTA3LDAsMCw1Ni45MDcsMCwxMjcuMTA1djE3OC44NThjMCw3MC4xOTcsNTYuOTA3LDEyNy4xMDQsMTI3LjEwNCwxMjcuMTA0aDM1Ny43OTEmI3hkOyYjeGE7JiN4OTtjNzAuMTk5LDAs'+
			'MTI3LjEwNS01Ni45MDYsMTI3LjEwNS0xMjcuMTA0VjEyNy4xMDVDNjEyLDU2LjkwNyw1NTUuMDk0LDAsNDg0Ljg5NiwweiBNMzk4LjkzNiwyMjUuMjM3bC0xNjcuMzUxLDc5LjgxNCYjeGQ7JiN4YTsmI3g5O2MtNC40NTksMi4xMjctOS42MS0xLjEyNS05LjYxLTYuMDY0VjEzNC4zNjZjMC01LjAxLDUuMjg2LTguMjU2LDkuNzU1LTUuOTkybDE2Ny4zNSw4NC44MDUmI3hkOyYjeGE7JiN4OTtDNDA0LjA1NiwyMTUuNyw0MDMuOTcsMjIyLjgzNiwzOTguOTM2LDIyNS4yMzd6IiBmaWxsPSIjRjYxQzBEIi8+Cjwvc3ZnPgo=';
		me._ht_video_video_youtube__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_video_youtube.onmouseover=function (e) {
			me._ht_video_video_youtube__img.style.visibility='hidden';
			me._ht_video_video_youtube__imgo.style.visibility='inherit';
		}
		me._ht_video_video_youtube.onmouseout=function (e) {
			me._ht_video_video_youtube__img.style.visibility='inherit';
			me._ht_video_video_youtube__imgo.style.visibility='hidden';
		}
		me._ht_video_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_youtube.appendChild(me._ht_video_video_youtube);
		el=me._tt_ht_video_youtube=document.createElement('div');
		els=me._tt_ht_video_youtube__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_youtube'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_youtube.style[domTransition]='';
				if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_youtube.style.visibility=(Number(me._tt_ht_video_youtube.style.opacity)>0||!me._tt_ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_youtube.ggVisible=true;
				}
				else {
					me._tt_ht_video_youtube.style.visibility="hidden";
					me._tt_ht_video_youtube.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_youtube.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_youtube.appendChild(me._tt_ht_video_youtube);
		me.__div = me._ht_video_youtube;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 271px;';
		hs+='position : absolute;';
		hs+='top : 150px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._hotspot_preview8.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview8.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview8.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image8=document.createElement('div');
		els=me._ht_node_image8__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDkwIDYxMiA2MTIiIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNjEycHgiIHZpZXdCb3g9IjAgOTAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGc+CiAgPGNpcmNsZSByPSIxNzIuMTQzIiBjeT0iMzk2IiBmaWxsPSIjRkZGRkZGIiBjeD0iMzA2Ii8+CiAgPHBhdGggZD0iTTQ3Ni41MDgsMjI1LjQ5MkM0MzEsMTc5Ljk4NCwzNzAuNDQzLDE1NC45MjIsMzA2LDE1NC45MjJ2ODYuNDQ3YzQxLjMyOSwwLDgwLjE3NCwxNi4wNzIsMTA5LjM2Nyw0NS4yNjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MyOS4xOTIsMjku'+
			'MTkyLDQ1LjI2NCw2OC4wMzgsNDUuMjY0LDEwOS4zNjdzLTE2LjA3MSw4MC4xNzQtNDUuMjY0LDEwOS4zNjdDMzg2LjE3NCw1MzQuNTYsMzQ3LjMyOSw1NTAuNjMxLDMwNiw1NTAuNjMxdjg2LjQ0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzY0LjQ0MywwLDEyNS0yNS4wNjMsMTcwLjUwOC03MC41N3M3MC41Ny0xMDYuMDY0LDcwLjU3LTE3MC41MDhTNTIyLjAxNiwyNzEsNDc2LjUwOCwyMjUuNDkyeiIgZmlsbD0iI0IyMDAxRSIvPgogIDxwYXRoIGQ9Ik0zNzQuMTg0LDM5NmMwLTM3LjU5OS0zMC41ODUtNjguMTg0LTY4LjE4NC02OC4xODR2MTM2LjM2N0MzNDMuNTk5LDQ2NC4xODQsMzc0LjE4NCw0Mz'+
			'MuNTk5LDM3NC4xODQsMzk2eiIgZmlsbD0iIzAwNkRGMCIvPgogIDxwYXRoIGQ9Ik0xOTYuNjMzLDUwNS4zNjdjLTI5LjE5Mi0yOS4xOTMtNDUuMjY0LTY4LjAzOC00NS4yNjQtMTA5LjM2N3MxNi4wNzItODAuMTc0LDQ1LjI2NC0xMDkuMzY3JiN4ZDsmI3hhOyYjeDk7JiN4OTtTMjY0LjY3MSwyNDEuMzY5LDMwNiwyNDEuMzY5di04Ni40NDdjLTY0LjQ0MywwLTEyNSwyNS4wNjMtMTcwLjUwOCw3MC41N0M4OS45ODQsMjcxLDY0LjkyMiwzMzEuNTU3LDY0LjkyMiwzOTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MyNS4wNjMsMTI1LDcwLjU3LDE3MC41MDhDMTgxLDYxMi4wMTYsMjQxLjU1Nyw2MzcuMDc4'+
			'LDMwNiw2MzcuMDc4di04Ni40NDdDMjY0LjY3MSw1NTAuNjMxLDIyNS44MjYsNTM0LjU2LDE5Ni42MzMsNTA1LjM2N3oiIGZpbGw9IiMwMDVEQkEiLz4KICA8cGF0aCBkPSJNMTUxLjM2OSwzOTZjMCw0MS4zMjksMTYuMDcyLDgwLjE3NCw0NS4yNjQsMTA5LjM2N2MyOS4xOTIsMjkuMTkyLDY4LjAzOCw0NS4yNjQsMTA5LjM2Nyw0NS4yNjR2LTg2LjQ0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0zNy41OTksMC02OC4xODQtMzAuNTg1LTY4LjE4NC02OC4xODRzMzAuNTg1LTY4LjE4NCw2OC4xODQtNjguMTg0di04Ni40NDdjLTQxLjMyOSwwLTgwLjE3NCwxNi4wNzItMTA5LjM2Nyw0NS4yNjQmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O1MxNTEuMzY5LDM1NC42NzEsMTUxLjM2OSwzOTZ6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTTIzNy44MTYsMzk2YzAsMzcuNTk5LDMwLjU4NSw2OC4xODQsNjguMTg0LDY4LjE4NFYzMjcuODE2QzI2OC40MDEsMzI3LjgxNiwyMzcuODE2LDM1OC40MDEsMjM3LjgxNiwzOTZ6IiBmaWxsPSIjRkYwMDFGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image8__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image8__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDkwIDYxMiA2MTIiIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iNjEycHgiIHZpZXdCb3g9IjAgOTAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGc+CiAgPGNpcmNsZSByPSIyMTguNSIgY3k9IjM5NiIgZmlsbD0iI0ZGRkZGRiIgY3g9IjMwNiIvPgogIDxwYXRoIGQ9Ik01MjIuNDI2LDE3OS41NzVDNDY0LjY2MiwxMjEuODEyLDM4Ny43OTgsOTAsMzA2LDkwdjEwOS43MjhjNTIuNDU5LDAsMTAxLjc2NSwyMC40LDEzOC44MTksNTcuNDU0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMzcuMDU0LDM3LjA1NCw1Ny40'+
			'NTMsODYuMzYsNTcuNDUzLDEzOC44MTlzLTIwLjM5OSwxMDEuNzY1LTU3LjQ1MywxMzguODE5Yy0zNy4wNTUsMzcuMDU0LTg2LjM2LDU3LjQ1My0xMzguODE5LDU3LjQ1M1Y3MDImI3hkOyYjeGE7JiN4OTsmI3g5O2M4MS43OTgsMCwxNTguNjYyLTMxLjgxMiwyMTYuNDI2LTg5LjU3NEM1ODAuMTg4LDU1NC42NjIsNjEyLDQ3Ny43OTgsNjEyLDM5NlM1ODAuMTg4LDIzNy4zMzcsNTIyLjQyNiwxNzkuNTc1eiIgZmlsbD0iI0IyMDAxRSIvPgogIDxwYXRoIGQ9Ik0zOTIuNTQ2LDM5NmMwLTQ3LjcyNC0zOC44MjItODYuNTQ1LTg2LjU0Ni04Ni41NDV2MTczLjA5MUMzNTMuNzI0LDQ4Mi41NDYsMzkyLj'+
			'U0Niw0NDMuNzI0LDM5Mi41NDYsMzk2eiIgZmlsbD0iIzAwNkRGMCIvPgogIDxwYXRoIGQ9Ik0xNjcuMTgxLDUzNC44MTljLTM3LjA1NC0zNy4wNTUtNTcuNDU0LTg2LjM2LTU3LjQ1NC0xMzguODE5czIwLjQtMTAxLjc2NSw1Ny40NTQtMTM4LjgxOSYjeGQ7JiN4YTsmI3g5OyYjeDk7czg2LjM2LTU3LjQ1NCwxMzguODE5LTU3LjQ1NFY5MGMtODEuNzk4LDAtMTU4LjY2MywzMS44MTItMjE2LjQyNSw4OS41NzVDMzEuODEyLDIzNy4zMzcsMCwzMTQuMjAyLDAsMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzMzEuODEyLDE1OC42NjIsODkuNTc1LDIxNi40MjZDMTQ3LjMzNyw2NzAuMTg4LDIyNC4yMDIs'+
			'NzAyLDMwNiw3MDJWNTkyLjI3MkMyNTMuNTQxLDU5Mi4yNzIsMjA0LjIzNSw1NzEuODczLDE2Ny4xODEsNTM0LjgxOXoiIGZpbGw9IiMwMDVEQkEiLz4KICA8cGF0aCBkPSJNMTA5LjcyNywzOTZjMCw1Mi40NTksMjAuNCwxMDEuNzY1LDU3LjQ1NCwxMzguODE5YzM3LjA1NCwzNy4wNTQsODYuMzYsNTcuNDUzLDEzOC44MTksNTcuNDUzVjQ4Mi41NDYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNDcuNzI0LDAtODYuNTQ1LTM4LjgyMi04Ni41NDUtODYuNTQ2czM4LjgyMi04Ni41NDUsODYuNTQ1LTg2LjU0NVYxOTkuNzI4Yy01Mi40NTksMC0xMDEuNzY1LDIwLjQtMTM4LjgxOSw1Ny40NTQmI3hkOyYjeG'+
			'E7JiN4OTsmI3g5O1MxMDkuNzI3LDM0My41NDEsMTA5LjcyNywzOTZ6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTTIxOS40NTUsMzk2YzAsNDcuNzI0LDM4LjgyMiw4Ni41NDYsODYuNTQ1LDg2LjU0NlYzMDkuNDU1QzI1OC4yNzYsMzA5LjQ1NSwyMTkuNDU1LDM0OC4yNzYsMjE5LjQ1NSwzOTZ6IiBmaWxsPSIjRkYwMDFGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image8__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image8.onmouseover=function (e) {
			me._ht_node_image8__img.style.visibility='hidden';
			me._ht_node_image8__imgo.style.visibility='inherit';
		}
		me._ht_node_image8.onmouseout=function (e) {
			me._ht_node_image8__img.style.visibility='inherit';
			me._ht_node_image8__imgo.style.visibility='hidden';
		}
		me._ht_node_image8.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._ht_node_image8);
		el=me._hotspot_preview8=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -147px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview8.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview8.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview8.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview8.style[domTransition]='';
				if (me._hotspot_preview8.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview8.style.visibility=(Number(me._hotspot_preview8.style.opacity)>0||!me._hotspot_preview8.style.opacity)?'inherit':'hidden';
					me._hotspot_preview8.ggVisible=true;
				}
				else {
					me._hotspot_preview8.style.visibility="hidden";
					me._hotspot_preview8.ggVisible=false;
				}
			}
		}
		me._hotspot_preview8.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_8=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_8.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview8.appendChild(me._preview_picture_frame_8);
		el=me._preview_nodeimage8=document.createElement('div');
		els=me._preview_nodeimage8__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage8.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage8.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview8.appendChild(me._preview_nodeimage8);
		el=me._tooltip8=document.createElement('div');
		els=me._tooltip8__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip8.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview8.appendChild(me._tooltip8);
		el=me._checkmark_tick_node8=document.createElement('div');
		els=me._checkmark_tick_node8__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node8__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node8.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node8.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node8.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node8.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node8.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node8.style[domTransition]='';
				if (me._checkmark_tick_node8.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node8.style.visibility=(Number(me._checkmark_tick_node8.style.opacity)>0||!me._checkmark_tick_node8.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node8.ggVisible=true;
				}
				else {
					me._checkmark_tick_node8.style.visibility="hidden";
					me._checkmark_tick_node8.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node8.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview8.appendChild(me._checkmark_tick_node8);
		me._ht_node.appendChild(me._hotspot_preview8);
		me.__div = me._ht_node;
	};
	function SkinHotspotClass_ht_node_y(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node_y=document.createElement('div');
		el.ggId="ht_node Y";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : 198px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_y.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node_y.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_y.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_y.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node_y']=true;
			me._hotspot_preview7.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_y.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node_y']=false;
			me._hotspot_preview7.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_y.ontouchend=function (e) {
			me.elementMouseOver['ht_node_y']=false;
			me._hotspot_preview7.logicBlock_visible();
		}
		me._ht_node_y.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_visited=document.createElement('div');
		els=me._ht_node_visited__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDEyNTYuNSIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSIxMjU2LjVweCIgdmlld0JveD0iMCAwIDYxMiAxMjU2LjUiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTU1MS4xOTksMzY0LjI1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMTM1LjQyLTEwOS43OC0yNDUuMi0yNDUuMTk5LTI0NS4yYy0xMzUuNDIsMC0yNDUuMTk5LDEwOS43NzktMjQ1LjE5OSwyNDUuMmMwLDEyNC4xMDQsOTIuMjA1LDIyNi42NTgsMjExLjg0NSwyNDIuOTMzJiN4ZDsm'+
			'I3hhOyYjeDk7JiN4OTtMMzA2LDExMzEuNTIxbDAsMGwzMy4zNTQtNTI0LjMzMkM0NTguOTkyLDU5MC45MTQsNTUxLjE5OSw0ODguMzU5LDU1MS4xOTksMzY0LjI1N3oiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIi8+CiAgPGNpcmNsZSByPSIxNjguNDE3IiBjeT0iMzY0LjI1NyIgZmlsbD0iI0ZGRkZGRiIgY3g9IjMwNiIvPgogIDxwYXRoIGQ9Ik00NzIuODE4LDE5Ny40MzhDNDI4LjI5NSwxNTIuOTE2LDM2OS4wNDgsMTI4LjM5NSwzMDYsMTI4LjM5NXY4NC41NzhjNDAuNDM1LDAsNzguNDM4LDE1LjcyNCwxMDcsNDQuMjg1JiN4ZDsmI3hhOyYjeDk7Ji'+
			'N4OTtjMjguNTYxLDI4LjU2MSw0NC4yODQsNjYuNTY1LDQ0LjI4NCwxMDdjMCw0MC40MzYtMTUuNzI1LDc4LjQzOC00NC4yODQsMTA2Ljk5OWMtMjguNTYzLDI4LjU2My02Ni41NjUsNDQuMjg1LTEwNyw0NC4yODV2ODQuNTc2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjNjMuMDQ4LDAsMTIyLjI5NS0yNC41MjEsMTY2LjgxOC02OS4wNDRjNDQuNTIxLTQ0LjUyMiw2OS4wNDMtMTAzLjc3MSw2OS4wNDMtMTY2LjgxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzU0MS44NjEsMzAxLjIwNyw1MTcuMzQxLDI0MS45NjEsNDcyLjgxOCwxOTcuNDM4eiIgZmlsbD0iI0IyMDAxRSIvPgogIDxwYXRoIGQ9Ik0zNzIuNzA5'+
			'LDM2NC4yNTdjMC0zNi43ODUtMjkuOTI0LTY2LjcwOC02Ni43MDktNjYuNzA4djEzMy40MTcmI3hkOyYjeGE7JiN4OTsmI3g5O0MzNDIuNzg1LDQzMC45NjYsMzcyLjcwOSw0MDEuMDQxLDM3Mi43MDksMzY0LjI1N3oiIGZpbGw9IiMwMkQxMDciLz4KICA8cGF0aCBkPSJNMTk5LDQ3MS4yNTdjLTI4LjU2MS0yOC41NjMtNDQuMjg1LTY2LjU2NC00NC4yODUtMTA3YzAtNDAuNDM1LDE1LjcyNC03OC40MzksNDQuMjg1LTEwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7czY2LjU2NS00NC4yODUsMTA3LTQ0LjI4NXYtODQuNTc3Yy02My4wNDksMC0xMjIuMjk2LDI0LjUyMS0xNjYuODE3LDY5LjA0M0M5NC42Ni'+
			'wyNDEuOTYsNzAuMTM5LDMwMS4yMDcsNzAuMTM5LDM2NC4yNTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDYzLjA0OCwyNC41MjEsMTIyLjI5NSw2OS4wNDQsMTY2LjgxN2M0NC41MjEsNDQuNTIyLDEwMy43NjgsNjkuMDQ0LDE2Ni44MTcsNjkuMDQ0VjUxNS41NCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI2NS41NjUsNTE1LjU0LDIyNy41NjEsNDk5LjgxNywxOTksNDcxLjI1N3oiIGZpbGw9IiMwMDVEQkEiLz4KICA8cGF0aCBkPSJNMTU0LjcxNSwzNjQuMjU3YzAsNDAuNDM2LDE1LjcyNCw3OC40MzgsNDQuMjg1LDEwN3M2Ni41NjUsNDQuMjgzLDEwNyw0NC4yODN2LTg0LjU3NCYjeGQ7JiN4YTsmI3g5'+
			'OyYjeDk7Yy0zNi43ODUsMC02Ni43MDgtMjkuOTI1LTY2LjcwOC02Ni43MDljMC0zNi43ODUsMjkuOTIzLTY2LjcwOCw2Ni43MDgtNjYuNzA4di04NC41NzZjLTQwLjQzNSwwLTc4LjQzOSwxNS43MjQtMTA3LDQ0LjI4NSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE3MC40MzksMjg1LjgxOCwxNTQuNzE1LDMyMy44MjIsMTU0LjcxNSwzNjQuMjU3eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDxwYXRoIGQ9Ik0yMzkuMjkyLDM2NC4yNTdjMCwzNi43ODQsMjkuOTIzLDY2LjcwOSw2Ni43MDgsNjYuNzA5VjI5Ny41NDkmI3hkOyYjeGE7JiN4OTsmI3g5O0MyNjkuMjE1LDI5Ny41NDksMjM5LjI5MiwzMjcuNDcyLD'+
			'IzOS4yOTIsMzY0LjI1N3oiIGZpbGw9IiMxMkY0MDAiLz4KIDwvZz4KIDxwb2x5Z29uIHBvaW50cz0iMjg4LjA0MSw4MzAuNjY0IDMwNiwxMTEyLjk4NCAzMjMuOTYsODMwLjY2NCAiIGZpbGw9IiNGRjAwMDAiLz4KPC9zdmc+Cg==';
		me._ht_node_visited__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_visited__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDEyNTYuNSIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSIxMjU2LjVweCIgdmlld0JveD0iMCAwIDYxMiAxMjU2LjUiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTYwNS45MjIsMzA2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNjA1LjkyMiwxNDAuMzU3LDQ3MS42NDIsNi4wNzgsMzA2LDYuMDc4QzE0MC4zNTcsNi4wNzgsNi4wNzgsMTQwLjM1Nyw2LjA3OCwzMDZjMCwxNTEuODAxLDExMi43ODQsMjc3LjI0MiwyNTkuMTI1LDI5Ny4xNDgmI3hkOyYj'+
			'eGE7JiN4OTsmI3g5O0wzMDYsMTI0NC41bDAsMGw0MC43OTktNjQxLjM1MkM0OTMuMTM4LDU4My4yNDEsNjA1LjkyMiw0NTcuODAxLDYwNS45MjIsMzA2eiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiLz4KICA8Y2lyY2xlIHI9IjIwNi4wMDQiIGN5PSIzMDYiIGZpbGw9IiNGRkZGRkYiIGN4PSIzMDYiLz4KICA8cGF0aCBkPSJNNTEwLjA0OSwxMDEuOTUyQzQ1NS41ODgsNDcuNDkzLDM4My4xMiwxNy41LDMwNiwxNy41djEwMy40NTNjNDkuNDU5LDAsOTUuOTQ0LDE5LjIzMywxMzAuODgsNTQuMTY4JiN4ZDsmI3hhOyYjeDk7JiN4OTtzNTQuMTY4LDgxLj'+
			'QyMSw1NC4xNjgsMTMwLjg4cy0xOS4yMzIsOTUuOTQ0LTU0LjE2OCwxMzAuODhjLTM0LjkzNywzNC45MzYtODEuNDIxLDU0LjE2OC0xMzAuODgsNTQuMTY4VjU5NC41JiN4ZDsmI3hhOyYjeDk7JiN4OTtjNzcuMTIsMCwxNDkuNTg4LTI5Ljk5MywyMDQuMDQ5LTg0LjQ1MUM1NjQuNTA3LDQ1NS41ODgsNTk0LjUsMzgzLjEyLDU5NC41LDMwNlM1NjQuNTA3LDE1Ni40MTEsNTEwLjA0OSwxMDEuOTUyeiIgZmlsbD0iI0IyMDAxRSIvPgogIDxwYXRoIGQ9Ik0zODcuNTk3LDMwNmMwLTQ0Ljk5NS0zNi42MDMtODEuNTk2LTgxLjU5Ny04MS41OTZ2MTYzLjE5MkMzNTAuOTk0LDM4Ny41OTcsMzg3LjU5Nywz'+
			'NTAuOTk0LDM4Ny41OTcsMzA2eiIgZmlsbD0iIzE4QkMwMCIvPgogIDxwYXRoIGQ9Ik0xNzUuMTIsNDM2Ljg4Yy0zNC45MzUtMzQuOTM3LTU0LjE2OC04MS40MjEtNTQuMTY4LTEzMC44OHMxOS4yMzMtOTUuOTQ1LDU0LjE2OC0xMzAuODgmI3hkOyYjeGE7JiN4OTsmI3g5O3M4MS40MjEtNTQuMTY4LDEzMC44OC01NC4xNjhWMTcuNWMtNzcuMTIsMC0xNDkuNTg5LDI5Ljk5My0yMDQuMDQ3LDg0LjQ1MkM0Ny40OTMsMTU2LjQxMSwxNy41LDIyOC44OCwxNy41LDMwNiYjeGQ7JiN4YTsmI3g5OyYjeDk7czI5Ljk5MywxNDkuNTg4LDg0LjQ1MywyMDQuMDQ5QzE1Ni40MTEsNTY0LjUwNywyMjguODgsNT'+
			'k0LjUsMzA2LDU5NC41VjQ5MS4wNDdDMjU2LjU0MSw0OTEuMDQ3LDIxMC4wNTUsNDcxLjgxNCwxNzUuMTIsNDM2Ljg4eiIgZmlsbD0iIzAwNURCQSIvPgogIDxwYXRoIGQ9Ik0xMjAuOTUyLDMwNmMwLDQ5LjQ1OSwxOS4yMzMsOTUuOTQ0LDU0LjE2OCwxMzAuODhzODEuNDIxLDU0LjE2NywxMzAuODgsNTQuMTY3di0xMDMuNDUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNDQuOTk1LDAtODEuNTk2LTM2LjYwMy04MS41OTYtODEuNTk3YzAtNDQuOTk1LDM2LjYwMi04MS41OTYsODEuNTk2LTgxLjU5NlYxMjAuOTUzYy00OS40NTksMC05NS45NDUsMTkuMjMzLTEzMC44OCw1NC4xNjgmI3hkOyYjeGE7JiN4'+
			'OTsmI3g5O1MxMjAuOTUyLDI1Ni41NDEsMTIwLjk1MiwzMDZ6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTTIyNC40MDQsMzA2YzAsNDQuOTk0LDM2LjYwMiw4MS41OTcsODEuNTk2LDgxLjU5N1YyMjQuNDA0QzI2MS4wMDUsMjI0LjQwNCwyMjQuNDA0LDI2MS4wMDUsMjI0LjQwNCwzMDZ6IiBmaWxsPSIjMTJGNDAwIi8+CiA8L2c+CiA8cG9seWdvbiBwb2ludHM9IjI4NC4wMzMsODc2LjUgMzA2LDEyMjEuODI2IDMyNy45NjgsODc2LjUgIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=';
		me._ht_node_visited__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_visited";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -15px;';
		hs+='position : absolute;';
		hs+='top : -60px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_node_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_visited.style[domTransition]='';
				if (me._ht_node_visited.ggCurrentLogicStateVisible == 0) {
					me._ht_node_visited.style.visibility=(Number(me._ht_node_visited.style.opacity)>0||!me._ht_node_visited.style.opacity)?'inherit':'hidden';
					me._ht_node_visited.ggVisible=true;
				}
				else {
					me._ht_node_visited.style.visibility="hidden";
					me._ht_node_visited.ggVisible=false;
				}
			}
		}
		me._ht_node_visited.onmouseover=function (e) {
			me._ht_node_visited__img.style.visibility='hidden';
			me._ht_node_visited__imgo.style.visibility='inherit';
		}
		me._ht_node_visited.onmouseout=function (e) {
			me._ht_node_visited__img.style.visibility='inherit';
			me._ht_node_visited__imgo.style.visibility='hidden';
		}
		me._ht_node_visited.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_y.appendChild(me._ht_node_visited);
		el=me._ht_node_image7=document.createElement('div');
		els=me._ht_node_image7__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDEyNTYuNSIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSIxMjU2LjVweCIgdmlld0JveD0iMCAwIDYxMiAxMjU2LjUiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTU2NC40MjIsMzUwLjE4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xNDIuNzIzLTExNS43LTI1OC40MjItMjU4LjQyMi0yNTguNDIyYy0xNDIuNzIzLDAtMjU4LjQyMiwxMTUuNjk5LTI1OC40MjIsMjU4LjQyMmMwLDEzMC43OTYsOTcuMTc4LDIzOC44OCwyMjMuMjcsMjU2LjAzMiYj'+
			'eGQ7JiN4YTsmI3g5OyYjeDk7TDMwNiwxMTU4LjgybDAsMGwzNS4xNTMtNTUyLjYwOEM0NjcuMjQzLDU4OS4wNiw1NjQuNDIyLDQ4MC45NzYsNTY0LjQyMiwzNTAuMTh6IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIvPgogIDxjaXJjbGUgcj0iMTc3LjQ5OSIgY3k9IjM1MC4xOCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjMwNiIvPgogIDxwYXRoIGQ9Ik00ODEuODE0LDE3NC4zNjZDNDM0Ljg5LDEyNy40NDIsMzcyLjQ0OSwxMDEuNiwzMDYsMTAxLjZ2ODkuMTM4YzQyLjYxNSwwLDgyLjY2OSwxNi41NzIsMTEyLjc3MSw0Ni42NzMmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O3M0Ni42NzMsNzAuMTU1LDQ2LjY3MywxMTIuNzdzLTE2LjU3MSw4Mi42NjgtNDYuNjczLDExMi43N2MtMzAuMTAzLDMwLjEwMi03MC4xNTUsNDYuNjczLTExMi43NzEsNDYuNjczdjg5LjEzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzY2LjQ0OSwwLDEyOC44OS0yNS44NDMsMTc1LjgxNC03Mi43NjZjNDYuOTIzLTQ2LjkyNSw3Mi43NjYtMTA5LjM2Niw3Mi43NjYtMTc1LjgxNSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzU1NC41OCwyODMuNzMxLDUyOC43MzcsMjIxLjI5LDQ4MS44MTQsMTc0LjM2NnoiIGZpbGw9IiNCMjAwMUUiLz4KICA8cGF0aCBkPSJNMzc2LjMwNywzNTAuMThjMC0zOC43NjktMzEu'+
			'NTM4LTcwLjMwNi03MC4zMDctNzAuMzA2djE0MC42MTEmI3hkOyYjeGE7JiN4OTsmI3g5O0MzNDQuNzY5LDQyMC40ODYsMzc2LjMwNywzODguOTQ4LDM3Ni4zMDcsMzUwLjE4eiIgZmlsbD0iIzAwNkRGMCIvPgogIDxwYXRoIGQ9Ik0xOTMuMjMsNDYyLjk1Yy0zMC4xMDEtMzAuMTAzLTQ2LjY3My03MC4xNTUtNDYuNjczLTExMi43NzFzMTYuNTcyLTgyLjY2OSw0Ni42NzMtMTEyLjc3JiN4ZDsmI3hhOyYjeDk7JiN4OTtzNzAuMTU1LTQ2LjY3MywxMTIuNzctNDYuNjczVjEwMS42Yy02Ni40NDksMC0xMjguODksMjUuODQzLTE3NS44MTMsNzIuNzY3QzgzLjI2MywyMjEuMjksNTcuNDE5LDI4My43Mz'+
			'EsNTcuNDE5LDM1MC4xOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsNjYuNDQ5LDI1Ljg0MywxMjguODksNzIuNzY4LDE3NS44MTVDMTc3LjExLDU3Mi45MTcsMjM5LjU1MSw1OTguNzYsMzA2LDU5OC43NnYtODkuMTM4JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjYzLjM4NSw1MDkuNjIyLDIyMy4zMzEsNDkzLjA1MSwxOTMuMjMsNDYyLjk1eiIgZmlsbD0iIzAwNURCQSIvPgogIDxwYXRoIGQ9Ik0xNDYuNTU3LDM1MC4xOGMwLDQyLjYxNSwxNi41NzIsODIuNjY5LDQ2LjY3MywxMTIuNzcxczcwLjE1NSw0Ni42NzIsMTEyLjc3LDQ2LjY3MnYtODkuMTM2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTM4Ljc2OSww'+
			'LTcwLjMwNi0zMS41MzgtNzAuMzA2LTcwLjMwN2MwLTM4Ljc2OSwzMS41MzctNzAuMzA2LDcwLjMwNi03MC4zMDZ2LTg5LjEzNmMtNDIuNjE1LDAtODIuNjY5LDE2LjU3Mi0xMTIuNzcsNDYuNjczJiN4ZDsmI3hhOyYjeDk7JiN4OTtTMTQ2LjU1NywzMDcuNTY0LDE0Ni41NTcsMzUwLjE4eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDxwYXRoIGQ9Ik0yMzUuNjk0LDM1MC4xOGMwLDM4Ljc2OSwzMS41MzcsNzAuMzA3LDcwLjMwNiw3MC4zMDdWMjc5Ljg3NCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI2Ny4yMzEsMjc5Ljg3NCwyMzUuNjk0LDMxMS40MTEsMjM1LjY5NCwzNTAuMTh6IiBmaWxsPSIjRkYwMDFGIi'+
			'8+CiA8L2c+CiA8cG9seWdvbiBwb2ludHM9IjI4Ny4wNzMsODQxLjc0IDMwNiwxMTM5LjI4NCAzMjQuOTI4LDg0MS43NCAiIGZpbGw9IiNGRjAwMDAiLz4KPC9zdmc+Cg==';
		me._ht_node_image7__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image7__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDEyNTYuNSIgeD0iMHB4IiBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSIxMjU2LjVweCIgdmlld0JveD0iMCAwIDYxMiAxMjU2LjUiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnPgogIDxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTYwNS45MjIsMzA2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNjA1LjkyMiwxNDAuMzU3LDQ3MS42NDIsNi4wNzgsMzA2LDYuMDc4QzE0MC4zNTcsNi4wNzgsNi4wNzgsMTQwLjM1Nyw2LjA3OCwzMDZjMCwxNTEuODAxLDExMi43ODQsMjc3LjI0MiwyNTkuMTI1LDI5Ny4xNDgmI3hkOyYj'+
			'eGE7JiN4OTsmI3g5O0wzMDYsMTI0NC41bDAsMGw0MC43OTktNjQxLjM1MkM0OTMuMTM4LDU4My4yNDEsNjA1LjkyMiw0NTcuODAxLDYwNS45MjIsMzA2eiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiLz4KICA8Y2lyY2xlIHI9IjIwNi4wMDQiIGN5PSIzMDYiIGZpbGw9IiNGRkZGRkYiIGN4PSIzMDYiLz4KICA8cGF0aCBkPSJNNTEwLjA0OSwxMDEuOTUyQzQ1NS41ODgsNDcuNDkzLDM4My4xMiwxNy41LDMwNiwxNy41djEwMy40NTNjNDkuNDU5LDAsOTUuOTQ0LDE5LjIzMywxMzAuODgsNTQuMTY4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMzQuOTM1LDM0Lj'+
			'kzNSw1NC4xNjgsODEuNDIxLDU0LjE2OCwxMzAuODhzLTE5LjIzMyw5NS45NDQtNTQuMTY4LDEzMC44OGMtMzQuOTM3LDM0LjkzNS04MS40MjEsNTQuMTY4LTEzMC44OCw1NC4xNjhWNTk0LjUmI3hkOyYjeGE7JiN4OTsmI3g5O2M3Ny4xMiwwLDE0OS41ODgtMjkuOTkzLDIwNC4wNDktODQuNDUxQzU2NC41MDcsNDU1LjU4OCw1OTQuNSwzODMuMTIsNTk0LjUsMzA2UzU2NC41MDcsMTU2LjQxMSw1MTAuMDQ5LDEwMS45NTJ6IiBmaWxsPSIjQjIwMDFFIi8+CiAgPHBhdGggZD0iTTM4Ny41OTcsMzA2YzAtNDQuOTk1LTM2LjYwMy04MS41OTYtODEuNTk3LTgxLjU5NnYxNjMuMTkyQzM1MC45OTQsMzg3'+
			'LjU5NywzODcuNTk3LDM1MC45OTQsMzg3LjU5NywzMDZ6IiBmaWxsPSIjMDA2REYwIi8+CiAgPHBhdGggZD0iTTE3NS4xMiw0MzYuODhjLTM0LjkzNS0zNC45MzctNTQuMTY4LTgxLjQyMS01NC4xNjgtMTMwLjg4czE5LjIzMy05NS45NDUsNTQuMTY4LTEzMC44OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzM0LjkzNS0zNC45MzUsODEuNDIxLTU0LjE2OCwxMzAuODgtNTQuMTY4VjE3LjVjLTc3LjEyLDAtMTQ5LjU4OSwyOS45OTMtMjA0LjA0Nyw4NC40NTJDNDcuNDkzLDE1Ni40MTEsMTcuNSwyMjguODgsMTcuNSwzMDYmI3hkOyYjeGE7JiN4OTsmI3g5O3MyOS45OTMsMTQ5LjU4OCw4NC40NTMsMjA0Lj'+
			'A0OUMxNTYuNDExLDU2NC41MDcsMjI4Ljg4LDU5NC41LDMwNiw1OTQuNVY0OTEuMDQ3QzI1Ni41NDEsNDkxLjA0NywyMTAuMDU1LDQ3MS44MTQsMTc1LjEyLDQzNi44OHoiIGZpbGw9IiMwMDVEQkEiLz4KICA8cGF0aCBkPSJNMTIwLjk1MiwzMDZjMCw0OS40NTksMTkuMjMzLDk1Ljk0NCw1NC4xNjgsMTMwLjg4YzM0LjkzNSwzNC45MzUsODEuNDIxLDU0LjE2NywxMzAuODgsNTQuMTY3di0xMDMuNDUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNDQuOTk1LDAtODEuNTk2LTM2LjYwMy04MS41OTYtODEuNTk3YzAtNDQuOTk1LDM2LjYwMi04MS41OTYsODEuNTk2LTgxLjU5NlYxMjAuOTUzYy00OS40NTks'+
			'MC05NS45NDUsMTkuMjMzLTEzMC44OCw1NC4xNjgmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNDAuMTg1LDIxMC4wNTYsMTIwLjk1MiwyNTYuNTQxLDEyMC45NTIsMzA2eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDxwYXRoIGQ9Ik0yMjQuNDA0LDMwNmMwLDQ0Ljk5NCwzNi42MDIsODEuNTk3LDgxLjU5Niw4MS41OTdWMjI0LjQwNEMyNjEuMDA1LDIyNC40MDQsMjI0LjQwNCwyNjEuMDA1LDIyNC40MDQsMzA2eiIgZmlsbD0iI0ZGMDAxRiIvPgogPC9nPgogPHBvbHlnb24gcG9pbnRzPSIyODQuMDMzLDg3Ni41IDMwNiwxMjIxLjgyNiAzMjcuOTY4LDg3Ni41ICIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4K';
		me._ht_node_image7__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -15px;';
		hs+='position : absolute;';
		hs+='top : -60px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image7.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_node_image7.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_image7.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_image7.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_image7.style[domTransition]='';
				if (me._ht_node_image7.ggCurrentLogicStateVisible == 0) {
					me._ht_node_image7.style.visibility="hidden";
					me._ht_node_image7.ggVisible=false;
				}
				else {
					me._ht_node_image7.style.visibility=(Number(me._ht_node_image7.style.opacity)>0||!me._ht_node_image7.style.opacity)?'inherit':'hidden';
					me._ht_node_image7.ggVisible=true;
				}
			}
		}
		me._ht_node_image7.onmouseover=function (e) {
			me._ht_node_image7__img.style.visibility='hidden';
			me._ht_node_image7__imgo.style.visibility='inherit';
		}
		me._ht_node_image7.onmouseout=function (e) {
			me._ht_node_image7__img.style.visibility='inherit';
			me._ht_node_image7__imgo.style.visibility='hidden';
		}
		me._ht_node_image7.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_y.appendChild(me._ht_node_image7);
		el=me._hotspot_preview7=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -196px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview7.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node_y'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview7.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview7.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview7.style[domTransition]='';
				if (me._hotspot_preview7.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview7.style.visibility=(Number(me._hotspot_preview7.style.opacity)>0||!me._hotspot_preview7.style.opacity)?'inherit':'hidden';
					me._hotspot_preview7.ggVisible=true;
				}
				else {
					me._hotspot_preview7.style.visibility="hidden";
					me._hotspot_preview7.ggVisible=false;
				}
			}
		}
		me._hotspot_preview7.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_7=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_7.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview7.appendChild(me._preview_picture_frame_7);
		el=me._preview_nodeimage7=document.createElement('div');
		els=me._preview_nodeimage7__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage7.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage7.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview7.appendChild(me._preview_nodeimage7);
		el=me._tooltip7=document.createElement('div');
		els=me._tooltip7__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip7.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview7.appendChild(me._tooltip7);
		el=me._checkmark_tick_node7=document.createElement('div');
		els=me._checkmark_tick_node7__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node7__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node7.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node7.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node7.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node7.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node7.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node7.style[domTransition]='';
				if (me._checkmark_tick_node7.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node7.style.visibility=(Number(me._checkmark_tick_node7.style.opacity)>0||!me._checkmark_tick_node7.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node7.ggVisible=true;
				}
				else {
					me._checkmark_tick_node7.style.visibility="hidden";
					me._checkmark_tick_node7.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node7.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview7.appendChild(me._checkmark_tick_node7);
		me._ht_node_y.appendChild(me._hotspot_preview7);
		me.__div = me._ht_node_y;
	};
	function SkinHotspotClass_ht_node9h(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node9h=document.createElement('div');
		el.ggId="ht_node-9h";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node9h.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node9h.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node9h.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node9h.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node9h']=true;
			me._hotspot_preview6.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node9h.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node9h']=false;
			me._hotspot_preview6.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node9h.ontouchend=function (e) {
			me.elementMouseOver['ht_node9h']=false;
			me._hotspot_preview6.logicBlock_visible();
		}
		me._ht_node9h.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image6=document.createElement('div');
		els=me._ht_node_image6__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzlfaF94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksNTEuNzE2Yy0xNDguNTIsMC0yNjguOTIsMTE0Ljc0LTI2OC45MiwyNTYuMjg1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwxNDEuNTQxLDEyMC40LDI1Ni4yODMsMjY4LjkyLDI1Ni4yODNjMTQ4LjUyMSwwLDI2OC45MjQtMTE0Ljc0MiwyNjguOTI0LTI1'+
			'Ni4yODNDNTc0LjIsMTY2LjQ1Niw0NTMuODAxLDUxLjcxNiwzMDUuMjc5LDUxLjcxNnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA1LjkxNCw0OTguMTM1Yy0xMjcuNjgyLDAtMjMxLjE4OC05Ni43MDctMjMxLjE4OC0yMTZjMC0xMTkuMjk2LDEwMy41MDYtMjE2LDIzMS4xODgtMjE2czIzMS4xODgsOTYuNzA0LDIzMS4xODgsMjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNTM3LjEwMiw0MDEuNDI4LDQzMy41OTYsNDk4LjEzNSwzMDUuOTE0LDQ5OC4xMzV6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHJ4PSIyMzEuMTg4IiBvcGFjaXR5PSIwLj'+
			'g1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3k9IjI4Mi4xMzUiIHJ5PSIyMTYiIGN4PSIzMDUuOTE0Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0MTAuNzc5LDIzNy42MDUgMzY0Ljk3NywyMzcuOTIyIDM2OC4xODMsMjYzLjIzNCAyNTUuMjg5LDIwNC4wMDMgMzU2LjM3LDE1NC43MjkgMzU4LjU2NCwxNzMuNjI4ICYjeGQ7JiN4YTsmI3g5OyYjeDk7Mzk4LjU3MiwxNzMuNzg1IDM4NS45MDEsMTA3LjUzNSAxNzEuMjUyLDIwMy4zODUgNDMzLjE1MSwzNTQuNTg1ICYjeDk7IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image6__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image6__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzlfaF94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNy44NjUsMjIuMzJDMTM5LjksMjIuMzIsMy43MzYsMTUyLjA4MywzLjczNiwzMTIuMTYmI3hkOyYjeGE7JiN4OTsmI3g5O0MzLjczNiw0NzIuMjM0LDEzOS45LDYwMiwzMDcuODY1LDYwMkM0NzUuODM0LDYwMiw2MTIsNDcyLjIzNCw2MTIsMzEyLjE2QzYxMS45'+
			'OTcsMTUyLjA4Myw0NzUuODM0LDIyLjMyLDMwNy44NjUsMjIuMzJ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTMwOC41ODQsNTI3LjE4OGMtMTQ0LjQsMC0yNjEuNDU4LTEwOS4zNjktMjYxLjQ1OC0yNDQuMjgxYzAtMTM0LjkxNSwxMTcuMDU4LTI0NC4yODEsMjYxLjQ1OC0yNDQuMjgxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMTQ0LjM5OSwwLDI2MS40NTcsMTA5LjM2NiwyNjEuNDU3LDI0NC4yODFDNTcwLjA0MSw0MTcuODE5LDQ1Mi45ODMsNTI3LjE4OCwzMDguNTg0LDUyNy4xODh6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHJ4PSIyNjEuND'+
			'U3IiBvcGFjaXR5PSIwLjg1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3k9IjI4Mi45MDciIHJ5PSIyNDQuMjgxIiBjeD0iMzA4LjU4NCIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDI3LjE3OSwyMzIuNTQ4IDM3NS4zOCwyMzIuOTA2IDM3OS4wMDYsMjYxLjUzMiAyNTEuMzMxLDE5NC41NDYgMzY1LjY0NiwxMzguODE5IDM2OC4xMjgsMTYwLjE5NCAmI3hkOyYjeGE7JiN4OTsmI3g5OzQxMy4zNzQsMTYwLjM3MiAzOTkuMDQ0LDg1LjQ0NyAxNTYuMjksMTkzLjg0NyA0NTIuNDgsMzY0Ljg0NCAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_node_image6__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image6.onmouseover=function (e) {
			me._ht_node_image6__img.style.visibility='hidden';
			me._ht_node_image6__imgo.style.visibility='inherit';
		}
		me._ht_node_image6.onmouseout=function (e) {
			me._ht_node_image6__img.style.visibility='inherit';
			me._ht_node_image6__imgo.style.visibility='hidden';
		}
		me._ht_node_image6.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node9h.appendChild(me._ht_node_image6);
		el=me._hotspot_preview6=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview6.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node9h'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview6.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview6.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview6.style[domTransition]='';
				if (me._hotspot_preview6.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview6.style.visibility=(Number(me._hotspot_preview6.style.opacity)>0||!me._hotspot_preview6.style.opacity)?'inherit':'hidden';
					me._hotspot_preview6.ggVisible=true;
				}
				else {
					me._hotspot_preview6.style.visibility="hidden";
					me._hotspot_preview6.ggVisible=false;
				}
			}
		}
		me._hotspot_preview6.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_6=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_6.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview6.appendChild(me._preview_picture_frame_6);
		el=me._preview_nodeimage6=document.createElement('div');
		els=me._preview_nodeimage6__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage6.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage6.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview6.appendChild(me._preview_nodeimage6);
		el=me._tooltip6=document.createElement('div');
		els=me._tooltip6__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip6.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview6.appendChild(me._tooltip6);
		el=me._checkmark_tick_node6=document.createElement('div');
		els=me._checkmark_tick_node6__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node6__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node6.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node6.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node6.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node6.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node6.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node6.style[domTransition]='';
				if (me._checkmark_tick_node6.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node6.style.visibility=(Number(me._checkmark_tick_node6.style.opacity)>0||!me._checkmark_tick_node6.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node6.ggVisible=true;
				}
				else {
					me._checkmark_tick_node6.style.visibility="hidden";
					me._checkmark_tick_node6.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node6.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview6.appendChild(me._checkmark_tick_node6);
		me._ht_node9h.appendChild(me._hotspot_preview6);
		me.__div = me._ht_node9h;
	};
	function SkinHotspotClass_ht_node10h30(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node10h30=document.createElement('div');
		el.ggId="ht_node-10h30";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node10h30.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node10h30.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node10h30.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node10h30.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node10h30']=true;
			me._hotspot_preview5.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node10h30.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node10h30']=false;
			me._hotspot_preview5.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node10h30.ontouchend=function (e) {
			me.elementMouseOver['ht_node10h30']=false;
			me._hotspot_preview5.logicBlock_visible();
		}
		me._ht_node10h30.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image5=document.createElement('div');
		els=me._ht_node_image5__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMGgzMCI+CiAgPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMzA1LjI3OSw1MS43MTZjLTE0OC41MiwwLTI2OC45MiwxMTQuNzQtMjY4LjkyLDI1Ni4yODUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDE0MS41NDEsMTIwLjQsMjU2LjI4MywyNjguOTIsMjU2LjI4M2MxNDguNTIxLDAsMjY4LjkyNC0xMTQuNzQyLDI2OC45MjQtMjU2LjI4M0M1NzQu'+
			'MiwxNjYuNDU2LDQ1My44MDEsNTEuNzE2LDMwNS4yNzksNTEuNzE2eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0zMDUuOTE0LDQ5OC4xMzVjLTEyNy42ODIsMC0yMzEuMTg4LTk2LjcwNy0yMzEuMTg4LTIxNmMwLTExOS4yOTYsMTAzLjUwNi0yMTYsMjMxLjE4OC0yMTZzMjMxLjE4OCw5Ni43MDQsMjMxLjE4OCwyMTYmI3hkOyYjeGE7JiN4OTsmI3g5O0M1MzcuMTAyLDQwMS40MjgsNDMzLjU5Niw0OTguMTM1LDMwNS45MTQsNDk4LjEzNXoiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBmaWxsPSIjRThFOEU4Ii8+CiAgPGVsbGlwc2Ugc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByeD0iMjMxLjE4OC'+
			'Igb3BhY2l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyODIuMTM1IiByeT0iMjE2IiBzdHJva2U9IiMwMDAwMDAiIGN4PSIzMDUuOTE0Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0NjYuMDU4LDE4Mi4wNjUgNDEwLjg3NywyNDYuMDIxIDM3NS4yNzEsMjE2LjE1MyAzOTAuMjg5LDIwMS4xMzUgMjc1LjIwMiwxNzUuNDg0ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzA0LjA1OCwyODguODg1IDMyNC40NzcsMjY3LjYyMiAzNjAuNTg5LDMwMy4wNiAyNzQuNjk1LDQwMi4xMTUgMjI1LjkyNywxMzEuOTQ3ICYjeDk7IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image5__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image5__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMGgzMCI+CiAgPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMzA2Ljg2NSwxNi4zMkMxMzguOSwxNi4zMiwyLjczNiwxNDYuMDgzLDIuNzM2LDMwNi4xNiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIuNzM2LDQ2Ni4yMzQsMTM4LjksNTk2LDMwNi44NjUsNTk2QzQ3NC44MzQsNTk2LDYxMSw0NjYuMjM0LDYxMSwzMDYuMTZDNjEwLjk5NywxNDYuMDgz'+
			'LDQ3NC44MzQsMTYuMzIsMzA2Ljg2NSwxNi4zMnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA3LjU4NCw1MjEuMTg4Yy0xNDQuNCwwLTI2MS40NTgtMTA5LjM2OS0yNjEuNDU4LTI0NC4yODFjMC0xMzQuOTE1LDExNy4wNTgtMjQ0LjI4MSwyNjEuNDU4LTI0NC4yODEmI3hkOyYjeGE7JiN4OTsmI3g5O2MxNDQuMzk5LDAsMjYxLjQ1NywxMDkuMzY2LDI2MS40NTcsMjQ0LjI4MUM1NjkuMDQxLDQxMS44MTksNDUxLjk4Myw1MjEuMTg4LDMwNy41ODQsNTIxLjE4OHoiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBmaWxsPSIjRThFOEU4Ii8+CiAgPGVsbGlwc2Ugc3Ryb2tlLW1pdGVybGltaXQ9Ij'+
			'EwIiByeD0iMjYxLjQ1NyIgb3BhY2l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyNzYuOTA3IiByeT0iMjQ0LjI4MSIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA3LjU4NCIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDg4LjY5NSwxNjMuNzM2IDQyNi4yODksMjM2LjA2NiAzODYuMDIxLDIwMi4yODcgNDAzLjAwNiwxODUuMzAyIDI3Mi44NSwxNTYuMjkzIDMwNS40ODQsMjg0LjU0MSAmI3hkOyYjeGE7JiN4OTsmI3g5OzMyOC41NzcsMjYwLjQ5NSAzNjkuNDE4LDMwMC41NzIgMjcyLjI3Nyw0MTIuNTk4IDIxNy4xMjQsMTA3LjA1NSAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIv'+
			'PgogPC9nPgo8L3N2Zz4K';
		me._ht_node_image5__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image5.onmouseover=function (e) {
			me._ht_node_image5__img.style.visibility='hidden';
			me._ht_node_image5__imgo.style.visibility='inherit';
		}
		me._ht_node_image5.onmouseout=function (e) {
			me._ht_node_image5__img.style.visibility='inherit';
			me._ht_node_image5__imgo.style.visibility='hidden';
		}
		me._ht_node_image5.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node10h30.appendChild(me._ht_node_image5);
		el=me._hotspot_preview5=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview5.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node10h30'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview5.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview5.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview5.style[domTransition]='';
				if (me._hotspot_preview5.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview5.style.visibility=(Number(me._hotspot_preview5.style.opacity)>0||!me._hotspot_preview5.style.opacity)?'inherit':'hidden';
					me._hotspot_preview5.ggVisible=true;
				}
				else {
					me._hotspot_preview5.style.visibility="hidden";
					me._hotspot_preview5.ggVisible=false;
				}
			}
		}
		me._hotspot_preview5.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_5=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_5.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview5.appendChild(me._preview_picture_frame_5);
		el=me._preview_nodeimage5=document.createElement('div');
		els=me._preview_nodeimage5__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage5.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage5.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview5.appendChild(me._preview_nodeimage5);
		el=me._tooltip5=document.createElement('div');
		els=me._tooltip5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip5.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview5.appendChild(me._tooltip5);
		el=me._checkmark_tick_node5=document.createElement('div');
		els=me._checkmark_tick_node5__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node5__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node5.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node5.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node5.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node5.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node5.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node5.style[domTransition]='';
				if (me._checkmark_tick_node5.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node5.style.visibility=(Number(me._checkmark_tick_node5.style.opacity)>0||!me._checkmark_tick_node5.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node5.ggVisible=true;
				}
				else {
					me._checkmark_tick_node5.style.visibility="hidden";
					me._checkmark_tick_node5.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node5.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview5.appendChild(me._checkmark_tick_node5);
		me._ht_node10h30.appendChild(me._hotspot_preview5);
		me.__div = me._ht_node10h30;
	};
	function SkinHotspotClass_ht_node12h(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node12h=document.createElement('div');
		el.ggId="ht_node-12h";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node12h.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node12h.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node12h.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node12h.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node12h']=true;
			me._hotspot_preview4.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node12h.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node12h']=false;
			me._hotspot_preview4.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node12h.ontouchend=function (e) {
			me.elementMouseOver['ht_node12h']=false;
			me._hotspot_preview4.logicBlock_visible();
		}
		me._ht_node12h.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image4=document.createElement('div');
		els=me._ht_node_image4__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMl94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksNTEuNzE2Yy0xNDguNTIsMC0yNjguOTIsMTE0Ljc0LTI2OC45MiwyNTYuMjg1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwxNDEuNTQxLDEyMC40LDI1Ni4yODMsMjY4LjkyLDI1Ni4yODNjMTQ4LjUyMSwwLDI2OC45MjQtMTE0Ljc0MiwyNjguOTI0LTI1'+
			'Ni4yODNDNTc0LjIsMTY2LjQ1Niw0NTMuODAxLDUxLjcxNiwzMDUuMjc5LDUxLjcxNnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA1LjkxNCw0OTguMTM1Yy0xMjcuNjgyLDAtMjMxLjE4OC05Ni43MDctMjMxLjE4OC0yMTZjMC0xMTkuMjk2LDEwMy41MDYtMjE2LDIzMS4xODgtMjE2czIzMS4xODgsOTYuNzA0LDIzMS4xODgsMjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNTM3LjEwMiw0MDEuNDI4LDQzMy41OTYsNDk4LjEzNSwzMDUuOTE0LDQ5OC4xMzV6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcn'+
			'g9IjIzMS4xODgiIG9wYWNpdHk9IjAuODUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBjeT0iMjgyLjEzNSIgcnk9IjIxNiIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA1LjkxNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzA2LjI1MiwxNjEuMDg1IDM3NC42NTIsMjUzLjMzNSAzNDYuMzAyLDI1My4zMzUgMzUxLjI1MywzMDEuMDM0IDQ2OC4yNTIsMzAxLjAzNCAmI3hkOyYjeGE7JiN4OTsmI3g5OzMwNi4yNTIsMTA1LjI4NCAxNDcuNDAxLDMwMS4wMzQgMjY0LjkwOCwzMDEuMDM0IDI2Ny43NzYsMjUzLjEwOSAyNDAuNDM5LDI1Mi45NCAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8'+
			'L3N2Zz4K';
		me._ht_node_image4__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image4__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMl94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksMTYuMzJDMTM2LjczMywxNi4zMiwwLjEsMTQ2LjUzMSwwLjEsMzA3LjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMC4xLDQ2Ny43ODcsMTM2LjczMyw1OTgsMzA1LjI3OSw1OThjMTY4LjU0NywwLDMwNS4xODQtMTMwLjIxMywzMDUuMTg0LTI5MC44NEM2'+
			'MTAuNDYsMTQ2LjUzMSw0NzMuODI2LDE2LjMyLDMwNS4yNzksMTYuMzJ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTMwNiw1MjIuOTMxYy0xNDQuODk4LDAtMjYyLjM2LTEwOS43NDYtMjYyLjM2LTI0NS4xMjRDNDMuNjQsMTQyLjQyNiwxNjEuMTAyLDMyLjY4MiwzMDYsMzIuNjgyczI2Mi4zNiwxMDkuNzQ0LDI2Mi4zNiwyNDUuMTI1JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNTY4LjM1OSw0MTMuMTg1LDQ1MC44OTcsNTIyLjkzMSwzMDYsNTIyLjkzMXoiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBmaWxsPSIjRThFOEU4Ii8+CiAgPGVsbGlwc2Ugc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByeD0iMj'+
			'YyLjM2IiBvcGFjaXR5PSIwLjg1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3k9IjI3Ny44MDYiIHJ5PSIyNDUuMTI0IiBzdHJva2U9IiMwMDAwMDAiIGN4PSIzMDYiLz4KICA8cG9seWdvbiBwb2ludHM9IjMwNi4zODIsMTQwLjQzNiAzODQuMDA2LDI0NS4xMjQgMzUxLjgzMywyNDUuMTI0IDM1Ny40NTEsMjk5LjI1NSA0OTAuMjI2LDI5OS4yNTUgMzA2LjM4Miw3Ny4xMTEgJiN4ZDsmI3hhOyYjeDk7JiN4OTsxMjYuMTEzLDI5OS4yNTUgMjU5LjQ2NCwyOTkuMjU1IDI2Mi43MiwyNDQuODY4IDIzMS42OTYsMjQ0LjY3NyAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K'+
			'';
		me._ht_node_image4__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image4.onmouseover=function (e) {
			me._ht_node_image4__img.style.visibility='hidden';
			me._ht_node_image4__imgo.style.visibility='inherit';
		}
		me._ht_node_image4.onmouseout=function (e) {
			me._ht_node_image4__img.style.visibility='inherit';
			me._ht_node_image4__imgo.style.visibility='hidden';
		}
		me._ht_node_image4.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node12h.appendChild(me._ht_node_image4);
		el=me._hotspot_preview4=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview4.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node12h'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview4.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview4.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview4.style[domTransition]='';
				if (me._hotspot_preview4.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview4.style.visibility=(Number(me._hotspot_preview4.style.opacity)>0||!me._hotspot_preview4.style.opacity)?'inherit':'hidden';
					me._hotspot_preview4.ggVisible=true;
				}
				else {
					me._hotspot_preview4.style.visibility="hidden";
					me._hotspot_preview4.ggVisible=false;
				}
			}
		}
		me._hotspot_preview4.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_4=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_4.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview4.appendChild(me._preview_picture_frame_4);
		el=me._preview_nodeimage4=document.createElement('div');
		els=me._preview_nodeimage4__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage4.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage4.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview4.appendChild(me._preview_nodeimage4);
		el=me._tooltip4=document.createElement('div');
		els=me._tooltip4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip4.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview4.appendChild(me._tooltip4);
		el=me._checkmark_tick_node4=document.createElement('div');
		els=me._checkmark_tick_node4__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node4__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node4.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node4.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node4.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node4.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node4.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node4.style[domTransition]='';
				if (me._checkmark_tick_node4.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node4.style.visibility=(Number(me._checkmark_tick_node4.style.opacity)>0||!me._checkmark_tick_node4.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node4.ggVisible=true;
				}
				else {
					me._checkmark_tick_node4.style.visibility="hidden";
					me._checkmark_tick_node4.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node4.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview4.appendChild(me._checkmark_tick_node4);
		me._ht_node12h.appendChild(me._hotspot_preview4);
		me.__div = me._ht_node12h;
	};
	function SkinHotspotClass_ht_node1h30(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node1h30=document.createElement('div');
		el.ggId="ht_node-1h30";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node1h30.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node1h30.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node1h30.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node1h30.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node1h30']=true;
			me._hotspot_preview3.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node1h30.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node1h30']=false;
			me._hotspot_preview3.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node1h30.ontouchend=function (e) {
			me.elementMouseOver['ht_node1h30']=false;
			me._hotspot_preview3.logicBlock_visible();
		}
		me._ht_node1h30.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image3=document.createElement('div');
		els=me._ht_node_image3__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMGgzMCI+CiAgPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMzA1LjI3OSw1MS43MTZjLTE0OC41MiwwLTI2OC45MiwxMTQuNzQtMjY4LjkyLDI1Ni4yODUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDE0MS41NDEsMTIwLjQsMjU2LjI4MywyNjguOTIsMjU2LjI4M2MxNDguNTIxLDAsMjY4LjkyNC0xMTQuNzQyLDI2OC45MjQtMjU2LjI4M0M1NzQu'+
			'MiwxNjYuNDU2LDQ1My44MDEsNTEuNzE2LDMwNS4yNzksNTEuNzE2eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0zMDUuOTE0LDQ5OC4xMzVjLTEyNy42ODIsMC0yMzEuMTg4LTk2LjcwNy0yMzEuMTg4LTIxNmMwLTExOS4yOTYsMTAzLjUwNi0yMTYsMjMxLjE4OC0yMTZzMjMxLjE4OCw5Ni43MDQsMjMxLjE4OCwyMTYmI3hkOyYjeGE7JiN4OTsmI3g5O0M1MzcuMTAyLDQwMS40MjgsNDMzLjU5Niw0OTguMTM1LDMwNS45MTQsNDk4LjEzNXoiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBmaWxsPSIjRThFOEU4Ii8+CiAgPGVsbGlwc2Ugc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByeD0iMjMxLjE4OC'+
			'Igb3BhY2l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyODIuMTM1IiByeT0iMjE2IiBzdHJva2U9IiMwMDAwMDAiIGN4PSIzMDUuOTE0Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIxNzUuOTc3LDE4Mi4wNjUgMjMxLjE1OCwyNDYuMDIxIDI2Ni43NjUsMjE2LjE1MyAyNTEuNzQ1LDIwMS4xMzUgMzY2LjgzMywxNzUuNDg0ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzM3Ljk3NywyODguODg1IDMxNy41NTgsMjY3LjYyMiAyODEuNDQ1LDMwMy4wNiAzNjcuMzM5LDQwMi4xMTUgNDE2LjEwOCwxMzEuOTQ3ICYjeDk7IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image3__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image3__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMGgzMCI+CiAgPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMzA1LjI3OSwyMC4xODhDMTM3LjI3NSwyMC4xODgsMS4wOCwxNDkuOTgxLDEuMDgsMzEwLjA5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzEuMDgsNDcwLjIwNSwxMzcuMjc1LDYwMCwzMDUuMjc5LDYwMGMxNjguMDA2LDAsMzA0LjIwNC0xMjkuNzk1LDMwNC4yMDQtMjg5LjkwNUM2MDku'+
			'NDc5LDE0OS45ODEsNDczLjI4NSwyMC4xODgsMzA1LjI3OSwyMC4xODh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTMwNS45OTcsNTI1LjE3MmMtMTQ0LjQzMiwwLTI2MS41MTctMTA5LjM5NC0yNjEuNTE3LTI0NC4zMzdjMC0xMzQuOTQ2LDExNy4wODQtMjQ0LjMzNiwyNjEuNTE3LTI0NC4zMzYmI3hkOyYjeGE7JiN4OTsmI3g5O2MxNDQuNDMzLDAsMjYxLjUxNywxMDkuMzkxLDI2MS41MTcsMjQ0LjMzNkM1NjcuNTE0LDQxNS43NzgsNDUwLjQzLDUyNS4xNzIsMzA1Ljk5Nyw1MjUuMTcyeiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGZpbGw9IiNFOEU4RTgiLz4KICA8ZWxsaXBzZSBzdHJva2'+
			'UtbWl0ZXJsaW1pdD0iMTAiIHJ4PSIyNjEuNTE3IiBvcGFjaXR5PSIwLjg1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3k9IjI4MC44MzUiIHJ5PSIyNDQuMzM3IiBzdHJva2U9IiMwMDAwMDAiIGN4PSIzMDUuOTk3Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIxNTkuMDEzLDE2Ny42MzkgMjIxLjQzNCwyMzkuOTg1IDI2MS43MTEsMjA2LjE5OCAyNDQuNzIyLDE4OS4yMDkgMzc0LjkwNywxNjAuMTk0ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzQyLjI2NiwyODguNDcxIDMxOS4xNjgsMjY0LjQxOSAyNzguMzE4LDMwNC41MDYgMzc1LjQ4LDQxNi41NTcgNDMwLjY0NywxMTAuOTQ1ICYjeDk7IiBm'+
			'aWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image3__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image3.onmouseover=function (e) {
			me._ht_node_image3__img.style.visibility='hidden';
			me._ht_node_image3__imgo.style.visibility='inherit';
		}
		me._ht_node_image3.onmouseout=function (e) {
			me._ht_node_image3__img.style.visibility='inherit';
			me._ht_node_image3__imgo.style.visibility='hidden';
		}
		me._ht_node_image3.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node1h30.appendChild(me._ht_node_image3);
		el=me._hotspot_preview3=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node1h30'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview3.style[domTransition]='';
				if (me._hotspot_preview3.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview3.style.visibility=(Number(me._hotspot_preview3.style.opacity)>0||!me._hotspot_preview3.style.opacity)?'inherit':'hidden';
					me._hotspot_preview3.ggVisible=true;
				}
				else {
					me._hotspot_preview3.style.visibility="hidden";
					me._hotspot_preview3.ggVisible=false;
				}
			}
		}
		me._hotspot_preview3.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_3=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_3.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview3.appendChild(me._preview_picture_frame_3);
		el=me._preview_nodeimage3=document.createElement('div');
		els=me._preview_nodeimage3__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage3.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage3.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview3.appendChild(me._preview_nodeimage3);
		el=me._tooltip3=document.createElement('div');
		els=me._tooltip3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip3.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview3.appendChild(me._tooltip3);
		el=me._checkmark_tick_node3=document.createElement('div');
		els=me._checkmark_tick_node3__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node3__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node3.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node3.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node3.style[domTransition]='';
				if (me._checkmark_tick_node3.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node3.style.visibility=(Number(me._checkmark_tick_node3.style.opacity)>0||!me._checkmark_tick_node3.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node3.ggVisible=true;
				}
				else {
					me._checkmark_tick_node3.style.visibility="hidden";
					me._checkmark_tick_node3.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node3.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview3.appendChild(me._checkmark_tick_node3);
		me._ht_node1h30.appendChild(me._hotspot_preview3);
		me.__div = me._ht_node1h30;
	};
	function SkinHotspotClass_ht_node3h(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node3h=document.createElement('div');
		el.ggId="ht_node-3h";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node3h.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node3h.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node3h.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node3h.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node3h']=true;
			me._hotspot_preview2.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node3h.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node3h']=false;
			me._hotspot_preview2.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node3h.ontouchend=function (e) {
			me.elementMouseOver['ht_node3h']=false;
			me._hotspot_preview2.logicBlock_visible();
		}
		me._ht_node3h.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image2=document.createElement('div');
		els=me._ht_node_image2__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzlfaF94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksNTIuNDMyYy0xNDguNTIsMC0yNjguOTIsMTE0Ljc0LTI2OC45MiwyNTYuMjg1JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMzYuMzU5LDQ1MC4yNTgsMTU2Ljc2LDU2NSwzMDUuMjc5LDU2NWMxNDguNTIxLDAsMjY4LjkyNC0xMTQuNzQyLDI2OC45MjQtMjU2'+
			'LjI4M0M1NzQuMiwxNjcuMTcyLDQ1My44MDEsNTIuNDMyLDMwNS4yNzksNTIuNDMyeiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0zMDUuOTE0LDQ5OC44NTFjLTEyNy42ODIsMC0yMzEuMTg4LTk2LjcwNy0yMzEuMTg4LTIxNmMwLTExOS4yOTYsMTAzLjUwNi0yMTYsMjMxLjE4OC0yMTZzMjMxLjE4OCw5Ni43MDQsMjMxLjE4OCwyMTYmI3hkOyYjeGE7JiN4OTsmI3g5O0M1MzcuMTAyLDQwMi4xNDQsNDMzLjU5Niw0OTguODUxLDMwNS45MTQsNDk4Ljg1MXoiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBmaWxsPSIjRThFOEU4Ii8+CiAgPGVsbGlwc2Ugcng9IjIzMS4xODgiIG9wYWNpdHk9IjAuOD'+
			'UiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBjeT0iMjgyLjg1MSIgcnk9IjIxNiIgY3g9IjMwNS45MTQiLz4KICA8cG9seWdvbiBwb2ludHM9IjE5My42MjQsMjM4LjMyMSAyMzkuNDI3LDIzOC42MzggMjM2LjIyMSwyNjMuOTUgMzQ5LjExNCwyMDQuNzE5IDI0OC4wMzMsMTU1LjQ0NCAyNDUuODM5LDE3NC4zNDQgJiN4ZDsmI3hhOyYjeDk7JiN4OTsyMDUuODMsMTc0LjUwMSAyMTguNTAyLDEwOC4yNTEgNDMzLjE1MSwyMDQuMTAxIDE3MS4yNTIsMzU1LjMwMSAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_node_image2__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image2__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzlfaF94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNi4yNzksMTkuMTQyYy0xNjcuNzI4LDAtMzAzLjY5OSwxMjkuNTgtMzAzLjY5OSwyODkuNDMmI3hkOyYjeGE7JiN4OTsmI3g5O0MyLjU4LDQ2OC40MTksMTM4LjU1MSw1OTgsMzA2LjI3OSw1OThjMTY3LjczLDAsMzAzLjcwNC0xMjkuNTgxLDMwMy43MDQtMjg5'+
			'LjQyOUM2MDkuOTc5LDE0OC43MjEsNDc0LjAwOSwxOS4xNDIsMzA2LjI3OSwxOS4xNDJ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTMwNi45OTYsNTIzLjI5NWMtMTQ0LjE5NSwwLTI2MS4wODctMTA5LjIxNC0yNjEuMDg3LTI0My45MzVjMC0xMzQuNzI1LDExNi44OTItMjQzLjkzNiwyNjEuMDg3LTI0My45MzYmI3hkOyYjeGE7JiN4OTsmI3g5O2MxNDQuMTk0LDAsMjYxLjA4NywxMDkuMjExLDI2MS4wODcsMjQzLjkzNkM1NjguMDgzLDQxNC4wODEsNDUxLjE5LDUyMy4yOTUsMzA2Ljk5Niw1MjMuMjk1eiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGZpbGw9IiNFOEU4RTgiLz4KICA8ZWxsaX'+
			'BzZSByeD0iMjYxLjA4NyIgb3BhY2l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyNzkuMzYiIHJ5PSIyNDMuOTM1IiBjeD0iMzA2Ljk5NiIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTgwLjE4MywyMjkuMDcyIDIzMS45MSwyMjkuNDMgMjI4LjI4OSwyNTguMDE2IDM1NS43ODMsMTkxLjEyNCAyNDEuNjI5LDEzNS40NzYgMjM5LjE1MSwxNTYuODIxICYjeGQ7JiN4YTsmI3g5OyYjeDk7MTkzLjk2OCwxNTYuOTk4IDIwOC4yNzgsODIuMTggNDUwLjY4OSwxOTAuNDI2IDE1NC45MTcsMzYxLjE4MSAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_node_image2__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image2.onmouseover=function (e) {
			me._ht_node_image2__img.style.visibility='hidden';
			me._ht_node_image2__imgo.style.visibility='inherit';
		}
		me._ht_node_image2.onmouseout=function (e) {
			me._ht_node_image2__img.style.visibility='inherit';
			me._ht_node_image2__imgo.style.visibility='hidden';
		}
		me._ht_node_image2.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node3h.appendChild(me._ht_node_image2);
		el=me._hotspot_preview2=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node3h'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview2.style[domTransition]='';
				if (me._hotspot_preview2.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview2.style.visibility=(Number(me._hotspot_preview2.style.opacity)>0||!me._hotspot_preview2.style.opacity)?'inherit':'hidden';
					me._hotspot_preview2.ggVisible=true;
				}
				else {
					me._hotspot_preview2.style.visibility="hidden";
					me._hotspot_preview2.ggVisible=false;
				}
			}
		}
		me._hotspot_preview2.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_2=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_2.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview2.appendChild(me._preview_picture_frame_2);
		el=me._preview_nodeimage2=document.createElement('div');
		els=me._preview_nodeimage2__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage2.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage2.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview2.appendChild(me._preview_nodeimage2);
		el=me._tooltip2=document.createElement('div');
		els=me._tooltip2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip2.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview2.appendChild(me._tooltip2);
		el=me._checkmark_tick_node2=document.createElement('div');
		els=me._checkmark_tick_node2__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node2__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node2.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node2.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node2.style[domTransition]='';
				if (me._checkmark_tick_node2.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node2.style.visibility=(Number(me._checkmark_tick_node2.style.opacity)>0||!me._checkmark_tick_node2.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node2.ggVisible=true;
				}
				else {
					me._checkmark_tick_node2.style.visibility="hidden";
					me._checkmark_tick_node2.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node2.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview2.appendChild(me._checkmark_tick_node2);
		me._ht_node3h.appendChild(me._hotspot_preview2);
		me.__div = me._ht_node3h;
	};
	function SkinHotspotClass_ht_node4h30(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node4h30=document.createElement('div');
		el.ggId="ht_node-4h30";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node4h30.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node4h30.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node4h30.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node4h30.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node4h30']=true;
			me._hotspot_preview1.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node4h30.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node4h30']=false;
			me._hotspot_preview1.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node4h30.ontouchend=function (e) {
			me.elementMouseOver['ht_node4h30']=false;
			me._hotspot_preview1.logicBlock_visible();
		}
		me._ht_node4h30.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image1=document.createElement('div');
		els=me._ht_node_image1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzRfaDMwIj4KICA8cGF0aCBvcGFjaXR5PSIwLjYiIGQ9Ik0zMDUuMjc5LDUxLjQzMmMtMTQ4LjUyLDAtMjY4LjkyLDExNC43NC0yNjguOTIsMjU2LjI4NSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzM2LjM1OSw0NDkuMjU4LDE1Ni43Niw1NjQsMzA1LjI3OSw1NjRjMTQ4LjUyMSwwLDI2OC45MjQtMTE0Ljc0MiwyNjguOTI0LTI1Ni4yODNDNTc0LjIs'+
			'MTY2LjE3Miw0NTMuODAxLDUxLjQzMiwzMDUuMjc5LDUxLjQzMnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA1LjkxNCw0OTcuODUxYy0xMjcuNjgyLDAtMjMxLjE4OC05Ni43MDctMjMxLjE4OC0yMTZjMC0xMTkuMjk2LDEwMy41MDYtMjE2LDIzMS4xODgtMjE2czIzMS4xODgsOTYuNzA0LDIzMS4xODgsMjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNTM3LjEwMiw0MDEuMTQ0LDQzMy41OTYsNDk3Ljg1MSwzMDUuOTE0LDQ5Ny44NTF6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcng9IjIzMS4xODgiIG'+
			'9wYWNpdHk9IjAuODUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBjeT0iMjgxLjg1MSIgcnk9IjIxNiIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA1LjkxNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDE4LjgwOCwxNDYuNjgyIDM1NC44NTIsMjAxLjg2MiAzODQuNzIxLDIzNy40NjkgMzk5LjczOSwyMjIuNDUgNDI1LjM5LDMzNy41MzggMzExLjk4OSwzMDguNjgyICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzMzLjI1MiwyODguMjYzIDI5Ny44MTQsMjUyLjE1IDE5OC43NTgsMzM4LjA0NCA0NjguOTI3LDM4Ni44MTMgJiN4OTsiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_node_image1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image1__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzRfaDMwIj4KICA8cGF0aCBvcGFjaXR5PSIwLjYiIGQ9Ik0zMDUuMjc5LDE1LjMyQzEzNi43MzMsMTUuMzIsMC4xLDE0NS41MzEsMC4xLDMwNi4xNiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzAuMSw0NjYuNzg3LDEzNi43MzMsNTk3LDMwNS4yNzksNTk3YzE2OC41NDcsMCwzMDUuMTg0LTEzMC4yMTMsMzA1LjE4NC0yOTAuODRDNjEwLjQ2LDE0NS41'+
			'MzEsNDczLjgyNiwxNS4zMiwzMDUuMjc5LDE1LjMyeiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0zMDYsNTIxLjkzMWMtMTQ0Ljg5OCwwLTI2Mi4zNi0xMDkuNzQ2LTI2Mi4zNi0yNDUuMTI0QzQzLjY0LDE0MS40MjYsMTYxLjEwMiwzMS42ODIsMzA2LDMxLjY4MnMyNjIuMzYsMTA5Ljc0NCwyNjIuMzYsMjQ1LjEyNSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzU2OC4zNTksNDEyLjE4NSw0NTAuODk3LDUyMS45MzEsMzA2LDUyMS45MzF6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcng9IjI2Mi4zNiIgb3BhY2'+
			'l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyNzYuODA2IiByeT0iMjQ1LjEyNCIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA2Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0MzQuMTE1LDEyMy40MTIgMzYxLjUzNSwxODYuMDM0IDM5NS40MzIsMjI2LjQ0MSA0MTIuNDc2LDIwOS4zOTcgNDQxLjU4NCwzNDAuMDAzICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzEyLjg5NCwzMDcuMjU2IDMzNy4wMjIsMjg0LjA4NCAyOTYuODA3LDI0My4xMDIgMTg0LjM5NSwzNDAuNTc3IDQ5MC45OTEsMzk1LjkyMiAmI3g5OyIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_node_image1__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image1.onmouseover=function (e) {
			me._ht_node_image1__img.style.visibility='hidden';
			me._ht_node_image1__imgo.style.visibility='inherit';
		}
		me._ht_node_image1.onmouseout=function (e) {
			me._ht_node_image1__img.style.visibility='inherit';
			me._ht_node_image1__imgo.style.visibility='hidden';
		}
		me._ht_node_image1.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node4h30.appendChild(me._ht_node_image1);
		el=me._hotspot_preview1=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node4h30'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview1.style[domTransition]='';
				if (me._hotspot_preview1.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview1.style.visibility=(Number(me._hotspot_preview1.style.opacity)>0||!me._hotspot_preview1.style.opacity)?'inherit':'hidden';
					me._hotspot_preview1.ggVisible=true;
				}
				else {
					me._hotspot_preview1.style.visibility="hidden";
					me._hotspot_preview1.ggVisible=false;
				}
			}
		}
		me._hotspot_preview1.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_1=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_1.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview1.appendChild(me._preview_picture_frame_1);
		el=me._preview_nodeimage1=document.createElement('div');
		els=me._preview_nodeimage1__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage1.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview1.appendChild(me._preview_nodeimage1);
		el=me._tooltip1=document.createElement('div');
		els=me._tooltip1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip1.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview1.appendChild(me._tooltip1);
		el=me._checkmark_tick_node1=document.createElement('div');
		els=me._checkmark_tick_node1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node1.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node1.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node1.style[domTransition]='';
				if (me._checkmark_tick_node1.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node1.style.visibility=(Number(me._checkmark_tick_node1.style.opacity)>0||!me._checkmark_tick_node1.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node1.ggVisible=true;
				}
				else {
					me._checkmark_tick_node1.style.visibility="hidden";
					me._checkmark_tick_node1.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node1.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview1.appendChild(me._checkmark_tick_node1);
		me._ht_node4h30.appendChild(me._hotspot_preview1);
		me.__div = me._ht_node4h30;
	};
	function SkinHotspotClass_ht_node6h(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node6h=document.createElement('div');
		el.ggId="ht_node-6h";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node6h.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node6h.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node6h.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node6h.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node6h']=true;
			me._hotspot_preview0.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node6h.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node6h']=false;
			me._hotspot_preview0.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node6h.ontouchend=function (e) {
			me.elementMouseOver['ht_node6h']=false;
			me._hotspot_preview0.logicBlock_visible();
		}
		me._ht_node6h.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image0=document.createElement('div');
		els=me._ht_node_image0__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMl94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksNTEuNzE2Yy0xNDguNTIsMC0yNjguOTIsMTE0Ljc0LTI2OC45MiwyNTYuMjg1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwxNDEuNTQxLDEyMC40LDI1Ni4yODMsMjY4LjkyLDI1Ni4yODNjMTQ4LjUyMSwwLDI2OC45MjQtMTE0Ljc0MiwyNjguOTI0LTI1'+
			'Ni4yODNDNTc0LjIsMTY2LjQ1Niw0NTMuODAxLDUxLjcxNiwzMDUuMjc5LDUxLjcxNnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA1LjkxNCw0OTguMTM1Yy0xMjcuNjgyLDAtMjMxLjE4OC05Ni43MDctMjMxLjE4OC0yMTZjMC0xMTkuMjk2LDEwMy41MDYtMjE2LDIzMS4xODgtMjE2YzEyNy42ODIsMCwyMzEuMTg4LDk2LjcwNCwyMzEuMTg4LDIxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzUzNy4xMDIsNDAxLjQyOCw0MzMuNTk2LDQ5OC4xMzUsMzA1LjkxNCw0OTguMTM1eiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGZpbGw9IiNFOEU4RTgiLz4KICA8ZWxsaXBzZSBzdHJva2UtbWl0ZXJsaW'+
			'1pdD0iMTAiIHJ4PSIyMzEuMTg4IiBvcGFjaXR5PSIwLjg1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgY3k9IjI4Mi4xMzUiIHJ5PSIyMTYiIHN0cm9rZT0iIzAwMDAwMCIgY3g9IjMwNS45MTQiLz4KICA8cG9seWdvbiBwb2ludHM9IjMwNi4yNTIsMzE1LjIzMyAzNzQuNjUyLDIyMi45ODMgMzQ2LjMwMiwyMjIuOTgzIDM1MS4yNTMsMTc1LjI4NCA0NjguMjUyLDE3NS4yODQgJiN4ZDsmI3hhOyYjeDk7JiN4OTszMDYuMjUyLDM3MS4wMzQgMTQ3LjQwMSwxNzUuMjg0IDI2NC45MDgsMTc1LjI4NCAyNjcuNzc2LDIyMy4yMDkgMjQwLjQzOSwyMjMuMzc4ICYjeDk7IiBmaWxsPSIjRkZGRkZG'+
			'Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image0__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image0__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzFfMl94QTBfSW1hZ2VfMV8iPgogIDxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTMwNS4yNzksMTYuMzJDMTM2LjczMywxNi4zMiwwLjEsMTQ2LjUzMSwwLjEsMzA3LjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMC4xLDQ2Ny43ODcsMTM2LjczMyw1OTgsMzA1LjI3OSw1OThjMTY4LjU0NywwLDMwNS4xODQtMTMwLjIxMywzMDUuMTg0LTI5MC44NEM2'+
			'MTAuNDYsMTQ2LjUzMSw0NzMuODI2LDE2LjMyLDMwNS4yNzksMTYuMzJ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTMwNiw1MjIuOTMxYy0xNDQuODk4LDAtMjYyLjM2LTEwOS43NDYtMjYyLjM2LTI0NS4xMjRDNDMuNjQsMTQyLjQyNiwxNjEuMTAyLDMyLjY4MiwzMDYsMzIuNjgyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMTQ0Ljg5OCwwLDI2Mi4zNiwxMDkuNzQ0LDI2Mi4zNiwyNDUuMTI1QzU2OC4zNTksNDEzLjE4NSw0NTAuODk3LDUyMi45MzEsMzA2LDUyMi45MzF6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PS'+
			'IxMCIgcng9IjI2Mi4zNiIgb3BhY2l0eT0iMC44NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIGN5PSIyNzcuODA2IiByeT0iMjQ1LjEyNCIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA2Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIzMDYuMzgyLDMxNS45MyAzODQuMDA2LDIxMS4yNDIgMzUxLjgzMywyMTEuMjQyIDM1Ny40NTEsMTU3LjExMSA0OTAuMjI2LDE1Ny4xMTEgMzA2LjM4MiwzNzkuMjU1ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MTI2LjExMywxNTcuMTExIDI1OS40NjQsMTU3LjExMSAyNjIuNzIsMjExLjQ5OCAyMzEuNjk2LDIxMS42ODkgJiN4OTsiIGZpbGw9IiNGRkZGRkYiLz4KIDwv'+
			'Zz4KPC9zdmc+Cg==';
		me._ht_node_image0__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image0.onmouseover=function (e) {
			me._ht_node_image0__img.style.visibility='hidden';
			me._ht_node_image0__imgo.style.visibility='inherit';
		}
		me._ht_node_image0.onmouseout=function (e) {
			me._ht_node_image0__img.style.visibility='inherit';
			me._ht_node_image0__imgo.style.visibility='hidden';
		}
		me._ht_node_image0.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node6h.appendChild(me._ht_node_image0);
		el=me._hotspot_preview0=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview0.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node6h'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview0.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview0.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview0.style[domTransition]='';
				if (me._hotspot_preview0.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview0.style.visibility=(Number(me._hotspot_preview0.style.opacity)>0||!me._hotspot_preview0.style.opacity)?'inherit':'hidden';
					me._hotspot_preview0.ggVisible=true;
				}
				else {
					me._hotspot_preview0.style.visibility="hidden";
					me._hotspot_preview0.ggVisible=false;
				}
			}
		}
		me._hotspot_preview0.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_0=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_0.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview0.appendChild(me._preview_picture_frame_0);
		el=me._preview_nodeimage0=document.createElement('div');
		els=me._preview_nodeimage0__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage0.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage0.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview0.appendChild(me._preview_nodeimage0);
		el=me._tooltip0=document.createElement('div');
		els=me._tooltip0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip0.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview0.appendChild(me._tooltip0);
		el=me._checkmark_tick_node0=document.createElement('div');
		els=me._checkmark_tick_node0__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node0__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node0.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node0.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node0.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node0.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node0.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node0.style[domTransition]='';
				if (me._checkmark_tick_node0.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node0.style.visibility=(Number(me._checkmark_tick_node0.style.opacity)>0||!me._checkmark_tick_node0.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node0.ggVisible=true;
				}
				else {
					me._checkmark_tick_node0.style.visibility="hidden";
					me._checkmark_tick_node0.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node0.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview0.appendChild(me._checkmark_tick_node0);
		me._ht_node6h.appendChild(me._hotspot_preview0);
		me.__div = me._ht_node6h;
	};
	function SkinHotspotClass_ht_node7h30(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node7h30=document.createElement('div');
		el.ggId="ht_node-7h30";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 74px;';
		hs+='position : absolute;';
		hs+='top : 152px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node7h30.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node7h30.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node7h30.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node7h30.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node7h30']=true;
			me._hotspot_preview.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node7h30.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node7h30']=false;
			me._hotspot_preview.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node7h30.ontouchend=function (e) {
			me.elementMouseOver['ht_node7h30']=false;
			me._hotspot_preview.logicBlock_visible();
		}
		me._ht_node7h30.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image=document.createElement('div');
		els=me._ht_node_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzdfaDMwIj4KICA8cGF0aCBvcGFjaXR5PSIwLjYiIGQ9Ik0zMDUuMjc5LDUwLjQzMmMtMTQ4LjUyLDAtMjY4LjkyLDExNC43NC0yNjguOTIsMjU2LjI4NSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzM2LjM1OSw0NDguMjU4LDE1Ni43Niw1NjMsMzA1LjI3OSw1NjNjMTQ4LjUyMSwwLDI2OC45MjQtMTE0Ljc0MiwyNjguOTI0LTI1Ni4yODNDNTc0LjIs'+
			'MTY1LjE3Miw0NTMuODAxLDUwLjQzMiwzMDUuMjc5LDUwLjQzMnomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMzA1LjkxNCw0OTYuODUxYy0xMjcuNjgyLDAtMjMxLjE4OC05Ni43MDctMjMxLjE4OC0yMTZjMC0xMTkuMjk2LDEwMy41MDYtMjE2LDIzMS4xODgtMjE2czIzMS4xODgsOTYuNzA0LDIzMS4xODgsMjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNTM3LjEwMiw0MDAuMTQ0LDQzMy41OTYsNDk2Ljg1MSwzMDUuOTE0LDQ5Ni44NTF6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcng9IjIzMS4xODgiIG'+
			'9wYWNpdHk9IjAuODUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBjeT0iMjgwLjg1MSIgcnk9IjIxNiIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA1LjkxNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMjYxLjAyNiwxNDUuNjgyIDMyNC45ODMsMjAwLjg2MiAyOTUuMTE0LDIzNi40NjkgMjgwLjA5NiwyMjEuNDUgMjU0LjQ0NSwzMzYuNTM4IDM2Ny44NDYsMzA3LjY4MiAmI3hkOyYjeGE7JiN4OTsmI3g5OzM0Ni41ODMsMjg3LjI2MyAzODIuMDIxLDI1MS4xNSA0ODEuMDc3LDMzNy4wNDQgMjEwLjkwOCwzODUuODEzICYjeDk7IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MTJweCIgZW5hYmxlLW'+
			'JhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDYxMiIgeD0iMHB4IiBpZD0iQ2FwYV8xXzFfIiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgeT0iMHB4IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPGcgaWQ9Il94MzdfaDMwIj4KICA8cGF0aCBvcGFjaXR5PSIwLjYiIGQ9Ik0zMDYuNjQ4LDE0QzEzOC4wMTIsMTQsMS4zMDMsMTQ0LjI4MywxLjMwMywzMDUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDE2MC43MTUsMTM2LjcwOSwyOTEsMzA1LjM0NiwyOTFDNDc1LjI4OSw1OTYsNjEyLDQ2NS43MTUsNjEyLDMwNUM2MTEuOTk4LDE0NC4yODMsNDc1LjI4OSwxNCwz'+
			'MDYuNjQ4LDE0eiBNMzA3LjM2OSw1MjAuODg5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTE0NC45NzYsMC0yNjIuNTAyLTEwOS44MDctMjYyLjUwMi0yNDUuMjU5YzAtMTM1LjQ1NSwxMTcuNTI2LTI0NS4yNTgsMjYyLjUwMi0yNDUuMjU4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMTQ0Ljk3OSwwLDI2Mi41MDYsMTA5LjgwMywyNjIuNTA2LDI0NS4yNThDNTY5Ljg3NSw0MTEuMDgyLDQ1Mi4zNDgsNTIwLjg4OSwzMDcuMzY5LDUyMC44ODl6IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZmlsbD0iI0U4RThFOCIvPgogIDxlbGxpcHNlIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcng9IjI2Mi41MDYiIG'+
			'9wYWNpdHk9IjAuODUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgICAgIiBjeT0iMjc1LjYzIiByeT0iMjQ1LjI1OSIgc3Ryb2tlPSIjMDAwMDAwIiBjeD0iMzA3LjM2OSIvPgogIDxwb2x5Z29uIHBvaW50cz0iMjU2LjQwMiwxMjIuMTUxIDMyOS4wMjEsMTg0LjgwOCAyOTUuMTA3LDIyNS4yMzcgMjc4LjA1NCwyMDguMTg0IDI0OC45MywzMzguODYgMzc3LjY5MSwzMDYuMDk3ICYjeGQ7JiN4YTsmI3g5OyYjeDk7MzUzLjU0OSwyODIuOTExIDM5My43ODUsMjQxLjkwNyA1MDYuMjYsMzM5LjQzNyAxOTkuNDk1LDM5NC44MTEgJiN4OTsiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_node_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -23px;';
		hs+='position : absolute;';
		hs+='top : -22px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image.onmouseover=function (e) {
			me._ht_node_image__img.style.visibility='hidden';
			me._ht_node_image__imgo.style.visibility='inherit';
		}
		me._ht_node_image.onmouseout=function (e) {
			me._ht_node_image__img.style.visibility='inherit';
			me._ht_node_image__imgo.style.visibility='hidden';
		}
		me._ht_node_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node7h30.appendChild(me._ht_node_image);
		el=me._hotspot_preview=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -73px;';
		hs+='position : absolute;';
		hs+='top : -151px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node7h30'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview.style[domTransition]='';
				if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview.style.visibility=(Number(me._hotspot_preview.style.opacity)>0||!me._hotspot_preview.style.opacity)?'inherit':'hidden';
					me._hotspot_preview.ggVisible=true;
				}
				else {
					me._hotspot_preview.style.visibility="hidden";
					me._hotspot_preview.ggVisible=false;
				}
			}
		}
		me._hotspot_preview.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._preview_picture_frame_);
		el=me._preview_nodeimage=document.createElement('div');
		els=me._preview_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._preview_nodeimage);
		el=me._tooltip=document.createElement('div');
		els=me._tooltip__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview.appendChild(me._tooltip);
		el=me._checkmark_tick_node=document.createElement('div');
		els=me._checkmark_tick_node__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_node__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_node.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_node.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_node.style[domTransition]='';
				if (me._checkmark_tick_node.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_node.style.visibility=(Number(me._checkmark_tick_node.style.opacity)>0||!me._checkmark_tick_node.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_node.ggVisible=true;
				}
				else {
					me._checkmark_tick_node.style.visibility="hidden";
					me._checkmark_tick_node.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_node.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._checkmark_tick_node);
		me._ht_node7h30.appendChild(me._hotspot_preview);
		me.__div = me._ht_node7h30;
	};
	function SkinHotspotClass_ht_nodefly(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_nodefly=document.createElement('div');
		el.ggId="ht_node-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 271px;';
		hs+='position : absolute;';
		hs+='top : 150px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_nodefly.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_nodefly.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodefly.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodefly.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_nodefly']=true;
			me._hotspot_previewfly.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodefly.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_nodefly']=false;
			me._hotspot_previewfly.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodefly.ontouchend=function (e) {
			me.elementMouseOver['ht_nodefly']=false;
			me._hotspot_previewfly.logicBlock_visible();
		}
		me._ht_nodefly.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_imagefly=document.createElement('div');
		els=me._ht_node_imagefly__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDQ0LjQ1cHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgLTMzLjYyOCAtMjEzLjYzIDEwNDQuNDUgMTA0MS45OTciIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iMTA0MS45OTdweCIgdmlld0JveD0iLTMzLjYyOCAtMjEzLjYzIDEwNDQuNDUgMTA0MS45OTciIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxjaXJjbGUgcj0iNDIzLjA5MyIgY3k9IjMwNy4wMjYiIGZpbGw9IiNGRkZGRkYiIGN4PSI0ODguNTk3Ii8+CiA8cGF0aCBkPSJNNTYxLjQyNSw1MDEuNTc2YzAsNC44NzgtMy45NTIsOC44MjktOC44MjksOC44MjlINDI2LjgzM2MtNC44NjMsMC04LjgyOS0zLjk0LTguODI5'+
			'LTguODI5VjQyNS4wOSYjeGQ7JiN4YTsmI3g5O2MwLTQuODYxLDMuOTUzLTguODI4LDguODI5LTguODI4aDEyNS43NjJjNC44NjEsMCw4LjgyOSwzLjk1Myw4LjgyOSw4LjgyOEw1NjEuNDI1LDUwMS41NzZMNTYxLjQyNSw1MDEuNTc2eiIgZmlsbD0iIzA4MUUzNCIvPgogPGNpcmNsZSByPSIzMi43OTgiIGN5PSI0NjMuMzQzIiBmaWxsPSIjRUJGMEYyIiBjeD0iNTEzLjExIi8+CiA8cGF0aCBkPSJNNTEzLjExNiw0MzAuNTNjMTguMTAzLDAsMzIuNzk3LDE0LjY4OCwzMi43OTcsMzIuODEzYzAsMTguMTA5LTE0LjY5NiwzMi43OTctMzIuNzk3LDMyLjc5NyIgZmlsbD0iI0JERDBENiIvPgogPHBhdG'+
			'ggZD0iTTQ2OC4zNDksNDQ4LjQ5NWMwLDEuMzc2LTEuMTE5LDIuNDkzLTIuNDgxLDIuNDkzaC0zMC42MjVjLTEuNCwwLTIuNTE2LTEuMTE5LTIuNTE2LTIuNDkzVjQzMy42JiN4ZDsmI3hhOyYjeDk7YzAtMS4zNzUsMS4xMTctMi41MDUsMi41MTYtMi41MDVoMzAuNjI1YzEuMzYyLDAsMi40ODEsMS4xMywyLjQ4MSwyLjUwNVY0NDguNDk1eiIgZmlsbD0iI0VCRjBGMiIvPgogPHBhdGggZD0iTTQzMi43MTMsNDMzLjZjMC0xLjM3NSwxLjExNi0yLjUwNSwyLjUxNi0yLjUwNWgzMC42MjRjMS4zNjMsMCwyLjQ4MiwxLjEzLDIuNDgyLDIuNTA1djE0Ljg5NiYjeGQ7JiN4YTsmI3g5O2MwLDEuMzc2LTEu'+
			'MTE5LDIuNDkzLTIuNDgyLDIuNDkzIiBmaWxsPSIjQkREMEQ2Ii8+CiA8Zz4KICA8cGF0aCBkPSJNNDk1LjY1Nyw0MTkuNzczYzAsMy4yOTEtMi42NjUsNS45NDMtNS45NDMsNS45NDNsMCwwYy0zLjI5MSwwLTUuOTQyLTIuNjY2LTUuOTQyLTUuOTQzdi0yNC41NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMy4yOSwyLjY2NS01Ljk0MSw1Ljk0Mi01Ljk0MWwwLDBjMy4yOTIsMCw1Ljk0MywyLjY2NSw1Ljk0Myw1Ljk0MVY0MTkuNzczeiIgZmlsbD0iIzA4MUUzNCIvPgogIDxwYXRoIGQ9Ik01MDkuMTM5LDQxNi41MDdjMCwzLjUyNi0yLjg0OSw2LjM5OC02LjM4NSw2LjM5OEg0NzYuNjZjLTMuNTI1LD'+
			'AtNi4zOTYtMi44NjEtNi4zOTYtNi4zOThsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0zLjUyMywyLjg2MS02LjM5Niw2LjM5Ni02LjM5NmgyNi4wOTRDNTA2LjI4OSw0MTAuMTIyLDUwOS4xMzksNDEyLjk4NSw1MDkuMTM5LDQxNi41MDdMNTA5LjEzOSw0MTYuNTA3eiIgZmlsbD0iIzA4MUUzNCIvPgogPC9nPgogPHBhdGggZD0iTTUzMC4xMjQsMzYxLjYyaC04MC44MjJjLTIuODEzLDYuMjYxLTYuNzkxLDEzLjM4My0xMS40OTUsMjAuMzMzYy0xLjUxLDIuMjU5LTEuODUzLDUuMDU5LTAuOTU4LDcuNjAyJiN4ZDsmI3hhOyYjeDk7YzAuOTA5LDIuNTQxLDIuOTQ2LDQuNDgxLDUuNTM4LDUuMjc5'+
			'YzE0LjQ5LDQuMzg0LDMwLjg0NSw2LjY5LDQ3LjMyNCw2LjY5YzE2LjQ2OCwwLDMyLjgzNi0yLjMxLDQ3LjMyNi02LjY5JiN4ZDsmI3hhOyYjeDk7YzIuNTc4LTAuNzg1LDQuNjI5LTIuNzM5LDUuNTM3LTUuMjc5YzAuODk2LTIuNTQzLDAuNTQxLTUuMzU0LTAuOTU4LTcuNjAyQzUzNi45MTQsMzc1LjAwMyw1MzIuOTM1LDM2Ny44ODEsNTMwLjEyNCwzNjEuNjJ6IiBmaWxsPSIjMDA5MkZGIi8+CiA8ZWxsaXBzZSByeD0iMTU1Ljk4MyIgY3k9IjIzOC4xMjgiIGZpbGw9IiMwOTM1NjgiIHJ5PSI2NS4zIiBjeD0iNDg5LjcxMSIvPgogPHBhdGggZD0iTTY0NS42OTcsMjM4LjEyNWMwLDM2LjA3Ni02OS'+
			'44NDYsNjUuMzAzLTE1NS45ODUsNjUuMzAzYy04Ni4xNCwwLTE1NS45ODQtMjkuMjM4LTE1NS45ODQtNjUuMzAzIiBmaWxsPSIjMDQxRDM1Ii8+CiA8cGF0aCBkPSJNNDMzLjA2OCwyMjMuNDAzYzAsMjMuOTU4LTE5LjM5LDQzLjM4My00My4zODMsNDMuMzgzYy0yMy45MTgsMC0xOTUuODA1LTE5LjQyNi0xOTUuODA1LTQzLjM4MyYjeGQ7JiN4YTsmI3g5O2MwLTIzLjkzMiwxNzEuODg2LTQzLjM1NywxOTUuODA1LTQzLjM1N0M0MTMuNjgsMTgwLjA0NSw0MzMuMDY4LDE5OS40NzEsNDMzLjA2OCwyMjMuNDAzeiIgZmlsbD0iIzA5MzU2OCIvPgogPHBhdGggZD0iTTM4OS42ODUsMTgwLjA0NWMyMy45'+
			'OTUsMCw0My4zODMsMTkuNDI2LDQzLjM4Myw0My4zNTciIGZpbGw9IiMwNzQ1ODQiLz4KIDxnPgogIDxwYXRoIGQ9Ik00MzMuMDY4LDIyMy40MDNjMCwyMy45NTgsMjcuOTExLDc0LjkyNywzLjk1NSw3NC45MjdjLTIzLjk1NywwLTI0My4xNTUtNTAuOTU4LTI0My4xNTUtNzQuOTI3IiBmaWxsPSIjMDQxRDM1Ii8+CiAgPHBhdGggZD0iTTIzNy4wOSwyMzMuNTk1YzAsMTMuODE1LTExLjE4NywyNC45ODgtMjQuOTc4LDI0Ljk4OGwwLDBjLTEzLjgxNCwwLTI0LjkzOS0xMS4xNzQtMjQuOTM5LTI0Ljk4OHYtMjIuMzQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xMy43OSwxMS4xMjQtMjQuOTY0LDI0Lj'+
			'kzOS0yNC45NjRsMCwwYzEzLjc5LDAsMjQuOTc4LDExLjE3NSwyNC45NzgsMjQuOTY0TDIzNy4wOSwyMzMuNTk1TDIzNy4wOSwyMzMuNTk1eiIgZmlsbD0iIzA0MUQzNSIvPgogPC9nPgogPHBhdGggZD0iTTIzNy4wOSwyMDguOTYzYzAsMTMuNzktMTEuMTg3LDI0Ljk2NC0yNC45NzgsMjQuOTY0bDAsMGMtMTMuODE0LDAuMDAxLTI0LjkzOS0xMS4xNzQtMjQuOTM5LTI0Ljk2NCYjeGQ7JiN4YTsmI3g5O3YtMjIuMzQ5YzAtMTMuNzksMTEuMTI0LTI0Ljk4OCwyNC45MzktMjQuOTg4bDAsMGMxMy43OSwwLDI0Ljk3OCwxMS4xOTgsMjQuOTc4LDI0Ljk4OEwyMzcuMDksMjA4Ljk2M0wyMzcuMDksMjA4'+
			'Ljk2M3oiIGZpbGw9IiMwOTM1NjgiLz4KIDxwYXRoIGQ9Ik0xODcuOTM2LDE4Ni42MTRjMi42NDEsMTAuOTM5LDEyLjQyNiwxOS4wNywyNC4xNzgsMTkuMDdzMjEuNTI3LTguMTMsMjQuMTkyLTE5LjA3MSYjeGQ7JiN4YTsmI3g5O2MtMi42NjUtMTAuOTE3LTEyLjQzOS0xOS4wNzEtMjQuMTkyLTE5LjA3MUMyMDAuMzYzLDE2Ny41NDUsMTkwLjU3NywxNzUuNjk3LDE4Ny45MzYsMTg2LjYxNHoiIGZpbGw9IiMwNDFEMzUiLz4KIDxlbGxpcHNlIHJ4PSIxMTUuMzI3IiBjeT0iMTY2LjczIiBmaWxsPSIjMDBCMUZGIiByeT0iMTguMjQ3IiBjeD0iMjEyLjEwMyIvPgogPGVsbGlwc2Ugcng9IjY0LjA3Mi'+
			'IgY3k9IjE2Ni43MyIgZmlsbD0iIzAwOTJGRiIgcnk9IjE4LjI0NyIgY3g9IjIxMi4xMTMiLz4KIDxwYXRoIGQ9Ik0zMjYuNzA1LDE2Ni43MzJjMCwxLjc4LTEuNDEzLDMuMTkyLTMuMjA1LDMuMTkySDEwMC43MDZjLTEuNzU1LDAtMy4xODEtMS40MTMtMy4xODEtMy4xOTJsMCwwJiN4ZDsmI3hhOyYjeDk7YzAtMS43NzksMS40MjQtMy4yMTcsMy4xODEtMy4yMTdoMjIyLjc5NkMzMjUuMjgxLDE2My41MTcsMzI2LjcwNSwxNjQuOTU0LDMyNi43MDUsMTY2LjczMkwzMjYuNzA1LDE2Ni43MzJ6IiBmaWxsPSIjMDBDRkZGIi8+CiA8cGF0aCBkPSJNMjM3LjUwNywxNDQuNTY5YzAsNy4zMTksOS44MTEs'+
			'MTMuMjg3LDIuNDMyLDEzLjI4N2gtNTUuNjc1Yy03LjM0MywwLDIuNDU2LTUuOTY3LDIuNDU2LTEzLjI4N2wwLDAmI3hkOyYjeGE7JiN4OTtjMC03LjM5Myw1Ljk2Ni0xMy4zMzQsMTMuMzExLTEzLjMzNGgyNC4xNDFDMjMxLjUyNywxMzEuMjM0LDIzNy41MDcsMTM3LjE3NywyMzcuNTA3LDE0NC41NjlMMjM3LjUwNywxNDQuNTY5eiIgZmlsbD0iIzA0MUQzNSIvPgogPHBhdGggZD0iTTU0Ni4zNTgsMjIzLjQwM2MwLDIzLjk1OCwxOS40LDQzLjM4Myw0My4zNjgsNDMuMzgzYzIzLjkzMywwLDE5NS44MTgtMTkuNDI2LDE5NS44MTgtNDMuMzgzJiN4ZDsmI3hhOyYjeDk7YzAtMjMuOTMyLTE3MS44OD'+
			'YtNDMuMzU3LTE5NS44MTgtNDMuMzU3QzU2NS43NTksMTgwLjA0NSw1NDYuMzU4LDE5OS40NzEsNTQ2LjM1OCwyMjMuNDAzeiIgZmlsbD0iIzA5MzU2OCIvPgogPHBhdGggZD0iTTU4OS43NDEsMTgwLjA0NWMtMjMuOTcxLDAtNDMuMzcsMTkuNDI2LTQzLjM3LDQzLjM1NyIgZmlsbD0iIzA3NDU4NCIvPgogPGc+CiAgPHBhdGggZD0iTTU0Ni4zNTgsMjIzLjQwM2MwLDIzLjk1OC0yNy45MTEsNzQuOTI3LTMuOTU0LDc0LjkyN3MyNDMuMTUzLTUwLjk1OCwyNDMuMTUzLTc0LjkyNyIgZmlsbD0iIzA0MUQzNSIvPgogIDxwYXRoIGQ9Ik03NDIuMzM1LDIzMy41OTVjMCwxMy44MTUsMTEuMTg3LDI0Ljk4'+
			'OCwyNC45NzYsMjQuOTg4bDAsMGMxMy44MDIsMCwyNC45NTMtMTEuMTc0LDI0Ljk1My0yNC45ODh2LTIyLjM0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMTMuNzktMTEuMTUxLTI0Ljk2NC0yNC45NTMtMjQuOTY0bDAsMGMtMTMuNzksMC0yNC45NzYsMTEuMTc1LTI0Ljk3NiwyNC45NjRWMjMzLjU5NUw3NDIuMzM1LDIzMy41OTV6IiBmaWxsPSIjMDQxRDM1Ii8+CiA8L2c+CiA8cGF0aCBkPSJNNzQyLjMzNSwyMDguOTYzYzAsMTMuNzksMTEuMTg3LDI0Ljk2NCwyNC45NzYsMjQuOTY0bDAsMGMxMy44MDIsMCwyNC45NTMtMTEuMTc1LDI0Ljk1My0yNC45NjR2LTIyLjM0OSYjeGQ7JiN4YTsmI3g5O2'+
			'MwLTEzLjc5LTExLjE1MS0yNC45ODgtMjQuOTUzLTI0Ljk4OGwwLDBjLTEzLjc5LDAtMjQuOTc2LDExLjE5OC0yNC45NzYsMjQuOTg4VjIwOC45NjNMNzQyLjMzNSwyMDguOTYzeiIgZmlsbD0iIzA5MzU2OCIvPgogPHBhdGggZD0iTTc5MS40OSwxODYuNjE0Yy0yLjY0MiwxMC45MzktMTIuNDM5LDE5LjA3MS0yNC4xOCwxOS4wNzFjLTExLjc1LDAtMjEuNTM2LTguMTMtMjQuMjAxLTE5LjA3MSYjeGQ7JiN4YTsmI3g5O2MyLjY2NC0xMC45MTcsMTIuNDUxLTE5LjA3MSwyNC4yMDEtMTkuMDcxQzc3OS4wNTEsMTY3LjU0NSw3ODguODQ5LDE3NS42OTcsNzkxLjQ5LDE4Ni42MTR6IiBmaWxsPSIjMDQx'+
			'RDM1Ii8+CiA8ZWxsaXBzZSByeD0iMTE1LjMzOSIgY3k9IjE2Ni43MyIgZmlsbD0iIzAwQjFGRiIgcnk9IjE4LjI0NyIgY3g9Ijc2Ny4zMDUiLz4KIDxlbGxpcHNlIHJ4PSI2NC4wNzEiIGN5PSIxNjYuNzMiIGZpbGw9IiMwMDkyRkYiIHJ5PSIxOC4yNDciIGN4PSI3NjcuMzA1Ii8+CiA8cGF0aCBkPSJNNjUyLjcyMywxNjYuNzMyYzAsMS43OCwxLjQxMSwzLjE5MiwzLjIwNSwzLjE5MmgyMjIuNzk2YzEuNzU1LDAsMy4xODEtMS40MTMsMy4xODEtMy4xOTJsMCwwJiN4ZDsmI3hhOyYjeDk7YzAtMS43NzktMS40MjYtMy4yMTctMy4xODEtMy4yMTdINjU1LjkyOEM2NTQuMTQ2LDE2My41MTcsNjUyLj'+
			'cyMywxNjQuOTU0LDY1Mi43MjMsMTY2LjczMkw2NTIuNzIzLDE2Ni43MzJ6IiBmaWxsPSIjMDBDRkZGIi8+CiA8cGF0aCBkPSJNNzQxLjkxOCwxNDQuNTY5YzAsNy4zMTktOS44MTIsMTMuMjg3LTIuNDMzLDEzLjI4N2g1NS42NzVjNy4zNDQsMC0yLjQ1NC01Ljk2Ny0yLjQ1NC0xMy4yODdsMCwwJiN4ZDsmI3hhOyYjeDk7YzAtNy4zOTMtNS45NjYtMTMuMzM0LTEzLjMxMy0xMy4zMzRoLTI0LjE0MkM3NDcuOTExLDEzMS4yMzQsNzQxLjkxOCwxMzcuMTc3LDc0MS45MTgsMTQ0LjU2OUw3NDEuOTE4LDE0NC41Njl6IiBmaWxsPSIjMDQxRDM1Ii8+CiA8cGF0aCBkPSJNNTYzLjUxMywyNDQuNDYzaC0y'+
			'My43OTZjLTMuNjExLDAtNy4wNDcsMS42MDgtOS4zODMsNC4zNmMtMy4zMjcsMy45My0xOC41NTQsOS43NjEtNDAuNjMxLDkuNzYxJiN4ZDsmI3hhOyYjeDk7Yy0yMi4wOTMsMC0zNy4yODItNS44MzMtNDAuNjA5LTkuNzYxYy0yLjM0Ni0yLjc2My01Ljc3Mi00LjM2LTkuMzk0LTQuMzZoLTIzLjc4NmMtNi43OTEsMC0xMi4yOCw1LjQ4OS0xMi4yOCwxMi4yOHYyNS4xNjEmI3hkOyYjeGE7JiN4OTtjMCwzLjExOSwxLjIwNSw2LjE0LDMuMzI5LDguNDI0YzQuNjksNC45NjEsMTEuMTg3LDcuMDI1LDE3LjQ2MSw5LjAxNGMxMi4wMSwzLjc5NSwxMy4zMTIsNS4zNTIsMTMuMzEyLDkuODEyJiN4ZDsmI3'+
			'hhOyYjeDk7YzAsOS45OTctOS40ODEsMzEuMTA0LTIzLjA5Nyw1MS4zMDVjLTIuMTYyLDMuMjQxLTIuNjc2LDcuMzItMS4zNjIsMTAuOTljMS4zMTQsMy42NzIsNC4yODUsNi40OTcsOC4wMDYsNy42MjYmI3hkOyYjeGE7JiN4OTtjMjAuOTQ5LDYuMzM1LDQ0LjYxMiw5LjY4OCw2OC40MjEsOS42ODhjMjMuODA4LDAsNDcuNDgzLTMuMzUyLDY4LjQzMy05LjY4OGMzLjczNC0xLjEzMiw2LjY4LTMuOTU0LDguMDA0LTcuNjI2JiN4ZDsmI3hhOyYjeDk7YzEuMzA0LTMuNjcsMC43ODctNy43NDgtMS4zNzItMTAuOTljLTEzLjU5NC0yMC4yMDItMjMuMDg2LTQxLjI5Ni0yMy4wODYtNTEuMzA1YzAtNC40'+
			'NTgsMS4zMDItNi4wMTcsMTMuMjg1LTkuODEyJiN4ZDsmI3hhOyYjeDk7YzYuMjg3LTEuOTg5LDEyLjc4NC00LjA1MSwxNy40NzQtOS4wMTRjMi4xMzgtMi4yODIsMy4zMjctNS4zMDQsMy4zMjctOC40MjR2LTI1LjE2MiYjeGQ7JiN4YTsmI3g5O0M1NzUuNzkyLDI0OS45NTIsNTcwLjI5MSwyNDQuNDYzLDU2My41MTMsMjQ0LjQ2M3oiIGZpbGw9IiMwODFFMzQiLz4KIDxnPgogIDxwYXRoIGQ9Ik01MTQuNzc0LDE5NC4wNDFjMCwxLjI3Ny0xLjAzMiwyLjMxLTIuMzEsMi4zMWgtNDUuNTJjLTEuMjc3LDAtMi4zMS0xLjAzMi0yLjMxLTIuMzFsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjI3Ny'+
			'wxLjAzMi0yLjMwOCwyLjMxLTIuMzA4aDQ1LjUyQzUxMy43NDQsMTkxLjc0Niw1MTQuNzc0LDE5Mi43NzgsNTE0Ljc3NCwxOTQuMDQxTDUxNC43NzQsMTk0LjA0MXoiIGZpbGw9IiMwMDkyRkYiLz4KICA8cGF0aCBkPSJNNTE0Ljc3NCwyMDcuODU4YzAsMS4yNzYtMS4wMzIsMi4zMDgtMi4zMSwyLjMwOGgtNDUuNTJjLTEuMjc3LDAtMi4zMS0xLjAzMi0yLjMxLTIuMzA4bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMS4yNzcsMS4wMzItMi4zMSwyLjMxLTIuMzFoNDUuNTJDNTEzLjc0NCwyMDUuNTYyLDUxNC43NzQsMjA2LjU5Myw1MTQuNzc0LDIwNy44NThMNTE0Ljc3NCwyMDcuODU4eiIgZmls'+
			'bD0iIzAwOTJGRiIvPgogIDxwYXRoIGQ9Ik01MTQuNzc0LDIyMS42NzFjMCwxLjI3Ni0xLjAzMiwyLjMwOS0yLjMxLDIuMzA5aC00NS41MmMtMS4yNzcsMC0yLjMxLTEuMDMyLTIuMzEtMi4zMDlsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjI3NywxLjAzMi0yLjMwOSwyLjMxLTIuMzA5aDQ1LjUyQzUxMy43NDQsMjE5LjM3NSw1MTQuNzc0LDIyMC40MDUsNTE0Ljc3NCwyMjEuNjcxTDUxNC43NzQsMjIxLjY3MXoiIGZpbGw9IiMwMDkyRkYiLz4KIDwvZz4KIDxwYXRoIGQ9Ik03MTYuODc5LDYxNi45ODVIMjYyLjU0NmMtOS4wNCwwLTE2LjM2OC03LjMyOC0xNi4zNjgtMTYuMzY5YzAtMTk5Lj'+
			'M4Niw2My4xMTUtMjA4Ljk1NiwxMTkuOTA1LTI4Ni4wMDMmI3hkOyYjeGE7JiN4OTtjNC40ODgtNy44NDYsMTQuNDg3LTEwLjU3LDIyLjMzNy02LjA4M2M3Ljg0Nyw0LjQ4NywxMC41NywxNC40ODgsNi4wODMsMjIuMzM3Yy01NS42NzMsNzAuNjYtMTExLjQ2Myw2OS4xMjItMTE1LjQxMSwyNTMuMzgxJiN4ZDsmI3hhOyYjeDk7aDQyMS4yNDljLTMuOTQ0LTE4NC4yOTUtNTguMDMzLTE4Mi43MjItMTE1LjQxLTI1My4zOGMtNC40ODctNy44NDgtMS43NjgtMTcuODQ1LDYuMDc5LTIyLjMzNiYjeGQ7JiN4YTsmI3g5O2M3Ljg0OC00LjQ4NywxNy44NDMtMS43NjUsMjIuMzM2LDYuMDhjNjEuNDkxLDcx'+
			'LjA1NSwxMTkuOTA2LDg2LjU3NywxMTkuOTA2LDI4Ni4wMDQmI3hkOyYjeGE7JiN4OTtDNzMzLjI0Nyw2MDkuNjU3LDcyNS45Miw2MTYuOTg1LDcxNi44NzksNjE2Ljk4NXoiIGZpbGw9IiMwMENGRkYiLz4KPC9zdmc+Cg==';
		me._ht_node_imagefly__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_node_imagefly__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDQ0LjQ1cHgiIGVuYW'+
			'JsZS1iYWNrZ3JvdW5kPSJuZXcgLTMzLjYyOCAtMjEzLjYzIDEwNDQuNDUgMTA0MS45OTciIHg9IjBweCIgaWQ9IkxheWVyXzEiIGhlaWdodD0iMTA0MS45OTdweCIgdmlld0JveD0iLTMzLjYyOCAtMjEzLjYzIDEwNDQuNDUgMTA0MS45OTciIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxjaXJjbGUgcj0iNTIyLjIyNSIgY3k9IjMwNy4wMjYiIGZpbGw9IiNGRkZGRkYiIGN4PSI0ODguNTk3Ii8+CiA8cGF0aCBkPSJNNTc4LjQ4OCw1NDcuMTZjMCw2LjAyMS00Ljg3OCwxMC44OTctMTAuODk3LDEwLjg5N2gtMTU1LjIzYy02LjAwMiwwLTEwLjg5OC00Ljg2My0x'+
			'MC44OTgtMTAuODk3di05NC40MDcmI3hkOyYjeGE7JiN4OTtjMC02LDQuODc5LTEwLjg5NiwxMC44OTgtMTAuODk2SDU2Ny41OWM2LDAsMTAuODk3LDQuODc5LDEwLjg5NywxMC44OTZMNTc4LjQ4OCw1NDcuMTZMNTc4LjQ4OCw1NDcuMTZ6IiBmaWxsPSIjMDgxRTM0Ii8+CiA8Y2lyY2xlIHI9IjQwLjQ4MyIgY3k9IjQ5OS45NjgiIGZpbGw9IiNFQkYwRjIiIGN4PSI1MTguODU0Ii8+CiA8cGF0aCBkPSJNNTE4Ljg2MSw0NTkuNDY4YzIyLjM0NCwwLDQwLjQ4MSwxOC4xMjksNDAuNDgxLDQwLjVjMCwyMi4zNTQtMTguMTQsNDAuNDgxLTQwLjQ4MSw0MC40ODEiIGZpbGw9IiNCREQwRDYiLz4KIDxwYX'+
			'RoIGQ9Ik00NjMuNjA0LDQ4MS42NDJjMCwxLjY5OC0xLjM4MSwzLjA3Ny0zLjA2MywzLjA3N2gtMzcuOGMtMS43MjgsMC0zLjEwNi0xLjM4MS0zLjEwNi0zLjA3N3YtMTguMzg1JiN4ZDsmI3hhOyYjeDk7YzAtMS42OTcsMS4zNzktMy4wOTMsMy4xMDYtMy4wOTNoMzcuOGMxLjY4MiwwLDMuMDYzLDEuMzk2LDMuMDYzLDMuMDkzVjQ4MS42NDJ6IiBmaWxsPSIjRUJGMEYyIi8+CiA8cGF0aCBkPSJNNDE5LjYyLDQ2My4yNTdjMC0xLjY5NywxLjM3OC0zLjA5MywzLjEwNi0zLjA5M2gzNy43OTljMS42ODMsMCwzLjA2MywxLjM5NiwzLjA2MywzLjA5M3YxOC4zODUmI3hkOyYjeGE7JiN4OTtjMCwxLjY5'+
			'OC0xLjM4MSwzLjA3Ny0zLjA2MywzLjA3NyIgZmlsbD0iI0JERDBENiIvPgogPGc+CiAgPHBhdGggZD0iTTQ5Ny4zMTIsNDQ2LjE5YzAsNC4wNjMtMy4yODksNy4zMzYtNy4zMzYsNy4zMzZsMCwwYy00LjA2MiwwLTcuMzM1LTMuMjkxLTcuMzM1LTcuMzM2di0zMC4zMTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTQuMDYyLDMuMjg5LTcuMzM0LDcuMzM1LTcuMzM0bDAsMGM0LjA2MywwLDcuMzM2LDMuMjksNy4zMzYsNy4zMzRWNDQ2LjE5eiIgZmlsbD0iIzA4MUUzNCIvPgogIDxwYXRoIGQ9Ik01MTMuOTUxLDQ0Mi4xNTljMCw0LjM1My0zLjUxNiw3Ljg5Ni03Ljg4LDcuODk2aC0zMi4yMDhjLTQuMz'+
			'UxLDAtNy44OTYtMy41MzEtNy44OTYtNy44OTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC00LjM1LDMuNTMxLTcuODk1LDcuODk2LTcuODk1aDMyLjIwOEM1MTAuNDM1LDQzNC4yNzgsNTEzLjk1MSw0MzcuODEyLDUxMy45NTEsNDQyLjE1OUw1MTMuOTUxLDQ0Mi4xNTl6IiBmaWxsPSIjMDgxRTM0Ii8+CiA8L2c+CiA8cGF0aCBkPSJNNTM5Ljg1NCwzNzQuNDEyaC05OS43NTljLTMuNDczLDcuNzI4LTguMzgyLDE2LjUxOS0xNC4xODgsMjUuMDk3Yy0xLjg2NCwyLjc4OC0yLjI4Nyw2LjI0NC0xLjE4Myw5LjM4MyYjeGQ7JiN4YTsmI3g5O2MxLjEyMiwzLjEzNywzLjYzNiw1LjUzMSw2LjgzNiw2'+
			'LjUxN2MxNy44ODUsNS40MTEsMzguMDcyLDguMjU4LDU4LjQxMiw4LjI1OGMyMC4zMjYsMCw0MC41MjktMi44NTEsNTguNDE1LTguMjU4JiN4ZDsmI3hhOyYjeDk7YzMuMTgzLTAuOTcsNS43MTMtMy4zODIsNi44MzUtNi41MTdjMS4xMDUtMy4xMzksMC42NjctNi42MDgtMS4xODMtOS4zODNDNTQ4LjIzNCwzOTAuOTMxLDU0My4zMjMsMzgyLjE0LDUzOS44NTQsMzc0LjQxMnoiIGZpbGw9IiMwMDkyRkYiLz4KIDxlbGxpcHNlIHJ4PSIxOTIuNTMxIiBjeT0iMjIxLjk4NSIgZmlsbD0iIzA5MzU2OCIgcnk9IjgwLjYiIGN4PSI0ODkuOTcyIi8+CiA8cGF0aCBkPSJNNjgyLjUwNywyMjEuOTgxYzAsND'+
			'QuNTI5LTg2LjIxMiw4MC42MDMtMTkyLjUzNCw4MC42MDNjLTEwNi4zMjMsMC0xOTIuNTMyLTM2LjA4OS0xOTIuNTMyLTgwLjYwMyIgZmlsbD0iIzA0MUQzNSIvPgogPHBhdGggZD0iTTQyMC4wNTgsMjAzLjgxYzAsMjkuNTcxLTIzLjkzMyw1My41NDgtNTMuNTQ4LDUzLjU0OGMtMjkuNTIzLDAtMjQxLjY4Mi0yMy45NzctMjQxLjY4Mi01My41NDgmI3hkOyYjeGE7JiN4OTtjMC0yOS41MzksMjEyLjE1OS01My41MTYsMjQxLjY4Mi01My41MTZDMzk2LjEyNywxNTAuMjk0LDQyMC4wNTgsMTc0LjI3MSw0MjAuMDU4LDIwMy44MXoiIGZpbGw9IiMwOTM1NjgiLz4KIDxwYXRoIGQ9Ik0zNjYuNTEsMTUw'+
			'LjI5NGMyOS42MTcsMCw1My41NDgsMjMuOTc3LDUzLjU0OCw1My41MTYiIGZpbGw9IiMwNzQ1ODQiLz4KIDxnPgogIDxwYXRoIGQ9Ik00MjAuMDU4LDIwMy44MWMwLDI5LjU3MSwzNC40NSw5Mi40ODMsNC44ODEsOTIuNDgzYy0yOS41NywwLTMwMC4xMjctNjIuODk4LTMwMC4xMjctOTIuNDgzIiBmaWxsPSIjMDQxRDM1Ii8+CiAgPHBhdGggZD0iTTE3OC4xNjIsMjE2LjM5YzAsMTcuMDUyLTEzLjgwOCwzMC44NDMtMzAuODMsMzAuODQzbDAsMGMtMTcuMDUxLDAtMzAuNzgyLTEzLjc5Mi0zMC43ODItMzAuODQzdi0yNy41ODUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTE3LjAyMSwxMy43My0zMC44MT'+
			'MsMzAuNzgzLTMwLjgxM2wwLDBjMTcuMDIxLDAsMzAuODMsMTMuNzkzLDMwLjgzLDMwLjgxM0wxNzguMTYyLDIxNi4zOUwxNzguMTYyLDIxNi4zOXoiIGZpbGw9IiMwNDFEMzUiLz4KIDwvZz4KIDxwYXRoIGQ9Ik0xNzguMTYyLDE4NS45ODdjMCwxNy4wMjEtMTMuODA4LDMwLjgxMy0zMC44MywzMC44MTNsMCwwYy0xNy4wNTEsMC4wMDEtMzAuNzgyLTEzLjc5Mi0zMC43ODItMzAuODEzJiN4ZDsmI3hhOyYjeDk7di0yNy41ODVjMC0xNy4wMjEsMTMuNzMtMzAuODQzLDMwLjc4My0zMC44NDNsMCwwYzE3LjAyMSwwLDMwLjgzLDEzLjgyMiwzMC44MywzMC44NDNMMTc4LjE2MiwxODUuOTg3TDE3OC4x'+
			'NjIsMTg1Ljk4N3oiIGZpbGw9IiMwOTM1NjgiLz4KIDxwYXRoIGQ9Ik0xMTcuNDksMTU4LjQwMWMzLjI2LDEzLjUwMywxNS4zMzcsMjMuNTM4LDI5Ljg0MywyMy41MzhjMTQuNTA1LDAsMjYuNTctMTAuMDM1LDI5Ljg2LTIzLjUzOSYjeGQ7JiN4YTsmI3g5O2MtMy4yODktMTMuNDc0LTE1LjM1NC0yMy41MzktMjkuODYtMjMuNTM5QzEzMi44MjksMTM0Ljg2NCwxMjAuNzUsMTQ0LjkyNywxMTcuNDksMTU4LjQwMXoiIGZpbGw9IiMwNDFEMzUiLz4KIDxlbGxpcHNlIHJ4PSIxNDIuMzQ5IiBjeT0iMTMzLjg1OSIgZmlsbD0iIzAwQjFGRiIgcnk9IjIyLjUyMiIgY3g9IjE0Ny4zMTkiLz4KIDxlbGxpcH'+
			'NlIHJ4PSI3OS4wODQiIGN5PSIxMzMuODU5IiBmaWxsPSIjMDA5MkZGIiByeT0iMjIuNTIyIiBjeD0iMTQ3LjMzMyIvPgogPHBhdGggZD0iTTI4OC43NzMsMTMzLjg2MmMwLDIuMTk3LTEuNzQ0LDMuOTQtMy45NTYsMy45NEg5LjgyMmMtMi4xNjcsMC0zLjkyNi0xLjc0NC0zLjkyNi0zLjk0bDAsMCYjeGQ7JiN4YTsmI3g5O2MwLTIuMTk2LDEuNzU4LTMuOTcyLDMuOTI2LTMuOTcySDI4NC44MkMyODcuMDE2LDEyOS44OTIsMjg4Ljc3MywxMzEuNjY2LDI4OC43NzMsMTMzLjg2MkwyODguNzczLDEzMy44NjJ6IiBmaWxsPSIjMDBDRkZGIi8+CiA8cGF0aCBkPSJNMTc4LjY3NiwxMDYuNTA2YzAsOS4w'+
			'MzQsMTIuMTEsMTYuMzk5LDMuMDAyLDE2LjM5OWgtNjguNzJjLTkuMDYzLDAsMy4wMzEtNy4zNjUsMy4wMzEtMTYuMzk5bDAsMCYjeGQ7JiN4YTsmI3g5O2MwLTkuMTI1LDcuMzY1LTE2LjQ1OSwxNi40My0xNi40NTloMjkuNzk3QzE3MS4yOTUsOTAuMDQ2LDE3OC42NzYsOTcuMzgxLDE3OC42NzYsMTA2LjUwNkwxNzguNjc2LDEwNi41MDZ6IiBmaWxsPSIjMDQxRDM1Ii8+CiA8cGF0aCBkPSJNNTU5Ljg5MiwyMDMuODFjMCwyOS41NzEsMjMuOTQ2LDUzLjU0OCw1My41Myw1My41NDhjMjkuNTQsMCwyNDEuNjk4LTIzLjk3NywyNDEuNjk4LTUzLjU0OCYjeGQ7JiN4YTsmI3g5O2MwLTI5LjUzOS0yMT'+
			'IuMTU4LTUzLjUxNi0yNDEuNjk4LTUzLjUxNkM1ODMuODM4LDE1MC4yOTQsNTU5Ljg5MiwxNzQuMjcxLDU1OS44OTIsMjAzLjgxeiIgZmlsbD0iIzA5MzU2OCIvPgogPHBhdGggZD0iTTYxMy40MzksMTUwLjI5NGMtMjkuNTg3LDAtNTMuNTMyLDIzLjk3Ny01My41MzIsNTMuNTE2IiBmaWxsPSIjMDc0NTg0Ii8+CiA8Zz4KICA8cGF0aCBkPSJNNTU5Ljg5MiwyMDMuODFjMCwyOS41NzEtMzQuNDUsOTIuNDgzLTQuODgsOTIuNDgzYzI5LjU2OSwwLDMwMC4xMjQtNjIuODk4LDMwMC4xMjQtOTIuNDgzIiBmaWxsPSIjMDQxRDM1Ii8+CiAgPHBhdGggZD0iTTgwMS43ODYsMjE2LjM5YzAsMTcuMDUyLDEz'+
			'LjgwOCwzMC44NDMsMzAuODI3LDMwLjg0M2wwLDBjMTcuMDM2LDAsMzAuODAxLTEzLjc5MiwzMC44MDEtMzAuODQzdi0yNy41ODUmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTE3LjAyMS0xMy43NjUtMzAuODEzLTMwLjgwMS0zMC44MTNsMCwwYy0xNy4wMjEsMC0zMC44MjcsMTMuNzkzLTMwLjgyNywzMC44MTNWMjE2LjM5TDgwMS43ODYsMjE2LjM5eiIgZmlsbD0iIzA0MUQzNSIvPgogPC9nPgogPHBhdGggZD0iTTgwMS43ODYsMTg1Ljk4N2MwLDE3LjAyMSwxMy44MDgsMzAuODEzLDMwLjgyNywzMC44MTNsMCwwYzE3LjAzNiwwLDMwLjgwMS0xMy43OTMsMzAuODAxLTMwLjgxM3YtMjcuNTg1JiN4ZD'+
			'smI3hhOyYjeDk7YzAtMTcuMDIxLTEzLjc2NS0zMC44NDMtMzAuODAxLTMwLjg0M2wwLDBjLTE3LjAyMSwwLTMwLjgyNywxMy44MjItMzAuODI3LDMwLjg0M1YxODUuOTg3TDgwMS43ODYsMTg1Ljk4N3oiIGZpbGw9IiMwOTM1NjgiLz4KIDxwYXRoIGQ9Ik04NjIuNDU5LDE1OC40MDFjLTMuMjYxLDEzLjUwMy0xNS4zNTQsMjMuNTM5LTI5Ljg0NSwyMy41MzljLTE0LjUwMywwLTI2LjU4Mi0xMC4wMzUtMjkuODcyLTIzLjUzOSYjeGQ7JiN4YTsmI3g5O2MzLjI4OC0xMy40NzQsMTUuMzY4LTIzLjUzOSwyOS44NzItMjMuNTM5Qzg0Ny4xMDQsMTM0Ljg2NCw4NTkuMTk4LDE0NC45MjcsODYyLjQ1OSwx'+
			'NTguNDAxeiIgZmlsbD0iIzA0MUQzNSIvPgogPGVsbGlwc2Ugcng9IjE0Mi4zNjMiIGN5PSIxMzMuODU5IiBmaWxsPSIjMDBCMUZGIiByeT0iMjIuNTIyIiBjeD0iODMyLjYwNiIvPgogPGVsbGlwc2Ugcng9Ijc5LjA4NCIgY3k9IjEzMy44NTkiIGZpbGw9IiMwMDkyRkYiIHJ5PSIyMi41MjIiIGN4PSI4MzIuNjA2Ii8+CiA8cGF0aCBkPSJNNjkxLjE3OCwxMzMuODYyYzAsMi4xOTcsMS43NDIsMy45NCwzLjk1NiwzLjk0aDI3NC45OTdjMi4xNjYsMCwzLjkyNi0xLjc0NCwzLjkyNi0zLjk0bDAsMCYjeGQ7JiN4YTsmI3g5O2MwLTIuMTk2LTEuNzU5LTMuOTcyLTMuOTI2LTMuOTcySDY5NS4xMzRDNj'+
			'kyLjkzNCwxMjkuODkyLDY5MS4xNzgsMTMxLjY2Niw2OTEuMTc4LDEzMy44NjJMNjkxLjE3OCwxMzMuODYyeiIgZmlsbD0iIzAwQ0ZGRiIvPgogPHBhdGggZD0iTTgwMS4yNzEsMTA2LjUwNmMwLDkuMDM0LTEyLjExLDE2LjM5OS0zLjAwMiwxNi4zOTloNjguNzJjOS4wNjMsMC0zLjAyOS03LjM2NS0zLjAyOS0xNi4zOTlsMCwwJiN4ZDsmI3hhOyYjeDk7YzAtOS4xMjUtNy4zNjQtMTYuNDU5LTE2LjQzMy0xNi40NTloLTI5Ljc5OEM4MDguNjY5LDkwLjA0Niw4MDEuMjcxLDk3LjM4MSw4MDEuMjcxLDEwNi41MDZMODAxLjI3MSwxMDYuNTA2eiIgZmlsbD0iIzA0MUQzNSIvPgogPHBhdGggZD0iTTU4'+
			'MS4wNjUsMjI5LjgwNGgtMjkuMzcxYy00LjQ1OCwwLTguNjk4LDEuOTg1LTExLjU4MSw1LjM4MmMtNC4xMDcsNC44NTEtMjIuOTAxLDEyLjA0OC01MC4xNTEsMTIuMDQ4JiN4ZDsmI3hhOyYjeDk7Yy0yNy4yNywwLTQ2LjAxNy03LjItNTAuMTI0LTEyLjA0OGMtMi44OTYtMy40MS03LjEyNC01LjM4Mi0xMS41OTUtNS4zODJoLTI5LjM1OWMtOC4zODIsMC0xNS4xNTcsNi43NzUtMTUuMTU3LDE1LjE1OHYzMS4wNTYmI3hkOyYjeGE7JiN4OTtjMCwzLjg0OSwxLjQ4Nyw3LjU3OCw0LjEwOCwxMC4zOThjNS43OSw2LjEyMywxMy44MDksOC42NzEsMjEuNTUzLDExLjEyNmMxNC44MjQsNC42ODQsMTYuND'+
			'MxLDYuNjA2LDE2LjQzMSwxMi4xMTEmI3hkOyYjeGE7JiN4OTtjMCwxMi4zMzgtMTEuNzAyLDM4LjM5MS0yOC41MDgsNjMuMzI1Yy0yLjY2OCw0LTMuMzAzLDkuMDM1LTEuNjgyLDEzLjU2NWMxLjYyMiw0LjUzMiw1LjI4OSw4LjAxOSw5Ljg4Miw5LjQxMiYjeGQ7JiN4YTsmI3g5O2MyNS44NTcsNy44MTksNTUuMDY0LDExLjk1OCw4NC40NTIsMTEuOTU4YzI5LjM4NywwLDU4LjYwOS00LjEzNyw4NC40NjctMTEuOTU4YzQuNjA5LTEuMzk3LDguMjQ1LTQuODgsOS44OC05LjQxMiYjeGQ7JiN4YTsmI3g5O2MxLjYwOC00LjUzLDAuOTcyLTkuNTY0LTEuNjkzLTEzLjU2NWMtMTYuNzc5LTI0LjkzNS0y'+
			'OC40OTYtNTAuOTcyLTI4LjQ5Ni02My4zMjVjMC01LjUwMiwxLjYwNy03LjQyNywxNi4zOTgtMTIuMTExJiN4ZDsmI3hhOyYjeDk7YzcuNzYtMi40NTUsMTUuNzc5LTUsMjEuNTY4LTExLjEyNmMyLjYzOC0yLjgxNyw0LjEwNi02LjU0Nyw0LjEwNi0xMC4zOTh2LTMxLjA1N0M1OTYuMjIyLDIzNi41NzksNTg5LjQzMiwyMjkuODA0LDU4MS4wNjUsMjI5LjgwNCYjeGQ7JiN4YTsmI3g5O3oiIGZpbGw9IiMwODFFMzQiLz4KIDxnPgogIDxwYXRoIGQ9Ik01MjAuOTA3LDE2Ny41NjljMCwxLjU3Ni0xLjI3MywyLjg1LTIuODUsMi44NWgtNTYuMTg2Yy0xLjU3NiwwLTIuODUxLTEuMjc0LTIuODUxLTIuOD'+
			'VsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjU3NywxLjI3My0yLjg0OSwyLjg1MS0yLjg0OWg1Ni4xODZDNTE5LjYzNywxNjQuNzM2LDUyMC45MDcsMTY2LjAxLDUyMC45MDcsMTY3LjU2OUw1MjAuOTA3LDE2Ny41Njl6IiBmaWxsPSIjMDA5MkZGIi8+CiAgPHBhdGggZD0iTTUyMC45MDcsMTg0LjYyM2MwLDEuNTc1LTEuMjczLDIuODQ5LTIuODUsMi44NDloLTU2LjE4NmMtMS41NzYsMC0yLjg1MS0xLjI3NC0yLjg1MS0yLjg0OWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTEuNTc2LDEuMjczLTIuODUsMi44NTEtMi44NWg1Ni4xODZDNTE5LjYzNywxODEuNzg5LDUyMC45MDcsMTgzLjA2'+
			'MSw1MjAuOTA3LDE4NC42MjNMNTIwLjkwNywxODQuNjIzeiIgZmlsbD0iIzAwOTJGRiIvPgogIDxwYXRoIGQ9Ik01MjAuOTA3LDIwMS42NzJjMCwxLjU3NS0xLjI3MywyLjg1LTIuODUsMi44NWgtNTYuMTg2Yy0xLjU3NiwwLTIuODUxLTEuMjc0LTIuODUxLTIuODVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjU3NiwxLjI3My0yLjg1LDIuODUxLTIuODVoNTYuMTg2QzUxOS42MzcsMTk4LjgzOCw1MjAuOTA3LDIwMC4xMSw1MjAuOTA3LDIwMS42NzJMNTIwLjkwNywyMDEuNjcyeiIgZmlsbD0iIzAwOTJGRiIvPgogPC9nPgogPHBhdGggZD0iTTc3MC4zNjYsNjg5LjYwOUgyMDkuNTgyYy0xMS'+
			'4xNTgsMC0yMC4yMDQtOS4wNDUtMjAuMjA0LTIwLjIwNGMwLTI0Ni4xMDMsNzcuOTA0LTI1Ny45MTUsMTQ4LTM1My4wMTQmI3hkOyYjeGE7JiN4OTtjNS41NC05LjY4NCwxNy44ODEtMTMuMDQ2LDI3LjU3MS03LjUwOGM5LjY4Niw1LjUzOSwxMy4wNDcsMTcuODgzLDcuNTA4LDI3LjU3MWMtNjguNzE4LDg3LjIxNS0xMzcuNTgsODUuMzE2LTE0Mi40NTIsMzEyLjc0OSYjeGQ7JiN4YTsmI3g5O2g1MTkuOTQ4Yy00Ljg2OS0yMjcuNDc2LTcxLjYzMS0yMjUuNTMzLTE0Mi40NTEtMzEyLjc0N2MtNS41MzktOS42ODctMi4xODItMjIuMDI2LDcuNTAzLTI3LjU3JiN4ZDsmI3hhOyYjeDk7YzkuNjg3LTUu'+
			'NTM4LDIyLjAyMy0yLjE3OSwyNy41Nyw3LjUwNGM3NS44OTgsODcuNzAzLDE0OCwxMDYuODYyLDE0OCwzNTMuMDE1Qzc5MC41NjksNjgwLjU2NCw3ODEuNTI1LDY4OS42MDksNzcwLjM2Niw2ODkuNjA5eiIgZmlsbD0iIzAwQ0ZGRiIvPgo8L3N2Zz4K';
		me._ht_node_imagefly__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_node_image-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 56px;';
		hs+='left : -26px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 56px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_imagefly.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_imagefly.onmouseover=function (e) {
			me._ht_node_imagefly__img.style.visibility='hidden';
			me._ht_node_imagefly__imgo.style.visibility='inherit';
		}
		me._ht_node_imagefly.onmouseout=function (e) {
			me._ht_node_imagefly__img.style.visibility='inherit';
			me._ht_node_imagefly__imgo.style.visibility='hidden';
		}
		me._ht_node_imagefly.ggUpdatePosition=function (useTransition) {
		}
		me._ht_nodefly.appendChild(me._ht_node_imagefly);
		el=me._hotspot_previewfly=document.createElement('div');
		el.ggId="hotspot_preview-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -147px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_previewfly.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_previewfly.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_nodefly'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_previewfly.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_previewfly.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_previewfly.style[domTransition]='';
				if (me._hotspot_previewfly.ggCurrentLogicStateVisible == 0) {
					me._hotspot_previewfly.style.visibility=(Number(me._hotspot_previewfly.style.opacity)>0||!me._hotspot_previewfly.style.opacity)?'inherit':'hidden';
					me._hotspot_previewfly.ggVisible=true;
				}
				else {
					me._hotspot_previewfly.style.visibility="hidden";
					me._hotspot_previewfly.ggVisible=false;
				}
			}
		}
		me._hotspot_previewfly.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_fly=document.createElement('div');
		el.ggId="preview_picture_frame -fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_fly.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_fly.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_previewfly.appendChild(me._preview_picture_frame_fly);
		el=me._preview_nodeimagefly=document.createElement('div');
		els=me._preview_nodeimagefly__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimagefly.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimagefly.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_previewfly.appendChild(me._preview_nodeimagefly);
		el=me._tooltipfly=document.createElement('div');
		els=me._tooltipfly__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 101px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 1px solid #000000;';
		hs+='border: 1px solid rgba(0,0,0,0.882353);';
		hs+=cssPrefix + 'background-clip: padding-box;';
		hs+='background-clip: padding-box;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltipfly.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltipfly.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((151-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_previewfly.appendChild(me._tooltipfly);
		el=me._checkmark_tick_nodefly=document.createElement('div');
		els=me._checkmark_tick_nodefly__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgdmVyc2lvbj0iMS4xIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick_nodefly__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_node-fly";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_nodefly.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick_nodefly.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_nodefly.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_nodefly.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_nodefly.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_nodefly.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_nodefly.style[domTransition]='';
				if (me._checkmark_tick_nodefly.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_nodefly.style.visibility=(Number(me._checkmark_tick_nodefly.style.opacity)>0||!me._checkmark_tick_nodefly.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_nodefly.ggVisible=true;
				}
				else {
					me._checkmark_tick_nodefly.style.visibility="hidden";
					me._checkmark_tick_nodefly.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_nodefly.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_previewfly.appendChild(me._checkmark_tick_nodefly);
		me._ht_nodefly.appendChild(me._hotspot_previewfly);
		me.__div = me._ht_nodefly;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_mouseover();;
		} else
		if (hotspot.skinid=='ht_image-1') {
			hotspot.skinid = 'ht_image-1';
			hsinst = new SkinHotspotClass_ht_image1(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image1_mouseover();;
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
		} else
		if (hotspot.skinid=='ht_video_youtube') {
			hotspot.skinid = 'ht_video_youtube';
			hsinst = new SkinHotspotClass_ht_video_youtube(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();;
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node Y') {
			hotspot.skinid = 'ht_node Y';
			hsinst = new SkinHotspotClass_ht_node_y(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_y_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_y_active();;
			me.callChildLogicBlocksHotspot_ht_node_y_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-9h') {
			hotspot.skinid = 'ht_node-9h';
			hsinst = new SkinHotspotClass_ht_node9h(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node9h_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node9h_active();;
			me.callChildLogicBlocksHotspot_ht_node9h_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-10h30') {
			hotspot.skinid = 'ht_node-10h30';
			hsinst = new SkinHotspotClass_ht_node10h30(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node10h30_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node10h30_active();;
			me.callChildLogicBlocksHotspot_ht_node10h30_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-12h') {
			hotspot.skinid = 'ht_node-12h';
			hsinst = new SkinHotspotClass_ht_node12h(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node12h_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node12h_active();;
			me.callChildLogicBlocksHotspot_ht_node12h_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-1h30') {
			hotspot.skinid = 'ht_node-1h30';
			hsinst = new SkinHotspotClass_ht_node1h30(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node1h30_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node1h30_active();;
			me.callChildLogicBlocksHotspot_ht_node1h30_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-3h') {
			hotspot.skinid = 'ht_node-3h';
			hsinst = new SkinHotspotClass_ht_node3h(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node3h_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node3h_active();;
			me.callChildLogicBlocksHotspot_ht_node3h_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-4h30') {
			hotspot.skinid = 'ht_node-4h30';
			hsinst = new SkinHotspotClass_ht_node4h30(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node4h30_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node4h30_active();;
			me.callChildLogicBlocksHotspot_ht_node4h30_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-6h') {
			hotspot.skinid = 'ht_node-6h';
			hsinst = new SkinHotspotClass_ht_node6h(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node6h_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node6h_active();;
			me.callChildLogicBlocksHotspot_ht_node6h_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_node-7h30') {
			hotspot.skinid = 'ht_node-7h30';
			hsinst = new SkinHotspotClass_ht_node7h30(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node7h30_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node7h30_active();;
			me.callChildLogicBlocksHotspot_ht_node7h30_changevisitednodes();;
		} else
		{
			hotspot.skinid = 'ht_node-fly';
			hsinst = new SkinHotspotClass_ht_nodefly(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_nodefly_mouseover();;
			me.callChildLogicBlocksHotspot_ht_nodefly_active();;
			me.callChildLogicBlocksHotspot_ht_nodefly_changevisitednodes();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image-1']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image-1'].length; i++) {
				hotspotTemplates['ht_image-1'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				hotspotTemplates['ht_video_youtube'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node Y']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node Y'].length; i++) {
				hotspotTemplates['ht_node Y'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-9h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-9h'].length; i++) {
				hotspotTemplates['ht_node-9h'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-10h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-10h30'].length; i++) {
				hotspotTemplates['ht_node-10h30'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-12h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-12h'].length; i++) {
				hotspotTemplates['ht_node-12h'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-1h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-1h30'].length; i++) {
				hotspotTemplates['ht_node-1h30'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-3h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-3h'].length; i++) {
				hotspotTemplates['ht_node-3h'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-4h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-4h30'].length; i++) {
				hotspotTemplates['ht_node-4h30'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-6h']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-6h'].length; i++) {
				hotspotTemplates['ht_node-6h'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-7h30']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-7h30'].length; i++) {
				hotspotTemplates['ht_node-7h30'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node-fly']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node-fly'].length; i++) {
				hotspotTemplates['ht_node-fly'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_node_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 140px; height: 100px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner=document.createElement('div');
		els=me._node_image_cloner__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner.onclick=function (e) {
			if (
				(
					((me._node_image_cloner.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner']=true;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title=document.createElement('div');
		els=me._node_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title.style[domTransition]='';
				if (me._node_title.ggCurrentLogicStateVisible == 0) {
					me._node_title.style.visibility="hidden";
					me._node_title.ggVisible=false;
				}
				else {
					me._node_title.style.visibility=(Number(me._node_title.style.opacity)>0||!me._node_title.style.opacity)?'inherit':'hidden';
					me._node_title.ggVisible=true;
				}
			}
		}
		me._node_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_title);
		el=me._node_visited=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 87px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 135px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited.style[domTransition]='border-color 0s';
				if (me._node_visited.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_visited);
		me.__div.appendChild(me._node_image_cloner);
	};
	function SkinCloner_category_cloner_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 140px; height: 37px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._category_text=document.createElement('div');
		els=me._category_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="category_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 140px;';
		hs+='height: 35px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle+" ("+me.ggNodeCount+")";
		el.appendChild(els);
		me._category_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._category_text.onclick=function (e) {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
			player.setVariableValue('node_visible', true);
		}
		me._category_text.ggActivate=function () {
			skin._node_cloner.ggText=me.ggTag;
			if (skin._node_cloner.ggText=='') {
				skin._node_cloner.ggUpdate([]);
			} else {
				skin._node_cloner.ggUpdate(skin._node_cloner.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
		}
		me._category_text.ggUpdatePosition=function (useTransition) {
		}
		me._category_text.ggNodeChange=function () {
			if (me._category_text.ggLastIsActive!=me._category_text.ggIsActive()) {
				me._category_text.ggLastIsActive=me._category_text.ggIsActive();
				if (me._category_text.ggIsActive()) {
					if (me._category_text.ggActivate) me._category_text.ggActivate();
				} else {
					if (me._category_text.ggDeactivate) me._category_text.ggDeactivate();
				}
			}
		}
		me.__div.appendChild(me._category_text);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._button_image_normalscreen.logicBlock_visible();
	me._button_image_fullscreen.logicBlock_visible();
	me._manu_background.logicBlock_alpha();
	me._node_scroller.logicBlock_alpha();
	me._category_scroller.logicBlock_alpha();
	me._menu_open.logicBlock_position();
	me._menu_open.logicBlock_alpha();
	player.addListener('fullscreenenter', function(args) { me._button_image_normalscreen.logicBlock_visible();me._button_image_fullscreen.logicBlock_visible(); });
	player.addListener('fullscreenexit', function(args) { me._button_image_normalscreen.logicBlock_visible();me._button_image_fullscreen.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._manu_background.logicBlock_alpha();me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('varchanged_category_visible_1', function(args) { me._manu_background.logicBlock_alpha();me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('varchanged_node_visible', function(args) { me._node_scroller.logicBlock_alpha();me._category_scroller.logicBlock_alpha(); });
	player.addListener('changenode', function(args) { me._node_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._node_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._node_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._node_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_image_mouseover();me.callChildLogicBlocksHotspot_ht_image1_mouseover();me.callChildLogicBlocksHotspot_ht_info_mouseover();me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();me.callChildLogicBlocksHotspot_ht_node_mouseover();me.callChildLogicBlocksHotspot_ht_node_y_mouseover();me.callChildLogicBlocksHotspot_ht_node9h_mouseover();me.callChildLogicBlocksHotspot_ht_node10h30_mouseover();me.callChildLogicBlocksHotspot_ht_node12h_mouseover();me.callChildLogicBlocksHotspot_ht_node1h30_mouseover();me.callChildLogicBlocksHotspot_ht_node3h_mouseover();me.callChildLogicBlocksHotspot_ht_node4h30_mouseover();me.callChildLogicBlocksHotspot_ht_node6h_mouseover();me.callChildLogicBlocksHotspot_ht_node7h30_mouseover();me.callChildLogicBlocksHotspot_ht_nodefly_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active();me.callChildLogicBlocksHotspot_ht_node_y_active();me.callChildLogicBlocksHotspot_ht_node9h_active();me.callChildLogicBlocksHotspot_ht_node10h30_active();me.callChildLogicBlocksHotspot_ht_node12h_active();me.callChildLogicBlocksHotspot_ht_node1h30_active();me.callChildLogicBlocksHotspot_ht_node3h_active();me.callChildLogicBlocksHotspot_ht_node4h30_active();me.callChildLogicBlocksHotspot_ht_node6h_active();me.callChildLogicBlocksHotspot_ht_node7h30_active();me.callChildLogicBlocksHotspot_ht_nodefly_active(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node_y_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node9h_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node10h30_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node12h_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node1h30_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node3h_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node4h30_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node6h_changevisitednodes();me.callChildLogicBlocksHotspot_ht_node7h30_changevisitednodes();me.callChildLogicBlocksHotspot_ht_nodefly_changevisitednodes(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};