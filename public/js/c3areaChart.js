(function() {
  $.getJSON( '/igMediaCounts' )
    .done(function( data ) {
      var numPhotos = data.users.map(function(item){
        
        return item.counts.media; //number of posts/photos
      });//close .map()
      
      var following = data.users.map(function(item) {
		return item.counts.follows; //number this individual profile is following EX: ledpresents following 53 people
	  });//close .map()
      
      
      numPhotos.unshift('Number of Photos');
      following.unshift('Following');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            numPhotos,
            following 
          ],
          type: 'area-spline'
          
        }//close data
        
      });//close .generate
      
    });//close .done
    
})();
