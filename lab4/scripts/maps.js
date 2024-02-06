// Initialize and add the map
let map;

async function initMap(lat = -25.344, lng = 131.031) {
  // Shop location
  // Change position to store location
  const position = { lat, lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered shop location
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at shop location
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Shop 1",
  });
}

initMap();