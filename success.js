function spawn(){
  const h=document.createElement("div");
  h.className="heart";
  h.textContent="❤️";
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(Math.random()*30+16)+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),5000);
}
setInterval(spawn,150);
