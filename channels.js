/* =========================================================
   NaazTV — settings & app list
   Edit this file in Notepad, save, then reload the TV page.
   ========================================================= */

var SETTINGS = {
  brand: "ނާޒް ޓީވީ",            // name shown top-right
  wallpaper: "wallpaper.jpg",     // home screen photo (put a new .jpg in this folder to change it, "" = none)
  placeName: "ފުނަދޫ",           // weather location name
  latitude: 6.15,                 // Sh. Funadhoo
  longitude: 73.29,
  clock24h: false,                // true = 17:45, false = 5:45 މފ
  screensaverMinutes: 5           // big clock after this much idle time (0 = off)
};

/*  Each row has a title and a list of apps.
    type: "link"    -> opens the url full-screen (press Back on the remote to return)
          "weather" -> built-in weather screen
    color: two colours for the tile gradient
    icon:  play | tv | radio | cloud | news
    live:  true shows the red ލައިވް badge
    streams: direct video feeds (.m3u8). If given, the channel plays full-screen
             inside NaazTV (Up/Down on the remote = next/previous channel).
             They are tried in order; if all fail, the website (url) opens instead.
    NOTE: urls marked (check) are my best guess at the PSM page address —
          if one doesn't open, use https://www.psmnews.mv/stream and copy the right link. */

var ROWS = [
  {
    title: "އެޕްތައް",
    apps: [
      { name: "ޔޫޓިއުބް", desc: "ވީޑިއޯ، ލައިވް ސްޓްރީމް އަދި ހުރިހާ ޗެނަލްތަކެއް", type: "link",
        url: "https://www.youtube.com", color: ["#ff3b30", "#a3001b"], icon: "play" },
      { name: "މޫސުން", desc: "މިހާރުގެ މޫސުމާއި ކުރިއަށް އޮތް ދުވަސްތައް", type: "weather",
        color: ["#2f8cff", "#0b3d91"], icon: "cloud" }
    ]
  },
  {
    title: "ޓީވީ ޗެނަލްތައް",
    apps: [
      { name: "ޓީވީއެމް", desc: "ދިވެހިރާއްޖޭގެ ޤައުމީ ޓީވީ ޗެނަލް", streams: [
          "https://lana.psm.mv/live/tvm.m3u8",
          "https://customer-ujex1meek7koqd9x.cloudflarestream.com/9e93379c0d46ee588b99263d95bd9c42/manifest/video.m3u8"],
        type: "link", live: true,
        url: "https://www.psmnews.mv/stream/tvm", color: ["#1e9bff", "#003a8c"], icon: "tv" },
      { name: "ރާއްޖެ ޓީވީ", desc: "ރާއްޖެ ޓީވީގެ ސީދާ ސްޓްރީމް", type: "link", live: true,
        url: "https://stream.raajje.mv", color: ["#ff6a3d", "#9c1d00"], icon: "tv" },
      { name: "ޕީއެސްއެމް ނިއުސް", desc: "24 ގަޑިއިރުގެ ޚަބަރު ޗެނަލް", streams: [
          "https://customer-ujex1meek7koqd9x.cloudflarestream.com/21262545317dadfa20dab4f9bd37c7c2/manifest/video.m3u8"],
        type: "link", live: true,
        url: "https://www.psmnews.mv/stream/psm-news" /* (check) */, color: ["#e5243b", "#5c0010"], icon: "news" },
      { name: "އެމްއެމްޓީވީ", desc: "އެމްއެމްޓީވީގެ ސީދާ ސްޓްރީމް", streams: [
          "https://sendlive.online/hls/mmtv.m3u8"],
        type: "link", live: true,
        url: "https://mmtv.mv/tv/live", color: ["#8e5cff", "#33137a"], icon: "tv" },
      { name: "ތެޔްރާ ނިއުސް", desc: "ތެޔްރާ ނިއުސްގެ ލައިވް ޓީވީ", type: "link", live: true,
        url: "https://theyranews.com/live-tv", color: ["#00b3a4", "#00463f"], icon: "news" },
      { name: "ވީޓީވީ", desc: "ވީމީޑިއާގެ ޓީވީ ޗެނަލް", live: true,
        streams: [
          "https://vtvstream.vnews.mv/vtvlive/vmedia/playlist.m3u8",
          "https://sunplay-cdn.bitratelabs.com/live/local-channel/vtv-7a0f24809c234ea78d972b1f336ac1b9/index.m3u8"],
        type: "link", url: "https://vnews.mv", color: ["#ff2d55", "#7a0026"], icon: "tv" },
      { name: "ޗެނަލް 13", desc: "ޗެނަލް 13 ގެ ސީދާ ސްޓްރީމް", live: true,
        streams: [
          "https://sunplay-cdn.bitratelabs.com/live/local-channel-fhd/ch13-28754fda0a7f338e8fccfe7206ab9be8_1080p/index.m3u8",
          "https://stream.theyraonline.com/live/channel13@live/index.m3u8"],
        type: "link", url: "https://theyranews.com/live-tv", color: ["#5ac8fa", "#0b4f8a"], icon: "tv" },
      { name: "ޔެސް ޓީވީ", desc: "ޒުވާނުންނަށް ޚާއްޞަ ޗެނަލް", streams: [
          "https://lana.psm.mv/live/yes.m3u8",
          "https://customer-ujex1meek7koqd9x.cloudflarestream.com/4f0b316cdb0fbb7f8ca93860ed11d38b/manifest/video.m3u8"],
        type: "link", live: true,
        url: "https://www.psmnews.mv/stream/yes" /* (check) */, color: ["#ffb800", "#b34700"], icon: "tv" },
      { name: "މުނާރު ޓީވީ", desc: "އިސްލާމީ ޗެނަލް", streams: [
          "https://customer-ujex1meek7koqd9x.cloudflarestream.com/6a46f90ca384c7419efdbef3ff1892a9/manifest/video.m3u8"],
        type: "link", live: true,
        url: "https://psmnews.mv/stream/munnaaru", color: ["#1fbf6a", "#00502a"], icon: "tv" },
      { name: "މޯލްޑިވްސް ޓީވީ", desc: "ފަތުރުވެރިކަމާ ބެހޭ ޗެނަލް", streams: [
          "https://lana.psm.mv/live/mtv.m3u8"],
        type: "link", live: true,
        url: "https://www.psmnews.mv/stream/maldives-tv" /* (check) */, color: ["#00c2ff", "#005a8c"], icon: "tv" },
      { name: "މަޖިލިސް ޓީވީ", desc: "ރައްޔިތުންގެ މަޖިލީހުގެ ޗެނަލް", type: "link", live: true,
        url: "https://www.psmnews.mv/stream/majlis" /* (check) */, color: ["#7a8899", "#28323d"], icon: "tv" }
    ]
  },
  {
    title: "ރޭޑިއޯ",
    apps: [
      { name: "ދިވެހިރާއްޖޭގެ އަޑު", desc: "ޕީއެސްއެމްގެ ރޭޑިއޯ", type: "link", live: true,
        url: "https://psmnews.mv/stream/radio-dhivehi-raajjeyge-adu", color: ["#ff8a00", "#7a2e00"], icon: "radio" },
      { name: "ދިވެހި އެފްއެމް", desc: "މިއުޒިކް ރޭޑިއޯ", type: "link", live: true,
        url: "https://www.psmnews.mv/stream/radio-dhivehi-fm" /* (check) */, color: ["#ff2d95", "#6b0040"], icon: "radio" },
      { name: "ދީނުގެ އަޑު", desc: "ދީނީ ރޭޑިއޯ", type: "link", live: true,
        url: "https://www.psmnews.mv/stream/radio-dheenuge-adu" /* (check) */, color: ["#2bb673", "#0d4a2c"], icon: "radio" }
    ]
  }
];
