// ==UserScript==
// @name	elastic tabstops view for github
// @namespace	https://github.com/hax/
// @version	0.3
// @description	
// @match	https://github.com/*
// @copyright	2014, Hax
// ==/UserScript==
!function(t){"use strict";function e(t){var e=t||{};this.settings={tabTagName:e.tabTagName||"span",tabClassName:e.tabClassName||"tab-char",tabSpaceMinWidth:e.tabSpaceMinWidth||"1em",styleId:e.styleId||"etab-style",styleRules:e.styleRules||[]}}function n(){for(var e=/^["'([{“‘]+$/,n=t.querySelectorAll(".highlight .p"),s=0;s<n.length;s++)e.test(n[s].textContent)&&n[s].classList.add("open");i.processLines(t.querySelectorAll(".js-file-line"))}var s="	",a=3;e.prototype._addStyle=function(t){if(!t.getElementById(this.settings.styleId)){var e=t.createElement("style");e.id=this.settings.styleId,t.body.appendChild(e);var n=this.settings.tabTagName+"."+this.settings.tabClassName;e.sheet.insertRule(n+"{ display: inline-block; margin-right: "+this.settings.tabSpaceMinWidth+" }",0),this.settings.styleRules.forEach(function(t,n){e.sheet.insertRule(t,n+1)})}},e.prototype.processLines=function(t){function e(t,i){if(!(t>=a.length)){if(i>=a[t].length)return e(t+1,0);var r=s(t,i);if(r.aligned)return e(t,i+1);n(r),setTimeout(function(){e(t,i+1)})}}function n(t){var e=t.map(function(t){return t.getBoundingClientRect().right}),n=Math.max.apply(null,e);t.forEach(function(t){t.style.width=n-t.getBoundingClientRect().right+"px"}),t.aligned=!0}function s(t,e){var n=[];if(t>=0&&t<a.length&&e>=0&&e<a[t].length){var s=l[t][e];if(s)return s;for(var i=t-1,r=t+1;i>=0&&e<a[i].length;)i--;for(;r<a.length&&e<a[r].length;)r++;for(var o=i+1;r>o;o++)n.push(a[o][e]),l[o][e]=n}return n}t.length&&this._addStyle(t[0].ownerDocument);for(var a=[],i=0,r=t.length;r>i;i++)this._wrapTabs(t[i]),a[i]=t[i].querySelectorAll(this.settings.tabTagName+"."+this.settings.tabClassName);var l=a.map(function(t){return new Array(t.length)});e(0,0)},e.prototype._wrapTabs=function(t){if(t.nodeType===a)for(var e;(e=t.wholeText.indexOf(s))>=0;){var n=t.splitText(e);t=n.splitText(1),this._wrapTab(n)}else if(!this._isTab(t))for(var i=t.firstChild;i;)i=this._wrapTabs(i).nextSibling;return t},e.prototype._wrapTab=function(t){var e=t.ownerDocument.createElement(this.settings.tabTagName);return e.classList.add(this.settings.tabClassName),t.parentNode.replaceChild(e,t),e.appendChild(t),e},e.prototype._isTab=function(t){return t.nodeName===this.settings.tabTagName&&t.classList.contains(this.settings.tabClassName)};var i=new e({styleRules:[".blob-code { font-family: 'Input Serif Narrow', 'Georgia', serif; font-size: 1.167em; }",".highlight .p { color: #bbb; font-weight: lighter; }",".highlight span.tab-char + .open.p { position: absolute; transform: translateX(-100%); }"]});$(t).ready(n).on("pjax:success",n)}(document);