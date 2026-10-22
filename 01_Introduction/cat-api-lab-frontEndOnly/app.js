const $ = (s) => document.querySelector(s),
  base = "https://catfact.ninja";
let tab = "fact",
  page = 1,
  lastPage = 1,
  busy = false,
  current = null,
  view = "json",
  raw = null,
  code = "",
  limit = 6,
  maxLength = 200,
  saved = [];
try {
  saved = JSON.parse(localStorage.getItem("cat-lab-saved") || "[]");
  if (!Array.isArray(saved)) saved = [];
  saved = saved.filter((x) => x && typeof x.fact === "string");
} catch {}
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const lessons = {
  overview: [
    "Welcome to the API lab",
    "This single-page application uses plain JavaScript to call a remote back-end. Explore three GET endpoints: <code>/fact</code>, <code>/facts</code>, and <code>/breeds</code>. No API key is required. The page updates without navigation. Saved facts stay in this browser using localStorage.",
  ],
  fact: [
    "One request. One random fact.",
    "<code>GET /fact?max_length=200</code> requests a random fact with a maximum character length. The response is a JSON object containing <code>fact</code> and <code>length</code>. Changing max_length changes the query string. Random results can repeat.",
  ],
  facts: [
    "A collection with pagination",
    "<code>GET /facts?limit=6&page=1&max_length=200</code> returns a collection. Facts are in the <code>data</code> array. The server supplies <code>current_page</code>, <code>last_page</code>, and <code>total</code>. Unlike /fact, this is a paginated list, not a batch of random facts.",
  ],
  breeds: [
    "Meet the breeds",
    "<code>GET /breeds?limit=6&page=1</code> returns breed records in <code>data</code>. Each has breed, country, origin, coat, and pattern fields. Pagination is performed by the server. The search box filters only the current fetched page in your browser; it does not call a search endpoint.",
  ],
  saved: [
    "Your browser is the storage",
    "Saving a fact uses <code>localStorage</code>, not a POST request. This API is used here for reading data with GET. localStorage belongs to this browser and origin; it is not a server database or shared between devices.",
  ],
  inspector: [
    "A tiny network inspector",
    "The panel shows the most recent request URL, observed HTTP status, elapsed client time, and parsed response. Time includes network and JSON parsing; it is not just server processing time. Switch to Fetch code for runnable JavaScript. An HTTP error is different from a network or CORS error, which may have no visible status.",
  ],
  request: [
    "Anatomy of the request",
    "<code>https://catfact.ninja</code> is the base URL. The path chooses a resource. A <code>?</code> starts query parameters; <code>&</code> separates them. GET asks for data. We send <code>Accept: application/json</code> to express the expected response format.",
  ],
  flow: [
    "From click to content",
    "1. A click calls an async function.<br>2. <code>await fetch(url)</code> waits for the HTTP response.<br>3. Check <code>response.ok</code>: fetch does not throw automatically for HTTP 404 or 500.<br>4. <code>await response.json()</code> parses the body.<br>5. Render fields into the DOM.<br><br>The app handles loading, empty results, failed requests, and a 15-second timeout. CORS permission is controlled by the API server.",
  ],
  pagination: [
    "Why pages?",
    "The server sends a manageable slice of records using <code>page</code> and <code>limit</code>. Next and Previous send new GET requests. The response tells us where the list ends. Changing page size resets to page 1.",
  ],
  length: [
    "Query parameters change the result",
    "<code>max_length</code> limits the character length of returned facts. <code>limit</code> controls records per page on collection endpoints. These are URL query parameters, not a JSON request body.",
  ],
  save: [
    "Save a discovery",
    "This interaction stores the fact in localStorage. No network request is sent, so the request inspector keeps its previous result. Duplicate fact text is saved only once.",
  ],
};
function help(key) {
  const [title, body] = lessons[key] || lessons.overview;
  $("#help-title").textContent = title;
  $("#help-body").innerHTML = "<p>" + body + "</p>";
  $("#help-dialog").showModal();
}
document.addEventListener("click", (e) => {
  const h = e.target.closest("[data-help]");
  if (h) help(h.dataset.help);
});
$("#endpoint-help").onclick = () => help(tab);
$("#close-help").onclick = $("#got-it").onclick = () =>
  $("#help-dialog").close();
$("#help-dialog").addEventListener("click", (e) => {
  if (e.target === $("#help-dialog")) $("#help-dialog").close();
});
function updateCount() {
  $("#collection").textContent = saved.length + " facts collected";
}
updateCount();
function saveFact(f) {
  if (!saved.some((x) => x.fact === f.fact)) {
    saved.push(f);
    try {
      localStorage.setItem("cat-lab-saved", JSON.stringify(saved));
    } catch {
      $("#tip").textContent =
        "Saved for this session. Browser storage is unavailable.";
    }
    updateCount();
  }
  if (tab === "fact") renderFact();
  else if (tab === "facts" && raw) renderList(raw);
}
function inspect() {
  $("#inspector").textContent =
    view === "json"
      ? raw === null
        ? "No response body available."
        : JSON.stringify(raw, null, 2)
      : code;
}
document.querySelectorAll("[data-inspect]").forEach(
  (b) =>
    (b.onclick = () => {
      view = b.dataset.inspect;
      document
        .querySelectorAll("[data-inspect]")
        .forEach((x) => x.classList.toggle("selected", x === b));
      inspect();
    }),
);
function controls() {
  const facts = tab === "fact" || tab === "facts";
  $("#controls").innerHTML =
    (facts
      ? '<label>Max characters <select id="max"><option>100</option><option>200</option><option>500</option></select></label><button class="help" data-help="length" aria-label="Explain query parameters">[?]</button>'
      : "") +
    (tab === "facts" || tab === "breeds"
      ? '<label>Per page <select id="limit"><option>6</option><option>12</option></select></label><button class="help" data-help="pagination" aria-label="Explain pagination">[?]</button>'
      : "") +
    (tab === "breeds"
      ? '<label>Search this page <input id="search" placeholder="e.g. Abyssinian" type="search"></label>'
      : "");
  if ($("#max")) {
    $("#max").value = maxLength;
    $("#max").onchange = (e) => {
      maxLength = Number(e.target.value);
      page = 1;
      load();
    };
  }
  if ($("#limit")) {
    $("#limit").value = limit;
    $("#limit").onchange = (e) => {
      limit = Number(e.target.value);
      page = 1;
      load();
    };
  }
  if ($("#search"))
    $("#search").oninput = () => {
      if (raw) renderList(raw);
    };
}
function renderFact() {
  $("#content").innerHTML =
    '<div class="fact-display"><div class="mini-cat">🐱</div><blockquote>' +
    esc(
      current?.fact || "Your next “wait, really?” moment is one click away.",
    ) +
    "</blockquote><small>" +
    (current
      ? esc(current.length) + " characters · straight from the API"
      : "Press the button. Discover something unexpected.") +
    "</small></div>";
  $("#actions").innerHTML =
    '<button class="primary" id="fetch">✦ Surprise me</button>' +
    (current
      ? '<button class="secondary" id="save">' +
        (saved.some((x) => x.fact === current.fact)
          ? "♥ Collected"
          : "♡ Collect fact") +
        '</button><button class="help" data-help="save" aria-label="Explain saving facts">[?]</button>'
      : "");
  $("#fetch").onclick = load;
  if ($("#save")) $("#save").onclick = () => saveFact(current);
}
function renderList(data) {
  let rows = data.data || [];
  if (tab === "breeds") {
    const q = ($("#search")?.value || "").toLowerCase();
    rows = rows.filter((x) =>
      [x.breed, x.country, x.coat, x.pattern].some((v) =>
        String(v || "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }
  $("#content").innerHTML = rows.length
    ? '<div class="list ' +
      (tab === "breeds" ? "breed-grid" : "") +
      '">' +
      rows
        .map((r, i) =>
          tab === "breeds"
            ? '<article class="item"><div class="breed-emoji">' +
              ["🐈", "🐈‍⬛", "🐱"][i % 3] +
              "</div><h3>" +
              esc(r.breed) +
              "</h3><p>" +
              esc(r.country) +
              "</p><small>" +
              esc(r.coat) +
              " coat · " +
              esc(r.pattern) +
              "</small><p><small>Origin: " +
              esc(r.origin) +
              "</small></p></article>"
            : '<article class="item"><p>' +
              esc(r.fact) +
              '</p><button data-save="' +
              i +
              '">' +
              (saved.some((s) => s.fact === r.fact)
                ? "♥ Collected"
                : "♡ Collect") +
              "</button> <small>" +
              esc(r.length) +
              " characters</small></article>",
        )
        .join("") +
      "</div>"
    : '<div class="empty">No results here. Try another page or clear your filter.</div>';
  $("#actions").innerHTML =
    '<button class="secondary" id="prev" ' +
    (page <= 1 ? "disabled" : "") +
    '>← Previous</button><span style="padding:12px 0;font-size:12px">Page ' +
    page +
    " of " +
    lastPage +
    '</span><button class="secondary" id="next" ' +
    (page >= lastPage ? "disabled" : "") +
    ">Next →</button>";
  $("#prev").onclick = () => {
    page--;
    load();
  };
  $("#next").onclick = () => {
    page++;
    load();
  };
  document
    .querySelectorAll("[data-save]")
    .forEach((b) => (b.onclick = () => saveFact(rows[Number(b.dataset.save)])));
}
function renderSaved() {
  $("#content").innerHTML = saved.length
    ? '<div class="list">' +
      saved
        .map(
          (r, i) =>
            '<article class="item"><p>' +
            esc(r.fact) +
            '</p><button data-remove="' +
            i +
            '">Remove</button></article>',
        )
        .join("") +
      "</div>"
    : '<div class="empty">♡ Your collection is waiting.<br>Discover a fact, then click Collect.</div>';
  $("#actions").innerHTML = "";
  document.querySelectorAll("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        saved.splice(Number(b.dataset.remove), 1);
        try {
          localStorage.setItem("cat-lab-saved", JSON.stringify(saved));
        } catch {}
        updateCount();
        renderSaved();
      }),
  );
}
async function load() {
  if (busy) return;
  busy = true;
  document
    .querySelectorAll(".tab,#controls select")
    .forEach((b) => (b.disabled = true));
  $("#actions").innerHTML = "";
  $("#content").innerHTML =
    '<div class="empty">🐾 Asking the cat server…</div>';
  const route =
    tab === "fact"
      ? "/fact?max_length=" + maxLength
      : "/" +
        tab +
        "?limit=" +
        limit +
        "&page=" +
        page +
        (tab === "facts" ? "&max_length=" + maxLength : "");
  const url = base + route;
  $("#request-url").textContent = "GET " + url;
  $("#endpoint").textContent = "GET /" + tab;
  $("#status").textContent = "LOADING";
  raw = null;
  code = `const response = await fetch(${JSON.stringify(url)}, {\n  headers: { Accept: 'application/json' }\n});\nif (!response.ok) {\n  throw new Error('HTTP ' + response.status);\n}\nconst data = await response.json();\nconsole.log(data);`;
  inspect();
  const start = performance.now(),
    controller = new AbortController(),
    timer = setTimeout(() => controller.abort(), 15000);
  let received = false;
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    received = true;
    $("#status").textContent = res.status + " " + res.statusText;
    raw = await res.json();
    inspect();
    if (!res.ok) throw new Error("API returned HTTP " + res.status);
    if (tab === "fact") {
      if (typeof raw.fact !== "string")
        throw new Error("Unexpected response format");
      current = raw;
      renderFact();
    } else {
      if (!Array.isArray(raw.data))
        throw new Error("Unexpected response format");
      page = raw.current_page;
      lastPage = raw.last_page;
      renderList(raw);
    }
    $("#tip").textContent =
      tab === "fact"
        ? "The response is one object. Its fact field becomes the text on the left."
        : "The response contains a data array plus pagination metadata. We render one card per record.";
  } catch (e) {
    if (!received)
      $("#status").textContent =
        e.name === "AbortError" ? "TIMEOUT" : "NETWORK ERROR";
    $("#content").innerHTML =
      '<div class="error">' +
      esc(
        e.name === "AbortError"
          ? "The request took too long. Please try again."
          : e.message,
      ) +
      ". If the API is unavailable or the browser blocks cross-origin access, no live data can be shown.</div>";
    $("#actions").innerHTML =
      '<button class="primary" id="retry">Try again</button>';
    $("#retry").onclick = load;
  } finally {
    clearTimeout(timer);
    $("#timing").textContent = Math.round(performance.now() - start) + " ms";
    busy = false;
    document
      .querySelectorAll(".tab,#controls select")
      .forEach((b) => (b.disabled = false));
  }
}
document.querySelectorAll(".tab").forEach(
  (b) =>
    (b.onclick = () => {
      if (busy) return;
      tab = b.dataset.tab;
      page = 1;
      document
        .querySelectorAll(".tab")
        .forEach((x) => x.classList.toggle("active", x === b));
      $("#endpoint").textContent =
        tab === "saved" ? "LOCAL STORAGE" : "GET /" + tab;
      controls();
      if (tab === "fact") renderFact();
      else if (tab === "saved") renderSaved();
      else load();
    }),
);
controls();
renderFact();
