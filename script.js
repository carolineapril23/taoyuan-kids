// 活動資料：想新增或修改活動，只要改這個陣列就好。
// start / end：活動期間（YYYY-MM-DD）。留空代表長期開放，選任何日期都會出現。
// image：放在 images/ 的檔名；留空則顯示 emoji。credit：照片作者與授權（CC BY 類授權必須標示）。
// web：官方或主辦單位網頁 { label, url }。沒填的話，卡片會顯示「相關網頁」（連到 Google 搜尋）。
// free：true 代表免費。資料請在發布前再核對一次。
// 資料最後更新日：每次修改活動資料後，請把這個日期改成當天（頁尾會自動顯示）。
const LAST_UPDATED = "2026-10-08";
// 找不到照片的活動會用這張插圖（放在 images/）。
const PLACEHOLDER = "placeholder.webp";

const places = [
  { id: "toy-lib", name: "桃園兒童玩具圖書館", type: "indoor", emoji: "🧸", image: "", credit: "", free: true, area: "八德區",
    desc: "免費入場，有大量童書、親子遊戲區與二手玩具交換區，適合學齡前幼兒，雨天備案首選。",
    info: "票價：免費｜地址：八德區重慶街 36 號", map: "桃園兒童玩具圖書館", start: "", end: "" },
  { id: "rail", name: "桃園軌道願景館", type: "indoor", emoji: "🚂", image: "", credit: "", free: false, area: "桃園區",
    desc: "可體驗桃園號小火車與一日車長，喜歡火車的孩子會很開心。",
    info: "媒體報導免費入場，場次請再確認", map: "桃園軌道願景館", start: "", end: "" },
  { id: "olson", name: "奧爾森林學堂", type: "outdoor", emoji: "🦉", image: "hutoushan.jpg",
    credit: "照片：虎頭山環保公園，lienyuan lee，CC BY 3.0，Wikimedia Commons",
    free: true, area: "桃園區（虎頭山公園）",
    desc: "位於虎頭山公園內，有森林步道與貓頭鷹樹屋，全天開放。",
    info: "票價：免費", map: "奧爾森林學堂 桃園", start: "", end: "" },
  { id: "landscape", name: "野趣森林（原台灣地景花園）", type: "outdoor", emoji: "🌼", image: "", credit: "", free: false, area: "中壢區",
    desc: "原台灣地景花園，2023 年底起由新團隊接手並更名，有樹屋、森林步道與兒童遊戲區，適合放電。",
    info: "票價約 250 元（部落格資訊，請再確認，似乎僅週末營業）", map: "野趣森林 中壢", start: "", end: "" },
  { id: "taimall", name: "台茂公園", type: "outdoor", emoji: "🛝", image: "taimall.jpg",
    credit: "照片：台茂購物中心外觀，Taimall，CC BY-SA 4.0，Wikimedia Commons",
    free: true, area: "蘆竹區",
    desc: "緊鄰台茂購物中心的戶外公園，玩完可以順便逛街吃飯。",
    info: "票價：免費｜約 09:00–21:00", map: "台茂公園 蘆竹", start: "", end: "" },
  { id: "nanfa", name: "南法親子莊園", type: "outdoor", emoji: "🐑", image: "", credit: "", free: false, area: "大溪區",
    desc: "占地逾一萬坪，有超過 20 種動物的迷你動物園與親子遊樂場。",
    info: "最低約 100 元可玩一天", map: "南法親子莊園 大溪", start: "", end: "" },
  { id: "daxi-wood", name: "大溪木藝生態博物館", type: "craft", emoji: "🪵", image: "daxi-wood.jpg",
    credit: "照片：壹號館，Allervous，CC BY 4.0，Wikimedia Commons",
    free: false, area: "大溪區",
    desc: "認識木工文化，並可留意是否有木作 DIY 體驗場次（需自行查詢當期課程）。",
    info: "體驗費用請查官網", map: "大溪木藝生態博物館", start: "", end: "" },
  { id: "design", name: "2026 台灣設計展「桃園流」", type: "festival", emoji: "🎨", image: "children-art-museum.jpg",
    credit: "照片：桃園市兒童美術館（衛星展區之一），ㄚ文，CC0，Wikimedia Commons",
    free: false, area: "青埔、中壢及衛星展區",
    desc: "主展區在青埔與中壢，另有桃園市立美術館、桃園市兒童美術館等衛星展區，適合帶孩子看展。",
    info: "展期：9/24–10/11", map: "桃園市兒童美術館", start: "2026-09-24", end: "2026-10-11",
    web: { label: "官方網站", url: "https://www.designexpo.org.tw/" } },
  { id: "juancun", name: "第 26 屆桃園眷村文化節", type: "festival", emoji: "🏮", image: "matsu-village.jpg",
    credit: "照片：馬祖新村，Foxy1219，CC BY-SA 4.0，Wikimedia Commons",
    free: true, area: "馬祖新村、太武新村、憲光二村等",
    desc: "主題「一村一家人」，串聯 70 多場活動，一起體驗眷村文化。",
    info: "活動日：10/9–10/18", map: "桃園眷村文化節 馬祖新村", start: "2026-10-09", end: "2026-10-18",
    web: { label: "桃園市政府文化局", url: "https://culture.tycg.gov.tw/" } },
  { id: "halloween", name: "桃園萬聖城", type: "festival", emoji: "🎃", image: "", credit: "", free: true, area: "桃園藝文廣場",
    desc: "今年首度與《PEANUTS》史努比合作，萬聖節氣氛十足。場地沿用過去幾屆的桃園藝文廣場，今年細節請看主辦單位公告。",
    info: "10/24–11/1（媒體報導，以官方公告為準）", map: "桃園藝文廣場", start: "2026-10-24", end: "2026-11-01" }
];

const typeLabel = { outdoor: "戶外／農場", indoor: "室內／展館", craft: "手作／體驗", festival: "節慶／市集" };
const $ = id => document.getElementById(id);
const list = $("list"), count = $("count"), empty = $("empty");
let currentType = "all";

// ---- 日期工具（一律用 YYYY-MM-DD 字串，避免時區問題）----
const pad = n => String(n).padStart(2, "0");
const ymd = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const now = new Date();
const todayStr = ymd(now.getFullYear(), now.getMonth(), now.getDate());
let rangeStart = "", rangeEnd = "";
let viewY = now.getFullYear(), viewM = now.getMonth();

// ---- 評價資料（存在這台瀏覽器的 localStorage）----
const KEY = "taoyuan-kids-reviews";
function loadReviews() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}
function saveReviews(r) {
  try { localStorage.setItem(KEY, JSON.stringify(r)); return true; } catch (e) { return false; }
}
let reviews = loadReviews();

const starText = n => "★".repeat(n) + "☆".repeat(5 - n);
function shareText(p, r) {
  return `【${p.name}】${r.date ? "造訪日期：" + r.date + "\n" : ""}評價：${starText(r.stars)}${r.note ? "\n心得：" + r.note : ""}\n（桃園假日親子活動）`;
}

// ---- 篩選 ----
function matches(p) {
  const q = $("search").value.trim().toLowerCase();
  if (currentType !== "all" && p.type !== currentType) return false;
  if ($("freeOnly").checked && !p.free) return false;
  if (q && !(p.name + p.area + p.desc).toLowerCase().includes(q)) return false;
  if (rangeStart) {
    const re = rangeEnd || rangeStart;
    if ((p.start && p.start > re) || (p.end && p.end < rangeStart)) return false;
  }
  return true;
}

function render() {
  const items = places.filter(matches);
  list.innerHTML = "";
  items.forEach(p => list.appendChild(buildCard(p)));
  count.textContent = `共 ${items.length} 個活動`;
  empty.hidden = items.length > 0;
}

function buildCard(p) {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.map);
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb t-${p.type}"></div>
    <p class="photo-credit"></p>
    <div class="body">
      <div class="tags"><span class="tag">${typeLabel[p.type]}</span>${p.free ? '<span class="tag free-mark">免費</span>' : ""}</div>
      <h2></h2>
      <p class="desc"></p>
      <div class="meta"></div>
      <div class="saved-note"></div>
      <div class="actions">
        <a target="_blank" rel="noopener" href="${mapUrl}">地圖導航</a>
        <a class="web" target="_blank" rel="noopener"></a>
        <button type="button" class="open-review">我的評價</button>
      </div>
      <div class="review-slot"></div>
    </div>`;
  const thumb = card.querySelector(".thumb");
  const img = document.createElement("img");
  img.src = "images/" + (p.image || PLACEHOLDER);
  img.alt = p.name;
  img.loading = "lazy";
  img.addEventListener("error", () => { img.remove(); thumb.textContent = p.emoji; });
  thumb.appendChild(img);
  if (p.image) card.querySelector(".photo-credit").textContent = p.credit;
  else card.querySelector(".photo-credit").remove();
  const web = card.querySelector(".web");
  web.href = p.web ? p.web.url : "https://www.google.com/search?q=" + encodeURIComponent(p.name);
  web.textContent = p.web ? p.web.label : "相關網頁";
  card.querySelector("h2").textContent = p.name;
  card.querySelector(".desc").textContent = p.desc;
  card.querySelector(".meta").textContent = `${p.area}｜${p.info}`;
  updateSaved(card, p);
  card.querySelector(".open-review").addEventListener("click", () => toggleReview(card, p));
  return card;
}

function updateSaved(card, p) {
  const r = reviews[p.id];
  const el = card.querySelector(".saved-note");
  el.innerHTML = "";
  if (!r) return;
  const s = document.createElement("span");
  s.className = "stars";
  s.textContent = starText(r.stars);
  el.append("我的評價：", s, r.date ? `（${r.date} 去過）` : "");
}

function toggleReview(card, p) {
  const slot = card.querySelector(".review-slot");
  if (slot.firstChild) { slot.innerHTML = ""; return; }
  const r = reviews[p.id] || { stars: 0, date: "", note: "" };
  let stars = r.stars;
  const box = document.createElement("div");
  box.className = "review";
  box.innerHTML = `
    <div><label class="t">何時去過</label><input type="date" class="v-date"></div>
    <div><span class="t">星級評價</span><div class="stars-input"></div></div>
    <div><label class="t">備註</label><textarea class="v-note" placeholder="例如：停車方便、適合 3 歲以下"></textarea></div>
    <div class="review-btns">
      <button type="button" class="btn save">儲存</button>
      <button type="button" class="btn ghost share">分享</button>
      <button type="button" class="btn ghost del">刪除</button>
    </div>
    <div class="toast" aria-live="polite"></div>`;
  box.querySelector(".v-date").value = r.date;
  box.querySelector(".v-note").value = r.note;
  const starsBox = box.querySelector(".stars-input");
  const paint = () => starsBox.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i < stars));
  for (let i = 1; i <= 5; i++) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = "★"; b.setAttribute("aria-label", i + " 星");
    b.addEventListener("click", () => { stars = i; paint(); });
    starsBox.appendChild(b);
  }
  paint();
  const toast = msg => { box.querySelector(".toast").textContent = msg; };
  const current = () => ({ stars, date: box.querySelector(".v-date").value, note: box.querySelector(".v-note").value.trim() });

  box.querySelector(".save").addEventListener("click", () => {
    const cur = current();
    if (!cur.stars) { toast("請先選擇星級。"); return; }
    reviews[p.id] = cur;
    toast(saveReviews(reviews) ? "已儲存。" : "瀏覽器無法儲存（可能是無痕模式）。");
    updateSaved(card, p);
  });
  box.querySelector(".del").addEventListener("click", () => {
    delete reviews[p.id];
    saveReviews(reviews);
    updateSaved(card, p);
    slot.innerHTML = "";
  });
  box.querySelector(".share").addEventListener("click", async () => {
    const cur = current();
    if (!cur.stars) { toast("請先選擇星級。"); return; }
    const text = shareText(p, cur);
    try {
      if (navigator.share) { await navigator.share({ text }); return; }
      await navigator.clipboard.writeText(text);
      toast("已複製，可以貼到 LINE 或社群分享。");
    } catch (e) {
      if (e.name !== "AbortError") toast("無法自動分享，請手動複製：" + text);
    }
  });
  slot.appendChild(box);
}

// ---- 日期區間行事曆 ----
const eventDays = new Set();
places.forEach(p => {
  if (!p.start || !p.end) return;
  const d = new Date(p.start + "T00:00:00");
  const end = new Date(p.end + "T00:00:00");
  while (d <= end) { eventDays.add(ymd(d.getFullYear(), d.getMonth(), d.getDate())); d.setDate(d.getDate() + 1); }
});

function fmt(s) { const [, m, d] = s.split("-"); return `${+m}/${+d}`; }
function updateSummary() {
  $("dateSummary").textContent = !rangeStart ? "全部日期"
    : (!rangeEnd || rangeEnd === rangeStart) ? fmt(rangeStart)
    : `${fmt(rangeStart)} – ${fmt(rangeEnd)}`;
}

function renderCalendar() {
  $("monthTitle").textContent = `${viewY} 年 ${viewM + 1} 月`;
  const grid = $("calGrid");
  grid.innerHTML = "";
  const first = new Date(viewY, viewM, 1).getDay();
  const days = new Date(viewY, viewM + 1, 0).getDate();
  for (let i = 0; i < first; i++) {
    const b = document.createElement("button");
    b.className = "blank"; b.disabled = true; b.tabIndex = -1; b.setAttribute("aria-hidden", "true");
    grid.appendChild(b);
  }
  const re = rangeEnd || rangeStart;
  for (let d = 1; d <= days; d++) {
    const s = ymd(viewY, viewM, d);
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = d;
    if (s === todayStr) b.classList.add("today");
    if (eventDays.has(s)) b.classList.add("has-event");
    if (rangeStart && s >= rangeStart && s <= re) b.classList.add("in-range");
    if (s === rangeStart) b.classList.add("start");
    if (s === re && rangeStart) b.classList.add("end");
    b.addEventListener("click", () => pickDate(s));
    grid.appendChild(b);
  }
}

function pickDate(s) {
  if (!rangeStart || rangeEnd) { rangeStart = s; rangeEnd = ""; }
  else if (s < rangeStart) { rangeEnd = rangeStart; rangeStart = s; }
  else { rangeEnd = s; }
  updateSummary();
  renderCalendar();
  render();
}

$("dateToggle").addEventListener("click", () => {
  const open = $("calendar").hidden;
  $("calendar").hidden = !open;
  $("dateToggle").setAttribute("aria-expanded", String(open));
});
$("closeCal").addEventListener("click", () => { $("calendar").hidden = true; $("dateToggle").setAttribute("aria-expanded", "false"); });
$("clearDate").addEventListener("click", () => { rangeStart = rangeEnd = ""; updateSummary(); renderCalendar(); render(); });
$("prevMonth").addEventListener("click", () => { viewM--; if (viewM < 0) { viewM = 11; viewY--; } renderCalendar(); });
$("nextMonth").addEventListener("click", () => { viewM++; if (viewM > 11) { viewM = 0; viewY++; } renderCalendar(); });

// ---- 其他事件 ----
$("typeChips").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  currentType = btn.dataset.type;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === btn));
  render();
});
$("search").addEventListener("input", render);
$("freeOnly").addEventListener("change", render);

$("lastUpdated").textContent = LAST_UPDATED.replace(/-/g, "/");
renderCalendar();
render();
