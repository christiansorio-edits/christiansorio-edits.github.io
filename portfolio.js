// Featured works on the website (2 per style). Everything else is in the Google Drive
// "MY PORTFOLIO" folder, linked from the "See all my works" button.
// To add a work: share it as "Anyone with the link", copy the ID from its link
// (drive.google.com/file/d/THIS-PART/view) and add a line like the ones below.
const PORTFOLIO = [
  {"id": "1ISoJKiHzAPTAJp_hE72Xt1vmr6o_BIe2", "group": "ads", "label": "Short-Form Ad", "kind": "video", "title": "Short-Form Edit #1", "ratio": 0.562},
  {"id": "1CFWg1KdZHBbAXTp4n2-PFYDBJpb2cRQj", "group": "ads", "label": "Short-Form Ad", "kind": "video", "title": "Short-Form Edit #2", "ratio": 0.562},
  {"id": "1uVneFLMpIjOZNNxGihwyz_BbQxTYHiKz", "group": "ugc", "label": "UGC Edit", "kind": "video", "title": "UGC Edit #1", "ratio": 0.563},
  {"id": "1uWGhfk8aKqK8Az3oCDxYo3MQTwB945DS", "group": "ugc", "label": "UGC Edit", "kind": "video", "title": "UGC Edit #2", "ratio": 0.563},
  {"id": "13QJzPTD69N7bNrotSQBS2MW-Xy4Wk9TW", "group": "ai", "label": "AI UGC", "kind": "video", "title": "AI UGC Ad #1", "ratio": 0.562},
  {"id": "1eIpaNsqEyYXSAOP7shodUlP04zgNrUIk", "group": "ai", "label": "AI UGC", "kind": "video", "title": "AI UGC Ad #2", "ratio": 0.562},
  {"id": "1vER60TuYoU7YAanPXLcJQJyK6owpeNXJ", "group": "ai", "label": "AI Hook", "kind": "video", "title": "AI Hook (No Talking Head) #1", "ratio": 0.562},
  {"id": "1LxD8gBvds79M7jFdnryAcibVM8WRQJcC", "group": "ai", "label": "AI Hook", "kind": "video", "title": "AI Hook (No Talking Head) #2", "ratio": 0.562},
  {"id": "1eeiirNsSw6RR7J_0uDA2y2yPgmv66c0q", "group": "ai", "label": "AI Pixar 3D", "kind": "video", "title": "AI Pixar-Style 3D #1", "ratio": 0.562},
  {"id": "1GBqyzmklxwbrTRb71RFEnsqWDwgNujqs", "group": "ai", "label": "AI Pixar 3D", "kind": "video", "title": "AI Pixar-Style 3D #2", "ratio": 0.562},
  {"id": "1BxJCoIsiFBhQqM8Jt31-HA1tvMaxbgE9", "group": "ai", "label": "AI Claymation", "kind": "video", "title": "AI Claymation", "ratio": 0.562},
  {"id": "1jnAkeNJboeHcfjiDeJaAAJa-NF9hmw40", "group": "ai", "label": "AI Podcast", "kind": "video", "title": "AI Podcast Edit", "ratio": 0.558},
  {"id": "17-xgNh73HoH-IfYEYX9jaNZ-Zs-lGmfc", "group": "motion", "label": "Motion Graphics", "kind": "video", "title": "Motion Graphics #1", "ratio": 0.562},
  {"id": "1m3jwOmJ03zOv2-Qe1k8AJKFo3f1E8vnG", "group": "motion", "label": "Motion Graphics", "kind": "video", "title": "Motion Graphics #2", "ratio": 0.562},
  {"id": "173iUn_FIQIRK0oIzBatKHRDsh8BXvUKK", "group": "design", "label": "Infographic", "kind": "image", "title": "Infographic #1", "ratio": 1.0},
  {"id": "1agGpLdv2xP3mriTEumPp7ZXYA98nwiyQ", "group": "design", "label": "Infographic", "kind": "image", "title": "Infographic #2", "ratio": 1.0},
  {"id": "13hbb5w80YKI_bgVD26cDLEFA4X_KURSW", "group": "design", "label": "Illustration", "kind": "image", "title": "Digital Illustration #1", "ratio": 0.833},
  {"id": "1V4RF3W3tp6eXqb5UEMvWE1X0l4Z3Of9p", "group": "design", "label": "Illustration", "kind": "image", "title": "Digital Illustration #2", "ratio": 1.0},
  // Graphics kept on the site itself (the graphics folder): "src" = full size, "thumb" = small preview
  {"id": "thumbnail-ai", "group": "graphics", "label": "Thumbnail", "kind": "image", "title": "YouTube Thumbnail: AI / Tech", "ratio": 1.778, "src": "graphics/thumbnail-ai.jpg", "thumb": "graphics/thumbnail-ai-sm.jpg"},
  {"id": "thumbnail-money", "group": "graphics", "label": "Thumbnail", "kind": "image", "title": "YouTube Thumbnail: Money / Business", "ratio": 1.778, "src": "graphics/thumbnail-money.jpg", "thumb": "graphics/thumbnail-money-sm.jpg"},
  {"id": "ad-hikari-serum", "group": "graphics", "label": "Static Ad", "kind": "image", "title": "Static Ad: Hikari 9in1 Miracle Serum (spec ad)", "ratio": 0.8, "src": "graphics/ad-hikari-serum.jpg", "thumb": "graphics/ad-hikari-serum-sm.jpg"},
  {"id": "ad-coffee", "group": "graphics", "label": "Static Ad", "kind": "image", "title": "Static Ad: Coffee Brand", "ratio": 0.8, "src": "graphics/ad-coffee.jpg", "thumb": "graphics/ad-coffee-sm.jpg"},
  {"id": "carousel-editing", "group": "graphics", "label": "Carousel", "kind": "carousel", "title": "IG Carousel: 3 Editing Tricks (swipe)", "ratio": 0.8, "thumb": "graphics/carousel-editing-1-sm.jpg", "slides": [1, 2, 3, 4, 5].map((n) => `graphics/carousel-editing-${n}.jpg`)},
  {"id": "carousel-realestate", "group": "graphics", "label": "Carousel", "kind": "carousel", "title": "IG Carousel: Real Estate Tips (swipe)", "ratio": 0.8, "thumb": "graphics/carousel-realestate-1-sm.jpg", "slides": [1, 2, 3, 4, 5].map((n) => `graphics/carousel-realestate-${n}.jpg`)}
];
