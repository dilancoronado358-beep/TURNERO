const fs = require('fs');

async function fetchMarkers() {
  const url = "https://tmucjycefiyhthgoladq.supabase.co/rest/v1/pacientes_espera?select=nombre,created_at,sede&nombre=ilike.*SISTEMA*&order=created_at.desc&limit=5";
  const res = await fetch(url, {
    headers: {
      'apikey': 'sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB',
      'Authorization': 'Bearer sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB'
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchMarkers();
