async function loadGuide(){

const params = new URLSearchParams(window.location.search);
const guideName = params.get("guide") || "new-player";

const res = await fetch(`/data/guides/${guideName}.json`);
const guide = await res.json();

document.getElementById("guideTitle").textContent = guide.title;
document.getElementById("guideSubtitle").textContent = guide.subtitle;

document.getElementById("guideBanner").src = guide.bannerImage;

const intro = document.getElementById("guideIntro");
intro.innerHTML = guide.intro.map(p=>`<p>${p}</p>`).join("");

const hero = document.getElementById("guideHero");
hero.innerHTML = guide.intro.map(p=>`<p>${p}</p>`).join("");

const links = document.getElementById("guideLinks");

if(guide.quickLinks){
links.innerHTML = guide.quickLinks.map(l=>
`<li><a href="${l.href}">${l.label}</a></li>`
).join("");
}

const container = document.getElementById("guideSections");

guide.sections.forEach(section=>{

let html="";

if(section.type==="text"){
html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">INFO</span>
</div>
<div class="hud-lore">
${section.paragraphs.map(p=>`<p>${p}</p>`).join("")}
</div>
</section>`;
}

if(section.type==="image"){
html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">IMAGE</span>
</div>

<img class="guide-image" src="${section.src}" alt="${section.alt}">

<div class="guide-caption">${section.caption||""}</div>

</section>`;
}

if(section.type==="steps"){
html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">GUIDE</span>
</div>

<div class="hud-lore">
<ol class="guide-steps">
${section.items.map(i=>`<li>${i}</li>`).join("")}
</ol>
</div>

</section>`;
}

if(section.type==="list"){
html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">INFO</span>
</div>

<div class="hud-lore">
<ul class="guide-list">
${section.items.map(i=>`<li>${i}</li>`).join("")}
</ul>
</div>

</section>`;
}

if(section.type==="callout"){
html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">NOTICE</span>
</div>

<div class="guide-callout">
<p>${section.text}</p>
</div>

</section>`;
}

if(section.type==="table"){

const header = section.columns.map(c=>`<th>${c}</th>`).join("");

const rows = section.rows.map(r=>
`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`
).join("");

html=`
<section class="hud-panel">
<div class="panel-head">
<span>${section.title}</span>
<span class="panel-chip">DATA</span>
</div>

<table class="guide-table">
<thead>
<tr>${header}</tr>
</thead>

<tbody>
${rows}
</tbody>

</table>

</section>`;
}

container.insertAdjacentHTML("beforeend",html);

});

}

loadGuide();
