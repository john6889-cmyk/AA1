function picMarker(picName, value) {
  let width;
  if(picName === "战区发" || picName === "战区收") {
    width = 50
  } else {
    width = 30
  }
  let obj = {
    "geometry": {
      type: "point",
      longitude: value[0],
      latitude: value[1]
    },
    "symbol": {
      type: "picture-marker",
      url: require('../assets/img/' + picName + '.png'),
      width: width,
      height: width,
    },
    "attributes": {
      longitude: value[0],
      latitude: value[1]
    }
  }
  return obj
}
export default { picMarker }
