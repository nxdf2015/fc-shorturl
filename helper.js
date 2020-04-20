

let setId = new Set([])
let mapUrl = new Map([])


function createId(){
  let id 
  do {
    id = Math.round(Math.random() * 100) + 1
  }while(setId.has(id))
   setId.add(id)
  
  return id
}
 
function setUrl(url){
  let id = createId();
  mapUrl.set(id,url)
  console.log(mapUrl)
  return id
}
  
function getUrl(id){
  return mapUrl.get(id)
}

  
  
 
module.exports.URLMap={setUrl, getUrl}


