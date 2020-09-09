import React from "react";
import "../Styles/Loading.css";

// Gif Script
if (!false) {
  var __ry_imported = true;
  (function () {
    var installed = false;
    var embedurl = "https://tenor.com/embed/";
    var canonical = document.querySelector("link[rel='canonical']");

    function ready() {
      if (!false) {
        installed = true;
        var elts = document.querySelectorAll(".tenor-embed:not([data-processed]), .tenor-gif-embed:not([data-processed])");
        for (var i = 0; i < elts.length; ++i) {
          let e = elts[i];
          e.setAttribute("data-processed", true);
          var embedSubPath = e.getAttribute("data-postid");
          if (!embedSubPath) {
            embedSubPath = e.getAttribute("data-type");
          }
          if (!embedSubPath) {
            embedSubPath = e.getAttribute("data-insights-term");
            if (embedSubPath) {
              embedSubPath = "insights/" + embedSubPath.replace(/\s+/g, "-");
              embedSubPath += "?range=" + e.getAttribute("data-range");
              embedSubPath += "&timestamp=" + e.getAttribute("data-timestamp");
            }
          }

          var iframe = document.createElement("iframe");
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowtransparency", "true");
          iframe.setAttribute("allowfullscreen", "true");
          iframe.setAttribute("scrolling", "no");
          var root;
          if (e.hasAttribute("data-height")) {
            iframe.setAttribute("width", e.getAttribute("data-width"));
            iframe.setAttribute("height", e.getAttribute("data-height"));
            root = iframe;
          } else {
            var framewrapper = document.createElement("div");
            var aspect = e.getAttribute("data-aspect-ratio") || 1.8;
            e.setAttribute("style", "width:" + e.getAttribute("data-width") + ";" + "position:relative;");
            framewrapper.setAttribute("style", "padding-top:" + (1 / aspect) * 100 + "%;");
            iframe.setAttribute("style", "position:absolute;top:0;left:0;width:100%;height:100%;");
            framewrapper.appendChild(iframe);
            root = framewrapper;
          }
          var url = embedurl + embedSubPath;
          var sharemethod = e.getAttribute("data-share-method") || "tenor";
          if (sharemethod === "host") {
            var hosturl;
            if (canonical) hosturl = canonical.href;
            else hosturl = document.location.href;
            url += "?canonicalurl=" + hosturl;
          }
          iframe.setAttribute("src", url);
          e.innerHTML = "";
          e.appendChild(root);
        }
      }
    }

    function readystatechange() {
      if (document.readyState === "complete") ready();
    }

    if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
      setTimeout(ready, 1);
    } else {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readystatechange);
        window.attachEvent("onload", ready);
      }
    }
  })();
}

export default function LoadingPage() {
  return (
    <>
      {/* <div className='container text-center'>
        <div class='loadingio-spinner-spinner-xxuiyba8eoq'>
          <div class='ldio-uzw2l5k868'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div> */}
      <div className='container text-center mt-5 pt-5' id='pokemonGif'>
        <div className='tenor-gif-embed' data-postid='5930125' data-share-method='host' data-width='100%' data-aspect-ratio='1.0'></div>
      </div>
    </>
  );
}
