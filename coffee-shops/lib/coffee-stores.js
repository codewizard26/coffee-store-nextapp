export const fetchCoffeeStores = async (latLong ="43.67476485889247,-79.52683050468995") =>{
     //fetching foursquare Api *********

     const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
      };
  
      const searchParams = new URLSearchParams({
        query: 'coffee',
        ll:latLong ,
        sort: 'DISTANCE',
        limit:`6`
  
      });
  
     const response = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, options)
        const data = await response.json()
        console.log(data)

    return data.results
  
  
        //***********fetching complete***** */
  
}