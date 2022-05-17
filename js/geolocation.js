function geolocationSupport(){
  return 'geolocation' in navigator;
}
const defaultOption ={
  enablehighAcurracy:true,
  timeout: 5000,
  maximumAge:1000000
}
export function getCurrentPosition(options = defaultOption){
  if(!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion');
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition((position) =>{
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      resolve(position)
    },() =>{
      reject('No hemos podido obtener tu ubicacion');
    },options)
  })
}

export async function getLanLon(options = defaultOption){
  try{
    const {coords:{latitude:lat,longitude:lon}} = await getCurrentPosition(options)
    return{lat,lon,isError: false}
  }catch{
    return{isError: true, lat: null, lon:null}
  }

}