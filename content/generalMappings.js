export function generateMappings(tileType) {
  return {
    0: () => [
      sprite(`${tileType}-tileset`, { anim: "tl" }),
      area(),
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    1: () => [
      sprite(`${tileType}-tileset`, { anim: "tm" }),
      area(),
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    2: () => [
      sprite(`${tileType}-tileset`, { anim: "tr" }),
      area(),
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    3: () => [
      sprite(`${tileType}-tileset`, { anim: "ml" }),
      area(),
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen({hide: true})],
    5: () => [
      sprite(`${tileType}-tileset`, { anim: "mr" }),
      area(),
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    6: () => [sprite(`${tileType}-tileset`, { anim: "ml-2" }), offscreen({hide: true})],
    7: () => [sprite(`${tileType}-tileset`, { anim: "mm-2" }), offscreen({hide: true})],
    8: () => [sprite(`${tileType}-tileset`, { anim: "mr-2" }), offscreen({hide: true})],
    9: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tl" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    a: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    b: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen({hide: true}),
    ],
    c: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
      offscreen({hide: true}),
    ],
    d: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
      offscreen({hide: true}),
    ],
    e: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
      offscreen({hide: true}),
    ],
    o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen({hide: true})],
    "@": () => [sprite("coin"), area(), "coin", offscreen({hide: true})],
  }
}
