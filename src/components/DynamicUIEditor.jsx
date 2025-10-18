import React, { useEffect, useState } from "react";

export default function DynamicUIEditor() {
  const [config, setConfig] = useState({
    // Typography
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 15,

    // Button
    button: {
      borderRadius: 8,
      shadow: "medium", // none, small, medium, large
      alignment: "right", // left, center, right
      background: "#d66b58",
      textColor: "#fff",
      paddingY: 10,
      paddingX: 18,
    },

    // Gallery / swatches
    gallery: {
      alignment: "grid-right", // grid-left, grid-center, grid-right
      spacing: 8,
      imageRadius: 8,
      columns: 4,
      swatchSize: 28,
    },

    // card / layout
    cardRadius: 12,
    containerPadding: 18,
    sectionBg: "#ffffff",
    strokeColor: "#e5e7eb",
    strokeWeight: 1,

    // preview
    layout: "layoutA", // layoutA | layoutB
    viewport: "desktop", // desktop | mobile
  });

  // Inject Google fonts used
  useEffect(() => {
    if (!document.getElementById("gfonts")) {
      const l = document.createElement("link");
      l.id = "gfonts";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const update = (path, value) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const exportJSON = () => {
    const b = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        setConfig((prev) => ({ ...prev, ...json }));
      } catch {
        alert("Invalid JSON");
      }
    };
    r.readAsText(f);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left: Editor */}
      <aside className="col-span-4 sticky top-8">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow">
          <h2 className="text-lg font-semibold">Editor</h2>
          <p className="text-sm text-gray-600 mt-1">Customize the design and preview live.</p>

          <div className="mt-4 space-y-4">
            {/* Preview controls */}
            <div className="border rounded p-3">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => update("viewport", "desktop")}
                  className={`px-3 py-1 rounded ${config.viewport === "desktop" ? "bg-sky-600 text-white" : "bg-gray-100"}`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => update("viewport", "mobile")}
                  className={`px-3 py-1 rounded ${config.viewport === "mobile" ? "bg-sky-600 text-white" : "bg-gray-100"}`}
                >
                  Mobile
                </button>
                <div className="ml-auto text-xs text-gray-500">Layout</div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => update("layout", "layoutA")}
                  className={`px-3 py-1 rounded ${config.layout === "layoutA" ? "bg-slate-700 text-white" : "bg-gray-100"}`}
                >
                  A
                </button>
                <button
                  onClick={() => update("layout", "layoutB")}
                  className={`px-3 py-1 rounded ${config.layout === "layoutB" ? "bg-slate-700 text-white" : "bg-gray-100"}`}
                >
                  B
                </button>
              </div>
            </div>

            {/* Typography */}
            <div className="border rounded p-3">
              <h4 className="font-medium text-sm mb-2">Typography</h4>
              <label className="text-xs">Font Family</label>
              <select value={config.fontFamily} onChange={(e) => update("fontFamily", e.target.value)} className="w-full mt-1 border rounded px-2 py-1">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Poppins</option>
              </select>

              <label className="text-xs mt-2">Font Weight</label>
              <select value={config.fontWeight} onChange={(e) => update("fontWeight", Number(e.target.value))} className="w-full mt-1 border rounded px-2 py-1">
                <option value={400}>400</option>
                <option value={500}>500</option>
                <option value={600}>600</option>
                <option value={700}>700</option>
              </select>

              <label className="text-xs mt-2">Font Size ({config.fontSize}px)</label>
              <input type="range" min="10" max="30" value={config.fontSize} onChange={(e) => update("fontSize", Number(e.target.value))} className="w-full" />
            </div>

            {/* Button */}
            <div className="border rounded p-3">
              <h4 className="font-medium text-sm mb-2">Button</h4>

              <label className="text-xs">Border Radius ({config.button.borderRadius}px)</label>
              <input type="range" min="0" max="28" value={config.button.borderRadius} onChange={(e) => update("button.borderRadius", Number(e.target.value))} className="w-full" />

              <label className="text-xs mt-2">Shadow</label>
              <select value={config.button.shadow} onChange={(e) => update("button.shadow", e.target.value)} className="w-full mt-1 border rounded px-2 py-1">
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>

              <label className="text-xs mt-2">Alignment</label>
              <select value={config.button.alignment} onChange={(e) => update("button.alignment", e.target.value)} className="w-full mt-1 border rounded px-2 py-1">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="text-xs">Background</label>
                  <input value={config.button.background} onChange={(e) => update("button.background", e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs">Text</label>
                  <input value={config.button.textColor} onChange={(e) => update("button.textColor", e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
              </div>
            </div>

            {/* Gallery / swatches */}
            <div className="border rounded p-3">
              <h4 className="font-medium text-sm mb-2">Gallery / Swatches</h4>

              <label className="text-xs">Alignment</label>
              <select value={config.gallery.alignment} onChange={(e) => update("gallery.alignment", e.target.value)} className="w-full mt-1 border rounded px-2 py-1">
                <option value="grid-left">Grid Left</option>
                <option value="grid-center">Grid Center</option>
                <option value="grid-right">Grid Right</option>
              </select>

              <label className="text-xs mt-2">Spacing ({config.gallery.spacing}px)</label>
              <input type="range" min="0" max="24" value={config.gallery.spacing} onChange={(e) => update("gallery.spacing", Number(e.target.value))} className="w-full" />

              <label className="text-xs mt-2">Swatch Radius ({config.gallery.imageRadius}px)</label>
              <input type="range" min="0" max="20" value={config.gallery.imageRadius} onChange={(e) => update("gallery.imageRadius", Number(e.target.value))} className="w-full" />

              <label className="text-xs mt-2">Swatch Size ({config.gallery.swatchSize}px)</label>
              <input type="range" min="16" max="48" value={config.gallery.swatchSize} onChange={(e) => update("gallery.swatchSize", Number(e.target.value))} className="w-full" />
            </div>

            

            {/* Export / Import */}
            <div className="flex gap-2">
              <button onClick={exportJSON} className="flex-1 bg-green-600 text-white px-3 py-2 rounded">Export JSON</button>
              <label className="flex-1 text-center border rounded px-3 py-2 cursor-pointer bg-gray-50 text-sm">
                Import
                <input onChange={importJSON} type="file" accept="application/json" className="hidden" />
              </label>
            </div>

            <div className="text-xs text-gray-500">Tip: use hex codes (e.g. #d66b58) or named colors.</div>
          </div>
        </div>
      </aside>

      {/* Right: Preview */}
      <main className="col-span-8">
        <Preview config={config} />
      </main>
    </div>
  );
}

/* ========== Preview components ========== */

function Preview({ config }) {
  // root style
  const rootStyle = {
    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontSize: config.fontSize + "px",
    padding: config.containerPadding + "px",
  };

  const wrapperBg = "white"; // dark background to mimic Figma workspace
  const cardStyle = {
    borderRadius: config.cardRadius + "px",
    background: config.sectionBg,
    border: `${config.strokeWeight}px solid ${config.strokeColor}`,
    padding: "18px",
    boxShadow: "0 8px 30px rgba(2,6,23,0.4)",
  };

  // button style
  const buttonBoxShadow =
    config.button.shadow === "none"
      ? "none"
      : config.button.shadow === "small"
      ? "0 2px 6px rgba(0,0,0,0.08)"
      : config.button.shadow === "medium"
      ? "0 8px 20px rgba(0,0,0,0.12)"
      : "0 16px 40px rgba(0,0,0,0.16)";

  const buttonStyle = {
    background: config.button.background,
    color: config.button.textColor,
    borderRadius: config.button.borderRadius + "px",
    padding: `${config.button.paddingY}px ${config.button.paddingX}px`,
    boxShadow: buttonBoxShadow,
    border: "none",
    cursor: "pointer",
  };

  // gallery / swatches layout
  const swatchGap = config.gallery.spacing;
  const swatchSize = config.gallery.swatchSize;

  const sampleColors = ["#A56B58", "#8FB9A8", "#3A5A40", "#F2C6B5", "#D66B58", "#C6C6C6", "#6B4C7C", "#2D9CDB", "#F7E4D9", "#3B3B3B"];
  // placeholder product image src set
  const productSrc = "/product-mock.png"; // we will fallback to picsum if not available

  // viewport sizing
  const isMobile = config.viewport === "mobile";
  const viewportClass = isMobile ? "w-[340px] h-[700px] mx-auto" : "";

  return (
    <div style={{ ...rootStyle, background: wrapperBg, minHeight: "80vh" }} className="rounded-xl p-6 preview-scroll">
      <div className={`max-w-5xl mx-auto ${viewportClass}`}>
        <div style={cardStyle} className="relative">
          {/* header area */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>Cozy Lounge Chair</div>
              <div className="text-sm text-gray-600 mt-1" style={{ fontWeight: 400 }}>
                Crafted from reclaimed wood — customizable finishes.
              </div>
            </div>

            {/* action */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: mapAlign(config.button.alignment) }}>
              <button style={buttonStyle}>Add to Cart</button>
            </div>
          </div>

          {/* content area - variants of layout */}
          <div className="mt-6">
            {config.layout === "layoutA" ? (
              <LayoutA
                productSrc={productSrc}
                sampleColors={sampleColors}
                config={config}
                swatchGap={swatchGap}
                swatchSize={swatchSize}
                productFallback={true}
              />
            ) : (
              <LayoutB
                productSrc={productSrc}
                sampleColors={sampleColors}
                config={config}
                swatchGap={swatchGap}
                swatchSize={swatchSize}
                productFallback={true}
              />
            )}
          </div>

          <div className="mt-6 text-xs text-gray-400">Preview • {config.viewport === "mobile" ? "Mobile" : "Desktop"} • Live</div>
        </div>
      </div>
    </div>
  );
}

function mapAlign(a) {
  if (a === "left") return "flex-start";
  if (a === "center") return "center";
  return "flex-end";
}

function LayoutA({ productSrc, config, sampleColors, swatchGap, swatchSize }) {
  // desktop: big image left, controls right (like Figma)
  return (
    <div className="grid grid-cols-12 gap-6 items-start">
      <div className="col-span-8">
        <div className="rounded overflow-hidden bg-gray-100" style={{ minHeight: 320 }}>
          {/* main product image - use picsum as placeholder */}
          <img
            src={`https://picsum.photos/900/520?random=12`}
            alt="product"
            className="w-full h-[320px] object-cover"
            style={{ display: "block" }}
          />
        </div>
        <div className="mt-3 flex gap-2">
          {/* small thumbnails */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-12 rounded overflow-hidden bg-gray-50" style={{ border: "1px solid #eee" }}>
              <img src={`https://picsum.photos/80/60?random=${20 + i}`} alt="thumb" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <aside className="col-span-4">
        <div className="p-3 rounded bg-white shadow-sm" style={{ border: `${config.strokeWeight}px solid ${config.strokeColor}` }}>
          <div className="text-sm font-semibold">Choose a color</div>

          <div
            className="mt-3"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(5, config.gallery.columns)}, ${swatchSize}px)`,
              gap: swatchGap + "px",
              justifyContent: config.gallery.alignment === "grid-center" ? "center" : config.gallery.alignment === "grid-right" ? "end" : "start",
            }}
          >
            {sampleColors.slice(0, 10).map((c, i) => (
              <div
                key={i}
                title={c}
                className="rounded-full border"
                style={{
                  width: swatchSize + "px",
                  height: swatchSize + "px",
                  borderRadius: config.gallery.imageRadius + "px",
                  background: c,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
            ))}
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-500">Price</div>
            <div className="text-lg font-semibold mt-1">$899</div>
          </div>

          <div className="mt-3">
            <label className="text-xs block text-gray-600">Finish</label>
            <select className="w-full mt-2 border rounded px-2 py-1">
              <option>Natural Oak</option>
              <option>Walnut</option>
              <option>Painted White</option>
            </select>
          </div>
        </div>
      </aside>
    </div>
  );
}

function LayoutB({ productSrc, config, sampleColors, swatchGap, swatchSize }) {
  // Mobile-like stacked layout: hero image then swatches below (useful for mobile preview)
  return (
    <div className="space-y-4">
      <div className="rounded overflow-hidden bg-gray-100">
        <img src={`https://picsum.photos/900/520?random=32`} alt="product" className="w-full h-[360px] object-cover" />
      </div>

      <div className="rounded bg-white p-3" style={{ border: `${config.strokeWeight}px solid ${config.strokeColor}` }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Cozy Lounge Chair</div>
            <div className="text-xs text-gray-500 mt-1">$899</div>
          </div>
          <div>
            <button style={{ background: config.button.background, color: config.button.textColor, padding: "8px 14px", borderRadius: config.button.borderRadius + "px" }}>
              Add
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Colors</div>
          <div style={{ display: "flex", gap: swatchGap + "px", flexWrap: "wrap", alignItems: "center" }}>
            {sampleColors.slice(0, 8).map((c, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: swatchSize + "px", height: swatchSize + "px", background: c, borderRadius: config.gallery.imageRadius + "px", border: "1px solid rgba(0,0,0,0.08)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
