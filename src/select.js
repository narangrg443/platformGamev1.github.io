// main.js
  let device=null;
  
  const deviceSelect = document.getElementById('deviceSelect');


    const selectedDevice = deviceSelect.value;

    // Handle the selected device
    if (selectedDevice === 'mobile') {
      console.log('Mobile selected');
      device="MOBILE"
    } else if (selectedDevice === 'pc') {
      console.log('PC selected');
      device="PC"
    }
  
