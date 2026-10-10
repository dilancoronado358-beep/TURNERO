const fs = require('fs');

async function testFetch() {
  const url = "https://tmucjycefiyhthgoladq.supabase.co/rest/v1/pacientes_espera?select=created_at&nombre=eq.%5BSISTEMA_NUEVA_BRIGADA_Sede%20A%5D&order=created_at.desc.nullslast&limit=1&sede=eq.Sede%20A";
  const res = await fetch(url, {
    headers: {
      'apikey': 'sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB',
      'Authorization': 'Bearer sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB'
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testFetch();
