var myMap = L.map("mapeat", {
    center: [35.2271, -80.8431],
    zoom: 9
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  d3.json("nc_sample.json").then((sampledata) => {
  
    //console.log(sampledata);
  
    
    var loc = [];
    var lat = Object.values(sampledata.latitude);
    var lng = Object.values(sampledata.longitude);
    var name = Object.values(sampledata.name);
    var address = Object.values(sampledata.address);
    var banner = Object.values(sampledata.covid_banner);
    var grub = Object.values(sampledata.grubhub_enabled);
  
  for (var i = 0; i < lat.length; i++) {
    loc.push([lat[i], lng[i]]);
    
    //console.log(loc);

    if (loc) {
        L.marker([lat[i], lng[i]]).bindPopup(
            "<h4>" + name[i] + "</h4>"+"<h5>" + address[i] + "</h5>" + "<i>" + "Covid Banner: "
            + banner[i] + "</i>" + "<hr>" + "<h4>" + "Grubhub Enabled:" + grub[i] 
            + "</h4>").addTo(myMap);
      }
  }
  
  });