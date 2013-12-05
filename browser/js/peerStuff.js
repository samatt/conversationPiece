/* PeerJS functions*/
    var newPeer = function(peer_ids){

      console.log("Got a new peer: " + peer_ids);

      peers=peer_ids;
      // Call them with our stream, my_stream
      console.log("Calling peer: " + peer_ids);           
      var call = peer.call(peer_ids, mystream);
      
      console.log("Establishing connection with user: " + peer_ids);           

      // After they answer, we'll get a 'stream' event with their stream  
      call.on('stream', function(remoteStream) {
        console.log("Got remote stream ");
        var ovideoElement = document.createElement('video');
            ovideoElement.src = window.URL.createObjectURL(remoteStream) || remoteStream;
            document.body.appendChild(ovideoElement);
            ovideoElement.play();
        // var videoElement = document.getElementById('otherVideo');
  
        // videoElement.src = window.URL.createObjectURL(remoteStream) || remoteStream;
      });
    }  
    var peerOpen =  function(id) {
        console.log('My peer ID is: ' + id);
        peer_id = id;
       
        console.log("sending out our peer id");
        socket.emit("peer_id",peer_id);        
	  }
  	var peerIncomingCall =  function(incoming_call) {
        console.log("Got a call!");
        console.log("sending" + mystream);

        incoming_call.answer(mystream); // Answer the call with our stream from getUserMedia
        incoming_call.on('stream', function(remoteStream) {  // we receive a getUserMedia stream from the remote caller
          // And attach it to a video object
          var ovideoElement = document.createElement('video');
            ovideoElement.src = window.URL.createObjectURL(remoteStream) || remoteStream;
            document.body.appendChild(ovideoElement);
            ovideoElement.play();
        });
    }
    var peerConnection = function(incoming_data){
      console.log("Got a data  from user");
      console.log(incoming_data);
      // console.log(incoming_data);
      // peers = peer.connections[0];
      incoming_data.on('data',function(data){
        videoData = data;
      });
      
      incoming_data.on('error',function(err){
          console.log(err);        
      });
    }