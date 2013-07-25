(function (window){
    var win = window;    
win.Yk = win.Yk || {};

var Yk = {
    op:{},
        isCompatible: function(other){},
    $: function(id){
    if(typeof id == 'object') return id; 
            return document.getElementById(id);
},
    addEvent: function(node, type, listener){
        if(!(node = this.$(node))) return false;
if(node.addEventListener){
                 node.addEventListener(type,listener,false);
}else if(node.attachEvent){
                 node.attachEvent('on'+type,listener);
}else{
                 return false;
}
},
        removeEvent: function(node, type, listener){
        if(!(node = this.$(node))) return false;
            if(node.removeEventListener){
                 node.removeEventListener(type,listener,false);
}else if(node.detachEvent){
                 node.detachEvent('on'+type,listener);
}else{
                 return false;
}
    },
        getElementByClassName: function(className, tag, parent){
        parent = parent || document;
            if(!(parent = this.$(parent))) return false;
if(document.getElementsByClassName){
var nodes =  (parent || document).getElementsByClassName(className),result = [];
for(var i=0 ;node = nodes[i++];){
if(tag !== "*" && node.tagName === tag.toUpperCase()){
result.push(node);
}else if(tag == "*"){
result.push(node);
}
}
return result
}
           
            // Locate all the matching tags
            var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
            var matchingElements = new Array();
    
            // Create a regular expression to determine if the className is correct
            className = className.replace(/\-/g, "\\-");
            var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
    
            var element;
            // Check each element
            for(var i=0; i<allTags.length; i++){
                element = allTags[i];
                if(regex.test(element.className)){
                    matchingElements.push(element);
                }
            }
    
            // Return any matching elements
            return matchingElements;    
},
    toggleDisplay: function(node, value){
        if(!(node = this.$(node))) return false;
if(value){
            node.style.display = value;
return node;
}
if(node.style.display != 'none'){
node.style.display = 'none';
}else{
node.style.display = value || '';
}
},
    insertAfter: function(node, referenceNode){
        if(!(node = this.$(node))) return false;
        if(!(referenceNode = this.$(referenceNode))) return false;
            referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
},
    removeChildren: function(parent){
        if(!(parent = this.$(parent))) return false;
var firstChild;
            while(firstChild = parent.firstChild){
parent.removeChild(firstChild)
}
},
    prependChild: function(parent, newChild){
        if(!(parent = this.$(parent))) return false;
        if(!(newChild = this.$(newChild))) return false;
if(parent.firstChild){
                parent.insertBefore(newChild,parent.firstChild); 
}else{
                parent.appendChild(newChild);
}
},
preventDefault: function(e){
    e = e || win.event;
if(e.preventDefault){
                e.preventDefault();
}else{
e.returnValue = false;
}
},
        stopPropagation: function(e){
e = e || win.event;
if(e.stopPropagation){
e.stopPropagation();
}else{
e.cancelBubble = true;
}
},
        getPointerPosition: function(e){
e = e || window.event;
var x = e.pageX || (e.clientX +
(document.documentElement.scrollLeft 
 || document.body.scrollLeft));
            var y = e.pageY|| (e.clientY +
(document.documentElement.scrollTop 
 || document.body.scrollTop));
            return {'x':x,'y':y}; 
},
        sendAjax:function(option){
 var req = createXMLHTTPObject();
 if (!req) return;
 var method = (option.postData) ? "POST" : "GET";
 req.open(method,option.url,true);
 if (option.postData)
 req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
 req.onreadystatechange = function () {
 if (req.readyState != 4) return;
 if (req.status != 200 && req.status != 304) {
 return;
 }
 option.callback(req);
 }
 if (req.readyState == 4) return;
 req.send(option.postData); 
},
        openbox:function(option){
var WRAP = '<div id="skygqOverlay" style="opacity: 0.2;"></div><div id="wrapOut" class="wrap_out" style="width: 396px; left: 50%; margin-left: -198px; z-index: 2000; top: 10%;"><div id="wrapIn" class="wrap_in"><div onselectstart="return false;"class="wrap_bar" id="wrapBar"><div class="wrap_title"><span>'+option.title+'</span></div><a id="wrapClose" class="wrap_close" href="javascript:void(0);">×</a></div><div id="wrapBody" class="wrap_body" style="width: 394px;"></div></div></div>';
var ykopbox;
        if(!(ykopbox = Yk.$('yk-openbox'))){
    ykopbox = document.createElement('div');
    ykopbox.setAttribute('id','yk-openbox');
}
this.op.boxid = option.id;
            var box = this.$(option.id);
            box.parentNode.insertBefore(ykopbox,box);
ykopbox.innerHTML += WRAP; 
this.$('wrapBody').appendChild(box);
this.toggleDisplay(option.id,'block');

    this.closebox();
},
        closebox: function(){
  var that = this;
              this.addEvent(this.$('wrapClose'),'click',function(e){
  var innerid = that.op.boxid;
  var body = Yk.$('yk-openbox');
  body.parentNode.appendChild(Yk.$(innerid));
  body.removeChild(Yk.$('wrapOut'));
  body.removeChild(Yk.$('skygqOverlay'));
      Yk.toggleDisplay(innerid);
  Yk.stopPropagation(e);
  });
  }
}

function createXMLHTTPObject() {
if (window.ActiveXObject) {    
return new ActiveXObject("Microsoft.XMLHTTP");    
}    
else if (window.XMLHttpRequest) {    
return new XMLHttpRequest();    
}    
}


    win['Yk'] = Yk;
})(window);
